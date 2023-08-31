import { useState, useEffect } from "react"
import {Link} from 'react-router-dom'
import NavItem from "./NavItem";
import Axios from "axios"

function Navbar() {
  const API = import.meta.env.VITE_SERVER_URL;
  const profileOfUser = window.localStorage.getItem('userEmail');
  const [photo, setPhoto] = useState(null);

  useEffect(() =>{
    Axios.post(`${API}/profile`, { profileOfUser })
    .then(res => {setPhoto(res.data.photo)}) 
    .catch(error => error)
  },[API, profileOfUser])

  return (
    <nav>
        <div className="logo-icon">
            <Link to="/"><img src='/icon/attend-favicon.svg' alt="website logo"/></Link>
        </div>
        <div className="profile-icon">
            <Link to="/profile"><img src={`${API}/images/${photo}`} onError={(e)=>{e.target.src=`/image/profile_photo.svg`}} alt="profile photo"/></Link>
        </div>
        <div className="nav-items">
            <NavItem path={'/'} label={'home'}/>
            <NavItem path={'/attendance'} label={'attendance'}/>
            <NavItem path={'/students'} label={'students'}/>
        </div>
    </nav>
  )
}

export default Navbar