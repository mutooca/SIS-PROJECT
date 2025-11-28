import Header from '../layout/Header';
import Title from '../components/Title';
import ExamesCard from '../components/ExamesCard';
import CardExamePrescricao from '../components/CardExamePrescricao';
import Footer from "../layout/Footer";
import exame01 from '../img/exame01.png';
import exame02 from '../img/exame02.png';
import exame03 from '../img/exame03.png';
import exame04 from '../img/exame04.png';
import exame05 from '../img/exame05.png';
import exame06 from '../img/exame06.png';


export default function Exames(){
    return(
         <>
            <Header/>

            <div className="  bg-indigo-50  relative p-6">

                <div className=" mr-20 text-left mt-[100px]">
                    <Title title='Exames Complementares de Diagnóstico' descrition='Exames laboratoriais e de imagem com equipamento moderno e resultados precisos'/>
                </div>

                <button className=" text-gray-700 flex max-w-7xl rounded-xl p-2 min-h-[7px] border border-blue-300 bg-blue-100 mx-auto  text-sm mb-[5px]">Nota: Alguns exames requerem prescrição médica. Certifique-se de ter a prescrição registada no seu RCU antes de marcar.</button>
             <div className="flex max-w-7xl bg-gray-100  min-h-[500px] items-center justify-center">
                    <div className="mt-[30px] max-w-6xl mx-auto gap-4 mt-20 grid  sm:grid-cols-2 md:grid-cols-3">
                        <ExamesCard  img={exame01} conteudobotao='Laboratório' title='Análises Clínicas' text='Hemograma completo, bioquímica, hormônios e outros exames laboratoriais.'  resultadoExame='Resultado em: Imediato' />
                        <ExamesCard img={exame02} conteudobotao='Cardiologia' title='Electrocardiograma (ECG)' text='Exame para avaliar a actividade eléctrica do coração.' resultadoExame='Resultado em: Imediato'
                        />
                        <CardExamePrescricao img={exame03} conteudobotao='Imagiologia' title='Radiografia'  text='Exames de raio-X para ossos, tórax e outras áreas do corpo.'  resultadoExame="Resultado em: 2-4h"  botaoPrescricao='Requer Prescrição Médica'
                        />

                        <CardExamePrescricao img={exame04} conteudobotao='Imagiologia' title='Ressonância Magnética' text='Exame detalhado de imagem para diagnóstico de diversas condições.' resultadoExame="Resultado em: 48h" botaoPrescricao='Requer Prescrição Médica'
                        />
                        <CardExamePrescricao img={exame05} conteudobotao='Imagiologia' title='Tomografia Computorizada' text='Exame de imagem com alta resolução para diagnóstico preciso.' resultadoExame="Resultado em: 24-48h"botaoPrescricao='Requer Prescrição Médica'
                        />
                    <ExamesCard img={exame06} conteudobotao='Imagiologia' title='Ultrassonografia' text='Exame de imagem por ultrassom para diversos órgãos.' resultadoExame='Resultado em: Imediato'
                        />
                    </div>
              </div> 
         </div>
          <div className="w-full">
                    <Footer/>
         </div>
        </>
    )
   
}