import { Routes, Route, useLocation } from "react-router-dom"

import Home from "./pages/Home"
import Especialidade from "./pages/Especialidade"
import Exames from "./pages/Exames"
import Medicos from "./pages/Medicos"
import Entrar from "./pages/Entrar"
import Registar from "./pages/Registar"
import Header from "./layout/Header"
import Footer from "./layout/Footer"

// ADMIN
import Index from "./adminPage/Index"
import AddAdmin from "./adminPage/AddAdmin"
import AddClinico from "./adminPage/AddClinico"
import EspecialidadeAdmin from "./adminPage/EspecialidadeAdmin"
import Marcacao from "./adminPage/Marcacao"
import RCU from "./adminPage/RCU"
import Config from "./adminPage/Config"

// CLÍNICO
import IndexClinico from "./clinicoPage/IndexClinico"
import Consulta from "./clinicoPage/Consulta"
import Horario from "./clinicoPage/Horario"
import Paciente from "./clinicoPage/Paciente"
import PerfilClinico from "./clinicoPage/PerfilClinico"
import Exame from "./clinicoPage/Exame"

function App() {
  const location = useLocation()

  // Rotas onde NÃO deve aparecer Header/Footer
  const noHeaderFooterRouter = ["/entrar", "/registar"]
  const showHeaderFooterRouters = !noHeaderFooterRouter.includes(location.pathname)

  return (
    <div>
      {showHeaderFooterRouters && (
        <div className="h-20">
          <Header />
        </div>
      )}

      <Routes>
        {/* PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/especialidade" element={<Especialidade />} />
        <Route path="/exames" element={<Exames />} />
        <Route path="/medicos" element={<Medicos />} />
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/registar" element={<Registar />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Index />}>
          <Route path="addadmin" element={<AddAdmin />} />
          <Route path="clinico" element={<AddClinico />} />
          <Route path="especialidade" element={<EspecialidadeAdmin />} />
          <Route path="marcacao" element={<Marcacao />} />
          <Route path="rcu" element={<RCU />} />
          <Route path="config" element={<Config />} />
        </Route>

        {/* CLÍNICO */}
        <Route path="/clinico" element={<IndexClinico />}>
          <Route path="exame" element={<Exame />} />
          <Route path="consulta" element={<Consulta />} />
          <Route path="horario" element={<Horario />} />
          <Route path="paciente" element={<Paciente />} />
          <Route path="perfilclinico" element={<PerfilClinico />} />
        </Route>
      </Routes>

      {showHeaderFooterRouters && <Footer />}
    </div>
  )
}

export default App
