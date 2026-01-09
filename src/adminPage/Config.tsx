
import TitleGestao from "../components/TitleGestao";

export default function Config(){
    return (
        <div>
            <TitleGestao title="Configurações do Sistema" p="Configurações gerais, gestão de exames e notificações"/>
            
                <div className="space-y-4 border-b my-4 pb-6">
                    
                    <h3 className="font-semibold text-lg my-4">Enviar Notificações por Email (Gmail)</h3>
                     <div>
                        <select name="" id="" className="border rounded-lg p-2 outline-none bg-zinc-100 w-full" >
                            <option value="" >Seleccione um utente...</option>
                            <option value="">João Pedro Silva - joao.silva@gmail.com</option>
                            <option value="">Maria Santos - maria.santos@gmail.com</option>
                        </select>
                    </div>
                    <div className="space-y-3 rounded-xl shadow py-4 px-4 bg-zinc-100">
                        <div className="flex items-center justify-between">
                            <div className="">
                                <h2 className="font-semibold text-lg">Lembrete de Consulta</h2>
                                <p>Enviar email 1 dia antes da consulta</p>
                            </div>
                                <button className="hover:bg-blue-500 transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Abrir Gmail</button>
                        </div>
                    </div>
                    <div className="space-y-3 rounded-xl shadow py-4 px-4 bg-zinc-100">
                        <div className="flex items-center justify-between">
                            <div className="">
                                <h2 className="font-semibold text-lg">Lembrete de Exame</h2>
                                <p>Enviar email 1 dia antes do exame</p>
                            </div>
                                <button className="hover:bg-blue-500 transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Abrir Gmail</button>
                        </div>
                    </div>
                    
                    <div className="space-y-3 rounded-xl shadow py-4 border border-yellow-300 px-4 bg-yellow-50">
                        <div className="flex items-center justify-between">
                            <div className="">
                                <h2 className="font-semibold text-lg text-yellow-800">Consulta Reagendada</h2>
                                <p className="text-yellow-600">Notificar utente que a consulta foi reagendada</p>
                            </div>
                                <button className="hover:bg-blue-500 transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Abrir Gmail</button>
                        </div>
                    </div>
                    <div className="space-y-3 rounded-xl shadow py-4 border border-yellow-300 px-4 bg-yellow-50">
                        <div className="flex items-center justify-between">
                            <div className="">
                                <h2 className="font-semibold text-lg text-yellow-800">Exame Reagendado</h2>
                                <p className="text-yellow-600">Notificar utente que o exame foi reagendado</p>
                            </div>
                                <button className="hover:bg-blue-500 transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Abrir Gmail</button>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 my-4">
                    <h3 className="font-semibold text-lg my-4">Configurações de Marcação</h3>
                    <div className="space-y-1">
                        <label className="font-semibold">Duração Padrão da Consulta (minutos)</label>
                        <input type="number" className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500"/>
                    </div>
                    <div className="space-y-1">
                        <label className="font-semibold">Antecedência Máxima para Marcação (dias)</label>
                        <input type="number" className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500 "/>
                    </div>

                    <button className="bg-blue-500 text-white hover:bg-blue-600 w-full h-12 rounded-xl font-semibold transition">Guardar Configurações</button>
                </div>
                 
        </div>
    )
}