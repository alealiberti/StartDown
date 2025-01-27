/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-20
 * @description handles fetching the requests from the API (questions or reservations)
 */



/**
 * function to get the requests (questions or reservations)
 * @param {string} path - the API path to fetch the requests from
 * @returns {Promise<any>} - returns the requests in JSON format
 */
export async function getRequests(path: string): Promise<any> {

    // get the token from localStorage for authorization
    const token = localStorage.getItem("authToken");

    if (!token) {
        console.log("authentication token not found in localStorage");
    }

    // attempt to send a GET request to retrieve the questions or reservations
    const response = await fetch(path, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("error trying to fetch the requests");
    }

    return response.json(); // return the requests in JSON format
}