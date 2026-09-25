import React, { useState, useMemo, useEffect } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Smartphone,
  Tablet,
  Laptop,
  X,
  ExternalLink,
  Flame,
  Lightbulb,
  AlertTriangle,
  Zap,
  ShieldCheck,
  MousePointerClick,
  Code2,
  Eye,
  ArrowRight,
  Wand2,
  CheckCircle2,
  Layers
} from "lucide-react";
import { analyzeArticleForCta, SmartCtaRecommendation } from "../utils/smartCtaAnalyzer";
import { CtaBoxAttributes, CtaTheme } from "./tiptap-cta-box";

export type CtaLayout = "horizontal" | "vertical" | "compact";
export type DevicePreview = "laptop" | "tablet" | "mobile";

export interface CtaBoxBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertCta: (html: string, attrs?: CtaBoxAttributes) => void;
  initialValues?: Partial<CtaBoxAttributes>;
  articleContent?: string;
  articleTitle?: string;
}

interface CtaPreset {
  id: string;
  name: string;
  icon: string;
  theme: CtaTheme;
  layout: CtaLayout;
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  footerNote: string;
}

const PRESETS: CtaPreset[] = [
  {
    id: "tool-scanner",
    name: "⚡ Free Tool Scanner (High Intent)",
    icon: "⚡",
    theme: "metazivo-orange",
    layout: "horizontal",
    badge: "⚡ 100% Free SEO Diagnostic",
    title: "Want to scan your website right now?",
    description: "Run Metazivo's instant broken link checker to detect 404 dead links, broken redirects, and security threats before they harm your rankings.",
    buttonText: "Launch Free Scanner →",
    buttonUrl: "/tools/broken-link-checker",
    footerNote: "✓ No Signup Required  ✓ Instant Real-Time Crawl  ✓ Direct Export"
  },
  {
    id: "pro-tip",
    name: "💡 Editorial Pro Tip / Callout",
    icon: "💡",
    theme: "pro-indigo",
    layout: "horizontal",
    badge: "💡 Expert Technical Recommendation",
    title: "Always audit internal link flow quarterly",
    description: "Orphaned pages without inbound internal links lose crawl priority in Google. Use our internal link finder to bridge authority gaps.",
    buttonText: "Find Internal Link Gaps →",
    buttonUrl: "/tools/internal-link-finder",
    footerNote: "Recommended by Senior SEO Specialists"
  },
  {
    id: "growth-consult",
    name: "🚀 Agency Service & Consultation",
    icon: "🚀",
    theme: "emerald-growth",
    layout: "horizontal",
    badge: "🚀 High-Performance Growth",
    title: "Ready to scale traffic and outrank competitors?",
    description: "Get a bespoke technical audit and custom WordPress architecture review tailored to your exact industry niche.",
    buttonText: "Request Free Audit →",
    buttonUrl: "/contact",
    footerNote: "✓ Direct Engineer Review  ✓ 24-Hour Turnaround"
  },
  {
    id: "critical-warning",
    name: "⚠️ Caution & Error Fix Callout",
    icon: "⚠️",
    theme: "amber-warning",
    layout: "vertical",
    badge: "⚠️ Critical SEO Warning",
    title: "Avoid multiple 301 redirect chain loops",
    description: "Redirect hops beyond 1 step waste search engine crawl budget and cause Googlebot to drop rankings. Test your URLs to ensure instant 200 OK canonical responses.",
    buttonText: "Verify Redirect Chains Now →",
    buttonUrl: "/tools/redirect-checker",
    footerNote: "Preserve 100% link equity across migrations"
  }
];

