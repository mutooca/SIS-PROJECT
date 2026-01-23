import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import atencao from "../img/atencao.PNG";


const exameSchema = z.object({
  tipoDeExame:z.enum(["Radiografia", "Tomografia", "Ressonancia magnética", "Electrocardiograma", "Ecografia", "Reforço", "Mamografia", "Analises Clinicas Gerais", "Medição de pressão"], "Selecione a dose aplicada"),
  data: z.string().min(1, "Data obrigatória").refine((value) => !isNaN(Date.parse(value)), {
    message: "Insira uma data válida",
  }).refine((value) => {
    const hoje = new Date();
    const dataSelecionada = new Date(value);
    return dataSelecionada >= new Date(hoje.toDateString()); 
  }, { message: "Não pode selecionar uma data anterior à atual" }),
  
  hora: z.string().min(1, "Hora obrigatória"),
});

type ExameData = z.infer<typeof exameSchema>;

 type ExameAgendado = {
  id: number;
  tipoDeExame: string;
  data: string;
  hora:string;
  estado: "Agendado"
 }

const examesComPrescricao = [
  "Radiografia",
  "Tomografia",
  "Ressonancia magnética",
  "Electrocardiograma",
  "Ecografia",
  "Mamografia" 
];

export default function ExamesTab() {
  const [examesAgendados, setExamesAgendados] = useState<ExameAgendado[]>([]);
  const [requerPrescricao, setRequerPrescricao] = useState(false);

   const handleExameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = e.target.value;
    setRequerPrescricao(examesComPrescricao.includes(valor));
  };

  const { register, handleSubmit, formState: { errors }, } = useForm ({
    resolver: zodResolver(exameSchema)
  });

 async function onSubmit(data: ExameData) {
  {/*Mock será subistituido por algo como: await fetch("/api/exames", {
  method: "POST",
  body: JSON.stringify(data),
});
*/}
    
    const novoExame: ExameAgendado = {
      id:Date.now(),
      tipoDeExame:data.tipoDeExame,
      data:data.data,
      hora:data.hora,
      estado: "Agendado"
    }
    setExamesAgendados(prev =>[...prev, novoExame]);
      
    setRequerPrescricao(false);
    console.log("ExameAgendado:", novoExame);
  }

  return (
    <>
      <div className="bg-white-500 rounded-xl ">
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
                      <form action="" onSubmit={handleSubmit(onSubmit)} className="my-3">
                      <div className="grid grid-cols-2 gap-4 w-full mt-3">
                        <div className="flex flex-col w-full space-y-1">
                          <label htmlFor="tipoDeExame" className="font-semibold text-zinc-800">Tipo de Exame</label>
                          <select  {...register("tipoDeExame")}
                                   onChange={handleExameChange} name="tipoDeExame" id="tipoDeExame" className="rounded-lg bg-indigo-50 border h-12 px-2 max-w-full outline-blue-500 " >
                            <option value="" >Selecione o exame...</option>
                           <optgroup label="⚠️ Requerem prescrição">
                                <option value="Radiografia" >Radiografia</option>
                                <option value="Tomografia" >Tomografia</option>
                                <option value="Ressonancia magnética" >Ressonancia magnética</option>
                                <option value="Electrocardiograma" >Electrocardiograma</option>
                                <option value="Ecografia" >Ecografia</option>
                                <option value="Mamografia" >Mamografia</option>
                            </optgroup>
                            <optgroup label="✓ Sem prescrição">
                                <option value="Analises Clinicas Gerais" >Análises clínicas Gerais</option>
                                <option value="Medição de pressão">Medição de pressão</option>
                            </optgroup>
                          </select>
                          
                           {errors.tipoDeExame &&  <p className='text-xs text-red-600'>{errors.tipoDeExame.message}</p>}
                       
                        </div>
                        <div className="flex flex-col space-y-1 w-full">
                          <label htmlFor="data" className="font-semibold text-zinc-800">Data </label>
                          <input {...register('data')}  type="date" name="data"  placeholder="dd/mm/aaaa" className="rounded-lg bg-indigo-50 h-12 px-2 max-w-full border outline-blue-500" />
                          {errors.data && <p className="test-xs text-red-600">{errors.data.message}</p>}
                        </div>
                      </div>
                       
                      <div className="flex flex-col space-y-1 my-2">
                        <label htmlFor="hora" className="text-zinc-800 font-semibold">Hora </label>
                        <input {...register('hora')}  type="time" placeholder="--:--" className=" h-12 px-2 rounded-lg bg-indigo-50 max-w-full border outline-blue-500" />
                        {errors.hora && (<p className="text-xs text-red-600">{errors.hora.message}</p>)}
                      </div>

                     {/* Div de aviso aparece só se, exame requer prescrição */}
                    {requerPrescricao && (
                      <div className="p-3 border border-blue-400 bg-blue-100/50 rounded-lg mb-3 text-blue-900">
                        📋 Este exame requer prescrição médica. <br />
                        Ao submeter, o sistema verificará se possui prescrição válida no seu RCU.
                      </div>
                    )}
                      <button className="rounded-lg w-full p-2 bg-blue-500 space-y-1 text-center text-white shadow my-1 hover:bg-blue-400 transition shadown-lg ">Marcar exame</button>
                    </form>

                    <section className="border rounded-xl p-3 spacey-y-2 mx-2 my-4">
                        <h2 className="font-semibold text-2xl mb-3">Exames Agendados</h2>

                        {examesAgendados.length === 0 && (
                          <p className="text-sm my-3 mx-1 text-zinc-500">Nunhum exame marcado ainda</p>
                        )}

                        {examesAgendados.map( exame =>(
                           <div key={exame.id} className="border rounded-xl shadow p-3 max-w-full">
                            <div className="flex  justify-between">
                              <div className="">
                                  <p className="font-semibold ml-3 ">{exame.tipoDeExame}</p>
                                  <p className="text-zinc-500 ml-3">{exame.data} às {exame.hora}</p>
                              </div>
                              <span className="rounded text-xs ml-3 bg-blue-100 text-blue-700 h-8 px-2 py-1 hover:cursor-pointer">{exame.estado}</span>
                           </div>
                           </div>
                        ))}
                    </section>
         </div>
    </>
  );
}
