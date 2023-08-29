import {Link} from 'react-router-dom'
import logo from '/icon/main-favicon.svg'
import userIcon from '/image/profile_photo.svg'
import NavItem from "./NavItem";

function Navbar() {
  return (
    <nav>
        <div className="logo-icon">
            <Link to="/"><img src={logo} alt="website logo"/></Link>
        </div>
        <div className="profile-icon">
            <Link to="/profile"><img src={userIcon} alt="profile photo logo"/></Link>
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