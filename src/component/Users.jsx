import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

export function Users() {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
                setChats(doc.data());
            })

        }
        currentUser.uid && getChats()

    }, [currentUser.uid])

    const HandleClick = (user) => {
        dispatch({ type: "CHANGE_USER", payload: user })
    }

    
    return (
        <>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => {
                return (
                    <div className="users">
                        <div className="userdiv" key={chat[0]} onClick={() => { HandleClick(chat[1].userInfo) }}>
                            <img src={chat[1].userInfo.photoURL} alt="" />
                            <div className="userChat">
                                <span className="userName">{chat[1].userInfo.displayName}</span>
                                <p className="msg">{chat[1].lastMessage?.text}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}