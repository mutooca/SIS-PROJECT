import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import lampada from "../img/lampada.PNG";

const historiaFamiliarSchema = z.object({
    descricao: z.string().min(1, "Descrição obrigatória"),
    parentesco: z.enum([
  "Pai", "Mãe", "Avô", "Avó", "Irmão", "Irmã", "Tio", "Tia", "Primo", "Prima", "Outro",], "Seleciona este campo")
});
 
type historiaFamiliarForm = z.infer<typeof historiaFamiliarSchema>;

export default function HistoriaFamiliar(){
    const {register, handleSubmit, formState: {errors}} = useForm<historiaFamiliarForm>({
        resolver: zodResolver(historiaFamiliarSchema),
    });

    async function onSumit(data: historiaFamiliarForm) {
        console.log(data);
         // POST -> backend
    }

    return(
        <div className="border shadow space-y-4 bg-white p-4 rounded-lg mt-2">
            <h2 className="font-semibold mt-1 text-2xl ">História Familiar</h2>
            <div className="flex ">
                <p className="text-amber-600 mx-1">Importante:</p>
                <p className="font-semibold mx-1 text-gray-500 text-sm"> Preencha estes dados para que o médico possa visualizá-los durante as suas consultas</p>
            </div>

            <div className="flex flex-col rounded-lg border border-blue-300 mt-4 bg-blue-50 p-2 space-x-1 ">
                <div className="flex flex-row">
                     <img src={lampada} alt="aviso" />
                    <p className="text-blue-800 text-sm font-bold ml-1"> Dica:</p>
                    <p className="text-blue-700 mx-1 text-sm">Inclua informações sobre doenças hereditárias na família, como diabetes, hipertensão, doenças cardíacas, cancro, etc. 
                   E seleciona quem da família</p>
                </div>
                <p className="  text-blue-700 text-sm"> tem ou teve esta patológia. Estes dados ajudam o médico a avaliar melhor a sua saúde.</p>
            </div>

            <form onSubmit={handleSubmit(onSumit)} action="" className="">
                <div className="flex flex-col space-y-2">
                    <label htmlFor="descricao" className="font-semibold ">Descrição</label>
                   <textarea {...register("descricao")} name="descricao" id="descricao" placeholder="Diabetes tipo 2, Asma..."
                    className="h-12 p-2 border outline-blue-500 rounded-lg bg-indigo-50 max-w-full"></textarea>
                    {errors.descricao && <p className="text-xs text-red-600">{errors.descricao.message}</p>} 
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                    <label htmlFor="parentesco" className="font-semibold">Parentesco</label>
                    <select {...register("parentesco")} name="parentesco" id="parentesco" className="h-12 bg-indigo-50 rounded-lg border outline-blue-500 max-w-full">
                        <option value="" className="">Selecione o parente...</option>
                        <option value="Pai">Pai</option>
                        <option value="Mãe">Mãe</option>
                        <option value="Avô">Avô</option>
                        <option value="Avó">Avó</option>
                        <option value="Irmão">Irmão</option>
                        <option value="Irmã">Irmã</option>
                        <option value="Outro">Outro</option>
                    </select>
                    {errors.parentesco && <p className="text-xs text-red-600">{errors.parentesco.message}</p>} 

               </div>
               <button className="flex flex-col justify-start bg-blue-500 shadow-lg rounded-lg p-2 text-center my-4 text-white font-semibold">Guardar Histórico familiar</button>
            </form>
        </div>
    )
}