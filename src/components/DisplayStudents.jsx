import { useState } from 'react';
import StudentRow from './StudentRow'

const DisplayStudents = ({data}) => {

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
                {data.map(({name, email, status}, n)=>{
                    return(
                        <StudentRow name={name} email={email} status={status} key={n}/>
                    )
                })}
            </tbody>
        </table>
    </section>
    )
}

export default DisplayStudents