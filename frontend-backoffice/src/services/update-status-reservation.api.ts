/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-21
 * @description 
 */

import { type CardReservation } from "../global/models/card-reservation.model";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export async function updateStatusReservation(path: string, reservation: CardReservation): Promise<any> {

    // get the token of auth, and pass it to the Authorization
    const token = localStorage.getItem("authToken");

    if (!token) {
        console.log("Token di autenticazione non trovato nel localStorage");
    }

    // try to fetch PUT, for update the status of request selected, is archived to true
    const response = await fetch(`${path}/${reservation.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...reservation, status: "accordare" }) // let's pass the status which will updated
    });

    if (!response.ok) {
        throw new Error("Errore nell'aggiornamento stato della prenotazione!");
    }
}