import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export function Register() {
    const [err, setErr] = useState(false);
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                (error) => {
                    // Handle unsuccessful uploads
                    
                    setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "users", res.user.uid), {
                            uid:res.user.uid,
                            displayName,
                            email,
                            photoURL:downloadURL
                        })

                        await setDoc(doc(db,"userChat",res.user.uid),{});
                    });
                    navigate('/home')
                }
            );
        } catch (err) {
            
            setErr(true);
        }

    }
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <div className="form">
                    <p className="logo">Rohi Chat</p>
                    <p className="title">Register</p>
                    <form onSubmit={handleSubmit} >
                        <input type="text" placeholder="Display name" />
                        <input type="email" placeholder="email" />
                        <input type="password" placeholder="password" />
                        <input type="file" style={{ display: 'none' }} id="avatar" placeholder="Select avatar..." />
                        <label htmlFor="avatar">select the avatar</label>

                        <button>Sign Up</button>
                        {err && <span className="errorMsg">Something went wrong !!</span>}
                    </form>
                    <p className="Line">Do you have an account? <NavLink to={"/"}>Login</NavLink></p>
                </div>
            </div>

        </div>
    )
}
