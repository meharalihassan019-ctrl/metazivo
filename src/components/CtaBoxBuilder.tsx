import React, { useState, useMemo } from "react";
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
  ArrowRight
} from "lucide-react";

export type CtaTheme = "metazivo-orange" | "pro-indigo" | "emerald-growth" | "amber-warning" | "clean-bordered";
export type CtaLayout = "horizontal" | "vertical" | "compact";
export type DevicePreview = "laptop" | "tablet" | "mobile";

interface CtaBoxBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertCta: (html: string) => void;
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
  { label: "Broken Link Checker", url: "/tools/broken-link-checker" },
  { label: "SEO Audit Checker", url: "/tools/seo-audit-checker" },
  { label: "Schema Markup Generator", url: "/tools/schema-markup-generator" },
  { label: "Redirect Checker", url: "/tools/redirect-checker" },
  { label: "Website Speed Test", url: "/tools/website-speed-test" },
  { label: "Robots.txt Generator", url: "/tools/robots-txt-generator" },
  { label: "XML Sitemap Generator", url: "/tools/xml-sitemap-generator" },
  { label: "Keyword Clustering Tool", url: "/tools/keyword-clustering-tool" },
  { label: "Internal Link Finder", url: "/tools/internal-link-finder" },
  { label: "Agency Contact / Audit", url: "/contact" },
  { label: "Core Agency Services", url: "/services" }
];

