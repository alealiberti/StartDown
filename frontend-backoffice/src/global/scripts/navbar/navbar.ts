/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-21
 * @description contains logic for expanding the sidebar and handling user logout
 */

// get the sidebar element and the toggle button for mobile devices from the DOM
const sideBar = document.querySelector("nav#sidebar");
const toggleBtn = document.querySelector(".toggleBtn");
let isExpanded: boolean = false;

// event listener for the icon which, on click, will expand the sidebar by adding a .expanded class
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

// get the logout button from the DOM, which will remove the authentication token and redirect to the login page
const logoutBtn = document.querySelector(".logoutSection");

// event listener for the logout button, which will remove the auth token from localStorage
logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("authToken");
});
