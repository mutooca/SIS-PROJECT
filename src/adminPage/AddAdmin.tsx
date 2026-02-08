import { z } from "zod";
import TitleGestao from "../components/TitleGestao";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const sanitizeName = (value: string) => {
  if (!value) return '';
  return value.trim().replace(/\s+/g, ' ').replace(/[^A-Za-zÀ-ÿ\s]/g, '').slice(0, 100);
}

const sanitizeNumberString = (value: string) => {
  if (!value) return '';
  return value.replace(/\D/g, '').slice(0, 20);
}

const sanitizeEmail = (value: string) => {
  if (!value) return '';
  return value.trim().toLowerCase().replace(/\s/g, '') // Remove espaços.replace(/[<>'"]/g, '') // Remove caracteres perigosos.slice(0, 254); // Tamanho máximo RFC 5321
}

const usuarioSchema = z.object({
    nome: z.string().min(1, 'O nome é obrigatório').transform(sanitizeName).refine(val => val.length > 0, 'O nome não pode estar vazio após sanitização')
      .pipe(  z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').max(100, 'O nome é demasiado longo').regex(/^[A-Za-zÀ-ÿ\s]+$/, 'O nome contém caracteres inválidos')
      .refine(  val => val.split(' ').length >= 2,  'Informe o nome completo (nome e sobrenome)').refine(  val => !val.match(/(.)\1{3,}/),  'O nome contém repetições suspeitas de caracteres')),
    
      senha: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres').max(64, 'A senha é demasiado longa')
      .regex(  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,  'A senha deve conter: maiúscula, minúscula, número e caractere especial (@$!%*?&#)')
      .refine(  val => !val.match(/(.)\1{2,}/),  'A senha não pode ter caracteres repetidos consecutivamente').refine(  val => !['12345678', 'password', 'senha123', 'admin123']
        .some(weak => val.toLowerCase().includes(weak)  ),  'A senha é muito fraca. Evite sequências comuns'),
    
      email: z.string().min(1, 'O e-mail é obrigatório').transform(sanitizeEmail).refine(val => val.length > 0, 'O e-mail não pode estar vazio')
      .pipe(z.string().email('Insira um e-mail válido').max(254, 'O e-mail é demasiado longo').regex(  /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,  'Formato de e-mail inválido')
      .refine(  val => !val.includes('..'),  'E-mail não pode conter pontos consecutivos').refine(  val => val.split('@')[0].length <= 64,  'A parte local do e-mail é demasiado longa')),
    
    nivelAcesso: z.enum(['total' , 'limitado'], 'Seleccione um nível de acesso'),
      telefone: z.string().min(1, 'O telefone é obrigatório').transform(sanitizeNumberString).refine(val => val.length > 0, 'O telefone não pode estar vazio')
      .pipe(  z.string().length(9, 'O telefone deve ter exatamente 9 dígitos').regex(/^9[0-9]{8}$/, 'Número de telefone inválido (deve começar com 9)')
      .refine(  val => !val.match(/^(.)\1{8}$/),  'Número de telefone inválido (dígitos repetidos)')),
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