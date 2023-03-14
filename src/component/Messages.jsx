import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { Message } from "./Message";

export function Messages(){
    const {data} = useContext(ChatContext);
    const [messages,setMessage] = useState([])
    

    useEffect(()=>{
        const fetchMsg=()=>{
            const unsub=onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
                
                doc.exists() && setMessage(doc.data().messages);
                
                
            })
            
        }
       data.chatId && fetchMsg();
    },[data.chatId])
    
    return(
        <div className="messages">
            {messages?.map((msg)=>{
                return(
                <Message message={msg} key={msg.id} />
                );
            })}
            
            
        </div>
    );
}