import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const consultaSchema  = z.object({
    especialidade: z.string().min(1,"Selecione a especialidade"),
    medico: z.string().min(1, "Informe o médico"),

    
  data: z
  .string()
  .min(1, "Preencha este campo!")
  .refine((value) => !isNaN(Date.parse(value)), {
    message: "Insira uma data válida",
  })
  .refine((value) => {
    const dataSelecionada = new Date(value)
    const hoje = new Date()

    // Zerar horas para comparar só a data
    hoje.setHours(0, 0, 0, 0)

    return dataSelecionada >= hoje
  }, {
    message: "A data não pode ser anterior à data atual",
  }),


  hora: z
  .string()
  .min(1, "Hora obrigatória")
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato inválido (HH:mm)")
  .refine((value) => {
    const [h, m] = value.split(":").map(Number)
    const total = h * 60 + m
    return total >= 480 && total <= 1020
  }, {
    message: "Horário fora do atendimento (08:00 às 17:00)"
  })
})

type ConsultaData = z.infer<typeof consultaSchema>;

export default function ConsultasTab() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultaData>({
    resolver: zodResolver(consultaSchema),
  });

  async function handleConsulta(data: ConsultaData) {
    console.log("Consulta:", data);
  }

  return (
    <>
      <div className="bg-white-500 rounded-xl">
                            <div className="flex flex-col w-full my-2">
                                <h1 className="texte-2xl font-semibold">Marcar Nova Consulta</h1>
                                <p className="text-zinc-600">Agende consultas com especialistas</p>
                            </div>
                            <form  onSubmit={handleSubmit(handleConsulta)} action="" className="space-y-3">
                                <div className="grid grid-cols-2 max-w-full gap-2">
                                        <div className="flex flex-col ">
                                            <label htmlFor="especialidade" className="">Especialidade</label>
                                             <select  {...register('especialidade')} name="especialidade" id="especialidade" className="h-12 border max-w-full rounded-lg bg-indigo-50 outline-blue-500">
                                                <option value="">Seleccione a especialidade...</option>
                                                
                                                <option value="Cardiologia">Cardiologia</option>
                                                <option value="Neurologia">Neurologia</option>
                                                <option value="Ortopedia">Ortopedia</option>
                                                <option value="Pediatria">Pediatria</option>
                                                <option value="Oftalmologia">Oftalmologia</option>
                                                <option value="Cardiologia">Otorrinolaringologia</option>
                                                <option value="Clínica Geral">Clínica Geral</option>
                                                <option value="Medicina Interna">Medicina Interna</option>
                                              </select>
                                              {errors.especialidade && <p className='text-xs text-red-600'>{errors.especialidade.message}</p>}
                                        </div>
                                        <div className="flex flex-col ">
                                            <label htmlFor="medico" className="">Medico</label>
                                            <input {...register('medico')} type="text" placeholder='Dr. Joao Silva' 
                                            className="h-12 border max-w-full rounded-lg bg-indigo-50 outline-blue-500" />
                                            {errors.medico  && <p className='text-xs text-red-600'>{errors.medico.message}</p>}
                                        </div>
                                </div>
                                <div className="grid grid-cols-2 max-w-full gap-2">
                                    <div className="flex flex-col">
                                        <label htmlFor="data" className="">Data</label>
                                        <input {...register('data')} type="date" placeholder='dd/mm/aaaa' 
                                            className="h-12 border max-w-full rounded-lg bg-indigo-50 outline-blue-500" />
                                            {errors.data  && <p className='text-xs text-red-600'>{errors.data.message}</p>}
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="hora" className="">Hora</label>
                                        <input {...register('hora')} type="time" placeholder='--:--' 
                                            className="h-12 border max-w-full rounded-lg bg-indigo-50 outline-blue-500" />
                                            {errors.hora  && <p className='text-lg text-red-600 '>{errors.hora.message}</p>}
                                    </div>
                                </div>
                                <button type="submit" className="flex flex-col w-full h-10 font-semibold bg-blue-500 rounded-lg text-white py-2 hover:scale-in-[115px] transition shadow mx-auto text-center mx-center">Marcar Consulta</button>
                            </form>
                            
                            {/**DEPOIS DE O UTENTE ESCREVER OS DADOS, VAI SER LISTADO AUTOMATICAMENTE POR BAIXO, MALTA DO BACK */}
                            <div className="bg-white rounded-lg flex flex-col border w-full mt-10 shadow">
                                <h2 className="text-2xl font-semibold ml-2">Histórico de Actividades</h2>
                                <div className="flex flex-col mt-5 ml-8 mb-3">
                                    <h2 className="font-semibold text-sm">Consulta de Cardiologia</h2>
                                    <p className="text-zinc-500">01/03/2024 - Dr. João Silva</p>
                                </div>
                            </div>
         </div>
    </>
  );
}
