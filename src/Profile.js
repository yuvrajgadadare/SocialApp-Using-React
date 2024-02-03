import { Avatar } from "@mui/material";
import { height } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import Topbar from "./Topbar";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import "./Profile.css"
import "./Feed.css"
import { HomeMax } from "@mui/icons-material";
import LabelIcon from '@mui/icons-material/Label';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PlaceIcon from '@mui/icons-material/Place';
import moment from "moment/moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from "react-bootstrap";
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
function Profile() {
    const [Data, SetData] = useState([]);
    const [apiurl] = useState("http://localhost:9090/");
    const posttitle = useRef();
    const postdescription = useRef();
    const [file, setfile] = useState(null);
    const [image, setimage] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const commentmsg = useRef();
    const [commentdata, setCommentdata] = useState([]);
    let { id } = useParams();
    const [userpost, setuserpost] = useState([]);

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
        getuserpost();
        getusercodepost();
    }, [])

    const getuserpost = () => {
        axios.get(apiurl + "api/GetallPostbyUserid/" + id
        ).then((e) => {
            var pi=e.data
            setimage(pi);
        })
    }

    const Adduserpost = () => {

        const data = new FormData();
        var pt = posttitle.current.value;
        var pd = postdescription.current.value;
        var ud = Data.user_id;
        var date = moment(new Date()).format("DD-MM-YYYY");

        const postphoto = document.querySelector('input[type="file"]').files[0];
        data.append("file", postphoto);
        data.append("user_id", ud);
        data.append("post_date", date);
        data.append("post_title", pt);
        data.append("post_description", pd);
        axios({
            url: apiurl + 'api/AddUserpost',
            method: 'post',
            processData: false,
            contentType: false,
            data: data,
        }).then(() => {
            alert("User post Added Successfully");
            getuserpost();
        })
    }

  
    const getusercodepost = async () => {
        var currentdate = moment(new Date()).format("DD-MM-YYYY");
        const responce = await fetch(apiurl + 'api/Getallapprovalpost')
            .then(responce => responce.json())
            .then(json => {
                const result = json.sort((a, b) => b.date.localeCompare(a.currentdate))
                setuserpost(result);
            })

    }

    const ShowComment = (d) => {
        setShow(true);
        axios.get(apiurl + "api/GetallCommentsbypostid/" + id).then((e) => {
            setCommentdata(e.data);
            console.log(commentdata);

        }, [])

    }

    const Addcomment = (d) => {

        const cdata = new FormData();
        var ud = Data.user_id;
        console.log(ud)
        var cdate = moment(new Date()).format("DD-MM-YYYY");
        console.log(cdate)
        var cmsg = commentmsg.current.value;
        console.log(cmsg)
        console.log(d.post_id)
        const commentphoto = document.querySelector('input[type="file"]').files[0];
        cdata.append("file", commentphoto);
        cdata.append("user_id", ud);
        cdata.append("post_id", id)
        cdata.append("comment_date", cdate);
        cdata.append("comment_message", cmsg);

        axios({
            url: apiurl + 'api/AddCommenttopost/' + d.post_id,
            method: 'POST',
            processData: false,
            contentType: false,
            data: cdata,
        }).then((e) => {
            alert(" post comment Added Successfully");
            Addcomment();
        })



    }

    const Deletepost = (d) => {
        alert("Do You Want To Delete Post");

        axios.delete(apiurl + "api/DeleteUserpost/" + d.post_id).then((e) => {
            alert("Post Deleted Sucessfully");
            getuserpost();
        })

    }


    return (
        <>
            <Topbar />
            <div className="profile-container">
                <img className="coverimage" src="../xyz.jpg"></img>
                <div className="profile-details">
                    <div className="pd-left">
                        {/* <div className="pd-row">
                            <img className="profilepic" src={apiurl + Data.user_photo} alt=""></img>
                            <div>
                                <h3>{Data.first_name + " " + Data.last_name}</h3>
                            </div>
                        </div> */}
                    </div>

                    <div className="pd-right"></div>

                </div>
                <div className="profileinfo">

                    <div className="infocol">
                        <div className="profile-intro">
                        <img className="profilepic" src={apiurl + Data.user_photo} alt=""></img>
                            <div className="profilename">
                                <h3>{Data.first_name + " " + Data.last_name}</h3>
                            </div>
                            <h3>Intro</h3>
                            <p className="introtext">Believe In YourSelf</p>
                            <hr />
                            <ul>
                                {/* {image.map((d,k)=>(
                                    <>
                                      <li><HomeIcon /> &nbsp;{Data.local_address}</li>
                                      <li><CakeIcon />&nbsp;{Data.birth_date}</li>
                                      <li>Since {Data.joining_date}</li>
                                      </>
                                ))} */}
                                <li><HomeIcon /> &nbsp;{Data.local_address}</li>
                                      <li><CakeIcon />&nbsp;{Data.birth_date}</li>
                                      <li>Since {Data.joining_date}</li>

                            </ul>
                        </div>
                        <div className="profile-intro">
                            <div className="titlebox">
                                <h3>Photos</h3>
                                <a href="">All Photos</a>
                            </div>
                            <div className="photobox">
                                <div>
                                    <>
                                        {image.map((d, k) => (
                                            <img src={apiurl + d.photo}></img>
                                        ))}</>



                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="post-col">
                        <div className="feedwrapper">
                            <div className="share">
                                <div className="sharewrapper">
                                    <div className="sharetop">

                                        <Avatar ><img className="shareprofileimage" src={apiurl +Data.user_photo} ></img></Avatar>
                                        <span className="postusername">{Data.first_name + " " + Data.last_name}</span>
                                        <input placeholder="Title..." className="shareinput" ref={posttitle}>
                                        </input>
                                        <hr className="sharehr"></hr>
                                        <input placeholder="What Is In Your Mind..." className="shareinput" ref={postdescription}>
                                        </input>
                                    </div>
                                    <hr className="sharehr" />

                                    <form className="sharebottom">
                                        <div className="shareoption">

                                            <label htmlFor="file">
                                                <PermMediaIcon htmlColor="tomato" className="shareicon" />
                                                <input className="shareoptiontext" id="file"
                                                    name="file" type="file" onChange={(e) => setfile(e.target.files[0])} style={{ display: "none" }} />
                                            </label>

                                        </div>
                                        <div className="shareoption">
                                            <LabelIcon htmlColor="blue" className="shareicon" />
                                            <span className="shareoptiontext">Tag</span>
                                        </div>
                                        <div className="shareoption">
                                            <EmojiEmotionsIcon htmlColor="goldenrod" className="shareicon" />
                                            <span className="shareoptiontext">Reaction</span>
                                        </div>
                                        <div className="shareoption">
                                            <PlaceIcon htmlColor="green" className="shareicon" />
                                            <span className="shareoptiontext">Location</span>
                                        </div>
                                        <button className="btn btn-primary" onClick={Adduserpost} >Share</button>


                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="postwrapper">
                            {image.map((d, k) => (
                                <>
                                    <div className="post">
                                        <div className="postwrapper">
                                            <div className="row">
                                                <div className="posttop">
                                                    <div className="posttopleft">
                                                        <img className="postprofile" src={apiurl + d.user_details.user_photo}></img>
                                                        {/* <span className="postusername">{d.user_details.first_name}</span> */}
                                                        <span className="postusername">{d.user_details.first_name + " " + d.user_details.last_name}</span>

                                                        <span className="postdate">{d.post_date}</span>
                                                        <DeleteIcon className="deleteicon" onClick={() => Deletepost(d)}></DeleteIcon>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="postcenter">
                                                        <span className="posttitle">{d.post_title}</span>
                                                        <br />
                                                        <span className="postdiscription">{d.post_description}</span>
                                                        <br />
                                                        <img src={apiurl + d.photo} className="postimage"></img>


                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="postbottom">
                                                        <div className="postbottomleft">
                                                            <ThumbUpIcon className="likeicon" />
                                                            <ThumbDownIcon className="likeicon" ></ThumbDownIcon>
                                                            <span className="postlikecounter"> peoples liked that post</span>

                                                        </div>
                                                        <div className="postbottomright">
                                                            <div className="sharewrapper">
                                                                <span className="postcommenttext" onClick={() => ShowComment(image.post_id)}>Post Comments</span>
                                                                <Modal show={show} onHide={handleClose}>
                                                                    <Modal.Header closeButton>
                                                                        <Modal.Title>Add Comment Here</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        <div className="row">

                                                                            <hr className="sharehr"></hr>
                                                                            <input type="text" className="searchinputs" placeholder="Add Comment Here" ref={commentmsg}></input>
                                                                        </div>
                                                                    </Modal.Body>
                                                                    <Modal.Footer>
                                                                        <div className="Commentbottom">
                                                                            <div className="Commentoption">
                                                                                <form >
                                                                                    <PermMediaIcon htmlColor="tomato" className="shareicon" />
                                                                                    <input className="shareoptiontext" type="file" />
                                                                                </form>
                                                                            </div>
                                                                            <div className="shareoption">
                                                                                <LabelIcon htmlColor="blue" className="shareicon" />
                                                                                <span className="shareoptiontext">Tag</span>
                                                                            </div>
                                                                            <div className="shareoption">
                                                                                <EmojiEmotionsIcon htmlColor="goldenrod" className="shareicon" />
                                                                                <span className="shareoptiontext">Reaction</span>
                                                                            </div>

                                                                            <button className="btn btn-primary" onClick={() => Addcomment(d)}>Share Comment</button>
                                                                        </div>
                                                                        <hr className="sharehr"></hr>

                                                                        <div className="comment">
                                                                            <div className="commenttop">
                                                                                {commentdata.map((e, k) => (
                                                                                    <>
                                                                                        <div className="commenttopleft">
                                                                                            <img className="postprofile" src={apiurl + e.user_details.user_photo}></img>
                                                                                            <span className="postusername">{e.user_details.first_name + " " + d.user_details.last_name}</span>
                                                                                            <span className="postdate">{e.comment_date}</span>
                                                                                        </div>
                                                                                        <div className="row">
                                                                                            <div className="postcenter">
                                                                                                <span className="posttitle">{e.comment_message}</span>

                                                                                                <br />
                                                                                                <img src={apiurl + e.comment_photo} className="commetimage"></img>
                                                                                            </div>
                                                                                        </div>
                                                                                    </>
                                                                                ))}


                                                                            </div>

                                                                        </div>


                                                                    </Modal.Footer>
                                                                </Modal>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <br></br>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>

                            ))}
                        </div>
                    </div>

                </div>

            </div>


        </>
    )
}
export default Profile;