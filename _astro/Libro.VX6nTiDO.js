const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/page-flip.browser.D6Rq_K5g.js","_astro/react.CYuo-Lgd.js"])))=>i.map(i=>d[i]);
import{r as e,t}from"./react.CYuo-Lgd.js";import{t as n}from"./jsx-runtime.DvA2kLYf.js";import{t as r}from"./sonidos.C675gmG3.js";var i=t(),a=n(),o=(function(){let e=typeof document<`u`&&document.createElement(`link`).relList;return e&&e.supports&&e.supports(`modulepreload`)?`modulepreload`:`preload`})(),s=function(e){return`/Phaingea_Wiki/`+e},c={},l=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function u(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=l(t.map(t=>{if(t=s(t,n),t=u(t),t in c)return;c[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:o,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};function u(e){return e==null||typeof e==`boolean`?``:typeof e==`string`||typeof e==`number`?String(e):Array.isArray(e)?e.map(u).join(` `):e.props&&e.props.children!=null?u(e.props.children):``}function d({titulo:t=`Libro`,sub:n=``,cubierta:o=`cuero-rojo`,paginas:s=[],titulosPaginas:c=[],alAbrirPagina:d,portada:p=null,contraportada:m=null,proporcion:h=1.38}){let[g,_]=(0,i.useState)(0),[v,y]=(0,i.useState)(``),[b,x]=(0,i.useState)(``),[S,C]=(0,i.useState)(!1),[w,T]=(0,i.useState)(!1),[E,D]=(0,i.useState)(!1),O=(0,i.useRef)(null),k=(0,i.useRef)(null),A=(0,i.useRef)(null),j=s.length,M=e=>c[e]||`Página ${e+1}`,N=j+3,P=(0,i.useMemo)(()=>s.map(e=>u(e).toLowerCase()),[s]),F=(0,i.useMemo)(()=>{let e=b.trim().toLowerCase();if(e.length<2)return null;let t=[];return P.forEach((n,r)=>{let i=n.indexOf(e);if(i===-1)return;let a=Math.max(0,i-30);t.push({pagina:r,contexto:(a>0?`…`:``)+n.slice(a,i+e.length+30)+`…`})}),t},[b,P]),I=(0,i.useRef)(!1),L=(0,i.useRef)(s);L.current=s;let R=(0,i.useRef)(h);R.current=h,(0,i.useEffect)(()=>{let t=!0;async function n(){let n=k.current;if(!(!n||A.current||I.current)&&!(n.clientWidth<50)){I.current=!0;try{let i=await l(()=>import(`./page-flip.browser.D6Rq_K5g.js`).then(t=>e(t.default,1)),__vite__mapDeps([0,1])),a=i.PageFlip||i.default?.PageFlip||i.default;if(!t||A.current||typeof a!=`function`)return;let o=Math.min(n.clientWidth/2,700),s=new a(n,{width:o,height:Math.round(o*R.current),size:`stretch`,minWidth:220,maxWidth:900,minHeight:300,maxHeight:1300,showCover:!0,usePortrait:!0,maxShadowOpacity:.5,mobileScrollSupport:!1,drawShadow:!0});s.loadFromHTML(n.querySelectorAll(`.hoja`)),s.on(`flip`,e=>{let t=e.data;_(t),r(`pagina`);let n=L.current.length;t>=2&&t<2+n&&d&&d(t-2)}),A.current=s,T(!0),D(!!n.querySelector(`.stf__wrapper.--landscape`))}catch{}finally{I.current=!1}}}n();let i=new ResizeObserver(()=>{n(),D(!!k.current?.querySelector(`.stf__wrapper.--landscape`))});k.current&&i.observe(k.current);let a=()=>setTimeout(n,60);window.addEventListener(`phaingea:vista`,a);let o=0,s=setInterval(()=>{if(!t||A.current||o>20){clearInterval(s);return}o++,n()},500);return()=>{t=!1,clearInterval(s),i.disconnect(),window.removeEventListener(`phaingea:vista`,a);try{A.current?.destroy()}catch{}A.current=null}},[]),(0,i.useEffect)(()=>{if(!A.current)return;let e=setTimeout(()=>{try{A.current?.update?.()}catch{}window.dispatchEvent(new Event(`resize`))},80);return()=>clearTimeout(e)},[S]),(0,i.useEffect)(()=>{if(A.current)try{A.current.updateFromHtml(k.current.querySelectorAll(`.hoja`))}catch{}},[j]);function z(e){let t=A.current;if(!t)return;let n=Math.max(0,Math.min(N-1,e));try{typeof t.turnToPage==`function`?t.turnToPage(n):t.flip(n),_(n)}catch{}}let B=()=>A.current?.flipNext(),V=()=>A.current?.flipPrev();(0,i.useEffect)(()=>{let e=e=>{e.target.closest?.(`input, textarea, select`)||!O.current||O.current.offsetParent===null||(e.key===`ArrowRight`&&B(),e.key===`ArrowLeft`&&V(),e.key===`Escape`&&S&&C(!1))};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[S]);function H(e){e.preventDefault();let t=parseInt(v,10);!isNaN(t)&&t>=1&&t<=j&&(z(2+t-1),y(``))}let U=g>=2&&g<2+j;function W(){let e=e=>e-2+1;if(!k.current?.querySelector(`.stf__wrapper.--landscape`))return String(e(g));let t=g%2==1?g:g-1,n=e(t),r=e(t+1);return n<1?String(r):r>j?String(n):`${n}–${r}`}return(0,a.jsxs)(`div`,{className:`libro-wrap ${S?`fs`:``}`,ref:O,style:{"--prop":E?h/2:h},children:[S&&(0,a.jsx)(`div`,{className:`fs-fondo`,onClick:()=>C(!1),"aria-hidden":`true`}),!S&&(0,a.jsxs)(`button`,{className:`btn-ampliar`,onClick:()=>C(!0),"aria-label":`Pantalla completa`,children:[`⛶`,(0,a.jsx)(`span`,{className:`tip-ampliar`,children:`Pantalla completa`})]}),(0,a.jsxs)(`div`,{className:`libro cubierta-${o}`,ref:k,style:{aspectRatio:E?`2 / ${h}`:`1 / ${h}`},children:[(0,a.jsx)(`div`,{className:`hoja tapa`,"data-density":`hard`,children:p?(0,a.jsx)(`div`,{className:`tapa-doc`,children:p}):(0,a.jsxs)(`div`,{className:`tapa-interior`,children:[(0,a.jsx)(`span`,{className:`esquina a`}),(0,a.jsx)(`span`,{className:`esquina b`}),(0,a.jsx)(`span`,{className:`esquina c`}),(0,a.jsx)(`span`,{className:`esquina d`}),(0,a.jsx)(`span`,{className:`portada-titulo`,children:t}),n&&(0,a.jsx)(`span`,{className:`portada-sub`,children:n}),(0,a.jsx)(`span`,{className:`portada-abrir mono`,children:`ABRIR`})]})}),(0,a.jsx)(`div`,{className:`hoja`,children:(0,a.jsxs)(`div`,{className:`pagina indice`,children:[(0,a.jsx)(`h4`,{className:`pagina-titulo`,children:`Índice`}),(0,a.jsx)(`ol`,{className:`indice-lista`,children:s.map((e,t)=>(0,a.jsx)(`li`,{children:(0,a.jsxs)(`button`,{onClick:()=>z(2+t),children:[(0,a.jsx)(`span`,{className:`indice-titulo`,children:M(t)}),(0,a.jsx)(`span`,{className:`indice-num mono`,children:t+1})]})},t))}),j===0&&(0,a.jsx)(`p`,{className:`muted`,children:`Este libro aún no tiene páginas.`})]})}),s.map((e,t)=>(0,a.jsx)(`div`,{className:`hoja`,children:(0,a.jsxs)(`div`,{className:`pagina`,children:[(0,a.jsx)(`div`,{className:`pagina-contenido`,children:e}),(0,a.jsxs)(`div`,{className:`pagina-pie mono`,children:[(0,a.jsx)(`button`,{className:`lnk`,onClick:()=>z(1),children:`⌂ Índice`}),(0,a.jsxs)(`span`,{children:[t+1,` / `,j]})]})]})},t)),(0,a.jsx)(`div`,{className:`hoja tapa`,"data-density":`hard`,children:m?(0,a.jsx)(`div`,{className:`tapa-doc`,children:m}):(0,a.jsxs)(`div`,{className:`tapa-interior`,children:[(0,a.jsx)(`span`,{className:`esquina a`}),(0,a.jsx)(`span`,{className:`esquina b`}),(0,a.jsx)(`span`,{className:`esquina c`}),(0,a.jsx)(`span`,{className:`esquina d`}),(0,a.jsx)(`span`,{className:`portada-sub`,children:`Fin`})]})})]}),(0,a.jsxs)(`div`,{className:`libro-controles`,children:[(0,a.jsx)(`button`,{className:`ctrl`,onClick:V,disabled:!w||g===0,"aria-label":`Página anterior`,children:`‹`}),(0,a.jsx)(`button`,{className:`ctrl indice-btn`,onClick:()=>z(1),disabled:!w,"aria-label":`Ir al índice`,title:`Índice`,children:`⌂`}),(0,a.jsx)(`form`,{onSubmit:H,className:`ira mono`,children:(0,a.jsx)(`input`,{value:v,onChange:e=>y(e.target.value),placeholder:`pág.`,"aria-label":`Ir a página`,inputMode:`numeric`})}),(0,a.jsx)(`button`,{className:`ctrl`,onClick:B,disabled:!w||g>=N-1,"aria-label":`Página siguiente`,children:`›`}),(0,a.jsxs)(`div`,{className:`buscador`,children:[(0,a.jsx)(`input`,{value:b,onChange:e=>x(e.target.value),placeholder:`🔎 buscar en el libro…`,"aria-label":`Buscar en el libro`}),F&&(0,a.jsxs)(`div`,{className:`buscador-resultados`,role:`listbox`,"aria-label":`Resultados de búsqueda`,children:[F.length===0&&(0,a.jsx)(`p`,{className:`sin-resultados mono`,children:`Sin resultados`}),F.map(e=>(0,a.jsxs)(`button`,{onClick:()=>{z(2+e.pagina),x(``)},children:[(0,a.jsxs)(`span`,{className:`mono br-pag`,children:[M(e.pagina),` · pág. `,e.pagina+1]}),(0,a.jsx)(`span`,{className:`br-ctx`,children:e.contexto})]},e.pagina))]})]})]}),U&&(0,a.jsxs)(`p`,{className:`mono posicion`,children:[W(),` / `,j]}),S&&(0,a.jsx)(`button`,{className:`fs-cerrar`,onClick:()=>C(!1),"aria-label":`Salir de pantalla completa`,children:`✕`}),(0,a.jsx)(`style`,{children:f})]})}var f=`
.libro-wrap { display: grid; justify-items: center; gap: .7rem; width: 100%; }
.libro { width: min(560px, 92vw); max-height: 74vh; margin: 0 auto; }
.libro .hoja { background: linear-gradient(120deg, var(--paper), var(--parchment) 85%); overflow: hidden; }
.libro .hoja.tapa { background: none; }
/* portada tomada del propio documento: llena la tapa de borde a borde */
.tapa-doc { position: absolute; inset: 0; overflow: hidden; border-radius: 4px; }
.tapa-doc img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* tapas de cuero con esquinas decorativas (guía §27.2) */
.cubierta-cuero-rojo  .tapa-interior { --cuero: var(--leather-red);   --fondo: #241610; }
.cubierta-cuero-verde .tapa-interior { --cuero: var(--leather-green); --fondo: #16200f; }
.cubierta-cuero-negro .tapa-interior { --cuero: var(--leather-black); --fondo: #0d0b09; }
.tapa-interior {
  position: absolute; inset: 0; display: grid; place-content: center; gap: .5rem; text-align: center; padding: 1.4rem;
  background: radial-gradient(120% 100% at 30% 20%, rgba(255,255,255,.08), transparent 55%),
              linear-gradient(135deg, var(--cuero, var(--leather-red)), var(--fondo, #241610));
  border-radius: 4px;
  box-shadow: inset 0 0 0 2px rgba(255,255,255,.05);
}
.tapa-interior .esquina { position: absolute; width: 22px; height: 22px; border: 2px solid rgba(201,164,90,.55); }
.tapa-interior .esquina.a { top: 10px; left: 10px; border-right: 0; border-bottom: 0; }
.tapa-interior .esquina.b { top: 10px; right: 10px; border-left: 0; border-bottom: 0; }
.tapa-interior .esquina.c { bottom: 10px; left: 10px; border-right: 0; border-top: 0; }
.tapa-interior .esquina.d { bottom: 10px; right: 10px; border-left: 0; border-top: 0; }
.portada-titulo { font-family: var(--font-title); font-size: clamp(1.2rem, 3.4vw, 1.8rem); color: var(--gold-soft); letter-spacing: .05em; }
.portada-sub { font-family: var(--font-body); color: var(--parchment); opacity: .8; font-size: .85rem; }
.portada-abrir { margin-top: .8rem; color: var(--gold); font-size: .64rem; letter-spacing: .3em; border: 1px solid rgba(201,164,90,.5); border-radius: 999px; padding: .35rem .8rem; justify-self: center; }

/* páginas de papel */
.pagina { position: absolute; inset: 0; color: var(--ink); padding: 1.1rem 1.2rem 2rem; overflow-y: auto; }
/* Documento maquetado: la imagen llena la hoja de borde a borde (sin el
   margen de papel), tal como se ve el original. */
.pagina:has(.pagina-doc) { padding: 0; overflow: hidden; }
.pagina:has(.pagina-doc) .pagina-contenido { height: 100%; }
.pagina-doc { width: 100%; height: 100%; object-fit: cover; display: block; }
.pagina:has(.pagina-doc) .pagina-pie {
  background: linear-gradient(transparent, rgba(20,12,4,.55));
  color: rgba(255,245,225,.9);
}
.pagina:has(.pagina-doc) .pagina-pie .lnk { color: rgba(255,235,190,.95); }
.pagina-titulo { font-family: var(--font-title); color: #5a3d26; font-size: 1.2rem; margin: 0 0 .7rem; }
.indice-lista { list-style: none; margin: 0; padding: 0; display: grid; gap: .1rem; }
.indice-lista button {
  width: 100%; display: flex; justify-content: space-between; gap: 1rem; align-items: baseline;
  background: none; border: 0; cursor: pointer; padding: .32rem .3rem;
  font-family: var(--font-body); color: var(--ink); font-size: .92rem;
  border-bottom: 1px dotted rgba(90,61,38,.35);
}
.indice-lista button:hover .indice-titulo { color: #7a4a1a; }
.indice-num { color: #8a7350; font-size: .74rem; }
.pagina-contenido { font-family: var(--font-body); line-height: 1.55; }
.pagina-contenido img { width: 100%; height: auto; display: block; }
.pagina-pie {
  position: absolute; left: 0; right: 0; bottom: 0;
  display: flex; justify-content: space-between; align-items: center;
  padding: .3rem .9rem; font-size: .68rem; color: #8a7350;
  background: linear-gradient(transparent, rgba(90,61,38,.08));
}
.pagina-pie .lnk { background: none; border: 0; cursor: pointer; color: #7a4a1a; font: inherit; }
.pagina-pie .lnk:hover { text-decoration: underline; }

/* controles */
.libro-controles { display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; justify-content: center; }
.libro-controles .ctrl {
  width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 1.1rem;
  border: 1px solid rgba(201,164,90,.5); background: rgba(14,17,22,.7); color: var(--gold);
  transition: transform .15s var(--ease);
}
.libro-controles .ctrl:hover:not(:disabled) { transform: scale(1.08); }
.libro-controles .ctrl:disabled { opacity: .35; cursor: default; }
.libro-controles .ira input {
  width: 56px; text-align: center; padding: .32rem .3rem; border-radius: 999px;
  border: 1px solid rgba(201,164,90,.4); background: rgba(0,0,0,.3); color: var(--paper); font-size: .74rem;
}
.posicion { color: var(--stone); font-size: .68rem; }
.buscador { position: relative; }
.buscador input {
  width: 160px; padding: .38rem .7rem; border-radius: 999px;
  border: 1px solid rgba(201,164,90,.4); background: rgba(0,0,0,.3); color: var(--paper);
  font-size: .76rem; font-family: var(--font-body);
}
.buscador-resultados {
  position: absolute; top: calc(100% + 6px); right: 0; z-index: 40;
  width: min(320px, 80vw); max-height: 260px; overflow-y: auto;
  background: linear-gradient(180deg, #2a1e13, #1a120b);
  border: 1px solid rgba(201,164,90,.45); border-radius: 10px;
  box-shadow: 0 14px 40px rgba(0,0,0,.6); padding: .35rem;
}
.buscador-resultados button {
  display: grid; gap: .12rem; width: 100%; text-align: left; cursor: pointer;
  background: none; border: 0; padding: .42rem .5rem; border-radius: 6px;
}
.buscador-resultados button:hover { background: rgba(201,164,90,.12); }
.br-pag { color: var(--gold); font-size: .6rem; letter-spacing: .06em; }
.br-ctx { color: var(--parchment); font-size: .76rem; font-family: var(--font-body); }
.sin-resultados { color: var(--stone); font-size: .7rem; text-align: center; margin: .4rem 0; }

/* pantalla completa (§9.3) */
.btn-ampliar {
  position: relative; justify-self: end;
  width: 34px; height: 34px; border-radius: 8px; cursor: pointer; font-size: 1rem;
  border: 1px solid rgba(201,164,90,.5); background: rgba(14,17,22,.7); color: var(--gold);
}
.btn-ampliar:hover { background: rgba(201,164,90,.18); }
.tip-ampliar {
  position: absolute; right: 0; bottom: calc(100% + 6px);
  background: linear-gradient(#3a2415, #241609); color: var(--paper);
  border: 1px solid rgba(201,164,90,.5); border-radius: 6px;
  font-family: ui-monospace, monospace; font-size: .6rem; letter-spacing: .1em;
  text-transform: uppercase; padding: .25rem .5rem; white-space: nowrap;
  opacity: 0; pointer-events: none; transition: opacity .15s ease;
}
.btn-ampliar:hover .tip-ampliar { opacity: 1; }
.libro-wrap.fs { position: fixed; inset: 0; z-index: 140; display: grid; place-content: center; gap: .5rem; justify-items: center; padding: 1.5vh 2vw; }
.fs-fondo { position: fixed; inset: 0; z-index: -1; background: rgba(5,6,10,.72); backdrop-filter: blur(5px); }
/* En pantalla completa manda el ALTO: el libro llena casi toda la ventana.
   OJO: StPageFlip escribe width:100% en el propio libro, así que su tamaño se
   controla desde AQUÍ, dando ancho a la columna. El ancho sale de la proporción
   de la hoja (--prop = alto ÷ ancho), para que quepa entero de alto. */
.libro-wrap.fs { grid-template-columns: min(94vw, calc(84vh / var(--prop, 1.38))); }
.libro-wrap.fs .libro { max-height: 88vh; }
.fs-cerrar {
  justify-self: end; width: 38px; height: 38px; border-radius: 50%; cursor: pointer; font-weight: 700;
  background: linear-gradient(180deg, #f2dc94, #c9a45a 55%, #87692f);
  border: 1px solid #1c120a; color: #241a12; box-shadow: 0 4px 10px rgba(0,0,0,.5);
}
`;export{d as t};