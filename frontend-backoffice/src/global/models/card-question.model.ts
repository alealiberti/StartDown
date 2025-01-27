// model type, of the quesion
export interface CardQuestion {
    id: number,
    name: string,
    surname: string,
    phone: string | null,
    email: string,
    dateSend: string,
    text: string,
    archived: boolean
}