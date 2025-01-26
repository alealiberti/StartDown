/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-13
 * @description 
 */

import { restructureDate } from "../restructure-date";
import { deleteCardDialog } from "./dialog-delete";
import { archiveCardDialog } from "./dialog-archive";
import { closeDialogs } from "./close-dialogs";

import { type CardQuestion } from "../../models/card-question.model";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function createDialogQuestion(overlay: HTMLElement, dialogQuestion: HTMLElement, question: CardQuestion): void {

    // sets all the datas of the question into the ELEMENT dialogQuestion
    dialogQuestion.querySelector(".dialogHeader h2.name")!.textContent = `${question.name} ${question.surname}`;
    dialogQuestion.querySelector(".dialogHeader p.email")!.textContent = question.email;
    dialogQuestion.querySelector(".dialogHeader p.phone")!.textContent = question.phone || "N/A";
    dialogQuestion.querySelector(".dialogHeader p.dateSend")!.textContent = restructureDate(question.dateSend);
    dialogQuestion.querySelector(".dialogBody .request")!.textContent = question.text;

    // --------------------------------------------------------------

    // sets also inside the dialog the event listener for the delete of the question opened
    dialogQuestion.querySelector(".actions .trash")?.addEventListener("click", (event) => {
        closeDialogs(overlay); // close the actual dialog
        deleteCardDialog(overlay, question, event);
    });

    // sets also inside the dialog the event listener for the archive of the question opened
    dialogQuestion.querySelector(".actions .archive")?.addEventListener("click", (event) => {
        closeDialogs(overlay); // close the actual dialog
        archiveCardDialog(overlay, question, event)
    });

}   