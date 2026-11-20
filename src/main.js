import './style.css';
import Lenis from 'lenis';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const WHATSAPP_NUMBER = '6285891263024';
const GITHUB_URL = 'https://github.com/hafzhhabdillah';

const projects = [
  {
    slug: 'meowketplace',
    name: 'Meowketplace',
    category: 'E-commerce website',
    year: 'Not specified',
    image: '/myproject1.png',
    width: 1910,
    height: 997,
    alt: 'Meowketplace project screenshot',
    description: 'Website e-commerce untuk kebutuhan kucing kesayangan.',
    overview: 'Meowketplace merupakan project e-commerce yang berfokus pada kebutuhan hewan peliharaan, khususnya kucing. Project ini menggabungkan perancangan antarmuka dan implementasi halaman web.',
    goal: 'Menyajikan pengalaman katalog produk yang mudah dipahami dan nyaman dijelajahi.',
    process: 'Perancangan UI dilakukan dengan Figma, kemudian tampilan dibangun menggunakan HTML, CSS, Tailwind CSS, dan JavaScript.',
    features: ['Tampilan katalog produk', 'Layout responsif', 'Antarmuka e-commerce'],
    stack: ['HTML', 'CSS', 'Figma', 'Tailwind CSS', 'JavaScript'],
    demo: null,
  },
  {
    slug: 'landing-page-bbil-furniture',
    name: 'Landing Page Bbil Furniture',
    category: 'E-commerce concept',
    year: 'Not specified',
    image: '/myproject4.png',
    width: 1908,
    height: 994,
    alt: 'Bbil Furniture landing page screenshot',
    description: 'Konsep landing page untuk menampilkan produk furniture dan kebutuhan rumah.',
    overview: 'Project konsep e-commerce yang berfokus pada presentasi produk furniture melalui landing page.',
    goal: 'Membuat tampilan produk rumah tangga yang terstruktur dan mudah dipindai.',
    process: 'Desain antarmuka disusun dengan Figma dan diimplementasikan menggunakan HTML, CSS, Tailwind CSS, serta JavaScript.',
    features: ['Product-focused landing page', 'Struktur konten produk', 'Layout responsif'],
    stack: ['HTML', 'CSS', 'Figma', 'Tailwind CSS', 'JavaScript'],
    demo: null,
  },
  {
    slug: 'aplikasi-pelanggaran-siswa',
    name: 'Aplikasi Pelanggaran Siswa',
    category: 'Web application',
    year: 'Not specified',
    image: '/myproject5.png',
    width: 1923,
    height: 982,
    alt: 'Student violation application screenshot',
    description: 'Aplikasi web untuk membantu pencatatan pelanggaran siswa.',
    overview: 'Aplikasi web yang dibuat untuk mendukung pencatatan data pelanggaran siswa.',
    goal: 'Membantu menyusun informasi pelanggaran agar lebih terorganisasi.',
    process: 'Project dikembangkan menggunakan HTML, CSS, Tailwind CSS, dan JavaScript.',
    features: ['Antarmuka pencatatan pelanggaran', 'Penyajian data siswa', 'Tampilan aplikasi web'],
    stack: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript'],
    demo: null,
  },
  {
    slug: 'landing-page-portofolio',
    name: 'Landing Page Portofolio',
    category: 'UI design',
    year: 'Not specified',
    image: '/myproject2.png',
    width: 1440,
    height: 1120,
    alt: 'Portfolio landing page design screenshot',
    description: 'Eksplorasi desain antarmuka untuk landing page personal portfolio.',
    overview: 'Project eksplorasi UI yang dibuat menggunakan Figma. Ini merupakan rancangan desain, bukan aplikasi web yang sudah berjalan.',
    goal: 'Mengeksplorasi komposisi visual dan hierarki informasi untuk portfolio personal.',
    process: 'Perancangan dilakukan di Figma.',
    features: ['Eksplorasi layout', 'Visual hierarchy', 'Konsep landing page'],
    stack: ['Figma'],
    demo: null,
  },
  {
    slug: 'landing-page-rental-mobil',
    name: 'Landing Page Rental Mobil',
    category: 'Landing page design',
    year: 'Not specified',
    image: '/myproject3.png',
    width: 1440,
    height: 1240,
    alt: 'Car rental landing page design screenshot',
    description: 'Rancangan landing page untuk layanan penyewaan kendaraan.',
    overview: 'Project desain landing page untuk layanan rental mobil. Project ini merupakan desain Figma, bukan aplikasi yang sudah berfungsi.',
    goal: 'Menyusun informasi layanan rental mobil dalam tampilan landing page yang jelas.',
    process: 'Desain antarmuka dibuat menggunakan Figma.',
    features: ['Konsep landing page', 'Penyusunan informasi layanan', 'Eksplorasi UI'],
    stack: ['Figma'],
    demo: null,
  },
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/* Navigation, scroll indicator, and active section */
const nav = $('#bottomNav');
const navLinks = $$('[data-nav-link]');
const menuToggle = $('#menuToggle');
const primaryNav = $('#primaryNav');
const progress = $('.scroll-progress');
const backToTop = $('.back-to-top');

const closeMenu = () => {
  primaryNav?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Buka navigasi');
  document.body.classList.remove('menu-open');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    closeMenu();
    return;
  }
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Tutup navigasi');
  primaryNav?.classList.add('is-open');
  document.body.classList.add('menu-open');
});

primaryNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle?.focus();
  }
});
document.addEventListener('click', event => {
  if (!menuToggle?.contains(event.target) && !primaryNav?.contains(event.target)) closeMenu();
});

let scrollTicking = false;
const updateScrollState = () => {
  nav?.classList.toggle('is-scrolled', window.scrollY > 16);

  let current = 'home';
  ['home', 'about', 'portfolio', 'contact'].forEach(id => {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
  });
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.transform = `scaleX(${scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0})`;
  backToTop?.classList.toggle('is-visible', window.scrollY > 520);
  scrollTicking = false;
};

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    scrollTicking = true;
    requestAnimationFrame(updateScrollState);
  }
}, { passive: true });
updateScrollState();

backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

if (!reduceMotion && finePointer.matches) {
  const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: { offset: -80 } });
  const raf = time => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

/* Portfolio tabs */
$$('.portfolio-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.portfolio-tab').forEach(item => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    $$('.portfolio-panel').forEach(panel => {
      const active = panel.id === tab.dataset.panel;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  });
});

/* Projects: one data source for cards, filters, archive, and detail views */
const projectCard = (project, index, animate = false) => `
  <article class="work-card${animate ? ' filter-enter' : ''}"${animate ? ` style="--filter-index:${index}"` : ''}>
    <a class="work-image" href="?project=${project.slug}" aria-label="Lihat detail ${project.name}">
      <img src="${project.image}" alt="${project.alt}" width="${project.width}" height="${project.height}" loading="lazy" decoding="async" />
      <span class="work-image-overlay">VIEW DETAILS ↗</span>
      <span class="work-number">${String(index + 1).padStart(2, '0')}</span>
      <span class="work-arrow" aria-hidden="true">↗</span>
    </a>
    <div class="work-card-body">
      <div class="work-meta"><span>${project.category}</span><span>${project.year}</span></div>
      <h3><a href="?project=${project.slug}">${project.name}</a></h3>
      <p>${project.description}</p>
      <div class="work-tags">${project.stack.map(tag => `<span>${tag}</span>`).join('')}</div>
      <div class="work-card-links">
        <a href="?project=${project.slug}">Project details ↗</a>
        <a href="${GITHUB_URL}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      </div>
    </div>
  </article>`;

const projectGrid = $('#projectGrid');
const projectFilters = $('#projectFilters');
if (projectGrid && projectFilters) {
  const categories = ['All', ...new Set(projects.map(project => project.category))];
  const renderProjects = active => {
    projectFilters.innerHTML = categories.map(category => `
      <button class="project-filter-chip${category === active ? ' is-active' : ''}" type="button"
        aria-pressed="${String(category === active)}" data-filter="${category}">${category}</button>`).join('');
    const visible = projects.filter(project => active === 'All' || project.category === active);
    projectGrid.innerHTML = visible
      .map(project => projectCard(project, projects.indexOf(project), true))
      .join('');
  };

  renderProjects('All');
  projectFilters.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (button) renderProjects(button.dataset.filter);
  });
}

