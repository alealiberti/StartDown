/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-22
 * @description 
 */

import { CardQuestion } from "../../../global/models/card-question.model";
import { CardReservation } from "../../../global/models/card-reservation.model";







// Dati di esempi temporanei da utilizzzare per le ultime 5 questions/reservations mixate nella dashboard!

// accetta come parametri i questionsData e reservationsData, verrà ritornato come valore nella funzione un array mixato tramite il destructuring e riordinato per data

/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export const latestQuestionsReservations = (questionsData: CardQuestion[], reservationsData: CardReservation[])
    : (CardQuestion | CardReservation)[] => {

    // destructuring dei 2 array
    const combinedRequests = [...questionsData, ...reservationsData];

    // andiamo ad ordinare per `.dateSend` (dal più recente al meno recente) passando 2 ogetti di questions/reservations alla volta
    combinedRequests.sort((a, b) => {

        // convertiamo la data in "ms" e riodiniamo in modo decrescente
        const dateA = new Date(a.dateSend).getTime();
        const dateB = new Date(b.dateSend).getTime();

        return dateB - dateA; // scambio di posizione
    });

    // restituiamo come array mixato ordinato per data le ultime 5 RICHIESTE
    return combinedRequests.slice(0, 5);
}