import { Link } from 'react-router-dom';

const StudentModal = ({openToggle, profile}) => {
    const API = import.meta.env.VITE_SERVER_URL;

    return (
    <section className="modal-bg">
        <div className="modal" id="stdModal">
            <span className="modal-close" onClick={() => openToggle(false)}>&#10005;</span>
            <div className="modal-content" id="modalContent">
                <div className='modal-profile'>
                    <div className='profile-photo full-img'>
                        <img src={`${API}/images/${profile?.user?.photo}`} onError={(e)=>{e.target.src=`/image/profile_photo.svg`}} alt="profile photo"/>
                    </div>
                    <div className='profile-info'>
                        <h2 className="std-name">{profile?.user.name}</h2>
                        <Link className="std-email" target="_blank" to={`mailto:${profile?.user.email}`} title={profile?.user.email}>{profile?.user.email}</Link>
                        <p className="std-group">group <label id="gLbl">{profile?.group}</label> status <label className={`dspStatus ${profile?.status}`} title={profile?.status}></label></p>
                    </div>
                </div>

                <div className="attend-log scroll-inline">
                    {profile.lectures.map(({ attendance }, n)=>{
                        return(
                            <div className="lec-log" key={n}>
                                <div className="lec-title">lec {n+1}</div>
                                <div className="lec-attend">{attendance ? `✔` : `✖`}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </section>
    )
}

export default StudentModal