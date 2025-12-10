import { CiHeart } from 'react-icons/ci';
import { GoArrowLeft } from "react-icons/go";
import { Link } from 'react-router-dom';
export default function Registar(){
    return(
         <div className="max-w-full max-h-full bg-indigo-50 py-8">
            <div className='flex items-center mb-8 justify-between max-w-2xl mx-auto'>
                <button className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2" >
                    <GoArrowLeft />Voltar</button>
                
                <div className="flex items-center justify-center gap-2">
                    <div className="bg-blue-400 p-1 rounded-2xl flex items-center justify-center">
                        <CiHeart size={30} className="text-blue-400 bg-white rounded-xl" />
                    </div>
                    <Link to={'/'}><h1 className="text-blue-400 font-bold text-2xl">SIS - PDC.AO</h1></Link>
                </div>
            </div>
    
            <div className="justify-center rounded-xl bg-white py-8 shadow flex items-center flex-col border h-full max-w-2xl m-auto space-y-3">
                <div className="space-y-3 w-full px-10">
                    <h1 className="font-bold text-2xl text-center ">Registo de Utente</h1>
                    <p className="text-zinc-600 text-center">Preencha os dados abaixo para criar sua conta no sistema</p>

                </div>
                
                <form action="" className="space-y-3 w-full justify-center flex items-center flex-col px-10">
                    <div className="space-y-1 flex w-full flex-col max-w-full">
                        <h2 className='font-semibold pb-2 border-b mb-4 text-xl'>Dados de Acesso </h2>
                        <label htmlFor="email" className="font-semibold">E-mail *</label>
                        <input type="text" name="email" id="email" placeholder="Seu e-mail" className="max-w-full h-12 border bg-indigo-50 rounded-lg pl-4 outline-blue-500 "/>
                    </div>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="password" className="font-semibold">Palavra-passe *</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="password" className="font-semibold">Confirmar Palavra-passe *</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        </div>
                    </div>
                    
                    <div className="space-y-1 flex w-full flex-col max-w-full">
                        <h2 className='font-semibold pb-2 border-b mb-4 text-xl'>Dados Pessoais</h2>
                        <label htmlFor="name" className="font-semibold">Nome Completo *</label>
                        <input type="text" name="name" id="name" placeholder="Seu nome completo" className="max-w-full h-12 border bg-indigo-50 rounded-lg pl-4 outline-blue-500 "/>
                    </div>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="date" className="font-semibold">Data de Nascimento *</label>
                            <input type="date" name="date" id="date" placeholder="dd/mm/aaaa" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="telefone" className="font-semibold">Telefone *</label>
                            <input type="text" name="telefone" id="telefone" placeholder="+244 923 123 456" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        </div>
                    </div>
                    
                    <div className="space-y-1 flex w-full flex-col max-w-full">
                        <h2 className='font-semibold pb-2 border-b mb-4 text-xl'>Endereço</h2>
                        <label htmlFor="endereco" className="font-semibold">Morada *</label>
                        <input type="text" name="endereco" id="endereco" placeholder="Morada" className="max-w-full h-12 border bg-indigo-50 rounded-lg pl-4 outline-blue-500 "/>
                    </div>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="localidade" className="font-semibold">Localidade *</label>
                            <input type="text" name="localidade" id="localidade" placeholder="Cidade" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="codigoPostal" className="font-semibold">Código Postal</label>
                            <input type="text" name="codigoPostal" id="codigoPostal" placeholder="0000-000" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        </div>
                    </div>
                    

                    <button type="submit" className="bg-blue-500 text-white hover:bg-blue-400 w-full h-10 rounded-xl">Criar Conta</button>
                </form>

                <div>
                    <p className="text-zinc-700">Já tem uma conta?<Link to={'/entrar'} className="text-blue-600 font-semibold hover:underline"> Entrar</Link> </p>
                </div>
                
            </div> 
           
        </div>
    )
}