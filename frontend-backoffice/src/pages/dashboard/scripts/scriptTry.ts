// import the async function whit the promise which will response whit the template container element and the function which create dinamics cards whit objects
import { loadTemplate } from "../../../services/load-templates";
import { generateCards } from "../../../global/scripts/cards/generate-cards";



//*** WAIT the loading of the DOM before imports the templates and create the cards question/reservation ***
document.addEventListener("DOMContentLoaded", async () => {

    // await the response and recive from the fetch into the async function, the templates of question on the DOM
    await loadTemplate("/src/global/templates/cards/card-question.html");
    await loadTemplate("/src/global/templates/cards/card-reservation.html");
    await loadTemplate("/src/global/templates/dialogs/dialog-card-question.html");
    await loadTemplate("/src/global/templates/dialogs/dialog-card-reservation.html");

    // ---------------------------------------------

    const questionTemplate = document.querySelector("template#cardQuestionTemplate") as HTMLTemplateElement;
    const reservationTemplate = document.querySelector("template#cardReservationTemplate") as HTMLTemplateElement;
    const overlay = document.querySelector(".overlay") as HTMLElement;

    overlay.addEventListener("click", () => {
        overlay.style.display = "none";
    });


    // ---------------------------------------------


    generateCards(overlay, questionTemplate, reservationTemplate)
});