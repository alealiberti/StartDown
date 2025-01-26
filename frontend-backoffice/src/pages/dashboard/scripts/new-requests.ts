/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-25
 * @description 
 */

import { type CardQuestion } from "../../../global/models/card-question.model";
import { type CardReservation } from "../../../global/models/card-reservation.model";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function newRequest(questionsData: CardQuestion[], reservationsData: CardReservation[]): void {

    // take from the DOM the section which contains the box whit info of the latest question && latest reservations
    const sectionInfoToday = document.querySelector("#infoToday") as HTMLElement;

    if (sectionInfoToday) {

        // filter the questions and return the length of an new array whit the questions archived === false
        const totalNewQuestions = questionsData.filter((question) => !question.archived).length;
        sectionInfoToday.querySelector("p.total.questions")!.textContent = totalNewQuestions.toString();

        // filter the reservations and return the length of an new array whit the reservations status === "nuova" || status === "accordare"
        const totalNewReservations = reservationsData.filter((reservation) => reservation.status === "nuova" || reservation.status === "accordare").length;
        sectionInfoToday.querySelector("p.total.reservations")!.textContent = totalNewReservations.toString();
    }
}