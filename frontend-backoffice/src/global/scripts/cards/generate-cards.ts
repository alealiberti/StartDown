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
export function generateCards(listRequests: HTMLElement, overlay: HTMLElement, questionTemplate?: HTMLTemplateElement, reservationTemplate?: HTMLTemplateElement): void {


    // check if template is an HTMLelement or a null element (not passed as argument!)
    if (questionTemplate) {

        questionData.forEach((question) => {

            // invocated the function which create cards, pass as argument: 1.data of question, 2.the cardQuestion template
            const cardQuestion = createCardQuestion(question, questionTemplate);
            console.log(cardQuestion);

            // if the card is actualy an HTML element and not "null", will be appended to the list of the requests
            if (cardQuestion) {
                listRequests?.appendChild(cardQuestion);
            }

            cardQuestion?.addEventListener("click", () => {
                overlay.style.display = "block";
                // show also the dialog of the questions cards
            });
        });
    }



    if (reservationTemplate) {


        reservationData.forEach((reservation) => {

            // invocated the function which create cards, pass as argument: 1.data of question, 2.the cardQuestion template
            const CardReservation = createCardReservation(reservation, reservationTemplate);
            console.log(CardReservation);

            // if the card is actualy an HTML element and not "null", will be appended to the list of the requests
            if (CardReservation) {
                listRequests?.appendChild(CardReservation);
            }

            CardReservation?.addEventListener("click", () => {
                overlay.style.display = "block";
                // show also the dialog of the questions cards
            });
        });
    }

}
