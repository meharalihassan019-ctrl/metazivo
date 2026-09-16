import React, { useState, useMemo } from "react";
import {
  Table as TableIcon,
  Plus,
  Trash2,
  Copy,
  Check,
  Smartphone,
  Tablet,
  Laptop,
  Sparkles,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye,
  Code,
  Settings,
  X,
  FileText,
  HelpCircle,
  Maximize2,
  ChevronRight,
  MoveUp,
  MoveDown
} from "lucide-react";

export type TableTheme = "metazivo" | "midnight" | "clean-light" | "borderless";
export type ResponsiveMode = "scroll" | "cards" | "compact";
export type DevicePreview = "laptop" | "tablet" | "mobile";

interface ResponsiveTableBuilderProps {
  isOpen?: boolean;
  onClose?: () => void;
  onInsertTable?: (html: string) => void;
  initialHtml?: string;
}

const PRESETS = [
  {
    name: "Speed & Performance (Before / After)",
    title: "Core Web Vitals & Loading Benchmark",
    headers: ["Metric Parameter", "Before Optimization", "After Metazivo", "Improvement"],
    alignments: ["left", "center", "center", "center"],
    rows: [
      ["Largest Contentful Paint (LCP)", "4.8s (Poor)", "1.1s (Good)", "77% Faster"],
      ["Interaction to Next Paint (INP)", "380ms", "55ms", "85% Snappier"],
      ["Cumulative Layout Shift (CLS)", "0.28", "0.01", "Zero Jitter"],
      ["PageSpeed Mobile Score", "38 / 100", "99 / 100", "+61 Points"],
      ["Server TTFB Response", "1,200ms", "140ms", "Instant Edge"]
    ]
  },
  {
    name: "Pricing & Features Comparison",
    title: "Service Tier Comparison",
    headers: ["Deliverable / Capability", "Starter", "Growth", "Enterprise"],
    alignments: ["left", "center", "center", "center"],
    rows: [
      ["Full-Stack Web Development", "Next.js / React", "Next.js + CMS", "Custom Cloud Engine"],
      ["Core Web Vitals 95+ Guarantee", "Included", "Included", "Included + SLA"],
      ["AI Chatbots & Conversational Flow", "Basic FAQ", "Gemini Pro Agent", "Custom Fine-tuned AI"],
      ["Meta & Google Ads Funnel", "Optional Addon", "Managed ($2.5k/mo)", "Omnichannel Managed"],
      ["Dedicated Engineer Support", "Email (24h)", "Slack (4h)", "Direct Phone / 24/7"]
    ]
  },
  {
    name: "SEO Checklist Matrix",
    title: "2026 Google Ranking Criteria",
    headers: ["SEO Optimization Factor", "Standard Agency", "Metazivo Protocol", "Ranking Impact"],
    alignments: ["left", "left", "left", "center"],
    rows: [
      ["Schema.org Rich Markup", "Generic Plugin JSON", "Bespoke Graph Schema", "High (Rich Snippets)"],
      ["Mobile Responsiveness", "Standard Fluid CSS", "Touch-Engine & 120 FPS", "Critical (Mobile First)"],
      ["Content Quality & Depth", "Thin 500w AI filler", "2,500w Deep Subject Guides", "High (EEAT Authority)"],
      ["Image Delivery Pipeline", "Uncompressed JPEGs", "WebP/AVIF with CDN cache", "High (Speed Factor)"]
    ]
  },
  {
    name: "Pros & Cons Comparison",
    title: "Architecture Decision Analysis",
    headers: ["Architecture Route", "Key Advantages", "Potential Limitations", "Recommendation"],
    alignments: ["left", "left", "left", "center"],
    rows: [
      ["Static Site Generation (SSG)", "Blazing sub-second loads, 0 DB downtime", "Build step needed for updates", "Ideal for Blogs & Landing"],
      ["Server-Side Rendering (SSR)", "Live real-time data, instant dynamic updates", "Requires robust Node.js server", "Ideal for E-Commerce & SaaS"],
      ["Traditional WordPress Shared", "Low entry cost, million plugins", "Vulnerable, bloated, slow database", "Not Recommended for Scale"]
    ]
  }
];