/* Tech stack grouped by category */
const stackPanel = $('#portfolio-stack');
if (stackPanel) {
  const groups = [
    { title: 'Frontend Development', items: [['HTML', 'html5', 'Markup'], ['CSS', 'css3', 'Styling'], ['JavaScript', 'javascript', 'Language'], ['TypeScript', 'typescript', 'Language'], ['Tailwind CSS', 'tailwindcss', 'CSS framework'], ['React', 'react', 'Library']] },
    { title: 'Backend Development', items: [['PHP', 'php', 'Language'], ['Laravel', 'laravel', 'Framework']] },
    { title: 'Database', items: [['MySQL', 'mysql', 'Relational database']] },
    { title: 'Tools & Design', items: [['Figma', 'figma', 'UI design'], ['Git', 'git', 'Version control'], ['GitHub', 'github', 'Repositories'], ['Vite', 'vite', 'Build tool'], ['Vercel', 'vercel', 'Deployment'], ['Firebase', 'firebase', 'Services']] },
  ];

  stackPanel.innerHTML = `
    <div class="stack-intro">
      <p class="eyebrow">Tools I work with</p>
      <h3>Skills &amp; Tools<span class="period">.</span></h3>
      <p>Technologies I use to design, build, and ship projects.</p>
    </div>
    ${groups.map((group, groupIndex) => `
      <section class="stack-category">
        <div class="stack-category-heading"><span>${String(groupIndex + 1).padStart(2, '0')}</span><h4>${group.title}</h4></div>
        <div class="stack-grid">
          ${group.items.map(([name, icon, type]) => `
            <div class="skill-card">
              <span class="skill-icon"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg" alt="" width="26" height="26" loading="lazy" decoding="async" /></span>
              <span class="skill-name">${name}</span>
              <span class="skill-type">${type}</span>
            </div>`).join('')}
        </div>
      </section>`).join('')}`;
}

