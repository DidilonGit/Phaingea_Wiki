import { useEffect, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $campaign, $campaigns } from '../stores/campaign.js';
import { $user } from '../stores/user.js';
import { puedeGestionar } from '../lib/permisos.js';
import { aHtml } from '../lib/markdown.js';
import Comentarios from './Comentarios.jsx';
import {
  suscribirLugares,
  lugarPredeterminado,
  hijosDe,
  camino,
  ordenAlfabetico,
} from '../lib/db/lugares.js';

// ============================================================================
// VISOR DE CARTOGRAFÍA (guía §10) — mapa activo + herramientas + información.
//
//  · Sin herramienta: arrastrar para moverse, rueda para acercar/alejar,
//    pulsar pines para ver el resumen y entrar en el lugar (§10.3).
//  · LUPA (§10.4): se descuelga del gancho, sigue al cursor y amplía la zona
//    bajo la lente. Se devuelve al gancho para salir.
//  · COMPÁS (§10.4): dibuja círculos o trazo libre en cuatro colores.
//  · PAÑO (§10.4): borra por arrastre; botón aparte para limpiar todo.
//    Los dibujos son temporales y personales (se guardan por lugar en el
//    navegador, así sobreviven a una recarga sin cargar la base de datos).
//  · Debajo: nombre del lugar, "Mostrar información" desplegable, lista
//    alfabética de lugares y comentarios del lugar activo (§10.5-§10.8).
//
// Escucha el evento 'phaingea:abrir-lugar' que lanza el Observatorio (T20).
// ============================================================================

const COLORES = ['#c9564f', '#c9a45a', '#6f9e5c', '#5f93b8'];
const ZOOM_MIN = 0.6;
const ZOOM_MAX = 6;

