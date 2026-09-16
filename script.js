const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const year = document.querySelector('[data-year]');

// Keep small visual tweaks isolated from the main stylesheet.
if (!document.querySelector('link[href="custom.css"]')) {
  const tweaks = document.createElement('link');
  tweaks.rel = 'stylesheet';
  tweaks.href = 'custom.css';
  document.head.appendChild(tweaks);
}

// Public profile assets and contact details.
const PROFILE = {
  photo: 'assets/profile-photo.jpg',
  cv: 'assets/Salar_Sohrabi_CV.pdf',
  email: 'sbsohrabi@gmail.com',
  phoneDisplay: '+46 76 412 12 70',
  phoneHref: '+46764121270',
  linkedin: 'https://www.linkedin.com/in/salarsohrabi',
  github: 'https://github.com/salarsohrabi'
};

const portrait = document.querySelector('.portrait-frame img');
if (portrait) {
  portrait.src = PROFILE.photo;
  portrait.alt = 'Salar Sohrabi';
}
document.querySelector('.portrait-note')?.remove();

// Hero resume action.
const heroResume = [...document.querySelectorAll('.hero-actions .button')]
  .find((el) => /resume/i.test(el.textContent));
if (heroResume) {
  heroResume.href = PROFILE.cv;
  heroResume.textContent = 'Download CV';
  heroResume.target = '_blank';
  heroResume.rel = 'noreferrer';
}

// Resume section button.
const resumeButton = document.querySelector('#resume .button');
if (resumeButton) {
  const liveButton = document.createElement('a');
  liveButton.className = 'button button-primary';
  liveButton.href = PROFILE.cv;
  liveButton.target = '_blank';
  liveButton.rel = 'noreferrer';
  liveButton.textContent = 'Download CV · PDF';
  resumeButton.replaceWith(liveButton);
}

const resumeText = document.querySelector('#resume p:not(.eyebrow)');
if (resumeText) {
  resumeText.textContent = 'Download the current two-page CV covering automotive, Embedded Linux/BSP, AOSP, functional safety, real-time systems and selected projects.';
}

// Contact links: replace the placeholders with working destinations.
const contactLinks = document.querySelector('.contact-links');
if (contactLinks) {
  contactLinks.innerHTML = `
    <a href="mailto:${PROFILE.email}">${PROFILE.email} <span aria-hidden="true">↗</span></a>
    <a href="${PROFILE.linkedin}" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
    <a href="${PROFILE.github}" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
    <a href="tel:${PROFILE.phoneHref}">${PROFILE.phoneDisplay}</a>
  `;
}

const contactText = document.querySelector('#contact p:not(.eyebrow)');
if (contactText) {
  contactText.textContent = 'For senior embedded, automotive platform, firmware or systems-engineering opportunities, reach me directly or connect through LinkedIn / GitHub.';
}

// The CV includes Rust among the engineering languages.
const coreLanguages = [...document.querySelectorAll('.profile-snapshot > div')]
  .find((div) => /core languages/i.test(div.textContent));
if (coreLanguages) {
  const value = coreLanguages.querySelector('strong');
  if (value) value.textContent = 'C / C++ · Python · Rust';
}

// Social preview + structured data.
const ogImage = document.querySelector('meta[property="og:image"]');
if (ogImage) ogImage.content = new URL(PROFILE.photo, window.location.href).href;

const structured = document.querySelector('script[type="application/ld+json"]');
if (structured) {
  try {
    const data = JSON.parse(structured.textContent);
    data.email = `mailto:${PROFILE.email}`;
    data.telephone = PROFILE.phoneDisplay;
    data.sameAs = [PROFILE.github, PROFILE.linkedin];
    structured.textContent = JSON.stringify(data);
  } catch (_) {
    // Leave existing structured metadata untouched if it cannot be parsed.
  }
}

if (year) year.textContent = new Date().getFullYear();

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 8);
};
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
