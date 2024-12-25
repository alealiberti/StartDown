export interface CardReservation {
    id: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    typeGroup: string,
    NCompanions: number,
    NVisitors: number,
    typeReservation: string,
    //! todo implementation date management!
    secondaryDelivery: string | null,
    request: string | null
}