export default function MapaViewer() {
  const campana = useStore($campaign);
  const campanas = useStore($campaigns);
  const user = useStore($user);
  const [lugares, setLugares] = useState([]);
  const [activoId, setActivoId] = useState(null);
  const [vista, setVista] = useState({ x: 0, y: 0, z: 1 });
  const [pinAbierto, setPinAbierto] = useState(null);
  const [herramienta, setHerramienta] = useState(null); // 'lupa' | 'compas' | 'pano'
  const [color, setColor] = useState(COLORES[0]);
  const [modoCompas, setModoCompas] = useState('circulo'); // 'circulo' | 'libre'
  const [lupaPos, setLupaPos] = useState(null);
  const [infoAbierta, setInfoAbierta] = useState(false);
  const [montado, setMontado] = useState(false);

  const lienzoRef = useRef(null);
  const marcoRef = useRef(null);
  const arrastre = useRef(null);
  const trazo = useRef(null);

  useEffect(() => setMontado(true), []);

  // Origen de los lugares: la campaña o aquella de la que hereda (§7).
  const origenId = campana?.categorias?.cartografia?.heredaDe || campana?.id;
  const origen = campanas.find((c) => c.id === origenId);
  const heredado = !!origenId && origenId !== campana?.id;

  // Lugares (del origen) en tiempo real.
  useEffect(() => {
    if (!origenId) return;
    return suscribirLugares(origenId, (l) => {
      setLugares(l);
      setActivoId((prev) => (prev && l.some((x) => x.id === prev) ? prev : lugarPredeterminado(l)?.id || null));
    });
  }, [origenId]);

  // El Observatorio puede pedir abrir un lugar concreto (T20, §8.4).
  useEffect(() => {
    const abrir = (e) => e.detail?.lugarId && setActivoId(e.detail.lugarId);
    window.addEventListener('phaingea:abrir-lugar', abrir);
    return () => window.removeEventListener('phaingea:abrir-lugar', abrir);
  }, []);

  const activo = lugares.find((l) => l.id === activoId) || null;
  const pines = activo?.pines || {};
  const porId = Object.fromEntries(lugares.map((l) => [l.id, l]));

  // --- dibujos temporales por lugar (se recuperan al volver) ---
  const claveDibujo = origenId && activoId ? `phaingea_dibujo_${origenId}_${activoId}` : null;

  useEffect(() => {
    const cv = lienzoRef.current;
    if (!cv || !claveDibujo) return;
    const ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, cv.width, cv.height);
    const guardado = localStorage.getItem(claveDibujo);
    if (guardado) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = guardado;
    }
  }, [claveDibujo]);

  function guardarDibujo() {
    const cv = lienzoRef.current;
    if (!cv || !claveDibujo) return;
    try {
      localStorage.setItem(claveDibujo, cv.toDataURL('image/png'));
    } catch (_) {
      /* si no cabe, los dibujos son efímeros */
    }
  }

  function limpiarTodo() {
    const cv = lienzoRef.current;
    if (!cv) return;
    cv.getContext('2d').clearRect(0, 0, cv.width, cv.height);
    if (claveDibujo) localStorage.removeItem(claveDibujo);
  }

  // --- interacción con el mapa ---
  function coordenadasLienzo(e) {
    const cv = lienzoRef.current;
    const r = cv.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * cv.width, y: ((e.clientY - r.top) / r.height) * cv.height };
  }

  function onDown(e) {
    if (herramienta === 'compas' || herramienta === 'pano') {
      const p = coordenadasLienzo(e);
      trazo.current = { inicio: p, ultimo: p };
      e.currentTarget.setPointerCapture?.(e.pointerId);
      return;
    }
    if (herramienta === 'lupa') return;
    arrastre.current = { x: e.clientX, y: e.clientY, vx: vista.x, vy: vista.y };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }

  function onMove(e) {
    if (herramienta === 'lupa') {
      const r = marcoRef.current.getBoundingClientRect();
      setLupaPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      return;
    }
    if (trazo.current) {
      const cv = lienzoRef.current;
      const ctx = cv.getContext('2d');
      const p = coordenadasLienzo(e);
      if (herramienta === 'pano') {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 26;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(trazo.current.ultimo.x, trazo.current.ultimo.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.restore();
      } else if (modoCompas === 'libre') {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(trazo.current.ultimo.x, trazo.current.ultimo.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      trazo.current.ultimo = p;
      return;
    }
    if (!arrastre.current) return;
    setVista((v) => ({
      ...v,
      x: arrastre.current.vx + (e.clientX - arrastre.current.x),
      y: arrastre.current.vy + (e.clientY - arrastre.current.y),
    }));
  }

  function onUp(e) {
    if (trazo.current) {
      if (herramienta === 'compas' && modoCompas === 'circulo') {
        const cv = lienzoRef.current;
        const ctx = cv.getContext('2d');
        const p = coordenadasLienzo(e);
        const r = Math.hypot(p.x - trazo.current.inicio.x, p.y - trazo.current.inicio.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(trazo.current.inicio.x, trazo.current.inicio.y, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      trazo.current = null;
      guardarDibujo();
      return;
    }
    arrastre.current = null;
  }

  function onWheel(e) {
    if (herramienta) return;
    e.preventDefault();
    setVista((v) => ({ ...v, z: Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, v.z * (e.deltaY > 0 ? 0.9 : 1.1))) }));
  }

  function entrarEn(id) {
    setActivoId(id);
    setPinAbierto(null);
    setVista({ x: 0, y: 0, z: 1 });
    setInfoAbierta(false);
  }

  if (!montado) return null;

  const migas = camino(lugares, activoId);
  const hijos = ordenAlfabetico(hijosDe(lugares, activoId));
  const hermanos = activo?.superior ? ordenAlfabetico(hijosDe(lugares, activo.superior)) : [];
  const listaLugares = hijos.length ? hijos : hermanos;

  return (
    <div className="mapa-viewer">
      {/* ---- herramientas colgadas ---- */}
      <div className="herramientas">
        {['lupa', 'compas', 'pano'].map((h) => (
          <button
            key={h}
            className={`herramienta ${h} ${herramienta === h ? 'cogida' : ''}`}
            onClick={() => {
              setHerramienta(herramienta === h ? null : h);
              setLupaPos(null);
            }}
            title={herramienta === h ? 'Devolver al gancho' : { lupa: 'Lupa', compas: 'Compás', pano: 'Paño' }[h]}
          >
            <span className="gancho" aria-hidden="true" />
            {herramienta !== h && <span className="util" aria-hidden="true" />}
            <span className="h-nombre">{{ lupa: 'Lupa', compas: 'Compás', pano: 'Paño' }[h]}</span>
          </button>
        ))}

        {/* opciones del compás */}
        {herramienta === 'compas' && (
          <div className="opciones-compas">
            <div className="colores">
              {COLORES.map((c) => (
                <button
                  key={c}
                  className={`color ${color === c ? 'sel' : ''}`}
                  style={{ background: c }}
                  onClick={() => setColor(c)}
                  aria-label={`Color ${c}`}
                />
              ))}
            </div>
            <div className="modos mono">
              <button className={modoCompas === 'circulo' ? 'sel' : ''} onClick={() => setModoCompas('circulo')}>círculo</button>
              <button className={modoCompas === 'libre' ? 'sel' : ''} onClick={() => setModoCompas('libre')}>libre</button>
            </div>
          </div>
        )}
        {herramienta === 'pano' && (
          <button className="btn ghost limpiar mono" onClick={limpiarTodo}>Limpiar todo</button>
        )}
      </div>

      {/* ---- marco con el mapa ---- */}
      <div className="marco-madera" ref={marcoRef}>
        <div
          className={`mapa-hueco ${herramienta ? 'con-' + herramienta : ''}`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={() => setLupaPos(null)}
          onWheel={onWheel}
        >
          <div
            className="mapa-lienzo"
            style={{ transform: `translate(${vista.x}px, ${vista.y}px) scale(${vista.z})` }}
          >
            {activo?.mapaUrl ? (
              <img src={activo.mapaUrl} alt={activo.nombre} draggable="false" />
            ) : (
              <div className="mapa-vacio mono">Imagen de mapa no disponible</div>
            )}

            {/* pines de los lugares contenidos */}
            {Object.entries(pines).map(([id, p]) => (
              <button
                key={id}
                className="pin"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  setPinAbierto(id);
                }}
                title={porId[id]?.nombre || 'Lugar'}
              >
                <b />
                <em>{porId[id]?.nombre || '—'}</em>
              </button>
            ))}

            {/* capa de dibujo (compás y paño) */}
            <canvas ref={lienzoRef} width={1400} height={900} className="capa-dibujo" />
          </div>

          {/* lente de la lupa */}
          {herramienta === 'lupa' && lupaPos && activo?.mapaUrl && (
            <div
              className="lente"
              style={{
                left: lupaPos.x,
                top: lupaPos.y,
                backgroundImage: `url(${activo.mapaUrl})`,
                backgroundSize: `${marcoRef.current?.clientWidth * 2.2}px auto`,
                backgroundPosition: `${-lupaPos.x * 2.2 + 80}px ${-lupaPos.y * 2.2 + 80}px`,
              }}
            />
          )}
        </div>

        {/* recuadro del pin (§10.3) */}
        {pinAbierto && porId[pinAbierto] && (
          <div className="ficha-pin">
            <button className="cerrar-pin" onClick={() => setPinAbierto(null)} aria-label="Cerrar">✕</button>
            <h4>{porId[pinAbierto].nombre}</h4>
            {porId[pinAbierto].imagenUrl && <img src={porId[pinAbierto].imagenUrl} alt="" />}
            <p className="muted">{porId[pinAbierto].resumen || 'Sin resumen todavía.'}</p>
            <button className="btn" onClick={() => entrarEn(pinAbierto)}>Entrar al lugar</button>
          </div>
        )}
      </div>

      {/* ---- información del lugar ---- */}
      <div className="info-lugar">
        {migas.length > 1 && (
          <p className="migas mono">
            {migas.map((m, i) => (
              <span key={m.id}>
                {i > 0 && ' › '}
                <button onClick={() => entrarEn(m.id)}>{m.nombre}</button>
              </span>
            ))}
          </p>
        )}
        <h3 className="nombre-lugar">{activo?.nombre || 'Sin lugares todavía'}</h3>
        {heredado && (
          <p className="mono aviso-herencia-carto">
            Mapas heredados de «{origen?.nombre || origenId}» · solo lectura
          </p>
        )}

        {activo && (
          <>
            <button className="desplegable mono" onClick={() => setInfoAbierta((v) => !v)} aria-expanded={infoAbierta}>
              Mostrar información <span className={`flecha ${infoAbierta ? 'abierta' : ''}`}>▾</span>
            </button>
            {infoAbierta && (
              <div className="papel-info">
                {activo.infoMd ? (
                  <div className="pagina-md" dangerouslySetInnerHTML={{ __html: aHtml(activo.infoMd) }} />
                ) : (
                  <p className="muted">El máster aún no ha escrito información de este lugar.</p>
                )}
              </div>
            )}
          </>
        )}

        {listaLugares.length > 0 && (
          <div className="lista-lugares">
            <p className="mono muted">{hijos.length ? 'Lugares que contiene' : 'Otros lugares'}</p>
            <ul>
              {listaLugares.map((l) => (
                <li key={l.id}>
                  <button onClick={() => entrarEn(l.id)}>{l.nombre}</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* comentarios del lugar activo (§10.8) */}
      {activo && <Comentarios tipo="cartografia" refId={activo.id} />}

      <style>{css}</style>
    </div>
  );
}

const css = `
.mapa-viewer { display: grid; grid-template-columns: auto minmax(0,1fr); gap: clamp(.6rem,2vw,1.6rem); align-items: start; }
.mapa-viewer > .info-lugar, .mapa-viewer > .comments { grid-column: 1 / -1; }
.herramientas { display: grid; gap: 1.1rem; padding-top: .4rem; justify-items: center; }
.herramienta { position: relative; width: 56px; display: grid; justify-items: center; background: none; border: 0; padding: 0; cursor: pointer; }
.herramienta .gancho { width: 12px; height: 14px; border: 2px solid #9aa0a8; border-top: 0; border-radius: 0 0 8px 8px; }
.herramienta .util { width: 34px; height: 34px; margin-top: -2px; filter: drop-shadow(0 3px 5px rgba(0,0,0,.6)); }
.herramienta.lupa .util { border-radius: 50%; border: 3px solid #b9a27a; background: radial-gradient(circle at 35% 30%, rgba(255,255,255,.35), rgba(180,200,220,.18)); position: relative; }
.herramienta.lupa .util::after { content:''; position:absolute; right:-4px; bottom:-10px; width:5px; height:16px; border-radius:3px; background:linear-gradient(#8a6d34,#4a3a1a); transform:rotate(-35deg); }
.herramienta.compas .util { position: relative; }
.herramienta.compas .util::before, .herramienta.compas .util::after { content:''; position:absolute; top:2px; left:16px; width:3px; height:30px; border-radius:2px; background:linear-gradient(#c9b48a,#6b5730); transform-origin: top center; }
.herramienta.compas .util::before { transform: rotate(-16deg); }
.herramienta.compas .util::after { transform: rotate(16deg); }
.herramienta.pano .util { border-radius:4px 4px 10px 10px; background:linear-gradient(160deg,#9c8f78,#6d6353); clip-path: polygon(0 0,100% 0,100% 82%,76% 100%,50% 86%,24% 100%,0 82%); }
.herramienta.cogida .h-nombre { color: var(--gold); }
.herramienta.cogida .gancho { border-color: var(--gold); }
.h-nombre { margin-top: .35rem; font-family: ui-monospace, monospace; font-size: .58rem; letter-spacing: .1em; text-transform: uppercase; color: var(--stone); }
.opciones-compas { display: grid; gap: .4rem; justify-items: center; }
.colores { display: flex; gap: .25rem; }
.colores .color { width: 16px; height: 16px; border-radius: 50%; border: 1px solid rgba(0,0,0,.5); cursor: pointer; }
.colores .color.sel { box-shadow: 0 0 0 2px var(--gold); }
.modos { display: flex; gap: .3rem; }
.modos button { font-size: .58rem; background: none; border: 1px solid rgba(201,164,90,.35); color: var(--parchment); border-radius: 999px; padding: .1rem .4rem; cursor: pointer; }
.modos button.sel { background: rgba(201,164,90,.25); color: var(--paper); }
.limpiar { font-size: .6rem; padding: .25rem .5rem; }

.marco-madera { position: relative; padding: 18px; border-radius: 6px;
  background: linear-gradient(180deg, rgba(255,255,255,.1), rgba(0,0,0,.35)), linear-gradient(135deg,#6b4a2c,#3a2618 70%);
  box-shadow: 0 16px 40px rgba(0,0,0,.6), inset 0 0 0 2px rgba(201,164,90,.35), inset 0 2px 0 rgba(255,255,255,.12); }
.mapa-hueco { position: relative; height: min(56vh, 500px); overflow: hidden; border-radius: 3px; cursor: grab;
  background: radial-gradient(120% 90% at 50% 30%, rgba(201,164,90,.12), transparent 60%), linear-gradient(160deg, rgba(74,51,32,.7), rgba(26,18,11,.92)); }
.mapa-hueco.con-lupa { cursor: zoom-in; }
.mapa-hueco.con-compas, .mapa-hueco.con-pano { cursor: crosshair; }
.mapa-lienzo { position: absolute; inset: 0; transform-origin: center; display: grid; place-items: center; }
.mapa-lienzo img { max-width: 100%; max-height: 100%; user-select: none; }
.mapa-vacio { color: var(--stone); font-size: .8rem; letter-spacing: .08em; }
.capa-dibujo { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.pin { position: absolute; transform: translate(-50%,-50%); display: flex; align-items: center; gap: .35rem; background: none; border: 0; cursor: pointer; }
.pin b { width: 12px; height: 12px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #f4dfa6, var(--gold)); box-shadow: 0 0 0 3px rgba(201,164,90,.22), 0 2px 6px rgba(0,0,0,.55); }
.pin em { font-family: var(--font-title); font-style: normal; font-size: .8rem; color: var(--paper); text-shadow: 0 1px 3px rgba(0,0,0,.8); white-space: nowrap; }
.lente { position: absolute; width: 160px; height: 160px; border-radius: 50%; transform: translate(-50%,-50%);
  border: 3px solid #b9a27a; box-shadow: 0 8px 24px rgba(0,0,0,.6), inset 0 0 30px rgba(255,255,255,.15); pointer-events: none; background-repeat: no-repeat; }
.ficha-pin { position: absolute; right: 24px; bottom: 24px; width: min(260px, 70%); z-index: 6;
  background: linear-gradient(180deg, rgba(42,30,19,.97), rgba(26,18,11,.98)); border: 1px solid rgba(201,164,90,.45);
  border-radius: 10px; padding: .9rem 1rem; box-shadow: 0 16px 40px rgba(0,0,0,.6); }
.ficha-pin h4 { font-family: var(--font-title); color: var(--gold-soft); margin: 0 0 .4rem; font-size: 1.05rem; }
.ficha-pin img { width: 100%; border-radius: 6px; margin-bottom: .5rem; }
.ficha-pin p { font-size: .84rem; margin: 0 0 .7rem; }
.cerrar-pin { position: absolute; top: .4rem; right: .4rem; width: 22px; height: 22px; border-radius: 50%; cursor: pointer;
  background: rgba(201,164,90,.15); border: 1px solid rgba(201,164,90,.4); color: var(--gold); font-size: .7rem; }

.info-lugar { margin-top: 1.2rem; }
.aviso-herencia-carto { font-size: .62rem; letter-spacing: .1em; text-transform: uppercase; color: var(--stone); margin: -.2rem 0 .5rem; }
.migas { font-size: .66rem; color: var(--stone); margin: 0 0 .2rem; }
.migas button { background: none; border: 0; cursor: pointer; color: var(--stone); font: inherit; padding: 0; }
.migas button:hover { color: var(--gold); text-decoration: underline; }
.nombre-lugar { font-family: var(--font-title); color: var(--gold-soft); font-size: 1.5rem; margin: 0 0 .5rem; }
.desplegable { background: none; border: 1px solid rgba(201,164,90,.35); border-radius: 999px; color: var(--parchment);
  font-size: .68rem; letter-spacing: .08em; text-transform: uppercase; padding: .3rem .8rem; cursor: pointer; }
.desplegable:hover { border-color: var(--gold); color: var(--gold); }
.flecha { display: inline-block; transition: transform .2s var(--ease); }
.flecha.abierta { transform: rotate(180deg); }
.papel-info { margin-top: .8rem; padding: 1.1rem 1.3rem; border-radius: 3px; color: #3a2a16;
  background: radial-gradient(120% 90% at 20% 10%, rgba(255,255,255,.5), transparent 55%), linear-gradient(160deg,#efe3c6,#ddcba2 70%);
  box-shadow: 0 10px 26px rgba(0,0,0,.45); }
.papel-info .pagina-md h3, .papel-info .pagina-md h4 { font-family: var(--font-title); color: #5a3d26; margin: 0 0 .4rem; }
.papel-info .pagina-md p { margin: 0 0 .5rem; line-height: 1.55; }
.lista-lugares { margin-top: 1rem; }
.lista-lugares ul { list-style: none; margin: .3rem 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: .4rem; }
.lista-lugares button { background: rgba(201,164,90,.08); border: 1px solid rgba(201,164,90,.3); border-radius: 999px;
  color: var(--parchment); font-family: var(--font-body); font-size: .82rem; padding: .3rem .8rem; cursor: pointer; }
.lista-lugares button:hover { color: var(--paper); border-color: var(--gold); }

@media (max-width: 720px) {
  .mapa-viewer { grid-template-columns: 1fr; }
  .herramientas { grid-auto-flow: column; justify-content: center; }
}
`;
