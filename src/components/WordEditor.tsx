/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Heading as HeadingIcon,
  PlusCircle,
  FileCode,
  Quote as QuoteIcon,
  Table as TableIcon,
  HelpCircle,
  List as ListIcon,
  Youtube,
  Columns as ColumnsIcon,
  Undo,
  Redo,
  Image as ImageIcon,
  ExternalLink,
  Eye,
  Edit3,
  MoveUp,
  MoveDown,
  Trash2,
  Copy,
  Plus,
  Search,
  Settings,
  Link,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  Minimize2,
  FileText,
  Check,
  Lock,
  Unlock,
  Save,
  Tag,
  FolderOpen,
  Laptop,
  Tablet,
  Smartphone,
  Sparkles,
  Info
} from "lucide-react";
import { MediaAsset } from "../types";

interface WordEditorProps {
  value: string;
  onChange: (html: string) => void;
  mediaAssets: MediaAsset[];
  onOpenMediaSelector: (onSelect: (url: string) => void) => void;
}

interface Block {
  id: string;
  type: string;
  attributes: Record<string, any>;
  isLocked?: boolean;
}

// Highly optimized parser from raw HTML to clean structured Gutenberg blocks
function parseHtmlToBlocks(html: string): Block[] {
  if (!html || !html.trim()) {
    return [{ id: Math.random().toString(36).substr(2, 9), type: "paragraph", attributes: { content: "Start writing or add blocks to compile optimized SEO-rich layouts..." } }];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blocks: Block[] = [];
  const nodes = doc.body.childNodes;

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        blocks.push({
          id: Math.random().toString(36).substr(2, 9),
          type: "paragraph",
          attributes: { content: text }
        });
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const el = node as HTMLElement;
    const tagName = el.tagName.toLowerCase();
    const id = Math.random().toString(36).substr(2, 9);

    if (tagName.startsWith("h") && tagName.length === 2 && !isNaN(Number(tagName[1]))) {
      const level = Number(tagName[1]);
      blocks.push({
        id,
        type: "heading",
        attributes: {
          level,
          content: el.innerHTML,
          align: el.style.textAlign || "left"
        }
      });
    } else if (tagName === "ul" || tagName === "ol") {
      const items: string[] = [];
      el.querySelectorAll("li").forEach((li) => items.push(li.innerHTML));
      blocks.push({
        id,
        type: "list",
        attributes: {
          ordered: tagName === "ol",
          items: items.length > 0 ? items : ["New List Item"]
        }
      });
    } else if (tagName === "blockquote") {
      const isPull = el.classList.contains("pullquote") || el.classList.contains("pull-quote");
      const quoteText = el.innerHTML.replace(/<cite>.*<\/cite>/g, "").replace(/<span>.*<\/span>/g, "").trim();
      const citeEl = el.querySelector("cite") || el.querySelector("span");
      const citation = citeEl ? citeEl.textContent?.replace(/^—\s*/, "") || "" : "";
      blocks.push({
        id,
        type: isPull ? "pullquote" : "quote",
        attributes: { content: quoteText, citation }
      });
    } else if (tagName === "pre") {
      const codeEl = el.querySelector("code");
      const content = codeEl ? codeEl.textContent || "" : el.textContent || "";
      const language = codeEl ? codeEl.className.replace("language-", "") : "javascript";
      blocks.push({
        id,
        type: "code",
        attributes: { content, language }
      });
    } else if (tagName === "table") {
      const headers: string[] = [];
      const rows: string[][] = [];
      el.querySelectorAll("thead th").forEach((th) => headers.push(th.innerHTML));
      el.querySelectorAll("tbody tr").forEach((tr) => {
        const rowData: string[] = [];
        tr.querySelectorAll("td").forEach((td) => rowData.push(td.innerHTML));
        if (rowData.length > 0) rows.push(rowData);
      });
      blocks.push({
        id,
        type: "table",
        attributes: {
          headers: headers.length > 0 ? headers : ["Metric Parameter", "Before", "After"],
          rows: rows.length > 0 ? rows : [["PageSpeed Score", "35 / 100", "98 / 100"]]
        }
      });
    } else if (tagName === "figure" && el.querySelector("img")) {
      const img = el.querySelector("img");
      const figcaption = el.querySelector("figcaption");
      blocks.push({
        id,
        type: "image",
        attributes: {
          url: img?.getAttribute("src") || "",
          alt: img?.getAttribute("alt") || "",
          caption: figcaption?.innerHTML || "",
          align: el.className.includes("float-left") ? "left" : el.className.includes("float-right") ? "right" : "center",
          lazyLoad: img?.getAttribute("loading") === "lazy"
        }
      });
    } else if (tagName === "img") {
      blocks.push({
        id,
        type: "image",
        attributes: {
          url: el.getAttribute("src") || "",
          alt: el.getAttribute("alt") || "",
          caption: "",
          align: "center",
          lazyLoad: true
        }
      });
    } else if (tagName === "hr") {
      blocks.push({ id, type: "separator", attributes: { style: "solid" } });
    } else if (el.id === "faq-accordion" || el.classList.contains("faq-block")) {
      const items: { question: string; answer: string }[] = [];
      const questions = el.querySelectorAll(".faq-question");
      const answers = el.querySelectorAll(".faq-answer");
      questions.forEach((q, idx) => {
        const a = answers[idx];
        if (q && a) {
          items.push({ question: q.textContent || "", answer: a.innerHTML });
        }
      });
      blocks.push({
        id,
        type: "faq",
        attributes: { items: items.length > 0 ? items : [{ question: "Frequently Asked Question?", answer: "Answer copy goes here." }] }
      });
    } else if (el.style.height || tagName === "div" && el.style.height) {
      blocks.push({ id, type: "spacer", attributes: { height: parseInt(el.style.height) || 30 } });
    } else {
      if (tagName === "p") {
        blocks.push({
          id,
          type: "paragraph",
          attributes: { content: el.innerHTML }
        });
      } else {
        blocks.push({
          id,
          type: "custom-html",
          attributes: { html: el.outerHTML }
        });
      }
    }
  });

  if (blocks.length === 0) {
    blocks.push({ id: Math.random().toString(36).substr(2, 9), type: "paragraph", attributes: { content: "" } });
  }
  return blocks;
}

