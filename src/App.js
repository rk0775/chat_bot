
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./style.scss"
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentUser} =useContext(AuthContext);
  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to="/" />
    }
    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<ProtectedRoute><Home /></ProtectedRoute> } />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
