import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import './AdminUsercomponent.css';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FeedbackIcon from '@mui/icons-material/Feedback';
import FeedIcon from '@mui/icons-material/Feed';
import axios from 'axios';
const AdminUsercomponent = () => {
  const [Data, SetData] = useState([]);
  const navigate=useNavigate();
  const [ apiurl] = useState("http://localhost:9090/");
  const[totalpostcount,settotalpostcount]=useState([]);
  const[totalusers,Settotaluser]=useState([]);
  const [users,setusers]=useState([]);
   
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
}, [])

const postcount = async () => {
  var count=0;
  const{data:responce}=await axios.get(apiurl + 'api/Getallusers');
responce.forEach((d,p)=>{
  if(d.is_active==0)
  {
      count++;
  }
})
settotalpostcount(count);
}

const usercount=()=>{
  axios.get(apiurl+"api/Getallusers").then((e)=>{
    setusers(e.data);
    var users=e.data;
    Settotaluser(users.length);
    console.log(users);

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
            <a href='#' className='sidebarA'>
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
         <h1>UserDetails</h1>

         <div className='usercontainer'>
          <div className='top'>
          <h3 className='sidebarh2'>Total No Of Active Users</h3>
              <h2>{totalusers}</h2>
          </div>
         </div>
         <div>

          <table className='tablec'>

              <thead className='tablehead'>
                <tr>
                  <th>Sr.No</th>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                  <th>Email Address</th>
                  <th>User Name</th>
                  <th>Location</th>
                  <td>Mobile No</td>
                  <th>Photo</th>
                  <th>Joining Date</th>
                  <th>Is He Primium User</th>
                </tr>
              </thead>
              <tbody className='tablebodyc'>
                
                {users.map((d,k)=>(
                  <tr key={k}>
                    <td>{k+1}</td>
                    <td>{d.user_id}</td>
                    <td>{d.first_name}</td>
                    <td>{d.middle_name}</td>
                    <td>{d.last_name}</td>
                    <td>{d.email_address}</td>
                    <td>{d.user_name}</td>
                    <td>{d.local_address}</td>
                    <td>{d.mobile_no}</td>
                    <td>{<img src={apiurl+d.user_photo} className="userphoto"></img>}</td>
                    <td>{d.joining_date}</td>
                    <td>{d.is_premium}</td>
                  </tr>
                ))}
              </tbody>
          </table>
         </div>

         
        </main>

       </div>
       </body>
     
     }
  
    
    </>

   
  )
}

export default AdminUsercomponent