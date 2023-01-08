const router = require('express').Router()
const User = require("../models/user")
const Post = require("../models/post")
const bcrypt = require('bcrypt')


router.put("/:id", async(req,res) => {
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})

            res.status(200).json(updateUser)
        }
        catch (err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(404).json("sorry wrong user id")
    }
})

router.delete("/:id", async(req,res) => {
    if(req.body.userId === req.params.id){
        const user = await User.findById(req.params.id)
        try{
            try{
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id)
                 
                res.status(200).json("your account is deleted")
            }
            catch (err){
                res.status(500).json(err);
            }
        }
        catch(err){
            res.status(404).json("user not found");
        }
    }
    else{
        res.status(404).json("sorry wrong user id")
    }
})

router.get("/:id", async(req,res) => {
    try{
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc
        res.status(200).json(others)
    }  
    catch(err){
        res.status(500).json(err)
    }

})


module.exports = router