const faqItems = document.querySelectorAll('.faq-item') as NodeListOf<HTMLElement>;

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question') as HTMLElement;
  const icon = item.querySelector('.faq-icon') as HTMLElement;

  question.addEventListener('click', () => {
    // Chiude tutte le FAQ aperte
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
      }
    });

    // Apre o chiude la FAQ cliccata
    item.classList.toggle('active');
  });
});