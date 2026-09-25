/**
 * Smart CTA Analyzer for MetaZivo Digital
 * Analyzes article text / HTML, detects main SEO topics and search intents,
 * and automatically generates contextually relevant, high-converting CTA callout boxes.
 */

export interface SmartCtaRecommendation {
  topicId: string;
  detectedTopicName: string;
  confidenceScore: number;
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  footerNote: string;
  theme: "metazivo-orange" | "pro-indigo" | "emerald-growth" | "amber-warning" | "clean-bordered";
  layout: "horizontal" | "vertical";
  matchedKeywords: string[];
}

interface TopicCluster {
  id: string;
  name: string;
  toolUrl: string;
  badge: string;
  theme: "metazivo-orange" | "pro-indigo" | "emerald-growth" | "amber-warning" | "clean-bordered";
  primaryTitle: string;
  primaryDescription: string;
  buttonText: string;
  footerNote: string;
  keywords: string[];
  weight: number;
}

const TOPIC_CLUSTERS: TopicCluster[] = [
  {
    id: "broken-links",
    name: "Broken Links, 404 Errors & Threat Detection",
    toolUrl: "/tools/broken-link-checker",
    badge: "⚡ 100% Free Live Scanner",
    theme: "metazivo-orange",
    primaryTitle: "Detect 404 Dead Links & Broken Redirects Live",
    primaryDescription: "Don't let link rot or broken redirects hurt your crawl budget and rankings. Run our real-time website crawler to catch 404s and toxic URLs.",
    buttonText: "Scan Broken Links Live →",
    footerNote: "✓ Real Googlebot Simulation  ✓ Instant Response Codes  ✓ Direct CSV Export",
    weight: 1.2,
    keywords: [
      "broken link", "broken links", "dead link", "dead links", "404", "404 error",
      "link rot", "redirect chain", "301 redirect", "toxic link", "crawl error",
      "dead url", "broken url", "http error", "bad link", "bad links", "status code",
      "hyperlink error", "broken internal link", "broken external link"
    ]
  },
  {
    id: "speed-vitals",
    name: "Core Web Vitals & Real PageSpeed",
    toolUrl: "/tools/website-speed-test",
    badge: "⚡ Real Google PageSpeed & TTFB",
    theme: "emerald-growth",
    primaryTitle: "Audit Your Core Web Vitals & Real Loading Speed",
    primaryDescription: "Slow pages destroy conversions and bounce rates. Test your actual server latency (TTFB), LCP, and mobile responsiveness with our Google-calibrated speed audit.",
    buttonText: "Run PageSpeed Audit Free →",
    footerNote: "✓ Live Server Probes  ✓ Mobile & Desktop  ✓ Real Latency Zero Emulation",
    weight: 1.15,
    keywords: [
      "pagespeed", "page speed", "loading speed", "core web vitals", "lcp", "fid",
      "inp", "cls", "ttfb", "server response time", "slow website", "fast loading",
      "caching", "cache", "cdn", "lazy loading", "minification", "website performance",
      "performance audit", "speed test", "mobile friendly", "mobile responsiveness"
    ]
  },
  {
    id: "sitemap-indexing",
    name: "XML Sitemap & Search Engine Indexing",
    toolUrl: "/tools/xml-sitemap-generator",
    badge: "🗺️ Search Engine Indexing",
    theme: "clean-bordered",
    primaryTitle: "Inspect or Generate Your Clean XML Sitemap",
    primaryDescription: "Ensure search engine crawlers discover every page without dead ends, canonical mismatches, or non-HTTPS URLs with our live sitemap validator.",
    buttonText: "Inspect & Generate Sitemap →",
    footerNote: "✓ Google Protocol Compliant  ✓ Canonical URL Checks  ✓ 1-Click Export",
    weight: 1.1,
    keywords: [
      "sitemap", "xml sitemap", "sitemaps", "indexation", "google search console",
      "crawl budget", "googlebot index", "url list", "url discovery", "index status",
      "sitemap.xml", "crawlability", "indexing issue", "canonical sitemap"
    ]
  },
  {
    id: "keyword-clustering",
    name: "Keyword Clustering & Topical Authority",
    toolUrl: "/tools/keyword-clustering-tool",
    badge: "🎯 Topical SEO Strategy",
    theme: "pro-indigo",
    primaryTitle: "Cluster Keywords & Dominate Topical Authority",
    primaryDescription: "Group hundreds of keywords into high-ranking topical clusters, eliminate cannibalization, and structure your content for Google domination.",
    buttonText: "Cluster Keywords Free →",
    footerNote: "✓ Search Intent Classification  ✓ Topical Maps  ✓ Zero Cannibalization",
    weight: 1.1,
    keywords: [
      "keyword", "keywords", "clustering", "keyword clustering", "topical authority",
      "search intent", "cannibalization", "keyword research", "content strategy",
      "long-tail keywords", "serp grouping", "semantic seo", "content hub",
      "keyword cannibalization", "search volume"
    ]
  },
  {
    id: "schema-markup",
    name: "Schema Markup & Google Rich Snippets",
    toolUrl: "/tools/schema-markup-generator",
    badge: "⭐ Google Rich Snippets Booster",
    theme: "pro-indigo",
    primaryTitle: "Generate Valid JSON-LD Schema Markup in Seconds",
    primaryDescription: "Win Google FAQ snippets, Article structured data, and Local Business badges. Boost your organic click-through rate with 100% valid JSON-LD code.",
    buttonText: "Build Free Schema Markup →",
    footerNote: "✓ 100% Schema.org Validated  ✓ Rich Results Ready  ✓ Copy-Paste JSON",
    weight: 1.1,
    keywords: [
      "schema", "structured data", "json-ld", "rich snippet", "rich snippets",
      "faq schema", "article schema", "schema markup", "google rich results",
      "breadcrumbs schema", "organization schema", "localbusiness schema", "microdata"
    ]
  },
  {
    id: "robots-txt",
    name: "Robots.txt & Crawler Directives",
    toolUrl: "/tools/robots-txt-generator",
    badge: "🤖 Bot Control & Crawl Budget",
    theme: "amber-warning",
    primaryTitle: "Audit Your Robots.txt & Protect Your Crawl Budget",
    primaryDescription: "Block aggressive AI scrapers, guide Googlebot to your revenue pages, and avoid catastrophic disallow rules with standard-compliant robots.txt syntax.",
    buttonText: "Audit Robots.txt Live →",
    footerNote: "✓ Standard Protocol Syntax  ✓ AI Bot & LLMs.txt Support  ✓ Crawler Safe",
    weight: 1.05,
    keywords: [
      "robots.txt", "user-agent", "disallow", "crawl directive", "crawl budget",
      "noindex", "crawler", "llms.txt", "ai bots", "bot blocking", "search crawler",
      "allow directive", "meta robots"
    ]
  },
  {
    id: "internal-links",
    name: "Internal Linking & PageRank Architecture",
    toolUrl: "/tools/internal-link-finder",
    badge: "🔗 Site Architecture & PageRank",
    theme: "metazivo-orange",
    primaryTitle: "Find Orphan Pages & Internal Linking Gaps",
    primaryDescription: "Distribute link equity across your website. Uncover high-impact contextual internal linking opportunities and boost underperforming articles.",
    buttonText: "Find Internal Link Gaps →",
    footerNote: "✓ Contextual Link Suggestions  ✓ PageRank Distribution  ✓ Orphan Detection",
    weight: 1.05,
    keywords: [
      "internal link", "internal links", "internal linking", "orphan page", "orphan pages",
      "site architecture", "anchor text", "pagerank", "link silo", "inbound links",
      "link equity", "content hub linking"
    ]
  },
  {
    id: "headings-hierarchy",
    name: "Heading Hierarchy (H1-H6) & On-Page SEO",
    toolUrl: "/tools/heading-structure-tool",
    badge: "📑 On-Page Hierarchy Auditor",
    theme: "metazivo-orange",
    primaryTitle: "Verify Heading Hierarchy & On-Page Signals",
    primaryDescription: "Google loves structured content. Check for missing H1 tags, skipped heading levels, and optimize your outline for search crawlers and AI answer engines.",
    buttonText: "Inspect Heading Hierarchy →",
    footerNote: "✓ Live DOM Visual Tree  ✓ Hierarchy Gap Alerts  ✓ Instant Guidance",
    weight: 1.05,
    keywords: [
      "heading", "headings", "h1", "h2", "h3", "heading structure", "hierarchy",
      "on-page seo", "meta title", "meta description", "title tag", "content outline",
      "subheading", "content readability"
    ]
  },
  {
    id: "redirect-checker",
    name: "301/302 Redirects & Chain Diagnostics",
    toolUrl: "/tools/redirect-checker",
    badge: "🔄 HTTP Redirect Diagnostic",
    theme: "emerald-growth",
    primaryTitle: "Trace 301/302 Redirect Chains & Loops Live",
    primaryDescription: "Identify crawl budget leaks and link equity loss caused by multi-hop redirect chains and improper 302 temporary redirects on your site.",
    buttonText: "Trace URL Redirects Live →",
    footerNote: "✓ Multi-Hop Hop Tracer  ✓ Header Inspections  ✓ Latency Metrics",
    weight: 1.05,
    keywords: [
      "redirect", "redirects", "301", "302", "redirect chain", "redirect loop",
      "canonical redirect", "https migration", "status 301", "status 302",
      "infinite redirect", "http to https"
    ]
  },
  {
    id: "local-seo",
    name: "Local SEO, Google Maps & NAP Consistency",
    toolUrl: "/tools/local-seo-audit",
    badge: "📍 Google Maps & Local Pack",
    theme: "emerald-growth",
    primaryTitle: "Audit Your Local NAP Signals & Google Maps Ranking",
    primaryDescription: "Verify Name, Address, and Phone consistency across your website to dominate local search and capture Google's 3-Pack map rankings.",
    buttonText: "Audit Local SEO Score →",
    footerNote: "✓ NAP Consistency Check  ✓ Google Maps Embed  ✓ Local Geo Schema",
    weight: 1.1,
    keywords: [
      "local seo", "google business profile", "google maps", "map pack", "nap",
      "local citation", "local citations", "local search", "near me", "store locator",
      "phone number", "business address"
    ]
  },
  {
    id: "general-seo-audit",
    name: "Full 360° Comprehensive SEO Health Audit",
    toolUrl: "/tools/seo-audit-checker",
    badge: "⚡ Comprehensive 360° Audit",
    theme: "metazivo-orange",
    primaryTitle: "Run an Instant 360° SEO & Technical Health Audit",
    primaryDescription: "Scan 50+ on-page and technical ranking factors including meta tags, HTTP security, mobile compatibility, and Core Web Vitals in one unified audit.",
    buttonText: "Start Free 360° SEO Audit →",
    footerNote: "✓ 50+ Ranking Factors  ✓ Real-Time Deep Crawl  ✓ Zero Software Needed",
    weight: 1.0,
    keywords: [
      "seo audit", "website audit", "technical seo", "seo checker", "ranking",
      "rankings", "google traffic", "organic traffic", "website optimization",
      "search engine optimization", "seo score"
    ]
  }
];

