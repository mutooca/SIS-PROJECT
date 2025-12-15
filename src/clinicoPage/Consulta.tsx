import TitleGestao from "../components/TitleGestao";

export default function Consulta(){
    return(
        <div>
            
            <TitleGestao title="Consultas Agendadas" p="Gerencie suas consultas do dia"/>
            <div className="flex items-center justify-between border rounded-xl shadow py-4 px-4 ">
                <div>
                    <h3 className="font-semibold">Cardiologia</h3>

                    <div className="text-zinc-700">
                        <p>Segunda a Sexta: 09:00 - 17:00</p>
                    </div>
                    
                </div>

                <button className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Editar</button>
            </div>
        </div>
    )
}