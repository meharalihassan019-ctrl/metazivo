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
  ExternalLink 
} from "lucide-react";

interface MetricRowProps {
  label: string;
  value: string;
  description: string;
  status: "good" | "needs-improvement" | "poor";
}

function MetricCard({ label, value, description, status }: MetricRowProps) {
  const statusColors = {
    good: "bg-emerald-50 text-emerald-700 border-emerald-100",
    "needs-improvement": "bg-amber-50 text-amber-700 border-amber-100",
    poor: "bg-rose-50 text-rose-700 border-rose-100"
  };

  const statusIndicator = {
    good: "bg-emerald-500",
    "needs-improvement": "bg-amber-500",
    poor: "bg-rose-500"
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-slate-200 transition-all">
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <span className={`w-2 h-2 rounded-full ${statusIndicator[status]}`} />
          <span className="text-xs font-semibold text-slate-500 font-sans">{label}</span>
        </div>
        <p className="text-2xl font-extrabold text-slate-950 font-mono tracking-tight">{value}</p>
      </div>
      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{description}</p>
    </div>
  );
}

interface WebsiteSpeedTestProps {
  onNavigate: (tab: string) => void;
}

export default function WebsiteSpeedTest({ onNavigate }: WebsiteSpeedTestProps) {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    url: string;
    strategy: "mobile" | "desktop";
    score: number;
    metrics: {
      speedIndex: string;
      fcp: string;
      lcp: string;
      cls: string;
      tbt: string;
      interactive: string;
    };
    mobileFriendly: string;
    issues: { title: string; description: string; displayValue: string }[];
  } | null>(null);

  // Loading phase messages to keep users engaged
  const loadingSteps = [
    "Establishing connection with Google PageSpeed server...",
    "Warming up headless Chrome sandbox instance...",
    "Simulating real visitor rendering pipeline...",
    "Capturing First Contentful Paint metrics...",
    "Measuring Largest Contentful Paint benchmarks...",
    "Analyzing layout shift indices and stability...",
    "Calculating Total Blocking Time limits...",
    "Compiling critical optimization audits..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleRunTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError("Please enter a website URL first.");
      return;
    }

    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = "https://" + targetUrl;
    }

    // Basic regex URL sanity check
    try {
      new URL(targetUrl);
    } catch (_) {
      setError("Please enter a valid website URL (e.g., example.com).");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`/api/pagespeed?url=${encodeURIComponent(targetUrl)}&strategy=${strategy}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to analyze website speed.");
      }
      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please verify your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to determine status color based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return { text: "text-emerald-500", border: "border-emerald-500", bg: "bg-emerald-500", color: "#10b981" };
    if (score >= 50) return { text: "text-amber-500", border: "border-amber-500", bg: "bg-amber-500", color: "#f59e0b" };
    return { text: "text-rose-500", border: "border-rose-500", bg: "bg-rose-500", color: "#f43f5e" };
  };

  // Helper to determine metric score level
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
        // TBT is usually in ms (e.g. "150ms" or "1.5s")
        const isMs = value.includes("ms");
        const valMs = isMs ? num : num * 1000;
        return valMs <= 200 ? "good" : valMs <= 600 ? "needs-improvement" : "poor";
      case "interactive":
      case "speedIndex":
        return num <= 3.8 ? "good" : num <= 7.3 ? "needs-improvement" : "poor";
      default:
        return "good";
    }
  };

  // Accordion FAQs state
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    {
      q: "Why does website speed matter?",
      a: "Website speed is a primary Google Search ranking factor. Slow sites hurt your SEO and user experience. Over 53% of mobile visitors abandon websites that take longer than 3 seconds to load. Speeding up your site directly raises conversions, sales, and lead generation."
    },
    {
      q: "Is this PageSpeed test completely free?",
      a: "Yes! This tool runs directly via Google's PageSpeed Insights engine, offering official, enterprise-grade Core Web Vitals speed tests with zero sign-up constraints or hidden fees."
    },
    {
      q: "How often should I test my site's performance?",
      a: "We recommend analyzing speed metrics at least once a month, or immediately following any significant design upgrades, image uploads, plugin installations, or code modifications."
    },
    {
      q: "Can Metazivo optimize my website and fix these audits?",
      a: "Absolutely! We specialize in custom performance engineering. We optimize images, configure caching structures, eliminate render-blocking JS, stream CSS delivery, and rebuild heavy templates into clean, blazing-fast responsive layouts. Book a consultation below to get a detailed action plan."
    }
  ];

  return (
    <div id="view-website-speed-test" className="max-w-5xl mx-auto px-4 py-16 space-y-16 animate-fade-in text-slate-800 font-sans">
      
      {/* Title & Header Section */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full text-xs text-[#FF5722] font-mono tracking-wider uppercase shadow-sm">
          <Zap className="w-3.5 h-3.5 text-[#FF5722] animate-pulse" /> Speed Optimization
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.1]">
          Free Website Speed Test
        </h1>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
          Generate a detailed diagnostic audit of your website's performance instantly. Discover what is slowing down your mobile experience, hurting Google rankings, and costing you customers.
        </p>
      </div>

      {/* Input / Control Card */}
      <div className="bg-white border border-slate-200/80 rounded-[32px] shadow-sm p-6 md:p-8 max-w-4xl mx-auto space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5722]/5 rounded-full blur-2xl pointer-events-none" />
        
        <form onSubmit={handleRunTest} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest font-mono">Website URL</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400 text-sm font-mono select-none">https://</span>
                <input
                  type="text"
                  placeholder="yourwebsite.com"
                  value={url.replace(/^https?:\/\//i, "")}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                  className="w-full pl-[72px] pr-4 py-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-sm text-slate-950 placeholder-slate-400 focus:outline-none focus:border-[#FF5722] focus:bg-white transition-all font-mono font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest font-mono">Audit Device</label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/50">
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

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-500 leading-relaxed max-w-md text-center sm:text-left">
              Powered by Google PageSpeed Insights. Speed audits take 5-15 seconds depending on server availability.
            </span>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FF5722] hover:bg-[#FF7043] disabled:bg-slate-300 text-white font-bold rounded-2xl text-sm tracking-wide transition-all shadow-[0_4px_15px_rgba(255,87,34,0.25)] hover:shadow-[0_6px_20px_rgba(255,87,34,0.35)] flex items-center justify-center gap-2 cursor-pointer duration-150"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing Site...
                </>
              ) : (
                <>
                  <Gauge className="w-4 h-4" />
                  Test My Website Speed
                </>
              )}
            </button>
          </div>
        </form>

        {/* Loading State Container */}
        {loading && (
          <div className="border border-slate-200/80 bg-slate-50/50 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center space-y-4 animate-pulse">
            <div className="relative flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border-4 border-slate-200 border-t-[#FF5722] animate-spin" />
              <Zap className="w-5 h-5 text-[#FF5722] absolute animate-bounce" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 font-sans">Running Technical Diagnostics</h4>
              <p className="text-xs text-slate-500 max-w-sm font-mono h-8 flex items-center justify-center">
                {loadingSteps[loadingStep]}
              </p>
            </div>
            {/* Custom linear progress meter */}
            <div className="w-full max-w-xs h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FF5722] to-[#FF8A50] transition-all duration-1000 ease-out" 
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
              <span className="font-bold block mb-0.5">Test Execution Failed</span>
              {error}
            </div>
          </div>
        )}
      </div>

      {/* Results Workspace */}
      {results && !loading && (
        <div className="space-y-10 animate-fade-in max-w-4xl mx-auto">
          
          {/* Main Grid: Circle gauge and meta info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Gauge Column */}
            <div className="md:col-span-5 bg-white border border-slate-200/80 rounded-[32px] p-6 flex flex-col items-center justify-center text-center space-y-6 shadow-sm">
              <span className="text-xs font-bold text-slate-500 font-mono tracking-wider uppercase">Performance Score</span>
              
              {/* Circular SVG Progress Gauge */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    className="stroke-slate-100"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    className="transition-all duration-1000 ease-out"
                    stroke={getScoreColor(results.score).color}
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 70}
                    strokeDashoffset={2 * Math.PI * 70 * (1 - results.score / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className={`text-4xl font-extrabold font-mono tracking-tight ${getScoreColor(results.score).text}`}>
                    {results.score}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest font-mono">
                    / 100
                  </span>
                </div>
              </div>

              {/* Status Pill */}
              <div className="space-y-1">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-extrabold uppercase ${getScoreColor(results.score).bg} text-white`}>
                  {results.score >= 90 ? "Excellent" : results.score >= 50 ? "Needs Improvement" : "Poor Speed"}
                </span>
                <p className="text-xs text-slate-400 mt-2 font-mono">
                  Strategy: <span className="capitalize text-slate-700 font-bold">{results.strategy}</span>
                </p>
              </div>
            </div>

            {/* Quick Metrics & Meta Column */}
            <div className="md:col-span-7 bg-white border border-slate-200/80 rounded-[32px] p-6 md:p-8 flex flex-col justify-between shadow-sm space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">Analyzed URL</span>
                    <h3 className="text-sm font-bold text-slate-900 truncate max-w-xs md:max-w-md font-mono" title={results.url}>
                      {results.url}
                    </h3>
                  </div>
                  <a 
                    href={results.url} 
                    target="_blank" 
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer" 
                    className="p-1.5 hover:bg-slate-50 border border-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono block">Mobile Optimization</span>
                    <span className="inline-flex items-center gap-1.5 mt-1 text-slate-900 font-extrabold text-sm">
                      {results.mobileFriendly === "Yes" ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Fully Responsive
                        </>
                      ) : results.mobileFriendly === "No" ? (
                        <>
                          <AlertTriangle className="w-4 h-4 text-rose-500" /> Viewport Adjustments Needed
                        </>
                      ) : (
                        <span className="text-slate-500 italic">Desktop Test</span>
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono block">Load Assessment</span>
                    <span className="inline-flex items-center gap-1.5 mt-1 text-slate-900 font-extrabold text-sm">
                      {results.score >= 90 ? (
                        <>
                          <Zap className="w-4 h-4 text-emerald-500 animate-pulse" /> High Speed
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 text-amber-500" /> Slow Paint Speeds
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lead-Generation Section (as requested) */}
              <div className="p-4 rounded-2xl border bg-slate-50/50 space-y-3 relative overflow-hidden">
                {results.score < 90 ? (
                  <>
                    <div className="absolute top-0 right-0 w-2 h-full bg-[#FF5722]" />
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      Your website has performance issues that are likely hurting your Google ranking and losing you customers. We can fix this.
                    </p>
                    <button
                      onClick={() => onNavigate("contact")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5722] hover:text-[#FF7043] transition-colors cursor-pointer group"
                    >
                      Book a Free Consultation
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500" />
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      Great score! Want to make sure your SEO and ads are performing just as well?
                    </p>
                    <button
                      onClick={() => onNavigate("contact")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer group"
                    >
                      Talk to Us
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Core Web Vitals Metrics Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest font-mono">Core Web Vitals & Diagnostics</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard 
                label="First Contentful Paint (FCP)" 
                value={results.metrics.fcp} 
                description="The time it takes for browser to render the first piece of DOM content."
                status={getMetricStatus("fcp", results.metrics.fcp)}
              />
              <MetricCard 
                label="Largest Contentful Paint (LCP)" 
                value={results.metrics.lcp} 
                description="Measures loading performance. For high scores, this should occur within 2.5s."
                status={getMetricStatus("lcp", results.metrics.lcp)}
              />
              <MetricCard 
                label="Cumulative Layout Shift (CLS)" 
                value={results.metrics.cls} 
                description="Measures visual stability. Pages should maintain a CLS score of less than 0.1."
                status={getMetricStatus("cls", results.metrics.cls)}
              />
              <MetricCard 
                label="Total Blocking Time (TBT)" 
                value={results.metrics.tbt} 
                description="Sum of all time periods between FCP and Time to Interactive."
                status={getMetricStatus("tbt", results.metrics.tbt)}
              />
              <MetricCard 
                label="Speed Index" 
                value={results.metrics.speedIndex} 
                description="Shows how quickly the contents of a page are visibly populated."
                status={getMetricStatus("speedIndex", results.metrics.speedIndex)}
              />
              <MetricCard 
                label="Time to Interactive" 
                value={results.metrics.interactive} 
                description="The amount of time it takes for the page to become fully interactive."
                status={getMetricStatus("interactive", results.metrics.interactive)}
              />
            </div>
          </div>

          {/* Issues / Opportunities */}
          <div className="space-y-4 bg-white border border-slate-200/80 rounded-[32px] p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-500 animate-bounce" />
              <h3 className="text-base font-bold text-slate-900 font-sans">Top Opportunities & Fixes</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mb-6">
              Lighthouse has flagged the following audits. Resolving these performance constraints will significantly improve speed indexes, customer retention rates, and search position.
            </p>

            <div className="space-y-4">
              {results.issues.map((issue, idx) => (
                <div key={idx} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest font-mono">Opportunity {idx + 1}</span>
                    <h4 className="text-sm font-bold text-slate-900">{issue.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-2xl font-light">{issue.description}</p>
                  </div>
                  <div className="px-3 py-1.5 bg-rose-50 border border-rose-100 rounded-xl font-mono text-[10px] font-bold text-rose-600 self-start md:self-center shrink-0">
                    {issue.displayValue}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Accordion FAQ Section */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-[32px] p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <div className="text-center md:text-left space-y-1.5">
          <h3 className="text-lg font-bold text-slate-900 font-sans flex items-center justify-center md:justify-start gap-2">
            <HelpCircle className="w-5 h-5 text-[#FF5722]" /> Website Speed FAQ
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">Everything you need to know about Google Web Vitals, speed testing, and index optimization.</p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors text-left"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#FF5722] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 border-t border-slate-50 pt-3 text-xs text-slate-600 leading-relaxed font-light font-sans bg-slate-50/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
