import fs from "node:fs/promises";
const src=JSON.parse(await fs.readFile("data/items.normalized.json","utf8"));
const report=JSON.parse(await fs.readFile("data/validation-report.json","utf8"));
if(!report.valid) throw new Error("Không publish: còn "+report.errorCount+" lỗi dữ liệu.");
const items=src.items||[];
const out={schemaVersion:1,updatedAt:new Date().toISOString(),items,meta:{status:"verified-pipeline",itemCount:items.length}};
await fs.writeFile("data/items.json",JSON.stringify(out,null,2));
console.log("Published",items.length,"items");
