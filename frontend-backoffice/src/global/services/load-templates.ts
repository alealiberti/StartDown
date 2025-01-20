/**
 * @file        load-templates.ts
 * @author      Gabriele Speciale
 * @date        2025-12-31
 * @description 
 */



/**
 * async function loadTemplate
 * Descrizione della funzione
 * @param {string} path - pattern of the template to load into DOM page's project templates/...
 */
export async function loadTemplate(path: string): Promise<void> {

    try {
        //01. wait to recive and get trough an fetch api the template of the question (insert it path)
        const response = await fetch(path); // GET THE template through the path of it

        //02. after received the template, create an container <div> element which recive as a innerHTML the template
        const templateHTML = await response.text(); // extract the template from the response as a string
        const templateContainer = document.createElement("div") as HTMLElement;
        templateContainer.innerHTML = templateHTML;

        //03. add the template card to the DOM of the pages of the backoffice (dashboard, questions, reservations) WILL BE HIDDEN! 
        document.body.appendChild(templateContainer);

        // DEBUGGING logs
        // console.log(response);
        // console.log(`HTML template response: ${templateHTML}`);
        // console.log(templateContainer);
        // console.log("\n\n\n\n-----------------------------------------------------------------------------\n\n\n\n");

        // error handling of the fetch loading templates
    } catch (error) {
        console.error(`error while trying to loading the templates: ${error}`);
    }

}