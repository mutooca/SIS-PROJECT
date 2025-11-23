import {  Users2Icon } from 'lucide-react';
import CardLinkEspecialidade from '../components/CardLinkEspecialidade';
import Title from '../components/Title';
import Header from '../layout/Header';

export default function Especialidade(){
    return(
         <>
        
           

                <Header/>
            
                
           <div className="  bg-indigo-50  relative mt-15 p-6">

                <div className="mr-140">
                      <Title title='Especialidades Médicas' descrition='Conheça todas as especialidades 
                    médicas disponíveis no Grupo PDC.AO '/>
               </div>
                  
                 

                <div className="max-w-6xl mx-auto gap-4 mt-20  grid  sm:grid-cols-2 md:grid-cols-3 ">
                    <CardLinkEspecialidade corIcon='blue' icon={<Users2Icon size={40}/>} textbotao='Disponivel'  title='Cardiologia' text='Diagnóstico e tratamento de doenças dos olhos e sistema visual.' textend='6 médicos disponíveis' />
                     <CardLinkEspecialidade corIcon='blue' icon={<Users2Icon size={40}/>} textbotao='Disponivel'  title='Neurologia' text='Tratamento de doenças do ouvido, nariz e garganta.' textend='4 médicos disponíveis' />
                      <CardLinkEspecialidade corIcon='blue' icon={<Users2Icon size={40}/>} textbotao='Disponivel'  title='Ortopedia' text='Tratamento de lesões e doenças do sistema musculoesquelético.' textend='12 médicos disponíveis' />
                       <CardLinkEspecialidade corIcon='blue' icon={<Users2Icon size={40}/>} textbotao='Disponivel'  title='Pediatria' text='Cuidados médicos especializados para bebés, crianças e adolescentes.' textend='10 médicos disponíveis' />
                        <CardLinkEspecialidade corIcon='blue' icon={<Users2Icon size={40}/>} textbotao='Disponivel'  title='Oftalmologia' text='Diagnóstico e tratamento de doenças dos olhos e sistema visual.' textend='6 médicos disponíveis' />
                         <CardLinkEspecialidade corIcon='blue' icon={<Users2Icon size={40}/>} textbotao='Disponivel'  title='Otorrinolaringologia' text='Tratamento de doenças do ouvido, nariz e garganta.' textend='4 médicos disponíveis

' />
                          <CardLinkEspecialidade corIcon='blue' icon={<Users2Icon size={40}/>} textbotao='Disponivel'  title='Clínica Geral' text='Atendimento médico geral e encaminhamento para especialidades.' textend='15 médicos disponíveis' />
                           <CardLinkEspecialidade corIcon='blue' icon={<Users2Icon size={40}/>} textbotao='Disponivel'  title='Medicina Interna' text='Diagnóstico e tratamento de doenças complexas em adultos.' textend='7 médicos disponíveis' />

                </div>  
            </div>

          
        </>
    )
   
}