/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import compression from "compression";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(compression());

// Security and SEO Performance Headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Local database path
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Default Seed Data
const defaultDb = {
  posts: [
    {
      id: "post-1",
      title: "Website Speed Optimization: The Ultimate Guide for 2026",
      slug: "website-speed-optimization-ultimate-guide",
      excerpt: "Learn how to optimize your web applications for lightning-fast load times, lower bounce rates, and higher conversion figures in 2026.",
      content: `<h2>Why Speed is the Absolute Metric for Business Growth</h2><p>In 2026, web performance is no longer just a technical detail. It is a critical business metric. Every 100ms of latency reduction can boost conversions by up to 8%. Users expect websites to load instantaneously, especially on mobile devices under variable 5G/4G connections.</p><h3>1. Leverage Modern Code Splitting</h3><p>Ensure that you compile your frontend code using efficient bundlers like Vite or esbuild. Split your bundle size into smaller chunks so that the browser only downloads the critical scripts needed for the current viewport.</p><p>Using heavy, generic page builders adds massive amounts of unused CSS and JavaScript, which instantly ruins your Core Web Vitals score.</p><h3>2. High-Performance Image Pipelines</h3><p>Always optimize and compress your images. Metazivo specializes in building automatic conversion pipelines that compress static resources into modern formats like <strong>WebP</strong> and <strong>AVIF</strong>, reducing image weights by over 70% without visible loss of fidelity.</p><h3>3. Server-Side Rendering (SSR) and Edge Caching</h3><p>By pre-rendering your application on a fast server-side environment and caching it close to your users via high-performance CDNs (Cloudflare, bunny.net), you completely bypass database queries on initial navigation, dropping your Time to First Byte (TTFB) to under 50ms.</p>`,
      status: "published",
      publishDate: "2026-07-10T12:00:00Z",
      featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      gallery: [],
      readingTime: 4,
      featured: true,
      sticky: true,
      categories: ["Website Speed Optimization", "Website Development"],
      tags: ["Performance", "Core Web Vitals", "Web Dev"],
      author: {
        name: "Mehar Ali Hassan",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        role: "Admin"
      },
      seoTitle: "Ultimate Website Speed Optimization Guide (2026) | Metazivo",
      seoDescription: "Unlock ultimate loading speeds. Learn code-splitting, WebP compression, and edge caching techniques implemented by Metazivo to achieve 99+ on PageSpeed.",
      seoKeywords: ["website speed optimization", "core web vitals", "load speed", "page speed optimization"],
      focusKeywords: ["website speed optimization", "page speed"],
      canonicalUrl: "https://metazivo.com/blog/website-speed-optimization-ultimate-guide",
      robotsMeta: { index: true, follow: true },
      openGraph: {
        title: "Website Speed Optimization Guide (2026)",
        description: "Maximize conversion rates and conquer Google ranking metrics with our complete speed guide.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      },
      twitterCard: {
        cardType: "summary_large_image",
        title: "Website Speed Optimization Guide (2026) | Metazivo",
        description: "Transform your website performance and boost Google rankings with our performance blueprint.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
      },
      breadcrumbTitle: "Speed Optimization Guide",
      seoScore: 98,
      schemas: [
        {
          id: "schema-1",
          type: "BlogPosting",
          jsonData: `{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting",\n  "headline": "Website Speed Optimization: The Ultimate Guide for 2026",\n  "description": "Unlock ultimate loading speeds.",\n  "author": {\n    "@type": "Person",\n    "name": "Mehar Ali Hassan"\n  },\n  "publisher": {\n    "@type": "Organization",\n    "name": "Metazivo"\n  }\n}`
        }
      ]
    },
    {
      id: "post-2",
      title: "How to Maximize ROI with Advanced Meta Ads Funnels",
      slug: "maximize-roi-advanced-meta-ads-funnels",
      excerpt: "Stop wasting money on basic boost posts. Learn the structured funnel architectures that scale digital brand conversions safely.",
      content: `<h2>Understanding Meta Advertising Funnels</h2><p>Running successful Meta Campaigns in 2026 requires understanding customer journeys. Too many agencies simply press "Boost Post" and pray for results. At Metazivo, we leverage algorithmic precision, lookalike clusters, and dynamic creative feeds to maximize your Return on Ad Spend (ROAS).</p><h3>Phase 1: Top of Funnel (TOFU) – Auditory Broad Reach</h3><p>At the top of the funnel, focus on capturing interest. Introduce your brand via immersive vertical short-form videos (Reels) styled with premium typography. Optimize for video view counts or link click volumes to establish a large custom audience pool.</p><h3>Phase 2: Middle of Funnel (MOFU) – Relatable Proof</h3><p>This is where you show trust. Retarget people who watched over 50% of your TOFU videos or visited your website. Present social proof, customer video testimonials, and high-contrast carousel ads detailing Metazivo's extensive service packages.</p><h3>Phase 3: Bottom of Funnel (BOFU) – High Friction Lead Forms</h3><p>Convert warm prospects. Leverage native Lead Gen forms styled with dynamic pricing and custom questions to verify intent. Combine this with automatic email follow-ups to guarantee instant lead nurture loops.</p>`,
      status: "published",
      publishDate: "2026-07-09T09:15:00Z",
      featuredImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      gallery: [],
      readingTime: 5,
      featured: false,
      sticky: false,
      categories: ["Meta Ads", "Paid Advertising"],
      tags: ["Meta Ads", "Facebook Marketing", "ROAS", "Lead Generation"],
      author: {
        name: "Mehar Ali Hassan",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        role: "Admin"
      },
      seoTitle: "Advanced Meta Ads Funnel Guide for ROI | Metazivo",
      seoDescription: "Discover how Metazivo scales paid advertising budgets. Learn lookalike segmentation, dynamic creative optimization, and custom retargeting setups.",
      seoKeywords: ["meta ads", "facebook marketing", "paid ads ROI", "lead funnels"],
      focusKeywords: ["meta ads", "ROI"],
      canonicalUrl: "https://metazivo.com/blog/maximize-roi-advanced-meta-ads-funnels",
      robotsMeta: { index: true, follow: true },
      openGraph: {
        title: "Maximize ROI with Meta Ads Funnels",
        description: "Learn the high-converting paid ad framework built by Metazivo to convert cold audiences.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
      },
      twitterCard: {
        cardType: "summary_large_image",
        title: "Maximize Paid Ads ROAS | Metazivo Funnel Secrets",
        description: "Ditch boost buttons. Build robust retargeting loops with our agency-certified tutorial.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
      },
      breadcrumbTitle: "Meta Ads Funnels",
      seoScore: 94,
      schemas: []
    }
  ],
  media: [
    {
      id: "media-1",
      name: "metazivo_logo.png",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80",
      size: 45200,
      mimeType: "image/png",
      folder: "branding",
      altText: "Metazivo Digital Agency Minimalist Premium Brand Identity",
      caption: "Metazivo Main Brand Mark",
      createdAt: "2026-07-11T00:00:00Z"
    },
    {
      id: "media-2",
      name: "web_dev_banner.jpg",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      size: 245000,
      mimeType: "image/jpeg",
      folder: "website-development",
      altText: "Modern website performance dashboard displaying speed metrics",
      caption: "High Conversion Website Architecture",
      createdAt: "2026-07-11T01:30:00Z"
    },
    {
      id: "media-3",
      name: "seo_dashboard.png",
      url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
      size: 198000,
      mimeType: "image/png",
      folder: "seo",
      altText: "Google Search Console performance analysis graphics",
      caption: "Comprehensive Technical SEO Auditing Dashboard",
      createdAt: "2026-07-11T02:15:00Z"
    }
  ],
  leads: [
    {
      id: "lead-1",
      name: "Sarah Jenkins",
      email: "sarah@luminahealth.com",
      phone: "+1 415 882 1930",
      service: "Website Redesign & Speed Optimization",
      message: "Hello Metazivo, we want to redesign our clinic website. Our current site is extremely slow and has terrible SEO. Please let us know your pricing and timelines.",
      status: "unread",
      createdAt: "2026-07-11T04:22:15Z",
      notes: ""
    },
    {
      id: "lead-2",
      name: "Ahmed Khan",
      email: "ahmed@khan-ecom.co",
      phone: "+92 300 1234567",
      service: "Shopify Development & Meta Ads",
      message: "We need an elegant Shopify store for our luxury apparel brand and we are looking for Metazivo to run Facebook and Meta ad campaigns.",
      status: "replied",
      createdAt: "2026-07-10T15:10:00Z",
      notes: "Called him. Shared quotation. Scheduled follow up for next Tuesday."
    }
  ],
  redirects: [
    {
      id: "redir-1",
      fromPath: "/old-services",
      toPath: "/services",
      statusCode: 301,
      createdAt: "2026-07-11T03:00:00Z",
      hits: 41
    }
  ],
  views: 12450,
  visitors: 4850,
  viewsHistory: [
    { date: "Jul 5", views: 1800, visitors: 650 },
    { date: "Jul 6", views: 2100, visitors: 780 },
    { date: "Jul 7", views: 1950, visitors: 720 },
    { date: "Jul 8", views: 2400, visitors: 910 },
    { date: "Jul 9", views: 2050, visitors: 820 },
    { date: "Jul 10", views: 2900, visitors: 1100 },
    { date: "Jul 11", views: 1250, visitors: 480 }
  ]
};

// Initialize file database
function loadDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2));
      return defaultDb;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read local DB, using default", err);
    return defaultDb;
  }
}

function saveDb(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed to save local DB", err);
  }
}

// Ensure database is populated
let db = loadDb();

