import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TitleGestao from "../components/TitleGestao";

/**
 * Remove espaços extras, caracteres perigosos e normaliza texto
 */
const sanitizeText = (value: string) => {
  if (!value) return '';
  return value.trim().replace(/\s+/g, ' ') .replace(/[<>'"]/g, '') .replace(/javascript:/gi, '') .replace(/on\w+=/gi, '') .slice(0, 500); // Limita tamanho máximo
}

const sanitizeName = (value: string) => {
  if (!value) return '';
  return value.trim().replace(/\s+/g, ' ').replace(/[^A-Za-zÀ-ÿ\s]/g, '').slice(0, 100);
}

/**
 * Remove todos os caracteres não numéricos
 */
const sanitizeNumberString = (value: string) => {
  if (!value) return '';
  return value.replace(/\D/g, '').slice(0, 20);
}

const sanitizeEmail = (value: string) => {
  if (!value) return '';
  return value.trim().toLowerCase().replace(/\s/g, '') // Remove espaços.replace(/[<>'"]/g, '') // Remove caracteres perigosos.slice(0, 254); // Tamanho máximo RFC 5321
}

/**
 * Sanitiza número de ordem permitindo apenas alfanuméricos e hífen
 */
const sanitizeNumeroOrdem = (value: string) => {
  if (!value) return '';
  return value.trim().toUpperCase().replace(/[^A-Z0-9\-]/g, '').slice(0, 20);
}

/**
 * Sanitiza hora no formato HH:mm
 */
const sanitizeTime = (value: string) => {
  if (!value) return '';
  return value.replace(/[^\d:]/g, '').slice(0, 5);
}

export const createNewClinicoSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório').transform(sanitizeName).refine(val => val.length > 0, 'O nome não pode estar vazio após sanitização')
  .pipe(  z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').max(100, 'O nome é demasiado longo').regex(/^[A-Za-zÀ-ÿ\s]+$/, 'O nome contém caracteres inválidos')
  .refine(  val => val.split(' ').length >= 2,  'Informe o nome completo (nome e sobrenome)').refine(  val => !val.match(/(.)\1{3,}/),  'O nome contém repetições suspeitas de caracteres')),

  numeroOrdem: z.string().min(1, 'O número de ordem é obrigatório').transform(sanitizeNumeroOrdem)
  .refine(val => val.length > 0, 'O número de ordem não pode estar vazio').pipe(  z.string()
  .min(3, 'O número de ordem deve ter no mínimo 3 caracteres').max(20, 'O número de ordem é demasiado longo')
  .regex(/^[A-Z0-9\-]+$/, 'Número de ordem inválido (use apenas letras, números e hífen)')
  .refine(  val => !val.match(/^[\-]+$|^[0]+$/),  'Número de ordem inválido')),

  senha: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres').max(64, 'A senha é demasiado longa')
  .regex(  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,  'A senha deve conter: maiúscula, minúscula, número e caractere especial (@$!%*?&#)')
  .refine(  val => !val.match(/(.)\1{2,}/),  'A senha não pode ter caracteres repetidos consecutivamente').refine(  val => !['12345678', 'password', 'senha123', 'admin123']
    .some(weak => val.toLowerCase().includes(weak)  ),  'A senha é muito fraca. Evite sequências comuns'),

  email: z.string().min(1, 'O e-mail é obrigatório').transform(sanitizeEmail).refine(val => val.length > 0, 'O e-mail não pode estar vazio')
  .pipe(z.string().email('Insira um e-mail válido').max(254, 'O e-mail é demasiado longo').regex(  /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,  'Formato de e-mail inválido')
  .refine(  val => !val.includes('..'),  'E-mail não pode conter pontos consecutivos').refine(  val => val.split('@')[0].length <= 64,  'A parte local do e-mail é demasiado longa')),

  especialidade: z.string().min(1, 'A especialidade é obrigatória').transform(sanitizeText).refine(val => val.length > 0, 'A especialidade não pode estar vazia')
  .pipe(  z.string().min(2, 'A especialidade deve ter no mínimo 2 caracteres').max(50, 'A especialidade é demasiado longa')),

  telefone: z.string().min(1, 'O telefone é obrigatório').transform(sanitizeNumberString).refine(val => val.length > 0, 'O telefone não pode estar vazio')
  .pipe(  z.string().length(9, 'O telefone deve ter exatamente 9 dígitos').regex(/^9[0-9]{8}$/, 'Número de telefone inválido (deve começar com 9)')
  .refine(  val => !val.match(/^(.)\1{8}$/),  'Número de telefone inválido (dígitos repetidos)')),
})

