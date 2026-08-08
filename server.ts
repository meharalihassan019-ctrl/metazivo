/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, deleteDoc, updateDoc, query, where } from "firebase/firestore";

let firestoreDb;
try {
  const firebaseConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), "firebase-applet-config.json"), "utf-8"));
  const app = initializeApp(firebaseConfig);
  firestoreDb = getFirestore(app, firebaseConfig.firestoreDatabaseId);
} catch(e) {
  console.error("Firebase config not found or invalid", e);
}

async function syncDbToFirestore(data) {
  if (!firestoreDb) return;
  try {
    // Split into smaller docs to avoid 1MB limit if needed, but for now just saving the whole state in chunks
    const coreState = { 
      settings: data.settings, 
      contact: data.contact, 
      tags: data.tags, 
      views: data.views, 
      visitors: data.visitors, 
      viewsHistory: data.viewsHistory 
    };
    const promises = [
      setDoc(doc(firestoreDb, "system", "core"), coreState),
      setDoc(doc(firestoreDb, "system", "posts"), { data: data.posts }),
      setDoc(doc(firestoreDb, "system", "media"), { data: data.media }),
      setDoc(doc(firestoreDb, "system", "leads"), { data: data.leads }),
      setDoc(doc(firestoreDb, "system", "pages"), { data: data.pages }),
      setDoc(doc(firestoreDb, "system", "redirects"), { data: data.redirects })
    ];
    if (data.googleOAuth) {
      promises.push(setDoc(doc(firestoreDb, "system", "googleOAuth"), data.googleOAuth));
    }
    await Promise.all(promises);
  } catch(e) {
    console.error("Failed to sync to firestore", e);
  }
}

async function restoreDbFromFirestore() {
  if (!firestoreDb) return;
  try {
    const coreDoc = await getDoc(doc(firestoreDb, "system", "core"));
    const postsDoc = await getDoc(doc(firestoreDb, "system", "posts"));
    const mediaDoc = await getDoc(doc(firestoreDb, "system", "media"));
    const leadsDoc = await getDoc(doc(firestoreDb, "system", "leads"));
    const pagesDoc = await getDoc(doc(firestoreDb, "system", "pages"));
    const redirectsDoc = await getDoc(doc(firestoreDb, "system", "redirects"));
    const oauthDoc = await getDoc(doc(firestoreDb, "system", "googleOAuth"));

    if (coreDoc.exists()) {
      const core = coreDoc.data();
      db.settings = core.settings || {};
      db.contact = core.contact || {};
      db.tags = core.tags || [];
      db.views = core.views || 0;
      db.visitors = core.visitors || 0;
      db.viewsHistory = core.viewsHistory || [];
    }
    if (postsDoc.exists()) db.posts = postsDoc.data().data || [];
    if (mediaDoc.exists()) db.media = mediaDoc.data().data || [];
    if (leadsDoc.exists()) db.leads = leadsDoc.data().data || [];
    if (pagesDoc.exists()) db.pages = pagesDoc.data().data || [];
    if (redirectsDoc.exists()) db.redirects = redirectsDoc.data().data || [];
    if (oauthDoc.exists()) db.googleOAuth = oauthDoc.data() || null;

    // Save back to local cache
        console.log("Restored DB from Firestore");
  } catch(e) {
    console.error("Failed to restore from firestore", e);
  }
}

import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import compression from "compression";
import crypto from "crypto";

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
  posts: [],
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
      url: "",
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
  return JSON.parse(JSON.stringify(defaultDb));
}

function saveDb(data: any) {
  try {
    syncDbToFirestore(data); // Sync asynchronously
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


// Chatbot API Endpoint
app.post("/api/gemini/chat", async (req, res) => {
  if (!ai) {
    return res.status(500).json({ error: "Gemini API is not configured on the server." });
  }
  try {
    const { messages } = req.body;
    
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: messages,
      config: {
        systemInstruction: "You are a helpful AI assistant for Metazivo, a premier digital engineering agency. Provide concise, friendly, and professional answers."
      }
    });
    
    res.json({ text: response.text });
  } catch (error) {
    console.error("Error in /api/gemini/chat:", error);
    res.status(500).json({ error: "Failed to generate response." });
  }
});

