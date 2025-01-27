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
import { closeDialogs } from "../../../global/scripts/dialogs/close-dialogs";
import { changePassword } from "./change-password";


// check if the user is autorizhed so done login, or bypass the login page and render him again there
authGuard();


document.addEventListener("DOMContentLoaded", async () => {

    // await the response and recive from the fetch into the async function, the templates of question/reservations on the DOM
    // and toast notification template
    await loadTemplate("/src/global/templates/cards/card-question.html");
    await loadTemplate("/src/global/templates/cards/card-reservation.html");
    await loadTemplate("/src/global/templates/toasts/toast-notification.html");


    // -----------------------------------------


    // take from the DOM to the container of the buttons actions
    const buttonsActions = document.getElementById("buttonsActions") as HTMLElement;

    // ***01. add event listener on the button which show all the archived questions***
    buttonsActions.querySelector("button.showArchivedQuestions")?.addEventListener("click", async () => {

        // hide the initial display whit the buttons
        buttonsActions.remove();

        try {
            // take form the DOM the template question loaded from the fetch() in `loadTemplates.ts`
            const questionTemplate = document.querySelector("template#cardQuestionTemplate") as HTMLTemplateElement;

            // await the response and recive from the GET fetch into "getRequests.api.ts" the archived questions
            let archivedQuestionsData: CardQuestion[] = await getRequests("http://localhost:8080/cascina-caccia/informations/archived");

            // generate the cards questions of the GET whit only archived
            generateCards(archivedQuestionsData, questionTemplate, undefined); // generate cards questions 

        } catch (err) {
            console.log(err)
        }
    });


    // ***02. add event listener on the button which show all the archived reservations*** 
    buttonsActions.querySelector("button.showArchivedReservations")?.addEventListener("click", async () => {

        // hide the initial display whit the buttons
        buttonsActions.remove();

        try {
            // take form the DOM the template reservation loaded from the fetch() in `loadTemplates.ts`
            const reservationTemplate = document.querySelector("template#cardReservationTemplate") as HTMLTemplateElement;

            // await the response and recive from the GET fetch into "getRequests.api.ts" the archived reservations
            let reservationsData: CardReservation[] = await getRequests("http://localhost:8080/cascina-caccia/reservations/archived");

            // generate the cards reservation of the GET whit only archived
            generateCards(reservationsData, undefined, reservationTemplate);

        } catch (err) {
            console.log(err)
        }
    });


    // ***03. add event listener on the button which open a dialog for change the old password whit a newest***
    buttonsActions.querySelector("button.changePassword")?.addEventListener("click", async () => {

        try {
            // await the response and recive from the fetch into the async function, the templates of the dialog change password
            await loadTemplate("/src/global/templates/dialogs/dialog-password.html");
            const dialogChangePassword = document.querySelector(".dialogChangePassword") as HTMLElement;

            // take from the DOM the overlay which will cover all the pages and block interaction whit all elements, on click will close it
            const overlay = document.querySelector(".overlay") as HTMLElement;
            overlay.addEventListener("click", () => closeDialogs(overlay));

            // evocate function which contains the logic for show the dialog of change password whit form + API
            changePassword(overlay, dialogChangePassword);

        } catch (err) {
            console.log(err)
        }
    });

});