/**
 * @file carousel.ts
 * @description Provides functionality to initialize and manage carousel components on a webpage.
 * Includes navigation with smooth scrolling for forward and backward controls.
 * 
 * @author Alessio Burbulia
 * @date 2025-01-27
 * 
 * @usage 
 * - Ensure each carousel in the HTML structure contains:
 *   - A container with the class `.carousel`.
 *   - An image section with the class `.img-section`.
 *   - Navigation buttons with classes `.button-back` and `.button-front`.
 * - Import and call the `initializeCarousel()` function to enable functionality.
 * 
 * No external dependencies are required.
 */

/**
 * Initializes all carousel components on the page.
 * Adds click event listeners to navigate between images for each carousel.
 * 
 * @example
 * HTML Structure:
 * <div class="carousel">
 *   <div class="img-section">...</div>
 *   <button class="button-back">Back</button>
 *   <button class="button-front">Next</button>
 * </div>
 * 
 * @returns {void}
 */
export function initializeCarousel() {
  // Select all carousels on the page
  const carousels = document.querySelectorAll('.carousel');
  if (!carousels.length) return; // Exit if there are no carousels

  // Iterate through each carousel
  carousels.forEach((carousel) => {
    const imgSection = carousel.querySelector('.img-section') as HTMLElement;
    const buttonBack = carousel.querySelector('.button-back') as HTMLElement;
    const buttonFront = carousel.querySelector('.button-front') as HTMLElement;

    // Ensure all necessary elements are present
    if (!imgSection || !buttonBack || !buttonFront) return;

    // Add event listener for scrolling to the previous image
    buttonBack.addEventListener('click', () => {
      imgSection.scrollBy({
        left: -imgSection.clientWidth, // Scroll left by the width of one image
        behavior: 'smooth', // Smooth scrolling effect
      });
    });

    // Add event listener for scrolling to the next image
    buttonFront.addEventListener('click', () => {
      imgSection.scrollBy({
        left: imgSection.clientWidth, // Scroll right by the width of one image
        behavior: 'smooth', // Smooth scrolling effect
      });
    });
  });
}

// Initialize carousels after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeCarousel();
});