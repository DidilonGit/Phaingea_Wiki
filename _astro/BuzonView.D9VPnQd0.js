import{t as e}from"./react.CYuo-Lgd.js";import{t,x as n}from"./campaign.DEk2Juoy.js";import{t as r}from"./jsx-runtime.DvA2kLYf.js";import{t as i}from"./user.DppdupU9.js";import{a,t as o}from"./notificaciones.CsEHjwjU.js";import{t as s}from"./sonidos.C675gmG3.js";var c=e(),l=r(),u=8;function d(){let e=n(t),r=n(i),[d,m]=(0,c.useState)([]),[h,g]=(0,c.useState)(!1),[_,v]=(0,c.useState)(!1),[y,b]=(0,c.useState)([]);function x(e=6){if(typeof window<`u`&&window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches)return;let t=Array.from({length:e},(e,t)=>({id:`${Date.now()}-${t}`,x:50+(Math.random()-.5)*60,y:50+(Math.random()-.5)*60,retraso:Math.random()*.3}));b(e=>[...e,...t]),setTimeout(()=>b([]),1100)}let[S,C]=(0,c.useState)(null),[w,T]=(0,c.useState)(null),[E,D]=(0,c.useState)(0),[O,k]=(0,c.useState)(!1);if((0,c.useEffect)(()=>k(!0),[]),(0,c.useEffect)(()=>{if(!(!e?.id||!r?.nombre))return a(e.id,r.nombre,m)},[e?.id,r?.nombre]),(0,c.useEffect)(()=>{let e=()=>g(!0);return window.addEventListener(`phaingea:abrir-buzon`,e),()=>window.removeEventListener(`phaingea:abrir-buzon`,e)},[]),(0,c.useEffect)(()=>{g(!1),C(null)},[e?.id]),!O)return null;if(!r)return(0,l.jsx)(`p`,{className:`muted center`,children:`Entra con tu cuenta para ver tu correspondencia.`});let A=d.filter(e=>e.estado===`pendiente`),j=d.filter(e=>e.estado===`archivada`),M=e?.colorTexto||`#efe6d2`,N=e?.colorContorno||`#c9a45a`;async function P(t){s(`archivar`),x(5),T(t.id),C(null),setTimeout(async()=>{await o(e.id,r.nombre,t.id),T(null)},620)}let F=Math.max(1,Math.ceil(j.length/u)),I=Math.min(E,F-1),L=j.slice(I*u,I*u+u);return(0,l.jsxs)(`div`,{className:`buzon-view`,style:{"--camp-a":M,"--camp-b":N},children:[(0,l.jsx)(`div`,{className:`buzon-escena`,"aria-hidden":`true`,children:(0,l.jsx)(`div`,{className:`fuego`})}),(0,l.jsxs)(`div`,{className:`buzon-conjunto`,children:[(0,l.jsxs)(`div`,{className:`abanico`,children:[h&&A.map((t,n)=>{let r=(A.length-1)/2,i=(n-r)*9,a=(n-r)*46;return(0,l.jsxs)(`button`,{className:`carta ${w===t.id?`volando`:``}`,style:{transform:`translateX(${a}px) rotate(${i}deg)`,zIndex:10+n},onClick:()=>{s(`carta`),C(t)},title:t.asunto,children:[(0,l.jsx)(`span`,{className:`sello`}),(0,l.jsx)(`span`,{className:`c-asunto`,children:t.asunto}),(0,l.jsx)(`span`,{className:`c-fecha mono`,children:f(t.fecha)}),(0,l.jsx)(`span`,{className:`c-logo`,children:(e?.nombre||`?`).charAt(0)})]},t.id)}),h&&A.length===0&&(0,l.jsx)(`p`,{className:`muted mono sin-cartas`,children:`No tienes cartas pendientes.`})]}),(0,l.jsxs)(`div`,{className:`pared`,children:[(0,l.jsxs)(`button`,{className:`buzon ${h?`abierto`:``}`,onClick:()=>{g(e=>!e),x(6)},onMouseEnter:()=>v(!0),onMouseLeave:()=>v(!1),onFocus:()=>v(!0),onBlur:()=>v(!1),"aria-label":h?`Cerrar el sobre`:`Abrir el sobre`,children:[(0,l.jsx)(`span`,{className:`buzon-cuerpo`}),y.map(e=>(0,l.jsx)(`span`,{className:`chispa`,style:{left:`${e.x}%`,top:`${e.y}%`,animationDelay:`${e.retraso}s`}},e.id)),A.length>0&&(0,l.jsxs)(`span`,{className:`sobre`,style:{bottom:`${h?106:_?84:62}px`,transform:`translateX(-50%) rotate(${h?-4:0}deg)`,boxShadow:_&&!h?`0 10px 18px rgba(0,0,0,.4), 0 0 14px rgba(255,220,140,.35)`:`0 5px 10px rgba(0,0,0,.35)`},children:[(0,l.jsx)(`span`,{className:`sobre-dentro`}),(0,l.jsx)(`span`,{className:`sobre-solapa`,style:{transform:`rotateX(${h?150:0}deg)`}})]}),A.length>0&&(0,l.jsx)(`span`,{className:`contador`,children:A.length})]}),(0,l.jsx)(`p`,{className:`mono muted pie-buzon`,children:A.length===0?`Sin cartas pendientes`:h?`Sobre abierto`:`Pulsa el sobre`})]})]}),S&&(0,l.jsx)(`div`,{className:`carta-fondo`,onClick:()=>C(null),children:(0,l.jsxs)(`div`,{className:`carta-grande`,onClick:e=>e.stopPropagation(),children:[(0,l.jsx)(`button`,{className:`cerrar`,onClick:()=>C(null),"aria-label":`Cerrar`,children:`✕`}),(0,l.jsxs)(`div`,{className:`cg-cabecera`,children:[(0,l.jsx)(`span`,{className:`cg-medallon`,children:e?.logoUrl?(0,l.jsx)(`img`,{src:e.logoUrl,alt:``}):(0,l.jsx)(`b`,{children:(e?.nombre||`?`).charAt(0)})}),(0,l.jsxs)(`span`,{className:`cg-quien`,children:[(0,l.jsx)(`span`,{className:`cg-remite`,children:e?.nombre||`Phaingea`}),(0,l.jsx)(`span`,{className:`mono cg-fecha`,children:f(S.fecha)})]})]}),(0,l.jsx)(`h3`,{children:S.asunto}),(0,l.jsx)(`p`,{className:`cg-texto`,children:S.contenido||`Sin más detalles.`}),S.estado===`pendiente`&&(0,l.jsx)(`button`,{className:`btn`,onClick:()=>P(S),children:`Archivar ⟶`}),(0,l.jsx)(`p`,{className:`mono muted nota-cierre`,children:`Cerrar sin archivar la deja pendiente.`})]})}),(0,l.jsxs)(`div`,{className:`album`,children:[(0,l.jsx)(`h3`,{className:`album-titulo`,children:`Álbum`}),j.length===0?(0,l.jsx)(`p`,{className:`muted mono`,children:`Todavía no has archivado ninguna carta.`}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(`div`,{className:`album-paginas`,children:L.map(e=>(0,l.jsxs)(`button`,{className:`carta-album`,onClick:()=>C(e),title:e.asunto,children:[(0,l.jsx)(`span`,{className:`sello`}),(0,l.jsx)(`span`,{className:`c-asunto`,children:e.asunto}),(0,l.jsx)(`span`,{className:`c-fecha mono`,children:f(e.fecha)})]},e.id))}),F>1&&(0,l.jsxs)(`div`,{className:`album-nav mono`,children:[(0,l.jsx)(`button`,{onClick:()=>D(e=>(e-1+F)%F),children:`‹`}),(0,l.jsxs)(`span`,{children:[`Página `,I+1,` / `,F]}),(0,l.jsx)(`button`,{onClick:()=>D(e=>(e+1)%F),children:`›`})]})]})]}),(0,l.jsx)(`style`,{children:p})]})}function f(e){return e?new Date(e).toLocaleDateString(`es-ES`,{day:`2-digit`,month:`short`,year:`numeric`}):``}var p=`
.buzon-view { position: relative; display: grid; gap: 1.6rem; }
.buzon-escena {
  position: fixed; inset: var(--topbar-h) 0 0 0; z-index: 0; pointer-events: none;
  background:
    radial-gradient(55% 40% at 22% 88%, rgba(240,170,80,.16), transparent 62%),
    linear-gradient(180deg, rgba(46,32,20,.55), rgba(22,15,9,.75));
}
.buzon-escena .fuego {
  position: absolute; left: 12%; bottom: 6%; width: 220px; height: 120px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,170,70,.28), transparent 70%);
  filter: blur(18px); animation: latido 3.4s ease-in-out infinite;
}
@keyframes latido { 0%,100% { opacity:.65; transform: scale(1); } 50% { opacity:1; transform: scale(1.07); } }

.buzon-conjunto { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 1.4rem; align-items: start; min-height: 300px; }
.abanico { position: relative; display: grid; place-items: center; min-height: 240px; }
.sin-cartas { font-size: .8rem; }
.carta {
  position: absolute; top: 20px; width: 150px; height: 200px; cursor: pointer;
  border-radius: 6px; border: 1px solid rgba(0,0,0,.5); padding: .7rem .6rem;
  display: grid; align-content: space-between; justify-items: center; text-align: center;
  background: linear-gradient(160deg, var(--camp-b), color-mix(in srgb, var(--camp-b) 45%, #241609));
  box-shadow: 0 10px 26px rgba(0,0,0,.55);
  transition: transform .25s var(--ease), box-shadow .25s var(--ease);
  animation: salir .5s var(--ease) backwards;
}
@keyframes salir { from { transform: translateY(60px) scale(.8); opacity: 0; } }
.carta:hover { transform: translateY(-16px) !important; box-shadow: 0 18px 34px rgba(0,0,0,.6); }
.carta.volando { animation: volar .6s var(--ease) forwards; }
@keyframes volar {
  to { transform: translate(160px, 220px) rotate(22deg) scale(.35); opacity: 0; filter: brightness(1.8); }
}
.carta .sello { width: 26px; height: 26px; border-radius: 50%; background: rgba(0,0,0,.35); box-shadow: inset 0 0 0 2px rgba(255,255,255,.25); }
.c-asunto { font-family: var(--font-title); font-size: .88rem; color: var(--camp-a); text-shadow: 0 1px 3px rgba(0,0,0,.6); }
.c-fecha { font-size: .58rem; color: rgba(255,255,255,.75); }
.c-logo { font-family: var(--font-title); font-size: 1.1rem; color: rgba(255,255,255,.5); }

.pared {
  width: 190px; padding: 1.2rem 1rem; border-radius: 8px; display: grid; justify-items: center; gap: .6rem;
  background: linear-gradient(160deg, #5a3d26, #2e1d10);
  box-shadow: inset 0 0 0 2px rgba(0,0,0,.35), 0 14px 30px rgba(0,0,0,.5);
}
.buzon { position: relative; width: 120px; height: 128px; background: none; border: 0; cursor: pointer; }
.buzon-cuerpo {
  position: absolute; inset: 52px 12px 22px 12px; border-radius: 10px 10px 5px 5px;
  background:
    linear-gradient(180deg, rgba(255,255,255,.12), transparent 40%),
    linear-gradient(180deg, #6b4a2c, #3a2618 78%);
  border: 1px solid #24170d;
  box-shadow: inset 0 2px 0 rgba(255,255,255,.18), 0 8px 18px rgba(0,0,0,.5);
  z-index: 2;
}
/* el poste sobre el que se apoya */
.buzon-cuerpo::after {
  content: ''; position: absolute; left: 50%; top: 100%; width: 16px; height: 22px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #4a3220, #6b4a2c 45%, #3a2618);
  border-radius: 0 0 3px 3px;
}
/* la ranura por la que asoma el sobre */
.buzon-cuerpo::before {
  content: ''; position: absolute; left: 12%; right: 12%; top: 10px; height: 5px; border-radius: 3px;
  background: rgba(0,0,0,.55); box-shadow: inset 0 1px 0 rgba(255,255,255,.15);
}
/* El sobre asoma por la ranura y SUBE al pasar por encima; al abrir el buzón
   sale del todo antes de que las cartas se desplieguen (diseño de Didilon). */
.sobre {
  position: absolute; left: 50%; bottom: 62px; width: 76px; height: 52px;
  transform: translateX(-50%); perspective: 300px;
  border-radius: 3px; border: 1px solid #8a6a3a;
  background: linear-gradient(160deg, #e9d3a3, #cdae74);
  box-shadow: 0 5px 10px rgba(0,0,0,.35);
  transition: bottom .28s var(--ease), transform .28s var(--ease), box-shadow .3s ease;
  z-index: 1;
}

/* el interior oscuro que se ve cuando la solapa se abre */
.sobre-dentro {
  position: absolute; left: 0; top: 0; width: 100%; height: 56%;
  background: linear-gradient(180deg, #b8955a 0%, #8a6a3a 55%, #6b4f28 100%);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  box-shadow: inset 0 -12px 16px rgba(50,35,15,.5);
}
/* la solapa: cerrada tapa el interior; al abrir el buzón se abate hacia atrás */
.sobre-solapa {
  position: absolute; left: 0; top: 0; width: 100%; height: 56%;
  background: linear-gradient(160deg, #f0dfb6, #dcc084);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  border-bottom: 1px solid #8a6a3a;
  transform-origin: top center; transform: rotateX(0deg);
  transition: transform .55s var(--ease);
}

.sobre::after {
  content: ''; position: absolute; inset: 0;
  border-top: 26px solid rgba(0,0,0,.12); border-left: 38px solid transparent; border-right: 38px solid transparent;
}
.buzon.abierto .buzon-cuerpo {
  background:
    linear-gradient(180deg, rgba(255,255,255,.16), transparent 40%),
    linear-gradient(180deg, #7d5734, #46301d 78%);
}
.contador {
  position: absolute; right: -6px; top: 12px; min-width: 24px; height: 24px; border-radius: 999px;
  display: grid; place-items: center; padding: 0 .3rem;
  background: var(--gold); color: #241a12; font-family: ui-monospace, monospace; font-size: .72rem; font-weight: 700;
  box-shadow: 0 2px 8px rgba(0,0,0,.5);
}
.pie-buzon { font-size: .62rem; }

/* cabecera de la carta ampliada: medallón del logo + remitente y fecha */
.cg-cabecera { display: flex; align-items: center; gap: .7rem; margin-bottom: .2rem; }
.cg-medallon {
  width: 46px; height: 46px; border-radius: 50%; flex: none; overflow: hidden;
  display: grid; place-items: center;
  background: linear-gradient(135deg, #b8860b, #f5d98a, #a3781c);
  box-shadow: 0 2px 8px rgba(0,0,0,.35), inset 0 0 0 2px rgba(255,255,255,.3);
}
.cg-medallon img { width: 100%; height: 100%; object-fit: cover; }
.cg-medallon b { font-family: var(--font-title); font-size: 1.3rem; color: #2a1d10; }
.cg-quien { display: grid; line-height: 1.2; }
.cg-remite { font-family: var(--font-title); color: var(--camp-a); font-size: .96rem; }

/* chispas doradas al abrir el buzón y al archivar */
.chispa {
  position: absolute; width: 6px; height: 6px; border-radius: 50%; pointer-events: none;
  background: radial-gradient(circle, #fff6cf, var(--gold) 60%, transparent 70%);
  animation: chispear 1s var(--ease) forwards;
}
@keyframes chispear {
  0% { opacity: 0; transform: translate(-50%,-50%) scale(.3); }
  40% { opacity: 1; transform: translate(-50%,-160%) scale(1); }
  100% { opacity: 0; transform: translate(-50%,-320%) scale(.4); }
}

.carta-fondo {
  position: fixed; inset: 0; z-index: 150; display: grid; place-items: center; padding: 5vh 5vw;
  background: rgba(5,6,10,.78); backdrop-filter: blur(6px);
}
.carta-grande {
  position: relative; width: min(520px, 92vw); padding: 1.6rem 1.8rem;
  border-radius: 8px; color: #3a2a16;
  background: linear-gradient(160deg,
    color-mix(in srgb, var(--camp-b) 22%, #f4ead2),
    color-mix(in srgb, var(--camp-b) 12%, #e6d9ba));
  box-shadow: 0 26px 60px rgba(0,0,0,.65);
  animation: girar .45s var(--ease);
}
@keyframes girar { from { transform: rotateY(90deg) scale(.7); opacity: 0; } }
.carta-grande h3 { font-family: var(--font-title); margin: .2rem 0 .8rem; font-size: 1.35rem; color: #4a2f14; }
.cg-fecha { font-size: .64rem; color: #7a6444; }
.cg-texto { line-height: 1.6; margin: 0 0 1.1rem; }
.nota-cierre { font-size: .6rem; margin-top: .6rem; color: #7a6444; }
.carta-grande .cerrar {
  position: absolute; top: .6rem; right: .6rem; width: 26px; height: 26px; border-radius: 50%;
  background: rgba(0,0,0,.15); border: 1px solid rgba(0,0,0,.3); color: #4a2f14; cursor: pointer;
}

.album { position: relative; z-index: 1; }
.album-titulo { font-family: var(--font-title); color: var(--gold-soft); margin: 0 0 .6rem; }
.album-paginas { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: .8rem; }
.carta-album {
  height: 150px; border-radius: 5px; cursor: pointer; padding: .5rem;
  display: grid; align-content: space-between; justify-items: center; text-align: center;
  border: 1px solid rgba(0,0,0,.5);
  background: linear-gradient(160deg, color-mix(in srgb, var(--camp-b) 60%, #3a2a18), #241609);
  box-shadow: 0 6px 16px rgba(0,0,0,.45);
}
.carta-album:hover { filter: brightness(1.12); }
.album-nav { display: flex; align-items: center; gap: .8rem; justify-content: center; margin-top: .8rem; font-size: .7rem; color: var(--stone); }
.album-nav button { width: 26px; height: 26px; border-radius: 50%; cursor: pointer; background: rgba(14,17,22,.7); border: 1px solid rgba(201,164,90,.5); color: var(--gold); }
@media (max-width: 720px) { .buzon-conjunto { grid-template-columns: 1fr; } .pared { justify-self: center; } }
`;export{d as default};