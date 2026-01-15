import { Search, Send } from "lucide-react";
import TitleGestao from "../components/TitleGestao";
import { useState } from "react";
import toast from "react-hot-toast";

type Utente = {
  nome: string
  email: string
  numeroUtilizador: string
  dataNascimento: string
  genero: string
  morada: string
  telefone: string
  historico: string
  alergias: string
  cartao_vacina: string
}

const utentes: Utente [] = [
    { 
    nome: 'João Pedro Silva',
    email: 'joaopedro@gmail.com', 
    numeroUtilizador: '123456', 
    dataNascimento: '15/05/1985', 
    genero: 'Masculino', 
    morada: 'camama, Luanda', 
    telefone: '+244 912345678',
    historico: 'Pai com diabetes tipo 2, mãe com hipertensão arterial. Avô paterno faleceu de AVC.', 
    alergias: 'Penicilina, Ibuprofeno', 
    cartao_vacina: 'Penicilina, Ibuprofeno'
},
{
    nome: 'Maria Santos',
    email: 'mariasantos@gmail.com', 
    numeroUtilizador: '654321', 
    dataNascimento: '22/08/1990',
    genero: 'Feminino', 
    morada: 'Viana, Luanda', 
    telefone: '+244 923456789',
    historico: 'Nenhum histórico médico relevante.', 
    alergias: 'Nenhuma alergia conhecida.', 
    cartao_vacina: 'Tétano, Hepatite B'

},
{
    nome: 'Rui Fernandes',
    email: 'rui.fernandes@gmail.com',
    numeroUtilizador: '112233',
    dataNascimento: '05/12/1978',
    genero: 'Masculino',
    morada: 'Talatona, Luanda',
    telefone: '+244 934567890',
    historico: 'Hipertensão controlada com medicação.',
    alergias: 'Aspirina',
    cartao_vacina: 'Gripe, Pneumocócica'
}
   
]

