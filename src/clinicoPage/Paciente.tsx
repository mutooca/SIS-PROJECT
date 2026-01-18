import { Search, Send } from "lucide-react";
import TitleGestao from "../components/TitleGestao";
import { useState } from "react";
import toast from "react-hot-toast";
import z from "zod";

type Utente = {
  id: number
  nome: string
  email: string
  numeroUtilizador: string
  dataNascimento: string
  genero: string
  morada: string
  telefone: string
}
type HistoricoFamiliar = {
    id: number
    utenteId: number
    parentesco: 'pai' | 'mae' | 'avo' | 'irmao'
    descricao: string
}
type Alergia = {
    id: number
    utenteId: number
    nome: string
}
type Vacina = {
    id: number 
    utenteId: number
    descricao: string
    lote: string
}
type HistoricoClinico = {
  id: number
  utenteId: number
  data: string
  especialidade: string
  diagnostico: string
  terapeutica?: string
  medico: string
}
export interface Prescricao {
    id: number
    utenteId: number
    exame: string
    justificacao: string
    dataPrescricao: string
}
export interface ResultadoExame {
    id: number
    utenteId: number
    exame: string
    resultados: 'Disponível' | 'Em análise' | 'Indisponível'
    dataRealizacao: string
}
type UtenteDetalhado = Utente & {
    historicoFamiliar: HistoricoFamiliar[]
    alergias: Alergia[]
    vacinas: Vacina[]
    historicoClinico: HistoricoClinico[]
    prescricoes?: Prescricao[]
    resultadosExames?: ResultadoExame[]
}
const sanitize = (val: string) =>
  val.trim().replace(/\s+/g, ' ')

export const buscarUtenteSchema = z.object({
  nome: z.string().max(60, 'O nome é demasiado longo').min(3, 'O nome deve ter no mínimo 3 caracteres').transform(sanitize)
  .refine((val) => /^[a-zA-ZÀ-ÿ\s]+$/.test(val), 'O nome só pode conter letras e espaços'),
})

export const prescricaoSchema = z.object({
  exame: z.string().min(1, 'Seleccione um exame').transform(sanitize),

  justificacao: z.string().min(10, 'A justificação deve ter no mínimo 10 caracteres')
    .max(300, 'A justificação não pode ultrapassar 300 caracteres').transform(sanitize)
    .refine((val) => /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;:()\-]+$/.test(val), 'A justificação contém caracteres inválidos'),
})

const exames = [
    'Radiografia',
    'Análises Clínicas',
    'Ecografia',
    'Tomografia',
    'Electrocardiograma',
    'Ressonância Magnética',
    'Endoscopia',
    'Colonoscopia',
    'Mamografia',
    'Densitometria Óssea'
]

