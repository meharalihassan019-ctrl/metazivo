import React, { useState, useMemo } from "react";
import {
  FileSpreadsheet,
  Copy,
  Download,
  Check,
  RotateCcw,
  Upload,
  CheckCircle2,
  FileCode
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function XmlSitemapTool({ tool, onNavigateTool, onNavigateHome }: Props) {
  const [urlsInput, setUrlsInput] = useState(
    `https://metazivo.com/
https://metazivo.com/services/web-development
https://metazivo.com/services/technical-seo
https://metazivo.com/insights
https://metazivo.com/case-studies
https://metazivo.com/contact`
  );

  const [changefreq, setChangefreq] = useState("weekly");
  const [priority, setPriority] = useState("0.8");
  const [includeLastmod, setIncludeLastmod] = useState(true);
  const [lastmodDate, setLastmodDate] = useState(new Date().toISOString().slice(0, 10));
  const [copied, setCopied] = useState(false);

  // Process & Deduplicate URLs
  const { cleanUrls, duplicateCount, invalidCount } = useMemo(() => {
    const raw = urlsInput
      .split(/[\r\n,]+/)
      .map((u) => u.trim())
      .filter(Boolean);

    let dupes = 0;
    let invalids = 0;
    const seen = new Set<string>();
    const validList: string[] = [];

    raw.forEach((u) => {
      let formatted = u;
      if (!/^https?:\/\//i.test(formatted)) {
        formatted = "https://" + formatted;
      }
      try {
        const parsed = new URL(formatted);
        const clean = parsed.toString();
        if (seen.has(clean)) {
          dupes++;
        } else {
          seen.add(clean);
          validList.push(clean);
        }
      } catch (e) {
        invalids++;
      }
    });

    return { cleanUrls: validList, duplicateCount: dupes, invalidCount: invalids };
  }, [urlsInput]);

  // Build standard XML
  const sitemapXml = useMemo(() => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    cleanUrls.forEach((u, idx) => {
      xml += `  <url>\n`;
      xml += `    <loc>${u}</loc>\n`;
      if (includeLastmod) {
        xml += `    <lastmod>${lastmodDate}</lastmod>\n`;
      }
      xml += `    <changefreq>${changefreq}</changefreq>\n`;
      // Homepage gets 1.0 priority
      const itemPriority = idx === 0 && u.replace(/\/+$/, "") === new URL(u).origin ? "1.0" : priority;
      xml += `    <priority>${itemPriority}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  }, [cleanUrls, changefreq, priority, includeLastmod, lastmodDate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(sitemapXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([sitemapXml], { type: "application/xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          setUrlsInput(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    setUrlsInput("");
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={handleReset}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Input & Configuration */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label htmlFor="sitemap-urls-input" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                Enter Website URLs (One per line)
              </label>
              <label className="text-xs text-[#FF5722] hover:underline font-semibold cursor-pointer flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload .txt / .csv</span>
                <input
                  type="file"
                  accept=".txt,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <textarea
              id="sitemap-urls-input"
              rows={8}
              value={urlsInput}
              onChange={(e) => setUrlsInput(e.target.value)}
              placeholder="https://example.com/&#10;https://example.com/about&#10;https://example.com/contact"
              className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] transition-all"
            />

            {/* Sitemap Settings */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <span className="font-mono font-bold uppercase text-slate-700 text-[11px] block">
                Sitemap Attributes
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Change Frequency</label>
                  <select
                    value={changefreq}
                    onChange={(e) => setChangefreq(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-xl cursor-pointer"
                  >
                    <option value="always">Always</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Default Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-xl cursor-pointer"
                  >
                    <option value="1.0">1.0 (Highest)</option>
                    <option value="0.8">0.8 (Standard High)</option>
                    <option value="0.6">0.6 (Medium)</option>
                    <option value="0.5">0.5 (Default)</option>
                    <option value="0.3">0.3 (Low)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLastmod}
                    onChange={(e) => setIncludeLastmod(e.target.checked)}
                    className="w-4 h-4 accent-[#FF5722]"
                  />
                  <span className="font-semibold text-slate-700">Include &lt;lastmod&gt;</span>
                </label>
                {includeLastmod && (
                  <input
                    type="date"
                    value={lastmodDate}
                    onChange={(e) => setLastmodDate(e.target.value)}
                    className="p-1.5 text-xs bg-white border border-slate-200 rounded-lg"
                  />
                )}
              </div>
            </div>

            {/* Stats summary strip */}
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span>Valid URLs: <strong className="text-slate-900">{cleanUrls.length}</strong></span>
              {duplicateCount > 0 && <span>Duplicates Removed: <strong className="text-amber-600">{duplicateCount}</strong></span>}
            </div>
          </div>

          {/* Right: XML Preview & Export */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Generated XML Output
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? "Copied XML" : "Copy XML"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Download sitemap.xml</span>
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 text-slate-100 font-mono text-xs overflow-x-auto min-h-[360px] shadow-inner">
              <pre className="whitespace-pre-wrap leading-relaxed">
                <code>{sitemapXml}</code>
              </pre>
            </div>

            <p className="text-[11px] text-slate-500 font-mono">
              Upload this file to the root of your domain and submit the URL in Google Search Console under Indexing → Sitemaps.
            </p>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
