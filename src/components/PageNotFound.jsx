import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='wrapper error-page' style={{display:"flex", width: "100%", height: "100vh", background: "black", 
    alignItems: "center", justifyContent:"center", gap: "1rem",}}>
      <p style={{color: "red"}}>Error 404</p>
      <h1 style={{color: "red"}}>Oops! Coudn't find page you are searching!!</h1>
      <Link style={{color: "red"}} to="/">Go back to home page</Link>
    </div>
  )
}

export default PageNotFound
