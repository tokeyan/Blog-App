require('dotenv').config()
const express = require('express')
const {connect} = require('mongoose')
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const catRoute = require("./routes/cats")
const multer = require("multer")
const path = require("path")

const app = express()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))


const storage = multer.diskStorage(
    {
        destination: (req,file,cb) => {
            cb(null, "images")
        },
        filename: (req,file,cb) => {
            cb(null,req.body.name)
        }
    }
)

const upload = multer({storage:storage})

app.post("/api/upload",upload.single("file"),(req,res) => {
    res.status(200).json("file has been uploaded")
})

connect(process.env.MONGO_DB ,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log("connect")).catch((err) => console.log(err))

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/cat",catRoute)

app.listen("5000",(err) => {
    if(err) throw err;
    console.log("backend work")
})