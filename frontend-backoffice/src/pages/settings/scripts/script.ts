/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-21
 * @description 
 */


import { generateCards } from "../../../global/scripts/generate-cards";
import { getRequests } from "../../../services/get-requests.api";
import { authGuard } from "../../../utils/auth-guard";
import { loadTemplate } from "../../../utils/load-templates";
import { type CardQuestion } from "../../../global/models/card-question.model";
import { CardReservation } from "../../../global/models/card-reservation.model";


// check if the user is autorizhed so done login, or bypass the login page and render him again there
authGuard();


document.addEventListener("DOMContentLoaded", () => {

    // take from the DOM to the container of the buttons actions
    const buttonsActions = document.getElementById("buttonsActions") as HTMLElement;


    // add event listener on the button which show all the archived questions 
    buttonsActions.querySelector("button.showArchivedQuestions")?.addEventListener("click", async () => {

        buttonsActions.remove();

        try {
            // await the response and recive from the fetch into the async function, the templates of question on the DOM
            await loadTemplate("/src/global/templates/cards/card-question.html");
            await loadTemplate("/src/global/templates/toasts/toast-notification.html");

            // await the response and recive from the GET fetch into "getRequests.api.ts" the archived questions
            let archivedQuestionsData: CardQuestion[] = await getRequests("http://localhost:8080/cascina-caccia/informations/archived");

            // take form the DOM the template question loaded from the fetch() in `loadTemplates.ts`
            const questionTemplate = document.querySelector("template#cardQuestionTemplate") as HTMLTemplateElement;

            generateCards(archivedQuestionsData, questionTemplate, undefined); // generate cards questions whit the questions datas

        } catch (err) {
            console.log(err)
        }
    });


    // add event listener on the button which show all the archived reservations 
    buttonsActions.querySelector("button.showArchivedReservations")?.addEventListener("click", async () => {

        buttonsActions.remove();

        try {
            // await the response and recive from the fetch into the async function, the templates of question on the DOM
            await loadTemplate("/src/global/templates/cards/card-reservation.html");
            await loadTemplate("/src/global/templates/toasts/toast-notification.html");

            // await the response and recive from the GET fetch into "getRequests.api.ts" the archived reservations
            let reservationsData: CardReservation[] = await getRequests("http://localhost:8080/cascina-caccia/reservations/archived");

            // take form the DOM the template reservation loaded from the fetch() in `loadTemplates.ts`
            const reservationTemplate = document.querySelector("template#cardReservationTemplate") as HTMLTemplateElement;

            generateCards(reservationsData, undefined, reservationTemplate);

        } catch (err) {
            console.log(err)
        }
    });

});