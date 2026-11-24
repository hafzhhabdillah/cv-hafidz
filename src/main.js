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
  nav?.classList.toggle('is-scrolled', window.scrollY > 48);

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

/* Portfolio pill tabs */
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
  <article class="work-card reveal${animate ? ' filter-enter' : ''}" style="--motion-index:${index % 3};${animate ? ` --filter-index:${index};` : ''}">
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
if (projectGrid) {
  projectGrid.innerHTML = projects
    .slice(0, 3)
    .map((project, index) => projectCard(project, index))
    .join('');
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
            <div class="skill-card reveal" style="--motion-index:${groupIndex % 4}">
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

/* Lanyard name tag: Verlet rope physics, drag-to-spin 3D card, tap / Enter to flip */
const lanyardStage = $('[data-lanyard-stage]');
if (lanyardStage) {
  const stage = lanyardStage;
  const tag = $('[data-lanyard-card]', stage);
  const inner = $('[data-lanyard-inner]', tag);
  const front = $('[data-lanyard-front]', tag);
  const back = $('[data-lanyard-back]', tag);
  const hint = $('[data-lanyard-hint]', stage);
  const elBody = $('[data-lanyard-body]', stage);
  const elSL = $('[data-lanyard-stitch-l]', stage);
  const elSR = $('[data-lanyard-stitch-r]', stage);
  const elCenter = $('[data-lanyard-center]', stage);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* values you can tweak */
  const SEG = 11;             // rope segments
  const ROPE = 360;           // slightly shorter strap
  const STRAP_W = 22;         // strap width (px)
  const AY = -100;            // anchor height relative to the stage top (strap fades in from here)
  const GRAV = 0.55;          // higher = heavier
  const AIR = 0.992;          // rope air resistance (1 = none)
  const SPIN_K = 0.035;       // snap strength to front/back
  const SPIN_FRICTION = 0.8;  // higher = bouncier flip, lower = stiffer
  const DRAG_TO_DEG = 0.6;    // degrees of spin per px dragged

  const SL = ROPE / SEG, STEP = 1000 / 60, ITER = 16;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  let W = 260, ax = 0, stageW = 460;
  const P = [], Q = [], IM = [];
  for (let i = 0; i <= SEG; i++) {
    P.push({ x: 0, y: 0 });
    Q.push({ x: 0, y: 0 });
    IM.push(i === 0 ? 0 : i === SEG ? 0.35 : 1); // the card end is heavier
  }

  let az = 0, vz = 0;          // card tilt (rotateZ)
  let ayaw = 0, vyaw = 0;      // card spin (rotateY)
  let spinTarget = 0;          // multiples of 180 = front / back
  let drag = false, tx = 0, ty = 0, ox = 0, oy = 0, lastX = 0, down = null;
  let frontUp = true, ready = false;

  const initRope = () => {
    const a = reduce ? 0 : (20 * Math.PI) / 180; // start tilted so it swings in on load
    for (let i = 0; i <= SEG; i++) {
      P[i].x = ax + Math.sin(a) * i * SL;
      P[i].y = AY + Math.cos(a) * i * SL;
      Q[i].x = P[i].x;
      Q[i].y = P[i].y;
    }
  };

  const layout = () => {
    const w = stage.clientWidth;
    if (!w) return;
    stageW = w;
    W = tag.offsetWidth;
    tag.style.transformOrigin = `${W / 2}px 0px`;
    const nax = w / 2;
    if (!ready) {
      ax = nax;
      initRope();
      ready = true;
    } else if (nax !== ax) {
      const d = nax - ax;
      ax = nax;
      for (let i = 0; i <= SEG; i++) { P[i].x += d; Q[i].x += d; }
    }
    if (reduce) render();
  };

  const step = () => {
    for (let i = 1; i <= SEG; i++) {
      const p = P[i], q = Q[i];
      let vx = (p.x - q.x) * AIR, vy = (p.y - q.y) * AIR;
      const sp = Math.hypot(vx, vy);
      if (sp > 45) { vx *= 45 / sp; vy *= 45 / sp; }
      q.x = p.x; q.y = p.y;
      p.x += vx; p.y += vy + GRAV;
    }
    if (drag) {
      const p = P[SEG];
      p.x += (tx - p.x) * 0.5;
      p.y += (ty - p.y) * 0.5;
    }
    for (let k = 0; k < ITER; k++) {
      P[0].x = ax; P[0].y = AY;
      for (let i = 0; i < SEG; i++) {
        const a = P[i], b = P[i + 1];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 1e-4;
        const diff = (d - SL) / d, wa = IM[i], wb = IM[i + 1], s = wa + wb;
        a.x += (dx * diff * wa) / s; a.y += (dy * diff * wa) / s;
        b.x -= (dx * diff * wb) / s; b.y -= (dy * diff * wb) / s;
      }
      if (drag) {
        P[SEG].x = tx;
        P[SEG].y = ty;
      }
    }

    // Keep the photo endpoint within the visible stage, but let it reach both sides.
    const minX = W / 2 + 4;
    const maxX = stageW - W / 2 - 4;
    P[SEG].x = clamp(P[SEG].x, minX, maxX);
    Q[SEG].x = clamp(Q[SEG].x, minX, maxX);

    // card tilt follows the rope direction, with a little lag so it feels heavy
    const a = P[SEG - 2], b = P[SEG];
    let tz = (-Math.atan2(b.x - a.x, b.y - a.y) * 180) / Math.PI;
    if (drag) tz += clamp((b.x - Q[SEG].x) * 0.9, -22, 22);
    vz += (tz - az) * 0.09; vz *= 0.86; az += vz;

    // card spin: angle is set by the drag; on release it snaps to the nearest side
    if (drag) {
      vyaw *= 0.8;
    } else {
      vyaw += (spinTarget - ayaw) * SPIN_K;
      vyaw *= SPIN_FRICTION;
      vyaw = clamp(vyaw, -45, 45);
      ayaw += vyaw;
    }
  };

  const offs = o => P.map((p, i) => {
    const a = P[Math.max(i - 1, 0)], b = P[Math.min(i + 1, SEG)];
    const tx_ = b.x - a.x, ty_ = b.y - a.y, l = Math.hypot(tx_, ty_) || 1;
    return { x: p.x - (ty_ / l) * o, y: p.y + (tx_ / l) * o };
  });
  const smooth = (pts, move = true) => {
    const f = n => n.toFixed(1);
    let d = (move ? 'M' : 'L') + f(pts[0].x) + ' ' + f(pts[0].y);
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i].x + pts[i + 1].x) / 2, my = (pts[i].y + pts[i + 1].y) / 2;
      d += ` Q${f(pts[i].x)} ${f(pts[i].y)} ${f(mx)} ${f(my)}`;
    }
    const l = pts[pts.length - 1];
    return d + ` L${f(l.x)} ${f(l.y)}`;
  };
  const drawStrap = () => {
    const h = STRAP_W / 2;
    elBody.setAttribute('d', smooth(offs(h)) + smooth(offs(-h).reverse(), false) + 'Z');
    elSL.setAttribute('d', smooth(offs(h - 3.5)));
    elSR.setAttribute('d', smooth(offs(-(h - 3.5))));
    elCenter.setAttribute('d', smooth(P));
  };

  function render() {
    const x = P[SEG].x, y = P[SEG].y;
    tag.style.transform = `translate3d(${x - W / 2}px, ${y}px, 0) rotate(${az}deg)`;
    const swing = clamp((P[SEG].x - Q[SEG].x) * 1.2, -14, 14);
    const deg = ayaw + swing;
    inner.style.transform = `perspective(1100px) rotateY(${deg}deg)`;
    const r = (deg * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
    inner.style.setProperty('--lanyard-gx', (50 + 60 * s).toFixed(1) + '%');
    inner.style.setProperty('--lanyard-shade', ((1 - Math.abs(c)) * 0.38).toFixed(3));
    const f = c >= 0;
    if (f !== frontUp) {
      frontUp = f;
      front.inert = !f; back.inert = f;
      front.setAttribute('aria-hidden', String(!f));
      back.setAttribute('aria-hidden', String(f));
    }
    drawStrap();
  }

  const toStage = e => { const r = stage.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const hideHint = () => hint && hint.classList.add('is-hidden');

  const spin = dir => {
    spinTarget = (Math.round(ayaw / 180) + dir) * 180;
    vyaw = clamp(vyaw + dir * 8, -45, 45);
    hideHint();
  };
  const toggle = () => { ayaw = Math.round(ayaw / 180) * 180 + 180; hideHint(); render(); };
  const flip = reduce ? () => toggle() : spin;

  if (!reduce) {
    /* Drag can start anywhere inside the expanded home-stage, not only on the card. */
    stage.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target.closest('a')) return; // keep the card's back-side links usable
      const s = toStage(e);
      drag = true;
      tag.classList.add('is-dragging');
      stage.setPointerCapture(e.pointerId);
      ox = s.x - P[SEG].x; oy = s.y - P[SEG].y;
      tx = P[SEG].x; ty = P[SEG].y; lastX = e.clientX;
      down = {
        x: e.clientX,
        y: e.clientY,
        t: performance.now(),
        moved: 0,
        startedOnCard: Boolean(e.target.closest('[data-lanyard-card]'))
      };
      hideHint();
    });
    stage.addEventListener('pointermove', e => {
      if (!drag) return;
      const s = toStage(e);
      tx = clamp(s.x - ox, W / 2 + 4, stageW - W / 2 - 4);
      ty = clamp(s.y - oy, 0, stage.clientHeight - tag.offsetHeight);
      const dAng = (e.clientX - lastX) * DRAG_TO_DEG;
      lastX = e.clientX;
      ayaw += dAng;
      vyaw = 0.5 * vyaw + 0.5 * dAng;
      down.moved = Math.max(down.moved, Math.hypot(e.clientX - down.x, e.clientY - down.y));
    });
    const end = e => {
      if (!drag) return;
      drag = false;
      tag.classList.remove('is-dragging');
      spinTarget = Math.round((ayaw + vyaw * 6) / 180) * 180; // release: settle on the nearest side
      if (e.type === 'pointerup' && down.startedOnCard && down.moved < 6 && performance.now() - down.t < 350) {
        const r = tag.getBoundingClientRect();
        flip(e.clientX < r.left + r.width / 2 ? -1 : 1); // tap on the card flips toward the touched side
      }
    };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);
  } else {
    tag.addEventListener('click', e => { if (!e.target.closest('a')) toggle(); });
  }

  tag.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') { e.preventDefault(); flip(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); flip(-1); }
  });

  new ResizeObserver(layout).observe(stage);
  layout();

  if (!reduce) {
    let last = performance.now(), acc = 0, visible = true;
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(stage);
    const frame = now => {
      requestAnimationFrame(frame);
      if (!visible || document.hidden) { last = now; return; }
      acc += Math.min(now - last, 50);
      last = now;
      while (acc >= STEP) { step(); acc -= STEP; }
      render();
    };
    requestAnimationFrame(frame);
  }
}
