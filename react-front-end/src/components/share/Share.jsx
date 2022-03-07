import React, { useState } from 'react';
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@material-ui/icons';
import './share.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useRef } from 'react';
import axios from 'axios';


const Share = () => {

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [ file, setFile ] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        }
        if(file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append('name', fileName); 
            data.append('file', file); 
            newPost.img = fileName;
            try {
                await axios.post('https://freedomnet-node-backend.herokuapp.com/api/upload', data);
            } catch (err) {
                console.log(err);
            }
        }

        try {
            await axios.post('https://freedomnet-node-backend.herokuapp.com/api/posts', newPost);
            window.location.reload();
        } catch (err) {
            
        }
    }

    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src={user.profilePicture ? PF+user.profilePicture : PF+'person/noAvatar.png'} alt="" />
                    <input 
                        placeholder={"What's on your mind "+user.username + "?"} 
                        className='shareInput' 
                        ref={desc}
                        />
                </div>
                    <hr className='shareHr' />
                    {file && (
                        <div className="shareImgContainer">
                            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                        </div>
                    )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className='shareOptionText'>Photo/Video</span>
                            <input 
                                style={{display: 'none'}} 
                                type="file" id='file' 
                                accept='.png, .jpeg, .jpg, .mp4, .mov, .mp3' 
                                onChange={(e) => setFile( e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor='blue' className='shareIcon' />
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor='green' className='shareIcon' />
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                            <span className='shareOptionText'>Emotions</span>
                        </div>
                    </div>
                    <button className='shareButton' type='submit'>Share</button>
                </form>
            </div>
        </div>
    );
};


export default Share;