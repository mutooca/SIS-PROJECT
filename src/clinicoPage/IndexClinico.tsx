import { Outlet } from "react-router-dom";
import ButtonAdmin from "../adminPage/ButtonAdmin";
import { SlCalender } from "react-icons/sl";
import { GoPeople, GoPerson, GoRepoLocked } from "react-icons/go";


export default function IndexClinico(){
    return(
        <div>
        

             <div className="bg-zinc-100">
                        <div className="flex items-center justify-between mx-8 py-8">
                        <div>
                            <h1 className="font-semibold text-3xl">Painel do Pessoal Clínico</h1>
                            <p className="text-zinc-600">Bem-vindo, Dr(a). João Silva</p>
                        </div>
                        <button className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Sair</button>
                    </div>
            
                        <div className=" max-w-full flex justify-center bg-indigo-50">
                            <nav className="grid max-w-full grid-cols-5 gap-4 py-1 px-2 rounded-lg ">
                                <ButtonAdmin icon={<GoRepoLocked />} theme="Consultas" to="consulta" />
                                <ButtonAdmin icon={<GoPeople />} theme="Exames" to="exame" />
                                <ButtonAdmin icon={<GoPeople />} theme="Pacientes" to="paciente" />
                                <ButtonAdmin icon={<SlCalender />} theme="Horários" to="horario" />
                                <ButtonAdmin icon={<GoPerson />} theme="Meu Perfil" to="perfilclinico" />
                            </nav>
                        </div>
                        <div className="mx-10 border my-4 bg-white shadow rounded-xl p-5">
                            <main> 
                                <Outlet />
                            </main>
                        </div>
                    </div>
        </div>
    )
}