cat << 'INNER_EOF' > /tmp/upload.tsx
  const processFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = async (event) => {
        const base64Data = event.target?.result as string;
        
        const img = new window.Image();
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1000;
          const MAX_HEIGHT = 1000;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
             ctx.drawImage(img, 0, 0, width, height);
             const compressedBase64 = canvas.toDataURL("image/webp", 0.6);
             
             const newAssetData: Partial<MediaAsset> = {
                name: file.name.replace(/\.[^/.]+$/, "") + ".webp", 
                mimeType: "image/webp",
                size: Math.round(compressedBase64.length * 0.75),
                folder: activeFolder === "all" ? "general" : activeFolder,
                altText: `Optimized alternative text`,
                caption: "Compressed WebP Asset",
                title: file.name,
                url: compressedBase64
             };
             await onUpload(newAssetData);
          }
          setUploading(false);
        };
        img.src = base64Data;
      };

      reader.readAsDataURL(file);
    }
  };
INNER_EOF

awk -v r="/tmp/upload.tsx" '{
  if ($0 ~ /const processFileUpload = async/) {
    system("cat " r)
    skip=1
  }
  if (skip && $0 ~ /^  const handleConfirmSelect = \(\) => \{/) {
    skip=0
    print $0
    next
  }
  if (!skip) print $0
}' src/components/MediaLibrary.tsx > temp.tsx && mv temp.tsx src/components/MediaLibrary.tsx
