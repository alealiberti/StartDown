import "../../styles/cards/card-reservation.css";


export const cardReservationTemplate = `
<div class="cardReservation">

    <div class="cardHeader">
        <div>
            <h2 class="cardName">Giorgio Bianchi</h2>
            <p class="cardEmail">your@email.com</p>
        </div>
        <p class="cardDate">10/12/2024</p>
    </div>

    <div class="cardFooter">
        <div class="cardState">
            <ion-icon name="ellipse"></ion-icon>
            <p class="stateDescription">Nuova richiesta di prenotazione</p>
        </div>
        <div class="cardActions">
            <ion-icon name="archive"></ion-icon>
            <ion-icon name="trash"></ion-icon>
        </div>
    </div>

</div>
`;