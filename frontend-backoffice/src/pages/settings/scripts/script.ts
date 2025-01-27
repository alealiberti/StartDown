/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-05
 */

import { authGuard } from "../../../utils/auth-guard";
import { loadTemplate } from "../../../utils/load-templates";
import { getRequests } from "../../../services/get-requests.api";
import { generateCards } from "../../../global/scripts/cards/generate-cards";
import { changePassword } from "./change-password";
import { closeDialogs } from "../../../global/scripts/dialogs/close-dialogs";

import { type CardQuestion } from "../../../global/models/card-question.model";
import { type CardReservation } from "../../../global/models/card-reservation.model";



// check if the user is authorized, otherwise redirect to login
authGuard();

document.addEventListener("DOMContentLoaded", async () => {

    // await the response and load the question/reservation templates and toast notification template
    await loadTemplate("/src/global/templates/cards/card-question.html");
    await loadTemplate("/src/global/templates/cards/card-reservation.html");
    await loadTemplate("/src/global/templates/toasts/toast-notification.html");

    // -----------------------------------------

    // take the container of action buttons from the DOM
    const buttonsActions = document.getElementById("buttonsActions") as HTMLElement;

    // ***01. add event listener to show archived questions***
    buttonsActions.querySelector("button.showArchivedQuestions")?.addEventListener("click", async () => {

        // hide the initial button display
        buttonsActions.remove();

        try {
            // take the question template loaded from `loadTemplates.ts`
            const questionTemplate = document.querySelector("template#cardQuestionTemplate") as HTMLTemplateElement;

            // await the response and fetch archived questions
            let archivedQuestionsData: CardQuestion[] = await getRequests("http://localhost:8080/cascina-caccia/informations/archived");

            // generate cards for archived questions
            generateCards(archivedQuestionsData, questionTemplate, undefined);

        } catch (err) {
            console.log(err);
        }
    });

    // ***02. add event listener to show archived reservations***
    buttonsActions.querySelector("button.showArchivedReservations")?.addEventListener("click", async () => {

        // hide the initial button display
        buttonsActions.remove();

        try {
            // take the reservation template loaded from `loadTemplates.ts`
            const reservationTemplate = document.querySelector("template#cardReservationTemplate") as HTMLTemplateElement;

            // await the response and fetch archived reservations
            let reservationsData: CardReservation[] = await getRequests("http://localhost:8080/cascina-caccia/reservations/archived");

            // generate cards for archived reservations
            generateCards(reservationsData, undefined, reservationTemplate);

        } catch (err) {
            console.log(err);
        }
    });

    // ***03. add event listener to open dialog for changing password***
    buttonsActions.querySelector("button.changePassword")?.addEventListener("click", async () => {

        try {
            // await the response and load the change password dialog template
            await loadTemplate("/src/global/templates/dialogs/dialog-password.html");
            const dialogChangePassword = document.querySelector(".dialogChangePassword") as HTMLElement;

            // take the overlay element which blocks interaction with the page
            const overlay = document.querySelector(".overlay") as HTMLElement;
            overlay.addEventListener("click", () => closeDialogs(overlay)); // on click will close dialog for change password

            // call function to show the change password dialog and handle the form
            changePassword(overlay, dialogChangePassword);

        } catch (err) {
            console.log(err);
        }
    });

});
