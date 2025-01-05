// import the async function whit the promise which will response whit the template container element and the function which create dinamics cards whit objects
import { loadTemplate } from "../../../global/scripts/cards/load-templates";
import { createCardQuestion } from "../../../global/scripts/cards/question/create-card-question";

import { type CardQuestion } from "../../../global/models/card-question.model";
import { type CardReservation } from "../../../global/models/card-reservation.model";


// wait the loading of the DOM before imports the templates and create the cards question/reservation
document.addEventListener("DOMContentLoaded", async () => {

    // get the list which will be filled whit the cards questions / reservations
    const listRequests = document.querySelector("section#requests");


    //* -----------------------------------------


    // await the response and recive from the fetch into the async function, the templates of question and reservation on the DOM
    await loadTemplate("/src/global/templates/cards/card-question.html");
    await loadTemplate("/src/global/templates/cards/card-reservation.html");

    /*
     ! GOAL:
     access the "div.cardQuestion" element, inside the <template> and dynamically fill it with datas taked from the DBs
     IMPORTANT! a template is not directly part of the visible DOM: it contains a #document-fragment that must be cloned to be used
     we pass this template into the functions: 1. createCardQuestion and 2. createCardReservation, and will create clones of it
     */
    const questionTemplate = document.querySelector("template#cardQuestionTemplate") as HTMLElement;
    const reservationTemplate = document.querySelector("template#cardReservationTemplate") as HTMLElement;


    //* ----------------------------------------


    questionData.forEach((question) => {
        // invocated the function which create cards, pass as argument: 1.data of question, 2.the cardQuestion template
        const cardQuestion = createCardQuestion(question, questionTemplate);
        console.log(cardQuestion);
        // if the card is actualy an HTML element and not "null", will be appended to the list of the requests
        if (cardQuestion) {
            listRequests?.appendChild(cardQuestion);
        }
    });


    // reservationData.forEach((reservation) => {
    //     // invocated the function which create cards, pass as argument: 1.data of question, 2.the cardQuestion template
    //     const CardReservation = createCardQuestion(reservation, reservationTemplate);
    //     console.log(CardReservation);
    //     // if the card is actualy an HTML element and not "null", will be appended to the list of the requests
    //     if (CardReservation) {
    //         listRequests?.appendChild(CardReservation);
    //     }
    // });

});



// Dati di esempio temporanei
const questionData: CardQuestion[] = [
    { id: "0", name: "Mario Rossi", email: "mario@example.com", date: "10/12/2024", question: "Domanda 1" },
    { id: "1", name: "Gianluigi Romano", email: "gianluigi@example.com", date: "13/04/2023", question: "Domanda 2" },
    { id: "2", name: "Giorgio Bianchi", email: "giorgio@example.com", date: "30/11/2022", question: "Domanda 3" },
];

// const reservationData: CardReservation[] = [
//     { id: "0", customerName: "Anna Verdi", reservationDate: "15/01/2025", activity: "Yoga Class" },
//     { id: "1", customerName: "Luca Bianchi", reservationDate: "16/01/2025", activity: "Spinning" },
// ];