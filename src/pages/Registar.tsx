import { CiHeart } from 'react-icons/ci';
import { GoArrowLeft } from "react-icons/go";
import { Link } from 'react-router-dom';
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const userRegistoSchema = z.object({
    nome: z.coerce.string().min(1, "Preencha este campo.").min(3, 'O nome deve conter no mínimo 3 letras'),
    email: z.email('Verifique o endereço de email'),
    telefone: z.string().length(9, 'O nomero deve ter exatamente 9 digitos'),
    morada: z.string().min(1, "Preencha este campo."),
    data: z.string()
  .min(1, { message: "Preencha este campo." }) 
  .refine(value => !isNaN(Date.parse(value)), {
    message: "Insira uma data válida."
  })
  .transform(value => new Date(value)),
    localidade: z.string('Verifique a localidade').min(1, "Preencha este campo."),
    codigoPostal: z.string(),
    entidadeFinanceira: z.string().min(1, "Preencha este campo."),
    numeroEntidade: z.coerce.string().min(1, "Preencha este campo."),
    password: z.string().min(1, "Preencha este campo.").min(8, 'A palavra-passe deve ter no mínimo 8 caracteres.'),
    passwordConfirm: z.string()
}).refine(data => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Verifique a palavra-passe e tente novamente!'
})

type userRegistoData = z.infer<typeof userRegistoSchema>

async function handleUserRegisto(data: userRegistoData) {

    console.log(data)
}


export default function Registar(){
    const {
        register,
        formState: { errors },
        handleSubmit 
    } = useForm({
        resolver: zodResolver(userRegistoSchema)
    })
    return(
         <div className="max-w-full max-h-full bg-indigo-50 py-8">
            <div className='flex items-center mb-8 justify-between max-w-2xl mx-auto'>
                <Link to={'/'}>
                    <button className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2" >
                    <GoArrowLeft />Voltar</button>
                </Link>
                
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
                
                <form onSubmit={handleSubmit(handleUserRegisto)} action='' className="space-y-3 w-full justify-center flex items-center flex-col px-10">
                    <div className="space-y-1 flex w-full flex-col max-w-full">
                        <h2 className='font-semibold pb-2 border-b mb-4 text-xl'>Dados de Acesso </h2>
                        <label htmlFor="email" className="font-semibold">E-mail *</label>
                        <input {...register('email')} type="text" name="email" id="email" placeholder="Seu e-mail" className="max-w-full h-12 border bg-indigo-50 rounded-lg pl-4 outline-blue-500 "/>
                        {errors.email  && <p className='text-xs text-red-600'>{errors.email.message}</p>}
                    </div>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="password" className="font-semibold">Palavra-passe *</label>
                            <input {...register('password')} type="password" name="password" id="password" placeholder="••••••••" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.password  && <p className='text-xs text-red-600'>{errors.password.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="passwordConfirm" className="font-semibold">Confirmar Palavra-passe *</label>
                            <input {...register('passwordConfirm')} type="password" name="passwordConfirm" id="passwordConfirm" placeholder="••••••••" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.passwordConfirm  && <p className='text-xs text-red-600'>{errors.passwordConfirm.message}</p>}
                        </div>
                    </div>
                    
                    <div className="space-y-1 flex w-full flex-col max-w-full">
                        <h2 className='font-semibold pb-2 border-b mb-4 text-xl'>Dados Pessoais</h2>
                        <label htmlFor="name" className="font-semibold">Nome Completo *</label>
                        <input {...register('nome')} type="text" name="nome" id="nome" placeholder="Seu nome completo" className="max-w-full h-12 border bg-indigo-50 rounded-lg pl-4 outline-blue-500 "/>
                        {errors.nome  && <p className='text-xs text-red-600'>{errors.nome.message}</p>}
                    </div>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="date" className="font-semibold">Data de Nascimento *</label>
                            <input {...register('data')} type="date" name="data" id="data" placeholder="dd/mm/aaaa" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.data  && <p className='text-xs text-red-600'>{errors.data.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="telefone" className="font-semibold">Telefone *</label>
                            <input {...register('telefone')} type="text" name="telefone" id="telefone" placeholder="+244 923 123 456" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.telefone  && <p className='text-xs text-red-600'>{errors.telefone.message}</p>}
                        </div>
                    </div>
                    
                    <div className="space-y-1 flex w-full flex-col max-w-full">
                        <h2 className='font-semibold pb-2 border-b mb-4 text-xl'>Endereço</h2>
                        <label htmlFor="morada" className="font-semibold">Morada *</label>
                        <input {...register('morada')} type="text" name="morada" id="morada" placeholder="Morada" className="max-w-full h-12 border bg-indigo-50 rounded-lg pl-4 outline-blue-500 "/>
                        {errors.morada  && <p className='text-xs text-red-600'>{errors.morada.message}</p>}
                    </div>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="localidade" className="font-semibold">Localidade *</label>
                            <input {...register('localidade')} type="text" name="localidade" id="localidade" placeholder="Cidade" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.localidade  && <p className='text-xs text-red-600'>{errors.localidade.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="codigoPostal" className="font-semibold">Código Postal</label>
                            <input {...register('codigoPostal')} type="text" name="codigoPostal" id="codigoPostal" placeholder="0000-000" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.codigoPostal  && <p className='text-xs text-red-600'>{errors.codigoPostal.message}</p>}
                        </div>
                    </div>
                    <div className="space-y-1 flex w-full flex-col max-w-full">
                        <h2 className='font-semibold pb-2 border-b mb-4 text-xl'>Informação Financeira</h2>
                    </div>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="entidadeFinanceira" className="font-semibold">Entidade Financeira Responsável *</label>
                            <input {...register('entidadeFinanceira')} type="text" name="entidadeFinanceira" id="entidadeFinanceira" placeholder="Seguradora ABC" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.entidadeFinanceira  && <p className='text-xs text-red-600'>{errors.entidadeFinanceira.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="numeroEntidade" className="font-semibold">Número de Utente na Entidade *</label>
                            <input {...register('numeroEntidade')} type="text" name="numeroEntidade" id="numeroEntidade" placeholder="0000000" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.numeroEntidade  && <p className='text-xs text-red-600'>{errors.numeroEntidade.message}</p>}
                        </div>
                    </div>

                    <button type="submit" className="bg-blue-500 text-white mt-8 hover:bg-blue-400 w-full h-10 rounded-xl">Criar Conta</button>
                </form>

                <div>
                    <p className="text-zinc-700">Já tem uma conta?<Link to={'/entrar'} className="text-blue-600 font-semibold hover:underline"> Entrar</Link> </p>
                </div>
                
            </div> 
           
        </div>
    )
}

