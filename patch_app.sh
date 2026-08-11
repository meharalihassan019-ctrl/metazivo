sed -i 's|showMediaSelectorForEditor(url, altText);|console.log("Called showMediaSelectorForEditor", url, altText); showMediaSelectorForEditor(url, altText);|g' src/App.tsx
