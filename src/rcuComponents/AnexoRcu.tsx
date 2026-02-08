import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const anexoRcuSchema = z.object({
    tipo: z.string().min(1,"Seleione o tipo de arquivo"),
    arquivo: z.any().refine((files) => files?.length === 1, "Selecione um arquivo"),
});

type anexoRcuFormData =z.infer<typeof anexoRcuSchema>;

export default function AnexoRcu(){
    const {register, handleSubmit, formState: {errors},  reset,} = useForm({
        resolver: zodResolver(anexoRcuSchema)
    })

    async function onSubmit(data: anexoRcuFormData ){
        console.log("Tipo: ",data.tipo);
        console.log("Arquivo :", data.arquivo[0]);
        /*
        Aqui no futuro:
      - criar FormData
      - enviar via POST para o backend
     */

    reset();
    }

    return(
        <>

            <div className="border space-y-4 rounded-lg shadow p-4 bg-white mt-4">
                <h2 className="font-semibold text-2xl">Anexar Documento ao RCU</h2>

                <form onSubmit={handleSubmit(onSubmit)} action="" className="">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="tipo" className="font-semibold">Tipo de arquivo</label>
                            <select {...register("tipo")} name="" id="" className="max-w-full border rounded-lg bg-indigo-50 p-2">
                                <option value="" className="">Selecione o tipo de arquivo...</option>
                                <option value="Resultado de Exame">Resultado de Exame</option>
                                <option value="Receita Médica">Receita Médica</option>
                                <option value="Boletim de Vacina">Boletim de Vacina</option>
                                <option value="História Clínica">História Clínica</option>
                                <option value="Outro">Outro</option>
                            </select>
                            {errors.tipo && (
                            <p className="text-red-600 text-sm">{errors.tipo.message}</p>
                        )}
                       </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="arquivo" className="font-semibold">Arquivo</label>
                            <input    {...register("arquivo")} type="file" className="border
                             rounded-lg bg-indigo-50 p-2 max-w-full" />
                             {errors.arquivo && <p className="text-xs text-red-600">{errors.arquivo.message as string}</p>}
                        </div>
                    </div>

                    <button
          type="submit"
          className="bg-blue-500 text-white p-4 py-2 rounded-lg my-5 font-semibold flex flex-col text-center"
        >
          Adicionar Documento
        </button>
                </form>
            </div>
        </>
    )
}


