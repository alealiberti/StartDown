
const lineProgress = document.querySelector<HTMLElement>('.line-progress');
const steps = document.querySelectorAll<HTMLElement>('.step');
const sections = document.querySelectorAll<HTMLElement>('.form-section');
const nextButtons = document.querySelectorAll<HTMLButtonElement>('.next');
const backButtons = document.querySelectorAll<HTMLButtonElement>('.back');

let currentSectionIndex = 0;


/**
 * Updates the line progress bar, adjusting its width to represent the progress of the user in the form.
 * @returns {void}
 */
const updateLineProgress = () => {
  const progressPercentage = (currentSectionIndex / (steps.length - 1)) * 100;
  if (lineProgress) lineProgress.style.width = `${progressPercentage}%`;
};


/**
 * Updates the classes of the steps, changing the class of the current step to 'completed',
 * 'future' for the steps after the current one, and removes both for the current one.
 *
 * This function is used to update the visual representation of the steps as the user
 * navigates through the form.
 */
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


/**
 * Displays the specified section by updating the transform, opacity, and zIndex styles
 * of each section in the form. Only one section is fully visible at a time, while others
 * are hidden off-screen.
 * 
 * @param {number} index - The index of the section to be displayed.
 */
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


nextButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    const currentSection = sections[currentSectionIndex];
    if (currentSection) {
      const inputs = currentSection.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea');
      let isValid = true;

      
      inputs.forEach((input) => {
        if (!input.checkValidity()) {
          isValid = false;
          input.classList.add('invalid'); 
          input.addEventListener('input', () => input.classList.remove('invalid'));
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
        
        const firstInvalid = currentSection.querySelector<HTMLElement>('.invalid');
        firstInvalid?.focus();
      }
    }
  });
});


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

showSection(currentSectionIndex);
updateLineProgress();
updateStepPoints();


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