const utenteDetalhado: UtenteDetalhado[] = [
    {
         id: 1,
  nome: 'João Pedro Silva',
  email: 'joaopedro@gmail.com',
  numeroUtilizador: '123456',
  dataNascimento: '1985-05-15',
  genero: 'Masculino',
  morada: 'Camama, Luanda',
  telefone: '+244 912345678',
  historicoFamiliar: [
    { id: 1, utenteId: 1, parentesco: 'pai', descricao: 'Diabetes tipo 2' },
    { id: 2, utenteId: 1, parentesco: 'mae', descricao: 'Hipertensão arterial' },
  ],
  alergias: [
    { id: 1, utenteId: 1, nome: 'Penicilina' },
    { id: 2, utenteId: 1, nome: 'Ibuprofeno' },
  ],
  vacinas: [
    { id: 1, utenteId: 1, descricao: 'Tétano', lote: 'AB1234' },
    { id: 2, utenteId: 1, descricao: 'Hepatite B', lote: 'CD5678' },
  ],
  historicoClinico: [
    {
      id: 1,
      utenteId: 1,
      data: '2025-11-01',
      especialidade: 'Cardiologia',
      diagnostico: 'Pressão arterial elevada',
      terapeutica: 'Losartana 50mg',
      medico: 'Dr. João Silva',
    },
  ],
  prescricoes: [
    {
        id: 1,
        utenteId: 1,
        exame: 'Electrocardiograma',
        justificacao: 'Avaliação de sintomas cardíacos recorrentes.',
        dataPrescricao: '2025-11-05',
    },
    {
        id: 2,
        utenteId: 1,
        exame: 'Análises Clínicas',
        justificacao: 'Monitorização dos níveis de glicose no sangue.',
        dataPrescricao: '2025-10-20',
    }
  ],
    resultadosExames: [
        {
            id: 1,
            utenteId: 1,
            exame: 'Análises Clínicas',
            resultados: 'Disponível',
            dataRealizacao: '2025-10-25',
        },
        {
            id: 2,
            utenteId: 1,
            exame: 'Radiografia',
            resultados: 'Em análise',
            dataRealizacao: '2025-11-02',
        }
    ]
    },
    {
    id: 2,
    nome: 'Maria Santos',
    email: 'maria.santos@gmail.com',
    numeroUtilizador: '654321',
    dataNascimento: '1990-08-22',
    genero: 'Feminino',
    morada: 'Viana, Luanda',
    telefone: '+244 923456789',
    historicoFamiliar: [
        { id: 3, utenteId: 2, parentesco: 'avo', descricao: 'Doença cardíaca' },
        { id: 4, utenteId: 2, parentesco: 'irmao', descricao: 'Asma' },
    ],
    alergias: [
        { id: 3, utenteId: 2, nome: 'Lactose' },
        { id: 4, utenteId: 2, nome: 'Glúten' },
        { id: 5, utenteId: 2, nome: 'Ácaros' },
    ],
    vacinas: [
        { id: 3, utenteId: 2, descricao: 'Gripe', lote: 'EF9012' },
        { id: 4, utenteId: 2, descricao: 'COVID-19', lote: 'GH3456' },
    ],
    historicoClinico: [
        {
            id: 2,
            utenteId: 2,
            data: '2025-10-15',
            especialidade: 'Pediatria',
            diagnostico: 'Infecção respiratória',
            terapeutica: 'Amoxicilina 500mg',
            medico: 'Dra. Maria Lopes',
        },
        {
            id: 3,
            utenteId: 2,
            data: '2025-09-10',
            especialidade: 'Dermatologia',
            diagnostico: 'Eczema',
            terapeutica: 'Cremes tópicos e hidratação',
            medico: 'Dr. Carlos Mendes',
        }
    ],
    }
]