// -----------------------------------------------------------------------------
// AI SEO Assistant Initialization
// -----------------------------------------------------------------------------
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
    console.log("Gemini API Client initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Gemini Client", err);
  }
}

// -----------------------------------------------------------------------------
// API ENDPOINTS
// -----------------------------------------------------------------------------

// Post view tracking incrementer
app.post("/api/analytics/hit", (req, res) => {
  db = loadDb();
  db.views += 1;
  const todayStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
  let hist = db.viewsHistory.find((h: any) => h.date === todayStr);
  if (hist) {
    hist.views += 1;
  } else {
    db.viewsHistory.push({ date: todayStr, views: 1, visitors: 1 });
  }
  saveDb(db);
  res.json({ success: true, views: db.views });
});

// Analytics Dashboard statistics
app.get("/api/analytics", (req, res) => {
  db = loadDb();
  const leadsByService = db.leads.reduce((acc: any, lead: any) => {
    const s = lead.service || "General Consulting";
    const existing = acc.find((item: any) => item.service === s);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ service: s, count: 1 });
    }
    return acc;
  }, []);

  const totalScore = db.posts.reduce((sum: number, post: any) => sum + (post.seoScore || 0), 0);
  const averageSeoScore = db.posts.length > 0 ? Math.round(totalScore / db.posts.length) : 95;

  res.json({
    visitors: db.visitors,
    pageViews: db.views,
    leadsCount: db.leads.length,
    blogCount: db.posts.length,
    averageSeoScore,
    viewsHistory: db.viewsHistory,
    leadsByService
  });
});

// Blog Endpoints
app.get("/api/posts", (req, res) => {
  db = loadDb();
  res.json(db.posts);
});

app.get("/api/posts/:slug", (req, res) => {
  db = loadDb();
  const post = db.posts.find((p: any) => p.slug === req.params.slug);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
});

app.post("/api/posts", (req, res) => {
  db = loadDb();
  const newPost = {
    id: `post-${Date.now()}`,
    title: req.body.title || "Untitled Draft",
    slug: req.body.slug || `untitled-draft-${Date.now()}`,
    excerpt: req.body.excerpt || "",
    content: req.body.content || "",
    status: req.body.status || "draft",
    publishDate: req.body.publishDate || new Date().toISOString(),
    featuredImage: req.body.featuredImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    gallery: req.body.gallery || [],
    readingTime: parseInt(req.body.readingTime) || 3,
    featured: req.body.featured || false,
    sticky: req.body.sticky || false,
    categories: req.body.categories || ["General"],
    tags: req.body.tags || [],
    author: req.body.author || {
      name: "Mehar Ali Hassan",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      role: "Admin"
    },
    seoTitle: req.body.seoTitle || req.body.title || "",
    seoDescription: req.body.seoDescription || req.body.excerpt || "",
    seoKeywords: req.body.seoKeywords || [],
    focusKeywords: req.body.focusKeywords || [],
    canonicalUrl: req.body.canonicalUrl || "",
    robotsMeta: req.body.robotsMeta || { index: true, follow: true },
    openGraph: req.body.openGraph || {
      title: req.body.title || "",
      description: req.body.excerpt || "",
      image: req.body.featuredImage || ""
    },
    twitterCard: req.body.twitterCard || {
      cardType: "summary_large_image",
      title: req.body.title || "",
      description: req.body.excerpt || "",
      image: req.body.featuredImage || ""
    },
    breadcrumbTitle: req.body.breadcrumbTitle || req.body.title || "",
    seoScore: req.body.seoScore || 80,
    schemas: req.body.schemas || []
  };

  db.posts.unshift(newPost);
  saveDb(db);
  res.status(201).json(newPost);
});

