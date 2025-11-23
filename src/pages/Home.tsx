import { GoArrowRight } from 'react-icons/go'
import img from '../img/img2.jpeg'
import img2 from '../img/img1.jpeg'
import { IoTrophyOutline } from 'react-icons/io5'
import CardOverView from '../components/CardOverview'
import { CalendarIcon, HeartIcon, Users2Icon } from 'lucide-react'
import Title from '../components/Title'
import Header from '../layout/Header'

export default function Home(){
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
                    <div className=' max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-3'>
                        <CardOverView colorIcon='green' title='15+' text='Anos de Experiência' icon={<IoTrophyOutline size={40}></IoTrophyOutline>} />
                        <CardOverView title='50K+' text='Utentes Registados' icon={<Users2Icon size={40}/>} />
                        <CardOverView title='200+' text='Profissionais de Saúde' icon={<IoTrophyOutline size={40}></IoTrophyOutline>} />
                        <CardOverView title='98%' text='Satisfação dos Utentes' icon={<IoTrophyOutline size={40}></IoTrophyOutline>} />                 
                    </div> 

                </div>
                
                <Title title='Especialidades Médicas' descrition='Oferecemos uma ampla gama de especialidades com equipamentos de última geração.'/>

                <div>
                </div >
                <div className='grid grid-cols-3 max-w-6xl mx-auto gap-12 mb-20'>
                    <div className='w-96 h-full rounded-lg hover:shadow-2xl hover:scale-101 transition ease-in '>
                        <div className='w-96 rounded-t-lg h-44 bg-gradient-to-b from-black to-white'>
                            <img src={img2} alt="" className='w-full absolute rounded-t-lg h-44 relative' />
                            <span className='relative text-white top-30 left-4'><HeartIcon size={40}/></span>
                        </div>
                        <div className='space-y-3 px-5 bg-white py-4'>
                            <h3 className='font-bold text-2xl'>Cardiologia</h3>
                            <p className='text-justify text-zinc-700'>Cuidados especializados para o coração com tecnologia de monitorização avançada e equipa altamente qualificada.</p>
                            <button className='flex justify-center items-center w-full font-semibold gap-3 border-2 border-blue-500 p-2 rounded-lg hover:bg-blue-500 text-blue-500 hover:text-white'>
                                Saber Mais
                                <GoArrowRight size={17} />
                            </button>
                        </div>
                    </div>
                   
                    
                </div>

                <Title title='Funcionalidades do Sistema' descrition='Plataforma completa para gestão de cuidados de saúde.'/>
                
                <div className='w-6xl mx-auto'>
                    <div className='w-100 h-54 p-2 rounded-xl bg-white border-l-4 border-blue-500'>
                        <span className=''><CalendarIcon size={38} className='bg-blue-500/40 rounded-xl'/></span>
                        <h2>Marcação Online</h2>
                        <p>Marque consultas e exames 24/7 através da plataforma, com confirmação instantânea e lembretes automáticos.</p>
                    </div>
                </div>
                
            </div>
           
            
        </div>
    )
}