// Standard semantic compilation of Gutenberg blocks back to clean HTML
function compileBlocksToHtml(blocks: Block[]): string {
  return blocks.map((block) => {
    const attrs = block.attributes;
    switch (block.type) {
      case "paragraph":
        return `<p>${attrs.content || ""}</p>`;
      
      case "heading": {
        const tag = `h${attrs.level || 2}`;
        const style = attrs.align && attrs.align !== "left" ? ` style="text-align: ${attrs.align}"` : "";
        return `<${tag}${style}>${attrs.content || ""}</${tag}>`;
      }
      
      case "list": {
        const tag = attrs.ordered ? "ol" : "ul";
        const items = (attrs.items || []).map((it: string) => `  <li>${it}</li>`).join("\n");
        return `<${tag}>\n${items}\n</${tag}>`;
      }
      
      case "quote":
        return `<blockquote class="border-l-4 border-cyan-500 pl-4 py-2 italic my-4 text-slate-300">
  "${attrs.content || ""}"
  ${attrs.citation ? `<span class="block text-xs font-semibold text-cyan-400 mt-1.5">— ${attrs.citation}</span>` : ""}
</blockquote>`;

      case "pullquote":
        return `<blockquote class="pullquote border-y-2 border-orange-500 py-4 my-6 text-center text-xl font-serif italic text-orange-400">
  "${attrs.content || ""}"
  ${attrs.citation ? `<cite class="block text-xs font-sans tracking-widest uppercase text-slate-400 mt-2">— ${attrs.citation}</cite>` : ""}
</blockquote>`;

      case "code":
        return `<pre class="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300 my-4 overflow-x-auto"><code class="language-${attrs.language || "javascript"}">${attrs.content || ""}</code></pre>`;

      case "preformatted":
        return `<pre class="whitespace-pre-wrap font-mono text-xs text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-slate-800">${attrs.content || ""}</pre>`;

      case "table": {
        const headers = (attrs.headers || []).map((h: string) => `<th class="border border-slate-800 p-2 text-left bg-slate-900">${h}</th>`).join("");
        const rows = (attrs.rows || []).map((row: string[]) => {
          const cells = row.map((cell: string) => `<td class="border border-slate-800 p-2">${cell}</td>`).join("");
          return `    <tr>${cells}</tr>`;
        }).join("\n");
        return `<table class="w-full border border-slate-800 text-slate-300 text-xs my-4">
  <thead>
    <tr class="text-slate-100">${headers}</tr>
  </thead>
  <tbody>\n${rows}\n  </tbody>
</table>`;
      }
      
      case "image": {
        const align = attrs.align === "left" ? "float-left mr-4 my-2 max-w-sm" : attrs.align === "right" ? "float-right ml-4 my-2 max-w-sm" : "w-full h-auto my-4 mx-auto block";
        const loading = attrs.lazyLoad ? ' loading="lazy"' : "";
        return `<figure class="image-block ${align}">
  <img src="${attrs.url || ""}" alt="${attrs.alt || ""}" class="rounded-xl border border-slate-800 w-full"${loading} />
  ${attrs.caption ? `<figcaption class="text-center text-xs text-slate-500 mt-2">${attrs.caption}</figcaption>` : ""}
</figure>`;
      }

      case "spacer":
        return `<div style="height: ${attrs.height || 30}px" class="w-full"></div>`;

      case "separator":
        return `<hr class="my-6 border-t-2 border-solid border-slate-800" />`;

      case "buttons": {
        const btns = (attrs.buttons || []).map((btn: any) => `<a href="${btn.url || "#"}" class="px-5 py-2.5 bg-[#FF5722] hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl transition-all inline-block shadow-md">${btn.text || "Click Here"}</a>`).join("\n");
        return `<div class="flex flex-wrap items-center gap-3 my-4">\n${btns}\n</div>`;
      }

      case "cta":
        return `<div class="bg-gradient-to-tr from-[#FF5722]/10 via-orange-950/5 to-transparent border border-[#FF5722]/30 rounded-2xl p-6 my-6 flex flex-col md:flex-row justify-between items-center gap-4">
  <div>
    <h3 class="text-base font-bold text-white">${attrs.title || "Ready to accelerate your growth?"}</h3>
    <p class="text-xs text-slate-400 mt-1">${attrs.subtitle || "Collaborate with our team of custom engineers."}</p>
  </div>
  <a href="${attrs.buttonUrl || "#"}" class="px-5 py-2 bg-[#FF5722] hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow">${attrs.buttonText || "Get Started"}</a>
</div>`;

      case "faq": {
        const qas = (attrs.items || []).map((it: any, index: number) => `  <details class="faq-item group border-b border-slate-850 py-3" ${index === 0 ? "open" : ""}>
    <summary class="faq-question list-none flex justify-between items-center font-bold text-xs text-slate-100 cursor-pointer select-none group-open:text-[#FF5722]">
      <span>${it.question || "Frequently Asked Question?"}</span>
      <span class="text-xs transition-transform group-open:rotate-180">▼</span>
    </summary>
    <div class="faq-answer text-[11px] text-slate-400 leading-relaxed mt-2 pl-1.5">
      ${it.answer || "This is the responsive FAQ reply description block."}
    </div>
  </details>`).join("\n");
        return `<div class="faq-block border border-slate-800 rounded-2xl p-4 bg-slate-950/40 my-6" id="faq-accordion">
  <h4 class="text-xs font-extrabold text-white mb-2 uppercase tracking-wide">❔ Frequently Asked Questions</h4>
${qas}
</div>`;
      }

      case "youtube": {
        const embedUrl = attrs.url?.includes("embed") ? attrs.url : attrs.url?.includes("watch?v=") ? `https://www.youtube.com/embed/${attrs.url.split("watch?v=")[1].split("&")[0]}` : attrs.url;
        return `<div class="aspect-video w-full rounded-2xl overflow-hidden border border-slate-800 my-4 relative bg-slate-950 flex items-center justify-center">
  <iframe class="absolute inset-0 w-full h-full" src="${embedUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
</div>`;
      }

      case "custom-html":
        return attrs.html || "";

      default:
        return `<p>${attrs.content || ""}</p>`;
    }
  }).join("\n\n");
}

