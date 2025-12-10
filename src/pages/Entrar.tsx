import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function Entrar(){

    const [role, setRole] = useState<'utente' | 'admin' | 'clinico'>('utente')
     const handleSubmitRole = (value: 'utente' | 'admin' | 'clinico') => {
        setRole(value)
     }

    return(
        <div className="max-w-full max-h-screen bg-indigo-50 py-8">
             <div className="flex items-center justify-center gap-2 pb-10">
                <div className="bg-blue-400 p-1 rounded-2xl flex items-center justify-center">
                    <CiHeart size={30} className="text-blue-400 bg-white rounded-xl" />
                </div>
                <Link to={'/'}><h1 className="text-blue-400 font-bold text-2xl">SIS - PDC.AO</h1></Link>
            </div>
            <div className="justify-center rounded-xl bg-white py-8 shadow flex items-center flex-col border h-full max-w-lg m-auto space-y-3">
                <div className="space-y-3 w-full px-10">
                    <h1 className="font-bold text-xl text-center ">Acesso ao Sistema</h1>
                    <p className="text-zinc-600 text-center">Entre com suas credenciais para acessar o sistema</p>

                    <ul className="grid grid-cols-3 gap-2 bg-indigo-50 py-1 px-2 rounded-lg">
                        <button onClick={() => handleSubmitRole(('utente'))} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold ${role === 'utente' ? 'bg-gray-50': ''}`} >Utente</button>
                        <button onClick={() => handleSubmitRole('admin')} className={ `hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold ${role === 'admin' ? 'bg-gray-50': ''}`} >Admin</button>
                        <button onClick={() => handleSubmitRole('clinico')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold ${ role === 'clinico' ? 'bg-gray-50': ''}`} >Clinico</button>
                    </ul>
                </div>

                {
                    role === 'utente' && (
                    <form action="" className="space-y-3 w-full justify-center flex items-center flex-col px-10">
                         <h2 className="text-lg font-bold py-4">Login Utente</h2>
                        <div className="space-y-1 flex w-full flex-col max-w-full">
                            <label htmlFor="email" className="font-semibold">Informe o e-mail</label>
                            <input type="text" name="email" id="email" placeholder="Seu número utilizador" className="max-w-full h-12 border bg-indigo-50 rounded-lg pl-4 outline-blue-500 "/>
                        </div>
                        <div className="space-y-1 flex flex-col  w-full">
                            <label htmlFor="password" className="font-semibold">Palavra-passe</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        </div>

                        <button type="submit" className="bg-blue-500 text-white hover:bg-blue-400 w-full h-10 rounded-xl">Entrar</button>
                    </form>

                    )
                }
               
                {
                    role === 'clinico' && (
                    <form action="" className="space-y-3 w-full justify-center flex items-center flex-col px-10">
                        <h2 className="text-lg font-bold py-4">Login Clínico</h2>
                        <div className="space-y-1 flex w-full flex-col max-w-full">
                            <label htmlFor="email" className="font-semibold">Informe o e-mail</label>
                            <input type="text" name="email" id="email" placeholder="Seu número utilizador" className="max-w-full h-12 border bg-indigo-50 rounded-lg pl-4 outline-blue-500 "/>
                        </div>
                        <div className="space-y-1 flex flex-col  w-full">
                            <label htmlFor="password" className="font-semibold">Palavra-passe</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        </div>

                        <button type="submit" className="bg-blue-500 text-white hover:bg-blue-400 w-full h-10 rounded-xl">Entrar</button>
                    </form>

                    )
                }
                {
                    role === 'admin' && (
                    <form action="" className="space-y-3 w-full justify-center flex items-center flex-col px-10">
                         <h2 className="text-lg font-bold py-4">Login Admin</h2>
                        <div className="space-y-1 flex w-full flex-col max-w-full">
                            <label htmlFor="email" className="font-semibold">Informe o e-mail </label>
                            <input type="text" name="email" id="email" placeholder="Seu número utilizador" className="max-w-full h-12 border bg-indigo-50 rounded-lg pl-4 outline-blue-500 "/>
                        </div>
                        <div className="space-y-1 flex flex-col  w-full">
                            <label htmlFor="password" className="font-semibold">Palavra-passe</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        </div>

                        <button type="submit" className="bg-blue-500 text-white hover:bg-blue-400 w-full h-10 rounded-xl">Entrar</button>
                    </form>

                    )
                }
               
                <div>
                    <p className="text-zinc-700">Não tem conta?<Link to={'/registar'} className="text-blue-600 font-semibold hover:underline"> Registar-se</Link> </p>
                </div>
               
            </div> 
            <div className="flex justify-center text-sm py-4 text-zinc-700">
                <p>Ao entrar, você concorda com os <Link to={'/registar'} className="text-blue-600 hover:underline"> Termos de Uso</Link> e <Link to={'/'} className="text-blue-600 hover:underline" >Política de Privacidade</Link></p>
            </div>
        </div>
    )
}