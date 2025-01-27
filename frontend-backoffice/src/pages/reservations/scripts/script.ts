/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-05
 */


import { authGuard } from "../../../utils/auth-guard";
import { loadTemplate } from "../../../utils/load-templates";
import { getRequests } from "../../../services/get-requests.api";
import { generateCards } from "../../../global/scripts/generate-cards";

import { type CardReservation } from "../../../global/models/card-reservation.model";



// check if the user is autorizhed so done login, or bypass the login page and render him again there
authGuard();

//*** WAIT the loading of the DOM before imports the templates and create the cards question/reservation ***
document.addEventListener("DOMContentLoaded", async () => {

    try {
        // await the response and recive from the fetch into the async function, the templates of question on the DOM
        await loadTemplate("/src/global/templates/cards/card-reservation.html");
        await loadTemplate("/src/global/templates/toasts/toast-notification.html");

        // await the response and recive from the GET fetch into "getRequests.api.ts" the reservations
        let reservationsData: CardReservation[] = await getRequests("http://localhost:8080/cascina-caccia/reservations");

        // take form the DOM the template reservation loaded from the fetch() in `loadTemplates.ts`
        const reservationTemplate = document.querySelector("template#cardReservationTemplate") as HTMLTemplateElement;

        // generate the cards of reservations whit the datas of the reservations
        generateCards(reservationsData, undefined, reservationTemplate);

    } catch (err) {
        console.log(err)
    }
});