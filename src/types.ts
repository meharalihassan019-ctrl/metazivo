/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML or Markdown content
  status: 'draft' | 'published' | 'scheduled';
  publishDate: string; // ISO string
  featuredImage: string;
  gallery: string[];
  readingTime: number; // minutes
  featured: boolean;
  sticky: boolean;
  categories: string[];
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: 'Admin' | 'Editor' | 'Author';
  };
  // Advanced SEO Fields
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  focusKeywords: string[];
  canonicalUrl: string;
  robotsMeta: {
    index: boolean;
    follow: boolean;
  };
  openGraph: {
    title: string;
    description: string;
    image: string;
  };
  twitterCard: {
    cardType: 'summary_card' | 'summary_large_image';
    title: string;
    description: string;
    image: string;
  };
  breadcrumbTitle: string;
  seoScore: number;
  schemas: SchemaConfig[];
}

export interface SchemaConfig {
  id: string;
  type: 'Article' | 'BlogPosting' | 'WebSite' | 'Organization' | 'LocalBusiness' | 'Person' | 'Service' | 'FAQ' | 'Breadcrumb' | 'Custom';
  jsonData: string; // JSON-LD string
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  size: number; // in bytes
  mimeType: string;
  folder: string; // e.g. "portfolio", "blog", "general"
  altText: string;
  caption?: string;
  title?: string;
  createdAt: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  createdAt: string;
  notes?: string;
}

export interface RedirectRule {
  id: string;
  fromPath: string; // e.g. "/old-services"
  toPath: string; // e.g. "/services"
  statusCode: 301 | 302;
  createdAt: string;
  hits: number;
}

export interface ActivityLog {
  id: string;
  user: string;
  role: string;
  action: string; // e.g. "Updated Blog: Grow with Local SEO"
  timestamp: string;
}

export interface AnalyticsSummary {
  visitors: number;
  pageViews: number;
  leadsCount: number;
  blogCount: number;
  averageSeoScore: number;
  viewsHistory: { date: string; views: number; visitors: number }[];
  leadsByService: { service: string; count: number }[];
}

export interface AgencyService {
  id: string;
  title: string;
  slug: string;
  icon: string; // Lucide icon name
  description: string;
  longDescription: string;
  benefits: string[];
  process: string[];
}
