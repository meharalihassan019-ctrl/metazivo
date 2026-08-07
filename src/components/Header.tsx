/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from "react";
import { Menu, X, Phone, Mail, Globe, ChevronDown, Zap } from "lucide-react";

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
        <div 
          onClick={() => handleNavClick("home")} 
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
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.tab}
              id={`nav-link-${item.tab}`}
              onClick={() => handleNavClick(item.tab)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                currentTab === item.tab
                  ? "bg-[#FF5722] text-white shadow-[0_4px_12px_rgba(255,87,34,0.25)]"
                  : "text-slate-600 hover:text-[#FF5722] hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Interactive Free Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              onMouseEnter={() => setToolsDropdownOpen(true)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                currentTab === "tools/website-speed-test"
                  ? "bg-[#FF5722] text-white shadow-[0_4px_12px_rgba(255,87,34,0.25)]"
                  : "text-slate-600 hover:text-[#FF5722] hover:bg-slate-50"
              }`}
            >
              Free Tools <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {toolsDropdownOpen && (
              <div 
                className="absolute left-0 mt-2 w-56 bg-white border border-slate-200/80 rounded-2xl p-2 shadow-xl z-50 animate-fade-in"
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNavClick("tools/website-speed-test")}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    currentTab === "tools/website-speed-test"
                      ? "bg-[#FF5722]/10 text-[#FF5722]"
                      : "text-slate-700 hover:text-[#FF5722] hover:bg-slate-50"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 shrink-0 text-[#FF5722]" />
                  <div className="flex flex-col">
                    <span>Website Speed Test</span>
                    <span className="text-[10px] text-slate-400 font-light mt-0.5">Test Core Web Vitals</span>
                  </div>
                </button>
              </div>
            )}
          </div>
          <button
            key="contact"
            id="nav-link-contact"
            onClick={() => handleNavClick("contact")}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
              currentTab === "contact"
                ? "bg-[#FF5722] text-white shadow-[0_4px_12px_rgba(255,87,34,0.25)]"
                : "text-slate-600 hover:text-[#FF5722] hover:bg-slate-50"
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Action button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick("contact")}
            className="hidden sm:inline-flex px-6 py-2.5 bg-[#FF5722] hover:bg-[#FF7043] rounded-full text-white text-xs font-semibold tracking-wide transition-all shadow-[0_4px_12px_rgba(255,87,34,0.3)] cursor-pointer hover:scale-[1.02] active:scale-95 duration-150"
          >
            Get a Quote
          </button>
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
        <div className="md:hidden w-full border-t border-slate-100 bg-white px-4 py-3 space-y-2 absolute top-full left-0 shadow-xl animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleNavClick(item.tab)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium block ${
                currentTab === item.tab
                  ? "bg-[#FF5722] text-white"
                  : "text-slate-600 hover:text-[#FF5722] hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
          {/* Mobile Tools Dropdown */}
          <div className="space-y-1">
            <button
              onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between text-slate-600 hover:text-[#FF5722] hover:bg-slate-50"
            >
              <span>Free Tools</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileToolsOpen ? "rotate-180 text-[#FF5722]" : "text-slate-400"}`} />
            </button>
            {mobileToolsOpen && (
              <div className="pl-4 py-1 space-y-1 bg-slate-50/50 rounded-xl">
                <button
                  onClick={() => handleNavClick("tools/website-speed-test")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    currentTab === "tools/website-speed-test"
                      ? "bg-[#FF5722] text-white font-black"
                      : "text-slate-600 hover:text-[#FF5722]"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  <span>Website Speed Test</span>
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => handleNavClick("contact")}
            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium block ${
              currentTab === "contact"
                ? "bg-[#FF5722] text-white"
                : "text-slate-600 hover:text-[#FF5722] hover:bg-slate-50"
            }`}
          >
            Contact
          </button>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick("contact")}
              className="w-full py-2.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-full text-xs font-semibold text-center transition-all shadow-[0_4px_12px_rgba(255,87,34,0.25)]"
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
