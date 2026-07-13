/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Code,
  Layout,
  ShoppingBag,
  Search,
  TrendingUp,
  Palette,
  ArrowRight,
  ShieldAlert,
  Loader2,
  Calendar,
  User,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Lock,
  Download,
  AlertCircle,
  Settings,
  Mail,
  Phone,
  ArrowLeft,
  FileText,
  Activity,
  Check,
  ShieldCheck,
  RefreshCw,
  Folder,
  Eye,
  Image as ImageIcon
} from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import SeoScoreAnalyzer from "./components/SeoScoreAnalyzer";
import WordEditor from "./components/WordEditor";
import SchemaEditor from "./components/SchemaEditor";
import MediaLibrary from "./components/MediaLibrary";
import AiAssistant from "./components/AiAssistant";
import PagesPanel from "./components/PagesPanel";
import FloatingCyberGlobe from "./components/FloatingCyberGlobe";
import GlassmorphicCoreEngine from "./components/GlassmorphicCoreEngine";
import DynamicFloatingGeometry from "./components/DynamicFloatingGeometry";
import Floating3DRing from "./components/Floating3DRing";
import ParallaxBentoCard from "./components/ParallaxBentoCard";
import CustomCursor from "./components/CustomCursor";
import { servicesData, pricingPlans, portfolioItems, workProcessTimeline, faqList, testimonials, trustedCompanies } from "./data";
import { BlogPost, MediaAsset, ContactEnquiry, RedirectRule, ActivityLog, AnalyticsSummary, ContactInfo, CustomPage } from "./types";
import { motion } from "motion/react";

// Premium real stock photo URLs (Not AI-generated)
const hero3D = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"; // Collaborative teamwork real office meeting
const coding3D = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"; // Clean IDE lines of code on high-res screen
const seo3D = "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80"; // Laptop displaying charts and SEO dashboards
const funnel3D = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"; // Professional analytics data visualization charts
const branding3D = "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80"; // Creative graphic designer workspace sketch with tablets
const smm3D = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80"; // Modern smartphones displaying organic feed layouts
const metaAds3D = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"; // Workspace team planning conversion campaigns

const getServiceImage = (slug: string) => {
  switch (slug) {
    case "website-development":
    case "wordpress-development":
      return coding3D;
    case "seo":
      return seo3D;
    case "meta-ads-advertising":
      return metaAds3D;
    case "social-media-management":
      return smm3D;
    case "graphic-design-branding":
      return branding3D;
    default:
      return funnel3D;
  }
};

