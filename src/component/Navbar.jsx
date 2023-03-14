import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

export function Navbar(){
    const {currentUser} =useContext(AuthContext);
    return (
        <div className="navbar">
            <span className="logo">Rohi Chat</span>
            <div className="user">
                <img className="pic" src={currentUser.photoURL} />
                <span className="name">{currentUser.displayName}</span>
                <button className="logout" onClick={()=>signOut(auth)}>Logout</button>
            </div>
        </div>
    );
}