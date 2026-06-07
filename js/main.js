// Splash boot sequence
(function(){
  const bootMessages = [
    { icon:'sbl-ok', label:'OK', text:'Sistema avviato — ', hi:'Portfolio OS v2.0' },
    { icon:'sbl-ok', label:'OK', text:'Caricamento skills — ', hi:'Java EE · AngularJS · C# · Docker' },
    { icon:'sbl-ok', label:'OK', text:'Caricamento esperienza — ', hi:'CABEL · SEI Consulting' },
    { icon:'sbl-ok', label:'OK', text:'Caricamento progetti — ', hi:'PAC Tracker · Jenkins Builder GUI' },
    { icon:'sbl-warn', label:'~~', text:'Passione per il codice — ', hi:'∞ / ∞' },
    { icon:'sbl-ok', label:'OK', text:'Terminale interattivo — ', hi:'pronto' },
  ];
  const container = document.getElementById('splashBoot');
  const bar = document.getElementById('splashBar');
  const pct = document.getElementById('splashPct');
  const total = bootMessages.length;

  bootMessages.forEach((msg, i) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = 'splash-boot-line';
      div.innerHTML = `<span class="${msg.icon}">[${msg.label}]</span><span class="sbl-text">${msg.text}</span><span class="sbl-highlight">${msg.hi}</span>`;
      container.appendChild(div);
      requestAnimationFrame(() => div.classList.add('show'));
      const p = Math.round(((i+1)/total)*100);
      bar.style.width = p + '%';
      pct.textContent = p + '%';
      if(p === 100) pct.style.color = '#a6e3a1';
    }, 150 + i * 300);
  });

  const BOOT_MS = 1800;
  const splashEl = document.getElementById('splash');
  function hideSplash() {
    if(splashEl) splashEl.classList.add('hidden');
    setTimeout(startTypewriter, 200);
  }
  const splashFailsafe = setTimeout(hideSplash, 2500);
  window.addEventListener('load', () => {
    const remaining = Math.max(0, BOOT_MS - performance.now());
    clearTimeout(splashFailsafe);
    setTimeout(hideSplash, remaining);
  });
})();

// Footer year
const fyEl = document.getElementById('footer-year');
if(fyEl) fyEl.textContent = new Date().getFullYear();

// Scroll progress
window.addEventListener('scroll',()=>{
  const pct = window.scrollY/(document.body.scrollHeight-window.innerHeight)*100;
  document.getElementById('scrollBar').style.width = pct+'%';

  // Progress ring on back-to-top
  const ring = document.getElementById('scrollRing');
  if(ring) ring.style.strokeDashoffset = 132 - (132 * pct / 100);

  // Navbar scroll effect
  document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 60);

  // Back to top
  const btn = document.getElementById('backToTop');
  btn.classList.toggle('visible', window.scrollY > 400);

  // Scroll spy — navbar + side dots
  const sections = ['hero','about','skills','projects','experience','certifications','terminal-section','contact'];
  let current = 'hero';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if(el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  document.querySelectorAll('.nav-link[href^="#"]').forEach(l => {
    const isActive = l.getAttribute('href') === '#'+current;
    l.classList.toggle('active-section', isActive);
    if(isActive) l.setAttribute('aria-current','location');
    else l.removeAttribute('aria-current');
  });
  document.querySelectorAll('.side-dot').forEach(d => {
    d.classList.toggle('active', d.getAttribute('data-target') === current);
  });
});

// Side dots click + keyboard
document.querySelectorAll('.side-dot').forEach(d => {
  const go = () => { const el = document.getElementById(d.getAttribute('data-target')); if(el) el.scrollIntoView({behavior:'smooth'}); };
  d.addEventListener('click', go);
  d.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();go();} });
});



