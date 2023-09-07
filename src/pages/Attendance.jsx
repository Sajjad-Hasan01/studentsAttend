import { useState, useEffect } from "react";
import Axios from 'axios'
import FilterBar from "../components/FilterBar";
import DisplayAttendance from "../components/DisplayAttendance";
import Loading from "../components/Loading";

const Attendance = () => {
    const [filterSort, setFilterSort] = useState(true);
    const [filterGroups, setFilterGroups] = useState(['a','b','c','d','e']);
    const [filterStatus, setFilterStatus] = useState(["Continuous","Warning","Separation"]);
    const [studentsData, setStudentsData] = useState([]);
    const [attendCheckList, setAttendCheck] = useState([]);
    const [isShown, setIsShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
    
    function startHandler() {
        setAttendCheck(filteredStudentsData.map(s => {return{id: s._id, attendance: false}}));
        setIsShown(current => !current);
    }

    function checkboxHandler(checkbox){
        let target = attendCheckList.find(item => item.id === checkbox.id);
        if (target) target.attendance = checkbox.checked;
    }

    function finishHandler() {
        setIsLoading(true);
        axiosPost(`${API}/attendance`, attendCheckList);
    }

    function axiosPost(url, data) {
        Axios.post(url, data).then(res => {
            if (res.data.code === 0) {
                setIsLoading(false);
                window.location.reload(true);
            } else console.log(res.data.message);
        }).catch(() => console.log('there is error, please try again later'));
    }

    return (
    <main>
        {!isShown && <button type="submit" id="startLecBtn" className="form-control btn add-lecture" onClick={startHandler}>start</button>}
        {isShown && <>
            <FilterBar sortHandler={sortHandler} filterGroupsHandler={filterGroupsHandler} filterStatusHandler={filterStatusHandler}/>
            <DisplayAttendance data={filteredStudentsData} checkboxHandler={checkboxHandler}/>
            <button type="button" id="saveTableBtn" className="form-control btn svTbl" onClick={finishHandler}>finish</button>
        </>}
        { isLoading && <Loading/> }
    </main>
    )
}

export default Attendance