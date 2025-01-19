/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-13
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
export function createReservationDialog(modalReservation: HTMLElement, reservation: CardReservation): void {

    // sets all the datas of the reservation into the TEMPLATE RESERVATION "dialog"
    // sets all the datas of the questions into the TEMPLATE QUESTIONS "dialog"
    modalReservation.querySelector("p.status")!.textContent = reservation.status;

    // TODO CONTINUE IMPLEMENT THE DIALOG RESERVATIONS WHEN OPENED






    // //** if it is a reservation, we also change the status if it is the first click to view the reservation! whit backend!
    // if (reservation?.status === "nuova") {
    //     reservation.status = "accordare";
    //     console.log(reservation);
    // }

}