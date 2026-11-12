import './style.css';
import Lenis from 'lenis';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const projects = [
  {slug:'meowketplace',name:'Meowketplace',category:'E-commerce website',year:'Not specified',image:'/myproject1.png',alt:'Meowketplace project screenshot',description:'Website e-commerce untuk kebutuhan kucing kesayangan.',overview:'Meowketplace merupakan project e-commerce yang berfokus pada kebutuhan hewan peliharaan, khususnya kucing. Project ini menggabungkan perancangan antarmuka dan implementasi halaman web.',goal:'Menyajikan pengalaman katalog produk yang mudah dipahami dan nyaman dijelajahi.',process:'Perancangan UI dilakukan dengan Figma, kemudian tampilan dibangun menggunakan HTML, CSS, Tailwind CSS, dan JavaScript.',features:['Tampilan katalog produk','Layout responsif','Antarmuka e-commerce'],stack:['HTML','CSS','Figma','Tailwind CSS','JavaScript'],featured:true},
  {slug:'landing-page-bbil-furniture',name:'Landing Page Bbil Furniture',category:'E-commerce concept',year:'Not specified',image:'/myproject4.png',alt:'Bbil Furniture landing page screenshot',description:'Konsep landing page untuk menampilkan produk furniture dan kebutuhan rumah.',overview:'Project konsep e-commerce yang berfokus pada presentasi produk furniture melalui landing page.',goal:'Membuat tampilan produk rumah tangga yang terstruktur dan mudah dipindai.',process:'Desain antarmuka disusun dengan Figma dan diimplementasikan menggunakan HTML, CSS, Tailwind CSS, serta JavaScript.',features:['Product-focused landing page','Struktur konten produk','Layout responsif'],stack:['HTML','CSS','Figma','Tailwind CSS','JavaScript'],featured:true},
  {slug:'aplikasi-pelanggaran-siswa',name:'Aplikasi Pelanggaran Siswa',category:'Web application',year:'Not specified',image:'/myproject5.png',alt:'Student violation application screenshot',description:'Aplikasi web untuk membantu pencatatan pelanggaran siswa.',overview:'Aplikasi web yang dibuat untuk mendukung pencatatan data pelanggaran siswa.',goal:'Membantu menyusun informasi pelanggaran agar lebih terorganisasi.',process:'Project dikembangkan menggunakan HTML, CSS, Tailwind CSS, dan JavaScript.',features:['Antarmuka pencatatan pelanggaran','Penyajian data siswa','Tampilan aplikasi web'],stack:['HTML','CSS','Tailwind CSS','JavaScript'],featured:true},
  {slug:'landing-page-portofolio',name:'Landing Page Portofolio',category:'UI design',year:'Not specified',image:'/myproject2.png',alt:'Portfolio landing page design screenshot',description:'Eksplorasi desain antarmuka untuk landing page personal portfolio.',overview:'Project eksplorasi UI yang dibuat menggunakan Figma. Ini merupakan rancangan desain, bukan aplikasi web yang sudah berjalan.',goal:'Mengeksplorasi komposisi visual dan hierarki informasi untuk portfolio personal.',process:'Perancangan dilakukan di Figma.',features:['Eksplorasi layout','Visual hierarchy','Konsep landing page'],stack:['Figma'],featured:false},
  {slug:'landing-page-rental-mobil',name:'Landing Page Rental Mobil',category:'Landing page design',year:'Not specified',image:'/myproject3.png',alt:'Car rental landing page design screenshot',description:'Rancangan landing page untuk layanan penyewaan kendaraan.',overview:'Project desain landing page untuk layanan rental mobil. Project ini merupakan desain Figma, bukan aplikasi yang sudah berfungsi.',goal:'Menyusun informasi layanan rental mobil dalam tampilan landing page yang jelas.',process:'Desain antarmuka dibuat menggunakan Figma.',features:['Konsep landing page','Penyusunan informasi layanan','Eksplorasi UI'],stack:['Figma'],featured:false}
];

const nav = document.getElementById('bottomNav');
const navLinks = [...document.querySelectorAll('[data-nav-link]')];
const updateNav = () => {
  const y = window.scrollY;
  nav?.classList.toggle('is-scrolled', y > 24);
  let current = 'home';
  ['home','about','portfolio','contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= window.innerHeight * .42) current = id;
  });
  navLinks.forEach(a => {
    const active = a.getAttribute('href') === '#' + current;
    a.classList.toggle('is-active', active);
    if (active) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current');
  });
};
window.addEventListener('scroll', updateNav, {passive:true});
updateNav();

