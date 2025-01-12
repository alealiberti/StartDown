document.querySelectorAll('.slider-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault(); // Impedisce il comportamento predefinito (scorrimento della pagina)
      const targetSlide = document.querySelector(this.getAttribute('href'));
      
      if (targetSlide) {
        // Aggiungi la classe attiva alla slide per farla visualizzare
        // o qualsiasi altro comportamento desiderato (ad esempio, attivare un effetto)
        targetSlide.scrollIntoView({
          behavior: 'smooth', // Opzionale, per scorrimento morbido se necessario
          block: 'center'
        });
      }
    });
  });