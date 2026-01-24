import { Search } from "lucide-react";
import TitleGestao from "../components/TitleGestao";
import { FiCheck } from "react-icons/fi";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";

const sanitizeText = (value: string) => {
  if (!value) return '';
  return value.trim().replace(/\s+/g, ' ').replace(/[<>'"]/g, '').slice(0, 500);
}

const sanitizeName = (value: string) => {
  if (!value) return '';
  return value.trim().replace(/\s+/g, ' ').replace(/[^A-Za-zÀ-ÿ\s]/g, '').slice(0, 100);
}

const sanitizeNumberString = (value: string) => {
  if (!value) return '';
  return value.replace(/\D/g, '').slice(0, 20);
}

const buscarUtenteSchema = z.object({
  nome: z.string().min(1, 'Digite o nome do utente').transform(sanitizeName).refine(val => val.length > 0, 'O nome não pode estar vazio').pipe(  
    z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').max(100, 'O nome é demasiado longo').regex(/^[A-Za-zÀ-ÿ\s]+$/, 'O nome só pode conter letras e espaços'))
})

const entidadeFinanceiraSchema = z.object({
  nomeEntidade: z.string().min(1, 'A entidade financeira é obrigatória').transform(sanitizeText).refine(val => val.length > 0, 'A entidade não pode estar vazia').pipe(
      z.string().min(3, 'O nome da entidade deve ter no mínimo 3 caracteres').max(100, 'O nome da entidade é demasiado longo')),
  
  numeroEntidade: z.string().min(1, 'O número na entidade é obrigatório').transform(sanitizeNumberString).refine(val => val.length > 0, 'O número não pode estar vazio').pipe(
      z.string().min(3, 'O número na entidade deve ter no mínimo 3 caracteres').max(20, 'O número na entidade é demasiado longo') ),
  
  observacoes: z.string().transform(sanitizeText).pipe(
      z.string().max(500, 'As observações não podem ultrapassar 500 caracteres')).optional().or(z.literal(''))
})

type BuscarUtenteData = z.infer<typeof buscarUtenteSchema>
type EntidadeFinanceiraData = z.infer<typeof entidadeFinanceiraSchema>

interface HistoricoConsulta {
  data: string
  especialidade: string
  medico: string
  status: 'Realizada' | 'Cancelada' | 'Reagendada'
}

interface HistoricoExame {
  data: string
  exame: string
  status: 'Realizada' | 'Cancelado' | 'Reagendada'
}

interface Utente {
  id: number
  nome: string
  numeroIdentificador: string
  nomeEntidade: string
  numeroEntidade: string
  historicoConsultas: HistoricoConsulta[]
  historicoExames: HistoricoExame[]
}


export const utentes: Utente[] = [
  {
    id: 1,
    nome: "João Pedro Silva",
    numeroIdentificador: "123456",
    nomeEntidade: "ACMS Seguros",
    numeroEntidade: "SEG789456",
    historicoConsultas: [
      {
        data: '01/11/2025',
        especialidade: 'Cardiologia',
        medico: 'Dr. João Silva',
        status: 'Realizada'
      },
      {
        data: '30/09/2025',
        especialidade: 'Dermatologia',
        medico: 'Dra. Carla Oliveira',
        status: 'Cancelada'
      },
      {
        data: '12/09/2025',
        especialidade: 'Ortopedia',
        medico: 'Dr. Pedro Almeida',
        status: 'Reagendada'
      }
    ],
    historicoExames: [
      {
        data: '25/10/2025',
        exame: 'Análises Clínicas',
        status: 'Realizada'
      },
      {
        data: '15/08/2025',
        exame: 'Ecografia Abdominal',
        status: 'Reagendada'
      },
      {
        data: '05/07/2025',
        exame: 'Ressonância Magnética',
        status: 'Cancelado'
      }
    ]
  },
  {
    id: 2,
    nome: "Jordan Miguel Pedro",
    numeroIdentificador: "234567",
    nomeEntidade: "ENSA",
    numeroEntidade: "ENSA98765",
    historicoConsultas: [
      {
        data: '15/11/2025',
        especialidade: 'Pediatria',
        medico: 'Dra. Ana Santos',
        status: 'Realizada'
      },
      {
        data: '20/10/2025',
        especialidade: 'Oftalmologia',
        medico: 'Dr. Carlos Mendes',
        status: 'Realizada'
      }
    ],
    historicoExames: [
      {
        data: '18/11/2025',
        exame: 'Hemograma Completo',
        status: 'Realizada'
      },
      {
        data: '10/10/2025',
        exame: 'Teste de Visão',
        status: 'Realizada'
      }
    ]
  },
  {
    id: 3,
    nome: "Maria João Lopes",
    numeroIdentificador: "654321",
    nomeEntidade: "INSS",
    numeroEntidade: "INSS1234",
    historicoConsultas: [
      {
        data: '05/12/2025',
        especialidade: 'Ginecologia',
        medico: 'Dra. Beatriz Costa',
        status: 'Realizada'
      },
      {
        data: '22/11/2025',
        especialidade: 'Clínica Geral',
        medico: 'Dr. Fernando Alves',
        status: 'Reagendada'
      },
      {
        data: '10/10/2025',
        especialidade: 'Nutrição',
        medico: 'Dra. Sandra Martins',
        status: 'Cancelada'
      }
    ],
    historicoExames: [
      {
        data: '28/11/2025',
        exame: 'Mamografia',
        status: 'Realizada'
      },
      {
        data: '15/11/2025',
        exame: 'Papanicolau',
        status: 'Realizada'
      },
      {
        data: '05/10/2025',
        exame: 'Densitometria Óssea',
        status: 'Cancelado'
      }
    ]
  }
]


export default function RCU(){
    const [utente, setUtente] = useState<Utente | null>(null)

    const {
        register: registerBusca,
        formState: { errors: errorsBusca, isSubmitting: isSubmittingBusca },
        handleSubmit: handleSubmitBusca,
    } = useForm<BuscarUtenteData>({
        resolver: zodResolver(buscarUtenteSchema),
        mode: 'onBlur'
    })

    const {
        register: registerEntidade,
        formState: { errors: errorsEntidade, isSubmitting: isSubmittingEntidade },
        handleSubmit: handleSubmitEntidade,
    } = useForm<EntidadeFinanceiraData>({
        resolver: zodResolver(entidadeFinanceiraSchema),
        mode: 'onBlur'
    })

    function normalizeString(str: string) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    }

    async function buscarUtentePorNome(nome: string): Promise<Utente | null> {
        return new Promise((resolve) => {   
            setTimeout(() => {
                const termo = normalizeString(nome)
                const resultado = utentes.find(u => 
                    normalizeString(u.nome).includes(termo) ||
                    u.numeroIdentificador.includes(termo)
                )
                resolve(resultado || null)
            }, 1000)
        })
    }

    async function handleBuscarUtente(data: BuscarUtenteData) {
        try {
            toast.loading('Buscando utente...')
            const utenteEncontrado = await buscarUtentePorNome(data.nome)
            toast.dismiss()
            
            if (!utenteEncontrado) {
                toast.error('Utente não encontrado. Verifique o nome e tente novamente.')
                setUtente(null)
                return
            }
            setUtente(utenteEncontrado)
            toast.success('Utente encontrado com sucesso!')
        } catch (error) {
            toast.dismiss()
            toast.error('Erro ao buscar utente.')
            setUtente(null)
            console.error(error)
        }
    }

    async function handleEntidadeFinanceira(data: EntidadeFinanceiraData) {
        try {
            console.log('Dados validados e sanitizados:', data)
            toast.loading('Atualizando dados administrativos...')
            await new Promise(resolve => setTimeout(resolve, 1000))
            toast.dismiss()
            toast.success('Dados administrativos atualizados com sucesso!')
            
            // Atualizar utente localmente (em produção, viria do backend)
            if (utente) {
                setUtente({
                    ...utente,
                    nomeEntidade: data.nomeEntidade,
                    numeroEntidade: data.numeroEntidade
                })
            }
        } catch (error) {
            toast.dismiss()
            toast.error('Erro ao atualizar dados administrativos.')
            console.error(error)
        }
    }

    return (
        <div>
            <TitleGestao title="Gestão de RCU" p="Consultar e actualizar apenas dados administrativos"/>

            <p className="bg-yellow-50 rounded-md p-2 border border-yellow-300 text-sm mb-4">
                ⚠️<span className="font-semibold"> Restrições:</span> Você pode consultar apenas dados administrativos e não pode alterar informações médicas (diagnósticos, terapêutica, etc.) inseridas pelo pessoal clínico.
            </p>

            <form onSubmit={handleSubmitBusca(handleBuscarUtente)}>
                <div className="space-y-1 my-4">
                    <label htmlFor="nome" className="font-semibold">Buscar Utente por nome *</label>
                    <div className="flex max-w-7xl gap-2">
                        <div className="flex-1">
                            <input 
                                {...registerBusca('nome')}
                                type="text" 
                                id="nome" 
                                placeholder="Digite o nome do utente" 
                                className="w-full h-12 bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                                disabled={isSubmittingBusca}/>
                            {errorsBusca.nome && <p className='text-xs text-red-600 mt-1'>{errorsBusca.nome.message}</p>}
                        </div>
                        <button 
                            disabled={isSubmittingBusca} 
                            type="submit" 
                            className="bg-blue-500 text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            <Search />{isSubmittingBusca ? 'Buscando...' : 'Consultar'}
                        </button>
                    </div>
                </div>
            </form>

            {utente && (
                <div className="border p-4 rounded-md shadow-md space-y-4">
                    <h3 className="font-semibold text-xl my-4">{utente.nome} - Nº {utente.numeroIdentificador}</h3>
                    <div>
                        <p><span className="font-semibold">Entidade Financeira:</span> {utente.nomeEntidade}</p>
                        <p><span className="font-semibold">Nº na Entidade:</span> {utente.numeroEntidade}</p>
                    </div>

                    <form onSubmit={handleSubmitEntidade(handleEntidadeFinanceira)} className="space-y-3 bg-indigo-50 p-4 rounded-md">
                        <h3 className="font-semibold text-lg">Dados Administrativos (Editáveis)</h3>
                        <div className='grid md:grid-cols-2 gap-4 w-full'>
                            <div className="space-y-1 flex flex-col w-full">
                                <label htmlFor="nomeEntidade" className="font-semibold">Entidade Financeira *</label>
                                <input 
                                    {...registerEntidade('nomeEntidade')} 
                                    type="text" 
                                    id="nomeEntidade" 
                                    defaultValue={utente.nomeEntidade}
                                    placeholder="ACMS Seguros" 
                                    className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 outline-blue-500 border"
                                    disabled={isSubmittingEntidade}/>
                                {errorsEntidade.nomeEntidade && <p className='text-xs text-red-600'>{errorsEntidade.nomeEntidade.message}</p>}
                            </div>
                            <div className="space-y-1 flex flex-col w-full">
                                <label htmlFor="numeroEntidade" className="font-semibold">Nº na Entidade *</label>
                                <input 
                                    {...registerEntidade('numeroEntidade')} 
                                    type="text" 
                                    id="numeroEntidade"
                                    defaultValue={utente.numeroEntidade}
                                    placeholder="SEG789456" 
                                    className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 outline-blue-500 border"
                                    disabled={isSubmittingEntidade}/>
                                {errorsEntidade.numeroEntidade && <p className='text-xs text-red-600'>{errorsEntidade.numeroEntidade.message}</p>}
                            </div>
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="observacoes" className="font-semibold">Observações Administrativas</label>
                            <textarea 
                                {...registerEntidade('observacoes')}
                                id="observacoes"
                                rows={3} 
                                className="max-w-full border bg-zinc-50 rounded-lg pl-4 pt-2 outline-blue-500 border" 
                                placeholder="Notas administrativas sobre o utente"
                                disabled={isSubmittingEntidade}/>
                            {errorsEntidade.observacoes && <p className='text-xs text-red-600'>{errorsEntidade.observacoes.message}</p>}
                        </div>
                        <button 
                            type="submit"
                            disabled={isSubmittingEntidade}
                            className="bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed w-full h-12 rounded-xl font-semibold transition">
                            {isSubmittingEntidade ? 'Atualizando...' : 'Atualizar Apenas Dados Administrativos'}
                        </button>
                    </form>

                    <div className="space-y-3 bg-zinc-50 p-4 rounded-md">
                        <h3 className="font-semibold text-lg">Histórico de Consultas (Apenas Leitura)</h3>
                        {utente.historicoConsultas.length === 0 ? (
                            <p className="text-gray-500">Nenhuma consulta registrada.</p>
                        ) : (
                            utente.historicoConsultas.map((item, index) => (
                                <div key={index} className="border p-4 rounded-md bg-white">
                                    <p className="font-semibold">{item.data} - {item.especialidade}</p>
                                    <div className="text-zinc-700">
                                        <p>Médico: <span className="font-semibold">{item.medico}</span></p>
                                        <p className="flex items-center gap-2">Status: 
                                            {item.status === 'Cancelada' && (
                                                <span className="text-red-500 font-semibold">🔴 Cancelada</span>
                                            )}
                                            {item.status === 'Reagendada' && (
                                                <span className="text-yellow-500 font-semibold">🟡 Reagendada</span>
                                            )}
                                            {item.status === 'Realizada' && (
                                                <span className="text-green-500 font-semibold flex items-center gap-2">🟢 Realizada <FiCheck /></span>
                                            )}
                                        </p>
                                        <p className="text-red-500 text-sm">🔒 Diagnóstico e terapêutica: Acesso restrito ao pessoal clínico</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="space-y-3 bg-zinc-50 p-4 rounded-md">
                        <h3 className="font-semibold text-lg">Histórico de Exames (Apenas Leitura)</h3>
                        {utente.historicoExames.length === 0 ? (
                            <p className="text-gray-500">Nenhum exame registrado.</p>
                        ) : (
                            utente.historicoExames.map((item, index) => (
                                <div key={index} className="border p-4 rounded-md bg-white">
                                    <p className="font-semibold">{item.data} - {item.exame}</p>
                                    <div className="text-zinc-700">
                                        <p className="flex items-center gap-2">Status: 
                                            {item.status === 'Cancelado' && (
                                                <span className="text-red-500 font-semibold">🔴 Cancelado</span>
                                            )}
                                            {item.status === 'Reagendada' && (
                                                <span className="text-yellow-500 font-semibold">🟡 Reagendada</span>
                                            )}
                                            {item.status === 'Realizada' && (
                                                <span className="text-green-500 font-semibold flex items-center gap-2">🟢 Realizada <FiCheck /></span>
                                            )}
                                        </p>
                                        <p className="text-red-500 text-sm">🔒 Resultados: Acesso restrito ao pessoal clínico</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}