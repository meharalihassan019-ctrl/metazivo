import React, { useState, useMemo } from "react";
import {
  Code,
  Copy,
  Download,
  Check,
  RotateCcw,
  ExternalLink,
  Plus,
  Trash2,
  FileCode,
  Sparkles
} from "lucide-react";
import { SeoToolDef } from "./seoToolsData";
import ToolShell from "./ToolShell";

interface Props {
  tool: SeoToolDef;
  onNavigateTool: (slug: string) => void;
  onNavigateHome: () => void;
}

type SchemaType =
  | "Article"
  | "FAQPage"
  | "HowTo"
  | "Product"
  | "Service"
  | "LocalBusiness"
  | "Organization"
  | "Person"
  | "BreadcrumbList"
  | "Event"
  | "WebSite"
  | "Review";

export default function SchemaGeneratorTool({ tool, onNavigateTool, onNavigateHome }: Props) {
  const [selectedType, setSelectedType] = useState<SchemaType>("Article");
  const [copied, setCopied] = useState(false);
  const [minified, setMinified] = useState(false);

  // Schema Specific State
  const [article, setArticle] = useState({
    headline: "Mastering Technical SEO: The 2025 Architecture Playbook",
    description: "A comprehensive guide on optimizing crawl budget, JavaScript hydration, and Core Web Vitals.",
    authorName: "Mehar Ali Hassan",
    authorType: "Person",
    publisherName: "Metazivo",
    publisherLogo: "https://metazivo.com/images/metazivo-logo.png",
    datePublished: new Date().toISOString().slice(0, 10),
    imageUrl: "https://metazivo.com/og-image.jpg",
    articleUrl: "https://metazivo.com/insights/technical-seo-guide"
  });

  const [faqs, setFaqs] = useState([
    { q: "What is Schema.org markup?", a: "Schema markup is standardized code added to HTML that helps search engines understand page meaning and award rich snippets." },
    { q: "Does schema markup improve Google rankings?", a: "Schema is not a direct ranking factor, but rich snippets increase organic click-through rates (CTR) by up to 30%." },
    { q: "Where should I paste this JSON-LD script?", a: "Paste it inside the <head> or <body> section of your HTML template." }
  ]);

  const [howto, setHowto] = useState({
    name: "How to Perform a Technical SEO Audit in 5 Steps",
    description: "Follow this step-by-step diagnostic workflow to discover and fix crawl errors.",
    totalTime: "PT45M",
    estimatedCost: "0",
    currency: "USD",
    steps: [
      { name: "Crawl your website", text: "Run a full crawl using a dedicated crawler to capture all response codes." },
      { name: "Inspect indexability & robots.txt", text: "Ensure critical pages do not have accidental noindex tags or blocking directives." },
      { name: "Audit Core Web Vitals", text: "Analyze LCP, INP, and CLS performance metrics on mobile viewports." }
    ]
  });

  const [product, setProduct] = useState({
    name: "Enterprise SEO Growth Sprint",
    description: "Dedicated full-stack technical SEO overhaul, schema architecture, and speed optimization.",
    image: "https://metazivo.com/services/seo-sprint.jpg",
    brand: "Metazivo",
    sku: "MZ-SEO-2025",
    price: "1499.00",
    currency: "USD",
    availability: "https://schema.org/InStock",
    ratingValue: "4.9",
    reviewCount: "48"
  });

  const [localBiz, setLocalBiz] = useState({
    name: "Metazivo Digital Agency",
    businessType: "ProfessionalService",
    image: "https://metazivo.com/logo.png",
    streetAddress: "123 Innovation Way, Suite 400",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94105",
    addressCountry: "US",
    telephone: "+1-800-555-0199",
    url: "https://metazivo.com",
    latitude: "37.7749",
    longitude: "-122.4194",
    priceRange: "$$"
  });

  const [org, setOrg] = useState({
    name: "Metazivo",
    legalName: "Metazivo Technologies LLC",
    url: "https://metazivo.com",
    logo: "https://metazivo.com/logo.png",
    sameAs: [
      "https://twitter.com/metazivo",
      "https://linkedin.com/company/metazivo",
      "https://github.com/metazivo"
    ].join("\n")
  });

  // Generate JSON-LD Object
  const jsonLdObject = useMemo(() => {
    switch (selectedType) {
      case "Article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": article.headline,
          "description": article.description,
          "image": article.imageUrl,
          "datePublished": article.datePublished,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": article.articleUrl
          },
          "author": {
            "@type": article.authorType,
            "name": article.authorName
          },
          "publisher": {
            "@type": "Organization",
            "name": article.publisherName,
            "logo": {
              "@type": "ImageObject",
              "url": article.publisherLogo
            }
          }
        };

      case "FAQPage":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((f) => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        };

      case "HowTo":
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": howto.name,
          "description": howto.description,
          "totalTime": howto.totalTime,
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": howto.currency,
            "value": howto.estimatedCost
          },
          "step": howto.steps.map((s, idx) => ({
            "@type": "HowToStep",
            "position": idx + 1,
            "name": s.name,
            "text": s.text
          }))
        };

      case "Product":
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "image": product.image,
          "description": product.description,
          "sku": product.sku,
          "brand": {
            "@type": "Brand",
            "name": product.brand
          },
          "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": product.currency,
            "price": product.price,
            "availability": product.availability
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.ratingValue,
            "reviewCount": product.reviewCount
          }
        };

      case "LocalBusiness":
        return {
          "@context": "https://schema.org",
          "@type": localBiz.businessType,
          "name": localBiz.name,
          "image": localBiz.image,
          "@id": localBiz.url,
          "url": localBiz.url,
          "telephone": localBiz.telephone,
          "priceRange": localBiz.priceRange,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": localBiz.streetAddress,
            "addressLocality": localBiz.addressLocality,
            "addressRegion": localBiz.addressRegion,
            "postalCode": localBiz.postalCode,
            "addressCountry": localBiz.addressCountry
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": localBiz.latitude,
            "longitude": localBiz.longitude
          }
        };

      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": org.name,
          "legalName": org.legalName,
          "url": org.url,
          "logo": org.logo,
          "sameAs": org.sameAs.split("\n").map((s) => s.trim()).filter(Boolean)
        };

      default:
        return {
          "@context": "https://schema.org",
          "@type": selectedType,
          "name": `${selectedType} Example`
        };
    }
  }, [selectedType, article, faqs, howto, product, localBiz, org]);

  const jsonString = minified
    ? JSON.stringify(jsonLdObject)
    : JSON.stringify(jsonLdObject, null, 2);

  const fullScriptTag = `<script type="application/ld+json">\n${jsonString}\n</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullScriptTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fullScriptTag], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `schema-${selectedType.toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const addFaqItem = () => {
    setFaqs([...faqs, { q: "New Question Here", a: "Detailed answer goes here." }]);
  };

  const removeFaqItem = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const addHowtoStep = () => {
    setHowto({
      ...howto,
      steps: [...howto.steps, { name: "Next Step Name", text: "Clear instructions for this step." }]
    });
  };

  const removeHowtoStep = (index: number) => {
    setHowto({
      ...howto,
      steps: howto.steps.filter((_, i) => i !== index)
    });
  };

  return (
    <ToolShell
      tool={tool}
      onNavigateTool={onNavigateTool}
      onNavigateHome={onNavigateHome}
    >
      <div className="space-y-8">
        {/* Schema Type Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
            Select Schema.org Structured Data Type
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              "Article",
              "FAQPage",
              "HowTo",
              "Product",
              "LocalBusiness",
              "Organization"
            ].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type as SchemaType)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedType === type
                    ? "bg-[#FF5722] text-white shadow-[0_2px_10px_rgba(255,87,34,0.3)]"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Form for Selected Schema */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
              {selectedType} Configuration Fields
            </h3>

            {selectedType === "Article" && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Headline / Title</label>
                  <input
                    type="text"
                    value={article.headline}
                    onChange={(e) => setArticle({ ...article, headline: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF5722]"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={article.description}
                    onChange={(e) => setArticle({ ...article, description: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#FF5722]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Author Name</label>
                    <input
                      type="text"
                      value={article.authorName}
                      onChange={(e) => setArticle({ ...article, authorName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Publisher Name</label>
                    <input
                      type="text"
                      value={article.publisherName}
                      onChange={(e) => setArticle({ ...article, publisherName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Published Date</label>
                    <input
                      type="date"
                      value={article.datePublished}
                      onChange={(e) => setArticle({ ...article, datePublished: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Featured Image URL</label>
                    <input
                      type="text"
                      value={article.imageUrl}
                      onChange={(e) => setArticle({ ...article, imageUrl: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedType === "FAQPage" && (
              <div className="space-y-4">
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div key={index} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative">
                      <button
                        type="button"
                        onClick={() => removeFaqItem(index)}
                        className="absolute right-2 top-2 text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Remove FAQ question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Question {index + 1}</label>
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => {
                            const updated = [...faqs];
                            updated[index].q = e.target.value;
                            setFaqs(updated);
                          }}
                          className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Answer</label>
                        <textarea
                          rows={2}
                          value={faq.a}
                          onChange={(e) => {
                            const updated = [...faqs];
                            updated[index].a = e.target.value;
                            setFaqs(updated);
                          }}
                          className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addFaqItem}
                  className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-[#FF5722] hover:text-[#FF5722] text-slate-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another Question & Answer</span>
                </button>
              </div>
            )}

            {selectedType === "HowTo" && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">HowTo Guide Title</label>
                  <input
                    type="text"
                    value={howto.name}
                    onChange={(e) => setHowto({ ...howto, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Estimated Duration (ISO 8601, e.g. PT45M)</label>
                  <input
                    type="text"
                    value={howto.totalTime}
                    onChange={(e) => setHowto({ ...howto, totalTime: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700">Step-by-Step Instructions</span>
                    <button
                      type="button"
                      onClick={addHowtoStep}
                      className="text-[#FF5722] hover:underline font-semibold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Add Step
                    </button>
                  </div>
                  {howto.steps.map((step, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative">
                      <button
                        type="button"
                        onClick={() => removeHowtoStep(idx)}
                        className="absolute right-2 top-2 text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <input
                        type="text"
                        placeholder={`Step ${idx + 1} Name`}
                        value={step.name}
                        onChange={(e) => {
                          const updated = [...howto.steps];
                          updated[idx].name = e.target.value;
                          setHowto({ ...howto, steps: updated });
                        }}
                        className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg font-bold"
                      />
                      <textarea
                        rows={2}
                        placeholder="Detailed instructions for this step"
                        value={step.text}
                        onChange={(e) => {
                          const updated = [...howto.steps];
                          updated[idx].text = e.target.value;
                          setHowto({ ...howto, steps: updated });
                        }}
                        className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedType === "Product" && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Product / Service Name</label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Price</label>
                    <input
                      type="text"
                      value={product.price}
                      onChange={(e) => setProduct({ ...product, price: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Currency (e.g. USD, EUR)</label>
                    <input
                      type="text"
                      value={product.currency}
                      onChange={(e) => setProduct({ ...product, currency: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Rating Value (out of 5)</label>
                    <input
                      type="text"
                      value={product.ratingValue}
                      onChange={(e) => setProduct({ ...product, ratingValue: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Total Review Count</label>
                    <input
                      type="text"
                      value={product.reviewCount}
                      onChange={(e) => setProduct({ ...product, reviewCount: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedType === "LocalBusiness" && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Business Name</label>
                  <input
                    type="text"
                    value={localBiz.name}
                    onChange={(e) => setLocalBiz({ ...localBiz, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Street Address</label>
                  <input
                    type="text"
                    value={localBiz.streetAddress}
                    onChange={(e) => setLocalBiz({ ...localBiz, streetAddress: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">City</label>
                    <input
                      type="text"
                      value={localBiz.addressLocality}
                      onChange={(e) => setLocalBiz({ ...localBiz, addressLocality: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">State / Province</label>
                    <input
                      type="text"
                      value={localBiz.addressRegion}
                      onChange={(e) => setLocalBiz({ ...localBiz, addressRegion: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={localBiz.postalCode}
                      onChange={(e) => setLocalBiz({ ...localBiz, postalCode: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={localBiz.telephone}
                      onChange={(e) => setLocalBiz({ ...localBiz, telephone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Website URL</label>
                    <input
                      type="text"
                      value={localBiz.url}
                      onChange={(e) => setLocalBiz({ ...localBiz, url: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedType === "Organization" && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Brand / Organization Name</label>
                  <input
                    type="text"
                    value={org.name}
                    onChange={(e) => setOrg({ ...org, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Website URL</label>
                  <input
                    type="text"
                    value={org.url}
                    onChange={(e) => setOrg({ ...org, url: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Official Social Profile URLs (One per line)</label>
                  <textarea
                    rows={3}
                    value={org.sameAs}
                    onChange={(e) => setOrg({ ...org, sameAs: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Code Output & Export */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Generated JSON-LD Structured Code
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMinified(!minified)}
                  className="text-[11px] font-mono px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                >
                  {minified ? "Prettify" : "Minify"}
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? "Copied Script" : "Copy Code"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Syntax Box */}
            <div className="relative rounded-2xl bg-slate-950 p-4 border border-slate-800 text-slate-100 font-mono text-xs overflow-x-auto max-h-[380px] shadow-inner">
              <pre className="whitespace-pre-wrap break-all leading-relaxed">
                <code>{fullScriptTag}</code>
              </pre>
            </div>

            {/* Test in Google Rich Results */}
            <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200/70 text-xs flex items-center justify-between gap-3 flex-wrap">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF5722]" />
                  Validate Schema Integrity
                </span>
                <p className="text-[11px] text-slate-600">
                  Copy this code and test directly inside Google's official Rich Results Test.
                </p>
              </div>
              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FF5722] hover:bg-[#FF7043] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                <span>Google Rich Test</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
