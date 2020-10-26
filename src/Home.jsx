import React, { useEffect, useState } from 'react';
import Post from './Post';
import Sidebar from './Sidebar';
import './Home.css';
import {db} from './firebase';
import { useStateValue } from './StateProvider';


export default function Home() {
    const [{user},dispatch]=useStateValue();
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({id:doc.id,post:doc.data()})))
        })
    },[]);

    return (
        <div className="home">
        <div className="home__post">
            {posts.map(({id,post}) => {
                return (
                    <Post 
                        key={id}
                        postId={id}
                        username={post.username}
                        caption={post.caption}
                        image={post.image}
                        timestamp={post.timestamp}
                    />
                )
            })}

        </div>    
        <div className="home__sidebar">
            <Sidebar 
                username={user?user.displayname:'Guest'}
                follower={user&&"23456"}
            />
        </div>
            
        </div>
    )
}
// username,caption,username_comment,comment,image,likes