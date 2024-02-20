import React, { useState } from 'react'
import "../../pages/register/register.scss"
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';

const Login = () => {

    const [error, updateError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = event.target[0].value;
        const password = event.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")

        } catch (error) {
            updateError(true)
        }

    }

    return (
        <div className='register'>
            <div className='register__container'>
                <div className='register__container__header'>
                    <h2>Quick Chat</h2>
                    <p>Login</p>
                </div>

                <form onSubmit={handleSubmit} className='register__container__form'>
                    <input type='email' placeholder='Enter email' />
                    <input type='password' placeholder='Enter password' />

                    <button>Sign in</button>
                    {error && <span>Something went wrong</span>}

                </form>

                <div className='register__container__footer'>
                    <span>You don't have an account? <Link to="/register">Register</Link></span>
                </div>
            </div>
        </div>
    )
}

export default Login