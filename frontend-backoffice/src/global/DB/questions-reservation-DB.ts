import { type CardQuestion } from "../models/card-question.model";
import { type CardReservation } from "../models/card-reservation.model";

//! IMPORTANTE FORMATO DATE IN JS con new Date():  MESE/GIORNO/ANNO 



// Dati di esempio temporanei da utilizzare per le questions 
export const questionsData: CardQuestion[] = [
    {
        id: 0,
        name: "Mario",
        surname: "Rossi",
        phone: "3384465353",
        email: "mario@example.com",
        dateSend: "10/23/2021",
        question: "Salve, vorrei avere maggiori informazioni riguardo alla possibilità di prenotare un'attrezzatura sportiva per un'intera settimana. Nello specifico, vorrei sapere quali sono le opzioni di noleggio disponibili, se esistono pacchetti che includono servizi aggiuntivi come consulenze o corsi personalizzati, e se i costi variano in base al tipo di attrezzatura richiesta. Inoltre, mi interessa sapere quali sono le modalità di pagamento accettate e se è possibile ottenere una fattura elettronica per l'eventuale noleggio."
    },
    {
        id: 1,
        name: "Gianluigi",
        surname: "Romano",
        phone: null,
        email: "gianluigi@example.com",
        dateSend: "12/05/2023",
        question: "Buongiorno, sto organizzando un evento sportivo per un gruppo numeroso composto da oltre 10 persone e mi chiedevo se fosse possibile ottenere uno sconto per il noleggio di attrezzature. Inoltre, vorrei sapere se offrite pacchetti specifici per gruppi o aziende, che includano l'accesso a determinate aree della palestra, il supporto di istruttori qualificati, o la possibilità di prenotare attività di team building. Infine, potrei sapere con quanto anticipo è necessario effettuare la prenotazione per garantirci la disponibilità?"
    },
    {
        id: 2,
        name: "Giorgio",
        surname: "Bianchi",
        phone: "3384465353",
        email: "giorgio@example.com",
        dateSend: "03/22/2023",
        question: "Ciao, sto cercando informazioni dettagliate riguardo alle attrezzature sportive disponibili nel vostro centro. In particolare, mi interesserebbe sapere se avete attrezzature specifiche per attività particolari come il pilates, lo spinning, o il crossfit. Inoltre, vorrei capire se ci sono delle condizioni particolari di utilizzo da rispettare, come orari specifici, regole per la manutenzione durante il noleggio, e politiche relative alla sostituzione di eventuali attrezzature danneggiate. Questi dettagli mi serviranno per organizzare al meglio un evento aziendale."
    },
    {
        id: 3,
        name: "Francesca",
        surname: "Verdi",
        phone: null,
        email: "francesca@example.com",
        dateSend: "04/13/2023",
        question: "Vorrei sapere se offrite pacchetti speciali per famiglie che includano l'accesso a più servizi contemporaneamente. Ad esempio, stiamo cercando un'opzione che consenta ai bambini di partecipare a attività organizzate come lezioni di gruppo o giochi sportivi, mentre noi adulti utilizziamo le attrezzature della palestra. Inoltre, sarebbe utile sapere se offrite spazi dedicati per i più piccoli e se ci sono sconti per famiglie che prenotano con frequenza regolare o per più giorni consecutivi. Potreste fornirmi qualche esempio di pacchetto famiglia, comprensivo di costi e dettagli?"
    },
    {
        id: 4,
        name: "Alessandro",
        surname: "Neri",
        phone: null,
        email: "alessandro@example.com",
        dateSend: "12/10/2022",
        question: "Salve, ho visto che offrite la possibilità di prenotare online le attrezzature sportive. Mi chiedevo quali siano le vostre politiche riguardo la modifica o la cancellazione delle date di prenotazione una volta che questa è stata confermata. Ad esempio, se dovessi cambiare i miei piani all'ultimo momento, è previsto un rimborso completo o parziale? Inoltre, esistono limiti di tempo per apportare modifiche, come un preavviso minimo, e quali sono i passaggi per richiedere una modifica? Vorrei essere sicuro di conoscere tutte le opzioni prima di procedere."
    },
    {
        id: 5,
        name: "Lucia",
        surname: "Gialli",
        phone: "3384465353",
        email: "lucia@example.com",
        dateSend: "11/30/2022",
        question: "Buongiorno, vorrei chiedere informazioni sulla durata massima consentita per il noleggio delle attrezzature. Ad esempio, ci sono limiti specifici per il noleggio giornaliero, settimanale o mensile? Inoltre, vorrei sapere quali sono le penali previste nel caso in cui si restituisca l'attrezzatura in ritardo o si riscontrino danni. È possibile stipulare una copertura assicurativa per evitare costi aggiuntivi? Infine, sarei interessata a sapere se offrite servizi di consegna e ritiro delle attrezzature, e quali sono le relative tariffe."
    }
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
        visitors: 1,
        companions: 3,
        additionalInfo: "Richiesto accesso per carrozzina e spazio per i bambini",
        mobilityProblems: true
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
        visitors: 1,
        companions: 3,
        additionalInfo: "Richiesto accesso per carrozzina e spazio per i bambini",
        mobilityProblems: true
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
        visitors: 1,
        companions: 3,
        additionalInfo: "Richiesto accesso per carrozzina e spazio per i bambini",
        mobilityProblems: true
    },
    {
        id: 3,
        name: "Martina",
        surname: "Neri",
        phone: "2233445566",
        email: "martina@example.com",
        dateSend: "01/10/2023",
        dateStart: "01/15/2024",
        dateFinish: "01/15/2024",
        hourStart: "08:30",
        hourFinish: "12:30",
        status: "nuova",
        typeGroup: "individual",
        visitors: 1,
        companions: 3,
        additionalInfo: "Richiesto accesso per carrozzina e spazio per i bambini",
        mobilityProblems: true
    },
    {
        id: 4,
        name: "Federico",
        surname: "Romano",
        phone: "3344556677",
        email: "federico@example.com",
        dateSend: "01/05/2022",
        dateStart: "01/20/2024",
        dateFinish: "01/22/2024",
        hourStart: "13:00",
        hourFinish: "18:00",
        status: "conclusa",
        typeGroup: "sports",
        visitors: 1,
        companions: 3,
        additionalInfo: "Richiesto accesso per carrozzina e spazio per i bambini",
        mobilityProblems: true
    },
    {
        id: 5,
        name: "Sara",
        surname: "Gialli",
        phone: "4455667788",
        email: "sara@example.com",
        dateSend: "12/28/2021",
        dateStart: "01/02/2024",
        dateFinish: "01/02/2024",
        hourStart: "10:00",
        hourFinish: "13:00",
        status: "accordare",
        typeGroup: "family",
        visitors: 1,
        companions: 3,
        additionalInfo: "Richiesto accesso per carrozzina e spazio per i bambini",
        mobilityProblems: true
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

