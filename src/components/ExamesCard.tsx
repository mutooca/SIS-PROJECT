
import exameIconPequeno from '../img/exameIconPequeno.png'

interface props{
    img: string;
    conteudobotao: string;
    title: string;
    text: string;
    resultadoExame: string;
}

export default function ExamesCard({img, conteudobotao, title, text,  resultadoExame}: props){
    return(
    <div className=" bg-white shadow hover:shadow-2xl flex flex-col justify-center items-center border border-blue-200 hover:cursor-pointer relative rounded-2xl p-6  min-w-[180px] min-h-[230px] ">
        <div className="flex justify-around w-full p-4  absolute  top-1 sm:mb-[180px] space-x-40 ">
            <span ><img src={img}  alt="icone de exameMedico " className='mr-[80px] rounded-2xl min-w-[30px]  min-h-[5px] hover:bg-blue-200 transition cursor-pointer'/></span>
           <button className=" flex text-gray-500  rounded-2xl min-w-[40px] p-1  border border-blue-200 hover:cursor-pointer  ">{conteudobotao}</button>
        </div>

        <div className="flex flex-col w-full relative gap-3  mt-15">
            <h2 className="text-gray-500 font-bold ml-4">{title}</h2>
           <p className="text-gray-500 ml-4">{text}</p>

           <div className="flex justify-start text-left gap-2  mr-[300px]  w-full">
                <img src={exameIconPequeno} alt="" className='min-w-[5px] p-2 rounded-2xl '/>
                <p className="text-gray-500 mt-1 mr-[10px]">{resultadoExame}</p>
           </div>
        </div>
    </div>)
}