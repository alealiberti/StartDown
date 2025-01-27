/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-21
 * @description 
 */



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export async function updatePassword(path: string, oldPassword: string, newPassword: string): Promise<any> {

    // get the token of auth, and pass it to the Authorization
    const token = localStorage.getItem("authToken");

    if (!token) {
        console.log("Token di autenticazione non trovato nel localStorage");
    }

    // try to fetch PUT, for update the passsword 
    const response = await fetch(`${path}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }) // let's pass the old password and the new password
    });

    if (!response.ok) {
        throw new Error("cambiamento password!");
    }

}