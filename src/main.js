import './style.css';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Lenis from 'lenis';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('.site-header');
const progressBar = document.getElementById('scrollProgress');
const navLinks = [...document.querySelectorAll('[data-nav-link]')];
const trackedSections = ['about', 'skills', 'project', 'education'].map((id) => document.getElementById(id)).filter(Boolean);

const updateScrollUI = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  if (progressBar) progressBar.style.width = Math.min(100, progress) + '%';
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
};
updateScrollUI();
window.addEventListener('scroll', updateScrollUI, { passive: true });

if ('IntersectionObserver' in window && trackedSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  trackedSections.forEach((section) => sectionObserver.observe(section));
}

// Smooth scrolling: respect the visitor's reduced-motion preference.
if (!prefersReducedMotion) {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
}

// Project carousel.
const projectSlider = document.querySelector('.mySwiper');

if (projectSlider) {
  new Swiper(projectSlider, {
    modules: [Navigation, Pagination],
    loop: true,
    speed: prefersReducedMotion ? 0 : 650,
    autoplay: false,
    keyboard: { enabled: true, onlyInViewport: true },
    slidesPerView: 1,
    spaceBetween: 18,
    grabCursor: true,
    watchOverflow: true,
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.project-pagination',
      clickable: true,
    },
  });
}