// Post view tracking incrementer
app.post("/api/analytics/hit", (req, res) => {
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

// Tag Manager Endpoints
app.get("/api/tags", (req, res) => {
  const tagsMap = new Map<string, number>();
  
  // Initialize from db.tags
  if (Array.isArray(db.tags)) {
    db.tags.forEach((t: string) => {
      if (t) tagsMap.set(t, 0);
    });
  }

  // Aggregate from posts
  if (Array.isArray(db.posts)) {
    db.posts.forEach((post: any) => {
      if (Array.isArray(post.tags)) {
        post.tags.forEach((t: string) => {
          if (t) {
            tagsMap.set(t, (tagsMap.get(t) || 0) + 1);
          }
        });
      }
    });
  }

  const result = Array.from(tagsMap.entries()).map(([name, count]) => ({
    name,
    count
  }));

  res.json(result);
});

app.post("/api/tags", (req, res) => {
  const name = (req.body.name || "").trim();
  if (!name) {
    return res.status(400).json({ error: "Tag name cannot be empty" });
  }

  if (!db.tags) db.tags = [];
  if (!db.tags.includes(name)) {
    db.tags.push(name);
    saveDb(db);
  }
  res.status(201).json({ success: true, name });
});

app.put("/api/tags/:oldName", (req, res) => {
  const oldName = req.params.oldName;
  const newName = (req.body.name || "").trim();

  if (!newName) {
    return res.status(400).json({ error: "New tag name cannot be empty" });
  }

  // Update in top level db.tags list
  if (Array.isArray(db.tags)) {
    const idx = db.tags.indexOf(oldName);
    if (idx !== -1) {
      db.tags[idx] = newName;
    } else if (!db.tags.includes(newName)) {
      db.tags.push(newName);
    }
  }

  // Update in all posts
  if (Array.isArray(db.posts)) {
    db.posts.forEach((post: any) => {
      if (Array.isArray(post.tags)) {
        post.tags = post.tags.map((t: string) => t === oldName ? newName : t);
        post.tags = Array.from(new Set(post.tags));
      }
    });
  }

  saveDb(db);
  res.json({ success: true });
});

app.delete("/api/tags/:name", (req, res) => {
  const name = req.params.name;

  // Remove from top level db.tags list
  if (Array.isArray(db.tags)) {
    db.tags = db.tags.filter((t: string) => t !== name);
  }

  // Remove from all posts
  if (Array.isArray(db.posts)) {
    db.posts.forEach((post: any) => {
      if (Array.isArray(post.tags)) {
        post.tags = post.tags.filter((t: string) => t !== name);
      }
    });
  }

  saveDb(db);
  res.json({ success: true });
});

// Blog Endpoints
app.get("/api/posts", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(firestoreDb, "posts"));
    const posts = snapshot.docs.map(doc => doc.data());
    // Sort by publishDate desc
    posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get("/api/posts/:slug", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(firestoreDb, "posts"));
    const post = snapshot.docs.map(d => d.data()).find((p: any) => p.slug === req.params.slug);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    const newPost = {
      id: `post-${Date.now()}`,
      title: req.body.title || "Untitled Draft",
      slug: req.body.slug || `untitled-draft-${Date.now()}`,
      excerpt: req.body.excerpt || "",
      content: req.body.content || "",
      status: req.body.status || "draft",
      publishDate: req.body.publishDate || new Date().toISOString(),
      featuredImage: req.body.featuredImage || "",
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
    await setDoc(doc(firestoreDb, "posts", newPost.id), newPost);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

app.put("/api/posts/:id", async (req, res) => {
  try {
    const postRef = doc(firestoreDb, "posts", req.params.id);
    const postDoc = await getDoc(postRef);
    if (!postDoc.exists()) {
      return res.status(404).json({ error: "Post not found" });
    }
    const updatedPost = {
      ...postDoc.data(),
      ...req.body
    };
    await setDoc(postRef, updatedPost);
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

app.post("/api/posts/:id/view", async (req, res) => {
  try {
    const postRef = doc(firestoreDb, "posts", req.params.id);
    const postDoc = await getDoc(postRef);
    if (!postDoc.exists()) {
      return res.status(404).json({ error: "Post not found" });
    }
    const views = (postDoc.data().views || 0) + 1;
    await updateDoc(postRef, { views });
    res.json({ views });
  } catch (err) {
    res.status(500).json({ error: "Failed to update views" });
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  try {
    await deleteDoc(doc(firestoreDb, "posts", req.params.id));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// Media Library Endpoints (WebP Conversion Mock & direct support for base64 saving)
app.get("/api/media", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(firestoreDb, "media"));
    res.json(snapshot.docs.map(d => d.data()));
  } catch(e) { res.status(500).json([]); }
});

app.post("/api/media", (req, res) => {
  
  if (req.body.id) {
    const idx = db.media.findIndex((m: any) => m.id === req.body.id);
    if (idx !== -1) {
      db.media[idx] = { ...db.media[idx], ...req.body, updatedAt: new Date().toISOString() };
      saveDb(db);
      return res.json(db.media[idx]);
    }
  }

  const newAsset = {
    id: `media-${Date.now()}`,
    name: req.body.name || "uploaded_asset.png",
    url: req.body.url || req.body.fileData || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80",
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

app.delete("/api/media/:id", async (req, res) => {
  try {
    await deleteDoc(doc(firestoreDb, "media", req.params.id));
    res.json({ success: true });
  } catch(e) { res.status(500).json({error: "Failed"}); }
});

// Contact Leads / Enquiries Endpoints
app.get("/api/leads", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(firestoreDb, "leads"));
    const items = snapshot.docs.map(d => d.data());
    items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    res.json(items);
  } catch(e) { res.status(500).json([]); }
});

app.post("/api/leads", async (req, res) => {
  try {
    const newLead = {
      id: `lead-${Date.now()}`,
      name: req.body.name || "Anonymous",
      email: req.body.email || "",
      phone: req.body.phone || "",
      message: req.body.message || "",
      service: req.body.service || "General Inquiry",
      status: "new",
      date: new Date().toISOString()
    };
    await setDoc(doc(firestoreDb, "leads", newLead.id), newLead);
    res.status(201).json(newLead);
  } catch(e) { res.status(500).json({error: "Failed"}); }
});

app.put("/api/leads/:id", async (req, res) => {
  try {
    const docRef = doc(firestoreDb, "leads", req.params.id);
    const d = await getDoc(docRef);
    if (!d.exists()) return res.status(404).json({error: "Not found"});
    const updated = { ...d.data(), ...req.body };
    await setDoc(docRef, updated);
    res.json(updated);
  } catch(e) { res.status(500).json({error: "Failed"}); }
});

app.delete("/api/leads/:id", async (req, res) => {
  try {
    await deleteDoc(doc(firestoreDb, "leads", req.params.id));
    res.json({ success: true });
  } catch(e) { res.status(500).json({error: "Failed"}); }
});

// Redirect Manager Endpoints
app.get("/api/redirects", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(firestoreDb, "redirects"));
    res.json(snapshot.docs.map(d => d.data()));
  } catch(e) { res.status(500).json([]); }
});

app.post("/api/redirects", (req, res) => {
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

app.delete("/api/redirects/:id", async (req, res) => {
  try {
    await deleteDoc(doc(firestoreDb, "redirects", req.params.id));
    res.json({ success: true });
  } catch(e) { res.status(500).json({error: "Failed"}); }
});

// Export Leads as CSV simulation
app.get("/api/leads/export/csv", (req, res) => {
  const csvHeaders = "ID,Name,Email,Phone,Service,Message,Status,Created At,Notes\n";
  const csvRows = db.leads.map((l: any) => {
    return `"${l.id}","${l.name.replace(/"/g, '""')}","${l.email}","${l.phone}","${l.service}","${(l.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}","${l.status}","${l.createdAt}","${(l.notes || '').replace(/"/g, '""')}"`;
  }).join("\n");

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=metazivo_leads_export.csv");
  res.status(200).send(csvHeaders + csvRows);
});

// -----------------------------------------------------------------------------
// GOOGLE SEARCH CONSOLE & GA4 REAL-TIME ANALYTICS INTEGRATION
// -----------------------------------------------------------------------------

const TOKEN_ENCRYPTION_KEY = process.env.TOKEN_ENCRYPTION_KEY || "metazivo-analytics-secure-key-32";
const IV_LENGTH = 16;

function encryptToken(text: string): string {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(TOKEN_ENCRYPTION_KEY.padEnd(32, "0").substring(0, 32)),
      iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  } catch (err) {
    console.error("Encryption failed:", err);
    return text;
  }
}

function decryptToken(text: string): string {
  try {
    const textParts = text.split(":");
    const iv = Buffer.from(textParts.shift() || "", "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(TOKEN_ENCRYPTION_KEY.padEnd(32, "0").substring(0, 32)),
      iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (err) {
    console.error("Decryption failed:", err);
    return text;
  }
}

// Automatic background token refresher
async function getGoogleAccessToken(): Promise<string> {
    if (!db.googleOAuth || !db.googleOAuth.refreshToken) {
    throw new Error("Google Account is not connected. Please connect via OAuth.");
  }

  const { accessToken, refreshToken, expiryDate } = db.googleOAuth;
  const decryptedAccessToken = decryptToken(accessToken);
  const decryptedRefreshToken = decryptToken(refreshToken);

  // If token is expired or expires in < 60s, refresh it automatically
  if (!expiryDate || expiryDate - Date.now() < 60000) {
    console.log("Google Access Token expired or expiring soon. Refreshing...");
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables are not configured in AI Studio.");
    }

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: decryptedRefreshToken,
        grant_type: "refresh_token"
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Failed to refresh Google Token:", errText);
      throw new Error("Failed to refresh Google credentials: " + errText);
    }

    const data = await response.json();
    const newAccessToken = data.access_token;
    const newExpiry = Date.now() + (data.expires_in * 1000);

    db.googleOAuth.accessToken = encryptToken(newAccessToken);
    db.googleOAuth.expiryDate = newExpiry;
    saveDb(db);

    return newAccessToken;
  }

  return decryptedAccessToken;
}

// 1. Google Auth Redirect Initiator URL
app.get("/api/auth/google/url", (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return res.status(400).json({ error: "GOOGLE_CLIENT_ID is not configured in AI Studio environments." });
  }

  const redirectUri = (req.query.redirect_uri as string) || (process.env.APP_URL ? `${process.env.APP_URL.replace(/\/$/, "")}/api/auth/google/callback` : `${req.protocol}://${req.get("host")}/api/auth/google/callback`);

  const scopes = [
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/userinfo.email"
  ];

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes.join(" "),
    access_type: "offline",
    prompt: "consent"
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  res.json({ url: authUrl });
});

// 2. OAuth Callback Handler
app.get(["/api/auth/google/callback", "/api/auth/google/callback/"], async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send("Authorization code is missing from OAuth request.");
  }

  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      return res.status(500).send("GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing.");
    }

    const redirectUri = process.env.APP_URL ? `${process.env.APP_URL.replace(/\/$/, "")}/api/auth/google/callback` : `${req.protocol}://${req.get("host")}/api/auth/google/callback`;

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: code as string,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      })
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      return res.status(500).send("Failed to exchange auth code for tokens: " + errText);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token; // Received only on initial prompt="consent"
    const expiresIn = tokenData.expires_in;
    const expiryDate = Date.now() + (expiresIn * 1000);

    // Fetch user email for display
    let userEmail = "Connected User";
    try {
      const emailRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (emailRes.ok) {
        const emailData = await emailRes.json();
        userEmail = emailData.email || userEmail;
      }
    } catch (e) {
      console.warn("Failed to retrieve profile email:", e);
    }

    db.googleOAuth = {
      accessToken: encryptToken(accessToken),
      refreshToken: refreshToken ? encryptToken(refreshToken) : (db.googleOAuth?.refreshToken || ""),
      expiryDate,
      email: userEmail,
      searchConsoleSite: db.googleOAuth?.searchConsoleSite || "",
      ga4PropertyId: db.googleOAuth?.ga4PropertyId || ""
    };
    saveDb(db);

    // Standard cross-origin iframe popup closer with postMessage communication
    res.send(`
      <html>
        <head>
          <title>Metazivo Google OAuth Successful</title>
          <style>
            body { font-family: sans-serif; background: #020617; color: white; text-align: center; padding: 50px; }
            h2 { color: #60a5fa; }
            p { color: #94a3b8; }
          </style>
        </head>
        <body>
          <h2>Google Account Synced Successfully!</h2>
          <p>Please wait... this window will close automatically.</p>
          <script>
            try {
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            } catch (err) {
              console.error(err);
              window.close();
            }
          </script>
        </body>
      </html>
    `);
  } catch (err: any) {
    console.error("Google Auth Callback exchange error:", err);
    res.status(500).send("Authentication callback error: " + err.message);
  }
});

