// import the async function whit the promise which will response whit the template container element and the function which create dinamics cards whit objects
import { loadTemplate } from "../../../services/load-templates";
import { generateCards, generateQuestionCards, generateReservationCards } from "../../../global/scripts/cards/generate-cards";



//*** WAIT the loading of the DOM before imports the templates and create the cards question/reservation ***
document.addEventListener("DOMContentLoaded", async () => {

    // await the response and recive from the fetch into the async function, the templates of question and reservation on the DOM
    await loadTemplate("/src/global/templates/cards/card-question.html");
    await loadTemplate("/src/global/templates/cards/card-reservation.html");
    await loadTemplate("/src/global/templates/dialogs/dialog-card-question.html");
    await loadTemplate("/src/global/templates/dialogs/dialog-card-reservation.html");


    // ----------------------------------------------------


    /*
    ! GOAL:
    access the templates template#cardQuestionTemplate and template#cardReservationTemplate elements, 
    inside the <template> and dynamically fill it with datas taked from the DBs
    IMPORTANT! a template is not directly part of the visible DOM: it contains a #document-fragment 
    that must be cloned to be used.
    we pass this template into the functions: 1. generateQuestionCards + 2.generateReservationCards, and will create clones of it
    */
    const questionTemplate = document.querySelector("template#cardQuestionTemplate") as HTMLTemplateElement;
    const reservationTemplate = document.querySelector("template#cardReservationTemplate") as HTMLTemplateElement;

    // get the list which will be filled whit the cards questions / reservations
    const listRequests = document.querySelector("section#requests") as HTMLElement;


    // ----------------------------------------


    generateQuestionCards(listRequests, questionTemplate);
    generateReservationCards(listRequests, reservationTemplate);

    // TODO IMPLEMENT A SINGLE FUNCTION WHICH GENERATES INSIDE CARDS QUESTIONS + RESERVATIONS!
    generateCards(listRequests, questionTemplate, reservationTemplate)
});