const menuToggle = document.getElementById('menuToggle');
const primaryNav = document.getElementById('primaryNav');
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  primaryNav?.classList.toggle('is-open', open);
});
primaryNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuToggle?.setAttribute('aria-expanded','false');
  primaryNav.classList.remove('is-open');
}));

if (!reduceMotion) {
  const lenis = new Lenis({duration:1.05,smoothWheel:true});
  const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

const card = p => `<article class="work-card"><a class="work-image" href="?project=${p.slug}" aria-label="View details for ${p.name}"><img src="${p.image}" alt="${p.alt}" loading="lazy"><span class="work-number">${String(projects.indexOf(p)+1).padStart(2,'0')}</span><span class="work-arrow">↗</span></a><div class="work-meta"><span>${p.category}</span><span>${p.year}</span></div><h3><a href="?project=${p.slug}">${p.name}</a></h3><p>${p.description}</p><div class="work-tags">${p.stack.map(t=>'<span>'+t+'</span>').join('')}</div><a class="text-link" href="?project=${p.slug}">View project <span>↗</span></a></article>`;
const grid = document.querySelector('.portfolio-project-grid');
if (grid) {
  grid.innerHTML = projects.filter(p=>p.featured).map(card).join('');
  const more = document.createElement('div');
  more.className = 'view-all-wrap';
  more.innerHTML = '<a class="outline-link" href="?page=projects">View all projects <span>→</span></a>';
  grid.after(more);
}

const stackPanel = document.getElementById('portfolio-stack');
if (stackPanel) {
  const groups = [
    ['01','Frontend',['HTML','CSS','JavaScript','TypeScript']],
    ['02','Styling',['Tailwind CSS']],
    ['03','Design',['Figma']],
    ['04','Development tools',['Vite','Git','GitHub']],
    ['05','Deployment & services',['Vercel','Firebase']]
  ];
  const icons = {'HTML':'html5','CSS':'css3','JavaScript':'javascript','TypeScript':'typescript','Tailwind CSS':'tailwindcss','Figma':'figma','Vite':'vite','Git':'git','GitHub':'github','Vercel':'vercel','Firebase':'firebase'};
  stackPanel.innerHTML = '<div class="portfolio-stack-intro"><p>TOOLS I WORK WITH</p><h3>Tech stack<span>.</span></h3><span class="stack-caption">Tools and technologies I am learning and using in projects.</span></div>'+groups.map(([n,title,items])=>'<section class="stack-category"><div class="stack-category-heading"><span>'+n+'</span><h4>'+title+'</h4></div><div class="stack-grid">'+items.map(name=>'<div class="skill-card"><span class="skill-icon"><img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/'+icons[name]+'/'+icons[name]+'-original.svg" alt=""></span><span class="skill-name">'+name+'</span></div>').join('')+'</div></section>').join('');
}

document.querySelectorAll('.portfolio-tab').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('.portfolio-tab').forEach(item=>{const active=item===tab;item.classList.toggle('is-active',active);item.setAttribute('aria-selected',String(active));});
  document.querySelectorAll('.portfolio-panel').forEach(panel=>{const active=panel.id===tab.dataset.panel;panel.hidden=!active;panel.classList.toggle('is-active',active);});
}));

const certificates = document.getElementById('portfolio-certificates');
if (certificates) certificates.innerHTML = '<div class="coming-soon-card"><p class="coming-soon-kicker">CERTIFICATES</p><h3>Nothing to show yet.</h3><p>Sertifikat akan ditambahkan setelah tersedia.</p></div>';

const aboutContent = document.querySelector('#about .fade-right');
if (aboutContent && !aboutContent.querySelector('.about-facts')) {
  const facts = document.createElement('div');
  facts.className = 'about-facts';
  facts.innerHTML = '<div><span>EDUCATION</span><strong>SMK Madinatul Qur’an</strong><small>Rekayasa Perangkat Lunak</small></div><div><span>FOCUS AREAS</span><strong>Front-end development</strong><small>UI design · Responsive web</small></div><div><span>INTERESTS</span><strong>Web projects & visual design</strong><small>Basketball · Exploring technology</small></div>';
  aboutContent.append(facts);
}

