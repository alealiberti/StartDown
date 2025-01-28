/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-20
 * @description function to mix and return the latest 5 questions and reservations based on the date
 */

import { type CardQuestion } from "../../../global/models/card-question.model";
import { type CardReservation } from "../../../global/models/card-reservation.model";



/**
 * function to mix and return the latest 5 questions and reservations based on the most recent date
 * @param {CardQuestion[]} questionsData - the array of question data
 * @param {CardReservation[]} reservationsData - the array of reservation data
 * @returns {(CardQuestion | CardReservation)[]} - an array of the latest 5 questions and reservations, sorted by date
 */
export const latestQuestionsReservations = (questionsData: CardQuestion[], reservationsData: CardReservation[]): (CardQuestion | CardReservation)[] => {

    // merge the two arrays (questions and reservations)
    const combinedRequests = [...questionsData, ...reservationsData];

    // sort the combined array by the 'dateSend' property in descending order
    combinedRequests.sort((a, b) => {

        // convert the date
        const dateA = new Date(a.dateSend).getTime();
        const dateB = new Date(b.dateSend).getTime();

        return dateB - dateA; // reorder by date
    });

    // return the latest 5 mixed requests sorted by date
    return combinedRequests.slice(0, 5);
}
