import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  
  const [credentials, setCredentials] = useState({ name:"",email: "", password: "" })
    let history = useNavigate();
  const handlesubmit = async (e) => {
    const{name,email,password}=credentials
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name,email, password })
    });
    const json = await response.json();
    if (json.success) {
        localStorage.setItem("token", json.authtoken)
        history("/")
    }
}
const onchange = (e) => {
  setCredentials({ ...credentials, [e.target.name]: e.target.value })
};
  return (
    <div className="container" style={{ "width": "50rem" }}>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email"onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="password"onChange={onchange} />
        </div>
        <button type="submit" className="btn btn-primary">Create account</button>

      </form>
    </div>
  )
}

export default Signup