export default function CtaBoxBuilder({ isOpen, onClose, onInsertCta }: CtaBoxBuilderProps) {
  const [theme, setTheme] = useState<CtaTheme>("metazivo-orange");
  const [layout, setLayout] = useState<CtaLayout>("horizontal");
  const [badge, setBadge] = useState("⚡ 100% Free SEO Diagnostic");
  const [title, setTitle] = useState("Want to scan your website right now?");
  const [description, setDescription] = useState(
    "Run Metazivo's instant broken link checker to detect 404 dead links, broken redirects, and security threats before they harm your rankings."
  );
  const [buttonText, setButtonText] = useState("Launch Free Scanner →");
  const [buttonUrl, setButtonUrl] = useState("/tools/broken-link-checker");
  const [footerNote, setFooterNote] = useState("✓ No Signup Required  ✓ Instant Real-Time Crawl  ✓ Direct Export");
  const [device, setDevice] = useState<DevicePreview>("laptop");
  const [viewTab, setViewTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

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
  // Contains both Tailwind classes AND robust inline styles so it looks flawless anywhere (in-app, SSR, and copied externally)
  const compiledHtml = useMemo(() => {
    let containerBg = "#FFF5F2";
    let borderColor = "#FF5722";
    let badgeBg = "#FFECE5";
    let badgeText = "#D84315";
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

    return `<aside class="metazivo-cta-box not-prose my-8 p-6 md:p-7 rounded-2xl border transition-all" style="background: ${containerBg}; border: 1.5px solid ${borderColor}; border-radius: 1.25rem; margin: 2rem 0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); font-family: system-ui, -apple-system, sans-serif;">
  <div class="flex flex-col ${isHorizontal ? "md:flex-row md:items-center md:justify-between" : ""} gap-5">
    <div class="space-y-2.5 max-w-xl">
      ${badge ? `<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase" style="background: ${badgeBg}; color: ${badgeText};">${badge}</div>` : ""}
      <h3 class="text-lg md:text-xl font-extrabold tracking-tight m-0" style="color: ${titleColor}; line-height: 1.3;">
        ${title}
      </h3>
      <p class="text-sm leading-relaxed m-0" style="color: ${descColor};">
        ${description}
      </p>
      ${footerNote ? `<p class="text-xs font-medium m-0 pt-1" style="color: ${footerColor};">${footerNote}</p>` : ""}
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
    onInsertCta(compiledHtml);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF5722]/15 border border-[#FF5722]/30 flex items-center justify-center text-[#FF5722]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                WordPress-Style CTA Callout Box Builder
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#FF5722]/20 text-[#FF5722] border border-[#FF5722]/30">
                  High-Converting
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Design custom action callout boxes and notice banners for articles to drive tool clicks & conversions.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Ribbon */}
        <div className="px-6 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="text-slate-400 font-semibold whitespace-nowrap mr-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-[#FF5722]" /> Quick Presets:
          </span>
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => loadPreset(preset)}
              className="px-3 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 hover:text-white transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer text-xs"
            >
              <span>{preset.icon}</span>
              <span>{preset.name.replace(/^[^\s]+\s*/, "")}</span>
            </button>
          ))}
        </div>

        {/* Main Body: 2 Columns (Form Controls & Live Preview) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
          {/* Left Panel: Form Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Theme Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Color & Aesthetic Theme
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: "metazivo-orange", label: "Metazivo Orange", border: "border-[#FF5722]" },
                  { id: "pro-indigo", label: "Pro Indigo Notice", border: "border-indigo-500" },
                  { id: "emerald-growth", label: "Emerald Growth", border: "border-emerald-500" },
                  { id: "amber-warning", label: "Amber Warning", border: "border-amber-500" },
                  { id: "clean-bordered", label: "Clean Bordered", border: "border-slate-300" }
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setTheme(th.id as CtaTheme)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      theme === th.id
                        ? "bg-slate-800 border-[#FF5722] text-white shadow-sm"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span>{th.label}</span>
                    <span className={`w-3 h-3 rounded-full border-2 ${th.border}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Orientation */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Layout Arrangement
              </label>
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setLayout("horizontal")}
                  className={`flex-1 py-2 px-3 rounded-xl border text-center font-medium transition-colors cursor-pointer ${
                    layout === "horizontal"
                      ? "bg-[#FF5722]/15 border-[#FF5722] text-white font-bold"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Side-by-Side (Row)
                </button>
                <button
                  type="button"
                  onClick={() => setLayout("vertical")}
                  className={`flex-1 py-2 px-3 rounded-xl border text-center font-medium transition-colors cursor-pointer ${
                    layout === "vertical"
                      ? "bg-[#FF5722]/15 border-[#FF5722] text-white font-bold"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Stacked (Column)
                </button>
              </div>
            </div>

            {/* Badge Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Badge / Tag (e.g. ⚡ Free Tool, 💡 Pro Tip)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="⚡ Free SEO Tool"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-[#FF5722]"
              />
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Headline / Title <span className="text-[#FF5722]">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Want to scan your website right now?"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-bold focus:outline-none focus:border-[#FF5722]"
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Description / Benefit Copy
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain why the reader should click this tool right now..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs leading-relaxed focus:outline-none focus:border-[#FF5722]"
              />
            </div>

            {/* Button Label & URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Button Text <span className="text-[#FF5722]">*</span>
                </label>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  placeholder="Launch Scanner →"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs font-semibold focus:outline-none focus:border-[#FF5722]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Target Link (URL) <span className="text-[#FF5722]">*</span>
                </label>
                <input
                  type="text"
                  value={buttonUrl}
                  onChange={(e) => setButtonUrl(e.target.value)}
                  placeholder="/tools/broken-link-checker"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-[#FF5722]"
                />
              </div>
            </div>

            {/* Quick Link Selector */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Quick Insert Metazivo Internal Tool URL:
              </label>
              <select
                onChange={(e) => {
                  if (e.target.value) setButtonUrl(e.target.value);
                }}
                defaultValue=""
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs cursor-pointer focus:outline-none focus:border-[#FF5722]"
              >
                <option value="" disabled>
                  -- Select Metazivo internal tool / service --
                </option>
                {COMMON_METAZIVO_TOOLS.map((t) => (
                  <option key={t.url} value={t.url}>
                    {t.label} ({t.url})
                  </option>
                ))}
              </select>
            </div>

            {/* Footer Trust Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Footer Checklist / Trust Note (Optional)
              </label>
              <input
                type="text"
                value={footerNote}
                onChange={(e) => setFooterNote(e.target.value)}
                placeholder="✓ No Signup Required  ✓ Instant Real-Time Crawl"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-[#FF5722]"
              />
            </div>
          </div>

          {/* Right Panel: Live Preview & HTML Code (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Top Toolbar: View Switcher (Preview vs Code) + Device View */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-slate-950/70 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setViewTab("preview")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewTab === "preview" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> Live Preview
                </button>
                <button
                  type="button"
                  onClick={() => setViewTab("code")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewTab === "code" ? "bg-[#FF5722] text-white shadow" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" /> HTML Code
                </button>
              </div>

              {viewTab === "preview" && (
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setDevice("laptop")}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      device === "laptop" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                    title="Laptop / Desktop (100% wide)"
                  >
                    <Laptop className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDevice("tablet")}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      device === "tablet" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                    title="Tablet (720px)"
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDevice("mobile")}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      device === "mobile" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                    title="Mobile (380px)"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Preview Box Container */}
            <div className="flex-1 min-h-[360px] bg-slate-950/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-center items-center overflow-auto relative">
              {viewTab === "preview" ? (
                <div
                  className="transition-all duration-300 w-full"
                  style={{
                    maxWidth: device === "mobile" ? "380px" : device === "tablet" ? "680px" : "100%"
                  }}
                >
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 flex items-center justify-between">
                    <span>Frontend Blog Rendering Preview ({device}):</span>
                    <span>Self-Contained Responsive HTML</span>
                  </div>
                  {/* Directly Render the Compiled HTML */}
                  <div
                    dangerouslySetInnerHTML={{ __html: compiledHtml }}
                    className="w-full"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">
                      Copy & Paste this clean HTML snippet into any WordPress / AI Studio website:
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied!" : "Copy HTML"}
                    </button>
                  </div>
                  <pre className="flex-1 p-4 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-orange-200/90 overflow-x-auto whitespace-pre-wrap select-all">
                    {compiledHtml}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Ready to inject into article body at current cursor position.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied HTML!" : "Copy HTML Code"}</span>
            </button>

            <button
              type="button"
              onClick={handleInsert}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5722] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Insert CTA Box into Article</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
