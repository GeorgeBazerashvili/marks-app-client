import { Navigate, Route, Routes } from "react-router-dom"
import Register from "./components/Register"
import { useState, createContext } from "react"
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import axios from "axios";

export const Source = createContext(null); 

function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  const [localToken, setLocalToken] = useState(localStorage.getItem("token"));
  console.log(localToken);

  return (
    <Source.Provider value={{
      localToken, setLocalToken
    }}>
       <Routes>
            <Route path="/" element={localToken ? <Homepage /> : <Navigate to="/register" />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
       </Routes>
    </Source.Provider>
  )
}

export default App