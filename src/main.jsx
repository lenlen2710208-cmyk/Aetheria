import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import Layout from '../components/Layout.jsx';
import Home from '../pages/Home.jsx';
import Database from '../pages/Database.jsx';
import Arena from '../pages/Arena.jsx';
import Wardrobe from '../pages/Wardrobe.jsx';
import Suits from '../pages/Suits.jsx';
import Stages from '../pages/Stages.jsx';
import './styles.css';

function App(){
  const[page,setPage]=useState('home');
  const[item,setItem]=useState(null);
  useEffect(()=>{const fn=e=>setItem(e.detail);window.addEventListener('aetheria:item',fn);return()=>window.removeEventListener('aetheria:item',fn)},[]);
  const pages={home:<Home setPage={setPage}/>,database:<Database/>,arena:<Arena/>,wardrobe:<Wardrobe setPage={setPage}/>,suits:<Suits/>,stages:<Stages/>};
  return <Layout page={page} setPage={setPage}>{pages[page]||pages.home}{item&&<div className="modal-backdrop" onClick={()=>setItem(null)}><div className="item-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setItem(null)}>×</button><div className="modal-art">{item.image?<img src={item.image} alt=""/>:<span>✦</span>}</div><div className="modal-copy"><span className="eyebrow">ITEM #{item.id}</span><h2>{item.name}</h2><p>{item.type||'Chưa phân loại'} · {item.source||'Chưa xác định'}</p><h3>Thuộc tính</h3><div className="attribute-list">{Object.entries(item.attributes||{}).map(([k,v])=><span key={k}><b>{k}</b><i>{v}</i></span>)}</div>{item.tags?.length?<><h3>Tag</h3><div className="tags">{item.tags.map(t=><span key={t}>{t}</span>)}</div></>:null}{item.sourceUrl?<a href={item.sourceUrl} target="_blank" rel="noreferrer">Xem nguồn gốc</a>:null}</div></div></div>}</Layout>
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);