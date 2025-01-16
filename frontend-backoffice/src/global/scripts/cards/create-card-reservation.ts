/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-05
 * @description 
 */

import { type CardReservation } from "../../../models/card-reservation.model";
import { restructureDate } from "../restructure-date";


/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function createCardReservation(data: CardReservation, template: HTMLTemplateElement): HTMLElement {

    // Clona il contenuto del template preso come argomento dal DOM (per distinguere le card e non sovrascriverle)
    const templateContent = template?.content.cloneNode(true) as DocumentFragment;

    // Trova il div principale della card all'interno del document-fragment, qui andranno popolati i dati delle richieste
    const CardReservation = templateContent.querySelector(".cardReservation") as HTMLElement;

    //*** -------------------------------------------------------

    // those elements inside the container card, will recive a value (! sospended)
    CardReservation.querySelector(".cardHeader h2.cardName")!.textContent = `${data.name} ${data.surname}`;
    CardReservation.querySelector(".cardHeader p.cardEmail")!.textContent = data.email
    CardReservation.querySelector(".cardHeader p.cardDate")!.textContent = restructureDate(data);

    // take from the dom the icon which rappresent the state of the reservation
    const stateReservationIcon = CardReservation.querySelector(".cardFooter .cardState ion-icon") as HTMLElement;


    // based on the status of the reservation request taken from the "date", we will set the special text and the color of the ball
    switch (true) {
        case data.status === "nuova":
            stateReservationIcon.style.color = "#FF0004";
            CardReservation.querySelector(".cardState p.stateDescription")!.textContent = "Nuova richiesta di prenotazione";
            break;

        case data.status === "accordare":
            stateReservationIcon.style.color = "#F49E00";
            CardReservation.querySelector(".cardState p.stateDescription")!.textContent = "Visualizzata (da accordare)";
            break;

        case data.status === "conclusa":
            stateReservationIcon.style.color = "#18DB42";
            CardReservation.querySelector(".cardState p.stateDescription")!.textContent = "Prenotazione concordata";
            break;

        default:
            CardReservation.querySelector(".cardState p.stateDescription")!.textContent = "???";
            break;
    }


    return CardReservation;
}