import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const cartaoDeVacinaSchema = z.object({
    nome: z.string().min(1, "Informe o nome da vacina"),
    tipo: z.string().optional(),
    dose: z.enum(["1ª Dose", "2ª Dose", "3ª Dose", "4ª Dose", "Dose única", "Reforço"], "Selecione a dose aplicada"),
});

type cartaoDeVacinaForm= z.infer<typeof cartaoDeVacinaSchema>;

export default function CarataoDeVacina(){
    const {register,  handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(cartaoDeVacinaSchema)
    })
     async function onSubmit(data: cartaoDeVacinaForm){
        console.log(data);
     }
const vacinas = [
  "BCG (Tuberculose)",
  "Poliomielite",
  "Pentavalente (DTP-HepB-Hib)",
  "Pneumocócica Conjugada (PCV)",
  "Rotavírus",
  "Sarampo",
  "Febre Amarela",
  "Tétano",
  "Hepatite B",
  "Influenza (Gripe)",
  "COVID-19",
  "Varíola dos Macacos (Mpox)"
];
const tiposVacina = [
   " Campanha",
  " Viral",
  "Vírus vivo atenuado",
  "Vírus inativado",
  "Bacteriana inativada",
  "Toxoide",
  "Subunidade / Conjugada",
  "Combinada",
  "mRNA",
  "Vetor viral"
];



     return(
        <>
            <div className="border shadow space-y-4 rounded-lg bg-white-500 p-4 mt-2">
                <h2 className="font-semibold text-2xl">Boletim de Vacina</h2>

                <form onSubmit={handleSubmit(onSubmit)} action="" className="">
                    <div className="grid grid-cols-2 space-y-1 gap-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="nome" className="font-semibold">Nome da Vacina</label>
                            <select {...register("nome")}   className="p-3 border outline-blue-500 rounded-lg max-w-full
                            bg-indigo-50" >
                            <option value="" >Selecione a vacina...</option>
                             {vacinas.map((vacina, index) => (
                                <option key={index} value={vacina}>
                                {vacina}
                                </option>
                            ))}
                        </select>
                            {errors.nome && <p className="text-xs text-red-600">{errors.nome.message}</p>} 
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="tipo" className="font-semibold">Tipo de Vacina</label>
                            <select {...register("tipo")}  className="border
                             outline-blue-500 rounded-lg p-3 max-w-full bg-indigo-50" >
                                <option value="">Selecione o tipo de vacina</option>
                                    {tiposVacina.map((tipo, index) => (
                                        <option key={index} value={tipo}>
                                        {tipo}
                                        </option>
                                    ))}
                            </select>
                             
                        </div>
                    </div>
                   
                    <div className="flex flex-col space-y-2 my-2">
                        <label htmlFor="lote" className="font-semibold">Dose</label>
                        <select {...register("dose")} name="dose" id="dose" className="p-3 w-full
                         rounded-lg border bg-indigo-50 outline-blue-500">
                            <option value="" className="">Selecione a dose</option>
                            <option value="1ª Dose" >1ª Dose</option>
                             <option value="2ª Dose" >2ª Dose</option>
                            <option value="3ª Dose" >3ª Dose</option>
                            <option value="4ª Dose" >4ª Dose</option>
                            <option value="Dose única" >Dose única</option>
                         </select>
                         {errors.dose && <p className="text-xs text-red-600">{errors.dose.message}</p>}  
                    </div>
                <button className="flex flex-col bg-blue-500 rounded-lg shadow-xl text-center text-white font-semibold p-2 w-full my-4">Guardar</button>
                </form>
            </div>
        </>
     )
}