/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-20
 * @description handles archiving requests (questions or reservations) by updating their status to 'archived'
 */

import { type CardQuestion } from "../global/models/card-question.model";
import { type CardReservation } from "../global/models/card-reservation.model";



/**
 * function to archive a request by updating its status to archived
 * @param {string} path - the API path to send the request
 * @param {CardQuestion | CardReservation} request - the request (question or reservation) to be archived
 * @returns {Promise<any>} - resolves when the request has been archived
 */
export async function archiveRequest(path: string, request: CardQuestion | CardReservation): Promise<any> {

    // get the token from localStorage for authorization
    const token = localStorage.getItem("authToken");

    if (!token) {
        console.log("authentication token not found in localStorage");
    }

    // attempt to send a PUT request to update the request's archived status to true
    const response = await fetch(`${path}/${request.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...request, archived: true }) // pass the modified parameter
    });

    if (!response.ok) {
        throw new Error("error archiving the request");
    }
}