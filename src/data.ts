/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgencyService } from "./types";

export const servicesData: AgencyService[] = [
  {
    id: "srv-webdev",
    title: "Website Development",
    slug: "website-development",
    icon: "Code",
    description: "High-performance, bespoke web architectures engineered for maximum speed, security, and conversion rates.",
    longDescription: "Our custom website development services leverage cutting-edge tech stacks (React, Node.js, Next.js) to build fluid, high-converting digital architectures. We don't build generic websites; we design responsive digital assets that represent your brand in its premium form, load in less than 500 milliseconds, and turn visitors into loyal paying customers.",
    benefits: [
      "Custom UI/UX designed strictly from scratch",
      "Perfect Core Web Vitals (95+ Google PageSpeed score)",
      "Enterprise-grade security and advanced DDOS hardening",
      "Seamless CMS integration for easy content management"
    ],
    process: [
      "Deep Discovery and Wireframing",
      "Custom Figma UI/UX Design Iteration",
      "Optimized Front-End and Robust Back-End Coding",
      "Extensive Device Testing and Launch"
    ]
  },
  {
    id: "srv-wp",
    title: "WordPress & WooCommerce Development",
    slug: "wordpress-development",
    icon: "Layout",
    description: "Premium WordPress architectures and WooCommerce stores with custom lightweight themes.",
    longDescription: "We engineer lightweight, blazing-fast WordPress and WooCommerce solutions. By discarding bloated page builders and utilizing block-editor-native Gutenberg patterns or custom themes, we ensure your sales funnels and online stores are fast, responsive, and rank at the top of search results.",
    benefits: [
      "100% bespoke custom themes – no template bloat",
      "WooCommerce optimized for lightning-fast checkout flows",
      "Advanced caching, security configurations, and auto-backups",
      "Complete visual autonomy with easy WordPress block editor"
    ],
    process: [
      "Structure Design & Database Setup",
      "Bespoke Gutenberg Theme Crafting",
      "WooCommerce Cart & Gateways Integration",
      "Speed Hardening & Launch"
    ]
  },
  {
    id: "srv-shopify",
    title: "Shopify Development",
    slug: "shopify-development",
    icon: "ShoppingBag",
    description: "Stunning, conversion-focused Shopify and Shopify Plus e-commerce storefronts.",
    longDescription: "Scale your retail business with an optimized, lightning-fast Shopify storefront. From custom Liquid theme creation to third-party CRM, ERP, and payment gateway synchronizations, we create digital retail experiences that keep users hooked, boost average order value (AOV), and scale your monthly sales seamlessly.",
    benefits: [
      "Liquid-optimized themes engineered for rapid load speeds",
      "Conversion Rate Optimization (CRO) designed into every product drawer",
      "Dynamic checkout and cross-sell automated pipelines",
      "Seamless inventory, fulfillment, and marketing integrations"
    ],
    process: [
      "Store architecture and UX planning",
      "Custom Shopify theme development",
      "App integration and custom configurations",
      "Conversion testing and launch"
    ]
  },
  {
    id: "srv-seo",
    title: "SEO (Search Engine Optimization)",
    slug: "seo",
    icon: "Search",
    description: "Dominate organic search results, capture high-intent leads, and multiply your business traffic.",
    longDescription: "SEO at Metazivo is an engineering discipline, not a guessing game. We implement robust, data-driven optimization strategies across Technical SEO, On-Page structure, and authoritative Link Building. We systematically analyze user intent, target high-ROI keywords, and structure your pages to dominate the first page of Google.",
    benefits: [
      "Comprehensive search query and competitor analysis",
      "Complete On-Page content optimization matching Google's guidelines",
      "High-authority white-hat backlink building campaigns",
      "Transparent monthly keyword ranking and traffic dashboards"
    ],
    process: [
      "Technical Website and Schema Audit",
      "LSI & High-ROI Keyword Research",
      "On-Page Optimization and Semantic Editing",
      "Local SEO and Backlink Outreach Execution"
    ]
  },
  {
    id: "srv-meta-ads",
    title: "Paid Advertising & Meta Ads",
    slug: "meta-ads-advertising",
    icon: "TrendingUp",
    description: "High-ROI Facebook, Instagram, and Google Ads campaigns designed to flood your pipelines with hot leads.",
    longDescription: "Stop wasting budgets on random boost campaigns. We build structured, multi-tier paid advertising funnels across Meta and Google platforms. By combining hyper-targeted audience segments, dynamic creative testing, and high-friction instant forms, we turn ad budget into predictable, scalable revenue streams.",
    benefits: [
      "Hyper-targeted lookalike and custom audience clusters",
      "High-converting visual assets and psychological ad copy",
      "Automated multi-channel retargeting funnels",
      "Granular conversion tracking and real-time ROAS auditing"
    ],
    process: [
      "Target Avatar Discovery and Strategy",
      "Creative Ad Design and Copywriting",
      "Funnel Setup and Conversion Tracking Test",
      "Iterative Optimization and Budget Scaling"
    ]
  },
  {
    id: "srv-branding",
    title: "Graphic Design & Logo Branding",
    slug: "graphic-design-branding",
    icon: "Palette",
    description: "Premium, luxury visual assets, logo systems, and complete corporate identity designs.",
    longDescription: "Your brand is your most valuable asset. We craft clean, minimalist, luxury identities that instantly convey market leadership. From high-end logos and color palettes to complete digital brand guidelines, our graphic designs are engineered to stick in your customers' minds and separate you from competitors.",
    benefits: [
      "Distinctive, timeless logo mark systems",
      "Cohesive brand style guidelines (typography, palettes)",
      "High-converting print and digital corporate collaterals",
      "Consistent, luxury styling across all digital assets"
    ],
    process: [
      "Brand Philosophy and Research",
      "Vector Concept Design Iterations",
      "Palette and Typography Pairing",
      "Final Vector Delivery & Style Manual"
    ]
  }
];

export const pricingPlans = [
  {
    id: "plan-start",
    name: "Startup Core",
    price: "$999",
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
    price: "$2,499",
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
    title: "Lumina Luxury Living",
    category: "Website Development & SEO",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    metrics: "0.3s Load Time | +312% Organic Leads",
    description: "A gorgeous, responsive glassmorphism portal built for a premium real estate developer, integrating dynamic SEO sitemaps."
  },
  {
    id: "port-2",
    title: "Aura Skincare Shop",
    category: "WooCommerce & Paid Advertising",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
    metrics: "4.8x Return on Ad Spend (ROAS)",
    description: "High-performance online store engineered with ultra-clean checkout drawers and custom Instagram ads."
  },
  {
    id: "port-3",
    title: "Apex Logistics Group",
    category: "Technical SEO & Speed Optimization",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    metrics: "Rank #1 for 18 Core Keywords",
    description: "Complete database overhaul, dynamic canonical linking, and page speed caching that raised Google score from 31 to 99."
  },
  {
    id: "port-4",
    title: "Verdant Sustainable Goods",
    category: "Shopify Custom Liquid Development",
    image: "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80",
    metrics: "+42% Average Order Value (AOV)",
    description: "Crafted modular Shopify theme utilizing WebP rendering and progressive image loading."
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