const form = document.getElementById('contactForm');
form?.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get('name')||'').trim();
  const email = String(data.get('email')||'').trim();
  const message = String(data.get('message')||'').trim();
  const text = `Halo Hafidz, saya ${name} (${email}).\n\n${message}`;
  window.open(`https://wa.me/6285891263024?text=${encodeURIComponent(text)}`,'_blank','noopener,noreferrer');
});

const params = new URLSearchParams(window.location.search);
const projectSlug = params.get('project');
const page = params.get('page');
const main = document.querySelector('main');
const originalMain = main?.innerHTML;
const header = document.querySelector('.site-nav');
const footer = document.querySelector('footer');
const pageShell = (eyebrow,title,content) => `<div class="subpage"><div class="subpage-top"><a href="/" class="back-link">← Back to home</a><span>HAFIDZ / PORTFOLIO</span></div><header class="subpage-heading"><p>${eyebrow}</p><h1>${title}</h1></header>${content}</div>`;
const renderProjects = () => {
  document.title = 'More Projects — Muhammad Hafidz Abdillah';
  if (header) header.style.display = 'none';
  if (main) main.innerHTML = pageShell('ARCHIVE / 05 PROJECTS','More projects', '<div class="archive-grid">'+projects.map(card).join('')+'</div>');
};
const renderDetail = p => {
  document.title = p.name+' — Muhammad Hafidz Abdillah';
  if (header) header.style.display = 'none';
  const i = projects.indexOf(p);
  const previous = projects[(i-1+projects.length)%projects.length];
  const next = projects[(i+1)%projects.length];
  const links = '<div class="detail-links"><span>External project links have not been provided.</span></div>';
  const content = `<div class="detail-hero"><div><p class="detail-category">${p.category} · ${p.year}</p><h2>${p.name}</h2><p>${p.description}</p></div><span class="detail-index">${String(i+1).padStart(2,'0')} / 05</span></div><img class="detail-cover" src="${p.image}" alt="${p.alt}"><div class="detail-columns"><aside><p class="detail-label">PROJECT TYPE</p><p>${p.category}</p><p class="detail-label">YEAR</p><p>${p.year}</p><p class="detail-label">TOOLS</p><div class="detail-tags">${p.stack.map(t=>'<span>'+t+'</span>').join('')}</div></aside><div class="detail-body"><section><p class="detail-label">01 / OVERVIEW</p><h3>About the project</h3><p>${p.overview}</p><p>${p.goal}</p></section><section><p class="detail-label">02 / DESIGN & DEVELOPMENT</p><h3>How it was made</h3><p>${p.process}</p></section><section><p class="detail-label">03 / MAIN FEATURES</p><h3>What’s included</h3><ul>${p.features.map(f=>'<li>'+f+'</li>').join('')}</ul></section><section><p class="detail-label">04 / TECHNOLOGY</p><h3>Tools used</h3><div class="detail-tags">${p.stack.map(t=>'<span>'+t+'</span>').join('')}</div></section><section><p class="detail-label">05 / PROJECT LINKS</p><h3>Explore</h3>${links}</section></div></div><nav class="project-pagination"><a href="?project=${previous.slug}">← Previous <strong>${previous.name}</strong></a><a href="?page=projects">All projects</a><a href="?project=${next.slug}">Next → <strong>${next.name}</strong></a></nav>`;
  if (main) main.innerHTML = pageShell('PROJECT / CASE STUDY',p.name,content);
};
if (projectSlug) {
  const selected = projects.find(p=>p.slug===projectSlug);
  if (selected) renderDetail(selected);
  else if (main) main.innerHTML = pageShell('404 / NOT FOUND','Project not found','<p class="not-found">This project could not be found. <a href="?page=projects">Browse all projects</a>.</p>');
} else if (page === 'projects') renderProjects();

if ('IntersectionObserver' in window && !projectSlug && page !== 'projects') {
  const observer = new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.fade-up,.fade-left,.fade-right').forEach(el=>observer.observe(el));
} else {
  document.querySelectorAll('.fade-up,.fade-left,.fade-right').forEach(el=>el.classList.add('is-visible'));
}
