import { useState } from 'react';
import AttendRow from './AttendRow'

const DisplayAttendance = ({data}) => {
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
                {data.map(({name}, n)=>{
                    return(
                        <AttendRow name={name} key={n}/>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default DisplayAttendance