// Cursor
const cur=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
let cx=0,cy=0,rx=0,ry=0;
window.addEventListener('mousemove',e=>{cx=e.clientX;cy=e.clientY;cur.style.left=cx+'px';cur.style.top=cy+'px';});
function lerpC(){rx+=(cx-rx)*.12;ry+=(cy-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(lerpC);}
lerpC();

// Particles
const pc=document.getElementById('particleCanvas'),px=pc.getContext('2d');
let pts=[];
function rPC(){pc.width=pc.offsetWidth;pc.height=pc.offsetHeight;}
rPC();window.addEventListener('resize',rPC);
class Pt{constructor(){this.reset();}reset(){this.x=Math.random()*pc.width;this.y=Math.random()*pc.height;this.size=Math.random()*1.4+0.3;this.vx=(Math.random()-.5)*.4;this.vy=(Math.random()-.5)*.4;this.o=Math.random()*.45+.1;}update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>pc.width||this.y<0||this.y>pc.height)this.reset();}draw(){px.beginPath();px.arc(this.x,this.y,this.size,0,Math.PI*2);px.fillStyle=`rgba(240,165,0,${this.o})`;px.fill();}}
for(let i=0;i<80;i++)pts.push(new Pt());
function aPts(){px.clearRect(0,0,pc.width,pc.height);pts.forEach(p=>{p.update();p.draw();});for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);if(d<90){px.beginPath();px.moveTo(pts[i].x,pts[i].y);px.lineTo(pts[j].x,pts[j].y);px.strokeStyle=`rgba(240,165,0,${.07*(1-d/90)})`;px.stroke();}}requestAnimationFrame(aPts);}
aPts();

// Mac dots
function macClose(){const c=document.getElementById('codeCard');c.classList.add('closed');setTimeout(()=>{c.innerHTML='<div class="code-dots"><span class="d1" onclick="location.reload()" title="Riapri">✕</span><span class="d2" style="opacity:.4">−</span><span class="d3" style="opacity:.4">+</span></div><div style="color:var(--text-dim);font-size:11px;">// finestra chiusa — clicca 🔴 per ricaricare</div>';c.classList.remove('closed');},300);}
let min=false;function macMinimize(){const c=document.getElementById('codeCard');min=!min;c.classList.toggle('minimized',min);}
let max=false;function macMaximize(){const c=document.getElementById('codeCard');max=!max;c.classList.toggle('maximized',max);if(max)c.onclick=e=>{if(e.target===c)macMaximize();};}

// Ripple
document.querySelectorAll('.btn-amber,.btn-outline-amber').forEach(b=>{b.addEventListener('click',function(e){const r=document.createElement('span');r.classList.add('ripple');const rect=this.getBoundingClientRect(),s=Math.max(rect.width,rect.height);r.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-rect.left-s/2}px;top:${e.clientY-rect.top-s/2}px`;this.appendChild(r);setTimeout(()=>r.remove(),600);});});

// Magnetic
document.querySelectorAll('.magnetic-wrap').forEach(w=>{const b=w.querySelector('.btn');w.addEventListener('mousemove',e=>{const r=w.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.3}px,${(e.clientY-r.top-r.height/2)*.3}px)`;});w.addEventListener('mouseleave',()=>{b.style.transform='translate(0,0)';b.style.transition='transform .4s ease';});w.addEventListener('mouseenter',()=>{b.style.transition='transform .1s ease';});});

