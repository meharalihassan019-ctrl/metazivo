import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Globe, 
  Eye, 
  Sparkles, 
  Check, 
  FileText,
  X
} from "lucide-react";
import { CustomPage } from "../types";

interface PagesPanelProps {
  pages: CustomPage[];
  onReload: () => void;
  onLog: (action: string) => void;
}

export default function PagesPanel({ pages, onReload, onLog }: PagesPanelProps) {
  const [editingPage, setEditingPage] = useState<Partial<CustomPage> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formSeoTitle, setFormSeoTitle] = useState("");
  const [formSeoDesc, setFormSeoDesc] = useState("");
  const [formSeoKeywords, setFormSeoKeywords] = useState("");

  const handleEditClick = (page: CustomPage) => {
    setEditingPage(page);
    setIsCreating(false);
    setError("");
    setSuccess("");

    setFormTitle(page.title);
    setFormSlug(page.slug);
    setFormContent(page.content);
    setFormSeoTitle(page.seoTitle || "");
    setFormSeoDesc(page.seoDescription || "");
    setFormSeoKeywords((page.seoKeywords || []).join(", "));
  };

  const handleCreateClick = () => {
    setEditingPage(null);
    setIsCreating(true);
    setError("");
    setSuccess("");

    setFormTitle("");
    setFormSlug("");
    setFormContent("");
    setFormSeoTitle("");
    setFormSeoDesc("");
    setFormSeoKeywords("");
  };

  const handleCancel = () => {
    setEditingPage(null);
    setIsCreating(false);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const keywordsArray = formSeoKeywords
      .split(",")
      .map(k => k.trim())
      .filter(k => k.length > 0);

    const payload = {
      title: formTitle,
      slug: formSlug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, "-"),
      content: formContent,
      seoTitle: formSeoTitle || undefined,
      seoDescription: formSeoDesc || undefined,
      seoKeywords: keywordsArray,
    };

    try {
      if (isCreating) {
        // Create new page
        const res = await fetch("/api/pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          setSuccess(`Page "${data.title}" added successfully!`);
          onLog(`Created custom page: ${data.title}`);
          setIsCreating(false);
          onReload();
        } else {
          const errData = await res.json();
          setError(errData.error || "Failed to create page. Slug might already be registered.");
        }
      } else if (editingPage && editingPage.id) {
        // Update existing page
        const res = await fetch(`/api/pages/${editingPage.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          setSuccess(`Page "${data.title}" updated successfully!`);
          onLog(`Updated custom page: ${data.title}`);
          setEditingPage(null);
          onReload();
        } else {
          const errData = await res.json();
          setError(errData.error || "Failed to update page.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Network or local server error. Please retry.");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete page "${title}"?`)) return;
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/pages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSuccess(`Page "${title}" deleted successfully!`);
        onLog(`Deleted custom page: ${title}`);
        onReload();
        if (editingPage?.id === id) {
          setEditingPage(null);
        }
      } else {
        const errData = await res.json();
        setError(errData.error || "Failed to delete page.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to execute deletion node.");
    }
  };

  // Helper to suggest standard SEO tags via AI or metadata templates
  const handleAutoFillSeo = () => {
    if (!formTitle) {
      setError("Please input a page title first to auto-generate SEO values!");
      return;
    }
    setFormSeoTitle(`${formTitle} | Metazivo Agency`);
    setFormSeoDesc(`Read about ${formTitle} at Metazivo Digital Agency. Discover speed-hardened engineering and design solutions.`);
    setFormSeoKeywords(`${formTitle.toLowerCase()}, metazivo, web agency, custom dev`);
    setSuccess("Suggested SEO tags populated!");
  };

  return (
    <div className="space-y-6 animate-fade-in" id="pages-manager-module">
      <div className="flex justify-between items-center pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">CMS Custom Pages Manager</h2>
          <p className="text-xs text-slate-400">Add dynamic static pages, override system policies, and inject SEO headers directly into Hostinger deployment node.</p>
        </div>
        {!isCreating && !editingPage && (
          <button
            onClick={handleCreateClick}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Custom Page
          </button>
        )}
      </div>

      {error && (
        <div className="p-3.5 bg-red-950/40 border border-red-900 rounded-2xl text-xs text-red-300">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="p-3.5 bg-emerald-950/40 border border-emerald-900 rounded-2xl text-xs text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" /> {success}
        </div>
      )}

      {/* CREATE OR EDIT FORM */}
      {(isCreating || editingPage) && (
        <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] space-y-6 shadow-xl relative animate-scale-up">
          <div className="flex justify-between items-center pb-3 border-b border-white/5">
            <h3 className="text-sm font-bold text-slate-200">
              {isCreating ? "Design New Custom Page" : `Edit Content & SEO: "${editingPage?.title}"`}
            </h3>
            <button onClick={handleCancel} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase mb-1 font-mono">Page Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none w-full"
                  placeholder="e.g., Services FAQ"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase mb-1 font-mono">
                  Slug / URL Path {editingPage?.isSystem && <span className="text-blue-400 text-[9px] font-mono">(System Reserved)</span>}
                </label>
                <input
                  type="text"
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none w-full"
                  placeholder="e.g., services-faq"
                  required
                  disabled={editingPage?.isSystem}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1 font-mono">Page Content (HTML support enabled)</label>
              <textarea
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                rows={8}
                className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none w-full font-mono leading-relaxed"
                placeholder="<p>Write raw HTML or clean text paragraph structures here...</p>"
                required
              />
            </div>

            {/* SEO SETTINGS PANEL */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-300 uppercase font-mono">SEO Header Tag Injector</span>
                <button
                  type="button"
                  onClick={handleAutoFillSeo}
                  className="flex items-center gap-1 text-[9px] px-2 py-1 bg-white/10 hover:bg-white/15 text-blue-400 hover:text-blue-300 rounded-md font-bold transition-all cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" /> Auto-Fill SEO Recommendations
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] text-slate-400 uppercase mb-1 font-mono">SEO Browser Title</label>
                  <input
                    type="text"
                    value={formSeoTitle}
                    onChange={(e) => setFormSeoTitle(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none w-full"
                    placeholder="Page Title | Metazivo"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-slate-400 uppercase mb-1 font-mono">SEO Keywords (Comma separated)</label>
                  <input
                    type="text"
                    value={formSeoKeywords}
                    onChange={(e) => setFormSeoKeywords(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none w-full"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] text-slate-400 uppercase mb-1 font-mono">SEO Meta Description</label>
                <textarea
                  value={formSeoDesc}
                  onChange={(e) => setFormSeoDesc(e.target.value)}
                  rows={2}
                  className="bg-white/5 border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none w-full"
                  placeholder="Summarize page content to display in Google Search Snippets."
                />
              </div>

              {/* LIVE SEO GOOGLE PREVIEW */}
              <div className="p-3 bg-[#030712] border border-white/5 rounded-xl space-y-1 font-sans text-left">
                <span className="text-[9px] text-slate-500 font-mono">Hostinger Sitemap Google Preview Snippet:</span>
                <div className="text-[14px] text-[#8ab4f8] hover:underline cursor-pointer truncate font-medium">
                  {formSeoTitle || formTitle || "Untitled Page"} | Metazivo
                </div>
                <div className="text-[11px] text-[#34a853] truncate">
                  https://grey-tiger-325314.hostingersite.com/{formSlug || "slug"}
                </div>
                <div className="text-[12px] text-slate-400 line-clamp-2 leading-snug">
                  {formSeoDesc || "Please type content or description to generate Google Search ranking elements."}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-full text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Configuration
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PAGES LISTING */}
      {!isCreating && !editingPage && (
        <div className="border border-white/10 rounded-[32px] overflow-hidden bg-white/5 shadow-lg">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-white/5 text-slate-200 uppercase tracking-wider font-mono text-[9px] border-b border-white/10">
              <tr>
                <th className="p-4">Page Title</th>
                <th className="p-4">Slug Path</th>
                <th className="p-4">Classification</th>
                <th className="p-4">SEO Score</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => {
                const isSystem = page.isSystem;
                const seoScore = (page.seoTitle ? 25 : 0) + (page.seoDescription ? 25 : 0) + ((page.seoKeywords?.length || 0) > 0 ? 25 : 0) + (page.content.length > 100 ? 25 : 10);
                
                return (
                  <tr key={page.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="font-semibold text-white">{page.title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-md text-[10px]">
                        /{page.slug}
                      </span>
                    </td>
                    <td className="p-4">
                      {isSystem ? (
                        <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/10 px-2 py-0.5 rounded-full font-semibold">
                          System Policy
                        </span>
                      ) : (
                        <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/10 px-2 py-0.5 rounded-full font-semibold">
                          Custom Dynamic
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${seoScore > 75 ? "bg-emerald-500" : seoScore > 50 ? "bg-amber-500" : "bg-red-500"}`}
                            style={{ width: `${seoScore}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-300 font-bold">{seoScore}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEditClick(page)}
                          className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                          title="Edit page content"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        {!isSystem && (
                          <button
                            onClick={() => handleDelete(page.id, page.title)}
                            className="p-1.5 bg-white/5 hover:bg-red-950/40 border border-white/5 hover:border-red-900 rounded-lg text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                            title="Delete custom page"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {pages.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-mono">
                    No pages registered on Hostinger deployment database node yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
