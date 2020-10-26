import React from 'react';
import './Profile.css';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TodayIcon from '@material-ui/icons/Today';
import { Avatar, Button } from '@material-ui/core';
import { useStateValue } from './StateProvider';

export default function Profile() {
    const [{user},dispatch]=useStateValue();
    return (
        <div className="profile">
            <div className="profile__top">
                <div className="profile__avatar">
                <div className="profile__avatar__wrapper">
                    <Avatar 
                        className="profile__user__avatar"
                        alt={user?.displayName}
                        src="/static/images/avatar/2.jpg"
                    />
                    <p>{user?.displayName}</p>
                </div>
                   
                </div>
                
                <div className="profile__top__data">
                    <div className="profile__top__info">
                        <span><strong>2568</strong></span>
                        <p>Followers</p>
                    </div>
                    <div className="profile__top__info">
                        <span><strong>268</strong></span>
                        <p>Likes</p>
                    </div>
                    <div className="profile__top__info">
                        <span><strong>25</strong></span>
                        <p>Posts</p>
                    </div>
                </div>
                

            </div>
            <div className="profile__middle">
                <div className="profile__details">
                    <div className="profile__detail">
                        <span className="profile__data">21 July 2020</span>
                        <p className="profile__data__info" ><TodayIcon /> <b>Date Joined</b></p>
                    </div>
                    <div className="profile__detail">
                    
                        <span className="profile__data" >Meerut</span>
                        <p className="profile__data__info"><LocationOnIcon /> <b>Location</b></p>
                    </div>
                    
                </div>
                <div className="profile__caption">
                    <p className="profile__bio__header"><b>Bio</b></p>
                    <p className="profile__bio">I am a Dreamer A Achiver!</p>
                </div>
                <div className="profile__edit__button" >
                    <Button className="profile__edit" variant="contained" color="primary" >
                        Edit Profile
                    </Button>
                </div>
                <hr />
                <div className="profile__bottom">
                    <div className="profile__posts">
                        <div className="profile__post">
                            <img 
                                src=""
                                alt="image__err"
                            />
                            <p>...</p>
                        </div>
                    </div>
                </div>
            </div>
           
           
        </div>
    )
}
