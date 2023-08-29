import { useState } from "react";
import FilterBar from "../components/FilterBar";
import DisplayAttendance from "../components/DisplayAttendance";
import {studentsData} from "../assets/js/studentsData";

const Attendance = () => {
    const [filterGroups, setFilterGroups] = useState(['a','b','c','d','e'])
    const [filterStatus, setFilterStatus] = useState(["Continuous","Warning","Separation"])

    const filteredStudentsData = studentsData.filter(student => {
        if (filterGroups.length > 0 && filterStatus.length > 0) {
            for (let i = 0; i < filterGroups.length; i++) {
                if (student.group == filterGroups[i]) {
                    for (let j = 0; j < filterStatus.length; j++) {
                        if (student.status == filterStatus[j]) {return true}
                    }
                }
            }
        } else return true
    });

    function nameASC(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

    function nameDESC(a, b) {
        if (a.name > b.name) {
            return -1;
        }
        if (a.name < b.name) {
            return 1;
        }
        return 0;
    }

    const sortHandler = event => {
        event.target.value === 'DESC' ? 
        filteredStudentsData.sort(nameDESC) :
        filteredStudentsData.sort(nameASC)
    }

    const filterGroupsHandler = (event) => {
        if (event.target.checked) {
          setFilterGroups([...filterGroups, event.target.value]);
        } else {
          setFilterGroups(
            filterGroups.filter((filterCheck) => filterCheck !== event.target.value)
          )
        }
    }

    const filterStatusHandler = (event) => {
        event.target.checked ? setFilterStatus([...filterStatus, event.target.value]) :
        setFilterStatus(filterStatus.filter((filterCheck) => filterCheck !== event.target.value))
    }

    const [isShown, setIsShown] = useState(false);

    const handleClick = () => {
        setIsShown(current => !current);
    };

  return (
    <main>
    {!isShown && <button type="submit" id="startLecBtn" className="form-control btn add-lecture" onClick={handleClick}>start</button>}
    {isShown && <>
        <FilterBar sortHandler={sortHandler} filterGroupsHandler={filterGroupsHandler} filterStatusHandler={filterStatusHandler}/>
        <DisplayAttendance data={filteredStudentsData}/>
        <button type="button" id="saveTableBtn" className="form-control btn svTbl" onClick={handleClick}>finish</button>
    </>}
    </main>
  )
}

export default Attendance