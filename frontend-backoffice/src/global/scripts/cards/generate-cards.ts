/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-05
 * @description 
 */

import { createCardQuestion } from "./create-card-question";
import { createCardReservation } from "./create-card-reservation";

import { openDialogs } from "../dialogs/open-dialogs";

import { type CardQuestion } from "../../../models/card-question.model";
import { type CardReservation } from "../../../models/card-reservation.model";
import { deleteCard } from "../dialogs/dialog-delete";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function generateCards(
    data: (CardQuestion | CardReservation)[],
    questionTemplate?: HTMLTemplateElement,
    reservationTemplate?: HTMLTemplateElement,
    dialogQuestion?: HTMLElement,
    dialogReservation?: HTMLElement,
): void {

    // list which will be filled whit the cards
    const listRequests = document.querySelector("section#requests") as HTMLElement;

    // take from the DOM the overlay which cover all the page whit a black nurse when cards are clicked
    const overlay = document.querySelector(".overlay") as HTMLElement;


    data.forEach((request) => {

        // check of the request if it is question || reservation from the properities! using: "in"
        // also say to typescript the type of the request using: "as"
        if ("question" in request && questionTemplate && dialogQuestion) {
            const cardQuestion = createCardQuestion(request as CardQuestion, questionTemplate);
            // add events on card question
            openDialogs(overlay, cardQuestion, dialogQuestion, request);
            deleteCard(cardQuestion, request);
            listRequests.appendChild(cardQuestion);

        } else if ("status" in request && reservationTemplate && dialogReservation) {
            const cardReservation = createCardReservation(request as CardReservation, reservationTemplate);
            // add events on card reservations
            openDialogs(overlay, cardReservation, dialogReservation, request);
            deleteCard(cardReservation, request);
            listRequests.appendChild(cardReservation);
        }

    });
} 