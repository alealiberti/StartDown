// Definizione delle rotte
const routes: { [path: string]: string } = {
    '/': '/index.html',
    '/laboratori': '/src/pages/laboratory-page/index.html',
    '/eventi': '/src/pages/events-page/index.html',
    '/contattaci/prenotazione-cascina': '/src/pages/forms-page/prenotazione-cascina.html',
    '/contattaci/facci-una-domanda': '/src/pages/forms-page/facci-una-domanda.html',
  };
  
  // Funzione per caricare il contenuto della pagina
  const loadPage = async (path: string) => {
    const route = routes[path] || routes['/'];
    const response = await fetch(route);
    if (response.ok) {
      const html = await response.text();
      document.getElementById('app')!.innerHTML = html;
    } else {
      document.getElementById('app')!.innerHTML = '<h1>Pagina non trovata</h1>';
    }
  };
  
  // Gestore della navigazione
  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    loadPage(path);
  };
  
  // Configura i listener per il caricamento iniziale e i link
  window.addEventListener('popstate', () => loadPage(window.location.pathname));
  document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
      const target = e.target as HTMLAnchorElement;
      if (target.matches('a[href^="/"]')) {
        e.preventDefault();
        navigateTo(target.getAttribute('href')!);
      }
    });
  
    // Carica la pagina iniziale
    loadPage(window.location.pathname);
  });