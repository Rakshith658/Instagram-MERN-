const router = require('express').Router()
const Message = require('../models/Message')

//add

router.post("/",async(req,res)=>{
    const newMessage = new Message(req.body)

    try {
        const savedMessage =await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        console.log(error);
    }
})

//get 

router.get("/:convarsationId",async(req,res)=>{
    try {
        const messages =await Message.find({
            conversationId:req.params.convarsationId
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log(error);
    }
})


module.exports=router