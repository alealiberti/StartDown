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
): void {

    // list which will be filled whit the cards whit questions/reservations
    const listRequests = document.querySelector("section#requests") as HTMLElement;

    datas.forEach((request) => {

        // inital value of the card
        let card: HTMLElement | null = null;

        /* check of the request if it is a question || reservation from the properties using: "in"
        also say to typescript the type of the request using: "as" */
        if ("text" in request && questionTemplate) {
            card = createCardQuestion(request, questionTemplate);
        } else if ("status" in request && reservationTemplate) {
            card = createCardReservation(request, reservationTemplate);
        }

        // if card is created correctly, will be appended on the list of main page and add the events on it
        if (card) {
            listRequests.appendChild(card);
            openDialogs(card, request);
        }

    });
} 