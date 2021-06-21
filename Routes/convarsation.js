const router = require('express').Router()
const Conversation = require('../models/Conversation')

//new con

router.post("/",async(req,res)=>{
    const newConversation = new Conversation({
        members:[req.body.senderId,req.body.receiverId]
    })
    try {
        const saveConvarsation = await newConversation.save()
        res.status(200).json(saveConvarsation)
    } catch (error) {
        console.log(error);
    }
})

//get con of user

router.get("/:userId",async(req,res)=>{
    try {
        const convarsation = await Conversation.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(convarsation)
    } catch (error) {
        console.log(error);
    }
})


module.exports=router