import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home1.jsx';
import CadastroPessoa from './pages/CadastroPessoa.jsx';
import Login from './pages/login.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>    
    <Routes>
  <Route path="/" element={<Home/>} />
  <Route path='/login' element={<Login/>}/>
  <Route path='/CadastrarPessoa' element={<CadastroPessoa/>}/>
    </Routes>
     </BrowserRouter>
  </StrictMode>,
)
