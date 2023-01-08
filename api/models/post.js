const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            unique:true
        },
        desc:{
            type:String,
            required:true,
        },
        photho:{
            type:String
        },
        username:{
            type:String,
            required:true
        },
        cat:{
            type:Array,
            default:false
        }

    },
    {timestamps:true}
)

module.exports = mongoose.model("Post",PostSchema)