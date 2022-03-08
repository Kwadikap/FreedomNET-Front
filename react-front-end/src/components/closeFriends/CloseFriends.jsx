import React from 'react';
import './closeFriends.css'
import { Link } from 'react-router-dom';


const CloseFriends = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
         <Link to={`profile/${user.username}`} style={{textDecoration: 'none', color: 'black'}}>
            <li className="leftbarFriend">
                <img className='leftbarFriendImg' src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" />
                <span className='leftbarFriendName'>{user.username}</span>
            </li>
        </Link>
    );
};

export default CloseFriends;