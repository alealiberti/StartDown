/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-05
 * @description 
 */

import { createCardQuestion } from "./question/create-card-question";
import { createCardReservation } from "./reservation/create-card-reservation";
import { addEventsOnCard } from "./events-cards";

import { type CardQuestion } from "../../../models/card-question.model";
import { type CardReservation } from "../../../models/card-reservation.model";






/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function generateCardsQuestions(
    listRequests: HTMLElement,
    overlay: HTMLElement,
    questionTemplate: HTMLTemplateElement,
    questionsData: CardQuestion[],
): void {

    const modalQuestion = document.querySelector(".modalQuestion") as HTMLElement;

    questionsData.forEach((question) => {
        // invocated the function which create cards, pass as argument: 1.data of question, 2.the cardQuestion template
        const cardQuestion = createCardQuestion(question, questionTemplate);

        // if the card is actualy an HTML element and not "null", will be appended to the list of the requests and added the events "click"
        if (cardQuestion) {
            addEventsOnCard(overlay, cardQuestion, modalQuestion);
            listRequests.appendChild(cardQuestion);
        }
    });


}



export function generateCardsReservations(
    listRequests: HTMLElement,
    overlay: HTMLElement,
    reservationTemplate: HTMLTemplateElement,
    reservationsData: CardReservation[],
): void {

    const modalReservation = document.querySelector(".modalReservation") as HTMLElement;


    reservationsData.forEach((reservation) => {
        // invocated the function which create cards, pass as argument: 1.data of question, 2.the cardQuestion template
        const cardQuestion = createCardReservation(reservation, reservationTemplate);

        // if the card is actualy an HTML element and not "null", will be appended to the list of the requests and added the events "click"
        if (cardQuestion) {
            addEventsOnCard(overlay, cardQuestion, modalReservation);
            listRequests.appendChild(cardQuestion);
        }
    });

}