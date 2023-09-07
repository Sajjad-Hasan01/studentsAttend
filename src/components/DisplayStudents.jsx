import { useState } from 'react';
import StudentRow from './StudentRow'

const DisplayStudents = ({data, dialog}) => {

    return (
    <section className="table-container dspAllStdCon">    
        <table className="table dspAllStd">
            <thead>
                <tr>
                    <th>photo</th>
                    <th className="name-header">full name</th>
                    <th className="email-header">email</th>
                    <th>status</th>
                </tr>
            </thead>
            <tbody id="stdTable">
                {data.map((s, n)=>{
                    return(
                        <StudentRow name={s.user.name} email={s.user.email} status={s.status} photo={s.user.photo} dialog={dialog} key={n}/>
                    )
                })}
            </tbody>
        </table>
    </section>
    )
}

export default DisplayStudents