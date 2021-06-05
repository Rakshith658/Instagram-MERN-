import React from 'react'
import './Tabbar.css'
import { Chat, Person, Search,Notifications } from '@material-ui/icons'

const Tabbar = () => {
    return (
        <div className="topbarcontainer">
            <div className="topbarleft">
                <span className="logo">Instagram</span>
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
                <img src="/assets/person/1.jpeg" alt="" className="topbarImage" />
            </div>
        </div>
    )
}

export default Tabbar
