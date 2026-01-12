
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import TitleGestao from "../components/TitleGestao";
import { FiCheck, FiEdit, FiTrash, FiXCircle } from "react-icons/fi";
import { useState } from "react";

const createNewEspecialidadeSchema = z.object({
    nome: z.string().min(3, 'O nome da especialidade é obrigatório'),
    numeroOrdem: z.string().min(3, 'O número de ordem é obrigatório'),
    descricao: z.string().min(10, 'A descrição deve ter no mínimo 10 caracteres'),
    senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    email: z.email('Insira um e-mail válido'),
    telefone: z.string().regex(/^\d{9}$/, 'Insira um número de telefone válido'),
    horaInicial: z.string().min(1, 'A hora inicial é obrigatória'),
    horaFinal: z.string().min(1, 'A hora final é obrigatória'),
    diasAtendimento: z.array(z.string().min(1, 'Seleccione pelo menos um dia de atendimento'))
})

const especialidade = [
    {
        nome: 'Cardiologia', descricao: 'Especialidade médica que se dedica ao estudo, diagnóstico e tratamento das doenças do coração e do sistema circulatório.', diasAtendimento: ['Segunda', 'Terça', 'Quarta', 'Quinta' ,'Sexta'], horaInicio: '09:00' , horaFim: '17:00'
    },
    {
        nome: 'Pediatria', descricao: 'Especialidade médica que se dedica ao cuidado da saúde de crianças e adolescentes, abrangendo desde o nascimento até os 18 anos de idade.', diasAtendimento: ['Segunda', 'Quarta', 'Quinta' ,'Sexta'], horaInicio: '08:00' , horaFim: '16:00'
    },
    {
        nome: 'Dermatologia', descricao: 'Especialidade médica que se concentra no diagnóstico e tratamento das doenças e condições da pele, cabelo e unhas.', diasAtendimento: ['Terça', 'Quarta', 'Sexta'], horaInicio: '10:00' , horaFim: '18:00'
    },
    {
        nome: 'Ortopedia', descricao: 'Especialidade médica que se dedica ao diagnóstico, tratamento e prevenção das doenças e lesões do sistema musculoesquelético, incluindo ossos, articulações, músculos, ligamentos e tendões.', diasAtendimento: ['Segunda', 'Terça', 'Quinta'], horaInicio: '09:00' , horaFim: '15:00'
    },
    {
        nome: 'Neurologia', descricao: 'Especialidade médica que se concentra no diagnóstico e tratamento das doenças do sistema nervoso, incluindo o cérebro, a medula espinhal e os nervos periféricos.', diasAtendimento: ['Quarta', 'Quinta' ,'Sexta'], horaInicio: '11:00' , horaFim: '19:00'
    }
]

type newEspecialidadeData = z.infer<typeof createNewEspecialidadeSchema>

