
/**
 * Initializes toggle functionality for expandable yellow cards.
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
  const cards = document.querySelectorAll<HTMLDivElement>(cardSelector);

  cards.forEach((card) => {
    const header = card.querySelector<HTMLDivElement>(headerSelector);
    const content = card.querySelector<HTMLDivElement>(contentSelector);

    if (header && content) {
      header.addEventListener("click", () => {
        const isExpanded = content.classList.contains("expanded");

        // Collapse all other cards
        cards.forEach((c) => {
          const otherContent = c.querySelector<HTMLDivElement>(contentSelector);
          if (otherContent && otherContent !== content) {
            otherContent.classList.remove("expanded");
            otherContent.style.maxHeight = "";
          }
        });

        // Toggle the clicked card
        if (isExpanded) {
          content.classList.remove("expanded");
          content.style.maxHeight = "";
        } else {
          content.classList.add("expanded");
          content.style.maxHeight = `${content.scrollHeight}px`;
        }
      });
    }
  });
}

// Example usage
document.addEventListener("DOMContentLoaded", () => {
  initializeExpandableCards(".opening-yellow-card", ".header", ".content");
});
