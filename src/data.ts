/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgencyService } from "./types";

// Real-world, highly realistic portfolio stock photo URLs (Not AI-generated)
const obdevMockup = "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80"; // Construction planning & metrics
const salamsMockup = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80"; // Wedding couple for matrimony
const opvgMockup = "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80"; // Community volunteers collaborating
const wpMockup = "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80"; // Skincare boutique products
const seoMockup = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"; // Logistics shipping containers
const metaAdsMockup = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"; // Luxury real estate property
const customReactMockup = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"; // Modern SaaS visual metrics dashboard

export const servicesData: AgencyService[] = [
  {
    id: "srv-aimobile",
    title: "AI Mobile Apps",
    slug: "ai-mobile-apps",
    icon: "Cpu",
    description: "Custom mobile applications with server-side AI logic, real-time voice translation, and smart workflows that solve real problems.",
    longDescription: "Most AI apps fail because they put a thin wrapper around a basic prompt. We build production-ready mobile apps with server-side AI pipelines. Whether you need automated document parsing, smart in-app customer support, or voice translation, we route every request through secure backend proxies. Your API keys stay protected on the server, token costs stay under control, and your users get instant responses without interface lag.",
    benefits: [
      "Secure backend API proxies so your private keys never leak onto client devices",
      "Task automation workflows that handle real user requests and inquiries",
      "Real-time speech-to-text, in-app translations, and lightweight vision features",
      "Native performance on iOS and Android with fast local database caching",
      "Usage monitoring dashboards to track API token costs and daily engagement"
    ],
    process: [
      "Architecture & Technical Scope Definition",
      "Backend Proxy & Secure LLM Integration",
      "Cross-Platform Mobile Interface Engineering",
      "Performance Testing & Store Submission"
    ],
    startingPrice: "From $449",
    deliverables: [
      "Cross-Platform Flutter/React Native Builds",
      "Server-Side Gemini/OpenAI API Proxies",
      "Real-Time Voice & Translation Integrations",
      "Secure User State & Cloud Persistence"
    ],
    seoTitle: "AI Mobile App Development Services | Metazivo",
    seoDescription: "Custom iOS and Android apps with secure server-side AI integrations, voice processing, and automated user workflows. Built for speed and data security.",
    fullFulfillmentCopy: "Apps that rely solely on static screens struggle with user retention. When you add useful in-app intelligence, users stay engaged. We build production-ready apps with server-side AI pipelines. Your clients get instant answers, automated workflow assistance, and voice tools that solve specific tasks. More importantly, we never put raw API keys in mobile app packages. All requests pass through an Express proxy, keeping your billing safe and credentials secure.",
    caseStudy: {
      title: "Smart In-App Support & Ordering Workflow",
      challenge: "An e-commerce startup faced high cart abandonment and slow customer inquiry response times.",
      solution: "Built a cross-platform React Native app with a secure server-side shopping assistant and targeted notification triggers.",
      result: "Cart checkout rate rose by 142% and daily active users increased by 3.5x over three months.",
      metric: "+142% Checkout Rate"
    },
    faqs: [
      {
        q: "How do server-side AI integrations protect my API keys?",
        a: "We route all AI requests through secure Express backend proxies. This means your private API credentials never sit on a user's phone, preventing unauthorized usage and unexpected billing spikes."
      },
      {
        q: "Will the app run smoothly on both iOS and Android?",
        a: "Yes. We use cross-platform frameworks like Flutter and React Native to deliver responsive, native-feeling performance on both platforms from a single codebase."
      }
    ]
  },
  {
    id: "srv-wp",
    title: "WordPress & WooCommerce Sales Engines",
    slug: "wordpress-development",
    icon: "Layout",
    description: "Clean, plugin-light WooCommerce stores and custom WordPress sites engineered to load in under a second and convert traffic.",
    longDescription: "Most WordPress websites crawl because they rely on 40+ plugins and heavy visual builders like Elementor or Divi. When a page takes 5 seconds to load, half your buyers leave before seeing a single product. We build custom sites using native Gutenberg blocks and clean code. You get an intuitive dashboard where you can edit text and images easily, while your customers get a fast, one-step checkout that keeps revenue flowing.",
    benefits: [
      "Hand-coded Gutenberg blocks with zero bloated page builder scripts",
      "Streamlined WooCommerce checkout designed to minimize cart abandonment",
      "Server-level caching, WebP image delivery, and automated daily backups",
      "Simple admin dashboard — update products, text, and photos in seconds",
      "Tested against Core Web Vitals to maintain sub-1s load times"
    ],
    process: [
      "Site Architecture & Database Setup",
      "Custom Lightweight Theme Development",
      "WooCommerce Cart & Payment Gateway Integration",
      "Speed Hardening & Security Deployment"
    ],
    startingPrice: "From $150",
    deliverables: [
      "Custom Theme & Native Gutenberg Blocks",
      "WooCommerce Store Configuration",
      "1-Step Frictionless Checkout Flow",
      "Automated Cloud Backup Setup"
    ],
    seoTitle: "Custom WordPress & WooCommerce Development | Metazivo",
    seoDescription: "Boost your online sales with clean, custom-coded WordPress blocks, streamlined 1-step WooCommerce checkouts, and sub-second mobile load speeds.",
    fullFulfillmentCopy: "Most developers take the easy way out: install a pre-made theme, stack 30 plugins on top, and hand you a slow website. It might look fine on day one, but it breaks during updates and runs slowly on mobile phones. We do the opposite. We write clean theme templates directly for WordPress's native block editor. You get a lightweight dashboard that anyone on your team can update, while your shoppers experience page loads under one second. We trim the checkout to a clean single-step flow, removing every unnecessary field that costs you sales.",
    caseStudy: {
      title: "WooCommerce Speed & Checkout Optimization",
      challenge: "An apparel store had a 6.4-second mobile load time, causing significant drop-offs before checkout.",
      solution: "Rebuilt the store without heavy third-party page builders, using custom Gutenberg blocks and automated image optimization.",
      result: "Mobile load speed dropped to 0.8 seconds, and store revenue increased by 195% within the first 30 days.",
      metric: "0.8s Mobile Load Speed"
    },
    faqs: [
      {
        q: "Can I edit my text and add new products easily without a builder?",
        a: "Yes. We build with WordPress's native block editor. You can edit text, swap images, and add products just like editing a document, without worrying about breaking the page layout."
      },
      {
        q: "Do you handle payment gateway setup and testing?",
        a: "Yes. We set up your payment processors (Stripe, PayPal, or local merchant gateways), configure shipping and tax rules, and test real transactions before launch."
      }
    ]
  },
  {
    id: "srv-mobileapp",
    title: "Mobile Application Development",
    slug: "mobile-app-development",
    icon: "Smartphone",
    description: "High-performance iOS and Android applications built with Flutter or React Native. Fast, reliable, and smooth on every device.",
    longDescription: "Nobody keeps an app that stutters or crashes when they lose mobile signal. We build mobile apps with Flutter and React Native that compile directly to native code. That means smooth animations, immediate tap responses, and offline storage that saves user work even when connectivity drops. From initial Figma designs to App Store and Google Play approvals, we handle the full development cycle.",
    benefits: [
      "Single shared codebase delivering native responsiveness on iOS and Android",
      "Offline-first local caching so users can work without an internet connection",
      "Integrated push notifications, biometric login, and camera/location permissions",
      "Clean interfaces built to match approved Figma designs precisely",
      "Full handling of App Store and Google Play review and submission requirements"
    ],
    process: [
      "Wireframing & Interactive UI/UX Design",
      "Frontend Development & API Integration",
      "Cross-Device Testing & Offline Data Sync",
      "App Store & Google Play Submission"
    ],
    startingPrice: "From $449",
    deliverables: [
      "Production-Ready iOS & Android Builds",
      "Store Submission & Approval Support",
      "Push Notification Integration",
      "Local Database & Biometric Authentication"
    ],
    seoTitle: "iOS & Android App Development | Flutter & React Native | Metazivo",
    seoDescription: "High-performance native iOS and Android application development. We build cross-platform apps with 60-120 FPS speed, offline caching, and secure API integrations.",
    fullFulfillmentCopy: "If an app feels sluggish or drops data when a user loses signal, they delete it. We engineer cross-platform apps using Flutter or React Native to share 90% of the code between iOS and Android without sacrificing speed. Users get fluid transitions, hardware-accelerated rendering, and local caching that syncs smoothly the moment they reconnect. We also manage developer certificates, bundle IDs, privacy disclosures, and store review requirements so your launch goes through without rejection.",
    caseStudy: {
      title: "Logistics Field App Redeployment",
      challenge: "A field logistics team struggled with an old app that crashed offline, losing delivery signatures and driver timestamps.",
      solution: "Developed a cross-platform mobile app with an offline-first database that queues changes locally and syncs automatically when back online.",
      result: "Zero data loss across 12,000 monthly deliveries and a 42% improvement in daily driver turnaround times.",
      metric: "Zero Offline Data Loss"
    },
    faqs: [
      {
        q: "Can you publish the apps directly to our developer accounts?",
        a: "Yes. We manage the full release process: creating release builds, signing certificates, writing store listings, configuring privacy policies, and addressing review feedback."
      },
      {
        q: "Can the app connect to our existing database or CRM?",
        a: "Yes. We connect your mobile application to your existing REST or GraphQL APIs, custom databases, Firebase, or CRM platforms like HubSpot and Salesforce."
      }
    ]
  },
  {
    id: "srv-seo",
    title: "SEO & Blog Writing Services",
    slug: "seo",
    icon: "Search",
    description: "Stop Renting Traffic. Start Owning It. Build real search visibility with technical Core Web Vitals, JSON-LD schema, and human-crafted topic clusters.",
    longDescription: "Every dollar you put into ads stops working the second you stop paying. SEO is different. A page you build today can bring in customers for years without you touching it again. That's why smart businesses treat organic search as an asset, not an expense. Most agencies sell you keyword lists and 500-word filler posts that never rank. Metazivo builds real search visibility — technical fixes, structured content, and writing done by people who actually understand your industry. No shortcuts, no AI spam, no vanity traffic that never buys anything.",
    benefits: [
      "Technical SEO Audit & Core Web Vitals (95+ speed scores)",
      "JSON-LD Schema Markup & Clean URL Architecture",
      "Topic Cluster Content Strategy written by human industry specialists",
      "E-E-A-T Google Helpful Content algorithm compliance",
      "Commercial Intent Mapping turning searches into paying leads"
    ],
    process: [
      "Technical SEO Audit & Hidden Blocker Removal",
      "JSON-LD Schema & XML Sitemap Architecture",
      "Topic Cluster & Commercial Search Intent Mapping",
      "Ongoing Optimization, Ranking Tracking & ROI Reporting"
    ],
    startingPrice: "From $120",
    deliverables: [
      "Core Web Vitals Optimization",
      "Structured JSON-LD Schema",
      "Topic Cluster Pillar Content",
      "Monthly Conversion & ROI Reporting"
    ],
    seoTitle: "SEO & Blog Writing Services | Stop Renting Traffic | Metazivo",
    seoDescription: "Stop renting traffic. Start owning it. Metazivo builds real search visibility with technical fixes, Core Web Vitals, JSON-LD schema, and human-researched topic clusters.",
    fullFulfillmentCopy: "A great blog post on a broken website goes nowhere. Before we write a single word, we fix what's under the hood: Core Web Vitals, site speed, crawlability, and JSON-LD schema markup.\n\nGoogle doesn't rank pages anymore — it ranks sources it trusts. That's why we build connected topic clusters that satisfy real search intent (informational, commercial, and transactional) and comply strictly with Google's E-E-A-T guidelines.",
    caseStudy: {
      title: "Compounding Organic Revenue Asset",
      challenge: "A business was spending thousands every month on paid ads that stopped working the second ad spend paused, with zero compounding organic assets.",
      solution: "Implemented technical Core Web Vitals fixes, JSON-LD schema architecture, and 16 deep human-researched topic clusters mapping commercial buyer search intent.",
      result: "Achieved page 1 rankings across high-value commercial queries, increasing organic inbound leads by 210% and driving continuous customer acquisition.",
      metric: "+210% Organic Inbound Leads"
    },
    faqs: [
      {
        q: "How long does it take to see SEO results?",
        a: "Most sites see early movement in 3 to 4 months and strong results by month 6 to 9. SEO compounds over time, so traffic keeps growing even after the campaign matures, unlike ads that stop the day you stop paying."
      },
      {
        q: "Does Google treat AI-written content differently than human content?",
        a: "Yes. Google's systems are built to detect and demote generic AI content that lacks real expertise or original insight. Human-researched writing that shows real experience tends to rank higher and hold its position through algorithm updates."
      },
      {
        q: "What is JSON-LD schema markup and why does it matter?",
        a: "JSON-LD schema is structured code added to your pages that tells search engines exactly what your content means. It helps you show up in rich results, featured snippets, and AI-generated answers instead of getting misread or ignored."
      },
      {
        q: "What's the difference between vanity traffic and commercial intent leads?",
        a: "Vanity traffic is visitors who never buy anything, often from broad, low-value keywords. Commercial intent leads come from searches showing real buying interest, like 'best CRM for small business.' Metazivo targets the second type."
      },
      {
        q: "How does SEO cost compare to Google Ads over time?",
        a: "Google Ads traffic stops the moment you stop paying. SEO traffic keeps flowing long after the work is done, so the cost per visitor drops every month a page keeps ranking. Most businesses see SEO become cheaper than ads within a year."
      },
      {
        q: "Do Core Web Vitals and mobile speed really affect rankings?",
        a: "Yes. Google uses Core Web Vitals — loading speed, interactivity, and visual stability — as a direct ranking factor. Slow or unstable mobile pages rank lower even with strong content, since most searches now happen on phones."
      },
      {
        q: "What is topical authority and why does it matter?",
        a: "Topical authority means Google sees your site as a complete, trustworthy source on a subject, not just one page that happens to match a keyword. Sites with full topic clusters consistently outrank single articles, even well-written ones."
      },
      {
        q: "What's the risk of black-hat backlinks versus white-hat link building?",
        a: "Black-hat backlinks (bought links, spam networks) can trigger Google penalties that tank your rankings overnight. White-hat link building earns links through real outreach and quality content, which builds authority safely and holds up over time."
      },
      {
        q: "How do Google algorithm updates affect well-optimized sites?",
        a: "Sites built on real technical foundations and genuine expertise usually stay stable or even gain ground during updates. Algorithm changes mainly punish thin content, keyword stuffing, and manipulative tactics — the things Metazivo avoids by design."
      },
      {
        q: "How do you report on SEO results and ROI?",
        a: "We track rankings, organic traffic, and — most importantly — conversions and leads generated from search. Monthly reports show real business impact, not just traffic numbers, so you always know what your investment is actually producing."
      }
    ]
  },
  {
    id: "srv-webdev",
    title: "High-Performance Website Development",
    slug: "website-development",
    icon: "Code",
    description: "Custom React & Next.js websites built for businesses that demand sub-second load times, clean code, and higher search rankings.",
    longDescription: "A slow website quietly drains your sales every day. If your pages take more than 2 seconds to load, potential clients click away and hire your competitor instead. We build custom web applications using React and Next.js with server-side rendering and edge caching. We write clean, semantic HTML and Tailwind CSS from scratch. No bulky builders, no unnecessary dependencies. Your site scores 95+ on Google PageSpeed Insights, keeps visitors engaged, and gives search engines the clean structure they reward.",
    benefits: [
      "Clean, hand-written React code with minimal third-party dependencies",
      "95+ score on Google PageSpeed Insights for both mobile and desktop",
      "Mobile-first responsive layouts that guide visitors straight to your contact or checkout",
      "Static file generation and server caching for reliable uptime during traffic spikes",
      "Built-in OpenGraph cards, structured schema markup, and clean URLs"
    ],
    process: [
      "User Journey Mapping & Wireframing",
      "High-Fidelity Custom Figma UI Design",
      "Clean Frontend Development & API Integration",
      "Security Audit & Production Launch"
    ],
    startingPrice: "From $449",
    deliverables: [
      "Custom React/Next.js Codebase",
      "Google PageSpeed 95+ Hardening",
      "Mobile-First Responsive Layouts",
      "Integrated Web Analytics & Schema"
    ],
    seoTitle: "Next.js & React Web Development Agency | Metazivo",
    seoDescription: "Custom full-stack React & Next.js web development. Sub-second load speeds, 95+ Core Web Vitals, and conversion-focused user interfaces.",
    fullFulfillmentCopy: "Your website is your first impression. When someone finds your business from a search result or ad, you have roughly three seconds to show them you are legitimate. We build high-speed websites with Next.js and React. By combining server-side rendering with edge caching, your pages appear almost instantly on any device. We write semantic HTML by hand, optimize images before they load, and keep JavaScript bundles tiny. That gives your visitors a smooth browsing experience and gives Google the exact Core Web Vitals signals it needs to rank you higher.",
    caseStudy: {
      title: "Speed & Conversion Re-architecture",
      challenge: "A digital service company had a legacy website that failed Core Web Vitals, resulting in high advertising bounce rates.",
      solution: "Migrated the entire design to a custom React architecture with automated next-gen image compression and streamlined script delivery.",
      result: "Achieved a 99/100 score on Google PageSpeed Insights and reduced ad bounce rate by 55%.",
      metric: "99/100 PageSpeed Score"
    },
    faqs: [
      {
        q: "Why choose custom React/Next.js over a basic website builder?",
        a: "React provides immediate page transitions, full design flexibility, and complete freedom from the plugin conflicts, bloat, and database crashes common in drag-and-drop builders."
      },
      {
        q: "What are Core Web Vitals, and why does Google care?",
        a: "Core Web Vitals measure real-world user experience: how fast a page loads (LCP), how quickly it responds to taps (INP), and whether elements jump around while loading (CLS). Fast-loading sites rank higher and convert more visitors."
      }
    ]
  },
  {
    id: "srv-meta-ads",
    title: "Meta Ads (Facebook & Instagram) Acquisition System",
    slug: "meta-ads-advertising",
    icon: "TrendingUp",
    description: "Targeted Facebook and Instagram campaigns with direct-response copy, custom creative assets, and server-side tracking that captures real sales.",
    longDescription: "Boosting posts is the fastest way to burn your marketing budget. Real advertising success comes from a structured funnel. We build paid campaigns across Meta (Facebook & Instagram) that turn strangers into paying buyers. We write direct, benefit-focused ad copy, design visual creatives that stop people from scrolling, and set up the server-side Conversions API (CAPI). That means your attribution data remains accurate even after iOS privacy updates, allowing the ad algorithm to find qualified buyers at a lower cost per lead.",
    benefits: [
      "Clear sales funnels designed for customer acquisition, not vanity clicks",
      "Direct-response ad copy focused on solving your buyer's specific problems",
      "Custom audience segments and lookalikes built from your best historical buyers",
      "Server-side Meta Conversions API (CAPI) for 100% pixel tracking precision",
      "Clean instant lead forms and conversion-focused landing page layouts"
    ],
    process: [
      "Customer Avatar Profiling & Competitor Ad Analysis",
      "Visual Creative Design & Script Writing",
      "Meta Pixel & Server-Side Conversions API (CAPI) Setup",
      "Weekly Split-Testing & Budget Scaling"
    ],
    startingPrice: "From $120",
    deliverables: [
      "Ad Campaign Funnel Design",
      "Custom Creative Assets & Variations",
      "Direct-Response Ad Copywriting",
      "Server-Side CAPI Tracking Setup"
    ],
    seoTitle: "High-ROI Meta Ads (Facebook & Instagram) Agency | Metazivo",
    seoDescription: "Systematic paid advertising funnels that convert. Direct-response ad copywriting, high-performing creatives, and pixel-perfect server-side CAPI setups.",
    fullFulfillmentCopy: "Most businesses lose money on social media ads because they treat boosting posts as a strategy. You get likes, but zero sales calls. We build multi-step acquisition funnels. First, we identify what your ideal customer actually cares about. Then we write copy that directly addresses their problems and create visual assets that stand out in crowded feeds. We also install Meta's Conversions API directly on your server, ensuring every lead and sale is tracked accurately even with iOS ad blockers. That feeds clean data back into Meta's algorithm so your cost per acquisition drops as you scale.",
    caseStudy: {
      title: "Direct-Response E-commerce Scale",
      challenge: "A skincare brand was struggling with rising customer acquisition costs and an unprofitable 1.2x Return on Ad Spend (ROAS).",
      solution: "Deployed a systematic retargeting funnel with direct-response visual assets and custom CAPI server-side tracking.",
      result: "Lowered acquisition costs by 45% and boosted ROAS to a stable, profitable 4.8x.",
      metric: "4.8x Return on Ad Spend"
    },
    faqs: [
      {
        q: "What makes your Meta Ads strategy different from standard marketing agencies?",
        a: "We combine direct-response copywriting with deep technical setups like server-side Conversion APIs. This gives Meta's machine learning cleaner data, which lowers your cost per lead."
      },
      {
        q: "Do I need a separate budget for advertising spend?",
        a: "Yes. Our fee covers strategy, ad copywriting, creative design, and campaign management. You pay your ad budget directly to Meta based on what you want to invest."
      }
    ]
  },
  {
    id: "srv-smm",
    title: "Social Media Management & Video Reels",
    slug: "social-media-management",
    icon: "Activity",
    description: "Consistent feed design, short-form video editing, and clear copywriting that build trust and keep your brand in front of buyers.",
    longDescription: "An inactive social media profile makes a business look closed. When clients search for you and find a page that hasn't posted in six months, they hesitate. We take full control of your organic social presence on Instagram, TikTok, and LinkedIn. We plan cohesive feeds, edit short-form reels with clean captions and sound design, write clear descriptions, and maintain a consistent posting calendar. You run your operations while we keep your brand visible, professional, and active.",
    benefits: [
      "Professional feed layouts that show your business is active and credible",
      "Short-form video editing with concise pacing, on-screen text, and clean audio",
      "Scriptwriting and captions that focus on educating your target buyers",
      "Consistent scheduling so your audience hears from you every week",
      "Hands-off workflow — we handle the planning, editing, and publishing"
    ],
    process: [
      "Visual Brand Audit & Content Strategy",
      "Video Scripting & Creative Asset Batching",
      "Video Editing & Caption Copywriting",
      "Content Calendar Scheduling & Community Publishing"
    ],
    startingPrice: "From $100",
    deliverables: [
      "Cohesive Feed Layouts & Graphic Templates",
      "Short-Form Video Scriptwriting",
      "Caption Copywriting with Focused Calls-to-Action",
      "Automated Multi-Platform Scheduling"
    ],
    seoTitle: "Social Media Management & Video Reels Agency | Metazivo",
    seoDescription: "Turn passive followers into qualified buyers. We handle feed planning, short-form video editing, copywriting, and consistent content publishing.",
    fullFulfillmentCopy: "When potential clients consider hiring you, they check your social channels to see if you are active. A dead profile creates doubt; a sharp, consistent presence builds trust immediately. We run your organic channels from start to finish. We write scripts, edit your raw video footage into short reels with clear captions, design branded carousel slides, and schedule posts at optimal times. You don't have to spend hours thinking about what to post or wrestling with video editing software—we keep your brand looking professional every day.",
    caseStudy: {
      title: "Real Estate Client Acquisition Strategy",
      challenge: "A real estate brokerage had under 1,000 followers and zero inquiries coming from their social channels.",
      solution: "Implemented a clean organic grid design paired with 3 informative video reels weekly addressing local property buyer questions.",
      result: "Grew follower count to 14,000+ in 90 days and closed 3 property deals directly from Instagram inquiries.",
      metric: "14,000+ Followers in 90 Days"
    },
    faqs: [
      {
        q: "Do we need to spend hours recording videos or writing captions?",
        a: "No. We handle the heavy lifting. We give you clear scripts or prompt questions, you record brief clips on your phone, and we do all the editing, captions, cover art, and scheduling."
      },
      {
        q: "Can you manage profiles across multiple networks simultaneously?",
        a: "Yes. Our standard package includes cross-posting across Instagram, TikTok, Facebook, and LinkedIn so your content reaches your audience wherever they spend time."
      }
    ]
  },
  {
    id: "srv-branding",
    title: "Brand Identity & Logo Design",
    slug: "graphic-design-branding",
    icon: "Palette",
    description: "Vector logos, clear brand guidelines, and professional marketing materials that make your business look established and credible.",
    longDescription: "If your logo looks like a free Canva template, clients will assume your work is low quality. First impressions set the ceiling on what you can charge. We create clean, distinctive logo systems with complete brand guidelines—including typography rules, primary and secondary color palettes, and digital asset templates. You get scalable vector files that look sharp on business cards, apparel, websites, and large signage.",
    benefits: [
      "Clean vector logo designs built from scratch for your specific industry",
      "Brand style guide covering color codes (HEX, RGB, CMYK) and font pairings",
      "Print-ready and digital assets formatted for web, social media, and packaging",
      "Full ownership of all source files (AI, SVG, EPS, PNG, PDF)",
      "Consistent visual rules so your team always presents a unified brand"
    ],
    process: [
      "Brand Briefing & Industry Research",
      "Concept Development & Sketching",
      "Color Palette & Typography Selection",
      "Vector Asset Finalization & Brand Guidelines Delivery"
    ],
    startingPrice: "From $80",
    deliverables: [
      "Vector Logo System (Primary, Secondary, Mark)",
      "Comprehensive Brand Guidelines Manual",
      "Social Media Profile & Banner Templates",
      "All Scalable High-Resolution Source Files"
    ],
    seoTitle: "Corporate Logo Design & Brand Identity Agency | Metazivo",
    seoDescription: "Make your business look established with custom vector logos, complete color palettes, typography guidelines, and official brand style manuals.",
    fullFulfillmentCopy: "Your visual branding is the handshake your company offers before a customer ever talks to you. If your branding looks messy or dated, buyers wonder if your actual services are cut-rate too. We design clean vector logos and complete identity packages. We research your competitors so your look is distinct, choose color palettes that build trust, and select typography that is easy to read across screens and print. When we hand over the project, you receive all raw vector files and an easy-to-follow guide so anyone designing for your company stays completely on-brand.",
    caseStudy: {
      title: "Consultancy Rebrand & Visual Identity",
      challenge: "An engineering consultancy was losing large bids to larger firms because their logo and presentation decks looked dated.",
      solution: "Created a minimalist, modern visual identity and delivered a comprehensive 24-page brand style guide covering documents, web, and print.",
      result: "Increased their average proposal pricing by 35% and closed a major corporate contract within 60 days of launching the new identity.",
      metric: "35% Increase in Average Contract Size"
    },
    faqs: [
      {
        q: "What files and formats are included in the final brand package?",
        a: "You receive master vector files (AI, EPS, SVG) and high-resolution web formats (PNG, JPG, PDF), with transparent backgrounds, dark and light versions, and social profile crops."
      },
      {
        q: "Who owns the copyright of the final logo designs?",
        a: "You do. Upon project completion and final payment, 100% intellectual property ownership and commercial copyrights belong exclusively to your company."
      }
    ]
  },
  {
    id: "srv-video",
    title: "Video Editing & Content Repurposing",
    slug: "video-editing",
    icon: "Video",
    description: "Clean video post-production with concise pacing, accurate subtitles, clear audio, and color correction for reels, ads, and long-form content.",
    longDescription: "Muffled audio, long pauses, and clumsy cuts make viewers click away in seconds. We turn your raw recordings into clean, engaging videos. We cut out filler words, balance audio levels, add styled on-screen captions, and apply natural color correction. Whether you need 30-second TikTok and Instagram ad clips or a 15-minute YouTube explainer, we deliver finished files ready to publish.",
    benefits: [
      "Clean jump-cuts and pacing that keep viewers watching without dead air",
      "Accurate, styled on-screen captions so viewers can follow without sound",
      "Background audio leveling and noise removal for crisp, clear speech",
      "Vertical (9:16) and horizontal (16:9) formats rendered in 1080p or 4K",
      "Fast 24 to 48-hour delivery for standard short-form videos"
    ],
    process: [
      "Raw Footage Review & Pacing Assembly",
      "Jump-Cutting, Zoom Trimming & Filler Word Removal",
      "Audio Balancing, Noise Reduction & Sound FX",
      "Color Correction, Subtitle Styling & Export"
    ],
    startingPrice: "From $15",
    deliverables: [
      "Instagram Reels & TikToks (9:16)",
      "Facebook & YouTube Video Formats",
      "Paid Video Ad Variations with Hooks"
    ],
    seoTitle: "Professional Video Editing & Post-Production | Metazivo",
    seoDescription: "High-retention video editing services. Clean pacing, styled animated captions, sound balancing, and color correction for reels, TikToks, and video ads.",
    fullFulfillmentCopy: "Most viewers watch social video with the sound off, and they decide whether to keep watching in the first three seconds. If your video is slow to start, has muffled sound, or lacks clear captions, they scroll right past. We edit your raw footage to keep it tight and informative. We remove pauses, balance your vocal track, add on-screen text that highlights key points, and export in the right aspect ratio for each platform. You send us raw clips from your phone or camera, and we return polished videos ready to upload.",
    caseStudy: {
      title: "Course Preview Video Optimization",
      challenge: "An education company had high drop-off rates on their preview videos, with most viewers leaving in the first 15 seconds.",
      solution: "Restructured the opening hooks, trimmed dead pauses, added clear animated subtitles, and applied clean audio leveling.",
      result: "Average video watch time increased by 210% and course signup page clicks rose by 68%.",
      metric: "210% Increase in Watch Time"
    },
    faqs: [
      {
        q: "What file formats and resolutions do you deliver?",
        a: "We deliver MP4 files optimized for web and social platforms in both vertical (9:16 for Reels/TikTok/Shorts) and horizontal (16:9 for YouTube/Web) formats, rendered in 1080p or 4K."
      },
      {
        q: "What is your typical turnaround time?",
        a: "For short-form videos under 60 seconds, we deliver within 24 to 48 hours. Long-form video turnaround depends on footage length and is scheduled upfront."
      }
    ]
  },
  {
    id: "srv-saas",
    title: "SaaS Applications",
    slug: "saas-applications",
    icon: "Cloud",
    description: "Custom multi-tenant software platforms built with React, Node.js, and secure databases. Includes Stripe billing and user management.",
    longDescription: "Launching a software product requires more than a pretty interface. You need secure database isolation, reliable subscription billing, and an admin dashboard that gives you control over user accounts. We engineer custom SaaS applications with React on the frontend and Node/Express on the backend. We integrate Stripe for recurring plans, implement JWT authentication, set up role-based permissions, and build interactive analytics so your customers have a smooth, dependable experience from day one.",
    benefits: [
      "Multi-tenant database design that keeps each customer's data isolated and secure",
      "Stripe billing integration supporting recurring plans, trials, and invoices",
      "Role-based access control (Admin, Manager, Member) with secure JWT sessions",
      "Interactive dashboard with clean charts, data tables, and CSV exports",
      "Container-ready architecture built for reliable uptime and easy hosting"
    ],
    process: [
      "Database Schema Modeling & API Architecture",
      "Dashboard Interface Design & Prototyping",
      "Stripe Subscription Checkout & Webhook Integration",
      "Security Auditing & Load Testing"
    ],
    startingPrice: "From $449",
    deliverables: [
      "Custom Full-Stack Code (React + Node/Express)",
      "Stripe Subscription & Webhook Integration",
      "Role-Based Authentication & Permissions",
      "Admin & Customer Analytics Dashboards"
    ],
    seoTitle: "SaaS Application Development Agency | Full-Stack React | Metazivo",
    seoDescription: "Build secure, scalable multi-tenant SaaS platforms. Stripe subscription billing, role-based access control, and custom analytics dashboards.",
    fullFulfillmentCopy: "Building a SaaS application requires rock-solid backend architecture, absolute data isolation, and smooth billing integrations. We design full-stack SaaS platforms with custom Express APIs and responsive React dashboards. We construct multi-tenant databases to keep customer accounts completely separated, configure Role-Based Access Control (RBAC), and integrate Stripe for recurring subscriptions and automated invoices. Complete with dynamic data charts and secure authentication, we give you the foundation to launch your product with confidence.",
    caseStudy: {
      title: "Consulting Workflow Platform",
      challenge: "A management firm wanted to turn their internal consulting workflow into a subscription software tool but lacked an in-house engineering team.",
      solution: "Engineered a secure multi-tenant React and Node SaaS application with tiered Stripe subscriptions and an interactive task management dashboard.",
      result: "Successfully launched to 500+ paying organizations, establishing reliable recurring revenue.",
      metric: "500+ Active Paying Organizations"
    },
    faqs: [
      {
        q: "How do you protect customer data in a multi-tenant application?",
        a: "We enforce strict tenant ID scoping on every database query, hash passwords using bcrypt, use secure HTTP-only cookies for JWT session tokens, and validate all API request parameters."
      },
      {
        q: "Can you help migrate our existing client data into the new platform?",
        a: "Yes. We build custom migration scripts to safely transfer customer records, historical data, and settings from spreadsheets or legacy databases."
      }
    ]
  },
  {
    id: "srv-chatbots",
    title: "Chatbots",
    slug: "chatbots",
    icon: "MessageSquare",
    description: "Automated customer support & sales chatbots trained on your documentation to answer questions and capture leads 24/7.",
    longDescription: "When someone visits your website at 9 PM on a Sunday with questions about your services, waiting for an email reply often means losing them to a competitor who answers first. We build custom chatbots trained directly on your service documentation, FAQs, and pricing guidelines. They answer customer questions accurately, capture email and phone details, and offer direct links to your booking calendar. When a complex issue arises, they route the conversation directly to your team.",
    benefits: [
      "Trained strictly on your verified documents to prevent made-up or inaccurate answers",
      "Automated lead capture that collects contact details before booking meetings",
      "Calendar integration so interested prospects can pick a time immediately",
      "Clean chat transcript logs sent directly to your email or Slack channel",
      "Lightweight web widget that loads quickly without slowing down your site"
    ],
    process: [
      "Knowledge Base Preparation & System Guardrails",
      "Conversational Flow Design & Tool Integrations",
      "Web Chat Widget Styling & Site Integration",
      "Response Accuracy Testing & Verification"
    ],
    startingPrice: "From $449",
    deliverables: [
      "Custom-Trained AI Chat Widget",
      "Calendar Booking & Lead Capture Integration",
      "Email & CRM Webhook Notifications",
      "Knowledge Base Documentation Setup"
    ],
    seoTitle: "AI Chatbots & Conversational Agents | Metazivo",
    seoDescription: "Automate customer support and sales lead capture. Deploy custom-trained chatbots that qualify leads, answer FAQs, and book calls 24/7.",
    fullFulfillmentCopy: "When a potential buyer visits your website, they want immediate answers. If they have to wait hours for an email reply, they will simply check another provider. Our custom-trained chatbots act as your 24/7 first responder. We feed the model with your company's service specs, pricing guidelines, and FAQs, setting strict boundaries so it stays helpful and accurate. The chatbot answers common questions, gathers lead contact information, and guides prospects to your booking calendar.",
    caseStudy: {
      title: "After-Hours Lead Capture System",
      challenge: "A professional services firm was missing weekend and evening inquiries because nobody was available to answer questions.",
      solution: "Deployed a custom-trained chatbot grounded in the firm's service catalog and linked to their consultation calendar.",
      result: "Captured and qualified 48 new prospective client leads in the first month, increasing booked calls by 73%.",
      metric: "+73% Increase in Booked Calls"
    },
    faqs: [
      {
        q: "Will the chatbot give inaccurate information or hallucinate answers?",
        a: "No. We set strict system instructions and ground the model strictly in the documents you provide. If a visitor asks something outside that scope, the bot politely directs them to your contact form."
      },
      {
        q: "Can the chatbot connect with our existing tools?",
        a: "Yes. We can route lead notifications to your email, Slack, HubSpot, or any CRM with webhook support."
      }
    ]
  }
];

