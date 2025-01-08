/**
 * Nome della funzione
 * Descrizione della funzione
 * @param {TipoInput1} NomeInput1 - DescrizioneInput1
 * @param {TipoInput2} NomeInput2 - DescrizioneInput2
 * @returns {TipoOutput} - DescrizioneOutput
 */
export function addEventsOnCard(overlay: HTMLElement, card: HTMLElement, modal: HTMLElement) {

    // add the events listeners to the question cards and dialog card question
    card.addEventListener("click", () => {
        overlay.style.display = "block";
        modal.style.display = "block";
    });
    overlay.addEventListener("click", () => {
        modal.style.display = "none";
    });

    console.log(card);


}