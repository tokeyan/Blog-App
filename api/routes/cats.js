const router = require('express').Router()
const cate = require("../models/cat")

router.post("/", async(req,res) => {
    const category = new cate(req.body); 
    try{
       const saveCat = await category.save()
       res.status(200).json(saveCat) 
     }
     catch(err){
        res.status(500).json(err);
     }
})

router.get("/", async(req,res) => {
    try{
       const Cat = await cate.find()
       res.status(200).json(Cat) 
     }
     catch(err){
        res.status(500).json(err);
     }
})



module.exports = router