/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-13
 * @description 
 */

import { type CardQuestion } from "../../../models/card-question.model";
import { restructureDate } from "../restructure-date";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function createQuestionDialog(modalQuestion: HTMLElement, question: CardQuestion): void {

    // sets all the datas of the questions into the TEMPLATE QUESTIONS "dialog"

    modalQuestion.querySelector(".dialogHeader h2.dialogName")!.textContent = `${question.name} ${question.surname}`;
    modalQuestion.querySelector(".dialogHeader p.dialogEmail")!.textContent = question.email;
    modalQuestion.querySelector("p.dialogDate")!.textContent = restructureDate(question);

    modalQuestion.querySelector(".dialogBody .dialogRequest")!.textContent = question.question;
    console.log(question.question.length);





}