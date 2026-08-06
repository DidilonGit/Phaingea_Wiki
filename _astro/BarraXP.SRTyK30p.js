import{t as e}from"./jsx-runtime.DvA2kLYf.js";var t={rapida:[0,1300,3300,6e3,1e4,15e3,23e3,34e3,5e4,71e3,105e3,145e3,21e4,295e3,425e3,6e5,85e4,12e5,17e5,24e5],media:[0,2e3,5e3,9e3,15e3,23e3,35e3,51e3,75e3,105e3,155e3,22e4,315e3,445e3,635e3,89e4,13e5,18e5,255e4,36e5],lenta:[0,3e3,7500,14e3,23e3,35e3,53e3,77e3,115e3,16e4,235e3,33e4,475e3,665e3,955e3,135e4,19e5,27e5,385e4,535e4]};function n(e){return t[e]||t.media}function r(e,t=`media`){let r=n(t),i=Math.max(0,Number(e)||0),a=1;for(let e=1;e<r.length&&i>=r[e];e++)a=e+1;return a}function i(e,t=`media`){return n(t)[Math.min(Math.max(1,e),20)-1]}function a(e,t=`media`){let n=Math.max(0,Number(e)||0),a=r(n,t),o=i(a,t);if(a>=20)return{nivel:a,dentro:0,necesaria:0,siguiente:o,restante:0,porcentaje:100};let s=i(a+1,t),c=s-o,l=n-o;return{nivel:a,dentro:l,necesaria:c,siguiente:s,restante:s-n,porcentaje:c>0?Math.min(100,l/c*100):0}}var o=e();function s({general:e=0,extra:t=0,progresion:n=`media`,compacta:r=!1}){let i=(Number(e)||0)+(Number(t)||0),s=a(i,n),l=s.dentro,u=i>0?(Number(t)||0)/i:0,d=s.necesaria>0?Math.min(100,l*u/s.necesaria*100):0,f=Math.max(0,s.porcentaje-d);return(0,o.jsxs)(`div`,{className:`barraxp`,children:[(0,o.jsxs)(`div`,{className:`barraxp-pista`,role:`progressbar`,"aria-label":`Experiencia`,"aria-valuenow":l,"aria-valuemin":0,"aria-valuemax":s.necesaria,title:`General: ${e} · Extra: ${t} · Total: ${i}`,children:[(0,o.jsx)(`i`,{className:`xp-general`,style:{width:`${f}%`}}),(0,o.jsx)(`i`,{className:`xp-extra`,style:{width:`${d}%`}})]}),(0,o.jsxs)(`div`,{className:`barraxp-pie mono`,children:[(0,o.jsx)(`span`,{children:s.nivel>=20?`Nivel 20 (máximo)`:`${l} / ${s.necesaria} — Nivel ${s.nivel}`}),!r&&(0,o.jsxs)(`span`,{className:`barraxp-leyenda`,children:[(0,o.jsx)(`b`,{className:`pt general`}),` general `,e,(0,o.jsx)(`b`,{className:`pt extra`}),` extra `,t]})]}),(0,o.jsx)(`style`,{children:c})]})}var c=`
.barraxp { display: grid; gap: .3rem; }
.barraxp-pista {
  display: flex; height: 12px; border-radius: 999px; overflow: hidden;
  background: rgba(0,0,0,.4); border: 1px solid rgba(201,164,90,.3);
}
.barraxp-pista i { display: block; height: 100%; transition: width .4s var(--ease); }
.xp-general { background: linear-gradient(90deg, #b98a3c, var(--gold)); }
.xp-extra   { background: linear-gradient(90deg, #6f9e5c, #9fd07a); }
.barraxp-pie {
  display: flex; justify-content: space-between; gap: .8rem; flex-wrap: wrap;
  font-size: .72rem; color: var(--parchment);
}
.barraxp-leyenda { display: inline-flex; align-items: center; gap: .3rem; color: var(--stone); font-size: .66rem; }
.barraxp-leyenda .pt { width: 9px; height: 9px; border-radius: 2px; display: inline-block; margin-left: .5rem; }
.barraxp-leyenda .pt.general { background: var(--gold); }
.barraxp-leyenda .pt.extra { background: #9fd07a; }
`;export{r as n,s as t};