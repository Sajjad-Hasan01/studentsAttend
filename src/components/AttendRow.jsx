const AttendRow = ({name, photo, id, checkboxHandler, n}) => {
    const API = import.meta.env.VITE_SERVER_URL;

    return (
        <tr key={n}>
            <td><div className="full-img"><img src={`${API}/images/${photo}`} onError={(e)=>{e.target.src=`/image/profile_photo.svg`}} alt="profile photo"/></div></td>
            <td className="name-cell">{name}</td>
            <td><input type="checkbox" id={id} onChange={e=>checkboxHandler(e.target)}/></td>
        </tr>
    )
}

export default AttendRow