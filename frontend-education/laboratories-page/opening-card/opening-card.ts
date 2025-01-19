document.addEventListener("DOMContentLoaded", () => {

    
    const cards = document.querySelectorAll<HTMLDivElement>(".opening-yellow-card");
  
    cards.forEach((card) => {

      const header = card.querySelector<HTMLDivElement>(".header");
      const content = card.querySelector<HTMLDivElement>(".content");
  
      if (header && content) {

        header.addEventListener("click", () => {
          const isExpanded = content.classList.contains("expanded");
  
          cards.forEach((c) => {
            const otherContent = c.querySelector<HTMLDivElement>(".content");
            if (otherContent && otherContent !== content) {
              otherContent.classList.remove("expanded");
              otherContent.style.maxHeight = "";
            }
          });
  
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
  });
