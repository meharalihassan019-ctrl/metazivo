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

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

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
// VITE DEV SERVER OR STATIC PRODUCTION BUILD ENGINE
// -----------------------------------------------------------------------------
async function initializeServer() {
  const distPath = path.join(process.cwd(), "dist");
  const isProd = process.env.NODE_ENV === "production" || fs.existsSync(distPath);

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Metazivo Server is running at http://0.0.0.0:${PORT}`);
  });
}

initializeServer();
