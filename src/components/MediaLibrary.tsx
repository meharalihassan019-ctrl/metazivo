/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from "react";
import { 
  Folder, 
  Search, 
  UploadCloud, 
  Trash2, 
  Check, 
  Image as ImageIcon, 
  Loader2, 
  AlertCircle, 
  Sparkles,
  ExternalLink,
  Plus
} from "lucide-react";
import { MediaAsset } from "../types";

interface MediaLibraryProps {
  assets: MediaAsset[];
  onUpload: (assetData: Partial<MediaAsset>) => Promise<MediaAsset | null | void> | void;
  onDelete: (id: string) => void;
  onSelectAsset?: (url: string, altText?: string) => void;
}

// Ultra-fast client-side image optimizer with non-blocking ObjectURL & WebP canvas compression
async function compressImageToWebP(file: File): Promise<{ webpDataUrl: string; size: number }> {
  return new Promise((resolve, reject) => {
    // Quick validation
    if (!file.type.startsWith("image/")) {
      return reject(new Error(`"${file.name}" is not a recognized image file.`));
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      try {
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 800;
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = Math.max(width, 1);
        canvas.height = Math.max(height, 1);
        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) {
          throw new Error("Unable to create canvas context for compression");
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to WebP at 0.75 quality for instant loading & crisp graphics
        let dataUrl = canvas.toDataURL("image/webp", 0.75);
        if (!dataUrl.startsWith("data:image/webp")) {
          // Fallback to JPEG if browser does not support WebP canvas export
          dataUrl = canvas.toDataURL("image/jpeg", 0.75);
        }

        const size = Math.round((dataUrl.length - dataUrl.indexOf(",") - 1) * 0.75);
        resolve({ webpDataUrl: dataUrl, size });
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error(`Failed to decode "${file.name}". Please check the image format.`));
    };

    img.src = objectUrl;
  });
}

