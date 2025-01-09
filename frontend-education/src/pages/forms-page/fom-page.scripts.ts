import "./form-page.style.css";

// ** NAVBAR **
import "../../components/navbar/navbar.css";
import "../../components/navbar/navbar.ts";


//form logic
// Recupera tutte le sezioni del form
const sections = document.querySelectorAll<HTMLElement>('.form-section');
const nextButtons = document.querySelectorAll<HTMLButtonElement>('.next');
const backButtons = document.querySelectorAll<HTMLButtonElement>('.back');

let currentSectionIndex = 0;

// Mostra una sezione specifica
const showSection = (index: number) => {
  sections.forEach((section, i) => {
    if (i === index) {
      section.style.transform = 'translateX(0)';
      section.style.opacity = '1';
      section.style.zIndex = '1';
    } else if (i < index) {
      section.style.transform = 'translateX(-100%)';
      section.style.opacity = '0';
      section.style.zIndex = '0';
    } else {
      section.style.transform = 'translateX(100%)';
      section.style.opacity = '0';
      section.style.zIndex = '0';
    }
  });
};

// Aggiungi eventi ai pulsanti "Avanti"
nextButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
      showSection(currentSectionIndex);
    }
  });
});

// Aggiungi eventi ai pulsanti "Indietro"
backButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentSectionIndex > 0) {
      currentSectionIndex--;
      showSection(currentSectionIndex);
    }
  });
});

// Inizializza la prima sezione visibile
showSection(currentSectionIndex);
