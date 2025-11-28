import Header from '../layout/Header';
import Title from '../components/Title';
import MedicoCard from '../components/medicoCard';
import Footer from "../layout/Footer";

export default function Medicos(){
    return(
         <>
            <div className="h-16">
                    <Header/>
            </div>

            <div className=" bg-indigo-50 relative">
                <div className="flex text-left ml-[50px] mt-[10px]">
                    <Title title="Corpo Clínico" descrition="Conheça os nossos médicos especializados e experientes"/>
                </div>
                <div className="flex max-w-7xl bg-gray-100  min-h-[500px] items-center justify-center mx-auto">
                    <div className=" max-w-7xl mx-auto gap-4 grid  sm:grid-cols-2 md:gap-6 md:grid-cols-3 mt-[45px]">
                        <MedicoCard  sigla="DC" nome="Dr. Carlos Silva" especialidade="Cardiologia" registo="CRM/AO 12345" esperiencia="15 anos" horarioAtendimento="Segunda a Sexta, 8h-17h"/>
                        <MedicoCard  sigla="DA" nome="Dra. Ana Santos" especialidade="Pediatria" registo="CRM/AO 23456" esperiencia="18 anos" horarioAtendimento="Segunda a Sexta, 9h-18h"/>
                        <MedicoCard  sigla="DJ" nome="Dr. João Fernandes" especialidade="Ortopedia" registo="CRM/AO 34567" esperiencia="18 anos" horarioAtendimento="Terça a Sábado, 8h-16h"/>
                        <MedicoCard  sigla="DM" nome="Dra. Maria Costa" especialidade="Neurologia" registo="CRM/AO 45678" esperiencia="10 anos" horarioAtendimento="Segunda a Quinta, 10h-19h"/>
                        <MedicoCard  sigla="DP" nome="Dr. Pedro Alves" especialidade="Oftalmologia" registo="CRM/AO 56789" esperiencia="14 anos" horarioAtendimento="Segunda a Sexta, 8h-17h"/>
                        <MedicoCard  sigla="DS" nome="Dra. Sofia Oliveira" especialidade="Clínica Geral" registo="CRM/AO 67890" esperiencia="8 anos" horarioAtendimento="Segunda a Sexta, 7h-16h"/>
                    </div>
                </div>
                <div className="">
                    <Footer/>
                </div>
            </div>
        </>
    )
   
}
