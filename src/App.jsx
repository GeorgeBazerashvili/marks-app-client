import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Register from "./components/Register"
import { useState, createContext } from "react"
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import axios from "axios";
import AdminPanel from "./components/AdminPanel";
import PageNotFound from "./components/PageNotFound";

export const Source = createContext(null); 

function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  const [localToken, setLocalToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("admin"));
  
  const navigate = useNavigate();


  window.addEventListener("storage", () => {
    (async function call() {
      axios.get("/auth/verify", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then(res => console.log(res)).catch(() => {
        if(localStorage.getItem("admin")) localStorage.removeItem("admin");
        localStorage.removeItem("token");
        setLocalToken("");
        navigate("/register")
      })
    })()
  })

  return (
    <Source.Provider value={{
      localToken, setLocalToken, isAdmin, setIsAdmin
    }}>
       <Routes>
            <Route path="*" element={<PageNotFound />}></Route>
            <Route path="/" element={localToken ? <Homepage /> : <Navigate to="/register" />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/admin" element={isAdmin ? <AdminPanel /> : <PageNotFound />}></Route>
       </Routes>
    </Source.Provider>
  )
}

export default App