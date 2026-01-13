import { useState } from "react"
import TitleGestao from "../components/TitleGestao"
import { FiX } from "react-icons/fi"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const consulta = [
    {
        nome: 'João Pedro Silva', numeroUtilizador: '123456', especialidade: 'Cardiologia', medico: 'Dr. João Silva', data: '15/12/2025', hora: '10:00', contacto: '923456789'
    },
    {
        nome: 'Ana Costa', numeroUtilizador: '789012', especialidade: 'Pediatria', medico: 'Dra. Maria Santos', data: '15/12/2025', hora: '14:30', contacto: '924567890'
    },
    {
        nome: 'Rui Fernandes', numeroUtilizador: '234567', especialidade: 'Dermatologia', medico: 'Dra. Carla Oliveira', data: '16/12/2025', hora: '09:15', contacto: '928901234'
    }
]

const exame = [
    {
        nome: 'Carlos Mendes', numeroUtilizador: '345678', exame: 'Análise de Sangue', data: '16/12/2025', hora: '09:00', contacto: '925678901', medico: 'Dr. Pedro Almeida', especialidade: 'Hematologia'
    },
    {
        nome: 'Sofia Ribeiro', numeroUtilizador: '901234', exame: 'Ecografia Abdominal', data: '16/12/2025', hora: '11:15', contacto: '926789012', medico: 'Dra. Ana Costa', especialidade: 'Radiologia'          
    },
    {
        nome: 'Miguel Oliveira', numeroUtilizador: '567890', exame: 'Ressonância Magnética', data: '16/12/2025', hora: '13:45', contacto: '927890123', medico: 'Dr. Rui Fernandes', especialidade: 'Radiologia'
    }
]

const reagendarSchema = z.object({
    novaData: z.string().refine(date => !isNaN (Date.parse(date)), 'Nova Data inválida'),
    novaHora: z.string().refine(hora => !isNaN (Date.parse(`1970-01-01T${hora}:00`)), 'Nova Hora inválida'),
    motivoReagendamento: z.string().min(10, 'O motivo do reagendamento deve ter no mínimo 10 caracteres')
})

type reagendarSchema = z.infer<typeof reagendarSchema>