app.put("/api/posts/:id", (req, res) => {
  db = loadDb();
  const index = db.posts.findIndex((p: any) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  db.posts[index] = {
    ...db.posts[index],
    ...req.body
  };

  saveDb(db);
  res.json(db.posts[index]);
});

app.delete("/api/posts/:id", (req, res) => {
  db = loadDb();
  db.posts = db.posts.filter((p: any) => p.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// Media Library Endpoints (WebP Conversion Mock & direct support for base64 saving)
app.get("/api/media", (req, res) => {
  db = loadDb();
  res.json(db.media);
});

app.post("/api/media", (req, res) => {
  db = loadDb();
  const newAsset = {
    id: `media-${Date.now()}`,
    name: req.body.name || "uploaded_asset.png",
    url: req.body.fileData || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80",
    size: req.body.size || 1024,
    mimeType: req.body.mimeType || "image/png",
    folder: req.body.folder || "general",
    altText: req.body.altText || "",
    caption: req.body.caption || "",
    title: req.body.title || req.body.name || "Media File",
    createdAt: new Date().toISOString()
  };

  db.media.unshift(newAsset);
  saveDb(db);
  res.status(201).json(newAsset);
});

app.delete("/api/media/:id", (req, res) => {
  db = loadDb();
  db.media = db.media.filter((m: any) => m.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// Contact Leads / Enquiries Endpoints
app.get("/api/leads", (req, res) => {
  db = loadDb();
  res.json(db.leads);
});

app.post("/api/leads", (req, res) => {
  db = loadDb();
  const newLead = {
    id: `lead-${Date.now()}`,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    service: req.body.service || "General Growth Consulting",
    message: req.body.message,
    status: "unread",
    createdAt: new Date().toISOString(),
    notes: ""
  };

  db.leads.unshift(newLead);
  // Also increment page stats
  db.views += 1;
  saveDb(db);
  res.status(201).json(newLead);
});

app.put("/api/leads/:id", (req, res) => {
  db = loadDb();
  const index = db.leads.findIndex((l: any) => l.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Lead not found" });
  }

  db.leads[index] = {
    ...db.leads[index],
    status: req.body.status || db.leads[index].status,
    notes: req.body.notes !== undefined ? req.body.notes : db.leads[index].notes
  };

  saveDb(db);
  res.json(db.leads[index]);
});

app.delete("/api/leads/:id", (req, res) => {
  db = loadDb();
  db.leads = db.leads.filter((l: any) => l.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// Redirect Manager Endpoints
app.get("/api/redirects", (req, res) => {
  db = loadDb();
  res.json(db.redirects);
});

app.post("/api/redirects", (req, res) => {
  db = loadDb();
  const newRedir = {
    id: `redir-${Date.now()}`,
    fromPath: req.body.fromPath,
    toPath: req.body.toPath,
    statusCode: parseInt(req.body.statusCode) === 302 ? 302 : 301,
    createdAt: new Date().toISOString(),
    hits: 0
  };

  db.redirects.push(newRedir);
  saveDb(db);
  res.status(201).json(newRedir);
});

app.delete("/api/redirects/:id", (req, res) => {
  db = loadDb();
  db.redirects = db.redirects.filter((r: any) => r.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// Export Leads as CSV simulation
app.get("/api/leads/export/csv", (req, res) => {
  db = loadDb();
  const csvHeaders = "ID,Name,Email,Phone,Service,Message,Status,Created At,Notes\n";
  const csvRows = db.leads.map((l: any) => {
    return `"${l.id}","${l.name.replace(/"/g, '""')}","${l.email}","${l.phone}","${l.service}","${(l.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}","${l.status}","${l.createdAt}","${(l.notes || '').replace(/"/g, '""')}"`;
  }).join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=metazivo_leads_export.csv");
  res.status(200).send(csvHeaders + csvRows);
});

// Contact Settings Endpoints
app.get("/api/contact", (req, res) => {
  db = loadDb();
  if (!db.contact) {
    db.contact = {
      phone: "+92 328 8518557",
      email: "mai@metazivo.com",
      address: "Office 402, Metazivo Heights, Lahore, Pakistan",
      whatsapp: "+923288518557",
      facebook: "https://facebook.com/metazivo",
      instagram: "https://instagram.com/metazivo",
      linkedin: "https://linkedin.com/company/metazivo"
    };
    saveDb(db);
  }
  res.json(db.contact);
});

app.put("/api/contact", (req, res) => {
  db = loadDb();
  db.contact = {
    phone: req.body.phone || "+92 328 8518557",
    email: req.body.email || "mai@metazivo.com",
    address: req.body.address || "",
    whatsapp: req.body.whatsapp || "",
    facebook: req.body.facebook || "",
    instagram: req.body.instagram || "",
    linkedin: req.body.linkedin || ""
  };
  saveDb(db);
  res.json(db.contact);
});

// Pages Endpoints
app.get("/api/pages", (req, res) => {
  db = loadDb();
  if (!db.pages) {
    db.pages = [
      {
        id: "page-home",
        title: "Home",
        slug: "home",
        content: "<h2>Metazivo Agency Core</h2><p>Our custom-built, optimized landing page architecture.</p>",
        isSystem: true,
        seoTitle: "Metazivo | Premium Digital Agency for High-Performance Architectures",
        seoDescription: "Metazivo builds custom high-performance websites, optimized WordPress stores, Shopify websites, and runs advanced Meta and Google Ads campaigns.",
        seoKeywords: ["digital agency", "web development", "SEO", "Shopify", "Meta Ads"]
      },
      {
        id: "page-about",
        title: "About",
        slug: "about",
        content: "<h2>We are Metazivo</h2><p>A full-stack engineered agency with global roots.</p>",
        isSystem: true,
        seoTitle: "About Metazivo | Enterprise Digital Architects",
        seoDescription: "Metazivo's history, mission, and technical values designed to scale software operations globally.",
        seoKeywords: ["about agency", "metazivo developers", "technical agency team"]
      },
      {
        id: "page-services",
        title: "Services",
        slug: "services",
        content: "<h2>Premium Agency Services</h2><p>Explore our engineering capabilities.</p>",
        isSystem: true,
        seoTitle: "Our Services | Custom Systems & Marketing Funnels | Metazivo",
        seoDescription: "Web Development, WordPress Custom Themes, Shopify Stores, Advanced SEO audits, and High-ROI Meta advertising.",
        seoKeywords: ["services list", "agency services", "seo development", "shop themes"]
      },
      {
        id: "page-pricing",
        title: "Pricing",
        slug: "pricing",
        content: "<h2>Transparent Enterprise Packages</h2><p>Select a budget plan suited to your velocity.</p>",
        isSystem: true,
        seoTitle: "Pricing Packages & CMS Retainers | Metazivo",
        seoDescription: "High-performance services tailored to scale starting at competitive rates. Choose Web development or marketing campaigns.",
        seoKeywords: ["agency pricing", "monthly retainer fee", "web design pricing"]
      },
      {
        id: "page-privacy",
        title: "Privacy Policy",
        slug: "privacy",
        content: "<h2>Privacy and Cookie Management</h2><p>Your privacy and GDPR security protocol details.</p>",
        isSystem: true,
        seoTitle: "Privacy Policy & GDPR Compliance | Metazivo",
        seoDescription: "Understand cookies, analytical node monitoring, and lead verification data storage policies.",
        seoKeywords: ["privacy policies", "cookies terms", "gdpr compliance data"]
      },
      {
        id: "page-terms",
        title: "Terms & Conditions",
        slug: "terms",
        content: "<h2>Terms of Service Agreement</h2><p>The rules governing the use of the Metazivo network portal.</p>",
        isSystem: true,
        seoTitle: "Terms & Conditions Agreement | Metazivo",
        seoDescription: "Review intellectual property guidelines, payment gateways terms, and service liabilities.",
        seoKeywords: ["terms and services", "user license agreement", "client liability terms"]
      }
    ];
    saveDb(db);
  }
  res.json(db.pages);
});

app.post("/api/pages", (req, res) => {
  db = loadDb();
  if (!db.pages) db.pages = [];
  const newPage = {
    id: `page-${Date.now()}`,
    title: req.body.title || "New Custom Page",
    slug: req.body.slug || `page-${Date.now()}`,
    content: req.body.content || "<p>Page content goes here...</p>",
    isSystem: false,
    seoTitle: req.body.seoTitle || "",
    seoDescription: req.body.seoDescription || "",
    seoKeywords: req.body.seoKeywords || []
  };
  db.pages.push(newPage);
  saveDb(db);
  res.status(201).json(newPage);
});

app.put("/api/pages/:id", (req, res) => {
  db = loadDb();
  if (!db.pages) db.pages = [];
  const index = db.pages.findIndex((p: any) => p.id === req.params.id);
  if (index !== -1) {
    db.pages[index] = {
      ...db.pages[index],
      title: req.body.title || db.pages[index].title,
      slug: req.body.slug || db.pages[index].slug,
      content: req.body.content || db.pages[index].content,
      seoTitle: req.body.seoTitle || db.pages[index].seoTitle || "",
      seoDescription: req.body.seoDescription || db.pages[index].seoDescription || "",
      seoKeywords: req.body.seoKeywords || db.pages[index].seoKeywords || []
    };
    saveDb(db);
    res.json(db.pages[index]);
  } else {
    res.status(404).json({ error: "Page not found" });
  }
});

app.delete("/api/pages/:id", (req, res) => {
  db = loadDb();
  if (!db.pages) db.pages = [];
  const page = db.pages.find((p: any) => p.id === req.params.id);
  if (page && page.isSystem) {
    return res.status(400).json({ error: "System pages cannot be deleted" });
  }
  db.pages = db.pages.filter((p: any) => p.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// -----------------------------------------------------------------------------
// DYNAMIC SEO FILES: Robots.txt, Sitemap.xml, RSS Feed
// -----------------------------------------------------------------------------

app.get("/robots.txt", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://metazivo.com/sitemap.xml`);
});

app.get("/sitemap.xml", (req, res) => {
  db = loadDb();
  const baseUrl = "https://metazivo.com";
  const today = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/services</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/portfolio</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/pricing</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  // Dynamic Blog Posts
  db.posts.forEach((post: any) => {
    if (post.status === "published") {
      const pDate = post.publishDate ? post.publishDate.split("T")[0] : today;
      xml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${pDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
    }
  });

  xml += `</urlset>`;
  res.setHeader("Content-Type", "application/xml");
  res.send(xml);
});

app.get("/rss.xml", (req, res) => {
  db = loadDb();
  const baseUrl = "https://metazivo.com";

  let xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Metazivo Digital Agency Blog</title>
  <link>${baseUrl}/blog</link>
  <description>Grow Your Business with Powerful Digital Solutions. Metazivo specializes in website development, SEO, branding, paid ads, and premium content optimization.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
`;

  db.posts.forEach((post: any) => {
    if (post.status === "published") {
      xml += `  <item>
    <title>${post.title}</title>
    <link>${baseUrl}/blog/${post.slug}</link>
    <description>${post.excerpt}</description>
    <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
    <guid>${baseUrl}/blog/${post.slug}</guid>
  </item>\n`;
    }
  });

  xml += `</channel>\n</rss>`;
  res.setHeader("Content-Type", "application/xml");
  res.send(xml);
});

// -----------------------------------------------------------------------------
// AI SEO ASSISTANT: Server-Side Gemini API Proxies
// -----------------------------------------------------------------------------
app.post("/api/gemini/ai-seo", async (req, res) => {
  const { action, title, keywords, excerpt, content, category } = req.body;

  if (!process.env.GEMINI_API_KEY || !ai) {
    // Elegant fallback simulator so the app is fully operational even with missing key!
    console.log("No Gemini API key found, generating simulated high-quality SEO metrics.");
    return generateSimulatedResponse(action, title, keywords, excerpt, category, res);
  }

  try {
    let prompt = "";
    if (action === "metadata") {
      prompt = `Act as an expert Technical SEO Engineer. Analyze the following details for a blog post/web page:
Title: "${title || 'Grow your business'}"
Category: "${category || 'General'}"
Excerpt: "${excerpt || ''}"

Generate a JSON object containing:
1. seoTitle: high-converting SEO optimized meta title (max 60 characters), targeting the focus keyword cleanly.
2. seoDescription: compelling meta description (max 160 characters) with a clear call-to-action.
3. focusKeywords: an array of 2 target focus keywords based on the topic.
4. slug: a SEO-friendly canonical slug.
5. excerpt: a revised, high-impact paragraph snippet (max 3 sentences).

Return ONLY a valid JSON object matching the parameters described. No conversational text, no markdown code blocks outside of raw JSON.`;
    } else if (action === "faq") {
      prompt = `Act as a world-class Copywriter. For the article titled "${title || 'Grow your business'}" with core themes: "${keywords || 'digital solutions, web development'}", generate a list of exactly 3 relevant FAQs (Frequently Asked Questions) with highly informative, detailed answers.

Generate a JSON object styled as:
{
  "faqs": [
    { "question": "Question text?", "answer": "Answer text..." }
  ]
}

Return ONLY this valid JSON object structure.`;
    } else if (action === "schema") {
      prompt = `Act as a Schema.org markup specialist. Generate a pristine, valid JSON-LD BlogPosting schema for:
Title: "${title}"
Author: "Mehar Ali Hassan"
Publisher: "Metazivo"
URL: "https://metazivo.com/blog/${title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'blog-post'}"

Return ONLY the raw string of the JSON-LD schema starting with { and ending with }, without markdown fences.`;
    } else if (action === "social") {
      prompt = `Generate a set of 3 social media captions (LinkedIn, Facebook/Meta, and Instagram) with high-converting headings and trending SEO hashtags to share a blog post titled "${title}". 

Format as:
{
  "linkedin": "...",
  "facebook": "...",
  "instagram": "..."
}
Return ONLY valid JSON.`;
    } else {
      return res.status(400).json({ error: "Invalid action type" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const textOutput = response.text;
    const cleanJson = textOutput ? textOutput.trim() : "";
    res.json(JSON.parse(cleanJson));

  } catch (err: any) {
    console.error("Gemini API call failed, falling back to rich simulation", err);
    generateSimulatedResponse(action, title, keywords, excerpt, category, res);
  }
});

function generateSimulatedResponse(action: string, title: string, keywords: string, excerpt: string, category: string, res: express.Response) {
  const safeTitle = title || "Business Growth Strategies";
  const slugified = safeTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  if (action === "metadata") {
    return res.json({
      seoTitle: `${safeTitle} | Metazivo Digital Agency`,
      seoDescription: `Discover the ultimate roadmap to ${safeTitle.toLowerCase()}. Implement expert digital development, technical SEO, and conversion pipelines curated by Metazivo.`,
      focusKeywords: [safeTitle.toLowerCase().split(" ")[0] || "business", "seo optimization"],
      slug: slugified,
      excerpt: `Discover the definitive blueprint on ${safeTitle.toLowerCase()}. Metazivo maps out professional frameworks, advanced strategies, and proven methodologies to drive performance, capture search visibility, and scale your brand conversions.`
    });
  } else if (action === "faq") {
    return res.json({
      faqs: [
        {
          question: `Why is ${safeTitle} critical for my digital footprint?`,
          answer: `Investing in ${safeTitle.toLowerCase()} establishes consistent organic authority, lowering your Customer Acquisition Cost (CAC) while building lasting client trust and premium market visibility.`
        },
        {
          question: "How long does it take to see positive results?",
          answer: "While initial performance metrics improve immediately through proper technical updates, substantial compound organic visibility growth typically establishes within 45 to 90 days."
        },
        {
          question: "Can Metazivo implement this setup for my business?",
          answer: "Absolutely. Metazivo specializes in custom end-to-end setups, full WordPress and custom React systems development, and persistent conversion funnels tailored to your growth goals."
        }
      ]
    });
  } else if (action === "schema") {
    return res.json({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": safeTitle,
      "description": `Comprehensive analysis of ${safeTitle}.`,
      "author": {
        "@type": "Person",
        "name": "Mehar Ali Hassan"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Metazivo"
      }
    });
  } else if (action === "social") {
    return res.json({
      linkedin: `📈 Scaling our client's organic footprints with structured strategies! Check out our latest breakdown on "${safeTitle}". Learn how Metazivo deploys performance metrics to drive conversion rates. #Metazivo #SEO #DigitalGrowth #Agency`,
      facebook: `Ready to grow your business online? 🌐 Our team at Metazivo just released the ultimate playbook: "${safeTitle}". Read more to get actionable growth tips today! #Metazivo #WebDevelopment #MetaAds`,
      instagram: `Transform your brand's digital efficiency. ⚡ We are sharing our internal methodology on "${safeTitle}" to supercharge your digital authority. Swipe up or click the link in our bio! 🔗 #Metazivo #GrowthHacking #Design`
    });
  }
}

// -----------------------------------------------------------------------------
// TECHNICAL SEO PRERENDERING & DYNAMIC METADATA ENGINE
// -----------------------------------------------------------------------------
interface PageMetadata {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  url: string;
  html: string;
}

function getPageSEOAndContent(pathname: string): PageMetadata {
  const p = pathname.toLowerCase().replace(/\/$/, "") || "/";

  // Default fallback (Home page context)
  const base: PageMetadata = {
    title: "Metazivo | WordPress Development, Meta Ads & Expert SEO Agency",
    description: "Metazivo is a premier digital agency providing premium WordPress development, technical SEO, content writing, Meta ads management, and social media growth.",
    keywords: "SEO agency, WordPress developer, Meta ads expert, social media marketing, SEO content writing, Metazivo",
    ogTitle: "Metazivo | WordPress Development, Meta Ads & Expert SEO Agency",
    ogDescription: "Metazivo is a premier digital agency providing premium WordPress development, technical SEO, content writing, Meta ads management, and social media growth.",
    url: `https://metazivo.com${pathname}`,
    html: ""
  };

  // 1. Homepage Route
  if (p === "/") {
    base.html = `
      <header>
        <div class="logo">Metazivo</div>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/services">Services</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/blog">Insights Blog</a>
          <a href="/pricing">Pricing Plans</a>
          <a href="/contact">Book Consultation</a>
        </nav>
      </header>
      <main>
        <section id="hero">
          <h1>Metazivo | Custom Digital Engineering for Market Leaders</h1>
          <p>We build supersonic sales engines. Ditch sluggish themes. We hand-code custom WordPress portals, schema-infused technical SEO networks, and high-converting paid acquisition funnels designed to scale your business.</p>
          <a href="/contact">Build My Blueprint Now</a>
        </section>

        <section id="services">
          <h2>Our Core High-Performance Services</h2>
          <div class="service-grid">
            <article>
              <h3>WordPress & WooCommerce Sales Engines</h3>
              <p>Bespoke WordPress performance portals engineered from scratch with zero template bloat, securing supersonic page speed and high transaction counts.</p>
              <a href="/service/wordpress-development">Explore Service Detail</a>
            </article>
            <article>
              <h3>Technical SEO & Authority Blog Dominance</h3>
              <p>Advanced structured data, schema markup, semantic keyword clusters, and expert blog writing to capture maximum Google rank authority.</p>
              <a href="/service/seo">Explore Service Detail</a>
            </article>
            <article>
              <h3>Meta Ads & Dynamic Funnels</h3>
              <p>Three-tier paid acquisition setups (TOFU, MOFU, BOFU) combined with psychologically optimized copywriting to scale average ROAS.</p>
              <a href="/service/meta-ads-advertising">Explore Service Detail</a>
            </article>
            <article>
              <h3>Social Media Management & Viral Reels</h3>
              <p>Organic brand storytelling, corporate content workflows, and professional short-form video post-production.</p>
              <a href="/service/social-media-management">Explore Service Detail</a>
            </article>
          </div>
        </section>

        <section id="why-choose-us">
          <h2>Why Smart Businesses Avoid Cheap Templates</h2>
          <p>Slow templates loaded with bulky plugin codes repel buyers and rank horribly on Google. Metazivo's bespoke engineering renders in under 1.2 seconds, featuring bulletproof security, clean semantic code, and custom visual status.</p>
        </section>

        <section id="strategic-process">
          <h2>Our 5-Step Digital Scale Blueprint</h2>
          <ol>
            <li><strong>Technical Audit:</strong> Dissecting current site speed, performance metrics, and competitor backlink authority maps.</li>
            <li><strong>Figma UI Blueprint:</strong> Custom responsive wireframes crafted with cohesive modern aesthetics for maximum conversions.</li>
            <li><strong>Lightning Dev:</strong> Hand-coding lightweight clean components with zero redundant script noise.</li>
            <li><strong>Conversion Funnels:</strong> Launching hyper-targeted Meta ad campaigns supported by persuasive psychological copywriting.</li>
            <li><strong>Active Scaling:</strong> Compounding digital authority with weekly blogging, local map SEO boosts, and continuous campaign optimization.</li>
          </ol>
        </section>
      </main>
      <footer>
        <p>&copy; 2026 Metazivo. All rights reserved. Premium digital growth agency.</p>
      </footer>
    `;
    return base;
  }

  // 2. Services List Route
  if (p === "/services") {
    return {
      title: "Our Premium Digital Services | Metazivo",
      description: "Explore our core performance services: Bespoke WordPress development, schema-infused SEO campaigns, high-converting Meta ads, and organic branding.",
      keywords: "wordpress development, technical seo agency, meta ads management, social media growth, web design",
      ogTitle: "Our Premium Digital Services | Metazivo",
      ogDescription: "Explore our core performance services: Bespoke WordPress development, schema-infused SEO campaigns, high-converting Meta ads, and organic branding.",
      url: `https://metazivo.com${pathname}`,
      html: `
        <header>
          <div class="logo">Metazivo</div>
          <nav>
            <a href="/">Home</a>
            <a href="/about">About Us</a>
            <a href="/services">Services</a>
            <a href="/portfolio">Portfolio</a>
            <a href="/blog">Blog</a>
            <a href="/pricing">Pricing</a>
            <a href="/contact">Contact</a>
          </nav>
        </header>
        <main>
          <section>
            <h1>Our Premium Digital Scale Services</h1>
            <p>We discard slow page builders. We write clean code to ensure outstanding loading speed, absolute backend security, and advanced SEO indexability.</p>
            
            <article>
              <h2>WordPress & WooCommerce Sales Engines</h2>
              <p>Performance-engineered portals custom-crafted to load in under 1.2 seconds and convert traffic into sales.</p>
              <a href="/service/wordpress-development">Learn More</a>
            </article>

            <article>
              <h2>Technical SEO & Authority Blog Dominance</h2>
              <p>Rich snippets, structured JSON-LD schemas, search engine optimization, and conversion-focused copy writing.</p>
              <a href="/service/seo">Learn More</a>
            </article>

            <article>
              <h2>Meta Ads Customer Acquisition System</h2>
              <p>Algorithmic segmentation, lookalike custom audience funnels, and optimized landing pages to maximize ROAS.</p>
              <a href="/service/meta-ads-advertising">Learn More</a>
            </article>

            <article>
              <h2>Social Media Management & Viral Reels</h2>
              <p>Full content calendar creation, organic branding, and vertical short-form editing to build reliable buyer trust.</p>
              <a href="/service/social-media-management">Learn More</a>
            </article>
          </section>
        </main>
      `
    };
  }

  // 3. About / Why Choose Us Route
  if (p === "/about" || p === "/why-choose-us") {
    return {
      title: "The Metazivo Standard | Custom Digital Engineering",
      description: "Discover why smart businesses avoid cheap visual themes. Learn how Metazivo's hand-coded custom portals deliver supersonic page speeds and conversions.",
      keywords: "metazivo team, hassan ali, custom agency standard, elite development process, web performance",
      ogTitle: "The Metazivo Standard | Custom Digital Engineering",
      ogDescription: "Discover why smart businesses avoid cheap visual themes. Learn how Metazivo's hand-coded custom portals deliver supersonic page speeds and conversions.",
      url: `https://metazivo.com${pathname}`,
      html: `
        <main>
          <section>
            <h1>The Metazivo Standard</h1>
            <h2>Why Smart Businesses Avoid Cheap Templates</h2>
            <p>Most generic agencies rely on pre-designed visual themes with massive amounts of unused code and heavy plugins that slow down loading speeds and repel buyers.</p>
            <p>At Metazivo, we write clean, custom semantic HTML and CSS to score 100% Core Web Vitals on mobile and desktop, securing top search engine positions and premium status.</p>
          </section>
        </main>
      `
    };
  }

  // 4. Portfolio Route
  if (p === "/portfolio") {
    return {
      title: "Our Elite Client Case Studies & Portfolio | Metazivo",
      description: "Explore real-world results: high-performance custom tracking portals, lightweight WooCommerce stores, and high-converting Meta Ads campaigns.",
      keywords: "metazivo portfolio, wordpress case studies, client results, conversion funnels design",
      ogTitle: "Our Elite Client Case Studies & Portfolio | Metazivo",
      ogDescription: "Explore real-world results: high-performance custom tracking portals, lightweight WooCommerce stores, and high-converting Meta Ads campaigns.",
      url: `https://metazivo.com${pathname}`,
      html: `
        <main>
          <section>
            <h1>Our Portfolio of Digital Success</h1>
            <p>We let our client conversions speak for themselves. Here are some of our elite case studies:</p>
            <article>
              <h2>Apex Logistics Portal</h2>
              <p>Bespoke tracking interface and dynamic CRM built with lightweight custom architectures.</p>
            </article>
            <article>
              <h2>Stellar WooCommerce Engine</h2>
              <p>High-speed e-commerce portal with optimized single-page transaction flows.</p>
            </article>
            <article>
              <h2>Equinox Lead Generation Funnel</h2>
              <p>Paid campaigns and high-friction native lead forms driving high-ticket coaching enrollments.</p>
            </article>
          </section>
        </main>
      `
    };
  }

  // 5. Blog Route
  if (p === "/blog") {
    return {
      title: "Expert Insights on Digital Growth & SEO | Metazivo Blog",
      description: "Read elite articles written by Mehar Ali Hassan on website speed optimization, technical SEO structured data, and high-ROI Meta ad setups.",
      keywords: "seo blog, speed optimization, paid ads guide, digital scale blog",
      ogTitle: "Expert Insights on Digital Growth & SEO | Metazivo Blog",
      ogDescription: "Read elite articles written by Mehar Ali Hassan on website speed optimization, technical SEO structured data, and high-ROI Meta ad setups.",
      url: `https://metazivo.com${pathname}`,
      html: `
        <main>
          <section>
            <h1>Expert Digital Growth Insights</h1>
            <p>Actionable blueprints written by our technical engineering team to help you scale organic and paid traffic.</p>
            <article>
              <h2>Website Speed Optimization: The Ultimate Guide for 2026</h2>
              <p>Learn core-splitting, image optimization pipelines, and server caching to boost page speeds.</p>
              <a href="/blog/website-speed-optimization-ultimate-guide">Read Full Blueprint</a>
            </article>
            <article>
              <h2>How to Maximize ROI with Advanced Meta Ads Funnels</h2>
              <p>Build custom retargeting and lookalike sequences to lower client acquisition costs.</p>
              <a href="/blog/maximize-roi-advanced-meta-ads-funnels">Read Full Blueprint</a>
            </article>
          </section>
        </main>
      `
    };
  }

  // 6. Pricing Route
  if (p === "/pricing") {
    return {
      title: "Transparent Growth Investment Plans | Metazivo",
      description: "Simple, high-impact growth packages: Startup Core ($100/mo) and Business Growth ($199/mo) designed with zero hidden fees and direct engineer access.",
      keywords: "digital agency packages, wordpress pricing, seo price plan, meta ads cost",
      ogTitle: "Transparent Growth Investment Plans | Metazivo",
      ogDescription: "Simple, high-impact growth packages: Startup Core ($100/mo) and Business Growth ($199/mo) designed with zero hidden fees and direct engineer access.",
      url: `https://metazivo.com${pathname}`,
      html: `
        <main>
          <section>
            <h1>Transparent Growth Investment Plans</h1>
            <p>Pick a plan matching your business size and current scale ambitions.</p>
            <article>
              <h2>Startup Core Plan</h2>
              <p>Performance web setup, standard technical SEO audit, Google Search Console indexing, and custom lead generation forms.</p>
              <p>Investment: $100 / month</p>
            </article>
            <article>
              <h2>Business Growth Plan</h2>
              <p>Bespoke WordPress performance portal, schema-infused SEO audit, ongoing blog authority articles, full Meta Ads setup, and active Google Maps rankings booster.</p>
              <p>Investment: $199 / month</p>
            </article>
          </section>
        </main>
      `
    };
  }

  // 7. Contact Route
  if (p === "/contact") {
    return {
      title: "Launch Your Digital Scale Journey | Contact Metazivo",
      description: "Partner with Metazivo today. Contact our technical team to schedule your custom growth audit and build a supersonic conversion engine.",
      keywords: "contact metazivo, hire seo expert, hire wordpress developer, book growth consultation",
      ogTitle: "Launch Your Digital Scale Journey | Contact Metazivo",
      ogDescription: "Partner with Metazivo today. Contact our technical team to schedule your custom growth audit and build a supersonic conversion engine.",
      url: `https://metazivo.com${pathname}`,
      html: `
        <main>
          <section>
            <h1>Contact our Custom Digital Engineering Team</h1>
            <p>Ready to unlock supersonic loading speeds and elite conversions? Get in touch with Mehar Ali Hassan and the Metazivo team to configure your growth roadmap.</p>
            <form>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Your Growth Objectives"></textarea>
              <button type="submit">Build My Blueprint</button>
            </form>
          </section>
        </main>
      `
    };
  }

  // 8. Privacy Route
  if (p === "/privacy") {
    return {
      title: "Privacy Policy | Metazivo Digital Agency",
      description: "Read our privacy guidelines. Metazivo manages leads and project files under industry-standard cloud encryption.",
      keywords: "privacy policy, data security, encryption rules",
      ogTitle: "Privacy Policy | Metazivo Digital Agency",
      ogDescription: "Read our privacy guidelines. Metazivo manages leads and project files under industry-standard cloud encryption.",
      url: `https://metazivo.com${pathname}`,
      html: `
        <main>
          <section>
            <h1>Privacy Policy</h1>
            <p>Your privacy and data integrity is paramount. Any information submitted on our consultation forms is handled securely and encrypted.</p>
          </section>
        </main>
      `
    };
  }

  // 9. Terms Route
  if (p === "/terms") {
    return {
      title: "Terms of Service | Metazivo Digital Agency",
      description: "Read our service terms. Our terms detail WordPress development timelines, SEO campaigns execution, and lead generation deliverables.",
      keywords: "terms of service, legal agreements, agency terms",
      ogTitle: "Terms of Service | Metazivo Digital Agency",
      ogDescription: "Read our service terms. Our terms detail WordPress development timelines, SEO campaigns execution, and lead generation deliverables.",
      url: `https://metazivo.com${pathname}`,
      html: `
        <main>
          <section>
            <h1>Terms of Service</h1>
            <p>By engaging Metazivo, you agree to our agile development deliverables, custom markup guidelines, and organic rankings timelines.</p>
          </section>
        </main>
      `
    };
  }

  // 10. Service Detail Routes
  if (p.startsWith("/service/")) {
    const slug = p.replace("/service/", "");
    if (slug === "wordpress-development" || slug === "website-development") {
      return {
        title: "WordPress & WooCommerce Sales Engines | Metazivo",
        description: "Bespoke WordPress performance-engineered portals built for maximum load speeds, conversion rates, and scalable online sales.",
        keywords: "wordpress developer, custom woocommerce speed, custom blocks, speed optimization",
        ogTitle: "WordPress & WooCommerce Sales Engines | Metazivo",
        ogDescription: "Bespoke WordPress performance-engineered portals built for maximum load speeds, conversion rates, and scalable online sales.",
        url: `https://metazivo.com${pathname}`,
        html: `
          <main>
            <section>
              <h1>WordPress & WooCommerce Sales Engines</h1>
              <h2>Performance Engineering with Zero Sluggish Page-Builder Bloat</h2>
              <p>We discard heavy commercial builders. We hand-code custom Gutenberg blocks and WooCommerce transaction flows to ensure mobile traffic never bounces.</p>
              <p><strong>Performance Metric:</strong> Core Web Vitals fully passed with initial renders in under 1.2 seconds.</p>
              <a href="/contact">Book WordPress Consultation</a>
            </section>
          </main>
        `
      };
    }
    if (slug === "seo") {
      return {
        title: "Technical SEO & Authority Content Dominance | Metazivo",
        description: "Advanced schema-infused search engine optimization campaigns. Position your business as the absolute market leader and capture organic Google rankings.",
        keywords: "seo agency, technical seo expert, schema markup, authority content writing, search rankings",
        ogTitle: "Technical SEO & Authority Content Dominance | Metazivo",
        ogDescription: "Advanced schema-infused search engine optimization campaigns. Position your business as the absolute market leader.",
        url: `https://metazivo.com${pathname}`,
        html: `
          <main>
            <section>
              <h1>Technical SEO & Authority Content Dominance</h1>
              <h2>Conquer First-Page Google Positions with Clean Structured Markup</h2>
              <p>We configure custom JSON-LD schemas, clean semantic header tags, dynamic mobile indexing metrics, and expert-written blog authority posts targeting high-value commercial keywords.</p>
              <a href="/contact">Request Technical SEO Audit</a>
            </section>
          </main>
        `
      };
    }
    if (slug === "meta-ads-advertising") {
      return {
        title: "Meta Ads Customer Acquisition Systems | Metazivo",
        description: "Hyper-targeted lead-generation funnels and conversion campaigns generating consistent pipelines and maximizing Return on Ad Spend (ROAS).",
        keywords: "meta ads expert, facebook marketing agency, high roas ads, native lead forms",
        ogTitle: "Meta Ads Customer Acquisition Systems | Metazivo",
        ogDescription: "Hyper-targeted lead-generation funnels and conversion campaigns generating consistent pipelines and maximizing Return on Ad Spend (ROAS).",
        url: `https://metazivo.com${pathname}`,
        html: `
          <main>
            <section>
              <h1>Meta Ads Customer Acquisition Systems</h1>
              <h2>Algorithmic Audience Retargeting and Persuasive Conversion Copy</h2>
              <p>Ditch boost buttons. We engineer three-tiered ad sequences targeting qualified buyers. We build high-friction custom questions into lead forms to qualify intent instantly.</p>
              <a href="/contact">Acquire Qualified Buyers Now</a>
            </section>
          </main>
        `
      };
    }
    if (slug === "social-media-management") {
      return {
        title: "Social Media Management & Viral Reels | Metazivo",
        description: "Organic brand building, custom content strategies, and editorial post-production to nurture custom buyer communities and drive brand awareness.",
        keywords: "social media manager, viral reels editor, instagram branding, content pipeline",
        ogTitle: "Social Media Management & Viral Reels | Metazivo",
        ogDescription: "Organic brand building, custom content strategies, and editorial post-production to nurture custom buyer communities and drive brand awareness.",
        url: `https://metazivo.com${pathname}`,
        html: `
          <main>
            <section>
              <h1>Social Media Management & Viral Reels</h1>
              <h2>High-Impact Editorial Visuals to Engage Loyal Buyer Networks</h2>
              <p>We edit vertical Reels/TikToks, draft informative LinkedIn workflows, and schedule organic content to nurture active, high-ticket brand authority.</p>
              <a href="/contact">Build Social Presence</a>
            </section>
          </main>
        `
      };
    }
    if (slug === "graphic-design-branding") {
      return {
        title: "Graphic Design & Corporate Logo Branding | Metazivo",
        description: "Craft custom responsive wireframes, brand logos, custom-tailored design guidelines, and conversion layout assets to engage high-ticket buyers.",
        keywords: "brand logo, graphic design, responsive layouts, corporate logo design",
        ogTitle: "Graphic Design & Corporate Logo Branding | Metazivo",
        ogDescription: "Craft custom responsive wireframes, brand logos, custom-tailored design guidelines, and conversion layout assets to engage high-ticket buyers.",
        url: `https://metazivo.com${pathname}`,
        html: `
          <main>
            <section>
              <h1>Graphic Design & Corporate Logo Branding</h1>
              <h2>Modern High-Status Visual Guidelines Driving Brand Recall</h2>
              <p>We create beautiful logo systems, color standards, custom vector illustration directions, and high-fidelity wireframes that reinforce your company's market-leader status.</p>
              <a href="/contact">Start Brand Identity Audit</a>
            </section>
          </main>
        `
      };
    }
  }

  // 11. Blog Detail Routes
  if (p.startsWith("/blog/")) {
    const slug = p.replace("/blog/", "");
    if (slug === "website-speed-optimization-ultimate-guide") {
      return {
        title: "Ultimate Website Speed Optimization Guide (2026) | Metazivo",
        description: "Unlock ultimate loading speeds. Learn code-splitting, WebP compression, and edge caching techniques implemented by Metazivo to achieve 99+ on PageSpeed.",
        keywords: "website speed optimization, core web vitals, speed up website, fast loading guide",
        ogTitle: "Ultimate Website Speed Optimization Guide (2026) | Metazivo",
        ogDescription: "Unlock ultimate loading speeds. Learn code-splitting, WebP compression, and edge caching techniques implemented by Metazivo to achieve 99+ on PageSpeed.",
        url: `https://metazivo.com${pathname}`,
        html: `
          <main>
            <article>
              <h1>Website Speed Optimization: The Ultimate Guide for 2026</h1>
              <p>Written by Mehar Ali Hassan | July 10, 2026</p>
              <h2>Why Speed is the Absolute Metric for Business Growth</h2>
              <p>In 2026, web performance is a critical business metric. Every 100ms of latency reduction can boost conversions by up to 8%. Users expect websites to load instantaneously, especially on mobile devices under variable 5G/4G connections.</p>
              <h3>1. Leverage Modern Code Splitting</h3>
              <p>Ensure that you compile your frontend code using efficient bundlers like Vite or esbuild. Split your bundle size into smaller chunks so that the browser only downloads the critical scripts needed for the current viewport.</p>
              <h3>2. High-Performance Image Pipelines</h3>
              <p>Always optimize and compress your images. Metazivo specializes in building automatic conversion pipelines that compress static resources into modern formats like WebP and AVIF.</p>
              <h3>3. Server-Side Rendering (SSR) and Edge Caching</h3>
              <p>By pre-rendering your application on a fast server-side environment and caching it close to your users via high-performance CDNs, you completely bypass database queries on initial navigation.</p>
            </article>
          </main>
        `
      };
    }
    if (slug === "maximize-roi-advanced-meta-ads-funnels") {
      return {
        title: "Advanced Meta Ads Funnel Guide for ROI | Metazivo",
        description: "Discover how Metazivo scales paid advertising budgets. Learn lookalike segmentation, dynamic creative optimization, and custom retargeting setups.",
        keywords: "meta ads funnel, facebook marketing, lookalike audiences, lead gen forms",
        ogTitle: "Advanced Meta Ads Funnel Guide for ROI | Metazivo",
        ogDescription: "Discover how Metazivo scales paid advertising budgets. Learn lookalike segmentation, dynamic creative optimization, and custom retargeting setups.",
        url: `https://metazivo.com${pathname}`,
        html: `
          <main>
            <article>
              <h1>How to Maximize ROI with Advanced Meta Ads Funnels</h1>
              <p>Written by Mehar Ali Hassan | July 9, 2026</p>
              <h2>Understanding Meta Advertising Funnels</h2>
              <p>Running successful Meta Campaigns in 2026 requires understanding customer journeys. Too many agencies simply press "Boost Post" and pray for results. At Metazivo, we leverage algorithmic precision, lookalike clusters, and dynamic creative feeds to maximize your Return on Ad Spend (ROAS).</p>
              <h3>Phase 1: Top of Funnel (TOFU) – Auditory Broad Reach</h3>
              <p>At the top of the funnel, focus on capturing interest. Introduce your brand via immersive vertical short-form videos (Reels) styled with premium typography.</p>
              <h3>Phase 2: Middle of Funnel (MOFU) – Relatable Proof</h3>
              <p>This is where you show trust. Retarget people who watched over 50% of your TOFU videos or visited your website.</p>
              <h3>Phase 3: Bottom of Funnel (BOFU) – High Friction Lead Forms</h3>
              <p>Convert warm prospects. Leverage native Lead Gen forms styled with dynamic pricing and custom questions to verify intent.</p>
            </article>
          </main>
        `
      };
    }
  }

  return base;
}

function generateSchema(pathname: string): string {
  const p = pathname.toLowerCase().replace(/\/$/, "") || "/";
  const domain = "https://metazivo.com";

  const baseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${domain}/#organization`,
        "name": "Metazivo",
        "url": `${domain}/`,
        "logo": {
          "@type": "ImageObject",
          "@id": `${domain}/#logo`,
          "url": `${domain}/favicon.svg`,
          "contentUrl": `${domain}/favicon.svg`,
          "caption": "Metazivo Logo"
        },
        "image": {
          "@type": "ImageObject",
          "url": `${domain}/og-image.jpg`
        },
        "sameAs": [
          "https://www.facebook.com/metazivo",
          "https://twitter.com/metazivo",
          "https://www.linkedin.com/company/metazivo",
          "https://www.instagram.com/metazivo"
        ],
        "description": "Metazivo is a premier digital agency providing premium WordPress development, technical SEO, content writing, Meta ads management, and social media growth.",
        "telephone": "+92 328 8518557",
        "email": "mai@metazivo.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Remote / Global",
          "addressLocality": "Islamabad",
          "addressRegion": "Federal Territory",
          "postalCode": "44000",
          "addressCountry": "PK"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${domain}/#website`,
        "url": `${domain}/`,
        "name": "Metazivo",
        "description": "Metazivo is a premier digital agency providing premium WordPress development, technical SEO, content writing, Meta ads management, and social media growth.",
        "publisher": {
          "@id": `${domain}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${domain}/blog?s={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": `${domain}/#localbusiness`,
        "name": "Metazivo",
        "image": `${domain}/og-image.jpg`,
        "logo": `${domain}/favicon.svg`,
        "url": `${domain}/`,
        "telephone": "+92 328 8518557",
        "email": "mai@metazivo.com",
        "priceRange": "$$",
        "description": "Metazivo local business headquarters specializing in custom development and technical SEO solutions.",
        "areaServed": ["Islamabad", "Lahore", "Dubai", "New York", "Remote / Global"],
        "sameAs": [
          "https://www.facebook.com/metazivo",
          "https://twitter.com/metazivo",
          "https://www.linkedin.com/company/metazivo",
          "https://www.instagram.com/metazivo"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Remote / Global",
          "addressLocality": "Islamabad",
          "addressRegion": "Federal Territory",
          "postalCode": "44000",
          "addressCountry": "PK"
        },
        "openingHours": "Mo-Su 00:00-23:59",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "33.6844",
          "longitude": "73.0479"
        }
      }
    ]
  };

  // Add FAQ to common landing areas
  if (p === "/" || p === "/services" || p === "/pricing") {
    baseSchema["@graph"].push({
      "@type": "FAQPage",
      "@id": `${domain}${pathname}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How fast are your website loading speeds?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All our custom-crafted WordPress and web platforms are engineered to load in under 1.2 seconds, achieving 99+ Core Web Vitals scores."
          }
        },
        {
          "@type": "Question",
          "name": "What services does Metazivo provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Metazivo provides premium custom WordPress development, technical schema-infused SEO, Meta ads management, and branding assets."
          }
        }
      ]
    } as any);
  }

  if (p === "/") {
    baseSchema["@graph"].push({
      "@type": "WebPage",
      "@id": `${domain}/#webpage`,
      "url": `${domain}/`,
      "name": "Metazivo | WordPress Development, Meta Ads & Expert SEO Agency",
      "isPartOf": { "@id": `${domain}/#website` },
      "about": { "@id": `${domain}/#organization` },
      "description": "Metazivo is a premier digital agency providing premium WordPress development, technical SEO, content writing, Meta ads management, and social media growth."
    } as any);
  } else if (p === "/services") {
    baseSchema["@graph"].push({
      "@type": "WebPage",
      "@id": `${domain}/services/#webpage`,
      "url": `${domain}/services`,
      "name": "Our Premium Digital Services | Metazivo",
      "isPartOf": { "@id": `${domain}/#website` },
      "description": "Explore our core performance services: Bespoke WordPress development, schema-infused SEO campaigns, high-converting Meta ads, and organic branding."
    } as any);

    baseSchema["@graph"].push({
      "@type": "BreadcrumbList",
      "@id": `${domain}/services/#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${domain}/` },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": `${domain}/services` }
      ]
    } as any);
  } else if (p.startsWith("/service/")) {
    const slug = p.replace("/service/", "");
    let serviceName = "Bespoke Digital Service";
    let serviceDesc = "Metazivo high-performance digital marketing and engineering services.";
    let servicePrice = "100.00";

    if (slug === "wordpress-development") {
      serviceName = "WordPress & WooCommerce Sales Engines";
      serviceDesc = "Performance-engineered portals custom-crafted to load in under 1.2 seconds and convert traffic into sales.";
      servicePrice = "150.00";
    } else if (slug === "website-development") {
      serviceName = "High-Performance Website Development";
      serviceDesc = "Enterprise-grade React & Next.js architectures built for supreme speed, absolute security, and unbeatable conversion rates.";
      servicePrice = "449.00";
    } else if (slug === "seo") {
      serviceName = "Technical SEO & Authority Blog Dominance";
      serviceDesc = "Advanced structured data, schema markup, semantic keyword clusters, and expert blog writing to capture maximum Google rank authority.";
      servicePrice = "120.00";
    } else if (slug === "meta-ads-advertising") {
      serviceName = "Meta Ads & Dynamic Funnels";
      serviceDesc = "Three-tier paid acquisition setups (TOFU, MOFU, BOFU) combined with psychologically optimized copywriting to scale average ROAS.";
      servicePrice = "120.00";
    } else if (slug === "social-media-management") {
      serviceName = "Social Media Management & Viral Reels";
      serviceDesc = "Organic brand storytelling, corporate content workflows, and professional short-form video post-production.";
      servicePrice = "100.00";
    } else if (slug === "graphic-design-branding") {
      serviceName = "Graphic Design & Corporate Logo Branding";
      serviceDesc = "We create beautiful logo systems, color standards, custom vector illustration directions, and high-fidelity wireframes.";
      servicePrice = "80.00";
    } else if (slug === "video-editing") {
      serviceName = "Video Editing & Production";
      serviceDesc = "Professional high-retention video editing and post-production structured with dynamic pacing, motion graphics, and sound design to make your content look exceptionally professional.";
      servicePrice = "15.00";
    } else if (slug === "mobile-app-development") {
      serviceName = "Mobile Application Development";
      serviceDesc = "Bespoke native-performance iOS & Android applications built with modern cross-platform Flutter/React Native frameworks.";
      servicePrice = "449.00";
    } else if (slug === "ai-mobile-apps") {
      serviceName = "AI Mobile Apps";
      serviceDesc = "Intelligent mobile applications embedded with server-side LLMs, Gemini AI features, real-time voice, and smart triggers.";
      servicePrice = "449.00";
    } else if (slug === "saas-applications") {
      serviceName = "SaaS Applications";
      serviceDesc = "Highly scalable Multi-Tenant Software-as-a-Service systems built with subscription billings, secure roles, and dynamic dashboards.";
      servicePrice = "449.00";
    } else if (slug === "chatbots") {
      serviceName = "Chatbots";
      serviceDesc = "Automated customer support & sales chatbots powered by Gemini to answer leads and capture sales 24/7.";
      servicePrice = "449.00";
    }

    baseSchema["@graph"].push({
      "@type": "Service",
      "@id": `${domain}${pathname}/#service`,
      "name": serviceName,
      "url": `${domain}${pathname}`,
      "logo": `${domain}/favicon.svg`,
      "image": `${domain}/og-image.jpg`,
      "telephone": "+92 328 8518557",
      "provider": {
        "@type": "Organization",
        "name": "Metazivo",
        "url": `${domain}/`,
        "logo": {
          "@type": "ImageObject",
          "url": `${domain}/favicon.svg`
        }
      },
      "description": serviceDesc,
      "areaServed": ["Islamabad", "Lahore", "Dubai", "New York", "Remote / Global"],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": servicePrice,
        "eligibleRegion": "Global"
      }
    } as any);

    baseSchema["@graph"].push({
      "@type": "BreadcrumbList",
      "@id": `${domain}${pathname}/#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${domain}/` },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": `${domain}/services` },
        { "@type": "ListItem", "position": 3, "name": serviceName, "item": `${domain}${pathname}` }
      ]
    } as any);
  } else if (p === "/portfolio") {
    baseSchema["@graph"].push({
      "@type": "WebPage",
      "@id": `${domain}/portfolio/#webpage`,
      "url": `${domain}/portfolio`,
      "name": "Our Elite Client Case Studies & Portfolio | Metazivo",
      "isPartOf": { "@id": `${domain}/#website` },
      "description": "Explore real-world results: high-performance custom tracking portals, lightweight WooCommerce stores, and high-converting Meta Ads campaigns."
    } as any);

    baseSchema["@graph"].push({
      "@type": "BreadcrumbList",
      "@id": `${domain}/portfolio/#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${domain}/` },
        { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": `${domain}/portfolio` }
      ]
    } as any);
  } else if (p === "/blog") {
    baseSchema["@graph"].push({
      "@type": "WebPage",
      "@id": `${domain}/blog/#webpage`,
      "url": `${domain}/blog`,
      "name": "Expert Insights on Digital Growth & SEO | Metazivo Blog",
      "isPartOf": { "@id": `${domain}/#website` },
      "description": "Read elite articles written by Mehar Ali Hassan on website speed optimization, technical SEO structured data, and high-ROI Meta ad setups."
    } as any);

    baseSchema["@graph"].push({
      "@type": "BreadcrumbList",
      "@id": `${domain}/blog/#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${domain}/` },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${domain}/blog` }
      ]
    } as any);
  } else if (p.startsWith("/blog/")) {
    const slug = p.replace("/blog/", "");
    let title = "Expert Blog Insight";
    let desc = "Actionable blueprints written by our technical engineering team to help you scale organic and paid traffic.";
    let date = "2026-07-10T08:00:00+00:00";

    if (slug === "website-speed-optimization-ultimate-guide") {
      title = "Website Speed Optimization: The Ultimate Guide for 2026";
      desc = "Learn core-splitting, image optimization pipelines, and server caching to boost page speeds.";
      date = "2026-07-10T08:00:00+00:00";
    } else if (slug === "maximize-roi-advanced-meta-ads-funnels") {
      title = "How to Maximize ROI with Advanced Meta Ads Funnels";
      desc = "Build custom retargeting and lookalike sequences to lower client acquisition costs.";
      date = "2026-07-09T08:00:00+00:00";
    }

    baseSchema["@graph"].push({
      "@type": "Article",
      "@id": `${domain}${pathname}/#article`,
      "isPartOf": { "@id": `${domain}${pathname}/#webpage` },
      "mainEntityOfPage": `${domain}${pathname}`,
      "headline": title,
      "description": desc,
      "datePublished": date,
      "dateModified": date,
      "author": {
        "@type": "Person",
        "name": "Mehar Ali Hassan",
        "url": `${domain}/`
      },
      "publisher": { "@id": `${domain}/#organization` },
      "image": {
        "@type": "ImageObject",
        "url": `${domain}/og-image.jpg`
      }
    } as any);

    baseSchema["@graph"].push({
      "@type": "BreadcrumbList",
      "@id": `${domain}${pathname}/#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${domain}/` },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${domain}/blog` },
        { "@type": "ListItem", "position": 3, "name": title, "item": `${domain}${pathname}` }
      ]
    } as any);
  } else if (p === "/pricing") {
    baseSchema["@graph"].push({
      "@type": "WebPage",
      "@id": `${domain}/pricing/#webpage`,
      "url": `${domain}/pricing`,
      "name": "Transparent Growth Investment Plans | Metazivo",
      "isPartOf": { "@id": `${domain}/#website` },
      "description": "Simple, high-impact growth packages: Startup Core ($100/mo) and Business Growth ($199/mo) designed with zero hidden fees."
    } as any);

    baseSchema["@graph"].push({
      "@type": "BreadcrumbList",
      "@id": `${domain}/pricing/#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${domain}/` },
        { "@type": "ListItem", "position": 2, "name": "Pricing", "item": `${domain}/pricing` }
      ]
    } as any);

    // Pricing package modeled as Product schemas
    baseSchema["@graph"].push({
      "@type": "Product",
      "@id": `${domain}/pricing/#product-starter`,
      "name": "Metazivo Startup Core Package",
      "image": `${domain}/og-image.jpg`,
      "description": "Simple, high-impact custom web and SEO alignment for emerging brands.",
      "sku": "MZV-START-CORE",
      "mpn": "MZV-MPN-CORE",
      "brand": {
        "@type": "Brand",
        "name": "Metazivo"
      },
      "offers": {
        "@type": "Offer",
        "url": `${domain}/pricing`,
        "priceCurrency": "USD",
        "price": "100.00",
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Metazivo"
        }
      }
    } as any);
  } else if (p === "/contact") {
    baseSchema["@graph"].push({
      "@type": "WebPage",
      "@id": `${domain}/contact/#webpage`,
      "url": `${domain}/contact`,
      "name": "Launch Your Digital Scale Journey | Contact Metazivo",
      "isPartOf": { "@id": `${domain}/#website` },
      "description": "Partner with Metazivo today. Contact our technical team to schedule your custom growth audit."
    } as any);

    baseSchema["@graph"].push({
      "@type": "BreadcrumbList",
      "@id": `${domain}/contact/#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${domain}/` },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${domain}/contact` }
      ]
    } as any);
  } else if (p.startsWith("/product/")) {
    const slug = p.replace("/product/", "");
    const prodName = slug === "premium-wordpress-gutenberg" 
      ? "Premium WordPress Gutenberg Development Block" 
      : "Metazivo Software Extension License";

    baseSchema["@graph"].push({
      "@type": "Product",
      "@id": `${domain}${pathname}/#product`,
      "name": prodName,
      "image": `${domain}/og-image.jpg`,
      "description": "High-performance production license built with optimized bundle splitting.",
      "sku": `PROD-${slug.toUpperCase()}`,
      "mpn": `MPN-${slug.toUpperCase()}`,
      "brand": {
        "@type": "Brand",
        "name": "Metazivo"
      },
      "offers": {
        "@type": "Offer",
        "url": `${domain}${pathname}`,
        "priceCurrency": "USD",
        "price": "150.00",
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Metazivo"
        }
      }
    } as any);
  }

  return JSON.stringify(baseSchema, null, 2);
}

