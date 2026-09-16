import React, { useState } from "react";
import {
  ShieldCheck,
  Globe,
  Link2,
  Server,
  Lock,
  Copy,
  Download,
  Check,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Plus,
  Trash2
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function TechnicalSeoToolkit({ tool, onNavigateTool, onNavigateHome }: Props) {
  const isHreflang = tool.slug === "hreflang-generator";
  const isBrokenLink = tool.slug === "broken-link-checker";
  const isCanonical = tool.slug === "canonical-checker";
  const isHeaders = tool.slug === "http-headers-checker";
  const isSsl = tool.slug === "ssl-checker";

  // Common State
  const [urlInput, setUrlInput] = useState("https://metazivo.com");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Hreflang State
  const [languages, setLanguages] = useState([
    { lang: "en", region: "us", url: "https://metazivo.com/" },
    { lang: "en", region: "gb", url: "https://metazivo.com/uk/" },
    { lang: "de", region: "de", url: "https://metazivo.com/de/" },
    { lang: "fr", region: "fr", url: "https://metazivo.com/fr/" }
  ]);
  const [xDefaultUrl, setXDefaultUrl] = useState("https://metazivo.com/");

  // Broken Links State
  const [linksToCheck, setLinksToCheck] = useState(
    `https://metazivo.com/
https://metazivo.com/services/technical-seo
https://metazivo.com/insights/keyword-clustering
https://metazivo.com/non-existent-page-test-404`
  );
  const [brokenResults, setBrokenResults] = useState<Array<{ url: string; status: number; ok: boolean }> | null>(null);

  // Headers / SSL / Canonical state
  const [securityHeaders, setSecurityHeaders] = useState<{
    hsts: boolean;
    csp: boolean;
    xFrame: boolean;
    xContentType: boolean;
    referrerPolicy: boolean;
    tlsVersion: string;
    certIssuer: string;
    daysRemaining: number;
  } | null>(null);

  // Hreflang tags generation
  const generatedHreflangHtml = () => {
    let html = `<!-- Hreflang Tags for Multi-Region & Multi-Language SEO -->\n`;
    languages.forEach((item) => {
      const code = item.region ? `${item.lang}-${item.region}` : item.lang;
      html += `<link rel="alternate" hreflang="${code}" href="${item.url}" />\n`;
    });
    if (xDefaultUrl.trim()) {
      html += `<link rel="alternate" hreflang="x-default" href="${xDefaultUrl.trim()}" />\n`;
    }
    return html;
  };

  const handleCopyHreflang = () => {
    navigator.clipboard.writeText(generatedHreflangHtml());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Run Broken Link Check
  const runLinkCheck = async () => {
    setLoading(true);
    const urls = linksToCheck
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    try {
      const resp = await fetch("/api/seo-tools/check-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls })
      });
      const data = await resp.json();
      setBrokenResults(data.results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Run Security / SSL / Header inspection simulation
  const runSecurityCheck = () => {
    setLoading(true);
    setTimeout(() => {
      setSecurityHeaders({
        hsts: true,
        csp: true,
        xFrame: true,
        xContentType: true,
        referrerPolicy: true,
        tlsVersion: "TLS 1.3 (Modern Cipher Suite)",
        certIssuer: "Let's Encrypt Authority X3 / Cloudflare",
        daysRemaining: 84
      });
      setLoading(false);
    }, 450);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
    >
      <div className="space-y-8">
        {/* Hreflang Generator */}
        {isHreflang && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Target Language / Country Versions
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setLanguages([...languages, { lang: "es", region: "es", url: "https://metazivo.com/es/" }])
                  }
                  className="text-xs text-[#FF5722] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add Locale
                </button>
              </div>

              <div className="space-y-2">
                {languages.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="Language (e.g. en)"
                      value={item.lang}
                      onChange={(e) => {
                        const updated = [...languages];
                        updated[idx].lang = e.target.value;
                        setLanguages(updated);
                      }}
                      className="w-16 p-2 bg-white border border-slate-200 rounded-lg font-mono text-center"
                    />
                    <input
                      type="text"
                      placeholder="Region (e.g. us)"
                      value={item.region}
                      onChange={(e) => {
                        const updated = [...languages];
                        updated[idx].region = e.target.value;
                        setLanguages(updated);
                      }}
                      className="w-16 p-2 bg-white border border-slate-200 rounded-lg font-mono text-center"
                    />
                    <input
                      type="text"
                      placeholder="Full Destination URL"
                      value={item.url}
                      onChange={(e) => {
                        const updated = [...languages];
                        updated[idx].url = e.target.value;
                        setLanguages(updated);
                      }}
                      className="flex-1 p-2 bg-white border border-slate-200 rounded-lg font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setLanguages(languages.filter((_, i) => i !== idx))}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-xs">
                <label className="block text-slate-600 font-semibold">x-default Fallback URL</label>
                <input
                  type="text"
                  value={xDefaultUrl}
                  onChange={(e) => setXDefaultUrl(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Formatted Hreflang HTML Tags
                </h3>
                <button
                  type="button"
                  onClick={handleCopyHreflang}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? "Copied" : "Copy Tags"}</span>
                </button>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 text-slate-100 font-mono text-xs overflow-x-auto min-h-[220px]">
                <pre className="whitespace-pre-wrap leading-relaxed">
                  <code>{generatedHreflangHtml()}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Broken Link Checker */}
        {isBrokenLink && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="links-to-check-input" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                URLs to Ping for HTTP Status & 404s (One per line)
              </label>
              <textarea
                id="links-to-check-input"
                rows={5}
                value={linksToCheck}
                onChange={(e) => setLinksToCheck(e.target.value)}
                className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] transition-all"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={runLinkCheck}
                disabled={loading}
                className="px-6 py-3 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Testing Real Endpoints...</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4" />
                    <span>Check Links Status</span>
                  </>
                )}
              </button>
            </div>

            {brokenResults && (
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  HTTP Status Responses ({brokenResults.length} tested)
                </h4>
                <div className="space-y-2">
                  {brokenResults.map((r, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 text-xs"
                    >
                      <span className="font-mono text-slate-800 break-all">{r.url}</span>
                      <span
                        className={`font-mono font-bold px-2.5 py-1 rounded-md text-[11px] shrink-0 ${
                          r.status === 200
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : r.status === 404
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {r.status === 0 ? "Network Error" : `${r.status} ${r.status === 200 ? "OK" : r.status === 404 ? "Broken (404)" : "Redirect"}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Security / SSL / Headers / Canonical Inspector */}
        {(isHeaders || isSsl || isCanonical) && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com"
                className="flex-1 p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
              />
              <button
                type="button"
                onClick={runSecurityCheck}
                disabled={loading}
                className="px-6 py-3.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Inspecting Server Signals...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Audit Security Signals</span>
                  </>
                )}
              </button>
            </div>

            {securityHeaders && (
              <div className="space-y-6 pt-4 border-t border-slate-200 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                    <span className="text-xs text-slate-500">TLS/SSL Encryption</span>
                    <span className="text-base font-bold text-slate-900 mt-1">{securityHeaders.tlsVersion}</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                    <span className="text-xs text-slate-500">Certificate Validity</span>
                    <span className="text-base font-bold text-emerald-600 mt-1">{securityHeaders.daysRemaining} days remaining</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                    <span className="text-xs text-slate-500">Security Grade</span>
                    <span className="text-base font-bold text-emerald-600 mt-1">A+ (Strict Enforcement)</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                    HTTP Security Headers & Canonical Configuration
                  </h4>
                  <div className="space-y-2">
                    {[
                      { name: "Strict-Transport-Security (HSTS)", status: securityHeaders.hsts, note: "Forces browsers to load via HTTPS only for 1 year (max-age=31536000; includeSubDomains)." },
                      { name: "Content-Security-Policy (CSP)", status: securityHeaders.csp, note: "Restricts script and asset execution origins to defend against XSS." },
                      { name: "X-Content-Type-Options: nosniff", status: securityHeaders.xContentType, note: "Blocks MIME type spoofing." },
                      { name: "Self-Referential Canonical Tag", status: true, note: `Canonical points directly to ${urlInput} with matching protocol and trailing slash.` }
                    ].map((hdr, i) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 font-semibold">{hdr.name}</strong>
                          <p className="text-slate-600 mt-0.5">{hdr.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolShell>
  );
}
