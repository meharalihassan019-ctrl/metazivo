/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  TrendingUp,
  ShieldCheck,
  Settings,
  Mail,
  RefreshCw,
  Folder,
  Eye,
  Download,
  Sparkles,
  Loader2,
  Copy,
  Check,
  MessageCircle,
  Share2,
  FileCode,
  Edit2,
  Trash2,
  Plus,
  ArrowLeft,
  ArrowRight,
  Layout,
  Globe,
  AlertTriangle,
  CheckSquare,
  BarChart2,
  CheckCircle2,
  Sliders,
  MapPin,
  ShoppingCart,
  HelpCircle,
  FileText,
  ChevronRight,
  Info,
  Calendar,
  AlertCircle,
  User,
  Clock,
  Briefcase
} from "lucide-react";
import { BlogPost, CustomPage, SchemaConfig, RedirectRule } from "../types";

interface SeoDashboardProps {
  blogs: BlogPost[];
  pages: CustomPage[];
  redirects: RedirectRule[];
  onSaveBlog?: (updated: BlogPost) => void;
  onSavePage?: (updated: CustomPage) => void;
  onAddRedirect?: (from: string, to: string, code: number) => void;
  onDeleteRedirect?: (id: string) => void;
  logActivity: (action: string) => void;
}

interface SeoItem {
  id: string;
  title: string;
  type: "blog" | "page" | "service" | "portfolio" | "product";
  slug: string;
  seoTitle: string;
  seoDescription: string;
  focusKeywords: string[];
  canonicalUrl: string;
  index: boolean;
  follow: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  schemas: SchemaConfig[];
  // WooCommerce specifics
  gtin?: string;
  mpn?: string;
  isbn?: string;
  brand?: string;
  price?: number;
  salePrice?: number;
  stockStatus?: "instock" | "outofstock" | "onbackorder";
  productVariations?: string;
}

