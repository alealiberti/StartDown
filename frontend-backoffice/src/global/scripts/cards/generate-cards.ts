import { questionData, reservationData } from "../../DB/questions-reservation";
import { createCardQuestion } from "./question/create-card-question";
import { createCardReservation } from "../../../global/scripts/cards/reservation/create-card-reservation";


export function generateQuestionCards(listRequests: HTMLElement, questionTemplate: HTMLTemplateElement) {

    questionData.forEach((question) => {

        // invocated the function which create cards, pass as argument: 1.data of question, 2.the cardQuestion template
        const cardQuestion = createCardQuestion(question, questionTemplate);
        console.log(cardQuestion);

        // if the card is actualy an HTML element and not "null", will be appended to the list of the requests
        if (cardQuestion) {
            listRequests?.appendChild(cardQuestion);
        }
    });
}




export function generateReservationCards(listRequests: HTMLElement, reservationTemplate: HTMLTemplateElement) {

    reservationData.forEach((reservation) => {

        // invocated the function which create cards, pass as argument: 1.data of question, 2.the cardQuestion template
        const CardReservation = createCardReservation(reservation, reservationTemplate);
        console.log(CardReservation);

        // if the card is actualy an HTML element and not "null", will be appended to the list of the requests
        if (CardReservation) {
            listRequests?.appendChild(CardReservation);
        }
    });
}