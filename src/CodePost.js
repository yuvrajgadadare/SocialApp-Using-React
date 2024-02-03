import React, { useEffect, useRef, useState } from "react";
import Rightbar from "./Rightbar";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import './CodePost.css'
import './Feed.css'
import LabelIcon from '@mui/icons-material/Label';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PlaceIcon from '@mui/icons-material/Place';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { display } from "@mui/system";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { Avatar } from "@mui/material";
import axios from "axios";
import moment from "moment";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



function Codepost() {
    const [Data, SetData] = useState([]);
    const navigate = useNavigate();
    const [apiurl] = useState("http://localhost:9090/");
    const [file, setfile] = useState(null);
    const codequestion = useRef();
    const code = useRef();
    const codedescription = useRef();
    const ddtopics = useRef();
    const [topicdata, settopicdata] = useState([]);
    const [userpost, setuserpost] = useState([]);
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const commentmsg = useRef();
    const [commentdata, setcommentdata] = useState([]);
    const codeques = useRef();
    const [postid, setpostid] = useState();

    useEffect(() => {
        axios.get(apiurl + "api/Getalltopics").then((e) => {
            settopicdata(e.data);
        })

    }, [])

    const feed = () => {

        navigate("/home");

    }
    const Jobopeningpost = () => {

    }

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
        getusercodepost();
    }, [])

    const getusercodepost = async () => {
        var currentdate = moment(new Date()).format("DD-MM-YYYY");
        const responce = await fetch(apiurl + 'api/Getallapprovalpost')
            .then(responce => responce.json())
            .then(json => {
                const result = json.sort((a, b) => b.date.localeCompare(a.currentdate))
                setuserpost(result);
            })

    }



    const Addusercodepost = () => {

        var uid = Data.user_id;
        var quest = codeques.current.value;
        var cd = code.current.value;
        var codedes = codedescription.current.value;
        var dd = ddtopics.current.value;
        var date = moment(new Date()).format("DD-MM-YYYY");
        var st = { "user_details": { "user_id": uid }, "date": date, "topic_content": { "content_id": dd }, "question": quest, "code": cd, "description": codedes };

        axios.post(apiurl + "api/Postcode", st).then((e) => {
            alert("Code Posted Sucessfully");

        })

    }

    const ShowComment = (d) => {
        setShow(true);
        setpostid(d.post_id);
        axios.get(apiurl + "api/GetCodepostcommentsbypostid/" + d.post_id).then((e) => {
            setcommentdata(e.data);
            console.log(commentdata);

        }, [])

    }
    const Deletepost = () => {

    }
    const Addcomment = (d) => {

        const cdata = new FormData();
        var ud = Data.user_id;
        var date = moment(new Date()).format("DD-MM-YYYY");
        var cmsg = commentmsg.current.value;
        var pi = postid;
        const commentphoto = document.querySelector('input[type="file"]').files[0];
        cdata.append("file", commentphoto);
        cdata.append("user_id", ud);
        cdata.append("post_id", pi)
        cdata.append("date", date);
        cdata.append("comment_messgae", cmsg);

        axios({
            url: apiurl + "api/Addcommentonpost",
            method: 'post',
            processData: false,
            contentType: false,
            data: cdata,
        }).then((e) => {
            alert("comment Added Successfully");
            ShowComment();
           
        })
      

    }
    const Addlike = () => {

    }

    return (
        <>

            <Topbar />

            <div className="Codepostcontainer">
                <Sidebar />
                <>
                    <div className="codepost">
                        <div className="feedwrapper">
                        <div className="codetabbuttons">
                            <Button className="codebutton" onClick={feed}>Feed</Button>
                           
                        </div>
                            <div className="share">
                                <div className="sharewrapper">
                                    <div className="sharetop">

                                        <Avatar><img className="shareprofileimage" src={apiurl + Data.user_photo} ></img></Avatar>
                                        <span className="postusername">{Data.first_name + " " + Data.last_name}</span>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <select className="form-control" ref={ddtopics} >
                                                    <option selected disabled>Select Topic Of Code</option>
                                                    {
                                                        topicdata.map((c, k) => (
                                                            <option key={k} value={c.topic_id}>{c.topic_name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <input placeholder="Question..." className="shareinput" ref={codeques}>
                                        </input>
                                        <hr className="sharehr"></hr>
                                        <input placeholder="Write code here..." className="shareinput" ref={code}>
                                        </input>
                                        <hr className="sharehr"></hr>
                                        <input placeholder="Code Description..." className="shareinput" ref={codedescription}>
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
                                        <button className="btn btn-primary" onClick={() => Addusercodepost()} >Share</button>


                                    </form>
                                </div>
                            </div>
                        </div>
                        <hr className="sharehr"></hr>
                

                        <div className="postwrapper">
                            {userpost.map((d, k) => (
                                <>
                                    <div className="post">
                                        <div className="postwrapper">
                                            <div className="row">
                                                <div className="posttop">
                                                    <div className="posttopleft">
                                                        <img className="postprofile" src={apiurl + d.user_details.user_photo}></img>
                                                        {/* <span className="postusername">{d.user_details.first_name}</span> */}
                                                        <span className="postusername">{d.user_details.first_name + " " + d.user_details.last_name}</span>

                                                        <span className="postdate">{d.date}</span>
                                                        {(Data.user_id ===d.user_details.user_id &&
                                                         <DeleteIcon className="deleteicon" onClick={() => Deletepost(d)}></DeleteIcon>
                                                            )}
                                                       
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="postcenter">
                                                        <span className="posttitle">{d.question}</span>
                                                        <br />
                                                        <span className="postdiscription">{d.code}</span>
                                                        <br />
                                                        <span className="postdiscription">{d.description}</span>


                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="postbottom">
                                                        <div className="postbottomleft">
                                                            <FavoriteBorderIcon className="likeicon" onClick={() => Addlike(d.post_id)} />
                                                            <span className="postlikecounter"> peoples liked that post</span>

                                                        </div>
                                                        <div className="postbottomright">
                                                            <div className="sharewrapper">
                                                                <span className="postcommenttext" onClick={() => ShowComment(d)}>Post Comments</span>
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
                                    <div className="Commentbottomc">
                                        <div className="Commentoption">
                                            <label htmlFor="file">
                                                <PermMediaIcon htmlColor="tomato" className="shareicononcomment" />
                                                <input className="shareoptiontext" id="file"
                                                    name="file" type="file" onChange={(e) => setfile(e.target.files[0])} style={{ display: "none" }} />
                                            </label>
                                        </div>
                                        <div className="shareoption">
                                            <LabelIcon htmlColor="blue" className="shareicononcomment" />
                                            <span className="shareoptiontext">Tag</span>
                                        </div>
                                        <div className="shareoption">
                                            <EmojiEmotionsIcon htmlColor="goldenrod" className="shareicononcomment" />
                                            <span className="shareoptiontext">Reaction</span>
                                        </div>

                                        <button className="btn btn-primary" onClick={() => Addcomment(userpost.post_id)}>Share Comment</button>
                                    </div>
                                    <hr className="sharehr"></hr>

                                    <div className="comment">
                                        <div className="commenttop">
                                            {commentdata.map((e, k) => (
                                                <>
                                                    <div className="commenttopleft">
                                                        <img className="postprofile" src={apiurl + e.user_details.user_photo}></img>
                                                        <span className="postusername">{e.user_details.first_name + " " + e.user_details.last_name}</span>
                                                        <span className="postdate">{e.date}</span>
                                                    </div>
                                                    <div className="row">
                                                        <div className="postcenter">
                                                            <span className="posttitle">{e.comment_messgae}</span>

                                                            <br />
                                                            <img src={apiurl + e.comment_photo} className="commetimage"></img>
                                                        </div>
                                                    </div>
                                                    <hr className="sharehr"></hr>
                                                </>
                                            ))}


                                        </div>

                                    </div>


                                </Modal.Footer>
                            </Modal>

                        </div>
                    </div>
                </>


                <Rightbar />
            </div>

        </>

    )
}
export default Codepost;