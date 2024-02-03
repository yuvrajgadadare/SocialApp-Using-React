import React from 'react'
import Topbar from "./Topbar";
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewAdvertise = () => {
    const [Data, SetData] = useState([]);
    let { id } = useParams();
    const [apiurl] = useState("http://localhost:9090/");
    const [Advertisedetails, setAdvertisedetails] = useState([]);
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


    useEffect(() => {

        axios.get(apiurl + "api/Getjobopeningbyid/" + id).then((e) => {
            console.log(e.data);
            setAdvertisedetails(e.data);
        })

    }, [])


    return (
        <>

            {Data.length === 0 ? "Please Login" :
                <>
                    <Topbar />

                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6'>
                            <div className='Advertisedetails'>
                                            <div className="openinginfo">
                                                <p className="comapnyname">Company Name :{Advertisedetails.company_name}</p>
                                                <p className="jobtitle">Job Title : {Advertisedetails.job_title}</p>
                                                <p className="experiancerequired">Experiance Required: {Advertisedetails.experiance_required}</p>
                                                <p className="jobdes">Job Description :{Advertisedetails.job_description}</p>
                                            </div>
                            </div>
                        </div>
                        <div className='col-md-3'></div>




                    </div>

                </>



            }





        </>
    )
}

export default ViewAdvertise