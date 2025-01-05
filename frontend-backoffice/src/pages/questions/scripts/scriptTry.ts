// import the async function whit the promise which will response whit the template container element and the function which create dinamics cards whit objects
import { loadTemplate } from "../../../global/services/load-templates";
import { generateQuestionCards } from "../../../global/scripts/cards/generate-cards";



//*** wait the loading of the DOM before imports the templates and create the cards question ***
document.addEventListener("DOMContentLoaded", async () => {

    // await the response and recive from the fetch into the async function, the templates of question and reservation on the DOM
    await loadTemplate("/src/global/templates/cards/card-question.html");

    //* -----------------------------------------

    // get the list which will be filled whit the cards questions
    const listRequests = document.querySelector("section#requests") as HTMLElement;

    /*
    ! GOAL:
    access the templates template#cardQuestionTemplate element, 
    inside the <template> and dynamically fill it with datas taked from the DBs
    IMPORTANT! a template is not directly part of the visible DOM: it contains a #document-fragment 
    that must be cloned to be used.
    we pass this template into the functions: 1. generateQuestionCards and will create clones of it
    */
    const questionTemplate = document.querySelector("template#cardQuestionTemplate") as HTMLTemplateElement;

    //* ----------------------------------------

    generateQuestionCards(listRequests, questionTemplate);

});