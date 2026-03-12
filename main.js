// Shared site functionality — navigation, reveal animations

// ======== Navigation Toggle ========
(function initNav() {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open');
    });
  }
})();

// ======== Reveal Animation ========
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('reveal-in');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

function observeReveals(root) {
  (root || document).querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}
observeReveals();

// ======== Year in Footer ========
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
