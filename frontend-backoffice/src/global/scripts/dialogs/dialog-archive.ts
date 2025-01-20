/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-17
 * @description 
 */

import { type CardQuestion } from "../../models/card-question.model";
import { type CardReservation } from "../../models/card-reservation.model";
import { loadTemplate } from "../../services/load-templates";
import { closeDialogs } from "./close-dialogs";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export async function archiveCardDialog(overlay: HTMLElement, request: CardQuestion | CardReservation, event: Event) {

    // avoid the propagation of the event to the card container event listener openModal
    event.stopPropagation();

    // show the overlay behind the dialog and stop the scroll on page
    overlay.style.display = "block";
    document.body.classList.add("hidden");

    await loadTemplate("/src/global/templates/dialogs/dialog-archive.html");
    const dialogArchive = document.querySelector(".dialogArchiveCard") as HTMLElement;


    // Gestisci il pulsante "Conferma"
    dialogArchive.querySelector(".confirm")?.addEventListener("click", async () => {
        console.log(`confermata archiviazione di ${request.name}`);
        closeDialogs(overlay);
    });

    // Gestisci il pulsante "Annulla"
    dialogArchive.querySelector(".cancel")?.addEventListener("click", () => {
        console.log(`declinata archiviazione di ${request.name}`);
        closeDialogs(overlay);
    });
}