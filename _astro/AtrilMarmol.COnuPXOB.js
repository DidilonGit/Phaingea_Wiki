import{t as e,x as t}from"./campaign.DEk2Juoy.js";import{t as n}from"./jsx-runtime.DvA2kLYf.js";var r=n();function i(){let n=t(e),i=(n?.nombre||`P`).charAt(0).toUpperCase();return(0,r.jsxs)(`div`,{className:`atril`,"aria-hidden":`true`,children:[(0,r.jsxs)(`div`,{className:`atril-tablero-zona`,children:[(0,r.jsx)(`span`,{className:`remache izq`}),(0,r.jsx)(`span`,{className:`remache der`}),(0,r.jsxs)(`div`,{className:`atril-tablero`,children:[(0,r.jsx)(`div`,{className:`atril-tablero-cara`}),(0,r.jsx)(`span`,{className:`atril-lomo`})]})]}),(0,r.jsx)(`div`,{className:`atril-banda`}),(0,r.jsxs)(`div`,{className:`atril-cuerpo-zona`,children:[(0,r.jsx)(`span`,{className:`voluta izq`}),(0,r.jsx)(`span`,{className:`voluta der`}),(0,r.jsxs)(`div`,{className:`atril-cuerpo`,children:[(0,r.jsx)(`span`,{className:`filete arriba`}),(0,r.jsx)(`span`,{className:`filete abajo`}),(0,r.jsx)(`div`,{className:`medallon`,children:(0,r.jsx)(`div`,{className:`medallon-hueco`,children:n?.logoUrl?(0,r.jsx)(`img`,{src:n.logoUrl,alt:``}):(0,r.jsx)(`span`,{className:`medallon-inicial`,children:i})})})]})]}),(0,r.jsxs)(`div`,{className:`atril-fuste`,children:[(0,r.jsx)(`span`,{className:`anilla arriba`}),(0,r.jsx)(`span`,{className:`anilla medio`}),(0,r.jsx)(`span`,{className:`anilla abajo`})]}),(0,r.jsxs)(`div`,{className:`atril-peana`,children:[(0,r.jsx)(`span`,{className:`grada uno`}),(0,r.jsx)(`span`,{className:`grada dos`}),(0,r.jsx)(`span`,{className:`grada tres`})]}),(0,r.jsx)(`style`,{children:a})]})}var a=`
.atril {
  --atril-ancho: min(460px, 86vw);
  --marmol: linear-gradient(125deg, transparent 40%, rgba(170,160,140,.18) 41%, transparent 42%),
            linear-gradient(95deg, transparent 58%, rgba(150,140,120,.14) 59%, transparent 61%),
            linear-gradient(160deg, #f6f1e8, #e8dcc8 45%, #f3eee3 75%, #ddd0b8 100%);
  --laton: linear-gradient(135deg, #b8860b 0%, #e8c25f 25%, #fdf0c0 45%, #d4a437 60%, #a67c1e 80%, #f0d78a 100%);
  --laton-filete: linear-gradient(90deg, #a67c1e, #f0d78a, #a67c1e);
  width: var(--atril-ancho);
  margin: 0 auto;
  display: flex; flex-direction: column; align-items: center;
  position: relative; user-select: none; pointer-events: none;
}

/* ---- tablero inclinado ---- */
.atril-tablero-zona { position: relative; width: 100%; }
.atril .remache {
  position: absolute; top: -14px; width: 16px; height: 16px; border-radius: 50%;
  background: linear-gradient(135deg, #f5d98a, #b8860b);
  box-shadow: 0 1px 3px rgba(0,0,0,.35); transform: translateX(-50%); z-index: 3;
}
.atril .remache.izq { left: 18%; }
.atril .remache.der { left: 82%; }
.atril-tablero {
  position: relative; width: 100%; height: calc(var(--atril-ancho) * .19);
  clip-path: polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%);
  background: var(--laton);
  box-shadow: 0 6px 14px rgba(0,0,0,.25);
}
.atril-tablero-cara {
  position: absolute; inset: 7px 14px;
  clip-path: polygon(16% 0%, 84% 0%, 100% 100%, 0% 100%);
  background-image: var(--marmol);
}
.atril-lomo {
  position: absolute; left: 50%; top: 7px; bottom: 7px; width: 2px;
  background: rgba(150,110,35,.35); transform: translateX(-50%);
}

/* ---- banda de latón ---- */
.atril-banda {
  width: 100%; height: 14px; margin-top: -1px;
  background: linear-gradient(180deg, #e8c25f, #a67c1e);
  box-shadow: 0 3px 6px rgba(0,0,0,.3);
}

/* ---- cuerpo con el medallón ---- */
.atril-cuerpo-zona { position: relative; width: 56%; height: 110px; margin-top: 2px; }
.atril .voluta {
  position: absolute; top: 0; width: 26px; height: 44px;
  background-image: var(--marmol);
}
.atril .voluta.izq { left: -22px; border-top-right-radius: 100%; box-shadow: 2px 2px 5px rgba(0,0,0,.2); }
.atril .voluta.der { right: -22px; border-top-left-radius: 100%; box-shadow: -2px 2px 5px rgba(0,0,0,.2); }
.atril-cuerpo {
  position: relative; width: 100%; height: 100%;
  background-image: var(--marmol);
  box-shadow: 0 4px 10px rgba(0,0,0,.15);
}
.atril .filete { position: absolute; left: 0; right: 0; height: 3px; background: var(--laton-filete); }
.atril .filete.arriba { top: 0; }
.atril .filete.abajo { bottom: 0; }
.medallon {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 92px; height: 92px; border-radius: 50%;
  background: linear-gradient(135deg, #b8860b, #f5d98a, #a3781c);
  box-shadow: 0 2px 8px rgba(0,0,0,.3), inset 0 0 0 2px rgba(255,255,255,.3);
  display: grid; place-items: center;
}
.medallon-hueco {
  width: 76px; height: 76px; border-radius: 50%; overflow: hidden;
  display: grid; place-items: center; background: #2a1d10;
}
.medallon-hueco img { width: 100%; height: 100%; object-fit: cover; display: block; }
.medallon-inicial { font-family: var(--font-title); font-size: 2.2rem; color: #f3e2b4; }

/* ---- fuste ---- */
.atril-fuste {
  position: relative; width: 26%; height: 150px; margin-top: 2px;
  background-image:
    linear-gradient(100deg, transparent 30%, rgba(160,150,130,.15) 31%, transparent 33%),
    linear-gradient(80deg, transparent 55%, rgba(150,140,120,.12) 56%, transparent 58%),
    linear-gradient(90deg, #d8cbb4 0%, #f3eee3 20%, #f8f4ec 35%, #eee5d4 55%, #d2c4a9 80%, #e6d9c1 100%);
  box-shadow: 0 4px 10px rgba(0,0,0,.15);
}
.atril .anilla { position: absolute; left: 0; right: 0; background: linear-gradient(180deg, #f0d78a, #a67c1e); }
.atril .anilla.arriba { top: 0; height: 10px; }
.atril .anilla.medio { top: 44%; height: 6px; }
.atril .anilla.abajo { bottom: 0; height: 10px; }

/* ---- peana escalonada ---- */
.atril-peana { display: flex; flex-direction: column; align-items: center; width: 100%; }
.atril .grada { position: relative; background-image: var(--marmol); }
.atril .grada::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--laton-filete);
}
.atril .grada.uno { width: 34%; height: 16px; box-shadow: 0 2px 4px rgba(0,0,0,.15); }
.atril .grada.dos { width: 46%; height: 18px; box-shadow: 0 3px 5px rgba(0,0,0,.18); }
.atril .grada.tres { width: 60%; height: 20px; box-shadow: 0 4px 8px rgba(0,0,0,.22); }
`;export{i as default};