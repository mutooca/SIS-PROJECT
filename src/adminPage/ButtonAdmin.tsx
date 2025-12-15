import {type ReactElement } from "react"
import { Link, useLocation } from "react-router-dom"

interface props {
    icon: ReactElement
    theme: string
    to: string
}


export default function ButtonAdmin({icon, theme, to}: props){

     const location = useLocation()
    const isActive = location.pathname === to

    return(
        <Link to={to}>
             <button className={`max-w-44 hover:bg-gray-50 transition py-1 px-4 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${isActive ? 'bg-gray-50' : ''}`}>{icon}{theme}</button>
        </Link>
    )
}