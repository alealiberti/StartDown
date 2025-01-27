/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-27
 * @description contains the function to remove the archive icon from a template element
 */



/**
 * removes the archive icon from the provided template
 * @param {HTMLElement} template - the element from which the archive icon will be removed
 */
export function removeIcon(template: HTMLElement) {
    const archiveIcon = template.querySelector(".archive") as HTMLElement;
    archiveIcon.remove();
}