export default function Paciente(){

    
        const [nomeBusca, setNomeBusca] = useState("")
        const [utente, setUtente] = useState<Utente | null>(null)
    
        function normalizeString(str: string) {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        }
    
        async function buscarUtentePorNome(nome: string) {
            return new Promise<typeof utentes[number] | null>((resolve) => {
                setTimeout(() => {
                const termo = normalizeString(nome)
                const resultado = utentes.find(u =>
                    normalizeString(u.nome).includes(termo)
                )
                resolve(resultado ?? null)
                }, 1000)
            })
        }

    
        async function handleBuscarUtente(event: React.FormEvent){
            event.preventDefault()
            if(!nomeBusca.trim()) {
                toast.error('Por favor, insira um nome para buscar o utente.') 
                return
            }
            const utenteEncontrado = await buscarUtentePorNome(nomeBusca)

            if (!utenteEncontrado) {
            toast.dismiss()
            toast.error('Utente não encontrado')
            setUtente(null)
            return
            }

            setUtente(utenteEncontrado)
            toast.dismiss()
            toast.success('Utente encontrado com sucesso!')
    
        }
    
    
        const [rolePaciente, setRolePaciente] = useState<'dadoUtente' | 'historico'| 'prescricao'>('dadoUtente')
    
        const handleSubmitRolePaciente = ( value : 'dadoUtente' | 'historico' | 'prescricao') => {
            setRolePaciente(value)
        }


        function calcularIdade(dataNascimento: string) {
            const [dia, mes, ano] = dataNascimento.split('/').map(Number)
            const nascimento = new Date(ano, mes - 1, dia)
            const hoje = new Date()

            let idade = hoje.getFullYear() - nascimento.getFullYear()
            const m = hoje.getMonth() - nascimento.getMonth()

            if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
                idade--
            }

            return idade
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
                                    <h3 className="font-semibold text-blue-800">Histórico Familiar:</h3>
                                    <p className="text-blue-800 bg-zinc-50 max-w-full p-1 rounded-md">{utente.historico}</p>
                                </div>
                                <div className="space-y-1 flex flex-col w-full">
                                    <h3 className="font-semibold text-blue-800">Alergias Conhecidas:</h3>
                                    <p className="text-blue-800 bg-zinc-50 max-w-full p-1 rounded-md">{utente.alergias}</p>
                                </div>
                                <div className="space-y-1 flex gap-2 items-center w-full">
                                    <h3 className="font-semibold text-blue-800">Cartão de Vacina:</h3>
                                    <p className="text-yellow-800 bg-yellow-50 font-semibold p-1 rounded-full">{utente.cartao_vacina}</p>
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
                            <div className=" p-2 rounded-md">
                                <div className="border shadow p-4 rounded-lg">
                                    <h3 className="font-semibold pb-2 text-lg">01/11/2025 - Cardiologia</h3>
                                    <p className="font-normal"><span className="font-semibold">Diagnóstico:</span> Pressão arterial elevada</p>
                                    <p className="font-normal"><span className="font-semibold">Terapêutica:</span> Losartana 50mg 1x/dia</p>
                                    <p className="font-normal"><span className="font-semibold">Procedimentos:</span> Medição de pressão arterial</p>
                                    <p className="text-zinc-500">Médico: Dr. João Silva</p>
                                </div>
                            </div>
                            <div className=" p-2 rounded-md">
                                <div className="border shadow p-4 rounded-lg">
                                    <h3 className="font-semibold pb-2 text-lg">15/10/2025 - Cardiologia</h3>
                                    <p className="font-normal"><span className="font-semibold">Diagnóstico:</span> Primeira consulta - avaliação geral</p>
                                    <p className="font-normal"><span className="font-semibold">Observações:</span> Paciente apresenta histórico familiar de hipertensão</p>
                                    <p className="text-zinc-500">Médico: Dr. João Silva</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                )
            }
                        
            {
                rolePaciente === 'prescricao' && (
                    <div className=" p-2 rounded-md shadow-md">
                        <div>
                            <select name="" id="" className="border rounded-lg p-2 outline-none bg-zinc-100 w-full" >
                                <option value="" disabled >Seleccione um exame</option>
                                <option value="">Radiografia</option>
                                <option value="">Análises Clinicas</option>
                                <option value="">Ecografia</option>
                                <option value="">Tomografia</option>
                                <option value="">Electrocardiograma</option>
                            </select>
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="name" className="font-semibold">Justificação</label>
                            <input type="text" placeholder="Motivo da prescrição do exame" name="especialidade" id="especialidade" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        </div>

                        <div className="flex max-w-full items-center my-4 gap-2">
                            <button type="submit" className="bg-blue-500 text-white hover:bg-blue-400 w-full h-10 rounded-xl">Prescrever exame</button>
                            <button className="text-blue-500 border-2 border-blue-500 transition py-2 min-w-64 justify-center rounded-lg text-center font-semibold flex items-center gap-2" >
                                    <Send />Enviar para RCU do Utente</button>

                        </div>

                        <div className="space-y-3">
                            <div className=" space-y-3 bg-zinc-50 p-4 rounded-md ">
                                <h3 className="font-semibold">Prescrições Ativas</h3>
                                <div className=" p-4 rounded-md bg-zinc-100">
                                    <p className="font-semibold">Radiografia - Tórax</p>
                                    <div className="text-zinc-700">
                                        <p>Prescrito em: 01/11/2025</p>
                                        <p>Status: Aguardando marcação</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className=" space-y-3 bg-zinc-50  p-4 rounded-md">
                                <h3 className="font-semibold">Resultados de Exames</h3>
                                <div className=" p-4 rounded-md bg-zinc-100">
                                    <p className="font-semibold">Análises Clínicas</p>
                                    <div className="text-zinc-700">
                                        <p>Realizado em: 25/10/2025</p>
                                        <p className="font-normal"><span className="font-semibold">Resultados:</span> Valores dentro da normalidade</p>

                                    </div>
                                </div>
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