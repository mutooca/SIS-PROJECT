import { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import TitleGestao from "../components/TitleGestao";

// ==================== INTERFACES ====================

interface HistoricoConsulta {
  data: string;
  especialidade: string;
  medico: string;
  status: 'Realizada' | 'Cancelada' | 'Reagendada';
}

interface HistoricoExame {
  data: string;
  exame: string;
  status: 'Realizada' | 'Cancelado' | 'Reagendada';
}

interface Utente {
  id: number;
  nome: string;
  numeroIdentificador: string;
  nomeEntidade: string;
  numeroEntidade: string;
  email: string;
  telefone: string;
  dataRegisto: string;
  historicoConsultas: HistoricoConsulta[];
  historicoExames: HistoricoExame[];
}

// ==================== FUNÇÕES DE SANITIZAÇÃO ====================

const sanitizeText = (value: string) => {
  if (!value) return '';
  return value.trim().replace(/\s+/g, ' ').replace(/[<>'"]/g, '').slice(0, 500);
};

const sanitizeNumberString = (value: string) => {
  if (!value) return '';
  return value.replace(/\D/g, '').slice(0, 20);
}


const entidadeFinanceiraSchema = z.object({
  nomeEntidade: z.string()
    .min(1, 'A entidade financeira é obrigatória')
    .transform(sanitizeText)
    .refine(val => val.length > 0, 'A entidade não pode estar vazia')
    .pipe(
      z.string()
        .min(3, 'O nome da entidade deve ter no mínimo 3 caracteres')
        .max(100, 'O nome da entidade é demasiado longo')
    ),
  
  numeroEntidade: z.string()
    .min(1, 'O número na entidade é obrigatório')
    .transform(sanitizeNumberString)
    .refine(val => val.length > 0, 'O número não pode estar vazio')
    .pipe(
      z.string()
        .min(3, 'O número na entidade deve ter no mínimo 3 caracteres')
        .max(20, 'O número na entidade é demasiado longo')
    ),
  
  observacoes: z.string()
    .transform(sanitizeText)
    .pipe(
      z.string()
        .max(500, 'As observações não podem ultrapassar 500 caracteres')
    )
    .optional()
    .or(z.literal(''))
});

type EntidadeFinanceiraData = z.infer<typeof entidadeFinanceiraSchema>

const utentes: Utente[] = [
  {
    id: 1,
    nome: "João Pedro Silva",
    numeroIdentificador: "123456",
    nomeEntidade: "ACMS Seguros",
    numeroEntidade: "SEG789456",
    email: "joao.silva@email.com",
    telefone: "923456789",
    dataRegisto: "15/01/2024",
    historicoConsultas: [
      {
        data: '01/11/2025',
        especialidade: 'Cardiologia',
        medico: 'Dr. João Silva',
        status: 'Realizada'
      },
      {
        data: '30/09/2025',
        especialidade: 'Dermatologia',
        medico: 'Dra. Carla Oliveira',
        status: 'Cancelada'
      },
      {
        data: '12/09/2025',
        especialidade: 'Ortopedia',
        medico: 'Dr. Pedro Almeida',
        status: 'Reagendada'
      }
    ],
    historicoExames: [
      {
        data: '25/10/2025',
        exame: 'Análises Clínicas',
        status: 'Realizada'
      },
      {
        data: '15/08/2025',
        exame: 'Ecografia Abdominal',
        status: 'Reagendada'
      },
      {
        data: '05/07/2025',
        exame: 'Ressonância Magnética',
        status: 'Cancelado'
      }
    ]
  },
  {
    id: 2,
    nome: "Jordan Miguel Pedro",
    numeroIdentificador: "234567",
    nomeEntidade: "ENSA",
    numeroEntidade: "ENSA98765",
    email: "jordan.pedro@email.com",
    telefone: "924567890",
    dataRegisto: "20/02/2024",
    historicoConsultas: [
      {
        data: '15/11/2025',
        especialidade: 'Pediatria',
        medico: 'Dra. Ana Santos',
        status: 'Realizada'
      },
      {
        data: '20/10/2025',
        especialidade: 'Oftalmologia',
        medico: 'Dr. Carlos Mendes',
        status: 'Realizada'
      }
    ],
    historicoExames: [
      {
        data: '18/11/2025',
        exame: 'Hemograma Completo',
        status: 'Realizada'
      },
      {
        data: '10/10/2025',
        exame: 'Teste de Visão',
        status: 'Realizada'
      }
    ]
  },
  {
    id: 3,
    nome: "Maria João Lopes",
    numeroIdentificador: "654321",
    nomeEntidade: "INSS",
    numeroEntidade: "INSS1234",
    email: "maria.lopes@email.com",
    telefone: "925678901",
    dataRegisto: "10/03/2024",
    historicoConsultas: [
      {
        data: '05/12/2025',
        especialidade: 'Ginecologia',
        medico: 'Dra. Beatriz Costa',
        status: 'Realizada'
      },
      {
        data: '22/11/2025',
        especialidade: 'Clínica Geral',
        medico: 'Dr. Fernando Alves',
        status: 'Reagendada'
      },
      {
        data: '10/10/2025',
        especialidade: 'Nutrição',
        medico: 'Dra. Sandra Martins',
        status: 'Cancelada'
      }
    ],
    historicoExames: [
      {
        data: '28/11/2025',
        exame: 'Mamografia',
        status: 'Realizada'
      },
      {
        data: '15/11/2025',
        exame: 'Papanicolau',
        status: 'Realizada'
      },
      {
        data: '05/10/2025',
        exame: 'Densitometria Óssea',
        status: 'Cancelado'
      }
    ]
  }
];


export default function RCU() {
  const [search, setSearch] = useState("");
  const [selectedUtente, setSelectedUtente] = useState<Utente | null>(null);

  const {
    register: registerEntidade,
    formState: { errors: errorsEntidade, isSubmitting: isSubmittingEntidade },
    handleSubmit: handleSubmitEntidade,
  } = useForm<EntidadeFinanceiraData>({
    resolver: zodResolver(entidadeFinanceiraSchema),
    mode: 'onBlur'
  });

  // Funções auxiliares
  function normalizeString(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  const filteredUtentes = utentes.filter((u) =>
    normalizeString(u.nome).includes(normalizeString(search))
  );

  // Handler
  async function handleEntidadeFinanceira(data: EntidadeFinanceiraData) {
    try {
      console.log('Dados validados e sanitizados:', data);
      toast.loading('Atualizando dados administrativos...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.dismiss();
      toast.success('Dados administrativos atualizados com sucesso!');

      if (selectedUtente) {
        setSelectedUtente({
          ...selectedUtente,
          nomeEntidade: data.nomeEntidade,
          numeroEntidade: data.numeroEntidade
        });
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Erro ao atualizar dados administrativos.');
      console.error(error);
    }
  }

  return (
    <div>
      {/* ==================== SEÇÃO: LISTA DE UTENTES ==================== */}
      <div className="min-h-screen bg-indigo-50 p-6">
        <div className="p-6">
          <TitleGestao title="Gestão de RCU" p="Consultar e actualizar apenas dados administrativos" />
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
          {/* Barra de Pesquisa */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <input
              type="text"
              placeholder="Pesquisar por nome do utente"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 px-4 rounded-lg border bg-indigo-50 outline-blue-500 w-full sm:max-w-sm"
            />
            <span className="text-sm text-gray-500">
              Total: {filteredUtentes.length} utente(s)
            </span>
          </div>

          {/* Tabela */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-100 text-left text-sm">
                  <th className="p-3">Nome</th>
                  <th className="p-3">E-mail</th>
                  <th className="p-3">Telefone</th>
                  <th className="p-3">Data de Registo</th>
                  <th className="p-3 text-center">Acções</th>
                </tr>
              </thead>
              <tbody>
                {filteredUtentes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center p-4 text-gray-500">
                      Nenhum utente encontrado
                    </td>
                  </tr>
                )}

                {filteredUtentes.map((utente) => (
                  <tr
                    key={utente.id}
                    className="border-b hover:bg-indigo-50 transition text-sm"
                  >
                    <td className="p-3 font-medium">{utente.nome}</td>
                    <td className="p-3">{utente.email}</td>
                    <td className="p-3">{utente.telefone}</td>
                    <td className="p-3">{utente.dataRegisto}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedUtente(utente)}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        Gerir RCU
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedUtente && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white z-10 p-6 border-b">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-blue-500 mb-2">
                      Gestão de RCU - {selectedUtente.nome}
                    </h2>
                    <p className="bg-yellow-50 rounded-md p-2 border border-yellow-300 text-sm">
                      ⚠️ <span className="font-semibold">Restrições:</span> Você pode consultar apenas dados administrativos e não pode alterar informações médicas (diagnósticos, terapêutica, etc.) inseridas pelo pessoal clínico.
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedUtente(null)}
                    className="hover:text-red-700 text-gray-600 text-2xl font-bold flex-shrink-0"
                  >
                    <FiX />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="border p-4 rounded-md shadow-sm bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2">
                    {selectedUtente.nome} - Nº {selectedUtente.numeroIdentificador}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <p><span className="font-semibold">Entidade Financeira:</span> {selectedUtente.nomeEntidade}</p>
                    <p><span className="font-semibold">Nº na Entidade:</span> {selectedUtente.numeroEntidade}</p>
                    <p><span className="font-semibold">Email:</span> {selectedUtente.email}</p>
                    <p><span className="font-semibold">Telefone:</span> {selectedUtente.telefone}</p>
                  </div>
                </div>
                <form onSubmit={handleSubmitEntidade(handleEntidadeFinanceira)} className="space-y-3 bg-indigo-50 p-4 rounded-md">
                  <h3 className="font-semibold text-lg">Dados Administrativos (Editáveis)</h3>
                  <div className='grid md:grid-cols-2 gap-4 w-full'>
                    <div className="space-y-1 flex flex-col w-full">
                      <label htmlFor="nomeEntidade" className="font-semibold">Entidade Financeira *</label>
                      <input
                        {...registerEntidade('nomeEntidade')}
                        type="text"
                        id="nomeEntidade"
                        defaultValue={selectedUtente.nomeEntidade}
                        placeholder="ACMS Seguros"
                        className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 outline-blue-500 border"
                        disabled={isSubmittingEntidade}
                      />
                      {errorsEntidade.nomeEntidade && <p className='text-xs text-red-600'>{errorsEntidade.nomeEntidade.message}</p>}
                    </div>
                    <div className="space-y-1 flex flex-col w-full">
                      <label htmlFor="numeroEntidade" className="font-semibold">Nº na Entidade *</label>
                      <input
                        {...registerEntidade('numeroEntidade')}
                        type="text"
                        id="numeroEntidade"
                        defaultValue={selectedUtente.numeroEntidade}
                        placeholder="SEG789456"
                        className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 outline-blue-500 border"
                        disabled={isSubmittingEntidade}
                      />
                      {errorsEntidade.numeroEntidade && <p className='text-xs text-red-600'>{errorsEntidade.numeroEntidade.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-1 flex flex-col w-full">
                    <label htmlFor="observacoes" className="font-semibold">Observações Administrativas</label>
                    <textarea
                      {...registerEntidade('observacoes')}
                      id="observacoes"
                      rows={3}
                      className="max-w-full border bg-zinc-50 rounded-lg pl-4 pt-2 outline-blue-500 border"
                      placeholder="Notas administrativas sobre o utente"
                      disabled={isSubmittingEntidade}
                    />
                    {errorsEntidade.observacoes && <p className='text-xs text-red-600'>{errorsEntidade.observacoes.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingEntidade}
                    className="bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed w-full h-12 rounded-xl font-semibold transition"
                  >
                    {isSubmittingEntidade ? 'Atualizando...' : 'Atualizar Dados Administrativos'}
                  </button>
                </form>

                <div className="space-y-3 bg-zinc-50 p-4 rounded-md">
                  <h3 className="font-semibold text-lg">Histórico de Consultas (Apenas Leitura)</h3>
                  {selectedUtente.historicoConsultas.length === 0 ? (
                    <p className="text-gray-500">Nenhuma consulta registrada.</p>
                  ) : (
                    selectedUtente.historicoConsultas.map((item, index) => (
                      <div key={index} className="border p-4 rounded-md bg-white">
                        <p className="font-semibold">{item.data} - {item.especialidade}</p>
                        <div className="text-zinc-700">
                          <p>Médico: <span className="font-semibold">{item.medico}</span></p>
                          <p className="flex items-center gap-2">Status:
                            {item.status === 'Cancelada' && (
                              <span className="text-red-500 font-semibold">🔴 Cancelada</span>
                            )}
                            {item.status === 'Reagendada' && (
                              <span className="text-yellow-500 font-semibold">🟡 Reagendada</span>
                            )}
                            {item.status === 'Realizada' && (
                              <span className="text-green-500 font-semibold flex items-center gap-2">🟢 Realizada <FiCheck /></span>
                            )}
                          </p>
                          <p className="text-red-500 text-sm">🔒 Diagnóstico e terapêutica: Acesso restrito ao pessoal clínico</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-3 bg-zinc-50 p-4 rounded-md">
                  <h3 className="font-semibold text-lg">Histórico de Exames (Apenas Leitura)</h3>
                  {selectedUtente.historicoExames.length === 0 ? (
                    <p className="text-gray-500">Nenhum exame registrado.</p>
                  ) : (
                    selectedUtente.historicoExames.map((item, index) => (
                      <div key={index} className="border p-4 rounded-md bg-white">
                        <p className="font-semibold">{item.data} - {item.exame}</p>
                        <div className="text-zinc-700">
                          <p className="flex items-center gap-2">Status:
                            {item.status === 'Cancelado' && (
                              <span className="text-red-500 font-semibold">🔴 Cancelado</span>
                            )}
                            {item.status === 'Reagendada' && (
                              <span className="text-yellow-500 font-semibold">🟡 Reagendada</span>
                            )}
                            {item.status === 'Realizada' && (
                              <span className="text-green-500 font-semibold flex items-center gap-2">🟢 Realizada <FiCheck /></span>
                            )}
                          </p>
                          <p className="text-red-500 text-sm">🔒 Resultados: Acesso restrito ao pessoal clínico</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Footer do Modal */}
              <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end">
                <button
                  onClick={() => setSelectedUtente(null)}
                  className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold transition"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}