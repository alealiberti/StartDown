import { type CardQuestion } from "../../models/card-question.model";
import { type CardReservation } from "../../models/card-reservation.model";

//! IMPORTANTE FORMATO DATE IN JS con new Date():  MESE/GIORNO/ANNO 



// Dati di esempio temporanei da utilizzare per le questions 
export const questionsData: CardQuestion[] = [
    { id: 0, name: "Mario", surname: "Rossi", phone: "3384465353", email: "mario@example.com", dateSend: "10/23/2021", question: "Domanda 1" },
    { id: 1, name: "Gianluigi", surname: "Romano", phone: null, email: "gianluigi@example.com", dateSend: "12/05/2023", question: "Domanda 2" },
    { id: 2, name: "Giorgio", surname: "Bianchi", phone: "3384465353", email: "giorgio@example.com", dateSend: "03/22/2023", question: "Domanda 3" },
    { id: 3, name: "Francesca", surname: "Verdi", phone: null, email: "francesca@example.com", dateSend: "04/13/2023", question: "Domanda 4" },
    { id: 4, name: "Alessandro", surname: "Neri", phone: null, email: "alessandro@example.com", dateSend: "12/10/2022", question: "Domanda 5" },
    { id: 5, name: "Lucia", surname: "Gialli", phone: "3384465353", email: "lucia@example.com", dateSend: "11/30/2022", question: "Domanda 6" },
];

// Dati di esempio temporanei da utilizzare per le reservations
export const reservationsData: CardReservation[] = [
    {
        id: 0,
        name: "Giovanni",
        surname: "Verdi",
        phone: "1234567890",
        email: "giovanni@example.com",
        dateSend: "10/11/2023",
        dateStart: "01/10/2023",
        dateFinish: "01/12/2023",
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
        dateSend: "03/22/2024",
        dateStart: "08/15/2022",
        dateFinish: "01/18/2023",
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
        id: 2,
        name: "Luca",
        surname: "Bianchi",
        phone: "1122334455",
        email: "luca@example.com",
        dateSend: "01/01/2024",
        dateStart: "02/01/2022",
        dateFinish: "02/03/2022",
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



// Dati di esempi temporanei da utilizzzare per le ultime 5 questions/reservations mixate nella dashboard!

// accetta come parametri i questionsData e reservationsData, verrà ritornato come valore nella funzione un array mixato tramite il destructuring e riordinato per data
const latestQuestionsReservations = (questionsData: CardQuestion[], reservationsData: CardReservation[])
    : (CardQuestion | CardReservation)[] => {

    // destructuring dei 2 array
    const combinedRequests = [...questionsData, ...reservationsData];

    // andiamo ad ordinare per `.dateSend` (dal più recente al meno recente) passando 2 ogetti di questions/reservations alla volta
    combinedRequests.sort((a, b) => {

        // convertiamo la data in "ms" e riodiniamo in modo decrescente
        const dateA = new Date(a.dateSend).getTime();
        const dateB = new Date(b.dateSend).getTime();

        return dateB - dateA; // scambio di posizione
    });

    // restituiamo come array mixato ordinato per data le ultime 5 RICHIESTE
    return combinedRequests.slice(0, 5);
}


export const latestRequests = latestQuestionsReservations(questionsData, reservationsData);
console.log(latestQuestionsReservations(questionsData, reservationsData));
