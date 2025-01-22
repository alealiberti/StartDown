/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-21
 * @description 
 */

//test routing if the cookies local storage is not setted: http://localhost:3000/src/pages/dashboard/index.html

/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function authGuard(): void {

    const token = localStorage.getItem("authToken");

    // if token is not setted in local storage (bypass login), will render the user to the login page.html
    if (!token) {
        window.location.href = "/index.html";
    }
}

