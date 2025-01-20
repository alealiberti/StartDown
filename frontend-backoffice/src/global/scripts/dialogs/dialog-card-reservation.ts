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

import { type CardReservation } from "../../models/card-reservation.model";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function createDialogReservation(overlay: HTMLElement, dialogReservation: HTMLElement, reservation: CardReservation): void {

    // sets all the datas of the reservation into the TEMPLATE RESERVATION "dialog"
    // sets all the datas of the questions into the TEMPLATE QUESTIONS "dialog"
    dialogReservation.querySelector("p.status")!.textContent = reservation.status;

    // TODO CONTINUE IMPLEMENT THE DIALOG RESERVATIONS WHEN OPENED

    // //** if it is a reservation, we also change the status if it is the first click to view the reservation! whit backend!
    // if (reservation?.status === "nuova") {
    //     reservation.status = "accordare";
    //     console.log(reservation);
    // }


    dialogReservation.querySelector(".actions .trash")?.addEventListener("click", (event) => {
        closeDialogs(overlay);
        deleteCardDialog(overlay, reservation, event);
    });

    dialogReservation.querySelector(".actions .archive")?.addEventListener("click", (event) => {
        closeDialogs(overlay);
        archiveCardDialog(overlay, reservation, event)
    });
}