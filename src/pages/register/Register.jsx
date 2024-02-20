import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

// local dependencies
import { auth, storage, db } from '../../firebase';
import "./register.scss"
import Add from "../../img/addAvatar.png"


const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    };

    return (
        <div className='register'>
            <div className='register__container'>
                <div className='register__container__header'>
                    <h2>Quick Chat</h2>
                    <p>Register</p>
                </div>

                <form onSubmit={handleSubmit} className='register__container__form'>
                    <input type='text' placeholder='Enter username' />
                    <input type='email' placeholder='Enter email' />
                    <input type='password' placeholder='Enter password' />

                    <input style={{
                        display: "none"
                    }} id="file" type='file' />
                    <label htmlFor='file'>
                        <img src={Add} alt='Avatar' />
                        <span>Add an avatar</span>
                    </label>

                    <button>Sign up</button>

                    {loading && "Uploading and compressing the image please wait..."}

                    {err && <span>Something went wrong</span>}
                </form>

                <div className='register__container__footer'>
                    <span>You already have an account? <Link to="/login">Login</Link></span>
                </div>
            </div>
        </div>
    )
}

export default Register;
