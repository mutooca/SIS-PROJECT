import { z } from "zod";
import TitleGestao from "../components/TitleGestao";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const usuarioSchema = z.object({
    nome: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    email: z.email('Insira um e-mail válido'),
    nivelAcesso: z.enum(['total' , 'limitado'], 'Seleccione um nível de acesso'),
    telefone: z.string().regex(/^\d{9}$/, 'Insira um número de telefone válido')
})

type usuarioData  = z.infer<typeof usuarioSchema>

export default function addAdmin(){

    const {
        register,
        formState: { errors},
        handleSubmit
    } = useForm({
        resolver: zodResolver(usuarioSchema)})

    async function handleNewAdmin(data: usuarioData){
        console.log(data)
    }
    return(
         <div>
            <TitleGestao title="Gestão de Administradores" p="Adicionar e gerir administradores do sistema"/>
            <form onSubmit={handleSubmit(handleNewAdmin)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="font-semibold">Nome Completo</label>
                        <input {...register('nome')} type="text" placeholder="Nome do administrador" className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500" />
                        {errors.nome && <p className='text-xs text-red-600'>{errors.nome.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <label className="font-semibold">E-mail</label>
                        <input {...register('email')} type="email" placeholder="email@exemplo.com" className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500" />
                        {errors.email && <p className='text-xs text-red-600'>{errors.email.message}</p>}
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="font-semibold">Telefone</label>
                        <input {...register('telefone')} type="text" placeholder="+244 923 456 789" className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500" />
                        {errors.telefone && <p className='text-xs text-red-600'>{errors.telefone.message}</p>}
                    </div>
                    
                    <div className="space-y-1">
                        <label className="font-semibold">senha</label>
                        <input {...register('senha')} type="password" placeholder="••••••••" className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500" />
                        {errors.senha && <p className='text-xs text-red-600'>{errors.senha.message}</p>}
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="font-semibold">Nível de Acesso</label>
                    <select {...register('nivelAcesso')} className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500">
                    <option value="full">Acesso Total</option>
                    <option value="limited">Acesso Limitado</option>
                    </select>
                    {errors.nivelAcesso && <p className='text-xs text-red-600'>{errors.nivelAcesso.message}</p>}
                </div>
                <button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 w-full h-12 rounded-xl font-semibold transition">Adicionar Administrador</button>
            </form>
        </div>
    )
}