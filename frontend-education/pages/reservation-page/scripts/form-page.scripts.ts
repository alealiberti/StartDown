// Select the line progress element
const lineProgress = document.querySelector<HTMLElement>('.line-progress');

// Select all the steps elements
const steps = document.querySelectorAll<HTMLElement>('.step');

// Select all the form sections
const sections = document.querySelectorAll<HTMLElement>('.form-section');

// Select all the next buttons
const nextButtons = document.querySelectorAll<HTMLButtonElement>('.next');

// Select all the back buttons
const backButtons = document.querySelectorAll<HTMLButtonElement>('.back');

// Initialize the current section index
let currentSectionIndex = 0;

// Function to update the line progress bar
const updateLineProgress = () => {
  const progressPercentage = (currentSectionIndex / (steps.length - 1)) * 100;
  if (lineProgress) lineProgress.style.width = `${progressPercentage}%`;
};

// Function to update the step points
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

// Function to show a specific section
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

// Function to handle click on "Next" button
nextButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    const currentSection = sections[currentSectionIndex];
    if (currentSection) {
      const inputs = currentSection.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea');
      let isValid = true;

      // Check the validity of inputs
      inputs.forEach((input) => {
        if (!input.checkValidity()) {
          isValid = false;
          input.classList.add('invalid'); // Highlight the invalid field
          input.addEventListener('input', () => input.classList.remove('invalid')); // Remove the error indication
        }
      });

      // Specific check for name and surname
      const nameInput = document.getElementById('name') as HTMLInputElement;
      const surnameInput = document.getElementById('surname') as HTMLInputElement;

      // Check the validity of name
      if (nameInput && nameInput.value.trim() === '') {
        isValid = false;
        nameInput.classList.add('invalid');
      } else {
        nameInput.classList.remove('invalid');
      }

      // Check the validity of surname
      if (surnameInput && surnameInput.value.trim() === '') {
        isValid = false;
        surnameInput.classList.add('invalid');
      } else {
        surnameInput.classList.remove('invalid');
      }

      // If all fields are valid, move to the next section
      if (isValid) {
        if (currentSectionIndex < sections.length - 1) {
          currentSectionIndex++;
          showSection(currentSectionIndex);
          updateLineProgress();
          updateStepPoints();
        }
      } else {
        // Scroll to the first invalid field
        const firstInvalid = currentSection.querySelector<HTMLElement>('.invalid');
        firstInvalid?.focus();
      }
    }
  });
});

// Function to handle click on "Back" button
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

// Initialize the first visible section
showSection(currentSectionIndex);
updateLineProgress();
updateStepPoints();

// CONTROL FOR NAME AND SURNAME, ONLY LETTERS AND SPACES
const nameInput = document.getElementById('name') as HTMLInputElement;

// Add input event to check the value in real-time
nameInput.addEventListener('input', () => {
  // Remove any character that is not a letter or a space
  nameInput.value = nameInput.value.replace(/[^A-Za-z ]/g, '');
});

// Get the surname input element
const surnameInput = document.getElementById('surname') as HTMLInputElement;

// Add input event to check the value in real-time
surnameInput.addEventListener('input', () => {
  // Remove any character that is not a letter or a space
  surnameInput.value = surnameInput.value.replace(/[^A-Za-z ]/g, '');
});

// Handle the selection of group type
const typeGroupSelect = document.getElementById('typeGroup') as HTMLSelectElement;
const visitorsInput = document.getElementById('visitors') as HTMLInputElement;

// Add change event to the selector
typeGroupSelect.addEventListener('change', () => {
  if (typeGroupSelect.value === 'individuale') {
    visitorsInput.value = '1'; // Set the value to 1
  } else {
    visitorsInput.value = ''; // Reset the field if it's not individual
  }
});

// Add input event to the visitors field
visitorsInput.addEventListener('input', () => {
  if (typeGroupSelect.value === 'individuale' && parseInt(visitorsInput.value) > 1 || parseInt(visitorsInput.value) < 1) {
    visitorsInput.value = '1'; // Set the value to 1 if it exceeds 1
    alert("Il numero di visitatori non può essere diverso da 1 per la selezione 'Individuale'.");
  }
});
