import{t as e}from"./react.CYuo-Lgd.js";import{n as t,t as n,x as r}from"./campaign.DEk2Juoy.js";import{t as i}from"./jsx-runtime.DvA2kLYf.js";import{f as a,r as o}from"./planeta.NCwYSTYR.js";var s=e(),c=i(),l=Math.PI/180;function u(){let e=r(n);r(t);let[i,u]=(0,s.useState)([]),[f,p]=(0,s.useState)({}),[m,h]=(0,s.useState)(null),[g,_]=(0,s.useState)(0),[v,y]=(0,s.useState)(!1);(0,s.useEffect)(()=>y(!0),[]);let b=e?.categorias?.cartografia?.heredaDe||e?.id;if((0,s.useEffect)(()=>{if(b)return a(b,u)},[b]),(0,s.useEffect)(()=>{if(e?.id)return h(null),o(e.id,p)},[e?.id]),(0,s.useEffect)(()=>{if(!v)return;let e=0,t=null,n=()=>{let r=window.__engren?.st?.rotY??0;(t===null||Math.abs(r-t)>4e-4)&&(t=r,_(r)),e=requestAnimationFrame(n)};return e=requestAnimationFrame(n),()=>cancelAnimationFrame(e)},[v]),!v)return null;let x=Object.fromEntries(i.map(e=>[e.id,e])),S=Object.entries(f).filter(([e,t])=>x[e]&&typeof t?.lat==`number`&&typeof t?.lon==`number`).map(([e,t])=>({...x[e],lat:t.lat,lon:t.lon}));if(S.length===0)return null;let C=S.map(e=>{let t=e.lat*l,n=e.lon*l+g,r=Math.cos(t)*Math.sin(n),i=Math.sin(t),a=Math.cos(t)*Math.cos(n);return{lugar:e,visible:a>.06,left:50+r*46,top:50-i*46,opacidad:.35+.65*Math.max(0,a)}}),w=C.find(e=>e.lugar.id===m);return(0,c.jsxs)(`div`,{className:`pines-planeta`,children:[C.map(e=>e.visible?(0,c.jsxs)(`button`,{className:`pin-planeta ${m===e.lugar.id?`abierto`:``}`,style:{left:`${e.left}%`,top:`${e.top}%`,opacity:e.opacidad},onClick:()=>h(m===e.lugar.id?null:e.lugar.id),title:e.lugar.nombre,children:[(0,c.jsx)(`b`,{}),(0,c.jsx)(`em`,{children:e.lugar.nombre})]},e.lugar.id):null),w&&w.visible&&(0,c.jsxs)(`div`,{className:`ficha-region`,style:{left:`${w.left}%`,top:`${w.top}%`,transform:w.left>50?`translate(calc(-100% - 16px), -50%)`:`translate(16px, -50%)`},children:[(0,c.jsx)(`button`,{className:`cerrar`,onClick:()=>h(null),"aria-label":`Cerrar`,children:`✕`}),(0,c.jsx)(`h4`,{children:w.lugar.nombre}),w.lugar.imagenUrl&&(0,c.jsx)(`img`,{src:w.lugar.imagenUrl,alt:``}),(0,c.jsx)(`p`,{className:`muted`,children:w.lugar.resumen||`Sin resumen todavía.`}),(0,c.jsx)(`button`,{className:`btn`,onClick:()=>{let e=w.lugar.id;h(null),document.querySelector(`.bm[data-view="cartografia"]`)?.click(),window.dispatchEvent(new CustomEvent(`phaingea:abrir-lugar`,{detail:{lugarId:e}}))},children:`Abrir en Cartografía`})]}),(0,c.jsx)(`style`,{children:d})]})}var d=`
.pines-planeta { position: absolute; inset: 0; z-index: 7; pointer-events: none; }
.pin-planeta {
  position: absolute; transform: translate(-50%,-50%); pointer-events: auto;
  display: flex; align-items: center; gap: .35rem; background: none; border: 0; cursor: pointer;
}
.pin-planeta b {
  width: 11px; height: 11px; border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #f4dfa6, var(--gold));
  box-shadow: 0 0 0 3px rgba(201,164,90,.25), 0 2px 6px rgba(0,0,0,.6);
}
.pin-planeta em {
  font-family: var(--font-title); font-style: normal; font-size: .78rem;
  color: var(--paper); text-shadow: 0 1px 4px rgba(0,0,0,.9); white-space: nowrap;
}
.pin-planeta:hover b, .pin-planeta.abierto b { box-shadow: 0 0 0 4px rgba(201,164,90,.4), 0 0 12px rgba(201,164,90,.6); }
/* Anclada al pin (como la tarjeta de los marcadores del observatorio), no
   colgando debajo del globo: left/top se calculan en el propio componente. */
.ficha-region {
  position: absolute;
  width: min(260px, 70vw); z-index: 30; pointer-events: auto;
  background: linear-gradient(180deg, rgba(42,30,19,.97), rgba(26,18,11,.98));
  border: 1px solid rgba(201,164,90,.5); border-radius: 10px; padding: .9rem 1rem;
  box-shadow: 0 18px 44px rgba(0,0,0,.65);
}
.ficha-region h4 { font-family: var(--font-title); color: var(--gold-soft); margin: 0 0 .4rem; font-size: 1.05rem; }
.ficha-region img { width: 100%; border-radius: 6px; margin-bottom: .5rem; }
.ficha-region p { font-size: .84rem; margin: 0 0 .7rem; }
.ficha-region .cerrar {
  position: absolute; top: .4rem; right: .4rem; width: 22px; height: 22px; border-radius: 50%;
  background: rgba(201,164,90,.15); border: 1px solid rgba(201,164,90,.4); color: var(--gold);
  font-size: .7rem; cursor: pointer;
}
`;export{u as default};