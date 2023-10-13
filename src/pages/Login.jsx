import { useState, useEffect } from "react";
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
    [keepLogin, setKeepLogin] = useState(false),
    [submitError, setSubmitError] = useState(''),
    [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(),  
  API = import.meta.env.VITE_SERVER_URL;
  // [_,setCookies] = useCookies(['access_token']);
  // {setCookies} = useCookies(['access_token']);

  useEffect(() => {
    setIsLoading(true);
    Axios.get(`${API}/profile`, {withCredentials: true})
    .then(()=> {
      setIsLoading(false);
      navigate('/profile');
    }).catch( error => {
      setIsLoading(false); 
      // console.clear(); 
      // throw error;
      console.log(error.message);
    });
  },[API, navigate]);

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
      Axios.post(`${API}/login`, {email, password, keepLogin}, {withCredentials: true})
      .then(() => {
        setIsLoading(false);
        setSubmitError("");
        // location.reload();
      }).catch(error => {
        // setIsLoading(false);
        console.log(error.message);
        error.response.status == 404 ? setEmailError(error.response.data) : error.response.status == 403 ? setPasswordError(error.response.data) : setSubmitError(error.response.data);
      });
    } else setSubmitError("check fields!")
  }




  return (
    <main>
    <h1 className="p-title">students' attendance</h1>
    <p className="p-suptitle">login, view and check your attend</p>

    <section className="add-std-sec">
      <form className="add-std-form" action="" onSubmit={e=>checkForm(e)}>
        <EmailInput checkEmail={checkEmail} errorMessage={emailError}/>
        <PasswordInput checkPassword={checkPassword} passwordValid={passwordValid} showPassword={showPassword} setShowPassword={setShowPassword} errorMessage={passwordError}/>
        <SubmitButton label={'login'} setKeepLogin={setKeepLogin}/>
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