/**
 * Strips HTML tags and gets clean plain text
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Analyzes article text and returns the best matching MetaZivo CTA Callout Box
 */
export function analyzeArticleForCta(
  content: string,
  articleTitle?: string
): {
  bestMatch: SmartCtaRecommendation;
  alternatives: SmartCtaRecommendation[];
  detectedTopic: string;
  totalWordCount: number;
} {
  const plainText = stripHtml(content);
  const words = plainText.toLowerCase().split(/\s+/).filter(Boolean);
  const totalWordCount = words.length;
  const combinedText = `${(articleTitle || "").toLowerCase()} ${plainText.toLowerCase()}`;

  const scoredClusters = TOPIC_CLUSTERS.map(cluster => {
    let rawScore = 0;
    const matchedKeywords: string[] = [];

    cluster.keywords.forEach(kw => {
      const kwLower = kw.toLowerCase();
      // Count occurrences
      let count = 0;
      let pos = combinedText.indexOf(kwLower);
      while (pos !== -1) {
        count++;
        pos = combinedText.indexOf(kwLower, pos + kwLower.length);
      }

      if (count > 0) {
        matchedKeywords.push(kw);
        // Multi-word keywords get higher weight
        const wordWeight = kw.includes(" ") ? 2.5 : 1.0;
        rawScore += count * wordWeight;
      }
    });

    const finalScore = rawScore * cluster.weight;

    const recommendation: SmartCtaRecommendation = {
      topicId: cluster.id,
      detectedTopicName: cluster.name,
      confidenceScore: Math.round(finalScore * 10) / 10,
      badge: cluster.badge,
      title: cluster.primaryTitle,
      description: cluster.primaryDescription,
      buttonText: cluster.buttonText,
      buttonUrl: cluster.toolUrl,
      footerNote: cluster.footerNote,
      theme: cluster.theme,
      layout: "horizontal",
      matchedKeywords: Array.from(new Set(matchedKeywords)).slice(0, 6)
    };

    return { cluster, score: finalScore, recommendation };
  });

  // Sort by score descending
  scoredClusters.sort((a, b) => b.score - a.score);

  // If top score is very low (e.g., general article), fall back to general SEO or broken link
  const topItem = scoredClusters[0];
  const secondItem = scoredClusters[1];
  const thirdItem = scoredClusters[2];

  let bestMatch = { ...topItem.recommendation };
  if (topItem.score <= 0) {
    // Default to Broken Link Checker or 360 SEO Audit
    const defaultCluster = scoredClusters.find(c => c.cluster.id === "broken-links");
    bestMatch = defaultCluster ? { ...defaultCluster.recommendation } : { ...scoredClusters[0].recommendation };
  }

  // Polish title if article has specific context
  if (articleTitle && articleTitle.length > 5) {
    if (bestMatch.topicId === "broken-links") {
      bestMatch.title = `Audit Broken Links & 404s for "${articleTitle.slice(0, 45)}..."`;
    } else if (bestMatch.topicId === "speed-vitals") {
      bestMatch.title = `Test Real Loading Speed & Core Web Vitals`;
    }
  }

  const alternatives = [secondItem?.recommendation, thirdItem?.recommendation].filter(Boolean) as SmartCtaRecommendation[];

  return {
    bestMatch,
    alternatives,
    detectedTopic: bestMatch.detectedTopicName,
    totalWordCount
  };
}