export default function App() {
  // Navigation Routing States
  const [currentTab, setCurrentTab] = useState<string>("home"); // home, about, services, portfolio, blog, pricing, contact, privacy, terms, service-detail, blog-detail
  const [scrollY, setScrollY] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>("");
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>("");

  // Server data states
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [leads, setLeads] = useState<ContactEnquiry[]>([]);
  const [redirects, setRedirects] = useState<RedirectRule[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  const displayEmail = contactInfo?.email || "mai@metazivo.com";
  const displayPhone = contactInfo?.phone || "+92 328 8518557";

  const getWhatsAppLink = (slug: string) => {
    const cleanPhone = displayPhone.replace(/[^0-9]/g, "");
    let text = "Hi! I visited your website and would like to consult about your professional digital services.";
    
    if (slug === "wordpress-development") {
      text = "Hi! I am interested in your WordPress & WooCommerce Sales Engine service. Let's discuss how we can scale my website and online store.";
    } else if (slug === "seo") {
      text = "Hi! I am interested in your SEO & Authority Blog Writing Domination service. Let's discuss how we can rank my business on the first page of Google.";
    } else if (slug === "meta-ads-advertising") {
      text = "Hi! I am interested in your Meta Ads Acquisition System. Let's discuss how we can scale my campaigns and generate high-ROI leads.";
    } else if (slug === "social-media-management") {
      text = "Hi! I am interested in your Social Media Management & Viral Reels service. Let's discuss how to elevate my brand and increase organic reach.";
    } else if (slug === "website-development") {
      text = "Hi! I am interested in your High-Performance Website Development service. Let's discuss my custom React/Next.js requirements.";
    } else if (slug === "graphic-design-branding") {
      text = "Hi! I am interested in your Graphic Design & Corporate Logo Branding service. Let's discuss crafting a premium identity.";
    }
    
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  // Auth States
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'Admin' | 'Editor' | 'Author'>('Admin');
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginStep, setLoginStep] = useState<"login" | "forgot" | "tfa">("login");
  const [tfaCode, setTfaCode] = useState("");
  const [authError, setAuthError] = useState("");

  // CMS active editing tab
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<"analytics" | "blogs" | "media" | "leads" | "redirects" | "settings" | "pages">("analytics");


  // Post Editor Workspaces
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost>>({});
  const [showMediaSelectorForEditor, setShowMediaSelectorForEditor] = useState<((url: string) => void) | null>(null);

  // Load Initial Full-Stack API Data
  const loadAllData = async () => {
    try {
      const [blogsRes, mediaRes, leadsRes, redirectsRes, analyticsRes, pagesRes, contactRes] = await Promise.all([
        fetch("/api/posts"),
        fetch("/api/media"),
        fetch("/api/leads"),
        fetch("/api/redirects"),
        fetch("/api/analytics"),
        fetch("/api/pages"),
        fetch("/api/contact")
      ]);

      if (blogsRes.ok) setBlogs(await blogsRes.json());
      if (mediaRes.ok) setMediaAssets(await mediaRes.json());
      if (leadsRes.ok) setLeads(await leadsRes.json());
      if (redirectsRes.ok) setRedirects(await redirectsRes.json());
      if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
      if (pagesRes.ok) setPages(await pagesRes.json());
      if (contactRes.ok) setContactInfo(await contactRes.json());
    } catch (err) {
      console.error("Failed to sync metrics from server node", err);
    }
  };

  useEffect(() => {
    loadAllData();
    // Record page view on startup
    fetch("/api/analytics/hit", { method: "POST" }).catch(() => {});

    // Check for administrative URL path trigger
    if (window.location.pathname === "/admin-login") {
      setIsAdminOpen(true);
      window.history.replaceState({}, "", "/");
    }
  }, []);

  // Find detailed objects for views
  const activeService = servicesData.find((s) => s.slug === selectedServiceSlug);
  const activeBlog = blogs.find((b) => b.slug === selectedBlogSlug);
  const activeCustomPage = pages.find((p) => p.slug === currentTab);
  const isCustomPage = pages.some((p) => p.slug === currentTab && !p.isSystem);

  // Synchronize SEO Meta Details dynamically on Tab transition
  useEffect(() => {
    const matchedPage = pages.find((p) => p.slug === currentTab);
    if (matchedPage) {
      if (matchedPage.seoTitle) {
        document.title = matchedPage.seoTitle;
      } else {
        document.title = `${matchedPage.title} | Metazivo`;
      }

      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', matchedPage.seoDescription || "Metazivo - Premium Digital Agency");

      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', (matchedPage.seoKeywords || []).join(", "));
    } else {
      // Fallback handlers
      if (currentTab === "blog-detail" && activeBlog) {
        document.title = activeBlog.seoTitle || `${activeBlog.title} | Metazivo`;
      } else if (currentTab === "service-detail" && activeService) {
        document.title = `${activeService.title} | Metazivo`;
      } else {
        const capitalizedTab = currentTab.charAt(0).toUpperCase() + currentTab.slice(1);
        document.title = currentTab === "home" ? "Metazivo | Premium Digital Growth Agency" : `${capitalizedTab} | Metazivo`;
      }
    }
  }, [currentTab, pages, activeBlog, activeService]);

  // Sync Activity Logs inside CRM
  const logActivity = (action: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      user: "Mehar Ali Hassan",
      role: userRole,
      action,
      timestamp: new Date().toLocaleTimeString()
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  };

  // Nav Handlers
  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenService = (slug: string) => {
    setSelectedServiceSlug(slug);
    setCurrentTab("service-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenBlog = (slug: string) => {
    setSelectedBlogSlug(slug);
    setCurrentTab("blog-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Hit view metric
    fetch("/api/analytics/hit", { method: "POST" }).catch(() => {});
  };

  // -----------------------------------------------------------------------------
  // CRM AUTHENTICATION HANDLERS
  // -----------------------------------------------------------------------------
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (usernameInput.trim() === "hassan" && passwordInput.trim() === "ali@123hassan") {
      setLoginStep("tfa"); // Two Factor Authentication
    } else {
      setAuthError("Incorrect Username or Password.");
    }
  };

  const handleTfaVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (tfaCode.trim() === "331122") {
      setIsAuthenticated(true);
      logActivity("Logged into Administrative Portal");
      loadAllData();
    } else {
      setAuthError("Incorrect 2FA authenticator token.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginStep("login");
    setUsernameInput("");
    setPasswordInput("");
    setTfaCode("");
    logActivity("Logged out of Portal");
  };

  // -----------------------------------------------------------------------------
  // BLOG CMS HANDLERS
  // -----------------------------------------------------------------------------
  const handleCreatePostTrigger = () => {
    setEditingPost({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      status: "draft",
      featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      gallery: [],
      readingTime: 3,
      featured: false,
      sticky: false,
      categories: ["SEO Blogging"],
      tags: [],
      seoTitle: "",
      seoDescription: "",
      seoKeywords: [],
      focusKeywords: [],
      canonicalUrl: "",
      robotsMeta: { index: true, follow: true },
      openGraph: { title: "", description: "", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" },
      twitterCard: { cardType: "summary_large_image", title: "", description: "", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" },
      breadcrumbTitle: "",
      seoScore: 80,
      schemas: []
    });
    setIsEditingPost(true);
  };

  const handleEditPostTrigger = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditingPost(true);
  };

  const handleSavePost = async () => {
    if (!editingPost.title) return;
    try {
      const isNew = !editingPost.id;
      const url = isNew ? "/api/posts" : `/api/posts/${editingPost.id}`;
      const method = isNew ? "POST" : "PUT";

      // Calculate simple SEO score before saving to maintain correct database state
      const wordCount = editingPost.content ? editingPost.content.trim().split(/\s+/).filter(Boolean).length : 0;
      let score = 80;
      if (wordCount > 400) score += 10;
      if (editingPost.seoTitle) score += 5;
      if (editingPost.seoDescription) score += 5;
      editingPost.seoScore = Math.min(100, score);

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPost)
      });

      if (res.ok) {
        setIsEditingPost(false);
        setEditingPost({});
        loadAllData();
        logActivity(`${isNew ? "Created" : "Updated"} Blog: ${editingPost.title}`);
      }
    } catch (err) {
      console.error("Failed to commit post update", err);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadAllData();
        logActivity(`Deleted blog post`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------------------------------------------------------
  // MEDIA CMS HANDLERS
  // -----------------------------------------------------------------------------
  const handleUploadAsset = async (assetData: Partial<MediaAsset>) => {
    try {
      const isEdit = !!assetData.id;
      const url = "/api/media";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assetData)
      });
      if (res.ok) {
        loadAllData();
        logActivity(`${isEdit ? "Updated" : "Uploaded"} media asset`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAsset = async (id: string) => {
    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadAllData();
        logActivity("Deleted media asset");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------------------------------------------------------
  // CONTACT LEAD CMS HANDLERS
  // -----------------------------------------------------------------------------
  const handleUpdateLeadStatus = async (id: string, status: 'read' | 'replied' | 'archived', notes?: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, notes })
      });
      if (res.ok) {
        loadAllData();
        logActivity(`Updated lead status to ${status}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------------------------------------------------------
  // REDIRECT RULE CMS HANDLERS
  // -----------------------------------------------------------------------------
  const handleCreateRedirect = async (fromPath: string, toPath: string, statusCode: number) => {
    try {
      const res = await fetch("/api/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromPath, toPath, statusCode })
      });
      if (res.ok) {
        loadAllData();
        logActivity(`Created redirect rule from ${fromPath}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRedirect = async (id: string) => {
    try {
      const res = await fetch(`/api/redirects/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadAllData();
        logActivity("Deleted redirect rule");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-[#FF5722]/20 selection:text-[#FF5722] relative overflow-hidden">
      
      {/* Interactive premium custom mouse cursor */}
      <CustomCursor />
      
      {/* Decorative Background Glow Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-100/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-emerald-50/25 rounded-full blur-[80px]"></div>
      </div>
      
      {/* Upper Navigation bar */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        contactInfo={contactInfo || undefined}
        customPages={pages}
      />

      {/* Main page router viewport */}
      <main className="flex-grow relative z-10">
        
        {/* VIEW 1: HOME PAGE */}
        {currentTab === "home" && (
          <div id="view-home" className="pb-24 bg-white text-slate-800 relative overflow-hidden font-sans">
            
            {/* Cinematic Parallax Background Layers */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              {/* Slower scrolling back grid */}
              <div 
                className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#FF5722_1.5px,transparent_1.5px)] [background-size:24px_24px]"
                style={{ transform: `translateY(${scrollY * 0.15}px)` }}
              />
              {/* Slower scrolling ambient orange orbs */}
              <div 
                className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full bg-[#FF5722]/3 blur-[120px]"
                style={{ transform: `translateY(${scrollY * 0.08}px)` }}
              />
              <div 
                className="absolute top-1/2 right-10 w-[600px] h-[600px] rounded-full bg-[#FF5722]/2 blur-[140px]"
                style={{ transform: `translateY(${scrollY * -0.05}px)` }}
              />
            </div>

            {/* 1. HERO SECTION */}
            <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 z-10" id="hero-showcase">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left: Cinematic Content */}
                <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full text-xs text-[#FF5722] font-mono tracking-wider uppercase shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
                    <span>Premium Digital Agency</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-slate-900">
                    We Build <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] via-[#FF7043] to-[#FF8A50]">
                      Digital Experiences
                    </span> <br />
                    That Drive Growth.
                  </h1>

                  <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                    Metazivo is a premier full-service engineering agency specializing in high-converting <strong className="text-slate-900 font-semibold">SEO Algorithms</strong>, <strong className="text-slate-900 font-semibold">Website Development</strong>, and authoritative <strong className="text-slate-900 font-semibold">Content Strategy</strong>.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                    <button
                      onClick={() => {
                        const target = document.getElementById("core-services");
                        target?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="group relative px-8 py-4 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(255,87,34,0.35)] hover:shadow-[0_6px_25px_rgba(255,87,34,0.5)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Discover More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => handleNavigate("contact")}
                      className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Get Started
                    </button>
                  </div>

                  {/* Trust Signal metrics */}
                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/80 max-w-md mx-auto lg:mx-0 text-left">
                    <div>
                      <span className="block text-2xl font-black text-slate-900 font-mono">99%</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Core Web Vitals</span>
                    </div>
                    <div>
                      <span className="block text-2xl font-black text-[#FF5722] font-mono">+320%</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">SEO Visibility</span>
                    </div>
                    <div>
                      <span className="block text-2xl font-black text-slate-900 font-mono">4.8x</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Average ROAS</span>
                    </div>
                  </div>
                </div>

                {/* Right: Custom parametric 3D Glass Floating Ring and status widgets */}
                <div className="lg:col-span-5 relative flex justify-center items-center">
                  <div className="absolute w-[450px] h-[450px] bg-[#FF5722]/5 rounded-full blur-[100px] pointer-events-none" />
                  
                  {/* Floating badges with translateZ offsets */}
                  <div className="relative w-full flex justify-center items-center">
                    {/* Floating3DRing acts as an ambient tech backdrop */}
                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                      <Floating3DRing />
                    </div>

                    {/* Main Hero 3D Picture with elegant tilt glass frame */}
                    <motion.div 
                      className="relative z-10 w-4/5 aspect-square rounded-[32px] overflow-hidden border border-slate-200/60 shadow-2xl bg-white group"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <img 
                        src={hero3D} 
                        alt="Metazivo 3D Hero Illustration" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                    
                    {/* Floating badge 1 */}
                    <div className="absolute -top-6 -right-2 z-20 bg-white/95 backdrop-blur-md border border-orange-100 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-[0_10px_30px_rgba(255,87,34,0.1)] animate-bounce duration-3000">
                      <div className="w-8 h-8 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/20 flex items-center justify-center text-[#FF5722] text-xs font-bold font-mono">SEO</div>
                      <div>
                        <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">SEO Optimization</div>
                        <div className="text-xs font-bold text-slate-900 font-sans">99.2% Score</div>
                      </div>
                    </div>

                    {/* Floating badge 2 */}
                    <div className="absolute -bottom-4 -left-2 z-20 bg-white/95 backdrop-blur-md border border-slate-150 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5722] animate-ping" />
                      <div>
                        <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Campaign Tracking</div>
                        <div className="text-xs font-bold text-slate-900 font-sans">Always Active</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 3. INFINITE MARQUEE TICKER */}
            <div className="w-full bg-slate-50 py-6 border-y border-slate-200/60 relative z-10 overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-20" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-20" />
              
              <div className="flex select-none overflow-hidden">
                <motion.div 
                  animate={{ x: [0, -1000] }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  className="flex whitespace-nowrap gap-12 text-sm sm:text-base font-bold text-slate-800 uppercase tracking-[0.15em] shrink-0"
                >
                  <span className="flex items-center gap-3">Data-Driven SEO <span className="text-[#FF5722]">✦</span></span>
                  <span className="flex items-center gap-3">Smart Development <span className="text-[#FF5722]">✦</span></span>
                  <span className="flex items-center gap-3">Content Authority <span className="text-[#FF5722]">✦</span></span>
                  <span className="flex items-center gap-3">Scalable Growth <span className="text-[#FF5722]">✦</span></span>
                  <span className="flex items-center gap-3">Data-Driven SEO <span className="text-[#FF5722]">✦</span></span>
                  <span className="flex items-center gap-3">Smart Development <span className="text-[#FF5722]">✦</span></span>
                  <span className="flex items-center gap-3">Content Authority <span className="text-[#FF5722]">✦</span></span>
                  <span className="flex items-center gap-3">Scalable Growth <span className="text-[#FF5722]">✦</span></span>
                </motion.div>
                <motion.div 
                  animate={{ x: [0, -1000] }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  className="flex whitespace-nowrap gap-12 text-sm sm:text-base font-bold text-slate-800 uppercase tracking-[0.15em] shrink-0"
                  aria-hidden="true"
                >
                  <span className="flex items-center gap-3">Data-Driven SEO <span className="text-[#FF5722]">✦</span></span>
                  <span className="flex items-center gap-3">Smart Development <span className="text-[#FF5722]">✦</span></span>
                  <span className="flex items-center gap-3">Content Authority <span className="text-[#FF5722]">✦</span></span>
                  <span className="flex items-center gap-3">Scalable Growth <span className="text-[#FF5722]">✦</span></span>
                  <span className="flex items-center gap-3">Data-Driven SEO <span className="text-[#FF5722]">✦</span></span>
                  <span className="flex items-center gap-3">Smart Development <span className="text-[#FF5722]">✦</span></span>
                  <span className="flex items-center gap-3">Content Authority <span className="text-[#FF5722]">✦</span></span>
                  <span className="flex items-center gap-3">Scalable Growth <span className="text-[#FF5722]">✦</span></span>
                </motion.div>
              </div>
            </div>

            {/* 2. CORE SERVICES (Asymmetric Bento Grid with 3D Tilt) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16 relative z-10" id="core-services">
              <div className="text-center space-y-4">
                <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full">Specializations</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Our Core Digital Services</h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-light">
                  We design customized growth mechanisms using premium engineering models. No slow pre-built templates, strictly custom code.
                </p>
              </div>

              {/* Bento Grid container (4 Core Services 2x2 layout) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Card 1: WordPress & E-Commerce Web Dev */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <ParallaxBentoCard className="h-full flex flex-col justify-between min-h-[460px] p-8" onClick={() => handleOpenService("website-development")}>
                    <div className="space-y-6">
                      <div className="w-12 h-12 bg-[#FF5722]/10 border border-[#FF5722]/20 rounded-2xl flex items-center justify-center text-[#FF5722]">
                        <Code className="w-6 h-6" />
                      </div>
                      
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono font-bold text-[#FF5722] uppercase tracking-wider block">Sales Machine</span>
                        <h3 className="text-2xl font-bold text-slate-900 font-sans">WordPress & E-Commerce Development</h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-light">
                          Your website is your 24/7 virtual storefront. We design custom WordPress and WooCommerce sites that load instantly, looking breathtakingly professional on every screen. We don't just use standard sluggish templates—we structure the code, secure your platform, and design premium sales checkouts that turn casual clicks into repeat customers.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                          <span>Custom Theme Crafting & WooCommerce Optimization</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                          <span>Guaranteed &lt;1.5s Load Speed & Perfect Mobile Layout</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-150 bg-slate-50 flex items-center justify-center">
                      <img 
                        src={coding3D} 
                        alt="3D High-Performance Coding" 
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-mono text-[#FF5722] font-semibold shadow-sm">
                        CUSTOM DEVELOPMENT ✦ WOOCOMMERCE ACTIVE
                      </div>
                    </div>
                  </ParallaxBentoCard>
                </motion.div>

                {/* Card 2: SEO & High-Authority Blog Writing */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <ParallaxBentoCard className="h-full flex flex-col justify-between min-h-[460px] p-8" onClick={() => handleOpenService("seo")}>
                    <div className="space-y-6">
                      <div className="w-12 h-12 bg-[#FF5722]/10 border border-[#FF5722]/20 rounded-2xl flex items-center justify-center text-[#FF5722]">
                        <Search className="w-6 h-6" />
                      </div>
                      
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono font-bold text-[#FF5722] uppercase tracking-wider block">Google Domination</span>
                        <h3 className="text-2xl font-bold text-slate-900 font-sans">SEO & High-Authority Blog Writing</h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-light">
                          If your business isn’t on Google’s page 1, you are practically invisible to buyers. We implement advanced SEO algorithms alongside value-first blog content writing. By targeting high-intent buyer keywords, editing metadata, and writing deep-dive articles, we drive thousands of warm, ready-to-buy organic visitors to your site completely free.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                          <span>Keyword Research, SEO Blogs & Meta Optimization</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                          <span>On-Page, Off-Page and Technical SEO Domination</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-150 bg-slate-50 flex items-center justify-center">
                      <img 
                        src={seo3D} 
                        alt="3D SEO Engine" 
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-mono text-[#FF5722] font-semibold shadow-sm">
                        PAGE 1 RANKINGS ✦ AUTHORITY BLOGS
                      </div>
                    </div>
                  </ParallaxBentoCard>
                </motion.div>

                {/* Card 3: Meta Ads & Scaled Lead Generation */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <ParallaxBentoCard className="h-full flex flex-col justify-between min-h-[460px] p-8" onClick={() => handleOpenService("meta-ads-advertising")}>
                    <div className="space-y-6">
                      <div className="w-12 h-12 bg-[#FF5722]/10 border border-[#FF5722]/20 rounded-2xl flex items-center justify-center text-[#FF5722]">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono font-bold text-[#FF5722] uppercase tracking-wider block">Acquisition Engine</span>
                        <h3 className="text-2xl font-bold text-slate-900 font-sans">Meta Ads & Paid Acquisition</h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-light">
                          Stop burning budget on 'boost posts' that fail to deliver. We deploy high-converting Meta Ads campaigns across Facebook and Instagram. Our strategies combine hyper-targeted audience pipelines, direct-response ad copy, high-impact creatives, and retargeting flows that bring hot customer leads directly into your pipeline.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                          <span>Facebook & Instagram Ads Setup & Custom Funnels</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                          <span>Targeted Lead Gen Pipelines & High-Converting Copy</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-150 bg-slate-50 flex items-center justify-center">
                      <img 
                        src={funnel3D} 
                        alt="3D Funnel Optimization" 
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-mono text-[#FF5722] font-semibold shadow-sm">
                        HIGH CONVERTING BLUEPRINTS ✦ ROAS BOOSTER
                      </div>
                    </div>
                  </ParallaxBentoCard>
                </motion.div>

                {/* Card 4: Premium Social Media Management */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <ParallaxBentoCard className="h-full flex flex-col justify-between min-h-[460px] p-8" onClick={() => handleOpenService("social-media-management")}>
                    <div className="space-y-6">
                      <div className="w-12 h-12 bg-[#FF5722]/10 border border-[#FF5722]/20 rounded-2xl flex items-center justify-center text-[#FF5722]">
                        <Palette className="w-6 h-6" />
                      </div>
                      
                      <div className="space-y-3">
                        <span className="text-[10px] font-mono font-bold text-[#FF5722] uppercase tracking-wider block">Community Authority</span>
                        <h3 className="text-2xl font-bold text-slate-900 font-sans">Social Media Management</h3>
                        <p className="text-sm text-slate-600 leading-relaxed font-light">
                          Social media is your digital reputation. We handle complete social media ecosystem care—gorgeous visual post design, high-engagement copywriting, viral video reels, and persistent posting calendars. We build an interactive, high-trust community that makes your business look incredibly professional, trusted, and alive 24/7.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                          <span>Creative Brand Design, Grid Layouts & Captions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
                          <span>Viral Short-Form Video Reels & Active Audience Growth</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-150 bg-slate-50 flex items-center justify-center">
                      <img 
                        src={smm3D} 
                        alt="3D Social Media Management" 
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-mono text-[#FF5722] font-semibold shadow-sm">
                        BRAND ELEVATED ✦ CONSISTENT VISIBILITY
                      </div>
                    </div>
                  </ParallaxBentoCard>
                </motion.div>

              </div>
            </section>

            {/* 2.5 WHY CHOOSE METAZIVO (Bespoke vs Standard Templates) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10" id="why-choose-us">
              <div className="bg-slate-50 border border-slate-200/80 rounded-[40px] p-8 sm:p-12 lg:p-16 space-y-12 shadow-sm">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full">The Metazivo Standard</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Why Smart Businesses Avoid Cheap Templates</h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-light">
                    Slow templates loaded with bulky plugin codes repel buyers and rank horribly. Here is how Metazivo's custom digital engineering makes you stand out.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                  {/* Slow Templates Card */}
                  <div className="bg-white border border-slate-150 p-8 rounded-3xl space-y-6 shadow-sm">
                    <div className="flex items-center gap-3 text-red-500">
                      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900">Standard Sluggish Templates</h4>
                    </div>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      Most generic agencies use pre-designed themes with heavy visual builders (Elementor, Divi) and redundant scripts that bloat your backend.
                    </p>
                    <ul className="space-y-3 text-xs text-slate-600">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold mt-0.5 font-mono">✕</span>
                        <span><strong>Poor Load Speed:</strong> Long rendering times exceeding 4.5 seconds cause over 50% of your mobile traffic to bounce.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold mt-0.5 font-mono">✕</span>
                        <span><strong>Severe Security Risks:</strong> Over-reliance on random third-party plugins opens up vulnerable entry paths for hackers.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold mt-0.5 font-mono">✕</span>
                        <span><strong>Cookie-Cutter Aesthetics:</strong> Your website looks exactly like thousands of other websites, failing to project brand status.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold mt-0.5 font-mono">✕</span>
                        <span><strong>Flawed On-Page SEO:</strong> No optimized sitemap, dynamic meta tags, or clean markup structure, making it hard to rank.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Metazivo Custom Card */}
                  <div className="bg-[#0a0a0c] text-white p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden border border-[#FF5722]/10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5722]/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center gap-3 text-[#FF5722]">
                      <div className="w-10 h-10 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/20 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-[#FF5722]" />
                      </div>
                      <h4 className="text-lg font-extrabold text-white">Metazivo Bespoke Engineering</h4>
                    </div>
                    <p className="text-xs text-slate-400 font-light leading-relaxed">
                      We discard pre-built template noise. We write clean, semantic code from scratch to ensure outstanding speed, design supremacy, and secure architectures.
                    </p>
                    <ul className="space-y-3 text-xs text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-[#FF5722] font-bold mt-0.5 font-mono">✓</span>
                        <span><strong>Supersonic Speed:</strong> Rendered in under 1.2 seconds, getting 100% PageSpeed Core Web Vitals score.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#FF5722] font-bold mt-0.5 font-mono">✓</span>
                        <span><strong>Bulletproof Security:</strong> Custom-tailored core files with automated daily cloud updates and zero dangerous plugins.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#FF5722] font-bold mt-0.5 font-mono">✓</span>
                        <span><strong>Elite Custom Brand Design:</strong> Tailored specifically to your visual guideline to engage buyers.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#FF5722] font-bold mt-0.5 font-mono">✓</span>
                        <span><strong>Advanced Built-In SEO Engine:</strong> Integrated microdata schemas, fully optimized structures, and responsive tag architectures.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 2.7 OUR STRATEGIC PROCESS BLUEPRINT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 relative z-10" id="strategic-process">
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full">Strategic Blueprint</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Our 5-Step Digital Scale Blueprint</h2>
                <p className="text-xs sm:text-sm text-slate-600 font-light">
                  We don't rely on guesswork. We implement a systematic, step-by-step engineering roadmap to transform your business from invisible to market leader.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-4 relative">
                {/* Horizontal progress lines for desktop */}
                <div className="hidden md:block absolute top-[44px] left-12 right-12 h-0.5 bg-slate-200/80 z-0" />

                {/* Step 1 */}
                <div className="bg-white border border-slate-150 p-6 rounded-2xl relative z-10 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-800 font-mono border border-slate-200">01</span>
                    <h4 className="text-sm font-bold text-slate-900">Technical Audit</h4>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      We dissect your current performance, study competitor backlinks, and map out high-value commercial keyword opportunities.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white border border-slate-150 p-6 rounded-2xl relative z-10 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-800 font-mono border border-slate-200">02</span>
                    <h4 className="text-sm font-bold text-slate-900">Figma UI Blueprint</h4>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      Our graphic designers craft custom responsive wireframes and cohesive modern styles ensuring flawless user conversions.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white border border-slate-150 p-6 rounded-2xl relative z-10 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="w-10 h-10 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/20 flex items-center justify-center text-xs font-black text-[#FF5722] font-mono">03</span>
                    <h4 className="text-sm font-bold text-slate-900">Lightning Dev</h4>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      We hand-code clean web components or custom blocks. This guarantees a supersonic speed layout and absolute security.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-white border border-slate-150 p-6 rounded-2xl relative z-10 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-800 font-mono border border-slate-200">04</span>
                    <h4 className="text-sm font-bold text-slate-900">Conversion Funnels</h4>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      We launch hyper-targeted Meta ad structures alongside persuasive psychological copy, routing buyers directly to your service.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="bg-[#0a0a0c] text-white p-6 rounded-2xl relative z-10 shadow-lg flex flex-col justify-between border border-[#FF5722]/20">
                  <div className="space-y-4">
                    <span className="w-10 h-10 rounded-full bg-[#FF5722] flex items-center justify-center text-xs font-black text-white font-mono">05</span>
                    <h4 className="text-sm font-bold text-white">Active Scaling</h4>
                    <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                      Through weekly blogging authority articles, Google map rankings boost, and continuous budget scaling, we secure your market leader status.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={() => handleNavigate("contact")}
                  className="px-8 py-3.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-[0_4px_15px_rgba(255,87,34,0.25)] flex items-center gap-2 cursor-pointer"
                >
                  <span>Build My Blueprint Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* 4. SUCCESS METRICS (Cinematic scroll-driven background Parallax) */}
            <section className="relative w-full py-32 overflow-hidden border-y border-white/10 z-10" id="success-metrics">
              {/* Parallax background wrapper */}
              <div className="absolute inset-0 z-0">
                <div 
                  className="absolute inset-0 w-full h-[150%] -top-[25%] bg-cover bg-center opacity-15"
                  style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80')",
                    transform: `translateY(${(scrollY - 1000) * 0.12}px)` 
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-transparent to-[#0a0a0c]" />
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-12">
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest bg-[#FF5722]/10 px-3 py-1 rounded-full">Proven Trajectory</span>
                  <h2 className="text-4xl font-extrabold text-white tracking-tight">Our Performance in Numbers</h2>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto font-light">We validate our custom agency code through absolute metrics.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                  <motion.div 
                    className="p-8 bg-black/60 backdrop-blur-md rounded-3xl border border-white/10 space-y-2 group hover:border-[#FF5722]/30 transition-colors"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="block text-5xl font-black text-white font-mono tracking-tight">92%</span>
                    <span className="text-sm font-semibold text-[#FF5722] block">Client Retention & Satisfaction</span>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">Our partners retain Metazivo on active recurring maintenance contracts indefinitely.</p>
                  </motion.div>

                  <motion.div 
                    className="p-8 bg-black/60 backdrop-blur-md rounded-3xl border border-white/10 space-y-2 group hover:border-[#FF5722]/30 transition-colors"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <span className="block text-5xl font-black text-white font-mono tracking-tight">4.8/5</span>
                    <span className="text-sm font-semibold text-[#FF5722] block">Public Star Ratings</span>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">Top tier verification and verified case reviews on Clutch and Google Partner feeds.</p>
                  </motion.div>

                  <motion.div 
                    className="p-8 bg-black/60 backdrop-blur-md rounded-3xl border border-white/10 space-y-2 group hover:border-[#FF5722]/30 transition-colors"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <span className="block text-5xl font-black text-white font-mono tracking-tight">+350%</span>
                    <span className="text-sm font-semibold text-[#FF5722] block">Organic Keyword Surge</span>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">Our technical semantic SEO frameworks trigger immediate indexation and climb rankings.</p>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* 5. DYNAMIC FAQ SECTION */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16 relative z-10" id="faq-engine">
              <div className="text-center space-y-4">
                <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full">Knowledge Hub</span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Inquiries</h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-light">
                  Get details on our SEO processes, custom website build features, and Facebook & Instagram ad blueprints.
                </p>
              </div>

              {/* Interactive Accordion Layout */}
              <div className="space-y-4">
                {faqList.map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <motion.div 
                      key={index}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-slate-50 ${
                        isOpen ? "border-[#FF5722] shadow-[0_10px_30px_rgba(255,87,34,0.06)]" : "border-slate-200/60"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : index)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                      >
                        <span className="text-sm sm:text-base font-bold text-slate-800 hover:text-[#FF5722] transition-colors">
                          {faq.question}
                        </span>
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                          isOpen ? "border-[#FF5722] text-[#FF5722] rotate-45" : "border-slate-200/80 text-slate-500"
                        }`}>
                          <Plus className="w-3.5 h-3.5 transition-transform" />
                        </div>
                      </button>

                      {/* Smooth slide accordion panel */}
                      <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen ? "max-h-[300px] border-t border-slate-100" : "max-h-0"
                        }`}
                      >
                        <div className="p-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* 6. CONVERSION PORTAL / CONTACT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-slate-200/60 relative z-10" id="leads-portal">
              <div className="space-y-6">
                <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full">Free Growth Call</span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Let's Design Your Growth Blueprint</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Have questions about SEO strategies, customized WordPress builds, or Facebook & Instagram ad blueprints? Fill out our form and our team will design your conversion optimization blueprint.
                </p>
                
                <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Contact Email:</span>
                    <a href={`mailto:${displayEmail}`} className="text-[#FF5722] hover:underline font-bold">{displayEmail}</a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hotline Number:</span>
                    <a href={`tel:${displayPhone.replace(/[^+\d]/g, "")}`} className="text-[#FF5722] hover:underline font-bold">{displayPhone}</a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Coordinate:</span>
                    <span className="text-slate-700">{contactInfo?.address || "Islamabad / Lahore, PK"}</span>
                  </div>
                </div>
              </div>

              <div className="p-1 rounded-3xl bg-gradient-to-tr from-orange-100/50 to-orange-50/20 border border-orange-200/50 shadow-xl shadow-orange-500/5">
                <ContactForm />
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: ABOUT PAGE */}
        {currentTab === "about" && (
          <div id="view-about" className="max-w-4xl mx-auto px-4 py-16 space-y-12 animate-fade-in text-slate-800">
            <button onClick={() => handleNavigate("home")} className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </button>
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest">About Metazivo</span>
              <h1 className="text-4xl font-extrabold text-slate-950">Full-Service Digital Growth Engineering</h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Founded with a vision to eliminate slow page speeds and template bloat from modern e-commerce and business marketing, Metazivo serves clients globally. We are a specialized agency of designers, developers, search engine optimizers, and copywriters specializing in high conversion.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-[32px] grid grid-cols-1 md:grid-cols-3 gap-6 text-center shadow-sm">
              <div>
                <span className="block text-3xl font-black text-slate-900">100%</span>
                <span className="text-xs text-slate-500 block mt-1">LTS Code Standards</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-slate-900">14+</span>
                <span className="text-xs text-slate-500 block mt-1">Active Global Accounts</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-slate-900">0.3s</span>
                <span className="text-xs text-slate-500 block mt-1">Average Load Speed</span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Corporate Leadership</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-4 shadow-sm">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Mehar Ali Hassan" referrerPolicy="no-referrer" className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Mehar Ali Hassan</h3>
                    <span className="text-[11px] text-[#FF5722] font-mono">Principal Systems Architect</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: SERVICES LIST PAGE */}
        {currentTab === "services" && (
          <div id="view-services" className="max-w-5xl mx-auto px-4 py-16 space-y-12 animate-fade-in text-slate-800">
            <div className="text-center space-y-4">
              <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full">Full Agency Capabilities</span>
              <h1 className="text-4xl font-extrabold text-slate-950">Enterprise Business Solutions</h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">We construct pristine, search-optimized web architectures, high conversion funnels, and corporate design standards.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicesData.map((srv) => (
                <div key={srv.id} className="p-6 bg-white border border-slate-200/70 hover:border-[#FF5722]/30 rounded-[32px] transition-all shadow-sm hover:shadow-md" id={`services-list-${srv.slug}`}>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{srv.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{srv.description}</p>
                  <button
                    onClick={() => handleOpenService(srv.slug)}
                    className="text-xs font-semibold text-[#FF5722] hover:text-[#FF7043] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Process & Benefits</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: DETAILED INDIVIDUAL SERVICE PAGE */}
        {currentTab === "service-detail" && activeService && (
          <div id="view-service-detail" className="max-w-4xl mx-auto px-4 py-16 space-y-10 animate-fade-in text-slate-800">
            <button onClick={() => handleNavigate("services")} className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Services
            </button>

            <div className="space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest block font-semibold">✦ High-Yield Agency Solution</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">{activeService.title}</h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">{activeService.longDescription}</p>
              </div>

              {/* Instant Conversion Row */}
              <div className="flex flex-wrap gap-4 items-center pt-2">
                <a 
                  href={getWhatsAppLink(activeService.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow-[0_4px_12px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_15px_rgba(16,185,129,0.35)] transition-all cursor-pointer border border-emerald-500/20 active:scale-95"
                >
                  <Phone className="w-4 h-4 text-emerald-100" />
                  <span>Direct WhatsApp Chat (+92 328 8518557)</span>
                </a>
                <button 
                  onClick={() => handleNavigate("contact")}
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl text-xs border border-slate-200 transition-all cursor-pointer"
                >
                  Request Customized Blueprint
                </button>
              </div>
            </div>

            {/* Service Detailed Featured Banner */}
            <div className="relative w-full aspect-[16/7] rounded-[32px] overflow-hidden border border-slate-200/80 shadow-lg bg-slate-100">
              <img 
                src={getServiceImage(activeService.slug)} 
                alt={activeService.title} 
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover opacity-95 hover:scale-[1.01] transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200/80 text-xs font-mono text-[#FF5722] font-semibold flex items-center gap-2 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-pulse" />
                <span>ACTIVE PRODUCTION NODE</span>
              </div>
            </div>

            {/* Benefits box */}
            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-[32px] space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Primary Optimization Benefits</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                {activeService.benefits.map((b, idx) => (
                  <li key={idx} className="flex gap-2 items-center">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specific Process Timeline */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">Implementation Lifecycle</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {activeService.process.map((step, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5 shadow-sm">
                    <span className="text-[#FF5722] text-xs font-mono font-bold">Phase 0{idx + 1}</span>
                    <h4 className="text-xs font-semibold text-slate-800">{step}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick custom callback action */}
            <div className="bg-gradient-to-tr from-slate-50 to-orange-50/20 p-8 border border-slate-200/80 rounded-[32px] flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="text-center md:text-left space-y-2">
                <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-widest block">✦ 100% Client-Centric Success</span>
                <h4 className="text-lg font-bold text-slate-900">Let's scale your business to the absolute next level!</h4>
                <p className="text-xs text-slate-600 max-w-md leading-relaxed">
                  Is service se apka business direct grow hoga. Custom WordPress development, ranking factors, aur high-converting campaigns ke zariye apka revenue increase hamari zimmedari hai.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <a 
                  href={getWhatsAppLink(activeService.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-bold transition-all shadow-[0_4px_10px_rgba(16,185,129,0.25)] flex items-center justify-center gap-2 border border-emerald-500/20 cursor-pointer active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Consult on WhatsApp</span>
                </a>
                <button 
                  onClick={() => handleNavigate("contact")} 
                  className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-full text-xs font-semibold transition-all cursor-pointer"
                >
                  Request Blueprint
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: PORTFOLIO LIST PAGE */}
        {currentTab === "portfolio" && (
          <div id="view-portfolio" className="max-w-5xl mx-auto px-4 py-16 space-y-12 animate-fade-in text-slate-800">
            <div className="text-center space-y-4">
              <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full">Case Catalog</span>
              <h1 className="text-4xl font-extrabold text-slate-950">Recent Success Stories</h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-light">We systematically design digital performance. Review the actual metrics of completed agency assets.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioItems.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200/80 rounded-[32px] overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="aspect-video w-full overflow-hidden border-b border-slate-100">
                    <img src={item.image} alt={item.title} referrerPolicy="no-referrer" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="px-2.5 py-0.5 bg-orange-50 text-[#FF5722] border border-orange-100 rounded-full font-mono font-bold">{item.metrics}</span>
                      <span className="text-slate-500">{item.category}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 6: BLOG POST INDEX LIST */}
        {currentTab === "blog" && (
          <div id="view-blog" className="max-w-5xl mx-auto px-4 py-16 space-y-12 animate-fade-in text-slate-800">
            <div className="text-center space-y-4">
              <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full">Grow Knowledge</span>
              <h1 className="text-4xl font-extrabold text-slate-950">SEO, Ads, and Speed Playbooks</h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-light">Read specialized tutorials compiled by Mehar Ali Hassan to audit and accelerate organic conversion channels.</p>
            </div>

            {/* List active published posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.filter(b => b.status === "published").map((post) => (
                <div key={post.id} className="bg-white border border-slate-200/80 rounded-[32px] overflow-hidden hover:border-[#FF5722]/30 transition-all flex flex-col justify-between shadow-sm" id={`blog-card-${post.slug}`}>
                  <div>
                    <div className="aspect-video w-full overflow-hidden relative border-b border-slate-100">
                      <img src={post.featuredImage} alt={post.title} referrerPolicy="no-referrer" loading="lazy" className="w-full h-full object-cover" />
                      {post.sticky && (
                        <span className="absolute top-3 left-3 bg-[#FF5722] text-white text-[9px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full shadow">
                          Sticky Post
                        </span>
                      )}
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex gap-4 items-center text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(post.publishDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        </span>
                        <span>•</span>
                        <span>{post.readingTime} min read</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 hover:text-[#FF5722] transition-colors cursor-pointer" onClick={() => handleOpenBlog(post.slug)}>
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-light">{post.excerpt}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex justify-between items-center border-t border-slate-100 mt-4">
                    <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">{post.categories?.[0] || "SEO"}</span>
                    <button
                      onClick={() => handleOpenBlog(post.slug)}
                      className="text-xs font-bold text-[#FF5722] hover:text-[#FF7043] transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Blueprint</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 7: SINGLE BLOG DETAIL TYPOGRAPHY VIEW */}
        {currentTab === "blog-detail" && activeBlog && (
          <article id="view-blog-detail" className="max-w-3xl mx-auto px-4 py-16 space-y-8 animate-fade-in text-slate-800">
            <button onClick={() => handleNavigate("blog")} className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog List
            </button>

            <header className="space-y-4">
              <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                <span>{activeBlog.categories?.join(" / ")}</span>
                <span>•</span>
                <span>{activeBlog.readingTime} Min Read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 leading-tight tracking-tight">
                {activeBlog.title}
              </h1>

              {/* Author Row */}
              <div className="flex items-center gap-3 py-3 border-y border-slate-200">
                <img src={activeBlog.author?.avatar} alt={activeBlog.author?.name} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                <div>
                  <span className="block text-xs font-bold text-slate-900">{activeBlog.author?.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono font-light">Published on {new Date(activeBlog.publishDate).toLocaleDateString()}</span>
                </div>
              </div>
            </header>

            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-200">
              <img src={activeBlog.featuredImage} alt={activeBlog.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>

            {/* Blog Post Content Body */}
            <div
              className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: activeBlog.content }}
            />

            {/* Injected schemas JSON-LD verification block */}
            {activeBlog.schemas?.map((sch) => (
              <script
                key={sch.id}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: sch.jsonData }}
              />
            ))}
          </article>
        )}

        {/* VIEW 8: PRICING DETAILED PAGE */}
        {currentTab === "pricing" && (
          <div id="view-pricing" className="max-w-5xl mx-auto px-4 py-16 space-y-12 animate-fade-in text-slate-800">
            <div className="text-center space-y-4">
              <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full">Corporate Rates</span>
              <h1 className="text-4xl font-extrabold text-slate-950">Scale With Custom Retainers</h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-light">Deploy specialized design, speed hardeners, and advertising budgets tailored directly for your scope.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <div key={plan.id} className="bg-white border border-slate-200/80 p-6 rounded-[32px] flex flex-col justify-between shadow-sm transition-all hover:translate-y-[-4px]">
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
                    <span className="text-3xl font-extrabold text-[#FF5722] block">{plan.price}</span>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">{plan.description}</p>
                    <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex gap-2 items-center">
                          <Check className="w-3.5 h-3.5 text-[#FF5722]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={() => handleNavigate("contact")} className="w-full mt-6 py-2.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-full text-xs font-semibold transition-all cursor-pointer shadow-[0_4px_10px_rgba(255,87,34,0.15)]">
                    Request custom quote
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 9: CONTACT PAGE & CALLBACKS */}
        {currentTab === "contact" && (
          <div id="view-contact" className="max-w-4xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-fade-in text-slate-800">
            <div className="space-y-6">
              <span className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-widest bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-full">Connect with Us</span>
              <h1 className="text-4xl font-extrabold text-slate-950">Let's Discuss Your Project</h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light font-sans">
                We design fully responsive speed-hardened portfolios, optimize WordPress theme pipelines, and drive conversion metrics. WhatsApp us or send an inquiry directly to set up your principal consultation.
              </p>
              <div className="space-y-4 font-mono text-xs text-slate-700 bg-slate-50 border border-slate-200/80 p-5 rounded-2xl">
                <div className="flex gap-2 items-center">
                  <Phone className="w-4 h-4 text-[#FF5722]" />
                  <span>{contactInfo?.phone || "+92 328 8518557"}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Mail className="w-4 h-4 text-[#FF5722]" />
                  <span>{contactInfo?.email || "mai@metazivo.com"}</span>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        )}
        {/* VIEW 10: PRIVACY COMPLIANCE */}
        {currentTab === "privacy" && (
          <div id="view-privacy" className="max-w-3xl mx-auto px-6 py-10 bg-slate-50 border border-slate-200 rounded-[32px] space-y-6 text-xs text-slate-600 leading-relaxed animate-fade-in font-sans shadow-sm my-16">
            <h1 className="text-2xl font-bold text-slate-950 mb-2">{activeCustomPage?.title || "Privacy Policy & GDPR Compliance"}</h1>
            {activeCustomPage?.content ? (
              <div className="prose prose-slate max-w-none text-slate-600 space-y-4" dangerouslySetInnerHTML={{ __html: activeCustomPage.content }} />
            ) : (
              <>
                <p>At Metazivo Digital Agency, accessible from https://metazivo.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Metazivo and how we use it.</p>
                <h2 className="text-base font-bold text-slate-900 mt-4 font-sans">1. Data Collection & Cookie Logs</h2>
                <p>Like any other website, Metazivo uses 'cookies' to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
                <h2 className="text-base font-bold text-slate-200 mt-4 font-sans">2. DoubleClick DART Cookies</h2>
                <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.</p>
              </>
            )}
          </div>
        )}

        {/* VIEW 11: TERMS COMPLIANCE */}
        {currentTab === "terms" && (
          <div id="view-terms" className="max-w-3xl mx-auto px-6 py-10 bg-slate-50 border border-slate-200 rounded-[32px] space-y-6 text-xs text-slate-600 leading-relaxed animate-fade-in font-sans shadow-sm my-16">
            <h1 className="text-2xl font-bold text-slate-950 mb-2">{activeCustomPage?.title || "Terms & Conditions"}</h1>
            {activeCustomPage?.content ? (
              <div className="prose prose-slate max-w-none text-slate-600 space-y-4" dangerouslySetInnerHTML={{ __html: activeCustomPage.content }} />
            ) : (
              <>
                <p>Welcome to Metazivo! These terms and conditions outline the rules and regulations for the use of Metazivo's Website, located at https://metazivo.com.</p>
                <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Metazivo if you do not agree to take all of the terms and conditions stated on this page.</p>
                <h2 className="text-base font-bold text-slate-900 mt-4 font-sans">1. Intellectual Property Rights</h2>
                <p>Unless otherwise stated, Metazivo and/or its licensors own the intellectual property rights for all material on Metazivo. All intellectual property rights are reserved. You may access this from Metazivo for your own personal use subjected to restrictions set in these terms and conditions.</p>
              </>
            )}
          </div>
        )}

        {/* VIEW 12: CUSTOM DYNAMIC PAGES */}
        {isCustomPage && activeCustomPage && (
          <div id={`view-${activeCustomPage.slug}`} className="max-w-4xl mx-auto px-6 py-16 space-y-12 animate-fade-in min-h-[500px] text-slate-800">
            <button onClick={() => handleNavigate("home")} className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </button>
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">{activeCustomPage.title}</h1>
              <div 
                className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-4 font-sans"
                dangerouslySetInnerHTML={{ __html: activeCustomPage.content }}
              />
            </div>
          </div>
        )}

      </main>

      {/* FOOTER SECTION */}
      <Footer 
        onNavigate={handleNavigate} 
        contactInfo={contactInfo || undefined}
        customPages={pages}
      />

      {/* -----------------------------------------------------------------------------
          MODAL DRAWER: WORDPRESS-STYLE ADVANCED CMS PORTAL
          ----------------------------------------------------------------------------- */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 bg-[#020617]/95 backdrop-blur-xl flex flex-col overflow-hidden" id="admin-modal-workspace">
          
          {/* Top Panel Bar */}
          <div className="w-full bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                M
              </div>
              <span className="text-xs font-mono font-bold text-slate-300">Metazivo WordPress-Style Core Engine v2.4</span>
              {isAuthenticated && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/5 text-blue-400 border border-white/10 rounded text-[10px] font-mono">
                  Role: {userRole}
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setIsAdminOpen(false);
                setIsEditingPost(false);
              }}
              className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 hover:text-white rounded-full text-xs transition-colors cursor-pointer"
            >
              Exit Portal
            </button>
          </div>

          {/* MAIN CRM PORTAL COMPONENT */}
          <div className="flex-grow flex overflow-hidden">
            
            {/* If NOT Authenticated: Show login sequence */}
            {!isAuthenticated ? (
              <div className="flex-grow flex items-center justify-center p-4">
                <div className="w-full max-w-sm bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 space-y-4 shadow-2xl">
                  
                  {/* Step 1: Core credentials */}
                  {loginStep === "login" && (
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div className="text-center space-y-1">
                        <Lock className="w-8 h-8 text-blue-400 mx-auto" />
                        <h3 className="text-base font-bold text-white">Administrator Secure Login</h3>
                        <p className="text-[11px] text-slate-400">Sign in to edit blogs, manage media, and audit enquiries.</p>
                      </div>

                      {authError && (
                        <div className="p-2.5 bg-red-950/40 border border-red-900 rounded-lg text-[10px] text-red-300">
                          {authError}
                        </div>
                      )}

                      <div className="space-y-3.5 text-xs">
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Username</label>
                          <input
                            type="text"
                            required
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
                            placeholder="Enter username"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                            <button type="button" onClick={() => setLoginStep("forgot")} className="text-[10px] text-blue-400 hover:underline">Forgot?</button>
                          </div>
                          <input
                            type="password"
                            required
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
                            placeholder="Enter password"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                      >
                        Sign In & Authenticate
                      </button>
                    </form>
                  )}

                  {/* Step 2: Simulated TFA */}
                  {loginStep === "tfa" && (
                    <form onSubmit={handleTfaVerify} className="space-y-4">
                      <div className="text-center space-y-1">
                        <ShieldCheck className="w-8 h-8 text-blue-400 mx-auto" />
                        <h3 className="text-base font-bold text-white">Two-Factor Authenticator</h3>
                        <p className="text-[11px] text-slate-400">Provide the 6-digit synchronization token.</p>
                      </div>

                      {authError && (
                        <div className="p-2.5 bg-red-950/40 border border-red-900 rounded-lg text-[10px] text-red-300">
                          {authError}
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 text-center">TFA Secure Code</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={tfaCode}
                          onChange={(e) => setTfaCode(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 text-center text-lg font-mono text-blue-400 tracking-widest focus:outline-none focus:border-blue-400/50"
                          placeholder="••••••"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setLoginStep("login")}
                          className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-full text-xs cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full text-xs cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                        >
                          Sync Securely
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Step 3: Password recovery */}
                  {loginStep === "forgot" && (
                    <div className="space-y-4">
                      <div className="text-center space-y-1">
                        <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                        <h3 className="text-base font-bold text-white">Credentials Recovery</h3>
                        <p className="text-[11px] text-slate-400">Restore permissions to the Metazivo core database.</p>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        An administrative password reset email has been dispatched to the default address <strong>mai@metazivo.com</strong>. Complete the recovery guidelines from that inbox.
                      </p>
                      <button
                        onClick={() => setLoginStep("login")}
                        className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 rounded-full text-xs cursor-pointer"
                      >
                        Return to Sign In
                      </button>
                    </div>
                  )}

                </div>
              </div>
            ) : (
              
              /* Active Authenticated Administrative CRM */
              <div className="flex-grow flex overflow-hidden">
                
                {/* Admin Sidebar */}
                <aside className="w-52 border-r border-white/10 bg-white/5 backdrop-blur-md p-3 hidden md:flex flex-col gap-1 justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest px-2.5 block mb-2">CMS Modules</span>
                    
                    <button
                      onClick={() => { setActiveAdminSubTab("analytics"); setIsEditingPost(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl ${activeAdminSubTab === "analytics" ? "bg-white/10 text-blue-400 border border-white/10" : "text-slate-400 hover:text-white"}`}
                    >
                      <Activity className="w-3.5 h-3.5 text-blue-400" />
                      <span>CRM Analytics</span>
                    </button>
                    <button
                      onClick={() => { setActiveAdminSubTab("blogs"); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl ${activeAdminSubTab === "blogs" ? "bg-white/10 text-blue-400 border border-white/10" : "text-slate-400 hover:text-white"}`}
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      <span>Blog Manager</span>
                    </button>
                    <button
                      onClick={() => { setActiveAdminSubTab("media"); setIsEditingPost(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl ${activeAdminSubTab === "media" ? "bg-white/10 text-blue-400 border border-white/10" : "text-slate-400 hover:text-white"}`}
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>Media Library</span>
                    </button>
                    <button
                      onClick={() => { setActiveAdminSubTab("leads"); setIsEditingPost(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl ${activeAdminSubTab === "leads" ? "bg-white/10 text-blue-400 border border-white/10" : "text-slate-400 hover:text-white"}`}
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                      <span>Inquiries</span>
                    </button>
                    <button
                      onClick={() => { setActiveAdminSubTab("redirects"); setIsEditingPost(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl ${activeAdminSubTab === "redirects" ? "bg-white/10 text-blue-400 border border-white/10" : "text-slate-400 hover:text-white"}`}
                    >
                      <Settings className="w-3.5 h-3.5 text-blue-400" />
                      <span>301 Redirects</span>
                    </button>
                    <button
                      onClick={() => { setActiveAdminSubTab("pages"); setIsEditingPost(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl ${activeAdminSubTab === "pages" ? "bg-white/10 text-blue-400 border border-white/10" : "text-slate-400 hover:text-white"}`}
                    >
                      <Folder className="w-3.5 h-3.5 text-blue-400" />
                      <span>Pages Manager</span>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                    <button
                      onClick={() => { setActiveAdminSubTab("settings"); setIsEditingPost(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg ${activeAdminSubTab === "settings" ? "bg-white/5 text-blue-400" : "text-slate-500 hover:text-white"}`}
                    >
                      <Settings className="w-3.5 h-3.5" /> General Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 text-red-400 rounded-full text-[10px] font-bold transition-all cursor-pointer"
                    >
                      Sign Out Session
                    </button>
                  </div>
                </aside>

                {/* Main Content Workspace viewport */}
                <div className="flex-grow p-4 md:p-6 overflow-y-auto">
                  
                  {/* SUB PANEL 1: DASHBOARD ANALYTICS */}
                  {activeAdminSubTab === "analytics" && !isEditingPost && (
                    <div className="space-y-6 animate-fade-in" id="crm-analytics-panel">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-white/10">
                        <div>
                          <h2 className="text-xl font-bold text-white tracking-wide">CMS Analytics Console</h2>
                          <p className="text-xs text-slate-400">Live organic sessions, inquiries, and SEO metadata ratings.</p>
                        </div>
                        <button
                          onClick={loadAllData}
                          className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-blue-400 rounded-full text-xs transition-all cursor-pointer"
                          title="Refresh Stats"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Stat Metrics Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow-md">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Total Pageviews</span>
                          <span className="block text-2xl font-extrabold text-white mt-1">{analytics?.pageViews || 12450}</span>
                          <span className="text-[10px] text-emerald-400 mt-1 block">▲ +12% this week</span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow-md">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Unique Visitors</span>
                          <span className="block text-2xl font-extrabold text-white mt-1">{analytics?.visitors || 4850}</span>
                          <span className="text-[10px] text-blue-400 mt-1 block font-mono">Hostinger Server Pool</span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow-md">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Inbound Leads</span>
                          <span className="block text-2xl font-extrabold text-white mt-1">{analytics?.leadsCount || leads.length}</span>
                          <span className="text-[10px] text-slate-400 mt-1 block font-mono">Read/Replied tracker active</span>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow-md">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Average SEO Rating</span>
                          <span className="block text-2xl font-extrabold text-blue-400 mt-1">{analytics?.averageSeoScore || 95}%</span>
                          <span className="text-[10px] text-emerald-400 mt-1 block">Enterprise Grade Score</span>
                        </div>
                      </div>

                      {/* Line graph of visitors simulated using CSS grids and SVG */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow-md">
                        <h4 className="text-xs font-bold text-slate-300 uppercase mb-3">Audited Search Session Log (Weekly)</h4>
                        <div className="aspect-[4/1] w-full bg-white/5 border border-white/10 rounded-xl p-4 flex items-end gap-2 relative shadow-inner">
                          <div className="absolute top-2 right-2 text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded bg-blue-400" /> Pageviews
                            <span className="w-2 h-2 rounded bg-indigo-500/80 ml-2" /> Visitors
                          </div>
                          {analytics?.viewsHistory?.map((hist, idx) => (
                            <div key={idx} className="flex-grow flex flex-col justify-end gap-1.5 group cursor-pointer h-full relative">
                              <div className="w-full flex gap-1 items-end h-3/4">
                                <div className="bg-indigo-500/80 rounded-t w-1/2" style={{ height: `${(hist.visitors / 1500) * 100}%` }} />
                                <div className="bg-blue-400 rounded-t w-1/2" style={{ height: `${(hist.views / 3000) * 100}%` }} />
                              </div>
                              <span className="text-[9px] text-slate-400 font-mono text-center block mt-1">{hist.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Layout: Activity Logs and Enquiry Summaries */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3 shadow-md">
                          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Metazivo CMS Actions Audit</h4>
                          <div className="space-y-2 text-xs max-h-56 overflow-y-auto">
                            {activityLogs.length === 0 ? (
                              <p className="text-slate-500 italic">No CMS audits recorded in this session.</p>
                            ) : (
                              activityLogs.map((log) => (
                                <div key={log.id} className="flex justify-between items-center bg-white/5 p-2 border border-white/10 rounded-xl text-[11px] shadow-sm">
                                  <div className="flex flex-col">
                                    <span className="text-slate-300 font-medium">{log.action}</span>
                                    <span className="text-slate-500 font-mono text-[9px]">{log.user} ({log.role})</span>
                                  </div>
                                  <span className="text-slate-400 font-mono">{log.timestamp}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3 shadow-md">
                          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Leads Distribution by Service</h4>
                          <div className="space-y-2 text-xs">
                            {analytics?.leadsByService?.map((item, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-[11px]">
                                  <span className="text-slate-300 truncate">{item.service}</span>
                                  <span className="text-white font-mono font-bold">{item.count}</span>
                                </div>
                                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden border border-white/5">
                                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(item.count / Math.max(...analytics.leadsByService.map(l => l.count))) * 100}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* SUB PANEL 2: BLOG MANAGER WORKSPACE */}
                  {activeAdminSubTab === "blogs" && (
                    <div className="space-y-6 animate-fade-in" id="blog-manager-panel">
                      
                      {/* Sub Mode A: Blog list catalog */}
                      {!isEditingPost ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center pb-4 border-b border-white/10">
                            <div>
                              <h2 className="text-xl font-bold text-white tracking-wide">Published and Draft Blogs</h2>
                              <p className="text-xs text-slate-400">Edit Gutenberg layouts, map Schema files, and run dynamic keyword optimizations.</p>
                            </div>
                            <button
                              onClick={handleCreatePostTrigger}
                              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold tracking-wide transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                            >
                              <Plus className="w-4 h-4" /> Create New Post
                            </button>
                          </div>

                          <div className="border border-white/10 rounded-[32px] overflow-hidden bg-white/5 shadow-lg">
                            <table className="w-full text-left text-xs text-slate-300">
                              <thead className="bg-white/5 text-slate-200 uppercase tracking-wider font-mono text-[10px] border-b border-white/10">
                                <tr>
                                  <th className="p-4">Post Title</th>
                                  <th className="p-4">Categories</th>
                                  <th className="p-4">SEO Rating</th>
                                  <th className="p-4">Status</th>
                                  <th className="p-4 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {blogs.map((post) => (
                                  <tr key={post.id} className="border-b border-white/5 hover:bg-white/10">
                                    <td className="p-4">
                                      <div className="flex flex-col">
                                        <span className="font-bold text-white text-xs">{post.title}</span>
                                        <span className="text-[10px] text-slate-400 font-mono mt-0.5">/{post.slug}</span>
                                      </div>
                                    </td>
                                    <td className="p-4 font-mono">{post.categories?.join(", ")}</td>
                                    <td className="p-4">
                                      <span className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] border ${
                                        post.seoScore >= 90 ? "bg-emerald-950/20 text-emerald-400 border-emerald-500/20" : "bg-amber-950/20 text-amber-400 border-amber-500/20"
                                      }`}>
                                        {post.seoScore || 85}/100
                                      </span>
                                    </td>
                                    <td className="p-4">
                                      <span className={`capitalize text-[10px] font-semibold px-2 py-0.5 rounded border ${
                                        post.status === "published" ? "bg-emerald-950/20 text-emerald-400 border-emerald-500/20" : "bg-white/5 text-slate-400 border-white/10"
                                      }`}>
                                        {post.status}
                                      </span>
                                    </td>
                                    <td className="p-4 text-right">
                                      <div className="flex justify-end gap-2">
                                        <button
                                          onClick={() => handleEditPostTrigger(post)}
                                          className="p-1.5 text-slate-400 hover:text-blue-400 rounded-full hover:bg-white/10"
                                          title="Edit Post"
                                        >
                                          <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                          onClick={() => handleDeletePost(post.id)}
                                          className="p-1.5 text-slate-500 hover:text-red-400 rounded-full hover:bg-white/10"
                                          title="Delete Post"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        
                        /* Sub Mode B: GUTENBERG MULTI-SIDEBAR WORKSPACE */
                        <div className="space-y-6">
                          <div className="flex justify-between items-center pb-4 border-b border-white/10">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => { setIsEditingPost(false); setEditingPost({}); }}
                                className="p-2 bg-white/5 border border-white/10 text-slate-400 hover:text-white rounded-full cursor-pointer"
                                title="Back to Posts list"
                              >
                                <ArrowLeft className="w-4 h-4" />
                              </button>
                              <div>
                                <h3 className="text-base font-bold text-white">Post Editor Workspace</h3>
                                <p className="text-[11px] text-slate-400">Draft blocks, append schemas, audit keyword weight, and use Gemini assist.</p>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <select
                                value={editingPost.status}
                                onChange={(e) => setEditingPost((prev) => ({ ...prev, status: e.target.value as any }))}
                                className="bg-white/5 border border-white/10 rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none"
                              >
                                <option value="draft">Save Draft</option>
                                <option value="published">Publish Live</option>
                              </select>
                              <button
                                onClick={handleSavePost}
                                className="px-5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer"
                              >
                                Commit Post
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                            {/* Main left column: Title, Excerpt, Gutenberg Editor */}
                            <div className="xl:col-span-2 space-y-4">
                              <div>
                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Article Title</label>
                                <input
                                  type="text"
                                  value={editingPost.title}
                                  onChange={(e) => setEditingPost((prev) => ({ ...prev, title: e.target.value }))}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400 font-bold"
                                  placeholder="e.g. Speed Optimization Playbook"
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Canonical Slug</label>
                                  <input
                                    type="text"
                                    value={editingPost.slug}
                                    onChange={(e) => setEditingPost((prev) => ({ ...prev, slug: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400"
                                    placeholder="speed-optimization-playbook"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Focus Keyword</label>
                                  <input
                                    type="text"
                                    value={editingPost.focusKeywords?.join(", ") || ""}
                                    onChange={(e) => setEditingPost((prev) => ({ ...prev, focusKeywords: e.target.value.split(",").map(k => k.trim()) }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400"
                                    placeholder="website speed optimization, page speed"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Article Body (Gutenberg Split)</label>
                                <WordEditor
                                  value={editingPost.content || ""}
                                  onChange={(html) => setEditingPost((prev) => ({ ...prev, content: html }))}
                                  mediaAssets={mediaAssets}
                                  onOpenMediaSelector={(onSelect) => {
                                    setShowMediaSelectorForEditor(() => onSelect);
                                  }}
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">Meta Description Snippet</label>
                                <textarea
                                  value={editingPost.seoDescription || ""}
                                  onChange={(e) => setEditingPost((prev) => ({ ...prev, seoDescription: e.target.value }))}
                                  rows={2}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-xs text-slate-300 focus:outline-none focus:border-blue-400"
                                  placeholder="Provide description snippet to increase Google click through counts..."
                                />
                              </div>
                            </div>

                            {/* Sidebar right column: Analyzer, Schemas, Gemini assistant */}
                            <div className="space-y-6">
                              {/* SEO grading engine */}
                              <SeoScoreAnalyzer
                                title={editingPost.title || ""}
                                content={editingPost.content || ""}
                                focusKeywords={editingPost.focusKeywords || []}
                                seoTitle={editingPost.seoTitle || editingPost.title || ""}
                                seoDescription={editingPost.seoDescription || ""}
                              />

                              {/* Schema.org visualizer */}
                              <SchemaEditor
                                schemas={editingPost.schemas || []}
                                onChange={(updatedSchemas) => setEditingPost((prev) => ({ ...prev, schemas: updatedSchemas }))}
                                postTitle={editingPost.title}
                                postSlug={editingPost.slug}
                              />

                              {/* Coprocessor assistant */}
                              <AiAssistant
                                currentPostTitle={editingPost.title || ""}
                                onApplyMetadata={(aiMeta) => {
                                  setEditingPost((prev) => ({
                                    ...prev,
                                    seoTitle: aiMeta.seoTitle,
                                    seoDescription: aiMeta.seoDescription,
                                    slug: aiMeta.slug,
                                    focusKeywords: aiMeta.focusKeywords,
                                    excerpt: aiMeta.excerpt
                                  }));
                                  logActivity("Applied AI Meta parameters");
                                }}
                                onApplyFaq={(faqHtml) => {
                                  setEditingPost((prev) => ({ ...prev, content: (prev.content || "") + faqHtml }));
                                  logActivity("Injected AI FAQ block");
                                }}
                                onApplySchema={(schJson) => {
                                  const schType = schJson.includes("FAQPage") ? "FAQ" : "BlogPosting";
                                  const newSch = {
                                    id: `schema-ai-${Date.now()}`,
                                    type: schType as any,
                                    jsonData: schJson
                                  };
                                  setEditingPost((prev) => ({ ...prev, schemas: [...(prev.schemas || []), newSch] }));
                                  logActivity("Injected AI JSON-LD schema");
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUB PANEL 3: MEDIA LIBRARY */}
                  {activeAdminSubTab === "media" && (
                    <div className="space-y-4 animate-fade-in" id="media-manager-panel">
                      <div className="pb-4 border-b border-white/10">
                        <h2 className="text-xl font-bold text-white tracking-wide">CMS Media Library</h2>
                        <p className="text-xs text-slate-400">Secure WebP image catalogs, drag bulk compressions, and edit alt indexing tags.</p>
                      </div>

                      <MediaLibrary
                        assets={mediaAssets}
                        onUpload={handleUploadAsset}
                        onDelete={handleDeleteAsset}
                      />
                    </div>
                  )}

                  {/* SUB PANEL 4: LEADS & INQUIRIES LIST */}
                  {activeAdminSubTab === "leads" && (
                    <div className="space-y-6 animate-fade-in" id="leads-manager-panel">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-white/10">
                        <div>
                          <h2 className="text-xl font-bold text-white tracking-wide">Customer Inquiries Log</h2>
                          <p className="text-xs text-slate-400">Read and process inbound sales scope entries securely.</p>
                        </div>
                        <a
                          href="/api/leads/export/csv"
                          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all"
                        >
                          <Download className="w-3.5 h-3.5 text-blue-400" /> Export leads as CSV
                        </a>
                      </div>

                      <div className="space-y-4">
                        {leads.map((lead) => (
                          <div
                            key={lead.id}
                            className={`p-5 rounded-[32px] border backdrop-blur-md transition-all ${
                              lead.status === "unread" ? "bg-white/10 border-blue-500/50" : "bg-white/5 border-white/10"
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-white/10 pb-3 mb-3">
                              <div>
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                  {lead.name}
                                  {lead.status === "unread" && (
                                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                                  )}
                                </h3>
                                <span className="text-[10px] text-slate-400 font-mono">Submitted {new Date(lead.createdAt).toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Status:</span>
                                <select
                                  value={lead.status}
                                  onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any, lead.notes)}
                                  className="bg-white/5 border border-white/10 rounded-xl px-2 py-0.5 text-[10px] text-slate-300 focus:outline-none"
                                >
                                  <option value="unread">Unread</option>
                                  <option value="read">Mark Read</option>
                                  <option value="replied">Mark Replied</option>
                                  <option value="archived">Archive Lead</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs mb-4">
                              <div>
                                <span className="text-[9px] text-slate-400 uppercase">Contact Email</span>
                                <p className="text-slate-300 font-mono">{lead.email}</p>
                              </div>
                              <div>
                                <span className="text-[9px] text-slate-400 uppercase">Phone</span>
                                <p className="text-slate-300 font-mono">{lead.phone || "Not specified"}</p>
                              </div>
                              <div>
                                <span className="text-[9px] text-slate-400 uppercase">Target Service Scope</span>
                                <p className="text-blue-400 font-semibold">{lead.service}</p>
                              </div>
                            </div>

                            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-slate-300 leading-relaxed mb-4">
                              <span className="text-[9px] text-slate-400 uppercase block mb-1">Message Content</span>
                              {lead.message}
                            </div>

                            {/* Internal Follow up notes */}
                            <div className="space-y-1">
                              <label className="text-[9px] text-slate-400 uppercase block font-semibold">CRM Architectural Notes</label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  defaultValue={lead.notes || ""}
                                  onBlur={(e) => handleUpdateLeadStatus(lead.id, lead.status, e.target.value)}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-blue-400"
                                  placeholder="Add notes (e.g. Quotation shared. Scheduled callback next Tuesday.)"
                                />
                                <button className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-slate-300 hover:bg-white/10 cursor-pointer">Save</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SUB PANEL 5: REDIRECTS MANAGER */}
                  {activeAdminSubTab === "redirects" && (
                    <div className="space-y-6 animate-fade-in" id="redirects-manager-panel">
                      <div className="pb-4 border-b border-white/10">
                        <h2 className="text-xl font-bold text-white tracking-wide">301 / 302 Link Redirect Rules</h2>
                        <p className="text-xs text-slate-400">Manage route canonical links to prevent 404 indexing flags.</p>
                      </div>

                      {/* Add rule form */}
                      <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] shadow-md">
                        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4">Create New Redirect Rule</h3>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const from = (form.elements.namedItem("fromPath") as HTMLInputElement).value;
                            const to = (form.elements.namedItem("toPath") as HTMLInputElement).value;
                            const code = parseInt((form.elements.namedItem("statusCode") as HTMLSelectElement).value);
                            handleCreateRedirect(from, to, code);
                            form.reset();
                          }}
                          className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end"
                        >
                          <div>
                            <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">Old Request URL</label>
                            <input
                              type="text"
                              name="fromPath"
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
                              placeholder="/old-services"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">Destination URL</label>
                            <input
                              type="text"
                              name="toPath"
                              required
                              className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
                              placeholder="/services"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">Status Code</label>
                            <select
                              name="statusCode"
                              className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none"
                            >
                              <option value="301">301 Permanent Redirect</option>
                              <option value="302">302 Temporary Redirect</option>
                            </select>
                          </div>
                          <button
                            type="submit"
                            className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer"
                          >
                            Activate Rule
                          </button>
                        </form>
                      </div>

                      {/* Rule table list */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase">Active Redirect Rules Map ({redirects.length})</h4>
                        <div className="border border-white/10 rounded-[32px] overflow-hidden bg-white/5 shadow-lg">
                          <table className="w-full text-left text-xs text-slate-300">
                            <thead className="bg-white/5 text-slate-200 uppercase tracking-wider font-mono text-[9px] border-b border-white/10">
                              <tr>
                                <th className="p-4">Origin Path</th>
                                <th className="p-4">Destination</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Hits Indexed</th>
                                <th className="p-4 text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {redirects.map((rule) => (
                                <tr key={rule.id} className="border-b border-white/5 hover:bg-white/10">
                                  <td className="p-4 font-mono text-blue-400">{rule.fromPath}</td>
                                  <td className="p-4 font-mono text-slate-200">{rule.toPath}</td>
                                  <td className="p-4 font-mono font-semibold">{rule.statusCode}</td>
                                  <td className="p-4 font-mono">{rule.hits} redirections</td>
                                  <td className="p-4 text-right">
                                    <button
                                      onClick={() => handleDeleteRedirect(rule.id)}
                                      className="p-1.5 text-slate-500 hover:text-red-400 rounded-full hover:bg-white/10"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* SUB PANEL 6: GENERAL CONFIGS & SETTINGS */}
                  {activeAdminSubTab === "settings" && (
                    <div className="space-y-6 animate-fade-in" id="settings-manager-panel">
                      <div className="pb-4 border-b border-white/10">
                        <h2 className="text-xl font-bold text-white tracking-wide">CMS Settings Panel</h2>
                        <p className="text-xs text-slate-400">Configure role permissions, secure cookies, and sitemaps.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-4 shadow-md">
                          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Active Role Permissions</h3>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-mono">Set Active CMS Identity</label>
                              <select
                                value={userRole}
                                onChange={(e) => {
                                  setUserRole(e.target.value as any);
                                  logActivity(`Changed identity to ${e.target.value}`);
                                }}
                                className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none w-full"
                              >
                                <option value="Admin">Admin (Full write capabilities)</option>
                                <option value="Editor">Editor (Edit posts only)</option>
                                <option value="Author">Author (Submit drafts only)</option>
                              </select>
                            </div>
                            <div className="text-xs text-slate-400 leading-relaxed space-y-1.5 font-mono text-[10px]">
                              <p>• <strong>Admin</strong> has direct DB writing, media pruning, and redirect control.</p>
                              <p>• <strong>Editor</strong> can adjust existing blocks, generate alt attributes, and use Gemini.</p>
                              <p>• <strong>Author</strong> submits text draft revisions for evaluation checks.</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-4 shadow-md">
                          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Two Factor Authentication (2FA)</h3>
                          <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                            <div className="flex justify-between items-center bg-white/5 border border-white/10 p-2.5 rounded-xl">
                              <span>Security status:</span>
                              <span className="text-emerald-400 font-bold">● ACTIVE & SECURE</span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-mono">
                              Authentication sequences automatically route through 16-bit authenticator nodes, protecting Metazivo's published logs from automated bruteforce campaigns.
                            </p>
                          </div>
                        </div>

                        <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-4 shadow-md col-span-1 md:col-span-2">
                          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Update Agency Contact Information</h3>
                          <form onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.currentTarget;
                            const formData = new FormData(form);
                            const updated = {
                              phone: formData.get("phone") as string,
                              email: formData.get("email") as string,
                              address: formData.get("address") as string,
                            };
                            try {
                              const res = await fetch("/api/contact", {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(updated),
                              });
                              if (res.ok) {
                                loadAllData();
                                logActivity("Updated contact info");
                                alert("Contact information updated successfully!");
                              }
                            } catch (err) {
                              console.error(err);
                            }
                          }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-mono">Phone Number</label>
                              <input
                                type="text"
                                name="phone"
                                defaultValue={contactInfo?.phone || "+92 328 8518557"}
                                className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none w-full"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-mono">Email Address</label>
                              <input
                                type="email"
                                name="email"
                                defaultValue={contactInfo?.email || "mai@metazivo.com"}
                                className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none w-full"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-mono">HQ Address</label>
                              <input
                                type="text"
                                name="address"
                                defaultValue={contactInfo?.address || "Islamabad / Lahore, PK"}
                                className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none w-full"
                                required
                              />
                            </div>
                            <div className="md:col-span-3 flex justify-end">
                              <button
                                type="submit"
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer"
                              >
                                Save Contact Info
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>

                    </div>
                  )}

                  {activeAdminSubTab === "pages" && (
                    <PagesPanel
                      pages={pages}
                      onReload={loadAllData}
                      onLog={logActivity}
                    />
                  )}

                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* -----------------------------------------------------------------------------
          MEDIA SELECTOR MODAL (FOR POST EDITOR)
          ----------------------------------------------------------------------------- */}
      {showMediaSelectorForEditor && (
        <div className="fixed inset-0 z-[60] bg-[#020617]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-[#020617]/90 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">Select Cover Image</h3>
              <button
                onClick={() => setShowMediaSelectorForEditor(null)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Close Library
              </button>
            </div>
            <MediaLibrary
              assets={mediaAssets}
              onUpload={handleUploadAsset}
              onDelete={handleDeleteAsset}
              onSelectAsset={(url) => {
                showMediaSelectorForEditor(url);
                setShowMediaSelectorForEditor(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Premium Floating WhatsApp Action Button */}
      <a
        href={getWhatsAppLink("home")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] hover:bg-[#20ba5a] transition-all hover:scale-110 active:scale-95 group cursor-pointer"
        title="Chat with us on WhatsApp"
        id="whatsapp-floating-button"
      >
        {/* Breathing Ring Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none group-hover:opacity-0 transition-opacity" />
        
        {/* Official Premium SVG WhatsApp Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 448 512" 
          className="w-6 h-6 fill-current relative z-10"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>

        {/* Premium Tooltip */}
        <span className="absolute right-16 bg-slate-900 text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap border border-slate-800">
          Chat on WhatsApp
        </span>
      </a>

    </div>
  );
}
