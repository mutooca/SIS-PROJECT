interface props{
    title1: string;
    title2: string;
    text: string;
}

export default function ExamesAgendados({title1, title2, text}: props){
    return(
        <div className="flex flex-col rounded-xl max-w-full mt-4 border shadow  space-y-2 p-2 mx-2">
                      <h2 className="font-semibold text-2xl space-y-1 ml-2">{title1}</h2>

                      <div className="mb-2 rounded-xl border my-2 max-w-6xl ">
                        <h3 className="font-semibold ml-3">{title2}</h3>
                        <p className="ml-3">{text}</p>
                      </div>

         </div>
    )
}