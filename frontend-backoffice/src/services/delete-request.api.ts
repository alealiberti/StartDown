/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-20
 * @description handles the deletion of a request by sending a DELETE request to the API
 */



/**
 * function to delete a request by its ID
 * @param {string} path - the API path to send the request
 * @param {number} idRequest - the ID of the request to be deleted
 * @returns {Promise<any>} - resolves when the request has been successfully deleted
 */
export async function deleteRequest(path: string, idRequest: number): Promise<any> {

    // get the token from localStorage for authorization
    const token = localStorage.getItem("authToken");

    if (!token) {
        console.log("authentication token not found in localStorage");
    }

    // attempt to send a DELETE request to remove the specified request
    const response = await fetch(`${path}/${idRequest}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("errore tentativo cancellazione richiesta!");
    }
}