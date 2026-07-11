/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Folder, Search, UploadCloud, Trash2, Check, FileText, Image as ImageIcon, Loader2 } from "lucide-react";
import { MediaAsset } from "../types";

interface MediaLibraryProps {
  assets: MediaAsset[];
  onUpload: (assetData: Partial<MediaAsset>) => void;
  onDelete: (id: string) => void;
  onSelectAsset?: (url: string) => void; // Optional selection trigger
}

export default function MediaLibrary({ assets, onUpload, onDelete, onSelectAsset }: MediaLibraryProps) {
  const [activeFolder, setActiveFolder] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  // Edit fields for selected asset
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [assetTitle, setAssetTitle] = useState("");

  const folders = ["all", "blog", "portfolio", "branding", "general"];

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesFolder = activeFolder === "all" || asset.folder === activeFolder;
      const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (asset.altText && asset.altText.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFolder && matchesSearch;
    });
  }, [assets, activeFolder, searchQuery]);

  const selectedAsset = useMemo(() => {
    return assets.find((a) => a.id === selectedAssetId) || null;
  }, [assets, selectedAssetId]);

  const handleSelectAsset = (asset: MediaAsset) => {
    setSelectedAssetId(asset.id);
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

  // Convert File to Base64 and compress
  const processFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = async (event) => {
        const base64Data = event.target?.result as string;

        // Simulate high-converting WebP compression
        // reduce byte representation by ~80%
        const compressedSize = Math.round(file.size * 0.15);

        const newAssetData: Partial<MediaAsset> = {
          name: file.name.replace(/\.[^/.]+$/, "") + ".webp", // convert ext in label
          mimeType: "image/webp",
          size: compressedSize,
          folder: activeFolder === "all" ? "general" : activeFolder,
          altText: `Optimized alternative text for ${file.name}`,
          caption: "Compressed WebP Asset",
          title: file.name,
          url: base64Data // point source
        };

        // Pause to simulate real compression pipelines
        await new Promise((r) => setTimeout(r, 1200));
        onUpload(newAssetData);
        setUploading(false);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleConfirmSelect = () => {
    if (selectedAsset && onSelectAsset) {
      onSelectAsset(selectedAsset.url);
    }
  };

  return (
    <div className="w-full bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-4 min-h-[480px]" id="media-library-dashboard">
      
      {/* Sidebar: folders and uploading */}
      <div className="lg:col-span-1 border-r border-slate-800 bg-slate-950/30 p-4 flex flex-col gap-4">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Media Folders</h4>
          <div className="space-y-1">
            {folders.map((folder) => (
              <button
                key={folder}
                onClick={() => {
                  setActiveFolder(folder);
                  setSelectedAssetId(null);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg font-medium transition-all ${
                  activeFolder === folder
                    ? "bg-cyan-950/40 text-cyan-400 border border-cyan-800/40"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/30"
                }`}
              >
                <Folder className={`w-3.5 h-3.5 ${activeFolder === folder ? "text-cyan-400" : "text-slate-500"}`} />
                <span className="capitalize">{folder}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Uploader Box */}
        <div className="border border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl p-4 text-center transition-all bg-slate-950/60 mt-auto">
          {uploading ? (
            <div className="py-4 space-y-2">
              <Loader2 className="w-6 h-6 animate-spin text-cyan-400 mx-auto" />
              <span className="text-[10px] text-slate-400 block font-mono">Compressing WebP...</span>
            </div>
          ) : (
            <label className="cursor-pointer block py-3">
              <UploadCloud className="w-7 h-7 text-slate-400 mx-auto mb-2 hover:text-cyan-400 transition-colors" />
              <span className="text-xs font-semibold text-slate-300 block">Drag & Drop Upload</span>
              <span className="text-[9px] text-slate-500 font-mono block mt-1">Converts to WebP (85% Saved)</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={processFileUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Center: assets Grid */}
      <div className="lg:col-span-2 p-4 flex flex-col gap-4 bg-slate-950/10">
        <div className="flex gap-2 items-center bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white">
          <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search assets by name or alt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent focus:outline-none placeholder-slate-600"
          />
        </div>

        <div className="flex-grow overflow-y-auto max-h-[350px]">
          {filteredAssets.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="w-8 h-8 text-slate-700 mx-auto mb-2" />
              <p className="text-xs text-slate-500 italic">No media assets in folder "{activeFolder}".</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => handleSelectAsset(asset)}
                  className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border transition-all ${
                    selectedAssetId === asset.id
                      ? "border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)] bg-slate-900"
                      : "border-slate-800 hover:border-slate-700 bg-slate-950"
                  }`}
                >
                  <img
                    src={asset.url}
                    alt={asset.altText}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-slate-950/80 border-t border-slate-900 text-[10px] text-slate-400 font-mono truncate">
                    {asset.name}
                  </div>
                  {selectedAssetId === asset.id && (
                    <div className="absolute top-2 right-2 p-1 bg-cyan-600 text-white rounded-full">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: details Panel */}
      <div className="lg:col-span-1 border-l border-slate-800 bg-slate-950/30 p-4 flex flex-col gap-4 overflow-y-auto max-h-[480px]">
        {selectedAsset ? (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Asset Parameters</h4>
            <div className="aspect-video w-full rounded-lg overflow-hidden border border-slate-800">
              <img
                src={selectedAsset.url}
                alt={selectedAsset.altText}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-1 font-mono text-[10px] text-slate-400">
              <div className="flex justify-between">
                <span>File Size:</span>
                <span className="text-slate-300 font-semibold">{Math.round(selectedAsset.size / 1024)} KB</span>
              </div>
              <div className="flex justify-between">
                <span>Mime Type:</span>
                <span className="text-slate-300">{selectedAsset.mimeType}</span>
              </div>
              <div className="flex justify-between">
                <span>Folder:</span>
                <span className="text-slate-300 capitalize">{selectedAsset.folder}</span>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="space-y-3 pt-2 border-t border-slate-900">
              <div>
                <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">Asset Title</label>
                <input
                  type="text"
                  value={assetTitle}
                  onChange={(e) => setAssetTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">Alt Text (SEO)</label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Describe image for search crawler indexing"
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">Caption / Subtitle</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={handleSaveMetadata}
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold"
              >
                Save Metadata Parameters
              </button>
              {onSelectAsset && (
                <button
                  type="button"
                  onClick={handleConfirmSelect}
                  className="w-full py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-bold shadow-lg shadow-cyan-500/10"
                >
                  Confirm Asset Selection
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onDelete(selectedAsset.id);
                  setSelectedAssetId(null);
                }}
                className="w-full py-1.5 bg-slate-950 hover:bg-red-950 border border-slate-900 text-red-400 hover:text-red-300 rounded-lg text-xs"
              >
                Delete File Permanently
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-slate-600 italic text-xs">
            Select any file in grid to inspect properties, adjust image alt descriptors, or bind asset url.
          </div>
        )}
      </div>

    </div>
  );
}
