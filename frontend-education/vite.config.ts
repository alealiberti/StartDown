import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Usa percorsi relativi per il build
  server: {
    port: 5173, // server port
    fs: {
      allow: ['src'], // Permetti l'accesso alla directory src
    },
  },
  build: {
    outDir: "../src/main/resources/static",
    rollupOptions: {
      input: {
        main: "./index.html",
        contattaci: "./forms-page/index.html",
        laboratori: "./laboratories-page/index.html",
        eventi: "./events-page/index.html",
      },
    },
  },
});