export const pricingPlans = [
  {
    id: "plan-start",
    name: "Startup Core",
    price: "$100",
    period: "one-time",
    description: "Ideal for new businesses needing a clean, fast website to establish credibility.",
    features: [
      "Custom Website (up to 5 Pages)",
      "Fully Responsive Mobile Layout & Clean Modern UI",
      "Core Web Vitals Hardened (90+ Speed Score)",
      "Basic On-Page SEO Configuration",
      "Contact Form Integration with Email Alerts",
      "Google Analytics & XML Sitemap ready",
      "1 Month Dedicated Security Support"
    ],
    cta: "Launch My Website",
    popular: false
  },
  {
    id: "plan-video",
    name: "Professional Video & Reels",
    price: "$120",
    period: "month",
    description: "For creators and business owners who need consistent, high-retention short-form video content.",
    features: [
      "12x Edited Reels / TikToks per month",
      "Engaging Auto-Captions with Brand Styling",
      "Sound Balancing & Crisp Audio Cleanup",
      "Color Correction & Natural Grading",
      "Jump-cut trimming & dead pause removal",
      "Formatted for YouTube Shorts & IG Reels (9:16)",
      "24-48 hour turnaround per video",
      "Includes 1 custom animated visual intro/outro"
    ],
    cta: "Start Video Production",
    popular: false
  },
  {
    id: "plan-growth",
    name: "Business Growth",
    price: "$199",
    period: "month",
    description: "Our signature growth plan to capture search rankings, publish helpful content, and acquire buyers.",
    features: [
      "Custom High-Performance Website",
      "Comprehensive Technical & Local SEO Setup",
      "Weekly High-Value SEO Articles (4 Posts/mo)",
      "Meta Ads Funnel Design & Ad Copywriting",
      "Structured Schema.org JSON-LD Markup",
      "95+ Google PageSpeed Guarantee",
      "Automated WebP Image Compression",
      "8x Professional Short-form Videos (Reels/TikToks)",
      "Bi-Weekly Strategy & Reporting Calls",
      "24/7 Priority Support & Maintenance"
    ],
    cta: "Scale My Business",
    popular: true
  },
  {
    id: "plan-dev",
    name: "App & SaaS Development",
    price: "$449",
    period: "starting",
    description: "High-performance mobile apps, multi-tenant SaaS platforms, custom AI integrations, and automated chatbots.",
    features: [
      "Custom Flutter/React Native Mobile App or SaaS",
      "Server-Side AI Integration (Voice, Prompts, LLMs)",
      "Automated Support Chatbots & CRM Integrations",
      "Stripe Subscription Engine & User Accounts System",
      "Administrative Analytics Dashboard (Charts, Tables)",
      "High-Performance Database Setup (SQL or Firestore)",
      "App Store & Play Store Deployment Support",
      "3 Months Dedicated Support & Security Auditing"
    ],
    cta: "Start My Custom App",
    popular: false
  },
  {
    id: "plan-enterprise",
    name: "Enterprise Custom",
    price: "Custom",
    period: "quote",
    description: "Complete full-stack engineering, custom software infrastructure, and dedicated growth support.",
    features: [
      "Custom Full-Stack Web App (React + Express)",
      "Custom WooCommerce or Shopify Architecture",
      "Cross-Platform Ads (Meta + Google + LinkedIn)",
      "Content Strategy & Automated XML Feeds",
      "Comprehensive SEO Audits & Backlink Strategy",
      "Full Video Production & Post-Production",
      "Dedicated Technical Account Lead",
      "99.9% Server SLA & Backup Strategy",
      "Custom Database Migrations Support"
    ],
    cta: "Speak with Our Team",
    popular: false
  }
];

