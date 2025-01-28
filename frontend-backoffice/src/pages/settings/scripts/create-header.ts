/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-26
 * @description contains the function to dynamically create a header and prepend it to a specific section in the DOM
 */



/**
 * creates an h3 header element and prepends it to a section with the id 'requests'
 * @param {string} HeaderText - the text content to insert into the header
 */
export function createHeader(HeaderText: string) {
    // create an h3 element and set its text content to the value of HeaderText
    const headerArchived = document.createElement("h3");
    headerArchived.textContent = `${HeaderText}`;

    // select the section with id 'requests' and prepend the newly created header to it
    document.querySelector("section#requests")?.prepend(headerArchived);
}
