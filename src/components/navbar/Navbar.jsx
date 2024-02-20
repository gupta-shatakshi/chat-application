import React, { useContext } from 'react'
import './navbar.scss'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext"

const Navbar = () => {

    const { currentUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleLogOut = () => {
        signOut(auth);
        navigate("/login");
    }

    return (
        <div className='navbar'>
            <span className='navbar__logo'>
                Quick Chat
            </span>
            <div className='navbar__user'>
                <img
                    src={currentUser?.photoURL}
                    alt='avatar'
                />
                <span>{currentUser?.displayName}</span>
                <button onClick={handleLogOut}>Log out</button>
            </div>
        </div>
    )
}

export default Navbar