export default function EspecialidadeAdmin (){

     
        const { register, 
            formState: { errors},
            handleSubmit
        } = useForm({
            resolver: zodResolver(createNewEspecialidadeSchema)}
        )

        
    async function handleNewEspecialidade (data: newEspecialidadeData)  {
        console.log(data)
    }

    const [especialidades, setEspecialidades] = useState(
        especialidade.map(e => ({ ...e, activa: true}))
    )

    function handleEspecialidadeActiva(index: number){
        setEspecialidades(prev => (
            prev.map((item, i) => (
                i === index ? {...item, activa: !item.activa} : (item)
            ))
        ))
    }

    return (
        <div className="space-y-3">
            <TitleGestao title="Gestão de Especialidades" p="Criar especialidades e definir horários"/>
            
                <h3 className="font-semibold text-lg my-8">Nova Especialidade</h3>
                <form className=' w-full' onSubmit={handleSubmit(handleNewEspecialidade)}>
                    <div className="space-y-1 flex flex-col w-full">
                        <label htmlFor="name" className="font-semibold">Nome da Especialidade</label>
                        <input {...register('nome')} type="text" name="nome" id="nome" placeholder="ex: Dermatologia" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        {errors.nome  && <p className='text-xs text-red-600'>{errors.nome.message}</p>}
                    </div>
                    <div className="space-y-1 flex flex-col w-full">
                        <label htmlFor="descricao" className="font-semibold">Descrição</label>
                        <textarea rows={3} {...register('descricao')} name="descricao" id="descricao" className="max-w-full border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" placeholder="Descrição da especialidade" />
                        {errors.descricao  && <p className='text-xs text-red-600'>{errors.descricao.message}</p>}
                    </div>
                    
                        <div className='grid grid-cols-2 gap-4 w-full'>
                            
                            <div className="space-y-1 flex flex-col w-full">
                                <label htmlFor="horaInicial" className="font-semibold">Horario do Inicio</label>
                                <input {...register('horaInicial')} type="time" name="horaInicial" id="horaInicial" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                {errors.horaInicial  && <p className='text-xs text-red-600'>{errors.horaInicial.message}</p>}
                            </div>
                            <div className="space-y-1 flex flex-col w-full">
                                <label htmlFor="horaFinal" className="font-semibold">Horario do fim</label>
                                <input {...register('horaFinal')} type="time" name="horaFinal" id="horaFinal" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                                {errors.horaFinal  && <p className='text-xs text-red-600'>{errors.horaFinal.message}</p>}
                            </div>
                        </div> 
                    <div className="space-y-2 flex flex-col w-full">
                        <label htmlFor="" className="font-semibold">Definir Dias de Atendimento</label>
                        <div className="grid grid-cols-3 gap-2 font-semibold">
                            {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map(day => (
                                
                                <label key={day} htmlFor={day} className="flex items-center gap-2">
                                    <input {...register('diasAtendimento')} type="checkbox" name={day} id={day} />
                                    {day}
                                </label>
                            ))
                            }
                        </div>
                        {errors.diasAtendimento  && <p className='text-xs text-red-600'>{errors.diasAtendimento.message}</p>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white mt-8 hover:bg-blue-400 w-full h-10 rounded-xl">Criar Especialidade</button>
                </form>

                <div className="space-y-3">
                    <h3 className="font-semibold text-xl my-8">Especialidades Activas</h3>
                    {
                        especialidades.map((item, index) => (
                        <div key={index} className="border rounded-xl shadow py-4 px-4 ">
                            <div>
                                <h3 className="font-semibold text-lg">{item.nome}</h3>

                                <div className="text-zinc-700 space-y-2">
                                    <p><span className="font-semibold">Descrição: </span>{item.descricao}</p>
                                    <p><span className="font-semibold">Dias de Atendimento: </span>{item.diasAtendimento.map(item => item.concat(', '))} {item.horaInicio} - {item.horaFim}</p>
                                </div>
                                
                            </div>
                            <div className="flex gap-2 items-center ">
                                <button onClick={() => handleEspecialidadeActiva(index)} className={`max-w-full transition my-2 py-1 px-2 rounded-full text-center font-semibold 
                                ${item.activa ? 
                                    'hover:bg-green-200 bg-green-100' : 
                                    'hover:bg-gray-200 bg-gray-100'} `}>{
                                   item.activa ? 
                                   <span className=" flex items-center gap-2"> <FiCheck/> Activado</span> : 
                                   <span className=" flex items-center gap-2"> <FiXCircle/> Desactivado</span>
                                    }</button>
                                <button className="hover:bg-red-200 transition my-2 py-1 px-2 rounded-full text-center font-semibold flex items-center gap-2 bg-red-100" ><FiTrash/> Eliminar</button>
                                <button className="hover:bg-blue-200 transition my-2 py-1 px-2 rounded-full text-center font-semibold flex items-center gap-2 bg-blue-100" ><FiEdit/>Editar</button>
                            </div>
                        </div>
                        
                        ))
                    }
                    
                </div>
        </div>
    )
}