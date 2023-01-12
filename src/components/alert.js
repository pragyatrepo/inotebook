import React from 'react'
import AlertContext from '../context/notes/alertContext'
import { useContext } from 'react'

    
const Alert=(props)=>{
    const{alert}=useContext(AlertContext)
    return (
        <div>
            <div className={`alert alert-${alert.type}`} role="alert">
               {alert.message}
            </div>
            
        </div>
    )
}

export default Alert