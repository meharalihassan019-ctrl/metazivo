sed -i '2124,2150c\
    // Serve static files with 1 year cache headers (ignoring index.html which is served dynamically)\
    app.use(express.static(distPath, {\
      index: false,\
      maxAge: "1y",\
      etag: true,\
      lastModified: true\
    }));\
\
    // Intercept and pre-render any incoming page requests dynamically\
    app.get("*", (req, res) => {\
      try {\
        const rawHtml = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");\
        res.setHeader("Content-Type", "text/html; charset=utf-8");\
        res.setHeader("Cache-Control", "public, max-age=3600");\
        res.send(rawHtml);\
      } catch (err) {\
        console.error("Failed to serve index.html:", err);\
        res.status(500).send("<!DOCTYPE html><html><body>Error loading application index.</body></html>");\
      }\
    });\
  }\
\
  app.listen(PORT, "0.0.0.0", () => {\
    console.log(`Metazivo Server is running at http://0.0.0.0:${PORT}`);\
  });\
}\
' server.ts
