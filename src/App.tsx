import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Especialidade from "./pages/Especialidade"
import Exames from "./pages/Exames"
import Medicos from "./pages/Medicos"
import Entrar from "./pages/Entrar"
import Registar from "./pages/Registar"
import Header from "./layout/Header"
import Footer from "./layout/Footer"



function App() {

  return (
    <div className=''>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/especialidade" element={<Especialidade />} /> 
          <Route path="/exames" element={<Exames />} /> 
          <Route path="/medicos" element={<Medicos/>} /> 
          <Route path="/entrar" element={<Entrar/>}/> 
          <Route path="/registar" element={<Registar/>}/> 
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  )
}

export default App
