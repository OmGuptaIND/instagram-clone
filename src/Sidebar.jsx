import React from 'react';
import './Sidebar.css';
import Avatar from '@material-ui/core/Avatar';
import { useStateValue } from './StateProvider';

export default function Sidebar({username,follower}) {
    const [{user},dispatch]=useStateValue();
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <div className="sidebar__info">
                    <Avatar 
                        className="post__avatar"
                        alt={username}
                        src="/static/images/avatar/2.jpg"
                    />
                    {!user?<span>Guest User</span> : <span>{user.displayName}</span>}
                </div>
                <div className="sidebar__extra">...</div>
            </div>
            {user ? (
                <>
                    <div className="sidebar__middle">
                        <div className="sidebar__middle__info">
                            <strong>{follower}</strong>
                            <small>Followers</small>
                        </div>
                        <div className="sidebar__middle__info">
                            <strong>562</strong>
                            <small>Following</small>
                        </div>
                        <div className="sidebar__middle__info">
                            <strong>89</strong>
                            <small>Likes</small>
                        </div>
                    </div>
                    <div className="sidebar__bottom">
                        <p><strong>Your Bio</strong></p>
                        <p className="sidebar__bio">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. 
                        </p>
                    </div>
                    
                </>
            ): (
                <>
                    <div className="sidebar__middle">
                        <p>Register / Login to Join Instagram</p>
                    </div>
                    <div className="sidebar__bottom">
                        <p><strong>About Instagram</strong></p>
                        <p className="sidebar__bio">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        </p>
                    </div>

                </>
            )}
            <hr />
            <div className="sidebar__copyright">
                <p>Its is created by Om Gupta</p>
                <p>All Rights Reserved!</p>
                <div className="sidebar__company">
                    <p>Copyright Claim Of Jupiter Industries</p>
                </div>
            </div>
            
        </div>
    )
}
