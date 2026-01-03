import {type ReactElement } from "react"
import { NavLink } from "react-router-dom"

interface props {
    icon: ReactElement
    theme: string
    to: string
}


export default function ButtonAdmin({icon, theme, to}: props){


    return(
       <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `py-1 px-5 rounded-lg flex justify-center items-center gap-2 font-semibold transition
        ${isActive ? "bg-white  shadow" : "hover:bg-gray-50"}`
      }
    >{icon}{theme}
    </NavLink>
    )
}