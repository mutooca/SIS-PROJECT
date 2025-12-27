import Calender from '../img/Calender.PNG'
interface props{
  sigla: string;
  nome: string;
  especialidade: string;
  esperiencia: string;
  horarioAtendimento: string;
}

export default function MedicoCard({sigla, nome, especialidade, esperiencia, horarioAtendimento}: props){
  return(
    <>
        <div className="bg-white shadow rounded-2xl  min-w-[300px] min-h-[200px] hover:shadow-2xl transition p-8 space-y-3 border border-blue-100 flex flex-col items-center justify-center houver:cursor-pointer relative mb-6">
          <div className="flex justtify-bettween w-full  bg-red relative gap-4 ">
            <div className="flex justify-center w-16 h-16 cursor-pointer rounded-full bg-blue-500 p-2 text-white font-bold text-center ">
             <h3 className="flex my-auto ">{sigla}</h3> 
            </div>
            <div className="flex flex-col gap-2  mt-[5px]">
                <h3 className="text-black-300 font-bold text-xl mt-[20px]">{nome}</h3>
                <button className="rounded-xl text-sm bg-green-400 text-white min-w-[10px] min-h-[10px] w-[80px] hover:bg-green-300 transition ">{especialidade}</button>
            </div>
          </div>
            <div className="flex  justify-between w-full ">
            <p className="text-gray-500 text-[15px]">Experiencia:</p>
            <p className="text-black text-[15px]"> {esperiencia}</p>
          </div>
          <div className="border border-gray-200 text-center justify-center min-w-[350px] mt-[20px]"></div>
         <div className="flex flex-col justify-start w-full mt-[10px]">
           <h2 className="text-gray-500 ">HORÁRIO DE ATENDIMENTO </h2>
           <h3 className="">{horarioAtendimento}</h3>
         </div>
         <div className="flex mt-[20px] w-full">
            <button className=" flex justify-center items-center text-white w-full p-4 h-[40px] text-center gap-4 bg-blue-500 rounded-xl  hover:shadow-xl transition p-2">
            <img src={Calender} alt="Icone de Calendario" className="text-white " /> Marcar Consulta</button>
        </div>
      </div>
    </>
  )
}


