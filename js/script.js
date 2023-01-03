let profileImgUrl = document.getElementById("profileImg");

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
                <div class="profile-icon" ID="profileIcon" runat="server">
                    <a href="./profile.aspx"><img src="./profile_image/profile_photo.svg" alt="profile photo"/></a>
                </div>
                <div class="nav-items">
                    <a class="nav-item" href="./">home</a>
                    <a class="nav-item" href="./attendance.aspx">attendance</a>
                    <a class="nav-item" href="./students.aspx">students</a>
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
            <p class="teamwork">teamwork : <a href="https://behance.net/sajjad_hasan" target="_blanck">sajjad hasan</a>, sajjad abdul-munim, sumaya muhammed</p>
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

// Add active class to the current button in FILTER BAR (highlight it)
if (document.title==="Students" || document.title==="Attendance") {
    let sortItems = document.querySelectorAll(".sortCon>label"),
        groupChecks = document.querySelectorAll(".groupCon>label"),
        statusChecks = document.querySelectorAll(".statusCon>label");

    //sortItems.forEach(item => {
    //    item.addEventListener('click', function () {
    //    //    sortItems.forEach(btn => btn.classList.remove('active-btn'));
    //    //    this.classList.add('active-btn');
    //        if (item.querySelector("input").checkValidity())
    //            this.classList.add('active-btn')
    //        else this.classList.remove('active-btn')
    //    });

    //});

    document.onload = () => {
        sortItems.forEach(item => {
            if (item.querySelector("input").checkValidity())
                this.classList.add('active-btn')
            else this.classList.remove('active-btn')
        });

        groupChecks.forEach(btn => {
                gBtn = btn.querySelector("input")
            if (gBtn.checkValidity()) btn.classList.add('active-btn')
                else btn.classList.remove('active-btn')
        })
    }

    //groupChecks.forEach(btn => {
    //    btn.addEventListener('click', function () {
    //        gBtn = btn.querySelector("input")
    //        if (gBtn.checked) btn.classList.add('active-btn')
    //        else btn.classList.remove('active-btn')
    //    })
    //})

    //statusChecks.forEach(btn => {
    //    btn.addEventListener('click', function () {
    //        let classN = btn.innerText;
    //        gBtn = btn.querySelector("input")
    //        if (gBtn.checked) btn.classList.add(classN)
    //        else btn.classList.remove(classN)
    //    })
    //})
}

//  STUDENT'S PUP UP    
if (document.title==="Students") {
    const students = document.getElementsByTagName('tr'),
        closeIcon = document.querySelector(".modal-close"),
        modalBg = document.querySelector(".modal-bg");

    for (let i = 0; i < students.length; i++) {
        const std = students[i];
        std.onclick = () => {modalBg.classList.remove("hide-control")}
    }
        closeIcon.onclick = () => {modalBg.classList.add("hide-control")}
}

// Display Student Table & Filter Bar OR Hide 
//if (document.title==="Attendance") {
//    let StartLecBtn = document.getElementById("startLecBtn"),
//        SaveTableBtn = document.getElementById("saveTableBtn"),
//        FilterBar = document.querySelector(".filter-bar"),
//        StdTable = document.querySelector(".table-container"),
//        AddLec = document.querySelector(".add-lecture");
    
//    StartLecBtn.onclick=()=>{StdTable.classList.remove("hide-control");FilterBar.classList.remove("hide-control");AddLec.classList.add("hide-control")}
//    SaveTableBtn.onclick=()=>{StdTable.classList.add("hide-control");FilterBar.classList.add("hide-control");AddLec.classList.remove("hide-control")}
//}

// UPLOAD PHOTO NAME
if (document.title==="Signup"  || document.title==="Profile") {
    let input = document.getElementById("photoUp");
    let imageName = document.getElementById("imageName");

    input.addEventListener("change", ()=>{
        imageName.innerText = input.files[0].name;
    })
}

// EDIT PROFILE & SAVE & LOG OUT
//if (document.title==="Profile") {
//    let EditBtn = document.getElementById("editProfileBtn"),
//        SaveEditBtn = document.getElementById("saveProfileBtn"),
//        editProfileSec = document.querySelector(".edit-sec");
    
//    EditBtn.onclick=()=>{editProfileSec.classList.remove("hide-control")}
//    SaveEditBtn.onclick=()=>{editProfileSec.classList.add("hide-control")}
//}
