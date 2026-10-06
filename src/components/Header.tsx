/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from "react";
import { Menu, X, Phone, Mail, Globe, ChevronDown, Zap, Wrench } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  contactInfo?: { phone: string; email: string };
  customPages?: { title: string; slug: string; isSystem: boolean }[];
}

export default function Header({ currentTab, onNavigate, contactInfo, customPages }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const defaultNavItems = [
    { label: "Home", tab: "home" },
    { label: "About", tab: "about" },
    { label: "Services", tab: "services" },
    { label: "Portfolio", tab: "portfolio" },
    { label: "Blog", tab: "blog" },
    { label: "Pricing", tab: "pricing" }
  ];

  const customNavItems = (customPages || [])
    .filter(p => !p.isSystem)
    .map(p => ({ label: p.title, tab: p.slug }));

  const navItems = [...defaultNavItems, ...customNavItems];

  const handleNavClick = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  };

  const formattedPhoneLink = contactInfo?.phone ? `tel:${contactInfo.phone.replace(/[^+\d]/g, "")}` : "tel:+923288518557";
  const displayPhone = contactInfo?.phone || "+92 328 8518557";
  const displayEmail = (!contactInfo?.email || contactInfo.email.trim() === "mai@metazivo.com") 
    ? "mail@metazivo.com" 
    : contactInfo.email;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
        {/* Brand Logo */}
        <a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }} 
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo"
        >
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="w-full h-full bg-[#FF5722]/10 rounded-[11px] flex items-center justify-center border border-[#FF5722]/20 shadow-sm">
              <svg className="w-5 h-5 text-[#FF5722]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-xl font-black text-slate-900 tracking-tight font-sans transition-colors group-hover:text-slate-950">
                Meta<span className="text-[#FF5722]">zivo</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] self-end mb-1.5 animate-pulse" />
            </div>
            <span className="text-[9px] text-[#FF5722] uppercase tracking-[0.25em] font-mono font-bold -mt-1 group-hover:text-slate-900 transition-colors">
              Growth Engine
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.tab}
              id={`nav-link-${item.tab}`}
              href={item.tab === "home" ? "/" : `/${item.tab}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.tab);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                currentTab === item.tab
                  ? "bg-[#FF5722] text-white shadow-[0_4px_12px_rgba(255,87,34,0.25)]"
                  : "text-slate-600 hover:text-[#FF5722] hover:bg-slate-50"
              }`}
            >
              {item.label}
            </a>
          ))}

          {/* Desktop Free Tools Navigation Link & Submenu */}
          <div className="relative group/tools">
            <a
              id="nav-link-free-tools"
              href="/seo-tools"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("seo-tools");
              }}
              onMouseEnter={() => setToolsDropdownOpen(true)}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                currentTab === "seo-tools" || currentTab === "free-tools" || currentTab === "tools/website-speed-test"
                  ? "bg-[#FF5722] text-white shadow-[0_4px_12px_rgba(255,87,34,0.25)]"
                  : "text-slate-800 hover:text-[#FF5722] hover:bg-slate-50"
              }`}
            >
              <span>SEO Tools Suite</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-orange-100 text-[#FF5722] border border-orange-200 font-extrabold">32</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-75" />
            </a>
            {toolsDropdownOpen && (
              <div 
                className="absolute left-0 mt-2 w-80 bg-white border border-slate-200/90 rounded-2xl p-2.5 shadow-2xl z-50 animate-fade-in"
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Featured SEO Tools</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">100% Free</span>
                </div>

                <a
                  href="/tools/seo-audit-checker"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("tools/seo-audit-checker");
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer text-slate-800 hover:text-[#FF5722] hover:bg-orange-50/50"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-100/70 border border-orange-200/80 flex items-center justify-center text-[#FF5722] shrink-0 font-bold">
                    🔍
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">SEO Audit Checker</span>
                    <span className="text-[10px] text-slate-400 font-light">Full On-Page & Technical Health Test</span>
                  </div>
                </a>

                <a
                  href="/tools/meta-tag-generator"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("tools/meta-title-description-generator");
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer text-slate-800 hover:text-[#FF5722] hover:bg-orange-50/50"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-100/70 border border-orange-200/80 flex items-center justify-center text-[#FF5722] shrink-0 font-bold">
                    🏷️
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Meta Tag Generator & SERP Preview</span>
                    <span className="text-[10px] text-slate-400 font-light">Google SERP Snippet Preview Tool</span>
                  </div>
                </a>

                <a
                  href="/tools/incoming-links-checker"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("tools/incoming-links-checker");
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer text-slate-800 hover:text-[#FF5722] hover:bg-orange-50/50"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-100/70 border border-orange-200/80 flex items-center justify-center text-[#FF5722] shrink-0 font-bold">
                    🔗
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Toxic Links & Backlink Checker</span>
                    <span className="text-[10px] text-slate-400 font-light">Inbound Links & Spam Score Audit</span>
                  </div>
                </a>

                <a
                  href="/tools/keyword-clustering"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("tools/keyword-clustering");
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer text-slate-800 hover:text-[#FF5722] hover:bg-orange-50/50"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-100/70 border border-orange-200/80 flex items-center justify-center text-[#FF5722] shrink-0 font-bold">
                    📊
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Keyword Clustering & Topical Map</span>
                    <span className="text-[10px] text-slate-400 font-light">Semantic Search Silo Builder</span>
                  </div>
                </a>

                <a
                  href="/tools/website-speed-test"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("tools/website-speed-test");
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer text-slate-800 hover:text-[#FF5722] hover:bg-orange-50/50"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-100/70 border border-orange-200/80 flex items-center justify-center text-[#FF5722] shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Website Speed Test</span>
                    <span className="text-[10px] text-slate-400 font-light">Live Core Web Vitals & TTFB Probe</span>
                  </div>
                </a>

                <a
                  href="/tools/broken-link-checker"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("tools/broken-link-checker");
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer text-slate-800 hover:text-[#FF5722] hover:bg-orange-50/50"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-100/70 border border-orange-200/80 flex items-center justify-center text-[#FF5722] shrink-0 font-bold">
                    ⚠️
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Broken Link & 404 Checker</span>
                    <span className="text-[10px] text-slate-400 font-light">Detect Dead Links & Redirections</span>
                  </div>
                </a>

                <div className="border-t border-slate-100 pt-1.5 mt-1">
                  <a
                    href="/seo-tools"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("seo-tools");
                    }}
                    className="w-full text-center py-2 px-3 rounded-xl text-xs font-extrabold text-[#FF5722] hover:bg-orange-50 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Explore All 32 Free SEO Tools Suite</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            )}
          </div>
          <a
            key="contact"
            id="nav-link-contact"
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              currentTab === "contact"
                ? "bg-[#FF5722] text-white shadow-[0_4px_12px_rgba(255,87,34,0.25)]"
                : "text-slate-600 hover:text-[#FF5722] hover:bg-slate-50"
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Action button & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Direct Free Tools Suite Primary CTA Button */}
          <a
            href="/seo-tools"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("seo-tools");
            }}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-gradient-to-r from-[#FF5722] to-orange-600 hover:from-[#FF7043] hover:to-orange-500 text-white rounded-full text-xs font-black tracking-wide transition-all shadow-[0_4px_14px_rgba(255,87,34,0.35)] cursor-pointer hover:scale-[1.02] active:scale-95 duration-150"
            title="Launch Free SEO Tools Suite"
            id="header-cta-seo-tools"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">SEO Tools Suite</span>
            <span className="xs:hidden">SEO Tools</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-white text-[10px] font-mono font-extrabold">32</span>
          </a>

          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
            className="hidden sm:inline-flex px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-full text-white text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer hover:scale-[1.02] active:scale-95 duration-150"
          >
            Get a Quote
          </a>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full border-t border-slate-100 bg-white px-4 py-3 space-y-2 absolute top-full left-0 shadow-xl animate-fade-in z-[100] max-h-[85vh] overflow-y-auto">
          {/* Mobile High-Priority SEO Tools Banner */}
          <div className="p-3 bg-gradient-to-br from-orange-50 to-amber-50/50 border border-orange-200/80 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black text-[#FF5722] uppercase tracking-wider flex items-center gap-1">
                <Wrench className="w-3 h-3" /> Primary Free Utilities
              </span>
              <span className="text-[9px] font-mono font-bold bg-[#FF5722] text-white px-1.5 py-0.5 rounded-full">32 Free</span>
            </div>
            <a
              href="/seo-tools"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("seo-tools");
              }}
              className="block w-full text-center py-2 px-3 bg-[#FF5722] text-white rounded-xl text-xs font-extrabold shadow-sm hover:bg-[#FF7043]"
            >
              Explore Full 32 SEO Tools Suite &rarr;
            </a>
            <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
              <a
                href="/tools/seo-audit-checker"
                onClick={(e) => { e.preventDefault(); handleNavClick("tools/seo-audit-checker"); }}
                className="p-1.5 bg-white rounded-lg border border-slate-200/80 font-bold text-slate-800 hover:text-[#FF5722]"
              >
                🔍 SEO Audit
              </a>
              <a
                href="/tools/meta-title-description-generator"
                onClick={(e) => { e.preventDefault(); handleNavClick("tools/meta-title-description-generator"); }}
                className="p-1.5 bg-white rounded-lg border border-slate-200/80 font-bold text-slate-800 hover:text-[#FF5722]"
              >
                🏷️ Meta Tags
              </a>
              <a
                href="/tools/incoming-links-checker"
                onClick={(e) => { e.preventDefault(); handleNavClick("tools/incoming-links-checker"); }}
                className="p-1.5 bg-white rounded-lg border border-slate-200/80 font-bold text-slate-800 hover:text-[#FF5722]"
              >
                🔗 Toxic Links
              </a>
              <a
                href="/tools/website-speed-test"
                onClick={(e) => { e.preventDefault(); handleNavClick("tools/website-speed-test"); }}
                className="p-1.5 bg-white rounded-lg border border-slate-200/80 font-bold text-slate-800 hover:text-[#FF5722]"
              >
                ⚡ Speed Test
              </a>
            </div>
          </div>

          {navItems.map((item) => (
            <a
              key={item.tab}
              href={item.tab === "home" ? "/" : `/${item.tab}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.tab);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium block ${
                currentTab === item.tab
                  ? "bg-[#FF5722] text-white"
                  : "text-slate-600 hover:text-[#FF5722] hover:bg-slate-50"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium block ${
              currentTab === "contact"
                ? "bg-[#FF5722] text-white"
                : "text-slate-600 hover:text-[#FF5722] hover:bg-slate-50"
            }`}
          >
            Contact
          </a>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("contact");
              }}
              className="w-full py-2.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-full text-xs font-semibold text-center transition-all shadow-[0_4px_12px_rgba(255,87,34,0.25)] block"
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
