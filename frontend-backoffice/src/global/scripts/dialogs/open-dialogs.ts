/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-16
 * @description 
 */


import { createQuestionDialog } from "./dialog-card-question";
import { createReservationDialog } from "./dialog-card-reservation";

import { type CardQuestion } from "../../models/card-question.model";
import { type CardReservation } from "../../models/card-reservation.model";




/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function openDialogs(overlay: HTMLElement, card: HTMLElement, modal: HTMLElement, request: CardQuestion | CardReservation): void {

    // add events listener on the cards (question/reservation) when are clicked show the OVERLAY + MODAL
    card.addEventListener("click", () => {
        overlay.style.display = "block";
        modal.style.display = "flex";

        if ("question" in request) {
            createQuestionDialog(overlay, modal, request)
        } else if ("status" in request) {
            createReservationDialog(overlay, modal, request)
        }
    });


    // add events listener on the OVERLAY when is visibile trough the click on the cards, a click outside it will close it an the modal
    overlay.addEventListener("click", () => {
        overlay.style.display = "none";
        modal.style.display = "none";
    });
}