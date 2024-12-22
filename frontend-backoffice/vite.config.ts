import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        // outDir: "../src/main/resources/static", // cartella di output
        rollupOptions: {
            input: {
                login: "./index.html",
                dashboard: "./src/pages/dashboard/index.html",
                questions: "./src/pages/questions/index.html",
                reservations: "./src/pages/reservations/index.html",
                settings: "./src/pages/settings/index.html"
            }
        },
    },

    server: {
        open: '/index.html', // page opened for default
        port: 3000, // server port
    },
});