
import ExamesCard from '../components/ExamesCard';
import CardExamePrescricao from '../components/CardExamePrescricao';
import exame01 from '../img/exame01.png';
import exame02 from '../img/exame02.png';
import exame03 from '../img/exame03.png';
import exame04 from '../img/exame04.png';
import exame05 from '../img/exame05.png';
import exame06 from '../img/exame06.png';


export default function Exames(){
    return(
         <>
            <div className="  bg-indigo-50  relative py-2">

            <div className=" flex  mt-[80px] ml-20 flex-col p-4">
                   <h2 className="font-bold text-5xl text-zinc-800">Exames Complementares de</h2>
                   <h2 className="font-bold text-5xl text-zinc-800 ">Diagnóstico</h2>
                   <p className="flex text-zinc-800 my-6 text-lg">Exames laboratoriais e de imagem com equipamento moderno e resultados precisos</p>
            
             </div>


            <div className="max-w-6xl flex-col  sm:flex-col lg:flex-row mx-auto my-4 ">
                <button className=" text-gray-700 flex min-w-[400px] sm:min-w-[600px] md:min-w-[500px] xl:min-w-[1150px] rounded-xl p-2 min-h-[7px] p-4 border border-blue-300 bg-blue-100 mx-auto  text-sm mb-[5px] gap-1"><p className="font-semibold ">Nota:</p>  Alguns exames requerem prescrição médica. Certifique-se de ter a prescrição registada no seu RCU antes de marcar.</button>
            </div>

             <div className="flex max-w-7xl bg-gray-100  min-h-[500px] items-center justify-center mx-auto ">
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
        </>
    )
   
}