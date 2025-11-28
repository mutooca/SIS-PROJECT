import { CiHeart } from "react-icons/ci";
import telefone from "../img/telefone.PNG";
import email from '../img/email.PNG';
import localizacao from "../img/localizacao.PNG";

export default function Footer(){
    return(
        <>
           <footer className="mt-[50px] bg-white">

                {/* CONTEÚDO PRINCIPAL */}
                <div className="w-full border-t border-gray-200 p-6 
                                flex flex-col md:flex-row md:justify-around gap-10">

                    {/* LOGO + DESCRIÇÃO */}
                    <div className="flex flex-col gap-3 items-start">

                    {/* LOGO + TEXTO LADO A LADO EM TELAS PEQUENAS */}
                    <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-blue-500 flex justify-center items-center 
                                        h-[40px] w-[40px] border-4 border-blue-500">
                        <CiHeart size={30} className="text-blue-500 bg-white rounded-lg" />
                        </div>

                        <h1 className="text-blue-500 text-xl md:text-2xl font-bold">
                        SIS - PDC.AO
                        </h1>
                    </div>

                    <p className="text-gray-600">Sistema de Informação de Saúde para gestão</p>
                    <p className="text-gray-600">hospitalar moderna e eficiente.</p>
                    </div>

                    {/* LINKS RÁPIDOS */}
                    <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-gray-700">Links Rápidos</h2>
                    <a href="#" className="text-gray-600 hover:text-blue-500">Especialidades</a>
                    <a href="#" className="text-gray-600 hover:text-blue-500">Médicos</a>
                    <a href="#" className="text-gray-600 hover:text-blue-500">Exames</a>
                    </div>

                    {/* UTENTES */}
                    <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-gray-700">Para Utentes</h2>
                    <a href="#" className="text-gray-600 hover:text-blue-500">Registar-se</a>
                    <a href="#" className="text-gray-600 hover:text-blue-500">Acesso Utente</a>
                    </div>

                    {/* CONTACTO */}
                    <div className="flex flex-col gap-2">
                    <h2 className="font-semibold text-gray-700">Contacto</h2>

                    <div className="flex gap-3 items-center">
                        <img src={telefone} alt="" className="w-5" />
                        <p className="text-gray-600">+244 945 673 852</p>
                    </div>

                    <div className="flex gap-3 items-center">
                        <img src={email} alt="" className="w-5" />
                        <p className="text-gray-600">info@pdcao.ao</p>
                    </div>

                    <div className="flex gap-3 items-center">
                        <img src={localizacao} alt="" className="w-5" />
                        <p className="text-gray-600">Luanda, Angola</p>
                    </div>
                    </div>

                </div>

                {/* LINHA + COPYRIGHT */}
                <div className="w-full border-t border-gray-200 py-6 flex justify-center">
                    <p className="text-gray-500 text-sm">
                    &copy; 2025 PDC.AO Group. Todos os direitos reservados.
                    </p>
                </div>

        </footer>

        </>
    )
}