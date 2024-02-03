
import React, { useEffect, useRef, useState } from "react";
import './CreateAccount.css'
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import moment from "moment";
import { useForm } from "react-hook-form";

const CreateAccount = () => {
    // const fname=useRef();
    // const ddrole=useRef();
    // const file=useRef();
    // const mname=useRef();
    // const lname=useRef();
    // const email=useRef();
    // const mno=useRef();
    // const bdate=useRef();
    // const ddlocation=useRef();
    // const laddress=useRef();
    // const ddgender=useRef();
    // const uname=useRef();
    // const pas=useRef();
    // const jdate=useRef();
    // const premium=useRef();
    const [genderdata, setgenderdata] = useState([]);
    const [locationdata, setlocationdata] = useState([]);
    const [Roledata, setRoledata] = useState([]);
    // const { register, handleSubmit, formState: { errors } } = useForm();


    const [inputValues, setInputValue] = useState({
        fname: "",
        mname: "",
        lname: "",
        email: "",
        mobileno: "",
        bdate: "",
        location: "",
        localaddress: "",
        gender: "",
        role: "",
        username: "",
        password: "",
        file: "",
        confirmPassword: "",
    });

    const [validation, setValidation] = useState({
        fname: "",
        mname: "",
        lname: "",
        email: "",
        mobileno: "",
        bdate: "",
        location: "",
        localaddress: "",
        gender: "",
        role: "",
        username: "",
        password: "",
        file: "",
        confirmPassword: "",

    })

    function handleChange(event) {
        const { name, value } = event.target;
        setInputValue({ ...inputValues, [name]: value });
    }


    useEffect(() => {
        axios.get("http://localhost:9090/api/Getallgender").then((e) => {

            setgenderdata(e.data);
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:9090/api/Getlocations").then((e) => {
            setlocationdata(e.data);
        })
    }, [])
    useEffect(() => {
        axios.get("http://localhost:9090/api/Getallroles").then((e) => {
            setRoledata(e.data);
        })
    }, []);

   

    const checkValidation = () => {
        let errors = validation;
        const fname = inputValues.fname;
        if (!inputValues.fname.trim()) {
            errors.fname = "*";
        }
        else if (fname.length < 4 || fname.length>15) {
            errors.fname = "Please Enter Valid Name";
        }
        else {
            errors.fname = "";
        }

        const mname = inputValues.mname;
        if (!inputValues.mname.trim()) {
            errors.mname = "*";
        }
        else if (mname.length < 3 || mname.length>15) {
            errors.mname = "Please Enter Valid Middle Name";
        }
        else {
            errors.mname = "";
        }
        const lname = inputValues.lname;
        if (!inputValues.lname.trim()) {
            errors.lname = "*";
        }
        else if (lname.length < 3 || lname.length >15) {
            errors.lname = "please Enter Valid Last Name";
        }
        else {
            errors.lname = "";
        }


//      const emailCond = /^[a-zA-Z]+[@][a-zA-Z]+$/;
//      const ds="abcd";
//     //  alert(ds)
//     //  alert(ds.match(emailCond))
//      const email=inputValues.email;
// // alert(inputValues.email+" "+email)
//      if (!inputValues.email.trim()) {
//         errors.email = "*";
//       } else if (!inputValues.email.match(emailCond)) {
//         errors.email = "Please Enter a valid email address";
//       } else {
//         errors.email = "";
//       }
    
     
//       const mobilenocondtion="/^[7-9][0-9]{9}$/";
//       const mobileno=inputValues.mobileno;
//       if(!inputValues.mobileno.trim())
//       {
//         errors.mobileno="*"
//       }
//       else if(!inputValues.mobileno.match(mobilenocondtion))
//       {
//             errors.mobileno="Phone number with 7-9 and remaing 9 digit with 0-9"
//       }
//       else{
//         errors.mobileno="";
//       }

//       const cond1 = "/^(?=.*[a-z]).{6,20}$/";
//       const cond2 = "/^(?=.*[A-Z]).{6,20}$/";
//       const cond3 = "/^(?=.*[0-9]).{6,20}$/";
//       const password = inputValues.password;
//       if (!password) {
//         errors.password = "password is required";
//       } else if (password.length < 6) {
//         errors.password = "Password must be longer than 6 characters";
//       } else if (password.length >= 20) {
//         errors.password = "Password must shorter than 20 characters";
//        } else if (!password.match(cond1)) {
//          errors.password = "Password must contain at least one lowercase";
//        }
//        else if (!password.match(cond2)) {
//         errors.password = "Password must contain at least one capital letter";
//       } else if (!password.match(cond3)) {
//         errors.password = "Password must contain at least a number";
//       } else {
//         errors.password = "";
//       }



    };

    useEffect(() => {
        checkValidation();
    }, [inputValues]);


    const handleSubmit = (e) => {
        console.log(inputValues)
        e.preventDefault();
    };

    // const Adduser=()=>{

    //     const data=new FormData();
    //      var fn=fname.current.value;
    //     var mn=mname.current.value;
    //     var ln=lname.current.value;
    //     var em=email.current.value;
    //     var un=uname.current.value;
    //     var la=laddress.current.value;
    //     var bd=bdate.current.value;
    //     var mob=mno.current.value;
    //     var pa=pas.current.value;
    //     var gen=ddgender.current.value;
    //     var loc=ddlocation.current.value;
    //     var rol=ddrole.current.value;
    //     var jd= moment(new Date()).format("DD-MM-YYYY");
    //     var pre=premium.current.value;
    //     const imagedata=document.querySelector('input[type="file"]').files[0];
    //     data.append("file",imagedata);
    //      data.append("first_name",fn);
    //     data.append("middle_name",mn);
    //     data.append("last_name",ln);
    //     data.append("email_address",em);
    //     data.append("user_name",un);
    //     data.append("local_address",la);
    //     data.append("birth_date",bd);
    //     data.append("joining_date",jd);
    //     data.append("mobile_no",mob);
    //     data.append("is_premium",pre);
    //     data.append("password",pa);
    //     data.append("gender_id",gen);
    //     data.append("location_id",loc);
    //     data.append("role_id",rol);

    //     axios({
    //         url:"http://localhost:9090/AddUser",
    //         method: 'post',
    //         processData: false,
    //         contentType: false,
    //         data: data,
    // }).then((e)=>{
    //     alert("User Added Successfully");
    //     clearfunction();

    // })

    // }


    // const clearfunction=()=>{
    //     var fn=fname.current.value="";
    //     var mn=mname.current.value="";
    //     var ln=lname.current.value="";
    //     var em=email.current.value="";
    //     var un=uname.current.value="";
    //     var la=laddress.current.value="";
    //     var bd=bdate.current.value="";
    //     var mob=mno.current.value="";
    //     var pa=pas.current.value="";
    //     var gen=ddgender.current.value="";
    //     var loc=ddlocation.current.value="";
    //     var rol=ddrole.current.value="";
    //     var jd=jdate.current.value="";
    //     var pre=premium.current.value="";
    //     const imagedata=file.current.value="";
    // }






    return (
        <>
            <create >
                <cardc>
                    <h1 className="titlec">Create Account</h1>

                    <form
                        id="registrationForm"
                        action="/"
                        method="POST"
                        onSubmit={handleSubmit}>
                        <div>
                            <div className="row">
                                <div className="col-md-6">
                                {validation.fname && <p className="errormsg">{validation.fname}</p>}
                                        {validation.fname && console.log(validation)}
                                    <input type="text" placeholder="First Name"
                                        id="fname"
                                        name="fname"
                                        className="input-field"
                                        onChange={(e) => handleChange(e)}
                                        value={inputValues.fname}
                                      
                                    />

                                </div>

                                <div className="col-md-6">

                                    {validation.mname && <p className="errormsg">{validation.mname}</p>}
                                
                                    <input type="text" placeholder="Middle Name"
                                        id="mname"
                                        name="mname"
                                        className="input-field"
                                        onChange={(e) => handleChange(e)}
                                        value={inputValues.mname} />

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                {validation.lname && <p className="errormsg">{validation.lname}</p>}
                                    <input type="text" placeholder="Last Name"
                                        id="lname"
                                        name="lname"
                                        className="input-field"
                                        onChange={(e) => handleChange(e)}
                                        value={inputValues.lname} />
                                </div>

                                <div className="col-md-6">
                                {validation.email && <p className="errormsg">{validation.email}</p>}
                                 
                                    <input type="text" placeholder="Enter Email"
                                        name="email"
                                        className="input-field"
                                        onChange={(e) => handleChange(e)}
                                        value={inputValues.email}
                                    ></input>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                    {validation.mobileno && <p className="errormsg">{validation.mobileno}</p>}
                                        <input type="text" placeholder="Mobile No"
                                            name="mobileno"
                                            className="input-field"
                                            onChange={(e) => handleChange(e)}
                                            value={inputValues.mobileno} />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="date" placeholder="Birth Date"
                                            name="bdate"
                                            className="input-field"
                                            onChange={(e) => handleChange(e)}
                                            value={inputValues.bdate} ></input>
                                    </div>
                                </div>
                                <div className="row">

                                    <div className="col-md-6">
                                        <select name="location"
                                            className="input-field"
                                            onChange={(e) => handleChange(e)}
                                            value={inputValues.location}>
                                            <option selected disabled>Select location</option>
                                            {
                                                locationdata.map((c, k) => (
                                                    <option key={k} value={c.location_id}>{c.location_name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Local Address"
                                            name="localaddress"
                                            className="input-field"
                                            onChange={(e) => handleChange(e)}
                                            value={inputValues.localaddress} />

                                    </div>
                                </div>
                                <div className="row">

                                    <div className="col-md-6">
                                        <select name="gender"
                                            className="input-field"
                                            onChange={(e) => handleChange(e)}
                                            value={inputValues.gender}>
                                            <option selected disabled>Select Gender</option>
                                            {
                                                genderdata.map((c, k) => (
                                                    <option key={k} value={c.gender_id}>{c.gender}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <select name="role"
                                            className="input-field"
                                            onChange={(e) => handleChange(e)}
                                            value={inputValues.role}>
                                            <option selected disabled>Select Role</option>
                                            {
                                                Roledata.map((c, k) => (
                                                    <option key={k} value={c.role_id}>{c.role}</option>
                                                ))
                                            }
                                        </select>

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" placeholder="User Name" name="username"
                                            className="input-field"
                                            onChange={(e) => handleChange(e)}
                                            value={inputValues.username} />
                                    </div>
                                    <div className="col-md-6">
                                    {validation.password && <p className="errormsg">{validation.password}</p>}

                                        <input type="password" placeholder="Password"
                                            name="password"
                                            className="input-field"
                                            onChange={(e) => handleChange(e)}
                                            value={inputValues.password}
                                        ></input>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Enter User Photo</label>
                                        <input type="file"
                                            name="file"
                                            className="input-field"
                                            onChange={(e) => handleChange(e)}
                                            value={inputValues.file}
                                        />
                                    </div>


                                    <div className="col-md-6">
                                        <input type="password" placeholder="confirm Password"
                                            name="confirmPassword"
                                            className="input-field"
                                            onChange={(e) => handleChange(e)}
                                            value={inputValues.confirmPassword}
                                        ></input>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <Button type="submit" id="submit-button" className="login_button">Create Account</Button>
                        {/* <Button value="Create Account" type="submit" className="login_button">Create Account</Button> */}

                    </form>
                    <div className="link_containers">
                        <a href="/login" className="smalll">
                            Login Here
                        </a>
                    </div>
                </cardc>

            </create>

        </>
    )
}
export default CreateAccount;