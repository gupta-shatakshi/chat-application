import React, { useContext, useState } from 'react'
import "./search.scss"
import { collection, getDoc, getDocs, query, where, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase'
import { AuthContext } from "../../context/AuthContext"

const Search = () => {

    const [username, updateUsername] = useState("");
    const [user, updateUser] = useState(null);
    const [error, updateError] = useState(false);

    const { currentUser } = useContext(AuthContext)

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", username));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                updateUser(doc.data())
            });
        } catch (error) {
            updateError(true)
        }
    }

    const handleKeyDown = (event) => {
        event.keyCode === 13 && handleSearch()
    }

    const handleChange = (event) => {
        updateUsername(event.target.value)
    }

    const handleSearchedUserClick = async () => {
        // check if group(chats in firestore) exists
        // if not, create new one

        const combinedId = currentUser?.uid > user?.uid ? currentUser?.uid + user?.uid : user?.uid + currentUser?.uid;

        try {
            const res = await getDoc(doc(db, "chats", combinedId))

            if (!res.exists()) {
                // create chat in chats collection with an empty message array
                await setDoc(doc(db, "chats", combinedId), { messages: [] })

                // create user chats
                await updateDoc(doc(db, "userChats", currentUser?.uid), {
                    [`${combinedId}.userInfo`]: {
                        uid: user?.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [`${combinedId}.date`]: serverTimestamp()
                })


                await updateDoc(doc(db, "userChats", user?.uid), {
                    [`${combinedId}.userInfo`]: {
                        uid: currentUser?.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [`${combinedId}.date`]: serverTimestamp()
                })

            }
        } catch (err) {

        }
        updateUsername("");
        updateUser(false);
    }

    return (
        <div className='search'>
            <div className='search__form'>
                <input
                    type='text'
                    name=''
                    id=''
                    value={username}
                    placeholder='Search user here...'
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                />
            </div>

            {error && <span>User not found</span>}

            {user && <div className='userChat' onClick={handleSearchedUserClick}>
                <img src={user?.photoURL} alt='' />
                <div className='userChat__info'>
                    {user?.displayName}
                </div>
            </div>}
        </div>
    )
}

export default Search