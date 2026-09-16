import React, { useState } from "react";
import {
  Compass,
  Copy,
  Download,
  Check,
  RotateCcw,
  Sparkles,
  PieChart,
  Target,
  FileSpreadsheet
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface IntentAnalysis {
  keyword: string;
  intent: "Informational" | "Commercial" | "Transactional" | "Navigational" | "Local" | "Comparison";
  confidence: number;
  serpFeatures: string[];
  recommendedFormat: string;
  suggestedCta: string;
  rationale: string;
}

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function SearchIntentChecker({ tool, onNavigateTool, onNavigateHome }: Props) {
  const [inputKeywords, setInputKeywords] = useState(
    `technical seo audit agency
how to fix cumulative layout shift
best rank tracking software 2025
shopify vs woocommerce for enterprise
hire wordpress speed optimization expert
local dental clinic near me
metazivo official website
core web vitals checklist pdf`
  );

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<IntentAnalysis[] | null>(null);
  const [copied, setCopied] = useState(false);

  const analyzeSingleKeyword = (kw: string): IntentAnalysis => {
    const lower = kw.toLowerCase().trim();

    // Local intent
    if (/near me|in [a-z]+|clinic|dentist|plumber|restaurant|store|shop|office|salon/i.test(lower)) {
      return {
        keyword: kw,
        intent: "Local",
        confidence: 96,
        serpFeatures: ["Google Local 3-Pack", "Google Maps", "Reviews Carousel"],
        recommendedFormat: "Localized Service Landing Page with NAP & Map Embed",
        suggestedCta: "Call Now / Get Local Directions",
        rationale: "Query contains strong local or geographic proximity modifiers."
      };
    }

    // Comparison intent
    if (/\bvs\b|versus|compared|difference between|alternatives to/i.test(lower)) {
      return {
        keyword: kw,
        intent: "Comparison",
        confidence: 94,
        serpFeatures: ["Comparison Table", "People Also Ask", "Bullet Lists"],
        recommendedFormat: "Side-by-Side Comparison Article with Feature Matrix",
        suggestedCta: "Read Winner Recommendation / Try Free Demo",
        rationale: "User is evaluating two distinct platforms or solutions directly."
      };
    }

    // Transactional intent
    if (/buy|hire|price|pricing|cost|quote|services?|agency|expert|consultant|order/i.test(lower)) {
      return {
        keyword: kw,
        intent: "Transactional",
        confidence: 95,
        serpFeatures: ["Google Ads / Sponsored", "SiteLinks", "Review Stars"],
        recommendedFormat: "Conversion-Focused Service or Product Page",
        suggestedCta: "Request Proposal / Book Discovery Call",
        rationale: "High buying intent signals with explicit procurement terminology."
      };
    }

    // Commercial intent
    if (/best|top|review|reviews|software|tools?|cheap|affordable|discount/i.test(lower)) {
      return {
        keyword: kw,
        intent: "Commercial",
        confidence: 90,
        serpFeatures: ["Buying Guide Carousel", "Star Ratings", "Pros & Cons Lists"],
        recommendedFormat: "Curated Round-up Review / Buyer's Guide",
        suggestedCta: "Check Best Price / View In-Depth Review",
        rationale: "User is in the research and evaluation stage before making a purchasing decision."
      };
    }

    // Navigational intent
    if (/login|signin|portal|official|metazivo|github|facebook|stripe/i.test(lower)) {
      return {
        keyword: kw,
        intent: "Navigational",
        confidence: 98,
        serpFeatures: ["Direct Brand Knowledge Panel", "SiteLinks", "Social Profiles"],
        recommendedFormat: "Brand Homepage or Account Portal Entry Page",
        suggestedCta: "Direct Login / Portal Access",
        rationale: "User has a specific brand destination in mind."
      };
    }

    // Default: Informational
    return {
      keyword: kw,
      intent: "Informational",
      confidence: 88,
      serpFeatures: ["Featured Snippet (Paragraph/List)", "People Also Ask", "Video Guides"],
      recommendedFormat: "Comprehensive How-To Guide / Pillar Educational Article",
      suggestedCta: "Download Free Guide / Subscribe to Insights",
      rationale: "User seeks knowledge, instructions, definitions, or troubleshooting steps."
    };
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      const lines = inputKeywords
        .split(/[\r\n]+/)
        .map((l) => l.trim())
        .filter(Boolean);

      const analyzed = lines.map(analyzeSingleKeyword);
      setResults(analyzed);
      setLoading(false);
    }, 350);
  };

  const handleReset = () => {
    setInputKeywords("");
    setResults(null);
  };

  const handleCopy = () => {
    if (!results) return;
    const text = results
      .map(
        (r) =>
          `Keyword: ${r.keyword}\nIntent: ${r.intent} (${r.confidence}% confidence)\nFormat: ${r.recommendedFormat}\nSERP Features: ${r.serpFeatures.join(", ")}\nCTA: ${r.suggestedCta}\n`
      )
      .join("\n---\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!results) return;
    let csv = "Keyword,Search Intent,Confidence,Recommended Format,SERP Features,Suggested CTA,Rationale\n";
    results.forEach((r) => {
      csv += `"${r.keyword}","${r.intent}",${r.confidence}%,"${r.recommendedFormat}","${r.serpFeatures.join("; ")}","${r.suggestedCta}","${r.rationale}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `search-intent-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Intent distribution stats
  const intentCounts = results?.reduce((acc, r) => {
    acc[r.intent] = (acc[r.intent] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={results ? handleReset : undefined}
    >
      <div className="space-y-8">
        {/* Keywords Input Area */}
        <div className="space-y-3">
          <label htmlFor="intent-keywords-input" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
            Enter Keywords to Analyze (One per line)
          </label>
          <textarea
            id="intent-keywords-input"
            rows={6}
            value={inputKeywords}
            onChange={(e) => setInputKeywords(e.target.value)}
            placeholder="hire seo agency&#10;how to fix 404 errors&#10;best cms for seo..."
            className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] transition-all"
          />

          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Classifies into Informational, Commercial, Transactional, Navigational, Local, & Comparison.
            </span>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading || !inputKeywords.trim()}
              className="px-6 py-3 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Classifying Psychological Intent...</span>
                </>
              ) : (
                <>
                  <Compass className="w-4 h-4" />
                  <span>Analyze Search Intent</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Presentation */}
        {results && (
          <div className="space-y-6 pt-4 border-t border-slate-200/80 animate-fade-in">
            {/* Intent Distribution Strip */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Search Intent Distribution ({results.length} queries)
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copied ? "Copied" : "Copy Report"}</span>
                  </button>
                  <button
                    onClick={handleDownloadCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-slate-400" />
                    <span>Download CSV</span>
                  </button>
                </div>
              </div>

              {/* Badges Distribution */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(intentCounts).map(([intentName, count]) => {
                  const pct = Math.round((count / results.length) * 100);
                  return (
                    <div
                      key={intentName}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2 text-xs"
                    >
                      <span className="font-semibold text-slate-800">{intentName}</span>
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                        {count} ({pct}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Analyzed Queries List */}
            <div className="space-y-3">
              {results.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 transition-all space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h4 className="text-sm font-bold text-slate-900 font-sans">
                      {item.keyword}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${
                          item.intent === "Transactional"
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : item.intent === "Commercial"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : item.intent === "Local"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : item.intent === "Comparison"
                            ? "bg-orange-50 text-orange-700 border-orange-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        {item.intent} Intent
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {item.confidence}% match
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    <strong className="text-slate-800">Psychological Rationale:</strong> {item.rationale}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                        Recommended Format
                      </span>
                      <p className="font-semibold text-slate-800 text-[11px] leading-snug">
                        {item.recommendedFormat}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                        SERP Target Features
                      </span>
                      <p className="font-semibold text-slate-800 text-[11px] leading-snug">
                        {item.serpFeatures.join(", ")}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                        High-Converting CTA
                      </span>
                      <p className="font-semibold text-slate-800 text-[11px] leading-snug">
                        {item.suggestedCta}
                      </p>
                    </div>
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
