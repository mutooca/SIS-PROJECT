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
        `py-1 px-5 rounded-lg max-w-full flex justify-center mx-2 items-center gap-2 font-normal md:font-semibold transition
        ${isActive ? "bg-white shadow" : "hover:bg-gray-50"}`
      }
    >{icon}{theme}
    </NavLink>
    )
}