import { margin } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import './LoginPage.css';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button } from "react-bootstrap";
import { json, Link, Route, Router, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
function Adminlogin(){
    const uname=useRef();
    const pass=useRef();
    const [apiurl]=useState("http://localhost:9090/");
    const navigate=useNavigate();
    const[Userdata,setUserdata]=useState([]);
    const [Admindata,setAdmindata]=useState([]);
   
        const Admilogin=()=>{

            var un=uname.current.value;
            var pw=pass.current.value;
            var data=new FormData();
            data.append("admin_unique_name",un);
            data.append("password",pw);
            if(un =="")
            {
                alert("Enter Username")
            }
           else if(pw =="")
            {
                    alert("Enter Password")
            }
            else{
            axios({
                url: apiurl + 'Api/AdminLogin',
                method:'post',
                processData: false,
                contentType: false,
                data: data,
            }).then((e)=>{
                body:JSON.stringify(e.data)
                setAdmindata(e.data);
                localStorage.setItem("Admin", JSON.stringify(e.data))
              navigate("/adminpannel");
                   
            })
            }
            
      }
    return(
        <>
        <bodyl>
           
                <card>
                    <h1 className="title">Admin Sign In</h1>
                    <p className="subtitle">
                        Please Login Here
                    </p>
                    <form method="POST" encType="multipart/form-data">
                        <div className="inputs_container">
                            <input type="text" placeholder="UserName" ref={uname}></input>
                            {/* <p className="error-msg">Invalid Username</p> */}
                            <input type="text" placeholder="Password"  ref={pass}></input>
                          {/* <p className="error-msg">Invalid Username</p> */}
                        </div>
                        <Button  className="login_button" onClick={Admilogin}>Log In</Button>
                    </form>
                    <div className="link_container">
                        <a href="/CreateAccount" className="small">
                           Create Account
                        </a>     
                    </div>
                    <div className="icons">
                    <GoogleIcon className="icon"></GoogleIcon>
                    <FacebookIcon className="icon"></FacebookIcon>
                    <TwitterIcon className="icon"></TwitterIcon>
                    </div>
                
                </card>

           

        </bodyl>
        
        
        </>
    )
}
export default Adminlogin;