import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import Topbar from "./Topbar";
import './Homecomponent.css'

function Home(){
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
    return(
        <>
   
    {Data.length === 0 ? "Please Login": 
    <>
      <Topbar/>
        
        <div className="homecontainer">
          <Sidebar/>
           <Feed/>
           {/* <Rightbar/> */}
        </div>
    
    </>
   
  } 

      
      

        
        </>
   
    )
}
export default Home;