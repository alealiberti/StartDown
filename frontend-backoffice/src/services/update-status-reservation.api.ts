/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-21
 * @description handles the update of the reservation status
 */

import { type CardReservation } from "../global/models/card-reservation.model";



/**
 * function to update the status of a reservation
 * @param {string} path - the API path for the reservation request
 * @param {CardReservation} reservation - the reservation object to be updated
 * @param {string} status - the new status of the reservation
 * @returns {Promise<any>} - returns a promise indicating the success or failure of the update
 */
export async function updateStatusReservation(path: string, reservation: CardReservation, status: string): Promise<any> {

    // get the auth token from localStorage and pass it to the Authorization header
    const token = localStorage.getItem("authToken");

    if (!token) {
        console.log("authentication token not found in localStorage");
    }

    // attempt to send a PUT request to update the reservation status
    const response = await fetch(`${path}/${reservation.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...reservation, status: `${status}` }) // update the status
    });

    if (!response.ok) {
        throw new Error("error updating reservation status");
    }
}