import React from 'react'
import './chatOnline.css'

const ChatOnline = () => {
    return (
        <div className="chatOnline">
                <div className="chatOnlineFriend" >
                <div className="chatOnlineImgContainer">
                    <img
                    className="chatOnlineImg"
                    src="https://cache.boston.com/resize/bonzai-fba/Globe_Photo/2011/04/14/1302796985_4480/539w.jpg"
                    alt=""
                    />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Rakshith</span>
                </div>
            </div>
    )
}

export default ChatOnline
