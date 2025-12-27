import TitleGestao from "../components/TitleGestao";

export default function Consulta(){
    return(
        <div>
            
            <TitleGestao title="Consultas Agendadas" p="Gerencie suas consultas do dia"/>
            <div className="space-y-4">
                 <div className="flex items-center justify-between border rounded-xl shadow py-4 px-4 ">
                <div>
                    <h3 className="font-semibold">João Pedro Silva</h3>

                    <div className="text-zinc-700">
                        <p>10:00 - 10:30</p>
                        <p>Primeira consulta - Cardiologia</p>
                    </div>
                    
                </div>

                <button className="hover:bg-blue-700 text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-500 bg-blue-500" >Iniciar Consulta</button>
                </div>
                <div className="flex items-center justify-between border rounded-xl shadow py-4 px-4 ">
                    <div>
                        <h3 className="font-semibold">Maria Santos</h3>

                        <div className="text-zinc-700">
                            <p>11:00 - 11:30</p>
                            <p>Consulta de rotina - Cardiologia</p>
                        </div>
                        
                    </div>

                    <button className="hover:bg-blue-700 text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-500 bg-blue-500" >Iniciar Consulta</button>
                </div>
            </div>
           
        </div>
    )
}