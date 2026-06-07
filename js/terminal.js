// ── TERMINAL RESIZE & DRAG
(function() {
  const wrap = document.getElementById('terminal-wrap');
  const resizeHandle = document.getElementById('termResize');
  const titlebar = wrap.querySelector('.term-titlebar');

  // RESIZE
  let isResizing = false, startX, startY, startW, startH;
  resizeHandle.addEventListener('mousedown', e => {
    isResizing = true;
    startX = e.clientX; startY = e.clientY;
    startW = wrap.offsetWidth; startH = wrap.offsetHeight;
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!isResizing) return;
    const newW = Math.max(380, startW + (e.clientX - startX));
    const newH = Math.max(300, startH + (e.clientY - startY));
    wrap.style.width = newW + 'px';
    // resize only the output area height
    const out = document.getElementById('termOutput');
    out.style.maxHeight = Math.max(160, newH - 120) + 'px';
    out.style.minHeight = Math.max(160, newH - 120) + 'px';
  });
  document.addEventListener('mouseup', () => {
    if (isResizing) { isResizing = false; document.body.style.userSelect = ''; }
  });

  // DRAG (move) from titlebar
  let isDragging = false, dragStartX, dragStartY, origLeft, origTop;
  titlebar.addEventListener('mousedown', e => {
    if (e.target.classList.contains('tdot')) return;
    isDragging = true;
    const rect = wrap.getBoundingClientRect();
    dragStartX = e.clientX; dragStartY = e.clientY;
    origLeft = rect.left; origTop = rect.top;
    wrap.style.position = 'fixed';
    wrap.style.left = origLeft + 'px';
    wrap.style.top = origTop + 'px';
    wrap.style.zIndex = '600';
    wrap.style.margin = '0';
    wrap.style.maxWidth = 'none';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    wrap.style.left = (origLeft + e.clientX - dragStartX) + 'px';
    wrap.style.top  = (origTop  + e.clientY - dragStartY) + 'px';
  });
  document.addEventListener('mouseup', () => {
    if (isDragging) { isDragging = false; document.body.style.userSelect = ''; }
  });
})();

