/* =============================================
   EL BARBER — main.js
============================================= */

// ── Navbar scroll effect ──────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── Mobile hamburger menu ─────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Smooth scroll for all anchor links ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Intersection Observer — reveal on scroll ─────────────
const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals
        const siblings = [...entry.target.parentElement.querySelectorAll('[data-reveal]')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

// ── Active nav link on scroll ─────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = '';
        });
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--beige)';
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach(s => sectionObserver.observe(s));

// ── Set date input min to today ───────────────────────────
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

// ── Booking form submit ───────────────────────────────────
const bookingForm   = document.getElementById('bookingForm');
const formSuccess   = document.getElementById('formSuccess');

if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = bookingForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate async request (replace with real endpoint / webhook)
    await new Promise(resolve => setTimeout(resolve, 1200));

    bookingForm.classList.add('hidden');
    formSuccess.classList.add('visible');
  });
}

// ── Subtle parallax on hero ───────────────────────────────
const heroBg = document.querySelector('.hero-bg');

if (heroBg && window.matchMedia('(min-width: 768px)').matches) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.25}px)`;
  }, { passive: true });
}

// ── Stagger hero content in on load ──────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const heroEls = document.querySelectorAll(
    '.hero-eyebrow, .hero-title, .hero-sub, .hero-actions'
  );
  heroEls.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      el.style.opacity   = '1';
      el.style.transform = 'none';
    }, 300 + i * 160);
  });
});
