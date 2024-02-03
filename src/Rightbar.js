import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import './Rightbar.css'
import { useNavigate } from "react-router-dom";

function Rightbar() {
    const [Data, SetData] = useState([]);
    const [apiurl] = useState("http://localhost:9090/");
    const [jobopeningpost, setjobopeningpost] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const[Advertisedetails,setAdvertisedetails]=useState([]);
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

    const getalljobopening = async () => {
        const responce = await fetch(apiurl + 'api/Getalljobopenings')
        setjobopeningpost(await responce.json());
    }
    useEffect(() => {
        getalljobopening();
    }, [])

    const navigate=useNavigate();
  

    const ViewAdd = (d) => {
        navigate("/viewadvertise/"+d);

        // setShow(true);
        // axios.get(apiurl+"Getjobopeningbyid/"+d.opening_id).then((e)=>{
        //     console.log(e.data)
        //     setAdvertisedetails(e.data);
           
        // })
     
    }

    return (
        <>
            <div className="rightbar">
                <p className="texttitle">Advertising Pannel</p>
                {/* <br></br>
                <p  className="texttitle">Join Us With Your Company....</p>
                <button className="btnsubmit">Create Job Post</button> */}
                <div className='jobpostcarosula'>
                    {/* <button className='btn-pre'><p>&lt;</p></button>
        <button className='btn-next'><p>&gt;</p></button> */}
                    <div className='contentcontainer'>
                        {jobopeningpost.map((d, k) => (
                            <div cardno="1" className='mycard'>
                                <div className="openinginfo">
                                    <p className="comapnyname">Company Name :{d.company_name}</p>
                                    <p className="jobtitle">Job Title : {d.job_title}</p>
                                    <p className="experiancerequired">Experiance Required: {d.experiance_required}</p>
                                    <p className="jobdes">Job Description :{d.job_description}</p>
                                    <button className="btnsubmit"  onClick={()=>ViewAdd(d.opening_id)}>View</button>
                                </div>
                               
                    <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title ><p className="modaltitle">See Advertise Details Here</p></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="modalbody">
                                        <p>Job Created By : {Advertisedetails.first_name}</p>
                                        <p className="companyname">Company Name: {Advertisedetails.company_name}</p>
                                        <p className="jobtitle">Job Title : {Advertisedetails.job_title}</p>
                                        <p className="experiancerequired">Experiance Required: {Advertisedetails.experiance_required}</p>
                                      <p className="jobdes">Job Description :{Advertisedetails.job_description}</p>
                                    {/* {Advertisedetails.map((a,b)=>(
                                         <>
                                      <p className="comapnyname">Company Name :{a.company_name}</p>
                                      <p className="jobtitle">Job Title : {a.job_title}</p>
                                      <p className="experiancerequired">Experiance Required: {a.experiance_required}</p>
                                      <p className="jobdes">Job Description :{a.job_description}</p>
                                      </>
                                        ))} */}
                                           
                                    </Modal.Body>
                                    <Modal.Footer>

                                    </Modal.Footer>
                                </Modal>
                    
                            </div>
                        ))}
                        <hr></hr>
                    </div>
                  
                  
                </div>



            </div>

        </>
    )
}
export default Rightbar;