import React from 'react'
import './messages.css'
import {format} from 'timeago.js'

const Messages = ({messages,own}) => {
    return (
        <div className={own ? "message own" :"message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://cache.boston.com/resize/bonzai-fba/Globe_Photo/2011/04/14/1302796985_4480/539w.jpg" alt="" />
                <p className="messageText">{messages.text}</p>
            </div>
            <div className="messageBottom">{format(messages.createAt)}</div>
        </div>
    )
}

export default Messages
