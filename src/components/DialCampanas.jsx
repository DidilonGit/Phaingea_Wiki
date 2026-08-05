import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $campaigns, $campaign, setCampaign } from '../stores/campaign.js';
import { $user } from '../stores/user.js';
import { campanasVisibles } from '../lib/permisos.js';

// ============================================================================
// DIAL DE CAMPAÑAS (guía §8.3) — se monta DENTRO de .globo-wrap del
// Observatorio, sobre el arco de latón.
//
// GEOMETRÍA
//   El ángulo φ se mide desde el vértice (arriba): φ=0 arriba, φ<0 a la
//   izquierda, φ>0 a la derecha.
//       left% = 50 + R·sin(φ)      top% = 50 − R·cos(φ)
//   Base de Phaingea va SIEMPRE fija en el vértice (φ=0) y no la tapa nadie.
//
//   Las demás campañas recorren el arco EVITANDO el vértice: viven en
//   φ ∈ [HUECO, ARCO] ∪ [−ARCO, −HUECO]. Al girar, cuando una llegaría al
//   vértice SALTA al otro lado en vez de esconderse detrás de Base, y cuando
//   llega al extremo del arco reaparece por el extremo contrario.
//   Así, por defecto, todas las campañas se ven en el dial; solo si hay más
//   de las que caben se ocultan las MÁS ANTIGUAS (menor `orden`).
//
// INTERACCIÓN (importante)
//   El dial NO captura el ratón sobre todo el globo: solo la banda del arco
//   (un círculo SVG con pointer-events en el trazo). Así el planeta central
//   se sigue pudiendo arrastrar y los clics en un planeta cambian de campaña.
//   Se gira con la rueda, arrastrando la banda, con los botones ‹ › y con las
//   flechas del teclado.
// ============================================================================

const RADIO = 47; // % del contenedor
const PASO = 34; // separación cómoda entre campañas (grados)
const PASO_MIN = 13; // si hay muchas, se aprietan hasta aquí (sin solaparse)
const ARCO = 88; // hasta dónde llega el dial a cada lado
const HUECO = 22; // separación mínima con Base (que ocupa el vértice)
const RECORRIDO = 2 * (ARCO - HUECO); // longitud útil del arco

/** Coloca un avance `t` (0..RECORRIDO) en el arco, saltando por encima de Base. */
function anguloDesde(t) {
  const mitad = ARCO - HUECO;
  const x = ((t % RECORRIDO) + RECORRIDO) % RECORRIDO;
  // Primera mitad: baja por la derecha. Segunda: entra por la izquierda y sube.
  return x < mitad ? HUECO + x : -ARCO + (x - mitad);
}

