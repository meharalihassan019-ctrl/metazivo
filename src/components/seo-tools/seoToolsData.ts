export interface SeoToolDef {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  shortDescription?: string;
  category: "Technical & Audit" | "Content & On-Page" | "Keywords & Strategy" | "Schema & Structured Data" | "AI, AEO & GEO" | "Speed & Performance";
  badge: string;
  iconName: string;
  popular?: boolean;
  intro: string;
  explanation: {
    whatIsIt: string;
    whyItMatters: string;
    bestPractices: string[];
  };
  faqs: Array<{ q: string; a: string }>;
  relatedSlugs: string[];
  tags?: string[];
}

export const SEO_TOOL_CATEGORIES = [
  "All Tools",
  "Technical & Audit",
  "Content & On-Page",
  "Keywords & Strategy",
  "Schema & Structured Data",
  "AI, AEO & GEO",
  "Speed & Performance"
] as const;

export const SEO_TOOLS_LIST: SeoToolDef[] = [
  {
    id: "tool-1",
    slug: "seo-audit-checker",
    name: "SEO Audit Checker",
    shortDesc: "Comprehensive on-page and technical website health inspection with actionable fix guidelines.",
    category: "Technical & Audit",
    badge: "Real Engine",
    iconName: "ShieldCheck",
    popular: true,
    intro: "Analyze any URL for critical technical issues, meta tags, heading hierarchies, mobile viewport, structured data, and crawlability blockers.",
    explanation: {
      whatIsIt: "The SEO Audit Checker runs an in-depth diagnostic crawl on your web page to evaluate search engine crawlability, content optimization, and metadata health.",
      whyItMatters: "Unresolved technical errors such as missing canonical tags, broken links, non-responsive viewports, or missing meta descriptions prevent Googlebot from indexing and ranking your pages.",
      bestPractices: [
        "Ensure your status code returns HTTP 200 OK without unneeded redirect chains.",
        "Include exactly one descriptive H1 tag matching your primary search intent.",
        "Add self-referencing canonical tags to protect against duplicate content penalties."
      ]
    },
    faqs: [
      { q: "How often should I run an SEO audit?", a: "We recommend running a technical audit at least once a month, or immediately after deploying theme updates or site redesigns." },
      { q: "Does this audit check both mobile and desktop signals?", a: "Yes, it verifies mobile viewport declarations, touch-friendly layouts, HTTPS encryption, and desktop indexability signals." }
    ],
    relatedSlugs: ["broken-link-checker", "canonical-url-checker", "core-web-vitals-checker"]
  },
  {
    id: "tool-2",
    slug: "keyword-clustering-tool",
    name: "Keyword Clustering Tool",
    shortDesc: "Group large keyword lists into topical clusters with primary targets, search intent, and page architecture.",
    category: "Keywords & Strategy",
    badge: "Algorithm",
    iconName: "Network",
    popular: true,
    intro: "Transform hundreds of scattered search queries into high-converting topical clusters to build comprehensive content hubs without cannibalization.",
    explanation: {
      whatIsIt: "Keyword clustering groups semantically related search terms together so you can target multiple long-tail keywords with a single authoritative page instead of creating thin duplicate posts.",
      whyItMatters: "Modern search engines rank topical depth. Targeting individual keywords with separate articles causes keyword cannibalization and dilutes your domain's organic authority.",
      bestPractices: [
        "Focus each page on one primary parent keyword and 4-8 semantic secondary variations.",
        "Map transactional clusters to landing or service pages and informational clusters to long-form guides.",
        "Create bi-directional internal links between pillar guides and cluster sub-topics."
      ]
    },
    faqs: [
      { q: "How many keywords can I cluster at once?", a: "You can paste up to 1,000 keywords at a time. The algorithm will automatically deduplicate and normalize them." },
      { q: "Does it keep keyword variations?", a: "Yes, meaningful syntactic variations are preserved while punctuation and redundant casing are normalized." }
    ],
    relatedSlugs: ["search-intent-checker", "topical-map-generator", "keyword-cannibalization-checker"]
  },
  {
    id: "tool-3",
    slug: "search-intent-checker",
    name: "Search Intent Checker",
    shortDesc: "Classify keywords into Informational, Commercial, Transactional, Navigational, Local, or Comparison.",
    category: "Keywords & Strategy",
    badge: "Smart Intent",
    iconName: "Compass",
    popular: true,
    intro: "Identify the psychological intention behind search queries to select the exact page structure, format, and call-to-action that matches user expectations.",
    explanation: {
      whatIsIt: "Search intent (or user intent) is the underlying goal a person has when typing a query into Google. It dictates what kind of content Google chooses to rank.",
      whyItMatters: "If a user is searching with transactional intent ('buy running shoes') and you serve an informational history essay, they will bounce immediately, signaling poor relevance to Google.",
      bestPractices: [
        "Align landing pages with transactional or commercial comparison keywords.",
        "Reserve informational queries for how-to guides, FAQs, and step-by-step documentation.",
        "Include clear calls to action matched to the user's stage in the buying journey."
      ]
    },
    faqs: [
      { q: "What are the six intent categories supported?", a: "Informational (learn), Commercial (evaluate options), Transactional (buy/hire), Navigational (brand destination), Local (geographic services), and Comparison (vs / alternatives)." },
      { q: "Can a keyword have mixed intent?", a: "Some keywords show hybrid intent; our tool highlights the dominant primary intent along with the recommended content blueprint." }
    ],
    relatedSlugs: ["keyword-clustering-tool", "content-gap-analyzer", "featured-snippet-optimizer"]
  },
  {
    id: "tool-4",
    slug: "schema-markup-generator",
    name: "Schema Markup Generator",
    shortDesc: "Generate error-free Schema.org JSON-LD for Articles, Products, Services, FAQ, HowTo, and Organizations.",
    category: "Schema & Structured Data",
    badge: "JSON-LD",
    iconName: "Code",
    popular: true,
    intro: "Build pristine structured data that search engines use to display rich snippets, stars, FAQs, author credentials, and enhanced search listings.",
    explanation: {
      whatIsIt: "Schema markup is machine-readable JSON-LD code added to your HTML that explicitly tells search engines what your content represents.",
      whyItMatters: "Rich snippets can increase organic click-through rates (CTR) by up to 30% by claiming visual real estate in Google SERPs.",
      bestPractices: [
        "Always test your generated JSON-LD in Google's Rich Results Test tool.",
        "Never invent fake review ratings or author bios; keep structured data truthful.",
        "Embed the code inside `<script type=\"application/ld+json\">` in your head or body."
      ]
    },
    faqs: [
      { q: "Which schema types are supported?", a: "Article, FAQPage, HowTo, Product, Service, LocalBusiness, Organization, Person, BreadcrumbList, Event, WebSite, WebPage, and Review." },
      { q: "Is JSON-LD preferred over Microdata?", a: "Yes, Google officially recommends JSON-LD because it is cleaner, decoupled from HTML markup, and easier to maintain." }
    ],
    relatedSlugs: ["faq-schema-generator", "howto-schema-generator", "local-business-schema"]
  },
  {
    id: "tool-5",
    slug: "local-seo-audit-tool",
    name: "Local SEO Audit Tool",
    shortDesc: "Audit business NAP consistency, Google Business Profile signals, and local landing page targeting.",
    category: "Technical & Audit",
    badge: "Local Signals",
    iconName: "MapPin",
    intro: "Verify local search signals including Name, Address, Phone (NAP) uniformity, LocalBusiness schema, geo coordinates, and city targeting.",
    explanation: {
      whatIsIt: "Local SEO audit evaluates whether your website and local profiles clearly communicate your physical location, service areas, and contact details to search bots.",
      whyItMatters: "Inconsistent addresses or telephone formats between your website and directories cause search engines to lose confidence in your geographic location, dropping your Google Maps rankings.",
      bestPractices: [
        "Use exact match NAP across your header, footer, Google Business Profile, and directories.",
        "Implement LocalBusiness structured data with exact latitude, longitude, and opening hours.",
        "Create dedicated localized service landing pages for each target city or neighborhood."
      ]
    },
    faqs: [
      { q: "What does NAP stand for?", a: "NAP stands for Name, Address, and Phone Number. Strict consistency is a foundational local ranking factor." },
      { q: "Can I audit service-area businesses without a physical storefront?", a: "Yes, you can specify your service cities and area served radius." }
    ],
    relatedSlugs: ["local-business-schema", "seo-audit-checker", "meta-title-description-generator"]
  },
  {
    id: "tool-6",
    slug: "internal-link-finder",
    name: "Internal Link Finder",
    shortDesc: "Discover contextual internal link opportunities and optimized anchor text between pages.",
    category: "Keywords & Strategy",
    badge: "Site Architecture",
    iconName: "Link2",
    intro: "Strengthen your site architecture and PageRank distribution by identifying high-value internal link relationships and natural keyword anchors.",
    explanation: {
      whatIsIt: "The Internal Link Finder scans your page topics, titles, and content bodies to highlight relevant linking opportunities that pass contextual equity throughout your site.",
      whyItMatters: "Search engine bots discover and prioritize pages through links. Strategic internal links help index deep pages, keep bounce rates low, and establish topical authority.",
      bestPractices: [
        "Use descriptive, keyword-rich anchor text rather than generic phrases like 'click here'.",
        "Link from high-authority pillar articles down to specific cluster sub-guides.",
        "Ensure orphan pages (pages with zero incoming links) are given contextual linkages."
      ]
    },
    faqs: [
      { q: "How many internal links should a post have?", a: "A standard 1,500-word article typically benefits from 3 to 8 relevant internal links to related guides or conversion pages." },
      { q: "Do internal links help with crawl budget?", a: "Yes, they provide explicit crawl paths for Googlebot to navigate without getting trapped." }
    ],
    relatedSlugs: ["keyword-clustering-tool", "topical-map-generator", "broken-link-checker"]
  },
  {
    id: "tool-7",
    slug: "meta-title-description-generator",
    name: "Meta Title & Meta Description Generator",
    shortDesc: "Generate high-converting, SERP-safe meta titles (55-60 chars) and meta descriptions (150-160 chars).",
    category: "Content & On-Page",
    badge: "SERP Optimizer",
    iconName: "Type",
    popular: true,
    intro: "Craft natural, compelling meta titles and snippets designed to avoid Google SERP truncation while maximizing click-through rates.",
    explanation: {
      whatIsIt: "Meta titles and descriptions are HTML head elements that determine how your webpage snippet appears on Google search results pages.",
      whyItMatters: "Titles that exceed 60 characters get cut off with ellipses (...). Descriptions between 150-160 characters maximize informative space and user engagement.",
      bestPractices: [
        "Keep meta titles strictly between 50 and 60 characters (or under 580 pixels).",
        "Include your primary keyword near the beginning of the title tag.",
        "Write meta descriptions with an active voice and an explicit value proposition or CTA."
      ]
    },
    faqs: [
      { q: "Why does Google sometimes rewrite my meta title?", a: "Google rewrites titles if they consider the original title too long, keyword-stuffed, or poorly aligned with user search queries." },
      { q: "Can I edit the generated snippets before copying?", a: "Yes, all suggestions are fully editable in real time with live character counting." }
    ],
    relatedSlugs: ["open-graph-generator", "twitter-card-generator", "featured-snippet-optimizer"]
  },
  {
    id: "tool-8",
    slug: "robots-txt-generator-tester",
    name: "Robots.txt Generator & Tester",
    shortDesc: "Build and test clean robots.txt directives for Googlebot, Bingbot, and AI scrapers.",
    category: "Technical & Audit",
    badge: "Crawler Control",
    iconName: "FileCode",
    popular: true,
    intro: "Generate customized robots.txt files with Allow, Disallow, Sitemap, and Crawl-delay rules, plus test whether specific URLs are allowed or blocked.",
    explanation: {
      whatIsIt: "Robots.txt is a text file located in your website's root directory that provides crawling guidelines to search engine robots and AI web spiders.",
      whyItMatters: "A misconfigured robots.txt rule can accidentally de-index your entire website from Google, destroying organic revenue overnight.",
      bestPractices: [
        "Always reference your full canonical XML sitemap URL at the end of the robots.txt.",
        "Disallow admin dashboards, internal search parameter pages, and checkout carts.",
        "Never block CSS or JavaScript files needed by Googlebot to render the page layout."
      ]
    },
    faqs: [
      { q: "Does robots.txt prevent a page from being indexed?", a: "Not always. If other sites link to the URL, Google may still index the URL without snippet content. Use `noindex` tags to guarantee non-indexation." },
      { q: "Can I block AI scrapers like GPTBot?", a: "Yes, you can add custom `User-agent: GPTBot` directives with `Disallow: /`." }
    ],
    relatedSlugs: ["xml-sitemap-generator", "seo-audit-checker", "canonical-url-checker"]
  },
  {
    id: "tool-9",
    slug: "xml-sitemap-generator",
    name: "XML Sitemap Generator",
    shortDesc: "Create valid, deduplicated XML sitemaps ready for submission to Google Search Console.",
    category: "Technical & Audit",
    badge: "Indexing",
    iconName: "FileSpreadsheet",
    popular: true,
    intro: "Build standards-compliant XML sitemaps with loc, lastmod, changefreq, and priority attributes to ensure prompt search engine discovery.",
    explanation: {
      whatIsIt: "An XML sitemap is a structured inventory of all public, canonical pages on your website intended for search engines.",
      whyItMatters: "Sitemaps help search bots discover newly published blog posts, updated service pages, and deep documentation without relying exclusively on crawling links.",
      bestPractices: [
        "Include only 200 OK canonical URLs; exclude redirected, broken, or noindex pages.",
        "Keep individual sitemap files under 50,000 URLs and 50MB uncompressed.",
        "Submit your sitemap URL inside Google Search Console and Bing Webmaster Tools."
      ]
    },
    faqs: [
      { q: "Does Google respect the 'priority' and 'changefreq' tags?", a: "Google primarily prioritizes the `<loc>` and `<lastmod>` timestamps, but having valid XML ensures broad multi-engine compatibility." },
      { q: "Can I download the sitemap directly?", a: "Yes, you can copy the XML or download the file as `sitemap.xml` with one click." }
    ],
    relatedSlugs: ["robots-txt-generator-tester", "seo-audit-checker", "hreflang-generator"]
  },
  {
    id: "tool-10",
    slug: "ai-aeo-geo-checker",
    name: "AI / AEO / GEO SEO Checker",
    shortDesc: "Evaluate content visibility in ChatGPT, Google Gemini, Perplexity, and Google AI Overviews.",
    category: "AI, AEO & GEO",
    badge: "Next-Gen AI",
    iconName: "Sparkles",
    popular: true,
    intro: "Audit your content for Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) readiness, entity clarity, and authoritative citation potential.",
    explanation: {
      whatIsIt: "AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) optimize digital content so large language models (LLMs) and AI search engines quote, reference, and synthesize your brand as a verified source.",
      whyItMatters: "With Google AI Overviews and Perplexity answering user questions directly, websites that lack structured answer formatting and strong entity signals lose significant organic referral clicks.",
      bestPractices: [
        "Place direct, 40-word concise answers immediately below H2 question headings.",
        "Cite verifiable statistics, primary research, and dates to facilitate LLM fact extraction.",
        "Establish clear author expertise and organization credentials (EEAT signals)."
      ]
    },
    faqs: [
      { q: "What is the difference between SEO, AEO, and GEO?", a: "SEO targets traditional 10-blue-links in SERPs, AEO targets voice and rich answer snippets, and GEO targets syntheses and citations inside generative AI answers." },
      { q: "Can any tool guarantee AI citations?", a: "No tool can guarantee rankings or AI citations, but structuring content around entity clarity and authoritative definitions significantly increases selection probability." }
    ],
    relatedSlugs: ["geo-content-optimizer", "ai-citation-mention-checker", "featured-snippet-optimizer"]
  },
  {
    id: "tool-11",
    slug: "seo-slug-generator",
    name: "SEO Slug Generator",
    shortDesc: "Generate clean, hyphenated, search-friendly URL slugs free of stopwords and noisy characters.",
    category: "Content & On-Page",
    badge: "URL Formatting",
    iconName: "Hash",
    intro: "Convert blog titles and product names into clean, keyword-focused URL slugs following search engine best practices.",
    explanation: {
      whatIsIt: "A slug is the final part of a URL address that identifies a specific page on a website in human-readable and search-readable words.",
      whyItMatters: "Short, clean URLs with focused target keywords achieve higher click-through rates and are easier for search bots to categorize.",
      bestPractices: [
        "Use lowercase letters and separate words strictly with hyphens (-).",
        "Strip unnecessary stopwords (e.g., 'the', 'a', 'in', 'and') when they don't alter meaning.",
        "Avoid special characters, dates, or numbers unless essential to the topic."
      ]
    },
    faqs: [
      { q: "Should I change existing slugs on my website?", a: "If an old URL is already ranking well, avoid changing it unless strictly necessary. If you do change it, always create a 301 redirect from the old URL to the new slug." },
      { q: "Are underscores acceptable in URLs?", a: "Google recommends hyphens (-) instead of underscores (_) as word separators." }
    ],
    relatedSlugs: ["meta-title-description-generator", "301-redirect-generator", "canonical-url-checker"]
  },
  {
    id: "tool-12",
    slug: "image-alt-text-generator",
    name: "Image Alt Text Generator",
    shortDesc: "Create descriptive, accessibility-compliant image alt text that ranks in Google Image Search.",
    category: "Content & On-Page",
    badge: "Accessibility",
    iconName: "Image",
    intro: "Generate contextual, WCAG-compliant alt text for images based on description, filename, or visual role without keyword stuffing.",
    explanation: {
      whatIsIt: "Alt text (alternative text) is an HTML attribute (`alt=\"...\"`) placed on image tags to describe the visual content for screen readers and search crawlers.",
      whyItMatters: "Missing or spammy alt text hurts website accessibility and forfeits valuable visibility in Google Images.",
      bestPractices: [
        "Be specific and succinct (typically 8 to 15 words).",
        "Describe the subject and action in the image naturally without writing 'image of'.",
        "Use empty alt text (`alt=\"\"`) for purely decorative borders or background icons."
      ]
    },
    faqs: [
      { q: "When should an image have an empty alt attribute?", a: "When an image is purely decorative and conveys no editorial meaning, screen readers skip it cleanly if you use `alt=\"\"`." },
      { q: "Does alt text affect main Google rankings?", a: "Yes, Google uses alt text alongside surrounding page copy to understand page context and image search relevance." }
    ],
    relatedSlugs: ["seo-audit-checker", "meta-title-description-generator", "pagespeed-fix-recommendation-tool"]
  },
  {
    id: "tool-13",
    slug: "broken-link-checker",
    name: "Broken Link Checker",
    shortDesc: "Inspect URLs and anchor tags to catch 404 dead ends, timeouts, and broken link signals.",
    category: "Technical & Audit",
    badge: "Crawl Diagnostic",
    iconName: "Unlink",
    intro: "Check website links or raw HTML markup to identify dead 404 links, invalid protocols, and broken internal pathways.",
    explanation: {
      whatIsIt: "The Broken Link Checker evaluates hyperlinks to verify whether destination servers return valid 200 OK responses or failed status codes like 404, 410, or 500.",
      whyItMatters: "Broken links frustrate human visitors, cause high bounce rates, waste search engine crawl budget, and disrupt internal link equity.",
      bestPractices: [
        "Replace or remove 404 internal links immediately.",
        "Check external affiliate or reference links quarterly to avoid linking to expired domains.",
        "Set up customized 404 pages with navigation links to assist lost visitors."
      ]
    },
    faqs: [
      { q: "What causes links to break?", a: "Content deletions, modified URL slugs without 301 redirects, domain expirations, or simple spelling mistakes in href tags." },
      { q: "Does fixing broken links immediately improve rankings?", a: "Yes, it preserves PageRank flow and signals high site maintenance quality to search engine crawlers." }
    ],
    relatedSlugs: ["redirect-checker", "301-redirect-generator", "seo-audit-checker"]
  },
  {
    id: "tool-14",
    slug: "redirect-checker",
    name: "Redirect Checker",
    shortDesc: "Analyze URL redirect hops, 301 vs 302 status codes, and detect latency-inducing redirect chains.",
    category: "Technical & Audit",
    badge: "Chain Inspector",
    iconName: "Repeat",
    intro: "Trace the complete path of any redirect to uncover slow redirect chains, 302 temporary redirects where 301s should be used, and destination errors.",
    explanation: {
      whatIsIt: "A redirect checker tracks HTTP response headers from the initial request through each intermediate location header until the final destination page is reached.",
      whyItMatters: "Redirect chains (e.g. A -> B -> C -> D) add 500ms+ of unnecessary latency and can cause Googlebot to abandon crawling before reaching the target page.",
      bestPractices: [
        "Always redirect directly from the legacy URL to the final destination (A -> D).",
        "Use 301 Permanent Redirects for SEO value transfer, reserving 302 only for temporary maintenance.",
        "Ensure your HTTP to HTTPS and non-WWW to WWW redirects happen in a single hop."
      ]
    },
    faqs: [
      { q: "How many redirect hops will Googlebot follow?", a: "Googlebot typically follows up to 5 hops, but recommends no more than 1 hop to prevent crawl timeouts." },
      { q: "Does a 301 redirect pass full PageRank?", a: "Yes, Google has confirmed that 301 redirects pass full PageRank equity when pointing to an equivalent topic." }
    ],
    relatedSlugs: ["301-redirect-generator", "canonical-url-checker", "broken-link-checker"]
  },
  {
    id: "tool-15",
    slug: "301-redirect-generator",
    name: "301 Redirect Generator",
    shortDesc: "Create copy-paste redirect code for Apache .htaccess, Nginx, Cloudflare, WordPress, and Next.js.",
    category: "Technical & Audit",
    badge: "Server Config",
    iconName: "CornerDownRight",
    intro: "Generate clean, syntax-validated redirect rules for Apache (.htaccess), Nginx web servers, Cloudflare page rules, or Node/Next.js configs.",
    explanation: {
      whatIsIt: "The 301 Redirect Generator builds the exact server configuration snippets required to permanently forward visitors and crawlers to new URLs.",
      whyItMatters: "Typographical syntax errors in `.htaccess` or `nginx.conf` can trigger 500 Internal Server Errors that bring down an entire website.",
      bestPractices: [
        "Place redirect rules before general rewrite blocks in `.htaccess`.",
        "Always test generated rules on a staging server or single URL before bulk deployment.",
        "Retain 301 redirects in place for at least one full year to ensure all external links update."
      ]
    },
    faqs: [
      { q: "Can I generate bulk redirect rules?", a: "Yes, you can input single URL pairs or multiple source/target paths to generate comprehensive server configurations." },
      { q: "Which format should I use for WordPress?", a: "You can use Apache `.htaccess` rules for standard Apache/LiteSpeed hosting, or PHP redirect snippets." }
    ],
    relatedSlugs: ["redirect-checker", "canonical-url-checker", "seo-slug-generator"]
  },
  {
    id: "tool-16",
    slug: "canonical-url-checker",
    name: "Canonical URL Checker",
    shortDesc: "Verify self-referencing canonical tags, protocol uniformity, and avoid duplicate content issues.",
    category: "Technical & Audit",
    badge: "Duplicate Guard",
    iconName: "CheckCheck",
    intro: "Inspect `<link rel=\"canonical\">` tags to verify absolute URL structure, protocol consistency, trailing slash alignment, and self-referencing integrity.",
    explanation: {
      whatIsIt: "A canonical tag tells search engines which version of a URL represents the master, authoritative source when multiple duplicate or similar versions exist.",
      whyItMatters: "Without canonical tags, variations like `http://`, `https://`, `www`, non-`www`, and UTM tracking parameters are indexed as separate duplicate pages.",
      bestPractices: [
        "Always use absolute URLs (e.g. `https://metazivo.com/services`) rather than relative paths.",
        "Ensure the canonical tag points to a 200 OK URL that is not redirected or blocked in robots.txt.",
        "Have one and only one canonical tag in the `<head>` section of each page."
      ]
    },
    faqs: [
      { q: "Is a canonical tag a directive or a hint?", a: "A canonical tag is considered a strong hint. If the content on two URLs is completely different, Google may choose to ignore the tag." },
      { q: "Should every page have a self-referencing canonical tag?", a: "Yes, every unique page should have a self-referencing canonical tag to protect against scraper duplication." }
    ],
    relatedSlugs: ["seo-audit-checker", "redirect-checker", "hreflang-generator"]
  },
  {
    id: "tool-17",
    slug: "hreflang-generator",
    name: "Hreflang Generator",
    shortDesc: "Generate multi-language and regional alternate tags for international SEO compliance.",
    category: "Technical & Audit",
    badge: "Global SEO",
    iconName: "Globe2",
    intro: "Build error-free `rel=\"alternate\" hreflang=\"...\"` annotations and XML sitemap hreflang clusters for multilingual and multi-region websites.",
    explanation: {
      whatIsIt: "Hreflang tags inform Google and other search engines about the specific language and geographic targeting of different versions of the same webpage.",
      whyItMatters: "Hreflang prevents duplicate content penalties across regional editions (like en-US vs en-GB) and ensures users land on the correct localized language page.",
      bestPractices: [
        "Always include bi-directional return links: if Page A links to Page B as hreflang, Page B MUST link back to Page A.",
        "Include an `x-default` fallback tag for unmatched languages or international selectors.",
        "Use valid ISO 639-1 language codes (e.g., 'es') and optional ISO 3166-1 Alpha 2 country codes (e.g., 'es-MX')."
      ]
    },
    faqs: [
      { q: "What is x-default used for?", a: "`x-default` specifies the default page for visitors when no language or region matches their browser preference." },
      { q: "Can I implement hreflang in XML sitemaps?", a: "Yes, XML sitemap hreflang is often cleaner because it avoids bloating HTML `<head>` tags on large websites." }
    ],
    relatedSlugs: ["xml-sitemap-generator", "canonical-url-checker", "seo-audit-checker"]
  },
  {
    id: "tool-18",
    slug: "open-graph-generator",
    name: "Open Graph Meta Tag Generator",
    shortDesc: "Create og:title, og:description, and og:image tags with live Facebook and LinkedIn card previews.",
    category: "Content & On-Page",
    badge: "Social Preview",
    iconName: "Share2",
    popular: true,
    intro: "Generate optimized Open Graph protocol metadata with a real-time interactive preview of how your page appears when shared on social networks.",
    explanation: {
      whatIsIt: "Open Graph (OG) tags are meta tags introduced by Facebook that control how links appear with image cards, titles, and summaries when shared across social apps.",
      whyItMatters: "Social platforms drive substantial brand discovery and referral traffic. Rich, engaging preview cards double social click-through rates compared to bare URL text.",
      bestPractices: [
        "Use high-resolution OG images with a 1.91:1 aspect ratio (recommended: 1200x630 pixels).",
        "Keep the `og:title` under 60 characters and `og:description` under 150 characters.",
        "Specify `og:type` as 'website' for homepages and 'article' for blog posts."
      ]
    },
    faqs: [
      { q: "Does LinkedIn use Open Graph tags?", a: "Yes, LinkedIn, WhatsApp, Slack, and Discord all read Open Graph protocol tags for link previews." },
      { q: "What image formats are supported for og:image?", a: "JPG, PNG, and WebP are supported. Keep file size under 5MB for fast social scraping." }
    ],
    relatedSlugs: ["twitter-card-generator", "meta-title-description-generator", "schema-markup-generator"]
  },
  {
    id: "tool-19",
    slug: "twitter-card-generator",
    name: "Twitter/X Card Generator",
    shortDesc: "Generate summary and summary_large_image tags with live X timeline preview cards.",
    category: "Content & On-Page",
    badge: "X Cards",
    iconName: "Twitter",
    intro: "Create validated `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` tags with realistic desktop and mobile preview framing.",
    explanation: {
      whatIsIt: "Twitter Cards allow you to attach rich photos, videos, and media experiences to Tweets that link to your web content.",
      whyItMatters: "`summary_large_image` cards provide massive visual real estate on the X feed, drawing higher user attention and engagement.",
      bestPractices: [
        "Use `summary_large_image` for blog posts, products, and landing pages.",
        "Include your brand's handle in `twitter:site` (e.g. `@metazivo`).",
        "Ensure the image is at least 600x314 pixels and uses HTTPS."
      ]
    },
    faqs: [
      { q: "What is the difference between 'summary' and 'summary_large_image'?", a: "'summary' shows a small square thumbnail on the left, while 'summary_large_image' shows a prominent full-width banner image above the text." },
      { q: "Does X fall back to Open Graph tags?", a: "Yes, if Twitter Card tags are missing, X will fall back to `og:title` and `og:image`, but explicit Twitter tags give you full control." }
    ],
    relatedSlugs: ["open-graph-generator", "meta-title-description-generator", "seo-audit-checker"]
  },
  {
    id: "tool-20",
    slug: "keyword-cannibalization-checker",
    name: "Keyword Cannibalization Checker",
    shortDesc: "Detect competing internal pages targeting the same queries and get consolidation plans.",
    category: "Keywords & Strategy",
    badge: "Conflict Detector",
    iconName: "CopyCheck",
    intro: "Identify where multiple pages on your website compete against each other for identical search queries, causing ranking instability and split authority.",
    explanation: {
      whatIsIt: "Keyword cannibalization happens when two or more URLs on the same domain target the same search query or intent, confusing search engines about which page to rank.",
      whyItMatters: "When Google fluctuates between ranking Page A and Page B, neither page earns top 3 positioning, leading to lower aggregate organic impressions and wasted backlinks.",
      bestPractices: [
        "Consolidate thin overlapping posts into one authoritative master guide using 301 redirects.",
        "Differentiate search intent between articles (e.g., beginner overview vs technical deep dive).",
        "Adjust internal anchor text so internal links point to the intended canonical champion page."
      ]
    },
    faqs: [
      { q: "How do I spot keyword cannibalization?", a: "Look for multiple URLs appearing for the exact same query in Google Search Console, or frequent ranking position drops." },
      { q: "Is 301 redirecting always the best fix?", a: "If the pages have duplicate content, redirecting is best. If they serve distinct sub-intents, rewrite them to target specific distinct angles." }
    ],
    relatedSlugs: ["keyword-clustering-tool", "topical-map-generator", "internal-link-finder"]
  },
  {
    id: "tool-21",
    slug: "topical-map-generator",
    name: "Topical Map Generator",
    shortDesc: "Build hierarchical content pillar structures, sub-clusters, and internal linking blueprints.",
    category: "Keywords & Strategy",
    badge: "Semantic Map",
    iconName: "GitFork",
    popular: true,
    intro: "Design complete semantic content architectures with Tier 1 pillar guides, Tier 2 topic clusters, and Tier 3 supporting long-tail articles to build industry authority.",
    explanation: {
      whatIsIt: "A topical map is a structured blueprint organizing all the articles, guides, and pages required to achieve complete semantic coverage of a subject area.",
      whyItMatters: "Search engines reward topical authority. Sites that comprehensively answer all related facets of a niche outrank competitors with isolated articles.",
      bestPractices: [
        "Build a broad core pillar page covering the high-level umbrella concept.",
        "Create 5 to 10 supporting cluster articles addressing specific sub-queries.",
        "Link all cluster articles back up to the main pillar guide with descriptive anchors."
      ]
    },
    faqs: [
      { q: "What is a pillar page?", a: "A pillar page is an authoritative, comprehensive resource on a core topic that links out to cluster pages exploring specific subtopics in detail." },
      { q: "How does topical authority help small websites?", a: "Deep topical authority allows smaller niche sites to outrank large generalist publications with higher domain ratings." }
    ],
    relatedSlugs: ["keyword-clustering-tool", "content-gap-analyzer", "internal-link-finder"]
  },
  {
    id: "tool-22",
    slug: "content-gap-analyzer",
    name: "Content Gap Analyzer",
    shortDesc: "Compare your content against competitors to uncover missing entities, subtopics, and questions.",
    category: "Content & On-Page",
    badge: "Competitor Intel",
    iconName: "Search",
    intro: "Identify missing semantic terms, questions, subheadings, and entity references that top-ranking competitors cover but your page omits.",
    explanation: {
      whatIsIt: "A content gap analysis compares your text against top-ranking SERP competitors to uncover keywords, subtopics, and questions you have overlooked.",
      whyItMatters: "If competitor pages cover 15 subtopics and your article only covers 5, Google recognizes the competitors as significantly more comprehensive and useful.",
      bestPractices: [
        "Add dedicated H2 and H3 sections covering missing subtopics.",
        "Include user questions from Google's 'People Also Ask' box.",
        "Support claims with tables, checklists, and actionable examples."
      ]
    },
    faqs: [
      { q: "Does content gap mean just adding more word count?", a: "No, it is about semantic depth and intent coverage, not adding filler words." },
      { q: "How often should I refresh content gaps?", a: "Review your top 20 revenue-driving pages every 6 months to keep up with evolving SERP features." }
    ],
    relatedSlugs: ["topical-map-generator", "featured-snippet-optimizer", "ai-aeo-geo-checker"]
  },
  {
    id: "tool-23",
    slug: "faq-schema-generator",
    name: "FAQ Generator + FAQ Schema",
    shortDesc: "Generate high-intent user questions with answers and export valid Schema.org FAQPage JSON-LD.",
    category: "Schema & Structured Data",
    badge: "Rich Snippets",
    iconName: "HelpCircle",
    popular: true,
    intro: "Build comprehensive question-and-answer sections for any page topic and instantly generate clean Schema.org FAQPage JSON-LD markup.",
    explanation: {
      whatIsIt: "FAQ schema is structured data markup that tags questions and answers so search engines can display them directly under your search result snippet.",
      whyItMatters: "FAQ rich snippets expand your listing height in search results, pushing competitors down and answering buyer objections before they even click.",
      bestPractices: [
        "The FAQ content in your schema MUST be visibly displayed on the webpage to users.",
        "Do not use FAQ schema for advertising slogans; provide genuine, informative answers.",
        "Keep answers concise, direct, and helpful (typically 2 to 4 sentences)."
      ]
    },
    faqs: [
      { q: "Can I put any question in FAQ schema?", a: "The questions should reflect common customer inquiries directly related to the page topic." },
      { q: "Does Google show FAQ snippets for all sites?", a: "Google primarily displays FAQ rich snippets for high-authority, well-structured resources. Having correct schema ensures eligibility." }
    ],
    relatedSlugs: ["schema-markup-generator", "howto-schema-generator", "featured-snippet-optimizer"]
  },
  {
    id: "tool-24",
    slug: "howto-schema-generator",
    name: "HowTo Schema Generator",
    shortDesc: "Build step-by-step guides with supply lists, tool requirements, and valid HowTo JSON-LD.",
    category: "Schema & Structured Data",
    badge: "Step-by-Step",
    iconName: "ListOrdered",
    intro: "Create step-by-step tutorial markup containing steps, descriptions, estimated times, supplies, tools, and images ready for Google rich results.",
    explanation: {
      whatIsIt: "HowTo schema tells search engines that your content is a step-by-step instructional guide showing users how to complete a specific task.",
      whyItMatters: "HowTo rich results can display numbered steps, supplies, and images right in Google Search and Google Assistant voice results.",
      bestPractices: [
        "Include clear step names (e.g. 'Step 1: Download the Software') and detailed step instructions.",
        "Add estimated completion time (`totalTime`) in ISO 8601 duration format (e.g., PT30M).",
        "Ensure all steps match visible content on your web page."
      ]
    },
    faqs: [
      { q: "Can I use HowTo schema for recipes?", a: "No, recipes should use the dedicated `Recipe` schema type, which supports ingredients, nutrition, and calories." },
      { q: "Are images required for each step?", a: "Images are optional, but including step images increases rich visual snippet eligibility." }
    ],
    relatedSlugs: ["schema-markup-generator", "faq-schema-generator", "featured-snippet-optimizer"]
  },
  {
    id: "tool-25",
    slug: "local-business-schema",
    name: "Local Business Schema Generator",
    shortDesc: "Generate deep LocalBusiness structured data with opening hours, coordinates, and contact points.",
    category: "Schema & Structured Data",
    badge: "Google Maps",
    iconName: "Building2",
    popular: true,
    intro: "Generate comprehensive LocalBusiness schema with business name, geo-coordinates, street address, telephone, price range, opening hours, and accepted payment methods.",
    explanation: {
      whatIsIt: "LocalBusiness structured data provides search engines with standardized machine-readable details about a physical enterprise or local service agency.",
      whyItMatters: "Search engines connect LocalBusiness schema directly to Google Maps Knowledge Panels, driving local phone calls, direction requests, and organic walk-ins.",
      bestPractices: [
        "Ensure the business address, phone, and name match your Google Business Profile verbatim.",
        "Include exact latitude and longitude coordinates for map pinning.",
        "Specify valid ISO opening hours (e.g., Mo-Fr 09:00-18:00)."
      ]
    },
    faqs: [
      { q: "What business types are supported?", a: "ProfessionalService, LegalService, MedicalBusiness, Restaurant, Store, FinancialService, HomeAndConstructionBusiness, and generic LocalBusiness." },
      { q: "Where do I insert the generated code?", a: "Place the JSON-LD script inside the `<head>` or `<body>` tag of your homepage and contact page." }
    ],
    relatedSlugs: ["local-seo-audit-tool", "schema-markup-generator", "meta-title-description-generator"]
  },
  {
    id: "tool-26",
    slug: "core-web-vitals-checker",
    name: "Core Web Vitals Checker",
    shortDesc: "Evaluate LCP, INP/FID, CLS, FCP, and TTFB against Google's official performance thresholds.",
    category: "Speed & Performance",
    badge: "Speed Metrics",
    iconName: "Activity",
    popular: true,
    intro: "Test any website URL against Google's Core Web Vitals criteria: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).",
    explanation: {
      whatIsIt: "Core Web Vitals are Google's standardized user experience metrics measuring loading speed (LCP), interactivity (INP), and visual layout stability (CLS).",
      whyItMatters: "Core Web Vitals are official Google Page Experience ranking factors. Sites with passing scores enjoy higher mobile search rankings and significantly higher conversion rates.",
      bestPractices: [
        "Target LCP under 2.5 seconds by optimizing hero images and leveraging fast server response times.",
        "Keep CLS under 0.1 by reserving width and height dimensions on all images, ads, and embeds.",
        "Keep INP under 200 milliseconds by minimizing heavy JavaScript execution on the main thread."
      ]
    },
    faqs: [
      { q: "What replaced FID in 2024?", a: "Interaction to Next Paint (INP) replaced First Input Delay (FID) as the official responsiveness Core Web Vital." },
      { q: "What is a good Cumulative Layout Shift (CLS) score?", a: "A CLS score of 0.1 or lower is considered 'Good' by Google." }
    ],
    relatedSlugs: ["pagespeed-fix-recommendation-tool", "seo-audit-checker", "image-alt-text-generator"]
  },
  {
    id: "tool-27",
    slug: "pagespeed-fix-recommendation-tool",
    name: "PageSpeed Fix Recommendation Tool",
    shortDesc: "Get actionable copy-paste code fixes for render blocking assets, image encoding, and caching.",
    category: "Speed & Performance",
    badge: "Fix Library",
    iconName: "Wrench",
    intro: "Access targeted code snippets, configuration rules, and optimizations to resolve common Google PageSpeed Insights opportunities.",
    explanation: {
      whatIsIt: "The PageSpeed Fix Recommendation Tool provides tailored, ready-to-deploy code snippets (Apache, Nginx, WordPress, and Next.js) to resolve specific speed bottlenecks.",
      whyItMatters: "PageSpeed audit reports diagnose issues, but developers often struggle to write the exact server configurations or caching headers needed to fix them.",
      bestPractices: [
        "Enable Gzip or Brotli compression on all text assets (HTML, CSS, JS, SVG).",
        "Set long-term `Cache-Control: max-age=31536000, immutable` headers on versioned static assets.",
        "Defer or asynchronously load non-critical third-party analytics and tracking tags."
      ]
    },
    faqs: [
      { q: "How much faster will my site load with Brotli compression?", a: "Brotli typically compresses files 15-25% smaller than Gzip, saving significant network transfer time on mobile devices." },
      { q: "Can I apply these fixes on shared hosting?", a: "Yes, many fixes can be added directly into your `.htaccess` file on shared hosting." }
    ],
    relatedSlugs: ["core-web-vitals-checker", "seo-audit-checker", "301-redirect-generator"]
  },
  {
    id: "tool-28",
    slug: "featured-snippet-optimizer",
    name: "Featured Snippet Optimizer",
    shortDesc: "Format paragraphs, lists, and tables to capture Google Position Zero answer boxes.",
    category: "Content & On-Page",
    badge: "Position Zero",
    iconName: "Award",
    popular: true,
    intro: "Structure your content to win Google's Position Zero with optimized 40-50 word definition paragraphs, numbered process lists, and comparison tables.",
    explanation: {
      whatIsIt: "A Featured Snippet is an extracted summary of an answer to a user's query displayed at the very top of Google search results above standard organic rankings.",
      whyItMatters: "Capturing a Featured Snippet steals the highest visibility position on the page and can drive up to 35% of all organic clicks for that query.",
      bestPractices: [
        "Provide a direct definition starting with '[Topic] is...' within 40 to 50 words immediately under an H2 question.",
        "Use clean HTML `<ol>` and `<ul>` tags for step-by-step or ranked item queries.",
        "Format comparison queries with clean, semantic HTML `<table>` elements."
      ]
    },
    faqs: [
      { q: "What are the three main types of featured snippets?", a: "Paragraph snippets (approx. 70% of snippets), List snippets (ordered or unordered), and Table snippets." },
      { q: "Do I have to rank on page 1 to win a snippet?", a: "Yes, in 99% of cases, your page must already rank on page 1 (positions 1-10) before Google selects it for Position Zero." }
    ],
    relatedSlugs: ["ai-aeo-geo-checker", "faq-schema-generator", "content-gap-analyzer"]
  },
  {
    id: "tool-29",
    slug: "ai-citation-mention-checker",
    name: "AI Citation / Mention Checker",
    shortDesc: "Evaluate entity recognizability, author credibility citations, and AI quotation potential.",
    category: "AI, AEO & GEO",
    badge: "Entity Citations",
    iconName: "Bot",
    intro: "Analyze your brand's digital entity footprint, author credential transparency, and readiness to be cited as an authoritative reference in AI engines.",
    explanation: {
      whatIsIt: "The AI Citation Checker evaluates whether your brand, key personnel, and data claims possess the structured credibility required by generative engines (ChatGPT, Claude, Gemini, Perplexity) to cite your domain as a source.",
      whyItMatters: "As search evolves into conversational answers, AI models prefer citing brands that have clear entity connections, verifiable author bios, and structured schema representation.",
      bestPractices: [
        "Include rich `sameAs` links in your Organization and Person schema to verified profiles (LinkedIn, Crunchbase, Wikipedia).",
        "Publish original data studies, proprietary benchmarks, and industry surveys that AI models naturally cite.",
        "Maintain consistent author bylines with genuine credentials on all editorial content."
      ]
    },
    faqs: [
      { q: "How do AI models decide which sources to cite?", a: "They prioritize factual consensus, entity reputation in knowledge graphs, content freshness, and clarity of the direct answer." },
      { q: "Does Wikipedia or Wikidata help AI citations?", a: "Yes, Wikidata and Wikipedia are primary training nodes for foundational knowledge graphs." }
    ],
    relatedSlugs: ["ai-aeo-geo-checker", "geo-content-optimizer", "schema-markup-generator"]
  },
  {
    id: "tool-30",
    slug: "geo-content-optimizer",
    name: "GEO Content Optimizer",
    shortDesc: "Generative Engine Optimization: optimize for AI Overviews, Perplexity, and Claude synthesis.",
    category: "AI, AEO & GEO",
    badge: "GEO Engine",
    iconName: "Cpu",
    popular: true,
    intro: "Optimize page content for Generative Engine Optimization (GEO) with statistical claim structuring, entity co-occurrences, and conversational summary blocks.",
    explanation: {
      whatIsIt: "Generative Engine Optimization (GEO) is the practice of tailoring text, structure, and factual density so generative AI synthesis algorithms select and highlight your content in AI responses.",
      whyItMatters: "Studies show that incorporating authoritative quotation density, structured statistics, and direct comparison data points increases AI engine citation rates by 30-40%.",
      bestPractices: [
        "Include concrete numerical data, percentages, and verifiable timelines in key arguments.",
        "Add an executive summary or bulleted key takeaways block at the top of long articles.",
        "Use conversational question-based H2 subheadings with direct explanatory answers."
      ]
    },
    faqs: [
      { q: "Is GEO replacing traditional SEO?", a: "No, GEO complements SEO. Strong traditional technical and on-page fundamentals remain prerequisite signals for AI discovery." },
      { q: "What is statistical citation density?", a: "It refers to the frequency of verifiable facts, figures, and research references that demonstrate genuine subject matter authority." }
    ],
    relatedSlugs: ["ai-aeo-geo-checker", "ai-citation-mention-checker", "featured-snippet-optimizer"]
  }
];

