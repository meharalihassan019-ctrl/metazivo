import React from "react";

interface FooterProps {
  onNavigate: (tab: string) => void;
  contactInfo?: { phone: string; email: string; address?: string; facebook?: string; instagram?: string; linkedin?: string; whatsapp?: string };
  socialLinks?: { type: string; url: string }[];
  customPages?: any[];
}

export default function Footer({ onNavigate, contactInfo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tab: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onNavigate(tab);
  };

  const displayPhone = contactInfo?.phone || "+92 328 8518557";
  const displayEmail = (!contactInfo?.email || contactInfo.email.trim() === "mai@metazivo.com") 
    ? "mail@metazivo.com" 
    : contactInfo.email;
  const displayAddress = contactInfo?.address || "Office 402, Metazivo Heights, Sector F-5, Islamabad, 44000, Pakistan";
  const formattedPhoneLink = `tel:${displayPhone.replace(/[^+\d]/g, "")}`;

  const facebookUrl = contactInfo?.facebook || "https://www.facebook.com/share/1DLnu9iaHK/";
  const instagramUrl = contactInfo?.instagram || "https://instagram.com/metazivo";
  const linkedinUrl = contactInfo?.linkedin || "https://www.linkedin.com/in/ali-hassan-a5011240a";
  const youtubeUrl = "https://www.youtube.com/@metazivo";
  const twitterUrl = "https://twitter.com/metazivo";

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-16 relative overflow-hidden selection:bg-[#FF5722]/30 selection:text-white" id="main-footer">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#FF5722_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[#FF5722]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8 mb-12">
          <div className="md:col-span-1 space-y-4">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("home");
              }}
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
            </a>
            <p className="text-sm text-slate-400 font-light leading-relaxed max-w-xs mt-4">
              AI-driven digital infrastructure, advanced SEO architectures, and modern web application development.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-mono block mb-3 font-semibold">Follow Metazivo</span>
              <div className="flex items-center gap-2.5">
                <a 
                  href={facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Metazivo on Facebook" 
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#FF5722] text-slate-400 hover:text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a 
                  href={instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Metazivo on Instagram" 
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#FF5722] text-slate-400 hover:text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Metazivo on LinkedIn" 
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#FF5722] text-slate-400 hover:text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.761-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a 
                  href={youtubeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Metazivo on YouTube" 
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#FF5722] text-slate-400 hover:text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a 
                  href={twitterUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Metazivo on X Twitter" 
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#FF5722] text-slate-400 hover:text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
              Navigation
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a 
                  href="/" 
                  onClick={(e) => { e.preventDefault(); handleNavClick("home"); }} 
                  className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> Home
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  onClick={(e) => { e.preventDefault(); handleNavClick("about"); }} 
                  className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> About
                </a>
              </li>
              <li>
                <a 
                  href="/services" 
                  onClick={(e) => { e.preventDefault(); handleNavClick("services"); }} 
                  className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> Services
                </a>
              </li>
              <li>
                <a 
                  href="/portfolio" 
                  onClick={(e) => { e.preventDefault(); handleNavClick("portfolio"); }} 
                  className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> Portfolio
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
              Resources &amp; Tools
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a 
                  href="/blog" 
                  onClick={(e) => { e.preventDefault(); handleNavClick("blog"); }} 
                  className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> Blog
                </a>
              </li>
              <li>
                <a 
                  href="/pricing" 
                  onClick={(e) => { e.preventDefault(); handleNavClick("pricing"); }} 
                  className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> Pricing
                </a>
              </li>
              <li>
                <a 
                  href="/seo-tools" 
                  onClick={(e) => { e.preventDefault(); handleNavClick("seo-tools"); }} 
                  className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> SEO Tools Suite (31)
                </a>
              </li>
              <li>
                <a 
                  href="/free-tools" 
                  onClick={(e) => { e.preventDefault(); handleNavClick("free-tools"); }} 
                  className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> SERP Preview Generator
                </a>
              </li>
              <li>
                <a 
                  href="/tools/website-speed-test" 
                  onClick={(e) => { e.preventDefault(); handleNavClick("tools/website-speed-test"); }} 
                  className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> Website Speed Test
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  onClick={(e) => { e.preventDefault(); handleNavClick("contact"); }} 
                  className="text-slate-400 hover:text-[#FF5722] text-sm transition-colors text-left flex items-center gap-2 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#FF5722] text-xs">→</span> Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
              Office &amp; Contact
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
                <address className="not-italic text-slate-400 text-sm leading-relaxed block">
                  {displayAddress}
                </address>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs flex items-center gap-2">
            © {currentYear} Metazivo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a 
              href="/privacy-policy" 
              onClick={(e) => { e.preventDefault(); handleNavClick("privacy-policy"); }} 
              className="text-xs text-slate-500 hover:text-[#FF5722] cursor-pointer transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              onClick={(e) => { e.preventDefault(); handleNavClick("terms"); }} 
              className="text-xs text-slate-500 hover:text-[#FF5722] cursor-pointer transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
