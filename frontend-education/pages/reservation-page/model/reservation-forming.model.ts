export interface ReservationFormData {
    name: string;
    surname: string;
    phone: string;
    email: string;
    dateStart: string;
    dateFinish: string;
    hourStart: string;
    hourFinish: string;
    typeGroup: string;
    visitors: number;
    companions: number;
    additionalInfo: string;
    mobilityProblems: boolean;
}