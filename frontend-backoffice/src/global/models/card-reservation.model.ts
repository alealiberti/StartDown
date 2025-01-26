export interface CardReservation {
    id: number,
    name: string,
    surname: string,
    email: string,
    phone: string | null,
    dateSend: string,
    dateStart: string,
    dateFinish: string | null,
    hourStart: string | null, // {"hourStart": "09:45"}
    hourFinish: string | null,
    status: string,
    typeGroup: string,
    visitors: number,
    companions: number | null,
    additionalInfo: string | null
    mobilityProblems: boolean,
    archived: boolean,
}
