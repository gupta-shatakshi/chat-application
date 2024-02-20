import React from 'react'
import "./chat.scss"
import Cam from "../../img/cam.png"
import Add from "../../img/add.png"
import More from "../../img/more.png"
import Messages from '../messages/Messages'
import Input from '../input/Input';
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'

const Chat = () => {

    const { data } = useContext(ChatContext);

    return (
        <div className='chat'>
            <div className='chat__info'>
                <span>{data?.user?.displayName}</span>
                <div className='chat__info__icons'>
                    <img src={Cam} alt='' />
                    <img src={Add} alt='' />
                    <img src={More} alt='' />
                </div>
            </div>

            <Messages />
            <Input />
        </div>
    )
}

export default Chat