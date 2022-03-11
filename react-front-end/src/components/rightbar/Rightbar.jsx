import React, { useState, useContext, useEffect } from 'react'
import './rightbar.css'
import gift from '../../assets2/gift.png'
import ad from '../../assets2/ad.png'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove } from '@material-ui/icons';


export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [ friends, setFriends ] = useState([]);
  const  { user: currentUser, dispatch } = useContext(AuthContext);
  const [ followed, setFollowed ] = useState(currentUser.followings.includes(user?._id));
  

   useEffect(() => {
     setFollowed(currentUser.followings.includes(user?._id))
   }, [currentUser,user?._id]);

   useEffect(() => {
      const getFriends = async () => {
        try {
          const friendList = await axios.get('https://freedomnet-node-backend.herokuapp.com/api/users/friends/'+currentUser._id);
          setFriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends() 
   },[user]);
   
   const handleClick = async () => {
      try {
        if(followed ) {
          await axios.put('https://freedomnet-node-backend.herokuapp.com/api/users/'+user._id+'/unfollow', {userId: currentUser._id});
          dispatch({type: 'UNFOLLOW', payload: user._id }); 
        } else {
          await axios.put('https://freedomnet-node-backend.herokuapp.com/api/users/'+user._id+'/follow', {userId: currentUser._id}); 
          dispatch({type: 'FOLLOW', payload: user._id }); 
        }
      } catch (err) {
         console.log(err);
      }

      setFollowed(!followed);
   }

   const startConversation = async (e) => {
      e.preventDefault();
      const newConversation = {
        senderId: currentUser._id,
        receiverId: user._id
      }

      try {
       const res = await axios.post('https://freedomnet-node-backend.herokuapp.com/api/conversations', newConversation);
       console.log(res.data);
      } catch (err) {
          console.log(err);
      }
   }

  const HomeRightbar = () => {
      return(
        <>
          <div className="birthdayContainer">
                <img className='birthdayImg' src={gift} alt="" />
                <span className='birthdayText'>
                  <b>Mary Fan</b> and <b>4 other friends </b> have a birthday today.
                </span>
            </div>
            <img className='rightbarAd' src={ad} alt="" />
            {/* <h4 className="rightbarTitle">Online</h4>
            <ul className="rightbarFriendList">
                { friends.map ((u) => (
                  <Online key={u.id} user={u} />
                ))}
            </ul> */}
        </>
      )
    }

    const ProfileRightbar = () => {
        return (
          <>
           {user.username !== currentUser.username && (
             <button className="rightbarFollowButton" onClick={handleClick }>
               {followed ? "Unfollow" : 'Follow' }
               {followed ? <Remove /> : <Add /> }
             </button>
           )}
            <button className='rightbarFollowButton' onClick={startConversation}>
                <Link to='/messenger'>
                  Message
                </Link>
            </button>
            <h4 className="rightbarTitle">User information </h4>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">{user.city}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoValue">{user.from}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">{user.relationship === 1 ? 'Single' : user.relationship === 2 ? 'Married' : '-'}</span>
              </div>
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
              {friends.map(friend => (
                <Link to={'/profile/' + friend.username} style={{textDecoration: 'none', color: 'black'}} key={friend._id}>
                <div className="rightbarFollowing">
                    <img 
                      src={friend.profilePicture ? friend.profilePicture : PF+'person/noAvatar.png'} 
                      alt=""
                      className="rightbarFollowingImg" 
                      />
                    <span className="rightbarFollowingName">{friend.username}</span>
                  </div>
                </Link>
                ))}
            </div>
          </>
        )
    }
    
    return (
      <div className='rightbar'>
          <div className="rightbarWrapper">
            { user ? <ProfileRightbar /> : <HomeRightbar /> }
          </div>
      </div>
  )
} 