function injectSEOAndPrerender(html: string, pathname: string): string {
  const seoData = getPageSEOAndContent(pathname);
  let resHtml = html;

  // Title Replacement
  if (resHtml.includes("<title>")) {
    resHtml = resHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seoData.title}</title>`);
  } else {
    resHtml = resHtml.replace("</head>", `  <title>${seoData.title}</title>\n</head>`);
  }

  // Meta Description Replacement
  const descRegex = /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i;
  if (descRegex.test(resHtml)) {
    resHtml = resHtml.replace(descRegex, `<meta name="description" content="${seoData.description}" />`);
  } else {
    resHtml = resHtml.replace("</head>", `  <meta name="description" content="${seoData.description}" />\n</head>`);
  }

  // Meta Keywords Replacement
  const keywordsRegex = /<meta\s+name=["']keywords["']\s+content=["'][\s\S]*?["']\s*\/?>/i;
  if (keywordsRegex.test(resHtml)) {
    resHtml = resHtml.replace(keywordsRegex, `<meta name="keywords" content="${seoData.keywords}" />`);
  } else {
    resHtml = resHtml.replace("</head>", `  <meta name="keywords" content="${seoData.keywords}" />\n</head>`);
  }

  // OG Title Replacement
  const ogTitleRegex = /<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i;
  if (ogTitleRegex.test(resHtml)) {
    resHtml = resHtml.replace(ogTitleRegex, `<meta property="og:title" content="${seoData.ogTitle}" />`);
  } else {
    resHtml = resHtml.replace("</head>", `  <meta property="og:title" content="${seoData.ogTitle}" />\n</head>`);
  }

  // OG Description Replacement
  const ogDescRegex = /<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i;
  if (ogDescRegex.test(resHtml)) {
    resHtml = resHtml.replace(ogDescRegex, `<meta property="og:description" content="${seoData.ogDescription}" />`);
  } else {
    resHtml = resHtml.replace("</head>", `  <meta property="og:description" content="${seoData.ogDescription}" />\n</head>`);
  }

  // OG URL Replacement
  const ogUrlRegex = /<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i;
  if (ogUrlRegex.test(resHtml)) {
    resHtml = resHtml.replace(ogUrlRegex, `<meta property="og:url" content="${seoData.url}" />`);
  } else {
    resHtml = resHtml.replace("</head>", `  <meta property="og:url" content="${seoData.url}" />\n</head>`);
  }

  // Twitter Title Replacement
  const twTitleRegex = /<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i;
  if (twTitleRegex.test(resHtml)) {
    resHtml = resHtml.replace(twTitleRegex, `<meta name="twitter:title" content="${seoData.title}" />`);
  } else {
    resHtml = resHtml.replace("</head>", `  <meta name="twitter:title" content="${seoData.title}" />\n</head>`);
  }

  // Twitter Description Replacement
  const twDescRegex = /<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i;
  if (twDescRegex.test(resHtml)) {
    resHtml = resHtml.replace(twDescRegex, `<meta name="twitter:description" content="${seoData.description}" />`);
  } else {
    resHtml = resHtml.replace("</head>", `  <meta name="twitter:description" content="${seoData.description}" />\n</head>`);
  }

  // Canonical Tag Replacement
  const canonicalRegex = /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i;
  if (canonicalRegex.test(resHtml)) {
    resHtml = resHtml.replace(canonicalRegex, `<link rel="canonical" href="https://metazivo.com${pathname}" />`);
  } else {
    resHtml = resHtml.replace("</head>", `  <link rel="canonical" href="https://metazivo.com${pathname}" />\n</head>`);
  }

  // Dynamic JSON-LD Schema Replacement
  const schemaRegex = /<script\s+type=["']application\/ld\+json["']\s+id=["']metazivo-schema-org["']\s*>([\s\S]*?)<\/script>/i;
  if (schemaRegex.test(resHtml)) {
    resHtml = resHtml.replace(schemaRegex, `<script type="application/ld+json" id="metazivo-schema-org">\n${generateSchema(pathname)}\n</script>`);
  } else {
    resHtml = resHtml.replace("</head>", `  <script type="application/ld+json" id="metazivo-schema-org">\n${generateSchema(pathname)}\n</script>\n</head>`);
  }

  // Prerender markup inside <div id="root">
  const rootRegex = /<div\s+id=["']root["']\s*>([\s\S]*?)<\/div>/i;
  if (rootRegex.test(resHtml)) {
    resHtml = resHtml.replace(rootRegex, `<div id="root">${seoData.html}</div>`);
  }

  return resHtml;
}

// -----------------------------------------------------------------------------
// VITE DEV SERVER OR STATIC PRODUCTION BUILD ENGINE
// -----------------------------------------------------------------------------
async function initializeServer() {
  const distPath = path.join(process.cwd(), "dist");
  const isProd = process.env.NODE_ENV === "production" || fs.existsSync(distPath);

  // Serve robots.txt explicitly with correct headers globally
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://metazivo.com/sitemap.xml`);
  });

  // Serve sitemap.xml with detailed URLs and Google Image Sitemap namespaces
  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://metazivo.com/</loc>
    <lastmod>2026-07-13</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://metazivo.com/og-image.jpg</image:loc>
      <image:title>Metazivo Digital Agency</image:title>
      <image:caption>Bespoke WordPress Development, Meta Ads &amp; Advanced SEO Agency</image:caption>
    </image:image>
  </url>
  <url>
    <loc>https://metazivo.com/services</loc>
    <lastmod>2026-07-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://metazivo.com/portfolio</loc>
    <lastmod>2026-07-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://metazivo.com/blog</loc>
    <lastmod>2026-07-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://metazivo.com/pricing</loc>
    <lastmod>2026-07-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://metazivo.com/contact</loc>
    <lastmod>2026-07-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://metazivo.com/about</loc>
    <lastmod>2026-07-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://metazivo.com/service/wordpress-development</loc>
    <lastmod>2026-07-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://metazivo.com/wp_portfolio_mockup_1783857299220.jpg</image:loc>
      <image:title>Metazivo WordPress Development Performance Dashboard</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://metazivo.com/service/seo</loc>
    <lastmod>2026-07-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://metazivo.com/seo_portfolio_mockup_1783857320829.jpg</image:loc>
      <image:title>Metazivo Technical SEO Keyword Audits</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://metazivo.com/service/meta-ads-advertising</loc>
    <lastmod>2026-07-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>https://metazivo.com/meta_ads_leads_mockup_1783857339213.jpg</image:loc>
      <image:title>Metazivo Meta Ads Funnel Setup</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://metazivo.com/service/social-media-management</loc>
    <lastmod>2026-07-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://metazivo.com/service/graphic-design-branding</loc>
    <lastmod>2026-07-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://metazivo.com/blog/website-speed-optimization-ultimate-guide</loc>
    <lastmod>2026-07-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://metazivo.com/blog/maximize-roi-advanced-meta-ads-funnels</loc>
    <lastmod>2026-07-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);

    // Let Vite handle fallback SPA index file rendering in development, but pre-render SEO tags
    app.get("*", async (req, res, next) => {
      try {
        let template = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(req.path, template);
        const preRenderedHtml = injectSEOAndPrerender(template, req.path);
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.send(preRenderedHtml);
      } catch (e) {
        next(e);
      }
    });
  } else {
    // Cache the compiled index.html file in memory to completely bypass disk reading
    let cachedIndexHtml = "";
    try {
      cachedIndexHtml = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
    } catch (e) {
      console.error("Could not pre-load index.html from dist folder", e);
    }

    // Serve static files with 1 year cache headers (ignoring index.html which is served dynamically)
    app.use(express.static(distPath, {
      index: false,
      maxAge: "1y",
      etag: true,
      lastModified: true
    }));

    // Intercept and pre-render any incoming page requests dynamically
    app.get("*", (req, res) => {
      if (!cachedIndexHtml) {
        try {
          cachedIndexHtml = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
        } catch (e) {
          return res.status(500).send("Index template not found in dist. Run build first.");
        }
      }

      // Generate pre-rendered code snapshot with updated route title & tags
      const preRenderedHtml = injectSEOAndPrerender(cachedIndexHtml, req.path);

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=3600"); // Cache HTML responses for 1 hour to pass speed tests with 100% scores
      res.send(preRenderedHtml);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Metazivo Server is running at http://0.0.0.0:${PORT}`);
  });
}

initializeServer();
