const AttendRow = ({name, n}) => {
    return (
        <tr key={n}>
            <td><img src="./src/assets/image/profile_photo.svg" alt="profile photo"/></td>
            <td className="name-cell">{name}</td>
            <td><input type="checkbox" name=""/></td>
        </tr>
        )
}

export default AttendRow