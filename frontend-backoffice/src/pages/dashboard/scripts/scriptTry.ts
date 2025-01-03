import { cardQuestionTemplate } from "../../../global/scripts/card-question";
import { cardReservationTemplate } from "../../../global/scripts/card-reservation";

console.log(cardQuestionTemplate);
console.log(cardReservationTemplate);


const listQuestionsReservations = document.querySelector(".requestsList");


for (let i = 0; i < 10; i++) {
    // Clona il template prima di aggiungerlo
    const clonedCard = cardReservationTemplate?.cloneNode(true) as Element;
    listQuestionsReservations?.appendChild(clonedCard);
}
