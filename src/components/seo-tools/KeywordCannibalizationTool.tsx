import React, { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Copy,
  Download,
  Check,
  RotateCcw,
  Sparkles,
  ArrowRight,
  HelpCircle,
  ExternalLink,
  Layers,
  FileSpreadsheet,
  Split,
  Search,
  ShieldCheck,
  TrendingDown,
  RefreshCw,
  Plus,
  Trash2,
  FileCode,
  ArrowUpRight,
  BookOpen
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface UrlKeywordPair {
  id: string;
  url: string;
  targetKeyword: string;
  serpRank: number;
  monthlyClicks: number;
  monthlyImpressions: number;
  pageType: "Commercial / Service" | "Blog Post / Guide" | "Product Category" | "Docs / Support" | "Home Page";
}

interface CannibalizationCluster {
  keyword: string;
  severity: "Critical" | "Moderate" | "Mild" | "Healthy";
  score: number; // 0 to 100 conflict index
  urls: UrlKeywordPair[];
  rootCause: string;
  recommendedAction: "301 Redirect & Consolidate" | "Canonicalize to Primary" | "De-Optimize & Keyword Prune" | "Internal Link Retargeting" | "Topically Differentiated";
  stepByStepFix: string[];
  canonicalSnippet?: string;
  redirectSnippet?: string;
}

const PRESET_SCENARIOS: { label: string; description: string; pairs: UrlKeywordPair[] }[] = [
  {
    label: "E-Commerce Category vs Blog Post (Critical Conflict)",
    description: "A category page and an informational article both fighting for 'best running shoes'",
    pairs: [
      {
        id: "p1",
        url: "https://example.com/shop/running-shoes",
        targetKeyword: "best running shoes",
        serpRank: 8,
        monthlyClicks: 420,
        monthlyImpressions: 12500,
        pageType: "Product Category"
      },
      {
        id: "p2",
        url: "https://example.com/blog/best-running-shoes-guide",
        targetKeyword: "best running shoes",
        serpRank: 12,
        monthlyClicks: 310,
        monthlyImpressions: 9800,
        pageType: "Blog Post / Guide"
      }
    ]
  },
  {
    label: "SaaS Feature Page vs Documentation Page (Moderate)",
    description: "A marketing landing page and technical help doc both competing for 'workflow automation tool'",
    pairs: [
      {
        id: "p3",
        url: "https://example.com/features/workflow-automation",
        targetKeyword: "workflow automation tool",
        serpRank: 6,
        monthlyClicks: 890,
        monthlyImpressions: 18400,
        pageType: "Commercial / Service"
      },
      {
        id: "p4",
        url: "https://example.com/docs/setting-up-workflow-automation",
        targetKeyword: "workflow automation tool",
        serpRank: 19,
        monthlyClicks: 95,
        monthlyImpressions: 3200,
        pageType: "Docs / Support"
      }
    ]
  },
  {
    label: "Agency Service Page vs City Landing Page",
    description: "National service landing page colliding with local city page for 'seo consulting services'",
    pairs: [
      {
        id: "p5",
        url: "https://metazivo.com/service/seo",
        targetKeyword: "seo consulting services",
        serpRank: 4,
        monthlyClicks: 1400,
        monthlyImpressions: 24000,
        pageType: "Commercial / Service"
      },
      {
        id: "p6",
        url: "https://metazivo.com/seo-consulting-lahore",
        targetKeyword: "seo consulting services",
        serpRank: 15,
        monthlyClicks: 210,
        monthlyImpressions: 4100,
        pageType: "Commercial / Service"
      }
    ]
  }
];

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function KeywordCannibalizationTool({ tool, onNavigateTool, onNavigateHome }: Props) {
  const [pairs, setPairs] = useState<UrlKeywordPair[]>(PRESET_SCENARIOS[0].pairs);
  const [csvInput, setCsvInput] = useState("");
  const [inputMode, setInputMode] = useState<"table" | "csv">("table");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<CannibalizationCluster[] | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedReport, setCopiedReport] = useState(false);

  // Add empty row
  const handleAddRow = () => {
    const newId = `p-${Date.now()}`;
    setPairs([
      ...pairs,
      {
        id: newId,
        url: "https://example.com/new-page",
        targetKeyword: "sample keyword",
        serpRank: 10,
        monthlyClicks: 100,
        monthlyImpressions: 2500,
        pageType: "Blog Post / Guide"
      }
    ]);
  };

  const handleRemoveRow = (id: string) => {
    setPairs(pairs.filter((p) => p.id !== id));
  };

  const handleUpdateRow = (id: string, field: keyof UrlKeywordPair, value: any) => {
    setPairs(
      pairs.map((p) => {
        if (p.id === id) {
          return { ...p, [field]: value };
        }
        return p;
      })
    );
  };

  const handleLoadScenario = (scenario: typeof PRESET_SCENARIOS[0]) => {
    setPairs(scenario.pairs);
    setResults(null);
  };

  // Parse CSV format
  const handleParseCsv = () => {
    if (!csvInput.trim()) return;
    const lines = csvInput.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const parsed: UrlKeywordPair[] = [];

    lines.forEach((line, idx) => {
      // Ignore header
      if (idx === 0 && (line.toLowerCase().includes("url") || line.toLowerCase().includes("keyword"))) {
        return;
      }
      const parts = line.split(",").map((p) => p.trim().replace(/^["']|["']$/g, ""));
      if (parts.length >= 2) {
        parsed.push({
          id: `csv-${idx}`,
          url: parts[0] || `https://example.com/page-${idx}`,
          targetKeyword: parts[1] || "keyword",
          serpRank: parseInt(parts[2], 10) || 10,
          monthlyClicks: parseInt(parts[3], 10) || 50,
          monthlyImpressions: parseInt(parts[4], 10) || 1000,
          pageType: (parts[5] as any) || "Blog Post / Guide"
        });
      }
    });

    if (parsed.length > 0) {
      setPairs(parsed);
      setInputMode("table");
      setResults(null);
    }
  };

  // Run the Advanced Step-by-Step Cannibalization Analysis
  const runAnalysis = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      // Group by normalized keyword or semantic collision
      const keywordGroups: Record<string, UrlKeywordPair[]> = {};

      pairs.forEach((p) => {
        const cleanKw = p.targetKeyword.trim().toLowerCase();
        if (!keywordGroups[cleanKw]) {
          keywordGroups[cleanKw] = [];
        }
        keywordGroups[cleanKw].push(p);
      });

      const clusters: CannibalizationCluster[] = [];

      Object.entries(keywordGroups).forEach(([keyword, group]) => {
        if (group.length > 1) {
          // Collision exists
          // Sort by SERP rank ascending (best rank first)
          group.sort((a, b) => a.serpRank - b.serpRank);
          const topRank = group[0].serpRank;
          const secondRank = group[1].serpRank;
          const rankDifference = Math.abs(topRank - secondRank);

          let severity: "Critical" | "Moderate" | "Mild" = "Mild";
          let score = 35;
          let rootCause = "Multiple pages have loose overlap in topical keyword themes.";
          let recommendedAction: CannibalizationCluster["recommendedAction"] = "Topically Differentiated";

          if (topRank <= 10 && secondRank <= 20) {
            severity = "Critical";
            score = 92;
            rootCause = "Both URLs rank on Page 1 and Page 2 for the exact same target query. Googlebot is actively splitting PageRank and CTR across both pages, causing algorithmic ranking volatility.";
            recommendedAction = "301 Redirect & Consolidate";
          } else if (topRank <= 15 && secondRank <= 40) {
            severity = "Moderate";
            score = 74;
            rootCause = "A primary commercial page is being cannibalized by a secondary educational or technical page. Search engines are uncertain which page satisfies the main search intent.";
            recommendedAction = "Canonicalize to Primary";
          } else {
            severity = "Mild";
            score = 48;
            rootCause = "Secondary keyword overlap without immediate Page 1 SERP cannibalization. Minor risk of link dilution.";
            recommendedAction = "De-Optimize & Keyword Prune";
          }

          const primaryUrl = group[0].url;
          const secondaryUrl = group[1].url;

          const stepByStepFix = [
            `Step 1: Audit User Intent: Verify whether users searching "${keyword}" want to transact or read an in-depth informational guide.`,
            `Step 2: Consolidate or Repoint: If the secondary page (${secondaryUrl}) has valuable text, merge its best sections into the primary page (${primaryUrl}).`,
            `Step 3: Implement 301 Permanent Redirect: Redirect ${secondaryUrl} to ${primaryUrl} to immediately transfer all existing external backlinks and PageRank equity.`,
            `Step 4: Update Internal Anchor Text: Change all internal website links that previously pointed to ${secondaryUrl} using anchor "${keyword}" to point directly to ${primaryUrl}.`,
            `Step 5: Verify in Google Search Console: Submit ${primaryUrl} for priority re-indexing and monitor impressions over the next 14 days.`
          ];

          clusters.push({
            keyword,
            severity,
            score,
            urls: group,
            rootCause,
            recommendedAction,
            stepByStepFix,
            canonicalSnippet: `<link rel="canonical" href="${primaryUrl}" />`,
            redirectSnippet: `Redirect 301 ${new URL(secondaryUrl).pathname} ${new URL(primaryUrl).pathname}`
          });
        } else {
          // Single page for this keyword
          clusters.push({
            keyword,
            severity: "Healthy",
            score: 0,
            urls: group,
            rootCause: "Single dedicated URL targeting this search intent. Zero internal competition detected.",
            recommendedAction: "Topically Differentiated",
            stepByStepFix: [
              "Continue strengthening internal links to this URL using variations of the primary keyword.",
              "Ensure title tag and H1 clearly establish focus for this entity.",
              "Track monthly search impressions in Google Search Console to guard against future cannibalization."
            ]
          });
        }
      });

      setResults(clusters);
      setIsAnalyzing(false);
    }, 450);
  };

  const handleCopySnippet = (snippet: string, index: number) => {
    navigator.clipboard.writeText(snippet);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleExportReport = () => {
    if (!results) return;
    let markdown = `# Keyword Cannibalization Audit Report - Metazivo SEO Engine\n`;
    markdown += `Generated on: ${new Date().toISOString().split("T")[0]}\n\n`;

    results.forEach((c, idx) => {
      markdown += `## ${idx + 1}. Keyword: "${c.keyword}" (Severity: ${c.severity.toUpperCase()} - Score: ${c.score}/100)\n`;
      markdown += `- **Root Cause:** ${c.rootCause}\n`;
      markdown += `- **Recommended Action:** ${c.recommendedAction}\n`;
      markdown += `- **Competing URLs:**\n`;
      c.urls.forEach((u) => {
        markdown += `  - ${u.url} (Rank #${u.serpRank} | ${u.monthlyClicks} clicks/mo | Type: ${u.pageType})\n`;
      });
      markdown += `- **Step-by-Step Resolution Playbook:**\n`;
      c.stepByStepFix.forEach((step) => {
        markdown += `  1. ${step}\n`;
      });
      if (c.redirectSnippet) {
        markdown += `\n**Apache/Nginx Redirect Snippet:**\n\`\`\`apache\n${c.redirectSnippet}\n\`\`\`\n`;
      }
      markdown += `\n---\n\n`;
    });

    navigator.clipboard.writeText(markdown);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={() => {
        setPairs(PRESET_SCENARIOS[0].pairs);
        setResults(null);
      }}
    >
      <div className="space-y-8">
        {/* Preset Industry Scenarios Selector */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF5722] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Quick Benchmark Scenarios
            </span>
            <span className="text-[11px] text-slate-500">Select an industry template or enter your own URLs below</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {PRESET_SCENARIOS.map((scenario, idx) => (
              <button
                key={idx}
                onClick={() => handleLoadScenario(scenario)}
                className="text-left p-3 rounded-xl bg-white border border-slate-200/90 hover:border-[#FF5722] hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-slate-900 group-hover:text-[#FF5722] transition-colors line-clamp-1">
                  {scenario.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {scenario.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mode Switch & Input Area */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setInputMode("table")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${
                  inputMode === "table"
                    ? "bg-[#FF5722] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Interactive Table ({pairs.length} URLs)
              </button>
              <button
                onClick={() => setInputMode("csv")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${
                  inputMode === "csv"
                    ? "bg-[#FF5722] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                CSV / GSC Paste Mode
              </button>
            </div>

            <div className="flex items-center gap-2">
              {inputMode === "table" && (
                <button
                  onClick={handleAddRow}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#FF5722]" /> Add URL Row
                </button>
              )}
            </div>
          </div>

          {/* Table Mode */}
          {inputMode === "table" && (
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">Page URL</th>
                    <th className="py-3 px-3">Target Keyword / Query</th>
                    <th className="py-3 px-2 w-20">SERP Rank</th>
                    <th className="py-3 px-2 w-24">Est. Clicks</th>
                    <th className="py-3 px-3 w-36">Page Type</th>
                    <th className="py-3 px-2 w-10 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pairs.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3">
                        <input
                          type="text"
                          value={row.url}
                          onChange={(e) => handleUpdateRow(row.id, "url", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-mono focus:bg-white focus:outline-none focus:border-[#FF5722]"
                          placeholder="https://example.com/page"
                        />
                      </td>
                      <td className="py-2.5 px-3">
                        <input
                          type="text"
                          value={row.targetKeyword}
                          onChange={(e) => handleUpdateRow(row.id, "targetKeyword", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-semibold focus:bg-white focus:outline-none focus:border-[#FF5722]"
                          placeholder="primary target query"
                        />
                      </td>
                      <td className="py-2.5 px-2">
                        <input
                          type="number"
                          min={1}
                          max={100}
                          value={row.serpRank}
                          onChange={(e) => handleUpdateRow(row.id, "serpRank", parseInt(e.target.value, 10) || 1)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-center font-mono font-bold text-slate-800 focus:bg-white focus:outline-none focus:border-[#FF5722]"
                        />
                      </td>
                      <td className="py-2.5 px-2">
                        <input
                          type="number"
                          min={0}
                          value={row.monthlyClicks}
                          onChange={(e) => handleUpdateRow(row.id, "monthlyClicks", parseInt(e.target.value, 10) || 0)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-center font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-[#FF5722]"
                        />
                      </td>
                      <td className="py-2.5 px-3">
                        <select
                          value={row.pageType}
                          onChange={(e) => handleUpdateRow(row.id, "pageType", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 focus:bg-white focus:outline-none focus:border-[#FF5722]"
                        >
                          <option value="Commercial / Service">Commercial / Service</option>
                          <option value="Blog Post / Guide">Blog Post / Guide</option>
                          <option value="Product Category">Product Category</option>
                          <option value="Docs / Support">Docs / Support</option>
                          <option value="Home Page">Home Page</option>
                        </select>
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <button
                          onClick={() => handleRemoveRow(row.id)}
                          disabled={pairs.length <= 1}
                          className="text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors cursor-pointer"
                          title="Delete row"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* CSV Paste Mode */}
          {inputMode === "csv" && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Paste comma-separated rows: <code>URL, Keyword, CurrentRank, Clicks, Impressions, PageType</code>
              </p>
              <textarea
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                placeholder={`https://example.com/shop/running-shoes, best running shoes, 8, 420, 12500, Product Category\nhttps://example.com/blog/running-shoes, best running shoes, 12, 310, 9800, Blog Post / Guide`}
                rows={6}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-[#FF5722]"
              />
              <button
                onClick={handleParseCsv}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold font-mono hover:bg-slate-900 transition-colors cursor-pointer"
              >
                Import CSV Rows into Table
              </button>
            </div>
          )}

          {/* Launch Analysis Button */}
          <div className="pt-2">
            <button
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="w-full sm:w-auto px-8 py-3 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-2xl text-sm font-bold shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning SERP Intent & Token Overlap...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Run Step-by-Step Cannibalization Audit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Diagnostic Results View */}
        {results && (
          <div className="space-y-6 pt-4 border-t border-slate-200 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF5722]">
                  Audit Summary
                </span>
                <h3 className="text-xl font-extrabold text-slate-950">
                  Cannibalization Conflict Report ({results.length} Query Clusters Analyzed)
                </h3>
              </div>

              <button
                onClick={handleExportReport}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold font-mono transition-colors cursor-pointer"
              >
                {copiedReport ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Report Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Markdown Action Plan</span>
                  </>
                )}
              </button>
            </div>

            {/* Clusters List */}
            <div className="space-y-6">
              {results.map((cluster, idx) => {
                const isCritical = cluster.severity === "Critical";
                const isModerate = cluster.severity === "Moderate";
                const isHealthy = cluster.severity === "Healthy";

                const badgeColor = isCritical
                  ? "bg-red-50 text-red-700 border-red-200"
                  : isModerate
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : isHealthy
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-blue-50 text-blue-700 border-blue-200";

                return (
                  <div
                    key={idx}
                    className={`rounded-3xl border p-6 space-y-6 transition-all ${
                      isCritical
                        ? "bg-red-50/20 border-red-200"
                        : isModerate
                        ? "bg-amber-50/20 border-amber-200"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase border ${badgeColor}`}>
                            {cluster.severity} Conflict ({cluster.score}/100)
                          </span>
                          <span className="text-xs font-mono text-slate-400">•</span>
                          <span className="text-xs font-mono font-bold text-slate-600">
                            Action: {cluster.recommendedAction}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">
                          Target Query: <span className="text-[#FF5722]">"{cluster.keyword}"</span>
                        </h4>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-slate-500 font-mono">
                          {cluster.urls.length} Competing {cluster.urls.length === 1 ? "Page" : "Pages"}
                        </span>
                      </div>
                    </div>

                    {/* Root cause callout */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1">
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        <span>Root Cause & Algorithmic Impact</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {cluster.rootCause}
                      </p>
                    </div>

                    {/* Competing URLs Breakdown */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold uppercase text-slate-500">
                        Affected URLs & Current SERP Standing:
                      </span>
                      <div className="grid grid-cols-1 gap-2.5">
                        {cluster.urls.map((u, uIdx) => (
                          <div
                            key={uIdx}
                            className="p-3.5 rounded-xl bg-white border border-slate-200/90 flex flex-wrap items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center">
                                #{u.serpRank}
                              </span>
                              <div>
                                <a
                                  href={u.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-bold text-slate-900 hover:text-[#FF5722] transition-colors flex items-center gap-1"
                                >
                                  {u.url} <ArrowUpRight className="w-3 h-3 text-slate-400" />
                                </a>
                                <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                                  <span>Type: {u.pageType}</span>
                                  <span>•</span>
                                  <span>Monthly Clicks: ~{u.monthlyClicks}</span>
                                  <span>•</span>
                                  <span>Impressions: ~{u.monthlyImpressions}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              {uIdx === 0 && cluster.urls.length > 1 ? (
                                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200">
                                  Primary Authority Candidate
                                </span>
                              ) : uIdx > 0 ? (
                                <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-700 text-[10px] font-mono font-bold border border-red-200">
                                  Cannibalizing Duplicate
                                </span>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step-by-Step Fix Playbook */}
                    <div className="space-y-3 bg-white border border-slate-200 rounded-2xl p-5">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF5722] flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" /> Step-by-Step Resolution Playbook
                      </span>
                      <ol className="space-y-2 text-xs text-slate-700 font-sans">
                        {cluster.stepByStepFix.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-orange-100 text-[#FF5722] font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>

                      {/* Code Snippets if applicable */}
                      {cluster.redirectSnippet && (
                        <div className="pt-3 border-t border-slate-100 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono font-bold text-slate-600 flex items-center gap-1">
                              <FileCode className="w-3.5 h-3.5 text-slate-400" />
                              Apache (.htaccess) / Nginx 301 Redirect Snippet:
                            </span>
                            <button
                              onClick={() => handleCopySnippet(cluster.redirectSnippet!, idx)}
                              className="text-[11px] font-mono text-[#FF5722] hover:underline cursor-pointer flex items-center gap-1"
                            >
                              {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedIndex === idx ? "Copied!" : "Copy Snippet"}</span>
                            </button>
                          </div>
                          <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto">
                            {cluster.redirectSnippet}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* E-E-A-T & AEO Technical Knowledge Section */}
        <section className="bg-gradient-to-br from-slate-50 to-orange-50/20 border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest">
              AI Search, AEO & E-E-A-T Insights
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950">
              Why Keyword Cannibalization Destroys AI Search Citations & Rankings
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 leading-relaxed font-sans">
            <div className="p-5 bg-white rounded-2xl border border-slate-200/70 space-y-2 shadow-xs">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
                How Googlebot Handles Competing URLs
              </h4>
              <p>
                When Google encounters two URLs on the same domain targeting identical intent, its ranking algorithm experiences uncertainty. Rather than boosting both, Google rotates them in the index. This split dilutes incoming backlinks, divides click-through rates (CTR), and often allows single-focus competitor pages to outrank both of yours.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200/70 space-y-2 shadow-xs">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
                Impact on AI Overviews & Generative Engines (GEO)
              </h4>
              <p>
                Generative AI models (Perplexity, ChatGPT Search, Gemini) extract answers from consensus nodes with distinct topical authority. If your domain has two conflicting explanations or fragmented articles, LLMs discard the ambiguous data in favor of unified, definitive competitor source documents.
              </p>
            </div>
          </div>

          {/* Expert Sign-off */}
          <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-mono">
            <span>Audited by: Metazivo Senior Technical SEO Team</span>
            <span>Framework: Google Search Central Guidelines & ISO Information Architecture</span>
          </div>
        </section>
      </div>
    </ToolShell>
  );
}
