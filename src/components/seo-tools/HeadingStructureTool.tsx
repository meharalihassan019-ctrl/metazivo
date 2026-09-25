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
  ArrowRight,
  Globe,
  Search
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
  
  // URL Live Fetch State
  const [urlInput, setUrlInput] = useState("https://metazivo.com");
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [inputHtml, setInputHtml] = useState(
    `<h1>Metazivo | Premier SEO, AEO & GEO Digital Agency</h1>
<p>Dominate search with Metazivo – expert SEO, AEO, GEO, WordPress development & Meta Ads.</p>
<h2>1. Core Web Vitals & Speed Optimization</h2>
<h3>Largest Contentful Paint (LCP)</h3>
<p>Techniques to ensure render times remain under 2.5 seconds.</p>
<h3>Interaction to Next Paint (INP)</h3>
<h2>2. JavaScript Rendering & Hydration</h2>
<h3>Server Side Prerendering for Googlebot</h3>
<h2>3. Schema Markup & Structured Data</h2>
<h3>Article & BlogPosting Schema</h3>`
  );

  const [analysis, setAnalysis] = useState<{
    h1Count: number;
    totalHeadings: number;
    headings: HeadingItem[];
    issuesCount: number;
    score: number;
    pageTitle?: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  // Analyze HTML string directly
  const runAnalysisOnHtml = (htmlContent: string, pageTitle?: string) => {
    const tagRegex = /<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi;
    const items: HeadingItem[] = [];
    let match;
    let h1Count = 0;
    let issues = 0;
    let lastLevel = 0;

    while ((match = tagRegex.exec(htmlContent)) !== null) {
      const level = parseInt(match[1][1], 10);
      const text = match[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

      if (level === 1) h1Count++;

      let status: "ok" | "skip" | "length" | "empty" = "ok";
      let message = "Properly formatted.";

      if (!text) {
        status = "empty";
        message = "Heading contains no readable text content.";
        issues++;
      } else if (text.length > 70 && level === 1) {
        status = "length";
        message = `H1 is ${text.length} chars (Google recommends 50-70 chars max).`;
        issues++;
      } else if (lastLevel > 0 && level > lastLevel + 1) {
        status = "skip";
        message = `Skipped heading level: jumped from H${lastLevel} directly to H${level}.`;
        issues++;
      }

      lastLevel = level;
      items.push({ level, text, status, message });
    }

    if (h1Count === 0) issues++;
    if (h1Count > 1) issues += (h1Count - 1);

    const baseScore = Math.max(30, 100 - issues * 12);

    setAnalysis({
      h1Count,
      totalHeadings: items.length,
      headings: items,
      issuesCount: issues,
      score: baseScore,
      pageTitle
    });
  };

  // Real remote URL crawler
  const handleFetchAndAnalyzeUrl = async () => {
    if (!urlInput.trim()) return;
    setIsFetchingUrl(true);
    setFetchError(null);

    let target = urlInput.trim();
    if (!/^https?:\/\//i.test(target)) target = "https://" + target;

    try {
      const res = await fetch("/api/seo-tools/live-page-inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch remote page HTML.");

      // Put fetched raw headings or full HTML into state
      let constructedHtml = "";
      if (data.headings && data.headings.length > 0) {
        constructedHtml = data.headings.map((h: any) => `<${h.tag}>${h.text}</${h.tag}>`).join("\n");
      } else {
        constructedHtml = `<h1>${data.title || "No Title Found"}</h1>`;
      }

      setInputHtml(constructedHtml);
      runAnalysisOnHtml(constructedHtml, data.title);
    } catch (err: any) {
      setFetchError(err.message || "Failed to inspect remote URL.");
    } finally {
      setIsFetchingUrl(false);
    }
  };

  const handleAnalyzeManual = () => {
    runAnalysisOnHtml(inputHtml);
  };

  const handleCopy = () => {
    if (!analysis) return;
    const summary = analysis.headings
      .map((h) => `${"  ".repeat(h.level - 1)}H${h.level}: ${h.text} [${h.status.toUpperCase()}]`)
      .join("\n");
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={() => {
        setAnalysis(null);
        setFetchError(null);
      }}
    >
      <div className="space-y-6">
        {/* Real Live URL Probe Card */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-800 uppercase flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#FF5722]" />
              <span>Fetch Live Heading Hierarchy from Any Website URL</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold uppercase tracking-wider">
              Live DOM Crawler
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://metazivo.com"
              className="flex-1 p-3 bg-white border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
            />
            <button
              type="button"
              onClick={handleFetchAndAnalyzeUrl}
              disabled={isFetchingUrl || !urlInput.trim()}
              className="px-5 py-3 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isFetchingUrl ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Extracting Headings...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Fetch & Inspect Live</span>
                </>
              )}
            </button>
          </div>
        </div>

        {fetchError && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{fetchError}</span>
          </div>
        )}

        {/* Manual HTML Editor Fallback */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
              HTML or Markdown Content
            </label>
            <button
              type="button"
              onClick={handleAnalyzeManual}
              className="text-xs font-bold text-[#FF5722] hover:underline cursor-pointer"
            >
              Re-Analyze Raw Text →
            </button>
          </div>
          <textarea
            rows={6}
            value={inputHtml}
            onChange={(e) => setInputHtml(e.target.value)}
            className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
          />
        </div>

        {/* Results Overview */}
        {analysis && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Structure Score</span>
                <span className={`text-2xl font-black mt-1 block ${analysis.score >= 85 ? "text-emerald-600" : analysis.score >= 60 ? "text-amber-600" : "text-rose-600"}`}>
                  {analysis.score} / 100
                </span>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">H1 Tag Count</span>
                <span className={`text-2xl font-black mt-1 block ${analysis.h1Count === 1 ? "text-emerald-600" : "text-rose-600"}`}>
                  {analysis.h1Count} {analysis.h1Count === 1 ? "(Optimal)" : "(Issue)"}
                </span>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Total Headings</span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">{analysis.totalHeadings}</span>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Structural Flags</span>
                <span className={`text-2xl font-black mt-1 block ${analysis.issuesCount === 0 ? "text-emerald-600" : "text-amber-600"}`}>
                  {analysis.issuesCount}
                </span>
              </div>
            </div>

            {/* Tree View */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-700 uppercase">
                  Heading Hierarchy Outline
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy Outline"}</span>
                </button>
              </div>

              <div className="p-4 divide-y divide-slate-100 space-y-2">
                {analysis.headings.map((h, i) => (
                  <div key={i} className="pt-2 flex items-start gap-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                      h.level === 1 ? "bg-[#FF5722] text-white" :
                      h.level === 2 ? "bg-slate-800 text-white" :
                      "bg-slate-100 text-slate-600"
                    }`}>
                      H{h.level}
                    </span>
                    <div className="flex-1 min-w-0" style={{ paddingLeft: `${(h.level - 1) * 16}px` }}>
                      <p className="text-xs font-bold text-slate-900 leading-snug">{h.text}</p>
                      {h.status !== "ok" && (
                        <p className="text-[11px] text-amber-600 font-medium mt-0.5">{h.message}</p>
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
