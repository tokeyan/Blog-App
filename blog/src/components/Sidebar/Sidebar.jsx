import "./sidebar.css"
import { useState,useEffect } from "react";
import axios from "axios";

export default function Sidebar() {
  const [cat,setCat] = useState()
  useEffect(() => {
    const getCat = async() =>{
      const res = await axios.get("/cat")
      setCat(res.data) 
    }
    getCat()
  },[cat])
  return (
    <div className="sidebar">
    <div className="sidebar-item">
        <span className="sitetitle">ABOUT US</span>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd5A-wUvJk82ZHo0OUgoCtTaQa3KiHmMlR3w&usqp=CAU" alt=""></img>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim reprehenderit nostrum excepturi nam</p>
    </div>
    <div className="sidebar-item">
    <span className="sitetitle">Category</span>
        <ul className="Cate">

        </ul>
    </div>
    <div className="sidebar-item">
    <span className="sitetitle">FOLLOW US</span>
    <div className="side-social">
    <i className="siteIcons fa-brands fa-facebook"></i>
    <i class="siteIcons fa-brands fa-square-instagram"></i>
    <i class="siteIcons fa-brands fa-telegram"></i>
    </div>
    </div>
    </div>
  )
}
