class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <nav>
                <div class="logo-icon">
                    <a href="./"><img src="./icon/main-favicon.svg" alt="website logo"></a>
                </div>
                <div class="profile-icon">
                    <a href="./profile.html"><img src="./image/IMG_2022.jpg" alt="profile photo logo"></a>
                </div>
                <div class="nav-items">
                    <a class="nav-item" href="./">home</a>
                    <a class="nav-item" href="./attendance.html">attendance</a>
                    <a class="nav-item" href="./students.html">students</a>
                </div>
            </nav>
        `;
    }
}

customElements.define('header-component', Header);


class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer>
            <p class="web-info">course project, database concepts, jan 2023</p>
            <p class="teamwork">teamwork : <a href="https://behance.net/sajjad_hasan" target="_blanck">sajjad hasan</a>, sajjad adbulmoniem, sumaya muhammed</p>
            </footer>
        `;
    }
}

customElements.define('footer-component', Footer);

// Add active class to the current button in nav bar(highlight it)
const navItems = document.getElementsByClassName("nav-item");
for (let i = 0; i < navItems.length; i++) {
    if (navItems[i].href === location.href) navItems[i].className += " active-page"
}

//   DATE & TIME
if (document.title==="Students' Attendance") {
    function displayTime(){
        var dateTime = new Date();
        var hrs = dateTime.getHours();
        var min = dateTime.getMinutes();
        // var sec = dateTime.getSeconds();
        var session = document.getElementById('session');
        var date = dateTime.toLocaleDateString('en', { weekday:"long",day:"numeric", month:"long"});
    
        if(hrs >= 12){
            session.innerHTML = 'PM';
        }else{
            session.innerHTML = 'AM';
        }
    
        if(hrs > 12){
            hrs = hrs - 12;
        }
        
        document.querySelector(".datetime .date").innerText=date;
        document.getElementById('hours').innerHTML = hrs;
        document.getElementById('minutes').innerHTML = min;
        // document.getElementById('seconds').innerHTML = sec;
    }
    setInterval(displayTime, 10);
}


const students = [
    {
        name: "student 1",
        email: "student@student.uobabylon.edu.iq",
        group: "a",
        status: "Continuous",
    },
    {
        name: "student 2",
        email: "student@student.uobabylon.edu.iq",
        group: "b",
        status: "Warning",
    },
    {
        name: "student 3",
        email: "student@student.uobabylon.edu.iq",
        group: "c",
        status: "Warning",
    },
    {
        name: "student 4",
        email: "student@student.uobabylon.edu.iq",
        group: "d",
        status: "Continuous",
    },
    {
        name: "student 5",
        email: "student@student.uobabylon.edu.iq",
        group: "e",
        status: "Separation",
    }
];

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
students.sort(nameASC)
let groups=[a='', b='', c='', d='', e=''],
    statusType=[c='', w='', s=''];
function availableGroups() {
    let groupsChecked = document.querySelectorAll(".filter-bar>.groupCon>label>input");

    for (let i = 0; i < groupsChecked.length; i++) {
        groupsChecked[i].checked ? groups[i] = groupsChecked[i].value : groups[i] = "";
    }
}
availableGroups();

function stdStatus() {
    let statusChecked = document.querySelectorAll(".filter-bar>.statusCon>label>input");

    for (let i = 0; i < statusChecked.length; i++) {
        statusChecked[i].checked ? statusType[i] = statusChecked[i].value : statusType[i] = "";
    }
}
stdStatus();

// Add active class to the current button in filter bar (highlight it)
if (document.title==="Students" || document.title==="Attendance") {
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
        });
    });
    
    groupChecks.forEach((btn) => {
        btn.addEventListener('click', function () {
            if (btn.querySelector("input").checked) btn.classList.add("active-btn");
            else btn.classList.remove("active-btn");
            availableGroups();
            stdView();
        });
    });
    statusChecks.forEach((btn) => {
        btn.addEventListener('click', function () {
            let classN = btn.innerText;
            if (btn.querySelector("input").checked) btn.classList.add(classN);
            else btn.classList.remove(classN);
            stdStatus()
            stdView()
        });
    });
}

//  STUDENT'S PUP UP    
if (document.title==="Students") {
    function stdView() {
        html = '';
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
        showModal();
    }
    stdView();
    
    const closeIcon = document.querySelector(".modal-close"),
        modalBg = document.querySelector(".modal-bg");

    function showModal() {
        const std = document.querySelectorAll("tbody>tr");
        for (let i = 0; i < std.length; i++) {
            std[i].onclick = () => {
                if (
                std[i].querySelector(".email-cell").innerText ===
                students[i].email
                );
                {
                modalInfo = `<div>
                                <img src="./image/profile_photo.svg" alt="profile photo">
                                <div>
                                    <h2 class="std-name">${students[i].name}</h2>
                                    <a class="std-email" target="_blank" href="mailto:${students[i].email}" title="${students[i].email}">${students[i].email}</a>
                                    <p class="std-group">group <label id="gLbl">${students[i].group}</label> status <label class="dspStatus ${students[i].status}" title="${students[i].status}"></label></p>
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
                }
            };
        }
    }
    showModal();
    closeIcon.onclick = () => {
        modalBg.classList.add("hide-control");
        document.body.style.overflow = "auto";
    }
}

// Display Student Table & Filter Bar OR Hide 
if (document.title==="Attendance") {
    let StartLecBtn = document.getElementById("startLecBtn"),
        SaveTableBtn = document.getElementById("saveTableBtn"),
        FilterBar = document.querySelector(".filter-bar"),
        StdTable = document.querySelector(".table-container"),
        AddLec = document.querySelector(".add-lecture");
    
    StartLecBtn.onclick=()=>{StdTable.classList.remove("hide-control");FilterBar.classList.remove("hide-control");SaveTableBtn.classList.remove("hide-control");AddLec.classList.add("hide-control")}
    SaveTableBtn.onclick=()=>{StdTable.classList.add("hide-control");FilterBar.classList.add("hide-control");SaveTableBtn.classList.add("hide-control");AddLec.classList.remove("hide-control")}

    function stdView() {
        html = `<tr><th>photo</th>
                <th class="name-header">full name</th>
                <th>attend</th></tr>`;
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
    stdView();
}

// UPLOAD PHOTO NAME
if (document.title==="Signup"  || document.title==="Profile") {
    let input = document.getElementById("upPhoto");
    let imageName = document.getElementById("imageName");

    input.addEventListener("change", ()=>{
        imageName.innerText = input.files[0].name;
    })
}

// EDIT PROFILE & SAVE & LOG OUT
if (document.title==="Profile") {
    let EditBtn = document.getElementById("editProfileBtn"),
        SaveEditBtn = document.getElementById("saveProfileBtn"),
        editProfileSec = document.querySelector(".edit-sec");
    
    EditBtn.onclick=()=>{editProfileSec.classList.remove("hide-control")}
    SaveEditBtn.onclick=()=>{editProfileSec.classList.add("hide-control")}
}
