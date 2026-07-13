/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgencyService } from "./types";

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
    ]
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
      "Bi-Weekly Strategy & Reporting Calls",
      "24/7 Priority Support & Maintenance"
    ],
    cta: "Scale My Business",
    popular: true
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
    id: "test-1",
    name: "Clara Vance",
    role: "Marketing Director at Lumina Health",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    text: "Metazivo completely transformed our slow, bloated website into a lead generation machine. Our load time dropped from 4.8 seconds to 0.3 seconds, and our organic search leads have tripled in under three months!",
    rating: 5
  },
  {
    id: "test-2",
    name: "Junaid Sheikh",
    role: "Founder, Khan & Co.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    text: "The WordPress-style CMS they built is spectacular. I can generate blog posts, run instant SEO scoring, compress images, and use the Gemini AI Assistant directly from the dashboard. Best investment we've ever made.",
    rating: 5
  },
  {
    id: "test-3",
    name: "Marcus Lin",
    role: "Head of Growth, Apex Retail",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    text: "Their Paid Ads strategy coupled with optimized landing pages doubled our Shopify sales. We hit a 4.8x ROAS and scaled our monthly budget without any drop in conversions. These guys are true digital architects.",
    rating: 5
  }
];

export const trustedCompanies = [
  "Google Partner", "Meta Business Partner", "Shopify Experts", "WooCommerce Premium", "Hostinger Certified", "PageSpeed 99+"
];