export default function DialCampanas() {
  const todas = useStore($campaigns);
  const activa = useStore($campaign);
  const user = useStore($user);
  const [offset, setOffset] = useState(0); // grados de giro del dial
  const [hover, setHover] = useState(null);
  const [montado, setMontado] = useState(false);
  const arrastre = useRef(null);
  const pasoRef = useRef(PASO); // el paso actual, para el encaje y los botones

  useEffect(() => setMontado(true), []);

  // Solo las campañas que el usuario puede ver (guía §21.5).
  const visibles = campanasVisibles(user, todas);
  const base = visibles.find((c) => c.esBase);

  // Las que giran, de más nueva a más antigua. La separación se ajusta para
  // que quepan TODAS; solo si son tantas que ni apretándolas caben, se quedan
  // fuera las más antiguas.
  const otrasTodas = visibles.filter((c) => !c.esBase).sort((a, b) => (b.orden || 0) - (a.orden || 0));
  const paso = otrasTodas.length
    ? Math.min(PASO, Math.max(PASO_MIN, RECORRIDO / otrasTodas.length))
    : PASO;
  const capacidad = Math.max(1, Math.floor(RECORRIDO / paso));
  const otras = otrasTodas.slice(0, capacidad);
  const ocultas = otrasTodas.length - otras.length;

  // Al cambiar de campaña activa, girar el dial para traerla arriba del todo.
  useEffect(() => {
    if (!activa || activa.esBase) return;
    const i = otras.findIndex((c) => c.id === activa.id);
    if (i >= 0) setOffset(-i * paso);
  }, [activa?.id, otras.length]);

  // Girar con las flechas del teclado (guía §30: no depender solo del hover).
  useEffect(() => {
    if (!montado) return;
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, select, [role="dialog"]')) return;
      const obs = document.querySelector('.view[data-view="inicio"]');
      if (!obs || obs.hidden) return; // solo en el Observatorio
      if (e.key === 'ArrowLeft') setOffset((o) => o + pasoRef.current);
      if (e.key === 'ArrowRight') setOffset((o) => o - pasoRef.current);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [montado]);

  // --- giro con rueda y arrastre, SOLO sobre la banda del arco ---
  function onWheel(e) {
    e.preventDefault();
    setOffset((o) => o + (e.deltaY > 0 ? -pasoRef.current : pasoRef.current));
  }
  function onDown(e) {
    arrastre.current = { x: e.clientX, offset };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }
  function onMove(e) {
    if (!arrastre.current) return;
    setOffset(arrastre.current.offset + (e.clientX - arrastre.current.x) * 0.25);
  }
  function onUp() {
    if (!arrastre.current) return;
    arrastre.current = null;
    setOffset((o) => Math.round(o / pasoRef.current) * pasoRef.current); // encajar
  }

  pasoRef.current = paso;

  if (!montado || visibles.length === 0) return null;

  const colocadas = otras.map((c, i) => {
    const phi = anguloDesde(i * paso + offset);
    const rad = (phi * Math.PI) / 180;
    const d = Math.cos(rad); // profundidad: 1 arriba, 0 en los extremos
    return {
      campana: c,
      left: 50 + RADIO * Math.sin(rad),
      top: 50 - RADIO * d,
      escala: 0.62 + 0.38 * Math.max(0, d),
      opacidad: 0.5 + 0.5 * Math.max(0, d),
      z: Math.round(10 + d * 10),
    };
  });

  return (
    <div className="dial" role="listbox" aria-label="Selector de campañas">
      {/* Banda del arco: lo ÚNICO que captura el ratón para girar el dial.
          El trazo del círculo recibe los eventos y el interior queda libre,
          así el planeta central se sigue arrastrando con normalidad. */}
      <svg
        className="dial-banda"
        viewBox="0 0 100 100"
        onWheel={onWheel}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r={RADIO} fill="none" stroke="transparent" strokeWidth="13" />
      </svg>

      {/* Base de Phaingea: fija en el vértice, nunca se oculta */}
      {base && (
        <Planeta
          campana={base}
          left={50}
          top={50 - RADIO}
          escala={1}
          opacidad={1}
          z={40}
          esBase
          activa={activa?.id === base.id}
          hover={hover === base.id}
          setHover={setHover}
        />
      )}

      {colocadas.map((p) => (
        <Planeta
          key={p.campana.id}
          campana={p.campana}
          left={p.left}
          top={p.top}
          escala={p.escala}
          opacidad={p.opacidad}
          z={p.z}
          activa={activa?.id === p.campana.id}
          hover={hover === p.campana.id}
          setHover={setHover}
        />
      ))}

      {/* botones de giro */}
      {otras.length > 1 && (
        <>
          <button className="dial-btn izq" onClick={() => setOffset((o) => o + paso)} aria-label="Girar a la izquierda">‹</button>
          <button className="dial-btn der" onClick={() => setOffset((o) => o - paso)} aria-label="Girar a la derecha">›</button>
        </>
      )}

      {ocultas > 0 && (
        <span className="dial-ocultas mono" title="Gira el dial para alcanzarlas">
          +{ocultas} más antigua{ocultas === 1 ? '' : 's'}
        </span>
      )}

      <style>{css}</style>
    </div>
  );
}

function Planeta({ campana: c, left, top, escala, opacidad, z, esBase, activa, hover, setHover }) {
  const iniciales = (c.nombre || '?')
    .replace(/^(el|la|los|las|de|del)\s+/i, '')
    .slice(0, 2)
    .toUpperCase();
  const p = c.planeta || {};
  return (
    <button
      className={`dial-planeta ${esBase ? 'base' : ''} ${activa ? 'activa' : ''}`}
      style={{
        left: `${left}%`,
        top: `${top}%`,
        transform: `translate(-50%, -50%) scale(${escala})`,
        opacity: opacidad,
        zIndex: z,
        '--pa': p.colorA || '#5b6a8a',
        '--pb': p.colorB || '#2b3350',
      }}
      onClick={() => setCampaign(c.id)}
      onMouseEnter={() => setHover(c.id)}
      onMouseLeave={() => setHover(null)}
      role="option"
      aria-selected={activa}
      aria-label={`Entrar en ${c.nombre}`}
      title={c.nombre}
    >
      {c.logoUrl ? <img src={c.logoUrl} alt="" /> : <span className="dial-iniciales">{iniciales}</span>}
      {/* estado de la campaña, tipo insignia (guía §5.1) */}
      {c.estado && c.estado !== 'activa' && <i className={`dial-estado ${c.estado}`} title={c.estado} />}
      {hover && <span className="dial-nombre">{c.nombre}</span>}
    </button>
  );
}

const css = `
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
  transition: filter .18s var(--ease), transform .25s var(--ease), top .25s var(--ease), left .25s var(--ease);
}
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
.dial-btn {
  position: absolute; top: 46%; z-index: 50; pointer-events: auto;
  width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 1.1rem;
  background: rgba(14,17,22,.7); border: 1px solid rgba(201,164,90,.5); color: var(--gold);
}
.dial-btn:hover { background: rgba(201,164,90,.2); }
.dial-btn.izq { left: -6%; }
.dial-btn.der { right: -6%; }
.dial-ocultas {
  position: absolute; left: 50%; top: -4%; transform: translateX(-50%);
  font-size: .58rem; letter-spacing: .1em; text-transform: uppercase;
  color: var(--stone); pointer-events: none;
}
`;
