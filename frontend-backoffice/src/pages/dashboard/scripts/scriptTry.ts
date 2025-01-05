// import the async function whit the promise which will response whit the template container element and the function which create dinamics cards whit objects
import { loadQuestionTemplate } from "../../../global/scripts/load-templates-cards";
import { createCardQuestion } from "../../../global/scripts/create-card-question";
import { type CardQuestion } from "../../../global/models/card-question.model";



//* load the templates and create dynamic cards trough proprieties form the DB
loadQuestionTemplate()
    .then(() => {

        /* GOAL:
        access the "div.cardQuestion" element, inside the <template> and dynamically fill it with datas taked from the DBs
        IMPORTANT! a template is not directly part of the visible DOM: it contains a #document-fragment that must be cloned to be used */
        const template = document.querySelector("template#cardQuestionTemplate") as HTMLElement;

        // Clona il contenuto del template
        const templateContent = template?.content.cloneNode(true) as DocumentFragment;

        // Trova il div principale della card all'interno del document-fragment
        const card = templateContent.querySelector(".cardQuestion") as HTMLElement;
        console.log(card);


        questionData.forEach((question) => {
            createCardQuestion(question);

            // TODO
            // const card = createCardQuestion(question);
            // if the card is actualy an HTML element and not "null", will be appended to the list of the requests
            // if (card) {
            //     listQuestionsReservations?.appendChild(card);
            // }

        });
    });



// TEMPORANY DB FOR TRYS
const questionData: CardQuestion[] = [
    { id: "0", name: "Mario", surname: "Rossi", email: "mario@example.com", phone: 3384465353, question: "Domanda 1" },
];