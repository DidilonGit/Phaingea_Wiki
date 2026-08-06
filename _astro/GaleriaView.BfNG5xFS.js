import{t as e}from"./react.CYuo-Lgd.js";import{t,x as n}from"./campaign.DEk2Juoy.js";import{t as r}from"./jsx-runtime.DvA2kLYf.js";import{t as i}from"./user.DppdupU9.js";import{a,s as o}from"./permisos.DXxETGNp.js";import{a as s,c,i as l,l as u,n as d,o as f,r as p,s as m,t as h,u as g}from"./galeria.Dewg0Zla.js";import{i as _,n as v}from"./notificaciones.CsEHjwjU.js";import{n as y,t as b}from"./Modal.CYKN6TeL.js";var x=e(),S=r(),C=16;function w(){let e=n(t),r=n(i),[s,c]=(0,x.useState)([]),[p,m]=(0,x.useState)([]),[h,y]=(0,x.useState)([]),[b,w]=(0,x.useState)(!1),[O,k]=(0,x.useState)(0),[A,j]=(0,x.useState)(null),[M,N]=(0,x.useState)(!1),[P,F]=(0,x.useState)(!1),[I,L]=(0,x.useState)(!1);if((0,x.useEffect)(()=>L(!0),[]),(0,x.useEffect)(()=>{if(!e?.id)return;let t=[u(e.id,c),g(e.id,m)];return()=>t.forEach(e=>e())},[e?.id]),(0,x.useEffect)(()=>k(0),[h.join(),e?.id,P]),!I)return null;let R=a(r,e),z=o(r,e),B=s.filter(e=>e.estado===`aprobada`),V=s.filter(e=>e.estado===`pendiente`),H=r?V.filter(e=>e.autor===r.nombre):[],U=R?V:H,W=P&&U.length>0,G=f(W?U:B,h),K=Math.max(1,Math.ceil(G.length/C)),q=(O%K+K)%K,J=G.slice(q*C,q*C+C),Y=b?p:p.slice(0,8);return(0,S.jsxs)(`div`,{className:`galeria-view`,children:[(0,S.jsxs)(`div`,{className:`barra-tags`,children:[(0,S.jsxs)(`div`,{className:`chips`,children:[(0,S.jsx)(`button`,{className:`chip ${h.length===0?`activo`:``}`,onClick:()=>y([]),children:`Todos`}),Y.map(e=>(0,S.jsx)(`button`,{className:`chip ${h.includes(e)?`activo`:``}`,onClick:()=>y(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]),children:e},e)),p.length>8&&(0,S.jsx)(`button`,{className:`chip mas`,onClick:()=>w(e=>!e),children:b?`− menos`:`+ ${p.length-8} más`})]}),(0,S.jsxs)(`div`,{className:`acciones-galeria`,children:[(H.length>0||R&&V.length>0)&&(0,S.jsx)(`button`,{className:`btn ghost`,onClick:()=>F(e=>!e),children:W?`Ver galería`:`Pendientes (${U.length})`}),z&&(0,S.jsxs)(`button`,{className:`btn subir`,onClick:()=>N(!0),title:`Proponer una imagen`,children:[`⬆ `,(0,S.jsx)(`span`,{children:`Subir imagen`})]})]})]}),h.length>1&&(0,S.jsx)(`p`,{className:`mono muted center`,style:{fontSize:`.66rem`},children:`Mostrando solo imágenes con TODOS los tags seleccionados.`}),G.length===0?(0,S.jsxs)(`div`,{className:`empty`,children:[(0,S.jsx)(`div`,{className:`ico`,children:`🖼️`}),(0,S.jsx)(`p`,{className:`muted`,children:W?`No hay imágenes pendientes.`:`La galería está vacía.`})]}):(0,S.jsxs)(`div`,{className:`exposicion`,children:[K>1&&(0,S.jsx)(`button`,{className:`flecha-madera izq`,onClick:()=>k(e=>e-1),"aria-label":`Página anterior`,children:`‹`}),(0,S.jsx)(`div`,{className:`cuadros`,children:J.map(e=>(0,S.jsxs)(`figure`,{className:`cuadro ${e.ratio<.9?`v`:e.ratio>1.3?`h`:``}`,onClick:()=>j(e),tabIndex:0,children:[(0,S.jsx)(`img`,{src:e.imagen,alt:e.titulo}),(0,S.jsx)(`figcaption`,{children:e.titulo}),e.estado===`pendiente`&&(0,S.jsx)(`span`,{className:`chip-pendiente mono`,children:`pendiente`})]},e.id))}),K>1&&(0,S.jsx)(`button`,{className:`flecha-madera der`,onClick:()=>k(e=>e+1),"aria-label":`Página siguiente`,children:`›`})]}),K>1&&(0,S.jsxs)(`p`,{className:`mono muted center`,children:[`Página `,q+1,` / `,K]}),A&&(0,S.jsx)(`div`,{className:`lightbox`,onClick:()=>j(null),children:(0,S.jsxs)(`div`,{className:`marco-grande`,onClick:e=>e.stopPropagation(),children:[(0,S.jsx)(`button`,{className:`cerrar`,onClick:()=>j(null),"aria-label":`Cerrar`,children:`✕`}),(0,S.jsx)(`img`,{src:A.imagen,alt:A.titulo}),(0,S.jsxs)(`div`,{className:`pie-ampliada`,children:[(0,S.jsx)(`h4`,{children:A.titulo}),A.descripcion&&(0,S.jsx)(`p`,{children:A.descripcion}),(0,S.jsx)(`div`,{className:`chips`,children:(A.tags||[]).map(e=>(0,S.jsx)(`span`,{className:`chip`,children:e},e))}),(0,S.jsxs)(`p`,{className:`mono muted`,children:[`Subido por `,A.autor]}),R&&(0,S.jsxs)(`div`,{className:`mod-imagen`,children:[A.estado===`pendiente`&&(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(`button`,{className:`btn`,onClick:async()=>{await d(e.id,A.id),await v(e.id,[A.autor],{asunto:`Imagen aprobada`,tipo:`galeria`,contenido:`Tu imagen «${A.titulo}» ya está en la galería.`}),await _(e.id,{tipo:`imagen_aprobada`,actor:r?.nombre,resumen:A.titulo}),j(null)},children:`Aprobar`}),(0,S.jsx)(`button`,{className:`btn ghost`,onClick:async()=>{await l(e.id,A.id),await v(e.id,[A.autor],{asunto:`Imagen denegada`,tipo:`galeria`,contenido:`Tu propuesta «${A.titulo}» no se ha publicado.`}),await _(e.id,{tipo:`imagen_denegada`,actor:r?.nombre,resumen:A.titulo}),j(null)},children:`Denegar`})]}),(0,S.jsx)(T,{campanaId:e.id,id:A.id,alBorrar:()=>j(null)})]})]})]})}),M&&(0,S.jsx)(E,{campanaId:e.id,user:r,tagsExistentes:p,aprobadaDirecta:R,campana:e,onCerrar:()=>N(!1)}),(0,S.jsx)(`style`,{children:D})]})}function T({campanaId:e,id:t,alBorrar:n}){let r=y(async()=>{await s(e,t),n()});return(0,S.jsx)(`button`,{className:`btn ghost`,style:{borderColor:`#a44`,color:`#e99`},onClick:r.pulsar,children:r.texto(`Eliminar`)})}function E({campanaId:e,user:t,tagsExistentes:n,aprobadaDirecta:r,campana:i,onCerrar:a}){let[o,s]=(0,x.useState)(``),[l,u]=(0,x.useState)(``),[d,f]=(0,x.useState)([]),[g,_]=(0,x.useState)([]),[y,C]=(0,x.useState)(``),[w,T]=(0,x.useState)(null),[E,D]=(0,x.useState)(``),[O,k]=(0,x.useState)(!1),A=(0,x.useRef)(null);async function j(e){if(e){D(``);try{let{dataUrl:t,ratio:n}=await p(e);T({dataUrl:t,ratio:n})}catch(e){D(e.message)}}}function M(){let e=m(y);if(e){if(n.includes(e)||g.includes(e)){f(t=>t.includes(e)?t:[...t,e]),C(``);return}if(g.length>=3){D(`Solo puedes crear 3 tags nuevos en una misma subida.`);return}_(t=>[...t,e]),f(t=>[...t,e]),C(``)}}async function N(n){n.preventDefault(),D(``),k(!0);try{await c(e,{titulo:o,descripcion:l,tags:d,autor:t.nombre,imagen:w?.dataUrl,ratio:w?.ratio,aprobadaDirecta:r}),r||await v(e,Object.keys(i?.masters||{}),{asunto:`Solicitud pendiente`,tipo:`galeria`,contenido:`${t.nombre} ha propuesto la imagen «${o}» para la galería.`}),a()}catch(e){D(e.message)}finally{k(!1)}}let P=[...new Set([...h,...n,...g])];return(0,S.jsx)(b,{abierto:!0,onCerrar:a,titulo:r?`Subir imagen`:`Proponer imagen`,ancho:`560px`,children:(0,S.jsxs)(`form`,{onSubmit:N,className:`stack`,children:[(0,S.jsxs)(`div`,{className:`zona-soltar`,onDragOver:e=>e.preventDefault(),onDrop:e=>{e.preventDefault(),j(e.dataTransfer.files?.[0])},onClick:()=>A.current?.click(),children:[w?(0,S.jsx)(`img`,{src:w.dataUrl,alt:`Vista previa`}):(0,S.jsx)(`p`,{className:`mono muted`,children:`Arrastra una imagen aquí o pulsa para buscarla`}),(0,S.jsx)(`input`,{ref:A,type:`file`,accept:`image/*`,hidden:!0,onChange:e=>j(e.target.files?.[0])})]}),(0,S.jsxs)(`label`,{className:`lbl`,children:[`Título (obligatorio)`,(0,S.jsx)(`input`,{className:`inp`,value:o,onChange:e=>s(e.target.value)})]}),(0,S.jsxs)(`label`,{className:`lbl`,children:[`Descripción breve (opcional)`,(0,S.jsx)(`input`,{className:`inp`,value:l,onChange:e=>u(e.target.value)})]}),(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`p`,{className:`mono muted`,style:{margin:`0 0 .3rem`},children:`Tags (al menos uno)`}),(0,S.jsx)(`div`,{className:`chips`,children:P.map(e=>(0,S.jsx)(`button`,{type:`button`,className:`chip ${d.includes(e)?`activo`:``}`,onClick:()=>f(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e]),children:e},e))}),(0,S.jsxs)(`div`,{style:{display:`flex`,gap:`.4rem`,marginTop:`.5rem`},children:[(0,S.jsx)(`input`,{className:`inp`,placeholder:`Crear tag nuevo (${g.length}/3)`,value:y,onChange:e=>C(e.target.value),onKeyDown:e=>e.key===`Enter`&&(e.preventDefault(),M())}),(0,S.jsx)(`button`,{type:`button`,className:`btn ghost`,onClick:M,children:`Añadir`})]})]}),E&&(0,S.jsx)(`p`,{style:{color:`#f0a29c`},children:E}),!r&&(0,S.jsxs)(`p`,{className:`mono muted`,style:{fontSize:`.66rem`},children:[`Se enviará al máster para su aprobación (máximo `,5,` pendientes a la vez).`]}),(0,S.jsxs)(`div`,{style:{display:`flex`,gap:`.6rem`},children:[(0,S.jsx)(`button`,{className:`btn`,type:`submit`,disabled:O,children:O?`Enviando…`:r?`Subir`:`Enviar a aprobación`}),(0,S.jsx)(`button`,{className:`btn ghost`,type:`button`,onClick:a,children:`Cancelar`})]})]})})}var D=`
.galeria-view { display: grid; gap: .9rem; }
.barra-tags { display: flex; gap: .8rem; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; }
.barra-tags .chips { flex: 1; justify-content: flex-start; }
.chip.mas { border-style: dashed; }
.acciones-galeria { display: flex; gap: .5rem; }
.btn.subir { display: inline-flex; align-items: center; gap: .4rem; }
.exposicion { display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: .6rem; }
.cuadros { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 1.1rem; align-items: start; }
.cuadro {
  position: relative; margin: 0; cursor: pointer;
  border: 9px solid #3a2a18; border-radius: 3px; background: #201812;
  box-shadow: 0 10px 24px rgba(0,0,0,.55), inset 0 0 0 2px rgba(201,164,90,.35);
  transition: transform .18s var(--ease), filter .18s var(--ease);
}
.cuadro:hover { transform: translateY(-3px); filter: brightness(1.08); }
.cuadro img { width: 100%; display: block; }
.cuadro figcaption {
  padding: .35rem .5rem; text-align: center; background: rgba(0,0,0,.35);
  font-family: var(--font-body); font-size: .8rem; color: var(--paper);
}
.chip-pendiente {
  position: absolute; top: .3rem; right: .3rem; font-size: .55rem; letter-spacing: .1em;
  text-transform: uppercase; background: rgba(224,192,122,.9); color: #241a12;
  border-radius: 999px; padding: .1rem .4rem;
}
.flecha-madera {
  width: 40px; height: 70px; border-radius: 6px; cursor: pointer; font-size: 1.5rem;
  color: var(--gold); border: 1px solid rgba(0,0,0,.5);
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(0,0,0,.3)), linear-gradient(135deg,#6b4a2c,#3a2618);
  box-shadow: 0 6px 16px rgba(0,0,0,.5);
}
.flecha-madera:hover { filter: brightness(1.15); }
.lightbox {
  position: fixed; inset: 0; z-index: 150; display: grid; place-items: center; padding: 4vh 4vw;
  background: rgba(5,6,10,.82); backdrop-filter: blur(6px);
}
.marco-grande {
  position: relative; max-width: min(92vw, 900px); max-height: 92vh; overflow: auto;
  border: 12px solid #3a2a18; border-radius: 4px; background: #1a120b;
  box-shadow: 0 26px 70px rgba(0,0,0,.7), inset 0 0 0 2px rgba(201,164,90,.4);
}
.marco-grande > img { width: 100%; display: block; max-height: 66vh; object-fit: contain; background: #0d0a07; }
.pie-ampliada { padding: .9rem 1.1rem; display: grid; gap: .5rem; }
.pie-ampliada h4 { font-family: var(--font-title); color: var(--gold-soft); margin: 0; font-size: 1.15rem; }
.pie-ampliada p { margin: 0; font-size: .88rem; color: var(--paper); }
.marco-grande .cerrar {
  position: absolute; top: .5rem; right: .5rem; z-index: 2; width: 30px; height: 30px; border-radius: 50%;
  background: rgba(14,17,22,.8); border: 1px solid rgba(201,164,90,.5); color: var(--gold); cursor: pointer;
}
.mod-imagen { display: flex; gap: .5rem; flex-wrap: wrap; margin-top: .3rem; }
.zona-soltar {
  border: 2px dashed rgba(201,164,90,.45); border-radius: 10px; min-height: 150px;
  display: grid; place-items: center; cursor: pointer; padding: .8rem; text-align: center;
}
.zona-soltar:hover { border-color: var(--gold); }
.zona-soltar img { max-height: 220px; max-width: 100%; border-radius: 6px; }
.lbl { display: grid; gap: .25rem; font-family: var(--font-ui); font-size: .78rem; color: var(--parchment); }
.inp { padding: .45rem .6rem; border-radius: 7px; border: 1px solid rgba(201,164,90,.35);
  background: rgba(0,0,0,.3); color: var(--paper); font-family: var(--font-body); font-size: .9rem; flex: 1; }
`;export{w as default};