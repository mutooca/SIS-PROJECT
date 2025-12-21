import { Search } from "lucide-react";
import TitleGestao from "../components/TitleGestao";

export default function RCU(){
    return (
        <div>
            <TitleGestao title="Gestão de RCU" p="Consultar e actualizar apenas dados administrativos"/>

            <p className="bg-yellow-50 rounded-md p-2 border border-yellow-500">⚠️<span className="font-semibold ">Restrições:</span>  Você pode consultar apenas dados administrativos e não pode alterar informações médicas (diagnósticos, terapêutica, etc.) inseridas pelo pessoal clínico.</p>

            <form action="">
                <div className="space-y-1 my-4">
                    <label htmlFor="name" className="font-semibold">Buscar Utente por ID ou nome</label>
                    <div className="flex max-w-7xl gap-2">
                        <input type="text" name="" id="" placeholder="Número de Identificador" className="w-full h-12 bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        <button className="bg-blue-500 text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2" >
                        <Search />Consultar</button>
                    </div>
                </div>
            </form>

            <div  className="border p-4 rounded-md shadow-md space-y-4">
                <h3 className="font-semibold text-xl my-4">João Pedro Silva - Nº 123456</h3>
                <div className=" space-y-3 bg-indigo-50  p-4 rounded-md">
                    <h3 className="font-semibold">Dados Administrativos (Editáveis)</h3>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="name" className="font-semibold">Entidade Financeira</label>
                            <input type="text" name="name" id="name" placeholder="SEG789456" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 outline-blue-500 border" />
                            
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="numeroOrdem" className="font-semibold">Nº na Entidade</label>
                            <input type="text" name="numeroOrdem" id="numeroOrdem" placeholder="ACMS Seguros" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 outline-blue-500 border" />
                           
                        </div>
                    </div>
                     <div className="space-y-1 flex flex-col w-full">
                        <label htmlFor="name" className="font-semibold">Observações Administrativas</label>
                        <input type="text" name="especialidade" id="especialidade" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 outline-blue-500 border" placeholder="Notas administrativas sobre o utente" />
                        
                    </div>
                </div>
                <div className=" space-y-3 bg-zinc-50  p-4 rounded-md">
                    <h3 className="font-semibold">Histórico de Consultas (Apenas Leitura)</h3>
                    <div className="border p-4 rounded-md">
                        <p className="font-semibold">01/11/2025 - Cardiologia</p>
                        <div className="text-zinc-700">
                            <p>Médico: Dr. João Silva</p>
                            <p>Status: Realizada</p>
                            <p className="text-red-500">🔒 Diagnóstico e terapêutica: Acesso restrito ao pessoal clínico</p>
                        </div>
                    </div>
                </div>
                <div className=" space-y-3 bg-zinc-50  p-4 rounded-md">
                    <h3 className="font-semibold">Exames (Apenas Leitura)</h3>
                    <div className="border p-4 rounded-md">
                        <p className="font-semibold">25/10/2025 - Análises Clínicas</p>
                        <div className="text-zinc-700">
                            <p>Status: Concluído</p>
                            <p className="text-red-500">🔒 Resultados: Acesso restrito ao pessoal clínico</p>
                        </div>
                    </div>
                </div>
                <div className=" space-y-3 bg-zinc-50  p-4 rounded-md">
                    <h3 className="font-semibold">Marcações Futuras</h3>
                    <div className="border p-4 rounded-md">
                        <p className="font-semibold">15/12/2025 às 10:00</p>
                        <div className="text-zinc-700">
                            <p>Cardiologia - Dr. João Silva</p>
                            <p>Status: Confirmada</p>
                        </div>
                    </div>
                </div>
                <button className="bg-blue-500 text-white hover:bg-blue-600 w-full h-12 rounded-xl font-semibold transition">
                Actualizar Apenas Dados Administrativos
                </button>
            </div>

        </div>
    )
}