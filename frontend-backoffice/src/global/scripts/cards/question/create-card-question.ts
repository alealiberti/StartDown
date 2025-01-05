import { CardQuestion } from "../../../models/card-question.model";


export function createCardQuestion(data: CardQuestion, template: HTMLTemplateElement): HTMLElement | null {


    // Clona il contenuto del template preso come argomento dal DOM (per distinguere le card e non sovrascriverle)
    const templateContent = template?.content.cloneNode(true) as DocumentFragment;

    // Trova il div principale della card all'interno del document-fragment, qui andranno popolati i dati delle richieste
    const cardQuestion = templateContent.querySelector(".cardQuestion") as HTMLElement;

    // those elements inside the container card, will recive a value (! sospended)
    cardQuestion.querySelector(".cardHeader h2.cardName")!.textContent = data.name;
    cardQuestion.querySelector(".cardHeader p.cardEmail")!.textContent = data.email
    cardQuestion.querySelector(".cardHeader p.cardDate")!.textContent = data.date;
    cardQuestion.querySelector("p.cardBody")!.textContent = data.question;

    return cardQuestion;
}