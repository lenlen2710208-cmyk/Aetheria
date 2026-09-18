import { FirecrawlApp } from "@firecrawl-js/sdk";
import fs from "node:fs/promises";
import path from "node:path";
const apiKey=process.env.FIRECRAWL_API_KEY;
if(!apiKey) throw new Error("Thiếu FIRECRAWL_API_KEY");
const targets=(process.env.AETHERIA_SOURCES||"").split(",").map(s=>s.trim()).filter(Boolean);
if(!targets.length) throw new Error("Thiếu AETHERIA_SOURCES");
const app=new FirecrawlApp({apiKey}); const pages=[];
for(const url of targets){try{const result=await app.scrapeUrl(url,{formats:["markdown"],onlyMainContent:true,timeout:30000});pages.push({url,title:result.metadata?.title||"",markdown:result.markdown||""});console.log("✓",url)}catch(error){console.error("✗",url,error.message)}}
const output={schemaVersion:1,updatedAt:new Date().toISOString(),status:"raw",sources:pages};
await fs.mkdir(path.resolve("data"),{recursive:true});await fs.writeFile(path.resolve("data/raw-crawl.json"),JSON.stringify(output,null,2),"utf8");
console.log("Saved raw crawl:",pages.length,"pages");