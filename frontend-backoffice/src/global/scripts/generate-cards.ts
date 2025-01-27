/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-05
 * @description script to generate question and reservation cards and append them to the main list
 */

import { createCardQuestion } from "./cards/create-card-question";
import { createCardReservation } from "./cards/create-card-reservation";
import { openDialogs } from "./dialogs/open-dialogs";

import { type CardQuestion } from "../models/card-question.model";
import { type CardReservation } from "../models/card-reservation.model";



/**
 * generates cards for questions and reservations and appends them to the main list
 * @param {(CardQuestion | CardReservation)[]} datas - array of question or reservation objects to be processed
 * @param {HTMLTemplateElement} [questionTemplate] - template element for rendering question cards
 * @param {HTMLTemplateElement} [reservationTemplate] - template element for rendering reservation cards
 * @returns {void}
 */
export function generateCards(
    requests: (CardQuestion | CardReservation)[],
    questionTemplate?: HTMLTemplateElement,
    reservationTemplate?: HTMLTemplateElement,
): void {

    // list which will be filled with the cards containing questions or reservations
    const listRequests = document.querySelector("section#requests") as HTMLElement;

    requests.forEach((request) => {

        // initial value of the card
        let card: HTMLElement | null = null;

        /* check if the request is a question or a reservation based on properties using "in"
        also specify the type of the request to typescript using "as" */
        if ("text" in request && questionTemplate) {
            card = createCardQuestion(request, questionTemplate);
        } else if ("status" in request && reservationTemplate) {
            card = createCardReservation(request, reservationTemplate);
        }

        // if card is created correctly, append it to the main list and add events to it
        if (card) {
            listRequests.appendChild(card);
            openDialogs(card, request);
        }
    });
}