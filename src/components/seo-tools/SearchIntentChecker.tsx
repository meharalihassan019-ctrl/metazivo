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
  FileSpreadsheet,
  Globe,
  Search,
  ExternalLink,
  CheckCircle2,
  XCircle
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
  const [activeMode, setActiveMode] = useState<"keywords" | "urlCrawl">("keywords");

  // Keyword list input
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

  // Live URL Crawler input
  const [urlInput, setUrlInput] = useState("https://metazivo.com");
  const [crawledPageTitle, setCrawledPageTitle] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<IntentAnalysis[] | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  // Instant deterministic calculation (zero fake timer)
  const handleAnalyzeKeywords = () => {
    const lines = inputKeywords
      .split(/[\r\n]+/)
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length === 0) return;
    setCrawledPageTitle(null);
    setResults(lines.map(analyzeSingleKeyword));
  };

  // Live URL Search Intent Crawler
  const handleCrawlAndAnalyzeUrl = async () => {
    if (!urlInput.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setCrawledPageTitle(null);

    let target = urlInput.trim();
    if (!/^https?:\/\//i.test(target)) target = "https://" + target;

    try {
      const resp = await fetch("/api/seo-tools/live-page-inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Failed to inspect remote URL");

      // Extract heading texts and title
      const extractedQueries: string[] = [];
      if (data.headings?.items) {
        data.headings.items.forEach((h: any) => {
          if (h.text && h.text.length > 5 && h.text.length < 80) {
            extractedQueries.push(h.text);
          }
        });
      }

      if (extractedQueries.length === 0 && data.domain) {
        extractedQueries.push(data.domain);
      }

      setCrawledPageTitle(data.domain ? `${data.domain} (${data.headings?.total || 0} headings analyzed)` : target);
      setResults(extractedQueries.slice(0, 15).map(analyzeSingleKeyword));
    } catch (e: any) {
      setErrorMsg(e.message || "Failed to inspect page intent.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInputKeywords("");
    setResults(null);
    setCrawledPageTitle(null);
    setErrorMsg(null);
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
    const header = "Keyword,Intent,Confidence,SERP Features,Recommended Format,Suggested CTA\n";
    const rows = results
      .map(
        (r) =>
          `"${r.keyword.replace(/"/g, '""')}","${r.intent}","${r.confidence}%","${r.serpFeatures.join("; ")}","${r.recommendedFormat.replace(/"/g, '""')}","${r.suggestedCta.replace(/"/g, '""')}"`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8" });
    const u = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = u;
    a.download = "search-intent-analysis.csv";
    a.click();
    URL.revokeObjectURL(u);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={results ? handleReset : undefined}
    >
      <div className="space-y-6">
        {/* Mode Selector */}
        <div className="flex border-b border-slate-200 gap-6">
          <button
            type="button"
            onClick={() => setActiveMode("keywords")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeMode === "keywords"
                ? "border-[#FF5722] text-[#FF5722]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Target Keyword Batch List</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("urlCrawl")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeMode === "urlCrawl"
                ? "border-[#FF5722] text-[#FF5722]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Extract & Classify From Live URL</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold uppercase tracking-wider">
              Live Probe
            </span>
          </button>
        </div>

        {activeMode === "keywords" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="search-intent-input" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                Enter Keywords or Queries (One per line)
              </label>
              <textarea
                id="search-intent-input"
                rows={6}
                value={inputKeywords}
                onChange={(e) => setInputKeywords(e.target.value)}
                placeholder="Paste search queries here..."
                className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs font-sans text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] transition-all"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAnalyzeKeywords}
                className="px-6 py-3.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Target className="w-4 h-4" />
                <span>Classify Search Intent Instantly</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#FF5722]" />
              <span>Crawl Remote Page Headings & Map User Search Intent</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our crawler scans the webpage, parses all H1, H2, and H3 elements, and evaluates the semantic intent (Informational, Transactional, Commercial, Comparison, or Local) against Google SERP layout expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/blog/article-slug"
                className="flex-1 p-3.5 bg-white border border-slate-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
              />
              <button
                type="button"
                onClick={handleCrawlAndAnalyzeUrl}
                disabled={loading || !urlInput.trim()}
                className="px-6 py-3.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Crawling & Classifying...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Audit Page Intent</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Results View */}
        {results && results.length > 0 && (
          <div className="space-y-6 pt-4 border-t border-slate-200 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Search Intent Classification ({results.length} queries mapped)
                </h3>
                {crawledPageTitle && (
                  <p className="text-xs text-slate-500 font-mono mt-0.5">Live Source: {crawledPageTitle}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  className="px-3.5 py-1.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((r, i) => (
                <div key={i} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900 text-sm">{r.keyword}</span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold shrink-0 ${
                      r.intent === "Transactional" ? "bg-emerald-100 text-emerald-800" :
                      r.intent === "Commercial" ? "bg-blue-100 text-blue-800" :
                      r.intent === "Comparison" ? "bg-purple-100 text-purple-800" :
                      r.intent === "Local" ? "bg-amber-100 text-amber-800" :
                      "bg-slate-100 text-slate-800"
                    }`}>
                      {r.intent} ({r.confidence}%)
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{r.rationale}</p>

                  <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                    <div>
                      <span className="text-slate-500 font-medium">Recommended Page Format: </span>
                      <strong className="text-slate-800">{r.recommendedFormat}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Target Conversion CTA: </span>
                      <strong className="text-[#FF5722]">{r.suggestedCta}</strong>
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
