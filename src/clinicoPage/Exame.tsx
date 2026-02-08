import { Send, Upload } from "lucide-react";
import TitleGestao from "../components/TitleGestao";
import { useState } from "react";

type Exame = {
  id: number
  nome: string
  hora: string
  exame: string
  email: string
  status: StatusExame
}
const dadosExames: Exame[] = [
  {
    id: 1,
    nome: 'João Pedro Silva',
    hora: '10:30',
    exame: 'Radiografia de Tórax',
    email: 'joao.silva@gmail.com',
    status: 'em_progresso'
  },
  {
    id: 2,
    nome: 'Maria Santos',
    hora: '11:00',
    exame: 'Análises Clínicas',
    email: 'maria.santos@gmail.com',
    status: 'pronto'
  },
  {
    id: 3,
    nome: 'António Fernandes',
    hora: '14:00',
    exame: 'Eletrocardiograma',
    email: 'antonio.f@gmail.com',
    status: 'aguardando'
  },
  {
    id: 4,
    nome: 'Ana Costa',
    hora: '15:30',
    exame: 'Tomografia Computadorizada',
    email: 'anacosta@gmail.com',
    status: 'cancelado'
}
]

type StatusExame = 'em_progresso' | 'aguardando' | 'pronto' | 'cancelado'


export default function Exame(){

    const [exames, setExames] = useState<Exame[]>(dadosExames)

    function handleStatusExame (id: number, novoSatus: StatusExame){
        setExames(prev =>
            prev.map(e =>
                e.id === id ? { ...e, status: novoSatus} : e
            )
        )
    }

    const statusStyle: Record<StatusExame, string> = {
        em_progresso: 'bg-yellow-100 text-yellow-600',
        aguardando: 'bg-indigo-100 text-indigo-600',
        pronto: 'bg-green-100 text-green-600',
        cancelado: 'bg-red-100 text-red-600'
    }

    const statusLAbel: Record<StatusExame, string> = {
        em_progresso: 'Em progresso',
        aguardando: 'Aguardando',
        pronto: 'Pronto',
        cancelado: 'Cancelado'
    }

    return(
        <div>
            <TitleGestao title="Gestão de Exames" p="Alterar estado, anexar resultados e receitas, enviar para RCU do utente"/>
            <div className="space-y-4">
                {
                    exames.map(item => (
                    <div key={item.id} className="space-y-3 border rounded-xl shadow py-4 px-4">
                        <div className="flex items-center justify-between border-b py-2">
                            <div>
                                <h2 className="font-semibold text-lg">{item.nome}</h2>

                                <div className="text-zinc-700">
                                    <p>{item.hora} - {item.exame}</p>
                                    <p>j{item.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                                <div>
                                    <select value={item.status} onChange={e => handleStatusExame(item.id, e.target.value as StatusExame)} name="" id="" className="border rounded-lg p-2 outline-none bg-zinc-100" >
                                        <option value='em_progresso'>Em progresso</option>
                                        <option value="aguardando">Aguardando</option>
                                        <option value="pronto">Pronto</option>
                                        <option value="cancelado">Cancelado</option>
                                    </select>
                                </div>
                                <span className={`py-1 px-5 rounded-full text-center font-semibold flex items-center gap-2 ${statusStyle[item.status]}`} >{statusLAbel[item.status]}</span>
                            </div>
                        </div>
                        <form action="">
                            <div className="space-y-1 my-4">
                                {['Resultado', 'Receita'].map(tipo => (
                                <div className="grid grid-cols-4 max-w-full items-center gap-2">
                                        <input type="file" name="" id="" className="w-full py-2 bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border col-span-3" />
                                        <button className="hover:text-white hover:bg-blue-500 text-blue-500 border-2 border-blue-500 transition py-2 justify-center rounded-lg text-center font-semibold flex items-center gap-2" >
                                        <Upload />Anexar {tipo}</button>
                                        
                                </div> )
                                )}
                            </div>
                        </form>
                        {
                            item.status === 'pronto' && (
                                <div className="grid grid-cols-3 gap-2">
                                    <button className="bg-blue-500 text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center justify-center gap-2 col-span-2 hover:bg-blue-600" >
                                    <Send />Enviar para RCU</button>
                                        <button className="hover:text-white hover:bg-blue-500 border-2 border-blue-500 transition py-1 px-5 rounded-lg text-center font-semibold flex items-center justify-center gap-2 text-blue-500 col-span-1" >
                                    Enviar mensagem ao utente</button>
                                </div>
                                 
                            )
                        } 
                    </div>
                    )) 
                }
            </div>
        </div>
    )
}