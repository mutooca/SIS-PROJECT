
import { useState } from "react";
import TitleGestao from "../components/TitleGestao";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const sanitizeNumber = (value: number) => {
  if (isNaN(value) || value === null) return 0;
  return Math.floor(value);
}
const duracaoSchema = z.object({
    duracao: z.union([z.number(), z.string()]).transform(val => {const num = typeof val === 'string' ? parseFloat(val) : val;return sanitizeNumber(num);})
  .pipe(z.number().int('A duração deve ser um número inteiro').min(5, 'A duração mínima é 5 minutos').max(480, 'A duração máxima é 480 minutos (8 horas)').refine(val => val % 5 === 0, 'A duração deve ser múltiplo de 5 minutos')
  ),

    antecedencia: z.union([z.number(), z.string()]).transform(val => {const num = typeof val === 'string' ? parseFloat(val) : val;return sanitizeNumber(num); })
  .pipe(z.number().int('A antecedência deve ser um número inteiro').min(1, 'A antecedência mínima é 1 dia').max(365, 'A antecedência máxima é 365 dias'))
})
const utentes = [
    { nome: 'João Pedro Silva', email: 'joao.silva@gmail.com'},
    { nome: 'Maria Santos', email: 'maria.santos@gmail.com'},
    { nome: 'Rui Fernandes', email: 'ruifernandes@gmail.com'},
    { nome: 'Ana Costa', email: 'ana.costa@gmail.com'},
    { nome: 'Carlos Mendes', email: 'carlos@gmail.com'}
]

const notificacoes = [
    {
        titulo: 'Lembrete de Consulta', descricao: 'Enviar email 1 dia antes da consulta', tipo: 'normal'
    },
    {
        titulo: 'Lembrete de Exame', descricao: 'Enviar email 1 dia antes do exame', tipo: 'normal'
    },
    {
        titulo: 'Consulta Reagendada', descricao: 'Notificar utente que a consulta foi reagendada', tipo: 'alerta'
    },
    {
        titulo: 'Exame Reagendado', descricao: 'Notificar utente que o exame foi reagendado', tipo: 'alerta'
    },
    {
        titulo: 'Cancelamento de Marcação', descricao: 'Notificar utente sobre o cancelamento da marcação', tipo: 'alerta'
    },
    {
        titulo: 'Atualização de Dados', descricao: 'Notificar utente sobre atualizações nos seus dados pessoais', tipo: 'normal'
    }
]

type duracaoData = z.infer<typeof duracaoSchema>

export default function Config(){
    const [utenteSelecionado, setUtenteSelecionado] = useState('')

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({ resolver: zodResolver(duracaoSchema)})

    async function handleDuracao(data: duracaoData) {
        console.log(data)
    }

    return (
        <div>
            <TitleGestao title="Configurações do Sistema" p="Configurações gerais, gestão de exames e notificações"/>
            
                <div className="space-y-4 border-b my-4 pb-6">
                    <h3 className="font-semibold text-lg my-4">Enviar Notificações por Email (Gmail)</h3>
                     <div>
                        <select value={utenteSelecionado} onChange={e => setUtenteSelecionado(e.target.value)} name="" id="" className="border rounded-lg p-2 outline-none bg-zinc-100 w-full" >
                            <option value="" >Seleccione um utente...</option>
                            {
                                utentes.map((utente, index) => (
                                    <option key={index} value={utente.email}>{utente.nome} - {utente.email}</option>
                                ))
                            }
                        </select>
                    </div>
                    
                        {
                            notificacoes.map((item, index) => (
                        <div key={index} className={`space-y-3 rounded-xl shadow py-4 px-4  ${item.tipo === 'normal' ? 'bg-zinc-100' : 'border border-yellow-300 px-4 bg-yellow-50'}`}>
                            <div className="flex items-center justify-between">
                                <div className="">
                                    <h2 className="font-semibold text-lg">{item.titulo}</h2>
                                    <p>{item.descricao}</p>
                                </div>
                                    <button disabled={!utenteSelecionado} className={`transition py-1 px-5 rounded-lg font-semibold border-2 ${utenteSelecionado ? 'hover:bg-blue-500 border-blue-400' : 'opacity-50 cursor-not-allowed'}`} >Abrir Gmail</button>
                            </div>
                        </div>
                            ))
                        }
                </div>

                <form onSubmit={handleSubmit(handleDuracao)} className="space-y-4 my-4">
                    <h3 className="font-semibold text-lg my-4">Configurações de Marcação</h3>
                    <div className="space-y-1">
                        <label className="font-semibold">Duração Padrão da Consulta (minutos)</label>
                        <input {...register('duracao')} type="number" className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500"/>
                        {errors.duracao && <p className='text-xs text-red-600'>{errors.duracao.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <label className="font-semibold">Antecedência Máxima para Marcação (dias)</label>
                        <input {...register('antecedencia')} type="number" className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500 "/>
                        {errors.antecedencia && <p className='text-xs text-red-600'>{errors.antecedencia.message}</p>}
                    </div>
                    <button className="bg-blue-500 text-white hover:bg-blue-600 w-full h-12 rounded-xl font-semibold transition">Guardar Configurações</button>
                </form>
                 
        </div>
    )
}