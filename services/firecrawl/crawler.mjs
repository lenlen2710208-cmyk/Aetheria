import {FirecrawlApp} from '@firecrawl-js/sdk';import fs from 'node:fs/promises';import path from 'node:path';
const apiKey=process.env.FIRECRAWL_API_KEY;if(!apiKey){console.error('Thiếu FIRECRAWL_API_KEY');process.exit(1)}
const app=new FirecrawlApp({apiKey});
const targets=(process.env.AETHERIA_SOURCES||'https://annie-nikki.homes/').split(',').map(x=>x.trim()).filter(Boolean);
const out=path.resolve('data/items.json');
const results=[];
for(const url of targets){try{const r=await app.scrapeUrl(url,{formats:['markdown'],onlyMainContent:true});results.push({source:url,markdown:r.markdown||''})}catch(e){console.error('Crawler error:',url,e.message)}}
await fs.mkdir(path.dirname(out),{recursive:true});await fs.writeFile(out,JSON.stringify({updatedAt:new Date().toISOString(),sources:results},null,2));console.log('Saved',out);