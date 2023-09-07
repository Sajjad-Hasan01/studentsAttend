import {Link, Navigate, useParams} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  if (!window.localStorage.getItem('userId')) return <Navigate to={'/login'}/>;
  return children
}

export default ProtectedRoute