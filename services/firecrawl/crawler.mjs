import fs from "node:fs/promises";
import path from "node:path";

const apiKey = process.env.FIRECRAWL_API_KEY;
if (!apiKey) throw new Error("Thiếu FIRECRAWL_API_KEY");

const targets = (process.env.AETHERIA_SOURCES || "")
  .split(",").map(s => s.trim()).filter(Boolean);
if (!targets.length) throw new Error("Thiếu AETHERIA_SOURCES");

const pages = [];
for (const url of targets) {
  try {
    const response = await fetch("https://api.firecrawl.dev/v2/scrape", {
      method: "POST",
      headers: {"Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json"},
      body: JSON.stringify({url, formats:["markdown"], onlyMainContent:true})
    });
    const result = await response.json();
    if (!response.ok || result.success === false) throw new Error(result.error || `HTTP ${response.status}`);
    const data = result.data || result;
    pages.push({url, title:data.metadata?.title || "", markdown:data.markdown || ""});
    console.log("✓", url);
  } catch (error) {
    console.error("✗", url, error.message);
  }
}
const output = {schemaVersion:1, updatedAt:new Date().toISOString(), status:"raw", sources:pages};
await fs.mkdir(path.resolve("data"), {recursive:true});
await fs.writeFile(path.resolve("data/raw-crawl.json"), JSON.stringify(output,null,2), "utf8");
console.log("Saved raw crawl:", pages.length, "pages");
