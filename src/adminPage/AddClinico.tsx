import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TitleGestao from "../components/TitleGestao";

const createNewClinicoSchema = z.object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    numeroOrdem: z.string().min(3, 'O número de ordem deve ter no mínimo 3 caracteres'),
    senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    email: z.email('Insira um e-mail válido'),
    especialidade: z.string().min(1, 'A especialidade é obrigatória'),
    telefone: z.string().min(9, 'O telefone deve ter no exatamente 9 caracteres'),
})

const horarioSchema = z.object({
    horaInicial: z.string().min(1, 'A hora inicial é obrigatória'),
    horaFinal: z.string().min(1, 'A hora final é obrigatória'),
    diasAtendimento: z.array(z.string()).min(1, 'Seleccione pelo menos um dia de atendimento')
})

const clinico = [
    {
        nome: 'Dr. João Silva', numeroOrdem: '12345', especialidade: 'Cardiologia', email: 'joao.silva@hospital.ao', telefone: '923456789', diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta' ,'Sexta'], horaInicio: '09:00' , horaFim: '17:00'
    },
    {
        nome: 'Dra. Maria Santos', numeroOrdem: '67890', especialidade: 'Pediatria', email: 'mariasantos@gmail.com', telefone: '924567890', diasAtendimento: ['Segunda', 'Quarta' ,'Sexta'], horaInicio: '10:00' , horaFim: '18:00'
    },
    {
        nome: 'Dr. Carlos Pereira', numeroOrdem: '11223', especialidade: 'Dermatologia', email: 'carlosperreira@gmail.com', telefone: '925678901', diasAtendimento: ['Terça', 'Quinta'], horaInicio: '08:00' , horaFim: '14:00'
    },
    
]

const especialidades = [
  'Cardiologia',
  'Pediatria',
  'Dermatologia',
  'Ginecologia',
  'Neurologia',
  'Ortopedia',
  'Clínica Geral',
]

type horarioData = z.infer<typeof horarioSchema>
type newClinicoData = z.infer<typeof createNewClinicoSchema>

