import TitleGestao from "../components/TitleGestao";

export default function Horario(){
    return (
        <div>
            <TitleGestao title="Gestão de Horário" p="Actualize seu horário com 1 mês de antecedência (sem consultas marcadas)"/>
            
            <form className='space-y-4 w-full'>
                    <div className="space-y-1 flex flex-col w-full">
                        <label htmlFor="name" className="font-semibold">Especialidade</label>
                        <input type="text" name="especialidade" id="especialidade" placeholder="Cardiologia" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                    </div>
                    <div className="space-y-1 flex flex-col w-full">
                        <label htmlFor="dataMudanca" className="font-semibold">Horário Actual</label>
                       <p className="max-w-full h-20 bg-zinc-50 rounded-lg px-4 bg-indigo-50 outline-blue-500 flex justify-between items-center">
                            <span>Segunda à Sexta</span>
                            <span>09h - 17h</span>
                        </p>
                    </div>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="horarioInicio" className="font-semibold">Novo Horário - Início</label>
                            <input type="time" name="horarioInicio" id="horarioInicio" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="horarioFim" className="font-semibold">Novo Horário - Fim</label>
                            <input type="time" name="horarioFim" id="horarioFim" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        </div>
                    </div> 
                    <div className="space-y-1 flex flex-col w-full">
                        <label htmlFor="diasAtendimento" className="font-semibold">Dias de Atendimento</label>
                        <input type="text" name="diasAtendimento" id="diasAtendimento" placeholder="Ex: Segunda à Sexta" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                    </div>
                    <div className="space-y-1 flex flex-col w-full">
                        <label htmlFor="dataMudanca" className="font-semibold">Data do Inicio da Mudança</label>
                        <input type="date" name="dataMudanca" id="dataMudanca" placeholder="dd/mm/aaaa" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                    </div>

                    <button type="submit" className="bg-blue-500 text-white mt-8 hover:bg-blue-400 w-full h-10 rounded-xl">Actualizar Horário</button>
                </form>

        </div>
    )
}