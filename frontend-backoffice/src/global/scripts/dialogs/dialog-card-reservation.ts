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
import { createToastNotification } from "../toasts/toast-notification";

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
        await updateStatusReservation("http://localhost:8080/cascina-caccia/reservations/update-reservation",
            reservation, "accordare"
        );

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
async function handleConfirm(overlay: HTMLElement, reservation: CardReservation) {

    // call the "updateStatusReservation" function for update the status on "conclusa" when the button "Accetta prenotazione" is clicked
    try {
        await updateStatusReservation("http://localhost:8080/cascina-caccia/reservations/update-reservation",
            reservation, "conclusa"
        );
        closeDialogs(overlay);
        createToastNotification("Prenotazione confermata!", "success");
        setTimeout(() => {
            location.reload();
        }, 2000);

    } catch (err) {
        closeDialogs(overlay);
        createToastNotification("Errore conferma prenotazione!", "error");
    }
}


// ----------------------------------------------------


/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function createDialogReservation(overlay: HTMLElement, dialogReservation: HTMLElement, reservation: CardReservation): void {

    // sets all the datas of the reservation into the ELEMENT dialogReservation
    dialogReservation.querySelector(".dialogHeader h2.name")!.textContent = `${reservation.name} ${reservation.surname}`;
    dialogReservation.querySelector(".dialogHeader p.email")!.textContent = reservation.email;
    dialogReservation.querySelector(".dialogHeader p.dateSend")!.textContent = restructureDate(reservation.dateSend);
    dialogReservation.querySelector(".dialogHeader p.phone")!.textContent = reservation.phone ?? "N/A";

    /* datas body of the reservations into the ELEMENT dialogReservation, (will be created checks bc datas can be NULL!)
    for the datas which are none, the text content will be filled whit an "N/A" */

    // check the status of the reservation and fill the color of the ellipse icon
    dialogReservation.querySelector(".dialogBody p.status strong")!.textContent += ` ${reservation.status} prenotazione`;
    const stateReservationIcon = dialogReservation.querySelector(".dialogBody p.status ion-icon") as HTMLElement;
    switch (true) {
        case reservation.status === "nuova":
            stateReservationIcon.style.color = "#FF0004";
            break;
        case reservation.status === "accordare":
            stateReservationIcon.style.color = "#F49E00";
            break;
        case reservation.status === "conclusa":
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
    // visitors and companions are type:number, so must be converted into string type whit TEMPLATE LITERALS
    dialogReservation.querySelector(".dialogBody p.visitors span")!.textContent += `${reservation.visitors}`;
    dialogReservation.querySelector(".dialogBody p.companions span")!.textContent += `${reservation.companions ?? "N/A"}`;
    // check the boolean if there are mobility problems or no
    dialogReservation.querySelector(".dialogBody p.mobilityProblems span")!.textContent += reservation.mobilityProblems ? "Yes" : "No";

    // -------------------------------------------------------

    //*** if the status is "nuova", so never opened, on the dialog reservation open, change the status through FETCH PUT
    if (reservation.status === "nuova") {
        updateStatus(reservation);
    }

    /*
    *sets an event listener on the button "Accetta prenotazione", will change the status through FETCH PUT
    *if the status of the reservation is "conclusa", the button will be disable
    */
    const acceptButton = dialogReservation.querySelector(".dialogFooter .buttons .dialogAccept") as HTMLButtonElement;
    if (reservation.status === "conclusa") {
        // disable the button and add an style for the admin to understand that reservation is already accepted
        acceptButton.disabled = true;
        acceptButton.style.cursor = "not-allowed";
        acceptButton.style.opacity = "0.6";
    } else {
        acceptButton.addEventListener("click", () => {
            handleConfirm(overlay, reservation);
        });
    }

    // -------------------------------------------------------

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

}