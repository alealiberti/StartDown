// import the async function whit the promise which will response whit the template container element and the function which create dinamics cards whit objects
import { loadTemplate } from "../../../global/services/load-templates";
import { generateCardsReservations } from "../../../global/scripts/cards/generate-cards";

import { reservationsData } from "../../../global/DB/questions-reservation";



//*** WAIT the loading of the DOM before imports the templates and create the cards question/reservation ***
document.addEventListener("DOMContentLoaded", async () => {

    // await the response and recive from the fetch into the async function, the templates of question on the DOM
    await loadTemplate("/src/global/templates/cards/card-reservation.html");
    await loadTemplate("/src/global/templates/dialogs/dialog-card-reservation.html");

    // ---------------------------------------------


    // list which will be filled whit the cards
    const listRequests = document.querySelector("section#requests") as HTMLElement;

    // take from the DOM the overlay which cover all the page whit a black nurse when cards are clicked
    const overlay = document.querySelector(".overlay") as HTMLElement;
    overlay.addEventListener("click", () => {
        overlay.style.display = "none";
    });

    // take form the DOM the template reservation loaded from the fetch() in `loadTemplates.ts`
    const reservationTemplate = document.querySelector("template#cardReservationTemplate") as HTMLTemplateElement;


    // ---------------------------------------------


    generateCardsReservations(listRequests, overlay, reservationTemplate, reservationsData);

});