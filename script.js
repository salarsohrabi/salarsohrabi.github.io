const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const year = document.querySelector('[data-year]');

const PROFILE = {
  photo: 'assets/profile-photo.jpg',
  cv: 'assets/Salar_Sohrabi_CV.pdf',
  email: 'sbsohrabi@gmail.com',
  linkedin: 'https://www.linkedin.com/in/salarsohrabi',
  github: 'https://github.com/salarsohrabi'
};

const portrait = document.querySelector('.portrait-frame img');
if (portrait) {
  portrait.src = PROFILE.photo;
  portrait.alt = 'Salar Sohrabi';
}
document.querySelector('.portrait-note')?.remove();

// Keep direct contact details visible on the landing screen.
const heroIntro = document.querySelector('.hero-intro');
if (heroIntro && !document.querySelector('.hero-contact')) {
  const heroContact = document.createElement('div');
  heroContact.className = 'hero-contact';
  heroContact.setAttribute('aria-label', 'Contact details');
  heroContact.innerHTML = [
    '<a href="mailto:' + PROFILE.email + '">' + PROFILE.email + '</a>',
    '<a href="' + PROFILE.linkedin + '" target="_blank" rel="noreferrer">LinkedIn ↗</a>',
    '<span class="contact-location">Gothenburg, Sweden</span>'
  ].join('');
  heroIntro.insertAdjacentElement('afterend', heroContact);
}

// Keep CV links local to the deployed site.
const heroResume = [...document.querySelectorAll('.hero-actions .button')]
  .find((el) => /resume|cv/i.test(el.textContent));
if (heroResume) {
  heroResume.href = PROFILE.cv;
  heroResume.target = '_blank';
  heroResume.rel = 'noreferrer';
}

const resumeLink = document.querySelector('#resume .resume-download');
if (resumeLink) resumeLink.href = PROFILE.cv;

// Replace contact placeholders if a page uses the standard contact panel.
const contactLinks = document.querySelector('.contact-links');
if (contactLinks) {
  contactLinks.innerHTML = [
    '<a href="mailto:' + PROFILE.email + '">Email <span aria-hidden="true">↗</span></a>',
    '<a href="' + PROFILE.linkedin + '" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>',
    '<a href="' + PROFILE.github + '" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>',
  ].join('');
}

const structured = document.querySelector('script[type="application/ld+json"]');
if (structured) {
  try {
    const data = JSON.parse(structured.textContent);
    data.email = 'mailto:' + PROFILE.email;
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
