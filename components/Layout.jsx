import {Home,Database,Trophy,Heart,Layers,Map} from 'lucide-react';
export default function Layout({page,setPage,children}){
 const nav=[
  ['home','Trang chủ',Home],
  ['database','Kho đồ',Database],
  ['suits','Trang phục',Layers],
  ['wardrobe','Tủ của tôi',Heart],
  ['stages','Chặng đấu',Map],
  ['arena','Bảng vàng',Trophy]
 ];
 return <div className="app">
  <header className="topbar">
   <button className="brand" onClick={()=>setPage('home')}><span className="brand-mark">A</span><span>Aetheria</span></button>
   <nav>{nav.map(([id,label,Icon])=><button key={id} className={page===id?'active':''} onClick={()=>setPage(id)}><Icon size={16}/>{label}</button>)}</nav>
  </header>
  <main>{children}</main>
  <footer>Aetheria • Fanmade • Không thuộc VNG • Dữ liệu chỉ hiển thị khi có nguồn xác minh</footer>
 </div>
}