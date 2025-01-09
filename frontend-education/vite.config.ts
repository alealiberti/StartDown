import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        // outDir: "../src/main/resources/static", // cartella di output
        rollupOptions: {
            input: {
                home: "./index.html", // home page of education "Cascina Cacica"
                contattaci: "./src/pages/forms-page/index.html",
                laboratori: "./src/pages/laboratory-page/index.html",
                eventi: "./src/pages/events-page/index.html"
            }
        },
    },
});

