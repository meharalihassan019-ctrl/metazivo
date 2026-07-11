/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Menu, X, Phone, Mail, LayoutDashboard, Globe } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenAdmin: () => void;
}

export default function Header({ currentTab, onNavigate, onOpenAdmin }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", tab: "home" },
    { label: "About", tab: "about" },
    { label: "Services", tab: "services" },
    { label: "Portfolio", tab: "portfolio" },
    { label: "Blog", tab: "blog" },
    { label: "Pricing", tab: "pricing" },
    { label: "Contact", tab: "contact" }
  ];

  const handleNavClick = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-lg" id="app-header">
      {/* Top micro header with phone and email */}
      <div className="w-full bg-white/5 border-b border-white/5 py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-slate-300 font-sans">
          <div className="flex items-center gap-4">
            <a href="tel:+923288518557" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>+92 328 8518557</span>
            </a>
            <a href="mailto:mai@metazivo.com" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>mai@metazivo.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-slate-500">
              <Globe className="w-3 h-3 text-emerald-500" /> Hostinger Optimized Node LTS
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("home")} id="brand-logo">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] text-lg tracking-wider">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-wide font-sans">Metazivo</span>
            <span className="text-[9px] text-slate-300 uppercase tracking-widest font-mono font-medium -mt-1">Digital Agency</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.tab}
              id={`nav-link-${item.tab}`}
              onClick={() => handleNavClick(item.tab)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                currentTab === item.tab
                  ? "bg-white/15 text-white border border-white/20 backdrop-blur-md shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            id="admin-dashboard-btn"
            onClick={onOpenAdmin}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-lg text-xs font-medium tracking-wide transition-all duration-150 shadow-md backdrop-blur-md"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Admin Portal</span>
          </button>

          <button
            onClick={() => handleNavClick("contact")}
            className="hidden sm:inline-flex px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-full text-white text-xs font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          >
            Get a Quote
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full border-t border-white/10 bg-[#020617]/95 px-4 py-3 space-y-2 absolute top-full left-0 shadow-2xl backdrop-blur-xl">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleNavClick(item.tab)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium block ${
                currentTab === item.tab
                  ? "bg-white/10 text-white border border-white/10"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 bg-white/5 text-slate-300 border border-white/10 rounded-lg text-xs font-medium"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" /> Admin CMS Panel
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-semibold text-center transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
