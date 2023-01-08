const router = require('express').Router()
const User = require("../models/user")
const Post = require("../models/post")


router.post("/", async(req,res) => {
       const newPost = new Post(req.body) 
       try{
            const savedPost =  await newPost.save()
            res.status(200).json(savedPost)
        }
        catch (err){
            res.status(500).json(err);
        }
})

router.put("/:id", async(req,res) => {
        
        try{
            const post = await Post.findById(req.params.id)
            try{
                if(post.username === req.body.username){
                    const savedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
                    res.status(200).json(savedPost)
                }
                else{
                    res.status(404).json("user not found");
                }             
                
            }
            catch (err){
                res.status(500).json(err);
            }
        }
        catch(err){
            res.status(500).json(err);
        }
})

router.delete("/:id", async(req,res) => {
        
    try{
        const post = await Post.findById(req.params.id)
        try{
            if(post.username === req.body.username){
                await post.delete()
                res.status(200).json("post deleted")
            }
            else{
                res.status(404).json("user not found");
            }             
            
        }
        catch (err){
            res.status(500).json(err);
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.get("/:id", async(req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }  
    catch(err){
        res.status(500).json(err)
    }
})

router.get("/", async(req,res) => {
    const username = req.query.user;
    const catName = req.query.catName
    try{
        let posts;
        if(username){
           posts = await Post.find({username})
        }
        else if(catName){
            posts = await Post.find({cat:{$in:[catName]}})
        }
        else{
            posts = await Post.find()
        }

        res.status(200).json(posts)
    }  
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router