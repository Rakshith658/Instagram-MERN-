import React ,{useState,useEffect}from 'react'
import './Post.css'
import { MoreVert } from '@material-ui/icons'
// import { Users } from "../../dummyData";
import axios from 'axios';
import {format}from 'timeago.js'
import {Link} from 'react-router-dom'

const Post = ({ post }) => {
    const [like,setLike] = useState(post.likes.length)
    const [isLiked,setIsLiked] = useState(false)
    const [User, setUser] = useState({})

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const likeHandler =()=>{
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }
    useEffect(() => {
        const fetchUser = async()=>{
            const response=await axios.get(`/users?userId=${post.userId}`)
            setUser(response.data)
            console.log(response);
        }
        fetchUser()
    }, [post.userId])
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLift">
                        <Link to={`/profile/${User.username}`}>
                            <img className="postProfileImg" src={User.profilePicture ? PF+User.profilePicture : PF +"person/1.jpeg"} alt="" />
                        </Link>
                        <span className="postUserName">{User.username}</span>
                        <span className="postDate">{format(post.createAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF+post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLift">
                        <img className="likeIcon" src={`${PF}like.png`}onClick={likeHandler} alt="" />
                        <img className="likeIcon" src={`${PF}heart.png`}onClick={likeHandler}  alt="" />
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
