/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-17
 * @description contains the functions to handle deletion dialogs for requests or reservations
 */

import { loadTemplate } from "../../../utils/load-templates";
import { closeDialogs } from "./close-dialogs";
import { deleteRequest } from "../../../services/delete-request.api";
import { createToastNotification } from "../toasts/toast-notification";

import { type CardQuestion } from "../../models/card-question.model";
import { type CardReservation } from "../../models/card-reservation.model";



/**
 * handles the deletion of a request or reservation
 * @param {HTMLElement} overlay - the overlay element to be displayed during the process
 * @param {CardQuestion | CardReservation} request - the request or reservation to be deleted
 * @returns {Promise<void>} - returns a promise that resolves when the deletion process is complete
 */
async function handleDelete(overlay: HTMLElement, request: CardQuestion | CardReservation): Promise<void> {

    // closes the deletion dialog when the confirm button is clicked
    closeDialogs(overlay);

    // determine the endpoint for deleting the request based on its type
    const endpoint =
        "text" in request
            ? "http://localhost:8080/cascina-caccia/informations/delete-information"
            : "http://localhost:8080/cascina-caccia/reservations/delete-reservation";

    // call the "deleteRequest" function to authenticate the user through DELETE FETCH, passing the endpoint and request ID
    try {
        await deleteRequest(endpoint, request.id);

        // show a success toast message when the DELETE request completes
        createToastNotification("Richiesta cancellata con successo!", "success");
        setTimeout(() => {
            location.reload();
        }, 2000);

    } catch (err) {
        // show on error a toast message when the DELETE request fail!
        createToastNotification(err.message, "error");
    }
}


/**
 * opens the delete dialog and handles the actions for deleting a request or reservation
 * @param {HTMLElement} overlay - the overlay element to be displayed behind the dialog
 * @param {CardQuestion | CardReservation} request - the request or reservation to be deleted
 * @param {Event} event - the event triggered by the delete action
 * @returns {Promise<void>} - returns a promise that resolves when the dialog is set up
 */
export async function deleteCardDialog(overlay: HTMLElement, request: CardQuestion | CardReservation, event: Event): Promise<void> {

    // prevent the event from propagating to the card container event listener
    event.stopPropagation();

    // display the overlay behind the dialog and prevent scrolling on the page
    overlay.style.display = "block";
    document.body.classList.add("hidden");

    await loadTemplate("/src/global/templates/dialogs/dialog-delete.html");
    const dialogDelete = document.querySelector(".dialogDeleteCard") as HTMLElement;

    // handle the "Confirm" button
    dialogDelete.querySelector(".confirm")?.addEventListener("click", () => {
        handleDelete(overlay, request);
    });

    // handle the "Cancel" button
    dialogDelete.querySelector(".cancel")?.addEventListener("click", () => {
        closeDialogs(overlay);
    });
}