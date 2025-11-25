
interface props{
    img: string
    title: string
    text: string
}

export default function CardFuncionalidade({img, title, text}: props){
    return(
        <div className='shadow border rounded-xl max-w-100 h-58'>
            <div className='max-w-100 min-h-58 space-y-4 p-6 rounded-xl bg-white even:border-green-500 border-l-4 border-blue-500'>
                <span className='my-4'><img src={img} alt="" /></span>
                <h2 className='font-semibold text-xl'>{title}</h2>
                <p className='text-zinc-500'>{text}</p>
            </div>
        </div>
    )
}