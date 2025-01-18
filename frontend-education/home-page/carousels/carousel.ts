/**
 * Initializes carousel functionality including scroll behavior and button states.
 * This function listens for the DOMContentLoaded event to ensure the DOM is fully loaded before executing.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Select all carousels on the page
  const carousels = document.querySelectorAll(".img-carousel");

  /**
   * Iterates through each carousel and attaches functionality to the buttons and scrollable section.
   */
  carousels.forEach((carousel) => {
    // Select the image section and the back and front buttons
    const imgSection = carousel.querySelector(".img-section") as HTMLElement | null;
    const btnBack = carousel.querySelector(".button-back") as HTMLDivElement | null;
    const btnFront = carousel.querySelector(".button-front") as HTMLDivElement | null;

    // Check if the required elements are found
    if (!imgSection || !btnBack || !btnFront) {
      console.error("Unable to find one or more required elements.");
      return;
    }

    // Set the scroll amount based on the width of the image section
    const scrollAmount = imgSection.offsetWidth;

    /**
     * Updates the button states based on the current scroll position.
     */
    const updateButtonState = () => {
      // Disable the "Back" button if at the beginning
      if (imgSection.scrollLeft <= 0) {
        btnBack.classList.add("disabled");
      } else {
        btnBack.classList.remove("disabled");
      }

      // Disable the "Front" button if at the end
      if (imgSection.scrollLeft + imgSection.offsetWidth >= imgSection.scrollWidth) {
        btnFront.classList.add("disabled");
      } else {
        btnFront.classList.remove("disabled");
      }
    };

    // Set the initial state of the buttons
    updateButtonState();

    /**
     * Adds click event for the "Back" button.
     * Scrolls the image section by the width of the section.
     */
    btnBack.addEventListener("click", () => {
      if (imgSection.scrollLeft > 0) {
        imgSection.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
      setTimeout(updateButtonState, 300); // Wait for scroll to complete
    });

    /**
     * Adds click event for the "Front" button.
     * Scrolls the image section by the width of the section.
     */
    btnFront.addEventListener("click", () => {
      if (imgSection.scrollLeft + imgSection.offsetWidth < imgSection.scrollWidth) {
        imgSection.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
      setTimeout(updateButtonState, 300); // Wait for scroll to complete
    });
  });
});