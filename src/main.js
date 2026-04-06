// =====================================
// 1. IMPORT STYLE, SWIPER & LENIS
// =====================================
import './style.css';
import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules'; // <-- Navigation diimport kembali agar tombol panah berfungsi
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Lenis from 'lenis';

// =====================================
// 2. SMOOTH SCROLLING SETUP (LENIS)
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
// 3. KODE UTAMA (Animasi & Slider)
// =====================================
document.addEventListener("DOMContentLoaded", function () {

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
    modules: [Autoplay, Navigation], // <-- Modul Navigation dimasukkan ke sini
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 1, // Untuk HP (1 kartu saja supaya lega)
    spaceBetween: 20,
    grabCursor: true,
    breakpoints: {
      640:  { slidesPerView: 2, spaceBetween: 24 }, // Tablet
      1024: { slidesPerView: 2, spaceBetween: 30 }, // Desktop: Nampilin 2 kartu
    },
    // Konfigurasi tombol panah yang dihubungkan ke HTML
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

});