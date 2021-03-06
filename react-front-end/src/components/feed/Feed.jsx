import React, { useState, useEffect, useContext } from 'react'
import Share from '../share/Share'
import Post from '../post/Post'
import './feed.css'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';

function Feed({username}) {

  const [ posts, setPosts ] = useState([]);
  const {user} = useContext(AuthContext);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        
        const res = username 
        ? await axios.get('https://freedomnet-node-backend.herokuapp.com/api/posts/profile/' + username) 
        : await axios.get('https://freedomnet-node-backend.herokuapp.com/api/posts/timeline/' + user._id);
        setPosts(res.data.sort((p1,p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));

      } catch (err) {
        console.log(err);
      }
    }

    fetchPosts();
  },[username, user._id])

  return (
    <div className='feed'>
      <div className="feedWrapper">
      {(!username || username === user.username) && <Share />}
      </div>
      {posts.length > 0 
      ? <div className="feedWrapper">
          {posts?.map((p) => (
            <Post key={p._id} post={p} />
          ))}
      </div> 
      : <span className="noPosts feedWrapper">
          This user has no posts.
        </span>
      }
      
    </div>
  )
}

export default Feed

