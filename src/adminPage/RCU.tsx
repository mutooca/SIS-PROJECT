import { Search } from "lucide-react";
import TitleGestao from "../components/TitleGestao";
import { FiCheck } from "react-icons/fi";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";

const entidadeFinanceiraSchema = z.object({
    nomeEntidade: z.string().min(3, 'O nome da entidade financeira é obrigatório'),
    numeroEntidade: z.string().min(3, 'O número na entidade é obrigatório'),
    observacoes: z.string().optional()
})

// data/utentes.ts
export const utentes = [
  {
    id: 1,
    nome: "João Pedro Silva",
    numeroIdentificador: "123456",
    nomeEntidade: "ACMS Seguros",
    numeroEntidade: "SEG789456",
  },
  {
    id: 1,
    nome: "Jordan Miguel Pedro",
    numeroIdentificador: "123456",
    nomeEntidade: "ACMS Seguros",
    numeroEntidade: "SEG789456",
  },
  {
    id: 2,
    nome: "Maria João Lopes",
    numero: "654321",
    nomeEntidade: "ENSA",
    numeroEntidade: "ENSA1234",
  },
]


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
    }
]
type entidadeFinanceiraData = z.infer<typeof entidadeFinanceiraSchema>


export default function RCU(){

    const [nomeBusca, setNomeBusca] = useState("")
    const [utente, setUtente] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    function normalizeString(str: string) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    }

    async function buscarUtentePorNome(nome: string) {
    return new Promise((resolve) => {   
        setTimeout(() => {
            const termo = normalizeString(nome)

            const resultados = utentes.filter(u => normalizeString(u.nome).includes(termo))[0]
            if (resultados) {
                resolve(resultados);
            } else {
                resolve([])
            }
        }, 1000);
    });
}

    async function handleBuscarUtente(event: React.FormEvent){
        event.preventDefault()
        if(!nomeBusca.trim()) {
            toast.error('Por favor, insira um nome para buscar o utente.') 
            return
        }
        try{
            setLoading(true)
            toast.loading('Buscando utente...')
            const utenteEncontrado = await buscarUtentePorNome(nomeBusca)
            setUtente(utenteEncontrado)
            toast.dismiss()
            toast.success('Utente encontrado com sucesso!')
        }
        catch(error){
            toast.dismiss()
            toast.error('Utente não encontrado. Verifique o nome e tente novamente.')
            setUtente(null)
        }
        finally{
            setLoading(false)
        }

    }

    const {register,
        formState: { errors},
        handleSubmit
     } = useForm({resolver: zodResolver(entidadeFinanceiraSchema)})

     async function handleEndidadeFinanceira (data: entidadeFinanceiraData){
        console.log(data)
     }
    return (
        <div>
            <TitleGestao title="Gestão de RCU" p="Consultar e actualizar apenas dados administrativos"/>

            <p className="bg-yellow-50 rounded-md p-2 border border-yellow-300 text-sm">⚠️<span className="font-semibold ">Restrições:</span>  Você pode consultar apenas dados administrativos e não pode alterar informações médicas (diagnósticos, terapêutica, etc.) inseridas pelo pessoal clínico.</p>

            <form action="" onSubmit={handleBuscarUtente}>
                <div className="space-y-1 my-4">
                    <label htmlFor="name" className="font-semibold">Buscar Utente por nome</label>
                    <div className="flex max-w-7xl gap-2">
                        <input value={nomeBusca} onChange={e => setNomeBusca(e.target.value)} type="text" name="nome" id="nome" placeholder="Digite o nome do utente" className="w-full h-12 bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        <button disabled={loading} type="submit" className="bg-blue-500 text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2" >
                        <Search />Consultar</button>
                    </div>
                </div>
            </form>
            {
            utente && (
            <div  className="border p-4 rounded-md shadow-md space-y-4">
                <h3 className="font-semibold text-xl my-4">{utente.nome} - Nº {utente.numeroIdentificador}</h3>
                <div>
                    <p><span className="font-semibold">Entidade Financeira:</span> {utente.numeroEntidade}</p>
                    <p><span className="font-semibold">Nº na Entidade:</span> {utente.nomeEntidade}</p>
                </div>
                <form onSubmit={handleSubmit(handleEndidadeFinanceira)} className=" space-y-3 bg-indigo-50 p-4 rounded-md">
                    <h3 className="font-semibold text-lg">Dados Administrativos (Editáveis)</h3>
                    <div className='grid md:grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="name" className="font-semibold">Entidade Financeira</label>
                            <input {...register('nomeEntidade')} type="text" name="nomeEntidade" id="nomeEntidade" placeholder="ACMS Seguros" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 outline-blue-500 border" />
                            {errors.nomeEntidade && <p className='text-xs text-red-600'>{errors.nomeEntidade.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="numeroEntidade" className="font-semibold">Nº na Entidade</label>
                            <input {...register('numeroEntidade')}  type="text" name="numeroEntidade" id="numeroEntidade" placeholder="SEG789456" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 outline-blue-500 border" />
                            {errors.numeroEntidade && <p className='text-xs text-red-600'>{errors.numeroEntidade.message}</p>}
                        </div>
                    </div>
                    <div className="space-y-1 flex flex-col w-full">
                        <label htmlFor="name" className="font-semibold">Observações Administrativas</label>
                        <textarea rows={3} name="especialidade" id="especialidade" className="max-w-full border bg-zinc-50 rounded-lg pl-4 outline-blue-500 border" placeholder="Notas administrativas sobre o utente"></textarea>
                        {errors.observacoes && <p className='text-xs text-red-600'>{errors.observacoes.message}</p>}
                    </div>
                    <button className="bg-blue-500 text-white hover:bg-blue-600 w-full h-12 rounded-xl font-semibold transition">
                    Actualizar Apenas Dados Administrativos
                    </button>
                </form>
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
            )
            }
           
        </div>
    )
}