export default function MediaLibrary({ assets, onUpload, onDelete, onSelectAsset }: MediaLibraryProps) {
  const [activeFolder, setActiveFolder] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgressMsg, setUploadProgressMsg] = useState("Compressing WebP...");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [optimisticPreviews, setOptimisticPreviews] = useState<{ id: string; name: string; previewUrl: string }[]>([]);

  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  // Edit fields for selected asset
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [assetTitle, setAssetTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const folders = ["all", "blog", "portfolio", "branding", "general"];

  // Sort newest first & filter by folder/search
  const sortedAndFilteredAssets = useMemo(() => {
    return [...assets]
      .sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : (parseInt(a.id?.replace(/\D/g, "") || "0") || 0);
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : (parseInt(b.id?.replace(/\D/g, "") || "0") || 0);
        return timeB - timeA;
      })
      .filter((asset) => {
        const matchesFolder = activeFolder === "all" || asset.folder === activeFolder;
        const matchesSearch =
          asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (asset.altText && asset.altText.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (asset.title && asset.title.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFolder && matchesSearch;
      });
  }, [assets, activeFolder, searchQuery]);

  const handleSelectAsset = (asset: MediaAsset) => {
    setSelectedAssetId(asset.id);
    setSelectedAsset(asset);
    setAltText(asset.altText || "");
    setCaption(asset.caption || "");
    setAssetTitle(asset.title || asset.name);
  };

  const handleSaveMetadata = () => {
    if (!selectedAssetId) return;
    onUpload({
      id: selectedAssetId,
      altText,
      caption,
      title: assetTitle
    } as any);
  };

  // Upload handler for both file-input and drag-and-drop
  const handleFilesUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setErrorMessage(null);
    setUploading(true);

    const fileList = Array.from(files);

    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        setUploadProgressMsg(`Optimizing ${i + 1}/${fileList.length}: ${file.name}...`);

        // Create temporary optimistic preview
        const tempId = `temp-${Date.now()}-${i}`;
        const tempPreviewUrl = URL.createObjectURL(file);
        setOptimisticPreviews(prev => [{ id: tempId, name: file.name, previewUrl: tempPreviewUrl }, ...prev]);

        try {
          const { webpDataUrl, size } = await compressImageToWebP(file);
          setUploadProgressMsg(`Uploading ${file.name} to server...`);

          const newAssetData: Partial<MediaAsset> = {
            name: file.name.replace(/\.[^/.]+$/, "") + ".webp",
            mimeType: "image/webp",
            size: size,
            folder: activeFolder === "all" ? "general" : activeFolder,
            altText: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
            caption: "Optimized WebP Image",
            title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
            url: webpDataUrl
          };

          const saved = await onUpload(newAssetData);
          if (saved && (saved as MediaAsset).id) {
            handleSelectAsset(saved as MediaAsset);
          }
        } finally {
          URL.revokeObjectURL(tempPreviewUrl);
          setOptimisticPreviews(prev => prev.filter(p => p.id !== tempId));
        }
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setErrorMessage(err?.message || "Failed to upload and optimize image. Please try another file.");
    } finally {
      setUploading(false);
      setUploadProgressMsg("Compressing WebP...");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesUpload(e.dataTransfer.files);
    }
  };

  return (
    <div 
      className="w-full bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-4 min-h-[500px] relative" 
      id="media-library-dashboard"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Drag & Drop Overlay */}
      {isDragOver && (
        <div className="absolute inset-0 z-50 bg-[#020617]/90 backdrop-blur-md border-2 border-dashed border-cyan-400 flex flex-col items-center justify-center gap-3 animate-fade-in pointer-events-none">
          <UploadCloud className="w-12 h-12 text-cyan-400 animate-bounce" />
          <p className="text-base font-bold text-white">Drop images here to instantly convert to WebP & upload</p>
          <p className="text-xs text-cyan-300 font-mono">Ultra-fast compression • 80%+ smaller file sizes</p>
        </div>
      )}

      {/* Sidebar: folders and uploading */}
      <div className="lg:col-span-1 border-r border-slate-800 bg-slate-950/30 p-4 flex flex-col gap-4">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Media Folders</h4>
          <div className="space-y-1">
            {folders.map((folder) => {
              const count = folder === "all" 
                ? assets.length 
                : assets.filter(a => a.folder === folder).length;

              return (
                <button
                  key={folder}
                  onClick={() => {
                    setActiveFolder(folder);
                    setSelectedAssetId(null);
                    setSelectedAsset(null);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                    activeFolder === folder
                      ? "bg-cyan-950/50 text-cyan-400 border border-cyan-800/50 shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-900/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Folder className={`w-3.5 h-3.5 ${activeFolder === folder ? "text-cyan-400" : "text-slate-500"}`} />
                    <span className="capitalize">{folder}</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-500">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Uploader Box */}
        <div className="border border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 text-center transition-all bg-slate-950/60 mt-auto relative">
          {uploading ? (
            <div className="py-4 space-y-2.5">
              <Loader2 className="w-7 h-7 animate-spin text-cyan-400 mx-auto" />
              <span className="text-[11px] text-cyan-300 font-semibold block font-sans">{uploadProgressMsg}</span>
              <span className="text-[9px] text-slate-500 block font-mono">Converting to High-Speed WebP</span>
            </div>
          ) : (
            <label className="cursor-pointer block py-3 group">
              <div className="w-10 h-10 rounded-full bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-center mx-auto mb-2.5 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xs font-semibold text-slate-200 block group-hover:text-cyan-300 transition-colors">
                Select or Drop Image
              </span>
              <span className="text-[10px] text-slate-400 font-mono block mt-1">
                Fast WebP auto-compression
              </span>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) handleFilesUpload(e.target.files);
                }}
                className="hidden"
              />
            </label>
          )}
        </div>

        {errorMessage && (
          <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-800/40 text-[11px] text-red-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Center: assets Grid */}
      <div className="lg:col-span-2 p-4 flex flex-col gap-3 bg-slate-950/10">
        <div className="flex gap-2 items-center bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white">
          <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search by name, title, or alt text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent focus:outline-none placeholder-slate-600 text-xs"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="text-[10px] text-slate-500 hover:text-white font-mono px-1"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex-grow overflow-y-auto max-h-[380px] pr-1">
          {sortedAndFilteredAssets.length === 0 && optimisticPreviews.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="w-8 h-8 text-slate-700 mx-auto mb-2" />
              <p className="text-xs text-slate-400 font-medium">No images in folder "{activeFolder}".</p>
              <p className="text-[11px] text-slate-600 mt-1">Upload an image or drop it here to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Optimistic uploading previews */}
              {optimisticPreviews.map((preview) => (
                <div
                  key={preview.id}
                  className="relative aspect-square rounded-xl overflow-hidden border border-cyan-500/50 bg-slate-900 animate-pulse flex flex-col items-center justify-center p-2"
                >
                  <img
                    src={preview.previewUrl}
                    alt={preview.name}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-slate-950/70 flex flex-col items-center justify-center gap-1 p-2 text-center">
                    <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                    <span className="text-[9px] font-mono text-cyan-300 font-bold uppercase tracking-wider">Saving...</span>
                    <span className="text-[8px] text-slate-400 truncate max-w-full">{preview.name}</span>
                  </div>
                </div>
              ))}

              {/* Saved Assets */}
              {sortedAndFilteredAssets.map((asset) => {
                const isSelected = selectedAssetId === asset.id;

                return (
                  <div
                    key={asset.id}
                    onClick={() => handleSelectAsset(asset)}
                    onDoubleClick={() => {
                      if (onSelectAsset) {
                        onSelectAsset(asset.url, asset.altText);
                      }
                    }}
                    className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer border transition-all ${
                      isSelected
                        ? "border-cyan-400 ring-2 ring-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-slate-900"
                        : "border-slate-800 hover:border-slate-600 bg-slate-950"
                    }`}
                  >
                    <img
                      src={asset.url}
                      alt={asset.altText || asset.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback image if source is missing or broken
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80";
                      }}
                    />

                    {/* Image Name / Info Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent border-t border-slate-900/50 text-[10px] text-slate-300 font-mono truncate">
                      {asset.title || asset.name}
                    </div>

                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 p-1 bg-cyan-500 text-slate-950 rounded-full shadow-md z-10 animate-fade-in">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}

                    {/* Hover Quick Action */}
                    {onSelectAsset && (
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center p-2 transition-opacity z-10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectAsset(asset.url, asset.altText);
                          }}
                          className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] rounded-lg shadow-lg cursor-pointer transform scale-95 group-hover:scale-100 transition-all"
                        >
                          Use Image
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right: Inspection / Edit */}
      <div className="lg:col-span-1 border-l border-slate-800 bg-slate-950/30 p-4 flex flex-col">
        {selectedAsset ? (
          <div className="space-y-3.5 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Asset Properties</h4>
              {selectedAsset.size ? (
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                  {Math.round(selectedAsset.size / 1024)} KB
                </span>
              ) : null}
            </div>

            {/* Preview Box */}
            <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-800 relative group">
              <img 
                src={selectedAsset.url} 
                alt={selectedAsset.altText || selectedAsset.name} 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <a
                href={selectedAsset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-1.5 right-1.5 p-1 rounded bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800 text-[9px] flex items-center gap-1 font-mono opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="w-3 h-3" /> View Full
              </a>
            </div>

            {/* Primary Action Button */}
            {onSelectAsset && (
              <button
                type="button"
                onClick={() => onSelectAsset(selectedAsset.url, selectedAsset.altText)}
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-extrabold py-2.5 px-4 rounded-xl shadow-lg shadow-cyan-500/20 text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>SELECT THIS IMAGE</span>
              </button>
            )}

            {/* Metadata inputs */}
            <div className="space-y-2.5 pt-1 text-left">
              <div>
                <label className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">Asset Title</label>
                <input 
                  type="text" 
                  value={assetTitle} 
                  onChange={(e) => setAssetTitle(e.target.value)} 
                  placeholder="e.g. SEO Dashboard Laptop"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500" 
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">Alt Text (SEO)</label>
                <input 
                  type="text" 
                  value={altText} 
                  onChange={(e) => setAltText(e.target.value)} 
                  placeholder="Descriptive alt text for Google"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500" 
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">Caption</label>
                <textarea 
                  value={caption} 
                  onChange={(e) => setCaption(e.target.value)} 
                  placeholder="Optional caption"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none" 
                  rows={2} 
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button 
                  onClick={handleSaveMetadata} 
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 text-cyan-400" /> Save SEO Meta
                </button>
                <button 
                  onClick={() => onDelete(selectedAssetId!)} 
                  title="Delete image"
                  className="px-3 bg-red-950/40 hover:bg-red-900/60 text-red-400 rounded-lg border border-red-800/40 transition-colors cursor-pointer flex items-center justify-center"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 text-xs gap-2">
            <ImageIcon className="w-8 h-8 text-slate-700" />
            <p className="italic">Click any image to inspect properties, adjust SEO alt text, or use it as cover image.</p>
          </div>
        )}
      </div>
    </div>
  );
}
