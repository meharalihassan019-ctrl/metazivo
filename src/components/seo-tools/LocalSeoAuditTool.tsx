import React, { useState } from "react";
import {
  MapPin,
  Building2,
  Phone,
  Globe,
  Copy,
  Download,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Search,
  RefreshCw,
  XCircle,
  FileCode
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function LocalSeoAuditTool({ tool, onNavigateTool, onNavigateHome }: Props) {
  const [activeTab, setActiveTab] = useState<"live" | "schema">("live");

  // State for live website audit
  const [urlInput, setUrlInput] = useState("https://metazivo.com");
  const [loadingLive, setLoadingLive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [liveLocalData, setLiveLocalData] = useState<{
    url: string;
    hasPhone: boolean;
    phoneNumbers: string[];
    hasTelLinks: boolean;
    hasGoogleMapsEmbed: boolean;
    hasGeoPosition: boolean;
    geoPosition?: string;
    hasLocalSchema: boolean;
    score: number;
  } | null>(null);

  // State for LocalBusiness Schema Generator
  const [formData, setFormData] = useState({
    businessName: "Metazivo Digital Agency",
    category: "ProfessionalService",
    website: "https://metazivo.com",
    phone: "+92 328 8518557",
    streetAddress: "Chungi Gujjar Pura",
    city: "Lahore",
    state: "Punjab",
    postalCode: "54000",
    country: "PK",
    gmbUrl: "https://maps.google.com/maps?q=Chungi+Gujjar+Pura+Lahore+Pakistan"
  });

  const [copiedSchema, setCopiedSchema] = useState(false);

  // 1. Audit Live Webpage for Local Signals
  const handleRunLiveLocalAudit = async () => {
    if (!urlInput.trim()) return;
    setLoadingLive(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/seo-tools/live-page-inspect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput.trim() })
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Failed to audit website for local SEO");
        setLiveLocalData(null);
      } else {
        const loc = data.localSeo;
        let score = 50;
        if (loc.hasPhone) score += 15;
        if (loc.hasTelLinks) score += 10;
        if (loc.hasGoogleMapsEmbed) score += 10;
        if (loc.hasLocalSchema) score += 15;

        setLiveLocalData({
          url: data.url,
          hasPhone: loc.hasPhone,
          phoneNumbers: loc.phoneNumbers,
          hasTelLinks: loc.hasTelLinks,
          hasGoogleMapsEmbed: loc.hasGoogleMapsEmbed,
          hasGeoPosition: loc.hasGeoPosition,
          geoPosition: loc.geoPosition,
          hasLocalSchema: loc.hasLocalSchema,
          score: Math.min(100, score)
        });
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to reach server");
    } finally {
      setLoadingLive(false);
    }
  };

  // Generate Google-Compliant LocalBusiness JSON-LD
  const generatedSchema = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": formData.category || "LocalBusiness",
      name: formData.businessName,
      url: formData.website,
      telephone: formData.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: formData.streetAddress,
        addressLocality: formData.city,
        addressRegion: formData.state,
        postalCode: formData.postalCode,
        addressCountry: formData.country
      },
      hasMap: formData.gmbUrl || undefined
    },
    null,
    2
  );

  const handleCopySchema = () => {
    navigator.clipboard.writeText(generatedSchema);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const handleDownloadSchema = () => {
    const blob = new Blob([generatedSchema], { type: "application/ld+json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `local-business-schema-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={() => {
        setLiveLocalData(null);
        setErrorMsg(null);
      }}
    >
      <div className="space-y-6">
        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("live")}
            className={`pb-3 px-4 text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
              activeTab === "live"
                ? "border-[#FF5722] text-[#FF5722]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Audit Live Website NAP & Signals</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("schema")}
            className={`pb-3 px-4 text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
              activeTab === "schema"
                ? "border-[#FF5722] text-[#FF5722]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>LocalBusiness Schema Generator</span>
          </button>
        </div>

        {/* TAB 1: LIVE AUDIT */}
        {activeTab === "live" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-4">
              <label htmlFor="target-local-url" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                Target Business Website URL
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="target-local-url"
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722]"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRunLiveLocalAudit}
                  disabled={loadingLive || !urlInput.trim()}
                  className="px-6 py-3 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold font-mono transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loadingLive ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Inspecting Local Signals...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Audit Local SEO Health</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Audits real DOM for clickable phone links (tel:), Google Maps embeds, LocalBusiness JSON-LD markup, and geo meta tags.
              </p>
            </div>

            {errorMsg && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {liveLocalData && (
              <div className="space-y-6 animate-fade-in">
                {/* Score and summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Local Health Score</span>
                    <span className={`text-2xl font-bold font-mono mt-1 block ${liveLocalData.score >= 80 ? "text-emerald-600" : "text-amber-600"}`}>
                      {liveLocalData.score} / 100
                    </span>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Clickable Phone (tel:)</span>
                    <span className={`text-xl font-bold font-mono mt-1 block ${liveLocalData.hasTelLinks ? "text-emerald-600" : "text-rose-600"}`}>
                      {liveLocalData.hasTelLinks ? "Active" : "Missing"}
                    </span>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">LocalBusiness Schema</span>
                    <span className={`text-xl font-bold font-mono mt-1 block ${liveLocalData.hasLocalSchema ? "text-emerald-600" : "text-rose-600"}`}>
                      {liveLocalData.hasLocalSchema ? "Detected" : "Missing"}
                    </span>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Google Maps Embed</span>
                    <span className={`text-xl font-bold font-mono mt-1 block ${liveLocalData.hasGoogleMapsEmbed ? "text-emerald-600" : "text-slate-600"}`}>
                      {liveLocalData.hasGoogleMapsEmbed ? "Found" : "None"}
                    </span>
                  </div>
                </div>

                {/* Detected Details */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 text-xs">
                  <h4 className="font-mono font-bold text-slate-700 uppercase tracking-wider text-xs">
                    Discovered NAP & Geographic Information
                  </h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                      <span className="text-slate-500 font-mono">Discovered Phone Numbers:</span>
                      <strong className="text-slate-900 font-mono">
                        {liveLocalData.phoneNumbers.length > 0 ? liveLocalData.phoneNumbers.join(", ") : "No explicit phone format matched"}
                      </strong>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                      <span className="text-slate-500 font-mono">Geo Position Meta (Coordinates):</span>
                      <strong className="text-slate-900 font-mono">
                        {liveLocalData.geoPosition || "None declared"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SCHEMA GENERATOR */}
        {activeTab === "schema" && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-mono font-bold mb-1">Business Name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#FF5722]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-mono font-bold mb-1">Business Type</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#FF5722]"
                >
                  <option value="LocalBusiness">LocalBusiness</option>
                  <option value="ProfessionalService">ProfessionalService</option>
                  <option value="Store">Store</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="MedicalBusiness">MedicalBusiness</option>
                  <option value="Dentist">Dentist</option>
                  <option value="RealEstateAgent">RealEstateAgent</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-mono font-bold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#FF5722]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-mono font-bold mb-1">Street Address</label>
                <input
                  type="text"
                  value={formData.streetAddress}
                  onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#FF5722]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-mono font-bold mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#FF5722]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-mono font-bold mb-1">Google Maps / GMB URL</label>
                <input
                  type="text"
                  value={formData.gmbUrl}
                  onChange={(e) => setFormData({ ...formData, gmbUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#FF5722]"
                />
              </div>
            </div>

            {/* Generated JSON-LD Preview */}
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-slate-100 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                  Generated LocalBusiness JSON-LD Schema
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopySchema}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSchema ? "Copied!" : "Copy JSON-LD"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadSchema}
                    className="px-3.5 py-1.5 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <pre className="p-4 bg-slate-950/80 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto max-h-64 border border-slate-800/80 leading-relaxed">
                {generatedSchema}
              </pre>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}
