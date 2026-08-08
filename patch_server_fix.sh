sed -i 's|const newId = \\`media-\\${Date.now()}\\`;|const newId = `media-${Date.now()}`;|g' server.ts
