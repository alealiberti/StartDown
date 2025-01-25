/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-20
 * @description 
 */

import { authGuard } from "../../../utils/auth-guard";
import { loadTemplate } from "../../../utils/load-templates";
import { getRequests } from "../../../services/get-requests.api";
import { newRequest } from "./new-requests";
import { latestQuestionsReservations } from "./get-latest-request";
import { generateCards } from "../../../global/scripts/generate-cards";

import { type CardQuestion } from "../../../global/models/card-question.model";
import { type CardReservation } from "../../../global/models/card-reservation.model";



// check if the user is autorizhed so done login, or bypass the login page and render him again there
authGuard();

//*** WAIT the loading of the DOM before imports the templates and create the cards question/reservation ***
document.addEventListener("DOMContentLoaded", async () => {

    try {
        // await the response and recive from the fetch into the async function, the templates of question on the DOM
        await loadTemplate("/src/global/templates/cards/card-question.html");
        await loadTemplate("/src/global/templates/cards/card-reservation.html");
        await loadTemplate("/src/global/templates/toasts/toast-notification.html");


        // await the response and recive from the GET fetch into "getRequests.api.ts" the questions
        let questionsData: CardQuestion[] = await getRequests("http://localhost:8080/cascina-caccia/informations");
        // await the response and recive from the GET fetch into "getRequests.api.ts" the reservations
        let reservationsData: CardReservation[] = await getRequests("http://localhost:8080/cascina-caccia/reservations");

        // let's define the new question (based on archived true || false) and new reservation (based on status === "nuova")
        newRequest(questionsData, reservationsData);

        // -----------------------------------

        // let's take the last 5 request using sort and destructuring of the array's of question/reservation
        const latestRequests = latestQuestionsReservations(questionsData, reservationsData);

        // take form the DOM the template question and reservation loaded from the fetch() in `loadTemplates.ts`
        const questionTemplate = document.querySelector("template#cardQuestionTemplate") as HTMLTemplateElement;
        const reservationTemplate = document.querySelector("template#cardReservationTemplate") as HTMLTemplateElement;

        generateCards(latestRequests, questionTemplate, reservationTemplate);

    } catch (err) {
        console.log(err)
    }
});