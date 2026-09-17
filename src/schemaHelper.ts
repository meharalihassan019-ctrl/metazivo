/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Metazivo Technical SEO & Schema.org JSON-LD Infrastructure
 * Generates and injects 100% valid, rich Schema Graphs for every page & blog.
 */

import { BlogPost, SchemaConfig } from "./types";
import { servicesData } from "./data";

export interface FaqItem {
  question: string;
  answer: string;
}

const DOMAIN = "https://metazivo.com";

/**
 * Extracts FAQ questions and answers from article HTML content
 */
export function extractFaqsFromHtml(html: string): FaqItem[] {
  if (!html || typeof html !== "string") return [];
  const faqs: FaqItem[] = [];

  // Pattern 1: Metazivo CMS details.faq-item
  const detailsRegex = /<details[^>]*class="[^"]*faq-item[^"]*"[^>]*>[\s\S]*?<summary[^>]*>([\s\S]*?)<\/summary>[\s\S]*?<div[^>]*class="[^"]*faq-answer[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
  let match;
  while ((match = detailsRegex.exec(html)) !== null) {
    const qRaw = match[1].replace(/<[^>]+>/g, "").replace(/^Q[:\.\s-]*/i, "").trim();
    const aRaw = match[2].replace(/<[^>]+>/g, "").trim();
    if (qRaw && aRaw) {
      faqs.push({ question: qRaw, answer: aRaw });
    }
  }

  // Pattern 2: Generic details/summary if pattern 1 didn't match
  if (faqs.length === 0) {
    const genericDetailsRegex = /<details[^>]*>[\s\S]*?<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi;
    while ((match = genericDetailsRegex.exec(html)) !== null) {
      const qRaw = match[1].replace(/<[^>]+>/g, "").replace(/^Q[:\.\s-]*/i, "").trim();
      const aRaw = match[2].replace(/<[^>]+>/g, "").trim();
      if (qRaw && aRaw && qRaw.endsWith("?")) {
        faqs.push({ question: qRaw, answer: aRaw });
      }
    }
  }

  // Pattern 3: Heading 3 / Heading 4 with question mark followed by paragraph
  if (faqs.length === 0) {
    const headingRegex = /<h[34][^>]*>([\s\S]*?\?)<\/h[34]>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
    while ((match = headingRegex.exec(html)) !== null) {
      const qRaw = match[1].replace(/<[^>]+>/g, "").trim();
      const aRaw = match[2].replace(/<[^>]+>/g, "").trim();
      if (qRaw && aRaw && qRaw.length > 5 && aRaw.length > 10) {
        faqs.push({ question: qRaw, answer: aRaw });
      }
    }
  }

  return faqs;
}

/**
 * Generates an automatic, Google-ready rich Schema JSON-LD string for a blog post
 */
export function generateBlogSchemaJson(post: Partial<BlogPost>): string {
  const cleanSlug = (post.slug || "blog-post").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const postUrl = `${DOMAIN}/blog/${cleanSlug}`;
  const headline = post.title || "Metazivo Blog Post";
  const description = post.seoDescription || post.excerpt || `${headline} - Complete technical breakdown by Metazivo.`;
  const publishDate = post.publishDate || new Date().toISOString();
  const authorName = post.author?.name || "Mehar Ali Hassan";
  const image = post.featuredImage || `${DOMAIN}/og-image.jpg`;

  const faqs = post.content ? extractFaqsFromHtml(post.content) : [];

  const graph: any[] = [
    {
      "@type": "BlogPosting",
      "@id": `${postUrl}#article`,
      "isPartOf": {
        "@type": "WebPage",
        "@id": `${postUrl}#webpage`
      },
      "headline": headline,
      "description": description,
      "url": postUrl,
      "mainEntityOfPage": postUrl,
      "image": image,
      "datePublished": publishDate,
      "dateModified": publishDate,
      "author": {
        "@type": "Person",
        "name": authorName,
        "url": `${DOMAIN}/about`
      },
      "publisher": {
        "@type": "Organization",
        "name": "Metazivo",
        "url": `${DOMAIN}/`,
        "logo": {
          "@type": "ImageObject",
          "url": `${DOMAIN}/favicon.svg`
        }
      },
      "keywords": post.focusKeywords && post.focusKeywords.length > 0 
        ? post.focusKeywords 
        : ["SEO", "AEO", "Digital Agency", "Web Performance"]
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${postUrl}#breadcrumbs`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${DOMAIN}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${DOMAIN}/blog`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": headline,
          "item": postUrl
        }
      ]
    }
  ];

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${postUrl}#faq`,
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    });
  }

  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": graph
    },
    null,
    2
  );
}

