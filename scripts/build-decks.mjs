// Generates self-contained HTML decks from scripts/deck-data.mjs into
// public/teach/decks/<slug>.html, and mirrors the data to deck-data.json for the PPTX build.
//
//   node scripts/build-decks.mjs

import { decks } from './deck-data.mjs';
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'teach', 'decks');
mkdirSync(outDir, { recursive: true });

// Inline a diagram SVG (by its hosted URL) so decks are fully self-contained.
function inlineSvg(url) {
  const name = url.split('/').pop();
  try {
    const svg = readFileSync(join(root, 'public', 'teach', 'diagrams', name), 'utf8');
    // Strip the XML/width/height so CSS controls sizing; keep the viewBox.
    return svg
      .replace(/<\?xml[^>]*\?>/, '')
      .replace(/<svg([^>]*?)\swidth="[^"]*"/, '<svg$1')
      .replace(/<svg([^>]*?)\sheight="[^"]*"/, '<svg$1');
  } catch {
    return `<img src="${url}" alt=""/>`;
  }
}

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function slideHTML(s, accent) {
  switch (s.type) {
    case 'title':
      return `<div class="s s-title">
        <span class="kicker">${esc(s.kicker)}</span>
        <h1>${esc(s.title)}</h1>
        <p class="sub">${esc(s.subtitle)}</p>
        <p class="foot-note">${esc(s.foot)}</p>
      </div>`;
    case 'statement':
      return `<div class="s s-statement">
        <span class="kicker">${esc(s.kicker)}</span>
        <h2 class="big">${esc(s.text)}</h2>
        <p class="sub">${esc(s.sub)}</p>
      </div>`;
    case 'bullets':
      return `<div class="s s-bullets">
        <span class="kicker">${esc(s.kicker)}</span>
        <h2>${esc(s.heading)}</h2>
        <ul>${s.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
      </div>`;
    case 'diagram':
      return `<div class="s s-diagram">
        <span class="kicker">${esc(s.kicker)}</span>
        <h2>${esc(s.heading)}</h2>
        <div class="img-wrap">${inlineSvg(s.image)}</div>
        <p class="caption">${esc(s.caption)}</p>
      </div>`;
    case 'code':
      return `<div class="s s-code">
        <span class="kicker">${esc(s.kicker)}</span>
        <h2>${esc(s.heading)}</h2>
        <pre class="cmd"><span class="prompt">$</span> ${esc(s.code)}</pre>
        <p class="sub">${esc(s.sub)}</p>
      </div>`;
    case 'commands':
      return `<div class="s s-commands">
        <span class="kicker">${esc(s.kicker)}</span>
        <h2>${esc(s.heading)}</h2>
        <table>${s.rows
          .map(
            (r) =>
              `<tr><td class="cmd-cell">${esc(r[0])}</td><td>${esc(r[1])}</td><td class="dim">${esc(r[2])}</td></tr>`,
          )
          .join('')}</table>
      </div>`;
    case 'cta':
      return `<div class="s s-cta">
        <h2>${esc(s.title)}</h2>
        <pre class="cmd"><span class="prompt">$</span> ${esc(s.code)}</pre>
        <div class="links">${s.links.map((l) => `<span>${esc(l)}</span>`).join('')}</div>
      </div>`;
    default:
      return `<div class="s"></div>`;
  }
}

function deckHTML(deck) {
  const slides = deck.slides
    .map(
      (s, i) =>
        `<section class="slide" data-i="${i}">${slideHTML(s, deck.accent)}
          <footer class="brand-foot">
            <span class="bf-brand">agent<span class="bf-dim">-skills</span></span>
            <span class="bf-mid">${esc(deck.title)}</span>
            <span class="bf-page">${i + 1} / ${deck.slides.length}</span>
          </footer>
        </section>`,
    )
    .join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(deck.title)} - ${esc(deck.subtitle)}</title>
