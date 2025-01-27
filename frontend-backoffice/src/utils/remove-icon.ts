/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-27
 * @description 
 */



/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function removeIcon(template: HTMLElement) {
    const archiveIcon = template.querySelector(".archive") as HTMLElement;
    archiveIcon.remove();
}





