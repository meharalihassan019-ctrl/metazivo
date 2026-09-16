import React, { useState } from "react";
import {
  Repeat,
  CornerDownRight,
  Copy,
  Download,
  Check,
  RotateCcw,
  Search,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileCode
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function RedirectTools({ tool, onNavigateTool, onNavigateHome }: Props) {
  const isChainChecker = tool.slug === "redirect-checker";

  // State for Redirect Checker
  const [checkUrl, setCheckUrl] = useState("http://metazivo.com");
  const [checking, setChecking] = useState(false);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [chainResult, setChainResult] = useState<{
    initialUrl: string;
    finalUrl: string;
    finalStatus: number;
    totalHops: number;
    isChain: boolean;
    hops: Array<{ hop: number; url: string; status: number; statusText: string; redirectLocation?: string }>;
  } | null>(null);

  // State for 301 Redirect Generator
  const [serverType, setServerType] = useState<"apache" | "nginx" | "cloudflare" | "wordpress" | "netlify" | "nextjs">("apache");
  const [redirectPairs, setRedirectPairs] = useState(
    `/old-service-page https://metazivo.com/services/technical-seo
/blog/legacy-post /insights/mastering-technical-seo
/about-us /about`
  );
  const [copied, setCopied] = useState(false);

  // Run Real Redirect Check
  const handleCheckRedirects = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    let url = checkUrl.trim();
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
      setCheckUrl(url);
    }

    setChecking(true);
    setCheckError(null);

    try {
      const resp = await fetch("/api/seo-tools/check-redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.error || "Failed to inspect redirects");
      }
      setChainResult(data);
    } catch (err: any) {
      setCheckError(err.message || "Failed to trace redirect hops");
    } finally {
      setChecking(false);
    }
  };

  // Build 301 Redirect Server Rules
  const generatedRedirectRules = () => {
    const lines = redirectPairs
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    if (serverType === "apache") {
      let out = "# Apache .htaccess 301 Redirect Rules\n<IfModule mod_rewrite.c>\nRewriteEngine On\n\n";
      lines.forEach((line) => {
        const parts = line.split(/\s+/);
        if (parts.length >= 2) {
          out += `Redirect 301 ${parts[0]} ${parts[1]}\n`;
        }
      });
      out += "</IfModule>";
      return out;
    }

    if (serverType === "nginx") {
      let out = "# Nginx Server Configuration (inside server {} block)\n\n";
      lines.forEach((line) => {
        const parts = line.split(/\s+/);
        if (parts.length >= 2) {
          out += `location = ${parts[0]} {\n    return 301 ${parts[1]};\n}\n\n`;
        }
      });
      return out;
    }

    if (serverType === "netlify") {
      let out = "# Netlify _redirects format\n\n";
      lines.forEach((line) => {
        const parts = line.split(/\s+/);
        if (parts.length >= 2) {
          out += `${parts[0]} ${parts[1]} 301!\n`;
        }
      });
      return out;
    }

    if (serverType === "nextjs") {
      let out = `// next.config.js\nmodule.exports = {\n  async redirects() {\n    return [\n`;
      lines.forEach((line) => {
        const parts = line.split(/\s+/);
        if (parts.length >= 2) {
          out += `      {\n        source: '${parts[0]}',\n        destination: '${parts[1]}',\n        permanent: true,\n      },\n`;
        }
      });
      out += `    ];\n  },\n};`;
      return out;
    }

    if (serverType === "wordpress") {
      let out = `<?php\n// Place in functions.php or mu-plugins\nadd_action('template_redirect', function() {\n  $requested_path = $_SERVER['REQUEST_URI'];\n\n`;
      lines.forEach((line) => {
        const parts = line.split(/\s+/);
        if (parts.length >= 2) {
          out += `  if (rtrim($requested_path, '/') === '${parts[0]}') {\n    wp_redirect('${parts[1]}', 301);\n    exit;\n  }\n`;
        }
      });
      out += `});\n?>`;
      return out;
    }

    // Cloudflare
    return lines
      .map((l) => {
        const parts = l.split(/\s+/);
        return parts.length >= 2 ? `Rule: ${parts[0]} -> ${parts[1]} (301 Permanent)` : "";
      })
      .filter(Boolean)
      .join("\n");
  };

  const handleCopyRules = () => {
    navigator.clipboard.writeText(generatedRedirectRules());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadRules = () => {
    const text = generatedRedirectRules();
    const filename = serverType === "apache" ? ".htaccess" : serverType === "nginx" ? "nginx-redirects.conf" : "redirects.txt";
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
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
    >
      <div className="space-y-8">
        {isChainChecker ? (
          /* Redirect Chain Checker UI */
          <div className="space-y-6">
            <form onSubmit={handleCheckRedirects} className="space-y-3">
              <label htmlFor="redirect-url-input" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                URL to Trace for Redirect Hops & Chains
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="redirect-url-input"
                  type="text"
                  placeholder="https://example.com/old-page"
                  value={checkUrl}
                  onChange={(e) => setCheckUrl(e.target.value)}
                  disabled={checking}
                  className="flex-1 p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
                />
                <button
                  type="submit"
                  disabled={checking}
                  className="px-6 py-3.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {checking ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Tracing Hops...</span>
                    </>
                  ) : (
                    <>
                      <Repeat className="w-4 h-4" />
                      <span>Trace Redirects</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {checkError && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-3">
                <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{checkError}</p>
              </div>
            )}

            {chainResult && (
              <div className="space-y-6 pt-4 border-t border-slate-200 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                    <span className="text-xs text-slate-500">Total Hops</span>
                    <span className="text-2xl font-extrabold text-slate-900">{chainResult.totalHops}</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                    <span className="text-xs text-slate-500">Final HTTP Status</span>
                    <span className="text-2xl font-extrabold text-emerald-600">{chainResult.finalStatus} OK</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                    <span className="text-xs text-slate-500">Chain Severity</span>
                    <span className={`text-xs font-bold font-mono px-2 py-1 rounded inline-block w-fit ${
                      chainResult.isChain ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}>
                      {chainResult.isChain ? "Chain Warning (Multiple Hops)" : "Clean Direct Path (Good)"}
                    </span>
                  </div>
                </div>

                {/* Hops Trace Timeline */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                    Step-by-Step Hop Execution Path
                  </h4>
                  <div className="space-y-2">
                    {chainResult.hops.map((hop) => (
                      <div
                        key={hop.hop}
                        className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 text-xs font-sans shadow-xs flex-wrap"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold font-mono text-[11px] text-slate-600 shrink-0">
                            {hop.hop}
                          </span>
                          <span className="font-mono text-slate-800 break-all">{hop.url}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                            hop.status === 200 ? "bg-emerald-100 text-emerald-800" : hop.status === 301 ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {hop.status} {hop.statusText}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {chainResult.isChain && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <strong className="block font-bold">Recommended Optimization:</strong>
                    <p>
                      Your website redirects across multiple hops ({chainResult.hops.map(h => h.url).join(" → ")}).
                      Update your server configuration or internal links to point directly to <span className="font-mono font-bold">{chainResult.finalUrl}</span> in a single 301 hop to save crawl latency.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* 301 Redirect Generator UI */
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                Select Web Server / Hosting Environment
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "apache", name: "Apache (.htaccess)" },
                  { id: "nginx", name: "Nginx" },
                  { id: "cloudflare", name: "Cloudflare" },
                  { id: "wordpress", name: "WordPress PHP" },
                  { id: "netlify", name: "Netlify" },
                  { id: "nextjs", name: "Next.js" }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setServerType(s.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      serverType === s.id
                        ? "bg-[#FF5722] text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="redirect-pairs-input" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                Redirect Pairs (Old Path &nbsp;&nbsp; New Target URL)
              </label>
              <textarea
                id="redirect-pairs-input"
                rows={5}
                value={redirectPairs}
                onChange={(e) => setRedirectPairs(e.target.value)}
                placeholder="/old-path /new-path&#10;/legacy-url https://example.com/target"
                className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] transition-all"
              />
            </div>

            {/* Generated Server Config */}
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Ready-to-Deploy Configuration Code
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyRules}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copied ? "Copied Code" : "Copy Configuration"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadRules}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Download File</span>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 text-slate-100 font-mono text-xs overflow-x-auto min-h-[220px]">
                <pre className="whitespace-pre-wrap leading-relaxed">
                  <code>{generatedRedirectRules()}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}
