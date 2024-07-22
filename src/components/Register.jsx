import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function sendRegisterInfo(e) {
        e.preventDefault();

        try {
          await axios.post("/auth/register", {username, password})
          .then(res => {
            localStorage.setItem("token", res.data.token);
            navigate("/")
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
