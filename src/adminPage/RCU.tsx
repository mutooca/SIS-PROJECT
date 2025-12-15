import { Search } from "lucide-react";
import TitleGestao from "../components/TitleGestao";

export default function RCU(){
    return (
        <div>
            <TitleGestao title="Gestão de RCU" p="Consultar e actualizar apenas dados administrativos"/>

            <p className="bg-yellow-50 rounded-xl p-2 border border-yellow-400">⚠️<span className="font-semibold ">Restrições:</span>  Você pode consultar apenas dados administrativos e não pode alterar informações médicas (diagnósticos, terapêutica, etc.) inseridas pelo pessoal clínico.</p>

            <form action="">
                <div className="space-y-1 my-4">
                    <label htmlFor="name" className="font-semibold">Buscar Utente por ID</label>
                    <div className="flex max-w-7xl gap-2">
                        <input type="text" name="" id="" placeholder="Número de Identificador" className="w-full h-12 bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        <button className="bg-blue-500 text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2" >
                        <Search />Consultar</button>
                    </div>
                </div>
            </form>

        </div>
    )
}