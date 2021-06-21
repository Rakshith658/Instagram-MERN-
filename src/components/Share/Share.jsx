import React, { useContext, useRef, useState } from 'react'
import './Share.css'
import  {EmojiEmotions, Label, PermMedia, Room,Cancel} from '@material-ui/icons'
import { AuthContext } from '../../context/Authcontext'
import axios from 'axios'

const Share = () => {
    const {user}=useContext(AuthContext)
    const desc = useRef()
    const [File, setFile] = useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const submitHandler = async(e) =>{
        e.preventDefault()
        const newPost = {
            userId:user._id,
            desc:desc.current.value
        }
        if(File){
            const data = new FormData()
            const fileName = Date.now()+File.name;
            data.append("file",File)
            data.append("name",fileName)
            newPost.img=fileName
            try{
                await axios.post("/upload",data)
            }catch(error){
                console.log(error);
            }
        }
        try {
            await axios.post("/posts",newPost)
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }
    return (
       <div className="share">
           <div className="shareWrapper"> 
               <div className="shareTop">
               <img className="shareProfileImg" src={user.profilePicture?PF+user.profilePicture:PF+"/person/1.jpeg"} alt="" />
                    <input placeholder={"What's in user mind "+user.username+" ?"} className="shareInput" ref={desc} />
               </div>
               <hr className="shareHr" />
               {File && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(File)} alt="" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
               <form className="sharebottom" onSubmit={submitHandler}>
                   <div className="shareOptions">
                       <label htmlFor="file" className="shareOption">
                           <PermMedia htmlColor="tomato" className="shareIcon"/>
                           <span className="shareOptionText">Photo/video</span>
                           <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                       </label>
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
                   <button className="sharebutton" type="submit">Share</button>
               </form>
           </div>
       </div>
    )
}

export default Share
