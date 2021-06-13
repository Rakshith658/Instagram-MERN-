import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Feed from '../../components/Feed/Feed'
import Leftbar from '../../components/Leftbar/Leftbar'
import Rightbar from '../../components/Rightbar/Rightbar'
import Tabbar from '../../components/Tabbar/Tabbar'
import './Profile.css'
import {useParams} from 'react-router'

const Profile = () => {
    const [User, setUser] = useState({})
    const params = useParams()

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async()=>{
            const response=await axios.get(`/users?username=${params.username}`)
            setUser(response.data)
            console.log(response.data);
        }
        fetchUser()
    }, [params.username])

    return (
        <div>
            <Tabbar/>
            <div className="homecontainer">
            <Leftbar/>
            <div className="ProfileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img src={User.coverPicture||PF+"post/3.jpeg"} alt="" className="profileCoverImg" />
                        <img src={User.profilePicture||PF+"post/7.jpeg"} alt="" className="profileUserImg" />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{User.username}</h4>
                        <span className="profileInfoDescr">{User.desc}</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed username={params.username}/>
                    <Rightbar user={User}/>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Profile
