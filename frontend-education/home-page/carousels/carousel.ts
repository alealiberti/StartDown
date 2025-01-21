// carousel.ts

// Function to initialize the carousel buttons functionality
export function initializeCarousel() {
  // Select all carousels on the page
  const carousels = document.querySelectorAll('.carousel');
  if (!carousels.length) return;

  // Iterate through each carousel
  carousels.forEach((carousel) => {
    const imgSection = carousel.querySelector('.img-section') as HTMLElement;
    const buttonBack = carousel.querySelector('.button-back') as HTMLElement;
    const buttonFront = carousel.querySelector('.button-front') as HTMLElement;

    if (!imgSection || !buttonBack || !buttonFront) return;

    // Scroll to the previous image
    buttonBack.addEventListener('click', () => {
      imgSection.scrollBy({
        left: -imgSection.clientWidth,
        behavior: 'smooth',
      });
    });

    // Scroll to the next image
    buttonFront.addEventListener('click', () => {
      imgSection.scrollBy({
        left: imgSection.clientWidth,
        behavior: 'smooth',
      });
    });
  });
}

// Initialize carousels after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeCarousel();
});