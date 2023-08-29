import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import TextInput from "../components/TextInput"
import EmailInput from "../components/EmailInput"
import PasswordInput from "../components/PasswordInput"
import ConfirmPasswordInput from "../components/ConfirmPasswordInput"
import GroupSelect from "../components/GroupSelect"
import FileInput from "../components/FileInput"
import SubmitButton from "../components/SubmitButton"
import Axios from "axios"
import {useCookies} from 'react-cookie'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [group, setGroup] = useState('')
  const [photo, setPhoto] = useState(null)
  const [submitError, setSubmitError] = useState('')

  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [rePasswordError, setRePasswordError] = useState(false)
  const [groupValid, setGroupValid] = useState(true)

  const navigate = useNavigate()
  const [_,setCookies] = useCookies(['access_token'])

  const API = import.meta.env.VITE_SERVER_URL;

  function checkName(value) {
    if (!value) {setNameError("this field required"); setName(null); return false}
    else {setNameError(false); setName(value); return true}
  }

  function checkEmail(value) {
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!value.match(emailPattern)) {setEmailError('please enter a valid email'); return false}
    else {setEmailError(false); setEmail(value); return true}
  }

  function checkPassword(value) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!value.match(passwordPattern)) {setPasswordError("please enter atleast 8 charatcer with number, symbol, small and capital letter"); return false}
    else {setPasswordError(false); setPassword(value); return true}
  }

  function checkRePassword(value) {
    if (value === password) {setRePasswordError("password not match"); setRePassword(value); return true}
    else {setRePasswordError(true); return false}
  }

  function checkGroup(value) {
    if (!value) {setGroupValid(false); return false}
    else {setGroupValid(true); setGroup(value); return true}
  }

  function checkForm(e) {
    e.preventDefault();
    if (checkName(name) && checkEmail(email) && checkPassword(password) && checkRePassword(rePassword) && checkGroup(group)){
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('group', group);
      formData.append('profilePhoto', photo);
      
      axiosPost(`${API}/signup`, formData);
    } else setSubmitError("check fields!")
  }

  function axiosPost(url, data) {
    Axios.post(url, data)
    .then(res => {
      if (res.data.code === 0) {
        window.localStorage.setItem('userEmail', res.data.email);
        window.localStorage.setItem('userId', res.data.userId);
        setCookies('access_token', res.data.token);
        setSubmitError(res.data.message)
        navigate('/profile');
      }else if (res.data.code === 11000) {
        setEmailError(res.data.message);
      } else setSubmitError('there is error, please try again later');
    }).catch(() => setSubmitError('there is error, please try again later'))
  }

  return (
    <main>
    <h1 className="p-title">students' attendance</h1>
    <p className="p-suptitle">signup, view and check your attend</p>
    <section className="add-std-sec">
      <form className="add-std-form" method="POST" encType="multipart/form-data" onSubmit={e=>checkForm(e)}>
        <TextInput label={'name'} placeholder={'full name'} checkName={checkName} nameValid={nameValid} errorMessage={''}/>
        <EmailInput checkEmail={checkEmail} errorMessage={emailError}/>
        <PasswordInput checkPassword={checkPassword} showPassword={showPassword} setShowPassword={setShowPassword} errorMessage={passwordError}/>
        <ConfirmPasswordInput checkRePassword={checkRePassword} showPassword={showPassword} setShowPassword={setShowPassword} errorMessage={rePasswordError}/>
        <GroupSelect groupValid={groupValid} checkGroup={checkGroup}/>
        <FileInput setPhoto={setPhoto}/>
        <SubmitButton label={'sign up'}/>
        {submitError && <p className="error-msg">{submitError}</p>}
        <div className="form-field">
          <p>already have account? <Link to="/login">login</Link></p>
        </div>
      </form>
    </section>
    </main>
  )
}

export default Signup