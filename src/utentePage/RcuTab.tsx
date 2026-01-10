

import { useEffect, useState } from "react";
import DadosMedicosFixos from "../rcuComponents/DadosMedicosFixos";
import HistoriaFamiliar from "../rcuComponents/HistoriaFamiliar";
import HistoriaClinica from "../rcuComponents/HistoriaClinica";
import CartaoDeVacina from "../rcuComponents/CartaoDeVacina";
import AnexoRcu from "../rcuComponents/AnexoRcu";
import {Download,  FileText, CircleCheckBig} from "lucide-react"

/* ============ TIPOS DE DADOS============= */
type Anexo = {
  id: number;
  tipo: string;
  nome_Arquivo: string;
  caminho_arquivo: string;
  data_upload: string;
}

type Exame = {
  id: number;
  tipoDeExame: string;
  data: string;
  hora: string;
  estado: "Em progresso" | "Disponivel";
  anexos?: Anexo[];
}

type Terapeutica = {
  id: number;
  medicamento: string;
  dosagem: string;
  data_inicio: string;
  data_fim ?: string;
}

 type Especialidade = {
    id: number;
    nome: string;
    descricao: string;
  }

type Consulta = {
  id: number;
  data: string;
  hora: string;
  sintomas: string;
  prosedimentos: string;
  observacoes?: string;
  diagnostico: string;
  terapeuticas?: Terapeutica[];

  pessoal_clinico: {
    id: number;
    nome: string;
    especialidades: Especialidade[];
    numero_ordem: string;
    telefone: string;
  }
}

type Prescricao = {
  id: number;
  justificativa: string;
  dataValidade: string;
  medico: {
    id: number;
    nome: string;
    numero_ordem: string;

  }
  examesPrescritos:{
    id: number;
    tipoDeExame: string;
    estado: "Ativo" | "Inválido";
  } []; 
};

