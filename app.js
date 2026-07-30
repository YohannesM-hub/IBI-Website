// International Bible Institute — shared site behavior

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact / admissions form — this is a static site with no server,
  // so the reliable way to "send" the message is to open the visitor's
  // own email client with a pre-filled message addressed to IBI
  // admissions. Nothing is sent silently in the background; the
  // visitor still has to hit Send in their mail app.
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  const ADMISSIONS_EMAIL = 'yohanneswolf@gmail.com';

  if (form && note) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const topic = form.querySelector('#topic').value;
      const message = form.querySelector('#message').value.trim();

      const subject = `IBI Website Inquiry — ${topic}${name ? ' — ' + name : ''}`;
      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Topic: ${topic}`,
        '',
        message
      ].join('\n');

      const mailtoUrl =
        `mailto:${ADMISSIONS_EMAIL}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(bodyLines)}`;

      window.location.href = mailtoUrl;

      note.textContent = name
        ? `Thank you, ${name}. Your email app should now open with your message addressed to our admissions office — please hit send there to complete it.`
        : 'Your email app should now open with your message addressed to our admissions office — please hit send there to complete it.';
      form.reset();
    });
  }

  // Simple reveal-on-scroll for cards/pillars (respects reduced motion)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.pillar, .card, .step, .person, .timeline .item, .letter-card, .article-block, .fitem');
    targets.forEach(t => { t.style.opacity = 0; t.style.transform = 'translateY(14px)'; t.style.transition = 'opacity .5s ease, transform .5s ease'; });
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(t => io.observe(t));
  }
});