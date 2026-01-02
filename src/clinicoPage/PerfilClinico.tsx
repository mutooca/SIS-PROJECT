import TitleGestao from "../components/TitleGestao";

export default function PerfilClinico(){
    return (
        <div>
            <TitleGestao title="Meus Dados" p="Consulte e actualize suas informações pessoais"/>
            
            <form className='space-y-4 w-full'>
                <div className="space-y-1 flex flex-col w-full">
                    <label htmlFor="name" className="font-semibold">Nome Completo</label>
                    <input type="text" name="especialidade" id="especialidade" placeholder="Meu Nome" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                </div>
                <div className="space-y-1 flex flex-col w-full">
                    <label htmlFor="name" className="font-semibold">Especialidade</label>
                    <input type="text" name="especialidade" id="especialidade" placeholder="Cardiologia" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                </div>
                <div className="space-y-1 flex flex-col w-full">
                    <label htmlFor="name" className="font-semibold">Número de Ordem</label>
                    <input type="text" name="especialidade" id="especialidade" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                </div>
                <div className="space-y-1 flex flex-col w-full">
                    <label htmlFor="name" className="font-semibold">Telefone</label>
                    <input type="text" name="especialidade" id="especialidade" placeholder="+244 9xx xxx xxx" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                </div>
                <div className="space-y-1 flex flex-col w-full">
                    <label htmlFor="diasAtendimento" className="font-semibold">Email</label>
                    <input type="email" name="diasAtendimento" id="diasAtendimento" placeholder="eu@email.com" className="max-w-full h-12 border bg-zinc-50 rounded-lg pl-4 bg-indigo-50 outline-blue-500 border" />
                </div>

                <button type="submit" className="bg-blue-500 text-white mt-8 hover:bg-blue-400 w-full h-10 rounded-xl">Actualizar Perfil</button>
            </form>
        
                </div>
    )
}