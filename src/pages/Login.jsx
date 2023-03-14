import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export function Login() {
    const [err, setErr] = useState(false);
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth,email,password);
            navigate("/home");
        } catch (err) {
            console.log("Error is : "+err)
            setErr(true);
        }

    }




    return (
        <div className="formContainer">
            <div className="formWrapper">
                <div className="form">
                    <p className="logo">Rohi Chat</p>
                    <p className="title">Login</p>
                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder="email" />
                        <input type="password" placeholder="Password" />
                        <button>Login</button>
                        
                    </form>
                    {err && <span className="errorMsg">Wrong email or password !!</span>}
                    <p className="Line">Do you have an account?<NavLink to={"/register"}> Sign up </NavLink> </p>
                </div>
            </div>

        </div>
    );
}