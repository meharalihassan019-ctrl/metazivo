const fs = require('fs');
let text = fs.readFileSync('server.ts', 'utf8');
const search = `app.put("/api/posts/:id", (req, res) => {
  db = loadDb();
  const index = db.posts.findIndex((p: any) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  db.posts[index] = {
    ...db.posts[index],
    ...req.body
  };
  saveDb(db);
  res.json(db.posts[index]);
});`;
const replace = search + `

app.post("/api/posts/:id/view", (req, res) => {
  db = loadDb();
  const index = db.posts.findIndex((p: any) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  db.posts[index].views = (db.posts[index].views || 0) + 1;
  saveDb(db);
  res.json({ views: db.posts[index].views });
});`;
if(text.includes(search)) {
  fs.writeFileSync('server.ts', text.replace(search, replace));
  console.log("Success");
} else {
  console.log("Search string not found!");
}
