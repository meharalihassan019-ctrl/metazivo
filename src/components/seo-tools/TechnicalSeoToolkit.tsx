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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
  const [brokenResults, setBrokenResults] = useState<Array<{ url: string; status: number; ok: boolean; threatLevel?: string }> | null>(null);

  // Real Live Headers / SSL / Canonical state from server probe
  const [securityData, setSecurityData] = useState<{
    server: string;
    contentType: string;
    hsts: boolean;
    hstsRaw: string;
    csp: boolean;
    cspRaw: string;
    xFrame: boolean;
    xFrameRaw: string;
    xContentType: boolean;
    referrerPolicy: string;
    isHttps: boolean;
    canonicalUrl: string;
    robotsMeta: string;
    latencyMs: number;
    status: number;
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

  // Run Real Broken Link Check via API
  const runLinkCheck = async () => {
    setLoading(true);
    setErrorMsg(null);
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
    } catch (e: any) {
      setErrorMsg(e.message || "Failed to check links");
    } finally {
      setLoading(false);
    }
  };

  // Run Real Live Security / SSL / Header probe directly against remote web server
  const runRealSecurityCheck = async () => {
    if (!urlInput.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    let target = urlInput.trim();
    if (!/^https?:\/\//i.test(target)) target = "https://" + target;

    try {
      const resp = await fetch("/api/seo-tools/live-page-inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "Failed to inspect server headers.");

      setSecurityData({
        server: data.securityHeaders?.server || "Standard HTTP Web Server",
        contentType: data.securityHeaders?.contentType || "text/html",
        hsts: data.securityHeaders?.hsts || false,
        hstsRaw: data.securityHeaders?.hstsRaw || "",
        csp: data.securityHeaders?.csp || false,
        cspRaw: data.securityHeaders?.cspRaw || "",
        xFrame: data.securityHeaders?.xFrame || false,
        xFrameRaw: data.securityHeaders?.xFrameRaw || "",
        xContentType: data.securityHeaders?.xContentType || false,
        referrerPolicy: data.securityHeaders?.referrerPolicy || "strict-origin-when-cross-origin",
        isHttps: data.securityHeaders?.isHttps ?? target.startsWith("https://"),
        canonicalUrl: data.canonicalUrl || "",
        robotsMeta: data.robotsMeta || "index, follow",
        latencyMs: data.responseTimeMs || 0,
        status: data.status || 200
      });
    } catch (e: any) {
      setErrorMsg(e.message || "Failed to probe remote website.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={() => {
        setSecurityData(null);
        setBrokenResults(null);
        setErrorMsg(null);
      }}
    >
      <div className="space-y-8">
        {/* Hreflang Generator */}
        {isHreflang && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Target Locales & URLs
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setLanguages([
                      ...languages,
                      { lang: "es", region: "es", url: "https://metazivo.com/es/" }
                    ])
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Language</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {languages.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <input
                      type="text"
                      value={item.lang}
                      onChange={(e) => {
                        const copy = [...languages];
                        copy[idx].lang = e.target.value;
                        setLanguages(copy);
                      }}
                      placeholder="Language (e.g. en)"
                      className="w-20 p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-center"
                    />
                    <input
                      type="text"
                      value={item.region}
                      onChange={(e) => {
                        const copy = [...languages];
                        copy[idx].region = e.target.value;
                        setLanguages(copy);
                      }}
                      placeholder="Region (e.g. us)"
                      className="w-20 p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-center"
                    />
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => {
                        const copy = [...languages];
                        copy[idx].url = e.target.value;
                        setLanguages(copy);
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
                className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl font-mono text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
              />
            </div>

            <button
              type="button"
              onClick={runLinkCheck}
              disabled={loading}
              className="px-6 py-3.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Probing HTTP Response Codes...</span>
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4" />
                  <span>Run Live HTTP Link Audit</span>
                </>
              )}
            </button>

            {brokenResults && (
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Live Response Audit Summary
                </h4>
                <div className="space-y-2">
                  {brokenResults.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {item.status === 200 ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                        <span className="font-mono text-slate-800 truncate">{item.url}</span>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold shrink-0 ${
                          item.status === 200
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        HTTP {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Security / SSL / Headers / Canonical Inspector (Real Remote Probe) */}
        {(isHeaders || isSsl || isCanonical) && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <span className="text-xs font-mono font-bold text-slate-800 uppercase flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#FF5722]" />
                <span>Target Website URL for Live HTTP & TLS Security Probe</span>
              </span>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 p-3.5 bg-white border border-slate-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
                />
                <button
                  type="button"
                  onClick={runRealSecurityCheck}
                  disabled={loading || !urlInput.trim()}
                  className="px-6 py-3.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Probing Server Headers...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Audit Live Security Signals</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {securityData && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">HTTP Status</span>
                    <span className="text-xl font-black text-emerald-600 mt-1 block">{securityData.status} OK</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">SSL / Protocol</span>
                    <span className={`text-xl font-black mt-1 block ${securityData.isHttps ? "text-emerald-600" : "text-rose-600"}`}>
                      {securityData.isHttps ? "HTTPS Active" : "Insecure HTTP"}
                    </span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Server Banner</span>
                    <span className="text-sm font-extrabold text-slate-800 mt-1 truncate block">{securityData.server}</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Response Latency</span>
                    <span className="text-xl font-black text-slate-900 mt-1 block">{securityData.latencyMs} ms</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                    Live HTTP Security Headers Verified Against Target Server
                  </h4>
                  <div className="space-y-2.5">
                    {[
                      {
                        name: "Strict-Transport-Security (HSTS)",
                        active: securityData.hsts,
                        raw: securityData.hstsRaw,
                        note: securityData.hsts ? "Enforces HTTPS browser connections and mitigates SSL stripping." : "Missing: Browser will allow unencrypted HTTP connections without HSTS header."
                      },
                      {
                        name: "Content-Security-Policy (CSP)",
                        active: securityData.csp,
                        raw: securityData.cspRaw,
                        note: securityData.csp ? "Restricts resource execution to trusted origins, preventing XSS." : "Notice: No explicit CSP header found."
                      },
                      {
                        name: "X-Content-Type-Options: nosniff",
                        active: securityData.xContentType,
                        raw: "nosniff",
                        note: securityData.xContentType ? "Protects against MIME-type sniffing." : "Recommended to add 'X-Content-Type-Options: nosniff'."
                      },
                      {
                        name: "X-Frame-Options (Clickjacking Defense)",
                        active: securityData.xFrame,
                        raw: securityData.xFrameRaw,
                        note: securityData.xFrame ? "Restricts framing to prevent clickjacking attacks." : "Frame policy governed by default server directives."
                      },
                      {
                        name: "Canonical Link Tag",
                        active: !!securityData.canonicalUrl,
                        raw: securityData.canonicalUrl,
                        note: securityData.canonicalUrl ? `Canonical points to: ${securityData.canonicalUrl}` : "Missing canonical declaration in page head."
                      }
                    ].map((hdr, i) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3 text-xs shadow-xs">
                        {hdr.active ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        )}
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <strong className="text-slate-900 font-semibold">{hdr.name}</strong>
                            <span className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold ${
                              hdr.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                            }`}>
                              {hdr.active ? "PRESENT" : "NOT SET"}
                            </span>
                          </div>
                          <p className="text-slate-600">{hdr.note}</p>
                          {hdr.raw && <p className="text-[10px] font-mono text-slate-400 truncate">Value: {hdr.raw}</p>}
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
