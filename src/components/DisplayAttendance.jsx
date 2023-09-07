import AttendRow from './AttendRow'

const DisplayAttendance = ({data, checkboxHandler}) => {
  return (
    <div className="table-container">
        <table className="table dspAllStd">
            <thead>
                <tr>
                    <th>photo</th>
                    <th className="name-header">full name</th>
                    <th>attend</th>
                </tr>
            </thead>
            <tbody id="stdTable">
                {data.map((s, n)=>{
                    return(
                        <AttendRow name={s.user.name} photo={s.user.photo} id={s._id} checkboxHandler={checkboxHandler} key={n}/>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default DisplayAttendance