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
export async function loginAuth(username: string, password: string, path: string): Promise<any> {

    // let's take the inputs of the username and password, and send them into an autoziration headers
    const credentials = btoa(`${username}:${password}`);

    // try to fetch POST, to get the token auth in login page
    const response = await fetch(path, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${credentials}`,
        },
    });

    if (!response.ok) {
        throw new Error("Credenziali errate! riprova!");
    }

    return response.json(); // return the token response into JSON

}
