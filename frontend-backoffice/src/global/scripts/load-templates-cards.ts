export async function loadQuestionTemplate(): Promise<void> {

    // wait to recive and get trough an fetch api the template of the question (insert it path)
    const response = await fetch("/src/global/templates/cards/card-question.html");

    // after received the template, create an container element which recive as a innerHTML the template
    const templateHTML = await response.text(); // extract the template from the response as a string
    const templateContainer = document.createElement("div") as HTMLElement;
    templateContainer.innerHTML = templateHTML;

    // add the template container of the card to the DOM of the pages of the backoffice (dashboard, questions, reservations) WILL BE HIDDEN 
    document.body.appendChild(templateContainer);


    //? DEBUGGING
    console.log(response);
    console.log(`HTML template response: ${templateHTML}`);
    console.log(templateContainer);
    console.log("\n\n\n\n-----------------------------------------------------------------------------\n\n\n\n");

}