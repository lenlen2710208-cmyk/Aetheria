import {useEffect,useState} from 'react';
import {Heart,Trash2,Search} from 'lucide-react';
import {loadItems} from '../services/catalog.js';
export default function Wardrobe({setPage}){
 const[itemsAll,setItemsAll]=useState([]);
 const[owned,setOwned]=useState(()=>JSON.parse(localStorage.getItem('aetheria-wardrobe')||'[]'));
 const[q,setQ]=useState('');
 useEffect(()=>{loadItems().then(setItemsAll).catch(()=>{});},[]);
 useEffect(()=>localStorage.setItem('aetheria-wardrobe',JSON.stringify(owned)),[owned]);
 const items=itemsAll.filter(x=>owned.includes(String(x.id))&&(!q||x.name?.toLowerCase().includes(q.toLowerCase())));
 return <section className="page"><div className="page-head"><div><span className="eyebrow">TỦ CỦA TÔI</span><h2>Tủ đồ cá nhân</h2><p>Lưu tủ ngay trên thiết bị của bạn, không cần tài khoản.</p></div><span className="count">{owned.length.toLocaleString('vi-VN')} món</span></div><div className="search"><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm trong tủ đồ..."/></div>{!items.length?<div className="empty-state"><Heart size={30}/><h3>Tủ đồ đang trống</h3><p>Hãy vào Kho đồ để tìm item. Khi tính năng đánh dấu được bật, món bạn chọn sẽ xuất hiện ở đây.</p><button className="primary" onClick={()=>setPage('database')}>Mở Kho đồ</button></div>:<div className="simple-list">{items.map(x=><div className="simple-row" key={x.id}><strong>{x.name}</strong><span>{x.type} · {x.source}</span><button onClick={()=>setOwned(v=>v.filter(id=>id!==String(x.id)))}><Trash2 size={16}/></button></div>)}</div>}</section>
}