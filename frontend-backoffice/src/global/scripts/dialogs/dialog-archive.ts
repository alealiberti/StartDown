/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-17
 * @description 
 */

import { loadTemplate } from "../../../utils/load-templates";
import { closeDialogs } from "./close-dialogs";

import { archiveRequest } from "../../../services/archive-request.api";
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

    // close all the dialog of archivation when confirm button is clicked
    closeDialogs(overlay);

    // this endpoint will contain the path of question/reservation archive, based on the type of the request
    const endpoint =
        "text" in request
            ? "http://localhost:8080/cascina-caccia/informations/update-information"
            : "http://localhost:8080/cascina-caccia/reservations/update-reservation"

    // call the "archiveRequest" function to authenticate the user trough PUT FETCH, pass the path and the request
    try {
        await archiveRequest(endpoint, request);
        console.log(`richiesta di ${request.name} archiviata con successo!`);
        // when fetch PUT is completed, will appear a toast of message whit positive success
        createToastNotification("Richiesta archiviata con successo!", "success");
        setTimeout(() => {
            location.reload();
        }, 2000)

    } catch (err) {
        createToastNotification(err.message, "error");
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