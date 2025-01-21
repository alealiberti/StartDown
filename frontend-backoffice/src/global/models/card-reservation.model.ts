export interface CardReservation {
    id: number,
    name: string,
    surname: string,
    phone: string | null,
    email: string,
    dateSend: string,
    dateStart: string | null,
    dateFinish: string | null,
    hourStart: string | null, // {"hourStart": "09:45"}
    hourFinish: string | null,
    status: string,
    archived: boolean,
    typeGroup: string | null,
    visitors: number,
    companions: number,
    additionalInfo: string | null
    mobilityProblems: boolean,
}
