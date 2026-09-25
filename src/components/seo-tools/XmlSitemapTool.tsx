import React, { useState, useMemo } from "react";
import {
  FileSpreadsheet,
  Copy,
  Download,
  Check,
  RotateCcw,
  Upload,
  CheckCircle2,
  FileCode,
  Globe,
  AlertTriangle,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Search
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function XmlSitemapTool({ tool, onNavigateTool, onNavigateHome }: Props) {
  const [activeTab, setActiveTab] = useState<"generator" | "validator">("generator");
  
  // Generator State
  const [urlsInput, setUrlsInput] = useState(
    `https://metazivo.com/
https://metazivo.com/services
https://metazivo.com/seo-tools
https://metazivo.com/blog
https://metazivo.com/about
https://metazivo.com/contact`
  );
  const [changefreq, setChangefreq] = useState("weekly");
  const [priority, setPriority] = useState("0.8");
  const [includeLastmod, setIncludeLastmod] = useState(true);
  const [lastmodDate, setLastmodDate] = useState(new Date().toISOString().slice(0, 10));
  const [copied, setCopied] = useState(false);

  // Validator State (Real Live Endpoint)
  const [validateUrl, setValidateUrl] = useState("https://metazivo.com/sitemap.xml");
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

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
        const urlObj = new URL(formatted);
        const canon = urlObj.origin + urlObj.pathname.replace(/\/+$/, "") + (urlObj.pathname === "" ? "/" : "") + urlObj.search;
        if (seen.has(canon)) {
          dupes++;
        } else {
          seen.add(canon);
          validList.push(canon);
        }
      } catch {
        invalids++;
      }
    });

    return { cleanUrls: validList, duplicateCount: dupes, invalidCount: invalids };
  }, [urlsInput]);

  // Generated XML Output
  const xmlOutput = useMemo(() => {
    const lines = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
    ];

    cleanUrls.forEach((url, idx) => {
      lines.push(`  <url>`);
      lines.push(`    <loc>${url}</loc>`);
      if (includeLastmod && lastmodDate) {
        lines.push(`    <lastmod>${lastmodDate}</lastmod>`);
      }
      lines.push(`    <changefreq>${idx === 0 ? "daily" : changefreq}</changefreq>`);
      lines.push(`    <priority>${idx === 0 ? "1.0" : priority}</priority>`);
      lines.push(`  </url>`);
    });

    lines.push(`</urlset>`);
    return lines.join("\n");
  }, [cleanUrls, changefreq, priority, includeLastmod, lastmodDate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([xmlOutput], { type: "application/xml;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sitemap.xml";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // Real live validation call
  const handleValidateSitemap = async () => {
    if (!validateUrl.trim()) return;
    setIsValidating(true);
    setValidationError(null);
    setValidationResult(null);

    try {
      const res = await fetch("/api/seo-tools/check-sitemap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sitemapUrl: validateUrl })
      });
      const data = await res.json();
      if (!res.ok) {
        setValidationError(data.error || "Failed to validate sitemap.");
      } else {
        setValidationResult(data);
      }
    } catch (err: any) {
      setValidationError(err.message || "Network error fetching sitemap.");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={() => {
        setUrlsInput("");
        setValidationResult(null);
        setValidationError(null);
      }}
    >
      <div className="space-y-6">
        {/* Mode Selector Tabs */}
        <div className="flex border-b border-slate-200 gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("generator")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "generator"
                ? "border-[#FF5722] text-[#FF5722]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>XML Sitemap Generator</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("validator")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "validator"
                ? "border-[#FF5722] text-[#FF5722]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Live URL Sitemap Validator & Ping</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold uppercase tracking-wider">
              Real Probe
            </span>
          </button>
        </div>

        {activeTab === "generator" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Config Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                  URLs to Include (One per line)
                </label>
                <textarea
                  rows={8}
                  value={urlsInput}
                  onChange={(e) => setUrlsInput(e.target.value)}
                  placeholder="https://example.com/&#10;https://example.com/about&#10;https://example.com/services"
                  className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-xl font-mono text-xs text-slate-800 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
                />
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Valid URLs: <strong className="text-slate-900">{cleanUrls.length}</strong></span>
                  {duplicateCount > 0 && <span className="text-amber-600">Removed {duplicateCount} duplicates</span>}
                  {invalidCount > 0 && <span className="text-rose-600">Skipped {invalidCount} invalid</span>}
                </div>
              </div>

              {/* Crawl Settings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Change Frequency
                  </label>
                  <select
                    value={changefreq}
                    onChange={(e) => setChangefreq(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                  >
                    <option value="always">always</option>
                    <option value="hourly">hourly</option>
                    <option value="daily">daily</option>
                    <option value="weekly">weekly (Recommended)</option>
                    <option value="monthly">monthly</option>
                    <option value="yearly">yearly</option>
                    <option value="never">never</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Default Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                  >
                    <option value="1.0">1.0 (Highest - Homepage)</option>
                    <option value="0.9">0.9 (Critical Landing Pages)</option>
                    <option value="0.8">0.8 (Standard High Yield)</option>
                    <option value="0.6">0.6 (Secondary Articles)</option>
                    <option value="0.4">0.4 (Deep Archives)</option>
                  </select>
                </div>

                <div className="sm:col-span-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={includeLastmod}
                      onChange={(e) => setIncludeLastmod(e.target.checked)}
                      className="w-4 h-4 text-[#FF5722] rounded focus:ring-[#FF5722]"
                    />
                    <span>Include &lt;lastmod&gt; Timestamp</span>
                  </label>
                  {includeLastmod && (
                    <input
                      type="date"
                      value={lastmodDate}
                      onChange={(e) => setLastmodDate(e.target.value)}
                      className="p-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Live XML Output Column */}
            <div className="lg:col-span-6 flex flex-col h-full space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#FF5722]" />
                  <span>Generated sitemap.xml Preview</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-3.5 py-1.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="relative flex-1 min-h-[340px] bg-slate-900 border border-slate-800 rounded-2xl p-4 overflow-hidden">
                <pre className="h-full overflow-auto text-emerald-400 font-mono text-xs leading-relaxed">
                  <code>{xmlOutput}</code>
                </pre>
              </div>
            </div>
          </div>
        ) : (
          /* Live Sitemap Validator Tab (Real Live Backend Fetch) */
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#FF5722]" />
                <span>Test Live Remote Sitemap URL Against Google Protocols</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our backend makes a real HTTP GET probe to inspect the server response status, verify XML parsing, check headers (Content-Type & gzip), and validate compliance against sitemaps.org standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  value={validateUrl}
                  onChange={(e) => setValidateUrl(e.target.value)}
                  placeholder="https://example.com/sitemap.xml"
                  className="flex-1 p-3.5 bg-white border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                />
                <button
                  type="button"
                  onClick={handleValidateSitemap}
                  disabled={isValidating || !validateUrl.trim()}
                  className="px-6 py-3.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isValidating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Probing Server...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Validate Live Sitemap</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {validationError && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Real Validation Results Card */}
            {validationResult && (
              <div className="space-y-6 animate-fade-in">
                {/* Score & Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">HTTP Status</span>
                    <span className="text-xl font-extrabold text-emerald-600 mt-1 block">
                      {validationResult.status} {validationResult.status === 200 ? "OK" : ""}
                    </span>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Total URLs Indexed</span>
                    <span className="text-xl font-extrabold text-slate-900 mt-1 block">
                      {validationResult.totalUrls}
                    </span>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Response Latency</span>
                    <span className="text-xl font-extrabold text-slate-900 mt-1 block">
                      {validationResult.responseTimeMs} ms
                    </span>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">File Size</span>
                    <span className="text-xl font-extrabold text-slate-900 mt-1 block">
                      {(validationResult.sizeBytes / 1024).toFixed(1)} KB
                    </span>
                  </div>
                </div>

                {/* Issues or Clean Badge */}
                {validationResult.issues && validationResult.issues.length > 0 ? (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                    <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>{validationResult.issues.length} Recommendations Found:</span>
                    </span>
                    <ul className="list-disc list-inside text-xs text-amber-700 space-y-1">
                      {validationResult.issues.map((iss: string, i: number) => (
                        <li key={i}>{iss}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>100% Google Compliant:</strong> XML syntax is valid, canonical protocol matches, and robots namespace is correct.</span>
                  </div>
                )}

                {/* Sample URLs Preview Table */}
                {validationResult.sampleUrls && validationResult.sampleUrls.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-700 uppercase">
                        Sample URLs Discovered Inside Sitemap ({validationResult.sampleUrls.length} shown)
                      </span>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-60 overflow-auto">
                      {validationResult.sampleUrls.map((u: string, idx: number) => (
                        <div key={idx} className="p-3 text-xs font-mono text-slate-700 flex items-center justify-between hover:bg-slate-50">
                          <span className="truncate pr-4">{u}</span>
                          <a href={u} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#FF5722]">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolShell>
  );
}
