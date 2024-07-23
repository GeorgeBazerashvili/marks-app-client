import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Source } from "../App"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const source = useContext(Source)
    const {localToken, setLocalToken, isAdmin, setIsAdmin} = source

    async function sendLoginInfo(e) {
        e.preventDefault();

        try {
          await axios.post("/auth/login", {username, password})
                .then(res => {
                  if(res.data.token) {
                    localStorage.setItem("token", res.data.token);
                    setLocalToken(res.data.token)

                    if(res.data.isAdmin === true) {
                      localStorage.setItem("admin", true)
                      setIsAdmin(localStorage.getItem("admin"))
                      navigate("/admin")
                    } else {
                      setIsAdmin(false)
                      navigate("/")
                    }
                  }
                })
                .catch(error => console.error(error))
        } catch (error) {
          console.error("test")
          console.error(error.message)
        }
    }

    return (
        <div className='register-main'>
          <div className='wrapper register-div'>
            <h1>Login on Marks App</h1>
            
            <form onSubmit={sendLoginInfo} className='register-form'>
              <p className='error'></p>
                <div className='username-div'>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id='username' value={username}
                           onChange={(e) => setUsername(e.target.value)} required />
                </div>
    
                <div className='password-div'>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id='password' value={password}
                           onChange={(e) => setPassword(e.target.value)} required />
                </div>
    
                <button>Login</button>
                <p>If you don't have an account <Link to="/register" className='link'>register</Link></p>
            </form>
          </div>
        </div>
      )
}

export default Login
