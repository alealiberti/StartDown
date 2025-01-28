/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-20
 * @description handles the login authorization and token retrieval
 */



/**
 * function to authenticate the user and get the token
 * @param {string} username - the username for authentication
 * @param {string} password - the password for authentication
 * @param {string} path - the API path for the authentication request
 * @returns {Promise<any>} - returns the response containing the token in JSON format
 */
export async function loginAuth(username: string, password: string, path: string): Promise<any> {

    // encode the username and password into base64 for authorization header
    const credentials = btoa(`${username}:${password}`);

    // attempt to send a POST request to authenticate and get the token
    const response = await fetch(path, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${credentials}`,
        },
    });

    if (!response.ok) {
        throw new Error("invalid credentials");
    }

    return response.json(); // return the token response in JSON format
}
