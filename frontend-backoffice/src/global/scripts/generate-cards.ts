/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-05
 * @description 
 */

import { createCardQuestion } from "./cards/create-card-question";
import { createCardReservation } from "./cards/create-card-reservation";

import { openDialogs } from "./dialogs/open-dialogs";

import { type CardQuestion } from "../models/card-question.model";
import { type CardReservation } from "../models/card-reservation.model";




/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function generateCards(
    datas: (CardQuestion | CardReservation)[],
    questionTemplate?: HTMLTemplateElement,
    reservationTemplate?: HTMLTemplateElement,
    dialogQuestion?: HTMLElement,
    dialogReservation?: HTMLElement,
): void {

    // list which will be filled whit the cards whit questions/reservations
    const listRequests = document.querySelector("section#requests") as HTMLElement;

    datas.forEach((request) => {

        // check of the request if it is question || reservation from the properities! using: "in"
        // also say to typescript the type of the request using: "as"
        if ("question" in request && questionTemplate && dialogQuestion) {
            const cardQuestion = createCardQuestion(request, questionTemplate);
            listRequests.appendChild(cardQuestion);
            // add events on card question
            openDialogs(cardQuestion, dialogQuestion, request);

        } else if ("status" in request && reservationTemplate && dialogReservation) {
            const cardReservation = createCardReservation(request, reservationTemplate);
            listRequests.appendChild(cardReservation);
            // add events on card reservations
            openDialogs(cardReservation, dialogReservation, request);
        }

    });
} 