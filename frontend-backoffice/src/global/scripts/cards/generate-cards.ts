/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-05
 * @description 
 */

import { questionData, reservationData } from "../../DB/questions-reservation";
import { createCardQuestion } from "./question/create-card-question";
import { createCardReservation } from "../../../global/scripts/cards/reservation/create-card-reservation";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function generateCards(
    overlay: HTMLElement,
    questionTemplate?: HTMLTemplateElement,
    reservationTemplate?: HTMLTemplateElement
): void {

    // list which will be filled whit the cards
    const listRequests = document.querySelector("section#requests") as HTMLElement;


    // check if template question is an HTMLelement or a null element (not passed as argument!)
    if (questionTemplate) {

        const modalQuestion = document.querySelector(".modalQuestion") as HTMLElement;

        questionData.forEach((question) => {

            // invocated the function which create cards, pass as argument: 1.data of question, 2.the cardQuestion template
            const cardQuestion = createCardQuestion(question, questionTemplate);

            // add the events listeners to the question cards and dialog card question
            cardQuestion?.addEventListener("click", () => {
                overlay.style.display = "block";
                modalQuestion.style.display = "block";
            });
            overlay.addEventListener("click", () => {
                modalQuestion.style.display = "none";
            });

            // if the card is actualy an HTML element and not "null", will be appended to the list of the requests
            if (cardQuestion) {
                listRequests.appendChild(cardQuestion);
            }

        });

    }


    //* ---------------------------------------------------------------------------------------------------


    // check if template reservation is an HTMLelement or a null element (not passed as argument!)
    if (reservationTemplate) {

        const modalReservation = document.querySelector(".modalReservation") as HTMLElement;

        reservationData.forEach((reservation) => {

            // invocated the function which create cards, pass as argument: 1.data of question, 2.the cardQuestion template
            const CardReservation = createCardReservation(reservation, reservationTemplate);

            // add the events listeners to the question cards and dialog card question
            CardReservation?.addEventListener("click", () => {
                overlay.style.display = "block";
                modalReservation.style.display = "block";
            });
            overlay.addEventListener("click", () => {
                modalReservation.style.display = "none";
            });

            // if the card is actualy an HTML element and not "null", will be appended to the list of the requests
            if (CardReservation) {
                listRequests.appendChild(CardReservation);
            }

        });

    }

}