/**
 * Base Organization schema present on all pages
 */
export const baseOrganizationSchema = {
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": `${DOMAIN}/#organization`,
  "name": "Metazivo",
  "alternateName": "Metazivo Digital Agency",
  "url": `${DOMAIN}/`,
  "logo": {
    "@type": "ImageObject",
    "@id": `${DOMAIN}/#logo`,
    "url": `${DOMAIN}/favicon.svg`,
    "contentUrl": `${DOMAIN}/favicon.svg`,
    "caption": "Metazivo Logo"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+923288518557",
    "contactType": "customer service",
    "email": "mai@metazivo.com",
    "areaServed": "Global"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gulberg",
    "addressLocality": "Lahore / Islamabad",
    "addressRegion": "Punjab",
    "postalCode": "54000",
    "addressCountry": "PK"
  },
  "priceRange": "$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "21:00"
    }
  ],
  "sameAs": [
    "https://facebook.com/metazivo",
    "https://twitter.com/metazivo",
    "https://linkedin.com/company/metazivo"
  ]
};

/**
 * Builds the comprehensive Schema Graph for any URL route on Metazivo
 */
export function buildPageSchemaGraph(
  routePath: string,
  options?: {
    blogPost?: BlogPost | null;
    serviceSlug?: string;
    seoTool?: any;
    pageData?: any;
  }
): { "@context": string; "@graph": any[] } {
  const p = (routePath || "/").toLowerCase().replace(/\/+$/, "") || "/";
  const canonicalUrl = `${DOMAIN}${p === "/" ? "/" : p}`;

  const graph: any[] = [{ ...baseOrganizationSchema }];

  // 1. HOME PAGE
  if (p === "/") {
    graph.push({
      "@type": "WebSite",
      "@id": `${DOMAIN}/#website`,
      "url": `${DOMAIN}/`,
      "name": "Metazivo",
      "description": "Professional Technical SEO, AEO, GEO & High-Performance WordPress Web Development Agency.",
      "publisher": { "@id": `${DOMAIN}/#organization` },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${DOMAIN}/blog?s={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    });

    graph.push({
      "@type": "WebPage",
      "@id": `${DOMAIN}/#webpage`,
      "url": `${DOMAIN}/`,
      "name": "Metazivo | SEO, AEO & GEO Agency for Rapid Ranking Growth",
      "description": "Dominate search with Metazivo – expert SEO, AEO, GEO, WordPress development & Meta Ads. Get high-performance websites that rank fast and convert better.",
      "isPartOf": { "@id": `${DOMAIN}/#website` },
      "about": { "@id": `${DOMAIN}/#organization` }
    });
    return { "@context": "https://schema.org", "@graph": graph };
  }

  // 2. SERVICES CATALOG (/services)
  if (p === "/services") {
    graph.push({
      "@type": "CollectionPage",
      "@id": `${DOMAIN}/services#webpage`,
      "url": `${DOMAIN}/services`,
      "name": "Digital Marketing & Technical SEO Services | Metazivo",
      "description": "Explore Metazivo's full suite of performance-driven services: Technical SEO, AEO/GEO Optimization, High-Speed WordPress, and Custom React Development.",
      "isPartOf": { "@id": `${DOMAIN}/#website` }
    });

    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/services#breadcrumbs`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": `${DOMAIN}/services` }
      ]
    });
    return { "@context": "https://schema.org", "@graph": graph };
  }

  // 3. SERVICE DETAIL (/service/:slug)
  if (p.startsWith("/service/")) {
    const slug = p.replace("/service/", "");
    const service = servicesData.find(
      (s) => s.slug.toLowerCase() === slug || s.id.toLowerCase() === slug
    );

    const sTitle = service ? service.title : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const sDesc = service?.seoDescription || service?.description || `Professional ${sTitle} solutions by Metazivo.`;

    graph.push({
      "@type": "Service",
      "@id": `${canonicalUrl}#service`,
      "name": sTitle,
      "url": canonicalUrl,
      "serviceType": sTitle,
      "description": sDesc,
      "provider": { "@id": `${DOMAIN}/#organization` },
      "areaServed": "Worldwide",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": service?.startingPrice ? service.startingPrice.replace(/[^0-9.]/g, "") || "449" : "449",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "priceCurrency": "USD",
          "price": service?.startingPrice ? service.startingPrice.replace(/[^0-9.]/g, "") || "449" : "449"
        }
      }
    });

    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumbs`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": `${DOMAIN}/services` },
        { "@type": "ListItem", "position": 3, "name": sTitle, "item": canonicalUrl }
      ]
    });

    if (service?.faqs && service.faqs.length > 0) {
      graph.push({
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": service.faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      });
    }

    return { "@context": "https://schema.org", "@graph": graph };
  }

  // 4. BLOG INDEX (/blog)
  if (p === "/blog") {
    graph.push({
      "@type": "Blog",
      "@id": `${DOMAIN}/blog#blog`,
      "name": "Metazivo SEO & Engineering Insights",
      "url": `${DOMAIN}/blog`,
      "description": "Actionable technical SEO guides, Core Web Vitals optimization blueprints, and AI search ranking strategies.",
      "publisher": { "@id": `${DOMAIN}/#organization` }
    });

    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/blog#breadcrumbs`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${DOMAIN}/blog` }
      ]
    });
    return { "@context": "https://schema.org", "@graph": graph };
  }

  // 5. BLOG DETAIL (/blog/:slug)
  if (p.startsWith("/blog/")) {
    const post = options?.blogPost;
    const cleanSlug = p.replace("/blog/", "");
    const postUrl = `${DOMAIN}/blog/${cleanSlug}`;

    let hasCustomArticle = false;
    let hasCustomFaq = false;
    let hasCustomBreadcrumbs = false;

    // Check and merge any custom schemas provided on the post
    if (post && post.schemas && Array.isArray(post.schemas) && post.schemas.length > 0) {
      for (const sch of post.schemas) {
        if (!sch || !sch.jsonData) continue;
        try {
          const parsed = typeof sch.jsonData === "string" ? JSON.parse(sch.jsonData) : sch.jsonData;
          if (parsed) {
            if (Array.isArray(parsed["@graph"])) {
              for (const entity of parsed["@graph"]) {
                if (!entity || !entity["@type"]) continue;
                const typeStr = Array.isArray(entity["@type"]) ? entity["@type"].join(" ") : String(entity["@type"]);
                if (/Article|BlogPosting|NewsArticle/i.test(typeStr)) hasCustomArticle = true;
                if (/FAQPage/i.test(typeStr)) hasCustomFaq = true;
                if (/BreadcrumbList/i.test(typeStr)) hasCustomBreadcrumbs = true;
                if (/Organization|LocalBusiness/i.test(typeStr)) continue; // Avoid duplicate base organization
                graph.push(entity);
              }
            } else if (parsed["@type"]) {
              const typeStr = Array.isArray(parsed["@type"]) ? parsed["@type"].join(" ") : String(parsed["@type"]);
              if (/Article|BlogPosting|NewsArticle/i.test(typeStr)) hasCustomArticle = true;
              if (/FAQPage/i.test(typeStr)) hasCustomFaq = true;
              if (/BreadcrumbList/i.test(typeStr)) hasCustomBreadcrumbs = true;
              if (!/Organization|LocalBusiness/i.test(typeStr)) {
                const { "@context": _, ...cleanEntity } = parsed;
                graph.push(cleanEntity);
              }
            }
          }
        } catch (err) {
          console.warn("Custom schema parsing error for post", post.slug, err);
        }
      }
    }

    // If no custom Article/BlogPosting was provided, generate standard rich Article
    if (!hasCustomArticle) {
      const headline = post?.title || cleanSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      const description = post?.seoDescription || post?.excerpt || `Read complete guide on ${headline} by Metazivo.`;
      const publishDate = post?.publishDate || "2026-07-10T08:00:00+00:00";
      const authorName = post?.author?.name || "Mehar Ali Hassan";
      const image = post?.featuredImage || `${DOMAIN}/og-image.jpg`;

      graph.push({
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        "isPartOf": { "@id": `${postUrl}#webpage` },
        "mainEntityOfPage": postUrl,
        "headline": headline,
        "description": description,
        "image": image,
        "author": {
          "@type": "Person",
          "name": authorName,
          "url": `${DOMAIN}/about`
        },
        "publisher": { "@id": `${DOMAIN}/#organization` },
        "datePublished": publishDate,
        "dateModified": publishDate
      });
    }

    // Always ensure BreadcrumbList exists
    if (!hasCustomBreadcrumbs) {
      const postTitle = post?.title || cleanSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      graph.push({
        "@type": "BreadcrumbList",
        "@id": `${postUrl}#breadcrumbs`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${DOMAIN}/blog` },
          { "@type": "ListItem", "position": 3, "name": postTitle, "item": postUrl }
        ]
      });
    }

    // If no custom FAQPage was added, extract any FAQs from HTML content
    if (!hasCustomFaq && post?.content) {
      const extractedFaqs = extractFaqsFromHtml(post.content);
      if (extractedFaqs.length > 0) {
        graph.push({
          "@type": "FAQPage",
          "@id": `${postUrl}#faq`,
          "mainEntity": extractedFaqs.map((f) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.answer
            }
          }))
        });
      }
    }

    return { "@context": "https://schema.org", "@graph": graph };
  }

  // 6. TOOLS SUITE & FREE TOOLS (/seo-tools, /free-tools)
  if (p === "/seo-tools" || p === "/seo-tool" || p === "/free-tools" || p === "/tools") {
    graph.push({
      "@type": "WebApplication",
      "@id": `${canonicalUrl}#app`,
      "name": "31 Free Production SEO Tools & AI Search Optimization Suite",
      "url": canonicalUrl,
      "applicationCategory": "SEOApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "description": "Access 31 free, production-grade SEO and AI search tools. Audit websites, optimize meta tags, generate schema markup, cluster keywords, and optimize for AEO & GEO.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": { "@id": `${DOMAIN}/#organization` }
    });

    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumbs`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
        { "@type": "ListItem", "position": 2, "name": "SEO Tools Suite", "item": canonicalUrl }
      ]
    });
    return { "@context": "https://schema.org", "@graph": graph };
  }

  // 7. INDIVIDUAL TOOL (/tools/:slug)
  if (p.startsWith("/tools/") || p.startsWith("/seo-tools/")) {
    const tool = options?.seoTool;
    const tSlug = p.replace(/^\/(?:tools|seo-tools)\/?/i, "");
    const toolName = tool?.name || tSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const toolDesc = tool?.metaDescription || tool?.shortDesc || `Free ${toolName} online utility by Metazivo.`;

    graph.push({
      "@type": "WebApplication",
      "@id": `${canonicalUrl}#app`,
      "name": toolName,
      "url": canonicalUrl,
      "applicationCategory": "SEOApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "description": toolDesc,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": { "@id": `${DOMAIN}/#organization` }
    });

    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumbs`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
        { "@type": "ListItem", "position": 2, "name": "SEO Tools Suite", "item": `${DOMAIN}/seo-tools` },
        { "@type": "ListItem", "position": 3, "name": toolName, "item": canonicalUrl }
      ]
    });

    if (tool?.faqs && tool.faqs.length > 0) {
      graph.push({
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": tool.faqs.map((f: any) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      });
    }

    return { "@context": "https://schema.org", "@graph": graph };
  }

  // 8. ABOUT PAGE (/about)
  if (p === "/about") {
    graph.push({
      "@type": "AboutPage",
      "@id": `${DOMAIN}/about#webpage`,
      "url": `${DOMAIN}/about`,
      "name": "About Metazivo | Engineering First Digital Agency",
      "description": "Learn about Metazivo: our engineering-first philosophy, leadership, and track record in delivering high-speed search optimization.",
      "isPartOf": { "@id": `${DOMAIN}/#website` }
    });

    graph.push({
      "@type": "Person",
      "@id": `${DOMAIN}/about#founder`,
      "name": "Mehar Ali Hassan",
      "jobTitle": "Principal Architect & Founder",
      "worksFor": { "@id": `${DOMAIN}/#organization` },
      "url": `${DOMAIN}/about`
    });

    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/about#breadcrumbs`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
        { "@type": "ListItem", "position": 2, "name": "About Us", "item": `${DOMAIN}/about` }
      ]
    });
    return { "@context": "https://schema.org", "@graph": graph };
  }

  // 9. CONTACT PAGE (/contact)
  if (p === "/contact") {
    graph.push({
      "@type": "ContactPage",
      "@id": `${DOMAIN}/contact#webpage`,
      "url": `${DOMAIN}/contact`,
      "name": "Contact Metazivo | Start Your Growth Pipeline",
      "description": "Reach out to Metazivo for custom technical SEO audits, high-performance web development, and digital scaling consulting.",
      "isPartOf": { "@id": `${DOMAIN}/#website` }
    });

    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/contact#breadcrumbs`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${DOMAIN}/contact` }
      ]
    });
    return { "@context": "https://schema.org", "@graph": graph };
  }

  // 10. PRICING (/pricing)
  if (p === "/pricing") {
    graph.push({
      "@type": "WebPage",
      "@id": `${DOMAIN}/pricing#webpage`,
      "url": `${DOMAIN}/pricing`,
      "name": "Transparent SEO & Web Development Pricing | Metazivo",
      "description": "Transparent, performance-based pricing for technical SEO audits, monthly ranking growth retainers, and custom web builds.",
      "isPartOf": { "@id": `${DOMAIN}/#website` }
    });

    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/pricing#breadcrumbs`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
        { "@type": "ListItem", "position": 2, "name": "Pricing", "item": `${DOMAIN}/pricing` }
      ]
    });
    return { "@context": "https://schema.org", "@graph": graph };
  }

  // 11. PORTFOLIO (/portfolio)
  if (p === "/portfolio") {
    graph.push({
      "@type": "CollectionPage",
      "@id": `${DOMAIN}/portfolio#webpage`,
      "url": `${DOMAIN}/portfolio`,
      "name": "Case Studies & Client Results Portfolio | Metazivo",
      "description": "Proven case studies and verified organic search traffic results achieved for our global clients.",
      "isPartOf": { "@id": `${DOMAIN}/#website` }
    });

    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${DOMAIN}/portfolio#breadcrumbs`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
        { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": `${DOMAIN}/portfolio` }
      ]
    });
    return { "@context": "https://schema.org", "@graph": graph };
  }

  // 12. PRIVACY & TERMS
  if (p === "/privacy-policy" || p === "/terms") {
    const isPrivacy = p.includes("privacy");
    const name = isPrivacy ? "Privacy Policy" : "Terms of Service";
    graph.push({
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      "url": canonicalUrl,
      "name": `${name} | Metazivo`,
      "description": `${name} and legal disclosures for Metazivo Digital Agency.`,
      "isPartOf": { "@id": `${DOMAIN}/#website` }
    });

    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumbs`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
        { "@type": "ListItem", "position": 2, "name": name, "item": canonicalUrl }
      ]
    });
    return { "@context": "https://schema.org", "@graph": graph };
  }

  // 13. GENERIC / CMS PAGES
  const pageTitle = options?.pageData?.title || p.replace(/^\/+/, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  graph.push({
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    "url": canonicalUrl,
    "name": `${pageTitle} | Metazivo`,
    "description": options?.pageData?.seoDescription || `Learn more about ${pageTitle} at Metazivo.`,
    "isPartOf": { "@id": `${DOMAIN}/#website` }
  });

  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumbs`,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
      { "@type": "ListItem", "position": 2, "name": pageTitle, "item": canonicalUrl }
    ]
  });

  return { "@context": "https://schema.org", "@graph": graph };
}

/**
 * Injects or updates the Schema Graph directly inside the document.head.
 * Ensures Chrome extensions (Detailed SEO Extension, Rich Results testers) immediately discover it.
 */
export function injectSchemaToHead(
  routePath: string,
  options?: {
    blogPost?: BlogPost | null;
    serviceSlug?: string;
    seoTool?: any;
    pageData?: any;
  }
) {
  if (typeof document === "undefined") return;

  try {
    const schemaGraph = buildPageSchemaGraph(routePath, options);

    // Locate or create the primary schema tag in <head>
    let primaryScript = document.getElementById("metazivo-schema-org") as HTMLScriptElement | null;
    if (!primaryScript) {
      primaryScript = document.createElement("script");
      primaryScript.id = "metazivo-schema-org";
      primaryScript.type = "application/ld+json";
      document.head.appendChild(primaryScript);
    }
    primaryScript.textContent = JSON.stringify(schemaGraph, null, 2);

    // Clean up old custom injected schema scripts
    const oldCustomScripts = document.querySelectorAll(".metazivo-custom-schema-tag");
    oldCustomScripts.forEach((el) => el.remove());

    // If blog post has custom standalone schemas that weren't simple objects, also append them cleanly
    if (options?.blogPost?.schemas && Array.isArray(options.blogPost.schemas)) {
      for (const sch of options.blogPost.schemas) {
        if (!sch || !sch.jsonData) continue;
        try {
          const parsed = typeof sch.jsonData === "string" ? JSON.parse(sch.jsonData) : sch.jsonData;
          // If it's a standalone full JSON-LD document with @context, inject as additional script in <head>
          if (parsed && parsed["@context"] && !parsed["@graph"]) {
            const customScript = document.createElement("script");
            customScript.className = "metazivo-custom-schema-tag";
            customScript.type = "application/ld+json";
            customScript.textContent = typeof sch.jsonData === "string" ? sch.jsonData : JSON.stringify(parsed, null, 2);
            document.head.appendChild(customScript);
          }
        } catch (_) {
          // ignore parsing error for standalone tag
        }
      }
    }
  } catch (err) {
    console.error("Failed to inject schema markup to head:", err);
  }
}