const COMMON_METAZIVO_TOOLS = [
  { label: "Broken Link Checker & Threats", url: "/tools/broken-link-checker" },
  { label: "Website Speed & Core Web Vitals", url: "/tools/website-speed-test" },
  { label: "SEO Audit Checker (360°)", url: "/tools/seo-audit-checker" },
  { label: "Schema Markup Generator (JSON-LD)", url: "/tools/schema-markup-generator" },
  { label: "Redirect Checker & Path Tracer", url: "/tools/redirect-checker" },
  { label: "XML Sitemap Generator & Validator", url: "/tools/xml-sitemap-generator" },
  { label: "Robots.txt Generator & Auditor", url: "/tools/robots-txt-generator" },
  { label: "Keyword Clustering & Topical Authority", url: "/tools/keyword-clustering-tool" },
  { label: "Internal Link Finder & Orphan Auditor", url: "/tools/internal-link-finder" },
  { label: "Heading Structure & H1-H6 Auditor", url: "/tools/heading-structure-tool" },
  { label: "Local SEO & NAP Auditor", url: "/tools/local-seo-audit" },
  { label: "Incoming Backlinks & Anchor Auditor", url: "/tools/incoming-links-checker" },
  { label: "Agency Contact & Free Strategy Session", url: "/contact" },
  { label: "Core Agency Growth Services", url: "/services" }
];

