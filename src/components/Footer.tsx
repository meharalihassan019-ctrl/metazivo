import React, { useState } from "react";
import { Phone, Mail, MapPin, ArrowUp, CheckCircle, Globe, Send, Check, Facebook, Instagram, Linkedin } from "lucide-react";

interface FooterProps {
  onNavigate: (tab: string) => void;
  contactInfo?: { phone: string; email: string; address: string };
  customPages?: { title: string; slug: string; isSystem: boolean }[];
}

export default function Footer({ onNavigate, contactInfo, customPages }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const displayPhone = contactInfo?.phone || "+92 328 8518557";
  const displayEmail = contactInfo?.email || "mai@metazivo.com";
  const displayLocation = "Pakistan";

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 text-slate-600 font-sans mt-auto" id="app-footer">
      {/* Brand values banner */}
      <div className="w-full border-b border-slate-200 bg-slate-100/50 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center justify-center p-2">
            <CheckCircle className="w-5 h-5 text-[#FF5722] mb-1" />
            <span className="text-sm font-semibold text-slate-900">99+ PageSpeed Rating</span>
            <span className="text-xs text-slate-500">Core Web Vitals Standard</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <CheckCircle className="w-5 h-5 text-[#FF5722] mb-1" />
            <span className="text-sm font-semibold text-slate-900">Custom Dynamic CMS</span>
            <span className="text-xs text-slate-500">Fully integrated dashboard</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <CheckCircle className="w-5 h-5 text-[#FF5722] mb-1" />
            <span className="text-sm font-semibold text-slate-900">Zero Bloat Code</span>
            <span className="text-xs text-slate-500">Fast React Performance</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <CheckCircle className="w-5 h-5 text-[#FF5722] mb-1" />
            <span className="text-sm font-semibold text-slate-900">Hostinger Optimized</span>
            <span className="text-xs text-slate-500">Instant Deployable Package</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand identity column - Span 4 */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate("home")}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF5722] to-[#FF8A50] flex items-center justify-center font-bold text-white shadow-[0_4px_10px_rgba(255,87,34,0.3)] text-lg">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 tracking-wide">Metazivo</span>
              <span className="text-[9px] text-[#FF5722] uppercase tracking-widest font-mono -mt-1">Digital Agency</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Helping businesses grow through professional websites SEO and digital marketing.
          </p>
          <div className="flex flex-col gap-2 text-xs">
            <a href={`tel:${displayPhone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 hover:text-slate-900 transition-colors text-slate-600">
              <Phone className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>Email: {displayEmail}</span>
            </a>
            <a href={`mailto:${displayEmail}`} className="flex items-center gap-2 hover:text-slate-900 transition-colors text-slate-600">
              <Mail className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>Phone: {displayPhone}</span>
            </a>
            <div className="flex items-center gap-2 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>Location: {displayLocation}</span>
            </div>
          </div>

          {/* Social Icons requested */}
          <div className="flex items-center gap-3 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FF5722] hover:text-white flex items-center justify-center text-slate-600 transition-colors shadow-sm" title="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FF5722] hover:text-white flex items-center justify-center text-slate-600 transition-colors shadow-sm" title="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#FF5722] hover:text-white flex items-center justify-center text-slate-600 transition-colors shadow-sm" title="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Services shortcut column - Span 3 */}
        <div className="md:col-span-3">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Services</h3>
          <ul className="space-y-2 text-xs text-slate-500">
            <li><button onClick={() => onNavigate("services")} className="hover:text-[#FF5722] transition-colors cursor-pointer text-left">WordPress Development</button></li>
            <li><button onClick={() => onNavigate("services")} className="hover:text-[#FF5722] transition-colors cursor-pointer text-left">SEO</button></li>
            <li><button onClick={() => onNavigate("services")} className="hover:text-[#FF5722] transition-colors cursor-pointer text-left">Meta Ads</button></li>
            <li><button onClick={() => onNavigate("services")} className="hover:text-[#FF5722] transition-colors cursor-pointer text-left">Google Ads</button></li>
            <li><button onClick={() => onNavigate("services")} className="hover:text-[#FF5722] transition-colors cursor-pointer text-left">WooCommerce</button></li>
            <li><button onClick={() => onNavigate("services")} className="hover:text-[#FF5722] transition-colors cursor-pointer text-left">Website Maintenance</button></li>
          </ul>
        </div>

        {/* Agency Navigation Column - Span 2 */}
        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Quick Links</h3>
          <ul className="space-y-2 text-xs text-slate-500">
            <li><button onClick={() => onNavigate("home")} className="hover:text-[#FF5722] transition-colors cursor-pointer text-left">Home</button></li>
            <li><button onClick={() => onNavigate("services")} className="hover:text-[#FF5722] transition-colors cursor-pointer text-left">Services</button></li>
            <li><button onClick={() => onNavigate("about")} className="hover:text-[#FF5722] transition-colors cursor-pointer text-left">About</button></li>
            <li><button onClick={() => onNavigate("blog")} className="hover:text-[#FF5722] transition-colors cursor-pointer text-left">Blog</button></li>
            <li><button onClick={() => onNavigate("contact")} className="hover:text-[#FF5722] transition-colors cursor-pointer text-left">Contact</button></li>
          </ul>
        </div>

        {/* Newsletter Column - Span 3 */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Stay Ahead</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Subscribe to our newsletter for exclusive SEO blueprints, high-converting copy strategies, and speed audit guides.
          </p>
          <form onSubmit={handleSubscribe} className="relative mt-2">
            <input
              type="email"
              required
              placeholder="Enter your work email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full px-5 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF5722] pr-12 transition-all shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 w-9 h-9 rounded-full bg-[#FF5722] hover:bg-[#FF7043] flex items-center justify-center text-white transition-all shadow-[0_4px_10px_rgba(255,87,34,0.3)] cursor-pointer"
            >
              {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
          {subscribed && (
            <span className="block text-[11px] text-[#FF5722] font-medium animate-fade-in">
              ✦ Thank you! You've successfully subscribed to our growth feed.
            </span>
          )}

          {/* Compliance feed buttons */}
          <div className="pt-2 flex flex-wrap gap-2">
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded border border-slate-200 transition-all text-[10px]">
              <Globe className="w-3 h-3 text-[#FF5722]" />
              <span>Sitemap</span>
            </a>
            <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded border border-slate-200 transition-all text-[10px]">
              <Globe className="w-3 h-3 text-[#FF5722]" />
              <span>RSS Feed</span>
            </a>
          </div>
        </div>
      </div>

      {/* Under footer segment */}
      <div className="w-full bg-slate-100 border-t border-slate-200 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <span>© 2026 Metazivo. All Rights Reserved.</span>
          <button
            onClick={scrollToTop}
            id="back-to-top"
            className="p-2 bg-white hover:bg-slate-50 border border-slate-200 hover:text-slate-800 rounded-lg transition-all shadow-sm cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4 text-[#FF5722]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
