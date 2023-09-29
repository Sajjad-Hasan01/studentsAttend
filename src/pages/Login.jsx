import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import SubmitButton from "../components/SubmitButton";
import Loading from "../components/Loading";
import Axios from "axios";
import {useCookies} from 'react-cookie';

const Login = () => {
  const [email, setEmail] = useState(''),
    [emailError, setEmailError] = useState(false),
    [password, setPassword] = useState(''),
    [passwordValid, setPasswordValid] = useState(true),
    [passwordError, setPasswordError] = useState(''),
    [showPassword, setShowPassword] = useState(false),
    [submitError, setSubmitError] = useState(''),
    [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(),
    // [_,setCookies] = useCookies(['access_token']);
    {setCookies} = useCookies(['access_token']);

  // if (window.localStorage.getItem('userId')) return <Navigate to={'/profile'}/>;

  const API = import.meta.env.VITE_SERVER_URL;

    function checkEmail(value) {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!value.match(emailPattern)) {setEmailError('please enter a valid email'); return false}
      else {setEmailError(false); setEmail(value); return true}
    }
  
    function checkPassword(value) {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/;
      if (!value.match(passwordPattern)) {setPasswordError("please enter atleast 8 charatcer with number, symbol, small and capital letter"); return false}
      else {setPasswordError(false); setPassword(value); return true}
    }

  function checkForm(e) {
    e.preventDefault();
    if (checkEmail(email) && checkPassword(password)){
      setIsLoading(true);
      axiosPost(`${API}/login`, {email, password});
    } else setSubmitError("check fields!")
  }

  function axiosPost(url, data) {
    Axios.post(url, data, {withCredentials: true})
    .then(res => {
      if (res.data.success) {
        // window.localStorage.setItem('userId', res.data.userId);
        // setCookies('access_token', res.data.token);
        setIsLoading(false);
        setSubmitError("");
        // navigate('/profile');
      } else {
        setIsLoading(false);
        setEmailError(res.data.message);
        setSubmitError(`please check fields and try again | ${res.data.message}`);
        console.log(res.data);
      }
    }).catch(() => {
      setIsLoading(false);
      setSubmitError('there is error, please try again later');
    })
  }

  return (
    <main>
    <h1 className="p-title">students' attendance</h1>
    <p className="p-suptitle">login, view and check your attend</p>

    <section className="add-std-sec">
      <form className="add-std-form" action="" onSubmit={e=>checkForm(e)}>
        <EmailInput checkEmail={checkEmail} errorMessage={emailError}/>
        <PasswordInput checkPassword={checkPassword} passwordValid={passwordValid} showPassword={showPassword} setShowPassword={setShowPassword} errorMessage={passwordError}/>
        <SubmitButton label={'login'}/>
        {submitError && <p className="error-msg">{submitError}</p>}
        <div className="form-field">
          <p className="errMsg">haven't account? <Link to="/signup">sign up</Link></p>
        </div>
      </form>
    </section>

    { isLoading && <Loading/> }
    </main>
  )
}

export default Login