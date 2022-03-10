import React, { useEffect, useState } from 'react';
import './ProfilePage.css'
import Topbar from '../../components/topbar/Topbar'
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar'
import axios from 'axios';
import { useParams } from 'react-router';
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@material-ui/icons';
import { Image } from 'cloudinary-react'

const ProfilePage = ({currentUser}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const [ file, setFile ] = useState(null);
    

    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`https://freedomnet-node-backend.herokuapp.com/api/users?username=${username}`);
          setUser(res.data);
        };
        fetchUser();
      }, [username]);


      
      const uploadImg = async (e) => {
        e.preventDefault();
        const newUser = {
            userId: user._id,
             }
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'freedomNET-upload');
        
        axios.post('https://api.cloudinary.com/v1_1/kwadev/image/upload', formData)
        .then((response) => {
            console.log(response);
            newUser.profilePicture = response.data.url;
            axios.put('https://freedomnet-node-backend.herokuapp.com/api/users/'+user._id, newUser);
        });
     };


    
    return (
        <>
            <Topbar />
            <div className="profile">
            {/* <Leftbar user={currentUser} /> */}
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img 
                            className='profileCoverImg' 
                            src={user.coverPicture ? PF+user.coverPicture : PF+"person/noCover.png"} 
                            alt="" 
                        />
                        <img 
                            className='profileUserImg' 
                            src={user.profilePicture ? user.profilePicture : PF+"person/noAvatar.png"} 
                            alt="" 
                        />
                    </div>
                    <div className="profileInfo">
                    <form className="shareBottom" >
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className='shareOptionText'>Change profile picture</span>
                            <input 
                                style={{display: 'none'}} 
                                type="file" id='file' 
                                
                                onChange={(e) => setFile( e.target.files[0] )}
                            />
                            <button onClick={uploadImg} > Upload Img </button>
                        </label>
                    </div>
                    </form>
                        <h4 className='profileInfoName'>{user.username}</h4>
                        <span className='profileInfoDesc '>{user.desc}</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed username={username} />
                    <Rightbar user={user} />
                </div>
            </div>
            </div>
        </>
    );
};

export default ProfilePage;