export default function Marcacao(){

    const [roleMarcacao, setRoleMarcacao] = useState<'consulta' | 'exame'>('consulta')
    const [consultaSelecionada, setConsultaSelecionada] = useState<null | typeof consulta[0]>(null)
    const [exameSelecionado, setExameSelecionado] = useState<null | typeof exame[0]>(null)

    const handleSubmitRoleMarcacao = ( value : 'consulta' | 'exame') => {
        setRoleMarcacao(value)
    }

    const {
        register, handleSubmit,
        formState: { errors}
    } = useForm({
        resolver: zodResolver(reagendarSchema)
    })

    async function handleReagendar(data: reagendarSchema){
        console.log(data)
    }

    return  (
            <div>
                <TitleGestao title="Gestão de Marcações" p="Gerir marcações de consultas e exames"/>
        
                <div className="grid grid-cols-2 gap-2 bg-indigo-50 py-1 px-2 rounded-lg my-4">
                    <button onClick={() => handleSubmitRoleMarcacao('consulta')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${roleMarcacao === 'consulta' ? 'bg-gray-50' : ''}`}>Consultas</button>
                    <button onClick={() => handleSubmitRoleMarcacao('exame')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${roleMarcacao === 'exame' ? 'bg-gray-50' : ''}`}>Exames</button>
                </div>

                {roleMarcacao === 'consulta' && (
                    <div className="space-y-4">

                    {
                        consulta.map((item, index) => (
                             <div key={index} className="space-y-3 border rounded-xl shadow py-4 px-4">
                                <div className="flex items-center justify-between ">
                                    <div>
                                        <h2 className="font-semibold text-lg">{item.nome} - Nº {item.numeroUtilizador}</h2>

                                        <div className="text-zinc-700">
                                            <p>{item.especialidade} - {item.medico}</p>
                                            <p>{item.data} às {item.hora}</p>
                                            <p><span className="font-semibold">Contacto:</span> {item.contacto}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 flex-wrap">
                                        <button onClick={() => setConsultaSelecionada(item)} className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Reagendar</button>
                                        <button className="hover:bg-red-600 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2  bg-red-500 text-white border-2 border-red-500" >Cancelar</button>
                                    </div>
                                    {
                                        consultaSelecionada && (
                                            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                                                <div className="bg-gray-50 rounded-lg p-6 w-full max-w-2xl mx-4">
                                                    <form onSubmit={handleSubmit(handleReagendar)} className="space-y-4">
                                                        <div className="flex items.center justify-between mb-4">
                                                            <div>
                                                                <h2 className="text-2xl font-semibold ">Reagendar Consulta</h2>
                                                                <p className="text-sm text-zinc-600 mt-1 mb-2">Informe a nova data, hora e o motivo do reagendamento da consulta. Após a confirmação, as alterações ficarão registadas.</p>   
                                                                <p className="text-zinc-700">Paciente: {consultaSelecionada.nome} - Nº {consultaSelecionada.numeroUtilizador} | {consultaSelecionada.especialidade} - {consultaSelecionada.medico}</p>
                                                            </div>
                                                            <button onClick={() => setConsultaSelecionada(null)} className="hover:text-red-700 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"><FiX/></button>
                                                        </div> 
                                                        <div className="grid sm:grid-cols-2 gap-4 w-full">
                                                            <div className="space-y-1">
                                                                <label className="font-semibold">Nova Data</label>
                                                                <input {...register('novaData')} type="date" className="w-full h-10 border bg-indigo-50 rounded-lg px-4 outline-blue-500"/>
                                                            { errors.novaData &&  <p className='text-xs text-red-600'>{errors.novaData.message}</p>}
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="font-semibold">Nova Hora</label>
                                                                <input {...register('novaHora')} type="time" className="w-full h-10 border bg-indigo-50 rounded-lg px-4 outline-blue-500"/>
                                                            { errors.novaHora && <p className='text-xs text-red-600'>{errors.novaHora.message}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1 flex flex-col w-full">
                                                            <label htmlFor="descricao" className="font-semibold">Motivo do Reagendamento</label>
                                                            <textarea {...register('motivoReagendamento')} rows={3} name="descricao" id="descricao" className="max-w-full border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" placeholder="Descreva o motivo do reagendamento" />
                                                            { errors.motivoReagendamento && <p className='text-xs text-red-600'>{errors.motivoReagendamento.message}</p>}
                                                        </div>
                                                        
                                                        <div className="flex items-center justify-end mt-6 gap-4">
                                                            <button type="submit" className="bg-blue-500 text-white transition py-1 px-5 rounded-lg text-center font-semibold " >
                                                            Confirmar Reagendamento</button>
                                                            <button type="button" onClick={() => setConsultaSelecionada(null)} className=" transition py-1 px-10 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-100 transition">Cancelar</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                )}
                {roleMarcacao === 'exame' && (
                    <div className="space-y-4">

                    {
                        exame.map((item, index) => (
                            <div key={index} className="space-y-3 border rounded-xl shadow py-4 px-4">
                                <div className="flex items-center justify-between ">
                                    <div>
                                        <h2 className="font-semibold text-lg">{item.nome} - Nº {item.numeroUtilizador}</h2>

                                        <div className="text-zinc-700">
                                            <p>{item.exame} - {item.medico}</p>
                                            <p>{item.data} às {item.hora}</p>
                                            <p className="text-yellow-500 text-sm">⚠️ Requer prescrição médica</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 flex-wrap">
                                        <button onClick={() => setExameSelecionado(item)} className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Reagendar</button>
                                        <button className="hover:bg-red-600 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2  bg-red-500 text-white border-2 border-red-500" >Cancelar</button>
                                    </div>
                                     {
                                        exameSelecionado && (
                                            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                                                <div className="bg-gray-50 rounded-lg p-6 w-full max-w-2xl mx-4">
                                                    <form onSubmit={handleSubmit(handleReagendar)} className="space-y-4">
                                                        <div className="flex items.center justify-between mb-4">
                                                            <div>
                                                                <h2 className="text-2xl font-semibold ">Reagendar Exame</h2>
                                                                <p className="text-sm text-zinc-600 mt-1 mb-2">Informe a nova data, hora e o motivo do reagendamento da exame. Após a confirmação, as alterações ficarão registadas.</p>   
                                                                <p className="text-zinc-700">Paciente: {exameSelecionado.nome} - Nº {exameSelecionado.numeroUtilizador} | {exameSelecionado.especialidade} - {exameSelecionado.medico}</p>
                                                            </div>
                                                            <button onClick={() => setExameSelecionado(null)} className="hover:text-red-700 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"><FiX/></button>
                                                        </div> 
                                                        <div className="grid sm:grid-cols-2 gap-4 w-full">
                                                            <div className="space-y-1">
                                                                <label className="font-semibold">Nova Data</label>
                                                                <input {...register('novaData')} type="date" className="w-full h-10 border bg-indigo-50 rounded-lg px-4 outline-blue-500"/>
                                                            { errors.novaData && <p className='text-xs text-red-600'>{ errors.novaData?.message}</p>}
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="font-semibold">Nova Hora</label>
                                                                <input {...register('novaHora')} type="time" className="w-full h-10 border bg-indigo-50 rounded-lg px-4 outline-blue-500"/>
                                                            { errors.novaHora && <p className='text-xs text-red-600'>{ errors.novaHora.message}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1 flex flex-col w-full">
                                                            <label htmlFor="descricao" className="font-semibold">Motivo do Reagendamento</label>
                                                            <textarea rows={3} name="descricao" id="descricao" className="max-w-full border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" placeholder="Descreva o motivo do reagendamento" />
                                                            { errors.motivoReagendamento && <p className='text-xs text-red-600'>{errors.motivoReagendamento.message}</p>}
                                                        </div>
                                                        
                                                        <div className="flex items-center justify-end mt-6 gap-4">
                                                            <button type="submit" className="bg-blue-500 text-white transition py-1 px-5 rounded-lg text-center font-semibold " >
                                                            Confirmar Reagendamento</button>
                                                            <button type="button" onClick={() => setExameSelecionado(null)} className="transition py-1 px-10 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-100 transition">Cancelar</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }

                </div>
                )}
            </div>
        )
}