import {useEffect,useMemo,useState} from "react";
export default function VirtualGrid({items,renderItem,rowHeight=360,columns=3}){
 const [top,setTop]=useState(0),[height,setHeight]=useState(window.innerHeight);
 useEffect(()=>{const onScroll=()=>setTop(window.scrollY),onResize=()=>setHeight(window.innerHeight);window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onResize);return()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onResize)}},[]);
 const start=Math.max(0,Math.floor(Math.max(0,top-600)/rowHeight)), visibleRows=Math.ceil(height/rowHeight)+4, end=Math.min(Math.ceil(items.length/columns),start+visibleRows);
 const rows=useMemo(()=>Array.from({length:Math.max(0,end-start)},(_,r)=>items.slice((start+r)*columns,(start+r+1)*columns)),[items,start,end,columns]);
 return <div className="virtual-grid" style={{height:Math.ceil(items.length/columns)*rowHeight}}><div className="virtual-grid-window" style={{transform:"translateY("+start*rowHeight+"px)"}}>{rows.map((row,i)=><div className="virtual-grid-row" style={{gridTemplateColumns:"repeat("+columns+",minmax(0,1fr))"}} key={start+i}>{row.map((item,j)=><div key={item.id??j}>{renderItem(item)}</div>)}</div>)}</div></div>;
}
