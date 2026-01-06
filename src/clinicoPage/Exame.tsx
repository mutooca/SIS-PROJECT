import { Send, Upload } from "lucide-react";
import TitleGestao from "../components/TitleGestao";

export default function Exame(){
    return(
        <div>
            
            <TitleGestao title="Gestão de Exames" p="Alterar estado, anexar resultados e receitas, enviar para RCU do utente"/>
            <div className="space-y-4">
                <div className="space-y-3 border rounded-xl shadow py-4 px-4">
                    <div className="flex items-center justify-between border-b py-2">
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
                                    <option value="" selected>Em progresso</option>
                                    <option value="">Aguardando</option>
                                    <option value="">Pronto</option>
                                    <option value="">Cancelado</option>
                                </select>
                            </div>
                            <button className="hover:bg-yellow-400 transition py-1 px-5 rounded-full text-center font-semibold flex items-center gap-2  bg-yellow-100 text-yellow-600" >Em Progresso</button>
                        </div>
                    </div>
                    <form action="">
                        <div className="space-y-1 my-4">
                            <div className="flex max-w-full items-center gap-2">
                                <input type="file" name="" id="" className="w-full py-2 bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                <button className="text-blue-500 border-2 border-blue-500 transition py-2 min-w-48 justify-center rounded-lg text-center font-semibold flex items-center gap-2" >
                                <Upload />Anexar Resultado</button>
                            </div>
                        </div>
                        <div className="space-y-1 my-4">
                            <div className="flex max-w-full items-center gap-2">
                                <input type="file" name="" id="" className="w-full py-2 bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                <button className="text-blue-500 border-2 border-blue-500 transition py-2 min-w-48 justify-center rounded-lg text-center font-semibold flex items-center gap-2" >
                                <Upload />Anexar Receita</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="space-y-3 border rounded-xl shadow py-4 px-4">
                    <div className="flex items-center justify-between border-b py-2">
                        <div>
                            <h2 className="font-semibold text-lg">Maria Santos</h2>
                            <div className="text-zinc-700">
                                <p>11:00 - Análises Clínicas</p>
                                <p>maria.santos@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <div>
                                <select name="" id="" className="border rounded-lg p-2 outline-none bg-zinc-100" >
                                    <option value="">Em progresso</option>
                                    <option value="">Aguardando</option>
                                    <option value="" selected>Pronto</option>
                                    <option value="">Cancelado</option>
                                </select>
                            </div>
                            <button className="hover:bg-green-400 transition py-1 px-5 rounded-full text-center font-semibold flex items-center gap-2  bg-green-100 text-green-600" >Pronto</button>
                        </div>
                    </div>
                    <form action="">
                        <div className="space-y-1 my-4">
                            <div className="flex max-w-full items-center gap-2">
                                <input type="file" name="" id="" className="w-full py-2 bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                <button className="text-blue-500 hover:bg-gray-100 border-2 border-blue-500 transition py-2 min-w-48 justify-center rounded-lg text-center font-semibold flex items-center gap-2" >
                                <Upload />Anexar Resultado</button>
                                <button className="bg-blue-500 text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2" >
                            <Send />Enviar para RCU</button>
                            </div>
                        </div>
                        <div className="space-y-1 my-4">
                            <div className="flex max-w-full items-center gap-2">
                                <input type="file" name="" id="" className="w-full py-2 bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                <button className="text-blue-500 hover:bg-gray-100 border-2 border-blue-500 transition py-2 min-w-48 justify-center rounded-lg text-center font-semibold flex items-center gap-2" >
                                <Upload />Anexar Receita</button>
                            </div>
                        </div>
                    </form>
                    <button className="text-blue-500 border-2 hover:bg-gray-100 border-blue-500 transition py-2 w-full justify-center rounded-lg text-center font-semibold flex items-center gap-2" >
                                <Upload />Anexar Resultado</button>
                </div>
                <div className="space-y-3 border rounded-xl shadow py-4 px-4">
                    <div className="flex items-center justify-between border-b py-2">
                        <div>
                            <h2 className="font-semibold text-lg">António Fernandes</h2>

                            <div className="text-zinc-700">
                                <p>14:00 - Eletrocardiograma</p>
                                <p>antonio.f@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <div>
                                <select name="" id="" className="border rounded-lg p-2 outline-none bg-zinc-100" >
                                    <option value="">Em progresso</option>
                                    <option value="" selected>Aguardando</option>
                                    <option value="">Pronto</option>
                                    <option value="">Cancelado</option>
                                </select>
                            </div>
                            <button className="hover:bg-indigo-400 transition py-1 px-5 rounded-full text-center font-semibold flex items-center gap-2  bg-indigo-100 text-indigo-600" >Em Progresso</button>
                        </div>
                    </div>
                    <form action="">
                        <div className="space-y-1 my-4">
                            <div className="flex max-w-full items-center gap-2">
                                <input type="file" name="" id="" className="w-full py-2 bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                <button className="text-blue-500 border-2 border-blue-500 transition py-2 min-w-48 justify-center rounded-lg text-center font-semibold flex items-center gap-2" >
                                <Upload />Anexar Resultado</button>
                            </div>
                        </div>
                        <div className="space-y-1 my-4">
                            <div className="flex max-w-full items-center gap-2">
                                <input type="file" name="" id="" className="w-full py-2 bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                <button className="text-blue-500 border-2 border-blue-500 transition py-2 min-w-48 justify-center rounded-lg text-center font-semibold flex items-center gap-2" >
                                <Upload />Anexar Receita</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
           
        </div>
    )
}