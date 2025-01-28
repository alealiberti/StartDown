/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-17
 * @description contains functions to handle archiving dialogs for requests or reservations
 */

import { loadTemplate } from "../../../utils/load-templates";
import { closeDialogs } from "./close-dialogs";
import { archiveRequest } from "../../../services/archive-request.api";
import { createToastNotification } from "../toasts/toast-notification";

import { type CardQuestion } from "../../models/card-question.model";
import { type CardReservation } from "../../models/card-reservation.model";



/**
 * handles the archiving of a request or reservation
 * @param {HTMLElement} overlay - the overlay element to be displayed during the process
 * @param {CardQuestion | CardReservation} request - the request or reservation to be archived
 * @returns {Promise<void>} - returns a promise that resolves when the archiving process is complete
 */
async function handleArchive(overlay: HTMLElement, request: CardQuestion | CardReservation): Promise<void> {

    // closes the archiving dialog when the confirm button is clicked
    closeDialogs(overlay);

    // determine the endpoint for archiving the request based on its type
    const endpoint =
        "text" in request
            ? "http://localhost:8080/cascina-caccia/informations/update-information"
            : "http://localhost:8080/cascina-caccia/reservations/update-reservation";

    // call the "archiveRequest" function to authenticate the user through PUT FETCH, passing the endpoint and request
    try {
        await archiveRequest(endpoint, request);

        // show a success toast message when the PUT request completes
        createToastNotification("Richiesta archiviata con successo!", "success");
        setTimeout(() => {
            location.reload();
        }, 2000);

    } catch (err) {
        // show on error a toast message when the PUT request fail!
        createToastNotification(err.message, "error");
    }
}


/**
 * opens the archive dialog and handles the actions for archiving a request or reservation
 * @param {HTMLElement} overlay - the overlay element to be displayed behind the dialog
 * @param {CardQuestion | CardReservation} request - the request or reservation to be archived
 * @param {Event} event - the event triggered by the archive action
 * @returns {Promise<void>} - returns a promise that resolves when the dialog is set up
 */
export async function archiveCardDialog(overlay: HTMLElement, request: CardQuestion | CardReservation, event: Event): Promise<void> {

    // prevent the event from propagating to the card container event listener
    event.stopPropagation();

    // display the overlay behind the dialog and prevent scrolling on the page
    overlay.style.display = "block";
    document.body.classList.add("hidden");

    await loadTemplate("/src/global/templates/dialogs/dialog-archive.html");
    const dialogArchive = document.querySelector(".dialogArchiveCard") as HTMLElement;

    // handle the "Confirm" button
    dialogArchive.querySelector(".confirm")?.addEventListener("click", () => {
        handleArchive(overlay, request);
    });

    // handle the "Cancel" button
    dialogArchive.querySelector(".cancel")?.addEventListener("click", () => {
        closeDialogs(overlay);
    });
}