/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-17
 * @description 
 */

import { loadTemplate } from "../../../utils/load-templates";
import { closeDialogs } from "./close-dialogs";

import { createToastNotification } from "../toasts/toast-notification";

import { type CardQuestion } from "../../models/card-question.model";
import { type CardReservation } from "../../models/card-reservation.model";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
async function handleArchive(overlay: HTMLElement, request: CardQuestion | CardReservation) {
    closeDialogs(overlay);

    //todo FETCH API PATCH, if success or error will be passed a parameter which show the corrispettive toast
    if (Math.random() < 0.5) {
        createToastNotification("Richiesta archiviata con successo!", "success");
    } else {
        createToastNotification("Errore archiviazione richiesta!", "error");
    }
}


// ***-------------------------------------------------------------------------


/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export async function archiveCardDialog(overlay: HTMLElement, request: CardQuestion | CardReservation, event: Event) {

    // avoid the propagation of the event to the card container event listener openModal
    event.stopPropagation();

    // show the overlay behind the dialog and stop the scroll on page
    overlay.style.display = "block";
    document.body.classList.add("hidden");

    await loadTemplate("/src/global/templates/dialogs/dialog-archive.html");
    const dialogArchive = document.querySelector(".dialogArchiveCard") as HTMLElement;


    // Gestisci il pulsante "Conferma"
    dialogArchive.querySelector(".confirm")?.addEventListener("click", () => { handleArchive(overlay, request); })

    // Gestisci il pulsante "Annulla"
    dialogArchive.querySelector(".cancel")?.addEventListener("click", () => { closeDialogs(overlay); })
}