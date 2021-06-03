const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

//RIGISTER

router.post('/rigister',async(req,res)=>{
    
    try {
        // genrateing the new password by useing bcrypt to keep password safe
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(req.body.password,salt)

        // create new User
        const newUser =  new User({
            username:req.body.username,
            email:req.body.email,
            password:hashpassword
        })

        // saveing hte user to the database 
        const Users = await newUser.save()
        res.status(200).json(Users)
    } catch (error) {
        res.status(500).json(error)
    }
    // res.send("ok")
})

//LOGIN

router.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        !user&&res.status(404).json('User not found')  

        const validpassword = await bcrypt.compare(req.body.password,user.password)
        !validpassword && res.status(400).json('Password not matched')

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router