// Entry point for Hostinger and other hosting environments
// This file delegates to the compiled production server in dist/server.cjs

import('./dist/server.cjs').catch((error) => {
  console.error("Failed to load compiled server from ./dist/server.cjs:", error);
  process.exit(1);
});
