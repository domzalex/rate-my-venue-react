import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { NavLink } from 'react-router-dom';

function Register() {

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState("");
    const [data, setData] = useState(null);

    const register = () => {
        axios({
        method: "POST",
        data: {
            username: registerUsername,
            email: registerEmail,
            password: registerPassword,
        },
        withCredentials: true,
        url: "http://localhost:8080/register",
        }).then((res) => console.log(res));
    };
    return (
        <div className="register-login">
            <h1>Register</h1>
            <input
                placeholder="username"
                onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="email"
                onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <div className="login-submit">
                <button onClick={register}>Register</button>
                <p>click <NavLink className="register" to="/login">here</NavLink> to login</p>
            </div>
        </div>
    )
}

export default Register