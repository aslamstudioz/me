(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = document.querySelector('#motion-toggle');
  let paused = reduced.matches;
  try { paused = paused || localStorage.getItem('aslam-motion') === 'paused'; } catch {}
  function setMotion() { document.documentElement.classList.toggle('motion-paused', paused); motionButton.textContent = paused ? 'Resume motion' : 'Pause motion'; motionButton.setAttribute('aria-pressed', String(paused)); }
  setMotion();
  motionButton.addEventListener('click', () => { paused = !paused; setMotion(); try { localStorage.setItem('aslam-motion', paused ? 'paused' : 'playing'); } catch {} });
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold: 0.08}) : null;
  function watch() { document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer ? observer.observe(el) : el.classList.add('visible')); }
  const socialData = [
    ['Instagram','https://www.instagram.com/aslamstudioz/','<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="18" cy="6" r="1"/>'],
    ['Facebook','https://web.facebook.com/aslamstudioz/','<path d="M14 22v-9h3l.5-4H14V7c0-1 .3-2 2-2h2V1.5C17 1.2 16 1 15 1c-3 0-5 2-5 5v3H7v4h3v9z"/>'],
    ['Pinterest','https://www.pinterest.com/aslamstudioz/','<path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-1.6 0-3 .4-4.5l1.3-5.4s-.3-.7-.3-1.7c0-1.6.9-2.8 2-2.8 1 0 1.4.7 1.4 1.6 0 1-.7 2.5-1 3.9-.3 1.2.6 2.1 1.8 2.1 2.1 0 3.6-2.7 3.6-5.8 0-2.4-1.6-4.2-4.6-4.2-3.3 0-5.4 2.4-5.4 5.1 0 .9.3 1.6.8 2.1.2.3.3.4.2.7l-.3 1c-.1.4-.4.5-.8.3-2-1-2.9-3-2.9-5.2C4.6 4.8 8 2 12 2zm0 0a10 10 0 0 1 0 20c-.9 0-1.8-.1-2.6-.3.7-1 1.3-2.3 1.7-3.6l.6-2.4c.7 1 1.9 1.6 3.2 1.6 4.2 0 7-3.8 7-8.8A10 10 0 0 0 12 2z"/>'],
    ['YouTube','https://www.youtube.com/@AslamStudioz','<path d="M22 7s-.2-2-1-2.8C20 3.3 18 3.3 12 3.3S4 3.3 3 4.2C2.2 5 2 7 2 7s-.3 2.3-.3 4.7S2 16.5 2 16.5s.2 2 1 2.8c1 .9 3 .9 9 .9s8 0 9-.9c.8-.8 1-2.8 1-2.8s.3-2.4.3-4.8S22 7 22 7zM10 15.6V7.8l6.6 3.9z"/>']
  ];
  document.querySelectorAll('[data-socials]').forEach(container => socialData.forEach(([label,url,svg]) => {const a=document.createElement('a'); a.href=url;a.target='_blank';a.rel='noopener';a.setAttribute('aria-label',label);a.title=label;a.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+svg+'</svg>';container.append(a);}));
  const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#nav');
  function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
  menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
  nav.addEventListener('click', e=>{if(e.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  const sectionObserver='IntersectionObserver' in window ? new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>{const active=a.hash==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -65% 0px'}) : null;
  document.querySelectorAll('main section[id]').forEach(s=>sectionObserver?.observe(s));
  const particles=document.querySelector('.particles');
  for(let n=0;n<16;n++){const dot=document.createElement('i');dot.style.setProperty('--x',(8+(n*37)%86)+'%');dot.style.setProperty('--y',(7+(n*23)%80)+'%');dot.style.setProperty('--delay',(-n*.7)+'s');particles.append(dot);}
  (window.SKILLS||[]).forEach(s=>{const level=Math.max(0,Math.min(100,Number(s.level)||0));const item=document.createElement('div');item.className='skill reveal';const head=document.createElement('div');head.className='skill-header';const icon=document.createElement('b');icon.className='skill-icon '+s.style;if(s.image){const logo=document.createElement('img');logo.src=s.image;logo.alt='';icon.append(logo);}else{icon.textContent=s.icon;}const label=document.createElement('span');label.textContent=s.name;const value=document.createElement('strong');value.textContent=level+'%';head.append(icon,label,value);const track=document.createElement('div');track.className='track';track.setAttribute('aria-hidden','true');const fill=document.createElement('span');fill.style.setProperty('--level',level+'%');track.append(fill);item.append(head,track);document.querySelector('#skill-list').append(item);});
  const works=Array.isArray(window.PORTFOLIO)?window.PORTFOLIO:[],gallery=document.querySelector('#gallery'),filters=document.querySelector('#filters');
  let visibleWorks=works.slice(),current=0,opener=null;
  const dialog=document.querySelector('#lightbox'),large=document.querySelector('#large-photo'),caption=document.querySelector('#photo-caption');
  function showPhoto(index){if(!visibleWorks.length)return;current=(index+visibleWorks.length)%visibleWorks.length;const work=visibleWorks[current];large.src=work.image;large.alt=work.alt||work.title;caption.textContent=work.title+' · '+(current+1)+' / '+visibleWorks.length;}
  function openPhoto(index,button){opener=button;showPhoto(index);dialog.showModal();document.body.classList.add('viewer-open');}
  function render(category){if(observer)gallery.querySelectorAll('.reveal').forEach(el=>observer.unobserve(el));gallery.replaceChildren();visibleWorks=category==='All'?works.slice():works.filter(w=>w.category===category);visibleWorks.forEach((w,index)=>{const figure=document.createElement('figure');figure.className='work reveal'+(w.wide?' wide':'');const button=document.createElement('button');button.className='photo-button';button.setAttribute('aria-label','View '+w.title);const img=document.createElement('img');img.src=w.image;img.alt=w.alt||w.title;img.loading='lazy';img.decoding='async';button.append(img);button.addEventListener('click',()=>openPhoto(index,button));const fc=document.createElement('figcaption'),text=document.createElement('div'),title=document.createElement('h3'),categoryLabel=document.createElement('p'),num=document.createElement('span');title.textContent=w.title;categoryLabel.textContent=w.category;num.textContent=String(index+1).padStart(2,'0');text.append(title,categoryLabel);fc.append(text,num);figure.append(button,fc);gallery.append(figure);});watch();}
  ['All',...new Set(works.map(w=>w.category))].forEach(category=>{const button=document.createElement('button');button.textContent=category;button.setAttribute('aria-pressed',String(category==='All'));button.addEventListener('click',()=>{filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render(category);});filters.append(button);});
  dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.querySelector('.previous').addEventListener('click',()=>showPhoto(current-1));dialog.querySelector('.next').addEventListener('click',()=>showPhoto(current+1));dialog.addEventListener('close',()=>{document.body.classList.remove('viewer-open');opener?.focus();});dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(current+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(current-1);}});
  let startX=0;large.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;},{passive:true});large.addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-startX;if(Math.abs(delta)>55)showPhoto(current+(delta<0?1:-1));},{passive:true});
  document.querySelector('#year').textContent=new Date().getFullYear();render('All');watch();
})();

// Pointer depth affects the background only; the photograph stays still.
(() => {
 const stage=document.querySelector('.neural-stage');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 stage.addEventListener('pointermove',e=>{
  if(e.pointerType!=='mouse'||reduced.matches||document.documentElement.classList.contains('motion-paused'))return;
  const r=stage.getBoundingClientRect();
  stage.style.setProperty('--neural-x',((e.clientX-r.left)/r.width-.5)*8+'px');
  stage.style.setProperty('--neural-y',((e.clientY-r.top)/r.height-.5)*8+'px');
 });
 stage.addEventListener('pointerleave',()=>{stage.style.setProperty('--neural-x','0px');stage.style.setProperty('--neural-y','0px');});
})();
