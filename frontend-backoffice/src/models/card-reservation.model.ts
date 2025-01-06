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
    NCompanions: number,
    NVisitors: number,
    mobilityProblems: boolean,
    additionalInfo: string | null
}