/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Heading,
  PlusCircle,
  FileCode,
  Quote,
  Table as TableIcon,
  HelpCircle,
  List,
  Youtube,
  Columns,
  Undo,
  Redo,
  Image as ImageIcon,
  ExternalLink,
  Eye,
  Edit3
} from "lucide-react";
import { MediaAsset } from "../types";

interface WordEditorProps {
  value: string;
  onChange: (html: string) => void;
  mediaAssets: MediaAsset[];
  onOpenMediaSelector: (onSelect: (url: string) => void) => void;
}

export default function WordEditor({ value, onChange, mediaAssets, onOpenMediaSelector }: WordEditorProps) {
  const [history, setHistory] = useState<string[]>([value]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [mode, setMode] = useState<"visual" | "html">("visual");

  // Sync internal states with external updates (for initialization)
  useEffect(() => {
    if (value !== history[historyIndex]) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(value);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [value]);

  const updateContent = (newValue: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newValue);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    onChange(newValue);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      onChange(history[prevIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      onChange(history[nextIndex]);
    }
  };

  // Gutenberg Block Injectors
  const injectBlock = (blockHtml: string) => {
    const divider = value.trim() ? "\n\n" : "";
    updateContent(value + divider + blockHtml);
  };

  const addHeading = (level: number) => {
    injectBlock(`<h${level}>Subheading Level ${level}</h${level}>`);
  };

  const addParagraph = () => {
    injectBlock(`<p>This is a fresh paragraph blocks. Click here to edit, refine, or expand with specialized copywriting keywords.</p>`);
  };

  const addList = () => {
    injectBlock(`<ul>
  <li>First descriptive core optimization benefit</li>
  <li>Second authoritative technical performance advantage</li>
  <li>High-converting conversion action metric</li>
</ul>`);
  };

  const addTable = () => {
    injectBlock(`<table class="w-full border border-slate-800 text-slate-300 text-xs">
  <thead>
    <tr class="bg-slate-900 text-slate-100">
      <th class="border border-slate-800 p-2 text-left">Metrics Parameter</th>
      <th class="border border-slate-800 p-2 text-left">Before Optimizations</th>
      <th class="border border-slate-800 p-2 text-left">With Metazivo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-slate-800 p-2">PageSpeed Score</td>
      <td class="border border-slate-800 p-2 text-red-400">32 / 100 (Failed)</td>
      <td class="border border-slate-800 p-2 text-emerald-400">98 / 100 (Pass)</td>
    </tr>
    <tr>
      <td class="border border-slate-800 p-2">Average Load Time</td>
      <td class="border border-slate-800 p-2">4.8 seconds</td>
      <td class="border border-slate-800 p-2 font-semibold">0.4 seconds</td>
    </tr>
  </tbody>
</table>`);
  };

  const addQuote = () => {
    injectBlock(`<blockquote class="border-l-4 border-cyan-500 pl-4 py-2 italic my-4 text-slate-300">
  "Metazivo's implementation of lightweight custom assets increased our organic leads dashboard by 312% in under 90 days."
  <span class="block text-xs font-semibold text-cyan-400 mt-1.5">— Clara Vance, Director at Lumina Living</span>
</blockquote>`);
  };

  const addCode = () => {
    injectBlock(`<pre class="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300 my-4 overflow-x-auto"><code>// Initialize server-side caching headers
app.get('/api/data', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.json({ speed: 'optimized' });
});</code></pre>`);
  };

  const addCallout = () => {
    injectBlock(`<div class="bg-cyan-950/20 border border-cyan-800/80 rounded-xl p-4 my-4 flex items-start gap-3">
  <div class="text-cyan-400 shrink-0">💡</div>
  <div class="text-xs text-slate-300 leading-relaxed">
    <strong>Technical SEO Insight:</strong> Adding deep semantic schema.org structured JSON-LD tags helps search crawlers index your core business parameters natively, bypassing typical keyword density limitations.
  </div>
</div>`);
  };

  const addColumns = () => {
    injectBlock(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
  <div class="p-3 bg-slate-950 border border-slate-850 rounded-lg">
    <h4 class="text-slate-100 font-bold mb-1">Left Strategic Angle</h4>
    <p class="text-xs text-slate-400">Optimize resources through structured asset pipeline configurations.</p>
  </div>
  <div class="p-3 bg-slate-950 border border-slate-850 rounded-lg">
    <h4 class="text-slate-100 font-bold mb-1">Right Conversion Loop</h4>
    <p class="text-xs text-slate-400">Automate lead collection sequences with high friction filtering.</p>
  </div>
</div>`);
  };

  const addFaq = () => {
    injectBlock(`<div class="border border-slate-800 rounded-xl overflow-hidden my-4">
  <div class="bg-slate-900/60 p-3 text-slate-100 font-bold text-xs border-b border-slate-800">
    ❔ Frequently Asked Question
  </div>
  <div class="p-3 text-xs text-slate-400 leading-relaxed bg-slate-950/20">
    At Metazivo, we combine high speed servers, server side caching systems, and compressed WebP image catalogs to drop load times below 0.5s.
  </div>
</div>`);
  };

  const addYoutube = () => {
    injectBlock(`<div class="aspect-video w-full rounded-xl overflow-hidden border border-slate-800 my-4 relative bg-slate-950 flex items-center justify-center">
  <iframe class="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>`);
  };

  const handleAddImage = () => {
    onOpenMediaSelector((url: string) => {
      injectBlock(`<img src="${url}" alt="Metazivo Agency Seed Asset" class="w-full h-auto rounded-xl border border-slate-800 my-4" />`);
    });
  };

  return (
    <div className="w-full bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden" id="gutenberg-editor">
      {/* Tool panel */}
      <div className="w-full bg-slate-950 border-b border-slate-800 p-2 flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Blocks catalog */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-1.5 py-1 rounded-lg">
            <button
              type="button"
              onClick={() => addHeading(2)}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title="Add Heading H2"
            >
              <Heading className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              type="button"
              onClick={addParagraph}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title="Add Paragraph Block"
            >
              <PlusCircle className="w-4 h-4 text-indigo-400" />
            </button>
            <button
              type="button"
              onClick={addList}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title="Add List Block"
            >
              <List className="w-4 h-4 text-emerald-400" />
            </button>
            <button
              type="button"
              onClick={addTable}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title="Add Table Block"
            >
              <TableIcon className="w-4 h-4 text-amber-500" />
            </button>
            <button
              type="button"
              onClick={addQuote}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title="Add Blockquote"
            >
              <Quote className="w-4 h-4 text-rose-400" />
            </button>
            <button
              type="button"
              onClick={addCode}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title="Add Code Block"
            >
              <FileCode className="w-4 h-4 text-sky-400" />
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-1.5 py-1 rounded-lg">
            <button
              type="button"
              onClick={addCallout}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title="Add Callout Alert"
            >
              <HelpCircle className="w-4 h-4 text-yellow-400" />
            </button>
            <button
              type="button"
              onClick={addColumns}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title="Add 2-Col Layout"
            >
              <Columns className="w-4 h-4 text-pink-400" />
            </button>
            <button
              type="button"
              onClick={addFaq}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title="Add Accordion FAQ"
            >
              <PlusCircle className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              type="button"
              onClick={addYoutube}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title="Add YouTube Video Embed"
            >
              <Youtube className="w-4 h-4 text-red-500" />
            </button>
            <button
              type="button"
              onClick={handleAddImage}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              title="Select Image from Media Library"
            >
              <ImageIcon className="w-4 h-4 text-teal-400" />
            </button>
          </div>
        </div>

        {/* Undo/Redo & View Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-1 py-1 rounded-lg">
            <button
              type="button"
              onClick={handleUndo}
              disabled={historyIndex === 0}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-35 rounded"
              title="Undo Last Action"
            >
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-35 rounded"
              title="Redo action"
            >
              <Redo className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center border border-slate-800 rounded-lg overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => setMode("visual")}
              className={`px-2.5 py-1 flex items-center gap-1.5 font-medium ${
                mode === "visual" ? "bg-cyan-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3 h-3" /> Visual Live
            </button>
            <button
              type="button"
              onClick={() => setMode("html")}
              className={`px-2.5 py-1 flex items-center gap-1.5 font-medium ${
                mode === "html" ? "bg-cyan-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Edit3 className="w-3 h-3" /> HTML Editor
            </button>
          </div>
        </div>
      </div>

      {/* Editor Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
        {/* Editor Screen */}
        <div className="border-r border-slate-800 p-4 flex flex-col bg-slate-950/40">
          <label className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold mb-1">
            Gutenberg {mode === "html" ? "HTML Source" : "Visual Body Draft"}
          </label>
          <textarea
            value={value}
            onChange={(e) => updateContent(e.target.value)}
            className="w-full flex-grow bg-transparent text-slate-300 font-mono text-xs focus:outline-none leading-relaxed resize-none min-h-[350px]"
            placeholder="Type your body copy here or click blocks above to inject beautiful responsive sections, images, or schema blocks..."
          />
        </div>

        {/* Live Rendering Panel */}
        <div className="p-4 bg-slate-950/80 flex flex-col overflow-y-auto max-h-[500px]">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold mb-3 flex items-center gap-1.5">
            <ExternalLink className="w-3 h-3 text-cyan-400" /> Active Frontend Viewport Preview
          </span>

          <div
            className="prose prose-invert prose-cyan max-w-none text-slate-300 text-xs space-y-4"
            dangerouslySetInnerHTML={{ __html: value || `<p className="text-slate-600 italic">No content in the body. Build layout by tapping block controls above.</p>` }}
          />
        </div>
      </div>
    </div>
  );
}
