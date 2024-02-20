import React from 'react'
import "./home.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Chat from '../../components/chat/Chat'

const Home = () => {
    return (
        <div className='home'>
            <div className='home__container'>
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}

export default Home