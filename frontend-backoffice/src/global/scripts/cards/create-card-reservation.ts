/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-05
 * @description contains a function to create a card for displaying reservation data
 */

import { restructureDate } from "../../../utils/restructure-date";
import { removeIcon } from "../../../utils/remove-icon";

import { type CardReservation } from "../../models/card-reservation.model";



/**
 * creates a card element to display the reservation data
 * @param {CardReservation} reservation - the reservation data to be displayed in the card
 * @param {HTMLTemplateElement} template - the template used to create the card
 * @returns {HTMLElement} - the card element populated with reservation data
 */
export function createCardReservation(reservation: CardReservation, template: HTMLTemplateElement): HTMLElement {

    // clone the content of the template passed as an argument to avoid overwriting other cards
    const templateContent = template?.content.cloneNode(true) as DocumentFragment;

    // find the main div of the card inside the document fragment, where the reservation data will be populated
    const CardReservation = templateContent.querySelector(".cardReservation") as HTMLElement;

    //*** -------------------------------------------------------

    // populate the elements inside the card with reservation data
    CardReservation.querySelector(".cardHeader h2.name")!.textContent = `${reservation.name} ${reservation.surname}`;
    CardReservation.querySelector(".cardHeader p.email")!.textContent = reservation.email;
    CardReservation.querySelector(".cardHeader p.dateSend")!.textContent = restructureDate(reservation.dateSend);

    // take from the DOM the icon which represents the state of the reservation
    const stateReservationIcon = CardReservation.querySelector(".cardFooter .state ion-icon") as HTMLElement;

    // based on the status of the reservation request, set the corresponding state description and color of the icon
    switch (true) {
        case reservation.status === "nuova":
            stateReservationIcon.style.color = "#FF0004";
            CardReservation.querySelector(".state p.stateDescription")!.textContent = "Nuova prenotazione!";
            break;

        case reservation.status === "accordare":
            stateReservationIcon.style.color = "#F49E00";
            CardReservation.querySelector(".state p.stateDescription")!.textContent = "Prenotazione da concordare!";
            break;

        case reservation.status === "confermata":
            stateReservationIcon.style.color = "#18DB42";
            CardReservation.querySelector(".state p.stateDescription")!.textContent = "Prenotazione confermata!";
            break;

        default:
            CardReservation.querySelector(".state p.stateDescription")!.textContent = "???";
            break;
    }

    // -------------------------------------

    // remove the archive icon if the reservation is archived
    if (reservation.archived) {
        removeIcon(CardReservation);
    }

    return CardReservation;
}