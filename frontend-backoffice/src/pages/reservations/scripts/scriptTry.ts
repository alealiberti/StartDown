// import the async function whit the promise which will response whit the template container element and the function which create dinamics cards whit objects
import { loadTemplate } from "../../../global/services/load-templates";
import { generateCards } from "../../../global/scripts/cards/generate-cards";

import { reservationsData } from "../../../global/DB/questions-reservation-DB";



//*** WAIT the loading of the DOM before imports the templates and create the cards question/reservation ***
document.addEventListener("DOMContentLoaded", async () => {

    // await the response and recive from the fetch into the async function, the templates of question on the DOM
    await loadTemplate("/src/global/templates/cards/card-reservation.html");
    await loadTemplate("/src/global/templates/dialogs/dialog-card-reservation.html");
    await loadTemplate("/src/global/templates/dialogs/dialog-delete.html");

    // ---------------------------------------------


    // take form the DOM the template reservation loaded from the fetch() in `loadTemplates.ts`
    const reservationTemplate = document.querySelector("template#cardReservationTemplate") as HTMLTemplateElement;

    // take from the DOM the modal of reservations cards when are clicked
    const dialogReservation = document.querySelector(".dialogReservation") as HTMLElement;


    // ---------------------------------------------


    generateCards(reservationsData, undefined, reservationTemplate, undefined, dialogReservation);

});