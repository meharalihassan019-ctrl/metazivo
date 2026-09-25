import React, { useState } from "react";
import {
  Gauge,
  Smartphone,
  Image,
  Search,
  Zap,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Download,
  RotateCcw,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Globe
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

interface LiveInspectionData {
  url: string;
  domain: string;
  status: number;
  statusText: string;
  responseTimeMs: number;
  htmlSizeKb: number;
  canonicalUrl: string;
  robotsMeta: string;
  hasViewport: boolean;
  images: {
    total: number;
    missingAltCount: number;
    hasAltCount: number;
    samples: Array<{ src: string; alt: string; hasAlt: boolean }>;
  };
  performance: {
    score: number;
    ttfbMs: number;
    fcpSec: number;
    lcpSec: number;
    cls: number;
    inpMs: number;
    scriptTags: number;
    styleTags: number;
    mobileFriendly: string;
  };
}

export default function PerformanceAndIndexTools({ tool, onNavigateTool, onNavigateHome }: Props) {
  const isCwv = tool.slug === "core-web-vitals-checker" || tool.slug === "pagespeed-fix-recommendation-tool" || tool.slug === "website-speed-test";
  const isMobile = tool.slug === "mobile-friendly-test";
  const isAlt = tool.slug === "image-alt-text-generator" || tool.slug === "image-alt-text-checker";
  const isIndex = tool.slug === "canonical-tag-checker" || tool.slug === "google-index-checker";
  const isCrawl = tool.slug === "crawl-budget-analyzer";

  const [urlInput, setUrlInput] = useState("https://metazivo.com");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [liveData, setLiveData] = useState<LiveInspectionData | null>(null);

  const handleRunTest = async () => {
    if (!urlInput.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/seo-tools/live-page-inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput.trim() })
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Failed to analyze target page");
        setLiveData(null);
      } else {
        setLiveData(data);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={() => {
        setLiveData(null);
        setErrorMsg(null);
      }}
    >
      <div className="space-y-8">
        {/* Input Bar */}
        <div className="space-y-3">
          <label htmlFor="target-url-perf-input" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
            Target Page URL for Live Inspection
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="target-url-perf-input"
                type="text"
                placeholder="https://example.com"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
              />
            </div>
            <button
              type="button"
              onClick={handleRunTest}
              disabled={loading || !urlInput.trim()}
              className="px-6 py-3.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold font-mono transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Probing Live Server...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Run Live Diagnostic</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Performs real live HTTP request to measure server TTFB latency, rendered HTML DOM weight, image accessibility attributes, and mobile meta tags.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Results */}
        {liveData && (
          <div className="space-y-8 pt-4 border-t border-slate-200 animate-fade-in">
            {/* Header info badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-700">
                <Globe className="w-4 h-4 text-[#FF5722]" />
                <span className="font-bold">{liveData.url}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-md font-bold ${liveData.status === 200 ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                  HTTP {liveData.status} {liveData.statusText}
                </span>
                <span className="text-slate-500">
                  Payload: <strong>{liveData.htmlSizeKb} KB</strong>
                </span>
                <span className="text-slate-500">
                  Latency: <strong>{liveData.responseTimeMs} ms</strong>
                </span>
              </div>
            </div>

            {/* Core Web Vitals & Speed View */}
            {isCwv && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                    <span className="text-xs text-slate-500 font-mono">LCP (Largest Contentful Paint)</span>
                    <span className={`text-3xl font-extrabold mt-1 ${liveData.performance.lcpSec <= 2.5 ? "text-emerald-600" : liveData.performance.lcpSec <= 4.0 ? "text-amber-600" : "text-rose-600"}`}>
                      {liveData.performance.lcpSec}s
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Target &lt; 2.5s</span>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                    <span className="text-xs text-slate-500 font-mono">INP (Interaction to Next Paint)</span>
                    <span className={`text-3xl font-extrabold mt-1 ${liveData.performance.inpMs <= 200 ? "text-emerald-600" : "text-amber-600"}`}>
                      {liveData.performance.inpMs}ms
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Target &lt; 200ms</span>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                    <span className="text-xs text-slate-500 font-mono">CLS (Layout Shift)</span>
                    <span className={`text-3xl font-extrabold mt-1 ${liveData.performance.cls <= 0.1 ? "text-emerald-600" : "text-rose-600"}`}>
                      {liveData.performance.cls}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Target &lt; 0.1</span>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                    <span className="text-xs text-slate-500 font-mono">TTFB (Server Response)</span>
                    <span className={`text-3xl font-extrabold mt-1 ${liveData.responseTimeMs <= 600 ? "text-emerald-600" : "text-amber-600"}`}>
                      {liveData.responseTimeMs}ms
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Target &lt; 600ms</span>
                  </div>
                </div>

                <div className={`p-5 rounded-2xl border text-xs space-y-1 ${liveData.performance.score >= 80 ? "bg-emerald-50/70 border-emerald-200 text-emerald-900" : "bg-amber-50/70 border-amber-200 text-amber-900"}`}>
                  <h4 className="font-bold flex items-center gap-1.5 text-sm">
                    {liveData.performance.score >= 80 ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                    Overall Technical Performance Score: {liveData.performance.score} / 100
                  </h4>
                  <p className="leading-relaxed">
                    Evaluated across {liveData.performance.scriptTags} client script bundles, {liveData.performance.styleTags} stylesheets, and {liveData.images.total} DOM media assets.
                  </p>
                </div>
              </div>
            )}

            {/* Mobile-Friendly Test View */}
            {isMobile && (
              <div className="space-y-4">
                <div className={`p-5 rounded-2xl border text-xs flex items-start gap-3 ${liveData.hasViewport ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-rose-50 border-rose-200 text-rose-900"}`}>
                  {liveData.hasViewport ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">
                      {liveData.hasViewport ? "Page is Mobile-Friendly" : "Missing Mobile Viewport Configuration"}
                    </h4>
                    <p>
                      {liveData.hasViewport
                        ? "Valid <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> tag was detected. Content scales properly across mobile viewports."
                        : "No responsive viewport meta tag was found. Mobile devices will render this page in a zoomed-out desktop canvas."}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span className="text-slate-500 font-mono text-[11px]">Viewport Declaration</span>
                    <strong className="block text-slate-900 font-semibold">{liveData.hasViewport ? "Configured" : "Missing"}</strong>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span className="text-slate-500 font-mono text-[11px]">HTML Size</span>
                    <strong className="block text-slate-900 font-semibold">{liveData.htmlSizeKb} KB</strong>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span className="text-slate-500 font-mono text-[11px]">Server Response</span>
                    <strong className="block text-emerald-600 font-semibold">{liveData.responseTimeMs} ms</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Image Alt Checker */}
            {isAlt && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                    Discovered Images & Alt Attributes ({liveData.images.total} total)
                  </h4>
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${liveData.images.missingAltCount === 0 ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                    {liveData.images.missingAltCount} Missing Alt Text
                  </span>
                </div>

                {liveData.images.samples.length === 0 ? (
                  <div className="p-6 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
                    No &lt;img&gt; elements found on this page.
                  </div>
                ) : (
                  <div className="space-y-2 text-xs">
                    {liveData.images.samples.map((img, i) => (
                      <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 flex-wrap">
                        <div className="space-y-1 min-w-0 max-w-lg">
                          <span className="font-mono text-slate-500 text-[11px] truncate block">{img.src || "(Inline or data URI)"}</span>
                          <p className="font-semibold text-slate-900">
                            {img.hasAlt ? `alt="${img.alt}"` : <span className="text-rose-600 font-bold">alt attribute is MISSING</span>}
                          </p>
                        </div>
                        <span className={`text-[11px] font-mono px-2.5 py-1 rounded border ${img.hasAlt ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-rose-700 bg-rose-50 border-rose-200 font-bold"}`}>
                          {img.hasAlt ? "✓ Accessible" : "⚠ Missing Alt"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Canonical Tag & Google Index Checker */}
            {isIndex && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Robots Meta Directive</span>
                    <strong className="text-base font-bold text-slate-900 font-mono block">
                      {liveData.robotsMeta}
                    </strong>
                    <span className={`text-[11px] font-medium ${liveData.robotsMeta.includes("noindex") ? "text-rose-600" : "text-emerald-600"}`}>
                      {liveData.robotsMeta.includes("noindex") ? "⚠ Page is blocked from indexing (noindex)" : "✓ Search engines are allowed to index this page"}
                    </span>
                  </div>

                  <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Canonical Tag</span>
                    <strong className="text-xs font-bold text-slate-900 font-mono truncate block">
                      {liveData.canonicalUrl || "(No canonical tag declared)"}
                    </strong>
                    <span className={`text-[11px] font-medium ${liveData.canonicalUrl ? "text-emerald-600" : "text-amber-600"}`}>
                      {liveData.canonicalUrl ? "✓ Canonical tag is defined" : "⚠ Add a canonical tag to avoid duplicate content"}
                    </span>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold text-slate-900 text-sm">Direct Google Index Verification</span>
                    <a
                      href={`https://www.google.com/search?q=site:${encodeURIComponent(liveData.url)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF5722] text-white font-bold cursor-pointer hover:bg-[#FF7043]"
                    >
                      <span>Search site: on Google</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-slate-600">
                    Click above to query Google's live index directly to confirm whether Google has cached and indexed this exact URL.
                  </p>
                </div>
              </div>
            )}

            {/* Crawl Budget Analyzer */}
            {isCrawl && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                    <span className="text-slate-500 font-mono text-[11px]">Server Response</span>
                    <strong className="block text-emerald-600 text-xl font-bold font-mono">{liveData.responseTimeMs} ms TTFB</strong>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                    <span className="text-slate-500 font-mono text-[11px]">HTML Page Weight</span>
                    <strong className="block text-slate-900 text-xl font-bold font-mono">{liveData.htmlSizeKb} KB</strong>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-1">
                    <span className="text-slate-500 font-mono text-[11px]">Script Resources</span>
                    <strong className="block text-slate-900 text-xl font-bold font-mono">{liveData.performance.scriptTags} Scripts</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolShell>
  );
}
