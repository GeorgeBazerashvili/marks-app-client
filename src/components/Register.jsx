import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Source } from '../App';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const source = useContext(Source)
    const {localToken, setLocalToken} = source
    const navigate = useNavigate();

    async function sendRegisterInfo(e) {
        e.preventDefault();

        try {
          await axios.post("/auth/register", {username, password})
          .then(res => {
            if(res.data.token) {
              localStorage.setItem("token", res.data.token);
              setLocalToken(res.data.token)
              navigate("/")
            } else {
              console.log("no token is provided")
            }
          })
        } catch (error) {
          console.log(error.message)
        }
    }

    return (
        <div className='register-main'>
          <div className='wrapper register-div'>
            <h1>Register on Marks App</h1>
            
            <form onSubmit={sendRegisterInfo} className='register-form'>
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
    
                <button>Register</button>
                <p>If you already have an account <Link to="/login" className='link'>login</Link></p>
            </form>
          </div>
        </div>
      )
}

export default Register