<meta name="description" content="${esc(deck.subtitle)}. A shareable deck from skills.addy.ie."/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Geist:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<style>
  :root{
    --accent:${deck.accent};
    --bg:#000;--surface:#0e0e0e;--border:#2e2e2e;--hair:#1f1f1f;
    --fg:#ededed;--bright:#fff;--muted:#a1a1a1;--dim:#7d7d7d;--faint:#565656;
    --sans:'Geist','Segoe UI',system-ui,sans-serif;--mono:'Geist Mono',ui-monospace,monospace;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{height:100%}
  body{background:#050505;color:var(--fg);font-family:var(--sans);overflow:hidden}
  .stage{position:fixed;inset:0;display:grid;place-items:center;padding:3vmin}
  .slide{
    position:relative;display:none;flex-direction:column;justify-content:center;
    width:min(100%,177.7vh);aspect-ratio:16/9;max-height:100%;
    background:radial-gradient(120% 100% at 50% 0%,#0b0d10,#000 70%);
    border:1px solid var(--hair);border-radius:16px;overflow:hidden;
    padding:7% 8%;
  }
  .slide.active{display:flex}
  .slide::before{content:'';position:absolute;inset:0;
    background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
    background-size:44px 44px;
    -webkit-mask:radial-gradient(90% 70% at 50% 0%,#000,transparent);mask:radial-gradient(90% 70% at 50% 0%,#000,transparent);pointer-events:none}
  .s{position:relative;z-index:1}
  .kicker{font-family:var(--mono);font-size:1.5vh;letter-spacing:.28em;color:var(--accent);text-transform:uppercase}
  h1{font-size:8.4vh;font-weight:700;letter-spacing:-.03em;line-height:1.02;margin-top:2.4vh;
     background:linear-gradient(180deg,#fff,#bcbcbc);-webkit-background-clip:text;background-clip:text;color:transparent}
  h2{font-size:5.2vh;font-weight:600;letter-spacing:-.02em;line-height:1.08;margin-top:2vh;color:var(--bright)}
  h2.big{font-size:6.6vh;max-width:15ch}
  .sub{margin-top:2.4vh;font-size:2.7vh;line-height:1.5;color:var(--muted);max-width:40ch}
  .foot-note{margin-top:5vh;font-size:2vh;color:var(--dim)}
  .s-bullets ul{margin-top:3.6vh;list-style:none;display:flex;flex-direction:column;gap:2.4vh}
  .s-bullets li{position:relative;padding-left:4vh;font-size:3vh;line-height:1.35;color:var(--fg);max-width:44ch}
  .s-bullets li::before{content:'';position:absolute;left:0;top:1.4vh;width:1.4vh;height:1.4vh;border-radius:3px;
    background:var(--accent);box-shadow:0 0 14px var(--accent)}
  .img-wrap{margin-top:3vh;border:1px solid var(--border);border-radius:12px;overflow:hidden;background:#000;max-height:62vh;display:flex}
  .img-wrap img,.img-wrap svg{display:block;width:100%;height:auto;max-height:62vh}
  .caption{margin-top:2.2vh;font-size:2.1vh;color:var(--dim);max-width:60ch}
  .cmd{margin-top:3.4vh;display:inline-block;font-family:var(--mono);font-size:3vh;color:var(--fg);
    background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:2.4vh 3vh}
  .cmd .prompt{color:var(--accent);margin-right:1.2vh}
  .s-commands table{margin-top:3.2vh;border-collapse:collapse;width:100%;font-size:2.5vh}
  .s-commands td{padding:1.5vh 1vh;border-bottom:1px solid var(--hair);vertical-align:middle}
  .s-commands .cmd-cell{font-family:var(--mono);color:var(--accent);width:26%}
  .s-commands .dim{color:var(--faint);text-align:right;font-size:2.1vh}
  .s-cta{text-align:center;align-items:center;display:flex;flex-direction:column}
  .s-cta h2{font-size:5.6vh;max-width:20ch}
  .s-cta .cmd{margin-top:4vh}
  .links{margin-top:3.4vh;display:flex;gap:3vh;font-family:var(--mono);font-size:2vh;color:var(--dim);flex-wrap:wrap;justify-content:center}
  .brand-foot{position:absolute;left:8%;right:8%;bottom:4.2%;display:flex;justify-content:space-between;align-items:center;
    font-family:var(--mono);font-size:1.7vh;color:var(--faint);z-index:1}
  .bf-brand{color:var(--muted)}.bf-dim{color:var(--faint)}
  .progress{position:fixed;top:0;left:0;height:3px;background:var(--accent);width:0;transition:width .25s ease;z-index:10}
  .nav{position:fixed;bottom:14px;right:16px;display:flex;gap:8px;z-index:10}
  .nav button{width:38px;height:38px;border-radius:9px;border:1px solid var(--border);background:rgba(14,14,14,.8);
    color:var(--muted);font-size:16px;cursor:pointer;backdrop-filter:blur(8px)}
  .nav button:hover{color:#fff;border-color:#3a3a3a}
  .hint{position:fixed;bottom:20px;left:16px;font-family:var(--mono);font-size:12px;color:var(--faint);z-index:10}
  @media print{
    @page{size:1280px 720px;margin:0}
    body{overflow:visible}.stage{position:static;padding:0}
    .progress,.nav,.hint{display:none}
    .slide{display:flex!important;width:1280px;height:720px;aspect-ratio:auto;max-height:none;border-radius:0;page-break-after:always;border:0}
  }
</style>
</head>
<body>
  <div class="progress" id="progress"></div>
  <div class="stage">
    ${slides}
  </div>
  <div class="hint">← → to navigate · F fullscreen · P print / PDF</div>
  <div class="nav">
    <button id="prev" aria-label="Previous">‹</button>
    <button id="next" aria-label="Next">›</button>
  </div>
<script>
  const slides=[...document.querySelectorAll('.slide')];
  let i=0;
  const prog=document.getElementById('progress');
  function show(n){i=Math.max(0,Math.min(slides.length-1,n));
    slides.forEach((s,k)=>s.classList.toggle('active',k===i));
    prog.style.width=((i+1)/slides.length*100)+'%';
    location.hash=i+1;}
  function next(){show(i+1)} function prev(){show(i-1)}
  document.getElementById('next').onclick=next;
  document.getElementById('prev').onclick=prev;
  addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'||e.key===' '||e.key==='PageDown'){e.preventDefault();next()}
    else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();prev()}
    else if(e.key==='Home'){show(0)} else if(e.key==='End'){show(slides.length-1)}
    else if(e.key==='f'||e.key==='F'){if(!document.fullscreenElement)document.documentElement.requestFullscreen();else document.exitFullscreen()}
    else if(e.key==='p'||e.key==='P'){window.print()}
  });
  addEventListener('click',e=>{if(e.target.closest('.nav')||e.target.closest('a'))return;
    const x=e.clientX/innerWidth; if(x>0.6)next(); else if(x<0.4)prev();});
  show(parseInt(location.hash.slice(1))-1||0);
</script>
</body>
</html>`;
}

for (const deck of decks) {
  const html = deckHTML(deck);
  writeFileSync(join(outDir, `${deck.slug}.html`), html);
  console.log('wrote', `public/teach/decks/${deck.slug}.html`, `(${deck.slides.length} slides)`);
}

// Mirror data for the PPTX build.
writeFileSync(join(root, 'scripts', 'deck-data.json'), JSON.stringify(decks, null, 2));
console.log('wrote scripts/deck-data.json');
