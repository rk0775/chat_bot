import { Navbar } from "./Navbar";
import { Search } from "./Search";
import { Users } from "./Users";

export function Sidebar(){
    return(
        <div className="sidebar">
            <Navbar/>
            <Search />
            <Users />
        </div>
    );
}