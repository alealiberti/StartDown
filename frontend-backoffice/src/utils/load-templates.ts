/**
 * @file        load-templates.ts
 * @author      Gabriele Speciale
 * @date        2025-12-31
 * @description script to dynamically load html templates into the dom
 */



/**
 * asynchronously loads an html template into the dom
 * @param {string} path - path to the template to load into the dom
 * @returns {Promise<void>} resolves once the template is loaded
 */
export async function loadTemplate(path: string): Promise<void> {

    try {
        // fetch the template from the provided path
        const response = await fetch(path); // retrieve the template as a response object

        // parse the template content as a string
        const templateHTML = await response.text();

        // create a container element and set its innerHTML to the template content
        const templateContainer = document.createElement("div") as HTMLElement;
        templateContainer.innerHTML = templateHTML;

        // append the template container to the dom (it will be hidden by default)
        document.body.appendChild(templateContainer);

    } catch (error) {
        // log an error if the template fails to load
        console.error(`error while trying to load the template: ${error}`);
    }

}