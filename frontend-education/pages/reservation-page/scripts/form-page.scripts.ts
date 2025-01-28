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

<<<<<<< HEAD

/**
 * Updates the line progress bar, adjusting its width to represent the progress of the user in the form.
 * @returns {void}
 */
=======
// Function to update the line progress bar
>>>>>>> 349e8f07c9241792a87090f253b2029ac36d69cd
const updateLineProgress = () => {
  const progressPercentage = (currentSectionIndex / (steps.length - 1)) * 100;
  if (lineProgress) lineProgress.style.width = `${progressPercentage}%`;
};

<<<<<<< HEAD

/**
 * Updates the classes of the steps, changing the class of the current step to 'completed',
 * 'future' for the steps after the current one, and removes both for the current one.
 *
 * This function is used to update the visual representation of the steps as the user
 * navigates through the form.
 */
=======
// Function to update the step points
>>>>>>> 349e8f07c9241792a87090f253b2029ac36d69cd
const updateStepPoints = () => {
  // Loop through each step and update its class accordingly
  steps.forEach((step, index) => {
    if (index < currentSectionIndex) {
      // If the step is before the current section, remove the 'future' class and add the 'completed' class
      step.classList.remove('future');
      step.classList.add('completed');
    } else if (index === currentSectionIndex) {
      // If the step is the current section, remove both the 'future' and 'completed' classes
      step.classList.remove('future', 'completed');
    } else {
      // If the step is after the current section, add the 'future' class
      step.classList.add('future');
    }
  });
};

<<<<<<< HEAD

/**
 * Displays the specified section by updating the transform, opacity, and zIndex styles
 * of each section in the form. Only one section is fully visible at a time, while others
 * are hidden off-screen.
 * 
 * @param {number} index - The index of the section to be displayed.
 */
=======
// Function to show a specific section
>>>>>>> 349e8f07c9241792a87090f253b2029ac36d69cd
const showSection = (index: number) => {
  sections.forEach((section, i) => {
    if (i === index) {
      // Make the current section visible
      section.style.transform = 'translateX(0)';
      section.style.opacity = '1';
      section.style.zIndex = '1';
    } else if (i < index) {
      // Hide sections before the current one to the left
      section.style.transform = 'translateX(-100%)';
      section.style.opacity = '0';
      section.style.zIndex = '0';
    } else {
      // Hide sections after the current one to the right
      section.style.transform = 'translateX(100%)';
      section.style.opacity = '0';
      section.style.zIndex = '0';
    }
  });
};

<<<<<<< HEAD

=======
// Function to handle click on "Next" button
>>>>>>> 349e8f07c9241792a87090f253b2029ac36d69cd
nextButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    const currentSection = sections[currentSectionIndex];
    if (currentSection) {
      const inputs = currentSection.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea');
      let isValid = true;

<<<<<<< HEAD
      
      inputs.forEach((input) => {
        if (!input.checkValidity()) {
          isValid = false;
          input.classList.add('invalid'); 
          input.addEventListener('input', () => input.classList.remove('invalid'));
        }
      });

      
=======
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
>>>>>>> 349e8f07c9241792a87090f253b2029ac36d69cd
      if (isValid) {
        if (currentSectionIndex < sections.length - 1) {
          currentSectionIndex++;
          showSection(currentSectionIndex);
          updateLineProgress();
          updateStepPoints();
        }
      } else {
<<<<<<< HEAD
        
=======
        // Scroll to the first invalid field
>>>>>>> 349e8f07c9241792a87090f253b2029ac36d69cd
        const firstInvalid = currentSection.querySelector<HTMLElement>('.invalid');
        firstInvalid?.focus();
      }
    }
  });
});

<<<<<<< HEAD

=======
// Function to handle click on "Back" button
>>>>>>> 349e8f07c9241792a87090f253b2029ac36d69cd
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

<<<<<<< HEAD
=======
// Initialize the first visible section
>>>>>>> 349e8f07c9241792a87090f253b2029ac36d69cd
showSection(currentSectionIndex);
updateLineProgress();
updateStepPoints();

<<<<<<< HEAD

const nameInput = document.getElementById('name') as HTMLInputElement;

nameInput.addEventListener('input', () => {
  
  nameInput.value = nameInput.value.replace(/[^A-Za-z ]/g, '');
});


nameInput.addEventListener('invalid', () => {
  console.log("Il nome può contenere solo lettere e spazi.");
});

const surnameInput = document.getElementById('surname') as HTMLInputElement;

surnameInput.addEventListener('input', () => {
  surnameInput.value = surnameInput.value.replace(/[^A-Za-z ]/g, '');
});

surnameInput.addEventListener('invalid', () => {
  console.log("Il cognome può contenere solo lettere e spazi.");
});
=======
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
>>>>>>> 349e8f07c9241792a87090f253b2029ac36d69cd
