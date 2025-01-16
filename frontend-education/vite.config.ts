import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Usa percorsi relativi per il build
  server: {
    open: true, // Apre automaticamente il browser
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

