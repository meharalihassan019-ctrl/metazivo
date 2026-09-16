import React, { useState } from "react";
import {
  Link2,
  Copy,
  Download,
  Check,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Target,
  FileSpreadsheet
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface LinkSuggestion {
  sourceContext: string;
  suggestedAnchor: string;
  targetUrl: string;
  targetTopic: string;
  priority: "High" | "Medium" | "Low";
  rationale: string;
}

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function InternalLinkFinderTool({ tool, onNavigateTool, onNavigateHome }: Props) {
  const [contentDraft, setContentDraft] = useState(
    `When scaling organic traffic for B2B websites, technical seo audit checks must precede any new content sprints. If Googlebot cannot render your JavaScript hydration layers, your high quality blog posts will remain unranked. Furthermore, optimizing core web vitals and reducing cumulative layout shift prevents sudden bounce rate spikes. After technical health is assured, establishing topical authority via keyword clustering and creating dedicated service pages helps build a durable conversion funnel. Don't forget to implement schema markup generator structured data like FAQPage and LocalBusiness to win Google rich snippets.`
  );

  const [siteInventory, setSiteInventory] = useState(
    `https://metazivo.com/services/technical-seo | Technical SEO Audits & Architecture
https://metazivo.com/tools/speed-test | Core Web Vitals & PageSpeed Test
https://metazivo.com/insights/keyword-clustering | Keyword Clustering & Topical Maps
https://metazivo.com/tools/schema-generator | Schema Markup Generator JSON-LD`
  );

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<LinkSuggestion[] | null>(null);
  const [copied, setCopied] = useState(false);

  const runAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      // Parse inventory
      const targets = siteInventory
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => {
          const parts = l.split("|");
          return {
            url: parts[0]?.trim() || "",
            topic: parts[1]?.trim() || parts[0]?.trim() || ""
          };
        });

      const text = contentDraft;
      const suggestions: LinkSuggestion[] = [];

      // Keyword match patterns
      const matchPatterns = [
        {
          regex: /technical seo audit/i,
          urlMatch: "technical-seo",
          topic: "Technical SEO Audits",
          anchor: "technical SEO audit",
          priority: "High" as const,
          rationale: "Foundational pillar match with direct commercial/service relevance."
        },
        {
          regex: /core web vitals|cumulative layout shift/i,
          urlMatch: "speed-test",
          topic: "Core Web Vitals & Speed",
          anchor: "optimizing core web vitals",
          priority: "High" as const,
          rationale: "Connects technical performance problem to your performance testing tool."
        },
        {
          regex: /keyword clustering|topical authority/i,
          urlMatch: "keyword-clustering",
          topic: "Keyword Clustering Strategy",
          anchor: "keyword clustering",
          priority: "Medium" as const,
          rationale: "Passes contextual topical relevance from content strategy to the clustering guide."
        },
        {
          regex: /schema markup generator|structured data/i,
          urlMatch: "schema-generator",
          topic: "Schema Markup Generator",
          anchor: "schema markup generator",
          priority: "Medium" as const,
          rationale: "Direct navigational intent match pointing users to the interactive schema tool."
        }
      ];

      matchPatterns.forEach((p) => {
        const match = text.match(p.regex);
        if (match && match.index !== undefined) {
          const matchedTarget = targets.find((t) => t.url.includes(p.urlMatch)) || targets[0];
          if (matchedTarget) {
            const start = Math.max(0, match.index - 40);
            const end = Math.min(text.length, match.index + match[0].length + 40);
            const snippet = text.slice(start, end).replace(/\s+/g, " ");

            suggestions.push({
              sourceContext: `...${snippet}...`,
              suggestedAnchor: p.anchor,
              targetUrl: matchedTarget.url,
              targetTopic: matchedTarget.topic,
              priority: p.priority,
              rationale: p.rationale
            });
          }
        }
      });

      setResults(suggestions);
      setLoading(false);
    }, 350);
  };

  const handleCopy = () => {
    if (!results) return;
    const text = results
      .map(
        (s) =>
          `Target: ${s.targetUrl} (${s.targetTopic})\nAnchor: "${s.suggestedAnchor}" [${s.priority} Priority]\nContext: ${s.sourceContext}\nRationale: ${s.rationale}\n`
      )
      .join("\n---\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!results) return;
    let csv = "Suggested Anchor,Target URL,Target Topic,Priority,Source Context,Rationale\n";
    results.forEach((s) => {
      csv += `"${s.suggestedAnchor}","${s.targetUrl}","${s.targetTopic}","${s.priority}","${s.sourceContext}","${s.rationale}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `internal-links-plan-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setResults(null);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={results ? handleReset : undefined}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Draft Content */}
          <div className="lg:col-span-7 space-y-2">
            <label htmlFor="content-draft-input" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
              Source Article / Page Body Content
            </label>
            <textarea
              id="content-draft-input"
              rows={8}
              value={contentDraft}
              onChange={(e) => setContentDraft(e.target.value)}
              placeholder="Paste article body or section draft here..."
              className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs font-sans text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] transition-all"
            />
          </div>

          {/* Right Column: Site Inventory Target Pages */}
          <div className="lg:col-span-5 space-y-2">
            <label htmlFor="site-inventory-input" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
              Destination Target Pages (URL | Topic)
            </label>
            <textarea
              id="site-inventory-input"
              rows={8}
              value={siteInventory}
              onChange={(e) => setSiteInventory(e.target.value)}
              placeholder="https://yoursite.com/service | Topic Name"
              className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] transition-all"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={runAnalysis}
            disabled={loading || !contentDraft.trim()}
            className="px-6 py-3 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Mapping Internal Link Equity...</span>
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4" />
                <span>Discover Internal Link Opportunities</span>
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6 pt-4 border-t border-slate-200 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-mono font-bold text-slate-700 uppercase">
                {results.length} Contextual Internal Link Opportunities Found
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? "Copied" : "Copy Suggestions"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-slate-400" />
                  <span>Download CSV</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {results.map((s, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#FF5722] bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
                        "{s.suggestedAnchor}"
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-800">
                        {s.targetTopic}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        s.priority === "High"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {s.priority} Priority
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl text-xs font-sans space-y-1">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                      Found in Source Context
                    </span>
                    <p className="text-slate-700 italic">
                      {s.sourceContext}
                    </p>
                  </div>

                  <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                    <span className="text-slate-500 font-mono text-[11px] truncate max-w-md">
                      Target URL: {s.targetUrl}
                    </span>
                    <p className="text-slate-600 text-[11px]">
                      <strong>Rationale:</strong> {s.rationale}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}
