import React                       
 from 'react'
import { useState } from 'react'
import AlertContext from '../context/notes/alertContext'

const Alertstate = (props) => {
    const[alert,setAlert]=useState({message:null,type:null})
    const setMsg=(msg,type)=>{
        setAlert({message:msg,type:type});
        setTimeout(() => {
            setAlert({message:null,type:null});
        }, 1500);
    }
  return (
   <AlertContext.Provider value={{setMsg,alert}}>
    {props.children}
   </AlertContext.Provider>
  )
}

export default Alertstate
