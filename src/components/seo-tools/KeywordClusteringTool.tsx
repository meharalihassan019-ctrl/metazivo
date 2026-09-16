import React, { useState } from "react";
import {
  Network,
  Sparkles,
  Copy,
  Download,
  Check,
  RotateCcw,
  ArrowRight,
  Filter,
  Layers,
  FileSpreadsheet
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface ClusterResult {
  clusterName: string;
  primaryKeyword: string;
  intent: "Informational" | "Commercial" | "Transactional" | "Navigational" | "Comparison";
  suggestedPageType: string;
  suggestedSlug: string;
  keywords: string[];
}

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function KeywordClusteringTool({ tool, onNavigateTool, onNavigateHome }: Props) {
  const [inputText, setInputText] = useState(
    `technical seo audit checklist
how to do technical seo audit
best technical seo audit tools
hire technical seo agency
ecommerce seo audit service
local seo audit guide
shopify technical seo checklist
b2b saas seo audit
website speed optimization services
how to improve core web vitals
schema markup generator online
how to generate faq schema
json ld schema generator for local business
keyword clustering tool free
best keyword grouping algorithms
topical map generator for content clusters`
  );

  const [minClusterSize, setMinClusterSize] = useState<number>(2);
  const [loading, setLoading] = useState(false);
  const [clusters, setClusters] = useState<ClusterResult[] | null>(null);
  const [unclustered, setUnclustered] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Common SEO stopwords to ignore when finding semantic cluster centroids
  const STOPWORDS = new Set([
    "the", "a", "an", "and", "or", "in", "on", "at", "for", "with", "about",
    "by", "to", "from", "of", "is", "are", "how", "what", "why", "where", "can", "do"
  ]);

  const detectIntent = (kw: string): "Informational" | "Commercial" | "Transactional" | "Navigational" | "Comparison" => {
    const lower = kw.toLowerCase();
    if (/buy|hire|price|pricing|cost|quote|service|services|agency|order|shop/i.test(lower)) {
      return "Transactional";
    }
    if (/best|top|review|reviews|vs|versus|compare|comparison|alternative|alternatives|free/i.test(lower)) {
      return "Commercial";
    }
    if (/login|signin|portal|official website|metazivo/i.test(lower)) {
      return "Navigational";
    }
    if (/vs|versus|compared/i.test(lower)) {
      return "Comparison";
    }
    return "Informational";
  };

  const getSuggestedPageType = (intent: string, clusterName: string): string => {
    if (intent === "Transactional") return "Service / Sales Landing Page";
    if (intent === "Commercial") return "Comparison Guide / Buyer's Evaluation";
    if (clusterName.includes("checklist") || clusterName.includes("guide")) return "Pillar Guide / Comprehensive Resource";
    if (clusterName.includes("tool") || clusterName.includes("generator")) return "Interactive SaaS Utility Page";
    return "Deep-Dive Editorial Article";
  };

  const runClustering = () => {
    setLoading(true);
    setTimeout(() => {
      const rawLines = inputText
        .split(/[\r\n,]+/)
        .map((l) => l.trim().toLowerCase())
        .filter((l) => l.length > 2);

      // Deduplicate
      const uniqueKeywords = Array.from(new Set(rawLines));

      // Extract meaningful tokens
      const wordFrequency: Record<string, number> = {};
      const keywordTokens: Record<string, string[]> = {};

      uniqueKeywords.forEach((kw) => {
        const tokens = kw
          .split(/\s+/)
          .map((w) => w.replace(/[^a-z0-9]/g, ""))
          .filter((w) => w.length > 2 && !STOPWORDS.has(w));

        keywordTokens[kw] = tokens;
        tokens.forEach((t) => {
          wordFrequency[t] = (wordFrequency[t] || 0) + 1;
        });
      });

      // Find strongest 2-word bi-grams and top root words
      const bigramFrequency: Record<string, number> = {};
      uniqueKeywords.forEach((kw) => {
        const tokens = keywordTokens[kw] || [];
        for (let i = 0; i < tokens.length - 1; i++) {
          const bg = `${tokens[i]} ${tokens[i + 1]}`;
          bigramFrequency[bg] = (bigramFrequency[bg] || 0) + 1;
        }
      });

      // Seed candidate cluster topics (bigrams first, then high-freq single terms)
      const candidateTopics = Object.entries(bigramFrequency)
        .filter(([_, count]) => count >= minClusterSize)
        .sort((a, b) => b[1] - a[1])
        .map(([bg]) => bg);

      Object.entries(wordFrequency)
        .filter(([_, count]) => count >= minClusterSize)
        .sort((a, b) => b[1] - a[1])
        .forEach(([word]) => {
          if (!candidateTopics.some((ct) => ct.includes(word))) {
            candidateTopics.push(word);
          }
        });

      const assignedKeywords = new Set<string>();
      const formedClusters: ClusterResult[] = [];

      candidateTopics.forEach((topic) => {
        const topicWords = topic.split(" ");
        const matchedKeywords = uniqueKeywords.filter((kw) => {
          if (assignedKeywords.has(kw)) return false;
          return topicWords.every((tw) => kw.includes(tw));
        });

        if (matchedKeywords.length >= minClusterSize) {
          matchedKeywords.forEach((k) => assignedKeywords.add(k));

          // Select primary keyword (shortest or highest commercial/editorial intent)
          const sortedByLength = [...matchedKeywords].sort((a, b) => a.length - b.length);
          const primary = sortedByLength[0];
          const intent = detectIntent(primary);
          const suggestedSlug = primary.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          const pageType = getSuggestedPageType(intent, topic);

          formedClusters.push({
            clusterName: topic.toUpperCase(),
            primaryKeyword: primary,
            intent,
            suggestedPageType: pageType,
            suggestedSlug,
            keywords: matchedKeywords
          });
        }
      });

      const unclusteredList = uniqueKeywords.filter((kw) => !assignedKeywords.has(kw));

      setClusters(formedClusters);
      setUnclustered(unclusteredList);
      setLoading(false);
    }, 400);
  };

  const handleReset = () => {
    setInputText("");
    setClusters(null);
    setUnclustered([]);
  };

  const handleCopyMarkdown = () => {
    if (!clusters) return;
    let md = "# KEYWORD CLUSTERING REPORT\n\n";
    clusters.forEach((c) => {
      md += `## Cluster: ${c.clusterName}\n`;
      md += `- **Primary Keyword:** ${c.primaryKeyword}\n`;
      md += `- **Search Intent:** ${c.intent}\n`;
      md += `- **Suggested Page Type:** ${c.suggestedPageType}\n`;
      md += `- **Recommended Slug:** /${c.suggestedSlug}\n`;
      md += `- **Variations (${c.keywords.length}):**\n`;
      c.keywords.forEach((k) => {
        md += `  - ${k}\n`;
      });
      md += "\n";
    });
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!clusters) return;
    let csv = "Cluster,Primary Keyword,Search Intent,Suggested Page Type,Recommended Slug,Keyword Variations\n";
    clusters.forEach((c) => {
      const vars = `"${c.keywords.join("; ")}"`;
      csv += `"${c.clusterName}","${c.primaryKeyword}","${c.intent}","${c.suggestedPageType}","/${c.suggestedSlug}",${vars}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `keyword-clusters-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={clusters ? handleReset : undefined}
    >
      <div className="space-y-8">
        {/* Input Area */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label htmlFor="keywords-textarea" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
              Paste Keywords (One per line or comma-separated)
            </label>
            <span className="text-xs text-slate-400 font-mono">
              {inputText.split(/[\r\n,]+/).filter((k) => k.trim()).length} keywords entered
            </span>
          </div>

          <textarea
            id="keywords-textarea"
            rows={7}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="seo audit checklist&#10;technical seo guide&#10;hire seo agency..."
            className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] transition-all"
          />

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700">Min Cluster Size:</span>
              <div className="inline-flex gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs font-mono">
                {[2, 3, 4].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setMinClusterSize(size)}
                    className={`px-3 py-1 rounded cursor-pointer transition-colors ${
                      minClusterSize === size ? "bg-[#FF5722] text-white font-bold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {size}+
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={runClustering}
              disabled={loading || !inputText.trim()}
              className="px-6 py-2.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Clustering Semantics...</span>
                </>
              ) : (
                <>
                  <Network className="w-3.5 h-3.5" />
                  <span>Generate Topical Clusters</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results View */}
        {clusters && (
          <div className="space-y-6 pt-4 border-t border-slate-200/80 animate-fade-in">
            {/* Action buttons & stats */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400">Total Clusters:</span>{" "}
                  <strong className="text-slate-900">{clusters.length}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Clustered Keywords:</span>{" "}
                  <strong className="text-emerald-700">
                    {clusters.reduce((acc, c) => acc + c.keywords.length, 0)}
                  </strong>
                </div>
                {unclustered.length > 0 && (
                  <div>
                    <span className="text-slate-400">Unclustered:</span>{" "}
                    <strong className="text-amber-700">{unclustered.length}</strong>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyMarkdown}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? "Copied Markdown" : "Copy Markdown"}</span>
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

            {/* Clusters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clusters.map((cluster, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-[#FF5722] bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100 uppercase tracking-wider">
                        {cluster.clusterName}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        cluster.intent === "Transactional"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : cluster.intent === "Commercial"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}>
                        {cluster.intent} Intent
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] text-slate-400 font-mono uppercase font-semibold">
                        Primary Target Keyword
                      </span>
                      <p className="text-sm font-bold text-slate-900">
                        {cluster.primaryKeyword}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                      <div className="text-slate-500 flex items-center justify-between">
                        <span>Format:</span>
                        <strong className="text-slate-800">{cluster.suggestedPageType}</strong>
                      </div>
                      <div className="text-slate-500 flex items-center justify-between">
                        <span>URL Slug:</span>
                        <span className="font-mono text-slate-800">/{cluster.suggestedSlug}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] text-slate-400 font-mono uppercase font-semibold">
                        Secondary Long-Tails ({cluster.keywords.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cluster.keywords.map((kw, kidx) => (
                          <span
                            key={kidx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-sans"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Unclustered terms */}
            {unclustered.length > 0 && (
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-600">
                  Unclustered Standalone Keywords ({unclustered.length})
                </h4>
                <p className="text-xs text-slate-500">
                  These keywords did not meet the minimum cluster threshold ({minClusterSize}+). Treat them as standalone micro-topics or expand their keyword set.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {unclustered.map((kw, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-600">
                      {kw}
                    </span>
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
