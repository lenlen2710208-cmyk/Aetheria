import fs from "node:fs/promises";
const ATTRS=["Đơn giản","Lộng lẫy","Thanh lịch","Năng động","Trưởng thành","Dễ thương","Gợi cảm","Kín đáo","Mát mẻ","Giữ ấm"];
const inputPath=process.argv[2]||"data/items.normalized.json";
const input=JSON.parse(await fs.readFile(inputPath,"utf8"));
const items=input.items||[]; const errors=[]; const ids=new Set(); const names=new Set();
for(let i=0;i<items.length;i++){
 const x=items[i], at="items["+i+"]";
 if(!x?.id) errors.push({item:at,field:"id",message:"Thiếu id"});
 if(!x?.name?.trim()) errors.push({item:at,field:"name",message:"Thiếu tên"});
 if(!x?.type?.trim()) errors.push({item:at,field:"type",message:"Thiếu loại"});
 if(!x?.source?.trim()) errors.push({item:at,field:"source",message:"Thiếu nguồn"});
 if(!Array.isArray(x?.tags)) errors.push({item:at,field:"tags",message:"tags phải là mảng"});
 if(x?.rarity!=null && (!Number.isInteger(x.rarity)||x.rarity<1||x.rarity>6)) errors.push({item:at,field:"rarity",message:"rarity phải 1-6 hoặc null"});
 if(x?.id && ids.has(String(x.id))) errors.push({item:at,field:"id",message:"Trùng id"});
 if(x?.name && names.has(x.name.trim().toLowerCase())) errors.push({item:at,field:"name",message:"Trùng tên"});
 ids.add(String(x?.id)); names.add(x?.name?.trim().toLowerCase());
 for(const a of ATTRS){const v=x?.attributes?.[a];if(v!=null&&typeof v!=="number") errors.push({item:at,field:"attributes."+a,message:"Điểm phải là số"});}
}
const report={schemaVersion:1,checkedAt:new Date().toISOString(),input:inputPath,itemCount:items.length,errorCount:errors.length,valid:errors.length===0,errors};
await fs.writeFile("data/validation-report.json",JSON.stringify(report,null,2));
console.log(JSON.stringify({valid:report.valid,itemCount:report.itemCount,errorCount:report.errorCount},null,2));
if(errors.length) process.exitCode=1;
