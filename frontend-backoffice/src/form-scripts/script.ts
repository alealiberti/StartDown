/**
 * @file        main.ts
 * @author      Gabriele Speciale
 * @date        2025-01-20
 * @description 
 */

import { loadTemplate } from "../utils/load-templates";



//*** WAIT the loading of the DOM before imports the template of toast for handling error ***
document.addEventListener("DOMContentLoaded", async () => {

    // await the response and recive from the fetch into the async function, the template of toast on the DOM
    await loadTemplate("/src/global/templates/toasts/toast-notification.html");
});