export default function Paciente(){

    
        const [nomeBusca, setNomeBusca] = useState("")
        const [utente, setUtente] = useState<UtenteDetalhado | null>(null)
        const [exameSelecionado, setExameSelecionado] = useState('')
        const [justificacao, setJustificacao] = useState('')

    
        function normalizeString(str: string) {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        }
    
        async function buscarUtentePorNome(nome: string): Promise<UtenteDetalhado | null> {
            return new Promise(resolve => {
                setTimeout(() => {
                    const termo = normalizeString(nome)
                    const resultado = utenteDetalhado.find(utente =>
                        normalizeString(utente.nome).includes(termo) ||
                        utente.numeroUtilizador.includes(termo)
                    )
                    resolve(resultado ?? null)
                }, 1000)
            })
        }
        async function handleBuscarUtente(event: React.FormEvent) {
            event.preventDefault()

            const result = buscarUtenteSchema.safeParse({
                nome: nomeBusca,
            })

            if (!result.success) {
                toast.error(result.error.issues[0].message)
                return
            }
            toast.loading('A procurar utente...')

            const utenteEncontrado = await buscarUtentePorNome(result.data.nome)

            toast.dismiss()

            if (!utenteEncontrado) {
                toast.error('Utente não encontrado')
                setUtente(null)
                return
            }
            setUtente(utenteEncontrado)
            toast.success('Utente encontrado com sucesso!')
        }

        const [rolePaciente, setRolePaciente] = useState<'dadoUtente' | 'historico'| 'prescricao'>('dadoUtente')
    
        const handleSubmitRolePaciente = ( value : 'dadoUtente' | 'historico' | 'prescricao') => {
            setRolePaciente(value)
        }

    function calcularIdade(dataISO: string) {
        const nascimento = new Date(dataISO)
        const hoje = new Date()

        let idade = hoje.getFullYear() - nascimento.getFullYear()
        const m = hoje.getMonth() - nascimento.getMonth()

        if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--
        }

        return idade
    }

    function handlePrescreverExame() {
        const result = prescricaoSchema.safeParse({
            exame: exameSelecionado,
            justificacao,
        })

        if (!result.success) {
            toast.error(result.error.issues[0].message)
            return
        }
        toast.loading('A enviar prescrição...')

        setTimeout(() => {
            toast.dismiss()
            toast.success('Exame prescrito e enviado para o RCU do utente.')
            setExameSelecionado('')
            setJustificacao('')
        }, 1200)
    }

    return (
        <div>
            <TitleGestao title="Gestão de RCU" p="Consulte e actualize registos clínicos (dados não pessoais)"/>
            <form action="" onSubmit={handleBuscarUtente}>
                <div className="space-y-1 my-4">
                    <label htmlFor="name" className="font-semibold">Buscar Utente por nome</label>
                    <div className="flex max-w-7xl gap-2">
                        <input value={nomeBusca} onChange={e => setNomeBusca(e.target.value)} type="text" name="nome" id="nome" placeholder="Digite o nome do utente" className="w-full h-12 bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        <button type="submit" className="bg-blue-500 text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2" >
                        <Search />Consultar</button>
                    </div>
                </div>
            </form>
            {
                utente &&  (
                    <div>
                
                <h3 className="font-semibold text-xl my-4">{utente.nome} - Nº {utente.numeroUtilizador}</h3>
                    
                <div className="grid grid-cols-3 gap-2 bg-indigo-50 py-1 px-2 rounded-lg my-4">
                    <button onClick={() => handleSubmitRolePaciente('dadoUtente')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${rolePaciente === 'dadoUtente' ? 'bg-gray-50' : ''}`}>Dados do Utente</button>
                    <button onClick={() => handleSubmitRolePaciente('historico')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${rolePaciente === 'historico' ? 'bg-gray-50' : ''}`}>Histórico</button>
                    <button onClick={() => handleSubmitRolePaciente('prescricao')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${rolePaciente === 'prescricao' ? 'bg-gray-50' : ''}`}>Prescrição</button>
                </div>

            {
                rolePaciente === 'dadoUtente' && (
                    <div className="border p-4 rounded-md shadow-md space-y-4">
                        
                        <div className=" space-y-3 bg-indigo-200  p-4 rounded-md">
                            <h3 className="font-semibold text-lg">Informações do Utente (Preenchidas pelo Utente)</h3>
                            <div className='space-y-3 w-full'>
                                <div className="border rounded-lg p-4 bg-zinc-50 shadow-sm">
                                    <div className="grid sm:grid-cols-3 gap-4 ">
                                        <div>
                                            <span className="font-semibold">Data de Nascimento:</span>
                                            <p>{utente.dataNascimento} ({calcularIdade(utente.dataNascimento)} anos)</p>
                                        </div>

                                        <div>
                                            <span className="font-semibold">Género:</span>
                                            <p>{utente.genero}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold">Contacto:</span>
                                            <p>{utente.telefone}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1 flex flex-col w-full">
                                    <h3 className="font-semibold text-blue-800">Histórico Familiar</h3>
                                    <ul className="space-y-1">
                                    {utente.historicoFamiliar.map(item => (
                                        <li key={item.id} className="bg-zinc-50 p-2 rounded">
                                        <strong>{item.parentesco}:</strong> {item.descricao}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                <div className="space-y-1 flex flex-col w-full">
                                    
                                    <h3 className="font-semibold text-blue-800">Alergias Conhecidas:</h3>
                                    <div className="flex flex-wrap gap-2">
                                    {utente.alergias.map(alergia => (
                                        <span
                                        key={alergia.id}
                                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold"
                                        >
                                        {alergia.nome}
                                        </span>
                                    ))}
                                    </div>

                                </div>
                                <div className="space-y-1 flex gap-2 items-center w-full">
                                    <div className="space-y-1">
                                        <h3 className="font-semibold text-blue-800">Cartão de Vacina</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {utente.vacinas.map(vacina => (
                                            <span
                                                key={vacina.id}
                                                className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                                                {vacina.descricao} (Lote: {vacina.lote})
                                            </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                rolePaciente === 'historico' && (
                    <div className=" p-2 rounded-md shadow-md">
                        <div className="p-2 rounded-md">
                            {utente.historicoClinico.map(registo => (
                            <div key={registo.id} className="border p-4 rounded-lg shadow-sm my-2 bg-zinc-50">
                                <h3 className="font-semibold">{registo.data} - {registo.especialidade}</h3>
                                <p><strong>Diagnóstico:</strong> {registo.diagnostico}</p>
                                <p><strong>Terapêutica:</strong> {registo.terapeutica}</p>
                                <p className="text-zinc-500">Médico: {registo.medico}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                )
            }
                        
            {
                rolePaciente === 'prescricao' && (
                    <div className=" p-2 rounded-md shadow-md">
                        
                        
                        <div>
                            <select value={exameSelecionado} onChange={e => setExameSelecionado(e.target.value)} className="border rounded-lg p-2 outline-none bg-zinc-100 w-full" >
                                <option value="">Seleccione um exame</option>
                                {
                                    exames.map((exame, index) => (
                                        <option key={index} value={exame}>{exame}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="name" className="font-semibold">Justificação</label>
                            <textarea rows={3} value={justificacao} onChange={e => setJustificacao(e.target.value)} placeholder="Motivo da prescrição do exame" name="especialidade" id="especialidade" className="max-w-full border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        </div>

                        <div className="flex max-w-full items-center my-4 gap-2">
                            <button type="button" onClick={handlePrescreverExame} className="bg-blue-500 text-white w-full h-10 rounded-xl" > Prescrever exame </button>
                            <button className="text-blue-500 border-2 border-blue-500 transition py-2 min-w-64 justify-center rounded-lg text-center font-semibold flex items-center gap-2" >
                                    <Send />Enviar para RCU do Utente</button>

                        </div>

                        <div className="space-y-3">
                            <div className=" space-y-3 bg-zinc-50 p-4 rounded-md ">
                                <h3 className="font-semibold">Prescrições Ativas</h3>
                                {
                                    utente.prescricoes?.map(prescricao => (
                                        <div key={prescricao.id} className=" p-4 rounded-md bg-zinc-100 mb-2">
                                            <p className="font-semibold">{prescricao.exame}</p>
                                            <div className="text-zinc-700">
                                                <p>Prescrito em: {prescricao.dataPrescricao}</p>
                                                <p className="font-normal"><span className="font-semibold">Justificação:</span> {prescricao.justificacao}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            
                            <div className=" space-y-3 bg-zinc-50  p-4 rounded-md">
                                <h3 className="font-semibold">Resultados de Exames</h3>
                                {
                                    utente.resultadosExames?.map(resultado => (
                                        <div key={resultado.id} className=" p-4 rounded-md bg-zinc-100 mb-2">
                                            <p className="font-semibold">{resultado.exame}</p>
                                            <div className="text-zinc-700">
                                                <p>Realizado em: {resultado.dataRealizacao}</p>
                                                <p className="font-normal"><span className="font-semibold">Resultados:{ 
                                                resultado.resultados === 'Disponível' ? (<span className="text-green-600"> Disponível</span>
                                                ) : resultado.resultados === 'Em análise' ? (
                                                    <span className="text-yellow-600"> Em análise</span>
                                                ) : (
                                                    <span className="text-red-600"> Indisponível</span>
                                                )
                                                    } </span></p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                                        
                    </div>
                )
            }    
            </div>
                )
            }
            
        </div>
    )
}