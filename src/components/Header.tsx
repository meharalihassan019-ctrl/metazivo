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
  const displayEmail = contactInfo?.email || "mai@metazivo.com";

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
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                currentTab === "seo-tools" || currentTab === "free-tools" || currentTab === "tools/website-speed-test"
                  ? "bg-[#FF5722] text-white shadow-[0_4px_12px_rgba(255,87,34,0.25)]"
                  : "text-slate-600 hover:text-[#FF5722] hover:bg-slate-50"
              }`}
            >
              <span>SEO Tools</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-75" />
            </a>
            {toolsDropdownOpen && (
              <div 
                className="absolute left-0 mt-2 w-72 bg-white border border-slate-200/90 rounded-2xl p-2 shadow-2xl z-50 animate-fade-in"
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <a
                  href="/seo-tools"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("seo-tools");
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                    currentTab === "seo-tools"
                      ? "bg-[#FF5722]/10 text-[#FF5722]"
                      : "text-slate-700 hover:text-[#FF5722] hover:bg-slate-50"
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#FF5722] shrink-0">
                    <Wrench className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">SEO Tools Suite (30 Tools)</span>
                    <span className="text-[10px] text-slate-400 font-light">Audit, Schema, Robots, Intent & More</span>
                  </div>
                </a>
                <a
                  href="/tools/website-speed-test"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("tools/website-speed-test");
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer mt-1 ${
                    currentTab === "tools/website-speed-test"
                      ? "bg-[#FF5722]/10 text-[#FF5722]"
                      : "text-slate-700 hover:text-[#FF5722] hover:bg-slate-50"
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#FF5722] shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">Website Speed Test</span>
                    <span className="text-[10px] text-slate-400 font-light">Live Core Web Vitals Audit</span>
                  </div>
                </a>
                <a
                  href="/free-tools"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("free-tools");
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer mt-1 ${
                    currentTab === "free-tools"
                      ? "bg-[#FF5722]/10 text-[#FF5722]"
                      : "text-slate-700 hover:text-[#FF5722] hover:bg-slate-50"
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#FF5722] shrink-0">
                    <Wrench className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">SERP Preview Generator</span>
                    <span className="text-[10px] text-slate-400 font-light">Free SEO Snippet Creator</span>
                  </div>
                </a>
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
        <div className="flex items-center gap-3">
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
            className="hidden sm:inline-flex px-6 py-2.5 bg-[#FF5722] hover:bg-[#FF7043] rounded-full text-white text-xs font-semibold tracking-wide transition-all shadow-[0_4px_12px_rgba(255,87,34,0.3)] cursor-pointer hover:scale-[1.02] active:scale-95 duration-150"
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
        <div className="md:hidden w-full border-t border-slate-100 bg-white px-4 py-3 space-y-2 absolute top-full left-0 shadow-xl animate-fade-in z-[100]">
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
          {/* Mobile Tools Navigation */}
          <div className="space-y-1">
            <div className="flex items-center justify-between rounded-md bg-slate-50/80 border border-slate-200/60 p-1">
              <a
                href="/seo-tools"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("seo-tools");
                }}
                className={`flex-1 text-left px-3 py-2 rounded-md text-sm font-semibold transition-colors block ${
                  currentTab === "seo-tools"
                    ? "bg-[#FF5722] text-white"
                    : "text-slate-800 hover:text-[#FF5722]"
                }`}
              >
                SEO Tools
              </a>
              <button
                type="button"
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className="p-2 text-slate-500 hover:text-[#FF5722] cursor-pointer"
                aria-label="Toggle SEO Tools Submenu"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileToolsOpen ? "rotate-180 text-[#FF5722]" : ""}`} />
              </button>
            </div>
            {mobileToolsOpen && (
              <div className="pl-3 py-1 space-y-1 bg-slate-50/50 rounded-xl border border-slate-100 mt-1">
                <a
                  href="/seo-tools"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("seo-tools");
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    currentTab === "seo-tools"
                      ? "bg-[#FF5722] text-white font-black"
                      : "text-slate-700 hover:text-[#FF5722]"
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5 shrink-0" />
                  <span>SEO Tools Suite (30 Tools)</span>
                </a>
                <a
                  href="/tools/website-speed-test"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("tools/website-speed-test");
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    currentTab === "tools/website-speed-test"
                      ? "bg-[#FF5722] text-white font-black"
                      : "text-slate-700 hover:text-[#FF5722]"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  <span>Website Speed Test</span>
                </a>
                <a
                  href="/free-tools"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("free-tools");
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    currentTab === "free-tools"
                      ? "bg-[#FF5722] text-white font-black"
                      : "text-slate-700 hover:text-[#FF5722]"
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5 shrink-0" />
                  <span>SERP Preview Generator</span>
                </a>
              </div>
            )}
          </div>
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
