import React, { useContext, useEffect, useRef, useState } from 'react'
import './Messenger.css'
import Tabbar from '../../components/Tabbar/Tabbar'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Messages from '../../components/Messages/Messages'
import Conversations from '../../components/conversations/Conversations'    
import { AuthContext } from '../../context/Authcontext'
import axios from 'axios'

const Messenger = () => {
    const [convarsations, setconvarsations] = useState([])
    const [currentChat, setcurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [Newmessages, setNewMessages] = useState('')
    const {user} = useContext(AuthContext)
    const scroolref = useRef()

    useEffect(() => {
        const getConvarsations = async()=>{
            try { 
                const res = await axios.get(`/convarsation/${user._id}`)
                setconvarsations(res.data)
            } catch (error) {
                console.log(error);
            }
        }

        getConvarsations()
    }, [user._id])

    useEffect(() => {
        const getMessages=async()=>{
            try {
                const res = await axios.get(`/messages/${currentChat?._id}`)
                setMessages(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getMessages()
    }, [currentChat])
    // console.log(messages);
    const handleSubmit = async(e) => {
        e.preventDefault()
        const messagesss={
            sender:user._id,
            text:Newmessages,
            conversationId:currentChat._id
        }
        try {
          const res =  await axios.post(`/messages`,messagesss)
          setMessages([...messages,res.data])
          setNewMessages('')
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        scroolref.current?.scrollIntoView({behavior:'smooth'})
    }, [messages])
    return (
        <>
            <Tabbar/>
            <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for Friends" className="chatMenuInput"/>
                    {convarsations.map((c) =>(
                        <div onClick={()=>setcurrentChat(c)} key={user._id}>
                            <Conversations convarsation={c} currentUser={user}/>
                        </div>
                    ))}   
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    { currentChat ?<>
                    <div className="chatBoxTop">
                        {messages.map((m)=>(
                            <div ref={scroolref}>
                                <Messages messages={m} own={m.sender ===user._id}/>
                            </div>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea 
                            className="chatMessageInput" 
                            placeholder="write something..........."
                            value={Newmessages}
                            onChange={(e)=>setNewMessages(e.target.value)}
                        ></textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                    </div> </>:<span className="noConvarsation">open convarsation to start a chat</span>}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper"><ChatOnline/></div>
            </div>
            </div>
        </>
    )
}

export default Messenger
