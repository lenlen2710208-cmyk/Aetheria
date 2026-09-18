import {useEffect,useMemo,useState} from "react";
export default function VirtualGrid({items,renderItem,rowHeight=330,columns=3}){
 const [top,setTop]=useState(0),[height,setHeight]=useState(window.innerHeight),[width,setWidth]=useState(window.innerWidth);
 useEffect(()=>{const onScroll=()=>setTop(window.scrollY),onResize=()=>{setHeight(window.innerHeight);setWidth(window.innerWidth)};window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onResize);return()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onResize)}},[]);
 const cols=width<=430?1:width<=760?2:columns;
 const rowH=width<=430?310:width<=760?300:rowHeight;
 const start=Math.max(0,Math.floor(Math.max(0,top-600)/rowH)),visibleRows=Math.ceil(height/rowH)+5,end=Math.min(Math.ceil(items.length/cols),start+visibleRows);
 const rows=useMemo(()=>Array.from({length:Math.max(0,end-start)},(_,r)=>items.slice((start+r)*cols,(start+r+1)*cols)),[items,start,end,cols]);
 return <div className="virtual-grid" style={{height:Math.ceil(items.length/cols)*rowH}}><div className="virtual-grid-window" style={{transform:"translateY(" + start*rowH + "px)"}}>{rows.map((row,i)=><div className="virtual-grid-row" style={{gridTemplateColumns:"repeat("+cols+",minmax(0,1fr))",height:rowH}} key={start+i}>{row.map((item,j)=><div key={item.id??j}>{renderItem(item)}</div>)}</div>)}</div></div>;
}
