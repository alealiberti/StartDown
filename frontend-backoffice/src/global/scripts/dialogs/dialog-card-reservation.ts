/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-13
 * @description contains functions for managing reservation dialogs and updating reservation status
 */

import { restructureDate } from "../../../utils/restructure-date";
import { deleteCardDialog } from "./dialog-delete";
import { archiveCardDialog } from "./dialog-archive";
import { updateStatusReservation } from "../../../services/update-status-reservation.api";
import { closeDialogs } from "./close-dialogs";
import { createToastNotification } from "../toasts/toast-notification";
import { removeIcon } from "../../../utils/remove-icon";

import { type CardReservation } from "../../models/card-reservation.model";



/**
 * updates the status of the reservation to "accordare"
 * @param {CardReservation} reservation - the reservation whose status is to be updated
 * @returns {Promise<void>} - returns a promise that resolves when the update is complete
 */
async function updateStatus(reservation: CardReservation): Promise<void> {

    // call the "updateStatusReservation" function to update the status of the reservation if it's "nuova"
    try {
        await updateStatusReservation("http://localhost:8080/cascina-caccia/reservations/update-reservation",
            reservation, "accordare"
        );

    } catch (err) {
        console.log(err.message);
    }
}


/**
 * confirms the reservation by updating its status to "confermata"
 * @param {HTMLElement} overlay - the overlay element to be hidden after confirmation
 * @param {CardReservation} reservation - the reservation to be confirmed
 * @returns {Promise<void>} - returns a promise that resolves when the confirmation process is complete
 */
async function handleConfirm(overlay: HTMLElement, reservation: CardReservation): Promise<void> {

    // call the "updateStatusReservation" function to update the status to "confermata" when the "Accetta prenotazione" button is clicked
    try {
        await updateStatusReservation("http://localhost:8080/cascina-caccia/reservations/update-reservation",
            reservation, "confermata"
        );
        closeDialogs(overlay);

        // show a success toast message when the PUT of the status request completes, after 2 sec reload the page
        createToastNotification("Reservation confirmed!", "success");
        setTimeout(() => {
            location.reload();
        }, 2000);

    } catch (err) {
        // show an error toast message when the PUT of the status request failed!
        closeDialogs(overlay);
        createToastNotification("Error confirming reservation!", "error");
    }
}


// ----------------------------------------------------


/**
 * creates and fills the reservation dialog with the reservation details
 * @param {HTMLElement} overlay - the overlay element to be shown during the process
 * @param {HTMLElement} dialogReservation - the dialog element that will be populated with reservation data
 * @param {CardReservation} reservation - the reservation whose details will be shown in the dialog
 * @returns {void}
 */
export function createDialogReservation(overlay: HTMLElement, dialogReservation: HTMLElement, reservation: CardReservation): void {

    // fill in the head of the reservation data into the dialogReservation element
    dialogReservation.querySelector(".dialogHeader h2.name")!.textContent = `${reservation.name} ${reservation.surname}`;
    dialogReservation.querySelector(".dialogHeader p.email")!.textContent = reservation.email;
    dialogReservation.querySelector(".dialogHeader p.dateSend")!.textContent = restructureDate(reservation.dateSend);
    dialogReservation.querySelector(".dialogHeader p.phone")!.textContent = reservation.phone ?? "N/A";
    // fill in the body of the reservation data (checks added for null values, will be filled whit "N/A")
    dialogReservation.querySelector(".dialogBody p.status strong")!.textContent += ` ${reservation.status} prenotazione`;
    const stateReservationIcon = dialogReservation.querySelector(".dialogBody p.status ion-icon") as HTMLElement;
    switch (true) {
        case reservation.status === "nuova":
            stateReservationIcon.style.color = "#FF0004";
            break;
        case reservation.status === "accordare":
            stateReservationIcon.style.color = "#F49E00";
            break;
        case reservation.status === "confermata":
            stateReservationIcon.style.color = "#18DB42";
            break;
        default:
            break;
    }
    dialogReservation.querySelector(".dialogBody p.dateStart span")!.textContent += restructureDate(reservation.dateStart);
    dialogReservation.querySelector(".dialogBody p.dateFinish span")!.textContent += reservation.dateFinish ? restructureDate(reservation.dateFinish) : "N/A";
    dialogReservation.querySelector(".dialogBody p.hourStart span")!.textContent += reservation.hourStart ?? "N/A";
    dialogReservation.querySelector(".dialogBody p.hoursFinish span")!.textContent += reservation.hourFinish ?? "N/A";
    dialogReservation.querySelector(".dialogBody p.type span")!.textContent += reservation.typeGroup;
    dialogReservation.querySelector(".dialogBody p.visitors span")!.textContent += `${reservation.visitors}`;
    dialogReservation.querySelector(".dialogBody p.companions span")!.textContent += `${reservation.companions ?? "N/A"}`;
    dialogReservation.querySelector(".dialogBody p.mobilityProblems span")!.textContent += reservation.mobilityProblems ? "Yes" : "No";
    dialogReservation.querySelector(".dialogBody .addiontalInfo p.request")!.textContent += reservation.additionalInfo ?? "";

    // ---------------------------------

    // if the reservation status is "nuova", update the status through a PUT request
    if (reservation.status === "nuova") {
        updateStatus(reservation);
    }

    // set an event listener on the "Accetta prenotazione" button to change the status to "confermata"
    const acceptButton = dialogReservation.querySelector(".dialogFooter .buttons .dialogAccept") as HTMLButtonElement;
    if (reservation.status === "confermata") {
        acceptButton.disabled = true;
        acceptButton.style.cursor = "not-allowed";
        acceptButton.style.opacity = "0.6";
    } else {
        acceptButton.addEventListener("click", () => {
            handleConfirm(overlay, reservation);
        });
    }

    // remove the archive icon from the dialog if the reservation is already archived
    if (reservation.archived) {
        removeIcon(dialogReservation);
    }

    //*** --------------------------------------------------------------

    // set event listeners for the delete action inside the dialog reservation
    dialogReservation.querySelector(".actions .trash")?.addEventListener("click", (event) => {
        closeDialogs(overlay); // close the actual dialog
        deleteCardDialog(overlay, reservation, event);
    });

    // set event listeners for the archive action inside the dialog reservation
    dialogReservation.querySelector(".actions .archive")?.addEventListener("click", (event) => {
        closeDialogs(overlay); // close the actual dialog
        archiveCardDialog(overlay, reservation, event);
    });

}
