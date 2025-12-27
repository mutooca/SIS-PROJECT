import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import atencao from "../img/atencao.PNG";

const exameSchema = z.object({
  tipoDeExame: z.string().min(1, "Selecione o exame"),
  data: z.string().min(1, "Data obrigatória"),
  hora: z.string().min(1, "Hora obrigatória"),
});
type ExameData = z.infer<typeof exameSchema>;

const examesComPrescricao = [
  "radiografia",
  "Tomografia",
  "Ressonancia",
];

export default function ExamesTab() {
  const [requerPrescricao, setRequerPrescricao] = useState(false);

   const handleExameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = e.target.value;
    setRequerPrescricao(examesComPrescricao.includes(valor));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExameData>({
    resolver: zodResolver(exameSchema),
  });

 async function onSubmit(data: ExameData) {
    console.log("Exame:", data);
  }

  return (
    <>
      <div className="bg-white-500 runded-xl ">
                      <div className="flex flex-col ">
                        <h2 className="font-semibold text-2xl "> Marcar Exame</h2>
                        <p className="text-zinc-500 ">Alguns exames requerem prescrição médica válida no RCU</p>
                      </div>
                      <div className="flex flex-col rounded-lg border border-yellow-300 mt-4 bg-amber-50 p-2 space-x-1 ">
                        <div className="flex flex-row">
                          <img src={atencao} alt="aviso" />
                          <h3 className="text-amber-800 text-sm font-semibold ml-1"> Atenção:</h3>
                        </div>
                        <p className="  text-amber-800 ">Exames como Radiografia, Tomografia, Ressonância, Eletrocardiograma e outros requerem prescrição médica válida.</p>
                      </div>
                      <form action="" onSubmit={handleSubmit(onSubmit)} className="">
                      <div className="grid grid-cols-2 gap-4 w-full mt-3">
                        <div className="flex flex-col w-full space-y-1">
                          <label htmlFor="tipoDeExame" className="font-semibold text-zinc-800">Tipo de Exame</label>
                          <select  {...register("tipoDeExame")}
                                   onChange={handleExameChange} name="tipoDeExame" id="tipoDeExame" className="rounded-lg bg-indigo-50 border  p-2 max-w-full outline-0 " >
                            <option value="" >Selecione o exame...</option>
                           <optgroup label="⚠️ Requerem prescrição">
                                <option value="radiografia" >Radiografia</option>
                                <option value="Tomografia" >Tomografia</option>
                                <option value="Ressonancia magnética" >Ressonancia magnética</option>
                                <option value="Electrocardiograma" >Electrocardiograma</option>
                                <option value="Ecografia" >Ecografia</option>
                                <option value="mamografia" >Mamografia</option>
                            </optgroup>
                            <optgroup label="✓ Sem prescrição">
                                <option value="analisesClinicasGerais" >Análises clínicas Gerais</option>
                                <option value="mamografia" >Medição de pressão</option>
                            </optgroup>
                          </select>
                          
                           {errors.tipoDeExame &&  <p className='text-xs text-red-600'>{errors.tipoDeExame.message}</p>}
                       
                        </div>
                        <div className="flex flex-col space-y-1 w-full">
                          <label htmlFor="data" className="font-semibold text-zinc-800">Data preferencial</label>
                          <input {...register('data')} type="date" name="data"  placeholder="dd/mm/aaaa" className="rounded-lg bg-indigo-50 p-2 max-w-full border outline-0" />
                          {errors.data && <p className="test-xs text-red-600">{errors.data.message}</p>}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1 my-2">
                        <label htmlFor="hora" className="text-zinc-800 font-semibold">Hora preferencial</label>
                        <input {...register('hora')} type="time" placeholder="--:--" className=" p-2 rounded-lg bg-indigo-50 max-w-full border outline-0" />
                        {errors.hora && (<p className="text-xs text-red-600">{errors.hora.message}</p>)}
                      </div>

                     {/* Div de aviso aparece só se exame requer prescrição */}
                    {requerPrescricao && (
                      <div className="p-3 border border-blue-400 bg-blue-100/50 rounded-lg mb-3 text-blue-900">
                        📋 Este exame requer prescrição médica. <br />
                        Ao submeter, o sistema verificará se possui prescrição válida no seu RCU.
                      </div>
                    )}
                      <button className="rounded-lg w-full p-2 bg-blue-500 space-y-1 text-center text-white shadow my-1 hover:bg-blue-400 transition shadown-lg ">Verificar e marcar exame</button>
                    </form>
                    <div className="flex flex-col rounded-xl max-w-full mt-4 border shadow  space-y-2 p-2 mx-2">
                      <h2 className="font-semibold text-2xl space-y-1 ml-2">Exames Agendados</h2>

                      <div className="mb-2 rounded-xl border my-2 max-w-6xl ">
                        <h3 className="font-semibold ml-3">Eletrocardiograma</h3>
                        <p className="ml-3">20/12/2025 às 10:00</p>
                      </div>

                 </div>
         </div>
    </>
  );
}
