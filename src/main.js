// =====================================
// 1. IMPORT STYLE & SWIPER MODULES
// =====================================
import './style.css';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// =====================================
// 2. DATA PROJECT
// =====================================
const projects = [
  {
    title: "Project 1",
    desc: "Deskripsi lengkap project 1. Ceritakan apa yang kamu buat, teknologi yang digunakan, dan hasil yang dicapai.",
    img: "https://placehold.co/800x500/222/FFF?text=Project+1",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "#"
  },
  {
    title: "Project 2",
    desc: "Deskripsi lengkap project 2. Ceritakan apa yang kamu buat, teknologi yang digunakan, dan hasil yang dicapai.",
    img: "https://placehold.co/800x500/222/FFF?text=Project+2",
    tags: ["Figma",],
    link: "#"
  },
  {
    title: "Project 3",
    desc: "Deskripsi lengkap project 3. Ceritakan apa yang kamu buat, teknologi yang digunakan, dan hasil yang dicapai.",
    img: "https://placehold.co/800x500/222/FFF?text=Project+3",
    tags: ["Node.js", "MongoDB"],
    link: "#"
  },
  {
    title: "Project 4",
    desc: "Deskripsi lengkap project 4.",
    img: "https://placehold.co/800x500/222/FFF?text=Project+4",
    tags: ["Vue", "Firebase"],
    link: "#"
  },
  {
    title: "Project 5",
    desc: "Deskripsi lengkap project 5.",
    img: "https://placehold.co/800x500/222/FFF?text=Project+5",
    tags: ["Python", "Flask"],
    link: "#"
  },
];

// =====================================
// 3. MODAL FUNCTIONS
// =====================================
function openModal(index) {
  const p = projects[index];
  document.getElementById('modalImg').src = p.img;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalLink').href = p.link;

  const tagsEl = document.getElementById('modalTags');
  tagsEl.innerHTML = p.tags.map(tag =>
    `<span class="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full">${tag}</span>`
  ).join('');

  const modal = document.getElementById('projectModal');
  const box = document.getElementById('modalBox');
  modal.classList.remove('hidden');
  setTimeout(() => {
    box.classList.remove('scale-95', 'opacity-0');
    box.classList.add('scale-100', 'opacity-100');
  }, 10);
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  const box = document.getElementById('modalBox');
  box.classList.remove('scale-100', 'opacity-100');
  box.classList.add('scale-95', 'opacity-0');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

// Expose ke HTML (onclick="openModal()")
window.openModal = openModal;
window.closeModal = closeModal;

// =====================================
// 4. KODE UTAMA
// =====================================
document.addEventListener("DOMContentLoaded", function () {

  // -- Marquee --
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

  // -- Swiper (hanya 1x init) --
  new Swiper('.mySwiper', {
    modules: [Navigation, Pagination],
    loop: true,
    slidesPerView: 1.2,
    spaceBetween: 20,
    grabCursor: true,
    breakpoints: {
      640:  { slidesPerView: 2.2, spaceBetween: 24 },
      1024: { slidesPerView: 3,   spaceBetween: 30 },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // -- ESC tutup modal --
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

});