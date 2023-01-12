import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AlertContext from '../context/notes/alertContext'



const Login = () =>{
    
    const alert1=useContext(AlertContext)
    const {setMsg}=alert1
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useNavigate();
    const handlesubmit = async (e) => {
        const { email, password } = credentials
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.authtoken)
            history("/")
            setMsg("logged in successfully","success")
        }
        else{
            setMsg("invalid credential","danger")

        }
    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    };


    return (
        <>
            <div className="container" style={{ "width": "50rem" }}>
                <form onSubmit={handlesubmit}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={credentials.email} name="email" onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} name="password" id="password" onChange={onchange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>

                </form>
            </div>
            
        </>
    )
}

export default Login
