import React, { useContext, useEffect, useState } from 'react'
import Message from '../message/Message'
import "./messages.scss";
import { ChatContext } from '../../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const Messages = () => {
    const [messages, updateMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const getMessages = () => {
            const unSub = onSnapshot(doc(db, "chats", data?.chatId), (doc) => {
                doc.exists() && updateMessages(doc.data().messages);
            });

            return () => {
                unSub();
            };
        }
        data?.chatId && getMessages()
    }, [data?.chatId]);

    return (
        <div className="messages">
            {messages.map((msg) => (
                <Message message={msg} key={msg.id} />
            ))}
        </div>
    );
};

export default Messages;