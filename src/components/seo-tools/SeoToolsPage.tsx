import React from "react";
import { SEO_TOOLS_DATA, getToolBySlug } from "./seoToolsData";
import SeoToolsHub from "./SeoToolsHub";
import SeoAuditTool from "./SeoAuditTool";
import KeywordClusteringTool from "./KeywordClusteringTool";
import SearchIntentChecker from "./SearchIntentChecker";
import SchemaGeneratorTool from "./SchemaGeneratorTool";
import RobotsTxtTool from "./RobotsTxtTool";
import XmlSitemapTool from "./XmlSitemapTool";
import LocalSeoAuditTool from "./LocalSeoAuditTool";
import InternalLinkFinderTool from "./InternalLinkFinderTool";
import AiAeoGeoCheckerTool from "./AiAeoGeoCheckerTool";
import RedirectTools from "./RedirectTools";
import MetaTagTool from "./MetaTagTool";
import HeadingStructureTool from "./HeadingStructureTool";
import TechnicalSeoToolkit from "./TechnicalSeoToolkit";
import ContentSeoToolkit from "./ContentSeoToolkit";
import PerformanceAndIndexTools from "./PerformanceAndIndexTools";
import WebsiteSpeedTest from "../WebsiteSpeedTest";

interface Props {
  activeToolSlug?: string;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function SeoToolsPage({ activeToolSlug, onNavigateTool, onNavigateHome }: Props) {
  // If no specific tool is selected or "hub", display the SEO Tools Directory Hub
  if (!activeToolSlug || activeToolSlug === "hub" || activeToolSlug === "seo-tools") {
    return (
      <SeoToolsHub
        onSelectTool={onNavigateTool}
        onNavigateHome={onNavigateHome}
      />
    );
  }

  const toolDef = getToolBySlug(activeToolSlug);

  // If slug is not found, fallback to Hub
  if (!toolDef) {
    return (
      <SeoToolsHub
        onSelectTool={onNavigateTool}
        onNavigateHome={onNavigateHome}
      />
    );
  }

  // Render specific tool
  switch (toolDef.slug) {
    case "seo-audit-checker":
      return (
        <SeoAuditTool
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );

    case "keyword-clustering":
    case "keyword-clustering-tool":
    case "keyword-cannibalization-checker":
    case "topical-map-generator":
      return (
        <KeywordClusteringTool
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );

    case "search-intent-analyzer":
    case "search-intent-checker":
      return (
        <SearchIntentChecker
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );

    case "schema-markup-generator":
    case "faq-schema-generator":
    case "howto-schema-generator":
    case "local-business-schema":
      return (
        <SchemaGeneratorTool
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );

    case "robots-txt-generator":
    case "robots-txt-tester":
    case "robots-txt-generator-tester":
      return (
        <RobotsTxtTool
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );

    case "xml-sitemap-generator":
      return (
        <XmlSitemapTool
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );

    case "local-seo-audit":
    case "local-seo-audit-tool":
      return (
        <LocalSeoAuditTool
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );

    case "internal-link-analyzer":
    case "internal-link-finder":
      return (
        <InternalLinkFinderTool
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );

    case "ai-search-readiness":
    case "ai-aeo-geo-checker":
    case "ai-citation-mention-checker":
    case "geo-content-optimizer":
      return (
        <AiAeoGeoCheckerTool
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );

    case "redirect-checker":
    case "301-redirect-generator":
      return (
        <RedirectTools
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );

    case "meta-tag-generator":
    case "meta-title-description-generator":
    case "serp-simulator":
    case "open-graph-generator":
    case "twitter-card-generator":
      return (
        <MetaTagTool
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );

    case "heading-structure-analyzer":
    case "h1-checker":
      return (
        <HeadingStructureTool
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );

    case "hreflang-generator":
    case "broken-link-checker":
    case "canonical-checker":
    case "canonical-url-checker":
    case "http-headers-checker":
    case "ssl-checker":
      return (
        <TechnicalSeoToolkit
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );

    case "keyword-density-checker":
    case "readability-analyzer":
    case "word-counter":
    case "title-tag-generator":
    case "meta-description-generator":
    case "seo-slug-generator":
    case "content-gap-analyzer":
    case "featured-snippet-optimizer":
      return (
        <ContentSeoToolkit
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );

    case "core-web-vitals-checker":
    case "pagespeed-estimator":
    case "mobile-friendly-test":
    case "image-alt-text-checker":
    case "image-alt-text-generator":
    case "pagespeed-fix-recommendation-tool":
    case "google-index-checker":
    case "crawl-budget-analyzer":
      return (
        <PerformanceAndIndexTools
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );

    case "website-speed-test":
      return (
        <WebsiteSpeedTest
          onNavigate={(target) => {
            if (target === "home") onNavigateHome();
            else if (target === "seo-tools" || target === "hub") onNavigateTool("");
            else onNavigateTool(target.replace(/^tools\//, ""));
          }}
        />
      );

    default:
      return (
        <PerformanceAndIndexTools
          tool={toolDef}
          onNavigateTool={onNavigateTool}
          onNavigateHome={onNavigateHome}
        />
      );
  }
}
