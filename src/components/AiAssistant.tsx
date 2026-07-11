/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Loader2, Copy, Check, MessageCircle, Share2, FileCode, CheckSquare } from "lucide-react";

interface AiAssistantProps {
  onApplyMetadata?: (data: { seoTitle: string; seoDescription: string; slug: string; focusKeywords: string[]; excerpt: string }) => void;
  onApplyFaq?: (faqHtml: string) => void;
  onApplySchema?: (schemaJson: string) => void;
  currentPostTitle: string;
}

export default function AiAssistant({ onApplyMetadata, onApplyFaq, onApplySchema, currentPostTitle }: AiAssistantProps) {
  const [topic, setTopic] = useState(currentPostTitle || "");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"metadata" | "faq" | "schema" | "social">("metadata");
  const [copied, setCopied] = useState(false);

  // Result States
  const [metadataResult, setMetadataResult] = useState<any>(null);
  const [faqResult, setFaqResult] = useState<any>(null);
  const [schemaResult, setSchemaResult] = useState<any>(null);
  const [socialResult, setSocialResult] = useState<any>(null);

  const triggerCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/ai-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: activeTab,
          title: topic,
          keywords: "SEO optimization, page speed, digital agency, Node hosting",
          excerpt: "Learn organic search optimization strategies tailored for high performance digital visibility.",
          category: "SEO Blogging"
        })
      });

      if (!response.ok) {
        throw new Error("Gemini optimization node failed. Server issue.");
      }

      const data = await response.json();

      if (activeTab === "metadata") {
        setMetadataResult(data);
      } else if (activeTab === "faq") {
        setFaqResult(data.faqs || []);
      } else if (activeTab === "schema") {
        setSchemaResult(data);
      } else if (activeTab === "social") {
        setSocialResult(data);
      }
    } catch (err) {
      console.error("AI Generation pipeline error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5" id="ai-seo-assistant-panel">
      {/* Header and sparkles */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-850">
        <Sparkles className="w-4.5 h-4.5 text-cyan-400 animate-pulse" />
        <h4 className="text-sm font-bold text-slate-200 tracking-wide font-sans">Gemini AI SEO Assistant</h4>
      </div>

      {/* Topic Title Input */}
      <div className="space-y-1 mb-4">
        <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">Optimize Subject / Topic</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-500 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none"
            placeholder="e.g. Website Speed Optimization"
          />
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 disabled:opacity-40 text-white rounded-lg text-xs font-bold tracking-wide shadow transition-all shrink-0 flex items-center gap-1"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>Optimize</span>
          </button>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="flex border-b border-slate-850 text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-4">
        <button
          type="button"
          onClick={() => { setActiveTab("metadata"); }}
          className={`flex-1 text-center py-2 border-b-2 transition-all ${activeTab === "metadata" ? "border-cyan-500 text-cyan-400" : "border-transparent hover:text-slate-300"}`}
        >
          Metadata
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab("faq"); }}
          className={`flex-1 text-center py-2 border-b-2 transition-all ${activeTab === "faq" ? "border-cyan-500 text-cyan-400" : "border-transparent hover:text-slate-300"}`}
        >
          FAQs List
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab("schema"); }}
          className={`flex-1 text-center py-2 border-b-2 transition-all ${activeTab === "schema" ? "border-cyan-500 text-cyan-400" : "border-transparent hover:text-slate-300"}`}
        >
          Schema
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab("social"); }}
          className={`flex-1 text-center py-2 border-b-2 transition-all ${activeTab === "social" ? "border-cyan-500 text-cyan-400" : "border-transparent hover:text-slate-300"}`}
        >
          Social
        </button>
      </div>

      {/* Results viewport */}
      <div className="bg-slate-950/50 border border-slate-900 rounded-xl p-3 min-h-[140px] flex flex-col justify-between">
        {loading ? (
          <div className="flex-grow flex flex-col items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-400 mb-2" />
            <span className="text-xs text-slate-400 font-medium">Querying Gemini 3.5 LLM Engine...</span>
            <span className="text-[10px] text-slate-600 font-mono mt-0.5">Synthesizing semantic models</span>
          </div>
        ) : (
          <div className="flex-grow">
            {/* Metadata Render */}
            {activeTab === "metadata" && (
              metadataResult ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Optimized SEO Title</span>
                    <p className="text-slate-200 font-semibold">{metadataResult.seoTitle}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Compelling Meta Description</span>
                    <p className="text-slate-400 leading-relaxed text-[11px]">{metadataResult.seoDescription}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Focus Slug</span>
                      <p className="text-cyan-400 font-mono text-[10px]">{metadataResult.slug}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Keywords</span>
                      <p className="text-slate-300 truncate">{metadataResult.focusKeywords?.join(", ")}</p>
                    </div>
                  </div>
                  {onApplyMetadata && (
                    <button
                      type="button"
                      onClick={() => onApplyMetadata(metadataResult)}
                      className="mt-2 w-full py-1.5 bg-cyan-900/30 hover:bg-cyan-900/50 text-cyan-400 border border-cyan-850 rounded-lg text-[11px] font-bold tracking-wide flex items-center justify-center gap-1.5"
                    >
                      <CheckSquare className="w-3.5 h-3.5" /> Bind Parameters to Current Post
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-[11px] text-slate-600 italic py-6 text-center">Enter a title and click Optimize to generate meta structures.</p>
              )
            )}

            {/* FAQ Render */}
            {activeTab === "faq" && (
              faqResult ? (
                <div className="space-y-3 text-xs">
                  {faqResult.map((faq: any, idx: number) => (
                    <div key={idx} className="p-2 bg-slate-950 border border-slate-900 rounded-lg">
                      <p className="font-bold text-slate-200">❔ {faq.question}</p>
                      <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                  {onApplyFaq && (
                    <button
                      type="button"
                      onClick={() => {
                        const html = faqResult.map((f: any) => `
<div class="border border-slate-850 rounded-xl p-3 my-4 bg-slate-950/20">
  <h4 class="text-xs font-bold text-slate-100">❔ ${f.question}</h4>
  <p class="text-xs text-slate-400 mt-1 leading-relaxed">${f.answer}</p>
</div>`).join("\n");
                        onApplyFaq(html);
                      }}
                      className="mt-2 w-full py-1.5 bg-cyan-900/30 hover:bg-cyan-900/50 text-cyan-400 border border-cyan-850 rounded-lg text-[11px] font-bold tracking-wide flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Append FAQ Blocks to Editor
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-[11px] text-slate-600 italic py-6 text-center">Tap optimize to craft structured FAQ schema questions.</p>
              )
            )}

            {/* Schema Render */}
            {activeTab === "schema" && (
              schemaResult ? (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Valid JSON-LD Markup</span>
                  <pre className="bg-slate-950 p-2 rounded border border-slate-900 text-[10px] font-mono text-cyan-300 max-h-[160px] overflow-y-auto overflow-x-auto">
                    <code>{typeof schemaResult === "string" ? schemaResult : JSON.stringify(schemaResult, null, 2)}</code>
                  </pre>
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => triggerCopy(typeof schemaResult === "string" ? schemaResult : JSON.stringify(schemaResult, null, 2))}
                      className="flex-1 py-1 bg-slate-900 text-slate-300 rounded text-xs hover:text-white flex items-center justify-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy Code</span>
                    </button>
                    {onApplySchema && (
                      <button
                        type="button"
                        onClick={() => onApplySchema(typeof schemaResult === "string" ? schemaResult : JSON.stringify(schemaResult, null, 2))}
                        className="flex-1 py-1 bg-cyan-900/30 text-cyan-400 border border-cyan-850 rounded text-xs font-semibold flex items-center justify-center gap-1"
                      >
                        <FileCode className="w-3.5 h-3.5" /> Inject Schema
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-slate-600 italic py-6 text-center">Generate structured Schema.org JSON-LD to prevent indexing blocks.</p>
              )
            )}

            {/* Social Render */}
            {activeTab === "social" && (
              socialResult ? (
                <div className="space-y-3 text-[11px] leading-relaxed max-h-[220px] overflow-y-auto">
                  <div className="p-2 bg-slate-950/80 border border-slate-900 rounded-lg">
                    <span className="text-[9px] font-bold text-blue-400 block mb-1">LinkedIn Post</span>
                    <p className="text-slate-300">{socialResult.linkedin}</p>
                    <button
                      type="button"
                      onClick={() => triggerCopy(socialResult.linkedin)}
                      className="mt-1.5 text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Copy Post
                    </button>
                  </div>
                  <div className="p-2 bg-slate-950/80 border border-slate-900 rounded-lg">
                    <span className="text-[9px] font-bold text-pink-400 block mb-1">Instagram Post & Bio</span>
                    <p className="text-slate-300">{socialResult.instagram}</p>
                    <button
                      type="button"
                      onClick={() => triggerCopy(socialResult.instagram)}
                      className="mt-1.5 text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Copy Post
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-slate-600 italic py-6 text-center">Create viral LinkedIn and Meta promotion copy in seconds.</p>
              )
            )}
          </div>
        )}
      </div>

    </div>
  );
}
