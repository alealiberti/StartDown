//form logic
// Recupera tutte le sezioni del form

const lineProgress = document.querySelector<HTMLElement>('.line-progress');
const steps = document.querySelectorAll<HTMLElement>('.step');
const sections = document.querySelectorAll<HTMLElement>('.form-section');
const nextButtons = document.querySelectorAll<HTMLButtonElement>('.next');
const backButtons = document.querySelectorAll<HTMLButtonElement>('.back');

let currentSectionIndex = 0;

const updateLineProgress = () => {
  const progressPercentage = (currentSectionIndex / (steps.length - 1)) * 100;
  if(lineProgress)
    lineProgress.style.width = `${progressPercentage}%`;
};

const updateStepPoints = () => {
  steps.forEach((step, index) => {
      if (index < currentSectionIndex) {
          step.classList.remove('future');
      } else if (index === currentSectionIndex) {
          step.classList.remove('future');
      } else {
          step.classList.add('future');
      }
  });
};

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


nextButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    // Seleziona la sezione corrente
    const currentSection = sections[currentSectionIndex];
    if (currentSection) {
      const inputs = currentSection.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea');
      let isValid = true;

      // Controlla la validità di ogni input
      inputs.forEach((input) => {
        if (!input.checkValidity()) {
          isValid = false;
          input.classList.add('invalid'); // Aggiungi una classe per evidenziare l'errore
          input.addEventListener('input', () => input.classList.remove('invalid')); // Rimuovi l'errore in tempo reale
        }
      });

      if (isValid) {
        if (currentSectionIndex < sections.length - 1) {
          currentSectionIndex++;
          showSection(currentSectionIndex);
          updateLineProgress();
          updateStepPoints();
        }
      } else {
        // Fai scroll all'elemento non valido
        const firstInvalid = currentSection.querySelector<HTMLElement>('.invalid');
        firstInvalid?.focus();
      }
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
      updateLineProgress();
      updateStepPoints();
    }
  });
});

// Inizializza la prima sezione visibile
showSection(currentSectionIndex);
