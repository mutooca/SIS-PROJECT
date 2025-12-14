import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { GoCalendar, GoGear, GoLog, GoPersonAdd, GoPulse } from "react-icons/go";
import z from "zod";

const createNewClinicoSchema = z.object({
    name: z.string(),
    numeroOrdem: z.string(),
    senha: z.string(),
    email: z.email(),
    especialidade: z.string(),
    telefone: z.string()
})

const createNewEspecialidadeSchema = z.object({
    nameEspecialidade: z.string(),
    numeroOrdem: z.string(),
    senha: z.string(),
    email: z.email(),
    especialidade: z.string(),
    telefone: z.string()
})

interface props{
    to: string
    name: string
    icon: ReactElement
}
type newEspecialidadeData = z.infer<typeof createNewEspecialidadeSchema>
type newClinicoData = z.infer<typeof createNewClinicoSchema>
export default function Index(){


    const { register, 
        formState: { errors},
        handleSubmit
    } = useForm({
        resolver: zodResolver(createNewClinicoSchema)}
    )

    async function handleNewClinico (data: newClinicoData)  {
        console.log(data)
    }

    const [role, setRole] = useState<'addAdmin' | 'addClinico' | 'especialidade' | 'marcacao' | 'rcu' | 'config'>('addClinico')
    const [rolePc, setRolePc] = useState<'addNew' | 'update'>('addNew')
    const [roleMarcacao, setRoleMarcacao] = useState<'consulta' | 'exame'>('consulta')

    const handleSubmitRole = (value: 'addAdmin' | 'addClinico' | 'especialidade' | 'marcacao' | 'rcu' | 'config') => {
        setRole(value)
    }
    const handleSubmitRolePc = ( value : 'addNew' | 'update') => {
        setRolePc(value)
    }
    const handleSubmitRoleMarcacao = ( value : 'consulta' | 'exame') => {
        setRoleMarcacao(value)
    }

    
    return (
        <div className="bg-zinc-100">
            <div className="flex items-center justify-between mx-8 py-8">
                <div>
                    <h1 className="font-semibold text-3xl">Painel Administrativo</h1>
                    <p className="text-zinc-600">Bem-vindo, João Silva</p>
                </div>
                 <button className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Sair</button>
            </div>

            <div>
                <div className="grid grid-cols-6 max-w-full gap-4 bg-indigo-50 py-1 px-2 rounded-lg ">
                    <button onClick = {() => handleSubmitRole('addAdmin')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${role === 'addAdmin' ? 'bg-gray-50' : ''}`}><GoPersonAdd />Mais Admin</button>
                    <button onClick = {() => handleSubmitRole('addClinico')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${role === 'addClinico' ? 'bg-gray-50' : ''}`}><GoPersonAdd />Pessoal Clínico</button>
                    <button onClick = {() => handleSubmitRole('especialidade')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${role === 'especialidade' ? 'bg-gray-50' : ''}`}><GoPulse />Especialidades</button>
                    <button onClick = {() => handleSubmitRole('marcacao')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${role === 'marcacao' ? 'bg-gray-50' : ''}`}><GoCalendar />Marcações</button>
                    <button onClick = {() => handleSubmitRole('rcu')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${role === 'rcu' ? 'bg-gray-50' : ''}`}><GoLog />RCU</button>
                    <button onClick = {() => handleSubmitRole('config')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${role === 'config' ? 'bg-gray-50' : ''}`}><GoGear />Configurações</button>
                </div>

                <div className="mx-10 border my-4 bg-white shadow rounded-xl p-5">
                    <div>

                    {
                        role === 'addAdmin' && (
                        <div>
                            <h2 className="font-semibold text-2xl">Gestão de Administradores</h2>
                            <p className="text-zinc-600 mb-6">Adicionar e gerir administradores do sistema</p>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="font-semibold">Nome Completo *</label>
                                    <input
                                    type="text"
                                    placeholder="Nome do administrador"
                                    className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-semibold">E-mail *</label>
                                    <input
                                    type="email"
                                    placeholder="email@exemplo.com"
                                    className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500"
                                    />
                                </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="font-semibold">Telefone</label>
                                    <input
                                    type="text"
                                    placeholder="+244 923 456 789"
                                    className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-semibold">Nível de Acesso</label>
                                    <select className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500">
                                    <option value="full">Acesso Total</option>
                                    <option value="limited">Acesso Limitado</option>
                                    </select>
                                </div>
                                </div>

                                <button className="bg-blue-500 text-white hover:bg-blue-600 w-full h-12 rounded-xl font-semibold transition">
                                Adicionar Administrador
                                </button>
                            </div>
                            </div>
                        )
                    }                     

                    {
                        role === 'addClinico' && (
                            <div>   
                                <h2 className="font-semibold text-xl">Gestão de Pessoal Clínico</h2>
                                <p className="text-zinc-600">Criar e actualizar registos do pessoal clínico</p>

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
                    
                    {
                        role === 'especialidade' && (
                            <div className="space-y-3">
                                <h2 className="font-semibold text-xl">Gestão de Especialidades</h2>
                                <p className="text-zinc-600">Criar especialidades e definir horários</p>

                                 <h3 className="font-semibold text-lg my-8">Nova Especialidade</h3>
                                    <div className=' w-full'>
                                        <div className="space-y-1 flex flex-col w-full">
                                            <label htmlFor="name" className="font-semibold">Nome da Especialidade</label>
                                            <input {...register('especialidade')} type="text" name="especialidade" id="especialidade" placeholder="ex: Dermatologia" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                            {errors.especialidade  && <p className='text-xs text-red-600'>{errors.especialidade.message}</p>}
                                        </div>
                                        <div className="space-y-1 flex flex-col w-full">
                                            <label htmlFor="name" className="font-semibold">Descrição</label>
                                            <input {...register('especialidade')} type="text" name="especialidade" id="especialidade" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                            {errors.especialidade  && <p className='text-xs text-red-600'>{errors.especialidade.message}</p>}
                                        </div>
                                        
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
                                         <div className="space-y-1 flex flex-col w-full">
                                            <label htmlFor="numeroOrdem" className="font-semibold">Dias de Atendimento</label>
                                            <input {...register('numeroOrdem')} type="text" name="numeroOrdem" id="numeroOrdem" placeholder="Ex: Segunda à Sexta" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                            {errors.numeroOrdem  && <p className='text-xs text-red-600'>{errors.numeroOrdem.message}</p>}
                                        </div>

                                        <button type="submit" className="bg-blue-500 text-white mt-8 hover:bg-blue-400 w-full h-10 rounded-xl">Criar Especialidade</button>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-lg my-8">Especialidades Activas</h3>
                                        <div className="flex items-center justify-between border rounded-xl shadow py-4 px-4 ">
                                            <div>
                                                <h3 className="font-semibold">Cardiologia</h3>

                                                <div className="text-zinc-700">
                                                    <p>Segunda a Sexta: 09:00 - 17:00</p>
                                                </div>
                                                
                                            </div>

                                            <button className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Editar</button>
                                        </div>
                                        
                                    </div>
                            </div>
                        )
                    }

                    {
                        role === 'marcacao' && (
                            <div>
                                <h2 className="font-semibold text-xl">Gestão de Marcações</h2>
                                <p className="text-zinc-600">Gerir marcações de consultas e exames</p>

                                <div className="grid grid-cols-2 gap-2 bg-indigo-50 py-1 px-2 rounded-lg my-4">
                                    <button onClick={() => handleSubmitRoleMarcacao('consulta')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${roleMarcacao === 'consulta' ? 'bg-gray-50' : ''}`}>Consultas</button>
                                    <button onClick={() => handleSubmitRoleMarcacao('exame')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${roleMarcacao === 'exame' ? 'bg-gray-50' : ''}`}>Exames</button>
                                </div>

                                {roleMarcacao === 'consulta' && (
                                    <div className="space-y-4">

                                    <div className="space-y-3 border rounded-xl shadow py-4 px-4">
                                        <div className="flex items-center justify-between ">
                                            <div>
                                                <h2 className="font-semibold text-lg">João Pedro Silva - Nº 123456</h2>

                                                <div className="text-zinc-700">
                                                    <p>Cardiologia - Dr. João Silva</p>
                                                    <p>15/12/2025 às 10:00</p>
                                                    <p><span className="font-semibold">Contacto:</span> 923456789</p>
                                                </div>
                                                
                                            </div>

                                            <div className="flex items-center justify-center gap-2">
                                                <button className="hover:bg-blue-500 transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Reagendar</button>
                                                <button className="hover:bg-red-600 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2  bg-red-500 text-white border-2 border-red-500" >Cancelar</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3 border rounded-xl shadow py-4 px-4">
                                        <div className="flex items-center justify-between ">
                                            <div>
                                                <h2 className="font-semibold text-lg">Ana Costa - Nº 789012</h2>

                                                <div className="text-zinc-700">
                                                    <p>Pediatria - Dra. Maria Santos</p>
                                                    <p>15/12/2025 às 14:30</p>
                                                    <p><span className="font-semibold">Contacto:</span> 924567890</p>
                                                </div>
                                                
                                            </div>

                                            <div className="flex items-center justify-center gap-2">
                                                <button className="hover:bg-blue-500 transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Reagendar</button>
                                                <button className="hover:bg-red-600 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2  bg-red-500 text-white border-2 border-red-500" >Cancelar</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                )}
                                {roleMarcacao === 'exame' && (
                                    <div className="space-y-4">

                                    <div className="space-y-3 border rounded-xl shadow py-4 px-4">
                                        <div className="flex items-center justify-between ">
                                            <div>
                                                <h2 className="font-semibold text-lg">Maria Santos - Nº 456789</h2>

                                                <div className="text-zinc-700">
                                                    <p>Radiografia (Tórax)</p>
                                                    <p>16/12/2025 às 14:00</p>
                                                    <p className="text-yellow-500">⚠️ Requer prescrição médica</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-center gap-2">
                                                <button className="hover:bg-blue-500 transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Reagendar</button>
                                                <button className="hover:bg-red-600 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2  bg-red-500 text-white border-2 border-red-500" >Cancelar</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                )}
                            </div>
                        )
                    }
                       
                    </div>
                </div>
               
            </div>
        </div>
    )
}