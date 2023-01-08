import axios from "axios"
import { useState } from "react"
import {Link}from "react-router-dom"
import "./login.css"

export default function Register() {
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError(false)

    try{
      const res = await axios.post("/auth/register",{
        username,
        email,
        password
      })
      res.data && window.location.replace("/login")
    }
    catch(err){
       setError(true)
    }
  }
  return (
    <div className='login'>
        <h2 className="LoginTitle">Register</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label>User Name</label>
            <input type = "text" placeholder="enter your user name" onChange={e => setUsername(e.target.value)} required/>
            <label>Email</label>
            <input type = "email" placeholder="enter your mail" onChange={e => setEmail(e.target.value)} required/>
            <label>Password</label>
            <input type = "password" placeholder="password" onChange={e => setPassword(e.target.value)} required/>
            <button className="loginBtn" type="submit">Register</button>
        </form>
            <button className="RegBtn">
              <Link to="/login">Login</Link>
            </button>

            {error && <span>something went wrong</span>}
    </div>
  )
}
