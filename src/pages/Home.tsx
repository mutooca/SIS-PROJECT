import { GoArrowRight } from 'react-icons/go'
import Pediatria from '../img/especialidadesImg/Pediatria.PNG';
import Cardiologia from '../img/especialidadesImg/Cardiologia.PNG'
import Ortopedia from '../img/especialidadesImg/Ortopedia.PNG'
import marcarOnline from '../img/MarcarOnline.PNG'
import notificacao from '../img/notificacao.PNG'
import seguranca from '../img/seguranca.PNG'
import portalMedico from '../img/PortalMedico.PNG'
import respostasRapidas from '../img/RespostasRapidas.PNG'
import registoClinicoDigital from '../img/registoClinicoDigital.PNG'
import pessoaUtente from '../img/PessoaUtente.PNG'
import pessoalAdministrativo from '../img/PessoalAdministrativo.PNG'
import pessoalClinico from '../img/PessoalClinico.PNG'
import img from '../img/img1.jpeg'
import { IoTrophyOutline } from 'react-icons/io5'
import CardOverView from '../components/CardOverview'
import { PhoneIcon, Users2Icon } from 'lucide-react'
import Title from '../components/Title'
import CardEspecialidade from '../components/CardEspecialidade'
import CardFuncionalidade from '../components/CardFuncionalidade'
import CardTipoUtilizador from '../components/CardTipoUtilizador';
import { SlEnergy } from "react-icons/sl"

