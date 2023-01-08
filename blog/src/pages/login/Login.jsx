import {Link} from "react-router-dom"
import "./login.css"
import {Context} from "../../components/context/Context"
import { useContext,useRef } from "react"
import axios from "axios"

export default function Login() {
  
  const userref = useRef();
  const passwordref = useRef(); 
  const {isFetching,dispatch} = useContext(Context)

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"})
    try{
      const res = await axios.post("/auth/login",{
        username:userref.current.value,
        password:passwordref.current.value
      })
      dispatch({type:"LOGIN_SUCCESS",payloads:res.data})
      window.location.replace("/")
    }
    catch(err){
      dispatch({type:"LOGIN_FAILURE"})
    }
  }
  
  return (
    <div className='login'>
        <h2 className="LoginTitle">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label>User Name</label>
            <input type = "text" placeholder="enter your user name" ref={userref} required/>
            <label>Password</label>
            <input type = "password" placeholder="password" ref={passwordref} required/>
            <button className="loginBtn" type="submit" disabled={isFetching}>Login</button>
        </form>
            <button className="RegBtn">
              <Link to="/register">Register</Link>
            </button>
    </div>
  )
}
