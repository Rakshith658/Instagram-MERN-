const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

//update user

router.put('/:id',async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if (req.body.password) {
            try {
                const slat = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password,slat)
            } catch (error) {
                return res.status(403).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.body.id,{$set:req.body})
            res.status(200).json("Account has been updated")
        } catch (error) {
            return res.status(403).json(error)
        }
    }else{
        return res.status(403).json('you can only update your account')
    }
})

//delete user

router.delete('/:id',async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.body.id)
            res.status(200).json("Account has been deleted")
        } catch (error) {
            return res.status(403).json(error)
        }
    }else{
        return res.status(403).json('you can only delete your account')
    }
})

//get user

router.get('/',async(req,res)=>{
    const userId = req.query.userId
    const username = req.query.username
    try {
        const user =userId ? await User.findById(userId):await User.findOne({username:username})
        const {password,updatedAt,...others}=user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get friends
router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
});
//follow user

router.put('/:id/follow',async(req,res)=>{
    if (req.body.userId !== req.params.id) {

        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.body.userId)

        if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({$push:{followers:req.body.userId}})
            await currentUser.updateOne({$push:{following:req.params.id}})

            res.status(200).json('user has been followed')
        } else {
            res.status(500).json("you have already following this account")
        }
        
    } else {
        res.status(403).json("you con't follow your account")
    }
})

//unfollow user

router.put('/:id/unfollow',async(req,res)=>{
    if (req.body.userId !== req.params.id) {

        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.body.userId)

        if (user.followers.includes(req.body.userId)) {
            await user.updateOne({$pull:{followers:req.body.userId}})
            await currentUser.updateOne({$pull:{following:req.params.id}})

            res.status(200).json('user has been unfollowed')
        } else {
            res.status(500).json("you don't follow this account")
        }
        
    } else {
        res.status(403).json("you con't unfollow your account")
    }
})


module.exports=router