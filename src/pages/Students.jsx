import FilterBar from "../components/FilterBar";
import DisplayStudents from "../components/DisplayStudents";
import {studentsData} from "../assets/js/studentsData";
import { createElement, useState } from "react";

const Students = () => {
    //  'a','b','c','d','e',"Continuous","Warning","Separation"
    // const [filterChecks, setFilterChecks] = useState(['a','b','c','d','e'])
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
        if (event.target.value === 'DESC') {
            filteredStudentsData.sort(nameDESC);
            setFilterGroups([...filterGroups]);
        }
        else {
            filteredStudentsData.sort(nameASC);
            setFilterGroups([...filterGroups]);
        }
        // setFilterGroups([...filterGroups])
        console.log(filteredStudentsData);
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
        if (event.target.checked) {
          setFilterStatus([...filterStatus, event.target.value]);
        } else {
          setFilterStatus(
            filterStatus.filter((filterCheck) => filterCheck !== event.target.value)
          )
        }
    }

    // const filterHandler = (event) => {
    //     if (event.target.checked) {
    //       setFilterChecks([...filterChecks, event.target.value]);
    //     } else {
    //       setFilterChecks(
    //         filterChecks.filter((filterCheck) => filterCheck !== event.target.value)
    //       )
    //     }
    // }

    let modalClose = createElement('span',{className:'modal-close'},'&#10005;')
    let modalContent = createElement('div',{className:'modal-content',id:'modalContent'})
    let studentModal = createElement('dialog',{className:'modal',id:'studentModal'},modalClose,modalContent)
    function showStudentDetails() {
        // studentModal.showModal();
        return studentModal
    }
  return (
    <main>
    <FilterBar sortHandler={sortHandler} filterGroupsHandler={filterGroupsHandler} filterStatusHandler={filterStatusHandler}/>

    <DisplayStudents data={filteredStudentsData}/>

    {/* {studentModal} */}
    
    </main>
  )
}

export default Students