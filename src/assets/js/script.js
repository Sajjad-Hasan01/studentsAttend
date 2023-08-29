const students = [
    {
        name: "student 1",
        email: "student1@student.uobabylon.edu.iq",
        group: "a",
        status: "Continuous",
    },
    {
        name: "student 2",
        email: "student2@student.uobabylon.edu.iq",
        group: "b",
        status: "Warning",
    },
    {
        name: "student 3",
        email: "student3@student.uobabylon.edu.iq",
        group: "c",
        status: "Warning",
    },
    {
        name: "student 4",
        email: "student4@student.uobabylon.edu.iq",
        group: "d",
        status: "Continuous",
    },
    {
        name: "student 5",
        email: "student5@student.uobabylon.edu.iq",
        group: "e",
        status: "Separation",
    }
];
let groups=['', '', '', '', ''],
statusType=['', '', ''];

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
function availableGroups() {
    let groupsChecked = document.querySelectorAll(".filter-bar>.groupCon>label>input");

    for (let i = 0; i < groupsChecked.length; i++) {
        groupsChecked[i].checked ? groups[i] = groupsChecked[i].value : groups[i] = "";
    }
}
function stdStatus() {
    let statusChecked = document.querySelectorAll(".filter-bar>.statusCon>label>input");
    
    for (let i = 0; i < statusChecked.length; i++) {
        statusChecked[i].checked ? statusType[i] = statusChecked[i].value : statusType[i] = "";
    }
}

students.sort(nameASC)

//  STUDENT'S PUP UP    
function stdView() {
    if (location==="http://localhost:5173/students") {
        availableGroups();
        stdStatus();
        let html = '';
        students.forEach((std) => {
            if (
                std.group == groups[0] ||
                std.group == groups[1] ||
                std.group == groups[2] ||
                std.group == groups[3] ||
                std.group == groups[4]
            ) {
                if (std.status == statusType[0] ||
                    std.status == statusType[1] ||
                    std.status == statusType[2]
                ) {
                    html += `
                    <tr>
                        <td><img src="./image/profile_photo.svg" alt="profile photo"></td>
                        <td class="name-cell">${std.name}</td>
                        <td class="email-cell">${std.email}</td>
                        <td><div class="dspStatus ${std.status}"></div></td>
                    </tr>`;
                }
            }
        });
        document.getElementById("stdTable").innerHTML = html;
    }

    if (location==="http://localhost:5173/attendance") {
        availableGroups();
        stdStatus();
        let html = '';
        students.forEach((std) => {
            if (
                std.group == groups[0] ||
                std.group == groups[1] ||
                std.group == groups[2] ||
                std.group == groups[3] ||
                std.group == groups[4]
            ) {
                if (std.status == statusType[0] ||
                    std.status == statusType[1] ||
                    std.status == statusType[2]
                ) {
                    html += `<tr std='true'>
                                <td><img src="./image/profile_photo.svg" alt="profile photo"></td>
                                <td class="name-cell">${std.name}</td>
                                <td><input type="checkbox" name="" id=""></td>
                            </tr>`;
                }
            }
        });
        document.getElementById("stdTable").innerHTML = html;
    }
}
if (location==="http://localhost:5173/students") {
    const closeIcon = document.querySelector(".modal-close"),
        modalBg = document.querySelector(".modal-bg");

    closeIcon.onclick = () => {
        modalBg.classList.add("hide-control");
        document.body.style.overflow = "auto";
    }
}

