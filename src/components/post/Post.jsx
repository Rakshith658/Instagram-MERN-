import React ,{useState}from 'react'
import './Post.css'
import { MoreVert } from '@material-ui/icons'
import { Users } from "../../dummyData";

const Post = ({ post }) => {
    const [like,setLike] = useState(post.like)
    const [isLiked,setIsLiked] = useState(false)

    const likeHandler =()=>{
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLift">
                        <img className="postProfileImg" src={Users.filter((u) => u.id === post?.userId)[0].profilePicture} alt="" />
                        <span className="postUserName">{Users.filter((u) => u.id === post?.userId)[0].username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={post.photo} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLift">
                        <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
                        <img className="likeIcon" src="/assets/heart.png"onClick={likeHandler}  alt="" />
                        <span className="postlikeCouter">{like} people like it..</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="CommentCounter">{post.comment} Comment</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
