import fs from "node:fs/promises";
const base="https://raw.githubusercontent.com/lenlen2710208-cmyk/Theealux/main/data";
const files=["stages.json","stages-extra.json","scoring-spec.json"];
const out={};
for(const name of files){const r=await fetch(base+"/"+name);if(!r.ok)throw new Error(`${name}: HTTP ${r.status}`);out[name]=await r.json();}
const stages=[...(out["stages.json"].stages||[]),...(out["stages-extra.json"].stages||[])];
const seen=new Set(),merged=[];
for(const s of stages){if(!seen.has(s.id)){seen.add(s.id);merged.push(s)}}
await fs.mkdir("data",{recursive:true});
await fs.writeFile("data/stages.json",JSON.stringify({schemaVersion:1,updatedAt:new Date().toISOString(),sources:[...(out["stages.json"].sources||[]),{name:"Theealux stages-extra",url:base+"/stages-extra.json"}],stages:merged},"utf8"));
await fs.writeFile("data/scoring-spec.json",JSON.stringify(out["scoring-spec.json"],null,2),"utf8");
console.log(`Synced ${merged.length} verified stage profiles`);