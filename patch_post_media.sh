cat << 'INNER_EOF' > /tmp/media_post.ts
app.post("/api/media", async (req, res) => {
  try {
    if (req.body.id) {
      const docRef = doc(firestoreDb, "media", req.body.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const updateData = { ...req.body, updatedAt: new Date().toISOString() };
        await setDoc(docRef, updateData, { merge: true });
        return res.json({ ...docSnap.data(), ...updateData });
      }
    }
    
    const newId = \`media-\${Date.now()}\`;
    const newAsset = {
      id: newId,
      name: req.body.name || "uploaded_asset.png",
      url: req.body.url || req.body.fileData || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80",
      size: req.body.size || 1024,
      mimeType: req.body.mimeType || "image/png",
      folder: req.body.folder || "general",
      altText: req.body.altText || "",
      caption: req.body.caption || "",
      title: req.body.title || req.body.name || "Media File",
      createdAt: new Date().toISOString()
    };
    
    await setDoc(doc(firestoreDb, "media", newId), newAsset);
    res.json(newAsset);
  } catch(e) {
    res.status(500).json({ error: "Failed to upload media" });
  }
});
INNER_EOF
awk -v r="/tmp/media_post.ts" '{
  if ($0 ~ /app\.post\("\/api\/media"/) {
    system("cat " r)
    skip=1
  }
  if (skip && $0 ~ /^});$/) {
    skip=0
    next
  }
  if (!skip) print $0
}' server.ts > temp.ts && mv temp.ts server.ts
