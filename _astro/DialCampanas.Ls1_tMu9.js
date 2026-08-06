import{t as e}from"./react.CYuo-Lgd.js";import{i as t,n,t as r,x as i}from"./campaign.DEk2Juoy.js";import{t as a}from"./jsx-runtime.DvA2kLYf.js";import{t as o}from"./user.DppdupU9.js";import{t as s}from"./permisos.DXxETGNp.js";var c=e(),l=a(),u=47,d=8,f=34,p=88,m=22;function h(e,t){let n=Math.floor(t/2),r=t-n,i=Math.max(n,r),a=i>1?Math.min(f,(p-m)/(i-1)):f;return e<n?-(m+(n-1-e)*a):m+(e-n)*a}function g(){let e=i(n),t=i(r),a=i(o),[f,p]=(0,c.useState)(0),[m,g]=(0,c.useState)(null),[y,b]=(0,c.useState)(!1),x=(0,c.useRef)(null);(0,c.useEffect)(()=>b(!0),[]);let S=s(a,e),C=S.find(e=>e.esBase),w=S.filter(e=>!e.esBase).sort((e,t)=>(e.orden||0)-(t.orden||0)),T=Math.min(d,w.length),E=w.length?(f%w.length+w.length)%w.length:0,D=Array.from({length:T},(e,t)=>w[(E+t)%w.length]);(0,c.useEffect)(()=>{if(!t||t.esBase||w.length===0||D.some(e=>e.id===t.id))return;let e=w.findIndex(e=>e.id===t.id);e>=0&&p(e)},[t?.id,w.length]),(0,c.useEffect)(()=>{if(!y)return;let e=e=>{if(e.target.closest?.(`input, textarea, select, [role="dialog"]`))return;let t=document.querySelector(`.view[data-view="inicio"]`);!t||t.hidden||(e.key===`ArrowLeft`&&O(-1),e.key===`ArrowRight`&&O(1))};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[y]);function O(e){w.length<2||p(t=>t+e)}function k(e){e.preventDefault(),O(e.deltaY>0?1:-1)}function A(e){x.current={x:e.clientX},e.currentTarget.setPointerCapture?.(e.pointerId)}function j(e){let t=x.current;if(!t)return;let n=e.clientX-t.x;Math.abs(n)>45&&(O(n>0?-1:1),t.x=e.clientX)}function M(){x.current=null}if(!y||S.length===0)return null;let N=D.map((e,t)=>{let n=h(t,T)*Math.PI/180,r=Math.cos(n);return{campana:e,left:50+u*Math.sin(n),top:50-u*r,escala:.62+.38*Math.max(0,r),opacidad:.5+.5*Math.max(0,r),z:Math.round(10+r*10)}});return(0,l.jsxs)(`div`,{className:`dial`,role:`listbox`,"aria-label":`Selector de campañas`,children:[(0,l.jsx)(`svg`,{className:`dial-banda`,viewBox:`0 0 100 100`,onWheel:k,onPointerDown:A,onPointerMove:j,onPointerUp:M,onPointerCancel:M,"aria-hidden":`true`,children:(0,l.jsx)(`circle`,{cx:`50`,cy:`50`,r:u,fill:`none`,stroke:`transparent`,strokeWidth:`13`})}),C&&(0,l.jsx)(_,{campana:C,left:50,top:50-u,escala:1,opacidad:1,z:40,esBase:!0,activa:t?.id===C.id,hover:m===C.id,setHover:g}),N.map(e=>(0,l.jsx)(_,{campana:e.campana,left:e.left,top:e.top,escala:e.escala,opacidad:e.opacidad,z:e.z,activa:t?.id===e.campana.id,hover:m===e.campana.id,setHover:g},e.campana.id)),w.length>1&&(0,l.jsxs)(`div`,{className:`dial-flechas`,children:[(0,l.jsx)(`button`,{className:`dial-btn`,onClick:()=>O(-1),"aria-label":`Girar a la izquierda`,children:`‹`}),w.length>d&&(0,l.jsxs)(`span`,{className:`dial-ocultas mono`,children:[T,` de `,w.length]}),(0,l.jsx)(`button`,{className:`dial-btn`,onClick:()=>O(1),"aria-label":`Girar a la derecha`,children:`›`})]}),(0,l.jsx)(`style`,{children:v})]})}function _({campana:e,left:n,top:r,escala:i,opacidad:a,z:o,esBase:s,activa:c,hover:u,setHover:d}){let f=(e.nombre||`?`).replace(/^(el|la|los|las|de|del)\s+/i,``).slice(0,2).toUpperCase(),p=e.planeta||{};return(0,l.jsxs)(`button`,{className:`dial-planeta ${s?`base`:``} ${c?`activa`:``}`,style:{left:`${n}%`,top:`${r}%`,transform:`translate(-50%, -50%) scale(${i})`,opacity:a,zIndex:o,"--pa":p.colorA||`#5b6a8a`,"--pb":p.colorB||`#2b3350`},onClick:()=>t(e.id),onMouseEnter:()=>d(e.id),onMouseLeave:()=>d(null),role:`option`,"aria-selected":c,"aria-label":`Entrar en ${e.nombre}`,title:e.nombre,children:[e.logoUrl?(0,l.jsx)(`img`,{src:e.logoUrl,alt:``}):(0,l.jsx)(`span`,{className:`dial-iniciales`,children:f}),e.estado&&e.estado!==`activa`&&(0,l.jsx)(`i`,{className:`dial-estado ${e.estado}`,title:e.estado}),u&&(0,l.jsx)(`span`,{className:`dial-nombre`,children:e.nombre})]})}var v=`
/* El contenedor NO intercepta el ratón: solo la banda, los planetas y los
   botones. Así el globo central conserva todo su arrastre. */
.dial { position: absolute; inset: 0; z-index: 6; pointer-events: none; }
.dial-banda { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; touch-action: none; }
.dial-banda circle { pointer-events: stroke; cursor: grab; }
.dial-banda circle:active { cursor: grabbing; }
.dial-planeta {
  position: absolute; width: 46px; height: 46px; border-radius: 50%;
  border: 0; cursor: pointer; padding: 0; overflow: visible;
  display: grid; place-items: center; pointer-events: auto;
  background:
    radial-gradient(circle at 32% 28%, rgba(255,255,255,.4), transparent 45%),
    linear-gradient(140deg, var(--pa), var(--pb) 72%);
  box-shadow: 0 2px 10px rgba(0,0,0,.6), inset 0 0 12px rgba(0,0,0,.35);
  transition: filter .18s var(--ease), transform .35s var(--ease), top .35s var(--ease),
              left .35s var(--ease), opacity .35s var(--ease);
  animation: dialEntra .35s var(--ease);
}
@keyframes dialEntra { from { opacity: 0; transform: translate(-50%,-50%) scale(.4); } }
.dial-planeta:hover { filter: brightness(1.18); }
.dial-planeta.base { box-shadow: 0 0 0 2px var(--gold), 0 0 14px rgba(201,164,90,.55), 0 2px 10px rgba(0,0,0,.6); }
.dial-planeta.activa::after {
  content: ''; position: absolute; inset: -7px; border-radius: 50%;
  border: 1px solid rgba(232,223,200,.75);
}
.dial-planeta img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
.dial-iniciales {
  font-family: var(--font-title); font-size: .85rem; letter-spacing: .04em;
  color: var(--paper); text-shadow: 0 1px 3px rgba(0,0,0,.8);
}
.dial-estado {
  position: absolute; right: -1px; top: -1px; width: 12px; height: 12px;
  border-radius: 50%; border: 2px solid #0d0f14;
}
.dial-estado.finalizada { background: #6f9e5c; }
.dial-estado.archivada  { background: #8b8378; }
.dial-estado.privada    { background: #b8603f; }
.dial-nombre {
  position: absolute; top: calc(100% + 8px); left: 50%; transform: translateX(-50%);
  background: linear-gradient(#3a2415, #241609); color: var(--paper);
  border: 1px solid rgba(201,164,90,.55); border-radius: 6px;
  font-family: ui-monospace, monospace; font-size: .62rem; letter-spacing: .08em;
  padding: .22rem .55rem; white-space: nowrap; pointer-events: none; z-index: 60;
}
.dial-flechas {
  position: absolute; left: 50%; bottom: -1%; transform: translateX(-50%);
  display: flex; align-items: center; gap: .6rem; pointer-events: auto; z-index: 50;
}
.dial-btn {
  width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 1.1rem;
  background: rgba(14,17,22,.75); border: 1px solid rgba(201,164,90,.5); color: var(--gold);
}
.dial-btn:hover { background: rgba(201,164,90,.2); }
.dial-ocultas { font-size: .58rem; letter-spacing: .1em; text-transform: uppercase; color: var(--stone); }
`;export{g as default};