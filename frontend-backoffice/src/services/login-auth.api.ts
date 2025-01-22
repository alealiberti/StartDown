/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-22
 * @description 
 */



export async function loginAuth(username: string, password: string, path: string): Promise<any> {

    // let's take the inputs of the username and password, and send them into an autoziration headers
    const credentials = btoa(`${username}:${password}`);

    // try to fetch 

    const response = await fetch(path, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${credentials}`,
        },
    });

    if (!response.ok) {
        throw new Error("Credenziali inserite errate! riprova!");
    }

    return response.json(); // Ritorna i dati della risposta

}
