import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {useCookies} from 'react-cookie'
import Axios from "axios"
import TextInput from "../components/TextInput"
import GroupSelect from "../components/GroupSelect"
import FileInput from "../components/FileInput"

const Profile = () => {
  const [studentProfile, setStudentProfile] = useState({});
  const [_,setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_SERVER_URL;
  const profileOfUser = window.localStorage.getItem('userEmail');

  useEffect(() =>{
    Axios.post(`${API}/profile`, { profileOfUser })
    .then(res => {setStudentProfile(res.data); setName(res.data.name); setGroup(res.data.group)}) 
    .catch(error => setSubmitError(error))
  },[API, profileOfUser])

  const [name, setName] = useState(null)
  const [nameError, setNameError] = useState(false)
  const [group, setGroup] = useState(studentProfile.group)
  const [groupError, setGroupError] = useState(false)
  const [photo, setPhoto] = useState(null)
  const status = 'Continuous';
  const [showEdit, setShowEdit] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  function checkName(value) {
    if (!value) {setNameError("this field required"); setName(null); return false}
    else {setNameError(false); setName(value); return true}
  }

  function checkGroup(value) {
    if (!value) {setGroupError("select your group, please"); setGroup(null); return false}
    else {setGroupError(false); setGroup(value); return true}
  }

  function checkForm(e) {
    e.preventDefault()
    if (checkName(name) && checkGroup(group)){
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', studentProfile.email);
      formData.append('group', group);
      formData.append('profilePhoto', photo);

      axiosPost(`${API}/updateStudent`, formData);
    } else setSubmitError("check fields!")
  }

  function axiosPost(url, data) {
    Axios.post(url, data)
    .then(res => {
      if (res.data.code === 0) {
        setSubmitError(res.data.message)
        window.location.reload(true)
      } else if (res.data.code === 1) {
        setSubmitError(res.data.message);
      } else setSubmitError('there is error, please try again later');
    }).catch(() => setSubmitError('there is error, please try again later'))
  }

  const removeCookies = () => {
    setCookies('access_token', '')
    window.localStorage.removeItem('userEmail')
    navigate('/login')
  }

  return (
    <main>
    <section className="profile-sec">
        <div className="profile-img">
            <img src={`${API}/images/${studentProfile.photo}`} onError={(e)=>{e.target.src = `/image/profile_photo.svg`}} alt="profile photo"/>
        </div>
        <div className="profile-title">
            <h2 className="profile-name">{studentProfile?.name || 'profile name'}</h2>
            <a className="profile-email" rel='noreferrer' target="_blank" href={`mailto:${studentProfile?.email}`}>{studentProfile?.email || 'student email'}</a>
            <p className="std-group">group <strong>{studentProfile?.group}</strong> status <label className={`dspStatus ${status}`} alt={status} title={status}></label></p>
        </div>
        <div className="modal-footer">
            <button className="secBtn" onClick={()=>setShowEdit(true)}>edit profile</button>
            <button className="secBtn danger" onClick={removeCookies}>log out</button>
        </div>
    </section>

    {showEdit && <section className="add-std-sec edit-sec">
      <form action="" className="add-std-form" onSubmit={e=>checkForm(e)}>
        <TextInput label={'name'} placeholder={'full name'} defaultValue={studentProfile?.name || 'profile name'} checkName={checkName} errorMessage={nameError}/>
        <GroupSelect checkGroup={checkGroup} defaultValue={group} errorMessage={groupError}/>
        <FileInput photo={photo} setPhoto={setPhoto}/>
        <div className="form-field flex-between">
          <button type="reset" className="secBtn danger" onClick={()=>setShowEdit(false)}>cancle</button>
          <button type="submit" className="btn">save</button>
        </div>
        {submitError && <p className="error-msg">{submitError}</p>}
      </form>
    </section>}
    </main>
  )
}

export default Profile