import FilterBar from "../components/FilterBar";
import DisplayStudents from "../components/DisplayStudents";
import StudentModal from "../components/StudentModal";
import { useState, useEffect } from "react";
import Axios from "axios";

const Students = () => {
    const [filterSort, setFilterSort] = useState(true);
    const [filterGroups, setFilterGroups] = useState(['a','b','c','d','e']);
    const [filterStatus, setFilterStatus] = useState(["Continuous","Warning","Separation"]);
    const [studentsData, setStudentsData] = useState([]);
    const [modalToggle, setModalToggle] = useState(false);
    const [profile, setProfile] = useState({});
    const API = import.meta.env.VITE_SERVER_URL;

    useEffect(() =>{
        Axios.get(`${API}/students`)
        .then(res => {setStudentsData(res.data)}) 
        .catch(error => error)
    },[API])
    
    let filteredStudentsData = [];

    function filtering() {
        filteredStudentsData = studentsData.filter(student => {
            if (filterGroups.length > 0 && filterStatus.length > 0) {
                for (let i = 0; i < filterGroups.length; i++) {
                    if (student.group == filterGroups[i]) {
                        for (let j = 0; j < filterStatus.length; j++) {
                            if (student.status == filterStatus[j]) {return true}
                        }
                    }
                }
            } else return true
        })

        filterSort ? filteredStudentsData.sort(nameASC) : filteredStudentsData.sort(nameDESC);
    }
    filtering();

    const choiseStudent = (e) => filteredStudentsData.find(s => s.user.email === e);
    
    function openDialog(e) {
        setProfile(choiseStudent(e));
        setModalToggle(true);
    }
    
    function nameASC(a, b) {
        if (a.user.name > b.user.name) return 1;
        else if (a.user.name < b.user.name)  return -1;
    }

    function nameDESC(a, b) {
        if (a.user.name > b.user.name) return -1;
        else if (a.user.name < b.user.name) return 1;
    }

    const sortHandler = (event) => {
        if (event.target.value === 'DESC') setFilterSort(filterSort => !filterSort);
        else setFilterSort(filterSort => !filterSort);
        filtering;
    }

    const filterGroupsHandler = (event) => {
        if (event.target.checked) setFilterGroups([...filterGroups, event.target.value]);
        else setFilterGroups(filterGroups.filter(filterCheck => filterCheck !== event.target.value));
        filtering;
    }

    const filterStatusHandler = (event) => {
        if (event.target.checked) setFilterStatus([...filterStatus, event.target.value]);
        else setFilterStatus(filterStatus.filter(filterCheck => filterCheck !== event.target.value));
        filtering;
    }

    return (
        <main>
        <FilterBar sortHandler={sortHandler} filterGroupsHandler={filterGroupsHandler} filterStatusHandler={filterStatusHandler}/>
        <DisplayStudents data={filteredStudentsData} dialog={openDialog}/>        
        { modalToggle && <StudentModal openToggle={setModalToggle} profile={profile}/> }
        </main>
    )
}

export default Students