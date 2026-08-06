import{t as e}from"./react.CYuo-Lgd.js";import{t,x as n}from"./campaign.DEk2Juoy.js";import{t as r}from"./jsx-runtime.DvA2kLYf.js";var i=e(),a=r();function o(){let e=n(t),[r,o]=(0,i.useState)(!1),[c,l]=(0,i.useState)(!1);if((0,i.useEffect)(()=>o(!0),[]),(0,i.useEffect)(()=>{if(!r)return;l(!0);let e=setTimeout(()=>l(!1),30);return()=>clearTimeout(e)},[e?.id,r]),!r||!e)return null;let u=String(e.descripcion||``).split(/\n{2,}|\r\n\r\n/).map(e=>e.trim()).filter(Boolean);return(0,a.jsxs)(`div`,{className:`nota ${c?`fundiendo`:``}`,children:[(0,a.jsxs)(`div`,{className:`nota-cabecera`,children:[e.logoUrl?(0,a.jsx)(`img`,{className:`nota-logo`,src:e.logoUrl,alt:``}):(0,a.jsx)(`span`,{className:`nota-logo marcador`,style:{background:`radial-gradient(circle at 32% 28%, rgba(255,255,255,.35), transparent 45%),
                           linear-gradient(140deg, ${e.planeta?.colorA||`#5b6a8a`}, ${e.planeta?.colorB||`#2b3350`} 72%)`},"aria-hidden":`true`}),(0,a.jsx)(`h2`,{className:`nota-titulo`,style:{fontFamily:e.fuenteTitulo||`var(--font-title)`,color:e.colorTexto||`var(--ink)`,WebkitTextStrokeColor:e.colorContorno||`transparent`},children:e.nombre})]}),(0,a.jsx)(`hr`,{className:`nota-divisoria`}),(0,a.jsx)(`div`,{className:`nota-cuerpo`,children:u.length>0?u.map((e,t)=>(0,a.jsx)(`p`,{children:e},t)):(0,a.jsx)(`p`,{className:`nota-vacia`,children:`Esta campaña aún no tiene descripción.`})}),(0,a.jsx)(`style`,{children:s})]})}var s=`
.nota {
  position: relative;
  width: min(680px, 92vw);
  margin: .2rem auto 0; /* pegada al globo: la nota queda bien alta (§8.5) */
  padding: 1.3rem 1.6rem 1.5rem;
  color: #3a2a16;
  background:
    radial-gradient(120% 90% at 20% 10%, rgba(255,255,255,.5), transparent 55%),
    linear-gradient(160deg, #efe3c6, #ddcba2 70%, #d3bf93);
  border: 1px solid rgba(90,61,38,.35);
  border-radius: 3px;
  box-shadow: 0 14px 34px rgba(0,0,0,.5), inset 0 0 40px rgba(140,110,60,.18);
  /* bordes irregulares de papel viejo */
  clip-path: polygon(0% 2%, 2% 0%, 98% 1%, 100% 3%, 99.4% 97%, 97% 100%, 3% 99%, 0.4% 96%);
  transition: opacity .35s var(--ease), transform .35s var(--ease);
}
.nota.fundiendo { opacity: 0; transform: translateY(6px); }
.nota-cabecera { display: flex; align-items: center; gap: .6rem; }
.nota-logo { width: 28px; height: 28px; border-radius: 50%; flex: none; box-shadow: 0 2px 6px rgba(0,0,0,.4); object-fit: cover; }
.nota-titulo {
  margin: 0; font-size: clamp(1.5rem, 4vw, 2.2rem); letter-spacing: .03em; line-height: 1.1;
  -webkit-text-stroke-width: 1px;
  paint-order: stroke fill;
}
.nota-divisoria {
  border: 0; height: 1px; margin: .8rem 0 .9rem;
  background: linear-gradient(90deg, transparent, rgba(90,61,38,.55), transparent);
}
.nota-cuerpo { font-family: var(--font-body); font-size: .98rem; line-height: 1.6; color: #4a3a22; }
.nota-cuerpo p { margin: 0 0 .6rem; }
.nota-cuerpo p:last-child { margin-bottom: 0; }
.nota-vacia { opacity: .6; font-style: italic; }
`;export{o as default};