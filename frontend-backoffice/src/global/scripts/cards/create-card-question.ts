/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-05
 * @description 
 */

import { restructureDate } from "../restructure-date";
import { type CardQuestion } from "../../models/card-question.model";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function createCardQuestion(question: CardQuestion, template: HTMLTemplateElement): HTMLElement {


    // Clona il contenuto del template preso come argomento dal DOM (per distinguere le card e non sovrascriverle)
    const templateContent = template?.content.cloneNode(true) as DocumentFragment;

    // Trova il div principale della card all'interno del document-fragment, qui andranno popolati i dati delle richieste
    const cardQuestion = templateContent.querySelector(".cardQuestion") as HTMLElement;

    //*** -------------------------------------------------------

    // those elements inside the container card, will recive a value (! sospended)
    cardQuestion.querySelector(".cardHeader h2.name")!.textContent = `${question.name} ${question.surname}`;
    cardQuestion.querySelector(".cardHeader p.email")!.textContent = question.email;
    cardQuestion.querySelector(".cardHeader p.dateSend")!.textContent = restructureDate(question.dateSend);

    // take the question content message, and cut it for the card preview
    const textBody: string = question.text.slice(0, 60).concat("...");
    cardQuestion.querySelector("p.cardBody")!.textContent = textBody;

    return cardQuestion;
}