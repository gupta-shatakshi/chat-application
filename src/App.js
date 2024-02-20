import React, { useContext, useState } from 'react'
import "./app.scss";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import "./style.scss";
import { AuthContext } from './context/AuthContext';

const App = () => {

    const [darkTheme, updateDarkTheme] = useState(() => {
        const storedTheme = localStorage.getItem('darkTheme');
        return storedTheme ? JSON.parse(storedTheme) : true;
    });


    const toggleDarkTheme = () => {
        const newTheme = !darkTheme;
        updateDarkTheme(newTheme);

        // Save theme preference to local storage
        localStorage.setItem('darkTheme', JSON.stringify(newTheme));
    };

    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />
        }
        return children;
    }

    return (
        <div data-theme={darkTheme ? "dark" : "light"}>

            {/* dark mode button */}
            <span
                style={{
                position: "absolute",
                right: 20,
                top: 15,
                color: darkTheme ? "#fff" : "#000"
            }}>
                Dark theme
            </span>
            <label onClick={toggleDarkTheme} id='theme'>
                <input type="checkbox" checked={darkTheme} onChange={toggleDarkTheme} />
                <span className="slider round" />
            </label>

            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>

    )
}

export default App