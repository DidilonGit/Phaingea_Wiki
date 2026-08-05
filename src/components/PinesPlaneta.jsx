import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $campaign, $campaigns } from '../stores/campaign.js';
import { suscribirLugares } from '../lib/db/lugares.js';
import { suscribirPinesPlaneta } from '../lib/db/planeta.js';

// ============================================================================
// PINES DE REGIONES SOBRE EL PLANETA (guía §8.4).
//
// Muestra los pines que la campaña activa ha puesto en SU planeta
// (/planeta/{campana}) sobre el globo del Observatorio. Los lugares salen de la
// campaña de la que se hereda la cartografía, pero los pines son de cada
// campaña: mismo mundo, distintos pines (§7, §8.4).
// Al pulsar uno aparece un recuadro con su nombre, un resumen breve, una
// imagen si la hay y el botón «Abrir en Cartografía», que cambia de sala y
// abre ese lugar (evento 'phaingea:abrir-lugar', que escucha MapaViewer).
//
// La proyección usa el mismo criterio que el globo: el punto se oculta cuando
// queda en la cara de atrás.
// ============================================================================

const RAD = Math.PI / 180;

export default function PinesPlaneta() {
  const campana = useStore($campaign);
  const campanas = useStore($campaigns);
  const [lugares, setLugares] = useState([]);
  const [pines, setPines] = useState({});
  const [abierto, setAbierto] = useState(null);
  const [giro, setGiro] = useState(0);
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  // Los lugares vienen de la campaña de origen (ella misma o de la que hereda).
  const origenId = campana?.categorias?.cartografia?.heredaDe || campana?.id;

  useEffect(() => {
    if (!origenId) return;
    return suscribirLugares(origenId, setLugares);
  }, [origenId]);

  // Los pines del planeta son SIEMPRE de la campaña activa.
  useEffect(() => {
    if (!campana?.id) return;
    setAbierto(null);
    return suscribirPinesPlaneta(campana.id, setPines);
  }, [campana?.id]);

  // Seguimos el giro del globo (el prototipo expone su estado en __engren).
  useEffect(() => {
    if (!montado) return;
    const id = setInterval(() => {
      const st = window.__engren?.st;
      if (st) setGiro(st.rotY || 0);
    }, 120);
    return () => clearInterval(id);
  }, [montado]);

  if (!montado) return null;

  const porId = Object.fromEntries(lugares.map((l) => [l.id, l]));
  const marcados = Object.entries(pines)
    .filter(([id, p]) => porId[id] && typeof p?.lat === 'number' && typeof p?.lon === 'number')
    .map(([id, p]) => ({ ...porId[id], lat: p.lat, lon: p.lon }));
  if (marcados.length === 0) return null;

  // Proyección ortográfica sencilla: igual que el globo de puntos.
  const colocados = marcados.map((l) => {
    const f = l.lat * RAD;
    const lon = l.lon * RAD + giro;
    const x = Math.cos(f) * Math.sin(lon);
    const y = Math.sin(f);
    const z = Math.cos(f) * Math.cos(lon); // > 0 = cara visible
    return {
      lugar: l,
      visible: z > 0.06,
      left: 50 + x * 46,
      top: 50 - y * 46,
      opacidad: 0.35 + 0.65 * Math.max(0, z),
    };
  });

  const abiertoObj = colocados.find((p) => p.lugar.id === abierto);

  return (
    <div className="pines-planeta">
      {colocados.map((p) =>
        p.visible ? (
          <button
            key={p.lugar.id}
            className={`pin-planeta ${abierto === p.lugar.id ? 'abierto' : ''}`}
            style={{ left: `${p.left}%`, top: `${p.top}%`, opacity: p.opacidad }}
            onClick={() => setAbierto(abierto === p.lugar.id ? null : p.lugar.id)}
            title={p.lugar.nombre}
          >
            <b />
            <em>{p.lugar.nombre}</em>
          </button>
        ) : null
      )}

      {abiertoObj && abiertoObj.visible && (
        <div className="ficha-region">
          <button className="cerrar" onClick={() => setAbierto(null)} aria-label="Cerrar">✕</button>
          <h4>{abiertoObj.lugar.nombre}</h4>
          {abiertoObj.lugar.imagenUrl && <img src={abiertoObj.lugar.imagenUrl} alt="" />}
          <p className="muted">{abiertoObj.lugar.resumen || 'Sin resumen todavía.'}</p>
          <button
            className="btn"
            onClick={() => {
              const id = abiertoObj.lugar.id;
              setAbierto(null);
              document.querySelector('.bm[data-view="cartografia"]')?.click();
              window.dispatchEvent(new CustomEvent('phaingea:abrir-lugar', { detail: { lugarId: id } }));
            }}
          >
            Abrir en Cartografía
          </button>
        </div>
      )}

      <style>{css}</style>
    </div>
  );
}

const css = `
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
.ficha-region {
  position: absolute; left: 50%; bottom: -8%; transform: translateX(-50%);
  width: min(280px, 84%); z-index: 30; pointer-events: auto;
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
`;