// 3D Tilt
document.querySelectorAll('.skill-card').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(600px) rotateY(${x*12}deg) rotateX(${-y*12}deg) translateZ(8px)`;});c.addEventListener('mouseleave',()=>{c.style.transform='perspective(600px) rotateY(0) rotateX(0) translateZ(0)';c.style.transition='transform .5s ease';});c.addEventListener('mouseenter',()=>{c.style.transition='transform .1s ease';});});

// Reveal
const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible');}),{threshold:.08,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach(e=>obs.observe(e));

// Skills stagger
const sObs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('skills-visible');sObs.unobserve(x.target);}}),{threshold:.1});
document.querySelectorAll('.row.g-0').forEach(e=>{if(e.querySelector('.skill-card'))sObs.observe(e);});

// Progress bars
const pObs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.querySelectorAll('.progress-bar[data-width]').forEach(b=>{const v=b.getAttribute('data-width');b.style.width=v+'%';b.setAttribute('aria-valuenow',v);});pObs.unobserve(x.target);}}),{threshold:.2});
document.querySelectorAll('.row.g-0').forEach(e=>pObs.observe(e));

// Project stagger
const prObs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('projects-visible');prObs.unobserve(x.target);}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(e=>{if(e.querySelector('.project-row'))prObs.observe(e);});

// Counter
function counter(el,target,suffix=''){let s=0;const inc=target/(1200/16);const t=setInterval(()=>{s+=inc;if(s>=target){el.textContent=(target===Infinity?'∞':target)+suffix;clearInterval(t);}else el.textContent=Math.floor(s)+suffix;},16);}
const cObs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){const ns=x.target.querySelectorAll('.stat-num');if(ns[0])counter(ns[0],3,'+');if(ns[1])counter(ns[1],2,'');if(ns[2])counter(ns[2],20,'+');cObs.unobserve(x.target);}}),{threshold:.5});
document.querySelectorAll('.row:has(.stat-num)').forEach(e=>cObs.observe(e));

// Timeline draw
const tlObs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.parentElement.classList.add('timeline-visible');tlObs.unobserve(x.target);}}),{threshold:.1});
document.querySelectorAll('.timeline').forEach(e=>tlObs.observe(e));

// Scramble
const sc='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&';
function scramble(el){const o=el.innerText;let f=0;const t=setInterval(()=>{el.innerText=o.split('').map((c,i)=>{if(c===' '||c==='\n')return c;if(i<(f/22)*o.length)return c;return sc[Math.floor(Math.random()*sc.length)];}).join('');if(++f>22){el.innerText=o;clearInterval(t);}},40);}
const scObs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){scramble(x.target);scObs.unobserve(x.target);}}),{threshold:.5});
document.querySelectorAll('.section-title').forEach(e=>scObs.observe(e));

// Typewriter — chiamato da hideSplash() dopo la scomparsa dello splash
function startTypewriter() {
  const t = document.getElementById('typeTarget');
  if(!t) return;
  const o = t.textContent;
  t.textContent = '';
  let i = 0;
  const ti = setInterval(() => { t.textContent += o[i++]; if(i >= o.length) clearInterval(ti); }, 90);
}


// EmailJS — configura su emailjs.com (gratuito)
// 1. Crea account su emailjs.com
// 2. Aggiungi un Email Service (Gmail consigliato)
// 3. Crea un Template con variabili: {{from_name}}, {{from_email}}, {{message}}
// 4. Sostituisci i 3 valori qui sotto
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
if(window.emailjs) emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

async function handleSend() {
  const btn = document.getElementById('send-btn');
  const name    = document.getElementById('cf_name').value.trim();
  const email   = document.getElementById('cf_email').value.trim();
  const message = document.getElementById('cf_message').value.trim();
  if(!name || !email || !message) {
    const errEl = document.getElementById('form-error');
    if(errEl) errEl.textContent = 'Compila tutti i campi obbligatori: Nome, Email e Messaggio.';
    btn.textContent = '⚠ Compila tutti i campi'; btn.style.background='#f38ba8';
    setTimeout(()=>{ btn.innerHTML=T[lang]['cf.send']; btn.style.background=''; if(errEl)errEl.textContent=''; },2500);
    return;
  }
  const privacy = document.getElementById('cf_privacy');
  if(!privacy || !privacy.checked) {
    const errEl = document.getElementById('form-error');
    if(errEl) errEl.textContent = 'Accetta la privacy policy per procedere.';
    btn.textContent = '⚠ Accetta la privacy policy'; btn.style.background='#f38ba8';
    setTimeout(()=>{ btn.innerHTML=T[lang]['cf.send']; btn.style.background=''; if(errEl)errEl.textContent=''; },2500);
    return;
  }
  btn.textContent = '⏳ Invio...'; btn.disabled = true;
  try {
    if(window.emailjs && EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { from_name:name, from_email:email, message });
    }
    document.getElementById('cf_name').value='';
    document.getElementById('cf_email').value='';
    document.getElementById('cf_message').value='';
    document.getElementById('form-success').style.display='block';
    setTimeout(()=>document.getElementById('form-success').style.display='none',5000);
    const t=T[lang];
    document.getElementById('toast-title').textContent=t['toast.title'];
    document.getElementById('toast-body').textContent=t['toast.body'];
    bootstrap.Toast.getOrCreateInstance(document.getElementById('contactToast')).show();
  } catch(err) {
    btn.textContent='✗ Errore — riprova'; btn.style.background='#f38ba8';
  } finally {
    setTimeout(()=>{ btn.innerHTML=T[lang]['cf.send']; btn.style.background=''; btn.disabled=false; },3000);
  }
}

// Nav click ripple feedback
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    const r = document.createElement('span');
    r.className = 'nav-ripple';
    this.appendChild(r);
    setTimeout(() => r.remove(), 400);
  });
});

// Accordion arrow color fix
document.querySelectorAll('.accordion-button').forEach(btn => {
  btn.style.setProperty('--bs-accordion-btn-icon', 'none');
  btn.addEventListener('click', function() {
    const isOpen = !this.classList.contains('collapsed');
    this.style.color = isOpen ? 'var(--amber)' : '#e8e6de';
    this.style.background = isOpen ? 'var(--bg3)' : 'var(--bg2)';
  });
});
// Phone reveal
function revealPhone(el) {
  const display = document.getElementById('phone-display');
  const arrow = document.getElementById('phone-arrow');
  display.innerHTML = '📱 &nbsp; <a href="tel:+393338887689" style="color:var(--amber);text-decoration:none;">+39 333 888 7689</a>';
  arrow.textContent = '→';
  el.onclick = null;
}


document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    const r = document.createElement('span');
    r.classList.add('nav-ripple');
    this.appendChild(r);
    setTimeout(() => r.remove(), 400);
  });
});

function updateClock(){
  const t = new Date().toLocaleTimeString('it-IT',{timeZone:'Europe/Rome',hour:'2-digit',minute:'2-digit',second:'2-digit'});
  const el = document.getElementById('clockTime');
  if(el) el.textContent = t;
}
updateClock();
setInterval(updateClock, 1000);

// Language bars
const langObs = new IntersectionObserver(entries => entries.forEach(e=>{
  if(e.isIntersecting){ e.target.querySelectorAll('.lang-bar[data-width]').forEach(b=>{const v=b.getAttribute('data-width');b.style.width=v+'%';b.setAttribute('aria-valuenow',v);}); langObs.unobserve(e.target); }
}),{threshold:.4});
document.querySelectorAll('.lang-card').forEach(c=>langObs.observe(c));

// ================================================================
// ACCESSIBILITY WIDGET
// ================================================================
(function(){
  const KEY = 'a11y-prefs';
  const FONTS = ['normal','large','xlarge'];
  const FONT_LABEL = {normal:'normale',large:'grande',xlarge:'molto grande'};
  let prefs = {hc:false,cb:false,font:'normal'};
  let open = false;

  const $ = id => document.getElementById(id);

  function load(){
    try{ const s=localStorage.getItem(KEY); if(s) prefs={...prefs,...JSON.parse(s)}; }catch(e){}
  }
  function save(){ try{localStorage.setItem(KEY,JSON.stringify(prefs));}catch(e){} }

  function announce(msg){
    const el=$('a11y-sr'); if(!el)return;
    el.textContent=''; requestAnimationFrame(()=>{ el.textContent=msg; });
  }

  function applyHC(){
    document.documentElement.classList.toggle('a11y-high-contrast', prefs.hc);
    const btn=$('btn-hc'); if(!btn)return;
    btn.setAttribute('aria-pressed', String(prefs.hc));
    btn.setAttribute('aria-label', prefs.hc ? 'Disattiva alto contrasto' : 'Attiva alto contrasto');
  }

  function applyCB(){
    document.documentElement.classList.toggle('a11y-colorblind', prefs.cb);
    const btn=$('btn-cb'); if(!btn)return;
    btn.setAttribute('aria-pressed', String(prefs.cb));
    btn.setAttribute('aria-label', prefs.cb ? 'Disattiva modalità daltonico' : 'Attiva modalità daltonico');
  }

  function applyFont(){
    const html=document.documentElement;
    if(prefs.font==='normal') html.removeAttribute('data-a11y-font');
    else html.setAttribute('data-a11y-font', prefs.font);
    const ind=$('a11y-font-indicator');
    if(ind) ind.textContent='Testo: '+FONT_LABEL[prefs.font];
    const up=$('btn-f-up'), dn=$('btn-f-down');
    if(up){ up.disabled=prefs.font==='xlarge'; up.setAttribute('aria-disabled',String(prefs.font==='xlarge')); }
    if(dn){ dn.disabled=prefs.font==='normal';  dn.setAttribute('aria-disabled',String(prefs.font==='normal')); }
  }

  function applyAll(){ applyHC(); applyCB(); applyFont(); }

  function togglePanel(){
    open=!open;
    const panel=$('a11y-panel'), tog=$('a11y-toggle');
    if(!panel||!tog)return;
    if(open){
      panel.removeAttribute('hidden');
      tog.setAttribute('aria-expanded','true');
      tog.setAttribute('aria-label','Chiudi strumenti di accessibilità');
      const first=panel.querySelector('.a11y-btn');
      if(first) first.focus();
    } else {
      panel.setAttribute('hidden','');
      tog.setAttribute('aria-expanded','false');
      tog.setAttribute('aria-label','Apri strumenti di accessibilità');
    }
  }

  function init(){
    const tog=$('a11y-toggle');
    if(!tog)return;
    load(); applyAll();

    tog.addEventListener('click', togglePanel);

    const btnHC=$('btn-hc');
    if(btnHC) btnHC.addEventListener('click',()=>{
      prefs.hc=!prefs.hc; applyHC(); save();
      announce(prefs.hc?'Alto contrasto attivato':'Alto contrasto disattivato');
    });

    const btnCB=$('btn-cb');
    if(btnCB) btnCB.addEventListener('click',()=>{
      prefs.cb=!prefs.cb; applyCB(); save();
      announce(prefs.cb?'Modalità daltonico attivata':'Modalità daltonico disattivata');
    });

    const btnUp=$('btn-f-up');
    if(btnUp) btnUp.addEventListener('click',()=>{
      const i=FONTS.indexOf(prefs.font);
      if(i<FONTS.length-1){ prefs.font=FONTS[i+1]; applyFont(); save(); announce('Testo: '+FONT_LABEL[prefs.font]); }
    });

    const btnDn=$('btn-f-down');
    if(btnDn) btnDn.addEventListener('click',()=>{
      const i=FONTS.indexOf(prefs.font);
      if(i>0){ prefs.font=FONTS[i-1]; applyFont(); save(); announce('Testo: '+FONT_LABEL[prefs.font]); }
    });

    const btnReset=$('btn-a11y-reset');
    if(btnReset) btnReset.addEventListener('click',()=>{
      prefs={hc:false,cb:false,font:'normal'}; applyAll(); save();
      announce('Impostazioni di accessibilità ripristinate');
    });

    // Escape chiude panel
    document.addEventListener('keydown', e=>{
      if(e.key==='Escape'&&open){ togglePanel(); tog.focus(); }
    });

    // Click fuori chiude panel
    document.addEventListener('click', e=>{
      if(open&&!e.target.closest('#a11y-widget')) togglePanel();
    });

    // Focus trap nel panel
    const panel=$('a11y-panel');
    if(panel) panel.addEventListener('keydown', e=>{
      if(e.key!=='Tab')return;
      const focusable=[...panel.querySelectorAll('button:not([disabled])')];
      if(!focusable.length)return;
      const first=focusable[0], last=focusable[focusable.length-1];
      if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus(); }
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();

// Cookie consent banner
(function(){
  const KEY = 'as_cookie_consent';
  const banner = document.getElementById('cookie-banner');
  if(!banner || localStorage.getItem(KEY)) return;

  function showBanner(){
    banner.style.display = 'block';
    requestAnimationFrame(() => requestAnimationFrame(() => banner.classList.add('cookie-visible')));
  }

  function hideBanner(choice){
    banner.classList.remove('cookie-visible');
    setTimeout(() => { banner.style.display = 'none'; }, 420);
    try { localStorage.setItem(KEY, choice); } catch(e){}
  }

  const btnAccept = document.getElementById('cookie-accept');
  const btnReject = document.getElementById('cookie-reject');
  if(btnAccept) btnAccept.addEventListener('click', () => hideBanner('all'));
  if(btnReject) btnReject.addEventListener('click', () => hideBanner('necessary'));

  // Show after splash completes (1800ms) + small buffer
  setTimeout(showBanner, 2100);
})();

