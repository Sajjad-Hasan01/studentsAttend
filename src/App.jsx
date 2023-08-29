import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import SharedLayout from './pages/SharedLayout'
import ProtectedRoute from './pages/ProtectedRoute'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Students from './pages/Students'
import Attendance from './pages/Attendance'
import Error from './pages/Error'
import './assets/css/style.css'
import './assets/css/home.css'
import './assets/css/profile.css'
import './assets/css/attend.css'
import './assets/css/students.css'
import './assets/css/signup.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home/>}/>
          <Route path='profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path='signup' element={<Signup/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='students' element={<ProtectedRoute><Students/></ProtectedRoute>}/>
          <Route path='attendance' element={<ProtectedRoute><Attendance/></ProtectedRoute>}/>
          <Route path='*' element={<Error/>}/>
        </Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
