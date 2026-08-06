import{t as e}from"./react.CYuo-Lgd.js";import{n as t,t as n,u as r,x as i}from"./campaign.DEk2Juoy.js";import{t as a}from"./jsx-runtime.DvA2kLYf.js";import{t as o}from"./user.DppdupU9.js";import{a as s}from"./permisos.DXxETGNp.js";import{r as c}from"./galeria.Dewg0Zla.js";import{n as l}from"./markdown.BGZ25JWa.js";import{i as u}from"./notificaciones.CsEHjwjU.js";import{n as d}from"./Modal.CYKN6TeL.js";import{t as f}from"./BotonMod.D5uPzO-Y.js";import{t as p}from"./Comentarios.CDM2KiQ-.js";import{a as m,c as h,d as g,f as ee,i as _,l as v,n as y,o as b,r as x,s as S,t as C,u as w}from"./planeta.NCwYSTYR.js";var T=e(),E=a();function te({campanaId:e,lugares:t}){let[n,r]=(0,T.useState)({}),[i,a]=(0,T.useState)(null),[o,s]=(0,T.useState)(``),c=(0,T.useRef)(null);(0,T.useEffect)(()=>{if(e)return x(e,r)},[e]),(0,T.useEffect)(()=>{let e=!0,t=()=>{let e=c.current,t=typeof window<`u`?window.__engren?.lista:null;if(!e||!t?.length)return!1;let n=e.getContext(`2d`);e.width=720,e.height=360,n.clearRect(0,0,e.width,e.height);for(let r of t){let t=Math.asin(Math.max(-1,Math.min(1,r.y)))*180/Math.PI,i=(Math.atan2(r.x,r.z)*180/Math.PI+180)/360*e.width,a=(90-t)/180*e.height;n.fillStyle=`rgba(200, 226, 205, ${.35+.4*(r.b??.7)})`,n.fillRect(i,a,2.4,2.4)}return!0};if(!t()){let n=setInterval(()=>{(!e||t())&&clearInterval(n)},400);return()=>{e=!1,clearInterval(n)}}},[]);let l=g(t||[]),u=Object.fromEntries(l.map(e=>[e.id,e])),d=Object.entries(n).filter(([e])=>u[e]);async function f(t){if(!i){s(`Elige antes un lugar de la lista.`),setTimeout(()=>s(``),2500);return}let n=t.currentTarget.getBoundingClientRect(),r=(t.clientX-n.left)/n.width*360-180,o=90-(t.clientY-n.top)/n.height*180;try{await C(e,i,{lat:+o.toFixed(1),lon:+r.toFixed(1)}),a(null)}catch(e){s(`No se pudo guardar el pin (`+e.message+`).`),setTimeout(()=>s(``),6e3)}}return(0,E.jsxs)(`div`,{className:`mod-planeta`,children:[(0,E.jsxs)(`p`,{className:`mono muted`,style:{fontSize:`.68rem`,margin:0},children:[`Los lugares que marques aquí aparecen como pin sobre el planeta del Observatorio de`,(0,E.jsx)(`b`,{children:` esta campaña`}),`. Aunque el mundo y los lugares sean los mismos que en otra campaña, cada una decide qué enseña en su planeta.`]}),(0,E.jsxs)(`div`,{className:`chips`,style:{justifyContent:`flex-start`},children:[l.map(e=>{let t=!!n[e.id];return(0,E.jsxs)(`button`,{className:`chip ${i===e.id?`activo`:``} ${t?`puesto`:``}`,onClick:()=>i===e.id?a(null):a(e.id),title:t?`Ya está en el planeta: púlsalo y marca otro sitio para moverlo`:`Colocar en el planeta`,children:[t?`● `:`+ `,e.nombre]},e.id)}),l.length===0&&(0,E.jsx)(`span`,{className:`muted mono`,children:`Esta campaña todavía no tiene lugares.`})]}),(0,E.jsxs)(`div`,{className:`planisferio ${i?`colocando`:``}`,onClick:f,children:[(0,E.jsx)(`canvas`,{ref:c,className:`mundo`,"aria-hidden":`true`}),(0,E.jsx)(`span`,{className:`ecuador`,"aria-hidden":`true`}),(0,E.jsx)(`span`,{className:`meridiano`,"aria-hidden":`true`}),d.map(([e,t])=>(0,E.jsxs)(`span`,{className:`pin-plan`,style:{left:`${(t.lon+180)/360*100}%`,top:`${(90-t.lat)/180*100}%`},children:[(0,E.jsx)(`b`,{}),(0,E.jsx)(`em`,{children:u[e].nombre})]},e)),(0,E.jsx)(`span`,{className:`pista-plan mono`,children:i?`Pulsa dónde va «${u[i]?.nombre}»`:`Elige un lugar y pulsa aquí`})]}),d.length>0&&(0,E.jsx)(`table`,{className:`tabla-planeta`,children:(0,E.jsx)(`tbody`,{children:d.map(([t,n])=>(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`td`,{children:u[t].nombre}),(0,E.jsxs)(`td`,{className:`mono`,children:[`lat `,n.lat,` · lon `,n.lon]}),(0,E.jsx)(`td`,{children:(0,E.jsx)(`button`,{className:`quitar`,onClick:()=>y(e,t),children:`Quitar del planeta`})})]},t))})}),o&&(0,E.jsx)(`p`,{style:{color:`#f0a29c`,margin:0},children:o}),(0,E.jsx)(`style`,{children:D})]})}var D=`
.mod-planeta { display: grid; gap: .6rem; }
.mod-planeta .chip.puesto { border-color: var(--gold); color: var(--gold); }
.planisferio {
  position: relative; height: 210px; border-radius: 8px; overflow: hidden; cursor: pointer;
  border: 1px solid rgba(201,164,90,.35);
  background: linear-gradient(180deg, #0b1119, #101a29 60%, #0a1017);
}
/* las tierras del propio globo, para no colocar los pines a ciegas */
.planisferio .mundo { position: absolute; inset: 0; width: 100%; height: 100%; }
.planisferio.colocando { outline: 2px dashed var(--gold); }
.planisferio .ecuador { position: absolute; left: 0; right: 0; top: 50%; border-top: 1px dashed rgba(201,164,90,.3); }
.planisferio .meridiano { position: absolute; top: 0; bottom: 0; left: 50%; border-left: 1px dashed rgba(201,164,90,.3); }
.pin-plan { position: absolute; transform: translate(-50%,-50%); display: flex; align-items: center; gap: .3rem; }
.pin-plan b { width: 9px; height: 9px; border-radius: 50%; flex: none;
  background: radial-gradient(circle at 35% 30%, #f4dfa6, var(--gold)); box-shadow: 0 0 0 2px rgba(0,0,0,.55); }
.pin-plan em { font-style: normal; font-size: .62rem; color: var(--paper); text-shadow: 0 1px 3px #000; white-space: nowrap; }
.pista-plan {
  position: absolute; left: 50%; bottom: .4rem; transform: translateX(-50%);
  font-size: .58rem; letter-spacing: .1em; text-transform: uppercase; color: var(--stone);
  background: rgba(0,0,0,.55); padding: .15rem .5rem; border-radius: 999px; pointer-events: none;
}
.tabla-planeta { width: 100%; border-collapse: collapse; font-size: .8rem; }
.tabla-planeta td { padding: .25rem .4rem; border-bottom: 1px solid rgba(201,164,90,.15); }
.tabla-planeta .mono { color: var(--stone); font-size: .68rem; }
.quitar {
  background: none; border: 1px solid rgba(200,110,100,.45); color: #f0a29c; border-radius: 999px;
  padding: .1rem .5rem; cursor: pointer; font-family: ui-monospace, monospace; font-size: .62rem;
}
.quitar:hover { background: rgba(164,68,58,.25); }
`;function ne({campanaId:e,campanaPropia:t,autor:n,visible:r,heredadoDe:i=``,alDejarHerencia:a=null}){let[o,s]=(0,T.useState)([]),[l,d]=(0,T.useState)(null),[p,m]=(0,T.useState)(null),[h,v]=(0,T.useState)(``),[y,x]=(0,T.useState)(null),S=(0,T.useRef)(null);(0,T.useEffect)(()=>{if(!(!e||!r))return ee(e,s)},[e,r]),(0,T.useEffect)(()=>{let e=o.find(e=>e.id===l);m(e?{...e}:null)},[l,o.length]);let C=e=>({value:p?.[e]??``,onChange:t=>m({...p,[e]:t.target.value})});async function w(){if(!p?.nombre?.trim()){v(`El lugar necesita un nombre.`);return}let{id:t,...n}=p;await _(e,t,n),v(`Guardado.`),setTimeout(()=>v(``),2200)}async function D(){let t=await b(e,{nombre:`Lugar nuevo`});await u(e,{tipo:`lugar_creado`,actor:n,resumen:t.nombre}),d(t.id)}async function ne(t){if(!(!t||!p))try{let{dataUrl:n}=await c(t,{maxLado:1600,maxBytes:300*1024});m({...p,mapaUrl:n}),await _(e,p.id,{mapaUrl:n})}catch(e){v(`No se pudo subir el mapa: `+e.message)}}function A(t){if(!y||!p)return;let n=t.currentTarget.getBoundingClientRect(),r=(t.clientX-n.left)/n.width*100,i=(t.clientY-n.top)/n.height*100,a={...p.pines||{},[y]:{x:+r.toFixed(1),y:+i.toFixed(1)}};m({...p,pines:a}),_(e,p.id,{pines:a}),x(null)}async function j(t){let n={...p.pines||{}};delete n[t],m({...p,pines:n}),await _(e,p.id,{pines:n})}async function re(){for(let t of o)!!t.esPredeterminado!=(t.id===p.id)&&await _(e,t.id,{esPredeterminado:t.id===p.id});m({...p,esPredeterminado:!0})}let M=g(o.filter(e=>e.id!==l));return(0,E.jsxs)(f,{sala:!0,visible:r,titulo:`Lugares de la campaña`,etiqueta:`Moderar categoría`,children:[(0,E.jsxs)(`details`,{className:`bloque-planeta`,open:!!i,children:[(0,E.jsx)(`summary`,{children:`Pines del planeta del Observatorio`}),(0,E.jsx)(te,{campanaId:t||e,lugares:o})]}),i?(0,E.jsxs)(`div`,{className:`stack`,children:[(0,E.jsxs)(`p`,{children:[`Esta campaña usa la cartografía de `,(0,E.jsx)(`b`,{children:i}),`. Mientras la herede, los mapas y los lugares se editan allí y los cambios se ven en todas las campañas que heredan.`]}),(0,E.jsx)(`p`,{className:`mono muted`,style:{fontSize:`.68rem`},children:`Si cortas la herencia, esta campaña empieza sin lugares y podrás crear los suyos. Se puede volver a heredar desde Moderación.`}),(0,E.jsx)(`div`,{children:(0,E.jsx)(`button`,{className:`btn`,onClick:()=>a?.(),disabled:!a,children:`Dejar de heredar y crear mapas propios`})})]}):(0,E.jsxs)(`div`,{className:`mod-lugares`,children:[(0,E.jsxs)(`aside`,{className:`lista`,children:[(0,E.jsx)(`button`,{className:`btn`,onClick:D,children:`+ Nuevo lugar`}),(0,E.jsxs)(`ul`,{children:[g(o).map(e=>(0,E.jsx)(`li`,{children:(0,E.jsxs)(`button`,{className:l===e.id?`sel`:``,onClick:()=>d(e.id),children:[e.nombre,e.esPredeterminado&&(0,E.jsx)(`span`,{className:`mono etq`,children:`inicio`})]})},e.id)),o.length===0&&(0,E.jsx)(`li`,{className:`muted mono`,children:`Sin lugares todavía.`})]})]}),(0,E.jsx)(`section`,{className:`detalle`,children:p?(0,E.jsxs)(`div`,{className:`stack`,children:[(0,E.jsxs)(`div`,{className:`barra-guardar`,children:[(0,E.jsx)(`button`,{className:`btn`,onClick:w,children:`Guardar lugar`}),(0,E.jsx)(O,{campanaId:e,id:p.id,alBorrar:()=>d(null)}),h&&(0,E.jsx)(`span`,{className:`mono`,style:{color:h.startsWith(`No`)||h.startsWith(`El`)?`#f0a29c`:`#9fd07a`},children:h})]}),(0,E.jsxs)(`label`,{className:`lbl`,children:[`Nombre `,(0,E.jsx)(`input`,{className:`inp`,...C(`nombre`)})]}),(0,E.jsxs)(`label`,{className:`lbl`,children:[`Resumen (el recuadro del pin) `,(0,E.jsx)(`input`,{className:`inp`,...C(`resumen`)})]}),(0,E.jsxs)(`label`,{className:`lbl`,children:[`Información (markdown)`,(0,E.jsx)(`textarea`,{className:`inp`,style:{minHeight:`110px`},...C(`infoMd`)})]}),(0,E.jsxs)(`label`,{className:`lbl`,children:[`Pertenece a`,(0,E.jsxs)(`select`,{className:`inp`,value:p.superior||``,onChange:e=>m({...p,superior:e.target.value}),children:[(0,E.jsx)(`option`,{value:``,children:`— ninguno (lugar raíz) —`}),M.map(e=>(0,E.jsx)(`option`,{value:e.id,children:e.nombre},e.id))]})]}),(0,E.jsxs)(`div`,{className:`fila`,children:[(0,E.jsx)(`button`,{className:`btn ghost`,onClick:()=>S.current?.click(),children:p.mapaUrl?`Cambiar mapa`:`Subir mapa`}),p.mapaUrl&&(0,E.jsx)(`button`,{className:`btn ghost`,onClick:()=>m({...p,mapaUrl:``}),children:`Quitar mapa`}),(0,E.jsx)(`button`,{className:`btn ghost`,onClick:re,disabled:p.esPredeterminado,children:p.esPredeterminado?`Es el mapa inicial`:`Usar como mapa inicial`}),(0,E.jsx)(`input`,{ref:S,type:`file`,accept:`image/*`,hidden:!0,onChange:e=>ne(e.target.files?.[0])})]}),(0,E.jsxs)(`div`,{className:`mini-mapa ${y?`colocando`:``}`,onClick:A,children:[p.mapaUrl?(0,E.jsx)(`img`,{src:p.mapaUrl,alt:``}):(0,E.jsx)(`span`,{className:`mono muted`,children:`Sin mapa`}),Object.entries(p.pines||{}).map(([e,t])=>(0,E.jsx)(`span`,{className:`pin-mini`,style:{left:`${t.x}%`,top:`${t.y}%`},title:o.find(t=>t.id===e)?.nombre||e,children:(0,E.jsx)(`b`,{})},e)),y&&(0,E.jsx)(`span`,{className:`aviso-colocar mono`,children:`Pulsa donde va el pin`})]}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`p`,{className:`mono muted`,style:{margin:`0 0 .3rem`},children:`Pines en este mapa`}),(0,E.jsxs)(`div`,{className:`chips`,style:{justifyContent:`flex-start`},children:[M.map(e=>{let t=!!(p.pines||{})[e.id];return(0,E.jsxs)(`button`,{className:`chip ${t?`activo`:``}`,onClick:()=>t?j(e.id):x(e.id),title:t?`Quitar el pin`:`Colocar el pin en el mapa`,children:[e.nombre,t?` ✕`:` +`]},e.id)}),M.length===0&&(0,E.jsx)(`span`,{className:`muted mono`,children:`Crea más lugares para poder anclarlos.`})]})]}),(0,E.jsx)(`p`,{className:`mono muted`,style:{fontSize:`.66rem`},children:`Para que este lugar salga sobre el planeta, colócalo en «Pines del planeta del Observatorio», arriba: cada campaña elige los suyos.`})]}):(0,E.jsx)(`p`,{className:`muted`,children:`Elige un lugar de la lista o crea uno nuevo.`})})]}),(0,E.jsx)(`style`,{children:k})]})}function O({campanaId:e,id:t,alBorrar:n}){let r=d(async()=>{await S(e,t),n()});return(0,E.jsx)(`button`,{className:`btn ghost`,style:{borderColor:`#a44`,color:`#e99`},onClick:r.pulsar,children:r.texto(`Eliminar lugar`)})}var k=`
.bloque-planeta {
  border: 1px solid rgba(201,164,90,.3); border-radius: 8px; padding: .5rem .7rem;
  background: rgba(0,0,0,.2); margin-bottom: .9rem;
}
.bloque-planeta > summary {
  cursor: pointer; font-family: ui-monospace, monospace; font-size: .66rem;
  letter-spacing: .12em; text-transform: uppercase; color: var(--gold);
}
.bloque-planeta[open] > summary { margin-bottom: .6rem; }
.mod-lugares { display: grid; grid-template-columns: 190px minmax(0,1fr); gap: 1rem; }
.mod-lugares .lista ul { list-style: none; margin: .6rem 0 0; padding: 0; display: grid; gap: .2rem; max-height: 320px; overflow-y: auto; }
.mod-lugares .lista button {
  width: 100%; text-align: left; background: none; border: 0; cursor: pointer; padding: .35rem .4rem;
  color: var(--paper); font-family: var(--font-body); font-size: .86rem; border-radius: 6px;
  display: flex; align-items: center; gap: .35rem; flex-wrap: wrap;
}
.mod-lugares .lista button:hover { background: rgba(201,164,90,.1); }
.mod-lugares .lista button.sel { background: rgba(201,164,90,.22); color: var(--gold); }
.etq { font-size: .52rem; letter-spacing: .08em; text-transform: uppercase; color: var(--gold);
  border: 1px solid rgba(201,164,90,.45); border-radius: 999px; padding: 0 .3rem; }
.detalle { min-width: 0; }
.barra-guardar {
  position: sticky; top: 0; z-index: 3;
  display: flex; align-items: center; gap: .5rem; flex-wrap: wrap;
  padding: .5rem 0 .6rem; margin-bottom: .2rem;
  background: linear-gradient(180deg, rgba(30,21,13,.98) 70%, rgba(30,21,13,0));
}
.barra-guardar .mono { font-size: .68rem; }
.fila { display: flex; gap: .5rem; flex-wrap: wrap; align-items: flex-end; }
.mini-mapa {
  position: relative; height: 190px; border-radius: 6px; overflow: hidden; display: grid; place-items: center;
  background: linear-gradient(160deg, rgba(74,51,32,.6), rgba(26,18,11,.9)); border: 1px solid rgba(201,164,90,.3);
}
.mini-mapa.colocando { cursor: crosshair; outline: 2px dashed var(--gold); }
.mini-mapa img { width: 100%; height: 100%; object-fit: contain; }
.pin-mini { position: absolute; transform: translate(-50%,-50%); }
.pin-mini b { display: block; width: 10px; height: 10px; border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #f4dfa6, var(--gold)); box-shadow: 0 0 0 2px rgba(0,0,0,.5); }
.aviso-colocar { position: absolute; bottom: .4rem; left: 50%; transform: translateX(-50%);
  background: rgba(0,0,0,.7); color: var(--gold); font-size: .6rem; padding: .2rem .5rem; border-radius: 999px; }
.check { display: flex; align-items: center; gap: .5rem; font-family: var(--font-body); color: var(--paper); font-size: .86rem; cursor: pointer; }
.lbl { display: grid; gap: .25rem; font-family: var(--font-ui); font-size: .78rem; color: var(--parchment); }
.inp { padding: .45rem .6rem; border-radius: 7px; border: 1px solid rgba(201,164,90,.35);
  background: rgba(0,0,0,.3); color: var(--paper); font-family: var(--font-body); font-size: .9rem; width: 100%; }
@media (max-width: 640px) { .mod-lugares { grid-template-columns: 1fr; } }
`,A=[`#c9564f`,`#c9a45a`,`#6f9e5c`,`#5f93b8`],j=.6,re=6;function M(){let e=i(n),a=i(t),c=i(o),[u,d]=(0,T.useState)([]),[f,_]=(0,T.useState)(null),[y,b]=(0,T.useState)({x:0,y:0,z:1}),[x,S]=(0,T.useState)(null),[C,te]=(0,T.useState)(A[0]),[D,O]=(0,T.useState)(`circulo`),[k,M]=(0,T.useState)(null),[N,ae]=(0,T.useState)(!1),[oe,P]=(0,T.useState)(null),[F,se]=(0,T.useState)(!1),[I,ce]=(0,T.useState)({w:0,h:0}),L=(0,T.useRef)(null),R=(0,T.useRef)(null),le=(0,T.useRef)(null),ue=(0,T.useRef)(null),z=(0,T.useRef)(null),B=(0,T.useRef)(null);(0,T.useEffect)(()=>se(!0),[]),ue.current=x;let V=e?.categorias?.cartografia?.heredaDe||e?.id,H=a.find(e=>e.id===V),U=!!V&&V!==e?.id;(0,T.useEffect)(()=>{if(V)return ee(V,e=>{d(e),_(t=>t&&e.some(e=>e.id===t)?t:w(e)?.id||null)})},[V]),(0,T.useEffect)(()=>{let e=0,t=t=>{let n=t.detail?.lugarId;n&&(_(n),P(n),clearTimeout(e),e=setTimeout(()=>P(null),5e3))};return window.addEventListener(`phaingea:abrir-lugar`,t),()=>{clearTimeout(e),window.removeEventListener(`phaingea:abrir-lugar`,t)}},[]);let W=u.find(e=>e.id===f)||null,G=v(u,f),de=!!G&&G.id!==f,fe=G?.pines||{},K=Object.fromEntries(u.map(e=>[e.id,e])),q=V&&f?`phaingea_dibujo_${V}_${f}`:null;(0,T.useEffect)(()=>{let e=L.current;if(!e||!q)return;let t=e.getContext(`2d`);t.clearRect(0,0,e.width,e.height);let n=localStorage.getItem(q);if(n){let e=new Image;e.onload=()=>t.drawImage(e,0,0),e.src=n}},[q]);function pe(){let e=L.current;if(!(!e||!q))try{localStorage.setItem(q,e.toDataURL(`image/png`))}catch{}}function me(){let e=L.current;e&&(e.getContext(`2d`).clearRect(0,0,e.width,e.height),q&&localStorage.removeItem(q))}function J(e){let t=L.current,n=t.getBoundingClientRect();return{x:(e.clientX-n.left)/n.width*t.width,y:(e.clientY-n.top)/n.height*t.height}}function he(e){if(P(null),x===`compas`||x===`pano`){let t=J(e);B.current={inicio:t,ultimo:t},e.currentTarget.setPointerCapture?.(e.pointerId);return}x!==`lupa`&&(z.current={x:e.clientX,y:e.clientY,vx:y.x,vy:y.y},e.currentTarget.setPointerCapture?.(e.pointerId))}function ge(e){if(x===`lupa`){let t=R.current.getBoundingClientRect();M({x:e.clientX-t.left,y:e.clientY-t.top});return}if(B.current){let t=L.current.getContext(`2d`),n=J(e);x===`pano`?(t.save(),t.globalCompositeOperation=`destination-out`,t.lineWidth=26,t.lineCap=`round`,t.beginPath(),t.moveTo(B.current.ultimo.x,B.current.ultimo.y),t.lineTo(n.x,n.y),t.stroke(),t.restore()):D===`libre`&&(t.strokeStyle=C,t.lineWidth=3,t.lineCap=`round`,t.beginPath(),t.moveTo(B.current.ultimo.x,B.current.ultimo.y),t.lineTo(n.x,n.y),t.stroke()),B.current.ultimo=n;return}let t=z.current;if(!t)return;let n=t.vx+(e.clientX-t.x),r=t.vy+(e.clientY-t.y);b(e=>Z({...e,x:n,y:r}))}function _e(e){if(B.current){if(x===`compas`&&D===`circulo`){let t=L.current.getContext(`2d`),n=J(e),r=Math.hypot(n.x-B.current.inicio.x,n.y-B.current.inicio.y);t.strokeStyle=C,t.lineWidth=3,t.beginPath(),t.arc(B.current.inicio.x,B.current.inicio.y,r,0,Math.PI*2),t.stroke()}B.current=null,pe();return}z.current=null}let Y=(0,T.useRef)(null),ve=(0,T.useRef)(e=>e);(0,T.useEffect)(()=>{let e=Y.current;if(!e)return;let t=e=>{e.preventDefault(),!ue.current&&b(t=>ve.current({...t,z:Math.min(re,Math.max(j,t.z*(e.deltaY>0?.9:1.1)))}))};return e.addEventListener(`wheel`,t,{passive:!1}),()=>e.removeEventListener(`wheel`,t)},[F]);function X(){let e=le.current,t=Y.current;if(!e||!t||!e.naturalWidth)return;let n=Math.min(t.clientWidth/e.naturalWidth,t.clientHeight/e.naturalHeight);ce({w:Math.round(e.naturalWidth*n),h:Math.round(e.naturalHeight*n)})}(0,T.useEffect)(()=>{X();let e=new ResizeObserver(()=>X());Y.current&&e.observe(Y.current);let t=()=>setTimeout(X,60);return window.addEventListener(`phaingea:vista`,t),()=>{e.disconnect(),window.removeEventListener(`phaingea:vista`,t)}},[F,f]);function Z(e){let t=Y.current;if(!t||!I.w)return e;let n=Math.max(0,(I.w*e.z-t.clientWidth)/2),r=Math.max(0,(I.h*e.z-t.clientHeight)/2);return{...e,x:Math.max(-n,Math.min(n,e.x)),y:Math.max(-r,Math.min(r,e.y))}}ve.current=Z;function Q(e){_(e),P(null),b({x:0,y:0,z:1}),ae(!0)}if(!F)return null;let ye=m(u,f),$=g(h(u,f)),be=W?.superior?g(h(u,W.superior)):[],xe=$.length?$:be,Se=s(c,e);return(0,E.jsxs)(`div`,{className:`mapa-viewer`,children:[(0,E.jsx)(ne,{campanaId:V,campanaPropia:e?.id,autor:c?.nombre,visible:Se,heredadoDe:U?H?.nombre||V:``,alDejarHerencia:()=>r(e?.id,`cartografia`)}),(0,E.jsxs)(`div`,{className:`herramientas`,children:[[`lupa`,`compas`,`pano`].map(e=>(0,E.jsxs)(`button`,{className:`herramienta ${e} ${x===e?`cogida`:``}`,onClick:()=>{S(x===e?null:e),M(null)},title:x===e?`Devolver al gancho`:{lupa:`Lupa`,compas:`Compás`,pano:`Paño`}[e],children:[(0,E.jsx)(`span`,{className:`gancho`,"aria-hidden":`true`}),x!==e&&(0,E.jsx)(`span`,{className:`util`,"aria-hidden":`true`}),(0,E.jsx)(`span`,{className:`h-nombre`,children:{lupa:`Lupa`,compas:`Compás`,pano:`Paño`}[e]})]},e)),x===`compas`&&(0,E.jsxs)(`div`,{className:`opciones-compas`,children:[(0,E.jsx)(`div`,{className:`colores`,children:A.map(e=>(0,E.jsx)(`button`,{className:`color ${C===e?`sel`:``}`,style:{background:e},onClick:()=>te(e),"aria-label":`Color ${e}`},e))}),(0,E.jsxs)(`div`,{className:`modos mono`,children:[(0,E.jsx)(`button`,{className:D===`circulo`?`sel`:``,onClick:()=>O(`circulo`),children:`círculo`}),(0,E.jsx)(`button`,{className:D===`libre`?`sel`:``,onClick:()=>O(`libre`),children:`libre`})]})]}),x===`pano`&&(0,E.jsx)(`button`,{className:`btn ghost limpiar mono`,onClick:me,children:`Limpiar todo`})]}),(0,E.jsxs)(`div`,{className:`marco-madera`,ref:R,children:[W?.superior&&K[W.superior]&&(0,E.jsxs)(`button`,{className:`btn-atras`,onClick:()=>Q(W.superior),title:`Volver a ${K[W.superior].nombre}`,children:[`‹ `,(0,E.jsx)(`span`,{children:K[W.superior].nombre})]}),(0,E.jsxs)(`div`,{className:`mapa-hueco ${x?`con-`+x:``}`,onPointerDown:he,onPointerMove:ge,onPointerUp:_e,onPointerLeave:()=>M(null),ref:Y,children:[(0,E.jsxs)(`div`,{className:`mapa-lienzo`,style:{width:I.w||`100%`,height:I.h||`100%`,transform:`translate(-50%, -50%) translate(${y.x}px, ${y.y}px) scale(${y.z})`},children:[G?(0,E.jsx)(`img`,{ref:le,src:G.mapaUrl,alt:G.nombre,draggable:`false`,onLoad:X}):(0,E.jsx)(`div`,{className:`mapa-vacio mono`,children:`Este lugar todavía no tiene mapa.`}),Object.entries(fe).map(([e,t])=>(0,E.jsxs)(`button`,{className:`pin ${e===f?`actual`:``} ${e===oe?`resaltado`:``}`,style:{left:`${t.x}%`,top:`${t.y}%`,transform:`translate(-50%, -50%) scale(${1/y.z})`},onPointerDown:t=>{t.stopPropagation(),Q(e)},onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&Q(e)},"aria-label":`Abrir ${K[e]?.nombre||`lugar`}`,children:[(0,E.jsx)(`b`,{}),(0,E.jsx)(`em`,{children:K[e]?.nombre||`—`})]},e)),(0,E.jsx)(`canvas`,{ref:L,width:1400,height:900,className:`capa-dibujo`})]}),x===`lupa`&&k&&G&&(0,E.jsx)(`div`,{className:`lente`,style:{left:k.x,top:k.y,backgroundImage:`url(${G.mapaUrl})`,backgroundSize:`${R.current?.clientWidth*2.2}px auto`,backgroundPosition:`${-k.x*2.2+80}px ${-k.y*2.2+80}px`}})]})]}),(0,E.jsxs)(`div`,{className:`info-lugar`,children:[ye.length>1&&(0,E.jsx)(`p`,{className:`migas mono`,children:ye.map((e,t)=>(0,E.jsxs)(`span`,{children:[t>0&&` › `,(0,E.jsx)(`button`,{onClick:()=>Q(e.id),children:e.nombre})]},e.id))}),(0,E.jsx)(`h3`,{className:`nombre-lugar`,children:W?.nombre||`Sin lugares todavía`}),W?.resumen&&(0,E.jsx)(`p`,{className:`resumen-lugar`,children:W.resumen}),W?.imagenUrl&&(0,E.jsx)(`img`,{className:`foto-lugar`,src:W.imagenUrl,alt:``}),de&&(0,E.jsxs)(`p`,{className:`mono aviso-herencia-carto`,children:[`Este lugar no tiene mapa propio · se muestra el de «`,G.nombre,`»`]}),U&&(0,E.jsxs)(`p`,{className:`mono aviso-herencia-carto`,children:[`Mapas heredados de «`,H?.nombre||V,`» · solo lectura`]}),W&&(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(`button`,{className:`desplegable mono`,onClick:()=>ae(e=>!e),"aria-expanded":N,children:[`Mostrar información `,(0,E.jsx)(`span`,{className:`flecha ${N?`abierta`:``}`,children:`▾`})]}),N&&(0,E.jsx)(`div`,{className:`papel-info`,children:W.infoMd?(0,E.jsx)(`div`,{className:`pagina-md`,dangerouslySetInnerHTML:{__html:l(W.infoMd)}}):(0,E.jsx)(`p`,{className:`muted`,children:`El máster aún no ha escrito información de este lugar.`})})]}),xe.length>0&&(0,E.jsxs)(`div`,{className:`lista-lugares`,children:[(0,E.jsx)(`p`,{className:`mono muted`,children:$.length?`Lugares que contiene`:`Otros lugares`}),(0,E.jsx)(`ul`,{children:xe.map(e=>(0,E.jsx)(`li`,{children:(0,E.jsx)(`button`,{onClick:()=>Q(e.id),children:e.nombre})},e.id))})]})]}),W&&(0,E.jsx)(p,{tipo:`cartografia`,refId:W.id}),(0,E.jsx)(`style`,{children:ie})]})}var ie=`
.mapa-viewer { display: grid; grid-template-columns: auto minmax(0,1fr); gap: clamp(.6rem,2vw,1.6rem); align-items: start; }
.mapa-viewer > .info-lugar, .mapa-viewer > .comments { grid-column: 1 / -1; }
.herramientas { display: grid; gap: 1.1rem; padding-top: .4rem; justify-items: center; }
.herramienta { position: relative; width: 56px; display: grid; justify-items: center; background: none; border: 0; padding: 0; cursor: pointer; }
.herramienta .gancho { width: 12px; height: 14px; border: 2px solid #9aa0a8; border-top: 0; border-radius: 0 0 8px 8px; }
.herramienta .util { width: 34px; height: 34px; margin-top: -2px; filter: drop-shadow(0 3px 5px rgba(0,0,0,.6)); }
.herramienta.lupa .util { border-radius: 50%; border: 3px solid #b9a27a; background: radial-gradient(circle at 35% 30%, rgba(255,255,255,.35), rgba(180,200,220,.18)); position: relative; }
.herramienta.lupa .util::after { content:''; position:absolute; right:-4px; bottom:-10px; width:5px; height:16px; border-radius:3px; background:linear-gradient(#8a6d34,#4a3a1a); transform:rotate(-35deg); }
.herramienta.compas .util { position: relative; }
.herramienta.compas .util::before, .herramienta.compas .util::after { content:''; position:absolute; top:2px; left:16px; width:3px; height:30px; border-radius:2px; background:linear-gradient(#c9b48a,#6b5730); transform-origin: top center; }
.herramienta.compas .util::before { transform: rotate(-16deg); }
.herramienta.compas .util::after { transform: rotate(16deg); }
.herramienta.pano .util { border-radius:4px 4px 10px 10px; background:linear-gradient(160deg,#9c8f78,#6d6353); clip-path: polygon(0 0,100% 0,100% 82%,76% 100%,50% 86%,24% 100%,0 82%); }
.herramienta.cogida .h-nombre { color: var(--gold); }
.herramienta.cogida .gancho { border-color: var(--gold); }
.h-nombre { margin-top: .35rem; font-family: ui-monospace, monospace; font-size: .58rem; letter-spacing: .1em; text-transform: uppercase; color: var(--stone); }
.opciones-compas { display: grid; gap: .4rem; justify-items: center; }
.colores { display: flex; gap: .25rem; }
.colores .color { width: 16px; height: 16px; border-radius: 50%; border: 1px solid rgba(0,0,0,.5); cursor: pointer; }
.colores .color.sel { box-shadow: 0 0 0 2px var(--gold); }
.modos { display: flex; gap: .3rem; }
.modos button { font-size: .58rem; background: none; border: 1px solid rgba(201,164,90,.35); color: var(--parchment); border-radius: 999px; padding: .1rem .4rem; cursor: pointer; }
.modos button.sel { background: rgba(201,164,90,.25); color: var(--paper); }
.limpiar { font-size: .6rem; padding: .25rem .5rem; }

.btn-atras {
  position: absolute; left: 26px; top: 26px; z-index: 6; cursor: pointer;
  display: inline-flex; align-items: center; gap: .35rem;
  background: rgba(24,16,9,.82); border: 1px solid rgba(201,164,90,.5); color: var(--gold);
  border-radius: 999px; padding: .3rem .7rem;
  font-family: ui-monospace, monospace; font-size: .66rem; letter-spacing: .06em;
  box-shadow: 0 4px 12px rgba(0,0,0,.5);
}
.btn-atras:hover { background: rgba(201,164,90,.25); color: var(--paper); }
.btn-atras span { max-width: 16ch; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.marco-madera { position: relative; padding: 18px; border-radius: 6px;
  background: linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.35)), linear-gradient(135deg,#6b4a2c,#3a2618 70%);
  box-shadow: 0 16px 40px rgba(0,0,0,.6), inset 0 0 0 2px rgba(201,164,90,.35), inset 0 2px 0 rgba(255,255,255,.12); }
.mapa-hueco { position: relative; height: min(56vh, 500px); overflow: hidden; border-radius: 3px; cursor: grab;
  background: radial-gradient(120% 90% at 50% 30%, rgba(201,164,90,.12), transparent 60%), linear-gradient(160deg, rgba(74,51,32,.7), rgba(26,18,11,.92)); }
.mapa-hueco.con-lupa { cursor: zoom-in; }
.mapa-hueco.con-compas, .mapa-hueco.con-pano { cursor: crosshair; }
/* El lienzo tiene EXACTAMENTE el tamaño del mapa dibujado (lo calcula
   medirMapa), así los pines en % caen sobre el punto correcto. Se centra con
   left/top al 50% y el translate(-50%,-50%) del propio transform. */
.mapa-lienzo { position: absolute; left: 50%; top: 50%; transform-origin: center; }
.mapa-lienzo img { width: 100%; height: 100%; display: block; user-select: none; }
.mapa-vacio { color: var(--stone); font-size: .8rem; letter-spacing: .08em; }
.capa-dibujo { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
/* Pin: solo el punto. El nombre aparece al pasar por encima (o al enfocarlo
   con el teclado) sobre una placa oscura, para que se lea bien sobre el
   pergamino claro del mapa (§10.3). */
.pin { position: absolute; display: flex; align-items: center; background: none; border: 0; cursor: pointer; padding: 4px; }
/* marrón oscuro: se lee sobre el pergamino claro del mapa */
.pin b { width: 12px; height: 12px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #6b452a, #2e1c0e 70%); box-shadow: 0 0 0 3px rgba(46,28,14,.18), 0 2px 5px rgba(0,0,0,.45); transition: transform .15s var(--ease); }
.pin:hover b, .pin:focus-visible b { transform: scale(1.25); }
.pin em {
  position: absolute; left: 50%; top: calc(100% + 2px); transform: translateX(-50%);
  font-family: var(--font-title); font-style: normal; font-size: .78rem; white-space: nowrap;
  color: var(--paper); background: rgba(18,13,8,.88);
  border: 1px solid rgba(201,164,90,.6); border-radius: 5px; padding: .1rem .4rem;
  box-shadow: 0 2px 8px rgba(0,0,0,.5);
  opacity: 0; pointer-events: none; transition: opacity .15s ease;
}
.pin:hover em, .pin:focus-visible em { opacity: 1; }
/* el lugar en el que estás, señalado sobre el mapa prestado del que lo contiene */
.pin.actual b { background: radial-gradient(circle at 35% 30%, #a5713f, #4a2a12 70%); box-shadow: 0 0 0 4px rgba(201,164,90,.55), 0 0 10px rgba(120,72,30,.8); }
/* Solo el recién llegado desde el Observatorio ensena el nombre fijo, y se
   apaga sola a los pocos segundos o en cuanto tocas el mapa. */
.pin.resaltado em { opacity: 1; }
.pin.resaltado b { animation: latido 1.2s ease-in-out 3; }
@keyframes latido {
  0%, 100% { box-shadow: 0 0 0 4px rgba(201,164,90,.55); }
  50% { box-shadow: 0 0 0 9px rgba(201,164,90,.12), 0 0 14px rgba(228,183,91,.7); }
}
.lente { position: absolute; width: 160px; height: 160px; border-radius: 50%; transform: translate(-50%,-50%);
  border: 3px solid #b9a27a; box-shadow: 0 8px 24px rgba(0,0,0,.6), inset 0 0 30px rgba(255,255,255,.15); pointer-events: none; background-repeat: no-repeat; }
.resumen-lugar { color: var(--parchment); font-family: var(--font-body); font-size: .9rem; margin: .2rem 0 .4rem; }
.foto-lugar { max-width: 260px; border-radius: 8px; margin-bottom: .5rem; border: 1px solid rgba(201,164,90,.3); }
.ficha-pin { position: absolute; right: 24px; bottom: 24px; width: min(260px, 70%); z-index: 6;
  background: linear-gradient(180deg, rgba(42,30,19,.97), rgba(26,18,11,.98)); border: 1px solid rgba(201,164,90,.45);
  border-radius: 10px; padding: .9rem 1rem; box-shadow: 0 16px 40px rgba(0,0,0,.6); }
.ficha-pin h4 { font-family: var(--font-title); color: var(--gold-soft); margin: 0 0 .4rem; font-size: 1.05rem; }
.ficha-pin img { width: 100%; border-radius: 6px; margin-bottom: .5rem; }
.ficha-pin p { font-size: .84rem; margin: 0 0 .7rem; }
.cerrar-pin { position: absolute; top: .4rem; right: .4rem; width: 22px; height: 22px; border-radius: 50%; cursor: pointer;
  background: rgba(201,164,90,.15); border: 1px solid rgba(201,164,90,.4); color: var(--gold); font-size: .7rem; }

.info-lugar { margin-top: 1.2rem; }
.aviso-herencia-carto { font-size: .62rem; letter-spacing: .1em; text-transform: uppercase; color: var(--stone); margin: -.2rem 0 .5rem; }
.migas { font-size: .66rem; color: var(--stone); margin: 0 0 .2rem; }
.migas button { background: none; border: 0; cursor: pointer; color: var(--stone); font: inherit; padding: 0; }
.migas button:hover { color: var(--gold); text-decoration: underline; }
.nombre-lugar { font-family: var(--font-title); color: var(--gold-soft); font-size: 1.5rem; margin: 0 0 .5rem; }
.desplegable { background: none; border: 1px solid rgba(201,164,90,.35); border-radius: 999px; color: var(--parchment);
  font-size: .68rem; letter-spacing: .08em; text-transform: uppercase; padding: .3rem .8rem; cursor: pointer; }
.desplegable:hover { border-color: var(--gold); color: var(--gold); }
.flecha { display: inline-block; transition: transform .2s var(--ease); }
.flecha.abierta { transform: rotate(180deg); }
.papel-info { margin-top: .8rem; padding: 1.1rem 1.3rem; border-radius: 3px; color: #3a2a16;
  background: radial-gradient(120% 90% at 20% 10%, rgba(255,255,255,.5), transparent 55%), linear-gradient(160deg,#efe3c6,#ddcba2 70%);
  box-shadow: 0 10px 26px rgba(0,0,0,.45); }
.papel-info .pagina-md h3, .papel-info .pagina-md h4 { font-family: var(--font-title); color: #5a3d26; margin: 0 0 .4rem; }
.papel-info .pagina-md p { margin: 0 0 .5rem; line-height: 1.55; }
.lista-lugares { margin-top: 1rem; }
.lista-lugares ul { list-style: none; margin: .3rem 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: .4rem; }
.lista-lugares button { background: rgba(201,164,90,.08); border: 1px solid rgba(201,164,90,.3); border-radius: 999px;
  color: var(--parchment); font-family: var(--font-body); font-size: .82rem; padding: .3rem .8rem; cursor: pointer; }
.lista-lugares button:hover { color: var(--paper); border-color: var(--gold); }

@media (max-width: 720px) {
  .mapa-viewer { grid-template-columns: 1fr; }
  .herramientas { grid-auto-flow: column; justify-content: center; }
}
`;export{M as default};