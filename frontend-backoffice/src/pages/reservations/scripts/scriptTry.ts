/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-21
 * @description 
 */

// import the async function whit the promise which will response whit the template container element and the function which create dinamics cards whit objects
import { loadTemplate } from "../../../utils/load-templates";
import { generateCards } from "../../../global/scripts/generate-cards";

import { reservationsData } from "../../../global/DB/questions-reservation-DB";
import { authGuard } from "../../../utils/auth-guard";



// check if the user is autorizhed so done login, or bypass the login page and render him again there
authGuard();

//*** WAIT the loading of the DOM before imports the templates and create the cards question/reservation ***
document.addEventListener("DOMContentLoaded", async () => {

    // await the response and recive from the fetch into the async function, the templates of question on the DOM
    await loadTemplate("/src/global/templates/cards/card-reservation.html");
    await loadTemplate("/src/global/templates/toasts/toast-notification.html");


    // take form the DOM the template reservation loaded from the fetch() in `loadTemplates.ts`
    const reservationTemplate = document.querySelector("template#cardReservationTemplate") as HTMLTemplateElement;

    generateCards(reservationsData, undefined, reservationTemplate);

});