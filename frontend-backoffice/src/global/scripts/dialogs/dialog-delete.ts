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
export function deleteCard(overlay: HTMLElement, cardORmodal: HTMLElement, request: CardQuestion | CardReservation) {

    cardORmodal.querySelector(".actions .trash")?.addEventListener("click", (event) => {

        // show the overlay behind the dialog
        overlay.style.display = "block";

        // if the element which on click trash button is modal of question/reservation will close it and show only the dialog of delete
        if (cardORmodal.classList.contains("dialogQuestion") || cardORmodal.classList.contains("dialogReservation")) {
            cardORmodal.style.display = "none";
        }

        // avoid the propagation of the event to the card container event listener openModal
        event.stopPropagation();


        // TODO implement DELETE API
        console.log("cancellato!");
        console.log(request.name)
    });
}