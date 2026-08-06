import{t as e}from"./react.CYuo-Lgd.js";import{t}from"./jsx-runtime.DvA2kLYf.js";import{n,t as r}from"./prefs.-3CaXE-H.js";import"./sonidos.C675gmG3.js";var i=e(),a=`d8a3ddb1aac8fc521f0ae883cc800c3eefbdf476`,o=t(),s=`phaingea_recarga_intento`;function c(){let[e,t]=(0,i.useState)(null);(0,i.useEffect)(()=>{r();let e=`${`/Phaingea_Wiki`.replace(/\/$/,``)}/version.json`,i=!1;async function o(e){i=!0;try{if(window.caches?.keys){let e=await caches.keys();await Promise.all(e.map(e=>caches.delete(e)))}let e=await navigator.serviceWorker?.getRegistrations?.();e&&await Promise.all(e.map(e=>e.unregister()))}catch{}let t=new URL(window.location.href);t.searchParams.set(`v`,e),window.location.replace(t.toString())}async function c(){if(!i)try{let r=await fetch(`${e}?t=${Date.now()}`,{cache:`no-store`});if(!r.ok)return;let{version:i}=await r.json();if(!i||i===`d8a3ddb1aac8fc521f0ae883cc800c3eefbdf476`){sessionStorage.removeItem(s);return}if(n(`autoRecarga`)===!1)return;let c=Number(sessionStorage.getItem(s)||0);if(c>=2){console.warn(`[Phaingea] Hay una versión nueva (${i}) pero el navegador sigue sirviendo la ${a} desde su caché.`),t(i);return}sessionStorage.setItem(s,String(c+1)),o(i)}catch{}}let l=setInterval(c,6e4),u=()=>{document.hidden||c()};return document.addEventListener(`visibilitychange`,u),window.addEventListener(`focus`,c),c(),()=>{clearInterval(l),document.removeEventListener(`visibilitychange`,u),window.removeEventListener(`focus`,c)}},[]);let c=a.slice(0,7);return(0,o.jsxs)(`div`,{className:`version-pie`,children:[e?(0,o.jsx)(`button`,{className:`version-boton`,onClick:()=>{sessionStorage.removeItem(s);let t=new URL(window.location.href);t.searchParams.set(`v`,e),window.location.replace(t.toString())},title:`Tu pestaña tiene la ${c} y ya hay una versión más nueva`,children:`Hay una versión nueva · actualizar`}):(0,o.jsxs)(`span`,{className:`version-eco`,title:`Versión que está viendo esta pestaña`,children:[`v `,c]}),(0,o.jsx)(`style`,{children:`
        .version-pie {
          position: fixed; left: .5rem; bottom: .4rem; z-index: 130;
          font-family: ui-monospace, monospace; pointer-events: none;
        }
        .version-eco { font-size: .56rem; letter-spacing: .1em; color: rgba(151,160,171,.5); }
        .version-boton {
          pointer-events: auto; cursor: pointer;
          font-family: ui-monospace, monospace; font-size: .62rem; letter-spacing: .08em;
          background: linear-gradient(180deg, #f2dc94, #c9a45a 55%, #87692f);
          color: #241a12; border: 1px solid #1c120a; border-radius: 999px;
          padding: .3rem .7rem; box-shadow: 0 4px 12px rgba(0,0,0,.5);
        }
        .version-boton:hover { filter: brightness(1.08); }
      `})]})}export{c as default};