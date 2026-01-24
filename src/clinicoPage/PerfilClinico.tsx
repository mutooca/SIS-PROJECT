import { useState } from "react";
import TitleGestao from "../components/TitleGestao";
import imgPerfil from '../img/perfilClinico.jpeg'
import { FiX } from "react-icons/fi";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export interface HorarioAtendimento {
  dias: string[]
  horaInicio: string
  horaFim: string
  ultimaAlteracao: string // ISO date
}

export interface Clinico {
  id: number
  nome: string
  numeroOrdem: string
  especialidade: string
  email: string
  telefone: string
  horario: HorarioAtendimento
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

const sanitizeTime = (value: string) => {
  if (!value) return '';
  return value.replace(/[^\d:]/g, '').slice(0, 5);
}

export const updateClinicoSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório').transform(sanitizeName).refine(val => val.length > 0, 'O nome não pode estar vazio após sanitização')
  .pipe(z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').max(100, 'O nome é demasiado longo').regex(/^[A-Za-zÀ-ÿ\s]+$/, 'O nome contém caracteres inválidos')
  .refine(val => val.split(' ').length >= 2, 'Informe o nome completo (nome e sobrenome)').refine(val => !val.match(/(.)\1{3,}/), 'O nome contém repetições suspeitas de caracteres')),

  email: z.string().min(1, 'O e-mail é obrigatório').transform(sanitizeEmail).refine(val => val.length > 0, 'O e-mail não pode estar vazio')
  .pipe(z.string().email('Insira um e-mail válido').max(254, 'O e-mail é demasiado longo').regex(/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Formato de e-mail inválido')
  .refine(val => !val.includes('..'), 'E-mail não pode conter pontos consecutivos').refine(val => val.split('@')[0].length <= 64, 'A parte local do e-mail é demasiado longa')),

  telefone: z.string().min(1, 'O telefone é obrigatório').transform(sanitizeNumberString).refine(val => val.length > 0, 'O telefone não pode estar vazio')
  .pipe(z.string().length(9, 'O telefone deve ter exatamente 9 dígitos').regex(/^9[0-9]{8}$/, 'Número de telefone inválido (deve começar com 9)')
  .refine(val => !val.match(/^(.)\1{8}$/), 'Número de telefone inválido (dígitos repetidos)')),

  senha: z.string().optional().or(z.literal('')).refine(val => !val || val.length >= 8, 'A senha deve ter no mínimo 8 caracteres')
  .refine(val => !val || val.length <= 64, 'A senha é demasiado longa')
  .refine(val => !val || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/.test(val), 'A senha deve conter: maiúscula, minúscula, número e caractere especial (@$!%*?&#)')
  .refine(val => !val || !val.match(/(.)\1{2,}/), 'A senha não pode ter caracteres repetidos consecutivamente')
  .refine(val => !val || !['12345678', 'password', 'senha123', 'admin123'].some(weak => val.toLowerCase().includes(weak)), 'A senha é muito fraca. Evite sequências comuns'),

  confirmarSenha: z.string().optional().or(z.literal('')),
}).refine((data) => {
  if (data.senha || data.confirmarSenha) {
    return data.senha === data.confirmarSenha;
  }
  return true;
}, {
  message: 'As senhas não coincidem',
  path: ['confirmarSenha'],
});

