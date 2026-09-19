import {useEffect,useMemo,useState} from 'react';
import {Map,Search,Sparkles} from 'lucide-react';

const groups=[['quyen1','Quyển 1'],['quyen2','Quyển 2'],['arena','Khu thi đấu'],['event','Sự kiện']];
const attrs={simple:'Đơn giản',gorgeous:'Lộng lẫy',elegant:'Thanh lịch',lively:'Năng động',mature:'Trưởng thành',cute:'Dễ thương',sexy:'Gợi cảm',pure:'Trong sáng',cool:'Mát mẻ',warm:'Giữ ấm'};

export default function Stages(){
 const[all,setAll]=useState([]),[q,setQ]=useState(''),[group,setGroup]=useState('quyen1');
 useEffect(()=>{fetch(new URL('../data/stages.json',import.meta.url)).then(r=>r.json()).then(x=>setAll(x.stages||[])).catch(()=>{});},[]);
 const stages=useMemo(()=>all.filter(s=>(!group||s.group===group)&&(!q||`${s.label} ${s.name}`.toLowerCase().includes(q.toLowerCase()))),[all,q,group]);
 return <section className="page"><div className="page-head"><div><span className="eyebrow">CHẶNG ĐẤU</span><h2>Outfit Optimizer</h2><p>Tra cứu chặng có hệ số đã được nguồn dữ liệu xác minh.</p></div><Map className="big-icon"/></div><div className="search"><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm tên chặng hoặc mã chặng..."/></div><div className="stage-tabs">{groups.map(([id,label])=><button key={id} className={group===id?'active':''} onClick={()=>setGroup(id)}>{label}</button>)}</div>{!all.length?<div className="empty-state"><Sparkles size={30}/><h3>Đang tải dữ liệu chặng</h3><p>Chỉ hiển thị chặng khi pipeline đã đồng bộ dữ liệu xác minh.</p></div>:<div className="simple-list">{stages.map(s=><article className="simple-row" key={s.id}><div><strong>{s.label}</strong><span>{s.name}</span><small>{Object.entries(s.attrs||{}).map(([k,v])=>`${attrs[k]||k}: ${v}`).join(' · ')}</small>{s.tags?.length?<small>Tag: {s.tags.join(' · ')}</small>:null}</div><b>{s.id}</b></article>)}</div>}</section>
}