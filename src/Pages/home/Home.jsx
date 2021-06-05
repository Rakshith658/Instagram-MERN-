import React from 'react'
import Feed from '../../components/Feed/Feed'
import Leftbar from '../../components/Leftbar/Leftbar'
import Rightbar from '../../components/Rightbar/Rightbar'
import Tabbar from '../../components/Tabbar/Tabbar'
import './Home.css'

const Home = () => {
    return (
        <div>
            <Tabbar/>
            <div className="homecontainer">
            <Leftbar/>
            <Feed/>
            <Rightbar/>
            </div>
        </div>
    )
}

export default Home
