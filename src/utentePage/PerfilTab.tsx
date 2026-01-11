import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const perfilSchema = z.object({
    nome: z.string().min(2, "Nome obrigatorio"),
    email: z.string().email("Preencha este campo"),
    telefone: z.string().min(9, "Preencha este campo"),
    entidadeFinanceira: z.string().min(3,"Preencha este campo")
})

type PerfilData = z.infer<typeof perfilSchema>;

export default function PerfilTab() {
  const { register, handleSubmit, formState: { errors } } =
    useForm({
      resolver: zodResolver(perfilSchema),
    });

  async function onSubmit(data: PerfilData) {
    console.log("Perfil:", data);
  }

  return (
    <>
      <div className="bg-white-500 rounded-xl">
         <div className="my-4">
              <h2 className="font-semibold">Dados Pessoais</h2>
         </div>            
          <form onSubmit={handleSubmit(onSubmit)} action="" className="">
                 <div className="grid grid-cols-2 gap-4 ">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="nome" className="">Nome Completo</label>
                        <input {...register('nome')} type="text" placeholder="Seu nome completo" className="rounded-lg bg-indigo-50 p-3 max-w-full outline-0 border" />
                        {errors.nome &&  <p className="text-xs text-red-600">{errors.nome.message}</p>}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="email" className="">E-mail</label>
                        <input {...register('email')} type="email" placeholder="Seu e-mail" className="rounded-lg bg-indigo-50 p-3 max-w-full outline-0 border" />
                        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4 my-2">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="telefone" className="">Telefone</label>
                        <input {...register('telefone')}type="text" placeholder="+244 945 673 852" className="p-3 bg-indigo-50 border outline-0 rounded-lg max-w-full" />
                        {errors.telefone && <p className="text-xs text-red-600">{errors.telefone.message}</p>}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="" className="">Entidade Financeira</label>
                        <input {...register('entidadeFinanceira')} type="text" placeholder="EX.: Seguradora ABC..." className="p-3 bg-indigo-50 rounded-lg outline-0 border max-w-full" />
                        {errors.entidadeFinanceira &&  <p className="text-xs text-red-600">{errors.entidadeFinanceira.message}</p>}
                    </div>
                 </div>
                 <button className="flex flex-col justify-start bg-blue-500 shadow-lg rounded-lg p-2 text-center my-4 text-white font-semibold hover:scalle-[10px]">Atualizar</button>
          </form>                             
      </div>
    </>
  );
}
