import { GoArrowRight } from 'react-icons/go'
import Pediatria from '../img/especialidadesImg/Pediatria.PNG';
import Cardiologia from '../img/especialidadesImg/Cardiologia.PNG'
import Ortopedia from '../img/especialidadesImg/Ortopedia.PNG'
import marcarOnline from '../img/MarcarOnline.PNG'
import notificacao from '../img/NtificaçaoInteligente.PNG'
import seguranca from '../img/segurança.PNG'
import portalMedico from '../img/PortalMedico.PNG'
import respostasRapidas from '../img/RespostasRapidas.PNG'
import registoClinicoDigital from '../img/registoClinicoDigital.PNG'
import pessoaUtente from '../img/PessoaUtente.PNG'
import img from '../img/img1.jpeg'
import { IoTrophyOutline } from 'react-icons/io5'
import CardOverView from '../components/CardOverview'
import { Users2Icon } from 'lucide-react'
import Title from '../components/Title'
import Header from '../layout/Header'
import CardEspecialidade from '../components/CardEspecialidade'
import CardFuncionalidade from '../components/CardFuncionalidade'

export default function Home(){
    console.log(Pediatria);

    return(

        <div className=''>
            <div className="h-16">
                    <Header/>
            </div>

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
                
                <div>
                    <div>
                        <div>
                            <div>
                                <img src={pessoaUtente} alt="" />
                            </div>
                            <div>
                                <h3>Utentes</h3>
                                <p>Plataforma intuitiva para gestão completa da sua saúde</p>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            
        </div>
    )
}


