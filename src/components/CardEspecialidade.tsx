
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";


interface props {
    img: string
    type: string
    text: string
    to: string
}
export default function CardEspecialidade({img, type, text, to}: props){
    return (
        
       <div className='max-w-96 h-full rounded-b-xl mx-4 hover:shadow-2xl hover:scale-102 transition-all duration-300 ease-in-out cursor-pointer'>
            <div className='max-w-96 rounded-t-xl h-48'>
                <img src={img} alt="" className='w-full rounded-t-xl h-48' />
            </div>
            <div className='space-y-3 rounded-b-xl min-h-56 px-5 bg-white py-4'>
                <h3 className='font-bold text-2xl'>{type}</h3>
                <p className='text-justify text-zinc-500'>{text}</p>
                <Link to={to}>
                <button className='flex justify-center items-center w-full font-semibold gap-3 border-2 border-blue-500 p-2 rounded-lg hover:bg-blue-500 text-blue-500 hover:text-white'>
                    Saber Mais
                    <GoArrowRight size={17} />
                </button></Link>
            </div>
        </div>
    )
}

