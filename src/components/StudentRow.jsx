const StudentRow = ({name, email, status, n}) => {
    return (
    <tr key={n}>
        <td><img src="./src/assets/image/profile_photo.svg" alt="profile photo"/></td>
        <td className="name-cell">{name}</td>
        <td className="email-cell">{email}</td>
        <td><div className={`dspStatus ${status}`}></div></td>
    </tr>
    )
}

export default StudentRow