/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-22
 * @description 
 */



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export async function deleteRequest(path: string, idRequest: number): Promise<any> {

    // get the token of auth, and pass it to the Authorization
    const token = localStorage.getItem("authToken");

    if (!token) {
        console.log("Token di autenticazione non trovato nel localStorage");
    }

    // try to fetch DELETE, for delete the request selected
    const response = await fetch(`${path}/${idRequest}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Errore cancellazione richiesta!");
    }
}
