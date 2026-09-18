import {useMemo,useState} from "react";
import {Search,SlidersHorizontal,Sparkles} from "lucide-react";
import {filterItems} from "../services/filters.js";
import {scoreItem} from "../services/scoring.js";
import VirtualGrid from "../components/VirtualGrid.jsx";
import catalog from "../data/items.json";
const ATTRS=["Đơn giản","Lộng lẫy","Thanh lịch","Năng động","Trưởng thành","Dễ thương","Gợi cảm","Kín đáo","Mát mẻ","Giữ ấm"];
const TYPES=["Tóc","Đầm","Áo","Quần","Giày","Sức","Trang điểm","Phụ kiện"];
const SOURCES=["Shop","Lầu Mộng Cảnh","Chế tạo","Tiến hóa","Sự kiện"];
const demo=[{id:"demo-1",name:"Tóc Ánh Trăng",type:"Tóc",rarity:5,source:"Sự kiện",tags:["Thanh lịch","Mát mẻ"],score:9876},{id:"demo-2",name:"Váy Hoa Ngọc",type:"Đầm",rarity:5,source:"Tiến hóa",tags:["Lộng lẫy","Dễ thương"],score:9821},{id:"demo-3",name:"Giày Bạch Ngọc",type:"Giày",rarity:4,source:"Shop",tags:["Thanh lịch","Đơn giản"],score:9410},{id:"demo-4",name:"Vương miện Tinh Vân",type:"Phụ kiện",rarity:5,source:"Sự kiện",tags:["Lộng lẫy","Trưởng thành"],score:9730},{id:"demo-5",name:"Mắt Sao Băng",type:"Trang điểm",rarity:5,source:"Lầu Mộng Cảnh",tags:["Gợi cảm","Trưởng thành"],score:9688},{id:"demo-6",name:"Áo Lavender",type:"Áo",rarity:4,source:"Chế tạo",tags:["Dễ thương","Kín đáo"],score:9180}];
const items=(catalog.items?.length?catalog.items:demo).map(x=>({...x,score:x.score??scoreItem(x)}));
export default function Database(){
 const[q,setQ]=useState(""),[type,setType]=useState("Tất cả"),[source,setSource]=useState("Tất cả"),[attr,setAttr]=useState("Tất cả");
 const data=useMemo(()=>filterItems(items,{query:q,type,source,attribute:attr}),[q,type,source,attr]);
 const renderItem=x=><article className="item"><div className="item-art">{x.image?<img src={x.image} alt="" loading="lazy"/>:<Sparkles/>}<span>#{x.id}</span></div><div className="item-body"><div className="item-title"><h3>{x.name}</h3><b>{"★".repeat(Math.max(0,Number(x.rarity)||0))}</b></div><p>{x.type} · {x.source}</p><div className="tags">{(x.tags||[]).map(t=><span key={t}>{t}</span>)}</div><div className="score">Điểm gợi ý <strong>{Number(x.score||0).toLocaleString("vi-VN")}</strong></div></div></article>;
 return <section className="page"><div className="page-head"><div><span className="eyebrow">DATABASE</span><h2>Kho Item</h2><p>Tra cứu thuộc tính, nguồn gốc và tag phong cách.</p></div><span className="count">{data.length.toLocaleString("vi-VN")} kết quả</span></div>
 <div className="search"><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm tên item..."/><SlidersHorizontal/></div>
 <div className="filters"><select value={type} onChange={e=>setType(e.target.value)}><option>Tất cả</option>{TYPES.map(x=><option key={x}>{x}</option>)}</select><select value={attr} onChange={e=>setAttr(e.target.value)}><option>Tất cả</option>{ATTRS.map(x=><option key={x}>{x}</option>)}</select><select value={source} onChange={e=>setSource(e.target.value)}><option>Tất cả</option>{SOURCES.map(x=><option key={x}>{x}</option>)}</select></div>
 {!catalog.items?.length&&<div className="data-banner">Đang dùng dữ liệu demo. Khi pipeline xác minh có dữ liệu thật, Aetheria sẽ tự hiển thị toàn bộ kho.</div>}
 <VirtualGrid items={data} renderItem={renderItem} rowHeight={330} columns={3}/></section>;
}