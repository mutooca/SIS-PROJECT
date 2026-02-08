import { CiHeart } from 'react-icons/ci';
import { GoArrowLeft } from "react-icons/go";
import { Link } from 'react-router-dom';
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ==================== FUNÇÕES DE SANITIZAÇÃO ====================

const sanitizeText = (value: string) => {
  if (!value) return '';
  return value.trim().replace(/\s+/g, ' ').replace(/[<>'"]/g, '').replace(/javascript:/gi, '').replace(/on\w+=/gi, '').slice(0, 500);
}

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
  return value.trim().toLowerCase().replace(/\s/g, '').replace(/[<>'"]/g, '').slice(0, 254);
}

const sanitizeMorada = (value: string) => {
  if (!value) return '';
  return value.trim().replace(/\s+/g, ' ').replace(/[<>'"]/g, '').slice(0, 200);
}

const sanitizeCodigoPostal = (value: string) => {
  if (!value) return '';
  return value.trim().replace(/[^0-9\-]/g, '').slice(0, 10);
}

// ==================== SCHEMA DE VALIDAÇÃO ====================

const userRegistoSchema = z.object({
  // DADOS DE ACESSO
  email: z.string().min(1, 'O e-mail é obrigatório').transform(sanitizeEmail).refine(val => val.length > 0, 'O e-mail não pode estar vazio')
    .pipe(z.string().email('Insira um e-mail válido').max(254, 'O e-mail é demasiado longo').regex(/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Formato de e-mail inválido')
    .refine(val => !val.includes('..'), 'E-mail não pode conter pontos consecutivos').refine(val => val.split('@')[0].length <= 64, 'A parte local do e-mail é demasiado longa')),

  senha: z.string().min(1, 'A palavra-passe é obrigatória').min(8, 'A palavra-passe deve ter no mínimo 8 caracteres').max(64, 'A palavra-passe é demasiado longa')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/, 'A palavra-passe deve conter: maiúscula, minúscula, número e caractere especial (@$!%*?&#)')
    .refine(val => !val.match(/(.)\1{2,}/), 'A palavra-passe não pode ter caracteres repetidos consecutivamente')
    .refine(val => !['12345678', 'password', 'senha123', 'admin123', 'qwerty123'].some(weak => val.toLowerCase().includes(weak)), 'A palavra-passe é muito fraca. Evite sequências comuns'),

  senhaConfirm: z.string().min(1, 'Confirme a palavra-passe'),

  // DADOS PESSOAIS
  nome: z.string().min(1, 'O nome é obrigatório').transform(sanitizeName).refine(val => val.length > 0, 'O nome não pode estar vazio após sanitização')
    .pipe(z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').max(100, 'O nome é demasiado longo').regex(/^[A-Za-zÀ-ÿ\s]+$/, 'O nome contém caracteres inválidos')
    .refine(val => val.split(' ').length >= 2, 'Informe o nome completo (nome e sobrenome)').refine(val => !val.match(/(.)\1{3,}/), 'O nome contém repetições suspeitas de caracteres')),

  data: z.string().min(1, 'A data de nascimento é obrigatória').refine(val => !isNaN(Date.parse(val)), 'Data inválida').refine(val => new Date(val) <= new Date(), 'Data no futuro').refine(val => {
    const birth = new Date(val)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    ) age--
    return age >= 15
  }, 'É necessário ter pelo menos 15 anos'),

  telefone: z.string().min(1, 'O telefone é obrigatório').transform(sanitizeNumberString).refine(val => val.length > 0, 'O telefone não pode estar vazio')
    .pipe(z.string().length(9, 'O telefone deve ter exatamente 9 dígitos').regex(/^9[0-9]{8}$/, 'Número de telefone inválido (deve começar com 9)')
    .refine(val => !val.match(/^(.)\1{8}$/), 'Número de telefone inválido (dígitos repetidos)')),

  morada: z.string().min(1, "A morada é obrigatória").transform(sanitizeMorada).refine(val => val.length > 0, 'A morada não pode estar vazia')
    .pipe(z.string().min(5, 'A morada deve ter no mínimo 5 caracteres').max(200, 'A morada é demasiado longa')),

  localidade: z.string().min(1, "A localidade é obrigatória").transform(sanitizeText).refine(val => val.length > 0, 'A localidade não pode estar vazia')
    .pipe(z.string().min(2, 'A localidade deve ter no mínimo 2 caracteres').max(100, 'A localidade é demasiado longa')),

  codigoPostal: z.string().transform(sanitizeCodigoPostal)
    .pipe(z.string().regex(/^\d{4}-\d{3}$|^$/, 'Formato de código postal inválido (use 0000-000)'))
    .optional().or(z.literal('')),

  // INFORMAÇÃO FINANCEIRA
  entidadeFinanceira: z.string().min(1, "A entidade financeira é obrigatória").transform(sanitizeText).refine(val => val.length > 0, 'A entidade financeira não pode estar vazia')
    .pipe(z.string().min(2, 'A entidade financeira deve ter no mínimo 2 caracteres').max(100, 'A entidade financeira é demasiado longa')),

  numeroEntidade: z.string().min(1, "O número de utente na entidade é obrigatório").transform(sanitizeNumberString).refine(val => val.length > 0, 'O número de utente não pode estar vazio')
    .pipe(z.string().min(3, 'O número de utente deve ter no mínimo 3 caracteres').max(20, 'O número de utente é demasiado longo')),

}).refine(data => data.senha === data.senhaConfirm, {
  path: ['senhaConfirm'],
  message: 'As palavras-passe não coincidem. Verifique e tente novamente!'
})

type UserRegistoData = z.infer<typeof userRegistoSchema>

export default function Registar(){
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit 
    } = useForm<UserRegistoData>({
        resolver: zodResolver(userRegistoSchema),
        mode: 'onBlur'
    });

    async function handleUserRegisto(data: UserRegistoData) {
        try {
            console.log('Dados validados e sanitizados:', data)
            await new Promise(resolve => setTimeout(resolve, 1000))
            alert('Conta criada com sucesso!')
        } catch (error) {
            console.error('Erro ao criar conta:', error)
            alert('Erro ao criar conta. Tente novamente.')
        }
    }

    return(
         <div className="max-w-full max-h-full bg-indigo-50 p-8">
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
                
                <form onSubmit={handleSubmit(handleUserRegisto)} className="space-y-3 w-full justify-center flex items-center flex-col px-10">
                    <div className="space-y-1 flex w-full flex-col max-w-full">
                        <h2 className='font-semibold pb-2 border-b mb-4 text-xl'>Dados de Acesso </h2>
                        <label htmlFor="email" className="font-semibold">E-mail *</label>
                        <input 
                            {...register('email')} 
                            type="email" 
                            id="email" 
                            placeholder="seuemail@exemplo.com" 
                            className="max-w-full h-12 border bg-indigo-50 rounded-lg pl-4 outline-blue-500"
                            disabled={isSubmitting}
                        />
                        {errors.email && <p className='text-xs text-red-600'>{errors.email.message}</p>}
                    </div>
                    <div className='grid sm:grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="senha" className="font-semibold">Palavra-passe *</label>
                            <input 
                                {...register('senha')} 
                                type="password" 
                                id="password" 
                                placeholder="••••••••" 
                                className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                                disabled={isSubmitting}
                            />
                            {errors.senha && <p className='text-xs text-red-600'>{errors.senha.message}</p>}
                            <p className="text-xs text-gray-500">Mínimo 8 caracteres: maiúscula, minúscula, número e especial</p>
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="passwordConfirm" className="font-semibold">Confirmar Palavra-passe *</label>
                            <input 
                                {...register('senhaConfirm')} 
                                type="password" 
                                id="senhaConfirm" 
                                placeholder="••••••••" 
                                className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                                disabled={isSubmitting}
                            />
                            {errors.senhaConfirm && <p className='text-xs text-red-600'>{errors.senhaConfirm.message}</p>}
                        </div>
                    </div>
                    
                    <div className="space-y-1 flex w-full flex-col max-w-full">
                        <h2 className='font-semibold pb-2 border-b mb-4 text-xl'>Dados Pessoais</h2>
                        <label htmlFor="nome" className="font-semibold">Nome Completo *</label>
                        <input 
                            {...register('nome')} 
                            type="text" 
                            id="nome" 
                            placeholder="João Silva Santos" 
                            className="max-w-full h-12 border bg-indigo-50 rounded-lg pl-4 outline-blue-500"
                            disabled={isSubmitting}
                        />
                        {errors.nome && <p className='text-xs text-red-600'>{errors.nome.message}</p>}
                    </div>
                    <div className='grid sm:grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="data" className="font-semibold">Data de Nascimento *</label>
                            <input 
                                {...register('data')} 
                                type="date" 
                                id="data" 
                                max={new Date().toISOString().split('T')[0]}
                                className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                                disabled={isSubmitting}
                            />
                            {errors.data && <p className='text-xs text-red-600'>{errors.data.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="telefone" className="font-semibold">Telefone *</label>
                            <input 
                                {...register('telefone')} 
                                type="text" 
                                id="telefone" 
                                placeholder="923123456" 
                                maxLength={9}
                                className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                                disabled={isSubmitting}
                            />
                            {errors.telefone && <p className='text-xs text-red-600'>{errors.telefone.message}</p>}
                        </div>
                    </div>
                    
                    <div className="space-y-1 flex w-full flex-col max-w-full">
                        <h2 className='font-semibold pb-2 border-b mb-4 text-xl'>Endereço</h2>
                        <label htmlFor="morada" className="font-semibold">Morada *</label>
                        <input 
                            {...register('morada')} 
                            type="text" 
                            id="morada" 
                            placeholder="Rua ABC, Nº 123, Bairro XYZ" 
                            className="max-w-full h-12 border bg-indigo-50 rounded-lg pl-4 outline-blue-500"
                            disabled={isSubmitting}
                        />
                        {errors.morada && <p className='text-xs text-red-600'>{errors.morada.message}</p>}
                    </div>
                    <div className='grid sm:grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="localidade" className="font-semibold">Localidade *</label>
                            <input 
                                {...register('localidade')} 
                                type="text" 
                                id="localidade" 
                                placeholder="Luanda" 
                                className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                                disabled={isSubmitting}
                            />
                            {errors.localidade && <p className='text-xs text-red-600'>{errors.localidade.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="codigoPostal" className="font-semibold">Código Postal</label>
                            <input 
                                {...register('codigoPostal')} 
                                type="text" 
                                id="codigoPostal" 
                                placeholder="0000-000" 
                                maxLength={8}
                                className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                                disabled={isSubmitting}
                            />
                            {errors.codigoPostal && <p className='text-xs text-red-600'>{errors.codigoPostal.message}</p>}
                        </div>
                    </div>
                    <div className="space-y-1 flex w-full flex-col max-w-full">
                        <h2 className='font-semibold pb-2 border-b mb-4 text-xl'>Informação Financeira</h2>
                    </div>
                    <div className='grid sm:grid-cols-2 gap-4 w-full'>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="entidadeFinanceira" className="font-semibold">Entidade Financeira Responsável *</label>
                            <input 
                                {...register('entidadeFinanceira')} 
                                type="text" 
                                id="entidadeFinanceira" 
                                placeholder="Seguradora ABC" 
                                className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                                disabled={isSubmitting}
                            />
                            {errors.entidadeFinanceira && <p className='text-xs text-red-600'>{errors.entidadeFinanceira.message}</p>}
                        </div>
                        <div className="space-y-1 flex flex-col w-full">
                            <label htmlFor="numeroEntidade" className="font-semibold">Número de Utente na Entidade *</label>
                            <input 
                                {...register('numeroEntidade')} 
                                type="text" 
                                id="numeroEntidade" 
                                placeholder="0000000" 
                                className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                                disabled={isSubmitting}
                            />
                            {errors.numeroEntidade && <p className='text-xs text-red-600'>{errors.numeroEntidade.message}</p>}
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white mt-8 hover:bg-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed w-full h-10 rounded-xl"
                    >
                        {isSubmitting ? 'Criando conta...' : 'Criar Conta'}
                    </button>
                </form>
                <div>
                    <p className="text-zinc-700">Já tem uma conta?<Link to={'/entrar'} className="text-blue-600 font-semibold hover:underline"> Entrar</Link> </p>
                </div>
                
            </div> 
           
        </div>
    )
}