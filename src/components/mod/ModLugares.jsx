import { useEffect, useRef, useState } from 'react';
import {
  suscribirLugares,
  crearLugar,
  actualizarLugar,
  eliminarLugar,
  ordenAlfabetico,
} from '../../lib/db/lugares.js';
import { comprimirImagen } from '../../lib/db/galeria.js';
import { registrar } from '../../lib/db/notificaciones.js';
import { useDobleConfirmacion } from '../Modal.jsx';
import BotonMod from '../BotonMod.jsx';

// ============================================================================
// MODERACIÓN DE CARTOGRAFÍA (guía §10, §24).
//
// El máster gestiona los lugares de la campaña: crear, editar, borrar, elegir
// cuál se abre por defecto, subir su mapa, colocar sus pines (pulsando sobre
// la miniatura del mapa) y marcarlos como destacados para que aparezcan sobre
// el planeta del Observatorio.
// ============================================================================

export default function ModLugares({ campanaId, autor, visible }) {
  const [lugares, setLugares] = useState([]);
  const [sel, setSel] = useState(null); // id en edición
  const [d, setD] = useState(null);
  const [aviso, setAviso] = useState('');
  const [colocando, setColocando] = useState(null); // id del lugar a fijar como pin
  const inputMapa = useRef(null);

  useEffect(() => {
    if (!campanaId || !visible) return;
    return suscribirLugares(campanaId, setLugares);
  }, [campanaId, visible]);

  useEffect(() => {
    const l = lugares.find((x) => x.id === sel);
    setD(l ? { ...l } : null);
  }, [sel, lugares.length]);

  const campo = (k) => ({ value: d?.[k] ?? '', onChange: (e) => setD({ ...d, [k]: e.target.value }) });

  async function guardar() {
    if (!d?.nombre?.trim()) { setAviso('El lugar necesita un nombre.'); return; }
    const { id, ...resto } = d;
    await actualizarLugar(campanaId, id, resto);
    setAviso('Guardado.');
    setTimeout(() => setAviso(''), 2200);
  }

  async function nuevo() {
    const l = await crearLugar(campanaId, { nombre: 'Lugar nuevo' });
    await registrar(campanaId, { tipo: 'lugar_creado', actor: autor, resumen: l.nombre });
    setSel(l.id);
  }

  async function subirMapa(archivo) {
    if (!archivo || !d) return;
    try {
      const { dataUrl } = await comprimirImagen(archivo, { maxLado: 1600, maxBytes: 300 * 1024 });
      setD({ ...d, mapaUrl: dataUrl });
      await actualizarLugar(campanaId, d.id, { mapaUrl: dataUrl });
    } catch (e) {
      setAviso('No se pudo subir el mapa: ' + e.message);
    }
  }

  /** Coloca (o mueve) el pin de un lugar hijo pulsando sobre la miniatura. */
  function ponerPin(e) {
    if (!colocando || !d) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    const pines = { ...(d.pines || {}), [colocando]: { x: +x.toFixed(1), y: +y.toFixed(1) } };
    setD({ ...d, pines });
    actualizarLugar(campanaId, d.id, { pines });
    setColocando(null);
  }

  async function quitarPin(id) {
    const pines = { ...(d.pines || {}) };
    delete pines[id];
    setD({ ...d, pines });
    await actualizarLugar(campanaId, d.id, { pines });
  }

  async function marcarPredeterminado() {
    for (const l of lugares) {
      if (!!l.esPredeterminado !== (l.id === d.id)) {
        await actualizarLugar(campanaId, l.id, { esPredeterminado: l.id === d.id });
      }
    }
    setD({ ...d, esPredeterminado: true });
  }

  const otros = ordenAlfabetico(lugares.filter((l) => l.id !== sel));

  return (
    <BotonMod visible={visible} titulo="Lugares de la campaña">
      <div className="mod-lugares">
            <aside className="lista">
              <button className="btn" onClick={nuevo}>+ Nuevo lugar</button>
              <ul>
                {ordenAlfabetico(lugares).map((l) => (
                  <li key={l.id}>
                    <button className={sel === l.id ? 'sel' : ''} onClick={() => setSel(l.id)}>
                      {l.nombre}
                      {l.esPredeterminado && <span className="mono etq">inicio</span>}
                      {l.destacado && <span className="mono etq">planeta</span>}
                    </button>
                  </li>
                ))}
                {lugares.length === 0 && <li className="muted mono">Sin lugares todavía.</li>}
              </ul>
            </aside>

            <section className="detalle">
              {!d ? (
                <p className="muted">Elige un lugar de la lista o crea uno nuevo.</p>
              ) : (
                <div className="stack">
                  <label className="lbl">Nombre <input className="inp" {...campo('nombre')} /></label>
                  <label className="lbl">Resumen (el recuadro del pin) <input className="inp" {...campo('resumen')} /></label>
                  <label className="lbl">Información (markdown)
                    <textarea className="inp" style={{ minHeight: '110px' }} {...campo('infoMd')} />
                  </label>

                  <label className="lbl">Pertenece a
                    <select className="inp" value={d.superior || ''} onChange={(e) => setD({ ...d, superior: e.target.value })}>
                      <option value="">— ninguno (lugar raíz) —</option>
                      {otros.map((l) => <option key={l.id} value={l.id}>{l.nombre}</option>)}
                    </select>
                  </label>

                  <div className="fila">
                    <button className="btn ghost" onClick={() => inputMapa.current?.click()}>
                      {d.mapaUrl ? 'Cambiar mapa' : 'Subir mapa'}
                    </button>
                    {d.mapaUrl && <button className="btn ghost" onClick={() => setD({ ...d, mapaUrl: '' })}>Quitar mapa</button>}
                    <button className="btn ghost" onClick={marcarPredeterminado} disabled={d.esPredeterminado}>
                      {d.esPredeterminado ? 'Es el mapa inicial' : 'Usar como mapa inicial'}
                    </button>
                    <input ref={inputMapa} type="file" accept="image/*" hidden onChange={(e) => subirMapa(e.target.files?.[0])} />
                  </div>

                  {/* mapa con sus pines */}
                  <div className={`mini-mapa ${colocando ? 'colocando' : ''}`} onClick={ponerPin}>
                    {d.mapaUrl ? <img src={d.mapaUrl} alt="" /> : <span className="mono muted">Sin mapa</span>}
                    {Object.entries(d.pines || {}).map(([id, p]) => (
                      <span key={id} className="pin-mini" style={{ left: `${p.x}%`, top: `${p.y}%` }} title={lugares.find((l) => l.id === id)?.nombre || id}>
                        <b />
                      </span>
                    ))}
                    {colocando && <span className="aviso-colocar mono">Pulsa donde va el pin</span>}
                  </div>

                  {/* pines: qué lugares contiene este mapa */}
                  <div>
                    <p className="mono muted" style={{ margin: '0 0 .3rem' }}>Pines en este mapa</p>
                    <div className="chips" style={{ justifyContent: 'flex-start' }}>
                      {otros.map((l) => {
                        const puesto = !!(d.pines || {})[l.id];
                        return (
                          <button
                            key={l.id}
                            className={`chip ${puesto ? 'activo' : ''}`}
                            onClick={() => (puesto ? quitarPin(l.id) : setColocando(l.id))}
                            title={puesto ? 'Quitar el pin' : 'Colocar el pin en el mapa'}
                          >
                            {l.nombre}{puesto ? ' ✕' : ' +'}
                          </button>
                        );
                      })}
                      {otros.length === 0 && <span className="muted mono">Crea más lugares para poder anclarlos.</span>}
                    </div>
                  </div>

                  {/* destacado en el planeta */}
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={!!d.destacado}
                      onChange={(e) => setD({ ...d, destacado: e.target.checked })}
                    />
                    Mostrar sobre el planeta del Observatorio
                  </label>
                  {d.destacado && (
                    <div className="fila">
                      <label className="lbl">Latitud <input className="inp" type="number" value={d.lat ?? 0} onChange={(e) => setD({ ...d, lat: +e.target.value })} /></label>
                      <label className="lbl">Longitud <input className="inp" type="number" value={d.lon ?? 0} onChange={(e) => setD({ ...d, lon: +e.target.value })} /></label>
                    </div>
                  )}

                  {aviso && <p style={{ color: aviso.startsWith('No') || aviso.startsWith('El') ? '#f0a29c' : '#9fd07a' }}>{aviso}</p>}

                  <div className="fila">
                    <button className="btn" onClick={guardar}>Guardar lugar</button>
                    <BorrarLugar campanaId={campanaId} id={d.id} alBorrar={() => setSel(null)} />
                  </div>
                </div>
              )}
        </section>
      </div>
      <style>{css}</style>
    </BotonMod>
  );
}

