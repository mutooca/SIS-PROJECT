import TitleGestao from "../components/TitleGestao";



export default function addAdmin(){
    return(
         <div>
            <TitleGestao title="Gestão de Administradores" p="Adicionar e gerir administradores do sistema"/>
           
            <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="font-semibold">Nome Completo *</label>
                        <input
                        type="text"
                        placeholder="Nome do administrador"
                        className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="font-semibold">E-mail *</label>
                        <input
                        type="email"
                        placeholder="email@exemplo.com"
                        className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500"
                        />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="font-semibold">Telefone</label>
                        <input
                        type="text"
                        placeholder="+244 923 456 789"
                        className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="font-semibold">Nível de Acesso</label>
                        <select className="w-full h-12 border bg-indigo-50 rounded-lg px-4 outline-blue-500">
                        <option value="full">Acesso Total</option>
                        <option value="limited">Acesso Limitado</option>
                        </select>
                    </div>
                </div>

                <button className="bg-blue-500 text-white hover:bg-blue-600 w-full h-12 rounded-xl font-semibold transition">
                Adicionar Administrador
                </button>
            </div>
        </div>
    )
}