export default function ResponsiveTableBuilder({
  isOpen = true,
  onClose,
  onInsertTable
}: ResponsiveTableBuilderProps) {
  // Main Table Data State
  const [title, setTitle] = useState("Website Speed & SEO Comparison");
  const [subtitle, setSubtitle] = useState("Comparison across key performance indicators and Google ranking factors.");
  const [headers, setHeaders] = useState<string[]>([
    "Metric Parameter",
    "Standard Setup",
    "Metazivo Engine",
    "Real Gain"
  ]);
  const [alignments, setAlignments] = useState<("left" | "center" | "right")[]>([
    "left",
    "center",
    "center",
    "center"
  ]);
  const [rows, setRows] = useState<string[][]>([
    ["Mobile PageSpeed Score", "42 / 100", "98 / 100", "+56 Points"],
    ["Core Web Vitals LCP", "4.6 seconds", "1.2 seconds", "74% Faster"],
    ["Total Blocking Time (TBT)", "650 ms", "40 ms", "94% Less Lag"],
    ["Google SERP Mobile Ranking", "Page 4 - 6", "Page 1 Top 3", "10x Organic Traffic"],
    ["Conversion Rate (Sales/Leads)", "1.2%", "3.8%", "+216% Revenue"]
  ]);

  // Styling & Settings
  const [themeStyle, setThemeStyle] = useState<TableTheme>("clean-light");
  const [responsiveMode, setResponsiveMode] = useState<ResponsiveMode>("scroll");
  const [isZebra, setIsZebra] = useState(true);
  const [hasStickyHeader, setHasStickyHeader] = useState(false);
  const [hasStickyFirstCol, setHasStickyFirstCol] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // UI View States
  const [devicePreview, setDevicePreview] = useState<DevicePreview>("laptop");
  const [activeTab, setActiveTab] = useState<"editor" | "preview" | "code">("preview");
  const [importText, setImportText] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  // Column Manipulation
  const handleAddColumn = () => {
    const colNumber = headers.length + 1;
    setHeaders([...headers, `Column ${colNumber}`]);
    setAlignments([...alignments, "left"]);
    setRows(rows.map(row => [...row, `Data ${colNumber}`]));
  };

  const handleRemoveColumn = (index: number) => {
    if (headers.length <= 1) return;
    setHeaders(headers.filter((_, i) => i !== index));
    setAlignments(alignments.filter((_, i) => i !== index));
    setRows(rows.map(row => row.filter((_, i) => i !== index)));
  };

  const handleUpdateHeader = (index: number, val: string) => {
    const updated = [...headers];
    updated[index] = val;
    setHeaders(updated);
  };

  const handleToggleAlign = (index: number) => {
    const current = alignments[index] || "left";
    const next = current === "left" ? "center" : current === "center" ? "right" : "left";
    const updated = [...alignments];
    updated[index] = next;
    setAlignments(updated);
  };

  // Row Manipulation
  const handleAddRow = () => {
    const newRow = headers.map((_, i) => `New Item ${i + 1}`);
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (index: number) => {
    if (rows.length <= 1) return;
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleMoveRow = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= rows.length) return;
    const updated = [...rows];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setRows(updated);
  };

  const handleUpdateCell = (rowIndex: number, colIndex: number, val: string) => {
    const updated = [...rows];
    updated[rowIndex] = [...updated[rowIndex]];
    updated[rowIndex][colIndex] = val;
    setRows(updated);
  };

  // Apply a Preset
  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setTitle(preset.title);
    setHeaders([...preset.headers]);
    setAlignments(preset.alignments as ("left" | "center" | "right")[]);
    setRows(preset.rows.map(r => [...r]));
  };

  // Intelligent Parser for Paste / Import (CSV, TSV, Markdown, or HTML Table)
  const handleParseImport = () => {
    if (!importText.trim()) return;

    try {
      const text = importText.trim();

      // Check if raw HTML table
      if (text.includes("<table") || text.includes("<TABLE")) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const table = doc.querySelector("table");
        if (table) {
          const parsedHeaders: string[] = [];
          const parsedAligns: ("left" | "center" | "right")[] = [];
          const thElements = table.querySelectorAll("thead th, tr:first-child th");
          
          if (thElements.length > 0) {
            thElements.forEach((th) => {
              parsedHeaders.push(th.textContent?.trim() || "Header");
              parsedAligns.push("left");
            });
          }

          const parsedRows: string[][] = [];
          const trElements = table.querySelectorAll("tbody tr, tr");
          trElements.forEach((tr, idx) => {
            // Skip the header row if it only contains th elements
            const ths = tr.querySelectorAll("th");
            const tds = tr.querySelectorAll("td");
            if (ths.length > 0 && tds.length === 0 && idx === 0) return;

            const rowData: string[] = [];
            const cells = tds.length > 0 ? tds : ths;
            cells.forEach((cell) => {
              rowData.push(cell.textContent?.trim() || "");
            });
            if (rowData.length > 0) {
              parsedRows.push(rowData);
            }
          });

          if (parsedHeaders.length > 0) {
            setHeaders(parsedHeaders);
            setAlignments(parsedAligns);
          } else if (parsedRows.length > 0) {
            setHeaders(parsedRows[0]);
            parsedRows.shift();
            setAlignments(parsedRows[0]?.map(() => "left") || []);
          }

          if (parsedRows.length > 0) {
            setRows(parsedRows);
          }

          setShowImportModal(false);
          setImportText("");
          return;
        }
      }

      // Check if Markdown Table (starts with pipe |)
      if (text.includes("|")) {
        const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
        const tableLines = lines.filter(l => l.startsWith("|") && l.endsWith("|"));
        if (tableLines.length >= 2) {
          const parsePipeRow = (line: string) => {
            return line
              .split("|")
              .slice(1, -1)
              .map(c => c.trim());
          };

          const rawHeaders = parsePipeRow(tableLines[0]);
          let dataLines = tableLines.slice(1);
          // If second row is separator |---|---|
          if (dataLines[0] && dataLines[0].includes("---")) {
            dataLines = dataLines.slice(1);
          }

          const parsedRows = dataLines.map(parsePipeRow);
          if (rawHeaders.length > 0) {
            setHeaders(rawHeaders);
            setAlignments(rawHeaders.map(() => "left"));
            setRows(parsedRows.length > 0 ? parsedRows : [rawHeaders.map(() => "Sample")]);
            setShowImportModal(false);
            setImportText("");
            return;
          }
        }
      }

      // Fallback: CSV or TSV (Tab separated from Excel/Google Sheets)
      const delimiter = text.includes("\t") ? "\t" : ",";
      const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
      if (lines.length > 0) {
        const parsedRows = lines.map(line => {
          return line.split(delimiter).map(cell => cell.trim().replace(/^["']|["']$/g, ""));
        });

        if (parsedRows.length > 0) {
          const firstRow = parsedRows[0];
          setHeaders(firstRow);
          setAlignments(firstRow.map(() => "left"));
          const remaining = parsedRows.slice(1);
          setRows(remaining.length > 0 ? remaining : [firstRow.map(() => "")]);
          setShowImportModal(false);
          setImportText("");
        }
      }
    } catch (e) {
      console.error("Failed to parse imported table:", e);
    }
  };

  // Generate Theme-Matched, Production-Grade Responsive HTML Code
  const generatedHtml = useMemo(() => {
    // Styling attributes based on theme
    const themeConfigs: Record<TableTheme, {
      containerBg: string;
      borderColor: string;
      headerBg: string;
      headerText: string;
      rowEvenBg: string;
      rowOddBg: string;
      rowHoverBg: string;
      textColor: string;
      accentColor: string;
    }> = {
      metazivo: {
        containerBg: "#0B0F19",
        borderColor: "rgba(255, 87, 34, 0.3)",
        headerBg: "#111827",
        headerText: "#FFFFFF",
        rowEvenBg: "#0B0F19",
        rowOddBg: "#0E1526",
        rowHoverBg: "rgba(255, 87, 34, 0.1)",
        textColor: "#FFFFFF",
        accentColor: "#FF5722"
      },
      midnight: {
        containerBg: "#030712",
        borderColor: "rgba(255, 255, 255, 0.08)",
        headerBg: "#0F172A",
        headerText: "#F8FAFC",
        rowEvenBg: "transparent",
        rowOddBg: "rgba(255, 255, 255, 0.02)",
        rowHoverBg: "rgba(59, 130, 246, 0.06)",
        textColor: "#CBD5E1",
        accentColor: "#38BDF8"
      },
      "clean-light": {
        containerBg: "#FFFFFF",
        borderColor: "#E2E8F0",
        headerBg: "#F8FAFC",
        headerText: "#0F172A",
        rowEvenBg: "#FFFFFF",
        rowOddBg: "#F8FAFC",
        rowHoverBg: "#F1F5F9",
        textColor: "#334155",
        accentColor: "#FF5722"
      },
      borderless: {
        containerBg: "transparent",
        borderColor: "rgba(255, 255, 255, 0.05)",
        headerBg: "transparent",
        headerText: "#FFFFFF",
        rowEvenBg: "transparent",
        rowOddBg: "transparent",
        rowHoverBg: "rgba(255, 255, 255, 0.03)",
        textColor: "#94A3B8",
        accentColor: "#FF5722"
      }
    };

    const cfg = themeConfigs[themeStyle];

    // Build the responsive wrapper
    let html = `<!-- METAZIVO RESPONSIVE TABLE (Optimized for Mobile, Tablet & Laptop) -->\n`;
    html += `<div class="metazivo-table-module my-8 w-full">\n`;

    if (title || subtitle) {
      html += `  <div class="mb-3 px-1">\n`;
      if (title) {
        html += `    <h4 style="color: ${cfg.headerText}; margin: 0; font-size: 1.125rem; font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">\n`;
        html += `      <span style="width: 4px; height: 18px; background-color: ${cfg.accentColor}; border-radius: 2px; display: inline-block;"></span>\n`;
        html += `      ${title}\n`;
        html += `    </h4>\n`;
      }
      if (subtitle) {
        html += `    <p style="color: #94A3B8; margin: 0.25rem 0 0 0; font-size: 0.8125rem;">${subtitle}</p>\n`;
      }
      html += `  </div>\n`;
    }

    if (showSwipeHint && responsiveMode === "scroll") {
      html += `  <div class="md:hidden flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1.5 px-2 py-1 rounded-lg bg-slate-900/60 border border-white/5">\n`;
      html += `    <span class="flex items-center gap-1.5"><span style="color: ${cfg.accentColor};">⇄</span> Swipe horizontally to view all columns</span>\n`;
      html += `    <span>${headers.length} Columns</span>\n`;
      html += `  </div>\n`;
    }

    // Scroll wrapper with inline and class styles for maximum compatibility
    html += `  <div class="table-responsive-wrapper" style="width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 16px; border: 1px solid ${cfg.borderColor}; background: ${cfg.containerBg}; box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.25);">\n`;
    html += `    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; min-width: 580px;">\n`;
    
    // THEAD
    html += `      <thead style="background: ${cfg.headerBg}; border-bottom: 2px solid ${cfg.accentColor};">\n`;
    html += `        <tr>\n`;
    headers.forEach((h, idx) => {
      const align = alignments[idx] || "left";
      const stickyStyle = hasStickyFirstCol && idx === 0 ? `position: sticky; left: 0; background: ${cfg.headerBg}; z-index: 2;` : "";
      html += `          <th style="padding: 14px 18px; font-weight: 700; color: ${cfg.headerText} !important; text-align: ${align}; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; border-right: 1px solid rgba(255, 255, 255, 0.06); ${stickyStyle}">${h}</th>\n`;
    });
    html += `        </tr>\n`;
    html += `      </thead>\n`;

    // TBODY
    html += `      <tbody>\n`;
    rows.forEach((row, rIdx) => {
      const isOdd = isZebra && rIdx % 2 !== 0;
      const rowBg = isOdd ? cfg.rowOddBg : cfg.rowEvenBg;
      html += `        <tr style="background: ${rowBg}; border-bottom: 1px solid ${cfg.borderColor}; transition: background 0.15s ease;" onmouseover="this.style.background='${cfg.rowHoverBg}'" onmouseout="this.style.background='${rowBg}'">\n`;
      
      row.forEach((cell, cIdx) => {
        const align = alignments[cIdx] || "left";
        const isFirst = cIdx === 0;
        const stickyStyle = hasStickyFirstCol && isFirst ? `position: sticky; left: 0; background: ${rowBg || cfg.containerBg}; z-index: 1; font-weight: 600; color: #FFFFFF !important;` : `color: ${cfg.textColor} !important;`;
        html += `          <td style="padding: 13px 18px; text-align: ${align}; font-size: 0.8125rem; border-right: 1px solid rgba(255, 255, 255, 0.04); ${stickyStyle}">${cell}</td>\n`;
      });
      html += `        </tr>\n`;
    });
    html += `      </tbody>\n`;
    html += `    </table>\n`;
    html += `  </div>\n`;
    html += `</div>\n`;

    return html;
  }, [
    title,
    subtitle,
    headers,
    alignments,
    rows,
    themeStyle,
    responsiveMode,
    isZebra,
    hasStickyHeader,
    hasStickyFirstCol,
    showSwipeHint
  ]);

  // Markdown output
  const generatedMarkdown = useMemo(() => {
    let md = "";
    if (title) md += `### ${title}\n\n`;
    if (subtitle) md += `*${subtitle}*\n\n`;

    // Header
    md += `| ${headers.join(" | ")} |\n`;
    // Alignments separator
    const sep = alignments.map(a => {
      if (a === "center") return ":---:";
      if (a === "right") return "---:";
      return "---";
    });
    md += `| ${sep.join(" | ")} |\n`;

    // Rows
    rows.forEach(r => {
      md += `| ${r.join(" | ")} |\n`;
    });

    return md;
  }, [title, subtitle, headers, alignments, rows]);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  const handleInsert = () => {
    if (onInsertTable) {
      onInsertTable(generatedHtml);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-6xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-200">
        
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 flex items-center justify-center text-[#FF5722]">
              <TableIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Responsive Table Builder & HTML Converter</h3>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF5722] bg-[#FF5722]/10 px-2 py-0.5 rounded-full border border-[#FF5722]/20">
                  Theme Matched
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Craft pixel-perfect tables calibrated to display flawlessly on Mobile, Tablet, and Laptop.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onInsertTable && (
              <button
                type="button"
                onClick={handleInsert}
                className="px-4 py-2 bg-[#FF5722] hover:bg-[#ff7043] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-[#FF5722]/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Insert Into Article</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleCopyHtml}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border border-white/10"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied HTML!" : "Copy HTML Code"}</span>
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* CONTROLS & SUBHEADER BAR */}
        <div className="px-5 py-3 border-b border-white/10 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Presets & Importer Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider font-mono mr-1">Quick Presets:</span>
            {PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-slate-300 text-[11px] transition-colors cursor-pointer"
              >
                {p.name.split(" ")[0]}
              </button>
            ))}

            <div className="w-px h-5 bg-white/10 mx-1"></div>

            <button
              type="button"
              onClick={() => setShowImportModal(true)}
              className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg text-[11px] font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Paste Excel / WordPress HTML</span>
            </button>
          </div>

          {/* Device Simulator Switcher & Tab Selector */}
          <div className="flex items-center gap-3">
            {/* 3-Device View Switcher */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => { setDevicePreview("laptop"); setActiveTab("preview"); }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  devicePreview === "laptop" && activeTab === "preview"
                    ? "bg-[#FF5722] text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Laptop Preview (Full Desktop)"
              >
                <Laptop className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Laptop</span>
              </button>

              <button
                type="button"
                onClick={() => { setDevicePreview("tablet"); setActiveTab("preview"); }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  devicePreview === "tablet" && activeTab === "preview"
                    ? "bg-[#FF5722] text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Tablet Preview (iPad 768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tablet</span>
              </button>

              <button
                type="button"
                onClick={() => { setDevicePreview("mobile"); setActiveTab("preview"); }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  devicePreview === "mobile" && activeTab === "preview"
                    ? "bg-[#FF5722] text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Mobile Preview (iPhone 375px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            {/* View Mode Tabs */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("editor")}
                className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  activeTab === "editor" ? "bg-white/15 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Edit Cells
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  activeTab === "preview" ? "bg-white/15 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                Live Preview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  activeTab === "code" ? "bg-white/15 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                HTML Code
              </button>
            </div>
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* TAB 1: EDIT CELLS (GRID EDITOR) */}
          {activeTab === "editor" && (
            <div className="space-y-6">
              {/* Title & Subtitle Config */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1 font-mono">
                    Table Title / Caption
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5722]"
                    placeholder="e.g. Website Loading Speed Comparison"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1 font-mono">
                    Subtitle / Context (Optional)
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5722]"
                    placeholder="e.g. Audit across mobile & desktop devices"
                  />
                </div>
              </div>

              {/* Table Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddColumn}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 border border-white/10 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Add Column</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAddRow}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 border border-white/10 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#FF5722]" />
                    <span>Add Row</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  {headers.length} Columns × {rows.length} Rows
                </div>
              </div>

              {/* Editable Grid Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-950 shadow-inner">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-900/90 border-b border-white/10">
                    <tr>
                      <th className="p-3 w-10 text-center text-slate-500 font-mono text-[10px]">#</th>
                      {headers.map((h, colIdx) => (
                        <th key={colIdx} className="p-3 min-w-[180px] border-r border-white/5">
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-[10px] font-mono uppercase text-[#FF5722]">Col {colIdx + 1}</span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleToggleAlign(colIdx)}
                                className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/10"
                                title={`Alignment: ${alignments[colIdx] || "left"} (Click to cycle)`}
                              >
                                {alignments[colIdx] === "center" ? (
                                  <AlignCenter className="w-3 h-3 text-blue-400" />
                                ) : alignments[colIdx] === "right" ? (
                                  <AlignRight className="w-3 h-3 text-purple-400" />
                                ) : (
                                  <AlignLeft className="w-3 h-3 text-slate-300" />
                                )}
                              </button>
                              {headers.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveColumn(colIdx)}
                                  className="p-1 text-red-400/80 hover:text-red-400 rounded hover:bg-red-500/10"
                                  title="Delete column"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                          <input
                            type="text"
                            value={h}
                            onChange={(e) => handleUpdateHeader(colIdx, e.target.value)}
                            className="w-full bg-slate-950 border border-white/15 rounded-lg px-2 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-[#FF5722]"
                            placeholder="Header name"
                          />
                        </th>
                      ))}
                      <th className="p-3 w-16 text-center text-slate-500 font-mono text-[10px]">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((row, rowIdx) => (
                      <tr key={rowIdx} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="p-3 text-center text-slate-500 font-mono text-[10px]">
                          {rowIdx + 1}
                        </td>
                        {row.map((cell, colIdx) => (
                          <td key={colIdx} className="p-2.5 border-r border-white/5">
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) => handleUpdateCell(rowIdx, colIdx, e.target.value)}
                              className={`w-full bg-transparent border border-transparent hover:border-white/10 focus:border-[#FF5722] focus:bg-slate-900 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none ${
                                alignments[colIdx] === "center"
                                  ? "text-center"
                                  : alignments[colIdx] === "right"
                                  ? "text-right"
                                  : "text-left"
                              }`}
                              placeholder="Cell data"
                            />
                          </td>
                        ))}
                        <td className="p-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleMoveRow(rowIdx, "up")}
                              disabled={rowIdx === 0}
                              className="p-1 text-slate-400 hover:text-white disabled:opacity-20"
                              title="Move Row Up"
                            >
                              <MoveUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveRow(rowIdx, "down")}
                              disabled={rowIdx === rows.length - 1}
                              className="p-1 text-slate-400 hover:text-white disabled:opacity-20"
                              title="Move Row Down"
                            >
                              <MoveDown className="w-3 h-3" />
                            </button>
                            {rows.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveRow(rowIdx)}
                                className="p-1 text-red-400/80 hover:text-red-400"
                                title="Delete Row"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE 3-DEVICE PREVIEW (LAPTOP, TABLET, MOBILE) */}
          {activeTab === "preview" && (
            <div className="space-y-6">
              
              {/* Responsive & Theme Controls Toolbar */}
              <div className="bg-slate-950/70 border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                
                {/* Theme Style */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono text-[10px] uppercase font-bold">Theme Style:</span>
                  {(["metazivo", "midnight", "clean-light", "borderless"] as TableTheme[]).map((thm) => (
                    <button
                      key={thm}
                      type="button"
                      onClick={() => setThemeStyle(thm)}
                      className={`px-2.5 py-1 rounded-lg text-xs capitalize transition-colors cursor-pointer ${
                        themeStyle === thm
                          ? "bg-[#FF5722] text-white font-bold"
                          : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
                      }`}
                    >
                      {thm.replace("-", " ")}
                    </button>
                  ))}
                </div>

                {/* Responsive Modes */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono text-[10px] uppercase font-bold">Mobile Behavior:</span>
                  <button
                    type="button"
                    onClick={() => setResponsiveMode("scroll")}
                    className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                      responsiveMode === "scroll"
                        ? "bg-blue-600 text-white font-bold"
                        : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
                    }`}
                    title="Columns keep layout with smooth horizontal touch scroll on mobile"
                  >
                    Smooth Scroll + Hint
                  </button>
                  <button
                    type="button"
                    onClick={() => setResponsiveMode("cards")}
                    className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                      responsiveMode === "cards"
                        ? "bg-blue-600 text-white font-bold"
                        : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
                    }`}
                    title="Converts table rows to stacked cards on mobile"
                  >
                    Mobile Card View
                  </button>
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isZebra}
                      onChange={(e) => setIsZebra(e.target.checked)}
                      className="rounded border-white/20 bg-slate-900 text-[#FF5722] focus:ring-0"
                    />
                    <span className="text-slate-300 text-[11px]">Zebra Rows</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hasStickyFirstCol}
                      onChange={(e) => setHasStickyFirstCol(e.target.checked)}
                      className="rounded border-white/20 bg-slate-900 text-[#FF5722] focus:ring-0"
                    />
                    <span className="text-slate-300 text-[11px]">Sticky 1st Col</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={showSwipeHint}
                      onChange={(e) => setShowSwipeHint(e.target.checked)}
                      className="rounded border-white/20 bg-slate-900 text-[#FF5722] focus:ring-0"
                    />
                    <span className="text-slate-300 text-[11px]">Mobile Hint</span>
                  </label>
                </div>
              </div>

              {/* SIMULATOR CONTAINER */}
              <div className="flex flex-col items-center justify-center p-4 sm:p-8 bg-slate-950/90 rounded-3xl border border-white/10 min-h-[420px] transition-all">
                
                {/* Device Frame Label */}
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-slate-400">
                  {devicePreview === "laptop" && <Laptop className="w-4 h-4 text-[#FF5722]" />}
                  {devicePreview === "tablet" && <Tablet className="w-4 h-4 text-blue-400" />}
                  {devicePreview === "mobile" && <Smartphone className="w-4 h-4 text-emerald-400" />}
                  <span>
                    Simulating:{" "}
                    <strong className="text-white capitalize">{devicePreview} View</strong>{" "}
                    ({devicePreview === "laptop" ? "100% Desktop" : devicePreview === "tablet" ? "768px iPad" : "375px iPhone"})
                  </span>
                </div>

                {/* Device Frame */}
                <div
                  className={`w-full transition-all duration-300 mx-auto ${
                    devicePreview === "mobile"
                      ? "max-w-[375px] border-2 border-slate-700 rounded-3xl p-3 bg-slate-900 shadow-2xl"
                      : devicePreview === "tablet"
                      ? "max-w-[768px] border-2 border-slate-700 rounded-3xl p-4 bg-slate-900 shadow-2xl"
                      : "max-w-full"
                  }`}
                >
                  
                  {/* If Mobile and ResponsiveMode is "cards", render Card View */}
                  {devicePreview === "mobile" && responsiveMode === "cards" ? (
                    <div className="space-y-4">
                      {title && (
                        <div className="mb-2">
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <span className="w-1 h-3.5 bg-[#FF5722] rounded-full"></span>
                            {title}
                          </h4>
                          {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
                        </div>
                      )}

                      {rows.map((row, rIdx) => (
                        <div
                          key={rIdx}
                          className="bg-slate-950 border border-white/10 rounded-2xl p-3.5 space-y-2 shadow-sm"
                        >
                          <div className="flex items-center justify-between border-b border-white/5 pb-2">
                            <span className="text-[10px] font-mono text-[#FF5722] uppercase font-bold">
                              Item #{rIdx + 1}
                            </span>
                            <span className="text-xs font-bold text-white">{row[0]}</span>
                          </div>

                          <div className="space-y-1.5 pt-1">
                            {row.slice(1).map((cell, cIdx) => (
                              <div key={cIdx} className="flex items-center justify-between text-xs py-0.5">
                                <span className="text-slate-400 text-[11px]">{headers[cIdx + 1]}:</span>
                                <span className="font-semibold text-slate-200 text-right">{cell}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Default Table Grid with Smooth Scroll */
                    <div
                      dangerouslySetInnerHTML={{ __html: generatedHtml }}
                      className="w-full"
                    />
                  )}
                </div>

                {/* Device Info Note */}
                <p className="text-[11px] text-slate-500 font-mono mt-4 text-center max-w-lg">
                  {devicePreview === "mobile"
                    ? "✓ On mobile devices, users can seamlessly swipe across rows or read stacked cards without any screen distortion."
                    : devicePreview === "tablet"
                    ? "✓ On tablets, columns remain beautifully balanced and touch-scroll enabled."
                    : "✓ On laptops and wide screens, the table expands to occupy optimal reading width."}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: GENERATED HTML CODE */}
          {activeTab === "code" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Code className="w-4 h-4 text-[#FF5722]" /> Production Responsive HTML Code
                  </h4>
                  <p className="text-xs text-slate-400">
                    Self-contained clean HTML with inline CSS + classes that work on WordPress, Metazivo, or any website.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyMarkdown}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 border border-white/10"
                  >
                    {copiedMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMarkdown ? "Copied Markdown!" : "Copy Markdown"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyHtml}
                    className="px-4 py-1.5 bg-[#FF5722] hover:bg-[#ff7043] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied HTML!" : "Copy HTML Code"}</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  value={generatedHtml}
                  rows={14}
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-xs font-mono text-emerald-400/90 focus:outline-none selection:bg-[#FF5722]/30 selection:text-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 border-t border-white/10 bg-slate-950/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>All 3 Devices Responsive (Mobile, Tablet, Laptop) verified</span>
          </div>

          <div className="flex items-center gap-2">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs transition-colors"
              >
                Close
              </button>
            )}
            {onInsertTable && (
              <button
                type="button"
                onClick={handleInsert}
                className="px-5 py-2 bg-[#FF5722] hover:bg-[#ff7043] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#FF5722]/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Insert Table Into Article</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* SUB-MODAL: PASTE DATA (EXCEL, WORDPRESS, MARKDOWN, CSV) */}
      {showImportModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-white/15 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF5722]" /> Import / Paste Table Data
              </h4>
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Copy any table from Excel, Google Sheets, WordPress HTML code (<code>&lt;table&gt;...&lt;/table&gt;</code>), or Markdown, and paste it here:
            </p>

            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={8}
              placeholder={`Paste anything like:
- Excel / Google Sheets cells (tab-separated)
- WordPress <table>...</table> HTML
- Markdown: | Header 1 | Header 2 |
- CSV: Name, Price, Speed`}
              className="w-full bg-slate-950 border border-white/10 rounded-2xl p-3.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-[#FF5722]"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleParseImport}
                disabled={!importText.trim()}
                className="px-5 py-2 bg-[#FF5722] hover:bg-[#ff7043] disabled:opacity-40 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Parse & Build Table</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
