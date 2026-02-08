import { useState } from "react"
import TitleGestao from "../components/TitleGestao"
import { FiX } from "react-icons/fi"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"

// ==================== FUNÇÕES DE SANITIZAÇÃO ====================

const sanitizeText = (value: string) => {
  if (!value) return '';
  return value.trim().replace(/\s+/g, ' ').replace(/[<>'"]/g, '').slice(0, 500);
}

const sanitizeTime = (value: string) => {
  if (!value) return '';
  return value.replace(/[^\d:]/g, '').slice(0, 5);
}

// ==================== INTERFACES ====================

interface Consulta {
    nome: string
    numeroUtilizador: string
    especialidade: string
    medico: string
    data: string
    hora: string
    contacto: string
}

interface Exame {
    nome: string
    numeroUtilizador: string
    exame: string
    data: string
    hora: string
    contacto: string
    medico: string
    especialidade: string
}

// ==================== DADOS MOCK ====================

const consulta: Consulta[] = [
    {
        nome: 'João Pedro Silva', 
        numeroUtilizador: '123456', 
        especialidade: 'Cardiologia', 
        medico: 'Dr. João Silva', 
        data: '15/12/2025', 
        hora: '10:00', 
        contacto: '923456789'
    },
    {
        nome: 'Ana Costa', 
        numeroUtilizador: '789012', 
        especialidade: 'Pediatria', 
        medico: 'Dra. Maria Santos', 
        data: '15/12/2025', 
        hora: '14:30', 
        contacto: '924567890'
    },
    {
        nome: 'Rui Fernandes', 
        numeroUtilizador: '234567', 
        especialidade: 'Dermatologia', 
        medico: 'Dra. Carla Oliveira', 
        data: '16/12/2025', 
        hora: '09:15', 
        contacto: '928901234'
    }
]

const exame: Exame[] = [
    {
        nome: 'Carlos Mendes', 
        numeroUtilizador: '345678', 
        exame: 'Análise de Sangue', 
        data: '16/12/2025', 
        hora: '09:00', 
        contacto: '925678901', 
        medico: 'Dr. Pedro Almeida', 
        especialidade: 'Hematologia'
    },
    {
        nome: 'Sofia Ribeiro', 
        numeroUtilizador: '901234', 
        exame: 'Ecografia Abdominal', 
        data: '16/12/2025', 
        hora: '11:15', 
        contacto: '926789012', 
        medico: 'Dra. Ana Costa', 
        especialidade: 'Radiologia'          
    },
    {
        nome: 'Miguel Oliveira', 
        numeroUtilizador: '567890', 
        exame: 'Ressonância Magnética', 
        data: '16/12/2025', 
        hora: '13:45', 
        contacto: '927890123', 
        medico: 'Dr. Rui Fernandes', 
        especialidade: 'Radiologia'
    }
]

// ==================== SCHEMA DE VALIDAÇÃO ====================

const reagendarSchema = z.object({
    novaData: z.string()
        .min(1, 'A data é obrigatória')
        .refine(date => !isNaN(Date.parse(date)), 'Data inválida')
        .refine(date => {
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return selectedDate >= today;
        }, 'A data não pode ser no passado'),
    
    novaHora: z.string()
        .min(1, 'A hora é obrigatória')
        .transform(sanitizeTime)
        .pipe(
            z.string()
                .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Hora inválida (formato HH:mm)')
                .refine(hora => {
                    const [hours] = hora.split(':').map(Number);
                    return hours >= 6 && hours <= 22;
                }, 'O horário deve estar entre 06:00 e 22:00')
        ),
    
    motivoReagendamento: z.string()
        .min(1, 'O motivo é obrigatório')
        .transform(sanitizeText)
        .refine(val => val.length > 0, 'O motivo não pode estar vazio')
        .pipe(
            z.string()
                .min(10, 'O motivo deve ter no mínimo 10 caracteres')
                .max(500, 'O motivo não pode ultrapassar 500 caracteres')
                .regex(/^[A-Za-zÀ-ÿ0-9\s.,;:()\-]+$/, 'O motivo contém caracteres inválidos')
        )
})

type ReagendarData = z.infer<typeof reagendarSchema>

// ==================== COMPONENTE ====================

export default function Marcacao(){
    const [roleMarcacao, setRoleMarcacao] = useState<'consulta' | 'exame'>('consulta')
    const [consultaSelecionada, setConsultaSelecionada] = useState<Consulta | null>(null)
    const [exameSelecionado, setExameSelecionado] = useState<Exame | null>(null)

    const {
        register, 
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<ReagendarData>({
        resolver: zodResolver(reagendarSchema),
        mode: 'onBlur'
    })

    const handleSubmitRoleMarcacao = (value: 'consulta' | 'exame') => {
        setRoleMarcacao(value)
    }

    async function handleReagendar(data: ReagendarData) {
        try {
            console.log('Dados validados e sanitizados:', data)
            toast.loading('Reagendando...')
            await new Promise(resolve => setTimeout(resolve, 1500))
            toast.dismiss()
            
            if (consultaSelecionada) {
                toast.success(`Consulta de ${consultaSelecionada.nome} reagendada com sucesso!`)
                setConsultaSelecionada(null)
            } else if (exameSelecionado) {
                toast.success(`Exame de ${exameSelecionado.nome} reagendado com sucesso!`)
                setExameSelecionado(null)
            }
            reset()
        } catch (error) {
            toast.dismiss()
            toast.error('Erro ao reagendar. Tente novamente.')
            console.error(error)
        }
    }

    async function handleCancelar(tipo: 'consulta' | 'exame', nome: string) {
        const confirmacao = window.confirm(`Tem certeza que deseja cancelar ${tipo === 'consulta' ? 'a consulta' : 'o exame'} de ${nome}?`)
        
        if (confirmacao) {
            try {
                toast.loading('Cancelando...')
                await new Promise(resolve => setTimeout(resolve, 1000))
                toast.dismiss()
                toast.success(`${tipo === 'consulta' ? 'Consulta' : 'Exame'} cancelado(a) com sucesso!`)
            } catch (error) {
                toast.dismiss()
                toast.error('Erro ao cancelar.')
                console.error(error)
            }
        }
    }

    return (
        <div>
            <TitleGestao title="Gestão de Marcações" p="Gerir marcações de consultas e exames"/>
    
            <div className="grid grid-cols-2 gap-2 bg-indigo-50 py-1 px-2 rounded-lg my-4">
                <button 
                    onClick={() => handleSubmitRoleMarcacao('consulta')} 
                    className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center flex items-center gap-2 ${roleMarcacao === 'consulta' ? 'bg-gray-50' : ''}`}>
                    Consultas
                </button>
                <button 
                    onClick={() => handleSubmitRoleMarcacao('exame')} 
                    className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center flex items-center gap-2 ${roleMarcacao === 'exame' ? 'bg-gray-50' : ''}`}>
                    Exames
                </button>
            </div>

            {roleMarcacao === 'consulta' && (
                <div className="space-y-4">
                    {consulta.map((item, index) => (
                        <div key={index} className="space-y-3 border rounded-xl shadow py-4 px-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-semibold text-lg">{item.nome} - Nº {item.numeroUtilizador}</h2>
                                    <div className="text-zinc-700">
                                        <p>{item.especialidade} - {item.medico}</p>
                                        <p>{item.data} às {item.hora}</p>
                                        <p><span className="font-semibold">Contacto:</span> {item.contacto}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-2 flex-wrap">
                                    <button 
                                        onClick={() => setConsultaSelecionada(item)} 
                                        className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400">
                                        Reagendar
                                    </button>
                                    <button 
                                        onClick={() => handleCancelar('consulta', item.nome)}
                                        className="hover:bg-red-600 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 bg-red-500 text-white border-2 border-red-500">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {roleMarcacao === 'exame' && (
                <div className="space-y-4">
                    {exame.map((item, index) => (
                        <div key={index} className="space-y-3 border rounded-xl shadow py-4 px-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-semibold text-lg">{item.nome} - Nº {item.numeroUtilizador}</h2>
                                    <div className="text-zinc-700">
                                        <p>{item.exame} - {item.medico}</p>
                                        <p>{item.data} às {item.hora}</p>
                                        <p className="text-yellow-500 text-sm">⚠️ Requer prescrição médica</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-2 flex-wrap">
                                    <button 
                                        onClick={() => setExameSelecionado(item)} 
                                        className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400">
                                        Reagendar
                                    </button>
                                    <button 
                                        onClick={() => handleCancelar('exame', item.nome)}
                                        className="hover:bg-red-600 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 bg-red-500 text-white border-2 border-red-500">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de Reagendar Consulta */}
            {consultaSelecionada && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-50 rounded-lg p-6 w-full max-w-2xl mx-4">
                        <form onSubmit={handleSubmit(handleReagendar)} className="space-y-4">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-2xl font-semibold">Reagendar Consulta</h2>
                                    <p className="text-sm text-zinc-600 mt-1 mb-2">
                                        Informe a nova data, hora e o motivo do reagendamento da consulta. Após a confirmação, as alterações ficarão registadas.
                                    </p>   
                                    <p className="text-zinc-700">
                                        Paciente: {consultaSelecionada.nome} - Nº {consultaSelecionada.numeroUtilizador} | {consultaSelecionada.especialidade} - {consultaSelecionada.medico}
                                    </p>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => setConsultaSelecionada(null)} 
                                    className="hover:text-red-700 text-gray-600 text-2xl font-bold">
                                    <FiX/>
                                </button>
                            </div> 
                            <div className="grid sm:grid-cols-2 gap-4 w-full">
                                <div className="space-y-1">
                                    <label htmlFor="novaData" className="font-semibold">Nova Data *</label>
                                    <input 
                                        {...register('novaData')} 
                                        type="date" 
                                        id="novaData"
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full h-10 border bg-indigo-50 rounded-lg px-4 outline-blue-500"
                                        disabled={isSubmitting}/>
                                    {errors.novaData && <p className='text-xs text-red-600'>{errors.novaData.message}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="novaHora" className="font-semibold">Nova Hora *</label>
                                    <input 
                                        {...register('novaHora')} 
                                        type="time" 
                                        id="novaHora"
                                        className="w-full h-10 border bg-indigo-50 rounded-lg px-4 outline-blue-500"
                                        disabled={isSubmitting}/>
                                    {errors.novaHora && <p className='text-xs text-red-600'>{errors.novaHora.message}</p>}
                                </div>
                            </div>
                            <div className="space-y-1 flex flex-col w-full">
                                <label htmlFor="motivoReagendamento" className="font-semibold">Motivo do Reagendamento *</label>
                                <textarea 
                                    {...register('motivoReagendamento')} 
                                    rows={3} 
                                    id="motivoReagendamento"
                                    className="max-w-full border bg-zinc-50 rounded-lg pl-4 pt-2 bg-indigo-50 outline-blue-500 border" 
                                    placeholder="Descreva o motivo do reagendamento"
                                    disabled={isSubmitting}/>
                                {errors.motivoReagendamento && <p className='text-xs text-red-600'>{errors.motivoReagendamento.message}</p>}
                            </div>
                            
                            <div className="flex items-center justify-end mt-6 gap-4">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="bg-blue-500 text-white transition py-1 px-5 rounded-lg text-center font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    {isSubmitting ? 'Confirmando...' : 'Confirmar Reagendamento'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setConsultaSelecionada(null)} 
                                    className="transition py-1 px-10 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-100">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Reagendar Exame */}
            {exameSelecionado && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-50 rounded-lg p-6 w-full max-w-2xl mx-4">
                        <form onSubmit={handleSubmit(handleReagendar)} className="space-y-4">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-2xl font-semibold">Reagendar Exame</h2>
                                    <p className="text-sm text-zinc-600 mt-1 mb-2">
                                        Informe a nova data, hora e o motivo do reagendamento do exame. Após a confirmação, as alterações ficarão registadas.
                                    </p>   
                                    <p className="text-zinc-700">
                                        Paciente: {exameSelecionado.nome} - Nº {exameSelecionado.numeroUtilizador} | {exameSelecionado.especialidade} - {exameSelecionado.medico}
                                    </p>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => setExameSelecionado(null)} 
                                    className="hover:text-red-700 text-gray-600 text-2xl font-bold">
                                    <FiX/>
                                </button>
                            </div> 
                            <div className="grid sm:grid-cols-2 gap-4 w-full">
                                <div className="space-y-1">
                                    <label htmlFor="novaDataExame" className="font-semibold">Nova Data *</label>
                                    <input 
                                        {...register('novaData')} 
                                        type="date" 
                                        id="novaDataExame"
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full h-10 border bg-indigo-50 rounded-lg px-4 outline-blue-500"
                                        disabled={isSubmitting}/>
                                    {errors.novaData && <p className='text-xs text-red-600'>{errors.novaData.message}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="novaHoraExame" className="font-semibold">Nova Hora *</label>
                                    <input 
                                        {...register('novaHora')} 
                                        type="time" 
                                        id="novaHoraExame"
                                        className="w-full h-10 border bg-indigo-50 rounded-lg px-4 outline-blue-500"
                                        disabled={isSubmitting}/>
                                    {errors.novaHora && <p className='text-xs text-red-600'>{errors.novaHora.message}</p>}
                                </div>
                            </div>
                            <div className="space-y-1 flex flex-col w-full">
                                <label htmlFor="motivoReagendamentoExame" className="font-semibold">Motivo do Reagendamento *</label>
                                <textarea 
                                    {...register('motivoReagendamento')} 
                                    rows={3} 
                                    id="motivoReagendamentoExame"
                                    className="max-w-full border bg-zinc-50 rounded-lg pl-4 pt-2 bg-indigo-50 outline-blue-500 border" 
                                    placeholder="Descreva o motivo do reagendamento"
                                    disabled={isSubmitting}/>
                                {errors.motivoReagendamento && <p className='text-xs text-red-600'>{errors.motivoReagendamento.message}</p>}
                            </div>
                            
                            <div className="flex items-center justify-end mt-6 gap-4">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="bg-blue-500 text-white transition py-1 px-5 rounded-lg text-center font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    {isSubmitting ? 'Confirmando...' : 'Confirmar Reagendamento'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setExameSelecionado(null)} 
                                    className="transition py-1 px-10 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-100">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}