/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from "react";
import { CheckCircle2, AlertTriangle, HelpCircle, Activity } from "lucide-react";

interface SeoScoreAnalyzerProps {
  title: string;
  content: string;
  focusKeywords: string[];
  seoTitle: string;
  seoDescription: string;
}

export default function SeoScoreAnalyzer({
  title,
  content,
  focusKeywords,
  seoTitle,
  seoDescription
}: SeoScoreAnalyzerProps) {
  const analysis = useMemo(() => {
    const checks: { label: string; passed: boolean; message: string; severity: "success" | "warning" | "info" }[] = [];
    let score = 100;

    // 1. Meta Title Check
    const titleLen = seoTitle?.length || 0;
    if (titleLen === 0) {
      checks.push({
        label: "SEO Title",
        passed: false,
        message: "SEO Title is missing. This is critical for search indexing.",
        severity: "warning"
      });
      score -= 20;
    } else if (titleLen < 40 || titleLen > 65) {
      checks.push({
        label: "SEO Title Length",
        passed: false,
        message: `Title length is ${titleLen} chars. Optimal is 40-65 chars to avoid truncation.`,
        severity: "info"
      });
      score -= 8;
    } else {
      checks.push({
        label: "SEO Title Length",
        passed: true,
        message: "Perfect! SEO Meta Title is optimized for display length.",
        severity: "success"
      });
    }

    // 2. Meta Description Check
    const descLen = seoDescription?.length || 0;
    if (descLen === 0) {
      checks.push({
        label: "SEO Description",
        passed: false,
        message: "SEO Description is missing. Google will auto-generate one, hurting CTR.",
        severity: "warning"
      });
      score -= 20;
    } else if (descLen < 120 || descLen > 160) {
      checks.push({
        label: "SEO Description Length",
        passed: false,
        message: `Description is ${descLen} chars. Optimal is 120-160 chars for best mobile rendering.`,
        severity: "info"
      });
      score -= 8;
    } else {
      checks.push({
        label: "SEO Description Length",
        passed: true,
        message: "Perfect! SEO Description size provides excellent search snippet space.",
        severity: "success"
      });
    }

    // 3. Content Length Checker
    const wordCount = content ? content.trim().split(/\s+/).filter(Boolean).length : 0;
    if (wordCount === 0) {
      checks.push({
        label: "Article Word Count",
        passed: false,
        message: "Your article body is empty. Write rich content to establish search authority.",
        severity: "warning"
      });
      score -= 25;
    } else if (wordCount < 300) {
      checks.push({
        label: "Article Length",
        passed: false,
        message: `Thin content warning (${wordCount} words). Aim for at least 300 words for basic ranking.`,
        severity: "warning"
      });
      score -= 15;
    } else if (wordCount < 800) {
      checks.push({
        label: "Article Length",
        passed: true,
        message: `Healthy content (${wordCount} words). Optimal for standard informative posts.`,
        severity: "success"
      });
      score -= 4; // slight deduction for non-enterprise length
    } else {
      checks.push({
        label: "Article Length",
        passed: true,
        message: `Outstanding! Deep-dive enterprise length article (${wordCount} words).`,
        severity: "success"
      });
    }

    // 4. Keyword Density & Placement
    const firstKeyword = focusKeywords?.[0]?.trim()?.toLowerCase();
    if (!firstKeyword) {
      checks.push({
        label: "Focus Keyword",
        passed: false,
        message: "No focus keywords defined. Define at least one primary target keyword.",
        severity: "info"
      });
      score -= 10;
    } else {
      const lowerContent = content.toLowerCase();
      const occurrences = (lowerContent.match(new RegExp(escapeRegExp(firstKeyword), "g")) || []).length;
      const density = wordCount > 0 ? (occurrences / wordCount) * 100 : 0;

      // Keyword in Title
      const inTitle = title.toLowerCase().includes(firstKeyword);
      if (!inTitle) {
        checks.push({
          label: "Keyword in Main Title",
          passed: false,
          message: `Your focus keyword "${firstKeyword}" is missing from the main H1 title.`,
          severity: "warning"
        });
        score -= 12;
      } else {
        checks.push({
          label: "Keyword in Main Title",
          passed: true,
          message: "Excellent. Focus keyword targets the main title perfectly.",
          severity: "success"
        });
      }

      // Keyword Density percentage
      if (occurrences === 0) {
        checks.push({
          label: "Keyword Density",
          passed: false,
          message: `Focus keyword "${firstKeyword}" is never mentioned in your article.`,
          severity: "warning"
        });
        score -= 15;
      } else if (density < 0.5) {
        checks.push({
          label: "Keyword Density",
          passed: false,
          message: `Density is extremely low (${density.toFixed(2)}%). Mention your focus keyword slightly more.`,
          severity: "info"
        });
        score -= 4;
      } else if (density > 2.5) {
        checks.push({
          label: "Keyword Stuffing Alert",
          passed: false,
          message: `Warning: Density is very high (${density.toFixed(2)}%). Google might flags this as keyword stuffing.`,
          severity: "warning"
        });
        score -= 8;
      } else {
        checks.push({
          label: "Keyword Density",
          passed: true,
          message: `Optimal density (${density.toFixed(2)}%). Ideal frequency for semantic SEO matching.`,
          severity: "success"
        });
      }
    }

    // 5. Heading Structure
    const h2Count = (content.match(/<h2/g) || []).length;
    const h3Count = (content.match(/<h3/g) || []).length;
    if (h2Count === 0) {
      checks.push({
        label: "Heading Semantics",
        passed: false,
        message: "No subheadings (H2) found. Breakdown your article with clear H2 outlines.",
        severity: "info"
      });
      score -= 8;
    } else {
      checks.push({
        label: "Subheadings Structuring",
        passed: true,
        message: `Great semantic structure. Article includes ${h2Count} H2 subheadings and ${h3Count} H3 parameters.`,
        severity: "success"
      });
    }

    // 6. Image Alts & Links
    const totalImages = (content.match(/<img/g) || []).length;
    const imagesWithAlts = (content.match(/alt=["'][^"']+["']/g) || []).length;
    if (totalImages > 0 && imagesWithAlts < totalImages) {
      checks.push({
        label: "Image Accessibility (Alt Text)",
        passed: false,
        message: `${totalImages - imagesWithAlts} out of ${totalImages} images do not have ALT text. Complete alt fields.`,
        severity: "warning"
      });
      score -= 10;
    } else if (totalImages > 0) {
      checks.push({
        label: "Image Accessibility (Alt Text)",
        passed: true,
        message: "Perfect! All static images in content contain SEO descriptive alternative text.",
        severity: "success"
      });
    }

    // Link audits
    const linkCount = (content.match(/href=/g) || []).length;
    if (linkCount === 0) {
      checks.push({
        label: "Hyperlink Presence",
        passed: false,
        message: "No internal or external links detected. Link to supporting sources or custom services.",
        severity: "info"
      });
      score -= 6;
    } else {
      checks.push({
        label: "Hyperlink Network",
        passed: true,
        message: `Article incorporates ${linkCount} reference hyperlinks. Supports search spider indexing.`,
        severity: "success"
      });
    }

    // Constrain score
    const finalScore = Math.max(15, Math.min(100, score));

    return { score: finalScore, checks };
  }, [title, content, focusKeywords, seoTitle, seoDescription]);

  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Determine score color classes
  const scoreColors = (s: number) => {
    if (s >= 90) return { text: "text-emerald-400", border: "border-emerald-500", bg: "bg-emerald-950/20" };
    if (s >= 70) return { text: "text-amber-400", border: "border-amber-500", bg: "bg-amber-950/20" };
    return { text: "text-red-400", border: "border-red-500", bg: "bg-red-950/20" };
  };

  const styleSet = scoreColors(analysis.score);

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5" id="seo-score-analyzer">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-850">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <h4 className="text-sm font-bold text-slate-200 tracking-wide font-sans">Enterprise SEO Audit</h4>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${styleSet.bg} ${styleSet.border} ${styleSet.text} text-xs font-mono font-bold`}>
          <span>Score:</span>
          <span className="text-sm">{analysis.score}/100</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-5">
        <div
          className={`h-full transition-all duration-500 bg-gradient-to-r ${
            analysis.score >= 90
              ? "from-emerald-600 to-teal-400"
              : analysis.score >= 70
              ? "from-amber-600 to-yellow-400"
              : "from-red-600 to-rose-400"
          }`}
          style={{ width: `${analysis.score}%` }}
        />
      </div>

      {/* Detailed Checklists */}
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {analysis.checks.map((chk, index) => (
          <div key={index} className="flex gap-2.5 items-start p-2.5 bg-slate-950/40 border border-slate-900 rounded-lg text-xs">
            {chk.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : chk.severity === "warning" ? (
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            ) : (
              <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            )}
            <div className="flex flex-col gap-0.5">
              <span className={`font-semibold ${chk.passed ? "text-slate-300" : "text-slate-400"}`}>{chk.label}</span>
              <p className="text-slate-500 leading-relaxed text-[11px]">{chk.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
