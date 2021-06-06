import React from 'react'
import Share from '../Share/Share'
import Post from '../post/Post'
import './Feed.css'
import { Posts } from "../../dummyData";

const Feed = () => {
    return (
        <div className="Feed">
            <div className="feedWrapper">
                <Share/>
                {Posts.map((p) => (
                    <Post key={p.id} post={p} />
                ))}
            </div>
        </div>
    )
}

export default Feed
