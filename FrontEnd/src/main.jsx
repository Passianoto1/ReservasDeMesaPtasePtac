import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import CadastroPessoa from './pages/CadastroPessoa.jsx';
import Login from './pages/Login.jsx';
import ConsultarMesas from './pages/ConsultarMesas.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>    
    <Routes>
  <Route path="/" element={<Home/>} />
  <Route path='/login' element={<Login/>}/>
  <Route path='/CadastrarPessoa' element={<CadastroPessoa/>}/>
    <Route path='/ConsultarMesas' element={<ConsultarMesas/>}/>
    </Routes>
     </BrowserRouter>
  </StrictMode>,
)
