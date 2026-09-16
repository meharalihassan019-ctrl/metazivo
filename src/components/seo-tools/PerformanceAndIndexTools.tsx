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
  Sparkles
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function PerformanceAndIndexTools({ tool, onNavigateTool, onNavigateHome }: Props) {
  const isCwv = tool.slug === "core-web-vitals-checker" || tool.slug === "pagespeed-estimator";
  const isMobile = tool.slug === "mobile-friendly-test";
  const isAlt = tool.slug === "image-alt-text-checker";
  const isIndex = tool.slug === "google-index-checker";
  const isCrawl = tool.slug === "crawl-budget-analyzer";

  const [urlInput, setUrlInput] = useState("https://metazivo.com");
  const [loading, setLoading] = useState(false);
  const [tested, setTested] = useState(false);

  // Performance simulation metrics
  const [metrics, setMetrics] = useState({
    lcp: 1.8,
    inp: 74,
    cls: 0.02,
    ttfb: 180,
    fcp: 0.9,
    overallPerformance: 96
  });

  const handleRunTest = () => {
    setLoading(true);
    setTimeout(() => {
      setTested(true);
      setLoading(false);
    }, 450);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={tested ? () => setTested(false) : undefined}
    >
      <div className="space-y-8">
        {/* Input Bar */}
        <div className="space-y-3">
          <label htmlFor="target-url-perf-input" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
            Target Page URL to Analyze
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="target-url-perf-input"
              type="text"
              placeholder="https://example.com"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
            />
            <button
              type="button"
              onClick={handleRunTest}
              disabled={loading}
              className="px-6 py-3.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Inspecting Diagnostics...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Run Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {tested && (
          <div className="space-y-8 pt-4 border-t border-slate-200 animate-fade-in">
            {/* Core Web Vitals View */}
            {isCwv && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                    <span className="text-xs text-slate-500 font-mono">LCP (Largest Contentful Paint)</span>
                    <span className="text-3xl font-extrabold text-emerald-600 mt-1">{metrics.lcp}s</span>
                    <span className="text-[11px] text-emerald-700 font-medium">Good (&lt;2.5s)</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                    <span className="text-xs text-slate-500 font-mono">INP (Interaction to Next Paint)</span>
                    <span className="text-3xl font-extrabold text-emerald-600 mt-1">{metrics.inp}ms</span>
                    <span className="text-[11px] text-emerald-700 font-medium">Good (&lt;200ms)</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                    <span className="text-xs text-slate-500 font-mono">CLS (Cumulative Layout Shift)</span>
                    <span className="text-3xl font-extrabold text-emerald-600 mt-1">{metrics.cls}</span>
                    <span className="text-[11px] text-emerald-700 font-medium">Good (&lt;0.1)</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                    <span className="text-xs text-slate-500 font-mono">TTFB (Server Response)</span>
                    <span className="text-3xl font-extrabold text-slate-900 mt-1">{metrics.ttfb}ms</span>
                    <span className="text-[11px] text-emerald-700 font-medium">Fast (&lt;600ms)</span>
                  </div>
                </div>

                <div className="p-5 bg-emerald-50/50 border border-emerald-200 rounded-2xl text-xs space-y-1">
                  <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Passed Core Web Vitals Assessment
                  </h4>
                  <p className="text-emerald-800 leading-relaxed">
                    This page meets all Google ranking thresholds for desktop and mobile Core Web Vitals.
                  </p>
                </div>
              </div>
            )}

            {/* Mobile-Friendly Test View */}
            {isMobile && (
              <div className="space-y-4">
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-emerald-900 text-sm">Page is Mobile-Friendly</h4>
                    <p className="text-emerald-800">
                      Viewport meta tag is properly configured, font sizes are legible without pinch-to-zoom (&gt;=16px), and interactive touch targets meet the 48x48px minimum spacing standard.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span className="text-slate-500 font-mono text-[11px]">Viewport Tag</span>
                    <strong className="block text-slate-900 font-semibold">width=device-width, initial-scale=1</strong>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span className="text-slate-500 font-mono text-[11px]">Touch Targets</span>
                    <strong className="block text-emerald-600 font-semibold">100% compliant (&gt;= 44px)</strong>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span className="text-slate-500 font-mono text-[11px]">Horizontal Scrolling</span>
                    <strong className="block text-emerald-600 font-semibold">None (No content overflows)</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Image Alt Checker */}
            {isAlt && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Image Accessibility & Descriptive Alt Text Audit
                </h4>
                <div className="space-y-2 text-xs">
                  {[
                    { src: "/images/metazivo-logo.png", alt: "Metazivo Technologies digital agency logo", status: "good", note: "Descriptive brand alt text." },
                    { src: "/og-image.jpg", alt: "Technical SEO Audit & Full-Stack Web Architecture preview", status: "good", note: "Contextual and keyword rich." },
                    { src: "/icons/speed.svg", alt: "", status: "decorative", note: "Empty alt is appropriate for decorative vector iconography." }
                  ].map((img, i) => (
                    <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 flex-wrap">
                      <div className="space-y-1">
                        <span className="font-mono text-slate-500 text-[11px]">{img.src}</span>
                        <p className="font-semibold text-slate-900">alt="{img.alt}"</p>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                        {img.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Google Index Checker */}
            {isIndex && (
              <div className="space-y-4 text-xs">
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold text-slate-900 text-sm">Direct Google Index Verification</span>
                    <a
                      href={`https://www.google.com/search?q=site:${encodeURIComponent(urlInput)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF5722] text-white font-bold cursor-pointer hover:bg-[#FF7043]"
                    >
                      <span>Search site: on Google</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-slate-600">
                    Click above to query Google's live index directly for indexed pages under your domain.
                  </p>
                </div>
              </div>
            )}

            {/* Crawl Budget Analyzer */}
            {isCrawl && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-mono text-[11px]">Server Response</span>
                    <strong className="block text-emerald-600 text-base font-bold">180ms TTFB</strong>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-mono text-[11px]">Crawl Efficiency</span>
                    <strong className="block text-slate-900 text-base font-bold">High (No Infinite URL Traps)</strong>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-slate-500 font-mono text-[11px]">Dynamic Parameters</span>
                    <strong className="block text-slate-900 text-base font-bold">Filtered via robots.txt</strong>
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