function BorrarLugar({ campanaId, id, alBorrar }) {
  const del = useDobleConfirmacion(async () => {
    await eliminarLugar(campanaId, id);
    alBorrar();
  });
  return (
    <button className="btn ghost" style={{ borderColor: '#a44', color: '#e99' }} onClick={del.pulsar}>
      {del.texto('Eliminar lugar')}
    </button>
  );
}

const css = `
.mod-lugares { display: grid; grid-template-columns: 190px minmax(0,1fr); gap: 1rem; }
.mod-lugares .lista ul { list-style: none; margin: .6rem 0 0; padding: 0; display: grid; gap: .2rem; max-height: 320px; overflow-y: auto; }
.mod-lugares .lista button {
  width: 100%; text-align: left; background: none; border: 0; cursor: pointer; padding: .35rem .4rem;
  color: var(--paper); font-family: var(--font-body); font-size: .86rem; border-radius: 6px;
  display: flex; align-items: center; gap: .35rem; flex-wrap: wrap;
}
.mod-lugares .lista button:hover { background: rgba(201,164,90,.1); }
.mod-lugares .lista button.sel { background: rgba(201,164,90,.22); color: var(--gold); }
.etq { font-size: .52rem; letter-spacing: .08em; text-transform: uppercase; color: var(--gold);
  border: 1px solid rgba(201,164,90,.45); border-radius: 999px; padding: 0 .3rem; }
.detalle { min-width: 0; }
.fila { display: flex; gap: .5rem; flex-wrap: wrap; align-items: flex-end; }
.mini-mapa {
  position: relative; height: 190px; border-radius: 6px; overflow: hidden; display: grid; place-items: center;
  background: linear-gradient(160deg, rgba(74,51,32,.6), rgba(26,18,11,.9)); border: 1px solid rgba(201,164,90,.3);
}
.mini-mapa.colocando { cursor: crosshair; outline: 2px dashed var(--gold); }
.mini-mapa img { width: 100%; height: 100%; object-fit: contain; }
.pin-mini { position: absolute; transform: translate(-50%,-50%); }
.pin-mini b { display: block; width: 10px; height: 10px; border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #f4dfa6, var(--gold)); box-shadow: 0 0 0 2px rgba(0,0,0,.5); }
.aviso-colocar { position: absolute; bottom: .4rem; left: 50%; transform: translateX(-50%);
  background: rgba(0,0,0,.7); color: var(--gold); font-size: .6rem; padding: .2rem .5rem; border-radius: 999px; }
.check { display: flex; align-items: center; gap: .5rem; font-family: var(--font-body); color: var(--paper); font-size: .86rem; cursor: pointer; }
.lbl { display: grid; gap: .25rem; font-family: var(--font-ui); font-size: .78rem; color: var(--parchment); }
.inp { padding: .45rem .6rem; border-radius: 7px; border: 1px solid rgba(201,164,90,.35);
  background: rgba(0,0,0,.3); color: var(--paper); font-family: var(--font-body); font-size: .9rem; width: 100%; }
@media (max-width: 640px) { .mod-lugares { grid-template-columns: 1fr; } }
`;
