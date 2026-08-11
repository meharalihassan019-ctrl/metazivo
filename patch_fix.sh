cat << 'INNER_EOF' > /tmp/btn.tsx
                      {onSelectAsset && (
                        <button
                          type="button"
                          onClick={(e) => { 
                            e.preventDefault();
                            e.stopPropagation(); 
                            console.log("INSERT IMAGE CLICKED", asset.url);
                            onSelectAsset(asset.url, asset.altText); 
                          }}
                          className="mt-4 px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-[10px] rounded shadow-lg z-50 pointer-events-auto"
                        >
                          INSERT IMAGE
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
INNER_EOF
awk -v r="/tmp/btn.tsx" '{
  if ($0 ~ /\{onSelectAsset && \(/) {
    system("cat " r)
    exit
  }
  print $0
}' src/components/MediaLibrary.tsx > temp.tsx && mv temp.tsx src/components/MediaLibrary.tsx
