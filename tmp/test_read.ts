import fs from "fs";
import path from "path";

// Verify we can read the original file
const originalFilePath = path.join(process.cwd(), "src/components/seo-tools/seoToolsData.ts");
const originalContent = fs.readFileSync(originalFilePath, "utf8");

console.log("Original file length:", originalContent.length);