export const portfolioItems = [
  {
    id: "port-1",
    title: "Sleek Skincare - WooCommerce Sales Engine",
    category: "WordPress & WooCommerce Development",
    image: wpMockup,
    metrics: "1.2s Load Time | +240% Sales Volume",
    description: "Built a lightweight WooCommerce store from scratch, replacing bloated plugins with custom Gutenberg blocks. Reduced checkout friction to boost direct orders by 240%."
  },
  {
    id: "port-2",
    title: "Apex Logistics - Search Visibility Growth",
    category: "SEO & Authority Blog Content",
    image: seoMockup,
    metrics: "#1 Position on Google | +350% Organic Leads",
    description: "Built semantic topic clusters, deployed structural JSON-LD schemas, and resolved crawl errors. Tripled organic monthly inquiries without spending on ads."
  },
  {
    id: "port-3",
    title: "Lumina Homes - High-Lead Acquisition Funnel",
    category: "Meta Ads (Facebook & Instagram) Leads",
    image: metaAdsMockup,
    metrics: "6.2x Return on Ad Spend (ROAS)",
    description: "Designed high-converting Lead Instant Forms, server-side Conversion APIs, and hyper-targeted custom audience lookalikes to capture hundreds of qualified buyer leads."
  },
  {
    id: "port-4",
    title: "Verdant Retail - High-Performance Web App",
    category: "Custom Web App Development",
    image: customReactMockup,
    metrics: "99/100 Core Web Vitals Speed Score",
    description: "Engineered a fast, modern React/Next.js portal with server-side caching and clean UI layouts, resulting in smooth performance across all mobile devices."
  },
  {
    id: "port-5",
    title: "Salams Muslim Marriage - Global Matrimony App",
    category: "Mobile Application Development",
    image: salamsMockup,
    metrics: "4M+ Successful Matches | Native-Speed Flutter Engine",
    description: "Optimized and scaled the global Muslim matchmaking experience. Built high-performance card swipe mechanics, localized matching, secure real-time chats, and custom search layouts in Flutter.",
    playStoreUrl: "https://apps.apple.com/us/app/salams-halal-muslim-marriage/id965359176"
  },
  {
    id: "port-6",
    title: "Orange Beam (OB Dev) - Field Project Sync",
    category: "Mobile Application Development",
    image: obdevMockup,
    metrics: "100% Offline Workflow Sync | Custom REST API",
    description: "Built a native-performance Flutter tracking workspace for building and construction management. Captures real-time project metrics, daily schedules, site reporting logs, and secure offline-first local cache.",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.orangebeam.obdev"
  },
  {
    id: "port-7",
    title: "OPVG Family - Global Volunteer Community App",
    category: "Mobile Application Development",
    image: opvgMockup,
    metrics: "50K+ Active Volunteers | Verified Play Store Rating",
    description: "Designed a clean, intuitive cross-platform community app for the Overseas Pakistani Voters Group. Features dynamic voter registry verification tools, volunteer forums, and automated push notices.",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.family.opvgfamily"
  }
];