export default function CtaBoxBuilder({
  isOpen,
  onClose,
  onInsertCta,
  initialValues,
  articleContent = "",
  articleTitle = ""
}: CtaBoxBuilderProps) {
  const [theme, setTheme] = useState<CtaTheme>(initialValues?.theme || "metazivo-orange");
  const [layout, setLayout] = useState<CtaLayout>(initialValues?.layout || "horizontal");
  const [badge, setBadge] = useState(initialValues?.badge ?? "⚡ 100% Free SEO Diagnostic");
  const [title, setTitle] = useState(initialValues?.title || "Want to scan your website right now?");
  const [description, setDescription] = useState(
    initialValues?.description ||
      "Run Metazivo's instant broken link checker to detect 404 dead links, broken redirects, and security threats before they harm your rankings."
  );
  const [buttonText, setButtonText] = useState(initialValues?.buttonText || "Launch Free Scanner →");
  const [buttonUrl, setButtonUrl] = useState(initialValues?.buttonUrl || "/tools/broken-link-checker");
  const [footerNote, setFooterNote] = useState(
    initialValues?.footerNote ?? "✓ No Signup Required  ✓ Instant Real-Time Crawl  ✓ Direct Export"
  );
  const [device, setDevice] = useState<DevicePreview>("laptop");
  const [viewTab, setViewTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  // Sync initial values if provided
  useEffect(() => {
    if (initialValues) {
      if (initialValues.theme) setTheme(initialValues.theme);
      if (initialValues.layout) setLayout(initialValues.layout);
      if (initialValues.badge !== undefined) setBadge(initialValues.badge);
      if (initialValues.title) setTitle(initialValues.title);
      if (initialValues.description) setDescription(initialValues.description);
      if (initialValues.buttonText) setButtonText(initialValues.buttonText);
      if (initialValues.buttonUrl) setButtonUrl(initialValues.buttonUrl);
      if (initialValues.footerNote !== undefined) setFooterNote(initialValues.footerNote);
    }
  }, [initialValues]);

  // Run Smart Article Analysis
  const smartAnalysis = useMemo(() => {
    if (!articleContent || articleContent.trim().length < 50) return null;
    return analyzeArticleForCta(articleContent, articleTitle);
  }, [articleContent, articleTitle]);

  const applyRecommendation = (rec: SmartCtaRecommendation) => {
    setTheme(rec.theme);
    setLayout(rec.layout);
    setBadge(rec.badge);
    setTitle(rec.title);
    setDescription(rec.description);
    setButtonText(rec.buttonText);
    setButtonUrl(rec.buttonUrl);
    setFooterNote(rec.footerNote);
  };

  const loadPreset = (preset: CtaPreset) => {
    setTheme(preset.theme);
    setLayout(preset.layout);
    setBadge(preset.badge);
    setTitle(preset.title);
    setDescription(preset.description);
    setButtonText(preset.buttonText);
    setButtonUrl(preset.buttonUrl);
    setFooterNote(preset.footerNote);
  };

  // Generate ultra-clean, bulletproof, responsive HTML
  const compiledHtml = useMemo(() => {
    let containerBg = "#FFF7ED";
    let borderColor = "#FF5722";
    let badgeBg = "#FFEDD5";
    let badgeText = "#C2410C";
    let titleColor = "#1E293B";
    let descColor = "#475569";
    let btnBg = "linear-gradient(135deg, #FF5722 0%, #E64A19 100%)";
    let btnText = "#FFFFFF";
    let btnShadow = "0 4px 14px rgba(255, 87, 34, 0.35)";
    let footerColor = "#94A3B8";

    if (theme === "pro-indigo") {
      containerBg = "#F5F7FF";
      borderColor = "#6366F1";
      badgeBg = "#EEF2FF";
      badgeText = "#4338CA";
      titleColor = "#0F172A";
      descColor = "#334155";
      btnBg = "linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)";
      btnText = "#FFFFFF";
      btnShadow = "0 4px 14px rgba(79, 70, 229, 0.35)";
      footerColor = "#64748B";
    } else if (theme === "emerald-growth") {
      containerBg = "#F0FDF4";
      borderColor = "#10B981";
      badgeBg = "#DCFCE7";
      badgeText = "#065F46";
      titleColor = "#064E3B";
      descColor = "#166534";
      btnBg = "linear-gradient(135deg, #059669 0%, #047857 100%)";
      btnText = "#FFFFFF";
      btnShadow = "0 4px 14px rgba(5, 150, 105, 0.35)";
      footerColor = "#047857";
    } else if (theme === "amber-warning") {
      containerBg = "#FFFBEB";
      borderColor = "#F59E0B";
      badgeBg = "#FEF3C7";
      badgeText = "#92400E";
      titleColor = "#78350F";
      descColor = "#92400E";
      btnBg = "linear-gradient(135deg, #D97706 0%, #B45309 100%)";
      btnText = "#FFFFFF";
      btnShadow = "0 4px 14px rgba(217, 119, 6, 0.35)";
      footerColor = "#B45309";
    } else if (theme === "clean-bordered") {
      containerBg = "#FFFFFF";
      borderColor = "#E2E8F0";
      badgeBg = "#F1F5F9";
      badgeText = "#334155";
      titleColor = "#0F172A";
      descColor = "#64748B";
      btnBg = "#0F172A";
      btnText = "#FFFFFF";
      btnShadow = "0 4px 14px rgba(15, 23, 42, 0.15)";
      footerColor = "#94A3B8";
    }

    const isHorizontal = layout === "horizontal";

    return `<aside class="metazivo-cta-box not-prose my-8 p-6 md:p-7 rounded-2xl border transition-all" data-type="cta-box" data-badge="${badge.replace(/"/g, '&quot;')}" data-title="${title.replace(/"/g, '&quot;')}" data-description="${description.replace(/"/g, '&quot;')}" data-button-text="${buttonText.replace(/"/g, '&quot;')}" data-button-url="${buttonUrl}" data-footer-note="${footerNote.replace(/"/g, '&quot;')}" data-theme="${theme}" data-layout="${layout}" style="background: ${containerBg}; border: 1.5px solid ${borderColor}; border-radius: 1.25rem; margin: 2rem 0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); font-family: system-ui, -apple-system, sans-serif;">
  <div class="flex flex-col ${isHorizontal ? "md:flex-row md:items-center md:justify-between" : ""} gap-5">
    <div class="space-y-2.5 max-w-xl">
      ${badge ? `<div class="cta-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase" style="background: ${badgeBg}; color: ${badgeText};">${badge}</div>` : ""}
      <h3 class="cta-title text-lg md:text-xl font-extrabold tracking-tight m-0" style="color: ${titleColor}; line-height: 1.3; margin: 0 0 8px 0;">
        ${title}
      </h3>
      <p class="cta-desc text-sm leading-relaxed m-0" style="color: ${descColor}; margin: 0 0 8px 0; line-height: 1.5;">
        ${description}
      </p>
      ${footerNote ? `<p class="cta-footer text-xs font-medium m-0 pt-1" style="color: ${footerColor}; margin: 4px 0 0 0;">${footerNote}</p>` : ""}
    </div>
    <div class="shrink-0 ${isHorizontal ? "md:self-center" : "pt-2"}">
      <a href="${buttonUrl}" class="metazivo-cta-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-transform hover:scale-[1.02] active:scale-[0.98] text-center" style="background: ${btnBg}; color: ${btnText}; box-shadow: ${btnShadow}; text-decoration: none; border-radius: 0.75rem; display: inline-block;">
        <span>${buttonText}</span>
      </a>
    </div>
  </div>
</aside>`;
  }, [theme, layout, badge, title, description, buttonText, buttonUrl, footerNote]);

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsert = () => {
    const ctaAttrs: CtaBoxAttributes = {
      badge,
      title,
      description,
      buttonText,
      buttonUrl,
      footerNote,
      theme,
      layout: layout === "compact" ? "horizontal" : layout
    };
    onInsertCta(compiledHtml, ctaAttrs);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF5722] to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                WordPress Gutenberg CTA Box Builder
                <span className="px-2 py-0.5 rounded-md bg-[#FF5722]/20 border border-[#FF5722]/40 text-[#FF5722] text-[10px] font-bold uppercase tracking-wider">
                  High-Converting
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Create visually stunning, Googlebot-friendly CTA callouts linked to your tools or services.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Smart Article Auto-Detection Banner (if article content is present) */}
        {smartAnalysis && (
          <div className="px-6 py-3 bg-gradient-to-r from-orange-950/40 via-amber-950/30 to-slate-900 border-b border-orange-500/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#FF5722] text-white animate-pulse">
                <Wand2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Smart Article Detector:</span>
                  <span className="text-orange-400 font-extrabold underline decoration-orange-500/60">
                    {smartAnalysis.detectedTopic}
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-green-500/20 text-green-400 text-[10px]">
                    {smartAnalysis.bestMatch.confidenceScore > 0 ? "High Relevance" : "General Topic"}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Target Tool: <code className="text-orange-300 font-mono">{smartAnalysis.bestMatch.buttonUrl}</code>
                  {smartAnalysis.bestMatch.matchedKeywords.length > 0 && (
                    <span className="ml-2 text-slate-500 hidden md:inline">
                      (Keywords: {smartAnalysis.bestMatch.matchedKeywords.join(", ")})
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => applyRecommendation(smartAnalysis.bestMatch)}
                className="px-3 py-1.5 rounded-xl bg-[#FF5722] hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/20 cursor-pointer transition-all active:scale-95"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Auto-Apply Recommended CTA</span>
              </button>

              {smartAnalysis.alternatives.length > 0 && (
                <div className="hidden sm:flex items-center gap-1">
                  {smartAnalysis.alternatives.map((alt) => (
                    <button
                      key={alt.topicId}
                      type="button"
                      onClick={() => applyRecommendation(alt)}
                      className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700 cursor-pointer transition-colors"
                      title={alt.title}
                    >
                      {alt.detectedTopicName.split(" ")[0]}...
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Presets Quick Strip */}
        <div className="px-6 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap flex items-center gap-1 mr-1">
            <Sparkles className="w-3 h-3 text-[#FF5722]" /> Quick Presets:
          </span>
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => loadPreset(p)}
              className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{p.icon}</span>
              <span>{p.name.replace(/^[^\s]+\s*/, "")}</span>
            </button>
          ))}
        </div>

        {/* Main 2-Column Work Area */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {/* Left Column: Form Controls (5 cols) */}
          <div className="lg:col-span-5 p-6 space-y-5 overflow-y-auto">
            {/* Theme Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Color Theme & Persona
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: "metazivo-orange", name: "Flame Coral", bg: "#FF5722" },
                  { id: "pro-indigo", name: "Pro Indigo", bg: "#6366F1" },
                  { id: "emerald-growth", name: "Emerald Growth", bg: "#10B981" },
                  { id: "amber-warning", name: "Amber Warning", bg: "#F59E0B" },
                  { id: "clean-bordered", name: "Clean Minimal", bg: "#475569" }
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setTheme(th.id as CtaTheme)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      theme === th.id
                        ? "border-[#FF5722] bg-[#FF5722]/10 text-white font-bold"
                        : "border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                      style={{ background: th.bg }}
                    />
                    <span className="text-xs truncate">{th.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Orientation */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Layout Alignment
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLayout("horizontal")}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    layout === "horizontal"
                      ? "border-[#FF5722] bg-[#FF5722]/10 text-white"
                      : "border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>Horizontal (Headline Left, Button Right)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLayout("vertical")}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    layout === "vertical"
                      ? "border-[#FF5722] bg-[#FF5722]/10 text-white"
                      : "border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span>Stacked Vertical</span>
                </button>
              </div>
            </div>

            {/* Content Fields */}
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Eyebrow Badge (Optional)
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. ⚡ 100% Free SEO Diagnostic"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Main Headline / Title <span className="text-[#FF5722]">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Want to scan your website right now?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-bold focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Description Text <span className="text-[#FF5722]">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Compelling reason to click the tool or link..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs leading-relaxed focus:outline-none focus:border-[#FF5722] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Button Text <span className="text-[#FF5722]">*</span>
                  </label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="Launch Free Scanner →"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-[#FF5722]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Quick Link Destination
                  </label>
                  <select
                    value={buttonUrl}
                    onChange={(e) => setButtonUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-[#FF5722]"
                  >
                    {COMMON_METAZIVO_TOOLS.map((t) => (
                      <option key={t.url} value={t.url}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Custom Destination URL (or internal path)
                </label>
                <input
                  type="text"
                  value={buttonUrl}
                  onChange={(e) => setButtonUrl(e.target.value)}
                  placeholder="/tools/broken-link-checker or https://..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Footer Trust Note (Optional)
                </label>
                <input
                  type="text"
                  value={footerNote}
                  onChange={(e) => setFooterNote(e.target.value)}
                  placeholder="e.g. ✓ No Signup Required ✓ Instant Crawl"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs focus:outline-none focus:border-[#FF5722]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Responsive Preview (7 cols) */}
          <div className="lg:col-span-7 flex flex-col bg-slate-950/60 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Live View
                </span>
                <span className="text-[11px] text-slate-500">
                  (Rendered as Gutenberg Visual Block)
                </span>
              </div>

              {/* View Switch & Device Emulation */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setViewTab("preview")}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      viewTab === "preview"
                        ? "bg-[#FF5722] text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 inline mr-1" />
                    Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewTab("code")}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      viewTab === "code"
                        ? "bg-[#FF5722] text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5 inline mr-1" />
                    HTML
                  </button>
                </div>

                {viewTab === "preview" && (
                  <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setDevice("laptop")}
                      className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                        device === "laptop" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-white"
                      }`}
                      title="Desktop View"
                    >
                      <Laptop className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDevice("tablet")}
                      className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                        device === "tablet" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-white"
                      }`}
                      title="Tablet View"
                    >
                      <Tablet className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDevice("mobile")}
                      className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                        device === "mobile" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-white"
                      }`}
                      title="Mobile View"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Body */}
            <div className="flex-1 flex items-center justify-center p-4 min-h-[340px] overflow-y-auto">
              {viewTab === "preview" ? (
                <div
                  className={`w-full transition-all duration-300 ${
                    device === "mobile"
                      ? "max-w-sm"
                      : device === "tablet"
                      ? "max-w-xl"
                      : "max-w-3xl"
                  }`}
                >
                  <div className="p-2 sm:p-4 bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl">
                    <div
                      dangerouslySetInnerHTML={{ __html: compiledHtml }}
                      className="transition-all"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col">
                  <div className="flex items-center justify-between pb-2 text-xs text-slate-400">
                    <span>Generated Clean HTML:</span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="text-orange-400 hover:text-orange-300 flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? "Copied!" : "Copy Code"}</span>
                    </button>
                  </div>
                  <textarea
                    readOnly
                    value={compiledHtml}
                    className="w-full flex-1 p-3 bg-slate-950 font-mono text-xs text-orange-300/90 rounded-xl border border-slate-800 resize-none focus:outline-none"
                    rows={12}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <span>Valid Gutenberg Block + Semantic HTML Output</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied HTML!" : "Copy HTML"}</span>
            </button>

            <button
              type="button"
              onClick={handleInsert}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer active:scale-95"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Insert Gutenberg CTA Block</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
