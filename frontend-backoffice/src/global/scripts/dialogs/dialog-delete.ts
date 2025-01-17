/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-17
 * @description 
 */


import { type CardQuestion } from "../../../models/card-question.model";
import { type CardReservation } from "../../../models/card-reservation.model";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function deleteCard(cardORmodal: HTMLElement, request: CardQuestion | CardReservation) {

    cardORmodal.querySelector(".actions .trash")?.addEventListener("click", (event) => {

        // avoid the propagation of the event to the card container event listener openModal
        event.stopPropagation();

        // TODO implement DELETE API
        console.log("cancellato!");
        console.log(request.name)
    });
}