export const workProcessTimeline = [
  {
    step: "01",
    title: "Technical Audit & Discovery",
    desc: "We scan your current website, identify slow scripts, fix crawl errors, and analyze where your competitors are getting their traffic."
  },
  {
    step: "02",
    title: "Custom Growth Roadmap",
    desc: "We map out clean wireframes, identify high-intent search keywords, and structure your conversion funnels before writing a single line of code."
  },
  {
    step: "03",
    title: "Clean Code & Fast Architecture",
    desc: "Our engineers write lightweight, clean code with responsive mobile layouts, fast database queries, and zero unnecessary scripts."
  },
  {
    step: "04",
    title: "Speed Hardening & SEO Verification",
    desc: "We compress all images to WebP, verify structured schema markup, test Core Web Vitals, and make sure your pages score 95+ on PageSpeed."
  },
  {
    step: "05",
    title: "Launch & Performance Tracking",
    desc: "We submit clean XML sitemaps to Google Search Console, set up conversion tracking, and monitor live traffic to ensure smooth growth."
  }
];

export const faqList = [
  {
    question: "How does Metazivo achieve 95+ PageSpeed scores?",
    answer: "We avoid heavy pre-built templates and bloated plugins. By compiling assets into optimized bundles, serving compressed WebP images, utilizing server-side caching, and writing clean React and Tailwind utility classes, we guarantee extreme speeds."
  },
  {
    question: "Do you integrate AI features into the CMS?",
    answer: "Yes! Our custom WordPress-style CMS has a built-in AI SEO Assistant powered by server-side Gemini AI. It automatically generates high-impact Meta titles, descriptions, excerpts, FAQ schemas, and social captions."
  },
  {
    question: "Is your contact form secure from automated spam?",
    answer: "Absolutely. Our contact form is engineered with server-side validation and is pre-configured for Google reCAPTCHA, filtering out robotic submissions while storing real leads in our database."
  },
  {
    question: "Can I migrate my existing slow website to Metazivo?",
    answer: "Redesigns and speed migrations are a core specialty. We completely extract your old content, rebuild the site using professional layouts, and set up 301 Redirect Rules so you retain 100% of your search engine authority."
  },
  {
    question: "What support do you provide post-launch?",
    answer: "We provide comprehensive service plans covering automated cloud database backups, regular speed audits, core security monitoring, and active keyword ranking tracker audits."
  }
];

export const testimonials = [
  {
    id: "trust-1",
    name: "Professional Service",
    role: "Dedicated expert team ensuring flawless execution of your web projects.",
    avatar: "",
    text: "Dedicated expert team ensuring flawless execution of your web projects.",
    rating: 5
  },
  {
    id: "trust-2",
    name: "Transparent Communication",
    role: "Regular updates, detailed reporting, and absolute clarity at every step.",
    avatar: "",
    text: "Regular updates, detailed reporting, and absolute clarity at every step.",
    rating: 5
  },
  {
    id: "trust-3",
    name: "No Empty Promises",
    role: "Real metrics, sustainable growth, and honest consultation.",
    avatar: "",
    text: "Real metrics, sustainable growth, and honest consultation.",
    rating: 5
  },
  {
    id: "trust-4",
    name: "On-Time Delivery",
    role: "Strictly respecting deadlines and launching within planned timelines.",
    avatar: "",
    text: "Strictly respecting deadlines and launching within planned timelines.",
    rating: 5
  }
];

export const trustedCompanies = [
  "Google Partner", "Meta Business Partner", "Shopify Experts", "WooCommerce Premium", "Hostinger Certified", "PageSpeed 99+"
];
