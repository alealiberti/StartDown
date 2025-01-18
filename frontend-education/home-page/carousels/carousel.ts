document.addEventListener("DOMContentLoaded", () => {
  // Seleziona tutti i caroselli
  const carousels = document.querySelectorAll(".img-carousel");

  carousels.forEach((carousel) => {
    const imgSection = carousel.querySelector(".img-section") as HTMLElement | null;
    const btnBack = carousel.querySelector(".button-back") as HTMLDivElement | null;
    const btnFront = carousel.querySelector(".button-front") as HTMLDivElement | null;
  
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
});