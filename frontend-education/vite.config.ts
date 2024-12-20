import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        // outDir: "../src/main/resources/static", // cartella di output
        rollupOptions: {
            input: {
                home: "./index.html", // home page of education "Cascina Cacica"
                labs: "./src/pages/labs/index.html",
                formQuestions: "./src/pages/form-questions/index.html",
                formReservations: "./src/pages/form-reservations/index.html"
            }
        },
    },
});