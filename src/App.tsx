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
import { servicesData, pricingPlans, portfolioItems, workProcessTimeline, faqList, testimonials, trustedCompanies } from "./data";
import { BlogPost, MediaAsset, ContactEnquiry, RedirectRule, ActivityLog, AnalyticsSummary } from "./types";

export default function App() {
  // Navigation Routing States
  const [currentTab, setCurrentTab] = useState<string>("home"); // home, about, services, portfolio, blog, pricing, contact, privacy, terms, service-detail, blog-detail
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>("");
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>("");

  // Server data states
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [leads, setLeads] = useState<ContactEnquiry[]>([]);
  const [redirects, setRedirects] = useState<RedirectRule[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

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
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<"analytics" | "blogs" | "media" | "leads" | "redirects" | "settings">("analytics");

  // Post Editor Workspaces
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost>>({});
  const [showMediaSelectorForEditor, setShowMediaSelectorForEditor] = useState<((url: string) => void) | null>(null);

  // Load Initial Full-Stack API Data
  const loadAllData = async () => {
    try {
      const [blogsRes, mediaRes, leadsRes, redirectsRes, analyticsRes] = await Promise.all([
        fetch("/api/posts"),
        fetch("/api/media"),
        fetch("/api/leads"),
        fetch("/api/redirects"),
        fetch("/api/analytics")
      ]);

      if (blogsRes.ok) setBlogs(await blogsRes.json());
      if (mediaRes.ok) setMediaAssets(await mediaRes.json());
      if (leadsRes.ok) setLeads(await leadsRes.json());
      if (redirectsRes.ok) setRedirects(await redirectsRes.json());
      if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
    } catch (err) {
      console.error("Failed to sync metrics from server node", err);
    }
  };

  useEffect(() => {
    loadAllData();
    // Record page view on startup
    fetch("/api/analytics/hit", { method: "POST" }).catch(() => {});
  }, []);

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

    if (usernameInput.trim() === "admin" && passwordInput.trim() === "admin") {
      setLoginStep("tfa"); // Simulated Two Factor Authentication
    } else {
      setAuthError("Incorrect Username or Password. Try admin / admin for the preview!");
    }
  };

  const handleTfaVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (tfaCode === "123456" || tfaCode.trim().length === 6) {
      setIsAuthenticated(true);
      logActivity("Logged into Administrative Portal");
      loadAllData();
    } else {
      setAuthError("Incorrect 2FA authenticator token. Enter 123456 or any 6 digit code.");
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

  // Find detailed objects for views
  const activeService = servicesData.find((s) => s.slug === selectedServiceSlug);
  const activeBlog = blogs.find((b) => b.slug === selectedBlogSlug);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200 relative overflow-hidden">
      
      {/* Decorative Background Glow Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px]"></div>
      </div>
      
      {/* Upper Navigation bar */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main page router viewport */}
      <main className="flex-grow relative z-10">
        
        {/* VIEW 1: HOME PAGE */}
        {currentTab === "home" && (
          <div id="view-home" className="space-y-20 pb-20 animate-fade-in">
            {/* Sticky/Hero Banner */}
            <section className="relative overflow-hidden pt-24 pb-20 px-4" id="section-hero">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.15),transparent_60%)] pointer-events-none" />
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-blue-400 font-mono tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Grow Your Footprint Digitally
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight font-sans">
                    Grow Your Business with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Powerful Solutions</span>
                  </h1>
                  <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed">
                    Metazivo is a full-service, modern digital agency helping brands command Google visibility, scale paid ad funnels, and deploy optimized React/Node architectures.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <button
                      onClick={() => handleNavigate("contact")}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Inquire Project Scope</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleNavigate("services")}
                      className="px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 rounded-full text-sm font-semibold transition-all"
                    >
                      Explore Agency Services
                    </button>
                  </div>
                </div>

                {/* Simulated Glassmorphism Card showcasing Speed & CMS status */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-30 animate-pulse" />
                  <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] p-6 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">metazivo_performance_audit.json</span>
                    </div>
                    <div className="space-y-4 text-xs font-mono">
                      <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-lg border border-white/10">
                        <span className="text-slate-300">Google PageSpeed score:</span>
                        <span className="text-emerald-400 font-bold">99 / 100 (A+)</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-lg border border-white/10">
                        <span className="text-slate-300">First Contentful Paint:</span>
                        <span className="text-emerald-400">0.2s</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-lg border border-white/10">
                        <span className="text-slate-300">AI SEO Assistant nodes:</span>
                        <span className="text-blue-400">Gemini 3.5 Active</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-lg border border-white/10">
                        <span className="text-slate-300">Hosting Environment:</span>
                        <span className="text-purple-400">Node.js Hostinger LTS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Trusted Companies Panel */}
            <section className="w-full bg-white/5 backdrop-blur-sm py-8 border-y border-white/5">
              <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16 text-slate-400 text-xs font-mono font-bold tracking-widest uppercase">
                {trustedCompanies.map((tc, index) => (
                  <span key={index} className="hover:text-slate-200 transition-colors">{tc}</span>
                ))}
              </div>
            </section>

            {/* About brief Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="section-about-brief">
              <div className="space-y-6">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Company Strategy</span>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">The Metazivo Philosophy: High Speed, Deep SEO, Proven Conversion</h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Too many digital agencies deploy heavy WordPress installations loaded with templates, ruining your PageSpeed and losing leads before the page even loads. Metazivo designs custom, clean code environments utilizing modern layouts, structured Schema.org markups, and dedicated conversion elements to ensure organic traffic spikes immediately.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <span className="block text-xl sm:text-2xl font-bold text-white">99%</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400">PageSpeed Guarantee</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <span className="block text-xl sm:text-2xl font-bold text-white">+300%</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400">Organic Visibility</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <span className="block text-xl sm:text-2xl font-bold text-white">4.8x</span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400">Ad Campaign ROAS</span>
                  </div>
                </div>
                <button onClick={() => handleNavigate("about")} className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
                  <span>Learn More About Our Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Decorative grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col gap-2">
                  <Code className="w-8 h-8 text-blue-400" />
                  <h3 className="text-sm font-bold text-white">Clean Coding</h3>
                  <p className="text-[11px] text-slate-400">We write structured, lightweight React and Node setups.</p>
                </div>
                <div className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col gap-2">
                  <Search className="w-8 h-8 text-indigo-400" />
                  <h3 className="text-sm font-bold text-white">Advanced SEO</h3>
                  <p className="text-[11px] text-slate-400">Automatic schema.org structures and meta keywords indexing.</p>
                </div>
                <div className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col gap-2">
                  <TrendingUp className="w-8 h-8 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Lead Funnels</h3>
                  <p className="text-[11px] text-slate-400">High friction landing page forms to capture rich prospects.</p>
                </div>
                <div className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col gap-2">
                  <Palette className="w-8 h-8 text-pink-400" />
                  <h3 className="text-sm font-bold text-white">Luxury Brandings</h3>
                  <p className="text-[11px] text-slate-400">Timeless graphic outlines and beautiful typography matching.</p>
                </div>
              </div>
            </section>

            {/* Core Services Section */}
            <section className="bg-white/5 backdrop-blur-sm py-16 border-y border-white/5" id="section-services">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-3">
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Solutions Portfolio</span>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">Enterprise Scaling Services</h2>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">Explore Metazivo's core agencies specializations designed to capture and monetize digital traffic.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {servicesData.map((srv) => {
                    const iconMap: { [key: string]: any } = { Code, Layout, ShoppingBag, Search, TrendingUp, Palette };
                    const IconComp = iconMap[srv.icon] || Code;
                    return (
                      <div key={srv.id} className="p-6 bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/50 rounded-2xl transition-all hover:translate-y-[-4px] shadow-lg" id={`service-card-${srv.slug}`}>
                        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4 text-blue-400">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-white mb-2">{srv.title}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">{srv.description}</p>
                        <button
                          onClick={() => handleOpenService(srv.slug)}
                          className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>Detailed Case Studies</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Strategic Work Process */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="section-process">
              <div className="text-center space-y-3">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Performance Blueprints</span>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Our Structured Work Process</h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">We eliminate guesswork. Here is our step-by-step pipeline to scale and protect your company's sales.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {workProcessTimeline.map((wp, idx) => (
                  <div key={idx} className="relative p-5 bg-white/5 border border-white/10 rounded-xl space-y-3 shadow-md" id={`process-step-${wp.step}`}>
                    <span className="text-3xl font-extrabold text-blue-400/20 block font-mono">{wp.step}</span>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">{wp.title}</h3>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{wp.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Portfolio briefing Bento Grid */}
            <section className="bg-white/5 backdrop-blur-sm py-16 border-y border-white/5" id="section-portfolio-brief">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Case Records</span>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">Our Proven Works</h2>
                  </div>
                  <button onClick={() => handleNavigate("portfolio")} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-md">
                    View Complete Case Portfolio
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolioItems.slice(0, 2).map((item) => (
                    <div key={item.id} className="group relative rounded-[32px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all hover:border-white/20">
                      <div className="aspect-video w-full overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                      </div>
                      <div className="p-5 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-blue-400 font-mono">{item.metrics}</span>
                          <span className="text-slate-400">{item.category}</span>
                        </div>
                        <h3 className="text-base font-bold text-white">{item.title}</h3>
                        <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Pricing Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="section-pricing-brief">
              <div className="text-center space-y-3">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Investment Outlines</span>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Clear, Actionable Investment Plans</h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">No opaque rates. Select a certified roadmap to scale your brand with Metazivo.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-6 rounded-[32px] border flex flex-col justify-between backdrop-blur-md transition-all hover:translate-y-[-4px] ${
                      plan.popular
                        ? "bg-white/10 border-blue-500/50 shadow-[0_0_25px_rgba(37,99,235,0.15)] relative scale-102"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute top-3 right-4 bg-blue-600 text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]">
                        Recommended
                      </span>
                    )}
                    <div className="space-y-4">
                      <h3 className="text-base font-bold text-white">{plan.name}</h3>
                      <p className="text-xs text-slate-300">{plan.description}</p>
                      <div className="flex items-baseline gap-1 py-2 border-y border-white/10">
                        <span className="text-3xl font-bold text-white">{plan.price}</span>
                        {plan.period !== "one-time" && <span className="text-xs text-slate-500">/{plan.period}</span>}
                      </div>
                      <ul className="space-y-2.5 text-xs text-slate-300">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex gap-2 items-center">
                            <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => handleNavigate("contact")}
                      className={`w-full mt-6 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                        plan.popular
                          ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                          : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section className="bg-white/5 backdrop-blur-sm py-16 border-y border-white/5" id="section-testimonials">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-3">
                  <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Client Reviews</span>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">Endorsed by Top-Tier Brands</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testimonials.map((t) => (
                    <div key={t.id} className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col justify-between shadow-lg">
                      <p className="text-xs text-slate-300 leading-relaxed italic">"{t.text}"</p>
                      <div className="flex items-center gap-3 mt-6">
                        <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                        <div>
                          <h4 className="text-xs font-bold text-white">{t.name}</h4>
                          <span className="text-[10px] text-slate-500 block">{t.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Inbound lead & detailed map Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="section-leads-contact">
              <div className="space-y-6">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Instant Booking</span>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">Let's Blueprint Your Next Growth Target</h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Have questions about custom database configurations, technical SEO, API deployments, or Google Ads scaling parameters? Fill out our brief interactive scope catalog and one of our Principal Engineers will schedule a free 30-minute growth call.
                </p>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3 font-mono text-xs shadow-md">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Official Email:</span>
                    <a href="mailto:mai@metazivo.com" className="text-blue-400 hover:underline">mai@metazivo.com</a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Engineering Hotline:</span>
                    <a href="tel:+923288518557" className="text-blue-400 hover:underline">+92 328 8518557</a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">HQ Coordinate:</span>
                    <span className="text-slate-300">Islamabad / Lahore, PK</span>
                  </div>
                </div>
              </div>

              <div>
                <ContactForm />
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: ABOUT PAGE */}
        {currentTab === "about" && (
          <div id="view-about" className="max-w-4xl mx-auto px-4 py-16 space-y-12 animate-fade-in">
            <button onClick={() => handleNavigate("home")} className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </button>
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">About Metazivo</span>
              <h1 className="text-4xl font-extrabold text-white">Full-Service Digital Growth Engineering</h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Founded with a vision to eliminate slow page speeds and template bloat from modern e-commerce and business marketing, Metazivo serves clients globally. We are an agency of designers, software engineers, search engine optimizers, and copywriters specializing in high conversion.
              </p>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] grid grid-cols-1 md:grid-cols-3 gap-6 text-center shadow-lg">
              <div>
                <span className="block text-3xl font-bold text-white">100%</span>
                <span className="text-xs text-slate-400 block mt-1">LTS Code Standards</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white">14+</span>
                <span className="text-xs text-slate-400 block mt-1">Active Global Accounts</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white">0.3s</span>
                <span className="text-xs text-slate-400 block mt-1">Average Load Speed</span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Corporate Leadership</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 shadow-md">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Mehar Ali Hassan" className="w-12 h-12 rounded-full object-cover border border-white/10" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Mehar Ali Hassan</h3>
                    <span className="text-[11px] text-blue-400 font-mono">Principal Systems Architect</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: SERVICES LIST PAGE */}
        {currentTab === "services" && (
          <div id="view-services" className="max-w-5xl mx-auto px-4 py-16 space-y-12 animate-fade-in">
            <div className="text-center space-y-4">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Full Agency Capabilities</span>
              <h1 className="text-4xl font-extrabold text-white">Enterprise Business Solutions</h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">We construct pristine, search-optimized web architectures, high conversion funnels, and corporate design standards.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicesData.map((srv) => (
                <div key={srv.id} className="p-6 bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/50 rounded-[32px] transition-all shadow-lg" id={`services-list-${srv.slug}`}>
                  <h3 className="text-lg font-bold text-white mb-2">{srv.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{srv.description}</p>
                  <button
                    onClick={() => handleOpenService(srv.slug)}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1.5"
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
          <div id="view-service-detail" className="max-w-4xl mx-auto px-4 py-16 space-y-10 animate-fade-in">
            <button onClick={() => handleNavigate("services")} className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Services
            </button>

            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Agency Solutions</span>
              <h1 className="text-4xl font-extrabold text-white">{activeService.title}</h1>
              <p className="text-sm text-slate-300 leading-relaxed">{activeService.longDescription}</p>
            </div>

            {/* Benefits box */}
            <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] space-y-4 shadow-lg">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Primary Optimization Benefits</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {activeService.benefits.map((b, idx) => (
                  <li key={idx} className="flex gap-2 items-center">
                    <Check className="w-3.5 h-3.5 text-blue-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specific Process Timeline */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Implementation Lifecycle</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {activeService.process.map((step, idx) => (
                  <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-1.5 shadow-md">
                    <span className="text-blue-400 text-xs font-mono font-bold">Phase 0{idx + 1}</span>
                    <h4 className="text-xs font-semibold text-slate-200">{step}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick custom callback action */}
            <div className="bg-gradient-to-tr from-blue-900/10 to-purple-900/10 p-6 border border-white/10 rounded-[32px] flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xl backdrop-blur-md">
              <div className="text-center sm:text-left">
                <h4 className="text-sm font-bold text-white">Need custom implementation?</h4>
                <p className="text-xs text-slate-400 mt-0.5">Let's plan your exact architecture requirements today.</p>
              </div>
              <button onClick={() => handleNavigate("contact")} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-semibold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer">
                Request Service Blueprint
              </button>
            </div>
          </div>
        )}

        {/* VIEW 5: PORTFOLIO LIST PAGE */}
        {currentTab === "portfolio" && (
          <div id="view-portfolio" className="max-w-5xl mx-auto px-4 py-16 space-y-12 animate-fade-in">
            <div className="text-center space-y-4">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Case Catalog</span>
              <h1 className="text-4xl font-extrabold text-white">Recent Success Stories</h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">We systematically design digital performance. Review the actual metrics of completed agency assets.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioItems.map((item) => (
                <div key={item.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] overflow-hidden shadow-lg">
                  <div className="aspect-video w-full overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="px-2.5 py-0.5 bg-white/5 text-blue-400 border border-white/10 rounded-full font-mono font-semibold">{item.metrics}</span>
                      <span className="text-slate-400">{item.category}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 6: BLOG POST INDEX LIST */}
        {currentTab === "blog" && (
          <div id="view-blog" className="max-w-5xl mx-auto px-4 py-16 space-y-12 animate-fade-in">
            <div className="text-center space-y-4">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Grow Knowledge</span>
              <h1 className="text-4xl font-extrabold text-white">SEO, Ads, and Speed Playbooks</h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">Read specialized tutorials compiled by Mehar Ali Hassan to audit and accelerate organic conversion channels.</p>
            </div>

            {/* List active published posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.filter(b => b.status === "published").map((post) => (
                <div key={post.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] overflow-hidden hover:border-white/20 transition-all flex flex-col justify-between" id={`blog-card-${post.slug}`}>
                  <div>
                    <div className="aspect-video w-full overflow-hidden relative">
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                      {post.sticky && (
                        <span className="absolute top-3 left-3 bg-blue-600 text-white text-[9px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full">
                          Sticky Post
                        </span>
                      )}
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex gap-4 items-center text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(post.publishDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        </span>
                        <span>•</span>
                        <span>{post.readingTime} min read</span>
                      </div>
                      <h3 className="text-base font-bold text-white hover:text-blue-400 transition-colors cursor-pointer" onClick={() => handleOpenBlog(post.slug)}>
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{post.excerpt}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex justify-between items-center border-t border-white/10 mt-4">
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">{post.categories?.[0] || "SEO"}</span>
                    <button
                      onClick={() => handleOpenBlog(post.slug)}
                      className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
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
          <article id="view-blog-detail" className="max-w-3xl mx-auto px-4 py-16 space-y-8 animate-fade-in">
            <button onClick={() => handleNavigate("blog")} className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog List
            </button>

            <header className="space-y-4">
              <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                <span>{activeBlog.categories?.join(" / ")}</span>
                <span>•</span>
                <span>{activeBlog.readingTime} Min Read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                {activeBlog.title}
              </h1>

              {/* Author Row */}
              <div className="flex items-center gap-3 py-3 border-y border-white/10">
                <img src={activeBlog.author?.avatar} alt={activeBlog.author?.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                <div>
                  <span className="block text-xs font-bold text-white">{activeBlog.author?.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Published on {new Date(activeBlog.publishDate).toLocaleDateString()}</span>
                </div>
              </div>
            </header>

            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10">
              <img src={activeBlog.featuredImage} alt={activeBlog.title} className="w-full h-full object-cover" />
            </div>

            {/* Blog Post Content Body */}
            <div
              className="prose prose-invert prose-indigo max-w-none text-slate-300 text-sm leading-relaxed space-y-6"
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
          <div id="view-pricing" className="max-w-5xl mx-auto px-4 py-16 space-y-12 animate-fade-in">
            <div className="text-center space-y-4">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Corporate Rates</span>
              <h1 className="text-4xl font-extrabold text-white">Scale With Custom Retainers</h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">Deploy specialized design, speed hardeners, and advertising budgets tailored directly for your scope.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <div key={plan.id} className="bg-white/5 border border-white/10 p-6 rounded-[32px] flex flex-col justify-between shadow-lg backdrop-blur-md transition-all hover:translate-y-[-4px]">
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-white">{plan.name}</h3>
                    <span className="text-3xl font-extrabold text-blue-400 block">{plan.price}</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{plan.description}</p>
                    <ul className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-slate-300">
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex gap-2 items-center">
                          <Check className="w-3.5 h-3.5 text-blue-400" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={() => handleNavigate("contact")} className="w-full mt-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 rounded-full text-xs font-semibold transition-all">
                    Request custom quote
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 9: CONTACT PAGE & CALLBACKS */}
        {currentTab === "contact" && (
          <div id="view-contact" className="max-w-4xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-fade-in">
            <div className="space-y-6">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Connect with Us</span>
              <h1 className="text-4xl font-extrabold text-white">Let's Discuss Your Project</h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We design fully responsive speed-hardened portfolios, optimize WordPress theme pipelines, and drive conversion metrics. Call us or send an email directly to set up your principal consultation.
              </p>
              <div className="space-y-4 font-mono text-xs text-slate-300">
                <div className="flex gap-2 items-center">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>+92 328 8518557</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>mai@metazivo.com</span>
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
          <div id="view-privacy" className="max-w-3xl mx-auto px-6 py-10 bg-white/5 border border-white/10 rounded-[32px] space-y-6 text-xs text-slate-300 leading-relaxed animate-fade-in font-sans shadow-lg my-16">
            <h1 className="text-2xl font-bold text-white mb-2">Privacy Policy & GDPR Compliance</h1>
            <p>At Metazivo Digital Agency, accessible from https://metazivo.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Metazivo and how we use it.</p>
            <h2 className="text-base font-bold text-slate-200 mt-4">1. Data Collection & Cookie Logs</h2>
            <p>Like any other website, Metazivo uses 'cookies' to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
            <h2 className="text-base font-bold text-slate-200 mt-4">2. DoubleClick DART Cookies</h2>
            <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.</p>
          </div>
        )}

        {/* VIEW 11: TERMS COMPLIANCE */}
        {currentTab === "terms" && (
          <div id="view-terms" className="max-w-3xl mx-auto px-6 py-10 bg-white/5 border border-white/10 rounded-[32px] space-y-6 text-xs text-slate-300 leading-relaxed animate-fade-in font-sans shadow-lg my-16">
            <h1 className="text-2xl font-bold text-white mb-2">Terms & Conditions</h1>
            <p>Welcome to Metazivo! These terms and conditions outline the rules and regulations for the use of Metazivo's Website, located at https://metazivo.com.</p>
            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Metazivo if you do not agree to take all of the terms and conditions stated on this page.</p>
            <h2 className="text-base font-bold text-slate-200 mt-4">1. Intellectual Property Rights</h2>
            <p>Unless otherwise stated, Metazivo and/or its licensors own the intellectual property rights for all material on Metazivo. All intellectual property rights are reserved. You may access this from Metazivo for your own personal use subjected to restrictions set in these terms and conditions.</p>
          </div>
        )}

      </main>

      {/* FOOTER SECTION */}
      <Footer onNavigate={handleNavigate} />

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
                            placeholder="Type 'admin'"
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
                            placeholder="Type 'admin'"
                          />
                        </div>
                      </div>

                      <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] text-slate-400 leading-relaxed font-mono">
                        💡 <strong>Sandbox Hint:</strong> Access CMS immediately with credentials: <span className="text-blue-400 font-bold">admin</span> / <span className="text-blue-400 font-bold">admin</span>.
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
                          placeholder="e.g. 123456"
                        />
                      </div>

                      <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-[10px] text-slate-400 text-center font-mono">
                        💡 Enter <span className="text-blue-400 font-bold">123456</span> or any 6-digit value to bypass.
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
                      </div>

                    </div>
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

    </div>
  );
}
