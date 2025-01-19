const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const icon = item.querySelector('.faq-icon');
  
  question.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});