

interface props{
    title: string
    p: string
}
export default function TitleGestao({title, p}: props){
    return(
        <div>
            <h2 className="font-semibold text-2xl">{title}</h2>
            <p className="text-zinc-600 mb-6">{p}</p>
        </div>
    )
}