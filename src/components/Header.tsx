/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Menu, X, Phone, Mail, Globe } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  contactInfo?: { phone: string; email: string };
  customPages?: { title: string; slug: string; isSystem: boolean }[];
}

export default function Header({ currentTab, onNavigate, contactInfo, customPages }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const defaultNavItems = [
    { label: "Home", tab: "home" },
    { label: "About", tab: "about" },
    { label: "Services", tab: "services" },
    { label: "Portfolio", tab: "portfolio" },
    { label: "Blog", tab: "blog" },
    { label: "Pricing", tab: "pricing" },
    { label: "Contact", tab: "contact" }
  ];

  const customNavItems = (customPages || [])
    .filter(p => !p.isSystem)
    .map(p => ({ label: p.title, tab: p.slug }));

  const navItems = [...defaultNavItems, ...customNavItems];

  const handleNavClick = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  const formattedPhoneLink = contactInfo?.phone ? `tel:${contactInfo.phone.replace(/[^+\d]/g, "")}` : "tel:+923288518557";
  const displayPhone = contactInfo?.phone || "+92 328 8518557";
  const displayEmail = contactInfo?.email || "mai@metazivo.com";

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm" id="app-header">
      {/* Top micro header with phone and email */}
      <div className="w-full bg-slate-50 border-b border-slate-100 py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-slate-600 font-sans">
          <div className="flex items-center gap-4">
            <a href={formattedPhoneLink} className="flex items-center gap-1.5 hover:text-[#FF5722] transition-colors font-medium">
              <Phone className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>{displayPhone}</span>
            </a>
            <a href={`mailto:${displayEmail}`} className="flex items-center gap-1.5 hover:text-[#FF5722] transition-colors font-medium">
              <Mail className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>{displayEmail}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-slate-400 font-medium">
              <Globe className="w-3 h-3 text-[#FF5722]" /> Premium Agency Network
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("home")} id="brand-logo">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF5722] to-[#FF8A50] flex items-center justify-center font-bold text-white shadow-[0_4px_12px_rgba(255,87,34,0.3)] text-lg tracking-wider">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900 tracking-wide font-sans">Metazivo</span>
            <span className="text-[9px] text-[#FF5722] uppercase tracking-widest font-mono font-medium -mt-1">Digital Agency</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.tab}
              id={`nav-link-${item.tab}`}
              onClick={() => handleNavClick(item.tab)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                currentTab === item.tab
                  ? "bg-[#FF5722] text-white shadow-[0_4px_12px_rgba(255,87,34,0.25)]"
                  : "text-slate-600 hover:text-[#FF5722] hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
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