const termCmds = {
  help: () => `<div class="term-block">
<span class="tc-amber" style="font-weight:600">Comandi disponibili:</span><br><br>
<span class="tc-green">whoami</span>      <span class="tc-gray">→</span> <span class="tc-text">chi sono</span><br>
<span class="tc-green">skills</span>      <span class="tc-gray">→</span> <span class="tc-text">stack tecnico</span><br>
<span class="tc-green">experience</span>  <span class="tc-gray">→</span> <span class="tc-text">percorso lavorativo</span><br>
<span class="tc-green">projects</span>    <span class="tc-gray">→</span> <span class="tc-text">progetti personali</span><br>
<span class="tc-green">education</span>   <span class="tc-gray">→</span> <span class="tc-text">formazione</span><br>
<span class="tc-green">contact</span>     <span class="tc-gray">→</span> <span class="tc-text">come contattarmi</span><br>
<span class="tc-green">fun</span>         <span class="tc-gray">→</span> <span class="tc-text">fatto random su di me</span><br>
<span class="tc-green">map</span>         <span class="tc-gray">→</span> <span class="tc-text">il mio percorso geografico</span><br>
<span class="tc-green">clear</span>       <span class="tc-gray">→</span> <span class="tc-text">pulisci il terminale</span><br>
<span class="tc-dim">ls · sudo · hack · coffee · matrix → 🥚</span>
</div>`,

  whoami: () => `<div class="term-block">
<span class="tc-amber" style="font-weight:600">Alessandro Stapane</span><br><br>
<span class="tc-blue">Ruolo   </span> <span class="tc-text">Full Stack Developer @ CABEL</span><br>
<span class="tc-blue">Età     </span> <span class="tc-text">24 anni</span><br>
<span class="tc-blue">Base    </span> <span class="tc-text">Empoli, Toscana 🇮🇹</span><br>
<span class="tc-blue">Origine </span> <span class="tc-text">Galatone, Puglia 🌊</span><br>
<span class="tc-blue">LinkedIn</span> <span class="tc-purple">linkedin.com/in/alessandrostapane</span><br>
<span class="tc-blue">GitHub  </span> <span class="tc-purple">github.com/Alw12</span>
</div>`,

  skills: () => `<div class="term-block">
<span class="tc-amber" style="font-weight:600">Stack tecnico:</span><br><br>
<span class="tc-purple">Backend  </span> <span class="tc-text">Java EE · JEE · Spring Boot · Multithreading</span><br>
<span class="tc-purple">Frontend </span> <span class="tc-text">AngularJS · JavaScript · HTML5 · CSS3 · Bootstrap</span><br>
<span class="tc-purple">Microsoft</span> <span class="tc-text">C# · ASP.NET · .NET · Visual Basic</span><br>
<span class="tc-purple">Database </span> <span class="tc-text">DB2 · MySQL · SQL Server · Oracle DB</span><br>
<span class="tc-purple">DevOps   </span> <span class="tc-text">Docker · Jenkins · GitLab CI · Linux</span><br>
<span class="tc-purple">Security </span> <span class="tc-text">Cisco CyberSec · Network Design · IoT</span>
</div>`,

  experience: () => `<div class="term-block">
<span class="tc-amber" style="font-weight:600">Percorso professionale:</span><br><br>
<span class="tc-green">●</span> <span class="tc-yellow">dic 2024 → oggi     </span> <span class="tc-text">Full Stack Developer @ CABEL</span><br>
<span class="tc-yellow">●</span> <span class="tc-yellow">mag – nov 2024      </span> <span class="tc-text">Junior FSD @ CABEL</span><br>
<span class="tc-yellow">●</span> <span class="tc-yellow">mag 2022 – nov 2023 </span> <span class="tc-text">Junior FSD @ SEI Consulting</span><br>
<span class="tc-gray">●</span> <span class="tc-gray">nov 2021 – mag 2022 </span> <span class="tc-text">Stage @ SEI Consulting</span>
</div>`,

  projects: () => `<div class="term-block">
<span class="tc-amber" style="font-weight:600">Progetti personali:</span><br><br>
<span class="tc-purple">01</span> <span class="tc-green">PAC Portfolio Tracker</span>  <span class="tc-gray">Java · Swing · Yahoo Finance · CoinGecko</span><br>
<span class="tc-purple">02</span> <span class="tc-green">Jenkins Builder GUI  </span>  <span class="tc-gray">C# · .NET 8 · Python · Jenkins API</span>
</div>`,

  education: () => `<div class="term-block">
<span class="tc-amber" style="font-weight:600">Formazione:</span><br><br>
🎓 <span class="tc-green">I.I.S.S ENRICO MEDI — Galatone</span><br>
&nbsp;&nbsp; <span class="tc-text">Diploma Scienze e Tecnologie Informatiche</span><br>
&nbsp;&nbsp; <span class="tc-gray">2016 → 2021</span>  Votazione: <span class="tc-green" style="font-weight:600">78/100</span><br><br>
📜 <span class="tc-yellow">Cisco CyberSecurity</span> · <span class="tc-yellow">NDG Linux</span> · <span class="tc-yellow">Google Analytics</span><br>
&nbsp;&nbsp; <span class="tc-yellow">INVALSI English B2</span> · <span class="tc-yellow">Get Connected (Cisco)</span>
</div>`,

  contact: () => `<div class="term-block">
<span class="tc-amber" style="font-weight:600">Contatti:</span><br><br>
📧 <span class="tc-purple">stapanealessandro@gmail.com</span><br>
💼 <span class="tc-purple">linkedin.com/in/alessandrostapane</span><br>
🐙 <span class="tc-purple">github.com/Alw12</span><br>
📍 <span class="tc-green">Disponibile:</span> <span class="tc-text">Lecce (sede) · Ibrido · Remoto</span>
</div>`,

  fun: () => {
    const facts = [
      `<div class="term-block">🌊 Cresciuto a <span class="tc-amber">Galatone</span>, Salento — 15 minuti dal mare.</div>`,
      `<div class="term-block">🏃 Sto imparando a correre seguendo il piano beginner di <span class="tc-amber">Nike Run Club</span>.</div>`,
      `<div class="term-block">🍎 Uso <span class="tc-amber">iPhone + Apple Watch SE</span> e ci tengo al mio ecosistema.</div>`,
      `<div class="term-block">🧠 Ho un vault <span class="tc-amber">Obsidian</span> chiamato <span class="tc-green">"CervelloAle"</span> per la mia PKM.</div>`,
      `<div class="term-block">☕ Programmo quasi tutto in <span class="tc-amber">Java</span> — anche i sogni li compilo con Maven.</div>`,
      `<div class="term-block">📊 Ho costruito un <span class="tc-amber">tracker di portafoglio</span> invece di usare Google Sheets come gli altri.</div>`,
      `<div class="term-block">🌍 Ho lasciato la Puglia per la Toscana — <span class="tc-amber">Empoli</span> è casa adesso.</div>`,
    ];
    return facts[Math.floor(Math.random()*facts.length)];
  },

  map: () => `<div class="term-block">
<span class="tc-amber" style="font-weight:600">Il mio percorso:</span><br><br>
<span class="tc-gray">2001</span> 📍 <span class="tc-green">Galatone, Puglia      </span> <span class="tc-gray">→ nato qui 🌊</span><br>
<span class="tc-gray">2016</span> 🎓 <span class="tc-green">IISS E.Medi, Galatone </span> <span class="tc-gray">→ diploma informatica</span><br>
<span class="tc-gray">2021</span> 💼 <span class="tc-green">SEI Consulting        </span> <span class="tc-gray">→ primo lavoro</span><br>
<span class="tc-gray">2024</span> 🚀 <span class="tc-green">CABEL, Empoli         </span> <span class="tc-gray">→ banking enterprise</span><br>
<span class="tc-gray">????</span> 🔮 <span class="tc-amber">...                   </span> <span class="tc-gray">→ prossimo capitolo</span><br><br>
<span class="tc-amber">Galatone → Gallipoli → Empoli → ?</span>
</div>`,

  pac: () => null,

  sudo: () => `<div class="term-block"><span class="tc-red">Accesso negato.</span> <span class="tc-gray">Non sei root qui. 😄</span></div>`,

  hack: () => {
    setTimeout(()=>{
      const out = document.getElementById('termOutput');
      const lines = ['Inizializzazione sequenza...','Connessione a mainframe...','Bypassando firewall...','Accesso root ottenuto...','...','...scherzo 😄 sei nel portfolio di Alessandro, non in Mr. Robot.'];
      lines.forEach((l,i) => setTimeout(()=>{
        const d=document.createElement('div');d.className='term-cmd-line term-line-anim';
        d.innerHTML=`<span class="tc-${i<4?'red':i===5?'amber':'gray'}">${l}</span>`;
        out.appendChild(d);out.scrollTop=out.scrollHeight;
      },i*300));
    },100);
    return null;
  },

  coffee: () => `<div class="term-block">
<span class="tc-amber">Preparazione caffè...</span><br><br>
<span class="tc-gray">    ( (</span><br>
<span class="tc-gray">     ) )</span><br>
<span class="tc-amber">  .______.</span><br>
<span class="tc-amber">  |      |]</span><br>
<span class="tc-amber">  \\      /</span><br>
<span class="tc-amber">   '----'</span><br><br>
<span class="tc-green">☕ Caffè pronto. Ora si può programmare.</span><br><br>
<span class="tc-gray">Se ti è piaciuto il portfolio →</span> <a href="https://buymeacoffee.com/alessandrostapane" target="_blank" rel="noopener noreferrer" style="color:#f0a500;text-decoration:underline;">buymeacoffee.com/alessandrostapane</a>
</div>`,

  ls: () => `<div class="term-block">
<span class="tc-blue">drwxr-xr-x</span>  <span class="tc-green">skills/</span><br>
<span class="tc-blue">drwxr-xr-x</span>  <span class="tc-green">projects/</span><br>
<span class="tc-blue">drwxr-xr-x</span>  <span class="tc-green">experience/</span><br>
<span class="tc-blue">-rw-r--r--</span>  <span class="tc-text">README.md</span><br>
<span class="tc-blue">-rw-r--r--</span>  <span class="tc-text">cv_alessandro_stapane.pdf</span><br>
<span class="tc-blue">-rwxr-xr-x</span>  <span class="tc-amber">passion.java</span> <span class="tc-gray">← sempre in esecuzione</span>
</div>`,

  matrix: () => {
    const wrap = document.getElementById('terminal-wrap');
    wrap.style.transition='all .3s';
    wrap.style.filter='hue-rotate(90deg) saturate(2)';
    setTimeout(()=>wrap.style.filter='',2000);
    return `<div class="term-block"><span class="tc-green">Wake up, Neo... Il Matrix ha te. 💊</span><br><span class="tc-gray">(effetto di 2s)</span></div>`;
  },

  clear: () => { document.getElementById('termOutput').innerHTML = ''; return null; }
};