// Alias for backwards compatibility
export const SEO_TOOLS_DATA: SeoToolDef[] = SEO_TOOLS_LIST;

export function getToolBySlug(slug?: string): SeoToolDef | undefined {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim();
  const direct = SEO_TOOLS_LIST.find((t) => t.slug.toLowerCase() === clean);
  if (direct) return direct;

  const aliasMap: Record<string, string> = {
    "keyword-clustering": "keyword-clustering-tool",
    "search-intent-analyzer": "search-intent-checker",
    "robots-txt-generator": "robots-txt-generator-tester",
    "robots-txt-tester": "robots-txt-generator-tester",
    "local-seo-audit": "local-seo-audit-tool",
    "internal-link-analyzer": "internal-link-finder",
    "ai-search-readiness": "ai-aeo-geo-checker",
    "canonical-checker": "canonical-url-checker",
    "image-alt-text-checker": "image-alt-text-generator",
    "meta-tag-generator": "meta-title-description-generator",
    "serp-simulator": "meta-title-description-generator",
    "pagespeed-estimator": "core-web-vitals-checker",
    "mobile-friendly-test": "seo-audit-checker"
  };

  const targetSlug = aliasMap[clean];
  if (targetSlug) {
    return SEO_TOOLS_LIST.find((t) => t.slug === targetSlug);
  }

  return SEO_TOOLS_LIST.find((t) => clean.includes(t.slug) || t.slug.includes(clean));
}
