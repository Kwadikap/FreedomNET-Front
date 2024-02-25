import React, { useEffect, useState } from 'react';
import './ProfilePage.css'
import Topbar from '../../components/topbar/Topbar'
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar'
import axios from 'axios';
import { useParams } from 'react-router';
import { PermMedia } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';


const ProfilePage = ({ currentUser }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const [file, setFile] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`https://freedomnet-node-backend.herokuapp.com/api/users?username=${username}`);
            setUser(res.data);
        };
        fetchUser();
    }, [username]);



    //   UPLOAD IMAGE TO CLOUDINARY 
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
                axios.put('https://freedomnet-node-backend.herokuapp.com/api/users/' + user._id, newUser);
            });
    };


    //  LOGOUT FUNCTION
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }




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
                                src={user.coverPicture ? PF + user.coverPicture : PF + "person/noCover.png"}
                                alt=""
                            />
                            <img
                                className='profileUserImg'
                                src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <form className="shareBottom" >
                                <div className="shareOptions">
                                    {user._id === currentUser._id ?
                                        (<>
                                            <label htmlFor='file' className="shareOption">
                                                <PermMedia htmlColor='tomato' className='shareIcon' />
                                                <Typography className='shareOptionText'
                                                    style={
                                                        {
                                                            border: '1px solid white',
                                                            borderRadius: '5px',
                                                            padding: '5px',
                                                            backgroundColor: 'blue',
                                                            color: 'white'
                                                        }}>
                                                    Change profile picture
                                                </Typography>
                                                <input
                                                    style={{ display: 'none' }}
                                                    type="file" id='file'

                                                    onChange={(e) => setFile(e.target.files[0])}
                                                />
                                                <Button variant='contained' color='primary' onClick={uploadImg} > Confirm Upload  </Button> <br />
                                            </label>
                                            <Button variant='contained' color='secondary' onClick={logout}>
                                                <Link to='/' style={{ textDecoration: 'none', color: 'black' }} >
                                                    Log out
                                                </Link>
                                            </Button>
                                        </>) : null}
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