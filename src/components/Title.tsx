
interface props {
    title: string
    descrition: string
}

export default function Title({title, descrition}: props){
    return(
        <div className='my-14 px-4 max-w-full space-y-3'>
            <h1 className='font-bold text-center text-3xl md:text-5xl text-zinc-800 '>{title}</h1>
            <p className='text-center text-zinc-600 text-lg'>{descrition}</p>
        </div>

    )
}