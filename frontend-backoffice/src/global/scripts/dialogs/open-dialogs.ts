/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-16
 * @description 
 */


import { createQuestionDialog } from "./dialog-card-question";
import { createReservationDialog } from "./dialog-card-reservation";

import { deleteCard } from "./dialog-delete";

import { type CardQuestion } from "../../models/card-question.model";
import { type CardReservation } from "../../models/card-reservation.model";




// TODO FIXARE LA LOGICA PER APRIRE LA MODALE DI CANCELLAZIONE DALLA CARD DIRETTAMENTE O DALLA MODALE
/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function openDialogs(card: HTMLElement, dialog: HTMLElement, request: CardQuestion | CardReservation): void {

    // take from the DOM the overlay which cover all the page whit a black nurse when DIALOGS ARE OPENED
    const overlay = document.querySelector(".overlay") as HTMLElement;

    // take from the DOM the element dialog delete sand show it when click on trash button (card preview && modals)
    const dialogDelete = document.querySelector(".dialogDeleteCard") as HTMLElement;

    // take from the DOM the element dialog archivie and show it when click on archivie button (card preview && modals)
    // const dialogArchivie =


    // --------------------------------------------------


    //* 01. add events listener to the card directly form the cards previews 
    // add the module function for the click on trash button on the cards preview which show the modal for the cancellation
    deleteCard(overlay, card, dialogDelete, request);

    // add the module function for the click on archivie button on the cards preview which show the modal for the archivation


    //* 02. add events listener on the cards (question/reservation) when are clicked show the OVERLAY + DIALOG OF REQUEST 
    card.addEventListener("click", () => {

        // on click on the cards questions/reservations will show an overlay and stop the scroll functionality
        overlay.style.display = "block";
        document.body.classList.add("hidden"); // will disable the scroll on the document!

        // show an dialog which contains the information of the question/reservation
        dialog.style.display = "flex";

        // check if the request is an question or an reservation, and show the respective dialog
        // IMPORTANT. can be also deleted the question/reservation card TROUGH DIALOGS WHERE ARE OPENED
        if ("question" in request) {
            createQuestionDialog(dialog, request);
            deleteCard(overlay, dialog, dialogDelete, request);
        } else if ("status" in request) {
            createReservationDialog(dialog, request);
            deleteCard(overlay, dialog, dialogDelete, request);
        }
    });


    // --------------------------------------------------


    /* add events listener on the OVERLAY when is visibile trough the click on the cards, a click outside it will close:
    01. the overlay itself
    02. the dialog of the question/reservation of the cards
    03. the dialog for the cancellation of an question/reservation 
    04. the dialog for the storage of an question/reservation 
    */
    overlay.addEventListener("click", () => {
        overlay.style.display = "none";
        dialog.style.display = "none";
        dialogDelete.style.display = "none";
        document.body.classList.remove("hidden");
    });

}