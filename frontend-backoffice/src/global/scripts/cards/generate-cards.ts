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



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function generateCardsReservations(
    listRequests: HTMLElement,
    overlay: HTMLElement,
    reservationTemplate: HTMLTemplateElement,
    reservationsData: CardReservation[],
): void {

    const modalReservation = document.querySelector(".modalReservation") as HTMLElement;

    reservationsData.forEach((reservation) => {
        // invocated the function which create cards, pass as argument: 1.data of question, 2.the cardQuestion template
        const cardReservation = createCardReservation(reservation, reservationTemplate);

        // if the card is actualy an HTML element and not "null", will be appended to the list of the requests and added the events "click"
        if (cardReservation) {
            addEventsOnCard(overlay, cardReservation, modalReservation);
            listRequests.appendChild(cardReservation);
        }
    });
}



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function generateCardsLatestRequests(
    listRequests: HTMLElement,
    overlay: HTMLElement,
    questionTemplate: HTMLTemplateElement,
    reservationTemplate: HTMLTemplateElement,
    latestRequests: (CardQuestion | CardReservation)[],
): void {

    // take from the DOM the modal of cards when clicked
    const modalQuestion = document.querySelector(".modalQuestion") as HTMLElement;
    const modalReservation = document.querySelector(".modalReservation") as HTMLElement;

    latestRequests.forEach((request) => {

        // check of the request if it is question || reservation from the properities! using:  "in"
        // also say to typescript the type of the request using:  "as"
        if ("question" in request) {
            console.log("domandaaaa");
            const cardQuestion = createCardQuestion(request as CardQuestion, questionTemplate);
            if (cardQuestion) {
                addEventsOnCard(overlay, cardQuestion, modalQuestion);
                listRequests.appendChild(cardQuestion);
            }

        } else if ("status" in request) {
            console.log("prenotazionee");
            const cardReservation = createCardReservation(request as CardReservation, reservationTemplate);
            if (cardReservation) {
                addEventsOnCard(overlay, cardReservation, modalReservation);
                listRequests.appendChild(cardReservation);
            }
        }

    });
} 