/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-16
 * @description 
 */

import { loadTemplate } from "../../../utils/load-templates.ts"; // will be used again for load the templates of dialogs on pages interactions

import { createDialogQuestion } from "./dialog-card-question.ts";
import { createDialogReservation } from "./dialog-card-reservation.ts";

import { closeDialogs } from "./close-dialogs.ts";
import { deleteCardDialog } from "./dialog-delete.ts";
import { archiveCardDialog } from "./dialog-archive.ts";

import { type CardQuestion } from "../../models/card-question.model";
import { type CardReservation } from "../../models/card-reservation.model";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function openDialogs(card: HTMLElement, request: CardQuestion | CardReservation): void {

    // take from the DOM the overlay which will cover all the pages and block interaction whit all elements
    const overlay = document.querySelector(".overlay") as HTMLElement;

    // if click on the overlay will close all the dialogs opened
    overlay.addEventListener("click", () => closeDialogs(overlay));

    // ---------------------------------------------------------------------

    // events which on click will be showed a dialog of question/reservation based on the request parameter
    card.addEventListener("click", async () => {

        // initially null, will be replace by the dialog element created/loaded on the DOM after click
        let dialog: HTMLElement | null = null;

        if ("text" in request) {
            await loadTemplate("/src/global/templates/dialogs/dialog-card-question.html");
            dialog = document.querySelector(".dialogQuestion") as HTMLElement;
            createDialogQuestion(overlay, dialog, request);

        } else if ("status" in request) {
            await loadTemplate("/src/global/templates/dialogs/dialog-card-reservation.html");
            dialog = document.querySelector(".dialogReservation") as HTMLElement;
            createDialogReservation(overlay, dialog, request);
        }

        // if dialog is correctly created, will be showed the overlay and stop the scroll on the page while it is opened
        if (dialog) {
            overlay.style.display = "block";
            document.body.classList.add("hidden"); // will disable the scroll through style 
        }
    });

    // -----------------------------------------------------------

    // event to open the elimination dialog directly by the card preview
    card.querySelector(".actions .trash")?.addEventListener("click", (event) => deleteCardDialog(overlay, request, event));

    // event to open the archivation dialog directly by the card preview
    card.querySelector(".actions .archive")?.addEventListener("click", (event) => archiveCardDialog(overlay, request, event));

    // -----------------------------------------------------------
}