/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-21
 * @description function to update a user's password
 */



/**
 * function to update a user's password
 * it sends a PUT request to the server to update the password, passing the old and new password in the request body
 * authentication is handled by a token stored in the localStorage
 * 
 * @param {string} path - the API endpoint for updating the password
 * @param {string} oldPassword - the old password to be replaced
 * @param {string} newPassword - the new password
 * @returns {Promise<any>} - returns a promise with the result of the update operation
 */
export async function updatePassword(path: string, oldPassword: string, newPassword: string): Promise<any> {

    // get the token from localStorage and pass it in the Authorization header
    const token = localStorage.getItem("authToken");

    if (!token) {
        console.log("authentication token not found in localStorage");
    }

    // try to fetch PUT request to update the password
    const response = await fetch(`${path}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }) // send the old password and the new password
    });

    if (!response.ok) {
        throw new Error("password change failed");
    }

}