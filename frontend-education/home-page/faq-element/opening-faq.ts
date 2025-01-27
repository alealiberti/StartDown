/**
 * Initializes toggle functionality for FAQ items.
 * 
 * @param {string} faqItemSelector - The CSS selector for the FAQ items.
 * @param {string} questionSelector - The CSS selector for the question elements within each FAQ item.
 */
function initializeFaqToggle(faqItemSelector: string, questionSelector: string): void {
  const faqItems = document.querySelectorAll(faqItemSelector) as NodeListOf<HTMLElement>;

  faqItems.forEach((item) => {
    const question = item.querySelector(questionSelector) as HTMLElement;

    if (question) {
      question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle the clicked FAQ item
        item.classList.toggle('active');
      });
    }
  });
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  initializeFaqToggle('.faq-item', '.faq-question');
});