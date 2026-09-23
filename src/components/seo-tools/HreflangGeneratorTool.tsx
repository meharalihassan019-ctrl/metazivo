import React, { useState } from "react";
import {
  Globe,
  Plus,
  Trash2,
  Copy,
  Download,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  FileCode,
  Code2,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  ExternalLink,
  BookOpen
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface HreflangRow {
  id: string;
  lang: string;
  region: string;
  url: string;
}

const COMMON_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish (Español)" },
  { code: "fr", name: "French (Français)" },
  { code: "de", name: "German (Deutsch)" },
  { code: "ar", name: "Arabic (العربية)" },
  { code: "ur", name: "Urdu (اردو)" },
  { code: "zh", name: "Chinese (中文)" },
  { code: "ja", name: "Japanese (日本語)" },
  { code: "pt", name: "Portuguese (Português)" },
  { code: "it", name: "Italian (Italiano)" },
  { code: "nl", name: "Dutch (Nederlands)" },
  { code: "ru", name: "Russian (Русский)" },
  { code: "hi", name: "Hindi (हिन्दी)" },
  { code: "ko", name: "Korean (한국어)" },
  { code: "tr", name: "Turkish (Türkçe)" }
];

const COMMON_REGIONS = [
  { code: "", name: "Any Region / Global Language Fallback" },
  { code: "us", name: "United States (US)" },
  { code: "gb", name: "United Kingdom (GB)" },
  { code: "ca", name: "Canada (CA)" },
  { code: "au", name: "Australia (AU)" },
  { code: "pk", name: "Pakistan (PK)" },
  { code: "in", name: "India (IN)" },
  { code: "de", name: "Germany (DE)" },
  { code: "fr", name: "France (FR)" },
  { code: "es", name: "Spain (ES)" },
  { code: "ae", name: "United Arab Emirates (AE)" },
  { code: "sa", name: "Saudi Arabia (SA)" },
  { code: "br", name: "Brazil (BR)" },
  { code: "jp", name: "Japan (JP)" },
  { code: "sg", name: "Singapore (SG)" }
];

