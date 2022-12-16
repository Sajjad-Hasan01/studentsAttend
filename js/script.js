class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <nav>
                <div class="logo-icon">
                    <img src="" alt="website logo">
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
            <p class="teamwork">teamwork : sajjad hasan, sajjad adbulmoniem, sumaya muhammed</p>
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

// Add active class to the current button in filter bar (highlight it)
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


//  STUDENT'S PUP UP    

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

// UPLOAD PHOTO NAME
let input = document.getElementById("upPhoto");
let imageName = document.getElementById("imageName");

input.addEventListener("change", ()=>{
    imageName.innerText = input.files[0].name;
})