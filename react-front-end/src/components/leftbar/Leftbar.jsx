import React, { useContext, useEffect, useState } from 'react'
import './leftbar.css'
import { RssFeed, CompassCalibrationOutlined, Notifications, Settings, ChatOutlined } from '@material-ui/icons';
import CloseFriends from '../closeFriends/CloseFriends'
import axios from 'axios';






export default function Leftbar({user}) {
  const [ friends, setFriends ] = useState([]);
  
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get('https://freedomnet-node-backend.herokuapp.com/api/users/friends/'+user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends() 
 },[user]);


  return (
    <div className='leftbar'>
      <div className="leftbarWrapper">
        <ul className="leftbarList">
            <li className="leftbarListItem">
              <RssFeed className='leftbarIcon'/>
              <span className="leftbarListItemText">Feed</span>
            </li>
            <li className="leftbarListItem">
              <ChatOutlined className='leftbarIcon'/>
              <span className="leftbarListItemText">Chats</span>
            </li>
            <li className="leftbarListItem">
              <CompassCalibrationOutlined className='leftbarIcon'/>
              <span className="leftbarListItemText">Explore</span>
            </li>
            <li className="leftbarListItem">
              <Notifications className='leftbarIcon'/>
              <span className="leftbarListItemText">Notifications</span>
            </li>
            <li className="leftbarListItem">
              <Settings className='leftbarIcon'/>
              <span className="leftbarListItemText">Settings</span>
            </li>
        </ul>
        <button className='leftbarButton'>Show More</button>
        <hr className='leftbarHr' />
        <h4 className="leftbarTitle">Friends</h4>
        <ul className='leftbarFriendList'>
            {friends.map((u) => (
              <CloseFriends key={u.id} user={u} />
            ))}
        </ul>
      </div>
    </div>
  )
}
 