function showModal() {
    if (location==="http://localhost:5173/students") {
        const modalBg = document.querySelector(".modal-bg");
        const std = document.querySelectorAll("tbody>tr");
        for (let i = 0; i < std.length; i++) {
            std[i].onclick = () => {
                let email = std[i].querySelector(".email-cell").innerText,
                    e = students.findIndex(s=>s.email===email);
                let modalInfo = `<div>
                                <img src="./image/profile_photo.svg" alt="profile photo">
                                <div>
                                    <h2 class="std-name">${students[e].name}</h2>
                                    <a class="std-email" target="_blank" href="mailto:${students[e].email}" title="${students[e].email}">${students[e].email}</a>
                                    <p class="std-group">group <label id="gLbl">${students[e].group}</label> status <label class="dspStatus ${students[e].status}" title="${students[e].status}"></label></p>
                                </div>
                            </div>
                            
                            <div class="attend-log scroll-inline">
                                <div class="lec-log">
                                    <div class="lec-title">lec 1</div>
                                    <div class="lec-attend">&#10004;</div>
                                </div>
                                <div class="lec-log">
                                    <div class="lec-title">lec 2</div>
                                    <div class="lec-attend">&#10004;</div>
                                </div>
                                <div class="lec-log">
                                    <div class="lec-title">lec 3</div>
                                    <div class="lec-attend">&#10006;</div>
                                </div>
                                <div class="lec-log">
                                    <div class="lec-title">lec 4</div>
                                    <div class="lec-attend">&#10006;</div>
                                </div>
                                <div class="lec-log">
                                    <div class="lec-title">lec 5</div>
                                    <div class="lec-attend">&#10004;</div>
                                </div>
                                <div class="lec-log">
                                    <div class="lec-title">lec 6</div>
                                    <div class="lec-attend">&#10006;</div>
                                </div>
                                <div class="lec-log">
                                    <div class="lec-title">lec 7</div>
                                    <div class="lec-attend">&#10004;</div>
                                </div>
                                <div class="lec-log">
                                    <div class="lec-title">lec 8</div>
                                    <div class="lec-attend">&#10006;</div>
                                </div>
                            </div>`;
                document.getElementById("modalContent").innerHTML = modalInfo;
                modalBg.classList.remove("hide-control");
                document.body.style.overflow = "hidden";
            };
        }
    }

    if (location==="http://localhost:5173/attendance") return 0
}


// Display Student Table & Filter Bar OR Hide 
if (location==="http://localhost:5173/attendance") {
    let StartLecBtn = document.getElementById("startLecBtn"),
        SaveTableBtn = document.getElementById("saveTableBtn"),
        FilterBar = document.querySelector(".filter-bar"),
        StdTable = document.querySelector(".table-container"),
        AddLec = document.querySelector(".add-lecture");
    
    StartLecBtn.onclick=()=>{StdTable.classList.remove("hide-control");FilterBar.classList.remove("hide-control");SaveTableBtn.classList.remove("hide-control");AddLec.classList.add("hide-control")}
    SaveTableBtn.onclick=()=>{StdTable.classList.add("hide-control");FilterBar.classList.add("hide-control");SaveTableBtn.classList.add("hide-control");AddLec.classList.remove("hide-control")}
}
// function stdView() {
//     if (location==="http://localhost:5173/attendance") {
//         availableGroups();
//         stdStatus();
//         html = '';
//         students.forEach((std) => {
//             if (
//                 std.group == groups[0] ||
//                 std.group == groups[1] ||
//                 std.group == groups[2] ||
//                 std.group == groups[3] ||
//                 std.group == groups[4]
//             ) {
//                 if (std.status == statusType[0] ||
//                     std.status == statusType[1] ||
//                     std.status == statusType[2]
//                 ) {
//                     html += `<tr std='true'>
//                                 <td><img src="./image/profile_photo.svg" alt="profile photo"></td>
//                                 <td class="name-cell">${std.name}</td>
//                                 <td><input type="checkbox" name="" id=""></td>
//                             </tr>`;
//                 }
//             }
//         });
//         document.getElementById("stdTable").innerHTML = html;
//     }
// }

// function showModal(){
//     if (location==="http://localhost:5173/attendance") return 0
// }