export default function UtenteRCU() {

  const [exames, setExames] = useState<Exame[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [prescricoes, setPrescricoes] = useState<Prescricao[]>([]);
 

 /* ---------- MOCK (SIMULA BACKEND) ---------- */
useEffect(() => {
  setExames([
    {
      id: 1,
      tipoDeExame: "Radiografia de Tórax",
      data: "2025-11-15",
      hora: "10:20",
      estado: "Em progresso",
      anexos: []
    },
    {
      id: 2,
      tipoDeExame: "Radiografia",
      data: "2025-12-15",
      hora: "10:20",
      estado: "Disponivel",
      anexos: [
        {
          id: 1,
          tipo: "ResultadoExame",
          nome_Arquivo: "resultado_analise.pdf",
          caminho_arquivo: "/files/resultado_analise.pdf",
          data_upload: "2025-12-25"
        },
        {
          id: 2,
          tipo: "Receita",
          nome_Arquivo: "receita_analise.pdf",
          caminho_arquivo: "/files/receita_analise.pdf",
          data_upload: "2025-12-25"
        }
      ]
    },
    {
      id: 3,
      tipoDeExame: "Eletrocardiograma",
      data: "2025-10-15",
      hora: "12:20",
      estado: "Em progresso",
      anexos: []
    }
  ]);

  setConsultas([
    {
      id: 1,
      data: "2025-05-25",
      hora: "12:20",
      sintomas: "Dor no peito, febre e dor de cabeça",
      prosedimentos: "Avaliação clínica",
      observacoes: "Repouso recomendado",
      diagnostico: "Gripe",
      pessoal_clinico: {
        id: 1,
        nome: "Dra. Ana Santos",
        numero_ordem: "MED-20394",
        telefone: "945673852",
        especialidades: [
          {
            id: 1,
            nome: "Pediatria",
            descricao: "Tratamento de doenças de bebés"
          }
        ]
      },
      terapeuticas: [
        {
          id: 1,
          medicamento: "Paracetamol, Dolarem",
          dosagem: "500mg - 2x ao dia, 200mg - 2x ao dia",
          data_inicio: "2025-02-10",
          data_fim: "2025-02-15"
        }
      ]
    },
    {
      id: 2,
      data: "2025-12-25",
      hora: "11:20",
      sintomas: "Febre e dor de cabeça",
      prosedimentos: "Avaliação clínica",
      observacoes: "Repouso recomendado",
      diagnostico: "Gripe",
      terapeuticas: [],
      pessoal_clinico: {
        id: 2,
        nome: "Dra. Kama Eduardo",
        numero_ordem: "MED-20794",
        telefone: "945673567",
        especialidades: [
          {
            id: 1,
            nome: "Pediatria",
            descricao: "Tratamento de doenças de bebés"
          }
        ]
      }
    }
  ]);

  setPrescricoes([
    {
      id: 1,
      dataValidade: "2026-03-25",
      justificativa: "Pressão arterial",
      medico: {
        id: 1,
        nome: "Ana Santos",
        numero_ordem: "M123"
      },
      examesPrescritos: [
        {
          id: 1,
          tipoDeExame: "Radiografia",
          estado: "Ativo"
        }
      ]
    },
    {
      id:2,
      dataValidade: "2026-02-25",
      justificativa: "Dores no peito",
      medico: {
        id:2,
        nome: "José Silva",
        numero_ordem: "M23-12"
      },
      examesPrescritos: [
        {
          id:2,
          tipoDeExame: "Mamografia",
          estado: "Ativo"
        }
      ]
    }
  ]);
}, []);

  return (
    <div className="space-y-8 ">

      {/* ================= ESTADO DOS EXAMES ================= */}
      <section className="">
        <h2 className="font-semibold text-2xl">Estado dos meus exames efectuados</h2>
        <p className="text-zinc-500 my-1 text-sm mb-3">Acompanhe o estado dos seus exames e faça download dos resultados</p>
        {exames.map((exame) =>(
          <div key={exame.id} className={`p-4 shadow rounded-lg mb-3  ${exame.estado === "Disponivel" ? "border bg-white border-zinc-500": "border bg-white border-zinc-500"}`}>
              <div className="flex  justify-between">
                <div className="">
                  <p className="font-semibold">{exame.tipoDeExame}</p>
                 <p className="text-zinc-500">{exame.data}  às {exame.hora}</p>
                </div>
                <div className="">
                  <p className={`rounded-xl text-xs h-8 px-1 py-1 font-semibold  ${exame.estado === "Disponivel" ? "bg-green-100 text-green-700": "bg-amber-100 text-amber-700"}`}>{exame.estado}</p>
                </div>
              </div>
            {exame.estado === "Disponivel" && exame.anexos && exame.anexos.length > 0 && (
              <div className="mt-2 border-t border-t-gray-500">
                <p className="text-zinc-500 mt-1 font-semibold mb-1">Arquivos disponíveis:</p>
                {exame.anexos.map( anexo =>(
                  <div key={anexo.id} className={`rounded p-3 items-center flex justify-between mb-2 ${anexo.nome_Arquivo === "resultado_analise.pdf"? "bg-green-50 text-green-800": "bg-blue-50 text-blue-700"}`}>
                    <div className="flex ">
                     <FileText className="w-4 h-4 mr-2 mt-1"/> <span >{anexo.nome_Arquivo}</span>
                   </div>
                    <a href= {anexo.caminho_arquivo} download  className="flex  px-3 py-2 items-center rounded-lg border border-blue-500 text-sm text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-colors duration-200"> <Download className="w-5 h-5 mr-2" /> Download</a>
                  </div>
                ) )}
              </div>
            )  }
              
          </div>
        ))}
      </section>

      {/* ================= CONSULTAS ================= */}
 <section className="border rounded-xl p-4">
  <h2 className="font-semibold text-2xl mt-2">Consultas registradas</h2>
  <p className="text-zinc-500">Dados das suas consultas enviados pelo médico</p>

  {consultas.map((c) => (
    <div key={c.id}
      className="border rounded-lg border-zinc-500 p-3 mb-2 my-4 ">
      <div className="font-semibold">
        {c.pessoal_clinico.especialidades.map((especiali) => (
          <p key={especiali.id} className="mt-2">{especiali.nome}</p>
        ))}
      </div>

      <p className="text-zinc-500"> {c.data} - {c.hora} - {c.pessoal_clinico.nome}</p>
      <p ><span className="font-semibold mr-1">Sintomas:</span>{c.sintomas}</p> 
      <p > <span className="font-semibold mr-1"> Procedimentos:</span>{c.prosedimentos}</p>

      <h3 className="font-semibold mt-2">Terapêutica:</h3>

      {c.terapeuticas && c.terapeuticas.length > 0 ? (
        c.terapeuticas.map((tera) => (
          <div key={tera.id} className="ml-2">
            <p><span className="font-semibold mr-1">  Medicamento:</span>{tera.medicamento}</p>
            <p><span className="font-semibold mr-1">Dosagem: </span>{tera.dosagem} </p>
            <p><span className="font-semibold mr-1">Data de Início:</span>{tera.data_inicio}</p>
          </div>
        ))
      ) : (
        <p>Consulta sem terapêutica</p>
      )}
    </div>
  ))}
</section>

{/* ================= PRESCRIÇÕES ================= */}
<section className="border rounded-lg p-4">
  <h2 className="font-semibold text-2xl mt-1">Prescrições Médicas Ativas</h2>
  <p className="text-zinc-500 mt-1"> Prescrições válidas para marcação de exames</p>

  {prescricoes.map((p) => (
    <div key={p.id}
       className="border border-green-300 bg-green-50 flex justify-between rounded-lg p-4 mt-3">
      <div className="">
        <div className="space-y-1">
          {p.examesPrescritos.map((tipoExame) => (
            <p key={tipoExame.id} className="text-green-800 font-semibold flex items-center" >
                 <CircleCheckBig className="mr-2  h-5 w-5 mt-1"/> {tipoExame.tipoDeExame}
            </p>
          ))}
        </div>
        <p className="text-green-800"><span className="text-green-900 font-semibold mr-1">Prescrito por:</span>{p.medico.nome}</p>
        <p className="text-green-800"><span className="text-green-900 font-semibold mr-1"> Válido até: </span>{p.dataValidade}</p>
      </div>   
      <div className="flex flex-col">
        {p.examesPrescritos.map((tipoExame) => (
          <button key={tipoExame.id}  className="px-2 rounded-2xl bg-green-600 text-white mb-3" > {tipoExame.estado}</button>
        ))}
      </div>
    </div>
  ))}
</section>
  {/* ==== DADOS MÉDICOS FIXOS ===*/}  
       <DadosMedicosFixos/>
  {/* ==== História Familiar ====*/}
       <HistoriaFamiliar/>
   {/* ==== História Clínica =====*/}
       <HistoriaClinica/>
 {/* =====Cartao de vacina ====*/}
       <CartaoDeVacina/>
  {/* ===== Anexo Rcu =========*/}
       <AnexoRcu/>     
 </div>
 
  );
}
