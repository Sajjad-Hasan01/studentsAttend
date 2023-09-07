const StudentRow = ({name, email, status, photo, dialog, n}) => {
    const API = import.meta.env.VITE_SERVER_URL;

    return (
    <tr key={n} onClick={()=>dialog(email)}>
        <td><div className="full-img"><img src={`${API}/images/${photo}`} onError={(e)=>{e.target.src=`/image/profile_photo.svg`}} alt="profile photo"/></div></td>
        <td className="name-cell">{name}</td>
        <td className="email-cell">{email}</td>
        <td><div className={`dspStatus ${status}`}></div></td>
    </tr>
    )
}

export default StudentRow