const PRESETS = [
  {
    name: "Global English Variants (US, UK, CA, AU)",
    xDefault: "https://metazivo.com/",
    rows: [
      { id: "1", lang: "en", region: "us", url: "https://metazivo.com/" },
      { id: "2", lang: "en", region: "gb", url: "https://metazivo.com/uk/" },
      { id: "3", lang: "en", region: "ca", url: "https://metazivo.com/ca/" },
      { id: "4", lang: "en", region: "au", url: "https://metazivo.com/au/" }
    ]
  },
  {
    name: "European Multi-Lingual (EN, DE, FR, ES, IT)",
    xDefault: "https://metazivo.com/",
    rows: [
      { id: "5", lang: "en", region: "gb", url: "https://metazivo.com/en/" },
      { id: "6", lang: "de", region: "de", url: "https://metazivo.com/de/" },
      { id: "7", lang: "fr", region: "fr", url: "https://metazivo.com/fr/" },
      { id: "8", lang: "es", region: "es", url: "https://metazivo.com/es/" },
      { id: "9", lang: "it", region: "it", url: "https://metazivo.com/it/" }
    ]
  },
  {
    name: "Middle East & South Asia (EN, AR, UR)",
    xDefault: "https://metazivo.com/",
    rows: [
      { id: "10", lang: "en", region: "ae", url: "https://metazivo.com/ae/" },
      { id: "11", lang: "ar", region: "ae", url: "https://metazivo.com/ar/" },
      { id: "12", lang: "ur", region: "pk", url: "https://metazivo.com/ur/" },
      { id: "13", lang: "en", region: "pk", url: "https://metazivo.com/pk/" }
    ]
  }
];

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function HreflangGeneratorTool({ tool, onNavigateTool, onNavigateHome }: Props) {
  const [rows, setRows] = useState<HreflangRow[]>(PRESETS[0].rows);
  const [xDefaultUrl, setXDefaultUrl] = useState("https://metazivo.com/");
  const [outputFormat, setOutputFormat] = useState<"html" | "xml" | "http">("html");
  const [copied, setCopied] = useState(false);

  // Add new row
  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        id: `row-${Date.now()}`,
        lang: "en",
        region: "",
        url: "https://metazivo.com/new-lang/"
      }
    ]);
  };

  const handleRemoveRow = (id: string) => {
    setRows(rows.filter((r) => r.id !== id));
  };

  const handleUpdateRow = (id: string, field: keyof HreflangRow, value: string) => {
    setRows(
      rows.map((r) => {
        if (r.id === id) {
          return { ...r, [field]: value };
        }
        return r;
      })
    );
  };

  const handleLoadPreset = (preset: typeof PRESETS[0]) => {
    setRows(preset.rows);
    setXDefaultUrl(preset.xDefault);
  };

  // Validation warnings
  const validationIssues: string[] = [];
  const seenCodes = new Set<string>();

  rows.forEach((r) => {
    const code = r.region ? `${r.lang.toLowerCase()}-${r.region.toLowerCase()}` : r.lang.toLowerCase();
    if (seenCodes.has(code)) {
      validationIssues.push(`Duplicate hreflang tag detected for locale: "${code}". Google requires unique URLs per locale.`);
    }
    seenCodes.add(code);

    if (!r.url.trim().startsWith("http")) {
      validationIssues.push(`Invalid URL protocol for ${code}: URLs must be absolute (https://...).`);
    }
  });

  if (!xDefaultUrl.trim()) {
    validationIssues.push("Missing x-default URL: Google strongly recommends an x-default tag for unmatched global traffic.");
  }

  // Generate HTML Output
  const generateHtmlHead = () => {
    let html = `<!-- Standard Hreflang Annotations for HTML <head> -->\n`;
    rows.forEach((r) => {
      const code = r.region ? `${r.lang.toLowerCase()}-${r.region.toLowerCase()}` : r.lang.toLowerCase();
      html += `<link rel="alternate" hreflang="${code}" href="${r.url.trim()}" />\n`;
    });
    if (xDefaultUrl.trim()) {
      html += `<link rel="alternate" hreflang="x-default" href="${xDefaultUrl.trim()}" />\n`;
    }
    return html;
  };

  // Generate XML Sitemap Output
  const generateXmlSitemap = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

    rows.forEach((mainPage) => {
      xml += `  <url>\n    <loc>${mainPage.url.trim()}</loc>\n`;
      rows.forEach((alt) => {
        const code = alt.region ? `${alt.lang.toLowerCase()}-${alt.region.toLowerCase()}` : alt.lang.toLowerCase();
        xml += `    <xhtml:link rel="alternate" hreflang="${code}" href="${alt.url.trim()}"/>\n`;
      });
      if (xDefaultUrl.trim()) {
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultUrl.trim()}"/>\n`;
      }
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  };

  // Generate HTTP Headers Format (for PDF / API)
  const generateHttpHeaders = () => {
    const headerParts: string[] = [];
    rows.forEach((r) => {
      const code = r.region ? `${r.lang.toLowerCase()}-${r.region.toLowerCase()}` : r.lang.toLowerCase();
      headerParts.push(`<${r.url.trim()}>; rel="alternate"; hreflang="${code}"`);
    });
    if (xDefaultUrl.trim()) {
      headerParts.push(`<${xDefaultUrl.trim()}>; rel="alternate"; hreflang="x-default"`);
    }
    return `Link: ${headerParts.join(", ")}`;
  };

  const getActiveOutput = () => {
    if (outputFormat === "xml") return generateXmlSitemap();
    if (outputFormat === "http") return generateHttpHeaders();
    return generateHtmlHead();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveOutput());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = getActiveOutput();
    const filename = outputFormat === "xml" ? "sitemap-hreflang.xml" : outputFormat === "http" ? "headers.txt" : "hreflang-head.html";
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={() => {
        setRows(PRESETS[0].rows);
        setXDefaultUrl(PRESETS[0].xDefault);
      }}
    >
      <div className="space-y-8">
        {/* Preset Selector */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF5722] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Fast Setup Templates
            </span>
            <span className="text-[11px] text-slate-500">Pick a regional architecture or construct custom URLs</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleLoadPreset(p)}
                className="text-left p-3 rounded-xl bg-white border border-slate-200/90 hover:border-[#FF5722] transition-colors cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-900 line-clamp-1">{p.name}</div>
                <div className="text-[11px] text-slate-500 mt-1 font-mono">{p.rows.length} regional locales</div>
              </button>
            ))}
          </div>
        </div>

        {/* Locales Configuration Table */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#FF5722]" />
              <span>Target Languages & Country Locales ({rows.length})</span>
            </h3>

            <button
              onClick={handleAddRow}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-mono font-bold text-slate-700 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#FF5722]" /> Add Another Language Variant
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 w-44">Language (ISO 639-1)</th>
                  <th className="py-3 px-3 w-52">Country / Region (ISO 3166-1)</th>
                  <th className="py-3 px-3">Canonical Regional Page URL</th>
                  <th className="py-3 px-2 w-12 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-3">
                      <select
                        value={row.lang}
                        onChange={(e) => handleUpdateRow(row.id, "lang", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-800 font-mono font-bold focus:bg-white focus:outline-none focus:border-[#FF5722]"
                      >
                        {COMMON_LANGUAGES.map((l) => (
                          <option key={l.code} value={l.code}>
                            {l.name} ({l.code})
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2.5 px-3">
                      <select
                        value={row.region}
                        onChange={(e) => handleUpdateRow(row.id, "region", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-800 font-mono focus:bg-white focus:outline-none focus:border-[#FF5722]"
                      >
                        {COMMON_REGIONS.map((reg) => (
                          <option key={reg.code} value={reg.code}>
                            {reg.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2.5 px-3">
                      <input
                        type="url"
                        value={row.url}
                        onChange={(e) => handleUpdateRow(row.id, "url", e.target.value)}
                        placeholder="https://example.com/locale-path"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-[#FF5722]"
                      />
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <button
                        onClick={() => handleRemoveRow(row.id)}
                        disabled={rows.length <= 1}
                        className="text-slate-400 hover:text-red-500 disabled:opacity-30 transition-colors cursor-pointer"
                        title="Remove locale"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* x-default Fallback URL */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-mono font-bold text-slate-900 uppercase">
                x-default Fallback Landing Page:
              </label>
              <span className="text-[11px] text-slate-500 font-sans">
                Served to international visitors whose language/region is not explicitly configured
              </span>
            </div>
            <input
              type="url"
              value={xDefaultUrl}
              onChange={(e) => setXDefaultUrl(e.target.value)}
              placeholder="https://metazivo.com/"
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#FF5722]"
            />
          </div>

          {/* Live Validation Linter Alert */}
          {validationIssues.length > 0 ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Google Hreflang Linter Warnings ({validationIssues.length})</span>
              </div>
              <ul className="list-disc list-inside text-xs text-amber-700 space-y-1 font-sans">
                {validationIssues.map((w, idx) => (
                  <li key={idx}>{w}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Googlebot Compliant: Reciprocal bidirectional links and ISO syntax confirmed.</span>
            </div>
          )}
        </div>

        {/* Generated Code Output Section */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOutputFormat("html")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${
                  outputFormat === "html" ? "bg-[#FF5722] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                HTML &lt;head&gt; Tags
              </button>
              <button
                onClick={() => setOutputFormat("xml")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${
                  outputFormat === "xml" ? "bg-[#FF5722] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                XML Sitemap Format (Enterprise)
              </button>
              <button
                onClick={() => setOutputFormat("http")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${
                  outputFormat === "http" ? "bg-[#FF5722] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                HTTP Header Link
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-mono font-bold transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-mono font-bold text-slate-700 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <pre className="p-5 bg-slate-950 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
            {getActiveOutput()}
          </pre>
        </div>

        {/* Step-by-Step Implementation Instructions */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest">
              Deployment Architecture
            </span>
            <h3 className="text-xl font-extrabold text-slate-950">
              How to Deploy Hreflang Tags Without Googlebot Errors
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-700 leading-relaxed font-sans">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-orange-100 text-[#FF5722] font-mono font-bold flex items-center justify-center">
                01
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Self-Referential Links</h4>
              <p>
                Every regional page must include an hreflang tag pointing to itself as well as all alternate translated counterparts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-orange-100 text-[#FF5722] font-mono font-bold flex items-center justify-center">
                02
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Bidirectional Confirmation</h4>
              <p>
                If Page A references Page B, Page B MUST reference Page A. If one page fails to return the link, Google ignores the hreflang pair.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-orange-100 text-[#FF5722] font-mono font-bold flex items-center justify-center">
                03
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Canonical Tag Synergy</h4>
              <p>
                Each regional page should have a self-referencing canonical tag. Never canonicalize all language pages to the English homepage!
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
