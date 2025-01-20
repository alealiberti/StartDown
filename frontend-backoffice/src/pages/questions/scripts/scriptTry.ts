// import the async function whit the promise which will response whit the template container element and the function which create dinamics cards whit objects
import { loadTemplate } from "../../../global/services/load-templates";
import { generateCards } from "../../../global/scripts/generate-cards";

import { questionsData } from "../../../global/DB/questions-reservation-DB";



//*** WAIT the loading of the DOM before imports the templates and create the cards question/reservation ***
document.addEventListener("DOMContentLoaded", async () => {

    // await the response and recive from the fetch into the async function, the templates of question on the DOM
    await loadTemplate("/src/global/templates/cards/card-question.html");

    // take form the DOM the template question loaded from the fetch() in `loadTemplates.ts`
    const questionTemplate = document.querySelector("template#cardQuestionTemplate") as HTMLTemplateElement;
    generateCards(questionsData, questionTemplate); // generate cards questions whit the questions datas
});