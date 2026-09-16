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
  metaTitle: string;
  metaDescription: string;
  intro: string;
  howToUse: Array<{ step: number; title: string; desc: string }>;
  benefits: Array<{ title: string; desc: string }>;
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
    "id": "tool-1",
    "slug": "seo-audit-checker",
    "name": "SEO Audit Checker",
    "shortDesc": "Comprehensive on-page and technical website health inspection with actionable fix guidelines.",
    "category": "Technical & Audit",
    "badge": "Real Engine",
    "iconName": "ShieldCheck",
    "popular": true,
    "metaTitle": "Free SEO Audit Checker Online | Metazivo SEO Tools",
    "metaDescription": "Free online SEO Audit Checker by Metazivo. Check technical and on-page SEO issues, fix crawl errors, and get actionable ranking recommendations instantly.",
    "intro": "Analyze any web page for critical technical errors, missing meta tags, heading hierarchies, mobile viewport issues, structured data, and crawlability blockers.",
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Website URL",
        "desc": "Paste the complete URL of the web page you want to inspect into the diagnostic field."
      },
      {
        "step": 2,
        "title": "Run Instant Health Audit",
        "desc": "Click the Run Audit button to analyze status codes, meta tags, headings, and indexability."
      },
      {
        "step": 3,
        "title": "Apply Prioritized Fixes",
        "desc": "Review identified technical warnings and follow step-by-step instructions to resolve issues."
      }
    ],
    "benefits": [
      {
        "title": "Instant Issue Detection",
        "desc": "Catch broken links, missing canonical tags, and metadata errors before they damage rankings."
      },
      {
        "title": "Prioritized Fix Guidelines",
        "desc": "Receive practical, developer-ready steps tailored to Google's ranking algorithms."
      },
      {
        "title": "100% Free & Unlimited",
        "desc": "Audit your own pages, client websites, or competitor domains with zero sign-up required."
      }
    ],
    "explanation": {
      "whatIsIt": "The SEO Audit Checker runs an in-depth diagnostic scan on any web page to evaluate search engine crawlability, content optimization, and metadata health.",
      "whyItMatters": "Unresolved technical errors such as missing canonical tags, broken links, non-responsive viewports, or missing meta descriptions prevent Googlebot from indexing and ranking your pages.",
      "bestPractices": [
        "Ensure your status code returns HTTP 200 OK without unneeded redirect chains.",
        "Include exactly one descriptive H1 tag matching your primary search intent.",
        "Add self-referencing canonical tags to protect against duplicate content penalties."
      ]
    },
    "faqs": [
      {
        "q": "How often should I run an SEO audit?",
        "a": "We recommend running a technical audit at least once a month, or immediately after deploying theme updates or site redesigns."
      },
      {
        "q": "Does this audit check both mobile and desktop signals?",
        "a": "Yes, it verifies mobile viewport declarations, touch-friendly layouts, HTTPS encryption, and desktop indexability signals."
      }
    ],
    "relatedSlugs": [
      "broken-link-checker",
      "canonical-tag-checker",
      "core-web-vitals-checker"
    ]
  },
  {
    "id": "tool-2",
    "slug": "keyword-clustering-tool",
    "name": "Keyword Clustering Tool",
    "shortDesc": "Group large keyword lists into topical clusters with primary targets, search intent, and page architecture.",
    "category": "Keywords & Strategy",
    "badge": "Algorithm",
    "iconName": "Network",
    "popular": true,
    "metaTitle": "Free Keyword Clustering Tool Online | Metazivo Tools",
    "metaDescription": "Free online Keyword Clustering Tool by Metazivo. Group search queries into high-converting topical clusters to build authoritative content hubs easily.",
    "intro": "Transform hundreds of scattered search queries into high-converting topical clusters to build comprehensive content hubs without keyword cannibalization.",
    "howToUse": [
      {
        "step": 1,
        "title": "Paste Keyword List",
        "desc": "Enter or paste your raw keywords, search queries, or spreadsheet export into the cluster input box."
      },
      {
        "step": 2,
        "title": "Set Clustering Threshold",
        "desc": "Select semantic similarity grouping and click Cluster Keywords to run the organizational algorithm."
      },
      {
        "step": 3,
        "title": "Export Content Architecture",
        "desc": "Review parent topics, secondary keyword variations, and suggested page hierarchy."
      }
    ],
    "benefits": [
      {
        "title": "Eliminate Cannibalization",
        "desc": "Stop multiple pages on your domain from competing against each other for the same query."
      },
      {
        "title": "Streamline Content Strategy",
        "desc": "Plan comprehensive pillar guides and cluster articles based on semantic relationship groupings."
      },
      {
        "title": "Save Hours of Manual Tagging",
        "desc": "Automatically categorize hundreds of keywords in seconds with zero manual spreadsheet formulas."
      }
    ],
    "explanation": {
      "whatIsIt": "Keyword clustering groups semantically related search terms together so you can target multiple long-tail keywords with a single authoritative page instead of creating thin duplicate posts.",
      "whyItMatters": "Modern search engines rank topical depth. Targeting individual keywords with separate articles causes keyword cannibalization and dilutes your domain's organic authority.",
      "bestPractices": [
        "Focus each page on one primary parent keyword and 4-8 semantic secondary variations.",
        "Map transactional clusters to landing or service pages and informational clusters to long-form guides.",
        "Create bi-directional internal links between pillar guides and cluster sub-topics."
      ]
    },
    "faqs": [
      {
        "q": "How many keywords can I cluster at once?",
        "a": "You can paste up to 1,000 keywords at a time. The algorithm will automatically deduplicate and normalize them."
      },
      {
        "q": "Does it keep keyword variations?",
        "a": "Yes, meaningful syntactic variations are preserved while punctuation and redundant casing are normalized."
      }
    ],
    "relatedSlugs": [
      "search-intent-checker",
      "topical-map-generator",
      "keyword-cannibalization-checker"
    ]
  },
  {
    "id": "tool-3",
    "slug": "search-intent-checker",
    "name": "Search Intent Checker",
    "shortDesc": "Classify keywords into Informational, Commercial, Transactional, Navigational, Local, or Comparison.",
    "category": "Keywords & Strategy",
    "badge": "Smart Intent",
    "iconName": "Compass",
    "popular": true,
    "metaTitle": "Free Search Intent Checker Online | Metazivo SEO Tools",
    "metaDescription": "Free online Search Intent Checker by Metazivo. Classify search queries into informational, commercial, or transactional intent to boost ranking success.",
    "intro": "Identify the psychological intention behind search queries to select the exact page structure, format, and call-to-action that matches user expectations.",
    "howToUse": [
      {
        "step": 1,
        "title": "Input Search Queries",
        "desc": "Type single or multiple keywords you want to target with your content marketing campaign."
      },
      {
        "step": 2,
        "title": "Analyze Intent Breakdown",
        "desc": "Click Analyze Intent to uncover user motivation, intent probability scores, and SERP expectations."
      },
      {
        "step": 3,
        "title": "Align Page Layout",
        "desc": "Format your landing page, comparison table, or guide to match the identified search purpose."
      }
    ],
    "benefits": [
      {
        "title": "Reduce High Bounce Rates",
        "desc": "Satisfy user search intent immediately upon arrival to keep visitors engaged and browsing."
      },
      {
        "title": "Higher Conversion Rates",
        "desc": "Match high-intent commercial and transactional queries with high-converting landing pages."
      },
      {
        "title": "Accurate SERP Alignment",
        "desc": "Discover whether Google favors blog articles, product categories, or video content for your term."
      }
    ],
    "explanation": {
      "whatIsIt": "Search intent (or user intent) is the underlying goal a person has when typing a query into Google. It dictates what kind of content Google chooses to rank.",
      "whyItMatters": "If a user is searching with transactional intent ('buy running shoes') and you serve an informational history essay, they will bounce immediately, signaling poor relevance to Google.",
      "bestPractices": [
        "Align landing pages with transactional or commercial comparison keywords.",
        "Reserve informational queries for how-to guides, FAQs, and step-by-step documentation.",
        "Include clear calls to action matched to the user's stage in the buying journey."
      ]
    },
    "faqs": [
      {
        "q": "What are the six intent categories supported?",
        "a": "Informational (learn), Commercial (evaluate options), Transactional (buy/hire), Navigational (brand destination), Local (geographic services), and Comparison (vs / alternatives)."
      },
      {
        "q": "Can a keyword have mixed intent?",
        "a": "Some keywords show hybrid intent; our tool highlights the dominant primary intent along with the recommended content blueprint."
      }
    ],
    "relatedSlugs": [
      "keyword-clustering-tool",
      "content-gap-analyzer",
      "featured-snippet-optimizer"
    ]
  },
  {
    "id": "tool-4",
    "slug": "schema-markup-generator",
    "name": "Schema Markup Generator",
    "shortDesc": "Generate error-free Schema.org JSON-LD for Articles, Products, Services, FAQ, HowTo, and Organizations.",
    "category": "Schema & Structured Data",
    "badge": "JSON-LD",
    "iconName": "Code",
    "popular": true,
    "metaTitle": "Free Schema Markup Generator Tool | Metazivo SEO Tools",
    "metaDescription": "Free online Schema Markup Generator by Metazivo. Build valid Schema.org JSON-LD code for articles, FAQs, products, and local businesses in seconds.",
    "intro": "Build pristine structured data that search engines use to display rich snippets, star ratings, FAQs, author credentials, and enhanced search listings.",
    "howToUse": [
      {
        "step": 1,
        "title": "Choose Schema Type",
        "desc": "Select from Article, FAQ, Product, Service, LocalBusiness, HowTo, Organization, or Breadcrumbs."
      },
      {
        "step": 2,
        "title": "Fill In Structured Fields",
        "desc": "Complete the guided form with your page title, author, dates, prices, or questions."
      },
      {
        "step": 3,
        "title": "Copy Valid JSON-LD",
        "desc": "Copy the generated script code and paste it directly into the <head> section of your web page."
      }
    ],
    "benefits": [
      {
        "title": "Higher SERP Click-Throughs",
        "desc": "Earn visual rich snippets including star reviews, expandable FAQs, and breadcrumbs in Google."
      },
      {
        "title": "100% Google-Compliant",
        "desc": "Strictly adheres to official Schema.org standards to prevent search console validation errors."
      },
      {
        "title": "No Coding Required",
        "desc": "Easily generate complex structured markup without writing manual syntax or escaping quotes."
      }
    ],
    "explanation": {
      "whatIsIt": "Schema markup is machine-readable JSON-LD code added to your HTML that explicitly tells search engines what your content represents.",
      "whyItMatters": "Rich snippets can increase organic click-through rates (CTR) by up to 30% by claiming visual real estate in Google SERPs.",
      "bestPractices": [
        "Always test your generated JSON-LD in Google's Rich Results Test tool.",
        "Never invent fake review ratings or author bios; keep structured data truthful.",
        "Embed the code inside `<script type=\"application/ld+json\">` in your head or body."
      ]
    },
    "faqs": [
      {
        "q": "Which schema types are supported?",
        "a": "Article, FAQPage, HowTo, Product, Service, LocalBusiness, Organization, Person, BreadcrumbList, Event, WebSite, WebPage, and Review."
      },
      {
        "q": "Is JSON-LD preferred over Microdata?",
        "a": "Yes, Google officially recommends JSON-LD because it is cleaner, decoupled from HTML markup, and easier to maintain."
      }
    ],
    "relatedSlugs": [
      "faq-schema-generator",
      "howto-schema-generator",
      "local-business-schema"
    ]
  },
  {
    "id": "tool-5",
    "slug": "local-seo-audit-tool",
    "name": "Local SEO Audit Tool",
    "shortDesc": "Audit business NAP consistency, Google Business Profile signals, and local landing page targeting.",
    "category": "Technical & Audit",
    "badge": "Local Signals",
    "iconName": "MapPin",
    "metaTitle": "Free Local SEO Audit Tool Online | Metazivo SEO Tools",
    "metaDescription": "Free online Local SEO Audit Tool by Metazivo. Audit business NAP consistency, Google Business Profile signals, and local landing page rankings instantly.",
    "intro": "Verify local search signals including Name, Address, Phone (NAP) uniformity, LocalBusiness schema, geo coordinates, and city landing page targeting.",
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Local Business Info",
        "desc": "Provide your business name, street address, telephone, and target city or service territory."
      },
      {
        "step": 2,
        "title": "Check NAP & Geo Signals",
        "desc": "Run the audit to compare website markup against standard local search visibility factors."
      },
      {
        "step": 3,
        "title": "Fix Inconsistencies",
        "desc": "Follow recommendations to correct formatting errors and deploy localized structured data."
      }
    ],
    "benefits": [
      {
        "title": "Dominate Google 3-Pack",
        "desc": "Strengthen local relevance signals to climb into Google Maps top three local pack rankings."
      },
      {
        "title": "Eliminate NAP Confusion",
        "desc": "Detect mismatched phone formats, street abbreviations, and missing postal codes across profiles."
      },
      {
        "title": "Geo-Targeted Rankings",
        "desc": "Optimize location-specific landing pages for localized 'near me' and city-specific keywords."
      }
    ],
    "explanation": {
      "whatIsIt": "Local SEO audit evaluates whether your website and local profiles clearly communicate your physical location, service areas, and contact details to search bots.",
      "whyItMatters": "Inconsistent addresses or telephone formats between your website and directories cause search engines to lose confidence in your geographic location, dropping your Google Maps rankings.",
      "bestPractices": [
        "Use exact match NAP across your header, footer, Google Business Profile, and directories.",
        "Implement LocalBusiness structured data with exact latitude, longitude, and opening hours.",
        "Create dedicated localized service landing pages for each target city or neighborhood."
      ]
    },
    "faqs": [
      {
        "q": "What does NAP stand for?",
        "a": "NAP stands for Name, Address, and Phone Number. Strict consistency is a foundational local ranking factor."
      },
      {
        "q": "Can I audit service-area businesses without a physical storefront?",
        "a": "Yes, you can specify your service cities and area served radius."
      }
    ],
    "relatedSlugs": [
      "local-business-schema",
      "seo-audit-checker",
      "meta-title-description-generator"
    ]
  },
  {
    "id": "tool-6",
    "slug": "internal-link-finder",
    "name": "Internal Link Finder",
    "shortDesc": "Discover contextual internal link opportunities and optimized anchor text between pages.",
    "category": "Keywords & Strategy",
    "badge": "Site Architecture",
    "iconName": "Link2",
    "metaTitle": "Free Internal Link Finder Tool | Metazivo SEO Suite",
    "metaDescription": "Free online Internal Link Finder by Metazivo. Discover contextual internal linking opportunities and optimized anchor text to pass PageRank authority.",
    "intro": "Strengthen your site architecture and PageRank distribution by identifying high-value internal link relationships and natural keyword anchors.",
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Page Content & Target",
        "desc": "Paste your article draft or enter your source page and destination topic URLs."
      },
      {
        "step": 2,
        "title": "Analyze Link Opportunities",
        "desc": "Click Find Links to scan for semantic keyword anchors that naturally fit your link target."
      },
      {
        "step": 3,
        "title": "Insert Contextual Anchors",
        "desc": "Place links using natural, descriptive anchor phrases to guide readers and search bots."
      }
    ],
    "benefits": [
      {
        "title": "Distribute PageRank Equity",
        "desc": "Funnel link equity from top-performing articles down to newly published or underperforming pages."
      },
      {
        "title": "Eliminate Orphan Pages",
        "desc": "Ensure every critical page on your site has strong contextual internal links pointing to it."
      },
      {
        "title": "Boost Topical Authority",
        "desc": "Create coherent topic clusters that demonstrate deep subject matter expertise to Google."
      }
    ],
    "explanation": {
      "whatIsIt": "The Internal Link Finder scans your page topics, titles, and content bodies to highlight relevant linking opportunities that pass contextual equity throughout your site.",
      "whyItMatters": "Search engine bots discover and prioritize pages through links. Strategic internal links help index deep pages, keep bounce rates low, and establish topical authority.",
      "bestPractices": [
        "Use descriptive, keyword-rich anchor text rather than generic phrases like 'click here'.",
        "Link from high-authority pillar articles down to specific cluster sub-guides.",
        "Ensure orphan pages (pages with zero incoming links) are given contextual linkages."
      ]
    },
    "faqs": [
      {
        "q": "How many internal links should a post have?",
        "a": "A standard 1,500-word article typically benefits from 3 to 8 relevant internal links to related guides or conversion pages."
      },
      {
        "q": "Do internal links help with crawl budget?",
        "a": "Yes, they provide explicit crawl paths for Googlebot to navigate without getting trapped."
      }
    ],
    "relatedSlugs": [
      "keyword-clustering-tool",
      "topical-map-generator",
      "broken-link-checker"
    ]
  },
  {
    "id": "tool-7",
    "slug": "meta-title-description-generator",
    "name": "Meta Title & Description Generator",
    "shortDesc": "Generate high-converting, SERP-safe meta titles (50-60 chars) and meta descriptions (140-155 chars).",
    "category": "Content & On-Page",
    "badge": "SERP Optimizer",
    "iconName": "Type",
    "popular": true,
    "metaTitle": "Free Meta Title & Description Generator | Metazivo Tools",
    "metaDescription": "Free online Meta Title & Description Generator by Metazivo. Create click-worthy, search-optimized meta tags with live Google snippet character counters.",
    "intro": "Craft natural, compelling meta titles and descriptions designed to strictly avoid Google SERP truncation while maximizing organic click-through rates.",
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Primary Keyword",
        "desc": "Type your main target keyword and provide a concise summary of your webpage offer."
      },
      {
        "step": 2,
        "title": "Generate Optimized Snippets",
        "desc": "Click Generate to receive tailored meta title options (50-60 chars) and descriptions (140-155 chars)."
      },
      {
        "step": 3,
        "title": "Copy & Verify Live Preview",
        "desc": "Check the Google desktop and mobile SERP preview, then copy the ready HTML meta tags."
      }
    ],
    "benefits": [
      {
        "title": "No Google SERP Truncation",
        "desc": "Guaranteed character counts prevent embarrassing cut-offs (...) on desktop and mobile displays."
      },
      {
        "title": "Higher Organic Click Rates",
        "desc": "Proven copywriting frameworks and dynamic call-to-action hooks drive more search clicks."
      },
      {
        "title": "Live Desktop & Mobile Preview",
        "desc": "Visualize how your URL, title, and snippet appear in authentic Google search results."
      }
    ],
    "explanation": {
      "whatIsIt": "Meta titles and descriptions are HTML head elements that determine how your webpage snippet appears on Google search results pages.",
      "whyItMatters": "Titles that exceed 60 characters get cut off with ellipses (...). Descriptions between 140-155 characters maximize informative space and user engagement.",
      "bestPractices": [
        "Keep meta titles strictly between 50 and 60 characters (or under 580 pixels).",
        "Include your primary keyword near the beginning of the title tag.",
        "Write meta descriptions with an active voice and an explicit value proposition or CTA."
      ]
    },
    "faqs": [
      {
        "q": "Why does Google sometimes rewrite my meta title?",
        "a": "Google rewrites titles if they consider the original title too long, keyword-stuffed, or poorly aligned with user search queries."
      },
      {
        "q": "Can I edit the generated snippets before copying?",
        "a": "Yes, all suggestions are fully editable in real time with live character counting."
      }
    ],
    "relatedSlugs": [
      "open-graph-generator",
      "twitter-card-generator",
      "featured-snippet-optimizer"
    ]
  },
  {
    "id": "tool-8",
    "slug": "website-speed-test",
    "name": "Website Speed Test",
    "shortDesc": "Real-time Core Web Vitals, TTFB, and PageSpeed performance diagnostics with code-level fix guidelines.",
    "category": "Speed & Performance",
    "badge": "Speed Test",
    "iconName": "Activity",
    "popular": true,
    "metaTitle": "Free Website Speed Test Online | Metazivo Performance",
    "metaDescription": "Free online Website Speed Test by Metazivo. Test real-time page loading speed, Core Web Vitals, TTFB, and get actionable performance fixes instantly.",
    "intro": "Test real-world website loading speeds, measure Time to First Byte (TTFB) and Core Web Vitals (LCP, INP, CLS), and get exact code fixes to rank higher on Google.",
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Website URL",
        "desc": "Type or paste the URL of the page you want to benchmark into the performance diagnostic input."
      },
      {
        "step": 2,
        "title": "Select Testing Device",
        "desc": "Choose Mobile or Desktop simulation to assess device-specific rendering performance."
      },
      {
        "step": 3,
        "title": "Review Actionable Fixes",
        "desc": "Examine your Lighthouse scores, server response time, render-blocking scripts, and asset savings."
      }
    ],
    "benefits": [
      {
        "title": "Real-Time Socket Inspection",
        "desc": "Genuine server probe measuring true TTFB, DNS lookup latency, and compression headers."
      },
      {
        "title": "Core Web Vitals Breakdown",
        "desc": "Accurate measurements of Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and CLS."
      },
      {
        "title": "Lower Google Ads CPC",
        "desc": "Faster landing page speeds improve Quality Score, lowering cost-per-click on paid campaigns."
      }
    ],
    "explanation": {
      "whatIsIt": "Website Speed Test executes a comprehensive performance crawl measuring asset sizes, render-blocking resources, server response times, and Core Web Vitals metrics.",
      "whyItMatters": "Google explicitly uses page speed and Core Web Vitals as mobile ranking factors. Slow pages experience high bounce rates and lower organic conversions.",
      "bestPractices": [
        "Aim for a Time to First Byte (TTFB) under 200 milliseconds.",
        "Serve modern next-gen image formats (AVIF and WebP) with explicit width and height dimensions.",
        "Eliminate render-blocking CSS and defer non-critical JavaScript execution."
      ]
    },
    "faqs": [
      {
        "q": "Why are mobile scores usually lower than desktop?",
        "a": "Mobile tests simulate mid-tier mobile processors and 4G cellular throttling, exposing rendering delays."
      },
      {
        "q": "What is considered a passing Core Web Vitals score?",
        "a": "LCP under 2.5s, INP under 200ms, and Cumulative Layout Shift (CLS) under 0.1."
      }
    ],
    "relatedSlugs": [
      "core-web-vitals-checker",
      "pagespeed-fix-recommendation-tool",
      "seo-audit-checker"
    ]
  },
  {
    "id": "tool-9",
    "slug": "robots-txt-generator",
    "name": "Robots.txt Generator",
    "shortDesc": "Build and test clean robots.txt directives for Googlebot, Bingbot, and generative AI web scrapers.",
    "category": "Technical & Audit",
    "badge": "Crawler Control",
    "iconName": "FileCode",
    "popular": true,
    "metaTitle": "Free Robots.txt Generator & Tester | Metazivo Tools",
    "metaDescription": "Free online Robots.txt Generator by Metazivo. Create and test error-free robots.txt files with custom crawl rules for Googlebot and search engines.",
    "intro": "Generate customized robots.txt files with Allow, Disallow, Sitemap, and Crawl-delay rules, plus test whether specific URLs are allowed or blocked.",
    "howToUse": [
      {
        "step": 1,
        "title": "Configure Crawl Directives",
        "desc": "Select search engine user-agents and specify folders to allow or disallow from crawling."
      },
      {
        "step": 2,
        "title": "Add Canonical Sitemap",
        "desc": "Insert your complete XML sitemap URL so crawlers immediately index your primary pages."
      },
      {
        "step": 3,
        "title": "Download or Test Rules",
        "desc": "Copy the generated file content or download robots.txt to upload directly to your web server root."
      }
    ],
    "benefits": [
      {
        "title": "Protect Sensitive Folders",
        "desc": "Prevent search spiders from crawling admin panels, internal search results, and staging URLs."
      },
      {
        "title": "Manage Crawl Budget",
        "desc": "Direct search engine spiders towards high-value ranking pages instead of low-value parameters."
      },
      {
        "title": "Control AI Web Scrapers",
        "desc": "Include specific instructions for LLM crawlers like GPTBot, CCBot, and ClaudeBot."
      }
    ],
    "explanation": {
      "whatIsIt": "Robots.txt is a text file located in your website's root directory that provides crawling guidelines to search engine robots and AI web spiders.",
      "whyItMatters": "A misconfigured robots.txt rule can accidentally de-index your entire website from Google, destroying organic revenue overnight.",
      "bestPractices": [
        "Always reference your full canonical XML sitemap URL at the end of the robots.txt.",
        "Disallow admin dashboards, internal search parameter pages, and checkout carts.",
        "Never block CSS or JavaScript files needed by Googlebot to render the page layout."
      ]
    },
    "faqs": [
      {
        "q": "Does robots.txt prevent a page from being indexed?",
        "a": "Not always. If other sites link to the URL, Google may still index the URL without snippet content. Use `noindex` tags to guarantee non-indexation."
      },
      {
        "q": "Can I block AI scrapers like GPTBot?",
        "a": "Yes, you can add custom `User-agent: GPTBot` directives with `Disallow: /`."
      }
    ],
    "relatedSlugs": [
      "xml-sitemap-generator",
      "seo-audit-checker",
      "canonical-tag-checker"
    ]
  },
  {
    "id": "tool-10",
    "slug": "xml-sitemap-generator",
    "name": "XML Sitemap Generator",
    "shortDesc": "Create valid, deduplicated XML sitemaps ready for submission to Google Search Console.",
    "category": "Technical & Audit",
    "badge": "Indexing",
    "iconName": "FileSpreadsheet",
    "popular": true,
    "metaTitle": "Free XML Sitemap Generator Tool | Metazivo SEO Suite",
    "metaDescription": "Free online XML Sitemap Generator by Metazivo. Generate Google-compliant XML sitemaps with custom change frequencies and priority tags in seconds.",
    "intro": "Build standards-compliant XML sitemaps with loc, lastmod, changefreq, and priority attributes to ensure prompt search engine discovery.",
    "howToUse": [
      {
        "step": 1,
        "title": "List Canonical URLs",
        "desc": "Paste your website pages or crawl export into the sitemap URL generator list."
      },
      {
        "step": 2,
        "title": "Configure Frequency & Priority",
        "desc": "Assign update frequencies (daily, weekly) and weighting priorities to your key landing pages."
      },
      {
        "step": 3,
        "title": "Export Valid XML",
        "desc": "Download the formatted sitemap.xml file and submit the URL in Google Search Console."
      }
    ],
    "benefits": [
      {
        "title": "Rapid Content Discovery",
        "desc": "Notify Googlebot of new blog posts and updated product pages immediately after publishing."
      },
      {
        "title": "100% Valid XML Syntax",
        "desc": "Eliminates encoding bugs, unescaped ampersands, and schema errors that cause console warnings."
      },
      {
        "title": "Crawl Efficiency",
        "desc": "Helps crawlers prioritize key revenue-generating service pages over dated informational archives."
      }
    ],
    "explanation": {
      "whatIsIt": "An XML sitemap is a structured inventory of all public, canonical pages on your website intended for search engines.",
      "whyItMatters": "Sitemaps help search bots discover newly published blog posts, updated service pages, and deep documentation without relying exclusively on crawling links.",
      "bestPractices": [
        "Include only 200 OK canonical URLs; exclude redirected, broken, or noindex pages.",
        "Keep individual sitemap files under 50,000 URLs and 50MB uncompressed.",
        "Submit your sitemap URL inside Google Search Console and Bing Webmaster Tools."
      ]
    },
    "faqs": [
      {
        "q": "Does Google respect the 'priority' and 'changefreq' tags?",
        "a": "Google primarily prioritizes the `<loc>` and `<lastmod>` timestamps, but having valid XML ensures broad multi-engine compatibility."
      },
      {
        "q": "Can I download the sitemap directly?",
        "a": "Yes, you can copy the XML or download the file as `sitemap.xml` with one click."
      }
    ],
    "relatedSlugs": [
      "robots-txt-generator",
      "seo-audit-checker",
      "hreflang-generator"
    ]
  },
  {
    "id": "tool-11",
    "slug": "broken-link-checker",
    "name": "Broken Link Checker",
    "shortDesc": "Scan web pages for dead links, 404 HTTP errors, and broken redirects to protect search crawlability.",
    "category": "Technical & Audit",
    "badge": "Link Health",
    "iconName": "Unlink",
    "popular": true,
    "metaTitle": "Free Broken Link Checker Online | Metazivo SEO Tools",
    "metaDescription": "Free online Broken Link Checker by Metazivo. Scan web pages for dead links, 404 errors, and broken redirects to protect search crawlability and UX.",
    "intro": "Detect dead hyperlinks, 404 page-not-found errors, and broken external links on any page to safeguard your user experience and search engine rankings.",
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Page URL or Text",
        "desc": "Paste the web page address or raw HTML content you want to inspect for link integrity."
      },
      {
        "step": 2,
        "title": "Scan All Hyperlinks",
        "desc": "Click Check Links to verify HTTP response status codes for internal and external links."
      },
      {
        "step": 3,
        "title": "Fix Broken Destinations",
        "desc": "Review 404 errors, update outdated destinations, or replace broken links with live URLs."
      }
    ],
    "benefits": [
      {
        "title": "Protect User Experience",
        "desc": "Prevent visitors from landing on frustrating dead ends that erode brand trust and hurt conversions."
      },
      {
        "title": "Preserve Crawl Budget",
        "desc": "Prevent search spiders from wasting precious crawling time encountering dead server paths."
      },
      {
        "title": "Stop PageRank Bleed",
        "desc": "Fix internal linking gaps to keep link equity circulating smoothly throughout your domain."
      }
    ],
    "explanation": {
      "whatIsIt": "The Broken Link Checker crawls all hyperlinks on a page, testing HTTP status codes to confirm every link reaches an active, live destination.",
      "whyItMatters": "Excessive broken links signal poor site maintenance to search engines, causing ranking demotions and increasing visitor bounce rates.",
      "bestPractices": [
        "Regularly check high-traffic pages and footer links for stale or altered URLs.",
        "Implement 301 redirects for deleted pages that still receive backlinks.",
        "Audit external resource links annually to replace dead citations."
      ]
    },
    "faqs": [
      {
        "q": "What causes broken links?",
        "a": "Renaming page URLs without setting redirects, deleting pages, or external third-party sites changing their structure."
      },
      {
        "q": "Is a 404 error bad for SEO?",
        "a": "Occasional 404s are normal, but widespread broken links on key pages frustrate users and disrupt search bot traversal."
      }
    ],
    "relatedSlugs": [
      "redirect-checker",
      "internal-link-finder",
      "seo-audit-checker"
    ]
  },
  {
    "id": "tool-12",
    "slug": "redirect-checker",
    "name": "Redirect Checker",
    "shortDesc": "Trace HTTP redirect paths, detect redirect loops, and verify 301, 302, and 307 status codes.",
    "category": "Technical & Audit",
    "badge": "Chain Tracer",
    "iconName": "Repeat",
    "metaTitle": "Free URL Redirect Checker Online | Metazivo SEO Tools",
    "metaDescription": "Free online Redirect Checker by Metazivo. Inspect 301, 302, 307 redirect chains, identify redirect loops, and trace final destination URLs instantly.",
    "intro": "Trace full HTTP redirect paths, detect multi-hop redirect chains, and verify whether redirects return permanent 301 or temporary 302 headers.",
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Target URL",
        "desc": "Type or paste the web address you want to follow through its redirection path."
      },
      {
        "step": 2,
        "title": "Trace HTTP Route",
        "desc": "Click Check Redirects to map every intermediate hop, status code, and response header."
      },
      {
        "step": 3,
        "title": "Eliminate Unnecessary Hops",
        "desc": "Point links directly to the final 200 OK destination to speed up load times and protect SEO."
      }
    ],
    "benefits": [
      {
        "title": "Eliminate Latency Delay",
        "desc": "Every intermediate redirect adds server round-trips; flattening chains improves TTFB speeds."
      },
      {
        "title": "Prevent Link Equity Dilution",
        "desc": "Ensure backlink authority passes directly to destination URLs without loss across chains."
      },
      {
        "title": "Fix Infinite Loops",
        "desc": "Spot circular redirect loops that crash browsers and prevent search engines from crawling content."
      }
    ],
    "explanation": {
      "whatIsIt": "The Redirect Checker tests the HTTP headers of a URL to follow every step of a redirection chain until reaching the final destination status.",
      "whyItMatters": "Long redirect chains dilute PageRank transfer and slow down page loading for mobile visitors. Chains longer than 3 hops can cause Googlebot to abort crawling.",
      "bestPractices": [
        "Use permanent 301 redirects for permanent page moves and canonical domain enforcement.",
        "Never chain redirects: always redirect directly from old URL A to current URL C.",
        "Audit site migrations to ensure old HTTP and non-www versions resolve in one single hop."
      ]
    },
    "faqs": [
      {
        "q": "What is the difference between a 301 and a 302 redirect?",
        "a": "A 301 signifies a permanent move and passes link authority; a 302 indicates a temporary shift and does not transfer ranking signals."
      },
      {
        "q": "How many redirect hops does Google tolerate?",
        "a": "Google recommends a maximum of one hop, and crawlers will usually abandon chains exceeding 4 to 5 hops."
      }
    ],
    "relatedSlugs": [
      "301-redirect-generator",
      "broken-link-checker",
      "canonical-tag-checker"
    ]
  },
  {
    "id": "tool-13",
    "slug": "canonical-tag-checker",
    "name": "Canonical Tag Checker",
    "shortDesc": "Verify rel=canonical declarations, detect self-referencing links, and resolve duplicate content issues.",
    "category": "Technical & Audit",
    "badge": "Duplicate Fix",
    "iconName": "CheckCheck",
    "metaTitle": "Free Canonical Tag Checker Online | Metazivo SEO Tools",
    "metaDescription": "Free online Canonical Tag Checker by Metazivo. Verify rel=canonical link tags, eliminate duplicate content risks, and ensure proper URL indexation.",
    "intro": "Inspect webpage canonical declarations to ensure search engines index the authoritative master version of your page and ignore duplicate URL parameters.",
    "howToUse": [
      {
        "step": 1,
        "title": "Input Web Page URL",
        "desc": "Enter the web address you want to inspect for canonical tag implementation."
      },
      {
        "step": 2,
        "title": "Verify Canonical Syntax",
        "desc": "Click Check Canonical to evaluate the HTML link rel=canonical header against the actual URL."
      },
      {
        "step": 3,
        "title": "Resolve Conflicting Directives",
        "desc": "Ensure the canonical tag points to an absolute, valid, 200 OK HTTPS destination."
      }
    ],
    "benefits": [
      {
        "title": "Prevent Duplicate Penalties",
        "desc": "Consolidate ranking power when identical content is accessible via multiple URL variations."
      },
      {
        "title": "Clean Search Console Reports",
        "desc": "Eliminate 'Duplicate without user-selected canonical' indexing exclusions in Google Search Console."
      },
      {
        "title": "Handle E-Commerce Filters",
        "desc": "Safely manage faceted navigation, sorting filters, and tracking query strings without cannibalization."
      }
    ],
    "explanation": {
      "whatIsIt": "A canonical tag (`<link rel=\"canonical\" href=\"...\">`) is an HTML snippet that tells search engines which URL represents the master, authoritative copy of a page.",
      "whyItMatters": "Websites often generate multiple URLs for the same product or article due to tracking parameters, sorting filters, or HTTP/HTTPS variants. Canonical tags prevent dilution.",
      "bestPractices": [
        "Always use absolute URLs (https://example.com/page) rather than relative paths.",
        "Ensure self-referencing canonical tags exist on standalone unique pages.",
        "Verify that canonicalized target pages return HTTP 200 OK status codes."
      ]
    },
    "faqs": [
      {
        "q": "Can a canonical tag point to a different domain?",
        "a": "Yes, cross-domain canonicals are supported and useful when syndicating articles across partner platforms."
      },
      {
        "q": "Is canonical a directive or a hint?",
        "a": "Google treats canonical tags as strong hints, but may ignore them if they conflict with sitemaps, internal links, or 301 redirects."
      }
    ],
    "relatedSlugs": [
      "seo-audit-checker",
      "redirect-checker",
      "robots-txt-generator"
    ]
  },
  {
    "id": "tool-14",
    "slug": "open-graph-generator",
    "name": "Open Graph Generator",
    "shortDesc": "Generate rich Open Graph meta tags for Facebook, LinkedIn, Discord, and Slack social share cards.",
    "category": "Content & On-Page",
    "badge": "Social Graph",
    "iconName": "Share2",
    "popular": true,
    "metaTitle": "Free Open Graph Meta Tag Generator | Metazivo Tools",
    "metaDescription": "Free online Open Graph Generator by Metazivo. Create rich social preview meta tags for Facebook, LinkedIn, and social media platforms in seconds.",
    "intro": "Create beautiful, click-attracting social share cards with custom Open Graph titles, descriptions, image dimensions, and site ownership tags.",
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Page Metadata",
        "desc": "Provide your page title, marketing description, canonical URL, and high-resolution image link."
      },
      {
        "step": 2,
        "title": "Preview Social Cards",
        "desc": "Examine how your link preview appears on Facebook, LinkedIn, Slack, and messaging apps."
      },
      {
        "step": 3,
        "title": "Embed in HTML Head",
        "desc": "Copy the generated `<meta property=\"og:...\">` tags into your website template header."
      }
    ],
    "benefits": [
      {
        "title": "Professional Social Presence",
        "desc": "Ensure your brand displays beautiful, custom preview cards when shared on social networks."
      },
      {
        "title": "Higher Viral Click-Throughs",
        "desc": "Eye-catching banner imagery and tailored preview copy significantly increase referral clicks."
      },
      {
        "title": "Multi-Platform Compatibility",
        "desc": "Works seamlessly across Facebook, LinkedIn, WhatsApp, Telegram, Discord, and Slack."
      }
    ],
    "explanation": {
      "whatIsIt": "The Open Graph protocol was introduced by Facebook to allow any web page to become a rich object in a social graph, controlling title, description, and preview imagery.",
      "whyItMatters": "Links shared without Open Graph tags display generic text or random images, diminishing user trust and reducing social engagement by more than 50%.",
      "bestPractices": [
        "Use high-resolution images with 1200x630 pixel dimensions (1.91:1 aspect ratio).",
        "Keep `og:title` under 60 characters and `og:description` under 150 characters.",
        "Always specify `og:image:width`, `og:image:height`, and `og:image:type` for faster crawler caching."
      ]
    },
    "faqs": [
      {
        "q": "What image format is best for Open Graph?",
        "a": "JPG or PNG formats under 5MB with dimensions of 1200x630 pixels work reliably across all networks."
      },
      {
        "q": "Do Open Graph tags affect Google search rankings?",
        "a": "Not directly, but higher social sharing drives real visitors, brand mentions, and organic backlinks."
      }
    ],
    "relatedSlugs": [
      "twitter-card-generator",
      "meta-title-description-generator",
      "seo-audit-checker"
    ]
  },
  {
    "id": "tool-15",
    "slug": "ai-aeo-geo-checker",
    "name": "AI / AEO / GEO SEO Checker",
    "shortDesc": "Evaluate content visibility in ChatGPT, Google Gemini, Perplexity, and Google AI Overviews.",
    "category": "AI, AEO & GEO",
    "badge": "Next-Gen AI",
    "iconName": "Sparkles",
    "popular": true,
    "metaTitle": "Free AI / AEO / GEO SEO Checker Tool | Metazivo Suite",
    "metaDescription": "Free online AI / AEO / GEO SEO Checker by Metazivo. Evaluate content visibility for ChatGPT, Perplexity, and Google AI Overviews with actionable tips.",
    "intro": "Audit your content for Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) readiness, entity clarity, and authoritative citation potential.",
    "howToUse": [
      {
        "step": 1,
        "title": "Input Content Draft or URL",
        "desc": "Paste your webpage copy or article draft into the AI search readiness scanner."
      },
      {
        "step": 2,
        "title": "Run AEO & GEO Audit",
        "desc": "Click Analyze AI Readiness to evaluate answer directness, entity definitions, and factual density."
      },
      {
        "step": 3,
        "title": "Implement Optimization Fixes",
        "desc": "Format concise 40-word answer boxes, bullet summaries, and structured citations to win AI mentions."
      }
    ],
    "benefits": [
      {
        "title": "Capture AI Overviews",
        "desc": "Structure answers so Google AI Overviews and Perplexity quote your domain as a primary source."
      },
      {
        "title": "Future-Proof Search Traffic",
        "desc": "Stay ahead as search habits transition from traditional keyword clicks to conversational AI summaries."
      },
      {
        "title": "Strengthen EEAT Authority",
        "desc": "Build verifiable factual density and author credentials that machine learning models reward."
      }
    ],
    "explanation": {
      "whatIsIt": "AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) optimize digital content so large language models (LLMs) and AI search engines quote, reference, and synthesize your brand as a verified source.",
      "whyItMatters": "With Google AI Overviews and Perplexity answering user questions directly, websites that lack structured answer formatting and strong entity signals lose significant organic referral clicks.",
      "bestPractices": [
        "Place direct, 40-word concise answers immediately below H2 question headings.",
        "Cite verifiable statistics, primary research, and dates to facilitate LLM fact extraction.",
        "Establish clear author expertise and organization credentials (EEAT signals)."
      ]
    },
    "faqs": [
      {
        "q": "What is the difference between SEO, AEO, and GEO?",
        "a": "SEO targets traditional 10-blue-links in SERPs, AEO targets voice and rich answer snippets, and GEO targets syntheses and citations inside generative AI answers."
      },
      {
        "q": "Can any tool guarantee AI citations?",
        "a": "No tool can guarantee rankings or AI citations, but structuring content around entity clarity and authoritative definitions significantly increases selection probability."
      }
    ],
    "relatedSlugs": [
      "geo-content-optimizer",
      "ai-citation-mention-checker",
      "featured-snippet-optimizer"
    ]
  },
  {
    "id": "tool-16",
    "slug": "seo-slug-generator",
    "name": "SEO Slug Generator",
    "shortDesc": "Generate clean, hyphenated, search-friendly URL slugs free of stopwords and noisy characters.",
    "category": "Content & On-Page",
    "badge": "URL Formatting",
    "iconName": "Hash",
    "metaTitle": "Free SEO URL Slug Generator Tool | Metazivo SEO Suite",
    "metaDescription": "Free online SEO Slug Generator by Metazivo. Convert article headlines and product titles into clean, keyword-rich, search-engine-friendly URL slugs.",
    "intro": "Convert blog titles and product names into clean, keyword-focused URL slugs following search engine best practices and strict character filtering.",
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Headline or Title",
        "desc": "Type or paste your article title, page headline, or product name into the slug generator."
      },
      {
        "step": 2,
        "title": "Choose Cleaning Options",
        "desc": "Toggle stopword removal, lowercase normalization, and separator style (hyphens or underscores)."
      },
      {
        "step": 3,
        "title": "Copy Optimized Slug",
        "desc": "Copy the clean, search-friendly URL slug to use in WordPress, Shopify, or your custom CMS."
      }
    ],
    "benefits": [
      {
        "title": "Clean, Short URLs",
        "desc": "Remove confusing symbols, special characters, and uppercase letters that cause broken links."
      },
      {
        "title": "Higher SERP Click Rates",
        "desc": "Clear, readable URLs give searchers confidence in the destination content before clicking."
      },
      {
        "title": "Automatic Stopword Stripping",
        "desc": "Removes unnecessary filler words like 'the', 'and', 'with' to keep slugs concise and focused."
      }
    ],
    "explanation": {
      "whatIsIt": "A slug is the final part of a URL address that identifies a specific page on a website in human-readable and search-readable words.",
      "whyItMatters": "Short, clean URLs with focused target keywords achieve higher click-through rates and are easier for search bots to categorize.",
      "bestPractices": [
        "Use lowercase letters and separate words strictly with hyphens (-).",
        "Strip unnecessary stopwords (e.g., 'the', 'a', 'in', 'and') when they don't alter meaning.",
        "Avoid special characters, dates, or numbers unless essential to the topic."
      ]
    },
    "faqs": [
      {
        "q": "Should I change existing slugs on my website?",
        "a": "If an old URL is already ranking well, avoid changing it unless strictly necessary. If you do change it, always create a 301 redirect from the old URL to the new slug."
      },
      {
        "q": "Are hyphens better than underscores in slugs?",
        "a": "Yes, Google officially recommends hyphens over underscores as word separators in web addresses."
      }
    ],
    "relatedSlugs": [
      "meta-title-description-generator",
      "content-gap-analyzer",
      "seo-audit-checker"
    ]
  },
  {
    "id": "tool-17",
    "slug": "image-alt-text-generator",
    "name": "Image Alt Text Generator",
    "shortDesc": "Create descriptive, accessibility-compliant alt text for web images and Google Image SEO rankings.",
    "category": "Content & On-Page",
    "badge": "Accessibility",
    "iconName": "Image",
    "metaTitle": "Free Image Alt Text Generator Tool | Metazivo Tools",
    "metaDescription": "Free online Image Alt Text Generator by Metazivo. Create descriptive, keyword-optimized alt attributes for accessibility and Google Image rankings.",
    "intro": "Generate descriptive, context-aware alt text for your website photos and graphics to boost accessibility ratings and capture organic Google Images traffic.",
    "howToUse": [
      {
        "step": 1,
        "title": "Describe Image or Topic",
        "desc": "Enter what the image portrays, surrounding article context, and optional target keywords."
      },
      {
        "step": 2,
        "title": "Generate Accessible Alt Text",
        "desc": "Click Generate to create natural, non-stuffed alt descriptions adhering to WCAG guidelines."
      },
      {
        "step": 3,
        "title": "Paste into HTML Tag",
        "desc": "Copy the alt string directly into `<img alt=\"...\">` or your CMS image attachment settings."
      }
    ],
    "benefits": [
      {
        "title": "WCAG Accessibility Compliance",
        "desc": "Ensures screen reader users understand the visual information conveyed by your images."
      },
      {
        "title": "Rank in Google Image Search",
        "desc": "Help search algorithms understand image content to capture valuable visual search traffic."
      },
      {
        "title": "Prevent Keyword Stuffing",
        "desc": "Creates natural, contextual descriptions rather than unnatural, spammy keyword lists."
      }
    ],
    "explanation": {
      "whatIsIt": "Alt text (alternative text) is an HTML attribute specified on `<img>` tags that provides a textual description of visual assets.",
      "whyItMatters": "Alt text is critical for visually impaired visitors relying on screen readers, and is Google's primary mechanism for indexing image search results.",
      "bestPractices": [
        "Be specific and descriptive without starting with redundant phrases like 'image of'.",
        "Keep length under 125 characters so screen readers do not cut off narration.",
        "Leave alt text empty (`alt=\"\"`) for purely decorative divider lines or background shapes."
      ]
    },
    "faqs": [
      {
        "q": "Does every image need alt text?",
        "a": "Informational images need descriptive alt text. Purely decorative elements should have empty alt attributes so screen readers skip them."
      },
      {
        "q": "Can alt text improve my normal web page rankings?",
        "a": "Yes, relevant alt text reinforces the overall topical relevance of the page for search algorithms."
      }
    ],
    "relatedSlugs": [
      "core-web-vitals-checker",
      "meta-title-description-generator",
      "seo-audit-checker"
    ]
  },
  {
    "id": "tool-18",
    "slug": "301-redirect-generator",
    "name": "301 Redirect Generator",
    "shortDesc": "Generate error-free Apache .htaccess, NGINX, and Cloudflare rewrite rules for site migrations.",
    "category": "Technical & Audit",
    "badge": "Server Rules",
    "iconName": "CornerDownRight",
    "metaTitle": "Free 301 Redirect Generator Tool | Metazivo SEO Suite",
    "metaDescription": "Free online 301 Redirect Generator by Metazivo. Generate ready-to-use Apache .htaccess and NGINX redirect rules to safely preserve search rankings.",
    "intro": "Create instant, syntax-tested 301 redirection rules for Apache (.htaccess), NGINX, and web servers to preserve link equity during site migrations.",
    "howToUse": [
      {
        "step": 1,
        "title": "Select Web Server Type",
        "desc": "Choose between Apache (.htaccess), NGINX server blocks, or WordPress redirection syntax."
      },
      {
        "step": 2,
        "title": "Specify Old & New Paths",
        "desc": "Enter source URL paths and their respective new destination URLs (or batch paste mappings)."
      },
      {
        "step": 3,
        "title": "Deploy Server Directives",
        "desc": "Copy the tested configuration code and paste it directly into your server configuration file."
      }
    ],
    "benefits": [
      {
        "title": "Preserve Backlink Equity",
        "desc": "Safely transfer 95%+ of historical PageRank and ranking authority to new page destinations."
      },
      {
        "title": "Syntax Error Prevention",
        "desc": "Eliminates server 500 internal errors caused by typos or improper regex escaping."
      },
      {
        "title": "Batch Migration Support",
        "desc": "Generate dozens of clean redirect rules simultaneously for smooth redesign migrations."
      }
    ],
    "explanation": {
      "whatIsIt": "A 301 redirect is a permanent server-side status code indicating that a requested URL has moved permanently to a new address.",
      "whyItMatters": "Failing to set 301 redirects when updating URLs creates 404 errors, causing search engines to de-index pages and losing valuable accumulated backlinks.",
      "bestPractices": [
        "Map old URLs to the most relevant equivalent page on the new structure.",
        "Test redirect configurations in a staging environment before pushing to production.",
        "Keep 301 redirects active indefinitely or for a minimum of one full year."
      ]
    },
    "faqs": [
      {
        "q": "How long does Google take to recognize a 301 redirect?",
        "a": "Googlebot typically picks up 301 redirects within a few days to a few weeks, depending on crawling frequency."
      },
      {
        "q": "Does a 301 redirect pass full PageRank?",
        "a": "Google has confirmed that 301 redirects pass PageRank without link authority dampening."
      }
    ],
    "relatedSlugs": [
      "redirect-checker",
      "broken-link-checker",
      "canonical-tag-checker"
    ]
  },
  {
    "id": "tool-19",
    "slug": "hreflang-generator",
    "name": "Hreflang Generator",
    "shortDesc": "Create valid ISO language and country hreflang tags for international, multi-regional websites.",
    "category": "Technical & Audit",
    "badge": "International",
    "iconName": "Globe2",
    "metaTitle": "Free Hreflang Tag Generator Tool | Metazivo SEO Suite",
    "metaDescription": "Free online Hreflang Generator by Metazivo. Generate accurate multi-language and multi-regional hreflang tags to prevent international SEO conflicts.",
    "intro": "Generate correct hreflang annotations with ISO 639-1 language codes and ISO 3166-1 country codes to serve the right regional pages to global visitors.",
    "howToUse": [
      {
        "step": 1,
        "title": "Add Regional URLs",
        "desc": "Enter your page URLs alongside corresponding language (e.g., en, es, fr) and region codes (e.g., US, GB, CA)."
      },
      {
        "step": 2,
        "title": "Configure x-default Fallback",
        "desc": "Select your global fallback landing page for searchers whose language is not explicitly targeted."
      },
      {
        "step": 3,
        "title": "Deploy Bi-Directional Tags",
        "desc": "Copy the generated HTML `<link rel=\"alternate\" hreflang=\"...\">` tags into all regional pages."
      }
    ],
    "benefits": [
      {
        "title": "Prevent Regional Duplicate Penalties",
        "desc": "Differentiates US and UK English pages so Google serves the appropriate currency and content."
      },
      {
        "title": "Serve Native Language Pages",
        "desc": "Direct international searchers automatically to the translated page version matching their region."
      },
      {
        "title": "Standardized ISO Verification",
        "desc": "Prevents invalid code combinations that trigger Google Search Console hreflang error alerts."
      }
    ],
    "explanation": {
      "whatIsIt": "Hreflang tags are HTML meta attributes that inform search engines which language and geographical region a specific page is designed for.",
      "whyItMatters": "Multi-regional websites often have similar content in the same language (e.g., UK vs. US English). Hreflang tells Google to serve the right version without penalizing duplicate text.",
      "bestPractices": [
        "Hreflang tags must be bidirectional: if page A links to page B, page B must link back to page A.",
        "Always include an `x-default` tag for unmatched international visitors.",
        "Use valid 2-letter ISO 639-1 language codes followed by optional ISO 3166-1 alpha-2 country codes."
      ]
    },
    "faqs": [
      {
        "q": "Can I implement hreflang in XML sitemaps?",
        "a": "Yes, hreflang can be placed in HTML head tags, HTTP headers, or inside XML sitemaps."
      },
      {
        "q": "What happens if I forget bi-directional tags?",
        "a": "Google will ignore the annotation if the target page does not confirm the relationship with a return tag."
      }
    ],
    "relatedSlugs": [
      "xml-sitemap-generator",
      "canonical-tag-checker",
      "seo-audit-checker"
    ]
  },
  {
    "id": "tool-20",
    "slug": "twitter-card-generator",
    "name": "Twitter Card Generator",
    "shortDesc": "Generate summary and large image Twitter/X Card meta tags for rich social media sharing.",
    "category": "Content & On-Page",
    "badge": "X / Twitter",
    "iconName": "Twitter",
    "metaTitle": "Free Twitter / X Card Generator Tool | Metazivo Tools",
    "metaDescription": "Free online Twitter/X Card Generator by Metazivo. Build summary and large image card tags to ensure eye-catching link previews on Twitter and X.",
    "intro": "Design eye-catching summary and summary_large_image Twitter/X Cards to drive maximum engagement and referral traffic from social posts.",
    "howToUse": [
      {
        "step": 1,
        "title": "Choose Card Format",
        "desc": "Select between Summary Card (square thumbnail) or Summary Card with Large Image (full-width banner)."
      },
      {
        "step": 2,
        "title": "Enter Tweet Details",
        "desc": "Add title, description, website @username, creator @handle, and image CDN link."
      },
      {
        "step": 3,
        "title": "Copy Meta Tags",
        "desc": "Paste the generated `<meta name=\"twitter:...\">` tags into your HTML document header."
      }
    ],
    "benefits": [
      {
        "title": "Higher Twitter Engagement",
        "desc": "Rich image cards receive up to 3x more retweets, replies, and click-throughs than plain text links."
      },
      {
        "title": "Custom Image Control",
        "desc": "Pick the exact 2:1 ratio image that displays when anyone tweets links from your domain."
      },
      {
        "title": "Brand Attribution",
        "desc": "Automatically links your brand Twitter handle to every shared post for continuous audience growth."
      }
    ],
    "explanation": {
      "whatIsIt": "Twitter Cards are meta tags embedded in a webpage that allow Twitter/X to attach rich photos, videos, and media previews to Tweets linking to your content.",
      "whyItMatters": "Tweets containing large media cards stand out prominently in fast-moving user feeds, driving substantially higher click-through rates than naked text URLs.",
      "bestPractices": [
        "Use `summary_large_image` for articles, products, and landing pages to command visual space.",
        "Ensure image dimensions are at least 1200x628 pixels with a 2:1 aspect ratio under 5MB.",
        "Validate your tags using the Twitter/X Card Validator tool."
      ]
    },
    "faqs": [
      {
        "q": "What is the difference between Open Graph and Twitter Cards?",
        "a": "Open Graph was created by Facebook and adopted broadly; Twitter Cards are Twitter-specific tags, though Twitter will fall back to Open Graph if Twitter tags are missing."
      },
      {
        "q": "Why is my Twitter card image not updating?",
        "a": "Twitter caches card data for up to 7 days; you can force a refresh by running the URL through the card validator."
      }
    ],
    "relatedSlugs": [
      "open-graph-generator",
      "meta-title-description-generator",
      "seo-audit-checker"
    ]
  },
  {
    "id": "tool-21",
    "slug": "keyword-cannibalization-checker",
    "name": "Keyword Cannibalization Checker",
    "shortDesc": "Detect conflicting URLs on your domain competing for the same search queries and diluting rankings.",
    "category": "Keywords & Strategy",
    "badge": "SERP Conflict",
    "iconName": "CopyCheck",
    "popular": true,
    "metaTitle": "Free Keyword Cannibalization Checker | Metazivo Tools",
    "metaDescription": "Free online Keyword Cannibalization Checker by Metazivo. Identify competing URLs fighting for the same search terms to consolidate ranking authority.",
    "intro": "Identify internal cannibalization conflicts where multiple URLs on your site compete against each other for the exact same keywords, splitting ranking authority.",
    "howToUse": [
      {
        "step": 1,
        "title": "Enter URLs & Target Keywords",
        "desc": "Paste your sitemap or list of indexed pages alongside their intended keyword targets."
      },
      {
        "step": 2,
        "title": "Scan for Overlapping Intent",
        "desc": "Click Check Cannibalization to detect competing title tags, H1s, and semantic keyword overlaps."
      },
      {
        "step": 3,
        "title": "Consolidate or Differentiate",
        "desc": "Apply 301 redirects to merge duplicate posts or update content angles to target distinct intents."
      }
    ],
    "benefits": [
      {
        "title": "Consolidate Ranking Power",
        "desc": "Merge split page authority into one authoritative master article that easily climbs into top-3 SERPs."
      },
      {
        "title": "Eliminate Rank Fluctuations",
        "desc": "Stop Google from constantly alternating which of your URLs ranks on page 2 and page 3."
      },
      {
        "title": "Optimize Crawl Budget",
        "desc": "Eliminate duplicate content pages so search bots focus on indexing your highest-converting assets."
      }
    ],
    "explanation": {
      "whatIsIt": "Keyword cannibalization happens when two or more pages on the same website target the same search query, causing search engines to split authority between them.",
      "whyItMatters": "Instead of having one high-ranking page on position 2, cannibalization often results in two struggling pages trapped on positions 18 and 25.",
      "bestPractices": [
        "Designate one authoritative canonical URL for each primary topic cluster.",
        "Consolidate thin overlapping blog posts into a single comprehensive master guide using 301 redirects.",
        "Differentiate secondary pages by targeting distinct search intents (e.g., guide vs. product page)."
      ]
    },
    "faqs": [
      {
        "q": "Is having multiple ranking URLs ever good?",
        "a": "Ranking positions 1 and 2 simultaneously is great (SERP crowding), but struggling on lower pages due to conflicting intent is harmful."
      },
      {
        "q": "How do I fix cannibalization without deleting posts?",
        "a": "You can update one article's keyword focus to a different sub-angle or add a canonical tag pointing to the primary post."
      }
    ],
    "relatedSlugs": [
      "keyword-clustering-tool",
      "topical-map-generator",
      "content-gap-analyzer"
    ]
  },
  {
    "id": "tool-22",
    "slug": "topical-map-generator",
    "name": "Topical Map Generator",
    "shortDesc": "Build comprehensive semantic content hubs with pillar articles, cluster sub-topics, and internal links.",
    "category": "Keywords & Strategy",
    "badge": "Authority Hub",
    "iconName": "GitFork",
    "popular": true,
    "metaTitle": "Free Topical Map Generator Tool | Metazivo SEO Suite",
    "metaDescription": "Free online Topical Map Generator by Metazivo. Structure semantic content hubs and pillar clusters to establish undeniable topical authority in Google.",
    "intro": "Structure authoritative topic clusters, pillar pages, and supporting sub-topics to demonstrate complete topical depth to Google's semantic algorithms.",
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Core Niche or Topic",
        "desc": "Provide your primary business niche, broad service category, or pillar subject area."
      },
      {
        "step": 2,
        "title": "Generate Semantic Architecture",
        "desc": "Click Build Topical Map to map out pillar pages, secondary cluster topics, and tier-3 sub-guides."
      },
      {
        "step": 3,
        "title": "Plan Internal Link Mesh",
        "desc": "Follow the linking blueprint to connect supporting articles back to your main pillar conversion page."
      }
    ],
    "benefits": [
      {
        "title": "Build Topical Authority",
        "desc": "Prove comprehensive niche expertise to Google so every new article ranks faster and higher."
      },
      {
        "title": "Organized Content Roadmap",
        "desc": "Eliminate writer's block with a structured 6-month publishing calendar of connected articles."
      },
      {
        "title": "Flawless Internal Linking",
        "desc": "Visualizes exact link pathways so equity flows logically from supporting articles to pillar pages."
      }
    ],
    "explanation": {
      "whatIsIt": "A topical map is an architectural blueprint organizing all sub-topics, concepts, and questions necessary to establish comprehensive authority over a subject matter.",
      "whyItMatters": "Google's algorithms (such as Helpful Content and Hummingbird) favor websites demonstrating thorough topical depth over sites with random, disconnected posts.",
      "bestPractices": [
        "Start with one high-level pillar page answering broad queries, supported by 6-12 focused cluster posts.",
        "Link every cluster sub-topic up to the pillar page using descriptive anchor text.",
        "Ensure all core user questions and semantic sub-entities are addressed within the cluster."
      ]
    },
    "faqs": [
      {
        "q": "What is a pillar page?",
        "a": "A pillar page is an extensive, high-level guide covering all aspects of a core topic, linking out to detailed sub-topic articles."
      },
      {
        "q": "How long does it take to establish topical authority?",
        "a": "Publishing a complete cluster of 8-15 high-quality connected articles typically demonstrates topical authority within 2 to 4 months."
      }
    ],
    "relatedSlugs": [
      "keyword-clustering-tool",
      "content-gap-analyzer",
      "internal-link-finder"
    ]
  },
  {
    "id": "tool-23",
    "slug": "content-gap-analyzer",
    "name": "Content Gap Analyzer",
    "shortDesc": "Discover missing keywords, semantic subheadings, and questions your competitors rank for.",
    "category": "Content & On-Page",
    "badge": "Competitor Gap",
    "iconName": "Search",
    "metaTitle": "Free Content Gap Analyzer Tool | Metazivo SEO Tools",
    "metaDescription": "Free online Content Gap Analyzer by Metazivo. Uncover missing topics, semantic subheadings, and unanswered user questions your competitors rank for.",
    "intro": "Uncover missing topics, unaddressed sub-headings, and high-ranking search entities that your top-ranking competitors cover but your article omits.",
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Your Article & Keyword",
        "desc": "Paste your webpage content or URL alongside your primary target search query."
      },
      {
        "step": 2,
        "title": "Scan Competitive Entities",
        "desc": "Click Analyze Content Gaps to evaluate top-ranking SERP benchmarks and semantic requirements."
      },
      {
        "step": 3,
        "title": "Expand Thin Sections",
        "desc": "Add missing sub-topics, tables, and FAQ sections to make your guide the definitive resource."
      }
    ],
    "benefits": [
      {
        "title": "Outrank Established Competitors",
        "desc": "Build comprehensive guides that answer more questions than existing page-1 search results."
      },
      {
        "title": "Identify High-Value Subheadings",
        "desc": "Discover natural H2 and H3 topics that unlock secondary long-tail keyword rankings."
      },
      {
        "title": "Prevent Thin Content Penalties",
        "desc": "Ensure your content meets Google's Helpful Content depth and comprehensiveness criteria."
      }
    ],
    "explanation": {
      "whatIsIt": "Content gap analysis identifies keywords, questions, and semantic entities that top-ranking competitor pages include that your webpage currently lacks.",
      "whyItMatters": "Search engines reward pages that satisfy user intent completely. Missing critical explanations or terminology prevents your page from achieving top-3 ranking positions.",
      "bestPractices": [
        "Analyze the top 5 ranking pages for your target query to identify recurring common sub-topics.",
        "Add unique data, expert quotes, or proprietary insights rather than just copying competitor topics.",
        "Structure new sub-sections with clear H2 headings and concise answer paragraphs."
      ]
    },
    "faqs": [
      {
        "q": "Does longer content always rank better?",
        "a": "Not necessarily; comprehensiveness and answering the searcher's intent concisely matter more than raw word count."
      },
      {
        "q": "How often should I perform content gap analysis?",
        "a": "Review top-performing articles every 6 months to keep them updated with fresh competitor developments."
      }
    ],
    "relatedSlugs": [
      "keyword-clustering-tool",
      "topical-map-generator",
      "featured-snippet-optimizer"
    ]
  },
  {
    "id": "tool-24",
    "slug": "faq-schema-generator",
    "name": "FAQ Schema Generator",
    "shortDesc": "Generate valid FAQPage Schema.org JSON-LD structured data to claim rich snippet real estate.",
    "category": "Schema & Structured Data",
    "badge": "FAQ Schema",
    "iconName": "HelpCircle",
    "metaTitle": "Free FAQ Schema Generator Tool | Metazivo SEO Tools",
    "metaDescription": "Free online FAQ Schema Generator by Metazivo. Create valid JSON-LD structured data for frequently asked questions to claim rich snippet SERP real estate.",
    "intro": "Generate error-free FAQPage JSON-LD code for your website's frequently asked questions to earn visual rich snippets in Google search results.",
    "howToUse": [
      {
        "step": 1,
        "title": "Add Questions & Answers",
        "desc": "Input your FAQ question headlines and clear, helpful answer paragraphs."
      },
      {
        "step": 2,
        "title": "Add Multiple Entries",
        "desc": "Click Add Question to include as many accordion FAQs as present on your landing page."
      },
      {
        "step": 3,
        "title": "Copy & Validate JSON-LD",
        "desc": "Copy the generated `<script type=\"application/ld+json\">` code and test it in Google Rich Results."
      }
    ],
    "benefits": [
      {
        "title": "Maximized SERP Visibility",
        "desc": "Expand your search listing size to push competitors further down the search results page."
      },
      {
        "title": "Instant Reader Engagement",
        "desc": "Provide direct answers to common customer objections before they even click onto your site."
      },
      {
        "title": "No Syntax Errors",
        "desc": "Validates JSON escaping and quote marks automatically to prevent Google Search Console errors."
      }
    ],
    "explanation": {
      "whatIsIt": "FAQPage schema is structured markup added to a page containing a list of questions and answers. Search engines use this to display expandable FAQ drop-downs in SERPs.",
      "whyItMatters": "Rich FAQ snippets significantly increase organic click-through rates by expanding your search result vertical height and providing instant value.",
      "bestPractices": [
        "All questions and answers in your JSON-LD must be visibly present to human users on the page.",
        "Do not use FAQ schema for advertising or promotional spam; keep answers educational.",
        "Ensure HTML entities and special characters are properly escaped in the JSON structure."
      ]
    },
    "faqs": [
      {
        "q": "Can I use FAQ schema on commercial product pages?",
        "a": "Google primarily reserves FAQ rich results for authoritative, well-known government and health authorities, but structured markup still helps semantic comprehension on all sites."
      },
      {
        "q": "Is there a limit on how many FAQs I can add?",
        "a": "There is no strict technical limit, but 3 to 7 relevant questions per page is standard practice."
      }
    ],
    "relatedSlugs": [
      "schema-markup-generator",
      "howto-schema-generator",
      "local-business-schema"
    ]
  },
  {
    "id": "tool-25",
    "slug": "howto-schema-generator",
    "name": "HowTo Schema Generator",
    "shortDesc": "Generate step-by-step HowTo JSON-LD structured data with materials, tools, and visual instructions.",
    "category": "Schema & Structured Data",
    "badge": "HowTo Schema",
    "iconName": "ListOrdered",
    "metaTitle": "Free HowTo Schema Generator Tool | Metazivo SEO Tools",
    "metaDescription": "Free online HowTo Schema Generator by Metazivo. Build step-by-step instructional JSON-LD markup to earn rich instructional snippets in Google search.",
    "intro": "Create instructional HowTo JSON-LD structured data with preparation time, required tools, supply lists, and sequential numbered steps for Google rich results.",
    "howToUse": [
      {
        "step": 1,
        "title": "Specify Tutorial Info",
        "desc": "Enter guide title, description, estimated completion time, and required materials or tools."
      },
      {
        "step": 2,
        "title": "Add Sequential Steps",
        "desc": "Input each step name, detailed instruction text, and optional step image illustration URLs."
      },
      {
        "step": 3,
        "title": "Embed in Page Header",
        "desc": "Copy the valid JSON-LD code into your tutorial article's HTML head or CMS schema field."
      }
    ],
    "benefits": [
      {
        "title": "Visual Step Previews",
        "desc": "Showcase numbered tutorial steps and images directly on Google search results pages."
      },
      {
        "title": "Voice Search Optimization",
        "desc": "Enables Google Assistant and smart speakers to read your step-by-step instructions aloud."
      },
      {
        "title": "Higher Instructional Authority",
        "desc": "Clarifies the chronological hierarchy of complex technical guides and DIY tutorials."
      }
    ],
    "explanation": {
      "whatIsIt": "HowTo structured data explicitly marks up step-by-step guides, walkthroughs, and tutorials so search engines understand the sequence of actions required to complete a task.",
      "whyItMatters": "Instructional content marked up with HowTo schema is eligible for interactive rich cards on mobile devices, boosting qualified organic click-throughs.",
      "bestPractices": [
        "Use HowTo schema only when the main focus of the page is a how-to instructional guide.",
        "Include all steps in chronological order matching the visible on-page content.",
        "Do not use HowTo markup for recipes (use Recipe schema instead)."
      ]
    },
    "faqs": [
      {
        "q": "Can I include images for each step?",
        "a": "Yes, adding individual step image URLs makes your rich result much more engaging on mobile devices."
      },
      {
        "q": "What happens if my steps are missing text?",
        "a": "Google requires both a name and text description for each step to qualify for rich snippet treatment."
      }
    ],
    "relatedSlugs": [
      "schema-markup-generator",
      "faq-schema-generator",
      "featured-snippet-optimizer"
    ]
  },
  {
    "id": "tool-26",
    "slug": "local-business-schema",
    "name": "Local Business Schema Generator",
    "shortDesc": "Generate rich LocalBusiness JSON-LD schema with NAP, geo coordinates, opening hours, and price ranges.",
    "category": "Schema & Structured Data",
    "badge": "Local Schema",
    "iconName": "Building2",
    "metaTitle": "Free Local Business Schema Generator | Metazivo Tools",
    "metaDescription": "Free online Local Business Schema Generator by Metazivo. Create verified LocalBusiness JSON-LD markup with NAP, geo-coordinates, and opening hours.",
    "intro": "Generate verified LocalBusiness Schema.org markup with exact business name, address, telephone, opening hours, price range, and geographic coordinates.",
    "howToUse": [
      {
        "step": 1,
        "title": "Select Specific Business Type",
        "desc": "Choose from Restaurant, DentalClinic, LegalService, RealEstateAgent, Store, or General Contractor."
      },
      {
        "step": 2,
        "title": "Provide Address & Hours",
        "desc": "Enter your physical location, phone number, operating schedule, latitude, and longitude."
      },
      {
        "step": 3,
        "title": "Export Valid Schema",
        "desc": "Copy the JSON-LD snippet and place it into your website homepage and location landing pages."
      }
    ],
    "benefits": [
      {
        "title": "Google Knowledge Panel",
        "desc": "Increases likelihood of triggering an official Google Knowledge Panel for your brand name."
      },
      {
        "title": "Google Maps Synchronization",
        "desc": "Explicitly connects your website URL to your verified Google Business Profile location."
      },
      {
        "title": "Voice Search Ready",
        "desc": "Helps Siri and Google Assistant answer queries like 'what time does [business] open?'"
      }
    ],
    "explanation": {
      "whatIsIt": "LocalBusiness schema is structured JSON-LD that provides search engines with explicit details about a company's physical location, contact points, and operating hours.",
      "whyItMatters": "Search engines prioritize businesses with verified structured data when answering local and 'near me' search queries in Google Maps and mobile search.",
      "bestPractices": [
        "Ensure NAP details match your Google Business Profile and directory citations character-for-character.",
        "Include precise geographic latitude and longitude coordinates.",
        "Specify opening hours formatted according to ISO standards (e.g., Mo-Fr 09:00-17:00)."
      ]
    },
    "faqs": [
      {
        "q": "Which business types are supported?",
        "a": "Supports hundreds of specific types like MedicalBusiness, LegalService, RealEstateAgent, FinancialService, Restaurant, and ProfessionalService."
      },
      {
        "q": "Should I put LocalBusiness schema on every page?",
        "a": "Place your primary LocalBusiness schema on your homepage, contact page, and specific location landing pages."
      }
    ],
    "relatedSlugs": [
      "local-seo-audit-tool",
      "schema-markup-generator",
      "seo-audit-checker"
    ]
  },
  {
    "id": "tool-27",
    "slug": "core-web-vitals-checker",
    "name": "Core Web Vitals Checker",
    "shortDesc": "Measure LCP, INP, CLS, and TTFB scores with Google Lighthouse optimization benchmarks.",
    "category": "Speed & Performance",
    "badge": "Vitals Benchmark",
    "iconName": "Activity",
    "popular": true,
    "metaTitle": "Free Core Web Vitals Checker Tool | Metazivo Performance",
    "metaDescription": "Free online Core Web Vitals Checker by Metazivo. Measure real-world LCP, INP, CLS, and TTFB scores with actionable performance diagnostic guidelines.",
    "intro": "Measure your website's Core Web Vitals against Google's official thresholds: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).",
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Page URL",
        "desc": "Type the full web page address you want to evaluate against Google Core Web Vitals standards."
      },
      {
        "step": 2,
        "title": "Run Metrics Analysis",
        "desc": "Click Check Vitals to calculate simulated LCP, INP, and CLS performance scores."
      },
      {
        "step": 3,
        "title": "Review Fix Priority",
        "desc": "Inspect failing metrics and apply prioritized optimizations to pass Google's page experience signals."
      }
    ],
    "benefits": [
      {
        "title": "Pass Google Page Experience",
        "desc": "Ensure your web pages meet the Core Web Vitals ranking signals used in mobile search."
      },
      {
        "title": "Pinpoint Layout Shifts",
        "desc": "Identify unsized images, dynamic ads, or injected fonts that cause jarring page jumps (CLS)."
      },
      {
        "title": "Optimize First Render",
        "desc": "Reduce server wait times and heavy asset loading to get content in front of users fast."
      }
    ],
    "explanation": {
      "whatIsIt": "Core Web Vitals are a set of three standardized performance metrics defined by Google that measure real-world user experience: loading speed (LCP), responsiveness (INP), and visual stability (CLS).",
      "whyItMatters": "Passing the Core Web Vitals assessment is an official Google ranking signal. Sites with good vitals experience 24% lower page abandonment rates.",
      "bestPractices": [
        "Keep Largest Contentful Paint (LCP) under 2.5 seconds by optimizing hero images and caching.",
        "Keep Interaction to Next Paint (INP) under 200 milliseconds by reducing long JavaScript tasks.",
        "Keep Cumulative Layout Shift (CLS) under 0.1 by including explicit image width/height attributes."
      ]
    },
    "faqs": [
      {
        "q": "What replaced FID in Core Web Vitals?",
        "a": "Google officially replaced First Input Delay (FID) with Interaction to Next Paint (INP) in March 2024 to better measure overall page responsiveness."
      },
      {
        "q": "How does CLS affect rankings?",
        "a": "Cumulative Layout Shift measures visual jumping. High CLS frustrates users and counts against your Google Page Experience ranking score."
      }
    ],
    "relatedSlugs": [
      "website-speed-test",
      "pagespeed-fix-recommendation-tool",
      "seo-audit-checker"
    ]
  },
  {
    "id": "tool-28",
    "slug": "pagespeed-fix-recommendation-tool",
    "name": "PageSpeed Fix Recommendation Tool",
    "shortDesc": "Get prioritized code, caching, image, and server solutions to achieve 90+ Lighthouse scores.",
    "category": "Speed & Performance",
    "badge": "Speed Fixes",
    "iconName": "Cpu",
    "metaTitle": "Free PageSpeed Fix Recommendation Tool | Metazivo Tools",
    "metaDescription": "Free online PageSpeed Fix Recommendation Tool by Metazivo. Get prioritized code, caching, image, and server solutions to achieve 90+ Lighthouse scores.",
    "intro": "Diagnose specific performance bottlenecks and generate ready-to-use code snippets, caching headers, image compression tips, and server configurations.",
    "howToUse": [
      {
        "step": 1,
        "title": "Input Site Diagnosis",
        "desc": "Enter your URL or select the performance warning flagged in your Google PageSpeed report."
      },
      {
        "step": 2,
        "title": "Generate Actionable Solutions",
        "desc": "Click Get Recommendations to view prioritized fix instructions with estimated impact."
      },
      {
        "step": 3,
        "title": "Deploy Code Improvements",
        "desc": "Copy the provided .htaccess rules, NGINX directives, or script defer tags directly into your site."
      }
    ],
    "benefits": [
      {
        "title": "Prioritized Engineering Action",
        "desc": "Focus on the high-impact 20% of fixes that deliver 80% of loading speed improvements."
      },
      {
        "title": "Ready-to-Deploy Code",
        "desc": "Provides concrete server caching rules and resource preloading tags rather than vague advice."
      },
      {
        "title": "Achieve 90+ Lighthouse",
        "desc": "Systematically resolve render-blocking scripts, uncompressed assets, and slow TTFB."
      }
    ],
    "explanation": {
      "whatIsIt": "The PageSpeed Fix Recommendation Tool translates raw Lighthouse diagnostic warnings into prioritized, step-by-step engineering instructions and code fixes.",
      "whyItMatters": "Many developers struggle to know where to start when looking at PageSpeed Insights reports. Prioritizing fixes saves days of trial and error.",
      "bestPractices": [
        "Enable Gzip or Brotli text compression on your web server for HTML, CSS, and JS assets.",
        "Implement browser caching headers with at least 1-year cache lifetimes for static images.",
        "Preload critical fonts and hero images using `<link rel=\"preload\">` in your document head."
      ]
    },
    "faqs": [
      {
        "q": "Can I get a 100/100 PageSpeed score on WordPress?",
        "a": "Yes, by utilizing lightweight themes, server-level page caching (FastCGI, Redis, LiteSpeed), WebP images, and deferring non-essential plugin scripts."
      },
      {
        "q": "Does page speed affect Google Ads CPC?",
        "a": "Yes, landing page speed directly influences your Google Ads Quality Score, reducing the cost-per-click required to win ad auctions."
      }
    ],
    "relatedSlugs": [
      "website-speed-test",
      "core-web-vitals-checker",
      "seo-audit-checker"
    ]
  },
  {
    "id": "tool-29",
    "slug": "featured-snippet-optimizer",
    "name": "Featured Snippet Optimizer",
    "shortDesc": "Format paragraph, list, and table answers to win Google Position Zero and maximize organic CTR.",
    "category": "Content & On-Page",
    "badge": "Position Zero",
    "iconName": "Award",
    "popular": true,
    "metaTitle": "Free Featured Snippet Optimizer Tool | Metazivo Tools",
    "metaDescription": "Free online Featured Snippet Optimizer by Metazivo. Format paragraph, list, and table answers to win Google Position Zero and maximize organic CTR.",
    "intro": "Structure paragraph definitions, step-by-step lists, and comparison tables calibrated to Google's snippet extraction algorithms to claim Position Zero.",
    "howToUse": [
      {
        "step": 1,
        "title": "Choose Snippet Format",
        "desc": "Select from Paragraph Snippet (definition), Numbered List (steps), Bullet List (items), or Table."
      },
      {
        "step": 2,
        "title": "Draft Concise Answer",
        "desc": "Input your target query and craft a 40-55 word direct answer utilizing target keywords."
      },
      {
        "step": 3,
        "title": "Embed Beneath Heading",
        "desc": "Place the optimized answer block immediately below your target H2 question heading in your article."
      }
    ],
    "benefits": [
      {
        "title": "Claim Position Zero",
        "desc": "Leapfrog competitors occupying position 1 by earning the prominent featured answer block at the very top."
      },
      {
        "title": "Skyrocket Organic Clicks",
        "desc": "Featured snippets attract an average of 35% of all organic clicks on informational queries."
      },
      {
        "title": "Voice Assistant Answers",
        "desc": "Google Assistant and Siri prioritize featured snippet text when answering spoken voice queries."
      }
    ],
    "explanation": {
      "whatIsIt": "A featured snippet is a highlighted answer box that Google displays at the top of organic search results (Position Zero) to answer a user's question immediately.",
      "whyItMatters": "Winning a featured snippet dramatically increases brand exposure, claims the highest visual position on the screen, and steals traffic from the rank #1 result.",
      "bestPractices": [
        "Paragraph snippets perform best when formatted as a 40 to 55-word crisp definition.",
        "Place the target question in an H2 heading and place the answer immediately beneath it in `<p>` tags.",
        "For step guides, use clean `<ol>` and `<li>` tags with bold step summaries."
      ]
    },
    "faqs": [
      {
        "q": "Can I get a featured snippet if I rank on page 2?",
        "a": "Google almost exclusively awards featured snippets to pages already ranking in the top 10 organic positions for that query."
      },
      {
        "q": "Can a page have both rank #1 and the featured snippet?",
        "a": "Under Google's deduplication update, a page awarded the featured snippet no longer repeats as a regular blue link on page 1."
      }
    ],
    "relatedSlugs": [
      "meta-title-description-generator",
      "ai-aeo-geo-checker",
      "content-gap-analyzer"
    ]
  },
  {
    "id": "tool-30",
    "slug": "ai-citation-mention-checker",
    "name": "AI Citation / Mention Checker",
    "shortDesc": "Track brand citations and authority mentions across generative AI models like ChatGPT and Claude.",
    "category": "AI, AEO & GEO",
    "badge": "Brand Citations",
    "iconName": "Sparkles",
    "metaTitle": "Free AI Citation & Mention Checker | Metazivo SEO Tools",
    "metaDescription": "Free online AI Citation & Mention Checker by Metazivo. Track brand citations and authority mentions across generative AI models like ChatGPT and Claude.",
    "intro": "Monitor whether generative AI models, ChatGPT, Perplexity, and Claude cite your brand name, domain, or proprietary research when synthesizing industry answers.",
    "howToUse": [
      {
        "step": 1,
        "title": "Enter Brand & Niche Query",
        "desc": "Type your company name, website domain, and industry keyword topics into the scanner."
      },
      {
        "step": 2,
        "title": "Inspect AI Model Citations",
        "desc": "Click Scan Mentions to evaluate entity presence, sentiment, and authoritative citation links."
      },
      {
        "step": 3,
        "title": "Strengthen Digital Footprint",
        "desc": "Deploy digital PR, Wikipedia entity signals, and structured data to increase future AI references."
      }
    ],
    "benefits": [
      {
        "title": "Track AI Visibility",
        "desc": "Understand how your company is represented in answers generated by ChatGPT, Gemini, and Claude."
      },
      {
        "title": "Protect Brand Sentiment",
        "desc": "Detect inaccurate statements or hallucinations made by LLMs regarding your products or services."
      },
      {
        "title": "Uncover AI Referral Channels",
        "desc": "Identify which generative search platforms send qualified high-intent referral visits."
      }
    ],
    "explanation": {
      "whatIsIt": "AI citation checking evaluates how frequently and accurately generative AI models reference your domain, products, or thought leadership content.",
      "whyItMatters": "As millions of consumers use AI assistants to research software and services, being cited as a trusted source in AI outputs drives high-intent brand awareness.",
      "bestPractices": [
        "Publish original research, proprietary survey data, and industry benchmarks that LLMs crave.",
        "Maintain consistent brand entity naming across Wikipedia, Wikidata, and major press releases.",
        "Implement Organization and Person schema to clarify brand ownership and credentials."
      ]
    },
    "faqs": [
      {
        "q": "How do LLMs decide which brands to cite?",
        "a": "LLMs prioritize brands that demonstrate high co-occurrence with positive sentiment, extensive external citations, and structured entity authority."
      },
      {
        "q": "Can I optimize specifically for Perplexity citations?",
        "a": "Yes, Perplexity indexes the live web in real time, rewarding clear factual summaries, recent publication dates, and authoritative backlinks."
      }
    ],
    "relatedSlugs": [
      "ai-aeo-geo-checker",
      "geo-content-optimizer",
      "featured-snippet-optimizer"
    ]
  },
  {
    "id": "tool-31",
    "slug": "geo-content-optimizer",
    "name": "GEO Content Optimizer",
    "shortDesc": "Optimize website copy for Generative Engine Optimization, direct AI citations, and synthetic search.",
    "category": "AI, AEO & GEO",
    "badge": "GEO Engine",
    "iconName": "Sparkles",
    "metaTitle": "Free GEO Content Optimizer Tool | Metazivo SEO Suite",
    "metaDescription": "Free online GEO Content Optimizer by Metazivo. Optimize website copy for Generative Engine Optimization, direct AI citations, and synthetic search.",
    "intro": "Refactor your website articles with statistical citation density, clear entity definitions, and structured key takeaways to maximize inclusion in AI syntheses.",
    "howToUse": [
      {
        "step": 1,
        "title": "Paste Web Copy",
        "desc": "Enter your draft text, blog post, or landing page description into the GEO optimizer."
      },
      {
        "step": 2,
        "title": "Run Semantic GEO Audit",
        "desc": "Click Optimize for GEO to evaluate statistical citation frequency, quote authority, and entity depth."
      },
      {
        "step": 3,
        "title": "Apply Structured Takeaways",
        "desc": "Incorporate suggested fact boxes, key takeaways, and definition blocks to boost AI citation probability."
      }
    ],
    "benefits": [
      {
        "title": "Maximize AI Inclusion",
        "desc": "Structure content so generative algorithms select your website as their primary cited source."
      },
      {
        "title": "Higher Reader Credibility",
        "desc": "Statistical density and clear definitions make content more persuasive and authoritative for human users."
      },
      {
        "title": "Outperform Static Competitors",
        "desc": "Gain competitive advantage as older content that lacks entity structure loses ground in AI search."
      }
    ],
    "explanation": {
      "whatIsIt": "Generative Engine Optimization (GEO) is the practice of structuring website content so generative search engines (like Perplexity, SearchGPT, and Gemini) quote and cite your material.",
      "whyItMatters": "Research shows that incorporating authoritative quotes, verifiable statistics, and clear definitions can increase a webpage's visibility in generative engine responses by over 30%.",
      "bestPractices": [
        "Include verifiable statistics and source citations with dates throughout your content.",
        "Add an executive summary or 'Key Takeaways' box at the beginning of long articles.",
        "Use unambiguous noun phrases and clear entity definitions rather than vague pronouns."
      ]
    },
    "faqs": [
      {
        "q": "Is GEO replacing traditional SEO?",
        "a": "No, GEO complements SEO. Strong traditional technical and on-page fundamentals remain prerequisite signals for AI discovery."
      },
      {
        "q": "What is statistical citation density?",
        "a": "It refers to the frequency of verifiable facts, figures, and research references that demonstrate genuine subject matter authority."
      }
    ],
    "relatedSlugs": [
      "ai-aeo-geo-checker",
      "ai-citation-mention-checker",
      "featured-snippet-optimizer"
    ]
  }
];

