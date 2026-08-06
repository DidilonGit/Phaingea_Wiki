import{t as e}from"./react.CYuo-Lgd.js";import{t,x as n}from"./campaign.DEk2Juoy.js";import{t as r}from"./jsx-runtime.DvA2kLYf.js";import{t as i}from"./user.DppdupU9.js";import{a,c as o,i as s,n as c,o as l,r as u,s as d,t as f}from"./personajes.QyUAzyjy.js";import{a as p}from"./permisos.DXxETGNp.js";import{r as m}from"./galeria.Dewg0Zla.js";import{i as h,r as g}from"./markdown.BGZ25JWa.js";import{i as _,n as v}from"./notificaciones.CsEHjwjU.js";import{t as y}from"./Libro.VX6nTiDO.js";import{n as b,t as x}from"./Modal.CYKN6TeL.js";import{t as S}from"./BotonMod.D5uPzO-Y.js";import{t as C}from"./Comentarios.CDM2KiQ-.js";import{n as w,t as T}from"./BarraXP.SRTyK30p.js";import{c as ee}from"./sesiones.BDFJDZtP.js";var E=e(),D=r();function O({campanaId:e,personaje:t,autor:n,visible:r}){let[i,a]=(0,E.useState)(t?.estado||`activo`),[o,s]=(0,E.useState)((t?.grupos||[]).join(`, `)),[l,u]=(0,E.useState)(``);if((0,E.useEffect)(()=>{a(t?.estado||`activo`),s((t?.grupos||[]).join(`, `))},[t?.id]),!t)return null;async function d(){let r=o.split(`,`).map(e=>e.trim()).filter(Boolean);if(await c(e,t.id,{estado:i,grupos:r}),i!==t.estado){let r={fallecido:`${t.nombre} ha caído. Ya puedes crear un personaje nuevo.`,delegado:`${t.nombre} pasa a ser personaje no jugador. Ya puedes crear otro.`,activo:`${t.nombre} vuelve a estar activo.`};await v(e,[t.propietario],{asunto:i===`fallecido`?`Personaje fallecido`:`Estado del personaje`,tipo:`personaje`,contenido:r[i]||`El estado de ${t.nombre} es ahora ${i}.`}),await _(e,{tipo:`personaje_${i}`,actor:n,resumen:t.nombre})}u(`Guardado.`),setTimeout(()=>u(``),2200)}return(0,D.jsxs)(S,{visible:r,titulo:`Moderar a ${t.nombre}`,children:[(0,D.jsxs)(`div`,{className:`stack`,children:[(0,D.jsxs)(`p`,{className:`mono muted`,children:[`Personaje de `,t.propietario]}),(0,D.jsxs)(`label`,{className:`lbl-mp`,children:[`Estado`,(0,D.jsx)(`select`,{className:`inp-mp`,value:i,onChange:e=>a(e.target.value),children:[...f,`historico`].map(e=>(0,D.jsx)(`option`,{value:e,children:e},e))})]}),(0,D.jsx)(`p`,{className:`mono muted`,style:{fontSize:`.66rem`},children:`Al marcarlo como fallecido o delegado, su jugador podrá crear otro personaje.`}),(0,D.jsxs)(`label`,{className:`lbl-mp`,children:[`Grupos (separados por comas)`,(0,D.jsx)(`input`,{className:`inp-mp`,value:o,onChange:e=>s(e.target.value),placeholder:`La Compañía, Los Caídos`})]}),l&&(0,D.jsx)(`p`,{style:{color:`#9fd07a`},children:l}),(0,D.jsxs)(`div`,{style:{display:`flex`,gap:`.6rem`,flexWrap:`wrap`},children:[(0,D.jsx)(`button`,{className:`btn`,onClick:d,children:`Guardar`}),(0,D.jsx)(k,{campanaId:e,id:t.id})]})]}),(0,D.jsx)(`style`,{children:`
        .lbl-mp { display: grid; gap: .25rem; font-family: var(--font-ui); font-size: .78rem; color: var(--parchment); }
        .inp-mp { padding: .45rem .6rem; border-radius: 7px; border: 1px solid rgba(201,164,90,.35);
          background: rgba(0,0,0,.3); color: var(--paper); font-family: var(--font-body); font-size: .9rem; }
      `})]})}function k({campanaId:e,id:t}){let n=b(()=>a(e,t));return(0,D.jsx)(`button`,{className:`btn ghost`,style:{borderColor:`#a44`,color:`#e99`},onClick:n.pulsar,children:n.texto(`Eliminar personaje`)})}var A=()=>({nombre:``,clase:``,nivel:1,descripcion:``,imagenUrl:``});function j({campanaId:e,user:t,esGestor:n,personaje:r=null,abierto:i,onCerrar:a}){let o=!!r,[l,u]=(0,E.useState)(()=>r?{...A(),...r}:A()),[d,f]=(0,E.useState)(r?.propietario||t?.nombre||``),[p,h]=(0,E.useState)(``),[g,v]=(0,E.useState)(!1),y=(0,E.useRef)(null);if(!i)return null;let b=e=>({value:l[e]??``,onChange:t=>u({...l,[e]:t.target.value})});async function S(e){if(e)try{let{dataUrl:t}=await m(e,{maxLado:1200,maxBytes:320*1024});u(e=>({...e,imagenUrl:t}))}catch(e){h(`No se pudo cargar la imagen: `+e.message)}}async function C(){if(!l.nombre.trim()){h(`El personaje necesita un nombre.`);return}v(!0),h(``);let i={nombre:l.nombre.trim(),clase:l.clase.trim(),nivel:Math.max(1,Number(l.nivel)||1),descripcion:l.descripcion,imagenUrl:l.imagenUrl||``};try{o?await c(e,r.id,i):(await s(e,{...i,propietario:d||t?.nombre},{saltarLimite:n}),await _(e,{tipo:`personaje_creado`,actor:t?.nombre,resumen:i.nombre})),a()}catch(e){h(e.message)}finally{v(!1)}}return(0,D.jsxs)(x,{abierto:!0,onCerrar:a,titulo:o?`Editar ficha`:`Subir ficha de personaje`,ancho:`520px`,children:[(0,D.jsxs)(`div`,{className:`ficha-form`,children:[(0,D.jsx)(`button`,{className:`foto`,onClick:()=>y.current?.click(),title:`Elegir imagen`,children:l.imagenUrl?(0,D.jsx)(`img`,{src:l.imagenUrl,alt:`Vista previa`}):(0,D.jsxs)(`span`,{className:`mono vacia`,children:[(0,D.jsx)(`b`,{children:`+`}),`Foto del personaje`]})}),(0,D.jsx)(`input`,{ref:y,type:`file`,accept:`image/*`,hidden:!0,onChange:e=>S(e.target.files?.[0])}),l.imagenUrl&&(0,D.jsx)(`button`,{className:`lnk mono`,onClick:()=>u({...l,imagenUrl:``}),children:`Quitar foto`}),(0,D.jsxs)(`label`,{className:`lbl`,children:[`Nombre `,(0,D.jsx)(`input`,{className:`inp`,...b(`nombre`),autoFocus:!0})]}),(0,D.jsxs)(`div`,{className:`dos`,children:[(0,D.jsxs)(`label`,{className:`lbl`,children:[`Clase `,(0,D.jsx)(`input`,{className:`inp`,placeholder:`Guerrero, mago…`,...b(`clase`)})]}),(0,D.jsxs)(`label`,{className:`lbl`,children:[`Nivel`,(0,D.jsx)(`input`,{className:`inp`,type:`number`,min:`1`,max:`20`,...b(`nivel`)})]})]}),(0,D.jsxs)(`label`,{className:`lbl`,children:[`Sobre el personaje`,(0,D.jsx)(`textarea`,{className:`inp`,style:{minHeight:`130px`},placeholder:`Historia, carácter, lo que quieras contar.`,...b(`descripcion`)})]}),n&&!o&&(0,D.jsxs)(`label`,{className:`lbl`,children:[`Jugador`,(0,D.jsx)(`input`,{className:`inp`,value:d,onChange:e=>f(e.target.value)})]}),(0,D.jsx)(`p`,{className:`mono muted`,style:{fontSize:`.64rem`},children:`El nivel que pongas vale mientras el personaje no tenga experiencia registrada; en cuanto participe en sesiones, el nivel sale de su experiencia.`}),p&&(0,D.jsx)(`p`,{style:{color:`#f0a29c`,margin:0},children:p}),(0,D.jsxs)(`div`,{style:{display:`flex`,gap:`.5rem`,justifyContent:`flex-end`},children:[(0,D.jsx)(`button`,{className:`btn ghost`,onClick:a,children:`Cancelar`}),(0,D.jsx)(`button`,{className:`btn`,onClick:C,disabled:g,children:g?`Guardando…`:o?`Guardar cambios`:`Subir ficha`})]})]}),(0,D.jsx)(`style`,{children:M})]})}var M=`
.ficha-form { display: grid; gap: .7rem; }
.ficha-form .foto {
  width: 100%; height: 210px; border-radius: 10px; cursor: pointer; overflow: hidden;
  display: grid; place-items: center; padding: 0;
  border: 1px dashed rgba(201,164,90,.5); background: rgba(0,0,0,.28);
}
.ficha-form .foto:hover { border-color: var(--gold); background: rgba(201,164,90,.1); }
.ficha-form .foto img { width: 100%; height: 100%; object-fit: contain; }
.ficha-form .vacia {
  display: grid; justify-items: center; gap: .3rem; color: var(--stone);
  font-size: .66rem; letter-spacing: .12em; text-transform: uppercase;
}
.ficha-form .vacia b { font-size: 1.8rem; color: var(--gold); line-height: 1; }
.ficha-form .dos { display: grid; grid-template-columns: 1fr 90px; gap: .6rem; }
.ficha-form .lnk {
  background: none; border: 0; cursor: pointer; color: var(--gold-soft);
  font-size: .62rem; letter-spacing: .1em; text-transform: uppercase; justify-self: end;
}
.ficha-form .lbl { display: grid; gap: .25rem; font-family: var(--font-ui); font-size: .78rem; color: var(--parchment); }
.ficha-form .inp {
  padding: .45rem .6rem; border-radius: 7px; border: 1px solid rgba(201,164,90,.35);
  background: rgba(0,0,0,.3); color: var(--paper); font-family: var(--font-body); font-size: .9rem; width: 100%;
}
`,N=8;function P(){let e=n(t),r=n(i),[a,s]=(0,E.useState)([]),[c,m]=(0,E.useState)([]),[_,v]=(0,E.useState)(0),[b,x]=(0,E.useState)([]),[S,w]=(0,E.useState)(null),[k,A]=(0,E.useState)(!1),[M,P]=(0,E.useState)(!1),[F,I]=(0,E.useState)(null),[L,R]=(0,E.useState)(!1);if((0,E.useEffect)(()=>R(!0),[]),(0,E.useEffect)(()=>{if(!e?.id)return;let t=o(e.id,s),n=ee(e.id,m);return()=>{t(),n()}},[e?.id]),(0,E.useEffect)(()=>{v(0),P(!1)},[e?.id,b.join(),S]),!L)return null;let z=!!e?.esBase,B=p(r,e),V=l(a),H=d(a);b.length&&(H=H.filter(e=>b.includes(e.estado))),S&&(H=H.filter(e=>(e.grupos||[]).includes(S)));let U=H.length,W=U?H[Math.min(_,U-1)]:null,G=()=>v(e=>(e-1+U)%U),K=()=>v(e=>(e+1)%U);function q(e){x(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])}let J=!!r&&!!e?.id&&!z;if(U===0)return(0,D.jsxs)(`div`,{className:`empty`,children:[(0,D.jsx)(`div`,{className:`ico`,children:`🏛️`}),(0,D.jsx)(`p`,{className:`muted`,children:z?`Aún no hay leyendas registradas.`:`Esta campaña todavía no tiene personajes.`}),J&&(0,D.jsx)(`button`,{className:`btn`,style:{marginTop:`.9rem`},onClick:()=>I(`nueva`),children:`+ Subir ficha`}),F&&(0,D.jsx)(j,{abierto:!0,campanaId:e.id,user:r,esGestor:B,personaje:F===`nueva`?null:F,onCerrar:()=>I(null)})]});let Y=!!W?.oculto&&!B&&W?.propietario!==r?.nombre,X=u(W,c),Z=e?.progresionXP||`media`,Q=g(W?.diarioMd||``,{maxPaginas:N}),$=Q.map((e,t)=>(0,D.jsxs)(`div`,{className:`pagina-md`,children:[t===0&&(0,D.jsx)(`div`,{className:`diario-xp`,children:(0,D.jsx)(T,{general:X.general,extra:X.extra,progresion:Z,compacta:!0})}),(0,D.jsx)(`div`,{dangerouslySetInnerHTML:{__html:e}})]},t));return(0,D.jsxs)(`div`,{className:`podios`,children:[(0,D.jsxs)(`div`,{className:`chips`,children:[(0,D.jsx)(`button`,{className:`chip ${b.length===0?`activo`:``}`,onClick:()=>x([]),children:`Todos`}),(z?[`historico`,...f]:f).map(e=>(0,D.jsx)(`button`,{className:`chip ${b.includes(e)?`activo`:``}`,onClick:()=>q(e),children:e.charAt(0).toUpperCase()+e.slice(1)},e)),V.length>0&&(0,D.jsx)(`span`,{className:`separador`,"aria-hidden":`true`}),V.map(e=>(0,D.jsx)(`button`,{className:`chip ${S===e?`activo`:``}`,onClick:()=>w(S===e?null:e),children:e},e)),J&&(0,D.jsx)(`button`,{className:`chip subir`,onClick:()=>I(`nueva`),title:`Subir la ficha de un personaje`,children:`+ Subir ficha`})]}),(0,D.jsxs)(`div`,{className:`escena-podio`,children:[(0,D.jsx)(O,{campanaId:e?.id,personaje:W,autor:r?.nombre,visible:B}),(0,D.jsx)(`button`,{className:`flecha izq`,onClick:G,"aria-label":`Personaje anterior`,disabled:U<2,children:`‹`}),(0,D.jsxs)(`div`,{className:`podio-centro`,children:[(0,D.jsxs)(`div`,{className:`figura ${Y?`oculta`:``}`,onClick:()=>!Y&&A(!0),children:[W?.imagenUrl?(0,D.jsx)(`img`,{src:W.imagenUrl,alt:Y?`Personaje oculto`:W.nombre}):(0,D.jsx)(`div`,{className:`sin-imagen`,children:(W?.nombre||`?`).charAt(0)}),Y&&(0,D.jsx)(`span`,{className:`mascara`,"aria-hidden":`true`})]}),(0,D.jsxs)(`div`,{className:`podio`,"aria-hidden":`true`,children:[(0,D.jsx)(`span`,{className:`foco izq`}),(0,D.jsx)(`span`,{className:`foco der`})]}),(0,D.jsxs)(`div`,{className:`datos`,children:[(0,D.jsx)(`h3`,{className:`nombre`,style:{fontFamily:e?.fuenteTitulo||`var(--font-title)`,color:e?.colorTexto||`var(--paper)`,WebkitTextStrokeColor:e?.colorContorno||`transparent`},children:Y?(0,D.jsx)(`span`,{className:`barra-negra`,children:`████████`}):W?.nombre}),(0,D.jsx)(`p`,{className:`mono sub`,children:Y?(0,D.jsx)(`span`,{className:`barra-negra`,children:`██████ · ██ · ██`}):[W?.clase,W?.raza,W?.edad&&`${W.edad} años`,W?.sexo].filter(Boolean).join(` · `)}),(0,D.jsxs)(`p`,{className:`mono sub`,children:[`Nivel `,Y?`—`:te(W,X.total,Z),` · `,(0,D.jsx)(`span`,{className:`badge ${W?.estado}`,children:W?.estado}),W?.propietario&&!z&&(0,D.jsxs)(D.Fragment,{children:[` · Jugador: `,Y?`—`:W.propietario]})]})]}),(0,D.jsxs)(`div`,{className:`botones-podio`,children:[(0,D.jsx)(`button`,{className:`btn ghost`,onClick:()=>A(!0),disabled:Y,children:`Ampliar personaje`}),(0,D.jsx)(`button`,{className:`btn ghost`,onClick:()=>P(e=>!e),disabled:Y,children:M?`Ocultar diario`:`Mostrar diario`}),(B||W?.propietario===r?.nombre)&&(0,D.jsx)(`button`,{className:`btn ghost`,onClick:()=>I(W),children:`Editar ficha`})]}),!Y&&W?.descripcion&&(0,D.jsx)(`p`,{className:`descripcion`,children:W.descripcion}),(0,D.jsxs)(`p`,{className:`mono contador`,children:[_+1,` / `,U]})]}),(0,D.jsx)(`button`,{className:`flecha der`,onClick:K,"aria-label":`Personaje siguiente`,disabled:U<2,children:`›`})]}),M&&!Y&&(0,D.jsx)(`div`,{className:`diario`,children:$.length>0?(0,D.jsx)(y,{titulo:`Diario de ${W.nombre}`,sub:W.raza||``,cubierta:`cuero-rojo`,paginas:$,titulosPaginas:Q.map((e,t)=>h(e,t))},`diario-${W.id}-${$.length}`):(0,D.jsxs)(`div`,{className:`panel center`,children:[(0,D.jsx)(T,{general:X.general,extra:X.extra,progresion:Z}),(0,D.jsx)(`p`,{className:`muted`,style:{marginTop:`.8rem`},children:`Este personaje aún no tiene diario.`})]})}),k&&!Y&&(0,D.jsx)(`div`,{className:`ampliado`,onClick:()=>A(!1),children:W?.imagenUrl?(0,D.jsx)(`img`,{src:W.imagenUrl,alt:W.nombre}):(0,D.jsx)(`div`,{className:`sin-imagen grande`,children:(W?.nombre||`?`).charAt(0)})}),W&&(0,D.jsx)(C,{tipo:`podios`,refId:W.id,titulo:`Comentarios del personaje`,requiereAprobacion:!0,puedeAprobarExtra:e=>e.nombre===W.propietario,exentoDeAprobacion:e=>e.nombre===W.propietario}),F&&(0,D.jsx)(j,{abierto:!0,campanaId:e.id,user:r,esGestor:B,personaje:F===`nueva`?null:F,onCerrar:()=>I(null)}),(0,D.jsx)(`style`,{children:ne})]})}function te(e,t,n){return t>0?w(t,n):Math.max(1,Number(e?.nivel)||1)}var ne=`
.podios { display: grid; gap: 1rem; }
.chips .subir { border-color: var(--gold); color: var(--gold); }
.chips .separador { width: 1px; height: 20px; background: rgba(201,164,90,.35); margin: 0 .3rem; }
.escena-podio { display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: .6rem; }
.flecha {
  width: 42px; height: 42px; border-radius: 50%; cursor: pointer; font-size: 1.4rem;
  background: rgba(14,17,22,.7); border: 1px solid rgba(201,164,90,.5); color: var(--gold);
}
.flecha:hover:not(:disabled) { background: rgba(201,164,90,.2); }
.flecha:disabled { opacity: .3; cursor: default; }
.podio-centro { display: grid; justify-items: center; }
.figura { position: relative; height: min(42vh, 380px); display: grid; place-items: end center; cursor: zoom-in; }
.figura img { max-height: 100%; max-width: min(90vw, 420px); object-fit: contain; filter: drop-shadow(0 18px 30px rgba(0,0,0,.6)); }
.sin-imagen {
  width: 150px; height: 220px; display: grid; place-items: center; border-radius: 8px;
  background: linear-gradient(160deg, var(--stone), #4a453c); color: var(--paper);
  font-family: var(--font-title); font-size: 3.6rem;
}
.sin-imagen.grande { width: 40vmin; height: 60vmin; font-size: 12vmin; }
.figura.oculta { cursor: default; }
.figura.oculta img { filter: grayscale(1) brightness(.35); }
.mascara {
  position: absolute; inset: 0;
  background: repeating-linear-gradient(115deg, rgba(0,0,0,.92) 0 26px, rgba(0,0,0,0) 26px 42px);
}
.podio {
  position: relative; width: min(300px, 78vw); height: 34px; margin-top: -4px;
  border-radius: 6px 6px 3px 3px;
  background: linear-gradient(180deg, #efece4, #b9b2a4 60%, #8a8478);
  box-shadow: 0 16px 34px rgba(0,0,0,.55), inset 0 2px 0 rgba(255,255,255,.5);
}
.podio .foco {
  position: absolute; top: -180px; width: 130px; height: 190px; pointer-events: none;
  background: linear-gradient(to bottom, rgba(255,246,220,.22), transparent 75%);
  filter: blur(10px);
}
.podio .foco.izq { left: -50px; transform: rotate(12deg); }
.podio .foco.der { right: -50px; transform: rotate(-12deg); }
.datos { text-align: center; margin-top: .9rem; }
.datos .nombre { margin: 0; font-size: clamp(1.4rem, 4vw, 2rem); -webkit-text-stroke-width: 1px; paint-order: stroke fill; }
.datos .sub { color: var(--parchment); font-size: .78rem; margin: .25rem 0 0; }
.barra-negra { background: #000; color: transparent; border-radius: 2px; }
.badge { text-transform: capitalize; }
.botones-podio { display: flex; gap: .6rem; margin-top: .9rem; flex-wrap: wrap; justify-content: center; }
.descripcion {
  max-width: 62ch; margin: .9rem auto 0; text-align: center; white-space: pre-wrap;
  color: var(--parchment); font-family: var(--font-body); font-size: .9rem; line-height: 1.6;
}
.contador { color: var(--stone); font-size: .68rem; margin-top: .6rem; }
.diario { margin-top: 1.4rem; }
.diario-xp { margin-bottom: .8rem; }
.ampliado {
  position: fixed; inset: 0; z-index: 140; display: grid; place-items: center; cursor: zoom-out;
  background: rgba(5,6,10,.8); backdrop-filter: blur(6px); padding: 4vh 4vw;
}
.ampliado img { max-height: 92vh; max-width: 92vw; object-fit: contain; }
@media (max-width: 720px) {
  .escena-podio { grid-template-columns: 1fr; }
  .flecha.izq { justify-self: start; }
  .flecha.der { justify-self: end; margin-top: -42px; }
}
`;export{P as default};