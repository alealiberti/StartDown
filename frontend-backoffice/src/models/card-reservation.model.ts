export interface CardReservation {
    id: number,
    name: string,
    surname: string,
    phone: string | null,
    email: string,
    dateSend: string,
    dateStart: string | null,
    dateFinish: string | null,
    hourStart: string | null,
    hourFinish: string | null,
    status: string,
    typeGroup: string | null,
    visitors: number,
    companions: number,
    additionalInfo: string | null
    mobilityProblems: boolean,
}
