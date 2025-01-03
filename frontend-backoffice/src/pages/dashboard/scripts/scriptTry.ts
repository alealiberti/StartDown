// IMPORTAZIONE DEI TEMPLATE GLOBALI SOTTOFORMA INNERHTML ALL'INTERNO DELLO SCRIPT DELLA PAGINA
import { cardQuestionTemplate } from "../../../global/templates/cards/card-question";
import { cardReservationTemplate } from "../../../global/templates/cards/card-reservation";

console.log(cardQuestionTemplate);
console.log(cardReservationTemplate);


// list which will conatins the mix of cards: questions and reservations
const listQuestionsReservations = document.querySelector("section#requests");


for (let i = 0; i < 5; i++) {

    const templateCard = document.createElement("div");

    // solo una prova di esempio per mostrare che le card si aggiungono anche da un template globale!
    if (Math.floor(Math.random() * 2) > 0.5) {
        templateCard.innerHTML = cardQuestionTemplate;
    } else {
        templateCard.innerHTML = cardReservationTemplate;
    }

    // aggiungiamelo per vedere se effettivamente il template viene visto e reindirizzato con successo nella UI
    listQuestionsReservations?.appendChild(templateCard);
}