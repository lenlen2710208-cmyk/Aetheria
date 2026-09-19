import {useEffect,useMemo,useState} from 'react';
import {Search,SlidersHorizontal,Sparkles,X} from 'lucide-react';
import {filterItems} from '../services/filters.js';
import VirtualGrid from '../components/VirtualGrid.jsx';
import {loadItems} from '../services/catalog.js';

const ATTRS=['Đơn giản','Lộng lẫy','Thanh lịch','Năng động','Trưởng thành','Dễ thương','Gợi cảm','Kín đáo','Mát mẻ','Giữ ấm'];
const TYPES=['Tóc','Đầm','Áo','Quần','Giày','Sức','Trang điểm','Phụ kiện','Vớ','Ngoài','Trang sức','Đặc biệt'];
const SOURCES=['Shop','Lầu Mộng Cảnh','Chế tạo','Tiến hóa','Sự kiện','Ải','Khác'];
const [items,setItems]=useState([]);\n useEffect(()=>{loadItems().then(setItems).catch(()=>{});},[]);

export default function Database(){
 const[q,setQ]=useState(''),[type,setType]=useState('Tất cả'),[source,setSource]=useState('Tất cả'),[attr,setAttr]=useState('Tất cả'),[rarity,setRarity]=useState('Tất cả');
 const data=useMemo(()=>filterItems(items,{query:q,type,source,attribute:attr,rarity}),[q,type,source,attr,rarity]);
 const clear=()=>{setQ('');setType('Tất cả');setSource('Tất cả');setAttr('Tất cả');setRarity('Tất cả')};
 const renderItem=x=><article className="item"><div className="item-art">{x.image?<img src={x.image} alt="" loading="lazy"/>:<Sparkles/>}<span>#{x.id}</span></div><div className="item-body"><div className="item-title"><h3>{x.name}</h3><b>{x.rarity?'★'.repeat(Number(x.rarity)):''}</b></div><p>{x.type||'Chưa phân loại'} · {x.source||'Chưa xác định'}</p><div className="tags">{(x.tags||[]).map(t=><span key={t}>{t}</span>)}</div><div className="score"><span>Thuộc tính</span><strong>{Object.keys(x.attributes||{}).length||0}/10</strong></div></div></article>;
 return <section className="page">
  <div className="page-head"><div><span className="eyebrow">KHO ĐỒ</span><h2>Tất cả item</h2><p>Tìm kiếm theo tên, loại, thuộc tính, nguồn và độ hiếm.</p></div><span className="count">{data.length.toLocaleString('vi-VN')} / {items.length.toLocaleString('vi-VN')}</span></div>
  <div className="search"><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm tên item..."/>{q&&<button className="clear-search" onClick={()=>setQ('')}><X size={15}/></button>}<SlidersHorizontal/></div>
  <div className="filter-bar"><select value={type} onChange={e=>setType(e.target.value)}><option value="Tất cả">Tất cả loại</option>{TYPES.map(x=><option key={x} value={x}>{x}</option>)}</select><select value={attr} onChange={e=>setAttr(e.target.value)}><option value="Tất cả">Tất cả thuộc tính</option>{ATTRS.map(x=><option key={x} value={x}>{x}</option>)}</select><select value={rarity} onChange={e=>setRarity(e.target.value)}><option value="Tất cả">Tất cả sao</option>{[1,2,3,4,5].map(x=><option key={x} value={x}>{x} sao</option>)}</select><select value={source} onChange={e=>setSource(e.target.value)}><option value="Tất cả">Tất cả nguồn</option>{SOURCES.map(x=><option key={x} value={x}>{x}</option>)}</select><button className="reset" onClick={clear}>Đặt lại</button></div>
  {!items.length?<div className="empty-state"><Sparkles size={30}/><h3>Chưa có item thật</h3><p>Kho đang chờ pipeline dữ liệu xác minh. Khi có dữ liệu, bộ lọc này sẽ hoạt động trên toàn bộ catalog.</p></div>:<VirtualGrid items={data} renderItem={renderItem} rowHeight={330} columns={3}/>}
 </section>
}