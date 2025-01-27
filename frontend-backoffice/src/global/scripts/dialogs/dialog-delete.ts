/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-17
 * @description 
 */

import { loadTemplate } from "../../../utils/load-templates";
import { closeDialogs } from "./close-dialogs";

import { deleteRequest } from "../../../services/delete-request.api";
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
async function handleDelete(overlay: HTMLElement, request: CardQuestion | CardReservation) {

    // close all the dialog of elimination when confirm button is clicked
    closeDialogs(overlay);

    // this endpoint will contain the path of question/reservation delete, based on the type of the request
    const endpoint =
        "text" in request
            ? "http://localhost:8080/cascina-caccia/informations/delete-information"
            : "http://localhost:8080/cascina-caccia/reservations/delete-reservation"

    // call the "deleteRequest" function to authenticate the user trough DELETE FETCH, pass the path and the id of the request
    try {
        await deleteRequest(endpoint, request.id);

        // when fetch DELETE is completed, will appear a toast of message whit positive success
        createToastNotification("Richiesta cancellata con successo!", "success");
        setTimeout(() => {
            location.reload();
        }, 2000);

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
export async function deleteCardDialog(overlay: HTMLElement, request: CardQuestion | CardReservation, event: Event) {

    // avoid the propagation of the event to the card container event listener openModal
    event.stopPropagation();

    // show the overlay behind the dialog and stop the scroll on page
    overlay.style.display = "block";
    document.body.classList.add("hidden");

    await loadTemplate("/src/global/templates/dialogs/dialog-delete.html");
    const dialogDelete = document.querySelector(".dialogDeleteCard") as HTMLElement;


    // Gestisci il pulsante "Conferma"
    dialogDelete.querySelector(".confirm")?.addEventListener("click", () => {
        handleDelete(overlay, request);
    });

    // Gestisci il pulsante "Annulla"
    dialogDelete.querySelector(".cancel")?.addEventListener("click", () => {
        closeDialogs(overlay);
    });

}