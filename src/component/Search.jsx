import { useContext, useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { AuthContext } from "../context/AuthContext";
import { db } from '../firebase'
import { async } from "@firebase/util";
export function Search() {

    const [username, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const {currentUser}=useContext(AuthContext)


    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", username));
        try {
            const querySnapshot = await getDocs(q);
            setUser(null);
            querySnapshot.forEach((doc) => {
                setUser(doc._document.data.value.mapValue.fields)
            });
        } catch (err) {
            
            setErr(true);
        }

    }

    const handleKey = (e) => {

        e.code === "Enter" && handleSearch();
        
    }

    const handleSelect=async()=>{
        //firstly check group is exist or not if not create one
        const combineId = currentUser.uid > user.uid.stringValue ? currentUser.uid + user.uid.stringValue : user.uid.stringValue +currentUser.uid ;
        
        try{
            const res=await getDoc(doc(db,"chats",combineId));

            if(!res.exists()){
                await setDoc(doc(db,"chats",combineId),{messages:[]});

                await updateDoc(doc(db,"userChat",currentUser.uid),{
                    [combineId+".userInfo"] : {
                        uid:user.uid.stringValue,
                        displayName : user.displayName.stringValue,
                        photoURL:user.photoURL.stringValue
                    },
                    [combineId+".date"] : serverTimestamp()
                });
                await updateDoc(doc(db,"userChat",user.uid.stringValue),{
                    [combineId+".userInfo"] : {
                        uid:currentUser.uid,
                        displayName : currentUser.displayName,
                        photoURL:currentUser.photoURL
                    },
                    [combineId+".date"] : serverTimestamp()
                });
            }
        }catch(err){
            console.log("Error : "+err);
        }
        setUser(null);
        setUserName("");
        
    }




    return (

        <div className="search">
            <input type="text" value={username} onKeyDown={handleKey} onChange={(e) => setUserName(e.target.value)} placeholder="Find user..." />
            {user && <div className="users" onClick={handleSelect}>
                <div className="userdiv">
                    <img src={user.photoURL.stringValue} alt="" />
                    <span className="userName">{user.displayName.stringValue}</span>
                </div>
            </div>}
            {err && <span>User not found...</span>}
        </div>
    );
}