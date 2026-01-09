import { Search } from "lucide-react";
import TitleGestao from "../components/TitleGestao";
import { FiCheck } from "react-icons/fi";

const historicoConsulta = [
    {
        data: '01/11/2025', especialidade: 'Cardiologia', medico: 'Dr. João Silva', status: 'Realizada'
    },
    {
        data: '30/09/2025', especialidade: 'Dermatologia', medico: 'Dra. Carla Oliveira', status: 'Cancelada'
    },
    {
        data: '12/09/2025', especialidade: 'Ortopedia', medico: 'Dr. Pedro Almeida', status: 'Reagendada'
    }
]

const historicoExame = [
    {
        data: '25/10/2025', exame: 'Análises Clínicas', status: 'Realizada'
    },
    {
        data: '15/08/2025', exame: 'Ecografia Abdominal', status: 'Reagendada'
    },
    {
        data: '05/07/2025', exame: 'Ressonância Magnética', status: 'Cancelado'
    },
    
    
]
export default function RCU(){

    return (
        <div>
            <TitleGestao title="Gestão de RCU" p="Consultar e actualizar apenas dados administrativos"/>

            <p className="bg-yellow-50 rounded-md p-2 border border-yellow-300 text-sm">⚠️<span className="font-semibold ">Restrições:</span>  Você pode consultar apenas dados administrativos e não pode alterar informações médicas (diagnósticos, terapêutica, etc.) inseridas pelo pessoal clínico.</p>

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
                    <h3 className="font-semibold text-lg">Dados Administrativos (Editáveis)</h3>
                    <div className='grid md:grid-cols-2 gap-4 w-full'>
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
                     <button className="bg-blue-500 text-white hover:bg-blue-600 w-full h-12 rounded-xl font-semibold transition">
                    Actualizar Apenas Dados Administrativos
                    </button>
                </div>
                <div className=" space-y-3 bg-zinc-50  p-4 rounded-md">
                    <h3 className="font-semibold text-lg">Histórico de Consultas (Apenas Leitura)</h3>
                    {
                        historicoConsulta.map((item, index) => (
                        <div key={index} className="border p-4 rounded-md">
                            <p className="font-semibold">{item.data} - {item.especialidade}</p>
                            <div className="text-zinc-700">
                                <p>Médico: <span className=" font-semibold"> {item.medico}</span></p>
                                <p className="flex items-center gap-2">Status: 
                                    {
                                        item.status === 'Cancelada' && (
                                            <span className="text-red-500 font-semibold">🔴 Cancelada</span>
                                        ) 
                                    } 
                                    {
                                        item.status === 'Reagendada' && (
                                            <span className="text-yellow-500 font-semibold">🟡 Reagendada</span >
                                        )
                                    }
                                    {
                                        item.status === 'Realizada' && (
                                            <span className="text-green-500 font-semibold flex items-center gap-2">🟢 Realizada <FiCheck /></span>
                                        )
                                    }
                                </p>
                                <p className="text-red-500 text-sm">🔒 Diagnóstico e terapêutica: Acesso restrito ao pessoal clínico</p>
                            </div>
                        </div> 
                        ))
                    }
                   
                </div>
                <div className=" space-y-3 bg-zinc-50  p-4 rounded-md">
                    <h3 className="font-semibold text-lg">Histórico de Exames (Apenas Leitura)</h3>
                    {
                        historicoExame.map((item, index) => (
                        <div key={index} className="border p-4 rounded-md">
                            <p className="font-semibold">{item.data} - {item.exame}</p>
                            <div className="text-zinc-700">
                                <p className="flex items-center gap-2">Status: {
                                    item.status === 'Cancelado' && (
                                        <span className="text-red-500 font-semibold">🔴 Cancelado</span>
                                    )
                            }{
                                item.status === 'Reagendada' && (
                                    <span className="text-yellow-500 font-semibold">🟡 Reagendada</span >
                                )
                            }{
                                item.status === 'Realizada' && (
                                    <span className="text-green-500 font-semibold flex items-center gap-2">🟢 Realizada <FiCheck /></span>
                                )
                            }
                            </p>
                                <p className="text-red-500 text-sm">🔒 Resultados: Acesso restrito ao pessoal clínico</p>
                            </div>
                        </div>
                        )
                    )}
                    
                </div>
               
            </div>

        </div>
    )
}