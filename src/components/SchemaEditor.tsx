/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Code, CheckCircle, AlertCircle, FileJson, Play } from "lucide-react";
import { SchemaConfig } from "../types";

interface SchemaEditorProps {
  schemas: SchemaConfig[];
  onChange: (updated: SchemaConfig[]) => void;
  postTitle?: string;
  postSlug?: string;
}

export default function SchemaEditor({ schemas, onChange, postTitle = "Grow Your Business", postSlug = "grow" }: SchemaEditorProps) {
  const [selectedType, setSelectedType] = useState<'Article' | 'BlogPosting' | 'WebSite' | 'Organization' | 'LocalBusiness' | 'Person' | 'Service' | 'FAQ' | 'Breadcrumb' | 'Custom'>('BlogPosting');
  const [editorText, setEditorText] = useState("");
  const [validationError, setValidationError] = useState("");
  const [activeSchemaId, setActiveSchemaId] = useState<string | null>(null);

  const schemaTemplates = {
    BlogPosting: `{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${postTitle}",
  "description": "Discover powerful business scaling metrics with Metazivo Digital Agency.",
  "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  "datePublished": "${new Date().toISOString().split("T")[0]}",
  "author": {
    "@type": "Person",
    "name": "Mehar Ali Hassan",
    "jobTitle": "Principal Architect",
    "url": "https://metazivo.com/team/mehar-ali"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Metazivo",
    "logo": {
      "@type": "ImageObject",
      "url": "https://metazivo.com/assets/logo.png"
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
      "name": "How does Metazivo guarantee speed?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "By bypassing bloated web libraries and building customized high performance Node stacks that render instantly."
      }
    }
  ]
}`,
    LocalBusiness: `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Metazivo Digital Agency",
  "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
  "@id": "https://metazivo.com",
  "url": "https://metazivo.com",
  "telephone": "+923288518557",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gulberg",
    "addressLocality": "Lahore / Islamabad",
    "addressRegion": "Punjab",
    "postalCode": "54000",
    "addressCountry": "PK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 31.5204,
    "longitude": 74.3587
  }
}`,
    Service: `{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Technical SEO & Custom Development",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Metazivo"
  },
  "areaServed": "Worldwide",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "2499.00"
  }
}`,
    Organization: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Metazivo",
  "alternateName": "Metazivo Digital Agency",
  "url": "https://metazivo.com",
  "logo": "https://metazivo.com/assets/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+923288518557",
    "contactType": "customer service",
    "email": "mai@metazivo.com",
    "areaServed": "Global"
  }
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

  const handleSaveSchema = () => {
    setValidationError("");
    try {
      // Parse to ensure valid JSON structure
      const parsed = JSON.parse(editorText);
      if (!parsed["@context"]) {
        setValidationError("Warning: Schema.org JSON-LD must contain a valid '@context' property.");
        return;
      }

      if (activeSchemaId) {
        // Edit existing
        const updated = schemas.map((s) =>
          s.id === activeSchemaId ? { ...s, type: selectedType, jsonData: editorText } : s
        );
        onChange(updated);
        setActiveSchemaId(null);
      } else {
        // Create new
        const newSchema: SchemaConfig = {
          id: `schema-${Date.now()}`,
          type: selectedType,
          jsonData: editorText
        };
        onChange([...schemas, newSchema]);
      }

      setEditorText("");
    } catch (err: any) {
      setValidationError(`Syntax Error: ${err.message}. Double-check trailing commas and quotation matching.`);
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

  return (
    <div className="w-full bg-slate-900/40 border border-slate-800 rounded-xl p-4 sm:p-5" id="schema-editor-component">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-850">
        <FileJson className="w-4 h-4 text-cyan-400" />
        <h4 className="text-sm font-bold text-slate-200 tracking-wide font-sans">Schema.org JSON-LD Generator</h4>
      </div>

      {/* Select type and apply template */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">Schema Markup Model</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
          >
            <option value="BlogPosting">BlogPosting Markup (Articles)</option>
            <option value="FAQ">FAQ Accordions Schema</option>
            <option value="LocalBusiness">LocalBusiness (SEO SEO)</option>
            <option value="Service">Service Package Listing</option>
            <option value="Organization">Corporate Profile Schema</option>
            <option value="WebSite">Core website schema</option>
            <option value="Custom">Custom JSON-LD Blueprint</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="button"
            onClick={handleApplyTemplate}
            className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold tracking-wide transition-all"
          >
            Load Structural Template
          </button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="space-y-3">
        <div>
          <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
            JSON-LD editor {activeSchemaId && <span className="text-cyan-400">(Editing Existing Markup)</span>}
          </label>
          <textarea
            value={editorText}
            onChange={(e) => setEditorText(e.target.value)}
            rows={8}
            className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 font-mono text-[11px] text-cyan-300 focus:outline-none leading-relaxed"
            placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting",\n  "headline": "Post Title"\n}`}
          />
        </div>

        {/* Validation Errors */}
        {validationError && (
          <div className="flex gap-2 p-2.5 bg-red-950/40 border border-red-900 rounded-lg text-[11px] text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Action button */}
        <div className="flex justify-end gap-2">
          {activeSchemaId && (
            <button
              type="button"
              onClick={() => {
                setActiveSchemaId(null);
                setEditorText("");
              }}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-400 border border-slate-800 rounded-lg text-xs"
            >
              Cancel Edit
            </button>
          )}
          <button
            type="button"
            disabled={!editorText.trim()}
            onClick={handleSaveSchema}
            className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold tracking-wide"
          >
            {activeSchemaId ? "Update Active Schema" : "Validate & Inject Schema"}
          </button>
        </div>
      </div>

      {/* List Active schemas */}
      <div className="mt-5 pt-4 border-t border-slate-850">
        <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Injected Schemas on this Page ({schemas.length})</h5>
        {schemas.length === 0 ? (
          <p className="text-[11px] text-slate-500 italic">No JSON-LD schemas mapped to this page. Search engines will fallback to default metadata.</p>
        ) : (
          <div className="space-y-2">
            {schemas.map((s) => (
              <div key={s.id} className="flex justify-between items-center bg-slate-950/50 border border-slate-900 rounded-lg p-2 text-xs">
                <div className="flex items-center gap-2">
                  <Code className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono text-slate-300">{s.type}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleEdit(s)}
                    className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-750 text-slate-300 rounded text-[10px]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(s.id)}
                    className="px-2 py-0.5 bg-slate-950 hover:bg-red-950 text-slate-400 hover:text-red-300 border border-slate-900 rounded text-[10px]"
                  >
                    Delete
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
