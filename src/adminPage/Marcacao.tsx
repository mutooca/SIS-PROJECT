import { useState } from "react"
import TitleGestao from "../components/TitleGestao"

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
        nome: 'Carlos Mendes', numeroUtilizador: '345678', exame: 'Análise de Sangue', data: '16/12/2025', hora: '09:00', contacto: '925678901'
    },
    {
        nome: 'Sofia Ribeiro', numeroUtilizador: '901234', exame: 'Ecografia Abdominal', data: '16/12/2025', hora: '11:15', contacto: '926789012'           
    },
    {
        nome: 'Miguel Oliveira', numeroUtilizador: '567890', exame: 'Ressonância Magnética', data: '16/12/2025', hora: '13:45', contacto: '927890123'
    }
]

export default function Marcacao(){

     const [roleMarcacao, setRoleMarcacao] = useState<'consulta' | 'exame'>('consulta')
    
        const handleSubmitRoleMarcacao = ( value : 'consulta' | 'exame') => {
            setRoleMarcacao(value)
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
                                        <button className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Reagendar</button>
                                        <button className="hover:bg-red-600 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2  bg-red-500 text-white border-2 border-red-500" >Cancelar</button>
                                    </div>
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
                                            <p>{item.exame}</p>
                                            <p>{item.data} às {item.hora}</p>
                                            <p className="text-yellow-500 text-sm">⚠️ Requer prescrição médica</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 flex-wrap">
                                        <button className="hover:bg-blue-500 transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Reagendar</button>
                                        <button className="hover:bg-red-600 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2  bg-red-500 text-white border-2 border-red-500" >Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
                )}
            </div>
        )
}