export default function WordEditor({ value, onChange, mediaAssets, onOpenMediaSelector }: WordEditorProps) {
  // Parse initial blocks once
  const [blocks, setBlocks] = useState<Block[]>(() => parseHtmlToBlocks(value));
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [history, setHistory] = useState<Block[][]>([parseHtmlToBlocks(value)]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Editor modes: visual | html | preview
  const [mode, setMode] = useState<"visual" | "html" | "preview">("visual");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState<"block" | "document" | "templates">("block");
  const [isInserterOpen, setIsInserterOpen] = useState(false);
  const [inserterQuery, setInserterQuery] = useState("");

  // Autosave simulation state
  const [lastSaved, setLastSaved] = useState<string>("Draft matches system database state.");
  const [isAutosaving, setIsAutosaving] = useState(false);

  // Drag and drop state
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  // Reusable Blocks & Templates State
  const [templateName, setTemplateName] = useState("");
  const [reusableBlocks, setReusableBlocks] = useState<{ id: string; name: string; blocks: Block[] }[]>([
    {
      id: "tpl-1",
      name: "🚀 Standard Product Offer CTA",
      blocks: [
        {
          id: "inner-tpl-cta",
          type: "cta",
          attributes: {
            title: "Connect with CMS Architects today",
            subtitle: "Boost conversions and speed optimization benchmarks instantly.",
            buttonText: "Schedule Free Speed Audit",
            buttonUrl: "/contact"
          }
        }
      ]
    },
    {
      id: "tpl-2",
      name: "❔ Dynamic FAQ Accordion Block",
      blocks: [
        {
          id: "inner-tpl-faq",
          type: "faq",
          attributes: {
            items: [
              { question: "Is the optimization process automated?", answer: "No, our specialists manually refactor template architectures to compile native clean routes." },
              { question: "Do you support custom database layers?", answer: "Yes, we integrate PostgreSQL, Cloud Spanner, and secure Redis cache wrappers." }
            ]
          }
        }
      ]
    }
  ]);

  // Document Fields State (WordPress Taxonomy & Rank Math integration)
  const [postTitle, setPostTitle] = useState("Unleashing Lightning Fast Mobile Frameworks");
  const [postSlug, setPostSlug] = useState("speed-optimization-playbook");
  const [postExcerpt, setPostExcerpt] = useState("A professional handbook on converting heavyweight templates to raw server-side high-performance code pipelines.");
  const [postStatus, setPostStatus] = useState<"draft" | "published" | "scheduled">("draft");
  const [postVisibility, setPostVisibility] = useState<"public" | "private" | "password">("public");
  const [categories, setCategories] = useState<string[]>(["optimization", "mobile"]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [tags, setTags] = useState<string[]>(["flutter", "speed", "ux"]);
  const [newTagName, setNewTagName] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("speed optimization");

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape: Deselect selected block
      if (e.key === "Escape") {
        setSelectedBlockId(null);
      }

      // Save draft shortcut: Ctrl + S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        setIsAutosaving(true);
        setTimeout(() => {
          setIsAutosaving(false);
          setLastSaved(`Saved draft manually at ${new Date().toLocaleTimeString()}`);
        }, 800);
      }

      // Undo shortcut: Ctrl + Z
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }

      // Redo shortcut: Ctrl + Y or Ctrl + Shift + Z
      if (
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "z")
      ) {
        e.preventDefault();
        handleRedo();
      }

      // Duplicate block: Ctrl + D
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d" && selectedBlockId) {
        e.preventDefault();
        const activeIdx = blocks.findIndex((b) => b.id === selectedBlockId);
        if (activeIdx !== -1) {
          duplicateBlock(activeIdx);
        }
      }

      // Delete block: Delete or backspace (prevent during active input editing)
      if ((e.key === "Delete" || (e.key === "Backspace" && e.shiftKey)) && selectedBlockId) {
        const activeEl = document.activeElement;
        const isEditingText =
          activeEl &&
          (activeEl.tagName === "INPUT" ||
            activeEl.tagName === "TEXTAREA" ||
            activeEl.getAttribute("contenteditable") === "true");
        if (!isEditingText) {
          e.preventDefault();
          deleteBlock(selectedBlockId);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedBlockId, blocks, historyIndex, history]);

  // Drag and drop drop-reorder handler
  const handleBlockDrop = (targetIndex: number) => {
    if (draggingIndex === null || draggingIndex === targetIndex) return;
    const newBlocks = [...blocks];
    const draggedBlock = newBlocks[draggingIndex];
    newBlocks.splice(draggingIndex, 1);
    newBlocks.splice(targetIndex, 0, draggedBlock);
    updateBlocksState(newBlocks);
    setDraggingIndex(null);
  };

  const handleSaveAsReusable = () => {
    if (!selectedBlockId) return;
    const blockToSave = blocks.find((b) => b.id === selectedBlockId);
    if (!blockToSave) return;
    const name = templateName.trim() || `Reusable ${blockToSave.type.toUpperCase()} Block`;
    const newTpl = {
      id: `tpl-${Date.now()}`,
      name,
      blocks: [JSON.parse(JSON.stringify(blockToSave))]
    };
    setReusableBlocks([...reusableBlocks, newTpl]);
    setTemplateName("");
  };

  const handleInsertTemplate = (tpl: typeof reusableBlocks[0]) => {
    const clonedBlocks = tpl.blocks.map((b) => ({
      ...b,
      id: Math.random().toString(36).substr(2, 9)
    }));
    const selectedIdx = selectedBlockId ? blocks.findIndex((b) => b.id === selectedBlockId) : -1;
    const newBlocks = [...blocks];
    if (selectedIdx !== -1) {
      newBlocks.splice(selectedIdx + 1, 0, ...clonedBlocks);
    } else {
      newBlocks.push(...clonedBlocks);
    }
    updateBlocksState(newBlocks);
  };

  // Sync external props with local block representation safely
  useEffect(() => {
    const currentCompiled = compileBlocksToHtml(blocks);
    if (value !== currentCompiled) {
      const parsed = parseHtmlToBlocks(value);
      setBlocks(parsed);
      
      // Seed history index
      const newHist = history.slice(0, historyIndex + 1);
      newHist.push(parsed);
      setHistory(newHist);
      setHistoryIndex(newHist.length - 1);
    }
  }, [value]);

  const updateBlocksState = (newBlocks: Block[]) => {
    setBlocks(newBlocks);
    
    // Save to history
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(newBlocks);
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);

    // Call upstream onChange
    const compiled = compileBlocksToHtml(newBlocks);
    onChange(compiled);

    // Trigger visual autosave pulse
    setIsAutosaving(true);
    setTimeout(() => {
      setIsAutosaving(false);
      const time = new Date().toLocaleTimeString();
      setLastSaved(`Autosaved locally at ${time}`);
    }, 1000);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      setBlocks(history[prevIdx]);
      onChange(compileBlocksToHtml(history[prevIdx]));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setBlocks(history[nextIdx]);
      onChange(compileBlocksToHtml(history[nextIdx]));
    }
  };

  // Block Attributes modifier helper
  const updateBlockAttributes = (id: string, attrs: Record<string, any>) => {
    const targetBlock = blocks.find(b => b.id === id);
    if (targetBlock?.isLocked) return; // Prevent edits if locked

    const updated = blocks.map((b) => {
      if (b.id === id) {
        return { ...b, attributes: { ...b.attributes, ...attrs } };
      }
      return b;
    });
    updateBlocksState(updated);
  };

  // Block operations
  const moveBlock = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;
    updateBlocksState(newBlocks);
  };

  const duplicateBlock = (index: number) => {
    const blockToCopy = blocks[index];
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type: blockToCopy.type,
      attributes: JSON.parse(JSON.stringify(blockToCopy.attributes))
    };
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    updateBlocksState(newBlocks);
    setSelectedBlockId(newBlock.id);
  };

  const deleteBlock = (id: string) => {
    const filtered = blocks.filter((b) => b.id !== id);
    updateBlocksState(filtered.length > 0 ? filtered : [{ id: Math.random().toString(36).substr(2, 9), type: "paragraph", attributes: { content: "" } }]);
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const toggleBlockLock = (id: string) => {
    const updated = blocks.map((b) => {
      if (b.id === id) {
        return { ...b, isLocked: !b.isLocked };
      }
      return b;
    });
    updateBlocksState(updated);
  };

  const insertNewBlock = (type: string) => {
    let defaultAttrs: Record<string, any> = {};

    switch (type) {
      case "heading": defaultAttrs = { level: 2, content: "Heading Level 2", align: "left" }; break;
      case "list": defaultAttrs = { ordered: false, items: ["First descriptive point", "Second core argument"] }; break;
      case "quote": defaultAttrs = { content: "Authoritative statement snippet.", citation: "Clara Vance, Metazivo CMO" }; break;
      case "pullquote": defaultAttrs = { content: "Unleashing the high-performance design principles.", citation: "VP Engineering" }; break;
      case "code": defaultAttrs = { content: "const rate = '120fps';\nconsole.log(rate);", language: "javascript" }; break;
      case "preformatted": defaultAttrs = { content: "Pre-spaced visual parameters data logs." }; break;
      case "table": defaultAttrs = { headers: ["Parameter", "Value"], rows: [["Database Latency", "12ms"], ["Render Speed", "120 FPS"]] }; break;
      case "image": defaultAttrs = { url: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80", alt: "Gutenberg Media Asset", caption: "Caption label", align: "center", lazyLoad: true }; break;
      case "spacer": defaultAttrs = { height: 40 }; break;
      case "separator": defaultAttrs = { style: "solid" }; break;
      case "buttons": defaultAttrs = { buttons: [{ text: "Schedule Strategy Call", url: "#", newTab: true }] }; break;
      case "cta": defaultAttrs = { title: "Ready to audit?", subtitle: "Reach out for direct server optimization consult.", buttonText: "Initiate Audit", buttonUrl: "#" }; break;
      case "faq": defaultAttrs = { items: [{ question: "Is this optimized?", answer: "Yes, 100% cloud cached." }] }; break;
      case "youtube": defaultAttrs = { url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }; break;
      case "custom-html": defaultAttrs = { html: "<div class='text-center text-orange-500 font-mono'>Custom Embedded Segment</div>" }; break;
      default: defaultAttrs = { content: "Write custom copy parameters inline without touching system code tags..." }; break;
    }

    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      attributes: defaultAttrs
    };

    if (selectedBlockId) {
      const activeIdx = blocks.findIndex(b => b.id === selectedBlockId);
      const newBlocks = [...blocks];
      newBlocks.splice(activeIdx + 1, 0, newBlock);
      updateBlocksState(newBlocks);
    } else {
      updateBlocksState([...blocks, newBlock]);
    }
    setSelectedBlockId(newBlock.id);
    setIsInserterOpen(false);
  };

  // Gutenberg Block Categories definition
  const blockCategories = [
    {
      title: "Text Blocks",
      items: [
        { type: "paragraph", name: "Paragraph", icon: <ListIcon className="w-4 h-4 text-blue-400" />, desc: "Standard text paragraph block." },
        { type: "heading", name: "Heading", icon: <HeadingIcon className="w-4 h-4 text-cyan-400" />, desc: "H1 to H6 display headers." },
        { type: "list", name: "List", icon: <ListIcon className="w-4 h-4 text-emerald-400" />, desc: "Bullet or ordered step lists." },
        { type: "quote", name: "Quote", icon: <QuoteIcon className="w-4 h-4 text-amber-400" />, desc: "Visual quote highlighting." },
        { type: "pullquote", name: "Pull Quote", icon: <QuoteIcon className="w-4 h-4 text-orange-400" />, desc: "Large styled citation callouts." },
        { type: "code", name: "Code Block", icon: <FileCode className="w-4 h-4 text-sky-400" />, desc: "Clean monospace raw coding syntax." },
        { type: "preformatted", name: "Preformatted", icon: <FileText className="w-4 h-4 text-slate-400" />, desc: "Preserved text spacer alignment." }
      ]
    },
    {
      title: "Layout & Design",
      items: [
        { type: "table", name: "Table Builder", icon: <TableIcon className="w-4 h-4 text-violet-400" />, desc: "Highly custom visual table matrices." },
        { type: "image", name: "Image", icon: <ImageIcon className="w-4 h-4 text-indigo-400" />, desc: "Insert catalog files with metadata." },
        { type: "spacer", name: "Spacer", icon: <Minimize2 className="w-4 h-4 text-slate-500" />, desc: "Adjustable visual height dividers." },
        { type: "separator", name: "Separator", icon: <Plus className="w-4 h-4 text-slate-400" />, desc: "Horizontal separation layout lines." },
        { type: "buttons", name: "Button Set", icon: <PlusCircle className="w-4 h-4 text-rose-400" />, desc: "Add multiple custom action button triggers." },
        { type: "cta", name: "Call To Action", icon: <Sparkles className="w-4 h-4 text-teal-400" />, desc: "High converting marketing container." }
      ]
    },
    {
      title: "Advanced & SEO Blocks",
      items: [
        { type: "faq", name: "FAQ Schema", icon: <HelpCircle className="w-4 h-4 text-yellow-400" />, desc: "Google Schema FAQ Accordions." },
        { type: "youtube", name: "YouTube", icon: <Youtube className="w-4 h-4 text-red-500" />, desc: "Responsive video frame player." },
        { type: "custom-html", name: "Custom HTML", icon: <FileCode className="w-4 h-4 text-emerald-500" />, desc: "Add custom layout CSS/JS scripts." }
      ]
    }
  ];

  // Filters blocks for inserter searching
  const filteredBlockCategories = useMemo(() => {
    if (!inserterQuery) return blockCategories;
    return blockCategories.map(cat => ({
      ...cat,
      items: cat.items.filter(item => item.name.toLowerCase().includes(inserterQuery.toLowerCase()))
    })).filter(cat => cat.items.length > 0);
  }, [inserterQuery]);

  // Rank Math Live SEO score calculator based on current blocks content
  const seoScoreData = useMemo(() => {
    let score = 20; // baseline
    const checks: { label: string; passed: boolean; desc: string }[] = [];

    // Title length check
    const titleLen = postTitle.length;
    const titleOk = titleLen >= 40 && titleLen <= 70;
    checks.push({
      label: "SEO Title length",
      passed: titleOk,
      desc: titleOk ? "Length is perfect (40-70 characters)." : `Length is ${titleLen}. Try 40-70 characters.`
    });
    if (titleOk) score += 15;

    // Slug focus keyword
    const slugOk = postSlug.includes(focusKeyword.toLowerCase().replace(/\s+/g, "-"));
    checks.push({
      label: "Keyword in URL slug",
      passed: slugOk,
      desc: slugOk ? "Keyword found in post permalink slug." : "Permalinks should contain focus keyword."
    });
    if (slugOk) score += 15;

    // Keyword in Title
    const titleKeywordOk = postTitle.toLowerCase().includes(focusKeyword.toLowerCase());
    checks.push({
      label: "Keyword in Document Title",
      passed: titleKeywordOk,
      desc: titleKeywordOk ? "Keyword is perfectly present in Title." : "Incorporate your main keyword in Title."
    });
    if (titleKeywordOk) score += 15;

    // Word count check
    const rawHtml = compileBlocksToHtml(blocks);
    const textContent = rawHtml.replace(/<[^>]*>/g, " ");
    const wordsCount = textContent.trim().split(/\s+/).filter(Boolean).length;
    const wordsOk = wordsCount >= 400;
    checks.push({
      label: "Article Word Count",
      passed: wordsOk,
      desc: wordsOk ? `Awesome word count (${wordsCount} words).` : `Thin content (${wordsCount} words). Try at least 400.`
    });
    if (wordsOk) score += 20;

    // Image alt tag check
    const imagesCount = blocks.filter(b => b.type === "image").length;
    const imagesWithAlt = blocks.filter(b => b.type === "image" && b.attributes.alt).length;
    const imagesAltOk = imagesCount === 0 || imagesWithAlt === imagesCount;
    checks.push({
      label: "Media Alt tags",
      passed: imagesAltOk,
      desc: imagesAltOk ? "All images contain SEO optimized alt attributes." : "Provide alt text for all images."
    });
    if (imagesAltOk) score += 15;

    return { score: Math.min(100, score), checks };
  }, [postTitle, postSlug, focusKeyword, blocks]);

  const activeBlock = useMemo(() => {
    return blocks.find(b => b.id === selectedBlockId) || null;
  }, [blocks, selectedBlockId]);

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[750px]" id="gutenberg-master-workspace">
      
      {/* 1. TOP HEADER NAVIGATION AND CORE CONTROLS */}
      <div className="w-full bg-slate-950/90 border-b border-slate-800 p-3.5 flex flex-wrap justify-between items-center gap-3 z-30">
        <div className="flex items-center gap-3">
          <div className="bg-[#FF5722] text-white p-1.5 rounded-lg font-black text-xs tracking-tight flex items-center gap-1">
            <span className="font-mono text-xs">W</span>
            <span className="hidden sm:inline text-[10px] tracking-widest font-sans font-semibold">GUTENBERG PRO</span>
          </div>

          <button
            type="button"
            onClick={() => setIsInserterOpen(!isInserterOpen)}
            className={`p-2 rounded-xl border flex items-center gap-1.5 transition-all text-xs font-bold ${
              isInserterOpen ? "bg-[#FF5722] text-white border-[#FF5722]" : "bg-slate-900 text-slate-300 border-slate-800 hover:text-white"
            }`}
            title="Toggle Gutenberg Blocks Directory"
          >
            <Plus className="w-4 h-4" /> <span className="hidden md:inline">Add Block</span>
          </button>

          {/* Inline History triggers */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-1 py-1 rounded-xl">
            <button
              type="button"
              onClick={handleUndo}
              disabled={historyIndex === 0}
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded-lg transition-colors"
              title="Undo Visual Changes"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded-lg transition-colors"
              title="Redo action"
            >
              <Redo className="w-4 h-4" />
            </button>
          </div>

          {/* Real-time sync tracker */}
          <span className={`text-[10px] font-mono tracking-wide ${isAutosaving ? "text-[#FF5722] animate-pulse" : "text-slate-500"}`}>
            {isAutosaving ? "● Saving Block State..." : lastSaved}
          </span>
        </div>

        {/* View Mode Router */}
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-slate-800 rounded-xl overflow-hidden text-xs bg-slate-900 p-0.5">
            <button
              type="button"
              onClick={() => setMode("visual")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                mode === "visual" ? "bg-cyan-600 text-white shadow-md" : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Visual Block
            </button>
            <button
              type="button"
              onClick={() => setMode("html")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                mode === "html" ? "bg-cyan-600 text-white shadow-md" : "text-slate-400 hover:text-white"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" /> HTML Code
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                mode === "preview" ? "bg-cyan-600 text-white shadow-md" : "text-slate-400 hover:text-white"
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" /> Client Preview
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-xl border transition-all ${
              isSidebarOpen ? "bg-slate-800 text-[#FF5722] border-[#FF5722]/30" : "bg-slate-900 text-slate-400 border-slate-800"
            }`}
            title="Toggle Gutenberg Panel Inspector"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. CORE WORKSPACE AREA WITH SPLIT INTERFACES */}
      <div className="flex flex-grow overflow-hidden relative">
        
        {/* BLOCK DIRECTORY SLIDE DRAWER (LEFT SIDEBAR) */}
        {isInserterOpen && (
          <div className="absolute inset-y-0 left-0 w-80 bg-slate-950 border-r border-slate-800 z-20 flex flex-col p-4 shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-white uppercase tracking-wider">WordPress Block Library</span>
              <button onClick={() => setIsInserterOpen(false)} className="text-slate-500 hover:text-white text-xs">✕ Close</button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={inserterQuery}
                onChange={(e) => setInserterQuery(e.target.value)}
                placeholder="Search Paragraph, Heading, CTA..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5722]"
              />
            </div>

            <div className="flex-grow overflow-y-auto space-y-4 pr-1 scrollbar-thin">
              {filteredBlockCategories.map((cat, idx) => (
                <div key={idx} className="space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold block border-b border-slate-900 pb-1">{cat.title}</span>
                  <div className="grid grid-cols-2 gap-2">
                    {cat.items.map((item, itemIdx) => (
                      <button
                        key={itemIdx}
                        onClick={() => insertNewBlock(item.type)}
                        className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-left transition-all hover:border-[#FF5722]/40 hover:shadow-md hover:shadow-orange-500/5 group"
                      >
                        <div className="flex items-center gap-1.5 mb-1 text-[#FF5722] group-hover:scale-105 transition-transform">
                          {item.icon}
                          <span className="text-[11px] font-bold text-slate-100 group-hover:text-[#FF5722] transition-colors">{item.name}</span>
                        </div>
                        <p className="text-[9px] text-slate-500 leading-normal line-clamp-2">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WORKSPACE CENTRAL SCREEN DESIGNS */}
        <div className="flex-grow overflow-y-auto bg-slate-950/45 p-6 scrollbar-thin flex flex-col justify-between">
          
          {/* VISUAL LAYOUT DESIGNS MODE */}
          {mode === "visual" && (
            <div className="max-w-3xl mx-auto w-full space-y-6 pb-24">
              
              {/* Fake editable Document Title */}
              <div className="border-b border-slate-900 pb-4 mb-4">
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full bg-transparent text-white font-extrabold text-2xl md:text-3xl border-none focus:outline-none placeholder-slate-700"
                  placeholder="Enter Post Title..."
                />
                <div className="flex items-center gap-1.5 mt-2 text-[10px] text-slate-500 font-mono">
                  <span>Permalink: </span>
                  <span className="text-[#FF5722] font-semibold">/blog/</span>
                  <input
                    type="text"
                    value={postSlug}
                    onChange={(e) => setPostSlug(e.target.value)}
                    className="bg-transparent border-b border-transparent focus:border-[#FF5722] text-slate-400 focus:outline-none w-64"
                  />
                </div>
              </div>

              {/* Loop Gutenberg Blocks List */}
              {blocks.map((block, idx) => {
                const isSelected = block.id === selectedBlockId;
                const attrs = block.attributes;

                return (
                  <div
                    key={block.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBlockId(block.id);
                    }}
                    draggable={!block.isLocked}
                    onDragStart={(e) => {
                      setDraggingIndex(idx);
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleBlockDrop(idx);
                    }}
                    onDragEnd={() => {
                      setDraggingIndex(null);
                    }}
                    className={`relative rounded-2xl transition-all group p-3 cursor-grab active:cursor-grabbing ${
                      draggingIndex === idx ? "opacity-30 border-dashed border-cyan-500 bg-cyan-500/5" : ""
                    } ${
                      isSelected 
                        ? "bg-slate-900/60 border-2 border-cyan-500 ring-2 ring-cyan-500/10 shadow-lg" 
                        : "border-2 border-transparent hover:border-slate-800/80"
                    }`}
                  >
                    
                    {/* Floating WordPress Action Bar on active selected block */}
                    {isSelected && (
                      <div className="absolute -top-11 left-4 bg-slate-950 border border-slate-800 rounded-xl py-1 px-2 flex items-center gap-1.5 shadow-xl z-10 animate-in fade-in slide-in-from-top-1 duration-150">
                        <span className="text-[9px] font-mono font-bold text-slate-500 uppercase bg-slate-900 px-1.5 py-0.5 rounded mr-1 flex items-center gap-1">
                          {block.isLocked ? <Lock className="w-2.5 h-2.5 text-orange-400" /> : <Unlock className="w-2.5 h-2.5 text-slate-500" />}
                          {block.type}
                        </span>

                        <div className="flex items-center gap-0.5 border-r border-slate-800 pr-1 mr-1">
                          <button
                            onClick={() => moveBlock(idx, "up")}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg disabled:opacity-30"
                            title="Move Block Up"
                          >
                            <MoveUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => moveBlock(idx, "down")}
                            disabled={idx === blocks.length - 1}
                            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg disabled:opacity-30"
                            title="Move Block Down"
                          >
                            <MoveDown className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Formatting tags */}
                        <div className="flex items-center gap-0.5 border-r border-slate-800 pr-1.5 mr-1.5">
                          <button
                            onClick={() => {
                              if (block.type === "paragraph" || block.type === "heading") {
                                updateBlockAttributes(block.id, { content: `<strong>${attrs.content || ""}</strong>` });
                              }
                            }}
                            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                            title="Bold Selection Tag"
                          >
                            <Bold className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => {
                              if (block.type === "paragraph" || block.type === "heading") {
                                updateBlockAttributes(block.id, { content: `<em>${attrs.content || ""}</em>` });
                              }
                            }}
                            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                            title="Italic Selection Tag"
                          >
                            <Italic className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => {
                              if (block.type === "paragraph" || block.type === "heading") {
                                updateBlockAttributes(block.id, { content: `<u>${attrs.content || ""}</u>` });
                              }
                            }}
                            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                            title="Underline tag"
                          >
                            <Underline className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-0.5">
                          <button
                            onClick={() => duplicateBlock(idx)}
                            className="p-1 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg"
                            title="Duplicate Block Copy"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => toggleBlockLock(block.id)}
                            className="p-1 text-slate-400 hover:text-yellow-400 hover:bg-slate-800 rounded-lg"
                            title={block.isLocked ? "Unlock Block Attributes" : "Lock Block Attributes"}
                          >
                            {block.isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                          </button>
                          <button
                            onClick={() => deleteBlock(block.id)}
                            className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg"
                            title="Delete Gutenberg Block"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Left Block hover operational handles */}
                    <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-1 z-10 pointer-events-none sm:pointer-events-auto">
                      <button
                        onClick={() => moveBlock(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg disabled:opacity-30"
                      >
                        <MoveUp className="w-2.5 h-2.5" />
                      </button>
                      <button
                        onClick={() => moveBlock(idx, "down")}
                        disabled={idx === blocks.length - 1}
                        className="p-1 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg disabled:opacity-30"
                      >
                        <MoveDown className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    {/* 3. VISUAL RENDERED INLINE BLOCK EDITORS */}
                    <div className={block.isLocked ? "opacity-75 select-none" : ""}>
                      {block.type === "paragraph" && (
                        <textarea
                          value={attrs.content || ""}
                          onChange={(e) => updateBlockAttributes(block.id, { content: e.target.value })}
                          placeholder="Type paragraph content copy here..."
                          className="w-full bg-transparent text-slate-300 font-sans text-sm focus:outline-none border-none leading-relaxed resize-none h-auto"
                          rows={Math.max(1, (attrs.content || "").split("\n").length)}
                        />
                      )}

                      {block.type === "heading" && (
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 px-1.5 py-0.5 rounded">H{attrs.level || 2}</span>
                          <input
                            type="text"
                            value={attrs.content || ""}
                            onChange={(e) => updateBlockAttributes(block.id, { content: e.target.value })}
                            className="w-full bg-transparent text-white font-extrabold text-lg focus:outline-none border-none"
                            placeholder="Heading placeholder..."
                          />
                        </div>
                      )}

                      {block.type === "list" && (
                        <div className="space-y-1.5 pl-4">
                          {(attrs.items || []).map((it: string, itIdx: number) => (
                            <div key={itIdx} className="flex items-center gap-2 group/item">
                              <span className="text-slate-500 font-mono text-xs">{attrs.ordered ? `${itIdx + 1}.` : "•"}</span>
                              <input
                                type="text"
                                value={it}
                                onChange={(e) => {
                                  const nItems = [...attrs.items];
                                  nItems[itIdx] = e.target.value;
                                  updateBlockAttributes(block.id, { items: nItems });
                                }}
                                className="flex-grow bg-transparent text-slate-300 text-xs focus:outline-none border-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const nItems = attrs.items.filter((_: any, i: number) => i !== itIdx);
                                  updateBlockAttributes(block.id, { items: nItems.length > 0 ? nItems : ["First step"] });
                                }}
                                className="text-slate-600 hover:text-red-400 text-xs px-1"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => updateBlockAttributes(block.id, { items: [...(attrs.items || []), ""] })}
                            className="text-[10px] text-[#FF5722] hover:underline flex items-center gap-1 font-bold pt-1"
                          >
                            + Add List Step
                          </button>
                        </div>
                      )}

                      {block.type === "quote" && (
                        <div className="border-l-4 border-cyan-500 pl-4 py-1.5 space-y-1.5">
                          <textarea
                            value={attrs.content || ""}
                            onChange={(e) => updateBlockAttributes(block.id, { content: e.target.value })}
                            className="w-full bg-transparent text-slate-200 italic font-serif text-sm focus:outline-none border-none resize-none"
                            placeholder="Type quote testimonial..."
                            rows={2}
                          />
                          <input
                            type="text"
                            value={attrs.citation || ""}
                            onChange={(e) => updateBlockAttributes(block.id, { citation: e.target.value })}
                            className="w-full bg-transparent text-cyan-400 font-semibold text-xs focus:outline-none border-none"
                            placeholder="— Citation Author, Title"
                          />
                        </div>
                      )}

                      {block.type === "pullquote" && (
                        <div className="border-y-2 border-orange-500 py-4 text-center space-y-2">
                          <textarea
                            value={attrs.content || ""}
                            onChange={(e) => updateBlockAttributes(block.id, { content: e.target.value })}
                            className="w-full bg-transparent text-xl font-serif italic text-orange-400 text-center focus:outline-none border-none resize-none"
                            placeholder="Large Pullquote statement..."
                            rows={2}
                          />
                          <input
                            type="text"
                            value={attrs.citation || ""}
                            onChange={(e) => updateBlockAttributes(block.id, { citation: e.target.value })}
                            className="w-full bg-transparent text-xs uppercase tracking-widest text-slate-500 text-center focus:outline-none border-none"
                            placeholder="— Author citation"
                          />
                        </div>
                      )}

                      {block.type === "code" && (
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 font-mono">
                          <div className="flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-900 pb-1.5">
                            <span>Syntax Language Editor</span>
                            <select
                              value={attrs.language || "javascript"}
                              onChange={(e) => updateBlockAttributes(block.id, { language: e.target.value })}
                              className="bg-slate-900 border border-slate-800 text-[10px] text-slate-300 rounded px-1"
                            >
                              <option value="javascript">JavaScript / Node</option>
                              <option value="typescript">TypeScript</option>
                              <option value="html">HTML5 Segment</option>
                              <option value="css">Tailwind CSS</option>
                              <option value="flutter">Flutter Dart</option>
                            </select>
                          </div>
                          <textarea
                            value={attrs.content || ""}
                            onChange={(e) => updateBlockAttributes(block.id, { content: e.target.value })}
                            className="w-full bg-transparent text-cyan-300 font-mono text-xs focus:outline-none border-none resize-none"
                            rows={4}
                            placeholder="const framework = 'Gutenberg';"
                          />
                        </div>
                      )}

                      {block.type === "preformatted" && (
                        <textarea
                          value={attrs.content || ""}
                          onChange={(e) => updateBlockAttributes(block.id, { content: e.target.value })}
                          className="w-full bg-slate-900/40 border border-slate-800 p-3 rounded-xl text-slate-300 font-mono text-xs focus:outline-none resize-none"
                          rows={3}
                          placeholder="Log output terminal data..."
                        />
                      )}

                      {block.type === "table" && (
                        <div className="space-y-3 overflow-x-auto">
                          <table className="w-full border border-slate-800 text-xs">
                            <thead>
                              <tr className="bg-slate-900 text-slate-100">
                                {(attrs.headers || []).map((h: string, colIdx: number) => (
                                  <th key={colIdx} className="border border-slate-800 p-1">
                                    <input
                                      type="text"
                                      value={h}
                                      onChange={(e) => {
                                        const nHeaders = [...attrs.headers];
                                        nHeaders[colIdx] = e.target.value;
                                        updateBlockAttributes(block.id, { headers: nHeaders });
                                      }}
                                      className="w-full bg-transparent text-center text-slate-100 font-bold focus:outline-none border-none"
                                    />
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {(attrs.rows || []).map((row: string[], rowIdx: number) => (
                                <tr key={rowIdx}>
                                  {row.map((cell: string, colIdx: number) => (
                                    <td key={colIdx} className="border border-slate-800 p-1">
                                      <input
                                        type="text"
                                        value={cell}
                                        onChange={(e) => {
                                          const nRows = [...attrs.rows];
                                          nRows[rowIdx][colIdx] = e.target.value;
                                          updateBlockAttributes(block.id, { rows: nRows });
                                        }}
                                        className="w-full bg-transparent text-slate-300 text-xs focus:outline-none border-none"
                                      />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          
                          {/* Table visual operation modifiers */}
                          <div className="flex gap-2 justify-end">
                            <button
                              type="button"
                              onClick={() => {
                                const nRows = [...(attrs.rows || []), Array(attrs.headers.length).fill("New Cell")];
                                updateBlockAttributes(block.id, { rows: nRows });
                              }}
                              className="px-2 py-1 bg-slate-900 border border-slate-800 hover:text-white rounded text-[10px] font-mono"
                            >
                              + Add Row
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (attrs.rows.length > 1) {
                                  updateBlockAttributes(block.id, { rows: attrs.rows.slice(0, -1) });
                                }
                              }}
                              className="px-2 py-1 bg-slate-900 border border-slate-850 text-red-400 rounded text-[10px] font-mono"
                            >
                              - Remove Row
                            </button>
                          </div>
                        </div>
                      )}

                      {block.type === "image" && (
                        <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950 p-3 space-y-3">
                          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900 group/img flex items-center justify-center">
                            {attrs.url ? (
                              <img src={attrs.url} alt={attrs.alt} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-slate-500 font-bold text-xs">No image selected.</span>
                            )}
                            
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => {
                                  onOpenMediaSelector((url: string) => {
                                    updateBlockAttributes(block.id, { url, caption: "Metazivo High Speed Asset" });
                                  });
                                }}
                                className="px-3 py-1.5 bg-[#FF5722] hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all"
                              >
                                Replace from Media Library
                              </button>
                            </div>
                          </div>
                          
                          <input
                            type="text"
                            value={attrs.caption || ""}
                            onChange={(e) => updateBlockAttributes(block.id, { caption: e.target.value })}
                            className="w-full bg-transparent text-slate-400 text-center text-xs border-b border-transparent focus:border-slate-800 focus:outline-none"
                            placeholder="Write visual subtitle caption..."
                          />
                        </div>
                      )}

                      {block.type === "spacer" && (
                        <div className="border-y border-dashed border-slate-800/40 py-2 text-center bg-slate-950/20">
                          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block mb-2">Spacer Divider: {attrs.height || 30}px</span>
                          <input
                            type="range"
                            min="10"
                            max="150"
                            value={attrs.height || 30}
                            onChange={(e) => updateBlockAttributes(block.id, { height: parseInt(e.target.value) })}
                            className="w-full max-w-xs accent-[#FF5722]"
                          />
                        </div>
                      )}

                      {block.type === "separator" && (
                        <div className="py-4 flex justify-center items-center">
                          <div className="w-full border-t border-slate-800" />
                          <span className="text-[10px] text-slate-600 font-mono px-3 shrink-0">SEPARATOR</span>
                          <div className="w-full border-t border-slate-800" />
                        </div>
                      )}

                      {block.type === "buttons" && (
                        <div className="border border-slate-800 p-4 rounded-2xl bg-slate-950/40 space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {(attrs.buttons || []).map((btn: any, bIdx: number) => (
                              <div key={bIdx} className="bg-[#FF5722] text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
                                <span>{btn.text || "Click Here"}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nBtns = attrs.buttons.filter((_: any, i: number) => i !== bIdx);
                                    updateBlockAttributes(block.id, { buttons: nBtns });
                                  }}
                                  className="text-white/65 hover:text-white"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 border-t border-slate-900 pt-3">
                            <input
                              type="text"
                              placeholder="New Button Label"
                              id={`new-btn-text-${block.id}`}
                              className="bg-slate-900 border border-slate-800 text-xs rounded-xl px-2.5 py-1.5 text-white"
                            />
                            <input
                              type="text"
                              placeholder="Redirect URL Link"
                              id={`new-btn-url-${block.id}`}
                              className="bg-slate-900 border border-slate-800 text-xs rounded-xl px-2.5 py-1.5 text-white"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const txtEl = document.getElementById(`new-btn-text-${block.id}`) as HTMLInputElement;
                              const urlEl = document.getElementById(`new-btn-url-${block.id}`) as HTMLInputElement;
                              if (txtEl?.value) {
                                const nBtns = [...(attrs.buttons || []), { text: txtEl.value, url: urlEl?.value || "#", newTab: true }];
                                updateBlockAttributes(block.id, { buttons: nBtns });
                                txtEl.value = "";
                                if (urlEl) urlEl.value = "";
                              }
                            }}
                            className="text-[10px] text-emerald-400 font-bold hover:underline"
                          >
                            + Confirm & Add Button Link
                          </button>
                        </div>
                      )}

                      {block.type === "cta" && (
                        <div className="bg-gradient-to-tr from-[#FF5722]/10 via-slate-900 to-transparent border border-[#FF5722]/30 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3">
                          <div className="space-y-1.5 flex-grow">
                            <input
                              type="text"
                              value={attrs.title || ""}
                              onChange={(e) => updateBlockAttributes(block.id, { title: e.target.value })}
                              className="bg-transparent text-white font-extrabold text-sm border-none w-full focus:outline-none"
                              placeholder="CTA Title Header"
                            />
                            <input
                              type="text"
                              value={attrs.subtitle || ""}
                              onChange={(e) => updateBlockAttributes(block.id, { subtitle: e.target.value })}
                              className="bg-transparent text-slate-400 text-xs border-none w-full focus:outline-none"
                              placeholder="Call to action description parameters."
                            />
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <input
                              type="text"
                              value={attrs.buttonText || ""}
                              onChange={(e) => updateBlockAttributes(block.id, { buttonText: e.target.value })}
                              className="bg-[#FF5722] text-white font-bold text-xs rounded-lg px-3 py-1.5 text-center w-24 focus:outline-none"
                              placeholder="CTA Button Label"
                            />
                          </div>
                        </div>
                      )}

                      {block.type === "faq" && (
                        <div className="border border-slate-800 p-4 rounded-2xl bg-slate-950/60 space-y-3">
                          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Gutenberg FAQ Schema Items</span>
                          
                          {(attrs.items || []).map((it: any, itemIdx: number) => (
                            <div key={itemIdx} className="space-y-2 p-2 bg-slate-900/40 rounded-xl border border-slate-850">
                              <div className="flex justify-between gap-2">
                                <input
                                  type="text"
                                  value={it.question || ""}
                                  onChange={(e) => {
                                    const nItems = [...attrs.items];
                                    nItems[itemIdx].question = e.target.value;
                                    updateBlockAttributes(block.id, { items: nItems });
                                  }}
                                  className="bg-transparent text-slate-100 font-bold text-xs border-b border-slate-800 w-full focus:outline-none"
                                  placeholder="Frequently Asked Question?"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nItems = attrs.items.filter((_: any, i: number) => i !== itemIdx);
                                    updateBlockAttributes(block.id, { items: nItems.length > 0 ? nItems : [{ question: "Question?", answer: "Answer." }] });
                                  }}
                                  className="text-slate-500 hover:text-red-400 text-xs"
                                >
                                  ✕
                                </button>
                              </div>
                              <textarea
                                value={it.answer || ""}
                                onChange={(e) => {
                                  const nItems = [...attrs.items];
                                  nItems[itemIdx].answer = e.target.value;
                                  updateBlockAttributes(block.id, { items: nItems });
                                }}
                                className="bg-transparent text-slate-400 text-[11px] w-full focus:outline-none resize-none"
                                placeholder="Answer copy..."
                                rows={2}
                              />
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => updateBlockAttributes(block.id, { items: [...(attrs.items || []), { question: "New FAQ Question?", answer: "FAQ Answer replica." }] })}
                            className="text-[10px] text-[#FF5722] hover:underline font-bold"
                          >
                            + Add New Q&A Block
                          </button>
                        </div>
                      )}

                      {block.type === "youtube" && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2.5 rounded-xl">
                            <span className="text-red-500 font-bold text-xs shrink-0 flex items-center gap-1"><Youtube className="w-4 h-4" /> Embed Link:</span>
                            <input
                              type="text"
                              value={attrs.url || ""}
                              onChange={(e) => updateBlockAttributes(block.id, { url: e.target.value })}
                              className="bg-transparent text-xs text-slate-300 w-full focus:outline-none border-none font-mono"
                              placeholder="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            />
                          </div>
                          {attrs.url && (
                            <div className="aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
                              <iframe
                                src={attrs.url.includes("embed") ? attrs.url : "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                                className="w-full h-full"
                                frameBorder="0"
                                allowFullScreen
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {block.type === "custom-html" && (
                        <div className="space-y-1.5 font-mono">
                          <label className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Raw Developer HTML Scope</label>
                          <textarea
                            value={attrs.html || ""}
                            onChange={(e) => updateBlockAttributes(block.id, { html: e.target.value })}
                            className="w-full bg-slate-950 p-3 rounded-xl border border-slate-850 text-cyan-400 font-mono text-xs focus:outline-none leading-relaxed"
                            rows={4}
                            placeholder="<div class='custom-tag'>Confirm code layout</div>"
                          />
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}

              {/* End of content inline adder button */}
              <div className="flex justify-center pt-4 border-t border-slate-900">
                <button
                  type="button"
                  onClick={() => {
                    updateBlocksState([...blocks, { id: Math.random().toString(36).substr(2, 9), type: "paragraph", attributes: { content: "" } }]);
                  }}
                  className="px-4 py-2 bg-slate-900/60 hover:bg-slate-850 text-slate-400 hover:text-white rounded-xl border border-slate-800/80 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4 text-[#FF5722]" /> Append New Visual Block
                </button>
              </div>

            </div>
          )}

          {/* CODE SOURCE EDITOR VIEW */}
          {mode === "html" && (
            <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-2xl p-4">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold mb-2 block">RAW SEMANTIC HTML SOURCE</span>
              <textarea
                value={compileBlocksToHtml(blocks)}
                onChange={(e) => {
                  const parsed = parseHtmlToBlocks(e.target.value);
                  setBlocks(parsed);
                  onChange(e.target.value);
                }}
                className="w-full flex-grow bg-transparent text-cyan-300 font-mono text-xs focus:outline-none leading-relaxed resize-none h-[420px] overflow-y-auto"
                placeholder="Paste raw HTML elements here..."
              />
            </div>
          )}

          {/* FRONTEND VISITOR PREVIEW VIEW (Desktop/Tablet/Mobile Frame Simulator) */}
          {mode === "preview" && (
            <div className="flex flex-col h-full space-y-4">
              <div className="flex justify-between items-center bg-slate-950/80 border border-slate-800/80 px-4 py-2 rounded-2xl">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">RESPONSIVE CLIENT VIEWPORT PREVIEW</span>
                <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-xl border border-slate-850">
                  <button
                    onClick={() => setPreviewDevice("desktop")}
                    className={`p-1.5 rounded-lg transition-all ${previewDevice === "desktop" ? "bg-cyan-600 text-white" : "text-slate-400 hover:text-white"}`}
                    title="Desktop monitor size"
                  >
                    <Laptop className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice("tablet")}
                    className={`p-1.5 rounded-lg transition-all ${previewDevice === "tablet" ? "bg-cyan-600 text-white" : "text-slate-400 hover:text-white"}`}
                    title="Tablet size width"
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice("mobile")}
                    className={`p-1.5 rounded-lg transition-all ${previewDevice === "mobile" ? "bg-cyan-600 text-white" : "text-slate-400 hover:text-white"}`}
                    title="Mobile screen aspect"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Viewport content canvas */}
              <div className="flex justify-center items-center flex-grow bg-slate-950/30 p-4 rounded-3xl border border-slate-900/50 min-h-[440px] max-h-[500px] overflow-y-auto">
                <div
                  className={`bg-slate-950 border border-slate-800 rounded-3xl p-6 transition-all duration-300 shadow-2xl h-full overflow-y-auto scrollbar-thin ${
                    previewDevice === "desktop" ? "w-full" : previewDevice === "tablet" ? "w-[600px]" : "w-[360px]"
                  }`}
                >
                  <h1 className="text-slate-100 font-extrabold text-2xl tracking-tight leading-tight border-b border-slate-900 pb-3 mb-4">{postTitle}</h1>
                  
                  <div
                    className="prose prose-invert prose-cyan max-w-none text-slate-300 text-xs space-y-4"
                    dangerouslySetInnerHTML={{ __html: compileBlocksToHtml(blocks) }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* WordPress bottom metadata details bar */}
          <div className="bg-slate-950 border-t border-slate-900 px-4 py-2 flex justify-between items-center text-[10px] font-mono text-slate-500 z-10 shrink-0">
            <span>Blocks: {blocks.length} | Words: {compileBlocksToHtml(blocks).replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length}</span>
            <span>SEO Score: <b className={seoScoreData.score > 75 ? "text-emerald-400" : seoScoreData.score > 50 ? "text-yellow-400" : "text-red-400"}>{seoScoreData.score}/100</b></span>
          </div>

        </div>

        {/* 4. WORDPRESS RIGHT PANEL SIDEBAR (Togglable) */}
        {isSidebarOpen && (
          <div className="w-80 bg-slate-950 border-l border-slate-800 flex flex-col z-10 animate-in slide-in-from-right duration-200">
            
            {/* Sidebar headers */}
            <div className="grid grid-cols-3 text-center border-b border-slate-800 text-[10px] font-bold bg-slate-900/40">
              <button
                type="button"
                onClick={() => setSidebarTab("block")}
                className={`py-3 ${sidebarTab === "block" ? "border-b-2 border-[#FF5722] text-[#FF5722]" : "text-slate-400 hover:text-slate-200"}`}
              >
                Block Settings
              </button>
              <button
                type="button"
                onClick={() => setSidebarTab("document")}
                className={`py-3 ${sidebarTab === "document" ? "border-b-2 border-[#FF5722] text-[#FF5722]" : "text-slate-400 hover:text-slate-200"}`}
              >
                Document Info
              </button>
              <button
                type="button"
                onClick={() => setSidebarTab("templates")}
                className={`py-3 ${sidebarTab === "templates" ? "border-b-2 border-[#FF5722] text-[#FF5722]" : "text-slate-400 hover:text-slate-200"}`}
              >
                Templates & Keys
              </button>
            </div>

            {/* Sidebar Screen panels */}
            <div className="flex-grow overflow-y-auto p-4 space-y-5 scrollbar-thin">
              
              {/* TAB A: BLOCK CONTEXTUAL PARAMETERS */}
              {sidebarTab === "block" && (
                <div className="space-y-4">
                  {activeBlock ? (
                    <div className="space-y-4">
                      
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-xs">
                        <span className="text-[10px] text-slate-500 font-mono block uppercase">Active Selection Type</span>
                        <h4 className="text-[#FF5722] font-extrabold capitalize mt-1 text-sm">{activeBlock.type} Block</h4>
                        <p className="text-[10px] text-slate-400 mt-1">Configure individual metadata structures perfectly synchronized to responsive layout components.</p>
                      </div>

                      {/* Heading block extra settings */}
                      {activeBlock.type === "heading" && (
                        <div className="space-y-3 border-t border-slate-900 pt-3">
                          <label className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Heading Size Tag</label>
                          <div className="grid grid-cols-6 gap-1 bg-slate-900 p-1 rounded-xl">
                            {[1, 2, 3, 4, 5, 6].map((l) => (
                              <button
                                key={l}
                                type="button"
                                onClick={() => updateBlockAttributes(activeBlock.id, { level: l })}
                                className={`py-1 text-[11px] font-mono font-bold rounded-lg ${activeBlock.attributes.level === l ? "bg-[#FF5722] text-white" : "text-slate-400 hover:text-white"}`}
                              >
                                H{l}
                              </button>
                            ))}
                          </div>

                          <label className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Text Alignment</label>
                          <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl">
                            {["left", "center", "right"].map((align) => (
                              <button
                                key={align}
                                type="button"
                                onClick={() => updateBlockAttributes(activeBlock.id, { align })}
                                className={`py-1.5 text-[10px] capitalize font-semibold rounded-lg ${activeBlock.attributes.align === align ? "bg-cyan-600 text-white" : "text-slate-400 hover:text-white"}`}
                              >
                                {align}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* List block settings */}
                      {activeBlock.type === "list" && (
                        <div className="space-y-3 border-t border-slate-900 pt-3">
                          <label className="text-[10px] text-slate-400 font-mono uppercase font-bold block">List Ordered numbering</label>
                          <div className="grid grid-cols-2 gap-1 bg-slate-900 p-1 rounded-xl">
                            <button
                              type="button"
                              onClick={() => updateBlockAttributes(activeBlock.id, { ordered: false })}
                              className={`py-1 text-[11px] font-bold rounded-lg ${!activeBlock.attributes.ordered ? "bg-cyan-600 text-white" : "text-slate-400"}`}
                            >
                              Unordered •
                            </button>
                            <button
                              type="button"
                              onClick={() => updateBlockAttributes(activeBlock.id, { ordered: true })}
                              className={`py-1 text-[11px] font-bold rounded-lg ${activeBlock.attributes.ordered ? "bg-cyan-600 text-white" : "text-slate-400"}`}
                            >
                              Numbered 1.2
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Image block metadata settings */}
                      {activeBlock.type === "image" && (
                        <div className="space-y-3 border-t border-slate-900 pt-3 text-xs">
                          <div>
                            <label className="text-[10px] text-slate-400 font-mono uppercase font-bold block mb-1">Image Alt Text (SEO)</label>
                            <input
                              type="text"
                              value={activeBlock.attributes.alt || ""}
                              onChange={(e) => updateBlockAttributes(activeBlock.id, { alt: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-[#FF5722]"
                              placeholder="Describe product image alternative tag..."
                            />
                          </div>

                          <div className="flex items-center justify-between py-1 border-t border-slate-900 pt-2">
                            <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">Lazy Load enabled</span>
                            <input
                              type="checkbox"
                              checked={!!activeBlock.attributes.lazyLoad}
                              onChange={(e) => updateBlockAttributes(activeBlock.id, { lazyLoad: e.target.checked })}
                              className="accent-[#FF5722] w-4 h-4 cursor-pointer"
                            />
                          </div>

                          <label className="text-[10px] text-slate-400 font-mono uppercase font-bold block">Image alignment</label>
                          <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl">
                            {["left", "center", "right"].map((align) => (
                              <button
                                key={align}
                                type="button"
                                onClick={() => updateBlockAttributes(activeBlock.id, { align })}
                                className={`py-1 text-[10px] capitalize rounded-lg ${activeBlock.attributes.align === align ? "bg-cyan-600 text-white" : "text-slate-400 hover:text-white"}`}
                              >
                                {align}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="border-t border-slate-900 pt-4 flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => deleteBlock(activeBlock.id)}
                          className="w-full py-2 bg-red-950/20 hover:bg-red-900/30 text-red-400 border border-red-900/30 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                        >
                          <Trash2 className="w-4 h-4" /> Delete Block Node
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleBlockLock(activeBlock.id)}
                          className="w-full py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                        >
                          {activeBlock.isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          {activeBlock.isLocked ? "Unlock Parameters" : "Lock Block Changes"}
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="text-center py-12 space-y-2">
                      <Settings className="w-8 h-8 text-slate-600 mx-auto" />
                      <p className="text-xs text-slate-500">Click any block inside the central visual canvas to launch contextual parameter controls.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB B: POST DOCUMENT TAXONOMY & RANK MATH CHECKLIST */}
              {sidebarTab === "document" && (
                <div className="space-y-5 text-xs text-slate-300">
                  
                  {/* General settings panel */}
                  <div className="space-y-3.5">
                    <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-widest border-b border-slate-900 pb-1">DOCUMENT TAXONOMY</span>
                    
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono uppercase font-bold block mb-1">Visibility Option</label>
                      <select
                        value={postVisibility}
                        onChange={(e: any) => setPostVisibility(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl p-2 focus:outline-none"
                      >
                        <option value="public">Public (Everyone can read)</option>
                        <option value="private">Private (Admin/Editors only)</option>
                        <option value="password">Password Protected</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 font-mono uppercase font-bold block mb-1.5">Excerpt Summary</label>
                      <textarea
                        value={postExcerpt}
                        onChange={(e) => setPostExcerpt(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none"
                        placeholder="Snippet summary copy..."
                      />
                    </div>

                    {/* Gutenberg Categories block manager */}
                    <div className="space-y-2">
                      <label className="text-[10px] text-slate-400 font-mono uppercase font-bold block flex items-center gap-1">
                        <FolderOpen className="w-3.5 h-3.5 text-amber-500" /> Categories / Columns
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {categories.map((cat, idx) => (
                          <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1 font-mono">
                            #{cat}
                            <button onClick={() => setCategories(categories.filter(c => c !== cat))} className="text-slate-500 hover:text-white">✕</button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        <input
                          type="text"
                          value={newCategoryName}
                          onChange={(e) => setNewCategoryName(e.target.value)}
                          placeholder="New category label"
                          className="w-full bg-slate-900 border border-slate-800 text-xs rounded-xl px-2 py-1 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newCategoryName.trim()) {
                              setCategories([...categories, newCategoryName.trim().toLowerCase()]);
                              setNewCategoryName("");
                            }
                          }}
                          className="px-3 py-1 bg-[#FF5722] hover:bg-orange-600 text-white rounded-xl text-[10px] font-bold"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Gutenberg Tags block manager */}
                    <div className="space-y-2">
                      <label className="text-[10px] text-slate-400 font-mono uppercase font-bold block flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-cyan-400" /> Document Index tags
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag, idx) => (
                          <span key={idx} className="bg-[#FF5722]/10 border border-[#FF5722]/20 text-[#FF5722] px-2 py-0.5 rounded-lg text-[10px] flex items-center gap-1 font-mono font-bold">
                            #{tag}
                            <button onClick={() => setTags(tags.filter(t => t !== tag))} className="text-[#FF5722]/60 hover:text-[#FF5722]">✕</button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-1.5 pt-1">
                        <input
                          type="text"
                          value={newTagName}
                          onChange={(e) => setNewTagName(e.target.value)}
                          placeholder="Add hashtag"
                          className="w-full bg-slate-900 border border-slate-800 text-xs rounded-xl px-2 py-1 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newTagName.trim()) {
                              setTags([...tags, newTagName.trim().toLowerCase()]);
                              setNewTagName("");
                            }
                          }}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[10px] font-bold"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* TAB B.2: RANK MATH PRO SEO ANALYSIS CHECKS */}
                  <div className="space-y-3.5 border-t border-slate-900 pt-4">
                    <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-widest border-b border-slate-900 pb-1 flex justify-between">
                      <span>RANK MATH PRO SCORE</span>
                      <span className={seoScoreData.score > 75 ? "text-emerald-400" : "text-yellow-400 font-bold"}>{seoScoreData.score}/100</span>
                    </span>

                    <div>
                      <label className="text-[10px] text-slate-400 font-mono uppercase font-bold block mb-1">Focus Keyword Tracker</label>
                      <input
                        type="text"
                        value={focusKeyword}
                        onChange={(e) => setFocusKeyword(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-[#FF5722]"
                        placeholder="website optimization, speed"
                      />
                    </div>

                    <div className="space-y-2 pt-1 scrollbar-none max-h-[160px] overflow-y-auto">
                      {seoScoreData.checks.map((c, idx) => (
                        <div key={idx} className="flex gap-2 items-start text-[11px] leading-relaxed">
                          {c.passed ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                          )}
                          <div>
                            <span className="font-bold text-slate-100 block">{c.label}</span>
                            <p className="text-[10px] text-slate-400">{c.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {sidebarTab === "templates" && (
                <div className="space-y-5 text-xs text-slate-300 animate-in fade-in duration-150">
                  
                  {/* Reusable templates generator */}
                  <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3 space-y-3">
                    <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-wider font-bold">Reusable Template Builder</span>
                    {selectedBlockId ? (
                      <div className="space-y-2">
                        <p className="text-[10px] text-slate-400">Save the selected active block on the visual canvas as a reusable template to inject anywhere.</p>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            placeholder="Template custom name"
                            className="w-full bg-slate-950 border border-slate-800 text-[11px] rounded-lg px-2 py-1.5 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={handleSaveAsReusable}
                            className="px-2.5 py-1.5 bg-[#FF5722] hover:bg-orange-600 text-white rounded-lg text-[10px] font-bold shrink-0 transition-colors"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-500 leading-relaxed italic">Click any block inside the central visual canvas to enable saving it as a reusable template.</p>
                    )}
                  </div>

                  {/* Reusable templates listing */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-widest font-bold">Reusable Templates Library</span>
                    {reusableBlocks.length === 0 ? (
                      <p className="text-[10px] text-slate-500 italic">No custom templates created yet.</p>
                    ) : (
                      <div className="space-y-1.5">
                        {reusableBlocks.map((tpl) => (
                          <div key={tpl.id} className="bg-slate-900/60 border border-slate-850 rounded-xl p-2.5 flex items-center justify-between gap-2 group/tpl">
                            <div className="overflow-hidden">
                              <span className="font-bold text-slate-100 block truncate text-[11px]">{tpl.name}</span>
                              <span className="text-[9px] text-slate-400 font-mono">Blocks: {tpl.blocks.length}</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleInsertTemplate(tpl)}
                                className="px-2 py-1 bg-cyan-900/60 hover:bg-cyan-800 text-cyan-300 hover:text-white rounded-lg text-[9px] font-bold font-mono transition-colors"
                                title="Insert this template below active selection"
                              >
                                Insert
                              </button>
                              <button
                                type="button"
                                onClick={() => setReusableBlocks(reusableBlocks.filter(t => t.id !== tpl.id))}
                                className="p-1 text-slate-500 hover:text-red-400 rounded-md transition-colors"
                                title="Delete Template"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* WordPress style Keyboard Shortcuts Cheatsheet */}
                  <div className="bg-slate-900/30 border border-slate-850/60 rounded-xl p-3.5 space-y-3">
                    <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-widest font-bold">Gutenberg Shortcuts Cheat Sheet</span>
                    <div className="space-y-2 font-mono text-[10px]">
                      <div className="flex justify-between items-center py-1 border-b border-slate-900">
                        <span className="text-slate-400">Save Draft</span>
                        <kbd className="bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-slate-200">Ctrl + S</kbd>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-900">
                        <span className="text-slate-400">Undo Change</span>
                        <kbd className="bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-slate-200">Ctrl + Z</kbd>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-900">
                        <span className="text-slate-400">Redo Change</span>
                        <kbd className="bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-slate-200">Ctrl + Y</kbd>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-900">
                        <span className="text-slate-400">Duplicate Block</span>
                        <kbd className="bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-slate-200">Ctrl + D</kbd>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-900">
                        <span className="text-slate-400">Delete Block</span>
                        <kbd className="bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-slate-200">Shift + Backspace</kbd>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-slate-400">Deselect Block</span>
                        <kbd className="bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-slate-200">Esc</kbd>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
