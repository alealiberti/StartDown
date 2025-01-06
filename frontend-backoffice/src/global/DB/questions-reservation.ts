import { type CardQuestion } from "../../models/card-question.model";
import { type CardReservation } from "../../models/card-reservation.model";


// Dati di esempio temporanei da utilizzare per le questions 
export const questionData: CardQuestion[] = [
    { id: 0, name: "Mario", surname: "Rossi", phone: "3384465353", email: "mario@example.com", dateSend: "10/12/2024", question: "Domanda 1" },
    { id: 1, name: "Gianluigi", surname: "Romano", phone: null, email: "gianluigi@example.com", dateSend: "13/04/2023", question: "Domanda 2" },
    { id: 2, name: "Giorgio", surname: "Bianchi", phone: "3384465353", email: "giorgio@example.com", dateSend: "30/11/2022", question: "Domanda 3" },
    { id: 3, name: "Francesca", surname: "Verdi", phone: null, email: "francesca@example.com", dateSend: "05/01/2025", question: "Domanda 4" },
    { id: 4, name: "Alessandro", surname: "Neri", phone: null, email: "alessandro@example.com", dateSend: "15/02/2025", question: "Domanda 5" },
    { id: 5, name: "Lucia", surname: "Gialli", phone: "3384465353", email: "lucia@example.com", dateSend: "22/03/2025", question: "Domanda 6" },
];

// Dati di esempio temporanei da utilizzare per le reservations
export const reservationData: CardReservation[] = [
    {
        id: 0,
        name: "Giovanni",
        surname: "Verdi",
        phone: "1234567890",
        email: "giovanni@example.com",
        dateSend: "05/01/2025",
        dateStart: "10/01/2025",
        dateFinish: "12/01/2025",
        hourStart: "10:00",
        hourFinish: "14:00",
        status: "conclusa",
        typeGroup: "family",
        NCompanions: 4,
        NVisitors: 0,
        mobilityProblems: false,
        additionalInfo: "Nessuna richiesta speciale"
    },
    {
        id: 1,
        name: "Anna",
        surname: "Rossi",
        phone: "0987654321",
        email: "anna@example.com",
        dateSend: "05/01/2025",
        dateStart: "15/01/2025",
        dateFinish: "18/01/2025",
        hourStart: "09:00",
        hourFinish: "11:00",
        status: "nuova",
        typeGroup: "friends",
        NCompanions: 3,
        NVisitors: 1,
        mobilityProblems: true,
        additionalInfo: "Richiesta accesso facilitato"
    },
    {
        id: 3,
        name: "Luca",
        surname: "Bianchi",
        phone: "1122334455",
        email: "luca@example.com",
        dateSend: "05/01/2025",
        dateStart: "01/02/2025",
        dateFinish: "03/02/2025",
        hourStart: "15:00",
        hourFinish: "17:00",
        status: "accordare",
        typeGroup: "business",
        NCompanions: 2,
        NVisitors: 0,
        mobilityProblems: false,
        additionalInfo: "Nessuna richiesta speciale"
    }
];
