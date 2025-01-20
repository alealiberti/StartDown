
const lineProgress = document.querySelector<HTMLElement>('.line-progress');
const steps = document.querySelectorAll<HTMLElement>('.step');
const sections = document.querySelectorAll<HTMLElement>('.form-section');
const nextButtons = document.querySelectorAll<HTMLButtonElement>('.next');
const backButtons = document.querySelectorAll<HTMLButtonElement>('.back');

let currentSectionIndex = 0;

// Funzione per aggiornare la barra di progresso
const updateLineProgress = () => {
  const progressPercentage = (currentSectionIndex / (steps.length - 1)) * 100;
  if (lineProgress) lineProgress.style.width = `${progressPercentage}%`;
};

// Funzione per aggiornare i punti della progressione
const updateStepPoints = () => {
  steps.forEach((step, index) => {
    if (index < currentSectionIndex) {
      step.classList.remove('future');
      step.classList.add('completed');
    } else if (index === currentSectionIndex) {
      step.classList.remove('future', 'completed');
    } else {
      step.classList.add('future');
    }
  });
};

// Funzione per mostrare una sezione specifica
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

// Funzione per la gestione del click sul pulsante "Prossimo"
nextButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    const currentSection = sections[currentSectionIndex];
    if (currentSection) {
      const inputs = currentSection.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea');
      let isValid = true;

      // Controllo validità degli input
      inputs.forEach((input) => {
        if (!input.checkValidity()) {
          isValid = false;
          input.classList.add('invalid'); // Evidenzia il campo non valido
          input.addEventListener('input', () => input.classList.remove('invalid')); // Rimuovi l'indicazione di errore
        }
      });

      // Se tutti i campi sono validi, passa alla sezione successiva
      if (isValid) {
        if (currentSectionIndex < sections.length - 1) {
          currentSectionIndex++;
          showSection(currentSectionIndex);
          updateLineProgress();
          updateStepPoints();
        }
      } else {
        // Scrolla fino al primo campo non valido
        const firstInvalid = currentSection.querySelector<HTMLElement>('.invalid');
        firstInvalid?.focus();
      }
    }
  });
});

// Funzione per la gestione del click sul pulsante "Indietro"
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
updateLineProgress();
updateStepPoints();


// CONTORLLO PER NOME E COGNOME, SOLO LETTERE E SPAZI
const nameInput = document.getElementById('name') as HTMLInputElement;

// Aggiungi l'evento input per controllare il valore in tempo reale
nameInput.addEventListener('input', () => {
  // Rimuovi qualsiasi carattere che non sia una lettera o uno spazio
  nameInput.value = nameInput.value.replace(/[^A-Za-z ]/g, '');
});

// Se vuoi anche mostrare un messaggio di errore per l'input non valido
nameInput.addEventListener('invalid', () => {
  // Aggiungi qui la logica per mostrare il messaggio di errore
  console.log("Il nome può contenere solo lettere e spazi.");
});

// Ottieni l'elemento dell'input del cognome
const surnameInput = document.getElementById('surname') as HTMLInputElement;

// Aggiungi l'evento input per controllare il valore in tempo reale
surnameInput.addEventListener('input', () => {
  // Rimuovi qualsiasi carattere che non sia una lettera o uno spazio
  surnameInput.value = surnameInput.value.replace(/[^A-Za-z ]/g, '');
});

// Se vuoi anche mostrare un messaggio di errore per l'input non valido
surnameInput.addEventListener('invalid', () => {
  // Aggiungi qui la logica per mostrare il messaggio di errore
  console.log("Il cognome può contenere solo lettere e spazi.");
});