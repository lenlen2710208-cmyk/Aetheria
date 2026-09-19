import React,{useState} from 'react';
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
  const pages={home:<Home setPage={setPage}/>,database:<Database/>,arena:<Arena/>,wardrobe:<Wardrobe setPage={setPage}/>,suits:<Suits/>,stages:<Stages/>};
  return <Layout page={page} setPage={setPage}>{pages[page]||pages.home}</Layout>
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);