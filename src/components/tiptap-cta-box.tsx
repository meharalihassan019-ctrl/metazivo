import React from "react";
import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer, NodeViewProps } from "@tiptap/react";
import { Zap, Trash2, Edit3, ArrowRight, ExternalLink } from "lucide-react";

export type CtaTheme =
  | "metazivo-orange"
  | "pro-indigo"
  | "emerald-growth"
  | "amber-warning"
  | "clean-bordered";

export interface CtaBoxAttributes {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  footerNote: string;
  theme: CtaTheme;
  layout: "horizontal" | "vertical";
}

// Global hook to allow editing a CTA box from within Gutenberg visual node
let globalOnEditCta: ((attrs: CtaBoxAttributes, updateAttrs: (attrs: Partial<CtaBoxAttributes>) => void) => void) | null = null;

export function setGlobalOnEditCta(fn: typeof globalOnEditCta) {
  globalOnEditCta = fn;
}

/**
 * Gutenberg Visual Block Component for TipTap
 * Renders the CTA Box with rich WordPress Gutenberg controls (Theme picker, Edit, Delete)
 */
export const CtaBoxComponent: React.FC<NodeViewProps> = ({ node, updateAttributes, deleteNode, selected }) => {
  const attrs = node.attrs as CtaBoxAttributes;
  const {
    badge = "⚡ 100% Free SEO Diagnostic",
    title = "Audit Your Website Live",
    description = "Run MetaZivo's instant tools to detect critical errors and boost organic search visibility.",
    buttonText = "Launch Scanner →",
    buttonUrl = "/tools/broken-link-checker",
    footerNote = "✓ Real Googlebot Simulation  ✓ Instant Status Codes  ✓ Direct CSV Export",
    theme = "metazivo-orange",
    layout = "horizontal"
  } = attrs;

  // Color schemes for live preview
  let containerBg = "#FFF7ED";
  let borderColor = "#FF5722";
  let badgeBg = "#FFEDD5";
  let badgeText = "#C2410C";
  let titleColor = "#1E293B";
  let descColor = "#475569";
  let btnBg = "linear-gradient(135deg, #FF5722 0%, #E64A19 100%)";
  let btnText = "#FFFFFF";
  let btnShadow = "0 4px 14px rgba(255, 87, 34, 0.35)";
  let footerColor = "#94A3B8";

  if (theme === "pro-indigo") {
    containerBg = "#F5F7FF";
    borderColor = "#6366F1";
    badgeBg = "#EEF2FF";
    badgeText = "#4338CA";
    titleColor = "#0F172A";
    descColor = "#334155";
    btnBg = "linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)";
    btnText = "#FFFFFF";
    btnShadow = "0 4px 14px rgba(79, 70, 229, 0.35)";
    footerColor = "#64748B";
  } else if (theme === "emerald-growth") {
    containerBg = "#F0FDF4";
    borderColor = "#10B981";
    badgeBg = "#DCFCE7";
    badgeText = "#065F46";
    titleColor = "#064E3B";
    descColor = "#166534";
    btnBg = "linear-gradient(135deg, #059669 0%, #047857 100%)";
    btnText = "#FFFFFF";
    btnShadow = "0 4px 14px rgba(5, 150, 105, 0.35)";
    footerColor = "#047857";
  } else if (theme === "amber-warning") {
    containerBg = "#FFFBEB";
    borderColor = "#F59E0B";
    badgeBg = "#FEF3C7";
    badgeText = "#92400E";
    titleColor = "#78350F";
    descColor = "#92400E";
    btnBg = "linear-gradient(135deg, #D97706 0%, #B45309 100%)";
    btnText = "#FFFFFF";
    btnShadow = "0 4px 14px rgba(217, 119, 6, 0.35)";
    footerColor = "#B45309";
  } else if (theme === "clean-bordered") {
    containerBg = "#FFFFFF";
    borderColor = "#E2E8F0";
    badgeBg = "#F1F5F9";
    badgeText = "#334155";
    titleColor = "#0F172A";
    descColor = "#64748B";
    btnBg = "#0F172A";
    btnText = "#FFFFFF";
    btnShadow = "0 4px 14px rgba(15, 23, 42, 0.15)";
    footerColor = "#94A3B8";
  }

  const isHorizontal = layout === "horizontal";

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (globalOnEditCta) {
      globalOnEditCta(attrs, (newAttrs) => updateAttributes(newAttrs));
    }
  };

  const handleThemeChange = (newTheme: CtaTheme, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateAttributes({ theme: newTheme });
  };

  return (
    <NodeViewWrapper
      className={`gutenberg-cta-block-node my-6 not-prose transition-all select-none ${
        selected ? "ring-2 ring-[#FF5722] rounded-3xl" : ""
      }`}
      data-type="cta-box"
    >
      {/* WordPress Gutenberg Block Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-slate-900/90 border border-slate-700/80 rounded-t-2xl text-xs text-slate-300 font-sans shadow-md">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-[#FF5722]/20 text-[#FF5722] font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> Gutenberg Block: CTA Callout
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            ({theme})
          </span>
        </div>

        {/* Quick Theme Switchers & Actions */}
        <div className="flex items-center gap-1.5 ml-auto">
          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px]">
            <button
              type="button"
              onClick={(e) => handleThemeChange("metazivo-orange", e)}
              className={`px-1.5 py-0.5 rounded font-medium transition-colors ${
                theme === "metazivo-orange" ? "bg-[#FF5722] text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Flame Coral"
            >
              Orange
            </button>
            <button
              type="button"
              onClick={(e) => handleThemeChange("pro-indigo", e)}
              className={`px-1.5 py-0.5 rounded font-medium transition-colors ${
                theme === "pro-indigo" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Pro Indigo"
            >
              Indigo
            </button>
            <button
              type="button"
              onClick={(e) => handleThemeChange("emerald-growth", e)}
              className={`px-1.5 py-0.5 rounded font-medium transition-colors ${
                theme === "emerald-growth" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Emerald"
            >
              Emerald
            </button>
            <button
              type="button"
              onClick={(e) => handleThemeChange("amber-warning", e)}
              className={`px-1.5 py-0.5 rounded font-medium transition-colors ${
                theme === "amber-warning" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Amber"
            >
              Amber
            </button>
            <button
              type="button"
              onClick={(e) => handleThemeChange("clean-bordered", e)}
              className={`px-1.5 py-0.5 rounded font-medium transition-colors ${
                theme === "clean-bordered" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Clean White"
            >
              Clean
            </button>
          </div>

          <button
            type="button"
            onClick={handleEditClick}
            className="px-2 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors text-[11px]"
            title="Edit CTA text, title, and link"
          >
            <Edit3 className="w-3 h-3" /> Edit
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              deleteNode();
            }}
            className="p-1 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 cursor-pointer transition-colors"
            title="Delete CTA Block"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Rendered CTA Card - 100% visually styled like WordPress front-end */}
      <aside
        className="metazivo-cta-box not-prose p-6 md:p-7 rounded-b-2xl border transition-all shadow-xl font-sans"
        style={{
          background: containerBg,
          borderColor: borderColor,
          borderWidth: "1.5px",
          borderStyle: "solid",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
          fontFamily: "system-ui, -apple-system, sans-serif"
        }}
      >
        <div className={`flex flex-col ${isHorizontal ? "md:flex-row md:items-center md:justify-between" : ""} gap-5`}>
          <div className="space-y-2.5 max-w-xl">
            {badge && (
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm"
                style={{ background: badgeBg, color: badgeText }}
              >
                {badge}
              </div>
            )}
            <h3
              className="text-lg md:text-xl font-extrabold tracking-tight m-0"
              style={{ color: titleColor, lineHeight: 1.3 }}
            >
              {title}
            </h3>
            <p className="text-sm leading-relaxed m-0" style={{ color: descColor }}>
              {description}
            </p>
            {footerNote && (
              <p className="text-xs font-medium m-0 pt-1" style={{ color: footerColor }}>
                {footerNote}
              </p>
            )}
          </div>

          <div className={`shrink-0 ${isHorizontal ? "md:self-center" : "pt-2"}`}>
            <a
              href={buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.preventDefault()}
              className="metazivo-cta-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-transform hover:scale-[1.02] active:scale-[0.98] text-center"
              style={{
                background: btnBg,
                color: btnText,
                boxShadow: btnShadow,
                textDecoration: "none",
                borderRadius: "0.75rem",
                display: "inline-block"
              }}
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 ml-1 inline-block" />
            </a>
            <div className="text-[10px] text-slate-500 font-mono mt-1 text-center">
              Destination: {buttonUrl}
            </div>
          </div>
        </div>
      </aside>
    </NodeViewWrapper>
  );
};

/**
 * TipTap Node Extension for WordPress-style Gutenberg CTA Callout Box
 */
export const CtaBoxNode = Node.create({
  name: "ctaBox",
  group: "block",
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      badge: {
        default: "⚡ 100% Free SEO Diagnostic",
        parseHTML: (element) => element.getAttribute("data-badge") || element.querySelector(".cta-badge")?.textContent?.trim() || ""
      },
      title: {
        default: "Audit Your Website Live",
        parseHTML: (element) => element.getAttribute("data-title") || element.querySelector("h3")?.textContent?.trim() || "Website SEO Diagnostic"
      },
      description: {
        default: "Run MetaZivo's instant tools to detect critical errors and boost organic search visibility.",
        parseHTML: (element) => element.getAttribute("data-description") || element.querySelector(".cta-desc, p")?.textContent?.trim() || ""
      },
      buttonText: {
        default: "Launch Scanner →",
        parseHTML: (element) => element.getAttribute("data-button-text") || element.querySelector(".metazivo-cta-btn, a")?.textContent?.trim() || "Launch Scanner →"
      },
      buttonUrl: {
        default: "/tools/broken-link-checker",
        parseHTML: (element) => element.getAttribute("data-button-url") || element.querySelector(".metazivo-cta-btn, a")?.getAttribute("href") || "/tools/broken-link-checker"
      },
      footerNote: {
        default: "✓ Real Googlebot Simulation  ✓ Instant Status Codes  ✓ Direct CSV Export",
        parseHTML: (element) => element.getAttribute("data-footer-note") || element.querySelector(".cta-footer")?.textContent?.trim() || ""
      },
      theme: {
        default: "metazivo-orange",
        parseHTML: (element) => (element.getAttribute("data-theme") as CtaTheme) || "metazivo-orange"
      },
      layout: {
        default: "horizontal",
        parseHTML: (element) => (element.getAttribute("data-layout") as any) || "horizontal"
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'aside[data-type="cta-box"]'
      },
      {
        tag: "aside.metazivo-cta-box"
      },
      {
        tag: "div.metazivo-cta-box"
      }
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const {
      badge = "",
      title = "",
      description = "",
      buttonText = "Launch Scanner →",
      buttonUrl = "/tools/broken-link-checker",
      footerNote = "",
      theme = "metazivo-orange",
      layout = "horizontal"
    } = node.attrs as CtaBoxAttributes;

    // Theme calculations for export
    let containerBg = "#FFF7ED";
    let borderColor = "#FF5722";
    let badgeBg = "#FFEDD5";
    let badgeText = "#C2410C";
    let titleColor = "#1E293B";
    let descColor = "#475569";
    let btnBg = "linear-gradient(135deg, #FF5722 0%, #E64A19 100%)";
    let btnText = "#FFFFFF";
    let btnShadow = "0 4px 14px rgba(255, 87, 34, 0.35)";
    let footerColor = "#94A3B8";

    if (theme === "pro-indigo") {
      containerBg = "#F5F7FF";
      borderColor = "#6366F1";
      badgeBg = "#EEF2FF";
      badgeText = "#4338CA";
      titleColor = "#0F172A";
      descColor = "#334155";
      btnBg = "linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)";
      btnText = "#FFFFFF";
      btnShadow = "0 4px 14px rgba(79, 70, 229, 0.35)";
      footerColor = "#64748B";
    } else if (theme === "emerald-growth") {
      containerBg = "#F0FDF4";
      borderColor = "#10B981";
      badgeBg = "#DCFCE7";
      badgeText = "#065F46";
      titleColor = "#064E3B";
      descColor = "#166534";
      btnBg = "linear-gradient(135deg, #059669 0%, #047857 100%)";
      btnText = "#FFFFFF";
      btnShadow = "0 4px 14px rgba(5, 150, 105, 0.35)";
      footerColor = "#047857";
    } else if (theme === "amber-warning") {
      containerBg = "#FFFBEB";
      borderColor = "#F59E0B";
      badgeBg = "#FEF3C7";
      badgeText = "#92400E";
      titleColor = "#78350F";
      descColor = "#92400E";
      btnBg = "linear-gradient(135deg, #D97706 0%, #B45309 100%)";
      btnText = "#FFFFFF";
      btnShadow = "0 4px 14px rgba(217, 119, 6, 0.35)";
      footerColor = "#B45309";
    } else if (theme === "clean-bordered") {
      containerBg = "#FFFFFF";
      borderColor = "#E2E8F0";
      badgeBg = "#F1F5F9";
      badgeText = "#334155";
      titleColor = "#0F172A";
      descColor = "#64748B";
      btnBg = "#0F172A";
      btnText = "#FFFFFF";
      btnShadow = "0 4px 14px rgba(15, 23, 42, 0.15)";
      footerColor = "#94A3B8";
    }

    const isHorizontal = layout === "horizontal";

    return [
      "aside",
      mergeAttributes(HTMLAttributes, {
        class: "metazivo-cta-box not-prose my-8 p-6 md:p-7 rounded-2xl border transition-all",
        "data-type": "cta-box",
        "data-badge": badge,
        "data-title": title,
        "data-description": description,
        "data-button-text": buttonText,
        "data-button-url": buttonUrl,
        "data-footer-note": footerNote,
        "data-theme": theme,
        "data-layout": layout,
        style: `background: ${containerBg}; border: 1.5px solid ${borderColor}; border-radius: 1.25rem; margin: 2rem 0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); font-family: system-ui, -apple-system, sans-serif;`
      }),
      [
        "div",
        {
          class: `flex flex-col ${isHorizontal ? "md:flex-row md:items-center md:justify-between" : ""} gap-5`
        },
        [
          "div",
          { class: "space-y-2.5 max-w-xl" },
          badge
            ? [
                "div",
                {
                  class: "cta-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase",
                  style: `background: ${badgeBg}; color: ${badgeText};`
                },
                badge
              ]
            : "",
          [
            "h3",
            {
              class: "cta-title text-lg md:text-xl font-extrabold tracking-tight m-0",
              style: `color: ${titleColor}; line-height: 1.3; margin: 0 0 8px 0;`
            },
            title
          ],
          [
            "p",
            {
              class: "cta-desc text-sm leading-relaxed m-0",
              style: `color: ${descColor}; margin: 0 0 8px 0; line-height: 1.5;`
            },
            description
          ],
          footerNote
            ? [
                "p",
                {
                  class: "cta-footer text-xs font-medium m-0 pt-1",
                  style: `color: ${footerColor}; margin: 4px 0 0 0;`
                },
                footerNote
              ]
            : ""
        ],
        [
          "div",
          {
            class: `shrink-0 ${isHorizontal ? "md:self-center" : "pt-2"}`
          },
          [
            "a",
            {
              href: buttonUrl,
              class: "metazivo-cta-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-transform hover:scale-[1.02] active:scale-[0.98] text-center",
              style: `background: ${btnBg}; color: ${btnText}; box-shadow: ${btnShadow}; text-decoration: none; border-radius: 0.75rem; display: inline-block;`
            },
            buttonText
          ]
        ]
      ]
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CtaBoxComponent);
  }
});
