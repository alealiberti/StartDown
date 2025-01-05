
export async function loadTemplate(path: string): Promise<HTMLElement | null> {

    try {
        // wait to recive and get trough an fetch api the template of the question (insert it path)
        const response = await fetch(path);

        if (!response.ok) {
            console.error(`Failed to load template from ${path}: ${response.statusText}`);
            return null;
        }

        // after received the template, create an container <div> element which recive as a innerHTML the template
        const templateHTML = await response.text(); // extract the template from the response as a string
        const templateContainer = document.createElement("div") as HTMLElement;
        templateContainer.innerHTML = templateHTML;

        // add the template of the card to the DOM of the pages of the backoffice (dashboard, questions, reservations) WILL BE HIDDEN! 
        document.body.appendChild(templateContainer);

        //? DEBUGGING logs
        console.log(response);
        console.log(`HTML template response: ${templateHTML}`);
        console.log(templateContainer);
        console.log("\n\n\n\n-----------------------------------------------------------------------------\n\n\n\n");


        return templateContainer;

        // error handling of the fetch loading templates
    } catch (error) {
        console.error(`error while trying to loading the templates: ${error}`);
        return null;
    }

}
