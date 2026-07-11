/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Phone, Mail, MapPin, ArrowUp, CheckCircle, Globe } from "lucide-react";

interface FooterProps {
  onNavigate: (tab: string) => void;
  contactInfo?: { phone: string; email: string; address: string };
  customPages?: { title: string; slug: string; isSystem: boolean }[];
}

export default function Footer({ onNavigate, contactInfo, customPages }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-white/5 backdrop-blur-md border-t border-white/10 text-slate-300 font-sans mt-auto" id="app-footer">
      {/* Brand values banner */}
      <div className="w-full border-b border-white/5 bg-white/5 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center justify-center p-2">
            <CheckCircle className="w-5 h-5 text-blue-400 mb-1" />
            <span className="text-sm font-semibold text-white">99+ PageSpeed Rating</span>
            <span className="text-xs text-slate-500">Core Web Vitals Standard</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <CheckCircle className="w-5 h-5 text-blue-400 mb-1" />
            <span className="text-sm font-semibold text-white">AI-Powered CMS</span>
            <span className="text-xs text-slate-500">Gemini-integrated dashboard</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <CheckCircle className="w-5 h-5 text-blue-400 mb-1" />
            <span className="text-sm font-semibold text-white">Zero Bloat Code</span>
            <span className="text-xs text-slate-500">Node LTS & Clean React</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <CheckCircle className="w-5 h-5 text-blue-400 mb-1" />
            <span className="text-sm font-semibold text-white">Hostinger Optimized</span>
            <span className="text-xs text-slate-500">Instant Deployable Package</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand identity column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("home")}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] text-lg">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-wide">Metazivo</span>
              <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono -mt-1">Digital Agency</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Metazivo is a full-service, enterprise digital agency crafting ultra-fast web architectures, high-ROI paid ads, and technical SEO platforms to multiply business growth.
          </p>
          <div className="flex flex-col gap-2 text-xs">
            <a href={contactInfo?.phone ? `tel:${contactInfo.phone.replace(/[^+\d]/g, "")}` : "tel:+923288518557"} className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{contactInfo?.phone || "+92 328 8518557"}</span>
            </a>
            <a href={`mailto:${contactInfo?.email || "mai@metazivo.com"}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>{contactInfo?.email || "mai@metazivo.com"}</span>
            </a>
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{contactInfo?.address || "Office 402, Metazivo Heights, Lahore, Pakistan"}</span>
            </div>
          </div>
        </div>

        {/* Services shortcut column */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Our Services</h3>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => onNavigate("services")} className="hover:text-blue-400 transition-colors">Website Development</button></li>
            <li><button onClick={() => onNavigate("services")} className="hover:text-blue-400 transition-colors">WordPress Themes</button></li>
            <li><button onClick={() => onNavigate("services")} className="hover:text-blue-400 transition-colors">WooCommerce & Shopify</button></li>
            <li><button onClick={() => onNavigate("services")} className="hover:text-blue-400 transition-colors">Technical SEO Audits</button></li>
            <li><button onClick={() => onNavigate("services")} className="hover:text-blue-400 transition-colors">Meta & Google Paid Ads</button></li>
            <li><button onClick={() => onNavigate("services")} className="hover:text-blue-400 transition-colors">Speed Optimization</button></li>
          </ul>
        </div>

        {/* Agency Navigation Column */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => onNavigate("home")} className="hover:text-blue-400 transition-colors">Home Dashboard</button></li>
            <li><button onClick={() => onNavigate("about")} className="hover:text-blue-400 transition-colors">Company About</button></li>
            <li><button onClick={() => onNavigate("portfolio")} className="hover:text-blue-400 transition-colors">Our Portfolio</button></li>
            <li><button onClick={() => onNavigate("blog")} className="hover:text-blue-400 transition-colors">Growth Blogging</button></li>
            <li><button onClick={() => onNavigate("pricing")} className="hover:text-blue-400 transition-colors">Pricing Packages</button></li>
            <li><button onClick={() => onNavigate("contact")} className="hover:text-blue-400 transition-colors">Request Callback</button></li>
            {customPages && customPages.filter(p => !p.isSystem).map((p) => (
              <li key={p.slug}>
                <button onClick={() => onNavigate(p.slug)} className="hover:text-blue-400 transition-colors text-left">{p.title}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal and XML sitemaps column */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Compliance & SEO Feeds</h3>
          <ul className="space-y-2.5 text-xs">
            <li><button onClick={() => onNavigate("privacy")} className="hover:text-blue-400 transition-colors">Privacy Policy</button></li>
            <li><button onClick={() => onNavigate("terms")} className="hover:text-blue-400 transition-colors">Terms & Conditions</button></li>
            <li>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-all">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>XML Sitemap Generator</span>
              </a>
            </li>
            <li>
              <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-all">
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                <span>Live Blog RSS Feed</span>
              </a>
            </li>
            <li>
              <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded border border-white/10 transition-all text-[10px] font-mono">
                robots.txt
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Under footer segment */}
      <div className="w-full bg-[#020617]/50 border-t border-white/5 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <span>&copy; {new Date().getFullYear()} Metazivo. All Rights Reserved. Designed & Developed for Hostinger Node Hosting.</span>
          <button
            onClick={scrollToTop}
            id="back-to-top"
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white rounded-lg transition-all shadow-md"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
