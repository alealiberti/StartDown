/**
 * Navbar script to manage scroll behavior and toggle menu visibility.
 * 
 * This script handles the following functionalities:
 * - Disabling/enabling scrolling when a checkbox is checked or unchecked.
 * - Toggling the visibility of a background overlay when the checkbox is toggled.
 * - Handling touch and click events on the background overlay to toggle the checkbox state.
 * 
 * @file navbar.ts
 * @version 1.0
 * @author Alessio Burbulia
 */

// Get elements from the DOM
let checkbox = document.getElementById("menuCheckbox") as HTMLInputElement;
let subBackground = document.getElementById("sub-background") as HTMLDivElement;
let body = document.body;

/**
 * Toggles the scroll functionality and visibility of the background overlay.
 * 
 * This function updates the scroll behavior and the visibility of the background overlay
 * based on the checkbox state. When the checkbox is checked, scrolling is disabled,
 * and the background overlay is displayed. When unchecked, scrolling is enabled,
 * and the overlay is hidden.
 * 
 * @function toggleScroll
 * @returns {void}
 */
function toggleScroll(): void {
  if (checkbox.checked) {
    // Disable scrolling by adding the "no-scroll" class
    body.classList.add("no-scroll");
    // Show the background overlay by adding the "show" class
    subBackground.classList.add("show");
  } else {
    // Enable scrolling by removing the "no-scroll" class
    body.classList.remove("no-scroll");
    // Hide the background overlay by removing the "show" class
    subBackground.classList.remove("show");
  }
}

/**
 * Handles the tap (click or touch) event on the background element.
 * 
 * This function toggles the checkbox state (checked/unchecked) and updates
 * the scroll behavior accordingly by calling the `toggleScroll` function.
 * It is used to handle both touch and click events on the background overlay.
 * 
 * @function handleTap
 * @returns {void}
 */
const handleTap = (): void => {
  // Toggle the checkbox state (checked/unchecked)
  checkbox.checked = !checkbox.checked;
  
  // Update the scroll behavior based on the new checkbox state
  toggleScroll();
};

/**
 * Adds event listeners for touch events to toggle the checkbox state.
 * 
 * This function adds the "touchstart" event listener to the background element
 * to handle touch interactions on mobile devices, allowing for a smoother
 * user experience on touch-enabled devices.
 * 
 * @function changeToggleOnTap
 * @returns {void}
 */
function changeToggleOnTap(): void {
  // Add touchstart event listener to toggle the checkbox when the background is tapped
  subBackground.addEventListener("touchstart", handleTap);
}

// Add the event listener for the checkbox change event
checkbox.addEventListener("change", toggleScroll);

// Initialize the toggle functionality by adding the touch event listener
changeToggleOnTap();