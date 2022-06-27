import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

function Login() {

    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState("");
    const [data, setData] = useState(null);

    let navigate = useNavigate()

    const login = () => {
        axios({
          method: "POST",
          data: {
            username: loginUsername,
            password: loginPassword,
          },
          withCredentials: true,
          url: "http://localhost:8080/login",
        }).then((res) => {
            console.log(res)
            if (res.data == "No User Exists") {
                alert('User Not Found')
            } else {
                navigate(`/Create`)
            }
        });
      };

    return (
        <div className="register-login">
            <h1>Login</h1>
            <input
                placeholder="username"
                onChange={(e) => setLoginUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                onChange={(e) => setLoginPassword(e.target.value)}
            />
            <div className="login-submit">
                <button onClick={login}>Login</button>
                <p>click <NavLink className="register" to="/register">here</NavLink> to register</p>
            </div>
        </div>
    )
}

export default Login