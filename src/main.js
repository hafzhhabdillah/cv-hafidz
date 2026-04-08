import './style.css';
import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Lenis from 'lenis';

// =====================================
// 1. SMOOTH SCROLLING SETUP (LENIS)
// =====================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  smoothWheel: true, 
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// =====================================
// 2. KODE UTAMA
// =====================================
document.addEventListener("DOMContentLoaded", function () {

  // -- Hamburger Menu Mobile Toggle --
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (hamburgerBtn && mobileMenu) {
    // Buka/Tutup menu saat tombol hamburger diklik
    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('translate-x-full');
    });

    // Otomatis tutup menu saat link diklik (agar scroll mulus ke section yang dituju)
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
      });
    });
  }

  // -- Marquee (Teks Berjalan) --
  const marqueeContent = document.getElementById('marqueeContent');
  if (marqueeContent) {
    const textToCopy = marqueeContent.innerHTML;
    marqueeContent.innerHTML = textToCopy + textToCopy;
  }

  // -- Animasi Hero --
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.fade-up:not(.reveal-on-scroll), .fade-left:not(.reveal-on-scroll), .fade-right:not(.reveal-on-scroll)');
    heroElements.forEach(el => el.classList.add('is-visible'));
  }, 100);

  // -- Animasi Scroll --
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, 50);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const scrollElements = document.querySelectorAll('.reveal-on-scroll');
  scrollElements.forEach(el => observer.observe(el));

  // -- Swiper (Slider Project) --
  new Swiper('.mySwiper', {
    modules: [Autoplay, Navigation],
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 1, // 1 kartu saja di Mobile supaya digeser (swipe) nyaman
    spaceBetween: 20,
    grabCursor: true,
    breakpoints: {
      640:  { slidesPerView: 2, spaceBetween: 24 },
      1024: { slidesPerView: 2, spaceBetween: 30 },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

});