const termHistory = [];
let histIdx = -1;

function termPrint(html) {
  const out = document.getElementById('termOutput');
  const div = document.createElement('div');
  div.className = 'term-cmd-line';
  div.style.whiteSpace = 'normal';
  div.innerHTML = html;
  out.appendChild(div);
  out.scrollTop = out.scrollHeight;
}

function termRun(cmd) {
  const c = cmd.trim().toLowerCase();
  if(!c) return;
  termHistory.unshift(c); histIdx = -1;
  termPrint(`<span class="tc-purple">alex</span><span class="tc-gray">@</span><span class="tc-blue">portfolio</span><span class="tc-gray">:</span><span class="tc-green">~</span><span class="tc-text">$</span> <span class="tc-text">${cmd}</span>`);
  if(termCmds[c]) {
    const out = termCmds[c]();
    if(out !== null) termPrint(out);
  } else {
    termPrint(`<span class="tc-red">comando non trovato: ${c}</span> — digita <span class="tc-amber">help</span>`);
  }
}

const termInput = document.getElementById('termInput');
termInput.addEventListener('keydown', e => {
  if(e.key==='Enter'){termRun(termInput.value);termInput.value='';}
  if(e.key==='ArrowUp'){histIdx=Math.min(histIdx+1,termHistory.length-1);termInput.value=termHistory[histIdx]||'';e.preventDefault();}
  if(e.key==='ArrowDown'){histIdx=Math.max(histIdx-1,-1);termInput.value=histIdx>=0?termHistory[histIdx]:'';e.preventDefault();}
});
document.getElementById('terminal-wrap').addEventListener('click',()=>termInput.focus());

