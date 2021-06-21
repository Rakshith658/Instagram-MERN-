import React, { useContext, useState } from 'react'
import Share from '../Share/Share'
import Post from '../post/Post'
import './Feed.css'
import { useEffect } from 'react'
// import { Posts } from "../../dummyData";
import axios from 'axios'
import { AuthContext } from '../../context/Authcontext'

const Feed = ({username}) => {
    const [Posts, setPosts] = useState([])
    const {user} = useContext(AuthContext)

    useEffect(() => {
        const fetchPost = async()=>{
            const response= username ?  
                await axios.get(`/posts/profile/${username}`) :
                await axios.get(`posts/timeline/${user._id}`)
            setPosts(response.data);
        }
        fetchPost()
    }, [username,user._id])
    return (
        <div className="Feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {Posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    )
}

export default Feed
