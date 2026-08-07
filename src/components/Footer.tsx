import React from "react";

interface FooterProps {
  onNavigate: (tab: string) => void;
  contactInfo?: { phone: string; email: string; address?: string };
  socialLinks?: { type: string; url: string }[]; customPages?: any[];
}

export default function Footer({ onNavigate, contactInfo, socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tab: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onNavigate(tab);
  };

  const displayPhone = contactInfo?.phone || "+92 328 8518557";
  const displayEmail = contactInfo?.email || "mai@metazivo.com";
  const formattedPhoneLink = `tel:${displayPhone.replace(/[^+\d]/g, "")}`;

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-16 relative overflow-hidden selection:bg-[#FF5722]/30 selection:text-white">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#FF5722_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[#FF5722]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8 mb-12">
          <div className="md:col-span-1 space-y-4">
            <div 
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="w-full h-full bg-[#FF5722] rounded-[12px] flex items-center justify-center shadow-[0_4px_15px_rgba(255,87,34,0.3)]">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tight font-sans transition-colors group-hover:text-slate-200">
                  Meta<span className="text-[#FF5722]">zivo</span>
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 font-light leading-relaxed max-w-xs mt-4">
              AI-driven digital infrastructure, advanced SEO architectures, and modern web application development.
            </p>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
              Navigation
            </h4>
            <ul className="space-y-3.5">
              <li><button onClick={() => handleNavClick("home")} className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> Home</button></li>
              <li><button onClick={() => handleNavClick("about")} className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> About</button></li>
              <li><button onClick={() => handleNavClick("services")} className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> Services</button></li>
              <li><button onClick={() => handleNavClick("portfolio")} className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> Portfolio</button></li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
              Resources
            </h4>
            <ul className="space-y-3.5">
              <li><button onClick={() => handleNavClick("blog")} className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> Blog</button></li>
              <li><button onClick={() => handleNavClick("pricing")} className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> Pricing</button></li>
              <li><button onClick={() => handleNavClick("tools/website-speed-test")} className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> Free SEO Tools</button></li>
              <li><button onClick={() => handleNavClick("contact")} className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> Contact</button></li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <a href={formattedPhoneLink} className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors block leading-relaxed">{displayPhone}</a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 6l-10 7L2 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <a href={`mailto:${displayEmail}`} className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors block leading-relaxed">{displayEmail}</a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="text-slate-400 text-sm leading-relaxed block">
                  {contactInfo?.address || "Global Operations, Virtual HQ"}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs flex items-center gap-2">
            © {currentYear} Metazivo. All rights reserved. <span className="w-1 h-1 rounded-full bg-slate-700 block" /> <span className="font-mono text-[10px] tracking-widest uppercase">System v4.2</span>
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-slate-500 hover:text-[#FF5722] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-xs text-slate-500 hover:text-[#FF5722] cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
