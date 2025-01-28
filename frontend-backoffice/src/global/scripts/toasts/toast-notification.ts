/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-20
 * @description function to create and display a toast notification
 */



/**
 * function to create and display a toast notification.
 * @param {string} message - the message to be displayed in the toast.
 * @param {"success" | "error"} type - the type of the toast, either "success" or "error".
 */
export function createToastNotification(message: string, type: "success" | "error") {

    // select the correct toast template based on success or error
    const templateToast = document.querySelector(`.toast${type === "success" ? "Success" : "Error"}`) as HTMLElement;

    // clone the toast template and fill it with the message
    const toast = templateToast.cloneNode(true) as HTMLElement;
    toast.querySelector(".info p")!.textContent = message;
    toast.classList.add("show");

    // append the cloned toast to the container positioned on the top right of the page
    document.querySelector(".toastContainer")?.appendChild(toast);

    // ------------------------------------------------------

    // add an event listener so that the toast will be removed immediately when clicked
    toast.addEventListener("click", () => {
        toast.remove();
    });

    // remove the toast from the DOM after 5 seconds
    setTimeout(() => {
        toast.remove();
    }, 5000);
}