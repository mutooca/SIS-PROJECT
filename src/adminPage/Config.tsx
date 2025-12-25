import { Search } from "lucide-react";
import TitleGestao from "../components/TitleGestao";

export default function Config(){
    return (
        <div>
            <TitleGestao title="Configurações do Sistema" p="Configurações gerais, gestão de exames e notificações"/>
            <div>
                <h3 className="font-semibold text-lg my-4">Gestão de Estados de Exames</h3>
                <TitleGestao p='Atualize o estado dos exames realizados. Ao marcar como "Pronto", será oferecida a opção de enviar email ao utente.'/>
                <form action="">
                    <div className="space-y-1 my-4">
                        <label htmlFor="name" className="font-semibold">Buscar Utente por ID ou nome</label>
                        <div className="flex max-w-7xl gap-2">
                            <input type="text" name="" id="" placeholder="Número de Identificador" className="w-full h-12 bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            <button className="bg-blue-500 text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2" >
                            <Search />Consultar</button>
                        </div>
                    </div>
                </form>
                <div className="space-y-4 border-b my-4">
                    <div className="space-y-3 border rounded-xl shadow py-4 px-4">
                        <div className="flex items-center justify-between ">
                            <div>
                                <h2 className="font-semibold text-lg">João Pedro Silva</h2>

                                <div className="text-zinc-700">
                                    <p>10:30 - Radiografia de Tórax</p>
                                    <p>joao.silva@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <div>
                                    <select name="" id="" className="border rounded-lg p-2 outline-none bg-zinc-100" >
                                        <option value="">Em progresso</option>
                                        <option value="">Aguardando</option>
                                        <option value="">Pronto</option>
                                        <option value="">Cancelado</option>
                                    </select>
                                </div>
                                <button className="hover:bg-green-400 transition py-1 px-5 rounded-full text-center font-semibold flex items-center gap-2  bg-green-100 text-green-600" >Pronto</button>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3 border rounded-xl shadow py-4 px-4">
                        <div className="flex items-center justify-between ">
                            <div>
                                <h2 className="font-semibold text-lg">Maria Santos</h2>

                                <div className="text-zinc-700">
                                    <p>11:00 - Análises Clínicas</p>
                                    <p>maria.santos@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex md:flex-col items-center justify-center gap-2 ">
                                <div>
                                    <select name="" id="" className="border rounded-lg p-2 outline-none bg-zinc-100" >
                                        <option value="">Em progresso</option>
                                        <option value="">Aguardando</option>
                                        <option value="">Pronto</option>
                                        <option value="">Cancelado</option>
                                    </select>
                                </div>
                                <button className="hover:bg-green-400 transition py-1 px-5 rounded-full text-center font-semibold flex items-center gap-2  bg-green-100 text-green-600" >Pronto</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 border-b my-4">
                    
                    <h3 className="font-semibold text-lg my-4">Enviar Notificações por Email (Gmail)</h3>
                     <div>
                        <select name="" id="" className="border rounded-lg p-2 outline-none bg-zinc-100 w-full" >
                            <option value="" disabled >Seleccione um utente</option>
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
                    <div className="space-y-3 rounded-xl shadow py-4 px-4 bg-zinc-100">
                        <div className="flex items-center justify-between">
                            <div className="">
                                <h2 className="font-semibold text-lg">Resultados Disponíveis</h2>
                                <p>Notificar quando resultados estiverem prontos</p>
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
        </div>
    )
}