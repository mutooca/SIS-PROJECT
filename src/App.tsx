import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Especialidade from "./pages/Especialidade"
import Exames from "./pages/Exames"
import Medicos from "./pages/Medicos"
import Entrar from "./pages/Entrar"
import Registar from "./pages/Registar"



function App() {

  return (
    <div className=''>
  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/Especialidade" element={<Especialidade />} /> 
          <Route path="/Exames" element={<Exames />} /> 
          <Route path="/Medicos" element={<Medicos/>} /> 
          <Route path="/Entrar" element={<Entrar/>}/> 
          <Route path="/Registar" element={<Registar/>}/> 
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