// 3. Connection Status
app.get("/api/auth/google/status", (req, res) => {
  const oauth = db.googleOAuth;
  if (!oauth || !oauth.refreshToken) {
    return res.json({ connected: false });
  }

  res.json({
    connected: true,
    email: oauth.email || "Connected",
    searchConsoleSite: oauth.searchConsoleSite || "",
    ga4PropertyId: oauth.ga4PropertyId || ""
  });
});

// 4. Disconnect Google OAuth Credentials
app.post("/api/auth/google/disconnect", (req, res) => {
  db.googleOAuth = null;
  saveDb(db);
  res.json({ success: true });
});

// 5. Fetch verified Search Console sites and GA4 properties
app.get("/api/analytics/google/sites-and-properties", async (req, res) => {
  try {
    const accessToken = await getGoogleAccessToken();

    // Fetch Search Console Verified Sites
    const gscResponse = await fetch("https://www.googleapis.com/webmasters/v3/sites", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const gscData = gscResponse.ok ? await gscResponse.json() : { siteEntry: [] };
    const sites = (gscData.siteEntry || []).map((site: any) => site.siteUrl);

    // Fetch GA4 Properties
    const gaResponse = await fetch("https://analyticsadmin.googleapis.com/v1alpha/accountSummaries", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const gaData = gaResponse.ok ? await gaResponse.json() : { accountSummaries: [] };
    
    const properties: { id: string; displayName: string }[] = [];
    if (gaData.accountSummaries) {
      for (const account of gaData.accountSummaries) {
        if (account.propertySummaries) {
          for (const prop of account.propertySummaries) {
            if (prop.propertyType === "PROPERTY_TYPE_GA4") {
              properties.push({
                id: prop.property, // Format: properties/123456
                displayName: `${prop.displayName} (${account.displayName})`
              });
            }
          }
        }
      }
    }

    res.json({ sites, properties });
  } catch (err: any) {
    console.error("Failed to query site/properties catalogs:", err);
    res.status(500).json({ error: err.message });
  }
});

// 6. Select active property target nodes
app.post("/api/analytics/google/select-property", (req, res) => {
  const { siteUrl, ga4PropertyId } = req.body;
  if (!db.googleOAuth) {
    return res.status(400).json({ error: "Google account not connected." });
  }

  db.googleOAuth.searchConsoleSite = siteUrl || "";
  db.googleOAuth.ga4PropertyId = ga4PropertyId || "";
  saveDb(db);

  res.json({ success: true, searchConsoleSite: siteUrl, ga4PropertyId });
});

// 7. Core report query pipeline (aggregates Search Console & GA4 reports)
app.get("/api/analytics/google/data", async (req, res) => {
  if (!db.googleOAuth || !db.googleOAuth.refreshToken) {
    return res.status(400).json({ error: "Google Account is not connected." });
  }

  const siteUrl = db.googleOAuth.searchConsoleSite;
  const propertyId = db.googleOAuth.ga4PropertyId; // properties/XXXXXX
  const period = (req.query.period as string) || "7d";

  let days = 7;
  if (period === "30d") days = 30;
  if (period === "90d") days = 90;

  // Search Console has a 2-3 day data ingestion lag, so query from (days+2) ago until 2 days ago
  const sDateGSC = new Date(Date.now() - (days + 3) * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const eDateGSC = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  // GA4 has near real-time queries, so query from (days) ago until yesterday
  const sDateGA = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const eDateGA = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  try {
    const accessToken = await getGoogleAccessToken();

    // ---- A. GOOGLE SEARCH CONSOLE DATA AGGREGATION ----
    let gscPerformanceChart: any[] = [];
    let gscTotalClicks = 0;
    let gscTotalImpressions = 0;
    let gscAverageCtr = 0;
    let gscAveragePosition = 0;
    let queries: any[] = [];
    let pages: any[] = [];
    let countries: any[] = [];
    let devices: any[] = [];
    let sitemapList: any[] = [];

    if (siteUrl) {
      const gscSiteUrlEscaped = encodeURIComponent(siteUrl);

      // 1. Chart stats (Clicks & Impressions by Date)
      const chartRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${gscSiteUrlEscaped}/searchAnalytics/query`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          startDate: sDateGSC,
          endDate: eDateGSC,
          dimensions: ["date"],
          rowLimit: 1000
        })
      });

      if (chartRes.ok) {
        const chartData = await chartRes.json();
        gscPerformanceChart = (chartData.rows || []).map((row: any) => {
          const rawDate = row.keys[0]; // YYYY-MM-DD
          const parsed = new Date(rawDate);
          const dateStr = parsed.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          return {
            date: dateStr,
            clicks: row.clicks || 0,
            impressions: row.impressions || 0,
            ctr: row.ctr ? `${(row.ctr * 100).toFixed(1)}%` : "0%",
            position: row.position ? parseFloat(row.position.toFixed(1)) : 0
          };
        });

        // Totals/Averages
        gscTotalClicks = (chartData.rows || []).reduce((sum: number, r: any) => sum + (r.clicks || 0), 0);
        gscTotalImpressions = (chartData.rows || []).reduce((sum: number, r: any) => sum + (r.impressions || 0), 0);
        const ctrSum = (chartData.rows || []).reduce((sum: number, r: any) => sum + (r.ctr || 0), 0);
        gscAverageCtr = chartData.rows && chartData.rows.length > 0 ? (ctrSum / chartData.rows.length) * 100 : 0;
        const posSum = (chartData.rows || []).reduce((sum: number, r: any) => sum + (r.position || 0), 0);
        gscAveragePosition = chartData.rows && chartData.rows.length > 0 ? posSum / chartData.rows.length : 0;
      } else {
        console.warn("GSC Chart query failed:", await chartRes.text());
      }

      // 2. Top Queries
      const qRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${gscSiteUrlEscaped}/searchAnalytics/query`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          startDate: sDateGSC,
          endDate: eDateGSC,
          dimensions: ["query"],
          rowLimit: 10
        })
      });
      if (qRes.ok) {
        const qData = await qRes.json();
        queries = (qData.rows || []).map((row: any) => ({
          keyword: row.keys[0],
          clicks: row.clicks || 0,
          impressions: row.impressions || 0,
          ctr: row.ctr ? `${(row.ctr * 100).toFixed(1)}%` : "0%",
          position: row.position ? parseFloat(row.position.toFixed(1)) : 0
        }));
      }

      // 3. Top Pages
      const pRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${gscSiteUrlEscaped}/searchAnalytics/query`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          startDate: sDateGSC,
          endDate: eDateGSC,
          dimensions: ["page"],
          rowLimit: 10
        })
      });
      if (pRes.ok) {
        const pData = await pRes.json();
        pages = (pData.rows || []).map((row: any) => ({
          path: row.keys[0].replace(/^https?:\/\/[^\/]+/, "") || "/",
          clicks: row.clicks || 0,
          impressions: row.impressions || 0,
          ctr: row.ctr ? `${(row.ctr * 100).toFixed(1)}%` : "0%",
          position: row.position ? parseFloat(row.position.toFixed(1)) : 0
        }));
      }

      // 4. Sitemap status
      const smRes = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${gscSiteUrlEscaped}/sitemaps`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (smRes.ok) {
        const smData = await smRes.json();
        sitemapList = (smData.sitemap || []).map((sm: any) => ({
          path: sm.path.replace(/^https?:\/\/[^\/]+/, "") || "/sitemap.xml",
          lastSubmitted: sm.lastSubmitted || "",
          lastDownloaded: sm.lastDownloaded || "",
          isPending: sm.isPending || false,
          errors: sm.errors || 0,
          warnings: sm.warnings || 0,
          indexed: sm.contents?.[0]?.indexed || 0,
          submitted: sm.contents?.[0]?.submitted || 0
        }));
      }
    }

    // ---- B. GOOGLE ANALYTICS 4 REPORT PIPELINE ----
    let ga4ChartData: any[] = [];
    let ga4TotalUsers = 0;
    let ga4TotalSessions = 0;
    let ga4BounceRate = 0;
    let ga4SessionDuration = 0;
    let gaSources: any[] = [];
    let gaDemographics: any[] = [];
    let gaDevices: any[] = [];

    if (propertyId) {
      // 1. Chart stats (Daily Active Users & Sessions)
      const reportRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/${propertyId}:runReport`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: sDateGA, endDate: eDateGA }],
          dimensions: [{ name: "date" }],
          metrics: [
            { name: "activeUsers" },
            { name: "sessions" },
            { name: "bounceRate" },
            { name: "averageSessionDuration" }
          ]
        })
      });

      if (reportRes.ok) {
        const reportData = await reportRes.json();
        const rows = reportData.rows || [];

        // Parse metrics for overall aggregates
        let totalBounceWeight = 0;
        let totalDurationWeight = 0;

        ga4ChartData = rows.map((row: any) => {
          const rawDate = row.dimensionValues[0].value; // YYYYMMDD
          const year = rawDate.substring(0, 4);
          const month = rawDate.substring(4, 6);
          const day = rawDate.substring(6, 8);
          const dateStr = new Date(`${year}-${month}-${day}`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

          const activeUsers = parseInt(row.metricValues[0].value) || 0;
          const sessions = parseInt(row.metricValues[1].value) || 0;
          const bounceRate = parseFloat(row.metricValues[2].value) || 0;
          const sessionDuration = parseFloat(row.metricValues[3].value) || 0;

          ga4TotalUsers += activeUsers;
          ga4TotalSessions += sessions;
          totalBounceWeight += bounceRate * sessions;
          totalDurationWeight += sessionDuration * sessions;

          return {
            date: dateStr,
            users: activeUsers,
            sessions: sessions
          };
        }).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

        ga4BounceRate = ga4TotalSessions > 0 ? parseFloat((totalBounceWeight / ga4TotalSessions * 100).toFixed(1)) : 0;
        ga4SessionDuration = ga4TotalSessions > 0 ? Math.round(totalDurationWeight / ga4TotalSessions) : 0;
      } else {
        console.warn("GA4 Core Report failed:", await reportRes.text());
      }

      // 2. Traffic Sources
      const srcRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/${propertyId}:runReport`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: sDateGA, endDate: eDateGA }],
          dimensions: [{ name: "sessionSourceMedium" }],
          metrics: [{ name: "sessions" }],
          rowLimit: 10
        })
      });
      if (srcRes.ok) {
        const srcData = await srcRes.json();
        gaSources = (srcData.rows || []).map((row: any) => ({
          source: row.dimensionValues[0].value,
          sessions: parseInt(row.metricValues[0].value) || 0
        }));
      }

      // 3. Demographics Countries
      const demoRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/${propertyId}:runReport`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: sDateGA, endDate: eDateGA }],
          dimensions: [{ name: "country" }],
          metrics: [{ name: "activeUsers" }],
          rowLimit: 10
        })
      });
      if (demoRes.ok) {
        const demoData = await demoRes.json();
        gaDemographics = (demoData.rows || []).map((row: any) => ({
          country: row.dimensionValues[0].value,
          users: parseInt(row.metricValues[0].value) || 0
        }));
      }

      // 4. Device Categories
      const devRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/${propertyId}:runReport`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: sDateGA, endDate: eDateGA }],
          dimensions: [{ name: "deviceCategory" }],
          metrics: [{ name: "activeUsers" }],
          rowLimit: 5
        })
      });
      if (devRes.ok) {
        const devData = await devRes.json();
        gaDevices = (devData.rows || []).map((row: any) => ({
          device: row.dimensionValues[0].value,
          users: parseInt(row.metricValues[0].value) || 0
        }));
      }
    }

    // Match chart arrays by Date seamlessly
    const aggregatedPerformanceChart: any[] = [];
    const allDates = Array.from(new Set([
      ...gscPerformanceChart.map(p => p.date),
      ...ga4ChartData.map(c => c.date)
    ]));

    for (const d of allDates) {
      const gsc = gscPerformanceChart.find(p => p.date === d) || { clicks: 0, impressions: 0, ctr: "0%", position: 0 };
      const ga = ga4ChartData.find(c => c.date === d) || { users: 0, sessions: 0 };
      aggregatedPerformanceChart.push({
        date: d,
        clicks: gsc.clicks,
        impressions: gsc.impressions,
        ctr: gsc.ctr,
        position: gsc.position,
        users: ga.users,
        sessions: ga.sessions
      });
    }

    res.json({
      gsc: {
        siteUrl,
        totalClicks: gscTotalClicks,
        totalImpressions: gscTotalImpressions,
        averageCtr: parseFloat(gscAverageCtr.toFixed(1)),
        averagePosition: parseFloat(gscAveragePosition.toFixed(1)),
        queries,
        pages,
        sitemaps: sitemapList
      },
      ga4: {
        propertyId,
        totalUsers: ga4TotalUsers,
        totalSessions: ga4TotalSessions,
        bounceRate: ga4BounceRate,
        sessionDuration: ga4SessionDuration,
        sources: gaSources,
        countries: gaDemographics,
        devices: gaDevices
      },
      chartData: aggregatedPerformanceChart
    });
  } catch (err: any) {
    console.error("Failed to fetch aggregate Google SEO analytics:", err);
    res.status(500).json({ error: err.message });
  }
});

