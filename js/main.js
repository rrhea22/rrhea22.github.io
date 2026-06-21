/* === MOBILE NAVIGATION === */
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.nav__hamburger');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a nav link is clicked
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && nav.classList.contains('nav-open')) {
      nav.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* === ACTIVE NAV LINK === */
(function setActiveNav() {
  const filename = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const hrefBase = href.split('#')[0].split('/').pop() || 'index.html';

    const isExactMatch = hrefBase === filename;
    const isCaseStudyWork =
      filename.startsWith('case-study') && hrefBase === 'index.html';

    if (isExactMatch || isCaseStudyWork) {
      link.classList.add('active');
    }
  });
})();

/* === SCROLL-TRIGGERED FADE-IN === */
(function initFadeIn() {
  const fadeEls = document.querySelectorAll('.fade-in');
  if (!fadeEls.length) return;

  if (!('IntersectionObserver' in window)) {
    fadeEls.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  fadeEls.forEach(el => observer.observe(el));
})();

/* === CONTACT FORM === */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    status.className = '';

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        status.textContent = "Thanks for reaching out — I'll be in touch soon!";
        status.className = 'success';
        form.reset();
      } else {
        throw new Error('server error');
      }
    } catch {
      status.textContent =
        'Something went wrong. Please email me directly at rhearen434@gmail.com.';
      status.className = 'error';
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
})();
