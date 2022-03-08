import React, { useContext } from 'react'
import './Homepage.css'
import Topbar from '../../components/topbar/Topbar'
import Leftbar from '../../components/leftbar/Leftbar.jsx';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar'
import { AuthContext } from '../../context/AuthContext'



export default function Homepage() {
  const { user } = useContext(AuthContext);
  return (
      <>
        <Topbar />
        <div className="homeContainer">
        <Leftbar user={user} />
        <Feed />
        <Rightbar />
        </div>
      </>
  )
}

