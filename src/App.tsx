import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { Toaster } from 'react-hot-toast'

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

// Utente
import Utente from "./pages/Utente";
import ConsultasTab from "./utentePage/ConsultasTab";
import ExamesTab from "./utentePage/ExamesTab";
import PerfilTab from "./utentePage/PerfilTab";
import RcuTab from "./utentePage/RcuTab";

function App() {
  const location = useLocation()

  // Rotas onde NÃO deve aparecer Header/Footer
  const noHeaderFooterRouter = ["/entrar", "/registar"]
  const showHeaderFooterRouters = !noHeaderFooterRouter.includes(location.pathname)

  return (
    <div>
      <div>
        <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '8px',
            fontSize: '14px',
          },
        }}
      />
      </div>
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

          <Route index element={< Navigate to={'clinico'} replace />} />
          <Route path="addadmin" element={<AddAdmin />} />
          <Route path="clinico" element={<AddClinico />} />
          <Route path="especialidade" element={<EspecialidadeAdmin />} />
          <Route path="marcacao" element={<Marcacao />} />
          <Route path="rcu" element={<RCU />} />
          <Route path="config" element={<Config />} />
        </Route>

        {/* CLÍNICO */}
        <Route path="/clinico" element={<IndexClinico />}>
          <Route index element={<Navigate to={"consulta"} replace />} />
          <Route path="exame" element={<Exame />} />
          <Route path="consulta" element={<Consulta />} />
          <Route path="paciente" element={<Paciente />} />
          <Route path="perfilclinico" element={<PerfilClinico />} />
        </Route>

            {/* UTENTE */}
         <Route path="/utente" element={<Utente />}>
          <Route path="consultasTab" element={<ConsultasTab />} />
          <Route path="examesTab" element={<ExamesTab />} />
          <Route path="perfilTab" element={<PerfilTab />} />
          <Route path="rcuTab" element={<RcuTab />} />
        </Route>
      </Routes>

      

      {showHeaderFooterRouters && <Footer />}
    </div>
  )
}

export default App
