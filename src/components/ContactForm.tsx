/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Check, ShieldAlert, Loader2, RefreshCw } from "lucide-react";

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

  // Bot protection state
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [num1, setNum1] = useState(Math.floor(Math.random() * 9) + 2);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 8) + 1);
  const [captchaPassed, setCaptchaPassed] = useState<boolean | null>(null);

  const resetCaptcha = () => {
    setNum1(Math.floor(Math.random() * 9) + 2);
    setNum2(Math.floor(Math.random() * 8) + 1);
    setCaptchaAnswer("");
    setCaptchaPassed(null);
  };

  const services = [
    "Website Development",
    "WordPress & WooCommerce Development",
    "Shopify Development",
    "SEO (Search Engine Optimization)",
    "Paid Advertising & Meta Ads",
    "Graphic Design & Logo Branding",
    "General Growth Consulting"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate inputs
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please complete all required fields (Name, Email, Message).");
      return;
    }

    // Verify simple custom reCAPTCHA math challenge
    const expected = num1 + num2;
    if (parseInt(captchaAnswer) !== expected) {
      setCaptchaPassed(false);
      setErrorMsg("Security math challenge failed. Please try again.");
      return;
    }

    setCaptchaPassed(true);
    setLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry. Server error.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: defaultService,
        message: ""
      });
      setCaptchaAnswer("");
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred while sending your inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] p-6 sm:p-8 shadow-2xl" id="contact-form-container">
      {success ? (
        <div className="text-center py-10" id="contact-success-panel">
          <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Check className="w-7 h-7 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-wide">Inquiry Sent Successfully!</h3>
          <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
            Thank you for reaching out to <strong>Metazivo</strong>. One of our Senior Lead Architects will review your inquiry and contact you via email or phone within 24 business hours.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-6 px-5 py-2.5 text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-full transition-all"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" id="contact-form">
          <div className="text-center sm:text-left mb-4">
            <h3 className="text-lg font-bold text-white tracking-wide">Grow Your Business Today</h3>
            <p className="text-xs text-slate-400 mt-0.5">Let us build a customized digital solution for your company.</p>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-900/50 rounded-lg text-xs text-red-300">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Name & Email Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                Full Name <span className="text-blue-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 focus:border-blue-400 focus:bg-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
                placeholder="Sarah Jenkins"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                Email Address <span className="text-blue-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 focus:border-blue-400 focus:bg-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
                placeholder="sarah@yourfirm.com"
              />
            </div>
          </div>

          {/* Phone & Service Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 focus:border-blue-400 focus:bg-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
                placeholder="+92 328 8518557"
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                Interested Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 focus:border-blue-400 focus:bg-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition-colors"
              >
                {services.map((srv) => (
                  <option key={srv} value={srv} className="bg-[#020617] text-white">
                    {srv}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message Area */}
          <div>
            <label htmlFor="message" className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
              Message / Project Scope <span className="text-blue-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 focus:border-blue-400 focus:bg-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
              placeholder="Provide context regarding your website redesign, Shopify requirements, current loading issues, or marketing campaign targets."
            />
          </div>

          {/* Anti-spam validation challenge */}
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase tracking-wide">Shield Anti-Bot Verification</span>
              <span className="text-xs font-semibold text-slate-200">
                What is <span className="text-blue-400 text-sm font-mono">{num1} + {num2}</span> ?
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                required
                className="w-16 bg-white/5 border border-white/10 focus:border-blue-400 rounded-lg py-1 px-2 text-center text-sm text-white focus:outline-none"
                placeholder="?"
              />
              <button
                type="button"
                onClick={resetCaptcha}
                className="p-1.5 bg-white/5 border border-white/10 text-slate-300 hover:text-white rounded-lg transition-all"
                title="Refresh Math"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-full text-sm font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Auditing Project Scope...</span>
              </>
            ) : (
              <span>Launch Growth Request</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
