import './style.css';
import Lenis from 'lenis';
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const bottomNav=document.getElementById('bottomNav');
const navLinks=[...document.querySelectorAll('[data-nav-link]')];
const sections=['home','about','portfolio','contact'].map(id=>document.getElementById(id)).filter(Boolean);
const updateNavigation=()=>{
 const y=window.scrollY;
 bottomNav?.classList.toggle('is-visible',y>180);
 let current='home';
 sections.forEach(section=>{if(section.getBoundingClientRect().top<=window.innerHeight*.42)current=section.id;});
 navLinks.forEach(link=>{const active=link.getAttribute('href')==='#'+current;link.classList.toggle('is-active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
};
updateNavigation();window.addEventListener('scroll',updateNavigation,{passive:true});
if(!reducedMotion){const lenis=new Lenis({duration:1.05,smoothWheel:true});const raf=time=>{lenis.raf(time);requestAnimationFrame(raf);};requestAnimationFrame(raf);}
document.querySelectorAll('.portfolio-tab').forEach(tab=>tab.addEventListener('click',()=>{
 document.querySelectorAll('.portfolio-tab').forEach(item=>{const active=item===tab;item.classList.toggle('is-active',active);item.setAttribute('aria-selected',String(active));});
 document.querySelectorAll('.portfolio-panel').forEach(panel=>{const active=panel.id===tab.dataset.panel;panel.hidden=!active;panel.classList.toggle('is-active',active);});
}));
if('IntersectionObserver'in window){const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}}),{threshold:.1});document.querySelectorAll('.fade-up,.fade-left,.fade-right').forEach(el=>observer.observe(el));}else{document.querySelectorAll('.fade-up,.fade-left,.fade-right').forEach(el=>el.classList.add('is-visible'));}
const form=document.getElementById('contactForm');
form?.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);const name=String(data.get('name')||'').trim();const email=String(data.get('email')||'').trim();const message=String(data.get('message')||'').trim();const text=`Halo Hafidz, saya ${name} (${email}).\\n\\n${message}`;window.open(`https://wa.me/6285891263024?text=${encodeURIComponent(text)}`,'_blank','noopener,noreferrer');});
