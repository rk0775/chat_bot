import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Input } from "./Input";
import { Messages } from "./Messages";
import VideocamSharpIcon from '@mui/icons-material/VideocamSharp';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';

export function Chat(){
    const {data} = useContext(ChatContext);
    return(
        <div className="chat">
            <div className="chatInfo">
                <span className="name">{data.user?.displayName}</span>
                <div className="chatIcon">
                    <span><VideocamSharpIcon sx={{color:"whitesmoke",paddingRight:"10px",cursor:"pointer"}} /></span>
                    <sapn ><PersonAddAltSharpIcon sx={{color:"whitesmoke",paddingRight:"10px",cursor:"pointer"}} /></sapn>
                    <span><MoreHorizSharpIcon sx={{color:"whitesmoke",paddingRight:"10px",cursor:"pointer"}}/></span>
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    );
}