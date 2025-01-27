/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-20
 * @description 
 */

import { createToastNotification } from "../global/scripts/toasts/toast-notification";
import { loginAuth } from "../services/login-auth.api";




document.querySelector("form")?.addEventListener("submit", async (event) => {

    // prevent the event of the form action
    event.preventDefault();

    // take from the DOM the email && password input at the moment when form is subbmitted
    const usernameInput = (document.querySelector("input.username") as HTMLInputElement).value.trim();
    const passwordInput = (document.querySelector("input.password") as HTMLInputElement).value.trim();

    // block the submit of login if the inputs form fields are empty and show an alert of recall
    if (!usernameInput || !passwordInput) {
        alert("compila i campi di input!");
        return;
    }

    // change the text inside the button whit "attendi..."
    const submitButton = document.querySelector("button[type='submit']") as HTMLElement;
    submitButton.textContent = "Attendere...";


    try {
        // call the "loginAuth" function to authenticate the user trough POST FETCH and get the token of admin
        const response = await loginAuth(usernameInput, passwordInput, "http://localhost:8080/auth/login");
        console.log(`credenziali giuste ecco il tuo token:${response.token}`);

        // save the token of the admin into the localStorage and redner him into the dashboard
        localStorage.setItem("authToken", response.token);
        window.location.href = "/src/pages/dashboard/index.html";

    } catch (err) {
        // in case is throwed an error, will appear a toast which show the error on the try of log in into backoffice
        console.log(err);
        createToastNotification(err as string, "error");

    } finally {
        submitButton.textContent = "Log in"; // will turn back to the default text
    }
});