import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {v4 as uuid} from 'uuid'
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';

export function Input(){
    const [text,setText]=useState("")
    const [img,setImg] = useState(null);

    const{currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);
    const sendMsg = async () =>{
        
        if(img){
            
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on(
                (error) => {
                    // Handle unsuccessful uploads
                    
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db,"chats",data.chatId),{
                            messages : arrayUnion({
                                id: uuid(),
                                text,
                                senderId:currentUser.uid,
                                date:Timestamp.now(),
                                img:downloadURL,
                            })
                        });
                    });
                    
                }
            );
        }else{
            await updateDoc(doc(db,"chats",data.chatId),{
                messages : arrayUnion({
                    id: uuid(),
                    text,
                    senderId:currentUser.uid,
                    date:Timestamp.now()
                })
            })
        }

        await updateDoc(doc(db,"userChat",currentUser.uid),{
            [data.chatId + ".lastMessage"]:{
                text
            },
            [data.chatId+".date"]:serverTimestamp()
        })
        await updateDoc(doc(db,"userChat",data.user.uid),{
            [data.chatId + ".lastMessage"]:{
                text
            },
            [data.chatId+".date"]:serverTimestamp()
        })
        setImg(null);
        setText("")
    }
    return(
        <div className="input">
            <input type="text" value={text} placeholder="Type something..." onChange={(e)=>setText(e.target.value)} />
            <div className="send">
                <img src="" alt="" />
                <input type="file" style={{display:"none"}} id="file"  onChange={(e)=>(setImg(e.target.files[0]))} />
                <label htmlFor="file" style={{display:"flex"}}>
                    <span><AttachFileRoundedIcon sx={{color:"gray",paddingRight:"8px",cursor:"pointer"}} /></span>
                    <span><AddPhotoAlternateRoundedIcon sx={{color:"gray",paddingRight:"5px",cursor:"pointer"}} /> </span>
                </label>
                <button onClick={sendMsg}>Send</button>
            </div>
        </div>
    );
}