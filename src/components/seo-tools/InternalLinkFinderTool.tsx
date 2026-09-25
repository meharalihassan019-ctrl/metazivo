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
  FileSpreadsheet,
  Globe,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileCode
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
  const [activeTab, setActiveTab] = useState<"live" | "draft">("live");

  // State for live page link extractor
  const [urlInput, setUrlInput] = useState("https://metazivo.com");
  const [loadingLive, setLoadingLive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [liveLinksData, setLiveLinksData] = useState<{
    url: string;
    internalCount: number;
    externalCount: number;
    internalSamples: Array<{ href: string; anchorText: string; rel: string }>;
    externalSamples: Array<{ href: string; anchorText: string; rel: string }>;
  } | null>(null);

  // State for draft opportunity finder
  const [contentDraft, setContentDraft] = useState(
    `When scaling organic traffic for B2B websites, technical seo audit checks must precede any new content sprints. If Googlebot cannot render your JavaScript hydration layers, your high quality blog posts will remain unranked. Furthermore, optimizing core web vitals and reducing cumulative layout shift prevents sudden bounce rate spikes. After technical health is assured, establishing topical authority via keyword clustering and creating dedicated service pages helps build a durable conversion funnel. Don't forget to implement schema markup generator structured data like FAQPage and LocalBusiness to win Google rich snippets.`
  );

  const [siteInventory, setSiteInventory] = useState(
    `https://metazivo.com/services/seo | Technical SEO Audits & Architecture
https://metazivo.com/tools/core-web-vitals-checker | Core Web Vitals & PageSpeed Test
https://metazivo.com/tools/keyword-clustering-tool | Keyword Clustering & Topical Maps
https://metazivo.com/tools/schema-markup-generator | Schema Markup Generator JSON-LD`
  );

  const [draftLoading, setDraftLoading] = useState(false);
  const [draftSuggestions, setDraftSuggestions] = useState<LinkSuggestion[] | null>(null);
  const [copied, setCopied] = useState(false);

  // 1. Audit Live Webpage Links
  const handleInspectLiveLinks = async () => {
    if (!urlInput.trim()) return;
    setLoadingLive(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/seo-tools/live-page-inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput.trim() })
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Failed to inspect page links");
        setLiveLinksData(null);
      } else {
        setLiveLinksData({
          url: data.url,
          internalCount: data.links.internalCount,
          externalCount: data.links.externalCount,
          internalSamples: data.links.internalSamples,
          externalSamples: data.links.externalSamples
        });
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to reach server");
    } finally {
      setLoadingLive(false);
    }
  };

  // 2. Draft Content Link Matching
  const runDraftAnalysis = () => {
    setDraftLoading(true);
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

    const matchPatterns = [
      {
        regex: /technical seo audit/i,
        urlMatch: "seo",
        anchor: "technical SEO audit",
        priority: "High" as const,
        rationale: "Exact commercial service match passes topical equity to your core service."
      },
      {
        regex: /core web vitals/i,
        urlMatch: "core-web-vitals",
        anchor: "Core Web Vitals",
        priority: "High" as const,
        rationale: "Aligns user problem directly with your free diagnostic tool."
      },
      {
        regex: /keyword clustering/i,
        urlMatch: "keyword-clustering",
        anchor: "keyword clustering",
        priority: "Medium" as const,
        rationale: "Direct navigational anchor connecting strategy to keyword workflow."
      },
      {
        regex: /schema markup generator/i,
        urlMatch: "schema",
        anchor: "schema markup generator",
        priority: "High" as const,
        rationale: "High conversion product link for rich snippet implementation."
      }
    ];

    matchPatterns.forEach((pat) => {
      const match = text.match(pat.regex);
      if (match && match.index !== undefined) {
        const start = Math.max(0, match.index - 40);
        const end = Math.min(text.length, match.index + pat.anchor.length + 40);
        const snippet = "..." + text.substring(start, end).trim() + "...";

        const matchedTarget = targets.find((t) => t.url.toLowerCase().includes(pat.urlMatch)) || targets[0];

        if (matchedTarget) {
          suggestions.push({
            sourceContext: snippet,
            suggestedAnchor: pat.anchor,
            targetUrl: matchedTarget.url,
            targetTopic: matchedTarget.topic,
            priority: pat.priority,
            rationale: pat.rationale
          });
        }
      }
    });

    setDraftSuggestions(suggestions);
    setDraftLoading(false);
  };

  const handleDownloadCsv = () => {
    if (!liveLinksData) return;
    const headers = "Category,Target URL,Anchor Text,Rel Attribute\n";
    const internalRows = liveLinksData.internalSamples
      .map((l) => `"Internal","${l.href}","${l.anchorText.replace(/"/g, '""')}","${l.rel}"`)
      .join("\n");
    const externalRows = liveLinksData.externalSamples
      .map((l) => `"External","${l.href}","${l.anchorText.replace(/"/g, '""')}","${l.rel}"`)
      .join("\n");
    const blob = new Blob([headers + internalRows + "\n" + externalRows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `links-inventory-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={() => {
        setLiveLinksData(null);
        setDraftSuggestions(null);
        setErrorMsg(null);
      }}
    >
      <div className="space-y-6">
        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("live")}
            className={`pb-3 px-4 text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
              activeTab === "live"
                ? "border-[#FF5722] text-[#FF5722]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Audit Live Page Internal Links</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("draft")}
            className={`pb-3 px-4 text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
              activeTab === "draft"
                ? "border-[#FF5722] text-[#FF5722]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Internal Link Opportunity Matcher</span>
          </button>
        </div>

        {/* TAB 1: LIVE PAGE LINK EXTRACTOR */}
        {activeTab === "live" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-4">
              <label htmlFor="target-links-url" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                Target Webpage URL to Extract & Audit Links
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="target-links-url"
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/blog-post"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleInspectLiveLinks}
                  disabled={loadingLive || !urlInput.trim()}
                  className="px-6 py-3 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold font-mono transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loadingLive ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Crawling Page...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Extract All Links</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Crawls the live page, separates internal links from outbound links, checks anchor text quality, and validates follow/nofollow attributes.
              </p>
            </div>

            {errorMsg && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {liveLinksData && (
              <div className="space-y-6 animate-fade-in">
                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Internal Links</span>
                    <span className="text-3xl font-extrabold font-mono text-emerald-600 mt-1 block">
                      {liveLinksData.internalCount}
                    </span>
                    <span className="text-[11px] text-slate-500">Links pointing to same domain</span>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Outbound Links</span>
                    <span className="text-3xl font-extrabold font-mono text-slate-900 mt-1 block">
                      {liveLinksData.externalCount}
                    </span>
                    <span className="text-[11px] text-slate-500">External references & citations</span>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Internal Ratio</span>
                    <span className="text-3xl font-extrabold font-mono text-slate-900 mt-1 block">
                      {Math.round((liveLinksData.internalCount / Math.max(1, liveLinksData.internalCount + liveLinksData.externalCount)) * 100)}%
                    </span>
                    <span className="text-[11px] text-emerald-600 font-medium">Topical equity retention</span>
                  </div>
                </div>

                {/* Table of Discovered Links */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
                      Internal Links Discovered ({liveLinksData.internalSamples.length} sampled)
                    </h4>
                    <button
                      type="button"
                      onClick={handleDownloadCsv}
                      className="px-3 py-1.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto max-h-80 border border-slate-100 rounded-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 font-mono border-b border-slate-200 sticky top-0">
                        <tr>
                          <th className="p-3">#</th>
                          <th className="p-3">Anchor Text</th>
                          <th className="p-3">Destination URL</th>
                          <th className="p-3">Rel Attribute</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-sans">
                        {liveLinksData.internalSamples.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                            <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                            <td className="p-3 font-semibold text-slate-900 max-w-xs truncate">{item.anchorText}</td>
                            <td className="p-3 font-mono text-slate-600 max-w-md truncate">{item.href}</td>
                            <td className="p-3 font-mono text-slate-500">{item.rel || "follow (default)"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DRAFT CONTENT OPPORTUNITY FINDER */}
        {activeTab === "draft" && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="draft-article-textarea" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  Draft Article or Page Content
                </label>
                <textarea
                  id="draft-article-textarea"
                  rows={7}
                  value={contentDraft}
                  onChange={(e) => setContentDraft(e.target.value)}
                  className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] leading-relaxed resize-y"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="site-inventory-textarea" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                  Target Inventory (URL | Target Topic)
                </label>
                <textarea
                  id="site-inventory-textarea"
                  rows={7}
                  value={siteInventory}
                  onChange={(e) => setSiteInventory(e.target.value)}
                  className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] leading-relaxed resize-y"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={runDraftAnalysis}
              disabled={draftLoading}
              className="px-6 py-3 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold font-mono transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>Discover Contextual Internal Links</span>
            </button>

            {draftSuggestions && (
              <div className="space-y-4 pt-4 border-t border-slate-200 animate-fade-in">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Recommended Anchor Text & Link Injections ({draftSuggestions.length} found)
                </h4>
                <div className="space-y-3">
                  {draftSuggestions.map((sug, i) => (
                    <div key={i} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2 text-xs">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-bold text-slate-900 text-sm">
                          Anchor: <code className="text-[#FF5722] bg-[#FF5722]/10 px-2 py-0.5 rounded font-mono">"{sug.suggestedAnchor}"</code>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {sug.priority} Priority
                        </span>
                      </div>
                      <p className="text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        {sug.sourceContext}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span className="font-mono truncate max-w-md">Target: {sug.targetUrl}</span>
                        <span>{sug.rationale}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolShell>
  );
}
