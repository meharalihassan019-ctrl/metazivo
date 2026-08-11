cat << 'INNER_EOF' > /tmp/end.tsx
      </div>
      {/* Right: Inspection / Edit */}
      <div className="lg:col-span-1 border-l border-slate-800 bg-slate-950/30 p-4">
        {selectedAsset ? (
           <div className="space-y-4">
             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Asset Properties</h4>
             <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
               <img src={selectedAsset.url} alt={selectedAsset.altText} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
             </div>
             
             {onSelectAsset && (
               <button
                 type="button"
                 onClick={() => onSelectAsset(selectedAsset.url, selectedAsset.altText)}
                 className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 rounded-lg shadow-lg shadow-cyan-500/20"
               >
                 OKAY / INSERT IMAGE
               </button>
             )}

             <div className="space-y-3">
               <div>
                 <label className="text-[10px] text-slate-500 font-bold uppercase">Asset Title</label>
                 <input type="text" value={assetTitle} onChange={(e) => setAssetTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-xs text-white" />
               </div>
               <div>
                 <label className="text-[10px] text-slate-500 font-bold uppercase">Alt Text</label>
                 <input type="text" value={altText} onChange={(e) => setAltText(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-xs text-white" />
               </div>
               <div>
                 <label className="text-[10px] text-slate-500 font-bold uppercase">Caption</label>
                 <textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-xs text-white" rows={2} />
               </div>
               <div className="flex gap-2">
                 <button onClick={handleSaveMetadata} className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold py-1.5 rounded flex items-center justify-center gap-1">
                   <Check className="w-3.5 h-3.5" /> Save Data
                 </button>
                 <button onClick={() => onDelete(selectedAssetId!)} className="px-3 bg-red-900/30 hover:bg-red-900/50 text-red-500 rounded border border-red-900/50">
                   <Trash2 className="w-3.5 h-3.5" />
                 </button>
               </div>
             </div>
           </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center p-6 text-slate-500 text-xs italic">
            Select any file in grid to inspect properties, adjust image alt descriptors, or bind asset url.
          </div>
        )}
      </div>
    </div>
  );
}
INNER_EOF
head -n -3 src/components/MediaLibrary.tsx > temp.tsx
cat /tmp/end.tsx >> temp.tsx
mv temp.tsx src/components/MediaLibrary.tsx
