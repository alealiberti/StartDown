/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-27
 * @description function to handle password change process
 */

import { closeDialogs } from "../../../global/scripts/dialogs/close-dialogs";
import { createToastNotification } from "../../../global/scripts/toasts/toast-notification";
import { updatePassword } from "../../../services/update-password.api";



/**
 * function to handle the password change process
 * @param {HTMLElement} overlay - the overlay element to show when changing password
 * @param {HTMLElement} dialogChangePassword - the dialog element for changing password
 * @returns {void}
 */
export function changePassword(overlay: HTMLElement, dialogChangePassword: HTMLElement) {

    // show the overlay on the display and disable the scroll
    overlay.style.display = "block";
    document.body.classList.add("hidden");

    /* 
    * on submit of the dialog form change password, will be checked the inputs and if they are correct,
    * will be sent an API PUT to modify the actual password with a new one
    */
    dialogChangePassword.querySelector("form")?.addEventListener("submit", async (event) => {

        // prevent the event of the form action
        event.preventDefault();

        // take from the DOM the inputs of passwords
        const oldPassword = (dialogChangePassword.querySelector("input.oldPassword") as HTMLInputElement).value.trim();
        const newPassword = (dialogChangePassword.querySelector("input.newPassword") as HTMLInputElement).value.trim();
        const repeatNewPassword = (dialogChangePassword.querySelector("input.repeatNewPassword") as HTMLInputElement).value.trim();

        // --------------------------------------------

        // block the submit if the inputs are empty and show an alert
        if (!oldPassword || !newPassword || !repeatNewPassword) {
            alert("compila i campi di input");
            return;
        }
        // block the submit if "newPassword" and "repeatNewPassword" are different
        if (newPassword !== repeatNewPassword) {
            alert("le password devono combacire");
            return;
        }

        // --------------------------------------------

        // change the text inside the button to "attendi..."
        const submitButton = dialogChangePassword.querySelector("button[type='submit']") as HTMLElement;
        submitButton.textContent = "Attendere...";

        try {
            // call the "updatePassword" function to change the password through PUT request
            await updatePassword("http://localhost:8080/cascina-caccia/users/change-password", oldPassword, newPassword);

            // on success, show a toast of success
            closeDialogs(overlay);
            createToastNotification("Password cambiata con successo", "success");
            // after a delay, redirect to login page
            setTimeout(() => {
                window.location.href = "/index.html";
            }, 2000);

        } catch (err) {
            // in case of error, show a toast with the error message
            createToastNotification(err as string, "error");

        } finally {
            submitButton.textContent = "Conferma password"; // reset button text to default
        }
    });
}