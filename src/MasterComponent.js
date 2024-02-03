import React from "react";
import { Container, Nav, Navbar, Tab, Tabs } from "react-bootstrap";

import { height } from "@mui/system";
import{BrowserRouter as Router, Routes,Link,Route} from "react-router-dom";
import Home from "./HomeComponent";
import Login from "./LoginPage";
import CreateAccount from "./CreateAccount";
import Profile from "./Profile";
import Codepost from "./CodePost";
import Errorpage from "./Errorpage";
import AdminLogin from "./Adminlogin";
import Adminpannel from "./Adminpannel";
import AdminPostcomponent from "./AdminPostcomponent";
import AdminUsercomponent from "./AdminUsercomponent";
import AdminCodePostcomponent from "./AdminCodePostcomponent";
import ViewAdvertise from "./ViewAdvertise";


export default class MasterComponentYsaas extends React.Component{
 
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Router>
                  
                  

   <Routes>

   <Route path="" element={<Login/>}/>
            <Route path="login" element={<Login/>}></Route>
            <Route path="home" element={<Home/>} />
            <Route path="CreateAccount" element={<CreateAccount/>} />
            <Route path="profile/:id" element={<Profile/>} />
            <Route path="codeposts" element={<Codepost/>} />
            <Route path="viewadvertise/:id" element={<ViewAdvertise/>}/>

            <Route path="*" element={<Errorpage/>}/>
            <Route path="adminlogin" element={<AdminLogin/>}/>
            <Route path="adminpannel" element={<Adminpannel/>}/>
            <Route path="admin/postcomponent" element={<AdminPostcomponent/>}/>
            <Route path="admin/usercomponent" element={<AdminUsercomponent/>}/>
            <Route path="admin/codeposts" element={<AdminCodePostcomponent/>}/>

            </Routes>

        </Router>
</div>
          
        )
    }
}

