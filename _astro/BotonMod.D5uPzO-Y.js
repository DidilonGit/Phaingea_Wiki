import{t as e}from"./react.CYuo-Lgd.js";import{t}from"./react-dom.YppdOR5N.js";import{t as n}from"./jsx-runtime.DvA2kLYf.js";import{t as r}from"./Modal.CYKN6TeL.js";var i=e(),a=t(),o=n();function s({visible:e=!1,titulo:t=`Moderar`,destructivo:n=!1,children:s,esquina:u=`derecha`,sala:d=!1,etiqueta:f=`Moderar categoría`}){let[p,m]=(0,i.useState)(!1),[h,g]=(0,i.useState)(null),_=(0,i.useRef)(null);if((0,i.useEffect)(()=>{if(!d||!e)return;let t=_.current?.closest(`.view`);g(t?.querySelector(`.room-mod`)||null)},[d,e]),(0,i.useEffect)(()=>{let e=()=>m(!1);return window.addEventListener(`phaingea:vista`,e),()=>window.removeEventListener(`phaingea:vista`,e)},[]),!e)return null;let v=d?(0,o.jsxs)(`button`,{className:`btn-mod sala`,onClick:()=>m(!0),title:t,children:[(0,o.jsx)(c,{}),(0,o.jsx)(`span`,{children:f})]}):(0,o.jsxs)(`button`,{className:`btn-mod`,style:u===`izquierda`?{left:`0.5rem`}:{right:`0.5rem`},onClick:()=>m(!0),title:t,"aria-label":t,children:[(0,o.jsx)(c,{}),(0,o.jsx)(`span`,{className:`btn-mod-tip`,children:t})]});return(0,o.jsxs)(o.Fragment,{children:[d&&(0,o.jsx)(`span`,{ref:_,hidden:!0}),d?h?(0,a.createPortal)(v,h):null:v,(0,o.jsx)(r,{abierto:p,onCerrar:()=>m(!1),titulo:t,destructivo:n,children:s}),(0,o.jsx)(`style`,{children:l})]})}function c(){return(0,o.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`15`,height:`15`,"aria-hidden":`true`,children:(0,o.jsx)(`path`,{d:`M20.7 5.6 18.4 3.3a1 1 0 0 0-1.4 0l-1.7 1.7 3.7 3.7 1.7-1.7a1 1 0 0 0 0-1.4ZM3 17.2V21h3.8L17.9 9.9l-3.7-3.7L3 17.2Z`,fill:`currentColor`})})}var l=`
.btn-mod {
  position: absolute; top: .5rem; z-index: 5;
  width: 28px; height: 28px; border-radius: 7px; cursor: pointer;
  display: grid; place-items: center;
  background: rgba(14,17,22,.72); border: 1px solid rgba(201,164,90,.45);
  color: var(--gold); opacity: .55;
  transition: opacity .15s var(--ease), background .15s var(--ease);
}
.btn-mod:hover, .btn-mod:focus-visible { opacity: 1; background: rgba(201,164,90,.2); }
.btn-mod-tip {
  position: absolute; right: 0; top: calc(100% + 5px);
  background: linear-gradient(#3a2415, #241609); color: var(--paper);
  border: 1px solid rgba(201,164,90,.5); border-radius: 6px;
  font-family: ui-monospace, monospace; font-size: .6rem; letter-spacing: .1em;
  text-transform: uppercase; padding: .22rem .5rem; white-space: nowrap;
  opacity: 0; pointer-events: none; transition: opacity .15s ease;
}
.btn-mod:hover .btn-mod-tip { opacity: 1; }

/* variante de SALA: pastilla con texto, siempre visible y en la ranura fija */
.btn-mod.sala {
  position: static; width: auto; height: 30px; padding: 0 .7rem; gap: .4rem;
  grid-auto-flow: column; opacity: 1;
  font-family: ui-monospace, monospace; font-size: .62rem;
  letter-spacing: .12em; text-transform: uppercase;
}
`;export{s as t};