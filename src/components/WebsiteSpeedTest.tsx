import React, { useState, useEffect } from "react";
import { 
  Gauge, 
  Smartphone, 
  Monitor, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  RefreshCw, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  ExternalLink,
  Server,
  ShieldCheck,
  Layers,
  FileCode,
  Image as ImageIcon,
  Share2,
  Printer,
  Search,
  Check,
  Phone,
  Code,
  Globe,
  Sparkles
} from "lucide-react";
import type { SpeedAuditResult, SpeedAuditIssue } from "../speedAuditor";

interface MetricCardProps {
  label: string;
  abbr: string;
  value: string;
  target: string;
  description: string;
  status: "good" | "needs-improvement" | "poor";
}

function MetricCard({ label, abbr, value, target, description, status }: MetricCardProps) {
  const statusStyles = {
    good: {
      bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700",
      dot: "bg-emerald-500",
      badge: "bg-emerald-100 text-emerald-800"
    },
    "needs-improvement": {
      bg: "bg-amber-500/10 border-amber-500/30 text-amber-700",
      dot: "bg-amber-500",
      badge: "bg-amber-100 text-amber-800"
    },
    poor: {
      bg: "bg-rose-500/10 border-rose-500/30 text-rose-700",
      dot: "bg-rose-500",
      badge: "bg-rose-100 text-rose-800"
    }
  };

  const style = statusStyles[status];

  return (
    <div className={`rounded-2xl p-5 border transition-all flex flex-col justify-between bg-white shadow-sm hover:shadow-md ${style.bg}`}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${style.dot} animate-pulse`} />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">{abbr}</span>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${style.badge}`}>
            Target: {target}
          </span>
        </div>
        <div className="mt-1">
          <span className="text-2xl sm:text-3xl font-black text-slate-950 font-mono tracking-tight">{value}</span>
        </div>
        <p className="text-xs font-semibold text-slate-800 mt-1 font-sans">{label}</p>
      </div>
      <p className="text-[11px] text-slate-500 mt-3 leading-relaxed border-t border-slate-100 pt-2 font-sans">{description}</p>
    </div>
  );
}

interface WebsiteSpeedTestProps {
  onNavigate: (tab: string) => void;
  getWhatsAppLink?: (slug: string) => string;
}

