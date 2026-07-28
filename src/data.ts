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
    description: "Intelligent mobile applications embedded with server-side LLMs, Gemini AI features, real-time voice, and smart triggers.",
    longDescription: "Artificial Intelligence is redefining the software landscape. We build next-generation AI Mobile Applications that embed advanced machine learning models, natural language processing, and real-time computer vision. Powered by server-side Gemini, OpenAI, or custom local models, our AI apps offer super-fast smart recommendations, automatic content generation, advanced search capabilities, and personalized conversational layers. Stand out in the app stores with a highly optimized, future-proof AI application.",
    benefits: [
      "Custom AI models and Gemini API integrations secure from client-side leaks",
      "Interactive smart agents capable of natural dialogue and task automation",
      "High-speed voice-to-text, real-time translations, and computer vision features",
      "Staggering visual designs paired with super-fast database caching",
      "Complete metrics reporting to monitor API costs and user engagement"
    ],
    process: [
      "AI Capabilities Blueprint & Architecture Design",
      "Prompt Engineering & Server-Side LLM Integration",
      "Cross-Platform UI/UX Frontend Engineering",
      "Performance Tuning & Cloud Ingress Cost Safeguards"
    ],
    startingPrice: "From $449",
    deliverables: [
      "Cross-Platform Flutter/React Native Builds",
      "Server-Side Gemini/OpenAI API Proxies",
      "Real-Time AI Voice & Translation Engines",
      "Secure User State Persistence"
    ],
    seoTitle: "AI Mobile App Development Services | Metazivo",
    seoDescription: "Deploy secure, high-yield custom iOS & Android applications with advanced Gemini AI integrations, natural voice processing, and smart automated triggers.",
    fullFulfillmentCopy: "In today's digital landscape, a mobile app is no longer just a luxury—it is the direct command center for your client relationships. Standard apps suffer from high uninstall rates because they lack active, personalized utility. By embedding server-side LLMs and real-time Gemini intelligence directly into your app structures, we turn static screens into proactive growth systems. Your clients get real-time advice, automatic voice translations, and conversational interfaces that keep them coming back every single day. Most importantly, we handle all LLM calls on our secure server, preventing your critical API keys from ever leaking to the client side.",
    caseStudy: {
      title: "Intelligent Client Engagement System",
      challenge: "An international e-commerce startup had high cart abandonment rates and poor engagement.",
      solution: "Built a custom React Native app featuring a Gemini-powered personal shopping assistant and personalized smart notifications.",
      result: "Cart conversion rate boosted by 142% and daily active users increased by 3.5x.",
      metric: "+142% Conversion Rate"
    },
    faqs: [
      {
        q: "How do server-side AI integrations protect my API keys?",
        a: "We route all requests through secure Express backend proxies. This means your private Gemini API keys never sit on a user's phone, completely preventing unauthorized access and unexpected credit costs."
      },
      {
        q: "Will the app support both iOS and Android platforms?",
        a: "Yes. We use cross-platform frameworks like Flutter and React Native to deliver perfect native performance on both operating systems from a single, robust codebase."
      }
    ]
  },
  {
    id: "srv-wp",
    title: "WordPress & WooCommerce Sales Engines",
    slug: "wordpress-development",
    icon: "Layout",
    description: "Ditch bloated templates. Get ultra-fast custom WordPress & WooCommerce stores optimized for continuous sales.",
    longDescription: "Most WordPress websites are built on heavy templates that crash, load slowly, and repel clients. We construct high-converting, lightweight WordPress and WooCommerce sales engines. By designing custom blocks and discarding bloated plugins, we ensure your sales pipelines and online store products load instantly. Your checkouts are optimized with a frictionless 1-click flow, and your database is configured for absolute speed. This is a robust investment designed to scale your business, rank higher on search engines, and maximize your profits without any maintenance headaches.",
    benefits: [
      "100% bespoke custom-coded theme blocks – absolutely zero bulky template code",
      "WooCommerce checkouts optimized for maximum checkout speed and conversion",
      "Advanced caching, extreme security setups, and automated hourly cloud backups",
      "Ultimate admin simplicity – easily update text, images, and blogs in seconds",
      "Built-in local conversion rate optimization (CRO) widgets"
    ],
    process: [
      "Structure Design & Secure Database Provisioning",
      "Lightweight Custom Theme Development & Testing",
      "WooCommerce Cart & payment gateways integration",
      "Extreme speed optimization & security deployment"
    ],
    startingPrice: "From $150",
    deliverables: [
      "Custom Theme & Gutenberg Blocks",
      "WooCommerce Integration",
      "1-Click Frictionless Checkout",
      "Hourly Cloud Backups"
    ],
    seoTitle: "Custom WordPress & WooCommerce Development | Metazivo",
    seoDescription: "Boost your e-commerce revenue with ultra-fast custom-coded WordPress blocks, optimized 1-click WooCommerce checkouts, and clean, database-level speed setups.",
    fullFulfillmentCopy: "Most developers hand you a WordPress site built on pre-made theme builders like Elementor or Divi. While they look fine initially, they load dozens of heavy CSS and JS files in the background. For every second your site takes to load, you lose 20% of your buyers. We build bespoke custom-coded theme blocks directly on the native Gutenberg editor. You get a clean, lightweight dashboard that is easy to edit, and your visitors get an instant page load speed under 1 second. We optimize your WooCommerce checkout down to a single-step flow, removing distractions and forcing conversion rates up.",
    caseStudy: {
      title: "Bespoke WooCommerce Sales Acceleration",
      challenge: "A premium clothing store suffered from a sluggish 6.4-second load time, leading to major client drop-offs.",
      solution: "Rebuilt the entire store with zero pre-made plugins, utilizing custom Gutenberg block structures and automated media optimizations.",
      result: "Page speed decreased to 0.8 seconds, and sales immediately shot up by 195% within 30 days.",
      metric: "0.8s Load Speed"
    },
    faqs: [
      {
        q: "Will I be able to edit my text and add new products easily without a builder?",
        a: "Absolutely. We build custom native blocks, meaning you can edit text, swap images, and publish blogs exactly like a Word document, with zero risk of breaking the layout."
      },
      {
        q: "Do you provide WooCommerce setup and payment gateway integration?",
        a: "Yes. We set up complete WooCommerce configurations, tax parameters, shipping metrics, and integrate reliable Stripe, PayPal, or local credit card processors."
      }
    ]
  },
  {
    id: "srv-mobileapp",
    title: "Mobile Application Development",
    slug: "mobile-app-development",
    icon: "Smartphone",
    description: "Bespoke native-performance iOS & Android applications built with modern cross-platform Flutter/React Native frameworks.",
    longDescription: "A premium mobile app is the ultimate touchpoint for modern client engagement. We build native-performance iOS and Android applications written with clean, maintainable Flutter or React Native structures. We discard slow web-views and heavy runtimes, designing gorgeous responsive views that run at 120 FPS. Integrated with secure local storage, push notification servers, real-time sync, and robust security, we submit your apps directly to the stores ready to scale.",
    benefits: [
      "High-performance native iOS & Android applications written from scratch",
      "Fully integrated push notifications, biometrics, and secure offline storage",
      "Fluid animations and responsive screens matching custom Figma designs",
      "Complete App Store and Google Play Store deployment guidelines",
      "Seamless integration with custom REST APIs and cloud databases"
    ],
    process: [
      "Mobile Wireframing & Interactive UI/UX Design",
      "Native-Performance Frontend & API Integration",
      "Rigorous Cross-Device Testing & Performance Tuning",
      "App Store & Google Play Store Submission"
    ],
    startingPrice: "From $449",
    deliverables: [
      "Native iOS & Android Builds",
      "App Store Publishing Support",
      "Push Notification Systems",
      "Biometrics & Local Storage Integrations"
    ],
    seoTitle: "iOS & Android App Development | Flutter & React Native",
    seoDescription: "High-performance native iOS and Android application development. We build cross-platform apps with 120 FPS performance, offline local caching, and secure API integrations.",
    fullFulfillmentCopy: "A slow, laggy app is worse than having no app at all. If your screens flicker or transitions stutter, your users will delete it. We write high-efficiency cross-platform applications using Flutter or React Native. This allows us to share 90% of the codebase across iOS and Android while maintaining true native compiling. Your app benefits from hardware-accelerated animations running at a smooth 120 FPS, secure offline database engines, and lightweight background push notification listeners that trigger without draining the user's battery.",
    caseStudy: {
      title: "Enterprise Logistics App Redeployment",
      challenge: "A logistics platform had a legacy app that constantly crashed offline, causing field workers to lose delivery tracking data.",
      solution: "Developed a robust cross-platform app utilizing reactive offline storage that automatically syncs with the central server upon detecting internet connection.",
      result: "Completely eliminated tracking data loss and boosted daily operational delivery speed by 42%.",
      metric: "0% Offline Data Loss"
    },
    faqs: [
      {
        q: "Can you publish the apps directly to our company's Google Play and Apple App Stores?",
        a: "Yes. We handle the entire deployment lifecycle, including configuring developer accounts, generating security certificates, optimizing store screenshots, and getting direct store approvals."
      },
      {
        q: "Do you integrate with third-party tracking or customer management tools?",
        a: "Absolutely. We build custom API connectors to link your app directly with Salesforce, HubSpot, Firebase, custom SQL databases, and custom backends."
      }
    ]
  },
  {
    id: "srv-seo",
    title: "SEO & Authority Blog Writing Domination",
    slug: "seo",
    icon: "Search",
    description: "Climb to Page 1 of Google, dominate organic keywords, and generate free high-intent buyers 24/7.",
    longDescription: "Right now, your dream clients are searching on Google for the exact services you offer. If they aren't finding your website, they are buying from your direct competitors. Our Search Engine Optimization (SEO) and Blog Writing service is an engineering discipline designed to flood your website with organic buyer traffic. We perform comprehensive technical audits, deploy JSON-LD schema layouts, and target high-ROI keywords. Our copywriting specialists then craft authoritative, high-value blog clusters with semantic LSI indexing. This creates a compounding marketing asset that builds your brand authority, ranks at the top of Google, and brings you highly-profitable leads indefinitely.",
    benefits: [
      "First-page placement for high-commercial search queries",
      "Deep semantic topic clusters & highly persuasive SEO articles",
      "Complete technical On-Page optimization (sitemaps, structured schemas)",
      "High-authority white-hat backlink acquisition strategies",
      "Comprehensive monthly performance audits & keyword tracking reports"
    ],
    process: [
      "Technical Website Audit & Competitor Breakdown",
      "High-Value Commercial Keyword Mapping",
      "High-Impact Article Writing & Semantic On-Page Editing",
      "Active Backlink Outreach & continuous ranking boost"
    ],
    startingPrice: "From $120",
    deliverables: [
      "Technical SEO On-Page Audits",
      "Topic Clusters & Keyword Mapping",
      "High-Converting Blog Copywriting",
      "White-Hat Backlink Outreach"
    ],
    seoTitle: "SEO & Authoritative Blog Copywriting Services | Metazivo",
    seoDescription: "Rank on page 1 of Google, dominate buyer keywords, and establish ultimate E-E-A-T. High-value topic clusters with semantic LSI indexing and custom schema markup.",
    fullFulfillmentCopy: "Google's search algorithm has changed. Cheap AI-generated content is being heavily penalized. To rank today, your website must project clear Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T). We don't just dump keywords into paragraphs. We design complete topical authority structures, build semantic LSI keyword clusters, and write high-value blogs that satisfy real search intent. Every piece of content is hand-written by industry copywriters, fully optimized with JSON-LD schema schemas, and structured to capture Google's 'People Also Ask' and Answer Engine results.",
    caseStudy: {
      title: "B2B Organic Authority Campaign",
      challenge: "A B2B consultancy was spending $4,500/month on Google Ads with zero organic traffic or compounding leads.",
      solution: "Implemented a 6-month topical authority strategy, deploying custom Schema markups and 12 high-intent semantic content pieces.",
      result: "Captured page 1 for 18 high-commercial keywords, generating over 15,000 monthly organic visitors and cutting ad spend in half.",
      metric: "+15,000 Organic Visitors/mo"
    },
    faqs: [
      {
        q: "How long does it take to see real ranking improvements from SEO?",
        a: "While some technical optimizations show results in 2-4 weeks, high-competition keywords usually require 3-6 months of consistent authority building. The upside is that unlike paid ads, organic traffic keeps coming for free forever."
      },
      {
        q: "What is Schema markup and why does it matter for my business?",
        a: "Schema markup is code that helps search engines understand the exact context of your pages. This enables search engines to display rich snippets, star ratings, and custom price ranges directly on search results, massively boosting click rates."
      }
    ]
  },
  {
    id: "srv-webdev",
    title: "High-Performance Website Development",
    slug: "website-development",
    icon: "Code",
    description: "Enterprise-grade React & Next.js architectures built for supreme speed, absolute security, and unbeatable conversion rates.",
    longDescription: "A slow website is silently bleeding your revenue every day. We build bespoke, lightning-fast web applications using premium React and Next.js structures that load in under 500 milliseconds. We discard heavy frameworks and redundant codes, crafting hand-coded responsive masterpieces that render perfectly on every single device. With integrated analytics, ultra-clean UI/UX, and complete SEO-ready layouts, your business gains instant digital superiority, leaving your competitors in the dust.",
    benefits: [
      "Bespoke lightweight code written completely from scratch",
      "Perfect Core Web Vitals (95+ score guaranteed on Google PageSpeed Insights)",
      "Premium responsive UI/UX designed to guide users directly to action",
      "Extreme security hardening to make your web app virtually unhackable",
      "Dynamic interactive panels that capture and retain attention instantly"
    ],
    process: [
      "User Journey mapping & Wireframing",
      "High-Fidelity Custom Figma UI Design",
      "Clean Optimized Frontend & API Integration",
      "Security Audit & Public Production Launch"
    ],
    startingPrice: "From $449",
    deliverables: [
      "Custom React/Next.js Code",
      "Google PageSpeed 95+ Hardening",
      "Frictionless Responsive Layouts",
      "Integrated Web Analytics"
    ],
    seoTitle: "Next.js & React Web Development Agency | Metazivo",
    seoDescription: "Custom full-stack React & Next.js architectures. Guaranteed 95+ Core Web Vitals score, absolute security, and bespoke high-converting user interfaces.",
    fullFulfillmentCopy: "Your website is your 24/7 digital office. When someone clicks your link from social media or Google, you have exactly 3 seconds to earn their trust before they bounce. We build ultra-high-speed web platforms using Next.js and React. By utilizing server-side rendering (SSR) and advanced edge caching, we ensure your pages load instantly anywhere in the world. We write every line of code by hand with strict semantic HTML, resulting in a flawless 100/100 PageSpeed score that pleases both your visitors and Google's ranking crawlers.",
    caseStudy: {
      title: "Speed & Conversion Re-architecture",
      challenge: "A digital service company had a legacy website that failed Core Web Vitals, resulting in high advertising bounce rates.",
      solution: "Migrated the entire design to a custom React architecture with automated next-gen image compression and streamlined script deliveries.",
      result: "Achieved a 99/100 score on Google PageSpeed Insights and reduced ad bounce rate by 55%.",
      metric: "99/100 PageSpeed Score"
    },
    faqs: [
      {
        q: "Why should we choose custom React/Next.js over a basic website builder?",
        a: "React offers unparalleled performance, unlimited custom design freedom, and complete immunity to the server crashes and security hacks that plague standard CMS tools."
      },
      {
        q: "What is Core Web Vitals, and why does Google care?",
        a: "Core Web Vitals are speed metrics Google uses to evaluate real user experiences. Websites with poor web vitals are pushed down in search rankings, while fast-loading sites get rewarded with a significant boost in rankings."
      }
    ]
  },
  {
    id: "srv-meta-ads",
    title: "Meta Ads (Facebook & Instagram) Acquisition System",
    slug: "meta-ads-advertising",
    icon: "TrendingUp",
    description: "High-ROI Facebook & Instagram campaigns, custom funnel tracking, and psychological copies to turn ad spend into pure profit.",
    longDescription: "Stop wasting money on useless boosting buttons with no returns. We construct systematic, multi-tiered paid advertising funnels across Meta (Facebook & Instagram) and Google. By designing thumb-stopping visual creatives, writing highly persuasive psychological ad copies, and implementing server-side Conversion APIs, we bypass iOS privacy blocks to capture 100% of your customer leads with absolute pixel accuracy. We continuously monitor and split-test target lookalikes and customized retargeting groups to lower your customer acquisition cost while maximizing your Return on Ad Spend (ROAS) to scale your sales to the sky.",
    benefits: [
      "Predictable pipeline of ready-to-buy customer leads",
      "Thumb-stopping graphic ads and highly persuasive ad copies",
      "Lookalike and Custom Audience clusters to reach the right buyers",
      "Server-side Meta API setup for 100% pixel tracking precision",
      "Frictionless instant lead capture forms & conversion-boosting landing pages"
    ],
    process: [
      "Target Avatar Profiling & Competitor Ad Analysis",
      "Premium Creative Asset Design & Script Writing",
      "Advanced Pixel & Conversion API setup",
      "Weekly budget scaling & strategic campaign testing"
    ],
    startingPrice: "From $120",
    deliverables: [
      "Ad Campaign Funnel Design",
      "High-ROI Creative Asset Layouts",
      "Copywriting & Direct-Response Hooks",
      "CAPI Server-Side Tracking"
    ],
    seoTitle: "High-ROI Meta Ads (Facebook & Instagram) Agency | Metazivo",
    seoDescription: "Systematic paid advertising funnels that convert. Direct-response ad copywriting, high-yield creatives, and pixel-perfect server-side CAPI setups.",
    fullFulfillmentCopy: "Most businesses lose money on social media ads because they lack a systematic funnel. Simply hitting 'boost post' sends money directly to Meta without tracking actual sales. We construct multi-tiered client acquisition machines. We write direct-response ad copies using proven psychological hooks, design thumb-stopping graphic assets, and deploy advanced server-side Conversion APIs (CAPI). This ensures 100% of your conversion data is tracked accurately, bypassing iOS privacy limits so we can scale your budgets with extreme return on investment.",
    caseStudy: {
      title: "Direct-Response E-commerce Scale",
      challenge: "A premium skincare brand was struggling with rising customer acquisition costs and a poor 1.2x Return on Ad Spend (ROAS).",
      solution: "Deployed a systematic retargeting funnel with direct-response visual assets and custom CAPI server-side tracking.",
      result: "Lowered acquisition costs by 45% and boosted ROAS to a stable, profitable 4.8x.",
      metric: "4.8x Return on Ad Spend"
    },
    faqs: [
      {
        q: "What makes your Meta Ads strategy different from standard marketing agencies?",
        a: "We integrate direct-response copywriting with deep technical setups like server-side Conversion APIs. This gives Meta's AI algorithm cleaner data, which naturally drives your lead cost down."
      },
      {
        q: "Do I need a separate budget for advertising spend?",
        a: "Yes. Our fee is for the strategic creation, design, and management of your funnels. You pay ad budgets directly to Meta based on what you are comfortable investing."
      }
    ]
  },
  {
    id: "srv-smm",
    title: "Social Media Management & Viral Reels",
    slug: "social-media-management",
    icon: "Activity",
    description: "Aesthetic feed grids, engaging viral reels editing, and daily community algorithms to build high organic follower loyalty.",
    longDescription: "A dead or boring social media page makes your business look untrustworthy and cheap. We transform your social profiles (Instagram, TikTok, LinkedIn) into active, high-status digital showrooms. We handle the entire creative workflow: designing gorgeous high-fidelity graphic feeds that project premium authority, editing captivating high-retention short-form reels, writing persuasive copy, and implementing strategic interaction algorithms that force social media networks to promote your posts. Focus 100% on your business operations while we build a loyal fan base that actively buys from you.",
    benefits: [
      "Cohesive, high-status feed grid design that instantly builds trust",
      "High-retention viral video reels editing with custom effects and hooks",
      "Viral storytelling scriptwriting designed to maximize shares and saves",
      "Daily algorithm interaction to boost organic feed placement and reach",
      "Complete automated calendar scheduling – zero daily stress for you"
    ],
    process: [
      "Visual Brand Identity & Competitor Feed Audit",
      "Viral Video Scripting & Multi-media Asset Batching",
      "Premium Cinematic Editing & Captivating Copywriting",
      "Strategic Daily Scheduling & active profile warming"
    ],
    startingPrice: "From $100",
    deliverables: [
      "Aesthetic Page Layouts & Grids",
      "Viral Short-Form Scriptwriting",
      "Dynamic Caption Copywriting",
      "Persistent Interaction Algorithms"
    ],
    seoTitle: "Social Media Growth & Viral Reels Agency | Metazivo",
    seoDescription: "Turn passive followers into loyal buyers. We handle aesthetic grid planning, cinematic video editing, viral scriptwriting, and daily algorithm warming.",
    fullFulfillmentCopy: "A dead or generic social media page tells prospective clients that your business is inactive. In contrast, an active, high-status grid builds immediate authority. We manage your entire organic social presence across Instagram, TikTok, and LinkedIn. We design visually striking premium feeds, edit high-retention short-form video reels with custom animated captions, and write engaging descriptions that drive saves and shares. We run strategic profile-warming interaction routines to make sure the algorithms actively show your content to your target market.",
    caseStudy: {
      title: "Real Estate Luxury Branding Domination",
      challenge: "A premium real estate firm had under 1,000 followers and zero leads coming from their social channels.",
      solution: "Implemented a high-status organic grid design paired with 3 cinematic reels weekly targeting high-net-worth local buyers.",
      result: "Grew follower count to 14,000+ in 90 days and closed 3 high-end property deals directly from Instagram inquiries.",
      metric: "14,000+ Followers in 90 Days"
    },
    faqs: [
      {
        q: "Do we need to spend hours recording videos or writing captions?",
        a: "No. We handle 100% of the heavy lifting. We write the scripts, edit your raw footage, write the captions, design the cover templates, and schedule everything for you."
      },
      {
        q: "Can you manage profiles across multiple networks simultaneously?",
        a: "Yes. Our standard package includes cross-posting across Instagram, TikTok, Facebook, and professional networks like LinkedIn to maximize your brand reach."
      }
    ]
  },
  {
    id: "srv-branding",
    title: "Graphic Design & Corporate Logo Branding",
    slug: "graphic-design-branding",
    icon: "Palette",
    description: "Premium corporate logos, cohesive color systems, and high-status brand assets that instantly establish market leadership.",
    longDescription: "Your logo and visual identity are the first things clients see. If your branding looks generic or outdated, you are instantly perceived as low quality. We engineer premium, clean, high-contrast logo systems and complete brand guidelines (custom typography, luxury color palettes, and digital styling sheets). We design outstanding vector assets that embed your company into your customers' minds, projecting ultimate market leadership and enabling you to command premium prices.",
    benefits: [
      "Timeless, custom-drawn vector logos that stand out everywhere",
      "Full corporate style guide manual (exact fonts, color values, layout rules)",
      "High-converting print-ready and digital marketing materials",
      "Stunning cohesive graphics across all social and business assets",
      "Fully scalable source files delivered in all high-resolution formats"
    ],
    process: [
      "Brand Philosophy & Visual Competitor Research",
      "Custom Creative Concept Designing & Iterations",
      "Color Palette Definition & Typography Matching",
      "Asset Exporting & Complete Style Guide Delivery"
    ],
    startingPrice: "From $80",
    deliverables: [
      "Bespoke Vector Logo Design",
      "Complete Brand Guidelines Manual",
      "Corporate Visual Style Sheets",
      "All Scalable High-Res Source Files"
    ],
    seoTitle: "Premium Corporate Logo Design & Branding Agency | Metazivo",
    seoDescription: "Establish market leadership with bespoke corporate vector logos, complete luxury color palettes, custom typography, and official corporate brand style manuals.",
    fullFulfillmentCopy: "Your visual identity is the literal face of your company. If your logo looks like a free template from Canva, clients will assume your services are cheap. We craft bespoke vector logo systems and full corporate branding manuals that project elite market authority. We research your competitors, select luxury color palettes that convey trust, and choose custom typography that sets you apart. We deliver full, scalable source files alongside complete guidelines so that your branding remains absolutely consistent across physical products, web platforms, and print media.",
    caseStudy: {
      title: "Corporate Visual Transformation",
      challenge: "An engineering consultancy was losing high-ticket contracts to larger firms because their logo looked outdated.",
      solution: "Crafted a minimalist, modern geometric visual identity and delivered a comprehensive 24-page brand style guide.",
      result: "Commanded a 35% price increase on consultative proposals and successfully won their first million-dollar corporate contract.",
      metric: "35% Price Increase Achieved"
    },
    faqs: [
      {
        q: "What assets are included in the final corporate brand identity package?",
        a: "You receive your official master vector logo in all formats, alternative layouts, custom color hex systems, typography rules, social media banners, and digital business stationery."
      },
      {
        q: "Who owns the copyright of the final logo designs?",
        a: "Upon project completion and final payment, 100% intellectual property ownership and commercial copyrights are legally transferred to your organization."
      }
    ]
  },
  {
    id: "srv-video",
    title: "Video Editing & Production",
    slug: "video-editing",
    icon: "Video",
    description: "Professional high-retention video editing and post-production structured with dynamic pacing, motion graphics, and sound design to make your content look exceptionally professional.",
    longDescription: "Video is the ultimate medium of influence and trust. Low-quality video with poor audio, flat editing, or sluggish pacing repels potential clients. We elevate your brand value with expert post-production video editing. We specialize in high-retention short-form reels, TikToks, and Facebook video ads formatted with dynamic captions, cinematic sound effects, seamless transitions, and professional color grading that hook attention in the first 3 seconds.",
    benefits: [
      "Dynamic auto-captions and custom motion graphic animations styled for your brand",
      "High-retention narrative pacing structured to maximize watch time and viral scores",
      "Cinematic color grading and custom sound design (SFX) that project luxury quality",
      "Multi-platform optimization for YouTube, Instagram Reels, TikTok, and web players",
      "Engaging hooks and seamless zoom effects that eliminate audience boredom"
    ],
    process: [
      "Footage Storyboarding & Audience Hook Concepting",
      "High-Retention Assembly, Dynamic Zooming & Multi-Cam Syncing",
      "Sound Design, Audio Clean-up & Background Beat Layering",
      "Cinematic Color Grading, Subtitles, & Motion Graphic Exports"
    ],
    startingPrice: "From $15",
    deliverables: [
      "Instagram Reels & TikToks",
      "Facebook Videos",
      "Facebook & Instagram Video Ads"
    ],
    seoTitle: "Professional Video Editing & Post-Production | Metazivo",
    seoDescription: "High-retention cinematic video editing. Streamline your content with engaging subtitle animations, custom sound design, dynamic transitions, and pro color grading.",
    fullFulfillmentCopy: "In the attention economy, your video has precisely 3 seconds to hook a viewer. Flat audio, boring pauses, or generic transitions will cause them to scroll away. We provide elite video post-production that transforms raw files into high-retention cinematic content. We edit out unnecessary filler words, sync footage to professional background scores, apply rich color grading, and add dynamic custom-animated captions. Whether it's a high-impact Facebook ad, a YouTube documentary, or a viral reel, we optimize every frame to maximize watch-time and audience engagement.",
    caseStudy: {
      title: "Course Engagement Optimization",
      challenge: "An online education brand had high video drop-off rates, with users leaving within the first 15 seconds.",
      solution: "Restructured the course previews with rapid narrative pacing, dynamic zooming, sound effects, and animated text overlays.",
      result: "Boosted average video watch-time by 210% and increased masterclass signups by 68%.",
      metric: "210% Watch-Time Boost"
    },
    faqs: [
      {
        q: "What file formats and resolutions do you deliver?",
        a: "We deliver fully optimized MP4 files in both horizontal (16:9 for YouTube/Web) and vertical (9:16 for Reels/TikTok/Shorts) formats, rendered in crisp 1080p or 4K resolution."
      },
      {
        q: "What is your turnaround time for a standard video edit?",
        a: "For short-form content under 60 seconds, we deliver within 24 to 48 hours. Long-form video projects are scheduled individually based on raw footage length and complexity."
      }
    ]
  },
  {
    id: "srv-saas",
    title: "SaaS Applications",
    slug: "saas-applications",
    icon: "Cloud",
    description: "Highly scalable Multi-Tenant Software-as-a-Service systems built with subscription billings, secure roles, and dynamic dashboards.",
    longDescription: "Building a SaaS requires absolute security, database performance, and clean subscription lifecycles. We engineer bespoke SaaS platforms using full-stack React and Node/Express architectures. We integrate robust multi-tenant architectures, granular user permissions, secure JWT authentication, and automated billing engines like Stripe or PayPal. Complete with beautiful administrative dashboards, dynamic charts, CSV exports, and email verification systems, we provide the ultimate foundation to launch your subscription-based software product and secure recurring revenue.",
    benefits: [
      "Multi-tenant database structures supporting secure isolated user workspaces",
      "Full Stripe billing suite integration supporting trials, coupons, and tiered plans",
      "Responsive analytical boards with dynamic Recharts and clean metrics",
      "Granular RBAC (Role-Based Access Control) security systems",
      "99.9% uptime guaranteed architecture prepared for rapid user scale"
    ],
    process: [
      "SaaS Database Modeling & Secure API Architecture",
      "High-Status Interactive Dashboard Frontend Design",
      "Stripe Subscription & Authentication Integration",
      "Automated Backups & Production Load Testing"
    ],
    startingPrice: "From $449",
    deliverables: [
      "Multi-Tenant Full-Stack Architectures",
      "Secure JWT / OAuth Authentication",
      "Stripe Subscription Checkout Integration",
      "Aesthetic Administrative Dashboards"
    ],
    seoTitle: "SaaS Application Development Agency | Full-Stack React",
    seoDescription: "Build secure, highly scalable multi-tenant Software-as-a-Service platforms. Stripe subscription checkout integration, RBAC permissions, and custom dashboards.",
    fullFulfillmentCopy: "Building a SaaS application requires rock-solid backend architecture, absolute data isolation, and smooth billing integrations. We design premium full-stack SaaS platforms with custom Express or Nest.js APIs and responsive React dashboards. We construct robust multi-tenant databases to keep user workspaces perfectly isolated, integrate detailed Role-Based Access Control (RBAC), and deploy Stripe or PayPal billing suites for recurring plans. Complete with dynamic analytical charts and secure JWT authentication, we give you the perfect foundation to launch your digital product.",
    caseStudy: {
      title: "Consulting Workflow SaaS Infrastructure",
      challenge: "A management consultancy wanted to package their proprietary workflow into a subscription software but lacked the technical team.",
      solution: "Engineered a secure multi-tenant React/Node SaaS platform with tier-based Stripe subscription checkout and an interactive task dashboard.",
      result: "Successfully launched to 500+ paying beta organizations, generating a steady stream of Monthly Recurring Revenue (MRR).",
      metric: "Launched to 500+ Organizations"
    },
    faqs: [
      {
        q: "How do you ensure our SaaS database is secure from unauthorized access?",
        a: "We enforce strict multi-tenant schema isolation, sanitize all API database queries to prevent SQL injections, encrypt passwords with bcrypt, and implement secure JWT tokens for session verification."
      },
      {
        q: "Can you help migrate our existing clients onto the new SaaS platform?",
        a: "Yes. We build custom data migration scripts to securely transfer user records, history databases, and custom settings from legacy formats or spreadsheets."
      }
    ]
  },
  {
    id: "srv-chatbots",
    title: "Chatbots",
    slug: "chatbots",
    icon: "MessageSquare",
    description: "Automated customer support & sales chatbots powered by Gemini to answer leads and capture sales 24/7.",
    longDescription: "Never miss a lead or customer inquiry again. We build automated sales and customer support Chatbots that engage with your website visitors in real-time. Powered by custom-trained Gemini LLM contexts, these chatbots answer complex product questions, book consultative calls, gather lead contact information, and resolve support tickets instantly. Fully customized to match your brand's voice and integrated directly with your CRM, slack, or emails, these agents work 24/7/365 to qualify buyers and increase conversions.",
    benefits: [
      "Advanced AI model trained specifically on your company documents and FAQ",
      "Dynamic instant call booking and automated lead qualification pipelines",
      "Multilingual support translating queries automatically in real-time",
      "Seamless handover to live human support agents when requested",
      "Complete analytical logs to monitor user satisfaction and chat success"
    ],
    process: [
      "Knowledge Base Structuring & Brand Voice Configuration",
      "Custom Conversational Flow Design & Tool Integrations",
      "Widget Embedded Deployment & Cross-Browser Styling",
      "Dialogue Quality Assurance & Continual Model Tuning"
    ],
    startingPrice: "From $449",
    deliverables: [
      "Trained Gemini LLM Conversational Agents",
      "Live Web Chat Integrations",
      "Automatic Contact Captures & CRM Hooks",
      "Multilingual Real-Time Translations"
    ],
    seoTitle: "AI Chatbots & Conversational Agents | Gemini Integration",
    seoDescription: "Automate customer support and sales. Deploy custom-trained Gemini AI conversational agents that qualify leads, answer FAQs, and book calls 24/7.",
    fullFulfillmentCopy: "When a potential buyer visits your website, they want immediate answers. If they have to wait hours for an email reply, they will simply go to a competitor. Our custom-trained Gemini AI chatbots act as your smartest 24/7 sales and customer support agents. We feed the AI with your company's documents, price lists, and FAQs, teaching it to speak in your exact brand voice. The chatbot doesn't just chat; it actively qualifies leads, captures contact details, books consultative calls on your calendar, and hands off complex issues to live humans.",
    caseStudy: {
      title: "Real-Time AI Sales Assistant",
      challenge: "A service provider was losing premium evening and weekend leads due to slow response times.",
      solution: "Deployed a custom-trained Gemini chatbot trained on company service specs and synced directly with their booking calendar.",
      result: "Captured and pre-qualified 48 additional leads in the first month, increasing booking rates by 73% without extra staffing costs.",
      metric: "+73% Calendar Bookings"
    },
    faqs: [
      {
        q: "Will the chatbot give wrong information or make up answers?",
        a: "No. We apply strict system prompt boundaries and ground the AI model solely on your uploaded knowledge base documents, preventing any 'hallucinations' or off-topic responses."
      },
      {
        q: "Can the chatbot connect to my active CRM tool?",
        a: "Yes. We integrate the chatbot directly with HubSpot, Salesforce, active Slack channels, WhatsApp Business API, and automated email trigger sequences."
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
    description: "Perfect for new businesses needing a premium digital launch pad.",
    features: [
      "Premium Custom Website (up to 5 Pages)",
      "Fully Responsive Grid & Glassmorphism UI",
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
    description: "Perfect for creators and brands looking to dominate short-form media with professional, high-retention video content.",
    features: [
      "12x Premium Edited Reels / TikToks per month",
      "Engaging Auto-Captions with Custom Brand Styling",
      "Professional Sound Design (SFX) & Beat Syncing",
      "Cinematic Color Grading & Audio Enhancement",
      "Complete raw footage trimming & clean transitions",
      "YouTube Shorts & IG Reels multi-formatting",
      "24-48 hour rapid turnaround guarantee",
      "Includes 1 custom animated visual intro/outro"
    ],
    cta: "Start Video Domination",
    popular: false
  },
  {
    id: "plan-growth",
    name: "Business Growth",
    price: "$199",
    period: "month",
    description: "Our signature plan to systematically capture search rankings and scale sales.",
    features: [
      "Bespoke High-Performance CMS Website",
      "Comprehensive Technical & Local SEO Setup",
      "Weekly High-Value SEO Blogging (4 Posts/mo)",
      "Meta Ads Funnel Design & Ad Copywriting",
      "Advanced Schema.org JSON-LD Markup",
      "95+ Google PageSpeed Guarantee",
      "Premium WebP Image Compression pipeline",
      "8x Professional Short-form Videos (Reels/TikToks) with Sound FX",
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
    description: "Bespoke high-performance mobile apps, multi-tenant SaaS platforms, custom AI systems, and automated chatbots.",
    features: [
      "Custom Flutter/React Native Mobile App or SaaS",
      "Custom AI Integration (Gemini, Voice, Prompts)",
      "Automated Support Chatbots & CRM Integrations",
      "Stripe Subscription Engine & User Accounts System",
      "Administrative Analytical Dashboard (Charts, Tables)",
      "High-Performance Database Setup (SQL or Firestore)",
      "App Store & Play Store Deployment Guidelines",
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
    description: "Complete full-stack development, custom brand systems, and omnichannel growth.",
    features: [
      "Bespoke Full-Stack Web App (React + Express)",
      "Deep-tier custom Shopify / WooCommerce Architecture",
      "Omnichannel Ads (Meta + Google + LinkedIn)",
      "Advanced content analysis & automatic XML feeds",
      "Unlimited SEO optimization & high-quality Backlinks",
      "Complete Omnichannel Video Production & Post-Production (Unlimited)",
      "Dedicated Project Account Director",
      "99.9% Server SLA & Backup Strategy",
      "Custom Database Migrations support"
    ],
    cta: "Contact Our Architect",
    popular: false
  }
];

export const portfolioItems = [
  {
    id: "port-1",
    title: "Sleek Skincare - WordPress Sales Engine",
    category: "WordPress & WooCommerce Development",
    image: wpMockup,
    metrics: "1.2s Load Time | +240% Sales Volume",
    description: "Designed a lightweight WooCommerce store from scratch, replacing bloated plugins with custom Gutenberg blocks. Reduced checkout friction to boost direct orders by 240%."
  },
  {
    id: "port-2",
    title: "Apex Logistics - Google Ranking Domination",
    category: "SEO & Authority Blog Content",
    image: seoMockup,
    metrics: "#1 Position on Google | +350% Organic Leads",
    description: "Built semantic LSI content clusters, deployed structural JSON-LD schemas, and resolved crawling errors. Tripled organic monthly inquiries without spending on ads."
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
    description: "Engineered a stunning, modern React/Next.js SaaS portal with dynamic database caching and glassmorphic designs, resulting in flawless performance across all mobile devices."
  },
  {
    id: "port-5",
    title: "Salams Muslim Marriage - Global Matrimony App",
    category: "Mobile Application Development",
    image: salamsMockup,
    metrics: "4M+ Successful Matches | 120 FPS Flutter Engine",
    description: "Optimized and scaled the global Muslim matchmaking experience. Deployed premium high-performance card swipe mechanics, localized matching, secure real-time chats, and custom user search layouts in Flutter.",
    playStoreUrl: "https://apps.apple.com/us/app/salams-halal-muslim-marriage/id965359176"
  },
  {
    id: "port-6",
    title: "Orange Beam (OB Dev) - High-Tech Project Sync",
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
    metrics: "50K+ Active Volunteers | Perfect Play Store Rating",
    description: "Designed a clean, intuitive cross-platform community app for the Overseas Pakistani Voters Group. Features dynamic voter registry verification tools, volunteer forums, and automated push notices.",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.family.opvgfamily"
  }
];

export const workProcessTimeline = [
  {
    step: "01",
    title: "Technical SEO Audit",
    desc: "We scan your digital footprint, identify toxic scripts, crawl errors, and map out your competitors' ranking vulnerabilities."
  },
  {
    step: "02",
    title: "Bespoke Growth Blueprint",
    desc: "We blueprint custom UI/UX frameworks, research target focus keywords, and map out high-converting paid ad funnel architectures."
  },
  {
    step: "03",
    title: "Precision Development",
    desc: "Our software engineers write lightweight clean code utilizing glassmorphism styles, responsive styling, and fast database schemas."
  },
  {
    step: "04",
    title: "Speed Hardening & SEO Scoring",
    desc: "We run advanced media compression, deploy robots metadata, configure canonical generators, and audit Core Web Vitals."
  },
  {
    step: "05",
    title: "Launch & Growth Loops",
    desc: "We trigger sitemap index signals, initiate real-time analytics tracking, and scale paid Meta ad sets to feed leads automatically."
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
