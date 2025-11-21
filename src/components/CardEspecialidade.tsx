
import { GoArrowRight } from "react-icons/go";
import type { ReactNode } from "react";

interface props {
    img: string
    type: string
    text: string
    icon: ReactNode
    bgImage ?: string
}
export default function CardEspecialidade({img, type, text, icon}: props){
    return (
        
        <div className='w-96 h-full rounded-lg '>
            <div className='w-96 rounded-t-lg h-44  bg-blue-400'>
                <img src={img} alt="" className='w-96 absolute rounded-t-lg h-44 opacity-50' />
                <span className='relative text-white top-30 left-4'>{icon}</span>
            </div>
            <div className='space-y-3 px-5 bg-white py-4'>
                <h3 className='font-bold text-2xl'>{type}</h3>
                <p className='text-justify text-zinc-700'>{text}</p>
                <button className='flex items-center w-full font-semibold gap-3 border-2 border-blue-400 p-2 rounded-lg'>
                    Saber Mais
                    <GoArrowRight size={17} />
                </button>
            </div>
        </div>
    )
}