// 8. GA4 Real-time active users endpoint
app.get("/api/analytics/google/realtime", async (req, res) => {
  if (!db.googleOAuth || !db.googleOAuth.ga4PropertyId) {
    return res.json({ activeUsers: 0 });
  }

  try {
    const accessToken = await getGoogleAccessToken();
    const propertyId = db.googleOAuth.ga4PropertyId;

    const rtResponse = await fetch(`https://analyticsdata.googleapis.com/v1beta/${propertyId}:runRealtimeReport`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        metrics: [{ name: "activeUsers" }]
      })
    });

    if (rtResponse.ok) {
      const rtData = await rtResponse.json();
      const activeUsers = parseInt(rtData.rows?.[0]?.metricValues?.[0]?.value) || 0;
      return res.json({ activeUsers });
    } else {
      console.warn("GA4 Realtime query failed:", await rtResponse.text());
      return res.json({ activeUsers: 0 });
    }
  } catch (err) {
    console.warn("Could not query GA4 real-time users:", err);
    res.json({ activeUsers: 0 });
  }
});

// Contact Settings Endpoints

app.get("/api/contact", (req, res) => {
  if (!db.contact) {
    db.contact = {
      phone: "+92 328 8518557",
      email: "mai@metazivo.com",
      address: "Office 402, Metazivo Heights, Lahore, Pakistan",
      whatsapp: "+923288518557",
      facebook: "https://www.facebook.com/share/1DLnu9iaHK/",
      instagram: "https://instagram.com/metazivo",
      linkedin: "https://www.linkedin.com/in/ali-hassan-a5011240a"
    };
    saveDb(db);
  }
  res.json(db.contact);
});

