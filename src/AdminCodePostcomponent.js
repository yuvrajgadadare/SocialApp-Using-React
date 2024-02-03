import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import './AdminPostcomponent.css';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FeedbackIcon from '@mui/icons-material/Feedback';
import FeedIcon from '@mui/icons-material/Feed';
import axios from 'axios';
import moment from 'moment';
const AdminCodePostcomponent = () => {
  const [Data, SetData] = useState([]);
  const navigate=useNavigate();
  const [ apiurl] = useState("http://localhost:9090/");
  const[totalnocodepost,settotalnocodepost]=useState([]);
  const[totalunapprovedCodepost,SettotalunapprovedCodepost]=useState([]);
  const [btnapprove,setbtnapprove]=useState(false);
   
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
  totalCodepost();
  }, [])

const totalCodepost = async () => {     
  var todaydate = moment(new Date()).format("DD-MM-YYYY");
  const responce = await fetch(apiurl + 'api/GetallUnapprovedcodepost')
      .then(responce => responce.json())
      .then(json => {
          const result = json.sort((a, b) => b.date.localeCompare(a.todaydate))
          settotalnocodepost(result);
         var count=result.length;
         SettotalunapprovedCodepost(count); 
      })   
}
const Aprovel=(d)=>{
    axios.post(apiurl+"api/Approvecodepost/"+d).then((e)=>{
        alert("Post Approved Sucessfully");
        totalCodepost();
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
            <div>
         <h1 className='posth1'>User Code Posts</h1>

         <div className='usercontainer'>
          <div className='top'>
          <h3 className='sidebarh2'>Total No Of UnApproved Post</h3>
              <h2>{totalunapprovedCodepost}</h2>
          </div>
         </div>
        
            <hr className="sharehr" />
         <table className="table">
            <thead className="tablehead">
                <tr>
                <th>Sr.no</th>
                <th>question</th>
                <th>Code</th>
                <th>Code Discription</th>
                <th>User Name</th>
                <td>Approval</td>
                <th>Status</th>
                <th>Date Of posted</th>
                </tr>
            </thead>
            <tbody className='tablebody'>
                {totalnocodepost.map((d,k)=>(
                    <tr key={k}>
                        <td>{k+1}</td>
                        <td>{d.question}</td>
                        <td>{d.code}</td>
                        <td>{d.description}</td>
                        <td>{d.user_details.first_name + " " + d.user_details.last_name}</td>
                        <td>{<button className="btn btn-primary" onClick={()=>Aprovel(d.post_id)} >Approve</button>}</td>
                        <td>{"Un Approved"}</td>
                        <td>{d.date}</td>
                    </tr>
                ))}
            </tbody>
         </table>
         </div>


       </div>
       </body>
     
     }
  
    
    </>

   
  )
}

export default AdminCodePostcomponent
