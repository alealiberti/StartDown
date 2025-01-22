/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-20
 * @description 
 */

import { loadTemplate } from "../../../utils/load-templates";
import { generateCards } from "../../../global/scripts/generate-cards";

import { latestRequests } from "../../../global/DB/questions-reservation-DB";
import { authGuard } from "../../../utils/auth-guard";



// check if the user is autorizhed so done login, or bypass the login page and render him again there
authGuard();

//*** WAIT the loading of the DOM before imports the templates and create the cards question/reservation ***
document.addEventListener("DOMContentLoaded", async () => {

    // await the response and recive from the fetch into the async function, the templates of question on the DOM
    await loadTemplate("/src/global/templates/cards/card-question.html");
    await loadTemplate("/src/global/templates/cards/card-reservation.html");
    await loadTemplate("/src/global/templates/toasts/toast-notification.html");


    // take form the DOM the template question and reservation loaded from the fetch() in `loadTemplates.ts`
    const questionTemplate = document.querySelector("template#cardQuestionTemplate") as HTMLTemplateElement;
    const reservationTemplate = document.querySelector("template#cardReservationTemplate") as HTMLTemplateElement;

    generateCards(latestRequests, questionTemplate, reservationTemplate);
});