// Alias for backwards compatibility
export const SEO_TOOLS_DATA: SeoToolDef[] = SEO_TOOLS_LIST;

export function getToolBySlug(slug?: string): SeoToolDef | undefined {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim().replace(/^\/+|\/+$/g, "");
  
  // Direct match
  const direct = SEO_TOOLS_LIST.find((t) => t.slug.toLowerCase() === clean);
  if (direct) return direct;

  const aliasMap: Record<string, string> = {
    "keyword-clustering": "keyword-clustering-tool",
    "search-intent-analyzer": "search-intent-checker",
    "robots-txt-generator-tester": "robots-txt-generator",
    "robots-txt-tester": "robots-txt-generator",
    "local-seo-audit": "local-seo-audit-tool",
    "internal-link-analyzer": "internal-link-finder",
    "ai-search-readiness": "ai-aeo-geo-checker",
    "canonical-checker": "canonical-tag-checker",
    "canonical-url-checker": "canonical-tag-checker",
    "canonical-url": "canonical-tag-checker",
    "image-alt-text-checker": "image-alt-text-generator",
    "meta-tag-generator": "meta-title-description-generator",
    "serp-simulator": "meta-title-description-generator",
    "pagespeed-estimator": "pagespeed-fix-recommendation-tool",
    "pagespeed-fix": "pagespeed-fix-recommendation-tool",
    "pagespeed-optimizer": "pagespeed-fix-recommendation-tool",
    "meta-title-generator": "meta-title-description-generator",
    "meta-description-generator": "meta-title-description-generator",
    "schema-generator": "schema-markup-generator",
    "schema-markup": "schema-markup-generator",
    "mobile-friendly-test": "seo-audit-checker",
    "speed-test": "website-speed-test",
    "page-speed-test": "website-speed-test"
  };

  const targetSlug = aliasMap[clean];
  if (targetSlug) {
    return SEO_TOOLS_LIST.find((t) => t.slug === targetSlug);
  }

  return SEO_TOOLS_LIST.find((t) => clean.includes(t.slug) || t.slug.includes(clean));
}
