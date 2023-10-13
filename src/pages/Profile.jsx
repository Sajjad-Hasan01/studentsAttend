import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie';
import Axios from "axios";
import Warn from "../components/Warn";
import TextInput from "../components/TextInput";
import GroupSelect from "../components/GroupSelect";
import FileInput from "../components/FileInput";
import Loading from "../components/Loading";

const Profile = () => {
  const [studentProfile, setStudentProfile] = useState({}),
  [isLoading, setIsLoading] = useState(false),
  navigate = useNavigate(),
  API = import.meta.env.VITE_SERVER_URL;
  // [_,setCookies] = useCookies(['token']),
  
  useEffect(() => {
    setIsLoading(true);
    Axios.get(`${API}/profile`, {withCredentials: true})
    .then(res => {
      setStudentProfile(res?.data); 
      setName(res?.data?.user?.name); 
      setGroup(res?.data?.group);
      setIsLoading(false);
      // console.clear();
      console.log(res);
    }).catch((e)=> console.log(e.message));
  },[API]);

  const [name, setName] = useState(null),
    [nameError, setNameError] = useState(false),
    [group, setGroup] = useState(studentProfile?.group),
    [groupError, setGroupError] = useState(false),
    [photo, setPhoto] = useState(null),
    [editToggle, setEditToggle] = useState(false),
    [logoutToggle, setLogoutToggle] = useState(false),
    [submitError, setSubmitError] = useState(null);

  function checkName(value) {
    if (!value) {setNameError("this field required"); setName(null); return false}
    else {setNameError(false); setName(value); return true}
  }

  function checkGroup(value) {
    if (!value) {setGroupError("select your group, please"); setGroup(null); return false}
    else {setGroupError(false); setGroup(value); return true}
  }

  function updateForm(e) {
    e.preventDefault()
    if (checkName(name) && checkGroup(group)){
      const formData = new FormData();
      formData.append('name', name);
      formData.append('group', group);
      formData.append('profilePhoto', photo);
      
      setIsLoading(true);
      Axios.post(`${API}/updateStudent`, formData, {withCredentials: true})
      .then(() => location.reload())
      .catch(error => {
        setIsLoading(false); 
        setSubmitError(error.message);
      })
    } else setSubmitError("check fields!");
  }

  const logout = () => {
    Axios.get(`${API}/logout`, {withCredentials: true})
    .then(() => location.reload())
    .catch(() => location.reload());
  };

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
          <button className="secBtn" onClick={()=>setEditToggle(true)}>edit profile</button>
          <button className="secBtn danger" onClick={()=>setLogoutToggle(true)}>log out</button>
        </div>
    </section>

    {editToggle && <section className="add-std-sec edit-sec">
      <form action="" className="add-std-form" onSubmit={e=>updateForm(e)}>
        <TextInput label={'name'} placeholder={'full name'} defaultValue={studentProfile?.user?.name || 'profile name'} checkName={checkName} errorMessage={nameError}/>
        <GroupSelect checkGroup={checkGroup} defaultValue={group} errorMessage={groupError}/>
        <FileInput photo={photo} setPhoto={setPhoto}/>
        <div className="form-field flex-between">
          <button type="reset" className="secBtn danger" onClick={()=>setEditToggle(false)}>cancle</button>
          <button type="submit" className="btn">save</button>
        </div>
        {submitError && <p className="error-msg">{submitError}</p>}
      </form>
    </section>}

    { logoutToggle && <Warn action={logout} actionLabel={'Logout'} message={'Would you like to logout?'} setToggle={setLogoutToggle} warning={true}/> }

    { isLoading && <Loading/> }
    </main>
  )
}

export default Profile