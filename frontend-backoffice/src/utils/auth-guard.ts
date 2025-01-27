/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-15
 * @description handles the authorization guard to check if the user is authenticated
 */



// test routing if the cookies or local storage is not set: http://localhost:3000/src/pages/dashboard/index.html

/**
 * function to check if the user is authenticated
 * @returns {void} - redirects the user to the login page if no token is found
 */
export function authGuard(): void {

    const token = localStorage.getItem("authToken");

    // if token is not set in local storage (bypass login), redirect the user to the login page
    if (!token) {
        window.location.href = "/index.html";
    }
}