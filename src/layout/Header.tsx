import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <header className="fixed top-0 left-0 unset-0 w-full h-20 bg-white/50 backdrop-blur-md border-b px-10 flex items-center z-50">
      <div className="flex items-center justify-between w-full">
        
        <div className="flex items-center gap-2">
          <div className="bg-blue-400 p-1 rounded-2xl flex items-center justify-center">
            <CiHeart size={30} className="text-blue-400 bg-white rounded-xl" />
          </div>
          <Link to={'/'}><h1 className="text-blue-400 font-bold text-2xl">SIS - PDC.AO</h1></Link>
          
        </div>

        <nav className="flex items-center gap-6">
          <ul className="hidden md:flex gap-6 font-semibold text-zinc-500">
            <li><Link to={'/'} >Home</Link></li>
            <li><Link to={'/especialidade'} >Especialidades</Link></li>
            <li><Link to={'/medicos'} >Médicos</Link></li>
            <li><Link to={'/exames'} >Exames</Link></li>
          </ul>

          <div className="hidden md:flex gap-2 items-center">
            <Link to={'/entrar'}>
              <button className="hover:bg-blue-500 hover:text-white transition py-1 px-3 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-50 transition">
              Entrar
            </button>
            </Link>
            <Link to={'/registar'}>
               <button className="py-1 px-3 bg-blue-400 transition border-2 border-blue-400 text-white font-semibold rounded-lg hover:bg-blue-500 transition">
               Registar
               </button>
            </Link>
          </div>
        </nav>
        <div className="flex md:hidden">
          <button onClick={() => setOpenMenu(true)} className="hover:bg-blue-500 hover:text-white transition p-1 rounded">
            <FiMenu  size={25}/>
          </button>
        </div>
       
      </div>
       {
          openMenu === true && (
            <div className="fixed bg-black w-full bg-opacity-50 top-0 right-0 ">
              <div className="bg-white h-screen w-64 shadow-lg justify-between p-6 flex ">
                  <nav>
                    <ul className="flex-col font-semibold text-zinc-500 space-y-3 my-8">
                      <li><Link to={'/'} >Home</Link></li>
                      <li><Link to={'/especialidade'} >Especialidades</Link></li>
                      <li><Link to={'/medicos'} >Médicos</Link></li>
                      <li><Link to={'/exames'} >Exames</Link></li>
                    </ul>

                    <div className="flex flex-col gap-2 items-center">
                      <Link to={'/entrar'}>
                        <button className="hover:bg-blue-500 hover:text-white transition py-1 px-10 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-50 transition">
                        Entrar
                      </button>
                      </Link>
                      <Link to={'/registar'}>
                        <button className="py-1 px-10 bg-blue-400 transition border-2 border-blue-400 text-white font-semibold rounded-lg hover:bg-blue-500 transition">
                        Registar
                        </button>
                      </Link>
                    </div>
                  </nav>
                  <div>
                    <FiX onClick={() => setOpenMenu(false)} />
                  </div>
                </div>
              </div>
             
          )
        } 
    </header>
  );
}
