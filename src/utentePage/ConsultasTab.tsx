import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tally1 } from "lucide-react";

/* ======MOCKS (SIMULAM BACKEND)========= */
const especialidadesMock = [
  { id: 1, nome: "Cardiologia" },
  { id: 2, nome: "Neurologia" },
  { id: 3, nome: "Pediatria" },
];

// MÉDICOS
const medicosMock = [
  {
    id: 1,
    nome: "Dr. Ana Santos",
    especialidadeId: 1,
    horario: "08:00 - 14:00",
  },
  {
    id: 2,
    nome: "Dr. João Silva",
    especialidadeId: 2,
    horario: "09:00 - 16:00",
  },
  {
    id: 3,
    nome: "Dra. Maria Lopes",
    especialidadeId: 1,
    horario: "10:00 - 15:00",
  },
];

/*===========SCHEMA ========= */
const consultaSchema = z.object({
  especialidadeId: z.string().min(1, "Selecione a especialidade"),
  medicoId: z.string().min(1, "Selecione o médico"),
  data: z.string().min(1, "Data obrigatória").refine((value) => !isNaN(Date.parse(value)), {
    message: "Insira uma data válida",
  }).refine((value) => {
    const hoje = new Date();
    const dataSelecionada = new Date(value);
    return dataSelecionada >= new Date(hoje.toDateString()); 
  }, { message: "Não pode selecionar uma data anterior à atual" }),

  hora: z.string().min(1, "Hora obrigatória"),
});

type ConsultaFormData = z.infer<typeof consultaSchema>;

type Consulta = {
  id: number;
  medicoNome: string;
  especialidadeNome: string;
  data: string;
  hora: string;
  estado: "Agendada";
};

export default function ConsultasTab() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] =
    useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ConsultaFormData>({
    resolver: zodResolver(consultaSchema),
  });

  // FILTRA MÉDICOS PELA ESPECIALIDADE
  const medicosFiltrados = medicosMock.filter(
    m => m.especialidadeId === especialidadeSelecionada
  );

 async function handleConsulta(data: ConsultaFormData) {

    const especialidadeId = Number(data.especialidadeId);
    const medicoId = Number(data.medicoId);

    const medico = medicosMock.find(m => m.id === medicoId);

    const especialidade = especialidadesMock.find(
      e => e.id === especialidadeId
    );

    if (!medico || !especialidade) return;

    const novaConsulta: Consulta = {
      id: Date.now(),
      medicoNome: medico.nome,
      especialidadeNome: especialidade.nome,
      data: data.data,
      hora: data.hora,
      estado: "Agendada",
    };

    setConsultas(prev => [...prev, novaConsulta]);

    reset();
    setEspecialidadeSelecionada(null);
  }

  return (
    <div className="space-y-8 bg-white rounded-xl p-4">

      <section>
        <h1 className="text-xl font-semibold">Marcar Nova Consulta</h1>
        <p className="text-zinc-500">Agende consultas com especialistas</p>
         <form onSubmit={handleSubmit(handleConsulta)} className="space-y-3 my-4">
          <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="flex flex-col">
            <label className="block mb-1">Especialidade</label>
            <select {...register("especialidadeId")}
              onChange={e => setEspecialidadeSelecionada(e.target.value ? Number(e.target.value) : null )}
              className="max-w-full h-12 border rounded-lg px-2 outline-blue-500 bg-indigo-50" >
              
              <option value="">Selecione...</option>
              {especialidadesMock.map(e => (
                <option key={e.id} value={e.id}> {e.nome}</option>
              ))}
            </select>
            {errors.especialidadeId && ( <p className="text-red-600 text-xs mt-1"> {errors.especialidadeId.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="block mb-1">Médico</label>
            <select {...register("medicoId")} disabled={!especialidadeSelecionada}
              className="max-w-full h-12 border outline-blue-500 bg-indigo-50 rounded-lg px-2 disabled:bg-gray-100" >
             
              <option value="">Selecione o médico</option>
              {medicosFiltrados.map(m => (
                <option key={m.id} value={m.id}> {m.nome} </option>
              ))}
            </select>
            {errors.medicoId && (<p className="text-red-600 text-xs mt-1"> {errors.medicoId.message} </p>
            )}
          </div> 
        </div>
        <div className="grid grid-cols-2 gap-2 ">
            <div className="flex flex-col">
              <label htmlFor="data" className="font-semibold">Data:</label>
              <input {...register("data")} type="date" placeholder="dd-mm-aaaa" className="p-3 bg-blue-50 border rounded-lg outline-blue-500" />
              {errors.data && (<p className="text-red-600 text-xs">{errors.data.message}</p>)} 
            </div>
            <div className="flex flex-col">
              <label htmlFor="hora" className="font-semibold">Hora:</label>
              <input {...register("hora")} type="time" placeholder="-:-" className=" p-3 bg-blue-50 border rounded-lg outline-blue-500" />
              {errors.hora && (<p className="text-red-600  text-xs">{errors.hora.message}</p>)} 
            </div>
        </div>

          <button type="submit" className="flex flex-col w-full bg-blue-500 text-white py-2 rounded-lg my-4" >Marcar Consulta</button>
        </form>
      </section>

      {/* LISTAGEM DOS DADOS SUBMETIDOS */}
      <section className="border rounded-xl p-4 flex flex-col ">
        <h2 className="font-semibold text-lg mb-3"> Histórico de Actividades </h2>

        {consultas.length === 0 && (
          <div className="flex ">
          <Tally1 className="text-blue-500"/>
          <p className="text-sm text-gray-500">
            Nenhuma consulta marcada.
          </p>
          </div>
        )}

        {consultas.map(c => (
          <div key={c.id} className="flex rounded-lg p-3  ">

              < Tally1 className=" text-blue-500 flex-shrink-0 "/>
             <div className="">
                <p className="font-semibold">{c.especialidadeNome}</p>
                <p>{c.medicoNome}</p>
                <p className="text-sm text-gray-500">
                  {c.data} às {c.hora}
                </p>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {c.estado}
                </span>
            </div>
          </div>
        ))}
      </section>
    </div>

  );
}
