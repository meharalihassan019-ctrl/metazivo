import React, { useState } from "react";
import {
  ChevronDown,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Share2,
  ExternalLink,
  ShieldCheck,
  Check,
  MessageSquare
} from "lucide-react";
import { SeoToolDef, SEO_TOOLS_LIST } from "./seoToolsData";

interface ToolShellProps {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
  onReset?: () => void;
  children: React.ReactNode;
}

export default function ToolShell({
  tool,
  onNavigateTool,
  onNavigateHome,
  onReset,
  children
}: ToolShellProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const relatedTools = SEO_TOOLS_LIST.filter((t) =>
    tool.relatedSlugs.includes(t.slug)
  );

  const handleShareTool = () => {
    const url = `${window.location.origin}/seo-tools/${tool.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const cleanPhone = "+923288518557";
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hi Metazivo! I was using your ${tool.name} tool and would like to consult with your SEO engineers about optimizing my website.`
  )}`;

  return (
    <article id={`seo-tool-view-${tool.slug}`} className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-fade-in text-slate-800">
      {/* Top Breadcrumb & Actions Bar */}
      <nav aria-label="SEO Tools Breadcrumb" className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onNavigateHome}
            className="hover:text-[#FF5722] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All SEO Tools
          </button>
          <span>/</span>
          <span className="text-slate-400">{tool.category}</span>
          <span>/</span>
          <span className="text-[#FF5722] font-bold">{tool.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 transition-colors text-xs font-medium cursor-pointer"
              title="Reset all inputs"
            >
              <RotateCcw className="w-3 h-3 text-slate-400" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={handleShareTool}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 transition-colors text-xs font-medium cursor-pointer"
            title="Copy direct tool link"
          >
            {copiedLink ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3 h-3 text-slate-400" />
                <span>Share Tool</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase font-mono bg-orange-50 border border-orange-200/80 text-[#FF5722]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{tool.badge}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 lowercase font-normal">Free Pro SEO Utility</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
          {tool.name}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-light font-sans">
          {tool.intro}
        </p>
      </header>

      {/* Main Tool Interactive Interface Container */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 shadow-sm transition-shadow hover:shadow-md">
        {children}
      </section>

      {/* Helpful Technical Explanation Section */}
      <section className="bg-gradient-to-br from-slate-50 to-orange-50/30 border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest">Technical Guide</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
            About {tool.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 leading-relaxed font-sans">
          <div className="space-y-2 bg-white/80 p-5 rounded-2xl border border-slate-200/60 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
              What It Is
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {tool.explanation.whatIsIt}
            </p>
          </div>

          <div className="space-y-2 bg-white/80 p-5 rounded-2xl border border-slate-200/60 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
              Why It Matters for Search Rankings
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {tool.explanation.whyItMatters}
            </p>
          </div>
        </div>

        <div className="bg-white/90 border border-slate-200/70 p-5 rounded-2xl space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
            Key SEO Best Practices
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 font-sans">
            {tool.explanation.bestPractices.map((bp, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                  ✓
                </div>
                <span>{bp}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {tool.faqs.length > 0 && (
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest">Common Questions</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {tool.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 hover:text-[#FF5722] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-[#FF5722]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed font-sans border-t border-slate-100 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related SEO Tools Recommendations */}
      {relatedTools.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-200/70">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-base font-bold text-slate-900">
              Related Free SEO Tools
            </h2>
            <button
              onClick={onNavigateHome}
              className="text-xs font-semibold text-[#FF5722] hover:underline cursor-pointer"
            >
              View All 30 Tools →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedTools.map((rt) => (
              <button
                key={rt.slug}
                onClick={() => onNavigateTool(rt.slug)}
                className="text-left p-4 rounded-2xl border border-slate-200/80 hover:border-[#FF5722]/50 hover:bg-orange-50/20 transition-all group bg-white shadow-xs cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#FF5722] uppercase tracking-wider block">
                    {rt.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#FF5722] transition-colors line-clamp-1">
                    {rt.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-light line-clamp-2">
                    {rt.shortDesc}
                  </p>
                </div>
                <div className="mt-3 text-xs font-semibold text-slate-600 group-hover:text-[#FF5722] flex items-center gap-1">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Professional SEO Services High-Converting CTA */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-neutral-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#FF5722]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 text-orange-400 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Need Custom Hands-On SEO Execution?</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Scale Past Competitors with Metazivo's Dedicated Engineers
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Automated tools diagnose bottlenecks, but sustained page-1 growth requires custom code hardening, high-authority link acquisitions, and search engine optimization executed by experts.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF5722] hover:bg-[#FF7043] text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.35)] cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Our SEO Team</span>
            </a>

            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/contact";
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/10 cursor-pointer"
            >
              <span>Request Custom Proposal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
