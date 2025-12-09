import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function Entrar(){
    return(
        <div className="max-w-full max-h-screen bg-indigo-50 py-8">
             <div className="flex items-center justify-center gap-2 pb-10">
                <div className="bg-blue-400 p-1 rounded-2xl flex items-center justify-center">
                    <CiHeart size={30} className="text-blue-400 bg-white rounded-xl" />
                </div>
                <Link to={'/'}><h1 className="text-blue-400 font-bold text-2xl">SIS - PDC.AO</h1></Link>
            </div>
            <div className="justify-center rounded-xl bg-white py-8 shadow flex items-center flex-col border h-full max-w-lg m-auto space-y-3">
                <div className="space-y-3">
                    <h1 className="font-bold text-xl text-center ">Acesso ao Sistema</h1>
                    <p className="text-zinc-600 text-center">Entre com suas credenciais para acessar o sistema</p>

                    <ul className="grid grid-cols-3 gap-2 bg-indigo-50 py-1 px-4 rounded-lg">
                        <button className="hover:bg-gray-50 transition px-10 py-1 rounded-lg text-center font-semibold" >Utente</button>
                        <button className="hover:bg-gray-50 transition px-10 py-1 rounded-lg text-center font-semibold" >Admin</button>
                        <button className="hover:bg-gray-50 transition px-10 py-1 rounded-lg text-center font-semibold" >Clinico</button>
                    </ul>
                </div>

                <form action="" className="space-y-3 w-full justify-center flex items-center flex-col px-10">
                    <div className="space-y-1 flex w-full flex-col max-w-full">
                        <label htmlFor="email" className="font-semibold">E-mail, Telefone ou Número de Utilizador</label>
                        <input type="text" name="email" id="email" placeholder="Seu número utilizador" className="max-w-full h-12 border bg-indigo-50 rounded-lg pl-4 outline-blue-500 "/>
                    </div>
                    <div className="space-y-1 flex flex-col  w-full">
                        <label htmlFor="password" className="font-semibold">Palavra-passe</label>
                        <input type="password" name="password" id="password" placeholder="........" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                    </div>

                    <button type="submit" className="bg-blue-500 text-white hover:bg-blue-400 w-full h-10 rounded-xl">Entrar</button>
                </form>

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