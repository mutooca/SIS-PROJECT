
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import TitleGestao from "../components/TitleGestao";

const createNewEspecialidadeSchema = z.object({
    nameEspecialidade: z.string(),
    numeroOrdem: z.string(),
    senha: z.string(),
    email: z.email(),
    especialidade: z.string(),
    telefone: z.string()
})

type newEspecialidadeData = z.infer<typeof createNewEspecialidadeSchema>

export default function EspecialidadeAdmin (){

     
        const { register, 
            formState: { errors},
            handleSubmit
        } = useForm({
            resolver: zodResolver(createNewEspecialidadeSchema)}
        )

        
    async function handleNewClinico (data: newEspecialidadeData)  {
        console.log(data)
    }

    return (
        <div className="space-y-3">
            <TitleGestao title="Gestão de Especialidades" p="Criar especialidades e definir horários"/>
            
                <h3 className="font-semibold text-lg my-8">Nova Especialidade</h3>
                <form className=' w-full' onSubmit={handleSubmit(handleNewClinico)}>
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
                            <input {...register('nameEspecialidade')} type="time" name="nameEspecialidade" id="nameEspecialidade" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                            {errors.nameEspecialidade  && <p className='text-xs text-red-600'>{errors.nameEspecialidade.message}</p>}
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
                </form>

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