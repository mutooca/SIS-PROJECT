

interface props{
    icon: string;
    textbotao: string;
    title: string;
    text: string;
    textend: string;
    corIcon?: 'blue' | 'Green'; // opcional
}

export default function CardLinkEspecialidade({ icon, textbotao,  title, text, textend}: props){
    return(
        <>
            <div className="bg-white shadow rounded-2xl  hover:shadow-2xl min-w-[200px] min-h-[250px] p-6 border border-blue-200 flex flex-col items-center justify-center houver:cursor-pointer relative">
                <div className="flex justify-between items-center mb-40 min-w-[325px] absolute  ">
                    <img src={icon} className="flex   rounded-xl text-blue-500 p-1  cursor-pointer  "/>
                    <button className=" flex text-green-500   rounded-2xl min-w-[20px] p-1 bg-green-100 hover:bg-green-200 transition cursor-pointer ">{textbotao}</button>
                </div>
                
                <div className="w-full flex flex-col  gap-3 relative  mt-15"> 
                    <h2 className="font-semibold text-xl text-black-100">{title}</h2>
                    <p className="text-gray-500">{text}</p>
                  <div className="border-t border-solid border-gray min-w-[270px] text-center"></div>
                    <p className="text-gray-500">{textend}</p>

                </div>
            </div>
        </>
    )
}