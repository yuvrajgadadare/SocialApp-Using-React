import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import './Adminpannel.css';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import FeedIcon from '@mui/icons-material/Feed';
import axios from 'axios';
import moment from 'moment';
import AdminPostcomponent from './AdminPostcomponent';
const Adminpannel = () => {
  const [Data, SetData] = useState([]);
  const navigate=useNavigate();
  const [ apiurl] = useState("http://localhost:9090/");
  const[totalpostcount,settotalpostcount]=useState([]);
  const[totalusers,Settotaluser]=useState([]);
  const [codepost,setcodeposts]=useState([]);
   
  useEffect(() => {
    try {
        const arrayOfData = localStorage.getItem('Admin');
        const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
        SetData(d);
        console.log(d);
    }
    catch (error) {
        console.log(error);
    }
}, [])

function logout(){
  localStorage.clear();
  navigate("/adminlogin");
}

useEffect(() => {
  postcount();
  usercount();
  Codepost();
}, [])

const postcount = async () => {
  
  const{data:responce}=await axios.get(apiurl + 'api/Getalluserposts');

  var count=responce.length;
  settotalpostcount(count)
  console.log(count);
responce.forEach((d,p)=>{
  if(d.is_active)
  {
      count++;
  }
})
settotalpostcount(count);
}

const Codepost=()=>{
  axios.get(apiurl+"api/Getallcodeposts").then((d)=>{
    var code=d.data
    setcodeposts(code.length);
  })
}

const usercount=()=>{
  axios.get(apiurl+"api/Getallusers").then((e)=>{
    var users=e.data;
    Settotaluser(users.length);

  })
}


  return (
   
    <>
     {Data.length===0 ? "Please login":
    
      <body className='adminpannelbody'>
       <div className='container'>
        <aside>
          <div className='top'>
            <div className='logo'>
          
           <img src='logo192.png' className='logoimage'></img>
                <h2 className='primary'><span className='danger'>Y</span>Social</h2> 
            </div>
            <div className='close'><CloseIcon/></div>
          </div>
          <div className='sidebar'>
            <a href='/adminpannel' className='sidebarA'>
              <span className='material-icons-sharp'>
              <DashboardIcon/>
              </span>
              <h3 className='sidebarh3'>Dashboard</h3>
            </a>
            <a href='/admin/postcomponent' className='sidebarA'>
              <span className='material-icons-sharp'>
              <PostAddIcon/>
              </span> 
              <h3 className='sidebarh3'>Posts</h3>
            </a>
            <a href='/admin/codeposts' className='sidebarA'>
              <span className='material-icons-sharp'>
              <PostAddIcon/>
              </span> 
              <h3 className='sidebarh3'>Code Posts</h3>
            </a>
            <a href='/admin/usercomponent' className='sidebarA'>
              <span className='material-icons-sharp'><FeedIcon/></span>
              <h3 className='sidebarh3'>User Details</h3>
            </a>
            <a href='#' className='sidebarA'>
            <span className='material-icons-sharp'><FeedbackIcon/></span>
              <h3 className='sidebarh3'>Feedback</h3>
            </a>
            <a onClick={logout} className='sidebarA'>Log Out</a>  
          </div>
        </aside>

        <main>
         <h1>Dashboard</h1>

         <div className='date'>
          <span>{ moment(new Date()).format("DD-MM-YYYY")}</span>
         </div>

          <div className='inside'>
            <div className='sales'>
            <span className='material-icon-sharp'><DynamicFeedIcon/></span>
              <div className='middle'>
                <div className='left'>
                  <h3 className='sidebarh2'>Total No Of Post</h3>
                  <h1 className='sidebarh1'>{totalpostcount}</h1>
                </div>
              </div>
              <small className='text-muted'>Last 24 Hours</small>
            </div>

            <div className='sales'>
            <span className='material-icon-sharp'><PeopleAltIcon/></span>
              <div className='middle'>
                <div className='left'>
                  <h3 className='sidebarh2'>Total Active Users</h3>
                  <h1 className='sidebarh1'>{totalusers}</h1>
                </div>
              </div>
              <small className='text-muted'>Last 24 Hours</small>
            </div>

       
          </div>
          <div>
          <div className='sales'>
            <span className='material-icon-sharp'><DynamicFeedIcon/></span>
              <div className='middle'>
                <div className='left'>
                  <h3 className='sidebarh2'>Total No Of Code Posts</h3>
                  <h1 className='sidebarh1'>{codepost}</h1>
                </div>
              </div>
              <small className='text-muted'>Last 24 Hours</small>
            </div>
          </div>
        </main>

       </div>
       </body>
     
    }
  
    
    </>

   
  )
}

export default Adminpannel