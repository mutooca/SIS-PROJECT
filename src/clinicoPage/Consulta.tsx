import { useState } from "react";
import TitleGestao from "../components/TitleGestao";
import { FiX } from "react-icons/fi";
import { Send } from "lucide-react";
import { AiFillEdit } from "react-icons/ai";
import toast from 'react-hot-toast'
import { fakeApi } from '../services/api'

const consultaAgendada = [
    {
        nome: 'João Pedro Silva', numeroUtilizador: '123456', data: '15/12/2025', hora: '10:00'
    },
    {
        nome: 'Ana Costa', numeroUtilizador: '789012', data: '15/12/2025', hora: '11:00'
    },
    {
        nome: 'Rui Fernandes', numeroUtilizador: '234567', data: '15/12/2025', hora: '11:30'    
    },
    {
        nome: 'Carlos Mendes', numeroUtilizador: '345678', data: '15/12/2025', hora: '12:00'
    }
]

export default function Consulta(){

    const [consultaSelecionada, setConsultaSelecionada] = useState<null | typeof consultaAgendada[0]>(null)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showModalTerapeutica, setShowModalTerapeutica] = useState(false)

    type FinalizarAcao = 'guardar' | 'rcu'

    async function finalizarConsulta(acao: FinalizarAcao) {
        try {
            toast.loading(
                acao === 'guardar' ? 'A guardar consulta...' : 'A enviar para RCU...'
            )

            await fakeApi({
            consulta: consultaSelecionada,
            data: new Date(),
            })

            toast.dismiss()
            if(acao ===  'rcu'){
                toast.success('Consulta enviado para o RCU do utente com sucesso')
                setShowConfirm(false)
                setConsultaSelecionada(null)
            } else{
                toast.success('Consulta guardada com sucesso')
                setShowConfirm(true)
            }

        } catch (error) {
            toast.dismiss()
            toast.error('Falha ao processar a operação')
        }
    }

    async function enviarTerapeutica() {
        try {
            toast.loading('A enviar terapêutica...')

            await fakeApi({
            paciente: consultaSelecionada,
            terapeutica: {
                descricao: '...',
                medicamentos: '...',
            },
            })

            toast.dismiss()
            toast.success('Consulta e Terapêutica enviada para o RCU')

            setShowModalTerapeutica(false)
            setConsultaSelecionada(null)

        } catch {
            toast.dismiss()
            toast.error('Erro ao enviar terapêutica')
        }
    }



    return(
        <div>
            
            <TitleGestao title="Consultas Agendadas" p="Gerencie suas consultas"/>
        
            <div className="space-y-4">
            {
            consultaAgendada.map((item, index) => (
                <div key={index}  className="flex items-center justify-between border rounded-xl shadow py-4 px-4 ">
                    <div>
                        <h3 className="font-semibold">{item.nome}</h3>
                        <div className="text-zinc-700">
                            <p>{item.data} - {item.hora}</p>
                        </div>
                    </div>
                    <button onClick={() => setConsultaSelecionada(item)} className="hover:bg-blue-700 text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-500 bg-blue-500" >Iniciar Consulta</button>
                
                    {
                        consultaSelecionada && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center py-4 justify-center z-50">
                                <div className="bg-gray-50 rounded-lg p-6 w-full max-w-4xl max-h-full mx-4">
                                    <form action="">
                                        <div className="flex items.center justify-between mb-4">
                                            <div>
                                                <h2 className="text-2xl font-semibold ">Consulta em Andamento</h2>
                                                <p className="text-sm text-zinc-600 mt-1 mb-2">Preencha cuidadosamente as informações clínicas da consulta. Estes dados farão parte do histórico médico do paciente e não poderão ser alterados após a finalização.</p>   
                                                <p className="text-zinc-700">Paciente: {consultaSelecionada.nome} - Nº {consultaSelecionada.numeroUtilizador} </p>
                                            </div>
                                            <button onClick={() => setConsultaSelecionada(null)} className="hover:text-red-700 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"><FiX/></button>
                                        </div> 
                                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                                            
                                            <div className="space-y-2">
                                                <label htmlFor="prescricao" className="font-semibold">Sintomas Apresentados:</label>
                                                <textarea id="prescricao" className="w-full h-28 border bg-zinc-50 rounded-lg p-4 outline-blue-500 border" placeholder="Liste os sintomas relatados pelo paciente..."></textarea>     
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="exames" className="font-semibold">Procedimentos Realizados:</label>
                                                <textarea id="exames" className="w-full h-28 border bg-zinc-50 rounded-lg p-4 outline-blue-500 border" placeholder="Procedimentos realizados durante a consulta"></textarea>
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="exames" className="font-semibold">Diagnóstico:</label>
                                                <textarea id="exames" className="w-full h-28 border bg-zinc-50 rounded-lg p-4 outline-blue-500 border" placeholder="Diagnóstico da consulta"></textarea>
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="exames" className="font-semibold">Observações Adicionais (opcional):</label>
                                                <textarea id="exames" className="w-full h-28 border bg-zinc-50 rounded-lg p-4 outline-blue-500 border" placeholder="Notas adicionais sobre a consulta"></textarea>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end mt-6 gap-4">
                                            <button type="button" onClick={() => finalizarConsulta('guardar')} className="bg-blue-500 text-white transition py-1 px-5 rounded-lg text-center font-semibold " >
                                            Finalizar e Guardar Consulta</button>
                                            <button type="button" onClick={() => setConsultaSelecionada(null)} className=" hover:bg-blue-500 hover:text-white transition py-1 px-10 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-50 transition">Cancelar</button>
                                        </div>
                                    </form>
                                    {
                                        showConfirm && (
                                            <div className="bg-black inset-0 bg-opacity-50 fixed flex items-center justify-center z-60">
                                                <div className="bg-gray-50 w-full max-w-2xl max-h-full rounded-lg mx-4 p-4">
                                                    <h2 className="text-xl font-semibold text-green-600">✔ Consulta finalizada com sucesso</h2>
                                                    <p className="text-zinc-600 mt-2 text-sm">A consulta foi registada com sucesso. Agora pode optar por adicionar a terapêutica associada ou enviar os dados diretamente para o RCU.</p>
                                                    <div className="flex items-center justify-end gap-4 mt-6">
                                                        <button onClick={() => setShowModalTerapeutica(true)} className="hover:bg-blue-700 bg-blue-500 text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2" > <AiFillEdit /> Sim, escrever terapêutica</button>
                                                        <button onClick={() => finalizarConsulta('rcu')} className="bg-gray-300 hover:bg-gray-400 transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2" >
                                                        <Send />Enviar para RCU</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }

                    {
                        showModalTerapeutica && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center py-4 justify-center z-50">
                                <div className="bg-gray-50 rounded-lg p-6 w-full max-w-4xl max-h-full mx-4">
                                    <form action="">
                                        <div className="flex items.center justify-between mb-4">
                                            <div>
                                                <h2 className="text-2xl font-semibold ">Registo Terapêutico</h2>
                                                <p className="text-sm text-zinc-600 mt-1 mb-2">Registe a terapêutica prescrita ao paciente, incluindo medicação, dosagem e período de tratamento. Estas informações serão visíveis apenas para o pessoal clínico autorizado.</p>
                                                <p className="text-zinc-700">Paciente: {consultaSelecionada?.nome} - Nº {consultaSelecionada?.numeroUtilizador} </p>
                                            </div>
                                            <button onClick={() => setShowModalTerapeutica(false)} className="hover:text-red-700 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"><FiX/></button>
                                        </div>    
                                        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                                            
                                            <div className="space-y-2"> 
                                                <label htmlFor="prescricao" className="font-semibold">Descricao:</label>
                                                <textarea id="prescricao" className="w-full h-28 border bg-zinc-50 rounded-lg p-4 outline-blue-500 border" placeholder="Detalhe a descrição..."></textarea>     
                                            </div>
                                            <div className='grid grid-cols-2 gap-4 w-full'>
                                                <div className="space-y-2 flex flex-col w-full">
                                                    <label htmlFor="name" className="font-semibold">Data Início:</label>
                                                    <input type="date" name="nameEspecialidade" id="nameEspecialidade" placeholder="dd/mm/aaaa" className="w-full border bg-zinc-50 rounded-lg p-4 outline-blue-500 border" />
                                                </div>
                                                <div className="space-y-2 flex flex-col w-full">
                                                    <label htmlFor="name" className="font-semibold">Data Fim:</label>
                                                    <input type="date" name="nameEspecialidade" id="nameEspecialidade" placeholder="dd/mm/aaaa" className="w-full border bg-zinc-50 rounded-lg p-4 outline-blue-500 border" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="exames" className="font-semibold">Dosagem:</label>
                                                <textarea id="exames" className="w-full h-28 border bg-zinc-50 rounded-lg p-4 outline-blue-500 border" placeholder="Recomendações adicionais para o paciente"></textarea>
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="exames" className="font-semibold">Medicamentos:</label>
                                                <textarea id="exames" className="w-full h-28 border bg-zinc-50 rounded-lg p-4 outline-blue-500 border" placeholder="Recomendações adicionais para o paciente"></textarea>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end mt-6 gap-4">  
                                            <button type="button" onClick={enviarTerapeutica} className="hover:bg-blue-700 bg-blue-500 text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2" >
                                                        <Send />Guardar e Enviar para RCU</button>
                                            <button type="button" onClick={() => setShowModalTerapeutica(false)} className=" hover:bg-blue-500 hover:text-white transition py-1 px-10 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-50 transition">Cancelar</button>    
                                        </div>
                                    </form>
                                </div>
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