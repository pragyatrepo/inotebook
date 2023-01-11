import React from 'react'
import { createContext , useState } from 'react'
const AlertContext = () => {
    const Alerts=createContext();
    const [alert,setAlert]=useState(null)
    const showalert=(message,type)=>{
        setAlert({msg:message,type:type
        })
        setTimeout(()=>{
            setAlert(null)
        },1500)
    }

  return (
    <div>
      <Alerts.Provider value={{alert,showalert}}>
        {props.children}
      </Alerts.Provider>
    </div>
  )
}

export default AlertContext
