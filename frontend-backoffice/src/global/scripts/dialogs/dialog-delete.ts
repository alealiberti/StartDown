/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-17
 * @description 
 */

import { type CardQuestion } from "../../models/card-question.model";
import { type CardReservation } from "../../models/card-reservation.model";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function deleteCard(
    overlay: HTMLElement,
    cardORmodal: HTMLElement,
    dialogDelete: HTMLElement,
    request: CardQuestion | CardReservation
): void {


    /**
     * Nome della funzione
     * Descrizione della funzione
     * @param {TipoInput1} NomeInput1 - DescrizioneInput1
     * @param {TipoInput2} NomeInput2 - DescrizioneInput2
     * @returns {TipoOutput} - DescrizioneOutput
     */
    function removeEventListeners(): void {
        dialogDelete.querySelector(".dialogActions .confirmDelete")?.removeEventListener("click", handleDelete);
        dialogDelete.querySelector(".dialogActions .cancelDelete")?.removeEventListener("click", handleCancel);
        overlay.removeEventListener("click", handleCancel);
    }


    // ----------------------------------------------------------------


    /**
    * Nome della funzione
    * Descrizione della funzione
    * @param {TipoInput1} NomeInput1 - DescrizioneInput1
    * @param {TipoInput2} NomeInput2 - DescrizioneInput2
    * @returns {TipoOutput} - DescrizioneOutput
    */
    function handleDelete(): void {
        console.log(`Hai cancellato la richiesta di: ${request.name}`);
        overlay.style.display = "none";
        dialogDelete.style.display = "none";
        document.body.classList.remove("hidden");

        // remove all associated events listener to prevent event listener reset
        removeEventListeners();
    }


    /**
     * Nome della funzione
     * Descrizione della funzione
     * @param {TipoInput1} NomeInput1 - DescrizioneInput1
     * @param {TipoInput2} NomeInput2 - DescrizioneInput2
     * @returns {TipoOutput} - DescrizioneOutput
     */
    function handleCancel(): void {
        console.log(`Rifiutata dati di: ${request.name}`);
        overlay.style.display = "none";
        dialogDelete.style.display = "none";
        document.body.classList.remove("hidden");

        // remove all associated events listener to prevent event listener reset
        removeEventListeners();
    }


    /**
     * Nome della funzione
     * Descrizione della funzione
     * @param {TipoInput1} NomeInput1 - DescrizioneInput1
     * @param {TipoInput2} NomeInput2 - DescrizioneInput2
     * @returns {TipoOutput} - DescrizioneOutput
     */
    function handleClick(event: Event): void {

        // avoid the propagation of the event to the card container event listener openModal
        event.stopPropagation();

        // show the overlay behind the dialog and stop the scroll on page, show the dialog for confirm or reject the delete of the card
        overlay.style.display = "block";
        dialogDelete.style.display = "flex";
        document.body.classList.add("hidden");

        // if the button comes from a modal, close the modal
        if (cardORmodal.classList.contains("dialogQuestion") || cardORmodal.classList.contains("dialogReservation")) {
            cardORmodal.style.display = "none";
            cardORmodal.querySelector(".actions .trash")?.removeEventListener("click", handleClick); // remove also the event listener on the opened dialog
        }

        // added event listeners for confirmation and cancellation of the request, a FETCH API DELETE of the request
        dialogDelete.querySelector(".dialogActions .confirmDelete")?.addEventListener("click", handleDelete);
        dialogDelete.querySelector(".dialogActions .cancelDelete")?.addEventListener("click", handleCancel);

        // added event listener on the overlay for close all like the cancel button
        overlay.addEventListener("click", handleCancel);
    }



    // ---------------------------------------------------------



    // event on the card preview || dialog of request, when is clicked the trash button will show the dialog of delete of the request selected
    cardORmodal.querySelector(".actions .trash")?.addEventListener("click", handleClick);

}