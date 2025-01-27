/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-20
 * @description script to close dialogs and remove them from the dom
 */



/**
 * closes all dialogs and removes them from the dom
 * @param {HTMLElement} overlay - element that covers the page and blocks interaction with other elements
 * @returns {void}
 */
export function closeDialogs(overlay: HTMLElement): void {

    // hide the overlay
    overlay.style.display = "none";
    document.body.classList.remove("hidden"); // re-enable the scroll by removing the style

    // get all dialogs by #id and remove them from the dom to resolve event listener accumulation issues
    document.querySelectorAll("#dialog").forEach((dialog) => {
        dialog.remove(); // remove the dialog from the dom
    });
}