export default function WebsiteSpeedTest({ onNavigate, getWhatsAppLink }: WebsiteSpeedTestProps) {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SpeedAuditResult | null>(null);
  const [activeTab, setActiveTab] = useState<"opportunities" | "server" | "assets" | "seo">("opportunities");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Read URL and strategy from query parameters if present
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const paramUrl = searchParams.get("url");
      const paramStrat = searchParams.get("strategy");
      if (paramUrl) {
        setUrl(paramUrl);
        if (paramStrat === "desktop" || paramStrat === "mobile") {
          setStrategy(paramStrat);
        }
        executeSpeedAudit(paramUrl, (paramStrat as any) || "mobile");
      }
    } catch (_) {}
  }, []);

  const loadingSteps = [
    "Establishing direct socket connection with web server...",
    "Measuring real Time to First Byte (TTFB) and DNS resolution...",
    "Retrieving HTML payload and analyzing DOM node architecture...",
    "Parsing external JavaScript, render-blocking stylesheets & fonts...",
    "Auditing image aspect ratios, missing dimensions & modern WebP/AVIF formats...",
    "Inspecting HTTP response headers, compression & security protocols...",
    "Evaluating Google Lighthouse Core Web Vitals benchmarks...",
    "Finalizing actionable technical recommendations and ranking report..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const executeSpeedAudit = async (targetInput: string, testStrategy: "mobile" | "desktop") => {
    let formatted = targetInput.trim();
    if (!formatted) {
      setError("Please enter a website URL first.");
      return;
    }

    if (!/^https?:\/\//i.test(formatted)) {
      formatted = "https://" + formatted;
    }

    try {
      new URL(formatted);
    } catch (_) {
      setError("Please enter a valid website address (e.g., example.com).");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/pagespeed?url=${encodeURIComponent(formatted)}&strategy=${testStrategy}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to analyze website speed.");
      }
      const data: SpeedAuditResult = await response.json();
      setResults(data);

      // Update URL query parameters without reloading
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("url", formatted);
      newUrl.searchParams.set("strategy", testStrategy);
      window.history.replaceState({}, "", newUrl.toString());
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while probing the site.");
    } finally {
      setLoading(false);
    }
  };

  const handleRunTest = (e: React.FormEvent) => {
    e.preventDefault();
    executeSpeedAudit(url, strategy);
  };

  const handleCopyLink = () => {
    if (!results) return;
    const shareUrl = `${window.location.origin}/tools/website-speed-test?url=${encodeURIComponent(results.url)}&strategy=${results.strategy}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: "text-emerald-500", border: "border-emerald-500", bg: "bg-emerald-500", label: "Fast (Google Recommended)" };
    if (score >= 50) return { text: "text-amber-500", border: "border-amber-500", bg: "bg-amber-500", label: "Average (Optimization Needed)" };
    return { text: "text-rose-500", border: "border-rose-500", bg: "bg-rose-500", label: "Slow (Hurting Rankings)" };
  };

  const getMetricStatus = (key: string, value: string): "good" | "needs-improvement" | "poor" => {
    const num = parseFloat(value);
    if (isNaN(num)) return "good";

    switch (key) {
      case "fcp":
        return num <= 1.8 ? "good" : num <= 3.0 ? "needs-improvement" : "poor";
      case "lcp":
        return num <= 2.5 ? "good" : num <= 4.0 ? "needs-improvement" : "poor";
      case "cls":
        return num <= 0.1 ? "good" : num <= 0.25 ? "needs-improvement" : "poor";
      case "tbt":
        const valMs = value.includes("ms") ? num : num * 1000;
        return valMs <= 200 ? "good" : valMs <= 600 ? "needs-improvement" : "poor";
      case "ttfb":
        const ttfbMs = value.includes("ms") ? num : num * 1000;
        return ttfbMs <= 200 ? "good" : ttfbMs <= 600 ? "needs-improvement" : "poor";
      case "interactive":
      case "speedIndex":
        return num <= 3.4 ? "good" : num <= 5.8 ? "needs-improvement" : "poor";
      default:
        return "good";
    }
  };

  // WhatsApp Consultation Message Generator
  const generateWhatsAppHref = () => {
    if (getWhatsAppLink) {
      const base = getWhatsAppLink("home");
      if (results) {
        const msg = encodeURIComponent(
          `Hi Metazivo! I just tested my website (${results.domain}) on your Speed Test tool. My score is ${results.score}/100 with a TTFB of ${results.metrics.ttfb}. Can you help optimize my Core Web Vitals and get my site into the 90+ green zone?`
        );
        const cleanBase = base.split("?text=")[0];
        return `${cleanBase}?text=${msg}`;
      }
      return base;
    }
    return "https://wa.me/923288518557?text=Hi%20Metazivo!%20I%20would%20like%20to%20consult%20about%20website%20speed%20optimization.";
  };

  const faqs = [
    {
      q: "Does website speed directly impact Google search rankings?",
      a: "Yes. Google officially confirmed Core Web Vitals (LCP, INP, CLS) and page load speed as explicit organic ranking factors across desktop and mobile. Fast-loading sites receive preferential crawl budget, lower bounce rates, and higher positions on competitive search result pages."
    },
    {
      q: "Why is this speed test 100% genuine and not simulated?",
      a: "Our tool executes direct, real-time HTTP socket probes against your live server. It measures actual Time to First Byte (TTFB), inspects the raw HTML payload for uncompressed scripts and un-sized images, and connects directly to Google's Lighthouse diagnostic engine. No fake randomized hashes or simulated placeholders are used."
    },
    {
      q: "What is Time to First Byte (TTFB) and why is it crucial?",
      a: "TTFB measures how long your web server takes to generate and send the very first byte of data back to the browser. Google recommends a TTFB below 200ms. A slow TTFB delays all downstream assets (CSS, JS, fonts, images), making it impossible to achieve green Core Web Vitals scores."
    },
    {
      q: "Why is my Mobile score typically lower than my Desktop score?",
      a: "Mobile tests simulate a mid-tier smartphone (such as a Moto G) running on a throttled 4G mobile network with restricted CPU power. This accurately reflects real-world mobile visitors who experience longer JavaScript execution times, slower cellular bandwidth, and layout recalculation delays."
    },
    {
      q: "How does Cumulative Layout Shift (CLS) hurt user experience?",
      a: "CLS occurs when visible elements suddenly shift position while the page is still loading — often because images or ads lack explicit width and height dimensions. This leads to accidental clicks, frustration, and a poor Google user-experience evaluation."
    },
    {
      q: "How can I convert images to WebP/AVIF to speed up my site?",
      a: "Modern formats like WebP and AVIF offer 30% to 50% superior compression compared to traditional PNG and JPEG formats without visual quality loss. You can automate this using WordPress plugins (such as Converter for Media, LiteSpeed Cache), CDN image polish (Cloudflare), or build pipelines (Next.js Image component)."
    },
    {
      q: "Does slow website speed increase Google Ads CPC costs?",
      a: "Yes. Google Ads factors Landing Page Experience directly into your Ad Quality Score. A slow landing page reduces your Quality Score, which forces you to bid significantly higher cost-per-click (CPC) rates to maintain ad positions compared to fast competitors."
    },
    {
      q: "Can Metazivo guarantee a 90+ PageSpeed score for my website?",
      a: "Yes! Metazivo provides enterprise speed engineering. We refactor render-blocking JavaScript, implement server-level caching (FastCGI, Redis, LiteSpeed), optimize DOM depth, eliminate layout shifts, and configure Cloudflare Edge caching to deliver sub-second loading speeds."
    }
  ];

  return (
    <div id="view-website-speed-test" className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-16 animate-fade-in text-slate-800 font-sans">
      
      {/* Title & Header Section */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 border border-orange-200/80 rounded-full text-xs text-[#FF5722] font-mono tracking-wider uppercase shadow-sm">
          <Zap className="w-3.5 h-3.5 text-[#FF5722] animate-pulse" /> 100% Real-Time Diagnostic Engine
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
          Free Website Speed Test & Core Web Vitals Audit
        </h1>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
          Run an authentic, live technical audit. Discover genuine TTFB, Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), server latency, and exact engineering fixes to rank higher on Google.
        </p>
      </div>

      {/* Input / Control Card */}
      <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm p-6 md:p-8 max-w-4xl mx-auto space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF5722]/5 rounded-full blur-3xl pointer-events-none" />
        
        <form onSubmit={handleRunTest} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest font-mono">
                Website URL to Audit
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400 text-sm font-mono select-none">https://</span>
                <input
                  type="text"
                  placeholder="yourwebsite.com"
                  value={url.replace(/^https?:\/\//i, "")}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                  className="w-full pl-[72px] pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-[#FF5722] focus:bg-white transition-all font-mono font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest font-mono">
                Audit Device
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/60">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setStrategy("mobile")}
                  className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    strategy === "mobile" 
                      ? "bg-white text-slate-950 shadow-sm" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> Mobile
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setStrategy("desktop")}
                  className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    strategy === "desktop" 
                      ? "bg-white text-slate-950 shadow-sm" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" /> Desktop
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500 leading-relaxed max-w-md text-center sm:text-left flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              Live direct server probe + Google Lighthouse audits. Real results only.
            </span>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FF5722] hover:bg-[#FF7043] disabled:bg-slate-300 text-white font-bold rounded-2xl text-sm tracking-wide transition-all shadow-[0_4px_15px_rgba(255,87,34,0.25)] hover:shadow-[0_6px_20px_rgba(255,87,34,0.35)] flex items-center justify-center gap-2 cursor-pointer duration-150 active:scale-95"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Running Live Audit...
                </>
              ) : (
                <>
                  <Gauge className="w-4 h-4" />
                  Test Website Speed
                </>
              )}
            </button>
          </div>
        </form>

        {/* Loading State Container */}
        {loading && (
          <div className="border border-slate-200 bg-slate-50/80 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center space-y-4 animate-fade-in">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-[#FF5722] animate-spin" />
              <Zap className="w-6 h-6 text-[#FF5722] absolute animate-pulse" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 font-sans">Connecting to Live Web Server</h4>
              <p className="text-xs text-slate-600 max-w-md font-mono min-h-[32px] flex items-center justify-center">
                {loadingSteps[loadingStep]}
              </p>
            </div>
            <div className="w-full max-w-sm h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FF5722] to-[#FF8A50] transition-all duration-700 ease-out rounded-full" 
                style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-4 text-xs font-medium flex items-start gap-2.5 animate-fade-in">
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5 text-rose-800">Speed Audit Notice</span>
              {error}
            </div>
          </div>
        )}
      </div>

      {/* Results Workspace */}
      {results && !loading && (
        <div className="space-y-10 animate-fade-in max-w-4xl mx-auto print:space-y-6">
          
          {/* Live Empirical Verification Banner */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-slate-900 uppercase font-mono tracking-wider">
                    Live Verified Probe
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono">
                    100% Authentic Data
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  Audited on {new Date(results.testedAt).toLocaleTimeString()} ({results.strategy.toUpperCase()}) • Server: <span className="font-bold text-slate-700">{results.serverInfo.server}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                title="Copy shareable report link"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                {copiedUrl ? "Copied Link!" : "Share Report"}
              </button>
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer print:hidden"
                title="Print or save as PDF"
              >
                <Printer className="w-3.5 h-3.5" /> PDF
              </button>
            </div>
          </div>

          {/* Main Hero Card: Circle Score + Real Network Facts */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Score Gauge Column */}
            <div className="md:col-span-5 bg-white border border-slate-200 rounded-[32px] p-6 flex flex-col items-center justify-center text-center space-y-6 shadow-sm">
              <span className="text-xs font-bold text-slate-500 font-mono tracking-wider uppercase">
                Overall Speed Score
              </span>
              
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="76"
                    className="stroke-slate-100"
                    strokeWidth="14"
                    fill="transparent"
                  />
                  <circle
                    cx="88"
                    cy="88"
                    r="76"
                    className="transition-all duration-1000 ease-out"
                    stroke={results.score >= 90 ? "#10b981" : results.score >= 50 ? "#f59e0b" : "#f43f5e"}
                    strokeWidth="14"
                    strokeDasharray={2 * Math.PI * 76}
                    strokeDashoffset={2 * Math.PI * 76 * (1 - results.score / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className={`text-5xl font-black font-mono tracking-tight ${getScoreBadge(results.score).text}`}>
                    {results.score}
                  </span>
                  <span className="text-[11px] uppercase font-bold text-slate-400 tracking-widest font-mono mt-0.5">
                    OUT OF 100
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-center">
                <span className={`inline-flex px-3.5 py-1 rounded-full text-xs font-extrabold uppercase ${getScoreBadge(results.score).bg} text-white shadow-sm`}>
                  {getScoreBadge(results.score).label}
                </span>
                <p className="text-xs text-slate-400 font-mono">
                  Environment: <span className="font-bold text-slate-700 capitalize">{results.strategy}</span>
                </p>
              </div>
            </div>

            {/* Live Server & Target Summary */}
            <div className="md:col-span-7 bg-white border border-slate-200 rounded-[32px] p-6 md:p-8 flex flex-col justify-between shadow-sm space-y-6">
              <div className="space-y-5">
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                      Target Domain
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 truncate max-w-xs md:max-w-md font-mono" title={results.url}>
                      {results.domain}
                    </h3>
                  </div>
                  <a 
                    href={results.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    referrerPolicy="no-referrer"
                    className="p-2 hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
                    title="Open website in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Live Real Metrics Pill Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Real TTFB</span>
                    <span className="text-sm font-black text-slate-900 font-mono">{results.metrics.ttfb}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">HTML Payload</span>
                    <span className="text-sm font-black text-slate-900 font-mono">{results.domAudit.htmlSizeKb}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Compression</span>
                    <span className="text-sm font-black text-slate-900 font-mono truncate block" title={results.serverInfo.compression}>
                      {results.serverInfo.compression.split(" ")[0]}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Total DOM Nodes</span>
                    <span className="text-sm font-black text-slate-900 font-mono">{results.domAudit.totalDomNodes}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Blocking Scripts</span>
                    <span className={`text-sm font-black font-mono ${results.domAudit.blockingScripts > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                      {results.domAudit.blockingScripts}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Unsized Images</span>
                    <span className={`text-sm font-black font-mono ${results.domAudit.imagesWithoutDimensions > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                      {results.domAudit.imagesWithoutDimensions}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Fix WhatsApp CTA Banner */}
              <div className="p-4 rounded-2xl border border-orange-200/80 bg-orange-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 font-sans">
                    Need Help Getting 90+ Score?
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Our performance engineers can eliminate these bottlenecks and guarantee green Core Web Vitals.
                  </p>
                </div>
                <a
                  href={generateWhatsAppHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all shrink-0 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-100" /> WhatsApp Consult
                </a>
              </div>
            </div>
          </div>

          {/* Core Web Vitals Standard 6 Metrics Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF5722]" /> Official Core Web Vitals & Paint Timers
              </h3>
              <span className="text-xs text-slate-500 font-mono">Google 2026 Standards</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard 
                label="Largest Contentful Paint (LCP)" 
                abbr="LCP"
                value={results.metrics.lcp} 
                target="≤ 2.5s"
                description="Time taken to render the primary headline or hero banner image. Crucial for Google user satisfaction."
                status={getMetricStatus("lcp", results.metrics.lcp)}
              />
              <MetricCard 
                label="First Contentful Paint (FCP)" 
                abbr="FCP"
                value={results.metrics.fcp} 
                target="≤ 1.8s"
                description="The first moment any text or SVG element is painted onto the screen, providing visual confirmation."
                status={getMetricStatus("fcp", results.metrics.fcp)}
              />
              <MetricCard 
                label="Cumulative Layout Shift (CLS)" 
                abbr="CLS"
                value={results.metrics.cls} 
                target="≤ 0.10"
                description="Visual stability score. High values indicate images or banner ads shifting content unexpectedly."
                status={getMetricStatus("cls", results.metrics.cls)}
              />
              <MetricCard 
                label="Total Blocking Time (TBT)" 
                abbr="TBT"
                value={results.metrics.tbt} 
                target="≤ 200ms"
                description="Total time the browser main thread was locked by heavy JavaScript, blocking user clicks and taps."
                status={getMetricStatus("tbt", results.metrics.tbt)}
              />
              <MetricCard 
                label="Time to First Byte (TTFB)" 
                abbr="TTFB"
                value={results.metrics.ttfb} 
                target="≤ 200ms"
                description="Real server and DNS responsiveness. Measures network latency before downloading HTML."
                status={getMetricStatus("ttfb", results.metrics.ttfb)}
              />
              <MetricCard 
                label="Speed Index (SI)" 
                abbr="SI"
                value={results.metrics.speedIndex} 
                target="≤ 3.4s"
                description="Measures how quickly the visual viewport is filled with readable and styled elements."
                status={getMetricStatus("speedIndex", results.metrics.speedIndex)}
              />
            </div>
          </div>

          {/* Deep Technical Diagnostic Workspace Tabs */}
          <div className="bg-white border border-slate-200 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6">
            
            {/* Tabs Header */}
            <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
              <button
                onClick={() => setActiveTab("opportunities")}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "opportunities" 
                    ? "bg-[#FF5722] text-white shadow-sm" 
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Opportunities ({results.issues.length})
              </button>
              <button
                onClick={() => setActiveTab("server")}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "server" 
                    ? "bg-[#FF5722] text-white shadow-sm" 
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                <Server className="w-3.5 h-3.5" />
                Server & Headers
              </button>
              <button
                onClick={() => setActiveTab("assets")}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "assets" 
                    ? "bg-[#FF5722] text-white shadow-sm" 
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                DOM & Assets
              </button>
              <button
                onClick={() => setActiveTab("seo")}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "seo" 
                    ? "bg-[#FF5722] text-white shadow-sm" 
                    : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                On-Page SEO
              </button>
            </div>

            {/* TAB 1: OPPORTUNITIES & PRIORITIZED FIXES */}
            {activeTab === "opportunities" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Actionable Bottlenecks & Fixes</h4>
                    <p className="text-xs text-slate-500">
                      Addressing these specific issues will directly improve Core Web Vitals and protect organic rankings.
                    </p>
                  </div>
                </div>

                {results.issues.length === 0 ? (
                  <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-emerald-900">No Critical Bottlenecks Found!</h4>
                    <p className="text-xs text-emerald-700 mt-1 max-w-md mx-auto">
                      Your website demonstrates clean asset delivery, fast response times, and proper image dimensions.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {results.issues.map((issue, idx) => (
                      <div key={idx} className="p-5 border border-slate-200/80 rounded-2xl bg-slate-50/50 space-y-3 hover:border-slate-300 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] font-extrabold uppercase font-mono px-2 py-0.5 rounded-full ${
                                issue.severity === "critical" ? "bg-rose-100 text-rose-700" : issue.severity === "warning" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-700"
                              }`}>
                                {issue.severity} priority
                              </span>
                              <span className="text-[10px] font-mono text-slate-400 uppercase">
                                Category: {issue.category}
                              </span>
                            </div>
                            <h5 className="text-sm font-bold text-slate-900">{issue.title}</h5>
                          </div>
                          <div className="px-3 py-1 bg-white border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-800 shrink-0 self-start">
                            {issue.displayValue}
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {issue.description}
                        </p>

                        <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                          <span className="text-[10px] font-bold text-[#FF5722] uppercase tracking-wider block">
                            Recommended Engineering Fix:
                          </span>
                          <p className="text-[11px] text-slate-600 leading-normal font-sans">
                            {issue.howToFix}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SERVER & HEADERS */}
            {activeTab === "server" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-bold text-slate-900">Real Server Architecture & Headers</h4>
                  <p className="text-xs text-slate-500">Live response data captured directly from the destination web server.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">Detected Web Server</span>
                    <p className="text-sm font-bold text-slate-900 font-mono">{results.serverInfo.server}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">HTTP Protocol</span>
                    <p className="text-sm font-bold text-slate-900 font-mono">{results.serverInfo.protocol}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">Content Encoding</span>
                    <p className="text-sm font-bold text-slate-900 font-mono">{results.serverInfo.compression}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">Cache Control Header</span>
                    <p className="text-xs font-mono text-slate-700 truncate" title={results.serverInfo.cacheControl}>
                      {results.serverInfo.cacheControl}
                    </p>
                  </div>
                </div>

                {/* Security Headers Inspection */}
                <div className="space-y-3 pt-2">
                  <h5 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono">
                    Security & Protocol Verification
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-3 rounded-xl border bg-white border-slate-100">
                      <span className="text-xs text-slate-700">HTTPS SSL/TLS Encryption</span>
                      {results.serverInfo.isHttps ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Secure
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 font-mono">
                          <AlertTriangle className="w-3.5 h-3.5" /> Insecure (HTTP)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border bg-white border-slate-100">
                      <span className="text-xs text-slate-700">HSTS (Strict-Transport-Security)</span>
                      {results.securityAudit.hsts ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 font-mono">
                          <AlertTriangle className="w-3.5 h-3.5" /> Not Found
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border bg-white border-slate-100">
                      <span className="text-xs text-slate-700">X-Content-Type-Options</span>
                      {results.securityAudit.xContentTypeOptions ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active (nosniff)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 font-mono">
                          Optional
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border bg-white border-slate-100">
                      <span className="text-xs text-slate-700">Content Security Policy (CSP)</span>
                      {results.securityAudit.contentSecurityPolicy ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Configured
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 font-mono">
                          Not Detected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DOM & ASSETS */}
            {activeTab === "assets" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-bold text-slate-900">DOM Elements & Media Assets Breakdown</h4>
                  <p className="text-xs text-slate-500">Analysis of code density, render-blocking scripts, and image tags.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Total DOM Nodes</span>
                    <span className="text-2xl font-black text-slate-900 font-mono">{results.domAudit.totalDomNodes}</span>
                    <p className="text-[11px] text-slate-500 mt-1 font-sans">
                      {results.domAudit.totalDomNodes > 1200 ? "⚠️ High complexity. Consider simplifying HTML." : "✅ Optimal DOM tree depth."}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">External Scripts</span>
                    <span className="text-2xl font-black text-slate-900 font-mono">{results.domAudit.totalScripts}</span>
                    <p className="text-[11px] text-slate-500 mt-1 font-sans">
                      {results.domAudit.blockingScripts > 0 
                        ? `⚠️ ${results.domAudit.blockingScripts} script(s) are render-blocking.` 
                        : "✅ All scripts load asynchronously."}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Stylesheets</span>
                    <span className="text-2xl font-black text-slate-900 font-mono">{results.domAudit.totalStylesheets}</span>
                    <p className="text-[11px] text-slate-500 mt-1 font-sans">
                      External CSS bundles affecting First Contentful Paint.
                    </p>
                  </div>
                </div>

                {/* Images Audit Deep Dive */}
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#FF5722]" /> Image Optimization Inspection ({results.domAudit.totalImages} images)
                    </h5>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Unsized Images</span>
                      <span className={`text-lg font-black font-mono ${results.domAudit.imagesWithoutDimensions > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                        {results.domAudit.imagesWithoutDimensions}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Causes layout shifts</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Missing Alt Tags</span>
                      <span className={`text-lg font-black font-mono ${results.domAudit.imagesWithoutAlt > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                        {results.domAudit.imagesWithoutAlt}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Hurts SEO indexation</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Next-Gen Formats</span>
                      <span className="text-lg font-black text-emerald-600 font-mono">
                        {results.domAudit.modernImagesCount}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">WebP / AVIF / SVG</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Lazy Loaded</span>
                      <span className="text-lg font-black text-slate-900 font-mono">
                        {results.domAudit.lazyImages}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">loading="lazy"</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: ON-PAGE SEO */}
            {activeTab === "seo" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-bold text-slate-900">On-Page Technical SEO Audit</h4>
                  <p className="text-xs text-slate-500">Verification of critical meta tags, viewport responsiveness, and structured data schemas.</p>
                </div>

                <div className="space-y-4">
                  {/* Title Audit */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">Page Title Tag</span>
                      <span className="text-xs font-mono font-bold text-slate-600">
                        {results.seoAudit.titleLength} characters
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">
                      {results.seoAudit.title || <span className="text-rose-600 italic">No Title Tag Detected</span>}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {results.seoAudit.titleStatus === "good" ? "✅ Optimal length (30-65 chars)." : "⚠️ Title length is outside recommended range."}
                    </p>
                  </div>

                  {/* Description Audit */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">Meta Description</span>
                      <span className="text-xs font-mono font-bold text-slate-600">
                        {results.seoAudit.descriptionLength} characters
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed">
                      {results.seoAudit.description || <span className="text-amber-600 italic">No Meta Description Tag Detected</span>}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {results.seoAudit.descriptionStatus === "good" ? "✅ Good snippet length." : "⚠️ Meta description could be expanded (120-160 chars recommended)."}
                    </p>
                  </div>

                  {/* SEO Checklist Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center justify-between p-3 rounded-xl border bg-white border-slate-100">
                      <span className="text-xs text-slate-700">Mobile Responsive Viewport</span>
                      {results.seoAudit.hasViewport ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Present
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 font-mono">
                          <AlertTriangle className="w-3.5 h-3.5" /> Missing
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border bg-white border-slate-100">
                      <span className="text-xs text-slate-700">Canonical Tag</span>
                      {results.seoAudit.hasCanonical ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Configured
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 font-mono">
                          <AlertTriangle className="w-3.5 h-3.5" /> Not Found
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border bg-white border-slate-100">
                      <span className="text-xs text-slate-700">Open Graph Social Tags</span>
                      {results.seoAudit.hasOgTags ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Present
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 font-mono">
                          Not Detected
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border bg-white border-slate-100">
                      <span className="text-xs text-slate-700">Structured Data (JSON-LD)</span>
                      {results.seoAudit.hasJsonLd ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {results.seoAudit.jsonLdCount} Schema(s)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 font-mono">
                          None Found
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Passed Audits Collapsible */}
            {results.passedAudits.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <details className="group cursor-pointer">
                  <summary className="flex items-center justify-between text-xs font-bold text-slate-700 font-mono uppercase select-none list-none">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      View {results.passedAudits.length} Passed Audits
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-2">
                    {results.passedAudits.map((item, i) => (
                      <div key={i} className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                        <span className="text-xs font-bold text-emerald-900 block">{item.title}</span>
                        <p className="text-[11px] text-emerald-700 mt-0.5">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            )}

          </div>

          {/* Bottom Conversion Banner */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[32px] p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-wider">
                Full-Service Engineering
              </span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight">
                Want your website to load in under 1 second?
              </h3>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                Metazivo optimizes WordPress, WooCommerce, and custom web applications for guaranteed 90+ Google PageSpeed performance. We handle caching, code minification, and database optimization.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <a
                href={generateWhatsAppHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-100" /> WhatsApp Direct Chat
              </a>
              <button
                onClick={() => onNavigate("contact")}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                Book SEO Consultation <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* SEO Technical Guide Sections (to rank tool #1 on Google) */}
      <div className="max-w-4xl mx-auto space-y-12 pt-6">
        
        {/* Benchmarks Educational Table */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 md:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-wider">
              Search Engine Performance Standard
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Google Core Web Vitals Official Benchmarks (2026)
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              Google utilizes these exact empirical thresholds to calculate your website's organic search rank and user experience quality score:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-mono tracking-wider">
                  <th className="py-3 px-3">Metric</th>
                  <th className="py-3 px-3 text-emerald-600">Good (Pass)</th>
                  <th className="py-3 px-3 text-amber-600">Needs Work</th>
                  <th className="py-3 px-3 text-rose-600">Poor (Fails)</th>
                  <th className="py-3 px-3">Impact on SEO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                <tr>
                  <td className="py-3 px-3 font-bold font-sans">Largest Contentful Paint (LCP)</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold">≤ 2.5s</td>
                  <td className="py-3 px-3 text-amber-700">2.5s - 4.0s</td>
                  <td className="py-3 px-3 text-rose-700">&gt; 4.0s</td>
                  <td className="py-3 px-3 font-sans text-slate-600">Primary loading indicator</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold font-sans">First Contentful Paint (FCP)</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold">≤ 1.8s</td>
                  <td className="py-3 px-3 text-amber-700">1.8s - 3.0s</td>
                  <td className="py-3 px-3 text-rose-700">&gt; 3.0s</td>
                  <td className="py-3 px-3 font-sans text-slate-600">First visual feedback</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold font-sans">Cumulative Layout Shift (CLS)</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold">≤ 0.10</td>
                  <td className="py-3 px-3 text-amber-700">0.10 - 0.25</td>
                  <td className="py-3 px-3 text-rose-700">&gt; 0.25</td>
                  <td className="py-3 px-3 font-sans text-slate-600">Prevents accidental misclicks</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold font-sans">Total Blocking Time (TBT)</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold">≤ 200ms</td>
                  <td className="py-3 px-3 text-amber-700">200ms - 600ms</td>
                  <td className="py-3 px-3 text-rose-700">&gt; 600ms</td>
                  <td className="py-3 px-3 font-sans text-slate-600">Protects input responsiveness</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold font-sans">Time to First Byte (TTFB)</td>
                  <td className="py-3 px-3 text-emerald-700 font-bold">≤ 200ms</td>
                  <td className="py-3 px-3 text-amber-700">200ms - 600ms</td>
                  <td className="py-3 px-3 text-rose-700">&gt; 600ms</td>
                  <td className="py-3 px-3 font-sans text-slate-600">Server & DNS responsiveness</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Informational SEO Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF5722]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Conversion Multiplier</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every 100ms improvement in website load speed increases ecommerce conversions by up to 8.4%. Slow pages cost real sales every day.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Google Crawl Budget</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Googlebot crawls fast sites more deeply and frequently. High TTFB forces search spiders to abort crawl sessions, delaying new indexation.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Lower Ads CPC</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              High PageSpeed scores improve your Google Ads Landing Page Quality Score, reducing cost-per-click while outranking competitors.
            </p>
          </div>
        </div>

      </div>

      {/* Accordion FAQ Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-[32px] p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <div className="text-center md:text-left space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#FF5722] uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" /> Comprehensive Knowledge Base
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions About Website Speed & Core Web Vitals
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Essential facts on Google benchmarks, mobile throttling, TTFB, and speed engineering.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors text-left gap-3 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#FF5722] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 border-t border-slate-100 pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-light font-sans bg-slate-50/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* How to Use Section */}
      <div className="bg-white border border-slate-200 rounded-[32px] p-6 md:p-8 max-w-4xl mx-auto space-y-6 shadow-xs">
        <div className="space-y-1.5">
          <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest">Simple 3-Step Guide</span>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            How to Use the Website Speed Test
          </h2>
          <p className="text-xs text-slate-600">
            Diagnose latency bottlenecks and benchmark your Core Web Vitals performance in under 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF5722] font-mono font-bold text-sm flex items-center justify-center">01</div>
            <h3 className="font-bold text-slate-900 text-sm">Enter Target URL</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Paste your domain or full URL path into the audit input above.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF5722] font-mono font-bold text-sm flex items-center justify-center">02</div>
            <h3 className="font-bold text-slate-900 text-sm">Select Strategy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Choose Mobile or Desktop simulation to run accurate network audits.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF5722] font-mono font-bold text-sm flex items-center justify-center">03</div>
            <h3 className="font-bold text-slate-900 text-sm">Review Opportunities</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Inspect TTFB, LCP, INP, uncompressed assets, and implement prioritized fixes.</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white border border-slate-200 rounded-[32px] p-6 md:p-8 max-w-4xl mx-auto space-y-6 shadow-xs">
        <div className="space-y-1.5">
          <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest">Key Advantages</span>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Benefits of Using Website Speed Test
          </h2>
          <p className="text-xs text-slate-600">
            Engineered to give developers and marketers real data to win higher Google search rankings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-50/60 border border-slate-200/70 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Higher Google Search Rankings</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Core Web Vitals are confirmed ranking factors across mobile and desktop searches.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50/60 border border-slate-200/70 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Reduced Bounce Rates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Fast sub-second loading keeps visitors engaged and browsing your content longer.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50/60 border border-slate-200/70 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Genuine Real-Time Socket Audit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Direct server socket probes with zero simulated or fake metrics.</p>
          </div>
        </div>
      </div>

      {/* Related Tools Section */}
      <div className="bg-white border border-slate-200 rounded-[32px] p-6 md:p-8 max-w-4xl mx-auto space-y-6 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest block">More Utilities</span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Related SEO Tools
            </h2>
          </div>
          <a
            href="/seo-tools"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("seo-tools");
            }}
            className="text-xs font-semibold text-[#FF5722] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>View All 31 Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <a
            href="/tools/seo-audit-checker"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("tools/seo-audit-checker");
            }}
            className="text-left p-4 rounded-2xl border border-slate-200/80 hover:border-[#FF5722]/50 hover:bg-orange-50/20 transition-all group bg-white shadow-xs cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#FF5722] uppercase tracking-wider block">Technical & Audit</span>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#FF5722] transition-colors line-clamp-1">SEO Audit Checker</h3>
              <p className="text-xs text-slate-500 font-light line-clamp-2">Complete on-page and technical SEO audit with health score.</p>
            </div>
            <div className="mt-3 text-xs font-semibold text-slate-600 group-hover:text-[#FF5722] flex items-center gap-1">
              <span>Launch Tool</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          <a
            href="/tools/core-web-vitals-checker"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("tools/core-web-vitals-checker");
            }}
            className="text-left p-4 rounded-2xl border border-slate-200/80 hover:border-[#FF5722]/50 hover:bg-orange-50/20 transition-all group bg-white shadow-xs cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#FF5722] uppercase tracking-wider block">Speed & Performance</span>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#FF5722] transition-colors line-clamp-1">Core Web Vitals Checker</h3>
              <p className="text-xs text-slate-500 font-light line-clamp-2">Analyze LCP, FID/INP, and CLS benchmarks for Google ranking compliance.</p>
            </div>
            <div className="mt-3 text-xs font-semibold text-slate-600 group-hover:text-[#FF5722] flex items-center gap-1">
              <span>Launch Tool</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          <a
            href="/tools/pagespeed-fix-recommendation-tool"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("tools/pagespeed-fix-recommendation-tool");
            }}
            className="text-left p-4 rounded-2xl border border-slate-200/80 hover:border-[#FF5722]/50 hover:bg-orange-50/20 transition-all group bg-white shadow-xs cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-[#FF5722] uppercase tracking-wider block">Speed & Performance</span>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#FF5722] transition-colors line-clamp-1">PageSpeed Fix Recommendation Tool</h3>
              <p className="text-xs text-slate-500 font-light line-clamp-2">Actionable, prioritized speed fixes for TTFB, render blocking resources, and asset compression.</p>
            </div>
            <div className="mt-3 text-xs font-semibold text-slate-600 group-hover:text-[#FF5722] flex items-center gap-1">
              <span>Launch Tool</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </div>
      </div>

    </div>
  );
}
