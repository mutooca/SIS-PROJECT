
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import TitleGestao from "../components/TitleGestao";
import { FiCheck, FiEdit, FiTrash, FiXCircle } from "react-icons/fi";
import { useState } from "react";

const sanitizeText = (value: string) => {
  if (!value) return '';
  return value.trim().replace(/\s+/g, ' ') .replace(/[<>'"]/g, '') .replace(/javascript:/gi, '') .replace(/on\w+=/gi, '') .slice(0, 500); // Limita tamanho máximo
}

const sanitizeName = (value: string) => {
  if (!value) return '';
  return value.trim().replace(/\s+/g, ' ').replace(/[^A-Za-zÀ-ÿ\s]/g, '').slice(0, 100);
}

const createNewEspecialidadeSchema = z.object({
    nome: z.string().min(1, 'O nome da especialidade é obrigatório').transform(sanitizeName).refine(val => val.length > 0, 'O nome da especialidade não pode estar vazio após sanitização')
      .pipe(  z.string().min(3, 'A especialidade deve ter no mínimo 3 caracteres').max(100, 'O nome da especialidade é demasiado longo').regex(/^[A-Za-zÀ-ÿ\s]+$/, 'O nome contém caracteres inválidos')
        ),
    descricao: z.string().min(1, 'A descrição não pode estar vazia').transform(sanitizeText).refine(val => val.length > 0, 'A descrição não pode estar vazia após sanitização')
      .pipe(z.string().min(10, 'A descrição deve ter no mínimo 10 caracteres').max(50, 'A descrição é demasiado longa')),
    
})

const horarioSchema = z.object({
    horaInicial: z.string().min(1, 'A hora inicial é obrigatória'),
    horaFinal: z.string().min(1, 'A hora final é obrigatória'),
    diasAtendimento: z.array(z.string()).min(1, 'Seleccione pelo menos um dia de atendimento')
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
type horarioData = z.infer<typeof horarioSchema>

export default function EspecialidadeAdmin (){

     
        const { register: registerEspecialidade, 
            formState: { errors: errorsEspecialidade},
            handleSubmit: handleSubmitEspecialidade
        } = useForm({
            resolver: zodResolver(createNewEspecialidadeSchema)}
        )

          const {
                register: registerHorario, 
                formState: { errors: errorsHorario},
                handleSubmit: handleSubmitHorario
            } = useForm({
                resolver: zodResolver(horarioSchema)}
            ) 
        
    async function handleNewEspecialidade (data: newEspecialidadeData)  {
        console.log(data)
    }
        
    async function handleNewHorario (data: horarioData)  {
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
                <form className=' w-full' onSubmit={handleSubmitEspecialidade(handleNewEspecialidade)}>
                    <div className="space-y-1 flex flex-col w-full">
                        <label htmlFor="name" className="font-semibold">Nome da Especialidade</label>
                        <input {...registerEspecialidade('nome')} type="text" name="nome" id="nome" placeholder="ex: Dermatologia" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                        {errorsEspecialidade.nome  && <p className='text-xs text-red-600'>{errorsEspecialidade.nome.message}</p>}
                    </div>
                    <div className="space-y-1 flex flex-col w-full">
                        <label htmlFor="descricao" className="font-semibold">Descrição</label>
                        <textarea rows={3} {...registerEspecialidade('descricao')} name="descricao" id="descricao" className="max-w-full border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" placeholder="Descrição da especialidade" />
                        {errorsEspecialidade.descricao  && <p className='text-xs text-red-600'>{errorsEspecialidade.descricao.message}</p>}
                    </div>
                    
                    <button type="submit" className="bg-blue-500 text-white mt-8 hover:bg-blue-400 w-full h-10 rounded-xl">Criar Especialidade</button>
                </form>
                <h3 className="font-semibold text-lg my-8">Definir Horário de Atendimento</h3>
                <form className=' w-full' onSubmit={handleSubmitHorario(handleNewHorario)}>
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="horaInicial" className="font-semibold">Horario do Inicio</label>
                            <input {...registerHorario('horaInicial')} type="time" name="horaInicial" id="horaInicial" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errorsHorario.horaInicial  && <p className='text-xs text-red-600'>{errorsHorario.horaInicial.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="horaFinal" className="font-semibold">Horario do fim</label>
                            <input {...registerHorario('horaFinal')} type="time" name="horaFinal" id="horaFinal" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errorsHorario.horaFinal  && <p className='text-xs text-red-600'>{errorsHorario.horaFinal.message}</p>}
                        </div>
                    </div> 
                    <div className="space-y-2 flex flex-col w-full">
                        <label htmlFor="" className="font-semibold">Definir Dias de Atendimento</label>
                        <div className="grid grid-cols-3 gap-2 font-semibold">
                            {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map(day => (
                                
                                <label key={day} htmlFor={day} className="flex items-center gap-2">
                                    <input {...registerHorario('diasAtendimento')} type="checkbox" name={day} id={day} />
                                    {day}
                                </label>
                            ))
                            }
                        </div>
                        {errorsHorario.diasAtendimento  && <p className='text-xs text-red-600'>{errorsHorario.diasAtendimento.message}</p>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white mt-8 hover:bg-blue-400 w-full h-10 rounded-xl">Definir Horário</button>
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