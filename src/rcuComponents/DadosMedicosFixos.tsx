import {useForm} from "react-hook-form";
import {z} from "zod";
import { zodResolver} from "@hookform/resolvers/zod";

const dadosMedicosFixosSchema = z.object(
    {
        sexo: z.enum(["Masculino", "Femenino"], "Selecione o sexo"),
       grupoSanguineo: z.enum( ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], 
       "Selecione um grupo sanguíneo válido"),
     alergias: z.string().min(1,"Informe as alergias").optional(),
  }
)

       

type dadosMedicosFixosForm = z.infer<typeof dadosMedicosFixosSchema>;



export default function DadosMedicosFixos(){
    const {register, handleSubmit, formState:{errors}} = useForm<dadosMedicosFixosForm>({
        resolver: zodResolver(dadosMedicosFixosSchema)}
    )

    const gruposSanguineos = [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-"
    ];

    async function onSubmit(data: dadosMedicosFixosForm ){
        console.log("Dados médicos fixos: ", data);
        // POST -> backend
    }
    return(
        <>
            <div className="bg-white-500 shadow rounded-lg  space-y-4 border p-4">
                <h2 className="font-semibold text-xl mt-3">Dados Médicos Fixos</h2>

                <form action="" onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="grid grid-cols-2 gap-4 max-w-full">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="sexo" className="font-semibold">Sexo</label>
                            <select {...register("sexo")} name="" id="" className="h-12 border max-w-full rounded-lg bg-indigo-50 outline-blue-500">
                                <option value="">Selecione o sexo</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                            {errors.sexo && <p className="text-xs text-red-600">{errors.sexo.message}</p>}
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="grupoSanguineio" className="font-semibold">Grupo sanguíneio</label>
                            <select
                                {...register("grupoSanguineo")}
                                className="p-3 border w-full rounded-lg bg-indigo-50 outline-blue-500"
                                >
                                <option value="">Selecione o grupo sanguíneo</option>

                                {gruposSanguineos.map((grupo, index) => (
                                    <option key={index} value={grupo}>
                                    {grupo}
                                    </option>
                                ))}
                                </select>
                             {errors.grupoSanguineo &&  <p className="text-xs text-red-600">{errors.grupoSanguineo.message}</p>}
                        </div>
                       
                    </div>
                    <div className="flex flex-col space-y-1 mt-4">
                        <label htmlFor="alergias" className="font-semibold">Alergias</label>
                        <textarea {...register("alergias")} name="alergias" id="alergias" placeholder="Liste suas alergias..." className="w-full border bg-indigo-50 rounded-lg p-4 outline-blue-500"></textarea>
                    </div>
                    <button className="flex flex-col justify-start bg-blue-500 shadow-lg rounded-lg p-2 text-center my-4 text-white font-semibold">Guardar</button>
                </form>
            </div>
        </>
    )
}