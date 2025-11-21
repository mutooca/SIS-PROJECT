
import type { ReactNode } from "react"

  interface props{
    icon: ReactNode
    title: string
    text: string
    colorIcon ?: 'green' | 'blue'
  }

 
 export default function CardOverView({ icon, title, text}: props){


    
    return(
        <div className='rounded-xl shadow hover:shadow-xl transition bg-white space-y-2 w-72 h-44 text-center flex flex-col items-center '>
            <span className={` flex items-center justify-center pt-4 text-green-400 `}>{icon}</span>
            <h3 className='font-bold text-3xl '>{title}</h3>
            <p>{text}</p>
        </div>
    )
 }