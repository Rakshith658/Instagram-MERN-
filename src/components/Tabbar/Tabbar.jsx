import React,{useContext} from 'react'
import './Tabbar.css'
import { Chat, Person, Search,Notifications } from '@material-ui/icons'
import {Link} from 'react-router-dom'
import { AuthContext } from "../../context/Authcontext"

const Tabbar = () => {
    const { user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="topbarcontainer">
            <div className="topbarleft">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span className="logo">Instagram</span>
                </Link>
            </div>
            <div className="topbarmid">
                <div className="searchbar">
                    <Search className="searchicon"/>
                    <input placeholder="Search for friends" className="searchinput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarlinks">
                    <span className="topbarlink">Homepage</span>
                    <span className="topbarlink">Timeline</span>
                </div>
                <div className="topbaricons">
                    <div className="topbarIconitem">
                        <Person/>
                        <span className="topbariconBadge">1</span>
                    </div>
                    <div className="topbarIconitem">
                        <Chat/>
                        <span className="topbariconBadge">1</span>
                    </div>
                    <div className="topbarIconitem">
                        <Notifications/>
                        <span className="topbariconBadge">1</span>
                    </div>
                </div>
                <Link to={`profile/${ user.username}`} style={{textDecoration:"none"}}>
                    <img src={ user.profilePicture ? PF+user.profilePicture: PF+"/person/1.jpeg"} alt="" className="topbarImage" />
                </Link>
            </div>
        </div>
    )
}

export default Tabbar
