import React, { useState } from "react";
import {
  Tag,
  Copy,
  Download,
  Check,
  RotateCcw,
  Smartphone,
  Monitor,
  Share2,
  Globe,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function MetaTagTool({ tool, onNavigateTool, onNavigateHome }: Props) {
  const isSimulatorOnly = tool.slug === "serp-simulator";

  const [title, setTitle] = useState("Technical SEO Audit & Full-Stack Web Architecture | Metazivo");
  const [description, setDescription] = useState(
    "Supercharge organic search rankings and Core Web Vitals with enterprise technical SEO audits, schema architecture, and modern full-stack web engineering."
  );
  const [url, setUrl] = useState("https://metazivo.com/services/technical-seo");
  const [keyword, setKeyword] = useState("technical SEO");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  // Additional Meta Tags
  const [ogImage, setOgImage] = useState("https://metazivo.com/og-image.jpg");
  const [robotsDirectives, setRobotsDirectives] = useState("index, follow");
  const [author, setAuthor] = useState("Metazivo Engineering");
  const [copied, setCopied] = useState(false);

  // Calculations
  const titleCharCount = title.length;
  // Approximation of Google pixel width (average ~9.5px per character)
  const titlePixelWidth = Math.round(titleCharCount * 9.5);
  const isTitleLong = titlePixelWidth > 580;

  const descCharCount = description.length;
  const isDescLong = descCharCount > 160;

  // Highlight keyword in text
  const renderHighlighted = (text: string, kw: string) => {
    if (!kw.trim()) return text;
    const parts = text.split(new RegExp(`(${kw})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === kw.toLowerCase() ? (
        <strong key={i} className="font-bold text-slate-900">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  // Generate HTML Tags
  const generatedHtml = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />
<meta name="robots" content="${robotsDirectives}" />
<link rel="canonical" href="${url}" />
${author ? `<meta name="author" content="${author}" />\n` : ""}\
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${ogImage}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url}" />
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${description}" />
<meta property="twitter:image" content="${ogImage}" />`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedHtml], { type: "text/html;charset=utf-8" });
    const u = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = u;
    a.download = "meta-tags.html";
    a.click();
    URL.revokeObjectURL(u);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Input Editor */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
              Snippet & Meta Tag Controls
            </h3>

            {/* Title Input */}
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <label className="text-slate-600 font-semibold">Page Title</label>
                <span
                  className={`font-mono text-[11px] ${
                    isTitleLong ? "text-rose-600 font-bold" : "text-slate-500"
                  }`}
                >
                  {titleCharCount} chars (~{titlePixelWidth}px / 580px max)
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full p-2.5 bg-slate-50 border rounded-xl text-xs font-sans focus:bg-white focus:outline-none ${
                  isTitleLong ? "border-rose-300 ring-1 ring-rose-300" : "border-slate-200"
                }`}
              />
              {isTitleLong && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Title may be truncated with ellipsis (...) on desktop SERPs.
                </p>
              )}
            </div>

            {/* Description Input */}
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <label className="text-slate-600 font-semibold">Meta Description</label>
                <span
                  className={`font-mono text-[11px] ${
                    isDescLong ? "text-amber-600 font-bold" : "text-slate-500"
                  }`}
                >
                  {descCharCount} / 160 chars optimal
                </span>
              </div>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans focus:bg-white focus:outline-none"
              />
            </div>

            {/* Target URL */}
            <div className="space-y-1 text-xs">
              <label className="text-slate-600 font-semibold">Canonical URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>

            {/* Focus Keyword */}
            <div className="space-y-1 text-xs">
              <label className="text-slate-600 font-semibold">Focus Keyword (for SERP bolding preview)</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            {!isSimulatorOnly && (
              <>
                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Robots Meta</label>
                    <select
                      value={robotsDirectives}
                      onChange={(e) => setRobotsDirectives(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <option value="index, follow">index, follow (Default)</option>
                      <option value="noindex, follow">noindex, follow</option>
                      <option value="index, nofollow">index, nofollow</option>
                      <option value="noindex, nofollow">noindex, nofollow</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Social Image (OG)</label>
                    <input
                      type="text"
                      value={ogImage}
                      onChange={(e) => setOgImage(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right: Live SERP Simulation & Code */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Live Google SERP Visualizer
              </h3>

              {/* Viewport Switcher */}
              <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setDevice("desktop")}
                  className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer ${
                    device === "desktop" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDevice("mobile")}
                  className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer ${
                    device === "mobile" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Google SERP Simulated Container */}
            <div
              className={`p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 transition-all ${
                device === "mobile" ? "max-w-md mx-auto" : "w-full"
              }`}
            >
              {/* Site attribution header */}
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-800">
                  M
                </div>
                <div className="flex flex-col leading-tight overflow-hidden">
                  <span className="font-semibold text-slate-800 text-[12px] truncate">
                    {(() => {
                      try {
                        return new URL(url).hostname;
                      } catch (e) {
                        return "metazivo.com";
                      }
                    })()}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono truncate">{url}</span>
                </div>
              </div>

              {/* Title Link */}
              <h4 className="text-[18px] text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug break-words">
                {renderHighlighted(title, keyword)}
              </h4>

              {/* Snippet Description */}
              <p className="text-[13px] text-[#4d5156] leading-relaxed break-words">
                {renderHighlighted(description, keyword)}
              </p>
            </div>

            {/* Code Output Card */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Formatted HTML Output
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copied ? "Copied HTML" : "Copy Tags"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 text-slate-100 font-mono text-xs overflow-x-auto max-h-[220px]">
                <pre className="whitespace-pre-wrap leading-relaxed">
                  <code>{generatedHtml}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
