/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Code, CheckCircle2, AlertCircle, FileJson, Sparkles, Check, Copy, Wand2, Eye, Trash2, Edit3, RefreshCw } from "lucide-react";
import { SchemaConfig } from "../types";
import { generateBlogSchemaJson, extractFaqsFromHtml } from "../schemaHelper";

interface SchemaEditorProps {
  schemas: SchemaConfig[];
  onChange: (updated: SchemaConfig[]) => void;
  postTitle?: string;
  postSlug?: string;
  postContent?: string;
  postExcerpt?: string;
  postKeywords?: string[];
}

export default function SchemaEditor({
  schemas,
  onChange,
  postTitle = "Grow Your Business",
  postSlug = "grow",
  postContent = "",
  postExcerpt = "",
  postKeywords = []
}: SchemaEditorProps) {
  const [selectedType, setSelectedType] = useState<
    'Article' | 'BlogPosting' | 'WebSite' | 'Organization' | 'LocalBusiness' | 'Person' | 'Service' | 'FAQ' | 'Breadcrumb' | 'Custom'
  >('BlogPosting');
  const [editorText, setEditorText] = useState("");
  const [validationError, setValidationError] = useState("");
  const [autoSuccessMsg, setAutoSuccessMsg] = useState("");
  const [activeSchemaId, setActiveSchemaId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Analyze active schemas for visual badges
  const detectedSchemaSummary = useMemo(() => {
    const typesFound = new Set<string>();
    let totalFaqs = 0;

    schemas.forEach((s) => {
      try {
        const parsed = JSON.parse(s.jsonData);
        if (Array.isArray(parsed["@graph"])) {
          parsed["@graph"].forEach((item: any) => {
            if (item && item["@type"]) {
              typesFound.add(String(item["@type"]));
              if (item["@type"] === "FAQPage" && Array.isArray(item.mainEntity)) {
                totalFaqs += item.mainEntity.length;
              }
            }
          });
        } else if (parsed["@type"]) {
          typesFound.add(String(parsed["@type"]));
          if (parsed["@type"] === "FAQPage" && Array.isArray(parsed.mainEntity)) {
            totalFaqs += parsed.mainEntity.length;
          }
        }
      } catch (_) {
        typesFound.add(s.type);
      }
    });

    return {
      types: Array.from(typesFound),
      faqCount: totalFaqs
    };
  }, [schemas]);

  const schemaTemplates = {
    BlogPosting: `{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${postTitle.replace(/"/g, '\\"')}",
  "description": "${(postExcerpt || "Complete guide by Metazivo.").replace(/"/g, '\\"')}",
  "image": "https://metazivo.com/og-image.jpg",
  "datePublished": "${new Date().toISOString()}",
  "dateModified": "${new Date().toISOString()}",
  "author": {
    "@type": "Person",
    "name": "Mehar Ali Hassan",
    "url": "https://metazivo.com/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Metazivo",
    "logo": {
      "@type": "ImageObject",
      "url": "https://metazivo.com/favicon.svg"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://metazivo.com/blog/${postSlug}"
  }
}`,
    FAQ: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does Metazivo guarantee Google rankings and speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "By implementing strict Core Web Vitals optimizations, rich Schema.org markup, and high-performance server-side caching."
      }
    }
  ]
}`,
    LocalBusiness: `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Metazivo Digital Agency",
  "@id": "https://metazivo.com/#organization",
  "url": "https://metazivo.com",
  "telephone": "+923288518557",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gulberg",
    "addressLocality": "Lahore / Islamabad",
    "addressRegion": "Punjab",
    "postalCode": "54000",
    "addressCountry": "PK"
  }
}`,
    Service: `{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Technical SEO & High-Performance Web Development",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Metazivo"
  },
  "areaServed": "Worldwide",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "449.00"
  }
}`,
    Organization: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Metazivo",
  "url": "https://metazivo.com",
  "logo": "https://metazivo.com/favicon.svg"
}`
  };

  const handleApplyTemplate = () => {
    const template = schemaTemplates[selectedType as keyof typeof schemaTemplates];
    if (template) {
      setEditorText(template);
      setValidationError("");
    } else {
      setEditorText(`{\n  "@context": "https://schema.org",\n  "@type": "WebSite",\n  "name": "Metazivo"\n}`);
    }
  };

  const handleAutoGenerateFullSchema = () => {
    try {
      const generated = generateBlogSchemaJson({
        title: postTitle,
        slug: postSlug,
        content: postContent,
        excerpt: postExcerpt,
        focusKeywords: postKeywords
      });

      // Update editor text
      setEditorText(generated);
      setSelectedType("BlogPosting");
      setValidationError("");

      // Automatically attach directly as a schema entry if desired
      const newSchema: SchemaConfig = {
        id: `schema-rich-${Date.now()}`,
        type: "BlogPosting",
        jsonData: generated
      };

      // Filter out any older auto-generated ones to prevent duplication
      const existingFiltered = schemas.filter((s) => !s.id.startsWith("schema-rich-"));
      onChange([...existingFiltered, newSchema]);

      setAutoSuccessMsg("✅ Complete Google Rich Schema (BlogPosting + FAQs + Breadcrumbs) generated and attached!");
      setTimeout(() => setAutoSuccessMsg(""), 6000);
    } catch (err: any) {
      setValidationError("Failed to auto-generate schema: " + err.message);
    }
  };

  const handleFormatJson = () => {
    if (!editorText.trim()) return;
    try {
      const parsed = JSON.parse(editorText);
      setEditorText(JSON.stringify(parsed, null, 2));
      setValidationError("");
    } catch (err: any) {
      setValidationError("Invalid JSON: " + err.message);
    }
  };

  const handleSaveSchema = () => {
    setValidationError("");
    try {
      // Parse to ensure valid JSON structure
      const parsed = JSON.parse(editorText);
      if (!parsed["@context"]) {
        setValidationError("Warning: Schema.org JSON-LD must contain a valid '@context' property (e.g. \"https://schema.org\").");
        return;
      }

      let inferredType = selectedType;
      if (parsed["@graph"] && Array.isArray(parsed["@graph"])) {
        const types = parsed["@graph"].map((item: any) => item["@type"]).filter(Boolean);
        inferredType = (types[0] as any) || "BlogPosting";
      } else if (parsed["@type"]) {
        inferredType = (parsed["@type"] as any) || selectedType;
      }

      if (activeSchemaId) {
        // Edit existing
        const updated = schemas.map((s) =>
          s.id === activeSchemaId ? { ...s, type: inferredType, jsonData: editorText } : s
        );
        onChange(updated);
        setActiveSchemaId(null);
      } else {
        // Create new
        const newSchema: SchemaConfig = {
          id: `schema-${Date.now()}`,
          type: inferredType,
          jsonData: editorText
        };
        onChange([...schemas, newSchema]);
      }

      setEditorText("");
      setAutoSuccessMsg("✅ Schema markup saved successfully!");
      setTimeout(() => setAutoSuccessMsg(""), 4000);
    } catch (err: any) {
      setValidationError(`Syntax Error: ${err.message}. Ensure valid quotes, brackets, and no trailing commas.`);
    }
  };

  const handleEdit = (s: SchemaConfig) => {
    setActiveSchemaId(s.id);
    setSelectedType(s.type);
    setEditorText(s.jsonData);
    setValidationError("");
  };

  const handleDelete = (id: string) => {
    const filtered = schemas.filter((s) => s.id !== id);
    onChange(filtered);
    if (activeSchemaId === id) {
      setActiveSchemaId(null);
      setEditorText("");
    }
  };

  const handleCopySchema = (s: SchemaConfig) => {
    navigator.clipboard.writeText(s.jsonData);
    setCopiedId(s.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5" id="schema-editor-component">
      {/* Header with Title and 1-Click Auto Generator Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FileJson className="w-5 h-5 text-cyan-400" />
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide">Schema.org JSON-LD Markup</h4>
            <p className="text-[11px] text-slate-400">Google Rich Results, Detailed SEO extension & AEO ranking schemas</p>
          </div>
        </div>

        {/* 1-Click Auto Generate Full Schema */}
        <button
          type="button"
          onClick={handleAutoGenerateFullSchema}
          className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg text-xs font-bold tracking-wide shadow-md hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
          <span>⚡ Auto-Generate Rich Schema</span>
        </button>
      </div>

      {/* Success Banner */}
      {autoSuccessMsg && (
        <div className="mb-4 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{autoSuccessMsg}</span>
        </div>
      )}

      {/* Active Schemas Status Pill Badges */}
      <div className="mb-4 p-3 bg-slate-950/70 border border-slate-850 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
            Detected Schemas on this Post ({schemas.length})
          </span>
          {schemas.length > 0 && (
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Live in &lt;head&gt;
            </span>
          )}
        </div>

        {schemas.length === 0 ? (
          <div className="flex items-center justify-between text-[11px] text-amber-400/90 py-1">
            <span>No custom schemas attached yet. Click "⚡ Auto-Generate Rich Schema" above to attach Google-ready schemas instantly.</span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {detectedSchemaSummary.types.map((type, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-800 text-cyan-300 rounded-md text-[11px] font-mono flex items-center gap-1.5"
              >
                <Code className="w-3 h-3 text-cyan-400" />
                <span>{type}</span>
                {type === "FAQPage" && detectedSchemaSummary.faqCount > 0 && (
                  <span className="bg-cyan-800/80 px-1 py-0.2 rounded text-[10px] text-white">
                    {detectedSchemaSummary.faqCount} FAQs
                  </span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Select Model and Template */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
            Schema Preset / Blueprint
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="BlogPosting">BlogPosting Markup (Article Rich Results)</option>
            <option value="FAQ">FAQPage Schema (Google Search Accordions)</option>
            <option value="LocalBusiness">LocalBusiness (Google Map Pack)</option>
            <option value="Service">Service Listing (Offerings)</option>
            <option value="Organization">Corporate Profile</option>
            <option value="Custom">Custom JSON-LD Graph</option>
          </select>
        </div>
        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={handleApplyTemplate}
            className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer"
          >
            Load Structural Template
          </button>
          <button
            type="button"
            onClick={handleFormatJson}
            disabled={!editorText.trim()}
            title="Format & Indent JSON-LD"
            className="py-2 px-3 bg-slate-900 hover:bg-slate-850 text-cyan-400 border border-slate-800 disabled:opacity-40 rounded-lg text-xs font-medium cursor-pointer"
          >
            Format JSON
          </button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="space-y-2.5">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              JSON-LD Editor {activeSchemaId && <span className="text-cyan-400 font-semibold">(Editing Existing Schema)</span>}
            </label>
            <span className="text-[10px] text-slate-500">Paste JSON-LD from ChatGPT, Schema Validator, or RankMath</span>
          </div>
          <textarea
            value={editorText}
            onChange={(e) => {
              setEditorText(e.target.value);
              if (validationError) setValidationError("");
            }}
            rows={9}
            className="w-full bg-slate-950 border border-slate-850 focus:border-cyan-500 rounded-xl p-3 font-mono text-[11px] text-cyan-300 focus:outline-none leading-relaxed transition-all"
            placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting",\n  "headline": "${postTitle}",\n  ...\n}`}
          />
        </div>

        {/* Validation Errors */}
        {validationError && (
          <div className="flex gap-2 p-2.5 bg-red-950/40 border border-red-900/60 rounded-lg text-[11px] text-red-300 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-1">
          {activeSchemaId && (
            <button
              type="button"
              onClick={() => {
                setActiveSchemaId(null);
                setEditorText("");
                setValidationError("");
              }}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 rounded-lg text-xs cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            disabled={!editorText.trim()}
            onClick={handleSaveSchema}
            className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white rounded-lg text-xs font-bold tracking-wide shadow transition-all cursor-pointer"
          >
            {activeSchemaId ? "Update Schema" : "Validate & Inject Schema"}
          </button>
        </div>
      </div>

      {/* List Injected Schemas on this Page */}
      <div className="mt-5 pt-4 border-t border-slate-800">
        <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Configured Schemas on this Article ({schemas.length})
        </h5>
        {schemas.length === 0 ? (
          <p className="text-[11px] text-slate-500 italic py-2">
            No custom schemas configured. When published, Metazivo will automatically generate and inject Article, Breadcrumbs, and Organization schemas into &lt;head&gt;.
          </p>
        ) : (
          <div className="space-y-2">
            {schemas.map((s) => (
              <div
                key={s.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950/80 border border-slate-850 hover:border-slate-750 rounded-lg p-2.5 text-xs transition-all"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Code className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-mono font-semibold text-white truncate">{s.type}</span>
                  <span className="text-[10px] text-slate-500 font-mono truncate">({s.id})</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopySchema(s)}
                    className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === s.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === s.id ? "Copied" : "Copy"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(s)}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-300 rounded text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(s.id)}
                    className="px-2 py-1 bg-slate-950 hover:bg-red-950 text-slate-400 hover:text-red-300 border border-slate-850 hover:border-red-900 rounded text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
