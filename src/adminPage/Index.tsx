
import { GoCalendar, GoGear, GoLog, GoPersonAdd, GoPulse } from "react-icons/go";
import ButtonAdmin from "./ButtonAdmin";
import { Outlet } from "react-router-dom";


export default function Index(){

    
    return (
        <div className="bg-zinc-100">
            <div className="flex items-center justify-between mx-2 sm:mx-8 py-8">
                <div>
                    <h1 className="font-semibold text-3xl">Painel Administrativo</h1>
                    <p className="text-zinc-600">Bem-vindo, João Silva</p>
                </div>
                 <button className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Sair</button>
            </div>

            <div className=" max-w-full flex justify-center bg-indigo-50">
                <nav className="grid max-w-full grid-cols-6 gap-4 py-1 px-2 rounded-lg ">
                    <ButtonAdmin icon={<GoPersonAdd />} theme="Mais Admin" to="addadmin" />
                    <ButtonAdmin icon={<GoPersonAdd />} theme="Pessoal Clínico" to="clinico" />
                    <ButtonAdmin icon={<GoPulse />} theme="Especialidades" to="especialidade" />
                    <ButtonAdmin icon={<GoCalendar />} theme="Marcações" to="marcacao" />
                    <ButtonAdmin icon={<GoLog />} theme="RCU" to="rcu" />
                    <ButtonAdmin icon={<GoGear />} theme="Configurações" to="config" />
                </nav>
            </div>
            <div className="mx-10 border my-4 bg-white shadow rounded-xl p-5">
                <main> 
                    <Outlet />
                </main>
            </div>
        </div>
    )
}