export const horarioSchema = z.object({
  horaInicial: z.string().min(1, 'A hora inicial é obrigatória').transform(sanitizeTime)
    .pipe(z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Hora inicial inválida (formato HH:mm)')
    .refine(val => {const [hours, minutes] = val.split(':').map(Number); return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;}, 'Hora inicial fora do intervalo válido')),

  horaFinal: z.string().min(1, 'A hora final é obrigatória').transform(sanitizeTime).pipe(z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Hora final inválida (formato HH:mm)')
    .refine(val => {const [hours, minutes] = val.split(':').map(Number); return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;}, 'Hora final fora do intervalo válido')),

  diasAtendimento: z.array(z.enum(['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']))
    .min(1, 'Selecione pelo menos um dia de atendimento').max(7, 'Número máximo de dias excedido')
    .refine((dias) => new Set(dias).size === dias.length, 'Dias duplicados detectados'),
}).superRefine((data, ctx) => {
  if (data.horaFinal <= data.horaInicial) {
    ctx.addIssue({
      path: ['horaFinal'],
      message: 'A hora final deve ser maior que a hora inicial',
      code: z.ZodIssueCode.custom,
    })
  }

  const [horaIni, minIni] = data.horaInicial.split(':').map(Number);
  const [horaFim, minFim] = data.horaFinal.split(':').map(Number);
  const minutosInicial = horaIni * 60 + minIni;
  const minutosFinal = horaFim * 60 + minFim;
  const diferencaMinutos = minutosFinal - minutosInicial;

  if (diferencaMinutos < 60) {
    ctx.addIssue({
      path: ['horaFinal'],
      message: 'O horário de atendimento deve ser de no mínimo 1 hora',
      code: z.ZodIssueCode.custom,
    })
  }

  if (diferencaMinutos > 720) {
    ctx.addIssue({
      path: ['horaFinal'],
      message: 'O horário de atendimento não pode exceder 12 horas',
      code: z.ZodIssueCode.custom,
    })
  }

  if (horaIni < 6 || horaFim > 22) {
    ctx.addIssue({
      path: ['horaInicial'],
      message: 'O horário deve estar entre 06:00 e 22:00',
      code: z.ZodIssueCode.custom,
    });
  }
})

const clinicoLogado: Clinico = {
  id: 1,
  nome: 'Dr. João Silva',
  numeroOrdem: '12345',
  especialidade: 'Cardiologia',
  email: 'joao.silva@hospital.ao',
  telefone: '923456789',
  horario: {
    dias: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    horaInicio: '09:00',
    horaFim: '17:00',
    ultimaAlteracao: '2025-12-01'
  }
}

type HorarioData = z.infer<typeof horarioSchema>
type UpdateClinicoData = z.infer<typeof updateClinicoSchema>

