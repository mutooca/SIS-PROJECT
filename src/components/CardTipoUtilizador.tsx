import clsx from "clsx";
import { CheckCircle } from "lucide-react";
import { GoArrowRight } from "react-icons/go";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

interface props {
    img: string 
    type: string
    text: string
    p1: string
    p2: string
    p3: string
    p4?: string
    textButton?: string
    colorBorder?: 'blue' | 'green'
    colorButton?: 'blue' | 'green'
}

const card = tv({
    base: 'flex ',
    variants: {
        colorBorder: {
            blue: 'border-blue-500',
            green: 'border-green-400'
        },
        colorButton: {
            blue: 'bg-blue-500',
            green: 'bg-green-400'
        }
    },
    defaultVariants: {
        colorBorder: 'blue',
        colorButton: 'blue'
    }
})

export default function CardTipoUtilizador({
    img, 
    type, 
    text, 
    p1, 
    p2, 
    p3, 
    p4, 
    textButton, 
    colorBorder = 'blue', 
    colorButton = 'blue'
}: props){
    return (
    <div className='border rounded-xl shadow hover:shadow-xl'>
        <div className={twMerge(clsx(card({colorBorder})) ,'h-full flex flex-col max-w-112 p-4 bg-white border-t-4 rounded-xl')}>
            <div className='flex justify-center py-4'>
                <img src={img} alt="" />
            </div>
            <div className='flex flex-col justify-center px-4'>
                <h3 className='text-2xl font-bold text-center'>{type}</h3>
                <p className='text-center py-4 text-zinc-500'>{text}</p>
                <div className='py-4 space-y-3 text-zinc-500'>
                    <span className='flex items-center gap-4'>
                        <CheckCircle className='text-blue-400' size={20}/>
                        <p>{p1}</p>
                    </span>
                    <span className='flex items-center gap-4'>
                        <CheckCircle className='text-blue-400' size={20}/>
                        <p>{p2}</p>
                    </span>
                    <span className='flex items-center gap-4'>
                        <CheckCircle className='text-blue-400' size={20}/>
                        <p>{p3}</p>
                    </span>
                    <span className='flex items-center gap-4'>
                        <CheckCircle className='text-blue-400' size={20}/>
                        <p>{p4}</p>
                    </span>

                    <button className={twMerge(clsx(card({colorButton})),'flex justify-center items-center w-full font-semibold gap-3 p-2 rounded-lg text-white')}>
                        {textButton}
                        <GoArrowRight size={17} />
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}