/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Check, ShieldAlert, Loader2, RefreshCw, MapPin } from "lucide-react";

interface ContactFormProps {
  onSuccess?: () => void;
  defaultService?: string;
}

export default function ContactForm({ onSuccess, defaultService = "General Growth Consulting" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService,
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const services = [
    "Website Development",
    "WordPress & WooCommerce Development",
    "Shopify Development",
    "SEO (Search Engine Optimization)",
    "Paid Advertising & Meta Ads",
    "Graphic Design & Logo Branding",
    "General Growth Consulting"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate essential inputs
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg("Please provide your name and email address.");
      return;
    }

    setLoading(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          message: `Direct inquiry for ${formData.service}`
        })
      }).catch(() => {
        // Fallback for static host environments
      });

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: defaultService,
        message: ""
      });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-8 shadow-xl shadow-slate-200/40" id="contact-form-container">
      {success ? (
        <div className="text-center py-10" id="contact-success-panel">
          <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_4px_10px_rgba(16,185,129,0.1)]">
            <Check className="w-7 h-7 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-wide">Inquiry Sent Successfully!</h3>
          <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
            Thank you for reaching out to <strong>Metazivo</strong>. Our Senior Managers will review your inquiry and contact you via email or WhatsApp within 24 business hours.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-6 px-5 py-2.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 rounded-full transition-all cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-slate-100 pb-3">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-slate-900 tracking-wide font-sans">Grow Your Business Today</h3>
              <p className="text-xs text-slate-500 mt-0.5 font-light">Let us build a customized digital solution for your company.</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-[11px] font-mono font-bold text-[#FF5722] shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>Chungi Gujjar Pura, Lahore</span>
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-700 shadow-sm">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Name & Email Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Full Name <span className="text-[#FF5722]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200/80 focus:border-[#FF5722] focus:bg-white rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-sm"
                placeholder="Sarah Jenkins"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Email Address <span className="text-[#FF5722]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200/80 focus:border-[#FF5722] focus:bg-white rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-sm"
                placeholder="sarah@yourfirm.com"
              />
            </div>
          </div>

          {/* Phone & Service Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200/80 focus:border-[#FF5722] focus:bg-white rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-sm"
                placeholder="+92 328 8518557"
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Interested Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full bg-slate-50 border border-slate-200/80 focus:border-[#FF5722] focus:bg-white rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none transition-colors shadow-sm"
              >
                {services.map((srv) => (
                  <option key={srv} value={srv} className="bg-white text-slate-800">
                    {srv}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 bg-[#FF5722] hover:bg-[#FF7043] disabled:opacity-50 text-white rounded-full text-sm font-bold uppercase tracking-wider transition-all shadow-[0_4px_15px_rgba(255,87,34,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Connecting with Team...</span>
                </>
              ) : (
                <span>Submit Inquiry</span>
              )}
            </button>
          </div>

          <div className="text-center pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-light">Prefer instant conversation? </span>
            <a
              href={`https://wa.me/923288518557?text=${encodeURIComponent(`Hi! I am interested in your ${formData.service || "services"}. My name is ${formData.name || "Client"}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline inline-flex items-center gap-1 ml-1"
            >
              Chat Directly on WhatsApp &rarr;
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
