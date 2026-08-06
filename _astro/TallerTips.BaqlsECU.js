import{t as e}from"./react.CYuo-Lgd.js";import{_ as t,b as n,g as r,h as i,p as a,t as o,v as s,x as c,y as l}from"./campaign.DEk2Juoy.js";import{t as u}from"./jsx-runtime.DvA2kLYf.js";import{t as d}from"./user.DppdupU9.js";import{a as f}from"./permisos.DXxETGNp.js";import{n as p,t as m}from"./Modal.CYKN6TeL.js";var h=e(),g=u();function _({soloMascota:e=!1}){let s=c(o),u=c(d),[p,_]=(0,h.useState)([]),[x,S]=(0,h.useState)(``),[C,w]=(0,h.useState)(!1),[T,E]=(0,h.useState)(null),[D,O]=(0,h.useState)(null),[k,A]=(0,h.useState)(!1),[j,M]=(0,h.useState)(!1);if((0,h.useEffect)(()=>M(!0),[]),(0,h.useEffect)(()=>{if(!s?.id)return;let e=i(t(a,`taller/${s.id}/tips`),e=>{let t=e.exists()?e.val():{};_(Object.entries(t).map(([e,t])=>({id:e,...t})).sort((e,t)=>(e.orden||0)-(t.orden||0)))}),n=i(t(a,`taller/${s.id}/mascotaUrl`),e=>S(e.exists()?e.val():``));return()=>{e(),n()}},[s?.id]),(0,h.useEffect)(()=>{if(!j)return;let e=setInterval(()=>{A(!0),setTimeout(()=>A(!1),1400)},9e3+Math.random()*6e3);return()=>clearInterval(e)},[j]),!j)return null;let N=f(u,s);function P(){p.length===0?O(`Esta campaña aún no tiene tips.`):O(p[Math.floor(Math.random()*p.length)].texto),setTimeout(()=>O(null),6e3)}async function F(e,i){i?await n(t(a,`taller/${s.id}/tips/${i}`),{texto:e}):await l(r(t(a,`taller/${s.id}/tips`)),{texto:e,orden:p.length}),E(null)}async function I(e,r){let i=p.findIndex(t=>t.id===e.id),o=i+r;o<0||o>=p.length||(await n(t(a,`taller/${s.id}/tips/${e.id}`),{orden:p[o].orden??o}),await n(t(a,`taller/${s.id}/tips/${p[o].id}`),{orden:e.orden??i}))}return e?(0,g.jsxs)(`div`,{className:`mascota-zona`,children:[(0,g.jsx)(`button`,{className:`mascota ${k?`salta`:``}`,onClick:P,title:`Tips de esta campaña`,"aria-label":`Tips de esta campaña`,children:x||s?.logoUrl?(0,g.jsx)(`img`,{src:x||s.logoUrl,alt:``}):(0,g.jsx)(`span`,{className:`mascota-inicial`,children:(s?.nombre||`?`).charAt(0)})}),D&&(0,g.jsx)(`div`,{className:`bocadillo`,children:D}),(0,g.jsx)(`style`,{children:b})]}):(0,g.jsxs)(`div`,{className:`tips-panel`,children:[(0,g.jsxs)(`button`,{className:`tips-cabecera`,onClick:()=>w(e=>!e),"aria-expanded":C,children:[(0,g.jsxs)(`span`,{className:`mono`,children:[`Tips de la campaña (`,p.length,`)`]}),(0,g.jsx)(`span`,{className:`flecha ${C?`abierta`:``}`,children:`▾`})]}),C&&(0,g.jsxs)(`div`,{className:`tips-lista`,children:[p.length===0&&(0,g.jsx)(`p`,{className:`muted mono`,children:`Aún no hay tips.`}),p.map(e=>(0,g.jsxs)(`div`,{className:`tarjeta-tip`,children:[(0,g.jsx)(`p`,{children:e.texto}),N&&(0,g.jsxs)(`div`,{className:`tip-acciones mono`,children:[(0,g.jsx)(`button`,{onClick:()=>I(e,-1),title:`Subir`,children:`↑`}),(0,g.jsx)(`button`,{onClick:()=>I(e,1),title:`Bajar`,children:`↓`}),(0,g.jsx)(`button`,{onClick:()=>E({id:e.id,texto:e.texto}),children:`editar`}),(0,g.jsx)(v,{campanaId:s.id,id:e.id})]})]},e.id)),N&&(0,g.jsx)(`button`,{className:`btn ghost`,onClick:()=>E({texto:``}),children:`+ Nuevo tip`})]}),T&&(0,g.jsx)(m,{abierto:!0,onCerrar:()=>E(null),titulo:T.id?`Editar tip`:`Nuevo tip`,children:(0,g.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),F(e.target.elements.texto.value.trim(),T.id)},className:`stack`,children:[(0,g.jsx)(`textarea`,{name:`texto`,defaultValue:T.texto,className:`inp-tip`,placeholder:`Consejo, recordatorio, noticia…`}),(0,g.jsxs)(`div`,{style:{display:`flex`,gap:`.6rem`},children:[(0,g.jsx)(`button`,{className:`btn`,type:`submit`,children:`Guardar`}),(0,g.jsx)(`button`,{className:`btn ghost`,type:`button`,onClick:()=>E(null),children:`Cancelar`})]})]})}),(0,g.jsx)(`style`,{children:y})]})}function v({campanaId:e,id:n}){let r=p(()=>s(t(a,`taller/${e}/tips/${n}`)));return(0,g.jsx)(`button`,{onClick:r.pulsar,style:{color:`#e99`},children:r.texto(`borrar`,`¿seguro?`)})}var y=`
.tips-panel { margin-top: 1.2rem; }
.tips-cabecera {
  width: 100%; display: flex; justify-content: space-between; align-items: center; cursor: pointer;
  background: rgba(201,164,90,.08); border: 1px solid rgba(201,164,90,.35); border-radius: 8px;
  color: var(--parchment); padding: .5rem .8rem; font-size: .72rem; letter-spacing: .08em; text-transform: uppercase;
}
.tips-cabecera:hover { border-color: var(--gold); color: var(--gold); }
.flecha { transition: transform .2s var(--ease); }
.flecha.abierta { transform: rotate(180deg); }
.tips-lista { margin-top: .6rem; display: grid; gap: .6rem; max-height: 320px; overflow-y: auto; padding-right: .3rem; }
.tarjeta-tip {
  background: linear-gradient(160deg, #efe3c6, #d8c8a2); color: #3a2a16;
  border-radius: 4px; padding: .7rem .85rem; box-shadow: 0 6px 16px rgba(0,0,0,.4);
  transform: rotate(-.4deg);
}
.tarjeta-tip p { margin: 0; font-family: var(--font-body); font-size: .88rem; line-height: 1.45; }
.tip-acciones { display: flex; gap: .6rem; margin-top: .4rem; }
.tip-acciones button { background: none; border: 0; cursor: pointer; padding: 0; color: #7a6444; font-size: .66rem; font-family: ui-monospace, monospace; }
.tip-acciones button:hover { color: #4a2f14; text-decoration: underline; }
.inp-tip {
  min-height: 90px; padding: .6rem; border-radius: 8px; border: 1px solid rgba(201,164,90,.35);
  background: rgba(0,0,0,.3); color: var(--paper); font-family: var(--font-body); font-size: .9rem; width: 100%;
}
`,b=`
.mascota-zona { position: relative; display: grid; justify-items: center; }
.mascota {
  width: 54px; height: 54px; border-radius: 50%; cursor: pointer; padding: 0; overflow: hidden;
  border: 1px solid rgba(201,164,90,.5);
  background: radial-gradient(circle at 35% 30%, rgba(255,255,255,.25), rgba(90,61,38,.5));
  box-shadow: 0 0 14px rgba(201,164,90,.45);
  animation: brillo 2.8s ease-in-out infinite;
  transition: transform .3s var(--ease);
}
@keyframes brillo {
  0%, 100% { box-shadow: 0 0 10px rgba(201,164,90,.35); }
  50% { box-shadow: 0 0 20px rgba(201,164,90,.7); }
}
.mascota.salta { animation: brillo 2.8s ease-in-out infinite, paseo 1.4s ease-in-out; }
@keyframes paseo {
  0% { transform: translateX(0); }
  25% { transform: translateX(-12px) translateY(-6px); }
  50% { transform: translateX(10px) translateY(-3px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
}
.mascota img { width: 100%; height: 100%; object-fit: cover; }
.mascota-inicial { font-family: var(--font-title); font-size: 1.5rem; color: var(--paper); }
.bocadillo {
  position: absolute; top: calc(100% + 12px); right: 0; width: max(180px, 14vw); z-index: 20;
  background: linear-gradient(160deg, #efe3c6, #d8c8a2); color: #3a2a16;
  border-radius: 10px; padding: .7rem .85rem; font-family: var(--font-body); font-size: .84rem; line-height: 1.4;
  box-shadow: 0 10px 26px rgba(0,0,0,.5);
  animation: aparece .3s var(--ease);
}
.bocadillo::before {
  content: ''; position: absolute; bottom: 100%; right: 18px;
  border: 8px solid transparent; border-bottom-color: #efe3c6;
}
@keyframes aparece { from { opacity: 0; transform: translateY(-6px) scale(.94); } }
`;export{_ as default};