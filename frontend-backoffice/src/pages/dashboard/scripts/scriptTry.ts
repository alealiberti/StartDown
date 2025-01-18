// import the async function whit the promise which will response whit the template container element and the function which create dinamics cards whit objects
import { loadTemplate } from "../../../global/services/load-templates";
import { generateCards } from "../../../global/scripts/cards/generate-cards";

import { latestRequests } from "../../../global/DB/questions-reservation-DB";



//*** WAIT the loading of the DOM before imports the templates and create the cards question/reservation ***
document.addEventListener("DOMContentLoaded", async () => {

    document.body.style.visibility = "visible";

    // await the response and recive from the fetch into the async function, the templates of question on the DOM
    await loadTemplate("/src/global/templates/cards/card-question.html");
    await loadTemplate("/src/global/templates/cards/card-reservation.html");
    await loadTemplate("/src/global/templates/dialogs/dialog-card-question.html");
    await loadTemplate("/src/global/templates/dialogs/dialog-card-reservation.html");
    await loadTemplate("/src/global/templates/dialogs/dialog-delete.html");


    // ---------------------------------------------


    // take form the DOM the template question and reservation loaded from the fetch() in `loadTemplates.ts`
    const questionTemplate = document.querySelector("template#cardQuestionTemplate") as HTMLTemplateElement;
    const reservationTemplate = document.querySelector("template#cardReservationTemplate") as HTMLTemplateElement;

    // take from the DOM the modal of cards when are clicked
    const dialogQuestion = document.querySelector(".dialogQuestion") as HTMLElement;
    const dialogReservation = document.querySelector(".dialogReservation") as HTMLElement;


    // ---------------------------------------------

    generateCards(latestRequests, questionTemplate, reservationTemplate, dialogQuestion, dialogReservation);

});