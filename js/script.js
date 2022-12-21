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
                    <a href="./profile.html"><img src="./image/profile_photo.svg" alt="profile photo logo"></a>
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

// Add active class to the current button in filter bar (highlight it)
if (document.title==="Students" || document.title==="Attendance") {
    let sortItems = document.querySelectorAll(".filter-bar>.sortCon>label");
    let groupChecks = document.querySelectorAll(".filter-bar>.groupCon>label>input");
    let statusChecks = document.querySelectorAll(".filter-bar>.statusCon>label>input");

    sortItems.forEach(item => {
        item.addEventListener('click', function () {
            sortItems.forEach(btn => btn.classList.remove('active-btn'));
            this.classList.add('active-btn');        
        });
    });

    for (let i = 0; i < groupChecks.length; i++) {
        groupChecks[i].parentElement.addEventListener('click', () => {  
            if (groupChecks[i].checked) groupChecks[i].parentElement.classList.add('active-btn')
            else groupChecks[i].parentElement.classList.remove('active-btn')
        })
    }

    for (let i = 0; i < statusChecks.length; i++) {
        statusChecks[i].parentElement.addEventListener('click', () => {  
            let classN = statusChecks[i].parentElement.innerText
            if (statusChecks[i].checked) statusChecks[i].parentElement.classList.add(classN)
            else statusChecks[i].parentElement.classList.remove(classN)
        })
    }
}

//  STUDENT'S PUP UP    
if (document.title==="Students") {
    const student = document.getElementsByTagName('tr'),
        stdModal = document.querySelector(".preview-box"),
        closeIcon = document.querySelector(".modal-close"),
        delBtn = document.querySelector(".modal-footer > button:last-child"),
        modalBg = document.querySelector(".modal-bg");

    for (let i = 0; i < student.length; i++) {
        const std = student[i];
        std.onclick = () => {modalBg.classList.remove("hide-control")}
        closeIcon.onclick = () => {modalBg.classList.add("hide-control")}
        delBtn.onclick = () => {modalBg.classList.add("hide-control")}
    }
}

// Display Student Table & Filter Bar OR Hide 
if (document.title==="Attendance") {
    let StartLecBtn = document.getElementById("startLecBtn"),
        SaveTableBtn = document.getElementById("saveTableBtn"),
        FilterBar = document.querySelector(".filter-bar"),
        StdTable = document.querySelector(".table-container"),
        AddLec = document.querySelector(".add-lecture");
    
    StartLecBtn.onclick=()=>{StdTable.classList.remove("hide-control");FilterBar.classList.remove("hide-control");AddLec.classList.add("hide-control")}
    SaveTableBtn.onclick=()=>{StdTable.classList.add("hide-control");FilterBar.classList.add("hide-control");AddLec.classList.remove("hide-control")}
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
