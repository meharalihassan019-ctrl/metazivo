import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  Cpu,
  Copy,
  Download,
  Check,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileCode,
  Globe,
  RefreshCw,
  Search
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function AiAeoGeoCheckerTool({ tool, onNavigateTool, onNavigateHome }: Props) {
  const [mode, setMode] = useState<"url" | "text">("url");

  // State for live URL inspection
  const [urlInput, setUrlInput] = useState("https://metazivo.com");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // State for text content audit
  const [contentSample, setContentSample] = useState(
    `What is technical SEO?
Technical SEO is the process of optimizing a website's infrastructure, code architecture, and server configurations so search engine crawlers can index, render, and rank pages efficiently. According to industry benchmarks from 2024, pages that achieve a Time to First Byte (TTFB) under 600ms experience a 24% higher mobile ranking probability.

How does schema markup help AI engines?
Schema markup provides structured machine-readable JSON-LD data. Large language models like OpenAI's GPT-4, Google Gemini, and Perplexity use these entity declarations to extract factual claims with high confidence.`
  );

  const [result, setResult] = useState<{
    source: string;
    overallAiScore: number;
    aeoScore: number;
    geoScore: number;
    entityScore: number;
    eeatScore: number;
    hasLlmsTxt?: boolean;
    directAnswerFound: boolean;
    directAnswerSnippet: string;
    statsCount: number;
    entityCount: number;
    recommendations: Array<{ title: string; type: "critical" | "warning" | "good"; action: string }>;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  // 1. Audit Live Webpage URL
  const runLiveUrlAudit = async () => {
    if (!urlInput.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/seo-tools/live-page-inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput.trim() })
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Failed to audit webpage for AI/GEO signals");
        setResult(null);
      } else {
        const ai = data.aiAeoGeo;
        const recommendations = [
          {
            title: "llms.txt Machine Discovery Manifest",
            type: ai.hasLlmsTxt ? ("good" as const) : ("warning" as const),
            action: ai.hasLlmsTxt
              ? "✓ /llms.txt manifest detected! LLMs and web crawlers can access your curated markdown knowledge file."
              : "⚠ Missing /llms.txt. Add an /llms.txt file to your root domain so AI models like Claude, ChatGPT, and Gemini can index your core services cleanly."
          },
          {
            title: "Structured Data Entity Confidence (JSON-LD)",
            type: ai.jsonLdCount > 0 ? ("good" as const) : ("critical" as const),
            action: ai.jsonLdCount > 0
              ? `✓ Detected ${ai.jsonLdCount} JSON-LD schemas. Knowledge graphs use this structured data to corroborate brand authority.`
              : "Critical: No JSON-LD schema detected. AI models rely on schemas to avoid hallucination when citing your brand."
          },
          {
            title: "Direct Answer Synthesizability (AEO)",
            type: ai.directAnswerDefinitionsCount > 0 ? ("good" as const) : ("warning" as const),
            action: ai.directAnswerDefinitionsCount > 0
              ? `✓ Detected ${ai.directAnswerDefinitionsCount} crisp direct definition sentences suitable for AI Overviews and Featured Snippets.`
              : "Add clear, objective 35-45 word definitions directly under question headings (e.g. 'X is a...') to trigger AI citations."
          },
          {
            title: "Semantic Content Architecture",
            type: ai.hasSemanticMarkup ? ("good" as const) : ("warning" as const),
            action: ai.hasSemanticMarkup
              ? "✓ Semantic <article> or <main> container detected. Helps AI parsing models isolate primary content from navigation chrome."
              : "Wrap primary editorial content in semantic <article> or <main> HTML5 tags."
          }
        ];

        const entityScore = Math.min(98, 50 + ai.jsonLdCount * 15);
        const eeatScore = Math.min(98, 55 + (ai.hasLlmsTxt ? 20 : 0) + (ai.statisticsCount * 5));
        const overallAiScore = Math.round((ai.aeoScore + ai.geoScore + entityScore + eeatScore) / 4);

        setResult({
          source: data.url,
          overallAiScore,
          aeoScore: ai.aeoScore,
          geoScore: ai.geoScore,
          entityScore,
          eeatScore,
          hasLlmsTxt: ai.hasLlmsTxt,
          directAnswerFound: ai.directAnswerDefinitionsCount > 0,
          directAnswerSnippet: ai.directAnswerDefinitionsCount > 0 ? "Direct definition patterns detected in rendered HTML." : "No explicit 'X is defined as...' definition detected.",
          statsCount: ai.statisticsCount,
          entityCount: ai.jsonLdCount,
          recommendations
        });
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Network request failed");
    } finally {
      setLoading(false);
    }
  };

  // 2. Audit Draft Text Content
  const runTextAudit = () => {
    const text = contentSample;
    const directAnswerMatch = text.match(/(?:is|are|refers to|means)\s+([^.?!]{20,200}[.?!])/i);
    const directAnswerFound = !!directAnswerMatch;
    const directAnswerSnippet = directAnswerMatch ? directAnswerMatch[0].trim() : "No crisp 40-word definition sentence detected.";
    const statsMatches = text.match(/\b\d+(?:\.\d+)?%|\b\d{4}\b|\$\d+|\b\d+\s*(?:ms|seconds|minutes|hours)\b/gi) || [];
    const statsCount = statsMatches.length;

    const entities = ["google", "perplexity", "openai", "chatgpt", "gemini", "seo", "schema", "json-ld", "ttfb", "html", "metazivo"];
    let entityCount = 0;
    entities.forEach((e) => {
      if (text.toLowerCase().includes(e)) entityCount++;
    });

    const recommendations = [
      {
        title: "Direct Answer Synthesizability (AEO)",
        type: directAnswerFound ? ("good" as const) : ("critical" as const),
        action: directAnswerFound
          ? "Strong direct answer pattern found. AI models can easily quote this sentence as a featured snippet or conversational answer."
          : "Add a crisp, objective 35-45 word definition directly under the primary question heading."
      },
      {
        title: "Statistical Verification Density (GEO)",
        type: statsCount >= 2 ? ("good" as const) : ("warning" as const),
        action: statsCount >= 2
          ? `Detected ${statsCount} verifiable data points (${statsMatches.slice(0, 3).join(", ")}). Models favor citing verifiable statistics.`
          : "Incorporate at least 2 verifiable data figures, benchmark percentages, or primary research citations."
      },
      {
        title: "Entity Disambiguation",
        type: entityCount >= 3 ? ("good" as const) : ("warning" as const),
        action: `Identified ${entityCount} explicit entity mentions. Reinforce these entities with Article and Organization JSON-LD.`
      }
    ];

    const aeoScore = directAnswerFound ? 92 : 60;
    const geoScore = statsCount >= 2 ? 88 : 65;
    const entityScore = Math.min(95, 60 + entityCount * 7);
    const eeatScore = directAnswerFound && statsCount > 0 ? 86 : 70;
    const overallAiScore = Math.round((aeoScore + geoScore + entityScore + eeatScore) / 4);

    setResult({
      source: "Draft Content",
      overallAiScore,
      aeoScore,
      geoScore,
      entityScore,
      eeatScore,
      directAnswerFound,
      directAnswerSnippet,
      statsCount,
      entityCount,
      recommendations
    });
  };

  const handleCopyReport = () => {
    if (!result) return;
    const summary = `AI/GEO Audit for ${result.source}:
Overall Readiness Score: ${result.overallAiScore}/100
AEO Score: ${result.aeoScore}/100
GEO Score: ${result.geoScore}/100
Entity Score: ${result.entityScore}/100
${result.recommendations.map(r => `• ${r.title}: ${r.action}`).join("\n")}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={() => {
        setResult(null);
        setErrorMsg(null);
      }}
    >
      <div className="space-y-6">
        {/* Mode Switcher */}
        <div className="flex border-b border-slate-200 gap-2">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`pb-3 px-4 text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
              mode === "url"
                ? "border-[#FF5722] text-[#FF5722]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Audit Live Webpage URL</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("text")}
            className={`pb-3 px-4 text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
              mode === "text"
                ? "border-[#FF5722] text-[#FF5722]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Audit Draft Content Sample</span>
          </button>
        </div>

        {/* MODE 1: LIVE URL */}
        {mode === "url" && (
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-4 animate-fade-in">
            <label htmlFor="ai-target-url" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
              Target Webpage URL to Audit for AI Overviews & Generative Search
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="ai-target-url"
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/guide"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
                />
              </div>
              <button
                type="button"
                onClick={runLiveUrlAudit}
                disabled={loading || !urlInput.trim()}
                className="px-6 py-3 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold font-mono transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Auditing AI Signals...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    <span>Scan AI & GEO Signals</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Scans for llms.txt discovery, JSON-LD knowledge graph entities, featured snippet answers, and semantic citations across Perplexity, ChatGPT, and Google Gemini.
            </p>
          </div>
        )}

        {/* MODE 2: DRAFT TEXT */}
        {mode === "text" && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <label htmlFor="ai-draft-content" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                Article Text or Answer Excerpt
              </label>
              <textarea
                id="ai-draft-content"
                rows={6}
                value={contentSample}
                onChange={(e) => setContentSample(e.target.value)}
                placeholder="Paste paragraph or article text..."
                className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] resize-y"
              />
            </div>
            <button
              type="button"
              onClick={runTextAudit}
              className="px-6 py-3 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold font-mono transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Evaluate Draft Content</span>
            </button>
          </div>
        )}

        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* AUDIT RESULTS */}
        {result && (
          <div className="space-y-6 pt-4 border-t border-slate-200 animate-fade-in">
            {/* Top Score Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">AI Visibility Score</span>
                <span className={`text-2xl font-bold font-mono mt-1 block ${result.overallAiScore >= 80 ? "text-emerald-600" : "text-amber-600"}`}>
                  {result.overallAiScore} / 100
                </span>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">AEO (Direct Answer)</span>
                <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">
                  {result.aeoScore} / 100
                </span>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">GEO (Citations)</span>
                <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">
                  {result.geoScore} / 100
                </span>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">llms.txt Status</span>
                <span className={`text-xl font-bold font-mono mt-1 block ${result.hasLlmsTxt ? "text-emerald-600" : "text-slate-500"}`}>
                  {result.hasLlmsTxt === undefined ? "N/A" : result.hasLlmsTxt ? "Found (200)" : "Missing (404)"}
                </span>
              </div>
            </div>

            {/* Recommendations & Action Items */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
                  AI Search Optimization Checklist (Google AI Overviews & Perplexity)
                </h4>
                <button
                  type="button"
                  onClick={handleCopyReport}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy Checklist"}</span>
                </button>
              </div>

              <div className="space-y-3">
                {result.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
                      rec.type === "good"
                        ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                        : rec.type === "warning"
                        ? "bg-amber-50/70 border-amber-200 text-amber-900"
                        : "bg-rose-50/70 border-rose-200 text-rose-900"
                    }`}
                  >
                    {rec.type === "good" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : rec.type === "warning" ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <strong className="block font-semibold">{rec.title}</strong>
                      <p className="leading-relaxed">{rec.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}
