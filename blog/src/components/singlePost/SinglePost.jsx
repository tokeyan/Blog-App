import "./singlePost.css"
import {useLocation} from "react-router"
import axios from "axios"
import { useContext, useEffect,useState} from "react"
import {Link} from "react-router-dom"
import { Context } from "../context/Context"

export default function SinglePost() {
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    
    const [post,setPost] = useState({}) 
    const {user} = useContext(Context)
    
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("")
    const [updateMode,setUpdateMode] = useState(false)
    useEffect(() => {
        const getPost = async() => {
            const res = await axios.get("/posts/"+path)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getPost()
    },[path])

    const PF = "http://localhost:5000/images/"
    
    const handleDelete = async() => {
        try{
        await axios.delete(`/posts/${post._id}`,{
            data:{username:user.username}
        })
        window.location.replace("/")
        }
        catch(err){}
    }

    const handleUpdate = async() => {
        try{
        await axios.put(`/posts/${post._id}`,{
             username:user.username,title,desc
        })
        setUpdateMode(false)
        }
        catch(err){}
    }

    return (
    <div className='single-post'>
        <div className="singlepostwrapper">
            { post.photho && (
            <img src={PF+post.photho} alt="madhan" className="singlepostimg" />
            )}
            {updateMode ? ( <input type="text" value={title} className="singlepostTitleUp" onChange={(e) => setTitle(e.target.value)} autoFocus/>) : 
            (<div className="singlepostTitle">
                {title}
                {post.username === user?.username && (
                 <div className="singlePost-edit">
                 <i class="singleEdit fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                 <i class="singleEdit fa-solid fa-trash" onClick={handleDelete}></i>
                 </div>
                )}
            </div>
                )}
            <div className="singlePost-info">
                <span className="singlepost-auth">
                    <Link to ={`/?user=${post.username}`} className="link">{post.username}</Link>
                </span>
                <span className="singlepost-Time">
                    {new Date(post.createdAt).toDateString()}
                </span>
            </div>
            {updateMode ? (<textarea className="singlepost-descUp" value={desc} onChange={(e) => setDesc(e.target.value)}/>) : (<p className="singlepost-desc">
                {desc}
            </p>)}
            {updateMode && <button className="spBtn" onClick={handleUpdate}>Update</button>}
        </div>
    </div>
  )
}
