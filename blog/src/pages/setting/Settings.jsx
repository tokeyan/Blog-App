import "./settings.css"
import Sidebar from '../../components/Sidebar/Sidebar'
import { useContext,useState } from "react"
import { Context } from "../../components/context/Context"
import axios from "axios"

export default function Settings() {
  const {user,dispatch} = useContext(Context)
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [file,setFile] = useState(null)
  const [success,setSuc] = useState(false)
  
  const handleUpdate = async(e) => {
    e.preventDefault()
    dispatch({type:"UP_START"})
    const updateUser = {
     userId:user._id,
     username,
     email,
     password,
    }
   if(file){
     const data = new FormData()
     const filename = Date.now() + file.name
     data.append("name",filename)
     data.append("file",file)
     updateUser.profilePic = filename
     try{
       await axios.post("/upload",data)
     }
     catch(err){
 
     }
   }
   try{
     const res =  await axios.put("/users/"+user._id,updateUser)
     dispatch({type:"UP_SUCCESS",payloads:res.data})
     setSuc(true)
   }
   catch(err){
    dispatch({type:"UP_FAILURE"})
   }
 }
 const PF = "http://localhost:5000/images/"
  return (
    <div className='setting'>
        <div className="settingWrapper">
        <div className="settingTitle">
                <span className="settingUpdate">Update Your Profile</span>
                <span className="settingDelete">Delete</span>
            </div>
            <form className="settingForm" onSubmit={handleUpdate}>
                <legend style={{textAlign:"center"}}>Profile</legend>
                <div className="settingPP">
                  <img src={file ? URL.createObjectURL(file) : PF+user.profilePic} alt=''></img>
                  <label htmlFor='settingFile'>
                  <i className="SettingIcon fa-solid fa-user-plus"></i>
                  </label>
                  <input type="file" id = "settingFile" onChange={(e) => setFile(e.target.files[0])}/>
                </div>
                <label>User Name</label>
                <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)}/>
                <label>Email</label>
                <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
              <button className="settingBtn" type="submit">Submit</button>
              {success && <span style={{color:"green",textAlign:"center",marginTop:"15px"}}>profile has been updated..</span>}
            </form>
        </div>
        <Sidebar/>
    </div>
  )
}
