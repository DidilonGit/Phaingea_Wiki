import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $campaigns, $campaign, setCampaign } from '../stores/campaign.js';
import { $user } from '../stores/user.js';
import { campanasVisibles } from '../lib/permisos.js';

// ============================================================================
// DIAL DE CAMPAÑAS (guía §8.3) — se monta DENTRO de .globo-wrap del
// Observatorio, sobre el arco de latón.
//
// Geometría: los planetas viajan por un arco que pasa por encima del planeta
// central. El ángulo φ mide desde el vértice (arriba): φ=0 arriba, φ<0 a la
// izquierda, φ>0 a la derecha.
//     left% = 50 + R·sin(φ)      top% = 50 − R·cos(φ)
// La profundidad es d = cos(φ): a más lejos del vértice, más pequeño y más
// tenue (efecto tridimensional). Con |φ| > 90° el planeta ha pasado DETRÁS
// del planeta central y se oculta.
//
// Base de Phaingea va SIEMPRE fija en el vértice, con contorno propio, y no la
// tapa ninguna otra campaña (guía §6).
//
// Interacción: rueda del ratón, botones ‹ ›, arrastre y teclado. Al soltar se
// encaja (snap) en el hueco más cercano. Pulsar un planeta lo hace campaña
// activa.
// ============================================================================

const RADIO = 47; // % del contenedor
const PASO = 34; // grados entre campañas

export default function DialCampanas() {
  const todas = useStore($campaigns);
  const activa = useStore($campaign);
  const user = useStore($user);
  const [offset, setOffset] = useState(0); // grados de giro del dial
  const [hover, setHover] = useState(null);
  const [montado, setMontado] = useState(false);
  const arrastre = useRef(null);

  useEffect(() => setMontado(true), []);

  // Solo las campañas que el usuario puede ver (guía §21.5).
  const visibles = campanasVisibles(user, todas);
  const base = visibles.find((c) => c.esBase);
  const otras = visibles.filter((c) => !c.esBase);

  // Al cambiar de campaña activa, girar el dial para traerla al frente.
  useEffect(() => {
    if (!activa || activa.esBase) return;
    const i = otras.findIndex((c) => c.id === activa.id);
    if (i >= 0) setOffset(-i * PASO);
  }, [activa?.id, otras.length]);

  // Rueda del ratón sobre el dial.
  function onWheel(e) {
    e.preventDefault();
    setOffset((o) => o + (e.deltaY > 0 ? -PASO : PASO));
  }

  // Arrastre horizontal.
  function onDown(e) {
    arrastre.current = { x: e.clientX, offset };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }
  function onMove(e) {
    if (!arrastre.current) return;
    const dx = e.clientX - arrastre.current.x;
    setOffset(arrastre.current.offset + dx * 0.25);
  }
  function onUp() {
    if (!arrastre.current) return;
    arrastre.current = null;
    setOffset((o) => Math.round(o / PASO) * PASO); // encajar
  }

  if (!montado || visibles.length === 0) return null;

  // Posición de cada campaña que gira.
  const colocadas = otras.map((c, i) => {
    let phi = i * PASO + offset;
    phi = ((((phi + 180) % 360) + 360) % 360) - 180; // normalizar a (-180, 180]
    const rad = (phi * Math.PI) / 180;
    const d = Math.cos(rad); // profundidad
    return {
      campana: c,
      phi,
      visible: Math.abs(phi) <= 90,
      left: 50 + RADIO * Math.sin(rad),
      top: 50 - RADIO * d,
      escala: 0.55 + 0.45 * Math.max(0, d),
      opacidad: 0.25 + 0.75 * Math.max(0, d),
      z: Math.round(10 + d * 10),
    };
  });

  return (
    <div
      className="dial"
      onWheel={onWheel}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      role="listbox"
      aria-label="Selector de campañas"
    >
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

      {colocadas.map((p) =>
        p.visible ? (
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
        ) : null
      )}

      {/* botones de giro */}
      {otras.length > 1 && (
        <>
          <button className="dial-btn izq" onClick={() => setOffset((o) => o + PASO)} aria-label="Girar a la izquierda">‹</button>
          <button className="dial-btn der" onClick={() => setOffset((o) => o - PASO)} aria-label="Girar a la derecha">›</button>
        </>
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
      aria-label={c.nombre}
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
.dial { position: absolute; inset: 0; z-index: 6; touch-action: none; }
.dial-planeta {
  position: absolute; width: 46px; height: 46px; border-radius: 50%;
  border: 0; cursor: pointer; padding: 0; overflow: visible;
  display: grid; place-items: center;
  background:
    radial-gradient(circle at 32% 28%, rgba(255,255,255,.4), transparent 45%),
    linear-gradient(140deg, var(--pa), var(--pb) 72%);
  box-shadow: 0 2px 10px rgba(0,0,0,.6), inset 0 0 12px rgba(0,0,0,.35);
  transition: filter .18s var(--ease);
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
  position: absolute; top: 46%; z-index: 50;
  width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 1.1rem;
  background: rgba(14,17,22,.7); border: 1px solid rgba(201,164,90,.5); color: var(--gold);
}
.dial-btn:hover { background: rgba(201,164,90,.2); }
.dial-btn.izq { left: -6%; }
.dial-btn.der { right: -6%; }
`;
