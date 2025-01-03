// IMPORTAZIONE DEL TEMPLATE GLOBALE DELLA CARD QUESTION
import { cardReservationTemplate } from "../../../global/templates/cards/card-reservation";

console.log(cardReservationTemplate);



// list which will conatins the mix of cards: questions and reservations
const listQuestionsReservations = document.querySelector("section#requests");


for (let i = 0; i < 5; i++) {

    const templateCard = document.createElement("div");
    templateCard.innerHTML = cardReservationTemplate;

    // aggiungiamelo per vedere se effettivamente il template viene visto e reindirizzato con successo nella UI
    listQuestionsReservations?.appendChild(templateCard);
}