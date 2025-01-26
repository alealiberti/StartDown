/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-21
 * @description 
 */

import { authGuard } from "../../../utils/auth-guard";
import { loadTemplate } from "../../../utils/load-templates";
import { getRequests } from "../../../services/get-requests.api";
import { generateCards } from "../../../global/scripts/generate-cards";

import { type CardQuestion } from "../../../global/models/card-question.model";



// check if the user is autorizhed so done login, or bypass the login page and render him again there
authGuard();

//*** WAIT the loading of the DOM before imports the templates and create the cards question/reservation ***
document.addEventListener("DOMContentLoaded", async () => {

    try {
        // await the response and recive from the fetch into the async function, the templates of question on the DOM
        await loadTemplate("/src/global/templates/cards/card-question.html");
        await loadTemplate("/src/global/templates/toasts/toast-notification.html");

        // await the response and recive from the GET fetch into "getRequests.api.ts" the questions
        let questionsData: CardQuestion[] = await getRequests("http://localhost:8080/cascina-caccia/informations");

        // take form the DOM the template question loaded from the fetch() in `loadTemplates.ts`
        const questionTemplate = document.querySelector("template#cardQuestionTemplate") as HTMLTemplateElement;

        generateCards(questionsData, questionTemplate, undefined); // generate cards questions whit the questions datas

    } catch (err) {
        console.log(err)
    }
});