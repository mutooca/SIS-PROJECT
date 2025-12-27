
import TitleMedicoEspe from '../components/TitleMedicoEspe';
import MedicoCard from '../components/MedicoCard';

export default function Medicos(){
    return(
         <>

            <div className=" bg-indigo-50 relative py-3">
                <div className="flex items-start justify-start ml-[50px] mt-[15px] p-6">
                    <TitleMedicoEspe title="Corpo Clínico" descrition="Conheça os nossos médicos especializados e experientes"/>
                </div>
                <div className="flex max-w-7xl bg-gray-100  min-h-[500px] items-center justify-center mx-auto">
                    <div className=" max-w-7xl mx-auto gap-4 grid  grid-cols-1 md:grid-cols-2 xl:gap-6 xl:grid-cols-3 mt-[45px]">
                        <MedicoCard  sigla="DC" nome="Dr. Carlos Silva" especialidade="Cardiologia" esperiencia="15 anos" horarioAtendimento="Segunda a Sexta, 8h-17h"/>
                        <MedicoCard  sigla="DA" nome="Dra. Ana Santos" especialidade="Pediatria" esperiencia="18 anos" horarioAtendimento="Segunda a Sexta, 9h-18h"/>
                        <MedicoCard  sigla="DJ" nome="Dr. João Fernandes" especialidade="Ortopedia"  esperiencia="18 anos" horarioAtendimento="Terça a Sábado, 8h-16h"/>
                        <MedicoCard  sigla="DM" nome="Dra. Maria Costa" especialidade="Neurologia" esperiencia="10 anos" horarioAtendimento="Segunda a Quinta, 10h-19h"/>
                        <MedicoCard  sigla="DP" nome="Dr. Pedro Alves" especialidade="Oftalmologia" esperiencia="14 anos" horarioAtendimento="Segunda a Sexta, 8h-17h"/>
                        <MedicoCard  sigla="DS" nome="Dra. Sofia Oliveira" especialidade="Clínica Geral"  esperiencia="8 anos" horarioAtendimento="Segunda a Sexta, 7h-16h"/>
                    </div>
                </div>
            </div>
        </>
    )
   
}
