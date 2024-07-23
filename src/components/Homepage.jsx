import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Source } from '../App'
import { useNavigate } from 'react-router-dom'

function Homepage() {
  const {localToken, setLocalToken} = useContext(Source);
  const navigate = useNavigate();

  useEffect(() => {
    (async function call() {
      try {
        await axios.get("/auth/verify", {
         headers: {
           Authorization: `Bearer ${localToken}`
         }
         }).then(res => console.log(res)).catch(() => {
          if(localStorage.getItem("admin")) localStorage.removeItem("admin")
          localStorage.removeItem("token");
          setLocalToken("");
          navigate("/register")
         })
      } catch (error) {
        console.error(error)
        console.log(error.message)
      }
    })()
  }, [])

  return (
    <div>
      Home Paaage!!
    </div>
  )
}

export default Homepage
