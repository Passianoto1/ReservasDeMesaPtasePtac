import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import CadastroPessoa from './pages/CadastroPessoa.jsx';
import Login from './pages/Login.jsx';
<<<<<<< HEAD
import ConsultarMesas from './pages/ConsultarMesas.jsx'
=======
import ConsultarMesas from './pages/CadastroPessoa.jsx'
import ListarReservas from './pages/ListarReservas.jsx';
>>>>>>> 7c28b8e2c0066d3084ab86de4506a70ad091c5a9
import { BrowserRouter, Route, Routes } from "react-router-dom";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>    
    <Routes>
  <Route path="/" element={<Home/>} />
  <Route path='/login' element={<Login/>}/>
  <Route path='/CadastrarPessoa' element={<CadastroPessoa/>}/>
    <Route path='/ConsultarMesas' element={<ConsultarMesas/>}/>
    <Route path='/ListarReservas' element={<ListarReservas/>}/>
    </Routes>
     </BrowserRouter>
  </StrictMode>,
)
