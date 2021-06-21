import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './conversations.css'

const Conversations = ({convarsation,currentUser}) => {
    const [User, setUser] = useState(null)

    useEffect(() => {
        const friendId=convarsation.members.find(m=> m !==currentUser._id)
        const getFriend = async()=>{
            try { 
                const res = await axios.get(`/users?userId=${friendId}`)
                // console.log(res.data.username);
                setUser(res.data.username)
            } catch (error) {
                console.log(error);
            }
        }
        getFriend()
    }, [currentUser,convarsation])
    return (
        <div className="Conversation">
            <img className="conversationImg" src="https://cache.boston.com/resize/bonzai-fba/Globe_Photo/2011/04/14/1302796985_4480/539w.jpg" alt=""/>
            <span className="conversationName">{User}</span>
        </div>
    )
}

export default Conversations
