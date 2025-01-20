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
export function createToastNotification(message: string, type: "success" | "error") {

    // selezionamento del modello toast corretto in base al successo / fallimento FETCH
    const templateToast = document.querySelector(`.toast${type === "success" ? "Success" : "Error"}`) as HTMLElement;

    // clone the model template of the toast and fill it whit the messsage
    const toast = templateToast.cloneNode(true) as HTMLElement;
    toast.querySelector(".info p")!.textContent = message;
    toast.classList.add("show");

    // add the cloned toast into the container which is positioned on top right of page
    document.querySelector(".toastContainer")?.appendChild(toast);

    // ----------------------------------------

    // add an event listener if the toast is clicked will be removed immediatly from the DOM container
    toast.addEventListener("click", () => {
        toast.remove();
    });

    // remove the clone toast from the DOM 
    setTimeout(() => {
        toast.remove();
    }, 5000);
}