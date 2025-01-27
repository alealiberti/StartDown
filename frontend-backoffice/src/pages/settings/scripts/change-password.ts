/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-27
 * @description 
 */

import { closeDialogs } from "../../../global/scripts/dialogs/close-dialogs";
import { createToastNotification } from "../../../global/scripts/toasts/toast-notification";
import { updatePassword } from "../../../services/update-password.api";





/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function changePassword(overlay: HTMLElement, dialogChangePassword: HTMLElement) {

    // show the overlay on the display and disable the scroll
    overlay.style.display = "block";
    document.body.classList.add("hidden");

    /* 
    *on submit of the dialog form change password, will be checked the inputs and if there are correct,
    *will be sent an API PUT for modified the actual password whit a newest
    */
    dialogChangePassword.querySelector("form")?.addEventListener("submit", async (event) => {

        // prevent the event of the form action
        event.preventDefault();

        // take from the DOM the inputs of passwords
        const oldPassword = (dialogChangePassword.querySelector("input.oldPassword") as HTMLInputElement).value.trim();
        const newPassword = (dialogChangePassword.querySelector("input.newPassword") as HTMLInputElement).value.trim();
        const repeatNewPassword = (dialogChangePassword.querySelector("input.repeatNewPassword") as HTMLInputElement).value.trim();

        // --------------------------------------------

        // block the submit of login if the inputs form fields are empty and show an alert of recall
        if (!oldPassword || !newPassword || !repeatNewPassword) {
            alert("compila i campi di input!");
            return;
        }
        // block the submit of change password if "newPassword" and "repeatNewPassword" are different
        if (newPassword !== repeatNewPassword) {
            alert("le password devono combacire!");
            return;
        }

        // --------------------------------------------

        // change the text inside the button whit "attendi..."
        const submitButton = dialogChangePassword.querySelector("button[type='submit']") as HTMLElement;
        submitButton.textContent = "Attendere...";

        try {
            // call the "updatePassword" function for change the user password trough PUT FETCH and replace it whit the newest
            await updatePassword("http://localhost:8080/cascina-caccia/users/change-password",
                oldPassword, newPassword
            );

            // on success, show a toast of positive result whit the change API of password
            closeDialogs(overlay);
            createToastNotification("Password cambiara con successo", "success");
            // after a minimum delay, render the user into the login page whit the new password changed!
            setTimeout(() => {
                window.location.href = "/index.html";
            }, 2000);

        } catch (err) {
            // in case is throwed an error, will appear a toast which show the error on try to change password
            createToastNotification(err as string, "error");

        } finally {
            submitButton.textContent = "Conferma password"; // will turn back to the default text
        }
    });
}