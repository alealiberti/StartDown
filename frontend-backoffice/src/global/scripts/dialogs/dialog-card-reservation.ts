/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-13
 * @description 
 */

import { restructureDate } from "../restructure-date";
import { deleteCardDialog } from "./dialog-delete";
import { archiveCardDialog } from "./dialog-archive";
import { updateStatusReservation } from "../../../services/update-status-reservation.api";

import { closeDialogs } from "./close-dialogs";

import { type CardReservation } from "../../models/card-reservation.model";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
async function updateStatus(reservation: CardReservation) {

    // call the "updateStatusReservation" function for update the status of the reservation if is "nuova"
    try {
        await updateStatusReservation("http://localhost:8080/cascina-caccia/reservations/update-reservation", reservation);
        console.log(`prenotazione di ${reservation.name} stato aggiornata da nuovo con successo!`);

    } catch (err) {
        console.log(err.message);
    }
}



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function createDialogReservation(overlay: HTMLElement, dialogReservation: HTMLElement, reservation: CardReservation): void {

    // sets all the datas of the reservation into the ELEMENT dialogReservation
    dialogReservation.querySelector(".dialogHeader h2.dialogName")!.textContent = `${reservation.name} ${reservation.surname}`;
    dialogReservation.querySelector(".dialogHeader p.dialogEmail")!.textContent = reservation.email;
    dialogReservation.querySelector("p.dialogDate")!.textContent = restructureDate(reservation);
    dialogReservation.querySelector("p.status")!.textContent = reservation.status;


    // sets also inside the dialog the event listener for the delete of the reservation opened
    dialogReservation.querySelector(".actions .trash")?.addEventListener("click", (event) => {
        closeDialogs(overlay);
        deleteCardDialog(overlay, reservation, event);
    });

    // sets also inside the dialog the event listener for the archive of the reservation opened
    dialogReservation.querySelector(".actions .archive")?.addEventListener("click", (event) => {
        closeDialogs(overlay);
        archiveCardDialog(overlay, reservation, event)
    });


    //*** if the status is "nuova", so never opened, on the dialog reservation open, change the status through FETCH PUT
    if (reservation.status === "nuova") {
        updateStatus(reservation);
    }

}