document.addEventListener("DOMContentLoaded", () => {
    const imgSection = document.querySelector(".img-section") as HTMLElement | null;
    const btnBack = document.querySelector(".button-back") as HTMLDivElement | null;
    const btnFront = document.querySelector(".button-front") as HTMLDivElement | null;
  
    if (!imgSection || !btnBack || !btnFront) {
      console.error("Impossibile trovare uno o più elementi richiesti.");
      return;
    }
  
    const scrollAmount = imgSection.offsetWidth;
  
    const updateButtonState = () => {
      // Disabilita il pulsante "Indietro" se siamo all'inizio
      if (imgSection.scrollLeft <= 0) {
        btnBack.classList.add("disabled");
      } else {
        btnBack.classList.remove("disabled");
      }
  
      // Disabilita il pulsante "Avanti" se siamo alla fine
      if (imgSection.scrollLeft + imgSection.offsetWidth >= imgSection.scrollWidth) {
        btnFront.classList.add("disabled");
      } else {
        btnFront.classList.remove("disabled");
      }
    };
  
    // Imposta lo stato iniziale dei pulsanti
    updateButtonState();
  
    btnBack.addEventListener("click", () => {
      if (imgSection.scrollLeft > 0) {
        imgSection.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
      setTimeout(updateButtonState, 300); // Aspetta che lo scroll si completi
    });
  
    btnFront.addEventListener("click", () => {
      if (imgSection.scrollLeft + imgSection.offsetWidth < imgSection.scrollWidth) {
        imgSection.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
      setTimeout(updateButtonState, 300); // Aspetta che lo scroll si completi
    });
  });

//** RESET AND GLOBAL STYLE **/
import "./../src/styles/reset.css";
import "./../src/styles/global.css";

//** NAVBAR **/
import "../src/components/navbar/navbar.css";
import "../src/components/navbar/navbar.ts";

//** FOOTER **/
import "../src/components/footer/footer.css";

//** HOME PAGE **/
import "./key-frame.css"
import "./style.css"