export default function Home(){
    console.log(Pediatria);

    return(

        <div className=''>
           
            <div className="relative h-[80vh] max-w-screen hoverflow-hidden">
                <div className='inset-0 h-[80vh]  bg-blue-400 absolute'>
                    <img src={img} alt="" className='w-full h-full object-cover opacity-10' />
                </div>
                <div className='flex pl-8 items-center h-full'>
                    <div className='relative text-white space-y-4'>
                        <h1 className='text-6xl font-bold max-w-xl'>Bem-vindo ao Sistema de Saúde PDC.AO</h1>
                        <p>Tecnologia de ponta para cuidados de saúde de excelência</p>
                        <button className='flex items-center font-semibold gap-2 bg-green-300 p-2 rounded-md'>
                            Começar Agora
                            <GoArrowRight size={17} />
                        </button>
                    </div>
                </div>
                
            </div>
            <div className='bg-indigo-50 max-w-full'>
                <div className=' flex justify-center py-10'>
                    <div className=' max-w-7xl grid sm:grid-cols-2 xl:grid-cols-4 gap-4'>
                        <CardOverView colorIcon='green' title='15+' text='Anos de Experiência' icon={<IoTrophyOutline size={40}></IoTrophyOutline>} />
                        <CardOverView title='50K+' text='Utentes Registados' icon={<Users2Icon size={40}/>} />
                        <CardOverView title='200+' text='Profissionais de Saúde' icon={<IoTrophyOutline size={40}></IoTrophyOutline>} />
                        <CardOverView title='98%' text='Satisfação dos Utentes' icon={<IoTrophyOutline size={40}></IoTrophyOutline>} />                 
                    </div> 

                </div>
                
                <Title title='Especialidades Médicas' descrition='Oferecemos uma ampla gama de especialidades com equipamentos de última geração.'/>

                <div>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='grid sm:grid-cols-3 max-w-7xl gap-4 mb-20'>
                        <CardEspecialidade img={Cardiologia} type='Cardiologia' text='Cuidados especializados para o coração com tecnologia de monitorização avançada e equipa altamente qualificada.' />
                        <CardEspecialidade img={Pediatria} type='Pediatria' text='Atendimento especializado para crianças em ambiente acolhedor, com médicos experientes em saúde infantil.' />
                        <CardEspecialidade img={Ortopedia} type='Ortopedia' text='Tratamento de lesões ósseas e musculares com tecnologia de imagiologia de última geração.' />
                        
                    </div>
                </div>
               

                <Title title='Funcionalidades do Sistema' descrition='Plataforma completa para gestão de cuidados de saúde.'/>
                
                <div className='flex items-center justify-center'>
                    <div className='max-w-7xl grid grid-cols-3 gap-x-5 gap-y-8'>
                        
                       <CardFuncionalidade img={marcarOnline} title='Marcação Online' text='Marque consultas e exames 24/7 através da plataforma, com confirmação instantânea e lembretes automáticos.'/>
                       <CardFuncionalidade img={registoClinicoDigital} title='Registo Clínico Digital' text='Acesso completo ao seu RCU com histórico médico, resultados de exames e prescrições em formato digital seguro.'/>
                       <CardFuncionalidade img={seguranca} title='Segurança Máxima' text='Encriptação de dados de nível hospitalar, conformidade com RGPD e controlo de acesso multinível.'/>
                       <CardFuncionalidade img={portalMedico} title='Portal Médico' text='Interface dedicada para profissionais gerirem consultas, diagnósticos e tratamentos de forma eficiente.'/>
                       <CardFuncionalidade img={notificacao} title='Notificações Inteligentes' text='Sistema automático de lembretes por e-mail e SMS para consultas, exames e medicação.'/>
                       <CardFuncionalidade img={respostasRapidas} title='Respostas Rápidas' text='Acesso a resultados de exames em tempo real e comunicação directa com a equipa médica.'/>
                       
                    
                    </div>
                </div>
                
                <Title title='Acesso por Tipo de Utilizador' descrition='Sistema adaptado às necessidades específicas de cada utilizador'/>
                
                <div className='flex items-center justify-center pb-8'>
                    <div className='max-w-6xl grid grid-cols-3 gap-8'>
                      
                        <CardTipoUtilizador img={pessoaUtente} type='Utentes' p1='Marcação de consultas e exames online' text='Plataforma intuitiva para gestão completa da sua saúde' p2='Acesso total ao RCU digital' p3='Gestão de dados pessoais e histórico' p4='Notificações e lembretes automáticos' textButton='Registar-se Agora' colorBorder='blue' colorButton='blue' />
                        
                        <CardTipoUtilizador img={pessoalClinico} type='Pessoal Clínico' p1='Dashboard completo de consultas' text='Ferramentas profissionais para gestão clínica eficiente' p2='Actualização e gestão de RCU' p3='Controlo de horários e disponibilidade' p4='Sistema de prescrição electrónica' textButton='Acesso Clínico' colorBorder='green' colorButton='green' />

                        <CardTipoUtilizador img={pessoalAdministrativo} type='Administrativo' p1='Gestão completa de utilizadores' text='Controlo total da operação hospitalar' p2='Controlo de marcações e cancelamentos' p3='Gestão de horários do pessoal' p4='Relatórios e estatísticas avançadas' textButton='Acesso Admin' colorBorder='blue' colorButton='blue' />
                    </div>
                </div>
            </div>
           
           <div className='max-w-full h-full py-14 bg-gradient-to-l from-green-400 to-blue-400 flex flex-col justify-center items-center'>
                <div className='space-y-5 max-w-4xl flex flex-col justify-center '>
                    <p className='flex justify-center'>< PhoneIcon size={60} className='text-white' /></p>
                    <h1 className='text-white font-semibold text-5xl text-center'>Precisa de Ajuda?</h1>
                    <p className='text-center text-white text-xl'>A nossa equipa está disponível 24/7 para responder às suas questões e auxiliar no processo de registo</p>
                    <div className='flex gap-4 items-center justify-center'>
                        <button className='flex justify-center items-center max-w-80 font-semibold gap-3 border-2  py-2 px-5 rounded-lg bg-green-500 text-white shadow border-none hover:bg-green-400 transition'>
                            <PhoneIcon size={17} />
                            Contactar Suporte
                        </button>
                        <button className='flex justify-center items-center max-w-80 font-semibold gap-3 border-2 border-blue-300 py-2 px-5 rounded-lg text-white bg-gradient-to-b from-blue-400 to-green-400 hover: border-blue-100 transition'>
                            Registrar Agora
                            <GoArrowRight size={17} />
                        </button>
                    </div>
                </div>
           </div>

           <div className='max-w-full h-full py-16 bg-indigo-50 flex flex-col justify-center items-center'>
                <div className='space-y-5 max-w-4xl flex flex-col justify-center '>
                    <div className='flex justify-center'>
                        <p className='flex rounded-full p-2 font-bold items-center bg-indigo-100 text-blue-500 max-w-68 gap-2 '><SlEnergy />Registo Rápido e Gratuito</p>
                    </div>
                    
                    <h1 className=' font-bold text-5xl text-center'>Pronto para Começar a Sua Jornada de Saúde?</h1>
                    <p className='text-center text-zinc-700 text-xl'>Junte-se a milhares de utentes que já confiam no Sistema de Informação de Saúde PDC.AO para gerir a sua saúde</p>
                    <div className='flex gap-4 items-center justify-center'>
                       
                        <button className='flex justify-center items-center max-w-80 font-semibold gap-3 border-2 border-blue-300 py-2 px-5 rounded-lg text-white bg-gradient-to-b from-blue-400 to-green-400 hover: border-blue-100 transition'>
                            Criar Conta Gratuíta
                            <GoArrowRight size={17} />
                        </button> 
                        <button className='flex justify-center items-center max-w-80 font-semibold gap-3 border-2  py-2 px-5 rounded-lg bg-indigo-50 border-2 border-blue-500 text-blue-500 shadow hover:bg-blue-500 hover:text-white transition'>
                            <PhoneIcon size={17} />
                            Explorar Especialidades
                        </button>
                    </div>
                </div>
           </div>
            
        </div>
    )
}


