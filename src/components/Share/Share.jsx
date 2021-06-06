import React from 'react'
import './Share.css'
import  {EmojiEmotions, Label, PermMedia, Room} from '@material-ui/icons'

const Share = () => {
    return (
       <div className="share">
           <div className="shareWrapper">
               <div className="shareTop">
               <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
                    <input placeholder="What's in user mind" className="shareInput" />
               </div>
               <hr className="shareHr" />
               <div className="sharebottom">
                   <div className="shareOptions">
                       <div className="shareOption">
                           <PermMedia htmlColor="tomato" className="shareIcon"/>
                           <span className="shareOptionText">Photo/video</span>
                       </div>
                       <div className="shareOption">
                           <Label htmlColor="blue" className="shareIcon"/>
                           <span className="shareOptionText">Tag</span>
                       </div>
                       <div className="shareOption">
                           <Room htmlColor="green" className="shareIcon"/>
                           <span className="shareOptionText">Location</span>
                       </div>
                       <div className="shareOption">
                           <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                           <span className="shareOptionText">Feeling</span>
                       </div>
                   </div>
                   <button className="sharebutton">Share</button>
               </div>
           </div>
       </div>
    )
}

export default Share
