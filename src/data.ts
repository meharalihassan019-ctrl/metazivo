/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgencyService } from "./types";

// Import locally generated custom portfolio images
import obdevMockup from "./assets/images/obdev_mockup_1784019582597.jpg";
import salamsMockup from "./assets/images/salams_mockup_1784019604656.jpg";
import opvgMockup from "./assets/images/opvg_mockup_1784019625348.jpg";

// Real-world, highly realistic portfolio stock photo URLs (Not AI-generated)
const wpMockup = "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80"; // Skincare boutique products
const seoMockup = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"; // Logistics shipping containers
const metaAdsMockup = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"; // Luxury real estate property
const customReactMockup = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"; // Modern SaaS visual metrics dashboard

export const servicesData: AgencyService[] = [
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
    seoTitle: "High-Performance Website Development | Metazivo",
    seoDescription: "Bespoke React & Next.js website architectures built for supreme speed, perfect Core Web Vitals, and premium conversion optimization."
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
    seoTitle: "WordPress & WooCommerce Sales Engines | Metazivo",
    seoDescription: "Bespoke high-converting WordPress & WooCommerce development optimized for continuous speed, conversions, and security."
  },
  {
    id: "srv-seo",
    title: "SEO & Authority Blog Writing Domination",
    slug: "seo",
    icon: "Search",
    description: "Climb to Page 1 of Google, dominate organic keywords, and generate free high-intent buyers 24/7.",
    longDescription: "Right now, your dream clients are searching on Google for the exact services you offer. If they aren't finding your business, they are buying from your direct competitors. Our Search Engine Optimization (SEO) and Blog Writing service is an engineering discipline designed to flood your website with organic buyer traffic. We perform comprehensive technical audits, deploy JSON-LD schema layouts, and target high-ROI keywords. Our copywriting specialists then craft authoritative, high-value blog clusters with semantic LSI indexing. This creates a compounding marketing asset that builds your brand authority, ranks at the top of Google, and brings you highly-profitable leads indefinitely.",
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
    seoTitle: "SEO & Authority Blog Writing Domination | Metazivo",
    seoDescription: "Climb to Page 1 of Google, dominate organic keywords, and generate free high-intent buyers 24/7 with expert SEO solutions."
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
    seoTitle: "Meta Ads (Facebook & Instagram) Acquisition System | Metazivo",
    seoDescription: "High-ROI Facebook & Instagram campaigns, custom funnel tracking, and psychological copies to turn ad spend into pure profit."
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
    seoTitle: "Social Media Management & Viral Reels | Metazivo",
    seoDescription: "Aesthetic feed grids, engaging viral reels editing, and daily community algorithms to build high organic follower loyalty."
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
    seoTitle: "Graphic Design & Corporate Logo Branding | Metazivo",
    seoDescription: "Premium corporate logos, cohesive color systems, and high-status brand assets that instantly establish market leadership."
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
    seoTitle: "Video Editing & Production Services | Metazivo",
    seoDescription: "Professional video editing starting from $15. Premium high-retention Facebook, Reels, TikTok, and corporate video production with sound FX."
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
    seoTitle: "Mobile Application Development Services | Metazivo",
    seoDescription: "Expert iOS & Android app development starting from $449. Custom Flutter & React Native mobile app development with push notifications and API integration."
  },
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
    seoTitle: "AI Mobile App Development | Metazivo",
    seoDescription: "Next-gen intelligent AI mobile applications starting from $449. Advanced Gemini AI integration, voice assistants, and natural language models on mobile."
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
    seoTitle: "SaaS Application Development | Metazivo",
    seoDescription: "Bespoke SaaS platform development starting from $449. Secure full-stack SaaS apps with Stripe subscriptions, user permissions, and admin panels."
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
    seoTitle: "AI Chatbot & Conversational Agent Integration | Metazivo",
    seoDescription: "Custom AI chatbots starting from $449. Automated customer support and sales chat systems powered by Gemini for 24/7 conversion growth."
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
