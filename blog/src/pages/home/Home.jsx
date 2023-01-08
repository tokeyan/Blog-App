import "./Home.css"
import Header from "../../components/header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import Posts from "../../components/posts/Posts"
import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export default function Home() {
  const [posts,setPosts] = useState([])
  const {search} = useLocation()
  useEffect(() => {
    const fetchPosts =  async () => {
      const res = await axios.get("/posts"+search)
      setPosts(res.data)
    }
    fetchPosts() 
  },[search]) 
  
  return (
    <>
    <Header/>
    <div className='home'>
        <Posts posts={posts}/>
        <Sidebar/>
    </div>
    </>
  )
}
