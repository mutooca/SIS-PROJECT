import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import TitleGestao from "../components/TitleGestao";

const createNewClinicoSchema = z.object({
    name: z.string(),
    numeroOrdem: z.string(),
    senha: z.string(),
    email: z.email(),
    especialidade: z.string(),
    telefone: z.string()
})

type newClinicoData = z.infer<typeof createNewClinicoSchema>
export default function AddClinico(){
    
    const { register, 
        formState: { errors},
        handleSubmit
    } = useForm({
        resolver: zodResolver(createNewClinicoSchema)}
    )

    async function handleNewClinico (data: newClinicoData)  {
        console.log(data)
    }

    const [rolePc, setRolePc] = useState<'addNew' | 'update'>('addNew')
    const handleSubmitRolePc = ( value : 'addNew' | 'update') => {
        setRolePc(value)
    }
    return (
            <div>   
                <TitleGestao title="Gestão de Pessoal Clínico" p="Criar e actualizar registos do pessoal clínico"/>

                <div className="grid grid-cols-2 gap-2 bg-indigo-50 py-1 px-2 rounded-lg my-4">
                    <button onClick={() => handleSubmitRolePc('addNew')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${rolePc === 'addNew' ? 'bg-gray-50' : ''}`}>Criar Novo</button>
                    <button onClick={() => handleSubmitRolePc('update')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${rolePc === 'update' ? 'bg-gray-50' : ''}`}>Gerir Existentes</button>
                </div>
                    { rolePc === 'addNew' && (
                <div>
                <form action={''} onSubmit={handleSubmit(handleNewClinico)} className="space-y-3">
                    <h3 className="font-semibold">Criar Novo Registo</h3>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="name" className="font-semibold">Nome Completo</label>
                            <input {...register('name')} type="text" name="name" id="name" placeholder="Informe o nome" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.name  && <p className='text-xs text-red-600'>{errors.name.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="numeroOrdem" className="font-semibold">Número da Ordem</label>
                            <input {...register('numeroOrdem')} type="text" name="numeroOrdem" id="numeroOrdem" placeholder="Informe o numero de ordem" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.numeroOrdem  && <p className='text-xs text-red-600'>{errors.numeroOrdem.message}</p>}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="name" className="font-semibold">Especialidade</label>
                            <input {...register('especialidade')} type="text" name="especialidade" id="especialidade" placeholder="Informe a especialidade" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.especialidade  && <p className='text-xs text-red-600'>{errors.especialidade.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="telefone" className="font-semibold">Telefone</label>
                            <input {...register('telefone')} type="text" name="telefone" id="telefone" placeholder="+244 912 345 678" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.telefone  && <p className='text-xs text-red-600'>{errors.telefone.message}</p>}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="email" className="font-semibold">E-mail</label>
                            <input {...register('especialidade')} type="email" name="email" id="email" placeholder="pessoalclinico@mail.com" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.email  && <p className='text-xs text-red-600'>{errors.email.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="senha" className="font-semibold">Senha Inicial</label>
                            <input {...register('senha')} type="password" name="senha" id="senha" placeholder="••••••••" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.senha  && <p className='text-xs text-red-600'>{errors.senha.message}</p>}
                        </div>
                    </div>

                    <h3 className="font-semibold">Definir Horário</h3>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="name" className="font-semibold">Novo Início</label>
                            <input {...register('name')} type="time" name="name" id="name" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.name  && <p className='text-xs text-red-600'>{errors.name.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="numeroOrdem" className="font-semibold">Novo Fím</label>
                            <input {...register('numeroOrdem')} type="time" name="numeroOrdem" id="numeroOrdem" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.numeroOrdem  && <p className='text-xs text-red-600'>{errors.numeroOrdem.message}</p>}
                        </div>
                    
                    </div> 
                    <div className="space-y-1 flex flex-col w-full">
                        <label htmlFor="numeroOrdem" className="font-semibold">Dias de Atendimento</label>
                        <input {...register('numeroOrdem')} type="text" name="numeroOrdem" id="numeroOrdem" placeholder="Ex: Segunda à Sexta" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        {errors.numeroOrdem  && <p className='text-xs text-red-600'>{errors.numeroOrdem.message}</p>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white mt-8 hover:bg-blue-400 w-full h-10 rounded-xl">Criar Registo Completo</button>
                    
                </form>
            </div>
        )
            
        }
        {
            rolePc === 'update' && (
                <div className="space-y-4">
                    <div className="space-y-3 border rounded-xl shadow py-4 px-4">
                        <div className="flex items-center justify-between ">
                            <div>
                                <h2 className="font-semibold text-lg">Dr. João Silva</h2>

                                <div className="text-zinc-700">
                                    <p>Cardiologia - Nº Ordem: 12345</p>
                                    <p>joao.silva@hospital.ao | Tel: 923456789</p>
                                    <p>Horário: Segunda a Sexta, 09:00 - 17:00</p>
                                </div>
                                
                            </div>

                            <button className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Editar</button>
                        </div>
                        

                        <h3 className="font-semibold">Actualizar Horário</h3>
                        <div className='grid grid-cols-2 gap-4 w-full'>
                            <div className="space-y-1 flex flex-col w-full">
                                <label htmlFor="name" className="font-semibold">Horário de Início</label>
                                <input {...register('name')} type="time" name="name" id="name" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                {errors.name  && <p className='text-xs text-red-600'>{errors.name.message}</p>}
                            </div>
                            <div className="space-y-1 flex flex-col w-full">
                                <label htmlFor="numeroOrdem" className="font-semibold">Novo Fím</label>
                                <input {...register('numeroOrdem')} type="time" name="numeroOrdem" id="numeroOrdem" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                {errors.numeroOrdem  && <p className='text-xs text-red-600'>{errors.numeroOrdem.message}</p>}
                            </div>
                        </div> 
                        <button type="submit" className="bg-blue-500 text-white mt-8 hover:bg-blue-400 w-full h-10 rounded-xl">Actualizar Horário</button>
                    </div>

                    <div className="space-y-3 border rounded-xl shadow py-4 px-4">
                        <div className="flex items-center justify-between ">
                            <div>
                                <h2 className="font-semibold text-lg">Dra. Maria Santos</h2>

                                <div className="text-zinc-700">
                                    <p>Pediatria - Nº Ordem: 67890</p>
                                    <p>maria.santos@hospital.ao | Tel: 924567890</p>
                                    <p>Horário: Segunda a Sexta, 10:00 - 18:00</p>
                                </div>
                                
                            </div>

                            <button className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Editar</button>
                        </div>
                        

                        <h3 className="font-semibold">Actualizar Horário</h3>
                        <div className='grid grid-cols-2 gap-4 w-full'>
                            <div className="space-y-1 flex flex-col w-full">
                                <label htmlFor="name" className="font-semibold">Novo Início</label>
                                <input {...register('name')} type="time" name="name" id="name" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                {errors.name  && <p className='text-xs text-red-600'>{errors.name.message}</p>}
                            </div>
                            <div className="space-y-1 flex flex-col w-full">
                                <label htmlFor="numeroOrdem" className="font-semibold">Horario do fim</label>
                                <input {...register('numeroOrdem')} type="time" name="numeroOrdem" id="numeroOrdem" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                {errors.numeroOrdem  && <p className='text-xs text-red-600'>{errors.numeroOrdem.message}</p>}
                            </div>
                        </div> 
                        <button type="submit" className="bg-blue-500 text-white mt-8 hover:bg-blue-400 w-full h-10 rounded-xl">Actualizar Horário</button>
                    </div>

                </div>
                
            )
        }
            </div>
        )
}