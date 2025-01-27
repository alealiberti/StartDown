/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-25
 * @description function to update the latest questions and reservations in the dashboard
 */

import { type CardQuestion } from "../../../global/models/card-question.model";
import { type CardReservation } from "../../../global/models/card-reservation.model";



/**
 * updates the section displaying the latest questions and reservations data
 * @param {CardQuestion[]} questionsData - array of question objects containing details about questions
 * @param {CardReservation[]} reservationsData - array of reservation objects containing details about reservations
 * @returns {void}
 */
export function newRequest(questionsData: CardQuestion[], reservationsData: CardReservation[]): void {

    // take from the dom the section which contains the box with info of the latest questions and reservations
    const sectionInfoToday = document.querySelector("#infoToday") as HTMLElement;

    // filter the questions and return the length of a new array with questions where archived === false
    const totalNewQuestions = questionsData.filter((question) => !question.archived).length;
    sectionInfoToday.querySelector("p.total.questions")!.textContent = totalNewQuestions.toString();

    // filter the reservations and return the length of a new array with reservations where status === "nuova" || status === "accordare"
    const totalNewReservations = reservationsData.filter((reservation) => reservation.status === "nuova" || reservation.status === "accordare").length;
    sectionInfoToday.querySelector("p.total.reservations")!.textContent = totalNewReservations.toString();

}