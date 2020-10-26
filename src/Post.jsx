import React, { useEffect, useState } from 'react';
import './Post.css';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TelegramIcon from '@material-ui/icons/Telegram';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Avatar from '@material-ui/core/Avatar';
import { useStateValue } from './StateProvider';
import { Button } from '@material-ui/core';
import { db } from './firebase';
import firebase from 'firebase';


export default function Post({timestamp,postId,username,caption,image,}) {
    const [{user},dispatch]=useStateValue();
    const [comments,setComments]=useState([]);
    const [comment,setComment]=useState('');

    useEffect(()=>{
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection('posts')
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=>doc.data()));
            })
        };

        return ()=>{
            unsubscribe();
        };
    },[postId]);

    const handleComment=(e)=>{
        if (e.target.name==="comment"){
            console.log(e.target.value);
            return (setComment(e.target.value))
        }
    };
    const handleClick = (e)=>{
        e.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text:comment,
            username:user?.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    return (
        <div className="post">
            <div className="post__head">
                <div className="post__info">
                    <Avatar 
                        className="post__avatar"
                        alt={username}
                        src="/static/images/avatar/2.jpg"
                    />
                    <span>{username}</span>
                </div>
                <span className="post__extra">...</span>
                
            </div>
            
            <div className="post__image">
                <img 
                    src={image}
                    alt="post__err"
                />
            </div>

            <div className="post__bottom">
                <div className="post__buttons">
                    <div className="post__option">
                        <div className="post__link">
                            <span><FavoriteBorderIcon /></span>
                            <span><ChatBubbleOutlineIcon /></span>
                            <span><TelegramIcon /></span>
                        </div>
                        <div className="post__bookmark">
                            <span><BookmarkBorderIcon /></span>
                        </div>
                    </div>
                </div>
                <div className="post__likes">
                    <span>2589 Likes</span>
                </div>

                <div className="post__bottom__caption">
                    <div className="post__caption">
                        <span className="post__caption__username"><strong>{username}</strong></span>
                        <span>{caption}</span>
                    </div>
                    <p>View All {comments.length} Comments</p>
                    <div className="post__comment">
                        {comments.map((foundComment)=>(
                            <p>
                                <b>{foundComment?.username}</b> {foundComment?.text}
                            </p>
                        
                        ))}
                    </div>
                    
                    <div className="post__time">
                        <span>12 hours Ago</span>
                    </div>
                </div>
                
                <hr />
                <div className="post__send">
                    <TextField name="comment" value={comment} onChange={handleComment} className="post__textfield" id="standard-basic" label="Add a Comment" />
                    <Button disabled={!user || !comment} onClick={handleClick} className="post__comment__send" >Post</Button>
                </div>
               


            </div>
            
        </div>
    )
}