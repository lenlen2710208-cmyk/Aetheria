import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
const copyCatalog=()=>({name:'copy-catalog',closeBundle(){const src=path.resolve('data/items.json');const dest=path.resolve('dist/data/items.json');fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(src,dest);}});
export default defineConfig({plugins:[react(),copyCatalog()],base:'./'});