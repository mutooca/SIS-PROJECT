import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Especialidade from "./pages/Especialidade"
import Exames from "./pages/Exames"
import Medicos from "./pages/Medicos"
import Entrar from "./pages/Entrar"
import Registar from "./pages/Registar"
import Header from "./layout/Header"
import Footer from "./layout/Footer"
function App() {
    
  const location = useLocation()
  const isAdminRouter = location.pathname.startsWith('/admin')
  const isClinicoRouter = location.pathname.startsWith('/clinico')
  const noHeaderFooterRouter = ['/entrar', '/cadastrar']
  const showHeaderFooterRouters = (!noHeaderFooterRouter.includes(location.pathname) && !isAdminRouter && !isClinicoRouter)

  return (
    <div className=''>

      
      {showHeaderFooterRouters && <div className="h-20"><Header/></div>}
      
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/especialidade" element={<Especialidade />} /> 
          <Route path="/exames" element={<Exames />} /> 
          <Route path="/medicos" element={<Medicos/>} /> 
          <Route path="/entrar" element={<Entrar/>}/> 
          <Route path="/registar" element={<Registar/>}/> 
        </Routes>
        {showHeaderFooterRouters && <Footer/>}

    </div>
  )
}

export default App