export default function AddClinico(){
    
    const [clinicoSelecionado, setClinicoSelecionado] = useState<null | typeof clinico[0]>(null)
    const { register: registerClinico, 
        formState: { errors: errorsClinico},
        handleSubmit: handleSubmitClinico
    } = useForm({
        resolver: zodResolver(createNewClinicoSchema)}
    )

    const {
        register: registerHorario, 
        formState: { errors: errorsHorario},
        handleSubmit: handleSubmitHorario
    } = useForm({
        resolver: zodResolver(horarioSchema)}
    ) 

    async function handleHorario (data: horarioData ){
        console.log(data)
    }

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
                <form action={''} onSubmit={handleSubmitClinico(handleNewClinico)} className="space-y-3">
                    <h3 className="font-semibold">Criar Novo Registo</h3>
                    <div className='grid sm:grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="name" className="font-semibold">Nome Completo</label>
                            <input {...registerClinico('name')} type="text" name="name" id="name" placeholder="Informe o nome" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errorsClinico.name  && <p className='text-xs text-red-600'>{errorsClinico.name.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="numeroOrdem" className="font-semibold">Número da Ordem</label>
                            <input {...registerClinico('numeroOrdem')} type="text" name="numeroOrdem" id="numeroOrdem" placeholder="Informe o numero de ordem" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errorsClinico.numeroOrdem  && <p className='text-xs text-red-600'>{errorsClinico.numeroOrdem.message}</p>}
                        </div>
                    </div>
                    <div className='grid sm:grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="especialidade" className="font-semibold">Especialidade</label>

                            <select {...registerClinico('especialidade')} name="especialidade" id="especialidade" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" >
                                <option value="">Selecione a especialidade</option>
                                {
                                    especialidades.map((especialidade) => (
                                        <option key={especialidade} value={especialidade}>{especialidade}</option>
                                    ))
                                }
                            </select>
                            {errorsClinico.especialidade  && <p className='text-xs text-red-600'>{errorsClinico.especialidade.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="telefone" className="font-semibold">Telefone</label>
                            <input {...registerClinico('telefone')} type="text" name="telefone" id="telefone" placeholder="+244 912 345 678" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errorsClinico.telefone  && <p className='text-xs text-red-600'>{errorsClinico.telefone.message}</p>}
                        </div>
                    </div>
                    <div className='grid sm:grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="email" className="font-semibold">E-mail</label>
                            <input {...registerClinico('email')} type="email" name="email" id="email" placeholder="pessoalclinico@mail.com" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errorsClinico.email  && <p className='text-xs text-red-600'>{errorsClinico.email.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="senha" className="font-semibold">Senha Inicial</label>
                            <input {...registerClinico('senha')} type="password" name="senha" id="senha" placeholder="••••••••" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errorsClinico.senha  && <p className='text-xs text-red-600'>{errorsClinico.senha.message}</p>}
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white mt-8 hover:bg-blue-400 w-full h-10 rounded-xl">Registar Clínico</button>
                    
                </form>
                <div className="my-8 border-t"></div>
                <form action={''} onSubmit={handleSubmitHorario(handleHorario)} className="space-y-3">
                    <h3 className="font-semibold">Definir Horário para Novo Clínico</h3>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="horaInicial" className="font-semibold">Novo Início</label>
                            <input {...registerHorario('horaInicial')} type="time" name="horaInicial" id="horaInicial" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errorsHorario.horaInicial  && <p className='text-xs text-red-600'>{errorsHorario.horaInicial.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="horaFinal" className="font-semibold">Novo Fím</label>
                            <input {...registerHorario('horaFinal')} type="time" name="horaFinal" id="horaFinal" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errorsHorario.horaFinal  && <p className='text-xs text-red-600'>{errorsHorario.horaFinal.message}</p>}
                        </div>
                    </div> 
                    <div className="space-y-2 flex flex-col w-full">
                        <label htmlFor="" className="font-semibold">Definir Dias de Atendimento</label>
                        <div className="grid grid-cols-3 gap-2 font-semibold">
                            {
                                ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map(dia =>
                                    (
                                        <label  key={dia} className="flex items-center gap-2 border-r">
                                            <input {...registerHorario('diasAtendimento')} type="checkbox" value={dia}  />
                                            {dia}
                                        </label>
                                    )
                                )
                            }
                            
                        </div>
                        {errorsHorario.diasAtendimento  && <p className='text-xs text-red-600'>{errorsHorario.diasAtendimento.message}</p>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white mt-8 hover:bg-blue-400 w-full h-10 rounded-xl">Definir Horário</button>
                </form>

            </div>
        )
            
    }
        {
            rolePc === 'update' && (
                <div className="space-y-4">
                    {
                        clinico.map((item, index) => (
                        <form key={index} className="space-y-3 border rounded-xl shadow py-4 px-4">
                            <div className="flex items-center justify-between ">
                                <div>
                                    <h2 className="font-semibold text-lg">{item.nome}</h2>

                                    <div className="text-zinc-700">
                                        <p>{item.especialidade} - Nº Ordem: {item.numeroOrdem}</p>
                                        <p>{item.email} | <br /> Contacto: {item.telefone}</p>
                                        <p>Horário: {item.diasAtendimento.map(item => item.concat(', '))} {item.horaInicio} - {item.horaFim}</p>
                                    </div>
                                </div>
                                <button type="button" onClick={() => setClinicoSelecionado(item)} className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400" >Editar</button>
                            </div>
                           
                            <h3 className="font-semibold">Actualizar Horário</h3>
                            <div className='grid grid-cols-2 gap-4 w-full'>
                                <div className="space-y-1 flex flex-col w-full">
                                    <label htmlFor="horaInicial" className="font-semibold">Novo Início</label>
                                    <input {...registerHorario('horaInicial')} type="time" name="horaInicial" id="horaInicial" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                    {errorsHorario.horaInicial  && <p className='text-xs text-red-600'>{errorsHorario.horaInicial.message}</p>}
                                </div>
                                <div className="space-y-1 flex flex-col w-full">
                                    <label htmlFor="horaFinal" className="font-semibold">Novo Fím</label>
                                    <input {...registerHorario('horaFinal')} type="time" name="horaFinal" id="horaFinal" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                    {errorsHorario.horaFinal  && <p className='text-xs text-red-600'>{errorsHorario.horaFinal.message}</p>}
                                </div>
                            </div> 
                            <div className="space-y-2 flex flex-col w-full">
                                <label htmlFor="numeroOrdem" className="font-semibold">Definir Dias de Atendimento</label>
                                <div className="grid grid-cols-3 gap-2 font-semibold">
                                    {
                                        ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map(dia =>
                                            (
                                                <label  key={dia} className="flex items-center gap-2 border-r">
                                                    <input {...registerHorario('diasAtendimento')} type="checkbox" value={dia}  />
                                                    {dia}
                                                </label>
                                            )
                                        )
                                    }
                                    
                                </div>
                                {errorsHorario.diasAtendimento  && <p className='text-xs text-red-600'>{errorsHorario.diasAtendimento.message}</p>}
                            </div>
                            <button type="submit" className="bg-blue-500 text-white mt-8 hover:bg-blue-400 w-full h-10 rounded-xl">Actualizar Horário</button>
                    </form>
                        ))
                    }
                   
                </div>
                
            )
        }

            {
                clinicoSelecionado && (
                    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
                        <div className="bg-white rounded-xl max-h-full w-full max-w-2xl p-6 mx-4 overflow-y-auto">
                            <div className="flex items.center justify-between mb-8">
                                <h2 className="text-2xl font-semibold">Editar Informações de {clinicoSelecionado.nome}</h2>
                                <button onClick={() => setClinicoSelecionado(null)} className="text-gray-500 hover:text-gray-700 float-right text-2xl font-bold">&times;</button>
                            </div>
                            <form action={''} onSubmit={handleSubmitClinico(handleNewClinico)} className="space-y-3">
                                <div className='grid sm:grid-cols-2 gap-4 w-full'>
                                    <div className="space-y-1 flex flex-col w-full">
                                        <label htmlFor="name" className="font-semibold">Nome Completo</label>
                                        <input defaultValue={clinicoSelecionado.nome} {...registerClinico('name')} type="text" name="name" id="name" placeholder="Informe o nome" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                        {errorsClinico.name  && <p className='text-xs text-red-600'>{errorsClinico.name.message}</p>}
                                    </div>
                                    <div className="space-y-1 flex flex-col w-full">
                                        <label htmlFor="numeroOrdem" className="font-semibold">Número da Ordem</label>
                                        <input defaultValue={clinicoSelecionado.numeroOrdem} {...registerClinico('numeroOrdem')} type="text" name="numeroOrdem" id="numeroOrdem" placeholder="Informe o numero de ordem" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                        {errorsClinico.numeroOrdem  && <p className='text-xs text-red-600'>{errorsClinico.numeroOrdem.message}</p>}
                                    </div>
                                </div>
                                <div className='grid sm:grid-cols-2 gap-4 w-full'>
                                    <div className="space-y-1 flex flex-col w-full">
                                        <label htmlFor="especialidade" className="font-semibold">Especialidade</label>
                                        <select defaultValue={clinicoSelecionado.especialidade} {...registerClinico('especialidade')} name="especialidade" id="especialidade" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" >
                                            <option value="">Selecione a especialidade</option>
                                            {
                                                especialidades.map((especialidade) => (
                                                    <option key={especialidade} value={especialidade}>{especialidade}</option>
                                                ))
                                            }
                                        </select>
                                        {errorsClinico.especialidade  && <p className='text-xs text-red-600'>{errorsClinico.especialidade.message}</p>}
                                    </div>
                                    <div className="space-y-1 flex flex-col w-full">
                                        <label htmlFor="telefone" className="font-semibold">Telefone</label>
                                        <input defaultValue={clinicoSelecionado.telefone} {...registerClinico('telefone')} type="text" name="telefone" id="telefone" placeholder="+244 912 345 678" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                        {errorsClinico.telefone  && <p className='text-xs text-red-600'>{errorsClinico.telefone.message}</p>}
                                    </div>
                                </div>
                                <div className='grid gap-4 w-full'>
                                    <div className="space-y-1 flex flex-col w-full">
                                        <label htmlFor="email" className="font-semibold">E-mail</label>
                                        <input defaultValue={clinicoSelecionado.email} {...registerClinico('email')} type="email" name="email" id="email" placeholder="pessoalclinico@gmail.com" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                        {errorsClinico.email  && <p className='text-xs text-red-600'>{errorsClinico.email.message}</p>}
                                    </div>
                                </div>
                                <div className="flex items-center justify-end mt-6 gap-4">
                                    <button type="submit" className="bg-blue-500 text-white hover:bg-blue-400 w-full h-10 rounded-xl">Actualizar Clínico</button>
                                    <button onClick={() => setClinicoSelecionado(null)} type="button" className="bg-gray-300 text-black hover:bg-gray-400 w-32 h-10 rounded-xl">Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            </div>
        )
}