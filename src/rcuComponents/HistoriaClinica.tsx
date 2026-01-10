import {useForm} from "react-hook-form";
import{z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const historiaClinicaSchema = z.object({
  descricao: z
    .string()
    .min(5, "A descrição deve ter no mínimo 5 caracteres"),

  data: z
    .string()
    .min(1, "A data é obrigatória")
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Data inválida",
    })
    .refine((value) => new Date(value) <= new Date(), {
      message: "A data não pode ser futura",
    }),
});


type historiaClinicaForm = z.infer<typeof historiaClinicaSchema>;

export default function HistoriaClinica(){
   const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(historiaClinicaSchema)
   })

   async function onSubmit(data: historiaClinicaForm){
     console.log(data);
    // POST -> backend
   }
   
   return(
    <>
        <div className="border space-y-4 shadow rounded-lg bg-white p-4 mt-2">
            <h2 className="text-2xl font-semibold mt-2">História Clínica</h2>

            <form onSubmit={handleSubmit(onSubmit)} action="" className="">
                <div className="flex flex-col space-y-1 my-2">
                    <label htmlFor="descricao" className="font-semibold">Descriçao</label>
                    <textarea {...register("descricao")} name="descricao" id="descricao" placeholder="Regista acontecimentos que já ocorreram, Diagnósticos, Internamentos, Cirurgias, Evoluções clínicas... "
                    className="p-2 border outline-blue-500 rounded-lg bg-indigo-50 max-w-full"></textarea>
                    {errors.descricao && <p className="text-xs text-red-600">{errors.descricao.message}</p>} 
                </div>
                <div className="flex flex-col space-y-1 my-2">
                    <label htmlFor="data" className="font-semibold">Data</label>
                    <input {...register('data')} placeholder="dd/mm/aaaa" type="date" className="h-12 border rounded-lg bg-indigo-50 outline-blue-500 max-w-full" />
                    {errors.data && <p className="text-xs text-red-600">{errors.data.message}</p>} 
                </div>

                 <button className="flex flex-col justify-start bg-blue-500 shadow-lg rounded-lg p-2 text-center my-4 text-white font-semibold">Guardar Histórico Clínica</button>
            </form>
        </div>
    </>
   )
}