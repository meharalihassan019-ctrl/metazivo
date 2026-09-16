import React, { useState } from "react";
import {
  Heading,
  Copy,
  Download,
  Check,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileCode,
  ArrowRight
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface HeadingItem {
  level: number;
  text: string;
  status: "ok" | "skip" | "length" | "empty";
  message?: string;
}

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function HeadingStructureTool({ tool, onNavigateTool, onNavigateHome }: Props) {
  const isH1Only = tool.slug === "h1-checker";

  const [inputHtml, setInputHtml] = useState(
    `<h1>Technical SEO Guide for Modern Web Applications</h1>
<p>An introductory overview of crawlability and indexation.</p>
<h2>1. Core Web Vitals Optimization</h2>
<h3>Largest Contentful Paint (LCP)</h3>
<p>Techniques to ensure render times remain under 2.5 seconds.</p>
<h3>Interaction to Next Paint (INP)</h3>
<h2>2. JavaScript Rendering & Hydration</h2>
<h4>Hydration Bottlenecks</h4>
<h2>3. Schema Markup & Structured Data</h2>
<h3>LocalBusiness & Article Schema</h3>`
  );

  const [analysis, setAnalysis] = useState<{
    h1Count: number;
    totalHeadings: number;
    headings: HeadingItem[];
    issuesCount: number;
    score: number;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const analyzeHeadings = () => {
    // Parse tags using regex
    const tagRegex = /<(h[1-6])[^>]*>(.*?)<\/\1>/gi;
    let match;
    const found: Array<{ level: number; text: string }> = [];

    while ((match = tagRegex.exec(inputHtml)) !== null) {
      const level = parseInt(match[1].charAt(1), 10);
      const text = match[2].replace(/<[^>]*>/g, "").trim();
      found.push({ level, text });
    }

    if (found.length === 0) {
      // Fallback: parse plain text lines starting with H1:, #, etc.
      const lines = inputHtml.split("\n");
      lines.forEach((line) => {
        const hMatch = line.trim().match(/^(h[1-6]|#+)\s*(.*)/i);
        if (hMatch) {
          const lvl = hMatch[1].startsWith("#")
            ? hMatch[1].length
            : parseInt(hMatch[1].charAt(1), 10);
          found.push({ level: Math.min(6, lvl), text: hMatch[2].trim() });
        }
      });
    }

    let prevLevel = 0;
    let h1Count = 0;
    let issuesCount = 0;

    const evaluated: HeadingItem[] = found.map((item) => {
      let status: "ok" | "skip" | "length" | "empty" = "ok";
      let message = "";

      if (item.level === 1) h1Count++;

      if (!item.text) {
        status = "empty";
        message = "Heading tag is empty.";
        issuesCount++;
      } else if (prevLevel > 0 && item.level > prevLevel + 1) {
        status = "skip";
        message = `Skipped hierarchy (jumped from H${prevLevel} directly to H${item.level}).`;
        issuesCount++;
      } else if (item.text.length > 75) {
        status = "length";
        message = "Heading is unusually long (>75 chars).";
        issuesCount++;
      }

      prevLevel = item.level;
      return { ...item, status, message };
    });

    if (h1Count !== 1) issuesCount++;

    const baseScore = Math.max(20, 100 - issuesCount * 18);

    setAnalysis({
      h1Count,
      totalHeadings: evaluated.length,
      headings: evaluated,
      issuesCount,
      score: h1Count === 0 ? 30 : baseScore
    });
  };

  const handleCopy = () => {
    if (!analysis) return;
    const text = analysis.headings
      .map((h) => `${"  ".repeat(h.level - 1)}H${h.level}: ${h.text} ${h.message ? `[${h.message}]` : ""}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setAnalysis(null);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={analysis ? handleReset : undefined}
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <label htmlFor="html-heading-input" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
            Paste HTML Content or Markdown Heading Structure
          </label>
          <textarea
            id="html-heading-input"
            rows={7}
            value={inputHtml}
            onChange={(e) => setInputHtml(e.target.value)}
            placeholder="<h1>Your Main Topic</h1>&#10;<h2>Section Subtitle</h2>..."
            className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] transition-all"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={analyzeHeadings}
              disabled={!inputHtml.trim()}
              className="px-6 py-3 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Heading className="w-4 h-4" />
              <span>{isH1Only ? "Validate H1 Presence & Format" : "Audit Heading Hierarchy"}</span>
            </button>
          </div>
        </div>

        {analysis && (
          <div className="space-y-6 pt-4 border-t border-slate-200 animate-fade-in">
            {/* Metric Score Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-xs text-slate-500">Hierarchy Score</span>
                <span className="text-2xl font-extrabold text-slate-900">{analysis.score}/100</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-xs text-slate-500">H1 Tag Count</span>
                <span
                  className={`text-2xl font-extrabold ${
                    analysis.h1Count === 1 ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {analysis.h1Count} {analysis.h1Count === 1 ? "(Optimal)" : "(Defect)"}
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-xs text-slate-500">Total Headings</span>
                <span className="text-2xl font-extrabold text-slate-900">{analysis.totalHeadings}</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-xs text-slate-500">Hierarchy Defects</span>
                <span
                  className={`text-2xl font-extrabold ${
                    analysis.issuesCount === 0 ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {analysis.issuesCount}
                </span>
              </div>
            </div>

            {/* Visual Tree Hierarchy List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Semantic Heading Outline Tree
                </h4>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? "Copied" : "Copy Outline"}</span>
                </button>
              </div>

              <div className="space-y-2 bg-slate-50/50 p-4 rounded-2xl border border-slate-200">
                {analysis.headings.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs shadow-xs"
                    style={{ marginLeft: `${(h.level - 1) * 20}px` }}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-mono font-bold text-slate-700 text-[11px]">
                        H{h.level}
                      </span>
                      <span className="font-semibold text-slate-900 truncate">
                        {h.text || "<empty heading>"}
                      </span>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {h.status === "ok" && (
                        <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Proper
                        </span>
                      )}
                      {h.status === "skip" && (
                        <span className="text-[11px] text-amber-600 flex items-center gap-1 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5" /> {h.message}
                        </span>
                      )}
                      {h.status === "length" && (
                        <span className="text-[11px] text-slate-500 font-medium">
                          {h.message}
                        </span>
                      )}
                      {h.status === "empty" && (
                        <span className="text-[11px] text-rose-600 flex items-center gap-1 font-medium">
                          <XCircle className="w-3.5 h-3.5" /> Empty Tag
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}
