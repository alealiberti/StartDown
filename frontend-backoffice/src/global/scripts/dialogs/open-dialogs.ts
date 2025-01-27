/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-16
 * @description script to handle opening dialogs for questions and reservations
 */

import { loadTemplate } from "../../../utils/load-templates.ts"; // utility to load dialog templates dynamically
import { createDialogQuestion } from "./dialog-card-question.ts";
import { createDialogReservation } from "./dialog-card-reservation.ts";
import { closeDialogs } from "./close-dialogs.ts";
import { deleteCardDialog } from "./dialog-delete.ts";
import { archiveCardDialog } from "./dialog-archive.ts";

import { type CardQuestion } from "../../models/card-question.model";
import { type CardReservation } from "../../models/card-reservation.model";



/**
 * opens dialogs based on user interactions with question or reservation cards
 * @param {HTMLElement} card - the card element associated with the dialog
 * @param {CardQuestion | CardReservation} request - the question or reservation object tied to the card
 * @returns {void}
 */
export function openDialogs(card: HTMLElement, request: CardQuestion | CardReservation): void {

    // get the overlay element used to block interaction with the page while a dialog is open
    const overlay = document.querySelector(".overlay") as HTMLElement;

    // attach event to overlay to close all dialogs when clicked
    overlay.addEventListener("click", () => closeDialogs(overlay));

    // ---------------------------------------------------------------------

    // add click event to card to show the respective dialog based on the request type
    card.addEventListener("click", async () => {

        // initially null, will be replaced by the dialog element created or loaded dynamically
        let dialog: HTMLElement | null = null;

        // check if the request is a question and load the corresponding dialog template
        if ("text" in request) {
            await loadTemplate("/src/global/templates/dialogs/dialog-card-question.html");
            dialog = document.querySelector(".dialogQuestion") as HTMLElement;
            createDialogQuestion(overlay, dialog, request);

            // check if the request is a reservation and load the corresponding dialog template
        } else if ("status" in request) {
            await loadTemplate("/src/global/templates/dialogs/dialog-card-reservation.html");
            dialog = document.querySelector(".dialogReservation") as HTMLElement;
            createDialogReservation(overlay, dialog, request);
        }

        // if dialog is created successfully, display the overlay and disable page scrolling
        if (dialog) {
            overlay.style.display = "block";
            document.body.classList.add("hidden"); // disables page scroll while dialog is open
        }
    });

    // -----------------------------------------------------------

    // add event to open the delete confirmation dialog when the trash icon is clicked
    card.querySelector(".actions .trash")?.addEventListener("click", (event) => deleteCardDialog(overlay, request, event));

    // add event to open the archive confirmation dialog when the archive icon is clicked
    card.querySelector(".actions .archive")?.addEventListener("click", (event) => archiveCardDialog(overlay, request, event));

}