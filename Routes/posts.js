const router = require('express').Router()
const Post = require('../models/Post')
const user = require('../models/user')

//create post 

router.post('/',async(req,res)=>{
    const newPost = new Post(req.body)
    try {
        const savepost = await newPost.save()
        res.status(200).json(savepost)
    } catch (error) {
        res.status(400).json(error)
    }
})

//update post

router.put('/:id',async(req,res)=>{
    const post =await Post.findById(req.params.id)
    try {
        if (post.userId === req.body.userId) {
            await post.updateOne({$set:req.body})
            res.status(403).json('the post has been update')
        } else {
            res.status(403).json('you can only update your post')
        }
    } catch (error) {
        res.status(403).json(error)
        
    }
})

//delete post 

router.delete('/:id',async(req,res)=>{
    const post =await Post.findById(req.params.id)
    try {
        if (post.userId === req.body.userId) {
            await post.deleteOne()
            res.status(403).json('the post has been delete')
        } else {
            res.status(403).json('you can only delete your post')
        }
    } catch (error) {
        res.status(403).json(error)
        
    }
})

//like/dislike post

router.put('/:id/like',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
           await post.updateOne({$push:{likes:req.body.userId}})
           res.status(200).json('post has been liked')
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json('post has been disliked')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//get post

router.get('/:id',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get timeline post

router.get("/timeline/all", async (req, res) => {
    try {
      const currentUser = await user.findById(req.body.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.following.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router