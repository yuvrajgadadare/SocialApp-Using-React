import React, { useEffect, useState } from "react";
import './Topbar.css'
import SearchIcon from '@mui/icons-material/Search';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Topbar(){

    const [Data, SetData] = useState([]);
    
    useEffect(() => {
        try {
            const arrayOfData = localStorage.getItem('User');
            const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
            SetData(d);
            console.log(d);
        }
        catch (error) {
            console.log(error);
        }
    }, [])

    const navigate=useNavigate();
  
   function Logout(){
        localStorage.clear();
        navigate("/login");

    }
    function Profile(d){
        navigate("/profile/"+Data.user_id);
    }
    function home(){
        navigate("/home");
    }
    function Home(){
        navigate("/home");
    }
    return(
        <>
        <div className="topbarContainer">
            <div className="topbarleft">
           <span className="logo" onClick={Home}><span className="logoname">Y</span>Social</span>
           </div>
       
        <div className="topbarcenter">
            <div className="searchbar">
            <SearchIcon className="searchicon"/>
                <input placeholder="Search Here..." className="searchinput"/>
            </div>
        </div>
        <div className="topbarright">
            <div className="topbarLinks">
                <span className="topbarlink" onClick={home}>HomePage</span>
            </div>
            <div className="topbaricon">
                <div className="topbariconitem">
                <NotificationsActiveIcon/>
                </div>

                <div className="topbariconitem" onClick={()=>Profile(Data.user_id)}>
             
                <PersonPinIcon>  </PersonPinIcon>
                </div>
                <div className="topbariconitem">
                <SettingsIcon/>
                </div>
                <div className="topbariconitem">
                   <LogoutIcon htmlColor="red" onClick={Logout}/> 
                </div>
            </div>

        </div>
        </div>
        </>
    )
}
export default Topbar;