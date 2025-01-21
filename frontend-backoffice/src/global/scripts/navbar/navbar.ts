/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-21
 * @description 
 */

// get form the DOM the sidebar element and the expand navbarphone for the mobile devices
const sideBar = document.querySelector("nav#sidebar");
const toggleBtn = document.querySelector(".toggleBtn");
let isExpanded: boolean = false;

// event on the icon which on click will expand the navbar adding a .class
toggleBtn?.addEventListener("click", () => {
    if (isExpanded) {
        sideBar?.classList.remove("expanded");
        isExpanded = false;
    } else {
        sideBar?.classList.add("expanded");
        isExpanded = true;
    }
});

// -------------------------------------------

// get from the DOM the logout button which will kill the token* and will be render in the login page
const logoutBtn = document.querySelector(".logoutSection");

logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("authToken");
});