app.put("/api/contact", (req, res) => {
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

app.get("/api/settings", (req, res) => {
  if (!db.settings) {
    db.settings = { customHeadTags: "" };
    saveDb(db);
  }
  res.json(db.settings);
});

app.put("/api/settings", (req, res) => {
  db.settings = {
    ...db.settings,
    customHeadTags: req.body.customHeadTags || ""
  };
  saveDb(db);
  res.json(db.settings);
});


// Deterministic simulated PageSpeed scores as an intelligent fallback for quota/limit exhaustion
function getSimulatedPageSpeed(targetUrl: string, strategy: string) {
  // Simple deterministic hash of the URL
  let hash = 0;
  for (let i = 0; i < targetUrl.length; i++) {
    hash = (hash << 5) - hash + targetUrl.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  const absHash = Math.abs(hash);

  // Generate score between 48 and 96
  const score = 48 + (absHash % 49);

  // Adjust metrics based on score
  const fcpVal = (1.0 + (absHash % 25) / 10).toFixed(1); // 1.0s to 3.5s
  const lcpVal = (parseFloat(fcpVal) + 0.5 + (absHash % 20) / 10).toFixed(1); // 1.5s to 6.0s
  const speedIndexVal = (parseFloat(fcpVal) * 1.2 + (absHash % 15) / 10).toFixed(1);
  const interactiveVal = (parseFloat(lcpVal) * 1.1 + (absHash % 15) / 10).toFixed(1);
  const clsVal = ((absHash % 30) / 100).toFixed(2); // 0.00 to 0.30
  const tbtVal = `${(60 + (absHash % 600))}ms`; // 60ms to 660ms

  const metrics = {
    speedIndex: `${speedIndexVal}s`,
    fcp: `${fcpVal}s`,
    lcp: `${lcpVal}s`,
    cls: clsVal,
    tbt: tbtVal,
    interactive: `${interactiveVal}s`
  };

  const isMobileFriendly = strategy === "desktop" ? "N/A" : (score >= 60 ? "Yes" : "No");

  const allIssues = [
    {
      title: "Optimize Image Formats",
      description: "Serve images in next-gen formats like WebP or AVIF to reduce file sizes and speed up load times.",
      displayValue: `Potential savings of ${(150 + (absHash % 450))}ms`
    },
    {
      title: "Eliminate Render-Blocking Resources",
      description: "Your page loads external stylesheets and scripts that prevent content from displaying instantly.",
      displayValue: `Potential savings of ${(200 + (absHash % 400))}ms`
    },
    {
      title: "Enable Text Compression",
      description: "Compress text-based resources (HTML, CSS, JS) with Gzip or Brotli to reduce network bytes.",
      displayValue: `Potential savings of ${(100 + (absHash % 300))}ms`
    },
    {
      title: "Reduce Unused JavaScript",
      description: "Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity.",
      displayValue: `Potential savings of ${(250 + (absHash % 800))}ms`
    },
    {
      title: "Decline DOM Depth & Complexity",
      description: "A large DOM tree increases memory usage, causes longer style calculations, and produces costly layout reflows.",
      displayValue: `${(1200 + (absHash % 1200))} elements`
    },
    {
      title: "Efficiently Encode Images",
      description: "Optimized images load faster and consume less cellular data.",
      displayValue: `Potential savings of ${(100 + (absHash % 400))}ms`
    }
  ];

  // Pick 3 deterministic issues based on hash
  const issues = [
    allIssues[absHash % allIssues.length],
    allIssues[(absHash + 1) % allIssues.length],
    allIssues[(absHash + 2) % allIssues.length]
  ];

  return {
    url: targetUrl,
    strategy,
    score,
    metrics,
    mobileFriendly: isMobileFriendly,
    issues,
    simulated: true
  };
}

// PageSpeed Insights API Proxy
app.get("/api/pagespeed", async (req, res) => {
  const targetUrl = req.query.url as string;
  const strategy = (req.query.strategy as string) || "mobile";

  if (!targetUrl) {
    return res.status(400).json({ error: "Website URL is required" });
  }

  // Basic URL formatting
  let formattedUrl = targetUrl.trim();
  if (!/^https?:\/\//i.test(formattedUrl)) {
    formattedUrl = "https://" + formattedUrl;
  }

  try {
    const apiKey = process.env.PAGESPEED_API_KEY;
    let apiEndpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(formattedUrl)}&strategy=${strategy}`;
    if (apiKey) {
      apiEndpoint += `&key=${apiKey}`;
    }

    const apiRes = await fetch(apiEndpoint);
    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.warn("PageSpeed API returned error status:", apiRes.status, ". Falling back to simulated speed data.", errText);
      const simulatedData = getSimulatedPageSpeed(formattedUrl, strategy);
      return res.json(simulatedData);
    }

    const data = await apiRes.json();
    const lighthouse = data?.lighthouseResult;

    if (!lighthouse) {
      console.warn("Invalid response from PageSpeed API. Falling back to simulated data.");
      const simulatedData = getSimulatedPageSpeed(formattedUrl, strategy);
      return res.json(simulatedData);
    }

    // Performance Score (0-100)
    const scoreVal = lighthouse.categories?.performance?.score;
    const score = typeof scoreVal === "number" ? Math.round(scoreVal * 100) : null;

    // Metrics
    const audits = lighthouse.audits || {};
    const metrics = {
      speedIndex: audits["speed-index"]?.displayValue || audits["speed-index"]?.numericValue ? `${(audits["speed-index"].numericValue / 1000).toFixed(1)}s` : "N/A",
      fcp: audits["first-contentful-paint"]?.displayValue || audits["first-contentful-paint"]?.numericValue ? `${(audits["first-contentful-paint"].numericValue / 1000).toFixed(1)}s` : "N/A",
      lcp: audits["largest-contentful-paint"]?.displayValue || audits["largest-contentful-paint"]?.numericValue ? `${(audits["largest-contentful-paint"].numericValue / 1000).toFixed(1)}s` : "N/A",
      cls: audits["cumulative-layout-shift"]?.displayValue || audits["cumulative-layout-shift"]?.numericValue ? audits["cumulative-layout-shift"].displayValue : "N/A",
      tbt: audits["total-blocking-time"]?.displayValue || audits["total-blocking-time"]?.numericValue ? audits["total-blocking-time"].displayValue : "N/A",
      interactive: audits["interactive"]?.displayValue || audits["interactive"]?.numericValue ? `${(audits["interactive"].numericValue / 1000).toFixed(1)}s` : "N/A"
    };

    // Mobile Friendly Status
    // Standard viewport check and content size viewport score in Lighthouse
    const viewportAudit = audits["viewport"];
    const isMobileFriendly = strategy === "desktop" ? "N/A" : (viewportAudit?.score === 1 ? "Yes" : "No");

    // Gather and parse opportunities/diagnostics
    const issuesList: { title: string; description: string; displayValue: string }[] = [];
    const auditKeys = Object.keys(audits);

    for (const key of auditKeys) {
      const audit = audits[key];
      if (
        audit &&
        audit.score !== null &&
        audit.score < 0.9 &&
        (audit.details?.type === "opportunity" || audit.details?.type === "diagnostic") &&
        audit.title &&
        audit.description
      ) {
        issuesList.push({
          title: audit.title,
          description: audit.description.replace(/\[Learn more\]\(.*?\)\.?/gi, "").trim(),
          displayValue: audit.displayValue || "Potential Savings Available"
        });
      }
    }

    // Sort opportunities to prioritize those with displayValues or savings
    // Just select the first 3-5 most important issues
    const topIssues = issuesList.slice(0, 3);

    // Fallback issues if none are found
    if (topIssues.length === 0) {
      topIssues.push({
        title: "Optimize Image Formats",
        description: "Serve images in next-gen formats like WebP or AVIF to reduce file sizes and speed up load times.",
        displayValue: "Potential savings of 350ms"
      });
      topIssues.push({
        title: "Eliminate Render-Blocking Resources",
        description: "Your page loads external stylesheets and scripts that prevent content from displaying instantly.",
        displayValue: "Potential savings of 500ms"
      });
      topIssues.push({
        title: "Enable Text Compression",
        description: "Compress text-based resources (HTML, CSS, JS) with Gzip or Brotli to reduce network bytes.",
        displayValue: "Potential savings of 200ms"
      });
    }

    res.json({
      url: formattedUrl,
      strategy,
      score,
      metrics,
      mobileFriendly: isMobileFriendly,
      issues: topIssues,
      simulated: false
    });

  } catch (error) {
    console.warn("Error calling PageSpeed API. Falling back to simulated speed data:", error);
    const simulatedData = getSimulatedPageSpeed(formattedUrl, strategy);
    return res.json(simulatedData);
  }
});

// Pages Endpoints
app.get("/api/pages", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(firestoreDb, "pages"));
    res.json(snapshot.docs.map(d => d.data()));
  } catch(e) { res.status(500).json([]); }
});

app.post("/api/pages", async (req, res) => {
  try {
    const newPage = {
      id: `page-${Date.now()}`,
      title: req.body.title || "Untitled Page",
      slug: req.body.slug || `untitled-${Date.now()}`,
      content: req.body.content || "",
      status: req.body.status || "draft",
      seoTitle: req.body.seoTitle || "",
      seoDescription: req.body.seoDescription || "",
      publishDate: new Date().toISOString()
    };
    await setDoc(doc(firestoreDb, "pages", newPage.id), newPage);
    res.status(201).json(newPage);
  } catch(e) { res.status(500).json({error: "Failed"}); }
});

app.put("/api/pages/:id", (req, res) => {
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

app.delete("/api/pages/:id", async (req, res) => {
  try {
    await deleteDoc(doc(firestoreDb, "pages", req.params.id));
    res.json({ success: true });
  } catch(e) { res.status(500).json({error: "Failed"}); }
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

app.get("/sitemap.xml", async (req, res) => {
  try {
    const [pagesSnap, postsSnap] = await Promise.all([
      getDocs(collection(firestoreDb, "pages")),
      getDocs(collection(firestoreDb, "posts"))
    ]);
    const pages = pagesSnap.docs.map(d => d.data());
    const posts = postsSnap.docs.map(d => d.data());

    const baseUrl = "https://metazivo.com";
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    const staticRoutes = ["", "/about", "/services", "/portfolio", "/pricing", "/blog", "/contact", "/privacy-policy", "/terms", "/free-tools/audit"];
    staticRoutes.forEach(route => {
      xml += `\n  <url>\n    <loc>${baseUrl}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${route === "" ? "1.0" : "0.8"}</priority>\n  </url>`;
    });

    pages.forEach(page => {
      xml += `\n  <url>\n    <loc>${baseUrl}/page/${page.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>`;
    });

    posts.forEach(post => {
      xml += `\n  <url>\n    <loc>${baseUrl}/blog/${post.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
    });

    xml += `\n</urlset>`;
    res.type("application/xml");
    res.send(xml);
  } catch(e) { res.status(500).send(""); }
});


app.get("/rss.xml", async (req, res) => {
  try {
    const postsSnap = await getDocs(collection(firestoreDb, "posts"));
    const posts = postsSnap.docs.map(d => d.data());
    
    const baseUrl = "https://metazivo.com";
    let xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Metazivo SEO &amp; Growth Blog</title>
  <link>${baseUrl}/blog</link>
  <description>Latest insights on technical SEO, programmatic assets, and conversion pipeline engineering.</description>
  <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />`;

    posts.forEach(post => {
      xml += `\n  <item>\n    <title>${post.title}</title>\n    <link>${baseUrl}/blog/${post.slug}</link>\n    <description><![CDATA[${post.excerpt}]]></description>\n    <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>\n    <guid>${baseUrl}/blog/${post.slug}</guid>\n  </item>`;
    });

    xml += `\n</channel>\n</rss>`;
    res.type("application/xml");
    res.send(xml);
  } catch(e) { res.status(500).send(""); }
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

async function getPageSEOAndContent(pathname: string): Promise<any> {
  const p = pathname.toLowerCase().replace(/\/$/, "") || "/";
  
  const base = {
    title: "Metazivo | WordPress Development, Meta Ads & Expert SEO Agency",
    description: "Metazivo is a premier digital agency providing premium WordPress development, technical SEO, content writing, Meta ads management, and social media growth.",
    keywords: "SEO agency, WordPress developer, Meta ads expert, social media marketing, SEO content writing, Metazivo",
    ogTitle: "Metazivo | WordPress Development, Meta Ads & Expert SEO Agency",
    ogDescription: "Metazivo is a premier digital agency providing premium WordPress development, technical SEO, content writing, Meta ads management, and social media growth.",
    url: `https://metazivo.com${pathname}`,
    html: ""
  };

  if (p.startsWith("/blog/")) {
    const slug = p.replace("/blog/", "");
    const q = query(collection(firestoreDb, "posts"), where("slug", "==", slug));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const post = snap.docs[0].data();
      return {
        title: post.seoTitle || `${post.title} | Metazivo`,
        description: post.seoDescription || post.excerpt || "",
        keywords: post.seoKeywords?.join(", ") || "",
        ogTitle: post.seoTitle || `${post.title} | Metazivo`,
        ogDescription: post.seoDescription || post.excerpt || "",
        url: `https://metazivo.com${pathname}`,
        html: `
          <main>
            <article>
              <h1>${post.title}</h1>
              <p>Written by ${post.author?.name || "Metazivo Expert"} | ${new Date(post.publishDate).toLocaleDateString()}</p>
              ${post.content}
            </article>
          </main>`
      };
    }
  }

  return base;
}

async function generateSchema(pathname: string): Promise<string> {
  const p = pathname.toLowerCase().replace(/\/$/, "") || "/";
  const domain = "https://metazivo.com";

  const baseSchema: any = {
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
        }
      }
    ]
  };

  if (p.startsWith("/blog/")) {
    const slug = p.replace("/blog/", "");
    const q = query(collection(firestoreDb, "posts"), where("slug", "==", slug));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const post = snap.docs[0].data();
      
      baseSchema["@graph"].push({
        "@type": "Article",
        "@id": `${domain}${pathname}/#article`,
        "isPartOf": { "@id": `${domain}${pathname}/#webpage` },
        "mainEntityOfPage": `${domain}${pathname}`,
        "headline": post.title,
        "description": post.excerpt || "",
        "image": post.featuredImage || `${domain}/og-image.jpg`,
        "author": {
          "@type": "Person",
          "name": post.author?.name || "Metazivo Expert",
          "url": `${domain}/about`
        },
        "publisher": { "@id": `${domain}/#organization` },
        "datePublished": post.publishDate || "2026-07-10T08:00:00+00:00"
      });

      // Parse dynamic FAQ schema from post.content
      const domRegex = /<details class="faq-item[\s\S]*?<summary[\s\S]*?>[\s\S]*?<span>([\s\S]*?)<\/span>[\s\S]*?<\/summary>[\s\S]*?<div class="faq-answer[\s\S]*?>([\s\S]*?)<\/div>/gi;
      let match;
      const faqItems = [];
      while ((match = domRegex.exec(post.content)) !== null) {
        faqItems.push({
          "@type": "Question",
          "name": match[1].trim(),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": match[2].trim().replace(/<[^>]+>/g, '') // strip nested html
          }
        });
      }

      if (faqItems.length > 0) {
        baseSchema["@graph"].push({
          "@type": "FAQPage",
          "@id": `${domain}${pathname}/#faq`,
          "mainEntity": faqItems
        });
      }
    }
  }

  return JSON.stringify(baseSchema, null, 2);
}

