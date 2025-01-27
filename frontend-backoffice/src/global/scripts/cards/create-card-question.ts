/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-05
 * @description contains a function to create a card for displaying questions
 */

import { restructureDate } from "../../../utils/restructure-date";
import { removeIcon } from "../../../utils/remove-icon";

import { type CardQuestion } from "../../models/card-question.model";



/**
 * creates a card element to display the question data
 * @param {CardQuestion} question - the question data to be displayed in the card
 * @param {HTMLTemplateElement} template - the template used to create the card
 * @returns {HTMLElement} - the card element populated with question data
 */
export function createCardQuestion(question: CardQuestion, template: HTMLTemplateElement): HTMLElement {

    // clone the content of the template passed as an argument to avoid overwriting other cards
    const templateContent = template?.content.cloneNode(true) as DocumentFragment;

    // find the main div of the card inside the document fragment, where the question data will be populated
    const cardQuestion = templateContent.querySelector(".cardQuestion") as HTMLElement;

    //*** -------------------------------------------------------

    // populate the elements inside the card with question data
    cardQuestion.querySelector(".cardHeader h2.name")!.textContent = `${question.name} ${question.surname}`;
    cardQuestion.querySelector(".cardHeader p.email")!.textContent = question.email;
    cardQuestion.querySelector(".cardHeader p.dateSend")!.textContent = restructureDate(question.dateSend);

    // take the question content message and cut it for the card preview
    const textBody: string = question.text.slice(0, 60).concat("...");
    cardQuestion.querySelector("p.cardBody")!.textContent = textBody;

    // -------------------------------------

    // remove the archive icon if the question is archived
    if (question.archived) {
        removeIcon(cardQuestion);
    }

    return cardQuestion;
}