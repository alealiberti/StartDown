/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-05
 * @description 
 */

import { restructureDate } from "../restructure-date";
import { type CardReservation } from "../../models/card-reservation.model";


/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function createCardReservation(reservation: CardReservation, template: HTMLTemplateElement): HTMLElement {

    // Clona il contenuto del template preso come argomento dal DOM (per distinguere le card e non sovrascriverle)
    const templateContent = template?.content.cloneNode(true) as DocumentFragment;

    // Trova il div principale della card all'interno del document-fragment, qui andranno popolati i dati delle richieste
    const CardReservation = templateContent.querySelector(".cardReservation") as HTMLElement;

    //*** -------------------------------------------------------

    // those elements inside the container card, will recive a value (! sospended)
    CardReservation.querySelector(".cardHeader h2.name")!.textContent = `${reservation.name} ${reservation.surname}`;
    CardReservation.querySelector(".cardHeader p.email")!.textContent = reservation.email
    CardReservation.querySelector(".cardHeader p.dateSend")!.textContent = restructureDate(reservation.dateSend);

    // take from the dom the icon which rappresent the state of the reservation
    const stateReservationIcon = CardReservation.querySelector(".cardFooter .state ion-icon") as HTMLElement;


    // based on the status of the reservation request taken from the "data", we will set the special text and the color of the ball
    switch (true) {
        case reservation.status === "nuova":
            stateReservationIcon.style.color = "#FF0004";
            CardReservation.querySelector(".state p.stateDescription")!.textContent = "Nuova prenotazione!!";
            break;

        case reservation.status === "accordare":
            stateReservationIcon.style.color = "#F49E00";
            CardReservation.querySelector(".state p.stateDescription")!.textContent = "Prenotazione da concordare";
            break;

        case reservation.status === "confermata":
            stateReservationIcon.style.color = "#18DB42";
            CardReservation.querySelector(".state p.stateDescription")!.textContent = "Prenotazione confermata!";
            break;

        default:
            CardReservation.querySelector(".state p.stateDescription")!.textContent = "???";
            break;
    }

    return CardReservation;
}