export const horarioSchema = z.object({horaInicial: z.string().min(1, 'A hora inicial é obrigatória').transform(sanitizeTime)
    .pipe(z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/,'Hora inicial inválida (formato HH:mm)')
    .refine(val => {const [hours, minutes] = val.split(':').map(Number);return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;},'Hora inicial fora do intervalo válido')),

    horaFinal: z.string().min(1, 'A hora final é obrigatória').transform(sanitizeTime).pipe(z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/,'Hora final inválida (formato HH:mm)')
    .refine(val => {  const [hours, minutes] = val.split(':').map(Number);  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;},'Hora final fora do intervalo válido')),

    diasAtendimento: z.array(z.enum([ 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo',])
 ).min(1, 'Selecione pelo menos um dia de atendimento').max(7, 'Número máximo de dias excedido')
 .refine((dias) => new Set(dias).size === dias.length,'Dias duplicados detectados'),}).superRefine((data, ctx) => {
    // Validação: hora final deve ser maior que hora inicial
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

    // Validação: horário máximo de trabalho (máximo 12 horas)
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

// ==================== DADOS MOCK ====================

const clinico = [
  {
    nome: 'Dr. João Silva',
    numeroOrdem: '12345',
    especialidade: 'Cardiologia',
    email: 'joao.silva@hospital.ao',
    telefone: '923456789',
    diasAtendimento: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'],
    horaInicio: '09:00',
    horaFim: '17:00'
  },
  {
    nome: 'Dra. Maria Santos',
    numeroOrdem: '67890',
    especialidade: 'Pediatria',
    email: 'mariasantos@gmail.com',
    telefone: '924567890',
    diasAtendimento: ['Segunda-feira', 'Quarta-feira', 'Sexta-feira'],
    horaInicio: '10:00',
    horaFim: '18:00'
  },
  {
    nome: 'Dr. Carlos Pereira',
    numeroOrdem: '11223',
    especialidade: 'Dermatologia',
    email: 'carlosperreira@gmail.com',
    telefone: '925678901',
    diasAtendimento: ['Terça-feira', 'Quinta-feira'],
    horaInicio: '08:00',
    horaFim: '14:00'
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
  'Oftalmologia',
  'Otorrinolaringologia',
  'Psiquiatria',
]

type HorarioData = z.infer<typeof horarioSchema>
type NewClinicoData = z.infer<typeof createNewClinicoSchema>


export default function AddClinico() {
  const [clinicoSelecionado, setClinicoSelecionado] = useState<null | typeof clinico[0]>(null)
  const [rolePc, setRolePc] = useState<'addNew' | 'update'>('addNew')

  // Form para criar/editar clínico
  const {
    register: registerClinico,
    formState: { errors: errorsClinico, isSubmitting: isSubmittingClinico },
    handleSubmit: handleSubmitClinico,
    reset: resetClinico
  } = useForm<NewClinicoData>({
    resolver: zodResolver(createNewClinicoSchema),
    mode: 'onBlur', // Valida ao sair do campo
  })

  // Form para horário
  const {
    register: registerHorario,
    formState: { errors: errorsHorario, isSubmitting: isSubmittingHorario },
    handleSubmit: handleSubmitHorario,
    reset: resetHorario
  } = useForm<HorarioData>({
    resolver: zodResolver(horarioSchema),
    mode: 'onBlur',
  })

  async function handleHorario(data: HorarioData) {
    try {
      // Aqui você faria a chamada à API
      console.log('Dados do horário validados e sanitizados:', data)
      
      // Simulação de envio para API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Horário definido com sucesso!')
      resetHorario()
    } catch (error) {
      console.error('Erro ao definir horário:', error)
      alert('Erro ao definir horário. Tente novamente.')
    }
  }

  async function handleNewClinico(data: NewClinicoData) {
    try {
      console.log('Dados do clínico validados e sanitizados:', data)
      
      // Simulação de envio para API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Clínico registrado com sucesso!')
      resetClinico()
      setClinicoSelecionado(null)
    } catch (error) {
      console.error('Erro ao registrar clínico:', error)
      alert('Erro ao registrar clínico. Tente novamente.')
    }
  }

  const handleSubmitRolePc = (value: 'addNew' | 'update') => {
    setRolePc(value)
    resetClinico()
    resetHorario()
  }
  return (
    <div>
      <TitleGestao title="Gestão de Pessoal Clínico" p="Criar e actualizar registos do pessoal clínico" />

      <div className="grid grid-cols-2 gap-2 bg-indigo-50 py-1 px-2 rounded-lg my-4">
        <button
          onClick={() => handleSubmitRolePc('addNew')}
          className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center flex items-center gap-2 ${
            rolePc === 'addNew' ? 'bg-gray-50' : ''
          }`}>
          Criar Novo
        </button>
        <button
          onClick={() => handleSubmitRolePc('update')}
          className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center flex items-center gap-2 ${
            rolePc === 'update' ? 'bg-gray-50' : ''
          }`}>
          Gerir Existentes
        </button>
      </div>

      {rolePc === 'addNew' && (
        <div>
          <form onSubmit={handleSubmitClinico(handleNewClinico)} className="space-y-3">
            <h3 className="font-semibold">riar Novo Registo</h3>
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              <div className="space-y-1 flex flex-col w-full">
                <label htmlFor="name" className="font-semibold">Nome Completo</label>
                <input
                  {...registerClinico('name')}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Ex: João Silva Santos"
                  className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                  disabled={isSubmittingClinico}/>
                {errorsClinico.name && <p className="text-xs text-red-600">{errorsClinico.name.message}</p>}
              </div>
              <div className="space-y-1 flex flex-col w-full">
                <label htmlFor="numeroOrdem" className="font-semibold">Número da Ordem</label>
                <input
                  {...registerClinico('numeroOrdem')}
                  type="text"
                  name="numeroOrdem"
                  id="numeroOrdem"
                  placeholder="Ex: ORD-12345"
                  className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                  disabled={isSubmittingClinico}/>
                {errorsClinico.numeroOrdem && (
                  <p className="text-xs text-red-600">{errorsClinico.numeroOrdem.message}</p>
                )}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              <div className="space-y-1 flex flex-col w-full">
                <label htmlFor="especialidade" className="font-semibold">Especialidade</label>
                <select
                  {...registerClinico('especialidade')}
                  name="especialidade"
                  id="especialidade"
                  className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                  disabled={isSubmittingClinico}>
                  <option value="">Selecione a especialidade</option>
                  {especialidades.map((especialidade) => (
                    <option key={especialidade} value={especialidade}>
                      {especialidade}
                    </option>
                  ))}
                </select>
                {errorsClinico.especialidade && (
                  <p className="text-xs text-red-600">{errorsClinico.especialidade.message}</p>
                )}
              </div>
              <div className="space-y-1 flex flex-col w-full">
                <label htmlFor="telefone" className="font-semibold">Telefone</label>
                <input
                  {...registerClinico('telefone')}
                  type="text"
                  name="telefone"
                  id="telefone"
                  placeholder="923456789"
                  maxLength={9}
                  className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                  disabled={isSubmittingClinico}
                />
                {errorsClinico.telefone && (
                  <p className="text-xs text-red-600">{errorsClinico.telefone.message}</p>
                )}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              <div className="space-y-1 flex flex-col w-full">
                <label htmlFor="email" className="font-semibold">E-mail</label>
                <input
                  {...registerClinico('email')}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="medico@hospital.ao"
                  className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                  disabled={isSubmittingClinico}
                />
                {errorsClinico.email && <p className="text-xs text-red-600">{errorsClinico.email.message}</p>}
              </div>
              <div className="space-y-1 flex flex-col w-full">
                <label htmlFor="senha" className="font-semibold">Senha Inicial</label>
                <input
                  {...registerClinico('senha')}
                  type="password"
                  name="senha"
                  id="senha"
                  placeholder="Mínimo 8 caracteres"
                  className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                  disabled={isSubmittingClinico}
                />
                {errorsClinico.senha && <p className="text-xs text-red-600">{errorsClinico.senha.message}</p>}
                <p className="text-xs text-gray-500">Deve conter: maiúscula, minúscula, número e caractere especial</p>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmittingClinico}
              className="bg-blue-500 text-white mt-8 hover:bg-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed w-full h-10 rounded-xl">
              {isSubmittingClinico ? 'Registando...' : 'Registar Clínico'}
            </button>
          </form>

          <div className="my-8 border-t"></div>

          <form onSubmit={handleSubmitHorario(handleHorario)} className="space-y-3">
            <h3 className="font-semibold">Definir Horário para Novo Clínico</h3>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="space-y-1 flex flex-col w-full">
                <label htmlFor="horaInicial" className="font-semibold">Hora Início</label>
                <input
                  {...registerHorario('horaInicial')}
                  type="time"
                  name="horaInicial"
                  id="horaInicial"
                  className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                  disabled={isSubmittingHorario}
                />
                {errorsHorario.horaInicial && (
                  <p className="text-xs text-red-600">{errorsHorario.horaInicial.message}</p>
                )}
              </div>
              <div className="space-y-1 flex flex-col w-full">
                <label htmlFor="horaFinal" className="font-semibold">Hora Fim</label>
                <input
                  {...registerHorario('horaFinal')}
                  type="time"
                  name="horaFinal"
                  id="horaFinal"
                  className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                  disabled={isSubmittingHorario}
                />
                {errorsHorario.horaFinal && (
                  <p className="text-xs text-red-600">{errorsHorario.horaFinal.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2 flex flex-col w-full">
              <label className="font-semibold">Dias de Atendimento
              </label>
              <div className="grid grid-cols-3 gap-2 font-semibold">
                {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map(
                  (dia) => (
                    <label key={dia} className="flex items-center gap-2 border-r">
                      <input
                        {...registerHorario('diasAtendimento')}
                        type="checkbox"
                        value={dia}
                        disabled={isSubmittingHorario}/>{dia}</label>
                  )
                )}
              </div>
              {errorsHorario.diasAtendimento && (
                <p className="text-xs text-red-600">{errorsHorario.diasAtendimento.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmittingHorario}
              className="bg-blue-500 text-white mt-8 hover:bg-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed w-full h-10 rounded-xl">
              {isSubmittingHorario ? 'Definindo...' : 'Definir Horário'}
            </button>
          </form>
        </div>
      )}

      {rolePc === 'update' && (
        <div className="space-y-4">
          {clinico.map((item, index) => (
            <div key={index} className="space-y-3 border rounded-xl shadow py-4 px-4">
              <div className="flex items-center justify-between ">
                <div>
                  <h2 className="font-semibold text-lg">{item.nome}</h2>
                  <div className="text-zinc-700">
                    <p>{item.especialidade} - Nº Ordem: {item.numeroOrdem}</p>
                    <p>{item.email} | Contacto: {item.telefone}</p>
                    <p>Horário: {item.diasAtendimento.join(', ')} | {item.horaInicio} - {item.horaFim}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setClinicoSelecionado(item)}
                  className="hover:bg-blue-500 hover:text-white transition py-1 px-5 rounded-lg text-center font-semibold flex items-center gap-2 border-2 border-blue-400">
                  Editar
                </button>
              </div>
              <form onSubmit={handleSubmitHorario(handleHorario)} className="space-y-3">
                <h3 className="font-semibold">ctualizar Horário</h3>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="space-y-1 flex flex-col w-full">
                    <label htmlFor={`horaInicial-${index}`} className="font-semibold">Nova Hora Início</label>
                    <input
                      {...registerHorario('horaInicial')}
                      type="time"
                      name="horaInicial"
                      id={`horaInicial-${index}`}
                      defaultValue={item.horaInicio}
                      className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"/>
                    {errorsHorario.horaInicial && (
                      <p className="text-xs text-red-600">{errorsHorario.horaInicial.message}</p>
                    )}
                  </div>
                  <div className="space-y-1 flex flex-col w-full">
                    <label htmlFor={`horaFinal-${index}`} className="font-semibold">Nova Hora Fim</label>
                    <input
                      {...registerHorario('horaFinal')}
                      type="time"
                      name="horaFinal"
                      id={`horaFinal-${index}`}
                      defaultValue={item.horaFim}
                      className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"/>
                    {errorsHorario.horaFinal && (
                      <p className="text-xs text-red-600">{errorsHorario.horaFinal.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2 flex flex-col w-full">
                  <label className="font-semibold">Definir Dias de Atendimento</label>
                  <div className="grid grid-cols-3 gap-2 font-semibold">                    
                    {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map(
                      (dia) => (
                        <label key={dia} className="flex items-center gap-2 border-r">
                          <input
                            {...registerHorario('diasAtendimento')}
                            type="checkbox"
                            value={dia}
                            defaultChecked={item.diasAtendimento.includes(dia)}/>{dia}</label>
                      )
                    )}
                  </div>
                  {errorsHorario.diasAtendimento && (
                    <p className="text-xs text-red-600">{errorsHorario.diasAtendimento.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white mt-8 hover:bg-blue-400 w-full h-10 rounded-xl">
                  Actualizar Horário
                </button>
              </form>
            </div>
          ))}
        </div>
      )}

      {clinicoSelecionado && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-xl max-h-full w-full max-w-2xl p-6 mx-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold">Editar Informações de {clinicoSelecionado.nome}</h2>
              <button
                onClick={() => setClinicoSelecionado(null)}
                className="text-gray-500 hover:text-gray-700 float-right text-2xl font-bold">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmitClinico(handleNewClinico)} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                <div className="space-y-1 flex flex-col w-full">
                  <label htmlFor="name-edit" className="font-semibold">Nome Completo</label>
                  <input
                    defaultValue={clinicoSelecionado.nome}
                    {...registerClinico('name')}
                    type="text"
                    name="name"
                    id="name-edit"
                    placeholder="Informe o nome"
                    className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"/>
                  {errorsClinico.name && <p className="text-xs text-red-600">{errorsClinico.name.message}</p>}
                </div>
                <div className="space-y-1 flex flex-col w-full">
                  <label htmlFor="numeroOrdem-edit" className="font-semibold">Número da Ordem</label>
                  <input
                    defaultValue={clinicoSelecionado.numeroOrdem}
                    {...registerClinico('numeroOrdem')}
                    type="text"
                    name="numeroOrdem"
                    id="numeroOrdem-edit"
                    placeholder="Informe o numero de ordem"
                    className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"/>
                  {errorsClinico.numeroOrdem && (
                    <p className="text-xs text-red-600">{errorsClinico.numeroOrdem.message}</p>
                  )}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                <div className="space-y-1 flex flex-col w-full">
                  <label htmlFor="especialidade-edit" className="font-semibold">Especialidade</label>
                  <select
                    defaultValue={clinicoSelecionado.especialidade}
                    {...registerClinico('especialidade')}
                    name="especialidade"
                    id="especialidade-edit"
                    className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border">
                    <option value="">Selecione a especialidade</option>
                    {especialidades.map((especialidade) => (
                      <option key={especialidade} value={especialidade}>
                        {especialidade}
                      </option>
                    ))}
                  </select>
                  {errorsClinico.especialidade && (
                    <p className="text-xs text-red-600">{errorsClinico.especialidade.message}</p>
                  )}
                </div>
                <div className="space-y-1 flex flex-col w-full">
                  <label htmlFor="telefone-edit" className="font-semibold">Telefone</label>
                  <input
                    defaultValue={clinicoSelecionado.telefone}
                    {...registerClinico('telefone')}
                    type="text"
                    name="telefone"
                    id="telefone-edit"
                    placeholder="+244 912 345 678"
                    className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                  />
                  {errorsClinico.telefone && (
                    <p className="text-xs text-red-600">{errorsClinico.telefone.message}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-4 w-full">
                <div className="space-y-1 flex flex-col w-full">
                  <label htmlFor="email-edit" className="font-semibold">E-mail</label>
                  <input
                    defaultValue={clinicoSelecionado.email}
                    {...registerClinico('email')}
                    type="email"
                    name="email"
                    id="email-edit"
                    placeholder="pessoalclinico@gmail.com"
                    className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border"
                  />
                  {errorsClinico.email && <p className="text-xs text-red-600">{errorsClinico.email.message}</p>}
                </div>
              </div>
              <div className="flex items-center justify-end mt-6 gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-400 w-full h-10 rounded-xl">
                  Actualizar Clínico
                </button>
                <button
                  onClick={() => setClinicoSelecionado(null)}
                  type="button"
                  className="bg-gray-300 text-black hover:bg-gray-400 w-32 h-10 rounded-xl">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}