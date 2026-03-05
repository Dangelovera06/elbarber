/* =============================================
   EL BARBERSHOP — main.js
============================================= */

// ── Navbar scroll effect ──────────────────────────────────
const navbar  = document.getElementById('navbar');
const topbar  = document.querySelector('.topbar');
const topH    = topbar ? topbar.offsetHeight : 36;

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > topH);
}, { passive: true });

// ── Mobile hamburger menu ─────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileMenu.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Smooth scroll for anchor links ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Intersection Observer — reveal on scroll ─────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.querySelectorAll('[data-reveal]')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('revealed'), idx * 90);
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ── Active nav link on scroll ─────────────────────────────
const sections   = document.querySelectorAll('section[id], div[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navAnchors.forEach(a => a.style.color = '');
    const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
    if (active) active.style.color = 'var(--gold)';
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── Set date input min to today ───────────────────────────
const dateInput = document.getElementById('date');
if (dateInput) {
  dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
}

// ── Booking form submit ───────────────────────────────────
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

if (bookingForm) {
  bookingForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = bookingForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    await new Promise(r => setTimeout(r, 1200));
    bookingForm.classList.add('hidden');
    formSuccess.classList.add('visible');
  });
}

// ── Parallax on hero bg ───────────────────────────────────
const heroBg = document.querySelector('.hero-bg img');

if (heroBg && window.matchMedia('(min-width: 768px)').matches) {
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `translateY(${window.scrollY * 0.2}px)`;
  }, { passive: true });
}

// ── Hero stagger entry animation ─────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const heroEls = document.querySelectorAll('.hero-tag, .hero-title, .hero-pills, .hero-card');
  heroEls.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      el.style.opacity   = '1';
      el.style.transform = 'none';
    }, 200 + i * 150);
  });
});