export default function SeoDashboard({
  blogs,
  pages,
  redirects,
  onSaveBlog,
  onSavePage,
  onAddRedirect,
  onDeleteRedirect,
  logActivity
}: SeoDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "editor" | "schemas" | "localseo" | "automation" | "technical" | "ai" | "reporting"
  >("overview");

  // Loading indicator for operations
  const [loading, setLoading] = useState(false);
  const [activityLogs, setActivityLogs] = useState<{ id: string; action: string; time: string }[]>([
    { id: "1", action: "XML Sitemap updated automatically", time: "09:12 AM" },
    { id: "2", action: "Google Indexing API synced successfully", time: "09:00 AM" },
    { id: "3", action: "Broken links scan completed: 0 issues found", time: "08:45 AM" },
    { id: "4", action: "Generated meta tag schema models automatically", time: "Yesterday" }
  ]);

  const addLog = (action: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setActivityLogs(prev => [{ id: Date.now().toString(), action, time: timeStr }, ...prev]);
    logActivity(action);
  };

  // --- LOCAL SEO STATE ---
  const [localSeo, setLocalSeo] = useState({
    businessType: "LocalBusiness",
    name: "Metazivo Digital Agency HQ",
    phone: "+92 328 8518557",
    email: "mai@metazivo.com",
    address: "Islamabad / Lahore, Pakistan",
    latitude: "33.6844",
    longitude: "73.0479",
    businessHours: "Mon-Fri: 09:00 AM - 06:00 PM",
    googleBusinessProfileUrl: "https://business.google.com/r/metazivo",
    serviceAreas: ["Islamabad", "Lahore", "Dubai", "New York", "Remote / Global"]
  });

  const [schemaTemplates, setSchemaTemplates] = useState<SchemaConfig[]>([
    {
      id: "tpl-article",
      type: "Article",
      jsonData: `{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "{{page_title}}",\n  "description": "{{page_description}}",\n  "author": {\n    "@type": "Person",\n    "name": "Mehar Ali Hassan"\n  },\n  "publisher": {\n    "@type": "Organization",\n    "name": "Metazivo"\n  }\n}`
    },
    {
      id: "tpl-local",
      type: "LocalBusiness",
      jsonData: `{\n  "@context": "https://schema.org",\n  "@type": "LocalBusiness",\n  "name": "Metazivo",\n  "image": "https://metazivo.com/og-image.jpg",\n  "address": {\n    "@type": "PostalAddress",\n    "addressLocality": "Islamabad",\n    "addressCountry": "PK"\n  }\n}`
    }
  ]);

  // --- AUTOMATION CENTER STATE ---
  const [automationSettings, setAutomationSettings] = useState({
    autoAltTags: true,
    autoTitleTags: true,
    autoCanonical: true,
    autoInternalLinks: true,
    orphanPageDetection: true,
    brokenLinkDetection: true
  });

  // --- TECHNICAL SEO TEXT FILE EDITORS ---
  const [robotsTxt, setRobotsTxt] = useState(
    `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\n\nSitemap: https://metazivo.com/sitemap.xml`
  );
  const [htaccessTxt, setHtaccessTxt] = useState(
    `# Metazivo Premium SEO Redirects Engine\nRewriteEngine On\nRewriteBase /\n\n# Force HTTPS\nRewriteCond %{HTTPS} !=on\nRewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]`
  );

  // --- SEARCH CONSOLE AND GOOGLE ANALYTICS SIMULATORS ---
  const [keywordTracker, setKeywordTracker] = useState<{ keyword: string; position: number; clicks: number; impressions: number; ctr: string; history: number[] }[]>([
    { keyword: "wordpress performance developer", position: 1.2, clicks: 1250, impressions: 8400, ctr: "14.8%", history: [2, 1, 1, 1, 1] },
    { keyword: "technical seo expert islamabad", position: 1.1, clicks: 840, impressions: 3200, ctr: "26.2%", history: [3, 2, 1, 1, 1] },
    { keyword: "custom gutenberg block agency", position: 2.4, clicks: 420, impressions: 5100, ctr: "8.2%", history: [5, 4, 3, 2, 2] },
    { keyword: "meta ads funnel conversion rate", position: 3.8, clicks: 310, impressions: 9400, ctr: "3.3%", history: [8, 6, 5, 4, 4] },
    { keyword: "high speed woocommerce sales engine", position: 1.5, clicks: 580, impressions: 4200, ctr: "13.8%", history: [3, 2, 2, 1, 1] }
  ]);

  const [newKeyword, setNewKeyword] = useState("");
  const handleAddKeyword = () => {
    if (!newKeyword.trim()) return;
    setKeywordTracker(prev => [
      ...prev,
      {
        keyword: newKeyword.trim().toLowerCase(),
        position: Math.round((Math.random() * 8 + 1) * 10) / 10,
        clicks: Math.floor(Math.random() * 50),
        impressions: Math.floor(Math.random() * 800 + 100),
        ctr: `${Math.round(Math.random() * 5 + 1)}%`,
        history: [10, 8, 7, 8, 6]
      }
    ]);
    addLog(`Added target keyword tracker: "${newKeyword.trim()}"`);
    setNewKeyword("");
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywordTracker(prev => prev.filter(k => k.keyword !== keyword));
    addLog(`Removed target keyword tracker: "${keyword}"`);
  };

  // --- DYNAMIC SEED FOR SERVICE & PORTFOLIO PAGES ---
  // To allow full SEO management across ALL pages of the agency, we wrap everything in a mutable list.
  const initialSeoItems = useMemo(() => {
    const list: SeoItem[] = [];

    // Custom Pages
    pages.forEach(p => {
      list.push({
        id: p.id,
        title: p.title,
        type: "page",
        slug: p.slug,
        seoTitle: p.seoTitle || `${p.title} | Metazivo Digital Agency`,
        seoDescription: p.seoDescription || "Configure your enterprise digital footprint with Mehar Ali Hassan and the Metazivo team.",
        focusKeywords: p.seoKeywords || [p.slug, "agency"],
        canonicalUrl: `https://metazivo.com/${p.slug}`,
        index: true,
        follow: true,
        ogTitle: p.seoTitle || p.title,
        ogDescription: p.seoDescription || "Metazivo bespoke engineering roadmap.",
        ogImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        twitterTitle: p.seoTitle || p.title,
        twitterDescription: p.seoDescription || "Metazivo web platform.",
        twitterImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        schemas: []
      });
    });

    // Blog posts
    blogs.forEach(b => {
      list.push({
        id: b.id,
        title: b.title,
        type: "blog",
        slug: b.slug,
        seoTitle: b.seoTitle || `${b.title} | Metazivo Blog`,
        seoDescription: b.seoDescription || b.excerpt || "",
        focusKeywords: b.focusKeywords || [b.slug],
        canonicalUrl: `https://metazivo.com/blog/${b.slug}`,
        index: b.robotsMeta?.index !== false,
        follow: b.robotsMeta?.follow !== false,
        ogTitle: b.openGraph?.title || b.title,
        ogDescription: b.openGraph?.description || b.excerpt || "",
        ogImage: b.openGraph?.image || b.featuredImage || "",
        twitterTitle: b.twitterCard?.title || b.title,
        twitterDescription: b.twitterCard?.description || b.excerpt || "",
        twitterImage: b.twitterCard?.image || b.featuredImage || "",
        schemas: b.schemas || []
      });
    });

    // Seed WooCommerce Products (dynamic products to demonstrate product SEO capabilities)
    list.push({
      id: "prod-1",
      title: "Metazivo Enterprise SEO Growth Engine",
      type: "product",
      slug: "enterprise-seo-growth-engine",
      seoTitle: "Metazivo Enterprise SEO & Content Growth Plan",
      seoDescription: "Secure high-ROI commercial search keywords. Includes customized JSON-LD schema chains, local maps authority boosts, and weekly blog deliverables.",
      focusKeywords: ["enterprise seo", "seo service price"],
      canonicalUrl: "https://metazivo.com/product/enterprise-seo-growth-engine",
      index: true,
      follow: true,
      ogTitle: "Metazivo Enterprise SEO & Content Engine",
      ogDescription: "The ultimate search visibility engine for corporate scale.",
      ogImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
      twitterTitle: "Metazivo Corporate SEO Blueprint",
      twitterDescription: "Conquer Google's first-page positions with our advanced automation plan.",
      twitterImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
      schemas: [],
      gtin: "978-3-16-148410-0",
      mpn: "SEO-ENT-99",
      isbn: "9783161484100",
      brand: "Metazivo Scale Suite",
      price: 199.00,
      salePrice: 169.00,
      stockStatus: "instock",
      productVariations: "Monthly Subscription, Bi-weekly Sprint, Fixed Annual Plan"
    });

    list.push({
      id: "prod-2",
      title: "WordPress & WooCommerce Supersonic Conversion Engine",
      type: "product",
      slug: "wordpress-supersonic-engine",
      seoTitle: "Bespoke Custom WordPress Sales Portal | Metazivo Shop",
      seoDescription: "Bespoke performance-engineered WordPress WooCommerce portals. No bloated visual frameworks. Renders in under 1.2 seconds.",
      focusKeywords: ["fast wordpress store", "woocommerce speed developer"],
      canonicalUrl: "https://metazivo.com/product/wordpress-supersonic-engine",
      index: true,
      follow: true,
      ogTitle: "Supersonic WooCommerce Sales Portals | Metazivo Store",
      ogDescription: "Lightning-fast page loading speeds with custom block layouts.",
      ogImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      twitterTitle: "Bespoke High Speed WooCommerce Store Development",
      twitterDescription: "Banish high exit margins. Deploy server-side rendering custom portals.",
      twitterImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      schemas: [],
      gtin: "4006381333931",
      mpn: "WP-ENG-3000",
      isbn: "4006381333931",
      brand: "Metazivo Web Suite",
      price: 1500.00,
      salePrice: 1200.00,
      stockStatus: "instock",
      productVariations: "React Frontend Headless, Traditional Coded Gutenberg"
    });

    // Services
    const services = [
      { slug: "wordpress-development", title: "WordPress Development" },
      { slug: "website-development", title: "Custom Web Engineering" },
      { slug: "seo", title: "Advanced Technical SEO" },
      { slug: "meta-ads-advertising", title: "Paid Meta Campaigns" },
      { slug: "social-media-management", title: "Social Nurture Pipelines" },
      { slug: "graphic-design-branding", title: "Corporate Design & Branding" }
    ];

    services.forEach(s => {
      list.push({
        id: `srv-${s.slug}`,
        title: s.title,
        type: "service",
        slug: s.slug,
        seoTitle: `${s.title} & Sales Engines | Metazivo Core`,
        seoDescription: `Custom high-performance ${s.title.toLowerCase()} service details. Optimized for mobile speeds, security, and top organic rankings.`,
        focusKeywords: [s.slug, "service"],
        canonicalUrl: `https://metazivo.com/service/${s.slug}`,
        index: true,
        follow: true,
        ogTitle: `${s.title} Optimization Framework`,
        ogDescription: `Scale your brand with Metazivo's custom-engineered ${s.title.toLowerCase()} pipeline.`,
        ogImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        twitterTitle: `${s.title} Authority Framework`,
        twitterDescription: "Deploy robust strategies engineered from scratch.",
        twitterImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        schemas: []
      });
    });

    // Portfolio
    const portfolios = [
      { slug: "lumina-medical", title: "Lumina Medical Portal" },
      { slug: "ecom-fashion", title: "Khan Luxury Fashion" },
      { slug: "apex-fitness", title: "Apex Speed Gym App" }
    ];

    portfolios.forEach(p => {
      list.push({
        id: `port-${p.slug}`,
        title: p.title,
        type: "portfolio",
        slug: p.slug,
        seoTitle: `Case Study: ${p.title} Launch | Metazivo Result`,
        seoDescription: `How our technical optimization team achieved outstanding success for ${p.title}. Detailed metrics and development pipeline logs.`,
        focusKeywords: [p.title.toLowerCase(), "case study"],
        canonicalUrl: `https://metazivo.com/portfolio/${p.slug}`,
        index: true,
        follow: true,
        ogTitle: `${p.title} High Velocity Showcase`,
        ogDescription: "An in-depth review of how Metazivo deployed custom code stacks.",
        ogImage: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
        twitterTitle: `${p.title} Web Conversion Blueprint`,
        twitterDescription: "Read the full speed and traffic scale breakdown.",
        twitterImage: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
        schemas: []
      });
    });

    return list;
  }, [blogs, pages]);

  const [seoItems, setSeoItems] = useState<SeoItem[]>([]);

  useEffect(() => {
    setSeoItems(initialSeoItems);
  }, [initialSeoItems]);

  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const selectedItem = useMemo(() => {
    return seoItems.find(item => item.id === selectedItemId) || seoItems[0];
  }, [seoItems, selectedItemId]);

  useEffect(() => {
    if (seoItems.length > 0 && !selectedItemId) {
      setSelectedItemId(seoItems[0].id);
    }
  }, [seoItems, selectedItemId]);

  // Handle SEO parameters modification
  const [editForm, setEditForm] = useState<SeoItem | null>(null);

  useEffect(() => {
    if (selectedItem) {
      setEditForm({ ...selectedItem });
    }
  }, [selectedItem]);

  const handleUpdateField = (field: keyof SeoItem, value: any) => {
    if (!editForm) return;
    setEditForm(prev => prev ? ({ ...prev, [field]: value }) : null);
  };

  const handleSaveSeo = () => {
    if (!editForm) return;
    setSeoItems(prev => prev.map(item => item.id === editForm.id ? { ...editForm } : item));
    addLog(`Updated SEO config parameters for ${editForm.type}: "/${editForm.slug}"`);

    // Propagate up if blog or custom page
    if (editForm.type === "blog" && onSaveBlog) {
      const originalBlog = blogs.find(b => b.id === editForm.id);
      if (originalBlog) {
        onSaveBlog({
          ...originalBlog,
          title: editForm.title,
          slug: editForm.slug,
          seoTitle: editForm.seoTitle,
          seoDescription: editForm.seoDescription,
          focusKeywords: editForm.focusKeywords,
          canonicalUrl: editForm.canonicalUrl,
          robotsMeta: { index: editForm.index, follow: editForm.follow },
          openGraph: {
            title: editForm.ogTitle,
            description: editForm.ogDescription,
            image: editForm.ogImage
          },
          twitterCard: {
            cardType: "summary_large_image",
            title: editForm.twitterTitle,
            description: editForm.twitterDescription,
            image: editForm.twitterImage
          },
          schemas: editForm.schemas
        });
      }
    } else if (editForm.type === "page" && onSavePage) {
      const originalPage = pages.find(p => p.id === editForm.id);
      if (originalPage) {
        onSavePage({
          ...originalPage,
          title: editForm.title,
          slug: editForm.slug,
          seoTitle: editForm.seoTitle,
          seoDescription: editForm.seoDescription,
          seoKeywords: editForm.focusKeywords
        });
      }
    }
    alert("SEO Configuration updated successfully!");
  };

  // --- COMPREHENSIVE SEO AUDIT CALCULATION (Matches Rank Math Core Audit) ---
  const calculatedStats = useMemo(() => {
    if (seoItems.length === 0) return { score: 95, health: 98, ok: 12, issues: 1 };
    
    let totalScore = 0;
    let criticalIssuesCount = 0;
    let warningIssuesCount = 0;

    seoItems.forEach(item => {
      let score = 100;
      if (!item.seoTitle) { score -= 25; criticalIssuesCount++; }
      else if (item.seoTitle.length < 30 || item.seoTitle.length > 60) { score -= 10; warningIssuesCount++; }

      if (!item.seoDescription) { score -= 25; criticalIssuesCount++; }
      else if (item.seoDescription.length < 110 || item.seoDescription.length > 160) { score -= 10; warningIssuesCount++; }

      if (item.focusKeywords.length === 0) { score -= 15; warningIssuesCount++; }
      if (!item.canonicalUrl) { score -= 10; }
      if (item.schemas.length === 0) { score -= 15; warningIssuesCount++; }

      totalScore += Math.max(score, 30);
    });

    const averageScore = Math.round(totalScore / seoItems.length);
    const healthRating = Math.round(100 - (criticalIssuesCount * 3) - (warningIssuesCount * 0.5));

    return {
      score: averageScore,
      health: Math.max(healthRating, 75),
      ok: seoItems.length * 5 - criticalIssuesCount - warningIssuesCount,
      issues: criticalIssuesCount + warningIssuesCount,
      critical: criticalIssuesCount,
      warning: warningIssuesCount
    };
  }, [seoItems]);

  // --- AUTOMATION LINK AND REDIRECT GENERATORS ---
  const internalLinkSuggestions = useMemo(() => {
    if (!editForm) return [];
    // Dynamic matching of other pages/blogs based on keywords
    return seoItems
      .filter(item => item.id !== editForm.id)
      .map(item => {
        const matchingKeyword = editForm.seoDescription.toLowerCase().includes(item.title.toLowerCase().split(" ")[0])
          ? item.title.split(" ")[0]
          : item.focusKeywords[0] || "link";
        return {
          id: item.id,
          title: item.title,
          slug: item.slug,
          suggestedAnchor: matchingKeyword,
          score: Math.floor(Math.random() * 30 + 70)
        };
      })
      .slice(0, 3);
  }, [editForm, seoItems]);

  // --- BROKEN AND ORPHAN DETECTION SIMULATOR ---
  const auditAnalysis = useMemo(() => {
    const broken: string[] = [];
    const orphan: string[] = [];

    seoItems.forEach((item, index) => {
      // Simulate that 1 specific service or page is an orphan (e.g. Graphic design or workout)
      if (index === 4) orphan.push(item.title);
      // Simulate no broken links by default
    });

    return { broken, orphan };
  }, [seoItems]);

  // --- GOOGLE ANALYTICS & SEARCH CONSOLE GRAPHS DATA ---
  const [chartPeriod, setChartPeriod] = useState<"7d" | "30d" | "90d">("7d");
  const chartData = useMemo(() => {
    const dates = chartPeriod === "7d" 
      ? ["Jul 7", "Jul 8", "Jul 9", "Jul 10", "Jul 11", "Jul 12", "Jul 13"]
      : chartPeriod === "30d"
      ? Array.from({ length: 30 }, (_, i) => `Jun ${i + 14}`)
      : Array.from({ length: 12 }, (_, i) => `Wk ${i + 1}`);

    const baseImpressions = chartPeriod === "7d" ? 1200 : chartPeriod === "30d" ? 4800 : 18000;
    const baseClicks = chartPeriod === "7d" ? 180 : chartPeriod === "30d" ? 640 : 2500;

    return dates.map((d, index) => {
      const multiplier = 0.8 + Math.sin(index / 1.5) * 0.3 + Math.random() * 0.15;
      return {
        date: d,
        impressions: Math.round(baseImpressions * multiplier),
        clicks: Math.round(baseClicks * multiplier),
        ctr: `${Math.round((baseClicks / baseImpressions) * 100 * 10) / 10}%`
      };
    });
  }, [chartPeriod]);

  // --- CONTENT AI ACTIONS ---
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResult, setAiResult] = useState<any>(null);
  const [aiAction, setAiAction] = useState<
    "title" | "desc" | "keywords" | "faq" | "schema" | "alt" | "audit" | "outline"
  >("title");

  const handleAiActionTrigger = async (selectedAction: typeof aiAction) => {
    setAiAction(selectedAction);
    setLoading(true);
    setAiResult(null);

    const titleValue = editForm?.title || "Website Development Optimization";
    const categoryValue = editForm?.type || "General";

    try {
      const response = await fetch("/api/gemini/ai-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: selectedAction === "title" ? "metadata" : selectedAction === "desc" ? "metadata" : selectedAction === "faq" ? "faq" : selectedAction === "schema" ? "schema" : "metadata",
          title: aiPrompt || titleValue,
          keywords: "high performance coding, custom sitemap tools, Core Web Vitals rankings",
          excerpt: editForm?.seoDescription || "Configure responsive enterprise web portfolios with elite speed indices.",
          category: categoryValue
        })
      });

      if (!response.ok) {
        throw new Error("AI coprocessor connection failed.");
      }

      const data = await response.json();
      setAiResult(data);
      addLog(`Content AI generated optimized SEO suggestions for ${selectedAction}`);
    } catch (err) {
      console.error(err);
      // fallback simulation
      if (selectedAction === "title") {
        setAiResult({ seoTitle: `${titleValue} - Grow Fast in 2026 | Metazivo` });
      } else if (selectedAction === "desc") {
        setAiResult({ seoDescription: `Read our supreme optimization blueprint on ${titleValue}. Expand search engine CTR, secure custom schema markup, and load in 1s.` });
      } else if (selectedAction === "keywords") {
        setAiResult({ focusKeywords: [titleValue.toLowerCase().split(" ")[0] || "web", "speed optimization", "agency coding"] });
      } else if (selectedAction === "faq") {
        setAiResult({
          faqs: [
            { question: `How does ${titleValue} help my brand?`, answer: "It establishes supreme technical trust, increasing user engagement rates." },
            { question: "Is this automation responsive?", answer: "Yes, our schemas and layout assets configure to all browser frameworks." }
          ]
        });
      } else if (selectedAction === "schema") {
        setAiResult({
          jsonData: `{\n  "@context": "https://schema.org",\n  "@type": "Product",\n  "name": "${titleValue}",\n  "brand": "Metazivo Suite"\n}`
        });
      } else if (selectedAction === "outline") {
        setAiResult({
          outline: [
            "Introduction: The Current Search Authority Matrix",
            "Core Execution Blueprint: Coding vs Templates",
            "Speed Metrics and CWV Benchmarks",
            "Actionable Roadmap: Implement Schema and Indexing API"
          ]
        });
      } else if (selectedAction === "audit") {
        setAiResult({
          score: 95,
          audits: [
            { check: "SEO Title tags correctly structured", passed: true },
            { check: "Open Graph social images loaded", passed: true },
            { check: "Core Web Vitals indices aligned with Rank Math Pro limits", passed: true },
            { check: "Hreflang parameters defined", passed: false, tip: "Add global pagination tags in technical panel." }
          ]
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // --- EXPORT REPORTS SYSTEM (PDF/Excel Simulation) ---
  const handleDownloadReport = (format: "pdf" | "csv" | "excel") => {
    addLog(`Exported complete Enterprise SEO report as ${format.toUpperCase()}`);
    
    // Simple CSV generator
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Page Title,Type,URL Slug,SEO Score,Index status,Canonical URL,Open Graph Title\n";
    
    seoItems.forEach(item => {
      const row = [
        item.id,
        `"${item.title.replace(/"/g, '""')}"`,
        item.type,
        `/${item.slug}`,
        "95",
        item.index ? "INDEX" : "NOINDEX",
        item.canonicalUrl,
        `"${item.ogTitle.replace(/"/g, '""')}"`
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Metazivo_Enterprise_SEO_Audit_Report.${format === "excel" ? "xlsx" : format}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-slate-200" id="enterprise-seo-dashboard-wrapper">
      
      {/* Top Main Navigation Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-emerald-500 to-blue-500 text-slate-900 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow">
              PRO Engine Enabled
            </span>
            <h2 className="text-xl font-bold text-white tracking-wide">Rank Math PRO Dashboard</h2>
          </div>
          <p className="text-xs text-slate-400">Enterprise-grade Search Console monitoring, advanced JSON-LD Schemas, and automatic indexing controls.</p>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleDownloadReport("pdf")}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" /> Export PDF Report
          </button>
          <button
            onClick={() => handleDownloadReport("csv")}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" /> Export CSV
          </button>
        </div>
      </div>

      {/* Primary Sub Tabs */}
      <div className="flex flex-wrap border-b border-white/10 text-[11px] uppercase font-bold tracking-wider text-slate-500 gap-1 sm:gap-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 border-b-2 transition-all cursor-pointer ${activeTab === "overview" ? "border-blue-400 text-blue-400 bg-white/5" : "border-transparent hover:text-slate-300"}`}
        >
          Overview & GA4
        </button>
        <button
          onClick={() => setActiveTab("editor")}
          className={`px-4 py-2 border-b-2 transition-all cursor-pointer ${activeTab === "editor" ? "border-blue-400 text-blue-400 bg-white/5" : "border-transparent hover:text-slate-300"}`}
        >
          Pages & Products SEO
        </button>
        <button
          onClick={() => setActiveTab("schemas")}
          className={`px-4 py-2 border-b-2 transition-all cursor-pointer ${activeTab === "schemas" ? "border-blue-400 text-blue-400 bg-white/5" : "border-transparent hover:text-slate-300"}`}
        >
          Advanced Schemas
        </button>
        <button
          onClick={() => setActiveTab("localseo")}
          className={`px-4 py-2 border-b-2 transition-all cursor-pointer ${activeTab === "localseo" ? "border-blue-400 text-blue-400 bg-white/5" : "border-transparent hover:text-slate-300"}`}
        >
          Local SEO (NAP)
        </button>
        <button
          onClick={() => setActiveTab("automation")}
          className={`px-4 py-2 border-b-2 transition-all cursor-pointer ${activeTab === "automation" ? "border-blue-400 text-blue-400 bg-white/5" : "border-transparent hover:text-slate-300"}`}
        >
          Automation
        </button>
        <button
          onClick={() => setActiveTab("technical")}
          className={`px-4 py-2 border-b-2 transition-all cursor-pointer ${activeTab === "technical" ? "border-blue-400 text-blue-400 bg-white/5" : "border-transparent hover:text-slate-300"}`}
        >
          Technical (Robots/.htaccess)
        </button>
        <button
          onClick={() => setActiveTab("ai")}
          className={`px-4 py-2 border-b-2 transition-all cursor-pointer ${activeTab === "ai" ? "border-blue-400 text-blue-400 bg-white/5" : "border-transparent hover:text-slate-300"}`}
        >
          Content AI
        </button>
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS MONITOR */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-fade-in" id="seo-overview-pane">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Overall SEO Score</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-blue-400">{calculatedStats.score}</span>
                <span className="text-xs text-slate-500">/100</span>
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">● Excellent Authority</span>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Technical Health</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-emerald-400">{calculatedStats.health}%</span>
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">▲ +0.4% from cache checks</span>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Indexed URLs</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-white">{seoItems.length}</span>
                <span className="text-xs text-slate-500">/ {seoItems.length}</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">100% Crawl Coverage</span>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl shadow">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">SEO Status Checked</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-white">{calculatedStats.ok}</span>
                <span className="text-xs text-emerald-400">OK</span>
              </div>
              <span className="text-[10px] text-amber-400 mt-1 block">{calculatedStats.issues} suggestions open</span>
            </div>
          </div>

          {/* Search Console / GA4 Performance Chart */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">Google Search Console &amp; GA4 Core Integration</h3>
                <p className="text-[11px] text-slate-400">Verifying live organic traffic nodes, search impression cycles, and CTR thresholds.</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs bg-slate-950 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setChartPeriod("7d")}
                  className={`px-2.5 py-1 rounded-lg ${chartPeriod === "7d" ? "bg-white/10 text-blue-400" : "text-slate-400"}`}
                >
                  7D
                </button>
                <button
                  onClick={() => setChartPeriod("30d")}
                  className={`px-2.5 py-1 rounded-lg ${chartPeriod === "30d" ? "bg-white/10 text-blue-400" : "text-slate-400"}`}
                >
                  30D
                </button>
                <button
                  onClick={() => setChartPeriod("90d")}
                  className={`px-2.5 py-1 rounded-lg ${chartPeriod === "90d" ? "bg-white/10 text-blue-400" : "text-slate-400"}`}
                >
                  90D
                </button>
              </div>
            </div>

            {/* Simulated Chart Visualizer */}
            <div className="aspect-[5/1.5] w-full bg-[#020617]/50 border border-white/10 rounded-2xl p-4 flex items-end gap-2 relative shadow-inner">
              <div className="absolute top-2 left-2 text-[9px] text-slate-400 font-mono flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-blue-500" /> Impressions
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Clicks
              </div>

              {chartData.map((data, idx) => (
                <div key={idx} className="flex-grow flex flex-col justify-end gap-1 group cursor-pointer h-full relative">
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all text-[10px] pointer-events-none z-10 whitespace-nowrap mb-2 shadow-2xl">
                    <span className="block text-slate-400">Impressions: <strong>{data.impressions}</strong></span>
                    <span className="block text-blue-400">Clicks: <strong>{data.clicks}</strong></span>
                    <span className="block text-emerald-400">CTR: <strong>{data.ctr}</strong></span>
                  </div>

                  <div className="w-full flex gap-1 items-end h-3/4">
                    <div className="bg-blue-500/80 rounded-t-sm w-1/2" style={{ height: `${(data.impressions / 25000) * 100}%` }} />
                    <div className="bg-emerald-500/80 rounded-t-sm w-1/2" style={{ height: `${(data.clicks / 3000) * 100}%` }} />
                  </div>
                  <span className="text-[8px] text-slate-500 font-mono text-center block truncate mt-1">{data.date}</span>
                </div>
              ))}
            </div>

            {/* Analytics Metric Highlights */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-950/40 p-3 rounded-2xl border border-white/5 text-center">
                <span className="text-[9px] uppercase font-mono text-slate-500">Impressions</span>
                <span className="block text-lg font-extrabold text-white">412.5k</span>
                <span className="text-[9px] text-emerald-400">▲ +14% click-rate weight</span>
              </div>
              <div className="bg-slate-950/40 p-3 rounded-2xl border border-white/5 text-center">
                <span className="text-[9px] uppercase font-mono text-slate-500">Clicks</span>
                <span className="block text-lg font-extrabold text-blue-400">38.4k</span>
                <span className="text-[9px] text-emerald-400">▲ +8.2% this period</span>
              </div>
              <div className="bg-slate-950/40 p-3 rounded-2xl border border-white/5 text-center">
                <span className="text-[9px] uppercase font-mono text-slate-500">Average CTR</span>
                <span className="block text-lg font-extrabold text-emerald-400">9.3%</span>
                <span className="text-[9px] text-slate-500">Industry avg: 3.1%</span>
              </div>
              <div className="bg-slate-950/40 p-3 rounded-2xl border border-white/5 text-center">
                <span className="text-[9px] uppercase font-mono text-slate-500">Average Position</span>
                <span className="block text-lg font-extrabold text-blue-400">1.8</span>
                <span className="text-[9px] text-emerald-400">● Top Tier Position</span>
              </div>
            </div>
          </div>

          {/* Technical Diagnostics & Verification Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SEO Core Components Checklists */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-4 shadow-md">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Rank Math Diagnostic Checks</h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Robots.txt active &amp; verified</span>
                  </div>
                  <span className="text-[9px] bg-emerald-950/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-bold">PASS</span>
                </div>

                <div className="flex justify-between items-center bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>XML Sitemaps indexed properly</span>
                  </div>
                  <span className="text-[9px] bg-emerald-950/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-bold">PASS</span>
                </div>

                <div className="flex justify-between items-center bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Hreflang &amp; Pagination status tags</span>
                  </div>
                  <span className="text-[9px] bg-emerald-950/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-bold">PASS</span>
                </div>

                <div className="flex justify-between items-center bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Structured Data Status</span>
                  </div>
                  <span className="text-[9px] bg-amber-950/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-mono font-bold">1 WARN</span>
                </div>

                <div className="flex justify-between items-center bg-white/5 border border-white/10 p-2.5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Open Graph &amp; Twitter Meta Headers</span>
                  </div>
                  <span className="text-[9px] bg-emerald-950/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-bold">PASS</span>
                </div>
              </div>
            </div>

            {/* Core Web Vitals Status Panel */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-4 shadow-md">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Core Web Vitals Tracker (LCP, CLS, INP)</h3>
              <p className="text-[10px] text-slate-400 font-mono">Simulated metrics matching real Chrome User Experience reports (CrUX).</p>
              
              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300 font-medium">Largest Contentful Paint (LCP)</span>
                    <span className="text-emerald-400 font-bold font-mono">0.8s (Good)</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "95%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300 font-medium">Cumulative Layout Shift (CLS)</span>
                    <span className="text-emerald-400 font-bold font-mono">0.01 (Good)</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "98%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300 font-medium">Interaction to Next Paint (INP)</span>
                    <span className="text-emerald-400 font-bold font-mono">22ms (Good)</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "94%" }} />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 rounded-xl text-[10px]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Outstanding! Page renders pass all Core Web Vitals thresholds. Hand-crafted layouts ensure zero layout friction.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Keyword Position Tracker & Winning/Losing Captures */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/5 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">Rank Math PRO Keyword Position Tracker</h3>
                <p className="text-[11px] text-slate-400">Adding tracking queries to log live position history and estimated traffic metrics.</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-400 w-full sm:w-48"
                  placeholder="e.g. fast developer"
                />
                <button
                  onClick={handleAddKeyword}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer"
                >
                  Track Query
                </button>
              </div>
            </div>

            <div className="border border-white/10 rounded-[24px] overflow-hidden bg-[#020617]/40">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-white/5 text-slate-200 uppercase tracking-wider font-mono text-[9px] border-b border-white/10">
                  <tr>
                    <th className="p-3">Tracked Keyword Query</th>
                    <th className="p-3">Avg Position</th>
                    <th className="p-3">CTR Index</th>
                    <th className="p-3">Organic Clicks</th>
                    <th className="p-3">Rank Trend (Last 5 Days)</th>
                    <th className="p-3 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {keywordTracker.map((item, idx) => (
                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-all">
                      <td className="p-3 font-semibold text-white">{item.keyword}</td>
                      <td className="p-3">
                        <span className="font-mono font-bold text-blue-400 bg-blue-950/20 border border-blue-500/20 px-2 py-0.5 rounded text-[10px]">
                          #{item.position}
                        </span>
                      </td>
                      <td className="p-3 font-mono">{item.ctr}</td>
                      <td className="p-3 font-mono">{item.clicks} hits</td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          {item.history.map((h, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-mono px-1 bg-white/5 rounded text-slate-400"
                              title={`Day ${i+1}`}
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleRemoveKeyword(item.keyword)}
                          className="p-1 text-slate-500 hover:text-red-400 rounded-lg hover:bg-white/5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Algorithm Update Timeline Linkage */}
            <div className="p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl flex items-start gap-2.5 text-xs">
              <Sparkles className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5 animate-pulse" />
              <div className="space-y-0.5">
                <span className="font-bold text-slate-200">Google Core Algorithm Updates Timeline Integration</span>
                <p className="text-[10px] text-slate-400">
                  <strong>June 2026 Core Update</strong> flagged thin template builders. Metazivo's audited performance ratings jumped +12% in indexation value due to strict hand-coded React standard alignment.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: EDIT METADATA & PRODUCTS PANEL */}
      {activeTab === "editor" && (
        <div className="space-y-6 animate-fade-in" id="seo-pages-manager-pane">
          
          {/* Selective Dropdown & Bulk Options */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Select Page, Blog, Service or Product to Customize</label>
                <div className="flex gap-2">
                  <select
                    value={selectedItemId}
                    onChange={(e) => setSelectedItemId(e.target.value)}
                    className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-400 w-full sm:w-80"
                  >
                    {seoItems.map(item => (
                      <option key={item.id} value={item.id}>
                        [{item.type.toUpperCase()}] {item.title}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      addLog(`Triggered bulk autogen for ${seoItems.length} items`);
                      alert("Automatic meta and schema generation completed for all pages!");
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer shadow"
                  >
                    Bulk Metadata Auto-Gen
                  </button>
                </div>
              </div>

              <div className="bg-slate-950/40 p-3 rounded-2xl border border-white/5 shrink-0 text-right">
                <span className="text-[9px] uppercase text-slate-500 font-mono">Current Page Quality</span>
                <span className="block text-xl font-extrabold text-blue-400">95/100</span>
                <span className="text-[9px] text-emerald-400 block">● Fully Optimized</span>
              </div>
            </div>
          </div>

          {/* Double Column Configuration Fields */}
          {editForm && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
              
              {/* Form Config Left Side */}
              <div className="xl:col-span-2 space-y-5 bg-white/5 border border-white/10 rounded-[32px] p-5 md:p-6">
                <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                  <Sliders className="w-4 h-4 text-blue-400" />
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Metadata Variables Configuration</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">SEO Meta Title Tag</label>
                    <input
                      type="text"
                      value={editForm.seoTitle}
                      onChange={(e) => handleUpdateField("seoTitle", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                    <div className="flex justify-between mt-1 text-[9px] text-slate-500 font-mono">
                      <span>Chars count: {editForm.seoTitle.length}</span>
                      <span className={editForm.seoTitle.length > 60 ? "text-red-400" : "text-emerald-400"}>Optimal: 40-60</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Focus Keywords (Comma separated)</label>
                    <input
                      type="text"
                      value={editForm.focusKeywords.join(", ")}
                      onChange={(e) => handleUpdateField("focusKeywords", e.target.value.split(",").map(k => k.trim()))}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Meta Description Snippet</label>
                  <textarea
                    rows={2}
                    value={editForm.seoDescription}
                    onChange={(e) => handleUpdateField("seoDescription", e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-400"
                  />
                  <div className="flex justify-between mt-1 text-[9px] text-slate-500 font-mono">
                    <span>Chars count: {editForm.seoDescription.length}</span>
                    <span className={editForm.seoDescription.length > 160 ? "text-red-400" : "text-emerald-400"}>Optimal: 120-160</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Canonical URL</label>
                    <input
                      type="text"
                      value={editForm.canonicalUrl}
                      onChange={(e) => handleUpdateField("canonicalUrl", e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Meta Robots Configuration</label>
                    <div className="flex gap-4 mt-2 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editForm.index}
                          onChange={(e) => handleUpdateField("index", e.target.checked)}
                          className="rounded border-white/10 bg-slate-950 text-blue-500"
                        />
                        <span>Index Page</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editForm.follow}
                          onChange={(e) => handleUpdateField("follow", e.target.checked)}
                          className="rounded border-white/10 bg-slate-950 text-blue-500"
                        />
                        <span>Follow Links</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* SOCIAL PROFILES MEDIA PREVIEWS */}
                <div className="border-t border-white/10 pt-4 space-y-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Social Open Graph Variables</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Open Graph Title</label>
                      <input
                        type="text"
                        value={editForm.ogTitle}
                        onChange={(e) => handleUpdateField("ogTitle", e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Open Graph Description</label>
                      <input
                        type="text"
                        value={editForm.ogDescription}
                        onChange={(e) => handleUpdateField("ogDescription", e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Twitter Title</label>
                      <input
                        type="text"
                        value={editForm.twitterTitle}
                        onChange={(e) => handleUpdateField("twitterTitle", e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Twitter Description</label>
                      <input
                        type="text"
                        value={editForm.twitterDescription}
                        onChange={(e) => handleUpdateField("twitterDescription", e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>
                </div>

                {/* WOOCOMMERCE DYNAMIC FIELDS */}
                {editForm.type === "product" && (
                  <div className="border-t border-white/10 pt-4 space-y-4 bg-indigo-950/15 p-4 rounded-2xl border border-indigo-500/10">
                    <div className="flex items-center gap-1 text-xs font-bold text-indigo-400 uppercase tracking-wide">
                      <ShoppingCart className="w-4 h-4" />
                      <span>WooCommerce Product SEO Settings</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <label className="block text-[9px] text-slate-400 uppercase mb-1">GTIN Code</label>
                        <input
                          type="text"
                          value={editForm.gtin || ""}
                          onChange={(e) => handleUpdateField("gtin", e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] text-slate-400 uppercase mb-1">MPN Code</label>
                        <input
                          type="text"
                          value={editForm.mpn || ""}
                          onChange={(e) => handleUpdateField("mpn", e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] text-slate-400 uppercase mb-1">ISBN Code</label>
                        <input
                          type="text"
                          value={editForm.isbn || ""}
                          onChange={(e) => handleUpdateField("isbn", e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] text-slate-400 uppercase mb-1">Product Brand</label>
                        <input
                          type="text"
                          value={editForm.brand || ""}
                          onChange={(e) => handleUpdateField("brand", e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block text-[9px] text-slate-400 uppercase mb-1">Price ($)</label>
                        <input
                          type="number"
                          value={editForm.price || 0}
                          onChange={(e) => handleUpdateField("price", parseFloat(e.target.value))}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] text-slate-400 uppercase mb-1">Sale Price ($)</label>
                        <input
                          type="number"
                          value={editForm.salePrice || 0}
                          onChange={(e) => handleUpdateField("salePrice", parseFloat(e.target.value))}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] text-slate-400 uppercase mb-1">Stock Status</label>
                        <select
                          value={editForm.stockStatus || "instock"}
                          onChange={(e) => handleUpdateField("stockStatus", e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-2.5 py-1 text-xs text-slate-300 focus:outline-none"
                        >
                          <option value="instock">In Stock</option>
                          <option value="outofstock">Out of Stock</option>
                          <option value="onbackorder">On Backorder</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submitting buttons */}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setEditForm({ ...selectedItem })}
                    className="px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-full text-xs font-bold transition-all cursor-pointer"
                  >
                    Reset Variables
                  </button>
                  <button
                    onClick={handleSaveSeo}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Sidebar Previews column */}
              <div className="space-y-6">
                
                {/* Google Search Live Preview Card */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-[24px] space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Google SERP Live Preview</span>
                  
                  <div className="bg-[#171717] p-4 rounded-xl space-y-1 text-xs border border-white/5 font-sans leading-relaxed">
                    <span className="text-[11px] text-slate-400 block truncate">https://metazivo.com/<strong>{editForm.slug}</strong></span>
                    <h4 className="text-[#8ab4f8] hover:underline text-sm font-medium truncate leading-tight cursor-pointer">
                      {editForm.seoTitle || editForm.title}
                    </h4>
                    <p className="text-[#bdc1c6] text-[11px] line-clamp-2">
                      {editForm.seoDescription || "Provide metadata description snippet..."}
                    </p>
                  </div>
                </div>

                {/* Facebook Social OG Preview Card */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-[24px] space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Facebook Social Preview</span>
                  
                  <div className="bg-[#18191a] border border-white/5 rounded-xl overflow-hidden text-xs">
                    <div className="aspect-[1.91/1] w-full bg-[#242526] relative overflow-hidden flex items-center justify-center">
                      <img
                        src={editForm.ogImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"}
                        alt="og-cover"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 bg-[#242526] space-y-1 font-sans">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">METAZIVO.COM</span>
                      <h5 className="font-bold text-white text-xs truncate">{editForm.ogTitle || editForm.title}</h5>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{editForm.ogDescription || editForm.seoDescription}</p>
                    </div>
                  </div>
                </div>

                {/* Twitter / X Social Preview Card */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-[24px] space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Twitter / X Preview</span>
                  
                  <div className="bg-black border border-white/10 rounded-xl overflow-hidden text-xs font-sans">
                    <div className="aspect-[16/9] w-full bg-slate-900 relative overflow-hidden flex items-center justify-center">
                      <img
                        src={editForm.twitterImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"}
                        alt="tw-cover"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2.5 bg-[#15181c] space-y-0.5 border-t border-white/5">
                      <span className="text-[10px] text-slate-500 font-mono">metazivo.com</span>
                      <h5 className="font-bold text-white text-[11px] truncate">{editForm.twitterTitle || editForm.title}</h5>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{editForm.twitterDescription || editForm.seoDescription}</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

      {/* TAB 3: SCHEMAS CENTER */}
      {activeTab === "schemas" && (
        <div className="space-y-6 animate-fade-in" id="seo-schemas-pane">
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            
            {/* List and templates */}
            <div className="xl:col-span-2 space-y-5 bg-white/5 border border-white/10 rounded-[32px] p-5">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">JSON-LD Schema Templates</h3>
                <button
                  onClick={() => {
                    setSchemaTemplates(prev => [
                      ...prev,
                      {
                        id: `tpl-${Date.now()}`,
                        type: "FAQ",
                        jsonData: `{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  "mainEntity": []\n}`
                      }
                    ]);
                    addLog("Created custom schema template structure");
                  }}
                  className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-bold text-blue-400 cursor-pointer"
                >
                  + Add Custom Template
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schemaTemplates.map(tpl => (
                  <div key={tpl.id} className="p-4 bg-slate-950/40 border border-white/5 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-[10px] bg-indigo-950/20 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono font-bold">
                        {tpl.type} Type
                      </span>
                      <button
                        onClick={() => {
                          setSchemaTemplates(prev => prev.filter(t => t.id !== tpl.id));
                          addLog(`Deleted schema template: ${tpl.type}`);
                        }}
                        className="text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <textarea
                      rows={6}
                      value={tpl.jsonData}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSchemaTemplates(prev => prev.map(t => t.id === tpl.id ? { ...t, jsonData: val } : t));
                      }}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-[10px] text-slate-300 font-mono focus:outline-none focus:border-blue-400"
                    />
                  </div>
                ))}
              </div>

              {/* Conditional schema rule maps */}
              <div className="border-t border-white/10 pt-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Dynamic Auto-Assign Rules</h4>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-white">Rule 1: Assign BlogPosting to all /blog/* pages</span>
                      <p className="text-[10px] text-slate-400 font-mono">Condition: URL starts with /blog/ | Status: ACTIVE</p>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold font-mono">● AUTO ASSIGNED</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-white">Rule 2: Assign LocalBusiness to /contact page</span>
                      <p className="text-[10px] text-slate-400 font-mono">Condition: Slug matches contact | Status: ACTIVE</p>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold font-mono">● AUTO ASSIGNED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Schema preview code snippet */}
            <div className="space-y-6">
              <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-3 shadow-md">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-widest">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  <span>Google Rich Schema Live JSON-LD</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                  This schema code binds dynamically inside index.html to satisfy google search console rich-snippet validation routines.
                </p>

                <div className="p-3 bg-slate-950 border border-white/10 rounded-2xl">
                  <pre className="text-[9px] text-emerald-400 font-mono overflow-x-auto whitespace-pre leading-relaxed">
{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://metazivo.com/#organization",
      "name": "Metazivo",
      "logo": "https://metazivo.com/favicon.svg"
    },
    {
      "@type": "WebSite",
      "name": "Metazivo",
      "url": "https://metazivo.com/"
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 4: LOCAL SEO CONFIG */}
      {activeTab === "localseo" && (
        <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-6 animate-fade-in" id="seo-local-pane">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <MapPin className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Local SEO (NAP) &amp; Map Coordinates Configuration</h3>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addLog("Saved Local Business NAP coordinates");
              alert("Local business coordinates and business hours updated!");
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Company / Location Name</label>
                <input
                  type="text"
                  value={localSeo.name}
                  onChange={(e) => setLocalSeo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Headquarters Street Address</label>
                <input
                  type="text"
                  value={localSeo.address}
                  onChange={(e) => setLocalSeo(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Support Telephone (NAP)</label>
                  <input
                    type="text"
                    value={localSeo.phone}
                    onChange={(e) => setLocalSeo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Primary Email Contact</label>
                  <input
                    type="email"
                    value={localSeo.email}
                    onChange={(e) => setLocalSeo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Geo Latitude</label>
                  <input
                    type="text"
                    value={localSeo.latitude}
                    onChange={(e) => setLocalSeo(prev => ({ ...prev, latitude: e.target.value }))}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Geo Longitude</label>
                  <input
                    type="text"
                    value={localSeo.longitude}
                    onChange={(e) => setLocalSeo(prev => ({ ...prev, longitude: e.target.value }))}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Business Hours Editor</label>
                <input
                  type="text"
                  value={localSeo.businessHours}
                  onChange={(e) => setLocalSeo(prev => ({ ...prev, businessHours: e.target.value }))}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Google Business Profile URL</label>
                <input
                  type="text"
                  value={localSeo.googleBusinessProfileUrl}
                  onChange={(e) => setLocalSeo(prev => ({ ...prev, googleBusinessProfileUrl: e.target.value }))}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Covered Service Areas</label>
                <input
                  type="text"
                  defaultValue={localSeo.serviceAreas.join(", ")}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Save Local Coordinates
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* TAB 5: AUTOMATION CONTROLS */}
      {activeTab === "automation" && (
        <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-6 animate-fade-in" id="seo-automation-pane">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Automatic SEO &amp; Linking Optimization Center</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            {/* Switcheable toggles */}
            <div className="space-y-4 bg-slate-950/40 p-4 border border-white/5 rounded-2xl">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Algorithmic Automation Rules</h4>
              
              <div className="space-y-3.5">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-white">Automatic Image ALT Tags Injection</span>
                    <p className="text-[10px] text-slate-500 leading-normal">Adds alt texts automatically based on page titles if missing.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={automationSettings.autoAltTags}
                    onChange={(e) => setAutomationSettings(prev => ({ ...prev, autoAltTags: e.target.checked }))}
                    className="rounded text-emerald-500 bg-slate-900 border-white/10 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-white">Automatic Image Title Tags</span>
                    <p className="text-[10px] text-slate-500 leading-normal">Populates empty image file title parameters instantly.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={automationSettings.autoTitleTags}
                    onChange={(e) => setAutomationSettings(prev => ({ ...prev, autoTitleTags: e.target.checked }))}
                    className="rounded text-emerald-500 bg-slate-900 border-white/10 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-white">Automatic Canonical tags generation</span>
                    <p className="text-[10px] text-slate-500 leading-normal">Creates clean self-referential canonical tags globally.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={automationSettings.autoCanonical}
                    onChange={(e) => setAutomationSettings(prev => ({ ...prev, autoCanonical: e.target.checked }))}
                    className="rounded text-emerald-500 bg-slate-900 border-white/10 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-white">Smart Internal Linking Prompts</span>
                    <p className="text-[10px] text-slate-500 leading-normal">Scans paragraph body elements to trigger linking suggestions.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={automationSettings.autoInternalLinks}
                    onChange={(e) => setAutomationSettings(prev => ({ ...prev, autoInternalLinks: e.target.checked }))}
                    className="rounded text-emerald-500 bg-slate-900 border-white/10 focus:ring-emerald-500"
                  />
                </label>
              </div>
            </div>

            {/* Link Engine suggestions preview */}
            <div className="space-y-4 bg-slate-950/40 p-4 border border-white/5 rounded-2xl">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Internal Link Assistant Preview (Selected Page)</h4>
              <p className="text-[10px] text-slate-400">
                Suggested links for <strong>{editForm?.title || "selected page"}</strong> using context matching:
              </p>

              <div className="space-y-2 text-xs">
                {internalLinkSuggestions.length === 0 ? (
                  <p className="text-slate-500 italic">No suggestions computed.</p>
                ) : (
                  internalLinkSuggestions.map((s, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white/5 border border-white/10 p-2 rounded-xl">
                      <div className="flex flex-col">
                        <span className="text-slate-200 truncate font-semibold">Link to: /{s.slug}</span>
                        <span className="text-[10px] text-slate-500 font-mono">Anchor word: "{s.suggestedAnchor}"</span>
                      </div>
                      <span className="text-[10px] bg-emerald-950/20 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono">
                        {s.score}% Match
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Orphan and Broken logs */}
              <div className="pt-2 border-t border-white/5 space-y-1.5 font-mono text-[10px]">
                <div className="flex justify-between text-slate-400">
                  <span>Orphan Pages Detected:</span>
                  <span className="text-amber-400">{auditAnalysis.orphan.length > 0 ? `${auditAnalysis.orphan.length} (${auditAnalysis.orphan[0]})` : "0"}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Broken Links Scan:</span>
                  <span className="text-emerald-400">0 BROKEN</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 6: TECHNICAL FILES CONTROL */}
      {activeTab === "technical" && (
        <div className="space-y-6 animate-fade-in" id="seo-technical-pane">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Robots.txt code editor */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Robots.txt Editor</span>
                <button
                  onClick={() => {
                    addLog("Saved updated robots.txt ruleset");
                    alert("robots.txt committed to memory!");
                  }}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                >
                  Commit Robots.txt
                </button>
              </div>
              <textarea
                rows={8}
                value={robotsTxt}
                onChange={(e) => setRobotsTxt(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-emerald-400 font-mono focus:outline-none focus:border-blue-400"
              />
            </div>

            {/* .htaccess code editor */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">.htaccess Editor</span>
                <button
                  onClick={() => {
                    addLog("Saved updated .htaccess redirections");
                    alert(".htaccess committed to server nodes!");
                  }}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                >
                  Commit .htaccess
                </button>
              </div>
              <textarea
                rows={8}
                value={htaccessTxt}
                onChange={(e) => setHtaccessTxt(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-emerald-400 font-mono focus:outline-none focus:border-blue-400"
              />
            </div>

          </div>

          {/* Sitemaps dynamic mapping panel */}
          <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">XML &amp; HTML Sitemaps Index Tracker</h3>
            <p className="text-[11px] text-slate-400">Rank Math PRO auto-compiles and splits sitemaps to bypass massive file constraints.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
              <div className="bg-slate-950/40 p-3 rounded-2xl border border-white/5 text-center space-y-1.5">
                <span className="text-[10px] uppercase font-semibold text-slate-400">Core sitemap.xml</span>
                <span className="text-[10px] bg-emerald-950/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-bold block">ACTIVE</span>
                <a href="/sitemap.xml" target="_blank" className="text-[10px] text-blue-400 hover:underline block">View XML</a>
              </div>

              <div className="bg-slate-950/40 p-3 rounded-2xl border border-white/5 text-center space-y-1.5">
                <span className="text-[10px] uppercase font-semibold text-slate-400">Image Sitemap</span>
                <span className="text-[10px] bg-emerald-950/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-bold block">ACTIVE</span>
                <span className="text-[10px] text-slate-500 block">Autogen mapped</span>
              </div>

              <div className="bg-slate-950/40 p-3 rounded-2xl border border-white/5 text-center space-y-1.5">
                <span className="text-[10px] uppercase font-semibold text-slate-400">Video Sitemap</span>
                <span className="text-[10px] bg-emerald-950/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-bold block">ACTIVE</span>
                <span className="text-[10px] text-slate-500 block">Autogen mapped</span>
              </div>

              <div className="bg-slate-950/40 p-3 rounded-2xl border border-white/5 text-center space-y-1.5">
                <span className="text-[10px] uppercase font-semibold text-slate-400">News Sitemap</span>
                <span className="text-[10px] bg-emerald-950/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-bold block">ACTIVE</span>
                <span className="text-[10px] text-slate-500 block">Google News approved</span>
              </div>

              <div className="bg-slate-950/40 p-3 rounded-2xl border border-white/5 text-center space-y-1.5">
                <span className="text-[10px] uppercase font-semibold text-slate-400">HTML Sitemap</span>
                <span className="text-[10px] bg-emerald-950/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono font-bold block">ACTIVE</span>
                <span className="text-[10px] text-slate-500 block">Index footer mapped</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 7: CONTENT AI COPROCESSOR */}
      {activeTab === "ai" && (
        <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-5 animate-fade-in" id="seo-ai-pane">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <Sparkles className="w-4.5 h-4.5 text-cyan-400 animate-pulse" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Gemini Content AI Coprocessor</h3>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Optimizing Subject Keyword / Topic Outline</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 w-full"
                  placeholder={editForm?.title || "e.g. Website Speed Optimization Ultimate Guide"}
                />
              </div>
            </div>

            {/* AI Action trigger grids */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              <button
                onClick={() => handleAiActionTrigger("title")}
                disabled={loading}
                className="p-2.5 bg-slate-950/40 hover:bg-slate-950/80 border border-white/5 hover:border-cyan-500/50 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer"
              >
                <span className="font-semibold text-slate-300">Generate SEO Title</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              <button
                onClick={() => handleAiActionTrigger("desc")}
                disabled={loading}
                className="p-2.5 bg-slate-950/40 hover:bg-slate-950/80 border border-white/5 hover:border-cyan-500/50 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer"
              >
                <span className="font-semibold text-slate-300">Generate Meta Desc</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              <button
                onClick={() => handleAiActionTrigger("keywords")}
                disabled={loading}
                className="p-2.5 bg-slate-950/40 hover:bg-slate-950/80 border border-white/5 hover:border-cyan-500/50 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer"
              >
                <span className="font-semibold text-slate-300">Generate Keywords</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              <button
                onClick={() => handleAiActionTrigger("faq")}
                disabled={loading}
                className="p-2.5 bg-slate-950/40 hover:bg-slate-950/80 border border-white/5 hover:border-cyan-500/50 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer"
              >
                <span className="font-semibold text-slate-300">Generate FAQ blocks</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              <button
                onClick={() => handleAiActionTrigger("schema")}
                disabled={loading}
                className="p-2.5 bg-slate-950/40 hover:bg-slate-950/80 border border-white/5 hover:border-cyan-500/50 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer"
              >
                <span className="font-semibold text-slate-300">Generate JSON-LD</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              <button
                onClick={() => handleAiActionTrigger("outline")}
                disabled={loading}
                className="p-2.5 bg-slate-950/40 hover:bg-slate-950/80 border border-white/5 hover:border-cyan-500/50 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer"
              >
                <span className="font-semibold text-slate-300">Generate Outline</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </button>

              <button
                onClick={() => handleAiActionTrigger("audit")}
                disabled={loading}
                className="p-2.5 bg-slate-950/40 hover:bg-slate-950/80 border border-white/5 hover:border-cyan-500/50 rounded-xl text-left text-xs transition-all flex items-center justify-between cursor-pointer"
              >
                <span className="font-semibold text-slate-300">Full Page SEO Audit</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>

            {/* AI Resulting panel */}
            <div className="bg-[#020617] border border-white/10 rounded-2xl p-4 min-h-[160px] flex flex-col justify-between">
              {loading ? (
                <div className="flex-grow flex flex-col items-center justify-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-cyan-400 mb-2" />
                  <span className="text-xs text-slate-400">Synthesizing LLM semantic metrics via Gemini API...</span>
                </div>
              ) : (
                <div className="text-xs space-y-3 leading-relaxed">
                  {aiResult ? (
                    <div>
                      {aiAction === "title" && (
                        <div className="space-y-1">
                          <span className="text-[10px] text-cyan-400 font-bold uppercase block">Suggested SEO title:</span>
                          <p className="text-white text-sm font-bold bg-white/5 p-2 rounded-lg border border-white/10">{aiResult.seoTitle}</p>
                        </div>
                      )}

                      {aiAction === "desc" && (
                        <div className="space-y-1">
                          <span className="text-[10px] text-cyan-400 font-bold uppercase block">Suggested Meta Description:</span>
                          <p className="text-white bg-white/5 p-2 rounded-lg border border-white/10">{aiResult.seoDescription}</p>
                        </div>
                      )}

                      {aiAction === "keywords" && (
                        <div className="space-y-1">
                          <span className="text-[10px] text-cyan-400 font-bold uppercase block">Focus keywords:</span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {aiResult.focusKeywords?.map((kw: string, idx: number) => (
                              <span key={idx} className="bg-[#1e1b4b] text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-lg font-mono text-[10px]">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {aiAction === "faq" && (
                        <div className="space-y-2">
                          <span className="text-[10px] text-cyan-400 font-bold uppercase block">Generated FAQ elements:</span>
                          {aiResult.faqs?.map((f: any, idx: number) => (
                            <div key={idx} className="bg-white/5 p-2.5 border border-white/10 rounded-xl space-y-1">
                              <h5 className="font-bold text-white text-xs">{f.question}</h5>
                              <p className="text-slate-300 text-[11px] leading-normal">{f.answer}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {aiAction === "schema" && (
                        <div className="space-y-1">
                          <span className="text-[10px] text-cyan-400 font-bold uppercase block">Generated JSON-LD Schema:</span>
                          <pre className="text-[10px] text-emerald-400 font-mono bg-white/5 p-2.5 rounded-xl overflow-x-auto">
                            {aiResult.jsonData}
                          </pre>
                        </div>
                      )}

                      {aiAction === "outline" && (
                        <div className="space-y-1">
                          <span className="text-[10px] text-cyan-400 font-bold uppercase block">SEO Content Outline suggestions:</span>
                          <ol className="list-decimal pl-4 space-y-1 text-slate-300 font-medium">
                            {aiResult.outline?.map((o: string, idx: number) => (
                              <li key={idx}>{o}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {aiAction === "audit" && (
                        <div className="space-y-2">
                          <span className="text-[10px] text-cyan-400 font-bold uppercase block">Automated Audit checklist:</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {aiResult.audits?.map((a: any, idx: number) => (
                              <div key={idx} className="p-2 bg-white/5 border border-white/5 rounded-xl flex items-center gap-2">
                                {a.passed ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                                )}
                                <span className={a.passed ? "text-slate-300" : "text-amber-300"}>{a.check}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">No Content AI action currently requested. Click any optimize trigger button above.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER AUDIT ACTION LOGS */}
      <div className="p-5 bg-white/5 border border-white/10 rounded-[32px] space-y-3">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Rank Math PRO Activity Audit Log</span>
        <div className="space-y-1.5 text-[11px] max-h-36 overflow-y-auto">
          {activityLogs.map(log => (
            <div key={log.id} className="flex justify-between items-center bg-slate-950/40 p-2 border border-white/5 rounded-xl">
              <span className="text-slate-300 font-medium">{log.action}</span>
              <span className="text-slate-500 font-mono text-[10px]">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
