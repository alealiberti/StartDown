
/**
 * Initializes toggle functionality for expandable yellow cards.
 * 
 * This function sets up click event listeners on card headers to toggle the visibility
 * of the associated card content. When a card header is clicked, the corresponding
 * card content expands if it is currently collapsed, or collapses if it is currently expanded.
 * All other cards are collapsed when one card is expanded.
 * 
 * @param {string} cardSelector - The CSS selector for the cards.
 * @param {string} headerSelector - The CSS selector for the card headers.
 * @param {string} contentSelector - The CSS selector for the card content.
 */
function initializeExpandableCards(
  cardSelector: string,
  headerSelector: string,
  contentSelector: string
): void {
  // Select all card elements based on the provided selector
  const cards = document.querySelectorAll<HTMLDivElement>(cardSelector);

  // Iterate through each card to set up the toggle functionality
  cards.forEach((card) => {
    // Select the header and content elements within the current card
    const header = card.querySelector<HTMLDivElement>(headerSelector);
    const content = card.querySelector<HTMLDivElement>(contentSelector);

    // Ensure both header and content elements are present
    if (header && content) {
      // Add a click event listener to the header
      header.addEventListener("click", () => {
        // Check if the current content is expanded
        const isExpanded = content.classList.contains("expanded");

        // Collapse all other cards
        cards.forEach((c) => {
          const otherContent = c.querySelector<HTMLDivElement>(contentSelector);
          if (otherContent && otherContent !== content) {
            otherContent.classList.remove("expanded");
            otherContent.style.maxHeight = "";
          }
        });

        // Toggle the clicked card's content
        if (isExpanded) {
          content.classList.remove("expanded");
          content.style.maxHeight = ""; // Collapse the content
        } else {
          content.classList.add("expanded");
          content.style.maxHeight = `${content.scrollHeight}px`; // Expand the content
        }
      });
    }
  });
}

// Example usage
document.addEventListener("DOMContentLoaded", () => {
  initializeExpandableCards(".opening-yellow-card", ".header", ".content");
});
