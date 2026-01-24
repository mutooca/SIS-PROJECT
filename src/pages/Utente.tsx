import {useState} from 'react';
import ConsultasTab from '../utentePage/ConsultasTab';
import ExamesTab from '../utentePage/ExamesTab';
import RcuTab from '../utentePage/RcuTab';
import PerfilTab from '../utentePage/PerfilTab';

export default function Utente(){

    const [role, setRole] = useState<'Consultas' | 'Exames' |'Meu RCU'| 'Perfil'>('Consultas')
       const handleSubmitRole = (value: 'Consultas' | 'Exames' | 'Meu RCU' | 'Perfil') => {
        setRole(value)
    }

  
    return(
        <div className="bg-zinc-100">
            <div className="flex items-center justify-between mx-7 py-7 ">
                <div>
                <h1 className="font-semibold text-3xl">Bem-vindo, Utente!</h1>
                <p className="text-zinc-600">Gerir consultas, exames e RCU</p>
                </div>
                <button className="flex rounded-lg border-2 border-blue-500 text-sm font-semibold  bg-zinc-500 texte-blue-500 text-blue-500 hover:bg-blue-500 transition px-2 hover:text-white py-2 px-5 min-h-[40px] text-center">Terminar sessao</button>
            </div>
            <div className="max-w-7xl grid grid-cols-4 bg-indigo-50 rounded-lg gap-4 mx-auto">
                <button onClick = {() => handleSubmitRole('Consultas')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${role === 'Consultas' ? 'bg-gray-50' : ''}`}>Consultas</button>
                <button onClick = {() => handleSubmitRole('Exames')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${role === 'Exames' ? 'bg-gray-50' : ''}`}>Exames</button>
                <button onClick = {() => handleSubmitRole('Meu RCU')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${role === 'Meu RCU' ? 'bg-gray-50' : ''}`}>Meu RCU</button>
                <button onClick = {() => handleSubmitRole('Perfil')} className={`hover:bg-gray-50 transition py-1 rounded-lg text-center font-semibold justify-center font-semibold flex items-center gap-2 ${role === 'Perfil' ? 'bg-gray-50' : ''}`}>Perfil</button>  
            </div>
            <div className="mx-10 border my-4 bg-white shadow rounded-xl p-5 mb-4">

                {role== 'Consultas' && <ConsultasTab /> }
                {role == 'Exames' && <ExamesTab /> }
                { role == 'Meu RCU' && <RcuTab/>}
                { role == 'Perfil' && <PerfilTab />}
           </div>
           
        </div>
    )
    
}