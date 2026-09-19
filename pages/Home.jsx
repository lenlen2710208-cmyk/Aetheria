import {Database,Trophy,Heart,Layers,Map,Search,ChevronRight,Sparkles} from 'lucide-react';
import catalog from '../data/items.json';
export default function Home({setPage}){
 const count=catalog.items?.length||0;
 const cards=[
  ['database','Kho đồ',Database,'Tra cứu item, thuộc tính, tag và nguồn gốc.'],
  ['suits','Trang phục',Layers,'Xem bộ trang phục và các món thuộc cùng set.'],
  ['wardrobe','Tủ của tôi',Heart,'Đánh dấu những món bạn đang sở hữu ngay trên thiết bị.'],
  ['stages','Chặng đấu',Map,'Khu vực dành cho hướng dẫn và bộ lọc theo chặng.'],
  ['arena','Bảng vàng',Trophy,'Bảng xếp hạng và chủ đề thi đấu theo dữ liệu xác minh.']
 ];
 return <section className="home">
  <div className="home-hero">
   <div className="hero-copy">
    <span className="eyebrow"><Sparkles size={14}/> NGÔI SAO THỜI TRANG · FAN ARCHIVE</span>
    <h1>Tìm đúng món đồ.<br/><em>Phối đúng phong cách.</em></h1>
    <p>Aetheria lấy cảm hứng từ những kho dữ liệu cộng đồng như Annie Nikki Homes, nhưng được thiết kế lại cho người Việt: nhẹ, nhanh, rõ và tập trung vào item thật.</p>
    <div className="hero-search" onClick={()=>setPage('database')}><Search size={18}/><span>Tìm kiếm trong kho đồ...</span><ChevronRight size={17}/></div>
    <div className="hero-actions"><button className="primary" onClick={()=>setPage('database')}>Mở kho đồ</button><button className="secondary" onClick={()=>setPage('stages')}>Xem chặng đấu</button></div>
   </div>
   <div className="hero-art"><div className="hero-orb"><Sparkles size={48}/><span>AETHERIA</span></div></div>
  </div>
  <div className="stats"><div><strong>{count.toLocaleString('vi-VN')}</strong><span>item hiện có</span></div><div><strong>10</strong><span>thuộc tính</span></div><div><strong>∞</strong><span>bộ trang phục</span></div><div><strong>VN</strong><span>ưu tiên tiếng Việt</span></div></div>
  <div className="feature-grid">{cards.map(([id,title,Icon,text])=><button key={id} onClick={()=>setPage(id)}><span className="feature-icon"><Icon size={20}/></span><strong>{title}</strong><span>{text}</span><ChevronRight size={16}/></button>)}</div>
  {!count&&<div className="empty-notice"><strong>Kho dữ liệu đang chờ nguồn thật.</strong><span>Giao diện đã sẵn sàng cho hàng chục nghìn item; Aetheria sẽ không tự bịa item để lấp chỗ trống.</span></div>}
  <p className="home-note">Tham khảo cấu trúc chức năng từ <a href="https://annie-nikki.homes/" target="_blank" rel="noreferrer">Annie Nikki Homes</a>: Kho đồ, Trang phục, Tủ của tôi và Chặng đấu. Aetheria không sao chép giao diện hoặc dữ liệu của họ.</p>
 </section>
}