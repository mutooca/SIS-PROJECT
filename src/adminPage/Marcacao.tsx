import { useState } from "react"
import TitleGestao from "../components/TitleGestao"

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

                    <div className="space-y-3 border rounded-xl shadow py-4 px-4">
                        <div className="flex items-center justify-between ">
                            <div>
                                <h2 className="font-semibold text-lg">João Pedro Silva - Nº 123456</h2>

                                <div className="text-zinc-700">
                                    <p>Cardiologia - Dr. João Silva</p>
                                    <p>15/12/2025 às 10:00</p>
                                    <p><span className="font-semibold">Contacto:</span> 923456789</p>
                                </div>
                                
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <button className="hover:bg-blue-500 transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Reagendar</button>
                                <button className="hover:bg-red-600 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2  bg-red-500 text-white border-2 border-red-500" >Cancelar</button>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3 border rounded-xl shadow py-4 px-4">
                        <div className="flex items-center justify-between ">
                            <div>
                                <h2 className="font-semibold text-lg">Ana Costa - Nº 789012</h2>

                                <div className="text-zinc-700">
                                    <p>Pediatria - Dra. Maria Santos</p>
                                    <p>15/12/2025 às 14:30</p>
                                    <p><span className="font-semibold">Contacto:</span> 924567890</p>
                                </div>
                                
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <button className="hover:bg-blue-500 transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Reagendar</button>
                                <button className="hover:bg-red-600 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2  bg-red-500 text-white border-2 border-red-500" >Cancelar</button>
                            </div>
                        </div>
                    </div>

                </div>
                )}
                {roleMarcacao === 'exame' && (
                    <div className="space-y-4">

                    <div className="space-y-3 border rounded-xl shadow py-4 px-4">
                        <div className="flex items-center justify-between ">
                            <div>
                                <h2 className="font-semibold text-lg">Maria Santos - Nº 456789</h2>

                                <div className="text-zinc-700">
                                    <p>Radiografia (Tórax)</p>
                                    <p>16/12/2025 às 14:00</p>
                                    <p className="text-yellow-500">⚠️ Requer prescrição médica</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <button className="hover:bg-blue-500 transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Reagendar</button>
                                <button className="hover:bg-red-600 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2  bg-red-500 text-white border-2 border-red-500" >Cancelar</button>
                            </div>
                        </div>
                    </div>

                </div>
                )}
            </div>
        )
}