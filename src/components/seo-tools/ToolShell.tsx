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
  MessageSquare,
  CheckCircle2
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
    tool.relatedSlugs?.includes(t.slug)
  );

  const handleShareTool = () => {
    const url = `${window.location.origin}/tools/${tool.slug}`;
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
          <a
            href="/seo-tools"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="hover:text-[#FF5722] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All SEO Tools
          </a>
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
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase font-mono bg-orange-50 border border-orange-200/80 text-[#FF5722]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{tool.badge}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 lowercase font-normal">Free Pro SEO Utility</span>
          </div>
          {tool.primaryKeyword && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium font-mono bg-slate-100 border border-slate-200 text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Focus: {tool.primaryKeyword}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
          {tool.name}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-light font-sans">
          {tool.intro}
        </p>

        {tool.tags && tool.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase mr-1">Topics:</span>
            {tool.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 hover:bg-orange-50 hover:text-[#FF5722] text-slate-600 border border-slate-200/70 transition-colors font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Main Tool Interactive Interface Container */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 shadow-sm transition-shadow hover:shadow-md">
        {children}
      </section>

      {/* Comprehensive Tool Overview: What It Is & What It Does */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-[#FF5722] bg-orange-50 border border-orange-200/80 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tool Purpose & Overview</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
            What Is the {tool.name} and What Does It Do?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-3xl leading-relaxed">
            {tool.explanation?.whatIsIt || tool.intro || tool.shortDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2.5">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
              Who Is This Tool Built For?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed for website owners, in-house marketers, freelance content creators, and technical SEO agencies who need fast, accurate diagnostic checks without paying costly monthly software subscriptions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2.5">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              What Specific Problem Does It Solve?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automates manual inspection tasks—eliminating guesswork by scanning your code, headings, metadata, or queries against Google's latest algorithm guidelines to give you clear, actionable fixes in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Usage Guide: How to Use This Tool */}
      {tool.howToUse && tool.howToUse.length > 0 && (
        <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-[#FF5722] bg-orange-50 border border-orange-200/80 uppercase tracking-widest">
              <span>Step-by-Step Practical Guide</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
              How to Use the {tool.name} (Step-by-Step)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl">
              Follow these simple steps to run your test, interpret diagnostic findings, and apply immediate improvements to your live site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tool.howToUse.map((item, idx) => (
              <div
                key={idx}
                className="relative p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 flex flex-col justify-between space-y-3 hover:border-orange-200 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF5722] font-mono font-bold text-sm flex items-center justify-center">
                    0{item.step}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm font-sans">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Practical Pro Tip Box */}
          <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/70 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 text-xs font-bold font-mono">
              TIP
            </div>
            <div className="space-y-1 text-xs text-slate-700">
              <strong className="text-slate-900 font-bold block">Senior SEO Practitioner Advice:</strong>
              <p className="leading-relaxed">
                Always re-test your URL after applying changes in your CMS or code repository. Verify that server caches (Cloudflare, WP Rocket, Varnish) are purged so Googlebot and search evaluators immediately see your updated configuration.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Why This Tool Is Essential */}
      <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-rose-600 bg-rose-50 border border-rose-200 uppercase tracking-widest">
            <span>Critical Necessity</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
            Why Is the {tool.name} Essential for Your Website?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-3xl leading-relaxed">
            {tool.explanation?.whyItMatters || "Search engines prioritize sites that offer technically clean code, intuitive structure, and transparent user experiences. Overlooking this step directly impacts your indexation and search visibility."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-2">
            <h3 className="font-bold text-rose-950 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              What Happens If You Ignore This?
            </h3>
            <p className="text-xs text-rose-900/80 leading-relaxed">
              Unaddressed bottlenecks—such as broken links, missing schema, sluggish speeds, or keyword cannibalization—lead to wasted crawl budget, de-indexed pages, lost keyword positions, and lower click-through rates.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-2">
            <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              The Business & Ranking Upside
            </h3>
            <p className="text-xs text-emerald-900/80 leading-relaxed">
              Fixing these items guarantees rapid Googlebot crawling, higher organic rankings, improved user retention, and consistent citations across modern AI discovery engines like ChatGPT and Perplexity.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Multi-Engine Framework: SEO, AEO, GEO & Google E-E-A-T */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-neutral-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-72 h-72 bg-[#FF5722]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-orange-400 bg-white/10 border border-white/10 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Multi-Engine Framework</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            How This Tool Empowers SEO, AEO, GEO & E-E-A-T
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-light">
            Search is no longer just ten blue links. Modern digital growth requires a four-pillar optimization strategy covering traditional crawlers, answer engines, generative AI assistants, and human trust signals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 relative z-10">
          {/* 1. Classic SEO */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                SEO
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Googlebot / Bing</span>
            </div>
            <h3 className="text-sm font-bold text-white">Classic Search Engine Optimization</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Streamlines crawl efficiency, eliminates technical barriers, and ensures core ranking factors (titles, status codes, speed) help your pages climb Google's page 1.
            </p>
          </div>

          {/* 2. AEO */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 hover:border-orange-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 bg-orange-950/60 px-2.5 py-0.5 rounded-full border border-orange-800/60">
                AEO
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Position Zero</span>
            </div>
            <h3 className="text-sm font-bold text-white">Answer Engine Optimization</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Formats direct answers and structured lists right beneath question headers so voice search devices (Google Assistant, Siri) and Featured Snippets grab your answers first.
            </p>
          </div>

          {/* 3. GEO */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-800/60">
                GEO
              </span>
              <span className="text-[11px] text-slate-400 font-mono">ChatGPT / Perplexity</span>
            </div>
            <h3 className="text-sm font-bold text-white">Generative Engine Optimization</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Prepares structured facts, entity definitions, and verifiable data points so conversational AI engines cite and link to your website in response to user prompts.
            </p>
          </div>

          {/* 4. E-E-A-T */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 hover:border-purple-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-800/60">
                E-E-A-T
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Quality Raters</span>
            </div>
            <h3 className="text-sm font-bold text-white">Experience, Expertise & Trust</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Signals first-hand practitioner testing, authentic authorship, secure infrastructure, and transparent contact channels—fulfilling Google's Quality Rater Guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      {tool.benefits && tool.benefits.length > 0 && (
        <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest">
              Core Value Proposition
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
              Key Advantages of the {tool.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl">
              Engineered to give you a definitive edge over competitors relying on outdated, generic SEO techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tool.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50/60 border border-slate-200/70 space-y-2.5 hover:border-orange-200 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm font-sans">
                  {benefit.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Best Practices Checklist */}
      {tool.explanation?.bestPractices && tool.explanation.bestPractices.length > 0 && (
        <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest">Checklist</span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-950">
              Recommended Best Practices Checklist
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {tool.explanation.bestPractices.map((bp, i) => (
              <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                  ✓
                </div>
                <span className="leading-relaxed">{bp}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Frequently Asked Questions (5 to 6 in-depth FAQs) */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section itemScope itemType="https://schema.org/FAQPage" className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest">
                Expert Answers
              </span>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                {tool.faqs.length} Comprehensive FAQs
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
              Frequently Asked Questions About {tool.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl">
              Real-world answers written by experienced technical SEO practitioners—addressing practical usage, troubleshooting, and optimization for Google, AI engines, and voice search.
            </p>
          </div>

          <div className="space-y-3">
            {tool.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                  className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-xs transition-all hover:border-slate-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 hover:text-[#FF5722] transition-colors cursor-pointer"
                  >
                    <span itemProp="name" className="leading-snug">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-[#FF5722]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                      className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed font-sans border-t border-slate-100 animate-fade-in"
                    >
                      <div itemProp="text" className="space-y-2">
                        {faq.a}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related SEO Tools Recommendations with direct HTML links */}
      {relatedTools.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-200/70">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest block">More Utilities</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                Related SEO Tools
              </h2>
            </div>
            <a
              href="/seo-tools"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="text-xs font-semibold text-[#FF5722] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View All 31 Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedTools.map((rt) => (
              <a
                key={rt.slug}
                href={`/tools/${rt.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateTool(rt.slug);
                }}
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
              </a>
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
