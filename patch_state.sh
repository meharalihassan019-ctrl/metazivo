awk '
{
  if ($0 ~ /const selectedAsset = useMemo/) {
    print "  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);"
    skip=1
  }
  if (skip && $0 ~ /  \}, \[assets, selectedAssetId\]\);/) {
    skip=0
    next
  }
  if (!skip) {
    if ($0 ~ /setSelectedAssetId\(asset.id\);/) {
      print $0
      print "    setSelectedAsset(asset);"
    } else if ($0 ~ /setSelectedAssetId\(null\);/) {
      print $0
      print "                  setSelectedAsset(null);"
    } else {
      print $0
    }
  }
}' src/components/MediaLibrary.tsx > temp.tsx && mv temp.tsx src/components/MediaLibrary.tsx
