const sideBar = document.querySelector("nav#sidebar");
const toggleBtn = document.querySelector("div.toggleBtn ion-icon");
let isExpanded: boolean = false;

toggleBtn?.addEventListener("click", () => {
    if (isExpanded) {
        sideBar?.classList.remove("expanded");
        isExpanded = false;
    } else {
        sideBar?.classList.add("expanded");
        isExpanded = true;
    }

});