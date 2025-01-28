/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-26
 * @description 
 */




export function createHeader(HeaderText: string) {

    // take the section element list which will be PREPENDED the header generate there
    const section = document.querySelector("section#requests") as HTMLElement;

    const headerArchived = document.createElement("h3");
    headerArchived.textContent = `${HeaderText}`;
    document.querySelector("section#requests")?.prepend(headerArchived);
}