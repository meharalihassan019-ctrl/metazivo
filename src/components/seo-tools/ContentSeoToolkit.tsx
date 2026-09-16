import React, { useState, useMemo } from "react";
import {
  FileText,
  Copy,
  Download,
  Check,
  RotateCcw,
  Sparkles,
  BookOpen,
  PieChart,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function ContentSeoToolkit({ tool, onNavigateTool, onNavigateHome }: Props) {
  const isDensity = tool.slug === "keyword-density-checker";
  const isReadability = tool.slug === "readability-analyzer";
  const isWordCount = tool.slug === "word-counter";
  const isTitleGen = tool.slug === "title-tag-generator";
  const isDescGen = tool.slug === "meta-description-generator";

  // Common text input
  const [inputText, setInputText] = useState(
    `Technical SEO is the critical foundation of modern organic growth. When search engine bots crawl your website, they evaluate server response times, schema markup architecture, and internal linking equity. Ensuring your Core Web Vitals remain in the green threshold requires disciplined asset optimization and code splitting. If your website suffers from cumulative layout shift or long hydration delays, search engines may deprioritize your content in favor of faster competitors. Regular technical SEO audits help uncover broken canonical tags, duplicate content parameters, and unoptimized redirect chains before they harm your domain authority.`
  );

  // Title / Description Generator State
  const [topicInput, setTopicInput] = useState("Technical SEO Audit");
  const [brandInput, setBrandInput] = useState("Metazivo");
  const [copied, setCopied] = useState<string | null>(null);

  // Word Count / Stats calculations
  const stats = useMemo(() => {
    const text = inputText.trim();
    if (!text) {
      return { words: 0, chars: 0, charsNoSpaces: 0, sentences: 0, readingTimeMin: 0 };
    }
    const words = text.split(/\s+/).filter(Boolean);
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const readingTimeMin = Math.ceil(words.length / 200);

    return {
      words: words.length,
      chars,
      charsNoSpaces,
      sentences: sentences.length || 1,
      readingTimeMin
    };
  }, [inputText]);

  // Readability calculation (Flesch-Kincaid)
  const readability = useMemo(() => {
    if (stats.words === 0) return { score: 0, grade: "N/A", label: "No text" };
    // Syllables estimation
    const words = inputText.toLowerCase().split(/\s+/).filter(Boolean);
    let syllableCount = 0;
    words.forEach((w) => {
      const clean = w.replace(/[^a-z]/g, "");
      const matches = clean.match(/[aeiouy]{1,2}/g);
      syllableCount += matches ? matches.length : 1;
    });

    const asl = stats.words / stats.sentences; // average sentence length
    const asw = syllableCount / stats.words; // average syllables per word

    // Flesch Reading Ease formula
    const score = Math.max(0, Math.min(100, Math.round(206.835 - 1.015 * asl - 84.6 * asw)));

    let label = "Fairly Difficult";
    let grade = "10th - 12th Grade";
    if (score >= 80) {
      label = "Very Easy to Read";
      grade = "6th Grade";
    } else if (score >= 60) {
      label = "Standard / Plain English";
      grade = "8th - 9th Grade";
    } else if (score >= 50) {
      label = "Fairly Difficult";
      grade = "High School";
    } else {
      label = "Academic / Highly Technical";
      grade = "College Level";
    }

    return { score, grade, label, avgSentenceLength: Math.round(asl) };
  }, [inputText, stats]);

  // Keyword Density calculation
  const densityList = useMemo(() => {
    const text = inputText.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
    const words = text.split(/\s+/).filter((w) => w.length > 2);
    const stopWords = new Set(["the", "and", "for", "that", "this", "with", "from", "your", "they", "have", "were", "are", "will", "been", "which"]);

    const freq: Record<string, number> = {};
    words.forEach((w) => {
      if (!stopWords.has(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });

    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([word, count]) => {
        const pct = ((count / (words.length || 1)) * 100).toFixed(1);
        const warning = parseFloat(pct) > 3.5;
        return { word, count, pct, warning };
      });
  }, [inputText]);

  // Formulas for Title & Description Generators
  const generatedTitles = useMemo(() => {
    const t = topicInput.trim() || "Technical SEO";
    const b = brandInput.trim() || "Metazivo";
    const year = new Date().getFullYear();

    return [
      { type: "Comprehensive Guide", text: `${t}: The Definitive Guide for ${year} | ${b}` },
      { type: "Conversion-Focused", text: `Professional ${t} Services & Architecture - ${b}` },
      { type: "Numbered Listicle", text: `9 Critical ${t} Checks to Double Organic Traffic (${year})` },
      { type: "How-To Formula", text: `How to Master ${t}: Step-by-Step Architecture Framework` },
      { type: "Direct & Minimalist", text: `${t} | ${b}` }
    ];
  }, [topicInput, brandInput]);

  const generatedDescriptions = useMemo(() => {
    const t = topicInput.trim() || "technical SEO audits";
    const b = brandInput.trim() || "Metazivo";

    return [
      {
        type: "High-CTR Value Hook",
        text: `Discover how our enterprise ${t} identifies crawl bottlenecks, optimizes Core Web Vitals, and accelerates organic revenue. Schedule your consultation with ${b}.`
      },
      {
        type: "Actionable & Problem-Solving",
        text: `Fix cumulative layout shift, unblock crawl budget, and fix indexation issues with ${t} engineered for high-growth teams. Read our complete guide.`
      },
      {
        type: "Authoritative & Trust",
        text: `Trusted by modern brands worldwide, ${b} delivers data-driven ${t} that turn organic search into your most reliable customer acquisition channel.`
      }
    ];
  }, [topicInput, brandInput]);

  const copyItem = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
    >
      <div className="space-y-8">
        {/* Title or Description Generator */}
        {(isTitleGen || isDescGen) ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-xs">
                <label className="block text-slate-600 font-semibold">Primary Topic or Keyword</label>
                <input
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="space-y-1 text-xs">
                <label className="block text-slate-600 font-semibold">Brand / Website Name</label>
                <input
                  type="text"
                  value={brandInput}
                  onChange={(e) => setBrandInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            {isTitleGen && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  High-CTR Title Tag Recommendations (Character-Optimized)
                </h4>
                <div className="space-y-2.5">
                  {generatedTitles.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 text-xs shadow-xs"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                          {t.type} • {t.text.length} chars
                        </span>
                        <p className="font-semibold text-slate-900 text-sm font-sans">{t.text}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyItem(t.text, `title-${idx}`)}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer shrink-0"
                      >
                        {copied === `title-${idx}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isDescGen && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Compelling Meta Description Variations (150-160 Chars)
                </h4>
                <div className="space-y-2.5">
                  {generatedDescriptions.map((d, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white flex items-start justify-between gap-3 text-xs shadow-xs"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                          {d.type} • {d.text.length} chars
                        </span>
                        <p className="text-slate-700 text-xs leading-relaxed font-sans">{d.text}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyItem(d.text, `desc-${idx}`)}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer shrink-0"
                      >
                        {copied === `desc-${idx}` ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Text Analysis Tools: Density, Readability, Word Counter */
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="content-editor-input" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                Article Body or Copy to Analyze
              </label>
              <textarea
                id="content-editor-input"
                rows={7}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste text here to compute keyword density, readability scores, and character metrics..."
                className="w-full p-4 bg-slate-50/70 border border-slate-200 rounded-2xl text-xs font-sans text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] transition-all"
              />
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between">
                <span className="text-[11px] text-slate-500 font-mono">Word Count</span>
                <span className="text-2xl font-extrabold text-slate-900">{stats.words}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between">
                <span className="text-[11px] text-slate-500 font-mono">Characters</span>
                <span className="text-2xl font-extrabold text-slate-900">{stats.chars}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between">
                <span className="text-[11px] text-slate-500 font-mono">Sentences</span>
                <span className="text-2xl font-extrabold text-slate-900">{stats.sentences}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between">
                <span className="text-[11px] text-slate-500 font-mono">Reading Time</span>
                <span className="text-2xl font-extrabold text-slate-900">~{stats.readingTimeMin} min</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-col justify-between">
                <span className="text-[11px] text-slate-500 font-mono">Readability</span>
                <span className="text-2xl font-extrabold text-emerald-600">{readability.score}/100</span>
              </div>
            </div>

            {/* Readability Details */}
            {isReadability && (
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Flesch Reading Ease Diagnostic
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Comprehension Level</span>
                    <strong className="text-slate-900 font-bold text-sm">{readability.label}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Grade Level Target</span>
                    <strong className="text-slate-900 font-bold text-sm">{readability.grade}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Avg Sentence Length</span>
                    <strong className="text-slate-900 font-bold text-sm">{readability.avgSentenceLength} words / sentence</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Keyword Density Table */}
            {isDensity && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Top Keyword Density & Frequency
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {densityList.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border bg-white flex flex-col justify-between text-xs ${
                        item.warning ? "border-amber-300 bg-amber-50/50" : "border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="font-semibold text-slate-800">{item.word}</strong>
                        <span className="font-mono text-slate-500 text-[11px]">{item.count}x</span>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                        <span className="text-[11px] text-slate-400">Density</span>
                        <span className={`font-mono font-bold text-[11px] ${item.warning ? "text-amber-600" : "text-emerald-600"}`}>
                          {item.pct}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolShell>
  );
}