/* Contact form and copy-email feedback */
const form = $('#contactForm');
const formStatus = $('#formStatus');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const message = String(data.get('message') || '').trim();

  if (!form.checkValidity() || !name || !email || !message) {
    if (formStatus) formStatus.textContent = 'Lengkapi nama, email yang valid, dan pesan terlebih dahulu.';
    form.reportValidity();
    return;
  }

  const text = `Halo Hafidz, saya ${name} (${email}).\n\n${message}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (formStatus) {
    formStatus.textContent = opened
      ? 'Pesan siap dikirim. Lanjutkan di tab WhatsApp yang baru dibuka.'
      : 'Popup diblokir browser. Izinkan popup lalu coba lagi, atau hubungi lewat kartu kontak di atas.';
  }
});

const copyEmail = $('#copyEmail');
const copyStatus = $('#copyStatus');
const emailLink = $('.contact-card[href^="mailto:"] .contact-card-value');
copyEmail?.addEventListener('click', async () => {
  const value = emailLink?.textContent.trim() || 'hafidzabdillah19706@gmail.com';
  try {
    await navigator.clipboard.writeText(value);
    copyEmail.textContent = 'Copied!';
    copyEmail.classList.add('is-copied');
    if (copyStatus) copyStatus.textContent = 'Alamat email disalin.';
  } catch {
    if (copyStatus) copyStatus.textContent = 'Gagal menyalin. Silakan salin alamat email secara manual.';
  }
  window.setTimeout(() => {
    copyEmail.textContent = 'Copy email';
    copyEmail.classList.remove('is-copied');
    if (copyStatus) copyStatus.textContent = '';
  }, 2200);
});

/* Archive and case-study views (same URLs as the existing site) */
const params = new URLSearchParams(window.location.search);
const projectSlug = params.get('project');
const page = params.get('page');
const main = $('main');
const header = $('.site-nav');

const pageShell = (eyebrow, title, content) => `
  <div class="subpage">
    <div class="subpage-top"><a href="/" class="back-link">← Back to home</a><span>HAFIDZ / PORTFOLIO</span></div>
    <header class="subpage-heading"><p>${eyebrow}</p><h1>${title}</h1></header>
    ${content}
  </div>`;

const renderArchive = () => {
  document.title = 'More Projects — Muhammad Hafidz Abdillah';
  if (header) header.hidden = true;
  if (main) main.innerHTML = pageShell('ARCHIVE / 05 PROJECTS', 'More projects', `<div class="archive-grid">${projects.map((project, index) => projectCard(project, index)).join('')}</div>`);
};

const renderDetail = project => {
  document.title = `${project.name} — Muhammad Hafidz Abdillah`;
  if (header) header.hidden = true;
  const index = projects.indexOf(project);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const links = `<div class="detail-links">
    <a href="${GITHUB_URL}" target="_blank" rel="noopener noreferrer">GitHub profile ↗</a>
    ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer">Live demo ↗</a>` : '<span>Link live demo belum tersedia.</span>'}
  </div>`;

  const content = `
    <div class="detail-hero">
      <div><p class="detail-category">${project.category} · ${project.year}</p><h2>${project.name}</h2><p>${project.description}</p></div>
      <span class="detail-index">${String(index + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}</span>
    </div>
    <img class="detail-cover" src="${project.image}" alt="${project.alt}" width="${project.width}" height="${project.height}" loading="lazy" decoding="async" />
    <div class="detail-columns">
      <aside>
        <p class="detail-label">Project type</p><p>${project.category}</p>
        <p class="detail-label">Year</p><p>${project.year}</p>
        <p class="detail-label">Tools</p><div class="detail-tags">${project.stack.map(tag => `<span>${tag}</span>`).join('')}</div>
      </aside>
      <div class="detail-body">
        <section><p class="detail-label">01 / Overview</p><h3>About the project</h3><p>${project.overview}</p><p>${project.goal}</p></section>
        <section><p class="detail-label">02 / Design &amp; development</p><h3>How it was made</h3><p>${project.process}</p></section>
        <section><p class="detail-label">03 / Main features</p><h3>What's included</h3><ul>${project.features.map(feature => `<li>${feature}</li>`).join('')}</ul></section>
        <section><p class="detail-label">04 / Technology</p><h3>Tools used</h3><div class="detail-tags">${project.stack.map(tag => `<span>${tag}</span>`).join('')}</div></section>
        <section><p class="detail-label">05 / Project links</p><h3>Explore</h3>${links}</section>
      </div>
    </div>
    <nav class="project-pagination" aria-label="Navigasi project">
      <a href="?project=${previous.slug}">← Previous<strong>${previous.name}</strong></a>
      <a href="?page=projects">All projects</a>
      <a href="?project=${next.slug}">Next →<strong>${next.name}</strong></a>
    </nav>`;

  if (main) main.innerHTML = pageShell('PROJECT / CASE STUDY', project.name, content);
};

if (projectSlug) {
  const selected = projects.find(project => project.slug === projectSlug);
  if (selected) renderDetail(selected);
  else if (main) main.innerHTML = pageShell('404 / NOT FOUND', 'Project not found', '<p class="not-found">This project could not be found. <a href="?page=projects">Browse all projects</a>.</p>');
} else if (page === 'projects') {
  renderArchive();
}

/* Scroll reveal */
const revealTargets = $$('.reveal');
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      instance.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach((target, index) => {
    target.style.setProperty('--motion-index', String(index % 4));
    observer.observe(target);
  });
} else {
  revealTargets.forEach(target => target.classList.add('is-visible'));
}

/* Draggable 3D profile card: mouse tilt, drag, touch, and keyboard */
const idCard = $('[data-id-card]');
if (idCard && !reduceMotion) {
  const stage = idCard.parentElement;
  const maxTilt = 16;
  let frame = 0;
  let dragging = false;
  let pointerId = null;
  let lastX = 0;
  let lastY = 0;
  let lastTime = 0;
  let velocityX = 0;
  let velocityY = 0;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let lightX = 50;
  let lightY = 50;
  let targetLightX = 50;
  let targetLightY = 50;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const render = () => {
    const ease = dragging ? 0.22 : 0.12;
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    lightX += (targetLightX - lightX) * 0.18;
    lightY += (targetLightY - lightY) * 0.18;
    idCard.style.setProperty('--tilt-x', `${currentX.toFixed(2)}deg`);
    idCard.style.setProperty('--tilt-y', `${currentY.toFixed(2)}deg`);
    idCard.style.setProperty('--light-x', `${lightX.toFixed(1)}%`);
    idCard.style.setProperty('--light-y', `${lightY.toFixed(1)}%`);
    idCard.style.setProperty('--shadow-x', `${(-currentY * 0.5).toFixed(1)}px`);
    idCard.style.setProperty('--shadow-y', `${(22 + Math.abs(currentX) * 0.6).toFixed(1)}px`);

    const showingBack = Math.abs(currentY) > 90;
    $('.id-card-front', idCard)?.setAttribute('aria-hidden', String(showingBack));
    $('.id-card-back', idCard)?.setAttribute('aria-hidden', String(!showingBack));

    const moving = Math.abs(targetX - currentX) > 0.04 || Math.abs(targetY - currentY) > 0.04 ||
      Math.abs(targetLightX - lightX) > 0.2 || Math.abs(targetLightY - lightY) > 0.2;
    frame = moving ? requestAnimationFrame(render) : 0;
  };

  const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
  const setLighting = event => {
    const rect = idCard.getBoundingClientRect();
    targetLightX = clamp((event.clientX - rect.left) / rect.width, 0, 1) * 100;
    targetLightY = clamp((event.clientY - rect.top) / rect.height, 0, 1) * 100;
  };

  idCard.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragging = true;
    pointerId = event.pointerId;
    lastX = event.clientX;
    lastY = event.clientY;
    lastTime = performance.now();
    velocityX = 0;
    velocityY = 0;
    idCard.setPointerCapture?.(pointerId);
    idCard.classList.add('is-card-dragging');
    stage?.classList.add('is-card-active');
    setLighting(event);
    schedule();
  });

  idCard.addEventListener('pointermove', event => {
    if (dragging && event.pointerId === pointerId) {
      const now = performance.now();
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      const dt = Math.max(8, now - lastTime);
      targetY = clamp(targetY + dx * 0.62, -180, 180);
      targetX = clamp(targetX - dy * 0.48, -maxTilt, maxTilt);
      velocityY = (dx / dt) * 16;
      velocityX = (-dy / dt) * 12;
      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
      setLighting(event);
      schedule();
      return;
    }

    if (!dragging && finePointer.matches) {
      const rect = idCard.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      targetX = (0.5 - y) * 8;
      targetY = (x - 0.5) * 10;
      setLighting(event);
      stage?.classList.add('is-card-active');
      schedule();
    }
  }, { passive: true });

  const finishDrag = event => {
    if (!dragging || (event && event.pointerId !== pointerId)) return;
    dragging = false;
    if (pointerId !== null && idCard.hasPointerCapture?.(pointerId)) idCard.releasePointerCapture(pointerId);
    pointerId = null;
    targetX = clamp(targetX + velocityX * 0.16, -maxTilt, maxTilt);
    targetY = clamp(targetY + velocityY * 0.18, -180, 180);
    velocityX = 0;
    velocityY = 0;
    idCard.classList.remove('is-card-dragging');
    targetLightX = 50;
    targetLightY = 50;
    window.setTimeout(() => {
      if (dragging) return;
      targetX = 0;
      targetY = 0;
      stage?.classList.remove('is-card-active');
      schedule();
    }, 650);
    schedule();
  };

  idCard.addEventListener('pointerup', finishDrag);
  idCard.addEventListener('pointercancel', finishDrag);
  idCard.addEventListener('lostpointercapture', finishDrag);
  idCard.addEventListener('pointerleave', () => {
    if (dragging) return;
    targetX = 0;
    targetY = 0;
    targetLightX = 50;
    targetLightY = 50;
    stage?.classList.remove('is-card-active');
    schedule();
  });
  window.addEventListener('blur', () => finishDrag());

  idCard.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') targetY = clamp(targetY - 12, -180, 180);
    else if (event.key === 'ArrowRight') targetY = clamp(targetY + 12, -180, 180);
    else if (event.key === 'ArrowUp') targetX = clamp(targetX - 8, -maxTilt, maxTilt);
    else if (event.key === 'ArrowDown') targetX = clamp(targetX + 8, -maxTilt, maxTilt);
    else if (event.key === 'Home') { targetX = 0; targetY = 0; }
    else return;
    event.preventDefault();
    stage?.classList.add('is-card-active');
    schedule();
  });
}
