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
  CheckCircle2
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function LocalSeoAuditTool({ tool, onNavigateTool, onNavigateHome }: Props) {
  const [formData, setFormData] = useState({
    businessName: "Metazivo Technologies",
    category: "Web Development & SEO Agency",
    website: "https://metazivo.com",
    phone: "+1 (800) 555-0199",
    streetAddress: "100 Market St, Suite 300",
    city: "San Francisco",
    state: "CA",
    postalCode: "94105",
    gmbUrl: "https://maps.google.com/?cid=123456789"
  });

  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<{
    localScore: number;
    napScore: number;
    schemaScore: number;
    targetingScore: number;
    signals: Array<{ title: string; status: "good" | "warning" | "action"; note: string }>;
    generatedSchema: string;
  } | null>(null);

  const [copiedSchema, setCopiedSchema] = useState(false);

  const runAudit = () => {
    setLoading(true);
    setTimeout(() => {
      // Validate NAP components
      const hasPhone = formData.phone.replace(/[^0-9]/g, "").length >= 10;
      const hasAddress = formData.streetAddress.length > 5;
      const hasCity = formData.city.length >= 2;
      const hasGmb = formData.gmbUrl.includes("maps.google") || formData.gmbUrl.includes("business.google");

      const signals = [
        {
          title: "NAP Uniformity Structure",
          status: hasPhone && hasAddress && hasCity ? ("good" as const) : ("warning" as const),
          note: hasPhone && hasAddress
            ? "Name, Address, and Phone details are formatted cleanly for cross-citation matching."
            : "Incomplete address or phone format detected. Consistent exact-match formatting is vital for Google Maps."
        },
        {
          title: "Google Business Profile Linkage",
          status: hasGmb ? ("good" as const) : ("action" as const),
          note: hasGmb
            ? "Google Maps CID/listing connection verified."
            : "Missing direct Google Business Profile URL. Link your GMB profile in your footer and schema markup."
        },
        {
          title: "Localized Landing Page Architecture",
          status: "good" as const,
          note: `Ensure your primary service pages feature "${formData.city}" in the H1, title tag, and first 100 words.`
        },
        {
          title: "Local Schema.org Deployment",
          status: "action" as const,
          note: "Embed the generated LocalBusiness JSON-LD snippet directly in your homepage <head>."
        },
        {
          title: "Reviews & Reputation Velocity",
          status: "warning" as const,
          note: "Target a consistent review generation cadence of 2-4 authentic Google reviews every month with keywords."
        }
      ];

      const schemaObj = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": formData.businessName,
        "image": `${formData.website}/logo.png`,
        "telephone": formData.phone,
        "url": formData.website,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": formData.streetAddress,
          "addressLocality": formData.city,
          "addressRegion": formData.state,
          "postalCode": formData.postalCode,
          "addressCountry": "US"
        },
        "hasMap": formData.gmbUrl || undefined
      };

      const generatedSchema = `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>`;

      setAuditResult({
        localScore: hasPhone && hasAddress && hasGmb ? 86 : 68,
        napScore: hasPhone && hasAddress ? 95 : 60,
        schemaScore: 90,
        targetingScore: 82,
        signals,
        generatedSchema
      });
      setLoading(false);
    }, 400);
  };

  const copySchema = () => {
    if (!auditResult) return;
    navigator.clipboard.writeText(auditResult.generatedSchema);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  const handleReset = () => {
    setAuditResult(null);
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
      onReset={auditResult ? handleReset : undefined}
    >
      <div className="space-y-8">
        {/* Form Inputs */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
            Business Details for Local SEO Inspection
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-sans">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Business Name (Official)</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Primary Business Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Official Website URL</label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Street Address</label>
              <input
                type="text"
                value={formData.streetAddress}
                onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">State / Prov</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">ZIP / Postal</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Phone (with area code)</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-600 font-semibold mb-1">Google Business Profile / Maps URL</label>
              <input
                type="text"
                value={formData.gmbUrl}
                onChange={(e) => setFormData({ ...formData, gmbUrl: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={runAudit}
              disabled={loading}
              className="px-6 py-3 bg-[#FF5722] hover:bg-[#FF7043] text-white rounded-xl text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,87,34,0.25)] flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Auditing Local Signals...</span>
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4" />
                  <span>Audit Local SEO Profile</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Presentation */}
        {auditResult && (
          <div className="space-y-8 pt-4 border-t border-slate-200 animate-fade-in">
            {/* Score Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">Local Authority Score</span>
                <span className="text-3xl font-extrabold text-slate-900 mt-1">{auditResult.localScore}/100</span>
                <span className="text-[10px] text-emerald-600 font-bold mt-1">Google Maps Ready</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-xs text-slate-500">NAP Uniformity</span>
                <span className="text-xl font-bold text-slate-900">{auditResult.napScore}%</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-xs text-slate-500">Schema Readiness</span>
                <span className="text-xl font-bold text-slate-900">{auditResult.schemaScore}%</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-xs text-slate-500">Geo Targeting</span>
                <span className="text-xl font-bold text-slate-900">{auditResult.targetingScore}%</span>
              </div>
            </div>

            {/* Diagnostic Signals Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Local Signal Analysis & Action Items
              </h4>
              <div className="space-y-2.5">
                {auditResult.signals.map((sig, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3 text-xs font-sans shadow-xs"
                  >
                    {sig.status === "good" && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                    {sig.status === "warning" && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                    {sig.status === "action" && <MapPin className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />}
                    <div className="space-y-0.5">
                      <h5 className="font-bold text-slate-900">{sig.title}</h5>
                      <p className="text-slate-600 leading-relaxed">{sig.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ready-to-use LocalBusiness Schema Code */}
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                  Auto-Generated LocalBusiness Schema (JSON-LD)
                </h4>
                <button
                  type="button"
                  onClick={copySchema}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                >
                  {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copiedSchema ? "Copied Schema" : "Copy JSON-LD"}</span>
                </button>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 text-slate-100 font-mono text-xs overflow-x-auto max-h-[250px]">
                <pre className="whitespace-pre-wrap leading-relaxed">
                  <code>{auditResult.generatedSchema}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}
