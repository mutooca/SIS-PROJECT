import coracao from "../img/coracao.PNG";
import neorologia from "../img/neorologia.PNG";
import oso from "../img/oso.PNG";
import crianca from "../img/crianca.PNG";
import oftamonologia from "../img/oftamonologia.PNG";
import ouvir from "../img/ouvir.PNG";
import cardiologia from "../img/cardiologia.PNG";
import cardioca from "../img/cardioca.PNG";
import CardLinkEspecialidade from '../components/CardLinkEspecialidade';
import TitleMedicoEspe from '../components/TitleMedicoEspe';
import Header from '../layout/Header';
import Footer from "../layout/Footer";

export default function Especialidade(){
    return(
         <>
                <Header/>   
           <div className="  bg-indigo-50  relative mt-15 py-1 ">

                <div className="flex flex-col mt-[50px] ml-[80px] p-6">
                 <TitleMedicoEspe title="Especialidades Médicas" descrition="Conheça todas as especialidades médicas disponíveis no Grupo PDC.AO"/> 
                 </div>
               <div className="flex max-w-7xl bg-gray-100  min-h-[500px] items-center justify-center mx-auto">
                <div className="mt-[45px] max-w-6xl mx-auto gap-4 mt-20  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
                    <CardLinkEspecialidade corIcon='blue' icon={coracao} textbotao='Disponivel'  title='Cardiologia' text='Diagnóstico e tratamento de doenças dos olhos e sistema visual.' textend='6 médicos disponíveis' />
                    <CardLinkEspecialidade corIcon='blue'  icon={neorologia} textbotao='Disponivel'  title='Neurologia' text='Tratamento de doenças do ouvido, nariz e garganta.' textend='4 médicos disponíveis' />
                    <CardLinkEspecialidade corIcon='blue'  icon={oso} textbotao='Disponivel'  title='Ortopedia' text='Tratamento de lesões e doenças do sistema musculoesquelético.' textend='12 médicos disponíveis' />
                     <CardLinkEspecialidade corIcon='blue'  icon={crianca}  textbotao='Disponivel'  title='Pediatria' text='Cuidados médicos especializados para bebés, crianças e adolescentes.' textend='10 médicos disponíveis' />
                    <CardLinkEspecialidade corIcon='blue'  icon={oftamonologia} textbotao='Disponivel'  title='Oftalmologia' text='Diagnóstico e tratamento de doenças dos olhos e sistema visual.' textend='6 médicos disponíveis' />
                    <CardLinkEspecialidade corIcon='blue'  icon={ouvir}  textbotao='Disponivel'  title='Otorrinolaringologia' text='Tratamento de doenças do ouvido, nariz e garganta.' textend='4 médicos disponíveis' />
                    <CardLinkEspecialidade corIcon='blue'  icon={cardiologia}  textbotao='Disponivel'  title='Clínica Geral' text='Atendimento médico geral e encaminhamento para especialidades.' textend='15 médicos disponíveis' />
                    <CardLinkEspecialidade corIcon='blue'  icon={cardioca}  textbotao='Disponivel'  title='Medicina Interna' text='Diagnóstico e tratamento de doenças complexas em adultos.' textend='7 médicos disponíveis' />
                </div> 
            </div> 
            <div className="w-full">
                    <Footer/>
            </div>  
            
        </div>         
        </>
    ) 
}