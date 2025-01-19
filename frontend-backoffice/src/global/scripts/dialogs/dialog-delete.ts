/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-17
 * @description 
 */

import { type CardQuestion } from "../../models/card-question.model";
import { type CardReservation } from "../../models/card-reservation.model";



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function deleteCard(overlay: HTMLElement, cardORmodal: HTMLElement, dialogDelete: HTMLElement, request: CardQuestion | CardReservation): void {

    // event on the card preview || dialog of request, when is clicked the trash button will show the dialog of cancellation of the request
    cardORmodal.querySelector(".actions .trash")?.addEventListener("click", handleClick);




    function handleClick(event) {
        console.log(event.target);
        console.log(request.name)

        // show the overlay behind the dialog and stop the scroll
        overlay.style.display = "block";
        document.body.classList.add("hidden");

        // show the dialog for confirm or reject the delete of the card
        dialogDelete.style.display = "flex";

        // if the element which on click trash button is modal of question/reservation will close it and show only the dialog of delete
        if (cardORmodal.classList.contains("dialogQuestion") || cardORmodal.classList.contains("dialogReservation")) {
            cardORmodal.style.display = "none";
            cardORmodal.querySelector(".actions .trash")?.removeEventListener("click", handleClick);
        }

        // avoid the propagation of the event to the card container event listener openModal
        event.stopPropagation();

        // event on the button which confirm the cancellation of the selectioned request, do a FETCH DELETE 
        dialogDelete.querySelector(".dialogActions .confirmDelete")?.addEventListener("click", handleDelete);
    }



    function handleDelete() {
        console.log(request);
        console.log(`hai cancellato la richiesta di: ${request.name}`);
        dialogDelete.querySelector(".dialogActions .confirmDelete")?.removeEventListener("click", handleDelete);
    }

}