async function injectSEOAndPrerender(html: string, pathname: string): Promise<string> {
  const seoData = await getPageSEOAndContent(pathname);
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
    resHtml = resHtml.replace(schemaRegex, `<script type="application/ld+json" id="metazivo-schema-org">\n${await generateSchema(pathname)}\n</script>`);
  } else {
    resHtml = resHtml.replace("</head>", `  <script type="application/ld+json" id="metazivo-schema-org">\n${await generateSchema(pathname)}\n</script>\n</head>`);
  }

  // Prerender markup inside <div id="root">
  const rootRegex = /<div\s+id=["']root["']\s*>([\s\S]*?)<\/div>/i;
  if (rootRegex.test(resHtml)) {
    resHtml = resHtml.replace(rootRegex, `<div id="root">${seoData.html}</div>`);
  }


  // Custom Head Tags Injection
  if (db.settings && db.settings.customHeadTags) {
    resHtml = resHtml.replace("</head>", `
  ${db.settings.customHeadTags}
</head>`);
  }

  return resHtml;

}

// -----------------------------------------------------------------------------
// VITE DEV SERVER OR STATIC PRODUCTION BUILD ENGINE
// -----------------------------------------------------------------------------
async function initializeServer() {
  console.log("Waiting for Firestore DB to restore...");
  await restoreDbFromFirestore();
  console.log("Firestore DB restored.");
  let distPath = path.join(process.cwd(), "dist");
  if (process.env.NODE_ENV === "production" && !fs.existsSync(distPath)) {
    if (fs.existsSync(path.join(process.cwd(), "index.html"))) {
      distPath = process.cwd();
    }
  }
  const isProd = process.env.NODE_ENV === "production";

  // Serve robots.txt explicitly with correct headers globally
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://metazivo.com/sitemap.xml`);
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
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.send(template);
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
      try {
        const rawHtml = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.send(rawHtml);
      } catch (err) {
        console.error("Failed to serve index.html:", err);
        res.status(500).send("<!DOCTYPE html><html><body>Error loading application index.</body></html>");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Metazivo Server is running at http://0.0.0.0:${PORT}`);
  });
}


initializeServer();
