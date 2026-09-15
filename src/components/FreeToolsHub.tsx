import React from "react";
import { 
  Wrench, 
  ExternalLink, 
  Zap, 
  Search, 
  BarChart3, 
  KeyRound, 
  Gauge, 
  Bug, 
  Link2, 
  Globe2, 
  TrendingUp, 
  MousePointerClick, 
  Code2, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  PhoneCall
} from "lucide-react";

interface FreeToolsHubProps {
  onNavigate: (tab: string) => void;
}

interface ToolItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  link: string;
  icon: React.ElementType;
}

export default function FreeToolsHub({ onNavigate }: FreeToolsHubProps) {
  const tools: ToolItem[] = [
    {
      id: "gsc",
      name: "Google Search Console",
      category: "Rankings & Indexing",
      badge: "Official Google",
      description: "Track real rankings, impressions, clicks and indexing issues directly from Google.",
      link: "https://search.google.com/search-console",
      icon: Search
    },
    {
      id: "ga4",
      name: "Google Analytics 4",
      category: "Traffic & Audience",
      badge: "Official Google",
      description: "Understand your traffic, user behavior and conversions for free.",
      link: "https://analytics.google.com",
      icon: BarChart3
    },
    {
      id: "gkp",
      name: "Google Keyword Planner",
      category: "Keyword Research",
      badge: "Official Google",
      description: "Find high-potential keywords with real search volume data.",
      link: "https://ads.google.com/home/lib/keyword-planner",
      icon: KeyRound
    },
    {
      id: "pagespeed",
      name: "Google PageSpeed Insights",
      category: "Core Web Vitals",
      badge: "Speed Optimization",
      description: "Check Core Web Vitals and get free speed optimization tips.",
      link: "https://pagespeed.web.dev",
      icon: Gauge
    },
    {
      id: "screaming-frog",
      name: "Screaming Frog SEO Spider (Free)",
      category: "Technical Crawling",
      badge: "Site Audit",
      description: "Technical site audit – crawl up to 500 URLs for free.",
      link: "https://www.screamingfrog.co.uk/seo-spider/",
      icon: Bug
    },
    {
      id: "ahrefs",
      name: "Ahrefs Webmaster Tools",
      category: "Backlinks & Health",
      badge: "Verified Sites",
      description: "Free backlink analysis and site audit for your verified website.",
      link: "https://ahrefs.com/webmaster-tools",
      icon: Link2
    },
    {
      id: "bing",
      name: "Bing Webmaster Tools",
      category: "Alternative Engines",
      badge: "Microsoft Search",
      description: "Extra ranking data + free keyword research from Microsoft.",
      link: "https://www.bing.com/webmasters",
      icon: Globe2
    },
    {
      id: "trends",
      name: "Google Trends",
      category: "Market Insights",
      badge: "Seasonal Trends",
      description: "Discover trending topics and seasonal search interest.",
      link: "https://trends.google.com",
      icon: TrendingUp
    },
    {
      id: "clarity",
      name: "Microsoft Clarity",
      category: "Heatmaps & Recordings",
      badge: "100% Free UX",
      description: "Free heatmaps and session recordings to see user behavior.",
      link: "https://clarity.microsoft.com",
      icon: MousePointerClick
    },
    {
      id: "rich-results",
      name: "Google Rich Results Test",
      category: "Schema & Structured Data",
      badge: "SERP Validation",
      description: "Validate structured data and rich snippets for better SERP appearance.",
      link: "https://search.google.com/test/rich-results",
      icon: Code2
    }
  ];

  return (
    <div id="view-free-tools-hub" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 space-y-16 animate-fade-in text-slate-800 font-sans">
      
      {/* Hero Header Section */}
      <div className="space-y-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 border border-orange-200/80 rounded-full text-xs text-[#FF5722] font-mono tracking-wider uppercase shadow-sm">
          <Wrench className="w-3.5 h-3.5 text-[#FF5722]" /> Metazivo Free Tools Hub
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
          Free SEO Tools Recommended by Experts
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
          These are the exact free tools we use and recommend to improve Google rankings. All tools are 100% free and powerful enough for serious results.
        </p>

        {/* Quick stat chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-mono font-semibold rounded-full border border-slate-200">
            ✓ 100% Free Forever
          </span>
          <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-mono font-semibold rounded-full border border-slate-200">
            ✓ No Credit Card Required
          </span>
          <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-mono font-semibold rounded-full border border-slate-200">
            ✓ Verified by Industry Experts
          </span>
        </div>
      </div>

      {/* Featured Built-in Live Tool Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-[32px] p-6 sm:p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5722]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5722]/20 border border-[#FF5722]/30 text-xs font-mono font-bold text-[#FF8A50] uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-[#FF5722] animate-pulse" /> Featured Live Tool by Metazivo
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Website Speed Test & Core Web Vitals Audit
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Run an instant, live diagnostic on any URL. Get genuine Time to First Byte (TTFB), Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and actionable engineering fixes to outrank slow competitors.
            </p>
          </div>

          <button
            onClick={() => onNavigate("tools/website-speed-test")}
            className="px-8 py-4 bg-[#FF5722] hover:bg-[#FF7043] text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(255,87,34,0.35)] hover:shadow-[0_6px_25px_rgba(255,87,34,0.5)] transition-all flex items-center gap-2 cursor-pointer shrink-0 active:scale-95 duration-150"
          >
            <span>Launch Speed Test</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 10 Recommended Free Tools Cards Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF5722]" /> Essential Free SEO Toolset
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              10 hand-picked official tools to diagnose, optimize, and rank your website.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-400">
            10 Tools Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <div
                key={tool.id}
                className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Top bar: Icon, index & badges */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50/80 border border-orange-100 flex items-center justify-center text-[#FF5722] group-hover:scale-105 transition-transform shrink-0">
                      <IconComponent className="w-6 h-6 text-[#FF5722]" />
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/70">
                        #{index + 1}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-[#FF5722] border border-orange-200/60">
                        {tool.badge}
                      </span>
                    </div>
                  </div>

                  {/* Category & Title */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                      {tool.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                      {tool.name}
                    </h3>
                  </div>

                  {/* User-requested description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light min-h-[40px]">
                    {tool.description}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-6 mt-4 border-t border-slate-100">
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-[#FF5722] hover:bg-[#FF7043] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-[0_3px_10px_rgba(255,87,34,0.2)] hover:shadow-[0_4px_15px_rgba(255,87,34,0.3)] transition-all cursor-pointer group-hover:translate-y-[-1px] active:scale-[0.99]"
                  >
                    <span>Use {tool.name}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Use These Tools Section */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-[32px] p-6 sm:p-8 md:p-10 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-wider">
            Expert Workflow
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            How Metazivo Engineers Use These Free SEO Tools
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            You do not need thousands of dollars in monthly subscriptions to rank on Google. Combining Google Search Console, Screaming Frog, PageSpeed Insights, and Microsoft Clarity gives you complete visibility across rankings, technical errors, Core Web Vitals, and real user behavior.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/70 space-y-2">
            <span className="text-xs font-mono font-bold text-[#FF5722]">Step 01</span>
            <h4 className="text-sm font-bold text-slate-900">Discover Crawl Errors</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use Google Search Console and Screaming Frog to uncover 404 broken links, non-indexed URLs, and missing title tags.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/70 space-y-2">
            <span className="text-xs font-mono font-bold text-[#FF5722]">Step 02</span>
            <h4 className="text-sm font-bold text-slate-900">Optimize Speed & Vitals</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Audit page speed using Google PageSpeed Insights and Metazivo's Speed Test to bring LCP and TTFB under 2.5s and 200ms.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/70 space-y-2">
            <span className="text-xs font-mono font-bold text-[#FF5722]">Step 03</span>
            <h4 className="text-sm font-bold text-slate-900">Track Conversions</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pair Google Analytics 4 with Microsoft Clarity heatmaps to see where users drop off and optimize for higher conversions.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Conversion Banner */}
      <div className="bg-white border border-slate-200 rounded-[32px] p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-wider">
            Need Expert Implementation?
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">
            Let Metazivo Handle Your SEO & Speed Optimization
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Don't have time to audit technical crawl logs or debug Core Web Vitals? Our senior engineers and SEO strategists will optimize your website for guaranteed ranking growth.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={() => onNavigate("contact")}
            className="px-6 py-3.5 bg-[#FF5722] hover:bg-[#FF7043] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(255,87,34,0.3)] transition-all cursor-pointer active:scale-95"
          >
            Get Free SEO Quote <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <a
            href="https://wa.me/923288518557?text=Hi%20Metazivo!%20I%20am%20exploring%20your%20Free%20SEO%20Tools%20and%20would%20like%20to%20consult%20about%20SEO%20and%20speed%20optimization."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" /> WhatsApp Us
          </a>
        </div>
      </div>

    </div>
  );
}
