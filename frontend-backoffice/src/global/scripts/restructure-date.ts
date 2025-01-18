/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-14
 * @description 
 */


import { type CardQuestion } from "../models/card-question.model";
import { type CardReservation } from "../models/card-reservation.model";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function restructureDate(data: CardQuestion | CardReservation): string {

    // .split() the date into an array and apply the destructuring to create istant variables
    const [m, g, y] = data.dateSend.split("/");

    return `${g}/${m}/${y}`;
}