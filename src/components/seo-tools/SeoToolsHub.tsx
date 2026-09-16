import React, { useState, useMemo } from "react";
import {
  Search,
  Sparkles,
  ArrowRight,
  Filter,
  Wrench,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  Code2,
  ShieldCheck,
  Network,
  Compass,
  Code,
  MapPin,
  Link2,
  Type,
  FileCode,
  FileSpreadsheet,
  Hash,
  Image,
  Unlink,
  Repeat,
  CornerDownRight,
  CheckCheck,
  Globe2,
  Share2,
  Twitter,
  CopyCheck,
  GitFork,
  HelpCircle,
  ListOrdered,
  Building2,
  Activity,
  Award
} from "lucide-react";
import { SEO_TOOLS_DATA, SeoToolDef, SEO_TOOL_CATEGORIES } from "./seoToolsData";

function getToolIcon(iconName?: string) {
  switch (iconName) {
    case "ShieldCheck": return ShieldCheck;
    case "Network": return Network;
    case "Compass": return Compass;
    case "Code": return Code;
    case "MapPin": return MapPin;
    case "Link2": return Link2;
    case "Type": return Type;
    case "FileCode": return FileCode;
    case "FileSpreadsheet": return FileSpreadsheet;
    case "Sparkles": return Sparkles;
    case "Hash": return Hash;
    case "Image": return Image;
    case "Unlink": return Unlink;
    case "Repeat": return Repeat;
    case "CornerDownRight": return CornerDownRight;
    case "CheckCheck": return CheckCheck;
    case "Globe2": return Globe2;
    case "Share2": return Share2;
    case "Twitter": return Twitter;
    case "CopyCheck": return CopyCheck;
    case "GitFork": return GitFork;
    case "Search": return Search;
    case "HelpCircle": return HelpCircle;
    case "ListOrdered": return ListOrdered;
    case "Building2": return Building2;
    case "Activity": return Activity;
    case "Award": return Award;
    case "Cpu": return Cpu;
    default: return Wrench;
  }
}

interface Props {
  onSelectTool: (slug: string) => void;
  onNavigateHome: () => void;
}

export default function SeoToolsHub({ onSelectTool, onNavigateHome }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Technical & Audit",
    "Content & On-Page",
    "Keywords & Strategy",
    "Schema & Structured Data",
    "AI, AEO & GEO",
    "Speed & Performance"
  ];

  const filteredTools = useMemo(() => {
    return SEO_TOOLS_DATA.filter((tool) => {
      const matchesCategory =
        selectedCategory === "All" || tool.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const desc = tool.shortDescription || tool.shortDesc || "";
      const tags = tool.tags || [tool.badge, tool.category.split(" ")[0]];

      const matchesSearch =
        tool.name.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q) ||
        tool.slug.toLowerCase().includes(q) ||
        tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-[#FF5722]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Professional SEO Engineering Suite</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
            Free Technical & AI SEO Tools for Modern Web Apps
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            30 enterprise-grade utilities for technical audits, Schema.org JSON-LD generation, Core Web Vitals optimization, keyword clustering, and Answer Engine Optimization (AEO/GEO).
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 30 tools by name, topic, or keyword (e.g. audit, schema, robots, intent, speed)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/30 focus:border-[#FF5722] transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#FF5722] text-white shadow-[0_2px_8px_rgba(255,87,34,0.3)]"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => {
            const Icon = getToolIcon(tool.iconName);
            const desc = tool.shortDescription || tool.shortDesc || "";
            const tags = tool.tags || [tool.badge, tool.category.split(" ")[0]];

            return (
              <div
                key={tool.slug}
                onClick={() => onSelectTool(tool.slug)}
                className="group bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg transition-all duration-200 cursor-pointer relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF5722] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {tool.category.split(" ")[0]}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-sans group-hover:text-[#FF5722] transition-colors leading-snug">
                    {tool.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-2">
                    {desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-bold text-[#FF5722] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
            <p className="text-slate-500 text-sm">
              No SEO tools matched your search for "<strong>{searchQuery}</strong>".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs font-bold text-[#FF5722] hover:underline cursor-pointer"
            >
              Clear filters and view all 30 tools
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
