import { CardReservation } from "../../../models/card-reservation.model";


export function createCardReservation(data: CardReservation, template: HTMLTemplateElement): HTMLElement | null {


    // Clona il contenuto del template preso come argomento dal DOM (per distinguere le card e non sovrascriverle)
    const templateContent = template?.content.cloneNode(true) as DocumentFragment;

    // Trova il div principale della card all'interno del document-fragment, qui andranno popolati i dati delle richieste
    const CardReservation = templateContent.querySelector(".cardReservation") as HTMLElement;

    // those elements inside the container card, will recive a value (! sospended)
    CardReservation.querySelector(".cardHeader h2.cardName")!.textContent = `${data.name} ${data.surname}`;
    CardReservation.querySelector(".cardHeader p.cardEmail")!.textContent = data.email
    CardReservation.querySelector(".cardHeader p.cardDate")!.textContent = data.dateSend;


    switch (true) {
        case data.status === "nuova":
            CardReservation.querySelector(".cardState p.stateDescription")!.textContent = "Nuova richiesta di prenotazione";
            break;

        case data.status === "accordare":
            CardReservation.querySelector(".cardState p.stateDescription")!.textContent = "Visualizzata (da accordare)";
            break;

        case data.status === "conclusa":
            CardReservation.querySelector(".cardState p.stateDescription")!.textContent = "Prenotazione concordata";
            break;

        default:
            CardReservation.querySelector(".cardState p.stateDescription")!.textContent = "???";
            break;
    }


    return CardReservation;
}