export default function PerfilClinico(){
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showHorarioModal, setShowHorarioModal] = useState(false)

    const {
        register: registerClinico,
        formState: { errors: errorsClinico, isSubmitting: isSubmittingClinico },
        handleSubmit: handleSubmitClinico,
        reset: resetClinico
    } = useForm<UpdateClinicoData>({
        resolver: zodResolver(updateClinicoSchema),
        mode: 'onBlur',
    })
    
    const {
        register: registerHorario,
        formState: { errors: errorsHorario, isSubmitting: isSubmittingHorario },
        handleSubmit: handleSubmitHorario,
        reset: resetHorario
    } = useForm<HorarioData>({
        resolver: zodResolver(horarioSchema),
        mode: 'onBlur',
    })

    async function handleUpdateClinico(data: UpdateClinicoData) {
        try {
            console.log('Dados do clínico validados:', data)
            await new Promise(resolve => setTimeout(resolve, 1000))
            alert('Perfil actualizado com sucesso!')
            setShowModalEdit(false)
            resetClinico()
        } catch (error) {
            console.error('Erro ao actualizar perfil:', error)
            alert('Erro ao actualizar perfil. Tente novamente.')
        }
    }

    async function handleUpdateHorario(data: HorarioData) {
        try {
            console.log('Horário validado:', data)
            await new Promise(resolve => setTimeout(resolve, 1000))
            alert('Horário actualizado com sucesso!')
            setShowHorarioModal(false)
            resetHorario()
        } catch (error) {
            console.error('Erro ao actualizar horário:', error)
            alert('Erro ao actualizar horário. Tente novamente.')
        }
    }

    return (
        <div>
            <TitleGestao title="Meus Dados" p="Consulte e actualize suas informações pessoais"/>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 border rounded-xl p-6">
                
                <div className="flex flex-col items-center gap-4">
                    <img src={imgPerfil} alt="Perfil do clínico" className="rounded-full w-44 h-44 object-cover border"/>
                    <button onClick={() => setShowModalEdit(true)} className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-2 rounded-lg font-semibold"> Editar Perfil </button>
                </div>
                <div className="space-y-4">
                    <h2 className="font-bold text-2xl text-blue-800">
                        {clinicoLogado.nome}
                    </h2>
                    <div className="space-y-2 text-zinc-700">
                        <p><span className="font-semibold text-blue-800">Nº Ordem:</span> {clinicoLogado.numeroOrdem}</p>
                        <p><span className="font-semibold text-blue-800">Especialidade:</span> {clinicoLogado.especialidade}</p>
                        <p><span className="font-semibold text-blue-800">Email:</span> {clinicoLogado.email}</p>
                        <p><span className="font-semibold text-blue-800">Contacto:</span> {clinicoLogado.telefone}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="border rounded-xl p-4 bg-gray-50">
                        <h3 className="font-semibold text-lg mb-2 text-blue-800">Horário de Atendimento</h3>
                        <p className="text-sm text-zinc-600 mb-1">{clinicoLogado.horario.dias.join(', ')}</p>
                        <p className="font-semibold text-zinc-700">{clinicoLogado.horario.horaInicio} – {clinicoLogado.horario.horaFim}</p>
                        <button type="button" onClick={() => setShowHorarioModal(true)} className="mt-4 text-blue-600 font-semibold hover:underline" >Alterar Horário</button>
                    </div>
                    {
                        showHorarioModal && (
                            <div className="inset-0 backdrop-blur-sm bg-black bg-opacity-50 z-50 fixed flex items-center justify-center">
                                <div className="bg-white rounded-lg p-8 w-full max-w-3xl">
                                    <div className="flex items-center justify-between gap-x-8 mb-4">
                                        <div>
                                            <h2 className="text-2xl font-semibold">Alterar Horário de Atendimento</h2>
                                            <p className="text-sm text-zinc-600 mt-1 mb-2">Solicite a alteração do seu horário de atendimento respeitando o prazo mínimo de 1 mês de antecedência. As alterações só serão aplicadas se não existirem consultas já agendadas para o período seleccionado.</p>
                                            <p className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg p-2 mt-2"> ⚠ Alterações de horário estão sujeitas à validação administrativa.</p>
                                        </div>

                                        <button onClick={() => setShowHorarioModal(false)} className="text-gray-600 hover:text-red-700 text-2xl font-bold">
                                            <FiX />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmitHorario(handleUpdateHorario)} className='space-y-4 w-full'>
                                        <div className="space-y-1 flex flex-col w-full">
                                            <label htmlFor="dataMudanca" className="font-semibold">Horário Actual</label>
                                            <p className="max-w-full h-20 bg-zinc-50 rounded-lg px-4 bg-gray-50 outline-blue-500 flex justify-between items-center">
                                                <span>{clinicoLogado.horario.dias.join(', ')}</span>
                                                <span>{clinicoLogado.horario.horaInicio} - {clinicoLogado.horario.horaFim}</span>
                                            </p>
                                        </div>
                                        <div className='grid gap-4 w-full'>
                                            <div className="space-y-1 flex flex-col w-full">
                                                <label htmlFor="horaInicial" className="font-semibold">Novo Horário - Início</label>
                                                <input {...registerHorario('horaInicial')} type="time" id="horaInicial" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" disabled={isSubmittingHorario} />
                                                {errorsHorario.horaInicial && <p className='text-xs text-red-600'>{errorsHorario.horaInicial.message}</p>}
                                            </div>
                                            <div className="space-y-1 flex flex-col w-full">
                                                <label htmlFor="horaFinal" className="font-semibold">Novo Horário - Fim</label>
                                                <input {...registerHorario('horaFinal')} type="time" id="horaFinal" placeholder="--:--" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" disabled={isSubmittingHorario} />
                                                {errorsHorario.horaFinal && <p className='text-xs text-red-600'>{errorsHorario.horaFinal.message}</p>}
                                            </div>
                                        </div>
                                        <div className="space-y-2 flex flex-col w-full">
                                            <label className="font-semibold">Dias de Atendimento</label>
                                            <div className="grid grid-cols-3 gap-2 font-semibold">
                                                {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map(dia => (
                                                    <label key={dia} className="flex items-center gap-2 border-r">
                                                        <input {...registerHorario('diasAtendimento')} type="checkbox" value={dia} disabled={isSubmittingHorario} />
                                                        {dia}
                                                    </label>
                                                ))}
                                            </div>
                                            {errorsHorario.diasAtendimento && <p className='text-xs text-red-600'>{errorsHorario.diasAtendimento.message}</p>}
                                        </div>
                                        <button type="submit" disabled={isSubmittingHorario} className="bg-blue-500 text-white mt-8 hover:bg-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed w-full h-10 rounded-xl">
                                            {isSubmittingHorario ? 'Actualizando...' : 'Actualizar Horário'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )
                    }
                </div>
             {
                showModalEdit && (
                <div className="inset-0 backdrop-blur-sm bg-black bg-opacity-50 z-50 fixed flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 w-full max-w-3xl">
                       <div className="flex items-center gap-x-8 justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-semibold">Editar Perfil Profissional</h2>
                                <p className="text-sm text-zinc-600 mt-1 mb-2"> Actualize as suas informações pessoais e de contacto para garantir uma comunicação eficiente e segura dentro do sistema. Estes dados são utilizados para identificação profissional e contacto institucional.
                                </p>
                            </div>
                            <button onClick={() => setShowModalEdit(false)} className="text-gray-600 hover:text-red-700 text-3xl font-bold"><FiX /></button>
                        </div>

                        <form onSubmit={handleSubmitClinico(handleUpdateClinico)} className='space-y-4 w-full'>
                            <div className="space-y-1 flex flex-col w-full">
                                <label htmlFor="name" className="font-semibold">Nome Completo</label>
                                <input {...registerClinico('name')} type="text" id="name" defaultValue={clinicoLogado.nome} placeholder="Meu Nome" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" disabled={isSubmittingClinico} />
                                {errorsClinico.name && <p className='text-xs text-red-600'>{errorsClinico.name.message}</p>}
                            </div>
                            <div className="space-y-1 flex flex-col w-full">
                                <label htmlFor="telefone" className="font-semibold">Telefone</label>
                                <input {...registerClinico('telefone')} type="text" id="telefone" defaultValue={clinicoLogado.telefone} placeholder="+244 9xx xxx xxx" maxLength={9} className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" disabled={isSubmittingClinico} />
                                {errorsClinico.telefone && <p className='text-xs text-red-600'>{errorsClinico.telefone.message}</p>}
                            </div>
                            <div className="space-y-1 flex flex-col w-full">
                                <label htmlFor="email" className="font-semibold">Email</label>
                                <input {...registerClinico('email')} type="email" id="email" defaultValue={clinicoLogado.email} placeholder="eu@email.com" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" disabled={isSubmittingClinico} />
                                {errorsClinico.email && <p className='text-xs text-red-600'>{errorsClinico.email.message}</p>}
                            </div>

                            <h3 className="font-semibold text-lg my-8">Alterar Palavra-Passe</h3>
                            <div className='grid grid-cols-2 gap-4 w-full'>
                                <div className="space-y-1 flex flex-col w-full">
                                    <label htmlFor="senha" className="font-semibold">Palavra-Passe</label>
                                    <input {...registerClinico('senha')} type="password" id="senha" placeholder="••••••••" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" disabled={isSubmittingClinico} />
                                    {errorsClinico.senha && <p className='text-xs text-red-600'>{errorsClinico.senha.message}</p>}
                                </div>
                                <div className="space-y-1 flex flex-col w-full">
                                    <label htmlFor="confirmarSenha" className="font-semibold">Confirmar Palavra-Passe</label>
                                    <input {...registerClinico('confirmarSenha')} type="password" id="confirmarSenha" placeholder="••••••••" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" disabled={isSubmittingClinico} />
                                    {errorsClinico.confirmarSenha && <p className='text-xs text-red-600'>{errorsClinico.confirmarSenha.message}</p>}
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">Deixe em branco se não quiser alterar a senha</p>
                            <button type="submit" disabled={isSubmittingClinico} className="bg-blue-500 text-white mt-8 hover:bg-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed w-full h-10 rounded-xl">
                                {isSubmittingClinico ? 'Actualizando...' : 'Actualizar Meu Perfil'}
                            </button>
                        </form>
                    </div>
                </div>
            
                )
            }
            </div>
        </div>
    )
}