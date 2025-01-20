/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-20
 * @description 
 */




/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function closeDialogs(overlay: HTMLElement): void {

    // hide the overlay
    overlay.style.display = "none";
    document.body.classList.remove("hidden"); // re-able the scroll removing style

    // REMOVE FROM THE DOM ALL THE DIALOGS OPENED (resolve problems of events listener accumulated!)
    document.querySelectorAll("#dialog").forEach((dialog) => {
        dialog.remove();
    });

}