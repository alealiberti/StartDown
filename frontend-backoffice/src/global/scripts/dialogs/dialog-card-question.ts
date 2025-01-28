/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-02
 * @description contains the function to create the dialog for a question with actions like delete and archive
 */

import { restructureDate } from "../../../utils/restructure-date";
import { deleteCardDialog } from "./dialog-delete";
import { archiveCardDialog } from "./dialog-archive";
import { closeDialogs } from "./close-dialogs";
import { removeIcon } from "../../../utils/remove-icon";

import { type CardQuestion } from "../../models/card-question.model";



/**
 * creates a dialog with the details of a question
 * @param {HTMLElement} overlay - the overlay element that covers the page
 * @param {HTMLElement} dialogQuestion - the dialog element to display the question details
 * @param {CardQuestion} question - the question object containing the details to display
 */
export function createDialogQuestion(overlay: HTMLElement, dialogQuestion: HTMLElement, question: CardQuestion): void {

    // sets all the datas of the question into the ELEMENT dialogQuestion
    dialogQuestion.querySelector(".dialogHeader h2.name")!.textContent = `${question.name} ${question.surname}`;
    dialogQuestion.querySelector(".dialogHeader p.email")!.textContent = question.email;
    dialogQuestion.querySelector(".dialogHeader p.phone")!.textContent = question.phone || "N/A";
    dialogQuestion.querySelector(".dialogHeader p.dateSend")!.textContent = restructureDate(question.dateSend);
    dialogQuestion.querySelector(".dialogBody .request")!.textContent = question.text;
    // change the mail to attribute whit the email of the emitter of the question
    const mailtoResponse = dialogQuestion.querySelector(".dialogFooter .dialogResponse a") as HTMLLinkElement;
    mailtoResponse.href = `mailto:${question.email}`;

    // ------------------------

    // remove from the dialog DOM, the icon of archive if the question have already the state of archived: true
    if (question.archived) {
        removeIcon(dialogQuestion);
    }

    //*** --------------------------------------------------------------

    // sets also inside the dialog the event listener for the delete of the question opened
    dialogQuestion.querySelector(".actions .trash")?.addEventListener("click", (event) => {
        closeDialogs(overlay); // close the actual dialog
        deleteCardDialog(overlay, question, event);
    });

    // sets also inside the dialog the event listener for the archive of the question opened
    dialogQuestion.querySelector(".actions .archive")?.addEventListener("click", (event) => {
        closeDialogs(overlay); // close the actual dialog
        archiveCardDialog(overlay, question, event);
    });

}