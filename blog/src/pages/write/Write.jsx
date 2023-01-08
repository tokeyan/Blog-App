import { useContext } from "react"
import { useState } from "react"
import { Context } from "../../components/context/Context"
import "./write.css"
import axios from "axios"

export default function Write() {
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [file,setFile] = useState(null)
  const {user} = useContext(Context)
  

  const handleSubmit = async(e) => {
     e.preventDefault()
     const newPost = {
      username:user.username,
      title,
      desc,
     }
    if(file){
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("name",filename)
      data.append("file",file)
      newPost.photho = filename
      try{
        await axios.post("/upload",data)
      }
      catch(err){

      }
    }
    try{
      const res = await axios.post("/posts",newPost)
      window.location.replace("/post/"+res.data._id)
    }
    catch(err){

    }
  }
  return (
    <div className="write">
        {file && (
          <img src={URL.createObjectURL(file)} className="writeImg" alt=""></img>
        )}
        <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeformGroup">
            <label htmlFor="inputFile">
            <i className="writeIcon fa-solid fa-plus"></i>
            </label>
            <input type="file" id="inputFile" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
            <input type="text" placeholder="Title of the content" className="writeInput" onChange={e=>setTitle(e.target.value)} autoFocus={true}/>
        </div>
        <div className="writeformGroup">
            <textarea placeholder="enter your text" className="writeInput writeText" onChange={e=>setDesc(e.target.value)} typeof="text"></textarea>
        </div>
        <button className="writeSubmit" type="submit">Publish</button>
        </form>
    </div>
  )
}
