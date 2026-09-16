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
  FileCode,
  ArrowRight
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function AiAeoGeoCheckerTool({ tool, onNavigateTool, onNavigateHome }: Props) {
  const [contentSample, setContentSample] = useState(
    `What is technical SEO?
Technical SEO is the process of optimizing a website's infrastructure, code architecture, and server configurations so search engine crawlers can index, render, and rank pages efficiently. According to industry benchmarks from 2024, pages that achieve a Time to First Byte (TTFB) under 600ms experience a 24% higher mobile ranking probability.

How does schema markup help AI engines?
Schema markup provides structured machine-readable JSON-LD data. Large language models like OpenAI's GPT-4, Google Gemini, and Perplexity use these entity declarations to extract factual claims with high confidence.`
  );

  const [targetQuery, setTargetQuery] = useState("technical seo definition");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    overallAiScore: number;
    aeoScore: number;
    geoScore: number;
    entityScore: number;
    eeatScore: number;
    directAnswerFound: boolean;
    directAnswerSnippet: string;
    statsCount: number;
    entityCount: number;
    recommendations: Array<{ title: string; type: "critical" | "warning" | "good"; action: string }>;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  const runAudit = () => {
    setLoading(true);
    setTimeout(() => {
      const text = contentSample;

      // Detect direct answer (sentence starting with '[Subject] is ...' or within 45 words of question)
      const directAnswerMatch = text.match(/(?:is|are|refers to|means)\s+([^.?!]{20,200}[.?!])/i);
      const directAnswerFound = !!directAnswerMatch;
      const directAnswerSnippet = directAnswerMatch ? directAnswerMatch[0].trim() : "No crisp 40-word definition sentence detected.";

      // Count statistical indicators
      const statsMatches = text.match(/\b\d+(?:\.\d+)?%|\b\d{4}\b|\$\d+|\b\d+\s*(?:ms|seconds|minutes|hours)\b/gi) || [];
      const statsCount = statsMatches.length;

      // Count key entity markers
      const entities = ["google", "perplexity", "openai", "chatgpt", "gemini", "seo", "schema", "json-ld", "ttfb", "html", "metazivo"];
      let entityCount = 0;
      entities.forEach((e) => {
        if (text.toLowerCase().includes(e)) entityCount++;
      });

      const hasQuestion = /\?|what is|how to|why does/i.test(text);

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
          title: "Entity Disambiguation & Schema Association",
          type: entityCount >= 3 ? ("good" as const) : ("warning" as const),
          action: `Identified ${entityCount} explicit entity mentions. Reinforce these entities with Article and Organization JSON-LD.`
        },
        {
          title: "Conversational Q&A Heading Structure",
          type: hasQuestion ? ("good" as const) : ("warning" as const),
          action: hasQuestion
            ? "Headings reflect natural user questions matching voice search and LLM prompts."
            : "Format H2 subheadings as direct questions (e.g. 'What is...', 'Why should...') to mirror user prompts."
        }
      ];

      const aeoScore = directAnswerFound ? 92 : 60;
      const geoScore = statsCount >= 2 ? 88 : 65;
      const entityScore = Math.min(95, 60 + entityCount * 7);
      const eeatScore = directAnswerFound && statsCount > 0 ? 86 : 70;
      const overallAiScore = Math.round((aeoScore + geoScore + entityScore + eeatScore) / 4);

      setResult({
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
      setLoading(false);
    }, 400);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `=== AI / AEO / GEO READINESS REPORT ===
Overall AI Readiness Score: ${result.overallAiScore}/100
- AEO Direct Answer: ${result.aeoScore}/100
- GEO Citation Density: ${result.geoScore}/100
- Entity Clarity: ${result.entityScore}/100
- EEAT Trust: ${result.eeatScore}/100

Direct Answer Extracted:
"${result.directAnswerSnippet}"

Actionable Recommendations:
${result.recommendations.map((r) => `- [${r.type.toUpperCase()}] ${r.title}: ${r.action}`).join("\n")}

Audited by Metazivo SEO Platform (https://metazivo.com)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={result ? handleReset : undefined}
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label htmlFor="target-query-input" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                Target User Query / AI Prompt
              </label>
              <input
                id="target-query-input"
                type="text"
                value={targetQuery}
                onChange={(e) => setTargetQuery(e.target.value)}
                placeholder="e.g. what is technical seo"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF5722]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                Optimization Mode
              </label>
              <div className="p-2.5 bg-orange-50 border border-orange-200/80 rounded-xl text-xs font-semibold text-[#FF5722] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Overviews + Perplexity</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="content-sample-input" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
              Content Draft / Section to Evaluate
            </label>
            <textarea
              id="content-sample-input"
              rows={7}
              value={contentSample}
              onChange={(e) => setContentSample(e.target.value)}
              placeholder="Paste article section or definition block..."
              className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs font-sans text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] transition-all"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={runAudit}
              disabled={loading || !contentSample.trim()}
              className="px-6 py-3 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Evaluating AI Citation Signals...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Audit AI & Answer Engine Readiness</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results View */}
        {result && (
          <div className="space-y-8 pt-4 border-t border-slate-200 animate-fade-in">
            {/* Top Score Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="bg-slate-950 text-white rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider">
                  AI Visibility Score
                </span>
                <span className="text-3xl font-extrabold mt-1">{result.overallAiScore}/100</span>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">High Quotability</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-xs text-slate-500">AEO Direct Answer</span>
                <span className="text-xl font-bold text-slate-900">{result.aeoScore}%</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-xs text-slate-500">GEO Fact Density</span>
                <span className="text-xl font-bold text-slate-900">{result.geoScore}%</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-xs text-slate-500">Entity Clarity</span>
                <span className="text-xl font-bold text-slate-900">{result.entityScore}%</span>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-xs text-slate-500">EEAT Authority</span>
                <span className="text-xl font-bold text-slate-900">{result.eeatScore}%</span>
              </div>
            </div>

            {/* Extracted Direct Answer Card */}
            <div className="p-5 rounded-2xl bg-orange-50/60 border border-orange-200/80 space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#FF5722] uppercase tracking-wider block">
                Extracted Direct Answer for LLM Quotation
              </span>
              <p className="text-sm font-semibold text-slate-900 leading-relaxed font-sans">
                "{result.directAnswerSnippet}"
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500 font-mono pt-1">
                <span>{result.statsCount} Verifiable Stats Found</span>
                <span>•</span>
                <span>{result.entityCount} Entities Identified</span>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  AI Optimization Recommendations
                </h4>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? "Copied" : "Copy Report"}</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {result.recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3 text-xs font-sans shadow-xs"
                  >
                    {rec.type === "good" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5">
                      <h5 className="font-bold text-slate-900">{rec.title}</h5>
                      <p className="text-slate-600 leading-relaxed">{rec.action}</p>
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