// Add active class to the current button in filter bar (highlight it)
if (location==="http://localhost:5173/students" || location==="http://localhost:5173/attendance") {
    let sortItems = document.querySelectorAll(".filter-bar>.sortCon>label");
    let groupChecks = document.querySelectorAll(".filter-bar>.groupCon>label");
    let statusChecks = document.querySelectorAll(".filter-bar>.statusCon>label");

    sortItems.forEach(item => {
        item.addEventListener('click', function () {
            if (this.querySelector("input").checked){
                sortItems.forEach((btn) => btn.classList.remove("active-btn"));
                this.classList.add('active-btn');
                this.getAttribute('value')==='nameASC' ? students.sort(nameASC) : students.sort(nameDESC);
            }
            stdView();
            showModal();
        });
    });
    
    groupChecks.forEach((btn) => {
        btn.addEventListener('click', function () {
            if (btn.querySelector("input").checked) btn.classList.add("active-btn");
            else btn.classList.remove("active-btn");
            stdView();
            showModal();
        });
    });
    statusChecks.forEach((btn) => {
        btn.addEventListener('click', function () {
            let classN = btn.innerText;
            if (btn.querySelector("input").checked) btn.classList.add(classN);
            else btn.classList.remove(classN);
            stdView();
            showModal();
        });
    });

    stdView();
    showModal();
}

// UPLOAD PHOTO NAME
if (location==="http://localhost:5173/signup"  || location==="http://localhost:5173/profile") {
    let input = document.getElementById("upPhoto");
    let imageName = document.getElementById("imageName");

    input.addEventListener("change", ()=>{
        imageName.innerText = input.files[0].name;
    })
}

// EDIT PROFILE & SAVE & LOG OUT
if (location==="http://localhost:5173/profile") {
    let EditBtn = document.getElementById("editProfileBtn"),
        SaveEditBtn = document.getElementById("saveProfileBtn"),
        editProfileSec = document.querySelector(".edit-sec");
    
    EditBtn.onclick=()=>{editProfileSec.classList.remove("hide-control")}
    SaveEditBtn.onclick=()=>{editProfileSec.classList.add("hide-control")}
}
/////////////////////////////////////

//    Preview A Project Details
const studentModal = document.querySelector("#studentModal"),
    closeDialog = studentModal.querySelector("#closeDialog");

    // - Open Event
function displayProject(i){
    if (closeDialog.getAttribute('data-state') !== 'opened') {
        closeDialog.setAttribute("data-state","opened");
        document.body.style.overflow="hidden";
        document.querySelector("#studentModal img").setAttribute('src',projects[i].photo)
        document.querySelector("#studentModal .visit-project-btn").setAttribute('href',projects[i].link)
        if(location.pathname === '/'){
            document.querySelector("#studentModal .dialog-title").innerText=projects[i].ar.name
            document.querySelector("#studentModal .dialog-type").innerText=projects[i].ar.type
            document.querySelector("#studentModal .dialog-description").innerText=projects[i].ar.description
        } else if (location.pathname === '/en/') {
            document.querySelector("#studentModal .dialog-title").innerText=projects[i].en.name
            document.querySelector("#studentModal .dialog-type").innerText=projects[i].en.type
            document.querySelector("#studentModal .dialog-description").innerText=projects[i].en.description
        }
        studentModal.showModal();
    }
}

// - Close Event
function closeProject(){
    if (closeDialog.getAttribute('data-state') === 'opened') {
        closeDialog.setAttribute("data-state","close");

        studentModal.addEventListener('animationend',()=>{
            closeDialog.setAttribute("data-state","closed");
            studentModal.close();
            document.body.style.overflow="auto"
        }, {once: true})
    }
}

function openAndCloseProject() {
    const artworks = document.querySelectorAll("#projectsContainer .project");
    Array.from(artworks)
    artworks.forEach((p,i)=>{p.addEventListener('click',()=>displayProject(i))})
}
closeDialog.addEventListener('click',()=>closeProject())

studentModal.addEventListener('keydown',e=>{
    e.preventDefault()
    e.which==27 && closeProject()
})
