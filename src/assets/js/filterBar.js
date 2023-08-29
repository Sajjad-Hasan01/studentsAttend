let sortItems = document.querySelectorAll(".filter-bar>.sortCon>label");
let groupChecks = document.querySelectorAll(".filter-bar>.groupCon>label");
let statusChecks = document.querySelectorAll(".filter-bar>.statusCon>label");

sortItems.forEach(item => {
    item.addEventListener('click', function () {
        if (this.querySelector("input").checked){
            sortItems.forEach((btn) => btn.classList.remove("active-btn"));
            this.classList.add('active-btn');
            // this.getAttribute('value')==='nameASC' ? students.sort(nameASC) : students.sort(nameDESC);
        }
        // stdView();
        // showModal();
    });
});

groupChecks.forEach((btn) => {
    btn.addEventListener('click', function () {
        if (btn.querySelector("input").checked) btn.classList.add("active-btn");
        else btn.classList.remove("active-btn");
        // stdView();
        // showModal();
    });
});
statusChecks.forEach((btn) => {
    btn.addEventListener('click', function () {
        let classN = btn.innerText;
        if (btn.querySelector("input").checked) btn.classList.add(classN);
        else btn.classList.remove(classN);
        // stdView();
        // showModal();
    });
});

// stdView();
// showModal();