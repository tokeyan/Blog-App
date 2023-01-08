import {Link} from "react-router-dom"
import "./Topbar.css"
import {useContext} from "react"
import { Context } from "../context/Context"

export default function TopBar() {
  const {user,dispatch} = useContext(Context)
  const handleLogout = () => {
      dispatch({type:"LOGOUT"})
      window.location.replace("/login")
  }
  return (
    <div className="top">
    <div className="topLeft">
    <i className="TopIcons fa-brands fa-facebook"></i>
    <i class="TopIcons fa-brands fa-square-instagram"></i>
    <i class="TopIcons fa-brands fa-telegram"></i>
    </div>
    <div className="topCenter">
        <ul className="TopList">
            <li className="listItem">
              <Link to="/" style={{textDecoration:"none",color:"inherit"}}>HOME</Link>
            </li>
            <li className="listItem">
              <Link to="/Setting" style={{textDecoration:"none",color:"inherit"}}>ABOUT</Link>
            </li>
            <li className="listItem">
              <Link to="/" style={{textDecoration:"none",color:"inherit"}}>QUIZ</Link>
             </li>
            <li className="listItem">
              <Link to="/write" style={{textDecoration:"none",color:"inherit"}}>WRITE</Link>
            </li>
            <li className="listItem"  onClick={handleLogout}>{user && "LOGOUT"}</li>
        </ul>
    </div>
    <div className="topRight">
        {
          user ? (    <i class="fa-solid fa-magnifying-glass"></i>  ) : (<Link to="/login" style={{textDecoration:"none",color:"orange"}}>Login</Link>)
        }
    </div>
    </div>
  )
}