setTimeout(()=>{
  const bootLines = [
    `<div style="font-family:'Fira Code',monospace;font-size:10px;line-height:1.3;color:#f0a500;font-weight:500;margin-bottom:.3rem;">  █████╗ ███████╗    ██████╗ ███████╗██╗   ██╗<br>  ██╔══██╗██╔════╝    ██╔══██╗██╔════╝██║   ██║<br>  ███████║███████╗    ██║  ██║█████╗  ██║   ██║<br>  ██╔══██║╚════██║    ██║  ██║██╔══╝  ╚██╗ ██╔╝<br>  ██║  ██║███████║    ██████╔╝███████╗ ╚████╔╝<br>  ╚═╝  ╚═╝╚══════╝    ╚═════╝ ╚══════╝  ╚═══╝</div>`,
    `<span class="tc-gray">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>`,
    `<span class="tc-amber" style="font-weight:600;">Alessandro Stapane</span>  <span class="tc-dim">·</span>  <span class="tc-blue">Full Stack Developer</span>  <span class="tc-dim">·</span>  <span class="tc-purple">CABEL</span>`,
    `<span class="tc-green">● disponibile</span>  <span class="tc-dim">·</span>  <span class="tc-gray">📍 Empoli, Toscana  ·  github.com/Alw12</span>`,
    `<span class="tc-gray">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>`,
    `Digita <span class="tc-amber" style="font-weight:600;">help</span> per esplorare. <span class="tc-gray">Usa ↑↓ per la cronologia dei comandi.</span>`,
  ];
  const out = document.getElementById('termOutput');
  bootLines.forEach((html, i) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = 'term-cmd-line term-line-anim';
      div.innerHTML = html;
      out.appendChild(div);
      out.scrollTop = out.scrollHeight;
    }, i * 160);
  });
}, 400);
