/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Phone,
  Search,
  Zap,
  Activity,
  ShieldCheck,
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
  FileText,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  Cpu,
  Globe
} from "lucide-react";

interface SeoServicePageProps {
  handleNavigate: (tab: string) => void;
  getWhatsAppLink: (slug?: string) => string;
}

export default function SeoServicePage({
  handleNavigate,
  getWhatsAppLink,
}: SeoServicePageProps) {
  // Interactive state for FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const whatsappLink = getWhatsAppLink("seo");

  const faqs = [
    {
      q: "1. How long does it take to see SEO results?",
      a: "Most sites see early movement in 3 to 4 months and strong results by month 6 to 9. SEO compounds over time, so traffic keeps growing even after the campaign matures, unlike ads that stop the day you stop paying."
    },
    {
      q: "2. Does Google treat AI-written content differently than human content?",
      a: "Yes. Google's systems are built to detect and demote generic AI content that lacks real expertise or original insight. Human-researched writing that shows real experience tends to rank higher and hold its position through algorithm updates."
    },
    {
      q: "3. What is JSON-LD schema markup and why does it matter?",
      a: "JSON-LD schema is structured code added to your pages that tells search engines exactly what your content means. It helps you show up in rich results, featured snippets, and AI-generated answers instead of getting misread or ignored."
    },
    {
      q: "4. What's the difference between vanity traffic and commercial intent leads?",
      a: "Vanity traffic is visitors who never buy anything, often from broad, low-value keywords. Commercial intent leads come from searches showing real buying interest, like 'best CRM for small business.' Metazivo targets the second type."
    },
    {
      q: "5. How does SEO cost compare to Google Ads over time?",
      a: "Google Ads traffic stops the moment you stop paying. SEO traffic keeps flowing long after the work is done, so the cost per visitor drops every month a page keeps ranking. Most businesses see SEO become cheaper than ads within a year."
    },
    {
      q: "6. Do Core Web Vitals and mobile speed really affect rankings?",
      a: "Yes. Google uses Core Web Vitals — loading speed, interactivity, and visual stability — as a direct ranking factor. Slow or unstable mobile pages rank lower even with strong content, since most searches now happen on phones."
    },
    {
      q: "7. What is topical authority and why does it matter?",
      a: "Topical authority means Google sees your site as a complete, trustworthy source on a subject, not just one page that happens to match a keyword. Sites with full topic clusters consistently outrank single articles, even well-written ones."
    },
    {
      q: "8. What's the risk of black-hat backlinks versus white-hat link building?",
      a: "Black-hat backlinks (bought links, spam networks) can trigger Google penalties that tank your rankings overnight. White-hat link building earns links through real outreach and quality content, which builds authority safely and holds up over time."
    },
    {
      q: "9. How do Google algorithm updates affect well-optimized sites?",
      a: "Sites built on real technical foundations and genuine expertise usually stay stable or even gain ground during updates. Algorithm changes mainly punish thin content, keyword stuffing, and manipulative tactics — the things Metazivo avoids by design."
    },
    {
      q: "10. How do you report on SEO results and ROI?",
      a: "We track rankings, organic traffic, and — most importantly — conversions and leads generated from search. Monthly reports show real business impact, not just traffic numbers, so you always know what your investment is actually producing."
    }
  ];

  return (
    <div id="view-seo-service-page" className="max-w-5xl mx-auto px-4 py-12 space-y-16 animate-fade-in text-slate-800">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <button
          onClick={() => handleNavigate("services")}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Services
        </button>
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FF5722] bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/60">
          Metazivo • SEO & Blog Writing
        </span>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO & OPENING                                                 */}
      {/* ========================================================================= */}
      <section className="space-y-6 pt-2">
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest block">
            ✦ HIGH-YIELD AGENCY SOLUTION
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
            Stop Renting Traffic. Start Owning It.
          </h1>
        </div>

        <div className="space-y-4 max-w-3xl text-slate-600 text-sm sm:text-base leading-relaxed font-light">
          <p>
            Every dollar you put into ads stops working the second you stop paying. SEO is different. A page you build today can bring in customers for years without you touching it again. That's why smart businesses treat organic search as an asset, not an expense.
          </p>
          <p>
            Most agencies sell you keyword lists and 500-word filler posts that never rank. Metazivo builds real search visibility — technical fixes, structured content, and writing done by people who actually understand your industry. No shortcuts, no AI spam, no vanity traffic that never buys anything.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-wrap gap-4 items-center pt-3">
          <button
            onClick={() => handleNavigate("tools/website-speed-test")}
            className="px-6 py-3.5 bg-[#FF5722] hover:bg-[#F4511E] text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-[0_4px_14px_rgba(255,87,34,0.3)] hover:shadow-[0_6px_20px_rgba(255,87,34,0.4)] transition-all cursor-pointer active:scale-95"
          >
            <Zap className="w-4 h-4 text-orange-100" />
            <span>Get My Free SEO Audit</span>
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-[0_4px_14px_rgba(16,185,129,0.25)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer border border-emerald-500/20 active:scale-95"
          >
            <Phone className="w-4 h-4 text-emerald-100" />
            <span>Book a Strategy Call</span>
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: COMPARISON TABLE                                              */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
            Strategic Distinction
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            Why Old SEO Fails vs. Modern Revenue SEO
          </h2>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-[28px] overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-slate-200 bg-slate-50/80">
            <div className="p-4 sm:p-5 text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b md:border-b-0 md:border-r border-slate-200">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Old SEO Approach</span>
            </div>
            <div className="p-4 sm:p-5 text-xs sm:text-sm font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2 bg-emerald-50/50">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Metazivo's Modern Revenue SEO</span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-xs sm:text-sm">
              <div className="p-4 sm:p-5 bg-rose-50/20 md:border-r border-slate-200 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-slate-600 leading-relaxed">
                  Stuffing the same keyword 20 times into thin pages
                </span>
              </div>
              <div className="p-4 sm:p-5 bg-emerald-50/20 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-slate-900 font-medium leading-relaxed">
                  Covering a topic fully so Google sees you as the trusted source
                </span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-xs sm:text-sm">
              <div className="p-4 sm:p-5 bg-rose-50/20 md:border-r border-slate-200 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-slate-600 leading-relaxed">
                  Cheap AI-generated articles with no real research
                </span>
              </div>
              <div className="p-4 sm:p-5 bg-emerald-50/20 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-slate-900 font-medium leading-relaxed">
                  Human-written content backed by real industry knowledge and data
                </span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-xs sm:text-sm">
              <div className="p-4 sm:p-5 bg-rose-50/20 md:border-r border-slate-200 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-slate-600 leading-relaxed">
                  Random blog posts with no structure
                </span>
              </div>
              <div className="p-4 sm:p-5 bg-emerald-50/20 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-slate-900 font-medium leading-relaxed">
                  Full topic clusters that connect and reinforce each other
                </span>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 text-xs sm:text-sm">
              <div className="p-4 sm:p-5 bg-rose-50/20 md:border-r border-slate-200 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-slate-600 leading-relaxed">
                  No schema markup, so Google guesses what your page means
                </span>
              </div>
              <div className="p-4 sm:p-5 bg-emerald-50/20 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span className="text-slate-900 font-medium leading-relaxed">
                  JSON-LD schema that tells Google exactly what your content is
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: SPLIT SECTION 1 (TEXT + IMAGE)                                 */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Column A: Text */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-wider block">
            Infrastructure & Core Web Vitals
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug">
            Technical SEO Foundation & Site Architecture
          </h2>
          <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
            <p>
              A great blog post on a broken website goes nowhere. Before we write a single word, we fix what's under the hood. That means Core Web Vitals — how fast your site loads, how stable it feels, how quickly someone can actually click something. Google uses these numbers directly in rankings, and slow sites lose to fast ones even with weaker content.
            </p>
            <p>
              We also build JSON-LD schema markup into every page — structured data that tells Google and AI search tools exactly what your business does, what your articles cover, and how your pages relate to each other. Combined with clean crawlability and an organized sitemap, this gives search engines a clear map of your site instead of a guessing game.
            </p>
          </div>
          <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-slate-700">
            <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Core Web Vitals (95+)
            </span>
            <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> JSON-LD Schema
            </span>
            <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> XML Sitemap Caching
            </span>
          </div>
        </div>

        {/* Column B: Professional Real Image Dashboard Mockup */}
        <div className="lg:col-span-5">
          <div className="relative rounded-[28px] overflow-hidden border border-slate-200/90 shadow-lg bg-slate-900 group">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
              alt="Modern dashboard mockup showing clean site health, schema validation, and speed score 95+"
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-72 sm:h-80 object-cover opacity-85 group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

            {/* Live Verified Metric Badges Overlaid on Mockup */}
            <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-md text-white text-[11px] font-mono font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
              <Activity className="w-3 h-3" />
              <span>Speed Score 98/100</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80 text-white space-y-2 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">Technical Audit Status</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Validated
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-center border-t border-slate-800">
                <div className="bg-slate-800/80 p-1.5 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-mono">LCP</span>
                  <span className="text-xs font-bold text-emerald-300 font-mono">0.8s</span>
                </div>
                <div className="bg-slate-800/80 p-1.5 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-mono">FID</span>
                  <span className="text-xs font-bold text-emerald-300 font-mono">12ms</span>
                </div>
                <div className="bg-slate-800/80 p-1.5 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-mono">CLS</span>
                  <span className="text-xs font-bold text-emerald-300 font-mono">0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: MID-PAGE PARAGRAPHS                                            */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-tr from-slate-50 via-orange-50/20 to-slate-50 p-8 sm:p-10 border border-slate-200/90 rounded-[32px] space-y-5 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#FF5722]" />
        
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-wider block">
            Search Ecosystem Mapping
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            Topical Authority & Search Intent
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          <p>
            Google doesn't rank pages anymore — it ranks sources it trusts. A single article about "best running shoes" can't beat a site with 40 connected articles covering every angle: shoe types, foot conditions, brands, terrain, injury prevention. That's a topic cluster, and it's why some sites dominate a niche while others with "better" individual posts stay buried on page three.
          </p>
          <p>
            This is also about matching what people actually want when they search. Someone searching "running shoes for flat feet" wants a buying decision, not a history lesson. We map each piece of content to real search intent — informational, commercial, or transactional — so the right page shows up for the right reason, and turns that visit into a lead or a sale.
          </p>
        </div>

        {/* Intent categorization pill row */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase text-blue-600 font-bold block">1. Informational Intent</span>
            <p className="text-[11px] text-slate-600">Guides, comparisons & educational authority clusters that capture top-of-funnel traffic.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#FF5722] font-bold block">2. Commercial Intent</span>
            <p className="text-[11px] text-slate-600">Best-of lists, vendor evaluations & solution comparisons during buyer consideration.</p>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] font-mono uppercase text-emerald-600 font-bold block">3. Transactional Intent</span>
            <p className="text-[11px] text-slate-600">High-converting sales pages, pricing frameworks & direct consultation booking funnels.</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: DELIVERABLES TABLE                                             */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
            End-To-End Execution
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            Complete Organic Growth Deliverables
          </h2>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white border border-slate-200/90 rounded-[28px] overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600">
                <th className="py-4 px-5">Phase</th>
                <th className="py-4 px-5">Deliverable</th>
                <th className="py-4 px-5">What We Do</th>
                <th className="py-4 px-5">Expected Business Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-5 font-mono font-bold text-[#FF5722] align-top whitespace-nowrap">
                  1. Foundation
                </td>
                <td className="py-4 px-5 font-bold text-slate-900 align-top">
                  Technical SEO Audit & Fixes
                </td>
                <td className="py-4 px-5 text-slate-600 leading-relaxed align-top">
                  Fix site speed, crawl errors, broken links, mobile issues, Core Web Vitals
                </td>
                <td className="py-4 px-5 text-emerald-700 font-medium leading-relaxed align-top bg-emerald-50/30">
                  Site becomes eligible to rank at all — removes hidden blockers
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-5 font-mono font-bold text-[#FF5722] align-top whitespace-nowrap">
                  2. Structure
                </td>
                <td className="py-4 px-5 font-bold text-slate-900 align-top">
                  Schema Markup & Site Architecture
                </td>
                <td className="py-4 px-5 text-slate-600 leading-relaxed align-top">
                  Implement JSON-LD schema, clean URL structure, internal linking, XML sitemap
                </td>
                <td className="py-4 px-5 text-emerald-700 font-medium leading-relaxed align-top bg-emerald-50/30">
                  Search engines and AI tools understand and trust your content faster
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-5 font-mono font-bold text-[#FF5722] align-top whitespace-nowrap">
                  3. Content
                </td>
                <td className="py-4 px-5 font-bold text-slate-900 align-top">
                  Topic Cluster Content Strategy
                </td>
                <td className="py-4 px-5 text-slate-600 leading-relaxed align-top">
                  Research, plan, and write pillar pages and supporting articles by real writers
                </td>
                <td className="py-4 px-5 text-emerald-700 font-medium leading-relaxed align-top bg-emerald-50/30">
                  Rankings across a full topic, not just one lucky keyword
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-5 font-mono font-bold text-[#FF5722] align-top whitespace-nowrap">
                  4. Growth
                </td>
                <td className="py-4 px-5 font-bold text-slate-900 align-top">
                  Ongoing Optimization & Reporting
                </td>
                <td className="py-4 px-5 text-slate-600 leading-relaxed align-top">
                  Track rankings, traffic, and conversions; refresh underperforming pages monthly
                </td>
                <td className="py-4 px-5 text-emerald-700 font-medium leading-relaxed align-top bg-emerald-50/30">
                  Compounding traffic growth and measurable revenue from organic search
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Responsive Cards View */}
        <div className="md:hidden space-y-4">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2.5 shadow-sm">
            <span className="text-xs font-mono font-bold text-[#FF5722] block">Phase 1. Foundation</span>
            <h3 className="text-base font-bold text-slate-900">Technical SEO Audit & Fixes</h3>
            <p className="text-xs text-slate-600"><strong className="text-slate-800">What We Do:</strong> Fix site speed, crawl errors, broken links, mobile issues, Core Web Vitals</p>
            <p className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 font-medium">
              <strong>Impact:</strong> Site becomes eligible to rank at all — removes hidden blockers
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2.5 shadow-sm">
            <span className="text-xs font-mono font-bold text-[#FF5722] block">Phase 2. Structure</span>
            <h3 className="text-base font-bold text-slate-900">Schema Markup & Site Architecture</h3>
            <p className="text-xs text-slate-600"><strong className="text-slate-800">What We Do:</strong> Implement JSON-LD schema, clean URL structure, internal linking, XML sitemap</p>
            <p className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 font-medium">
              <strong>Impact:</strong> Search engines and AI tools understand and trust your content faster
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2.5 shadow-sm">
            <span className="text-xs font-mono font-bold text-[#FF5722] block">Phase 3. Content</span>
            <h3 className="text-base font-bold text-slate-900">Topic Cluster Content Strategy</h3>
            <p className="text-xs text-slate-600"><strong className="text-slate-800">What We Do:</strong> Research, plan, and write pillar pages and supporting articles by real writers</p>
            <p className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 font-medium">
              <strong>Impact:</strong> Rankings across a full topic, not just one lucky keyword
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2.5 shadow-sm">
            <span className="text-xs font-mono font-bold text-[#FF5722] block">Phase 4. Growth</span>
            <h3 className="text-base font-bold text-slate-900">Ongoing Optimization & Reporting</h3>
            <p className="text-xs text-slate-600"><strong className="text-slate-800">What We Do:</strong> Track rankings, traffic, and conversions; refresh underperforming pages monthly</p>
            <p className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 font-medium">
              <strong>Impact:</strong> Compounding traffic growth and measurable revenue from organic search
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: SPLIT SECTION 2 (TEXT + IMAGE)                                 */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Column A: Text */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-wider block">
            Google Helpful Content & E-E-A-T Compliance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug">
            Human-Crafted Content, E-E-A-T & AI Prevention
          </h2>
          <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
            <p>
              Google's helpful content system is built to catch generic, mass-produced writing — and most AI-only content gets flagged eventually, even if it ranks for a few weeks first. We don't take that risk. Every article starts with real research: talking to people in your industry, checking primary sources, and writing from actual experience instead of recycling what's already on page one.
            </p>
            <p>
              This is what Google calls E-E-A-T — Experience, Expertise, Authoritativeness, Trust. It's not a checkbox; it's the difference between an article that sounds like it knows what it's talking about and one that just fills space. Our writers work like journalists, not content spinners, which protects your site long after an algorithm update rolls through.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs font-mono">
            <div className="p-2 bg-slate-100 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] block">E</span>
              <strong className="text-slate-800">Experience</strong>
            </div>
            <div className="p-2 bg-slate-100 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] block">E</span>
              <strong className="text-slate-800">Expertise</strong>
            </div>
            <div className="p-2 bg-slate-100 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] block">A</span>
              <strong className="text-slate-800">Authority</strong>
            </div>
            <div className="p-2 bg-slate-100 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] block">T</span>
              <strong className="text-slate-800">Trust</strong>
            </div>
          </div>
        </div>

        {/* Column B: Professional Real Visual Infographic */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900 border border-slate-800 rounded-[28px] p-6 text-white space-y-5 shadow-xl relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#FF5722] font-bold uppercase tracking-wider block">
                Infographic Architecture
              </span>
              <h3 className="text-base font-bold text-white">
                Thin AI Spam vs. Deep Topic Cluster
              </h3>
            </div>

            {/* Visual comparison diagram */}
            <div className="space-y-3">
              {/* Bad approach */}
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-rose-500/30 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-rose-400 font-bold flex items-center gap-1.5">
                    <X className="w-3.5 h-3.5" /> Thin AI Content Spinner
                  </span>
                  <span className="text-[10px] text-rose-300/80">Penalty Risk: High</span>
                </div>
                <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                  Recycled generic text • No primary citations • 0 topic connections • Demoted on core algorithm updates.
                </p>
              </div>

              {/* Good approach: Deep Topic Cluster */}
              <div className="p-4 bg-gradient-to-br from-emerald-950/40 to-slate-800/80 rounded-2xl border border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> Deep Semantic Cluster
                  </span>
                  <span className="text-[10px] text-emerald-300 font-bold">E-E-A-T Verified</span>
                </div>
                
                {/* Cluster Visual Graph */}
                <div className="py-2 flex items-center justify-center gap-2 text-[10px] font-mono">
                  <div className="px-2 py-1 bg-emerald-500 text-slate-950 font-bold rounded-lg shadow-sm">
                    Pillar Page
                  </div>
                  <span className="text-slate-500">&larr;&rarr;</span>
                  <div className="space-y-1">
                    <div className="px-2 py-0.5 bg-slate-800 text-slate-200 border border-slate-700 rounded text-[9px]">Sub-Cluster 01</div>
                    <div className="px-2 py-0.5 bg-slate-800 text-slate-200 border border-slate-700 rounded text-[9px]">Sub-Cluster 02</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                  Primary research & expert quotes • Connected internal linking • JSON-LD Article Schema • Compounds traffic for years.
                </p>
              </div>
            </div>

            {/* Real editorial desk stock photo at bottom of card */}
            <div className="relative rounded-xl overflow-hidden h-28 border border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                alt="Human editorial team analyzing research and primary sources"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-300">
                100% Human-Crafted Research Workflow
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: FAQs (AEO-OPTIMIZED)                                           */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-wider block">
            Direct Answer Engine Optimization (AEO / GEO)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            Frequently Asked Questions (AEO-Optimized)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light">
            Structured answers engineered for Google Answer Overviews, AI search engines, and commercial buyers.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {faq.q}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-light border-t border-slate-100 pt-3 bg-slate-50/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: FINAL CTA                                                      */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 text-white p-8 sm:p-12 rounded-[32px] border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5722]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-2xl mx-auto relative z-10">
          <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest block">
            ✦ Take Command of Organic Search
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Own Your Search Traffic Instead of Renting It?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Stop losing qualified buyers to competitors every single day. Transform your website into an authoritative revenue asset that generates high-intent leads compounding over time.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 relative z-10">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-[0_4px_16px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_22px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 border border-emerald-500/30 cursor-pointer active:scale-95"
          >
            <Phone className="w-4 h-4 text-emerald-100" />
            <span>Message Us on WhatsApp for a Free Consultation</span>
          </a>
          <button
            onClick={() => handleNavigate("tools/website-speed-test")}
            className="w-full sm:w-auto px-7 py-4 bg-[#FF5722] hover:bg-[#F4511E] text-white font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-[0_4px_16px_rgba(255,87,34,0.3)] hover:shadow-[0_6px_22px_rgba(255,87,34,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Zap className="w-4 h-4 text-orange-100" />
            <span>Request Your Free SEO Audit</span>
          </button>
        </div>
      </section>
    </div>
  );
}
