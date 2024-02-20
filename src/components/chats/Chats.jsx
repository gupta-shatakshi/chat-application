import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from '../../context/ChatContext';

const Chats = () => {

    const [chats, updateChats] = useState([]);
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)

    useEffect(() => {

        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                updateChats(doc.data())
            });

            return () => {
                unsub();
            }
        }

        currentUser?.uid && getChats()

    }, [currentUser?.uid])

    const handleSelect = (payload) => {
        dispatch({
            type: "CHANGE_USER",
            payload: payload
        })
    }

    return (
        <div className='chats'>
            {
                Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => {
                    return (
                        <div className='userChat' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                            <img src={chat[1].userInfo.photoURL} alt='' />
                            <div className='userChat__info'>
                                <span>{chat[1].userInfo.displayName}</span>
                                <p>{chat[1].lastMessage?.text}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Chats