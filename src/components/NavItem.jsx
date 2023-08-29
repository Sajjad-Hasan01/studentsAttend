import {NavLink} from 'react-router-dom'

const NavItem = ({path,label}) => {
  return (
    <NavLink to={path} className={({ isActive }) => (isActive ? 'nav-item active-page' : 'nav-item')}>{label}</NavLink>
  )
}

export default NavItem