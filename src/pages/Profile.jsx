import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie';
import Axios from "axios";
import TextInput from "../components/TextInput";
import GroupSelect from "../components/GroupSelect";
import FileInput from "../components/FileInput";
import Loading from "../components/Loading";

const Profile = () => {
  const [studentProfile, setStudentProfile] = useState({}),
  [isLoading, setIsLoading] = useState(false),
    [_,setCookies] = useCookies(['access_token']),
    navigate = useNavigate(),
    API = import.meta.env.VITE_SERVER_URL,
    profileOfUser = window.localStorage.getItem('userId');

  useEffect(() =>{
    Axios.post(`${API}/profile`, { profileOfUser })
    .then(res => {setStudentProfile(res.data); setName(res.data.user.name); setGroup(res.data.group);}) 
    .catch(error => setSubmitError(error))
  },[API, profileOfUser])

  const [name, setName] = useState(null),
    [nameError, setNameError] = useState(false),
    [group, setGroup] = useState(studentProfile.group),
    [groupError, setGroupError] = useState(false),
    [photo, setPhoto] = useState(null),
    [showEdit, setShowEdit] = useState(false),
    [submitError, setSubmitError] = useState(null);

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
      formData.append('id', studentProfile.user._id);
      formData.append('name', name);
      formData.append('group', group);
      formData.append('profilePhoto', photo);
// console.log(studentProfile.user._id);
      setIsLoading(true);
      axiosPost(`${API}/updateStudent`, formData);
    } else setSubmitError("check fields!")
  }

  function axiosPost(url, data) {
    Axios.post(url, data)
    .then(res => {
      if (res.data.code === 0) {
        setIsLoading(false);
        window.location.reload(true)
      } else if (res.data.code === 1) {
        setSubmitError(res.data.message);
        console.log(res.data.error);
      } else setSubmitError('there is error, please try again later');
    }).catch(() => setSubmitError('there is error, please try again later'))
  }

  const removeCookies = () => {
    setCookies('access_token', '')
    window.localStorage.removeItem('userId')
    navigate('/login')
  }

  return (
    <main>
    <section className="profile-sec">
        <div className="profile-img">
          <img src={`${API}/images/${studentProfile?.user?.photo}`} onError={(e)=>{e.target.src = `/image/profile_photo.svg`}} alt="profile photo"/>
        </div>  
        <div className="profile-title">
          <h2 className="profile-name">{studentProfile?.user?.name || 'profile name'}</h2>
          <a className="profile-email" rel='noreferrer' target="_blank" href={`mailto:${studentProfile?.user?.email}`}>{studentProfile?.user?.email || 'student email'}</a>
          <p className="std-group">group <strong>{studentProfile?.group}</strong> status <label className={`dspStatus ${studentProfile?.status}`} alt={studentProfile?.status} title={studentProfile?.status}></label></p>
        </div>
        <div className="modal-footer">
          <button className="secBtn" onClick={()=>setShowEdit(true)}>edit profile</button>
          <button className="secBtn danger" onClick={removeCookies}>log out</button>
        </div>
    </section>

    {showEdit && <section className="add-std-sec edit-sec">
      <form action="" className="add-std-form" onSubmit={e=>checkForm(e)}>
        <TextInput label={'name'} placeholder={'full name'} defaultValue={studentProfile?.user?.name || 'profile name'} checkName={checkName} errorMessage={nameError}/>
        <GroupSelect checkGroup={checkGroup} defaultValue={group} errorMessage={groupError}/>
        <FileInput photo={photo} setPhoto={setPhoto}/>
        <div className="form-field flex-between">
          <button type="reset" className="secBtn danger" onClick={()=>setShowEdit(false)}>cancle</button>
          <button type="submit" className="btn">save</button>
        </div>
        {submitError && <p className="error-msg">{submitError}</p>}
      </form>
    </section>}

    { isLoading && <Loading/> }
    </main>
  )
}

export default Profile