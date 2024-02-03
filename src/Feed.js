import React, { useCallback, useEffect, useRef, useState } from "react";
import './Feed.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { Avatar, Collapse, colors } from "@mui/material";
import LabelIcon from '@mui/icons-material/Label';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PlaceIcon from '@mui/icons-material/Place';
import moment from "moment/moment";
import axios from "axios";
import { Button, Card, Modal, Tab, Tabs, } from "react-bootstrap";
import { json, Link, NavLink, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from "javascript-time-ago";
import { AlternateEmail } from "@mui/icons-material";

function Feed() {
    const ddUser = useRef();
    const [apiurl] = useState("http://localhost:9090/");  
    const posttitle = useRef();
    const postdescription = useRef();
    const [Userdata, setUserdata] = useState([]);
    const [image, setimage] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const commentmsg = useRef();
    const [commentdata, setCommentdata] = useState([]);
    let { id } = useParams();
    const [Data, SetData] = useState([]);
    const navigate = useNavigate();
    const file = useRef();
    const [postid, setpostid] = useState();
    const [commentreply, setcommentreply] = useState([]);
    const [commentid, setcommentid] = useState();
    const [open, setopen] = useState(false)
    const replytext = useRef();
    const [likecount,setlikecount]=useState([]);
    const [postcid,setpostcid]=useState([]);
    const[totalcomment,settotalcomment]=useState([]);
   // const timeago = moment.fromNow();
   const[fdate,setfdate]=useState([]);
  

   


   const timeAgo = (date) => {
    return moment(date).fromNow();
  }

  const ExampleComponent = () => {
    var d=image;
    const date = new Date(d.post_date);
    const formattedDate = timeAgo(date);
    setfdate(formattedDate);
  }

    const codepost = () => {
        navigate("/codeposts");
    }
    const Jobopeningpost = () => {
        navigate("/codeposts");
    }

    useEffect(() => {
        try {
            const arrayOfData = localStorage.getItem('User');
            const d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
            SetData(d);
        }
        catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        axios.get(apiurl + "Getallusers").then((e) => {
            setUserdata(e.data);
        })
    }, [])

    useEffect(() => {
        getuserpost();
        // Commentcount();
        // timeAgo();
        ExampleComponent();
    }, [])


    const getuserpost = async () => {
      
        var date = moment(new Date()).format("DD-MM-YYYY");
        const responce = await fetch(apiurl + 'Getalluserposts')
            .then(responce => responce.json())
            .then(json => {
                const result = json.sort((a, b) => b.post_date.localeCompare(a.date))
               setimage(result);
               var st=result;
              setpostcid(st);
              
            })    
    }

    // const Commentcount=()=>{
    //     var d=postcid;
    //     console.log(d);
    //     axios.get(apiurl+"GetallCommentsbypostid/"+d.post_id).then((e)=>{
    //         var count=e.data;
    //         console.log(count.length);
    //         settotalcomment(count.length);

    //     })
    // }

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
        console.log(data);
        axios({
            url: apiurl + 'api/AddUserpost',
            method: 'post',
            processData: false,
            contentType: false,
            data: data,
        }).then(() => {
            alert("User post Added Successfully");
            alert("Your Post Under Review Please Wait")
            getuserpost();
        

        })
    }

    const ShowComment = (d) => {
        setShow(true);
        setpostid(d.post_id)
        fetchcomments();
    }

    const fetchcomments = (d) => {

        axios.get(apiurl + "api/GetallCommentsbypostid/" + postid).then((e) => {
            setCommentdata(e.data);
            var count=e.data;
            console.log(count.length);
            settotalcomment(count.length);
            console.log(commentdata);
        }, [])

    }
  
    const Showreply = (e) => {
        setopen(!open);
        setcommentid(e.comment_id);
        // alert(e.comment_id)
        axios.get(apiurl + "api/Getrepliesbycommentid/" + e.comment_id).then((d) => {
            setcommentreply(d.data);
        })
    }

    const Addcomment = (d) => {
        const cdata = new FormData();
        var ud = Data.user_id;
        var cdate = moment(new Date()).format("DD-MM-YYYY");
        var cmsg = commentmsg.current.value;
        var pi = postid;
        const commentphoto = document.querySelector('input[type="file"]').files[0];
        cdata.append("file", commentphoto);
        cdata.append("user_id", ud);
        cdata.append("post_id", pi);
        cdata.append("comment_date", cdate);
        cdata.append("comment_message", cmsg);
        axios({
            url: apiurl + "api/AddCommentonPost",
            method: 'POST',
            processData: false,
            contentType: false,
            data: cdata,
        }).then((e) => {
            alert("post comment Added Successfully");
            ShowComment();
        })

    }

    const Deletepost = (d) => {

        axios.delete(apiurl + "api/DeleteUserpost/" + d.post_id).then((e) => {
            alert("Post Deleted Sucessfully");
            getuserpost();
        })

    }

    const Addlike =(d) => {

        var ud = Data.user_id;
        var date = moment(new Date()).format("DD-MM-YYYY");
        var st = { "user_post": { "post_id": d }, "user_details": { "user_id": ud }, "like_dislike_date": date };
        axios.post(apiurl + "api/AddPostLikedislikes", st).then((e) => {
            alert("Post Liked Sucessfully")
        })
       
    };

// const Likecount =(d)=>{
//     alert(d)

// }
   

    const Likecount = async (d) => {
        var count=0;
        const{data:responce}=await axios.get(apiurl + 'api/GetLikesbypostid/'+d);
    responce.forEach((d,p)=>{
        if(d.is_like==1)
        {
            count++;
        }
    })
   
    setlikecount(count);
}


    const AddReply = (e) => {
        alert(commentid);
        const data = new FormData();
        var rm = replytext.current.value;
        var date = moment(new Date()).format("DD-MM-YYYY");
        var ui = Data.user_id;
        const replyphoto = document.querySelector('input[type="file"]').files[0];
        data.append("file", replyphoto);
        data.append("user_id", ui);
        data.append("comment_id", commentid);
        data.append("reply_date", date);
        data.append("reply_message", rm)
        axios({
            url: apiurl + "api/AddPostCommentReply",
            method: 'POST',
            processData: false,
            contentType: false,
            data: data,
        }).then((e) => {
            alert("reply Added Successfully");
            ShowComment();
        })

    }
  
    // let userinfo=JSON.parse(localStorage.getItem('User'))
    // console.warn(userinfo)
    return (
        <>
       
     
            <div className="feed">
            <div className="tabbuttons">
                    <Button className="button" onClick={codepost}>Code Posts</Button>
                </div>
                <div className="feedwrapper">
                    <div className="share">        
                        <div className="sharewrapper">
                            <div className="sharetop">
                                <Avatar ><img className="shareprofileimage" src={apiurl + Data.user_photo} ></img></Avatar>
                                <span className="postusername">{Data.first_name + " " + Data.last_name}</span>

                                <hr className="sharehr"></hr>
                                <input placeholder="Write A Title For Post..." className="shareinput" ref={posttitle}>
                                </input>
                                <hr className="sharehr"></hr>
                                <input placeholder="What Is In Your Mind..." className="shareinput" ref={postdescription}>
                                </input>
                            </div>
                            <div>
                           
                            </div>

                            <hr className="sharehr" />

                            <form className="sharebottom">
                                <div className="shareoption">

                                    <label htmlFor="file">
                                        <PermMediaIcon htmlColor="tomato" className="shareicon" />
                                        <input className="shareoptiontext" id="file"
                                            name="file" type="file" style={{ display: "none" }}/>
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

                <hr className="sharehr"></hr>
               


                <>
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
                                                    <span className="postusername"><Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${d.user_details.user_id}`}>{d.user_details.first_name + " " + d.user_details.last_name}</Link></span>

                                                    <span className="postdate">{(d.post_date)}</span>
                                                    <span className="postdate"></span>

                                                    {(Data.user_id===d.user_details.user_id &&
                                                        <DeleteIcon className="deleteicon" onClick={() => Deletepost(d)}></DeleteIcon>

                                                        )}
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
                                                        {/* {liked ? <FavoriteIcon style={{color:red}}/> :<FavoriteBorderIcon className="likeicon" onClick={() => Addlike(d.post_id)}/>} */}
                                                        <FavoriteBorderIcon className="likeicon" onClick={() => Addlike(d.post_id)} />
                                                        {/* <ThumbDownIcon className="likeicon" ></ThumbDownIcon> */}
                                                      
                                                        <span className="postlikecounter">{likecount} peoples liked that post</span>
                                                        <button onClick={() => Likecount(d.post_id)}>Show</button>
                                                        &nbsp;
                                                        &nbsp;
                                                        
                                                        <span className="postlikecounter">Total No Of Comments {totalcomment}</span>

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
                                <div className="Commentbottom">
                                    <div className="Commentoption">
                                        <label htmlFor="file">
                                            <PermMediaIcon htmlColor="tomato" className="shareicon" />
                                            <input className="shareoptiontext" id="file"
                                                name="file" type="file" style={{ display: "none" }} />
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

                                    <button className="btn btn-primary" onClick={() => Addcomment(image.post_id)}>Share Comment</button>
                                </div>
                                <hr className="sharehr"></hr>

                                <div className="comment">
                                    <div className="commenttop">
                                        {commentdata.map((e, k) => (

                                            <>
                                                {/* <button className="btn btn-primary" onClick={()=>Addcomment(e.user_post.post_id)}>Share Comment</button> */}
                                                <div className="commenttopleft">
                                                    <img className="postprofile" src={apiurl + e.user_details.user_photo}></img>
                                                    <span className="postusername">{e.user_details.first_name + " " + e.user_details.last_name}</span>
                                                    <span className="postdate">{e.comment_date}</span>
                                                </div>
                                                <div className="row">
                                                    <div className="postcenter">
                                                        <span className="posttitle">{e.comment_message}</span>

                                                        <br />
                                                        <img src={apiurl + e.comment_photo} className="commetimage"></img>
                                                    </div>
                                                </div>
                                                <div className="postbottomleft">

                                                    <FavoriteBorderIcon className="likeicon" />
                                                    <span className="commentlikecounter">Peoples Liked This Comment</span>
                                                    <span className="postcommenttext" onClick={() => Showreply(e)} aria-controls="collaps">Replies</span>
                                                </div>

                                                <div>
                                                <div>
                                            <Collapse in={open}>
                                                <div id="collaps">
                                                    {commentreply.map((l, m) => (
                                                        <>
                                                            <div className="commenttopleft">
                                                                <img className="postprofile" src={apiurl + l.user_details.user_photo}></img>
                                                                <span className="postusername">{l.user_details.first_name + " " + l.user_details.last_name}</span>
                                                                <span className="postdate">{l.reply_date}</span>
                                                            </div>
                                                            <div className="row">
                                                                <div className="postcenter">
                                                                    <span className="posttitle">{l.reply_message}</span>

                                                                    <br />
                                                                    <img src={apiurl + l.reply_photo} className="commetimage"></img>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))}
                                                    <div className="replybottom">
                                                        <input type="text" className="replytextarea" placeholder="Reply on comment" ref={replytext}></input>
                                                        <label htmlFor="file">
                                                            <PermMediaIcon htmlColor="tomato" className="shareicon" />
                                                            <input className="shareoptiontext" id="file"
                                                                name="file" type="file" style={{ display: "none" }} />
                                                        </label>
                                                        <span className="replybutton" onClick={() => AddReply(e)}> Reply</span>

                                                    </div>
                                                </div>
                                            </Collapse>
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
                </>
            </div>
        </>
    )
}
export default Feed;