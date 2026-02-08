interface props{
    title: string;
    descrition: string;
}

export default function TitleMedicoEspe({title, descrition}: props){
    return(
         <div className="flex items-start justify-start flex-col gap-3">
            <h1 className="text-5xl text-start text-zinc-800 font-bold">{title}</h1>
            <p className="text-zinc-600 text-lg">{descrition}</p>
      </div>
    )
   
}