import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $user, esOwner } from '../../stores/user.js';
import { $campaigns, $campaign } from '../../stores/campaign.js';
import { actualizarCampana, ID_BASE } from '../../lib/db/campanas.js';
import { esMasterDe } from '../../lib/permisos.js';
import { suscribirRegistros, registrar } from '../../lib/db/notificaciones.js';
import { suscribirImagenes, aprobarImagen, denegarImagen } from '../../lib/db/galeria.js';
import { db } from '../../lib/firebase.js';
import { ref, onValue, update } from 'firebase/database';

// ============================================================================
// PANEL DE MODERACIÓN (guía §25, §26, §7).
//
//  · Jugadores y másteres de cada campaña; roles globales (solo owner).
//  · Solicitudes pendientes de la galería con acceso directo.
//  · Registros importantes de la campaña (§26).
//  · Herencia de contenido de Capilla y Cartografía (§7): mantener, cambiar
//    de origen, sustituir por contenido propio o volver a activarla.
//
// Los másteres solo ven y gestionan SUS campañas; el owner, todas.
// ============================================================================

export default function ModPanel() {
  const user = useStore($user);
  const campanas = useStore($campaigns);
  const activa = useStore($campaign);
  const [usuarios, setUsuarios] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [seleccion, setSeleccion] = useState(null);
  const [montado, setMontado] = useState(false);
  const [aviso, setAviso] = useState('');

  useEffect(() => setMontado(true), []);

  useEffect(() => {
    return onValue(ref(db, 'usuarios'), (snap) => {
      const val = snap.exists() ? snap.val() : {};
      setUsuarios(Object.entries(val).map(([nombre, u]) => ({ nombre, rol: u.rol || 'jugador' })));
    });
  }, []);

  // Campaña sobre la que trabajar: la seleccionada o la activa.
  const misCampanas = campanas.filter((c) => esMasterDe(user, c));
  const campanaId = seleccion || activa?.id || misCampanas[0]?.id;
  const campana = campanas.find((c) => c.id === campanaId);

  useEffect(() => {
    if (!campanaId) return;
    const offs = [
      suscribirRegistros(campanaId, setRegistros),
      suscribirImagenes(campanaId, (imgs) => setPendientes(imgs.filter((i) => i.estado === 'pendiente'))),
    ];
    return () => offs.forEach((f) => f());
  }, [campanaId]);

  if (!montado) return null;
  if (misCampanas.length === 0) {
    return <p className="muted">No administras ninguna campaña.</p>;
  }

  const puedeRolesGlobales = esOwner(user);

  async function alternarMiembro(tipo, nombre) {
    const lista = { ...(campana[tipo] || {}) };
    if (lista[nombre]) delete lista[nombre];
    else lista[nombre] = true;
    await actualizarCampana(campanaId, { [tipo]: lista });
    await registrar(campanaId, {
      tipo: tipo === 'masters' ? 'master_asignado' : 'permisos_modificados',
      actor: user?.nombre,
      resumen: `${lista[nombre] ? 'añadido' : 'quitado'} ${nombre} en ${tipo}`,
    });
  }

  async function cambiarRolGlobal(nombre, rol) {
    await update(ref(db, `usuarios/${nombre}`), { rol });
    setAviso(`Rol de ${nombre} cambiado a ${rol}.`);
    setTimeout(() => setAviso(''), 3000);
  }

  async function cambiarHerencia(categoria, valor) {
    const cats = { ...(campana.categorias || {}) };
    cats[categoria] = { heredaDe: valor };
    await actualizarCampana(campanaId, { categorias: cats });
    await registrar(campanaId, {
      tipo: 'herencia_modificada',
      actor: user?.nombre,
      resumen: `${categoria}: ${valor ? 'hereda de ' + valor : 'contenido propio'}`,
    });
  }

  return (
    <div className="mod-panel">
      {/* selector de campaña a administrar */}
      <div className="chips" style={{ justifyContent: 'flex-start' }}>
        {misCampanas.map((c) => (
          <button
            key={c.id}
            className={`chip ${campanaId === c.id ? 'activo' : ''}`}
            onClick={() => setSeleccion(c.id)}
          >
            {c.nombre}
          </button>
        ))}
      </div>

      {campana && (
        <>
          {/* --- jugadores y másteres --- */}
          <section className="panel bloque">
            <h3 className="mod-titulo">Jugadores y másteres · {campana.nombre}</h3>
            <table className="tabla-usuarios">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Rol global</th>
                  <th>Jugador</th>
                  <th>Máster</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.nombre}>
                    <td>{u.nombre}</td>
                    <td>
                      {puedeRolesGlobales ? (
                        <select
                          value={u.rol}
                          onChange={(e) => cambiarRolGlobal(u.nombre, e.target.value)}
                          className="sel-rol"
                        >
                          {['jugador', 'master', 'owner', 'admin', 'invitado'].map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="mono">{u.rol}</span>
                      )}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={!!(campana.jugadores || {})[u.nombre]}
                        onChange={() => alternarMiembro('jugadores', u.nombre)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={!!(campana.masters || {})[u.nombre]}
                        onChange={() => alternarMiembro('masters', u.nombre)}
                        disabled={!puedeRolesGlobales}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {aviso && <p className="mono" style={{ color: '#9fd07a' }}>{aviso}</p>}
            {!puedeRolesGlobales && (
              <p className="mono muted" style={{ fontSize: '.66rem' }}>Solo el owner asigna másteres y roles globales.</p>
            )}
          </section>

          {/* --- herencia de contenido (§7) --- */}
          <section className="panel bloque">
            <h3 className="mod-titulo">Herencia de contenido</h3>
            {['capilla', 'cartografia'].map((cat) => {
              const actual = campana.categorias?.[cat]?.heredaDe || '';
              return (
                <div key={cat} className="fila-herencia">
                  <span className="cat-nombre">{cat === 'capilla' ? 'Capilla' : 'Cartografía'}</span>
                  <select value={actual} onChange={(e) => cambiarHerencia(cat, e.target.value)} className="sel-rol">
                    <option value="">Contenido propio</option>
                    {campanas
                      .filter((c) => c.id !== campanaId)
                      .map((c) => (
                        <option key={c.id} value={c.id}>Heredar de {c.nombre}</option>
                      ))}
                  </select>
                  <span className="mono muted estado-herencia">
                    {actual ? `heredado de ${campanas.find((c) => c.id === actual)?.nombre || actual}` : 'propio'}
                  </span>
                </div>
              );
            })}
            {campana.id === ID_BASE && (
              <p className="mono muted" style={{ fontSize: '.66rem' }}>Base de Phaingea es el origen del lore; normalmente no hereda de nadie.</p>
            )}
          </section>

          {/* --- solicitudes pendientes --- */}
          <section className="panel bloque">
            <h3 className="mod-titulo">Solicitudes pendientes ({pendientes.length})</h3>
            {pendientes.length === 0 ? (
              <p className="muted mono">No hay nada por aprobar.</p>
            ) : (
              <div className="lista-solicitudes">
                {pendientes.map((i) => (
                  <div key={i.id} className="solicitud">
                    <img src={i.imagen} alt="" />
                    <div>
                      <strong>{i.titulo}</strong>
                      <p className="mono muted">de {i.autor} · {(i.tags || []).join(', ')}</p>
                    </div>
                    <div className="acciones-solicitud">
                      <button className="btn" onClick={() => aprobarImagen(campanaId, i.id)}>Aprobar</button>
                      <button className="btn ghost" onClick={() => denegarImagen(campanaId, i.id)}>Denegar</button>
                      <button className="btn ghost" onClick={() => document.querySelector('.bm[data-view="galeria"]')?.click()}>Ir a Galería</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* --- registros importantes (§26) --- */}
          <section className="panel bloque">
            <h3 className="mod-titulo">Registros importantes</h3>
            {registros.length === 0 ? (
              <p className="muted mono">Todavía no hay registros.</p>
            ) : (
              <ul className="lista-registros mono">
                {registros.slice(0, 30).map((r) => (
                  <li key={r.id}>
                    <span className="reg-fecha">{new Date(r.fecha).toLocaleDateString('es-ES')}</span>
                    <span className="reg-tipo">{r.tipo}</span>
                    <span className="reg-resumen">{r.resumen}</span>
                    {r.actor && <span className="reg-actor">· {r.actor}</span>}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}

      <style>{css}</style>
    </div>
  );
}

const css = `
.mod-panel { display: grid; gap: 1rem; }
.bloque { position: relative; }
.mod-titulo { font-family: var(--font-title); color: var(--gold-soft); margin: 0 0 .7rem; font-size: 1.05rem; }
.tabla-usuarios { width: 100%; border-collapse: collapse; font-size: .84rem; }
.tabla-usuarios th, .tabla-usuarios td { text-align: left; padding: .35rem .5rem; border-bottom: 1px solid rgba(201,164,90,.15); }
.tabla-usuarios th { font-family: ui-monospace, monospace; font-size: .62rem; letter-spacing: .1em; text-transform: uppercase; color: var(--stone); }
.sel-rol { background: rgba(0,0,0,.3); border: 1px solid rgba(201,164,90,.35); color: var(--paper); border-radius: 6px; padding: .2rem .4rem; font-size: .78rem; }
.fila-herencia { display: flex; align-items: center; gap: .7rem; flex-wrap: wrap; margin-bottom: .5rem; }
.cat-nombre { font-family: var(--font-title); color: var(--parchment); min-width: 100px; }
.estado-herencia { font-size: .64rem; }
.lista-solicitudes { display: grid; gap: .7rem; }
.solicitud { display: grid; grid-template-columns: 70px 1fr auto; gap: .8rem; align-items: center; }
.solicitud img { width: 70px; height: 52px; object-fit: cover; border-radius: 4px; border: 2px solid #3a2a18; }
.solicitud p { margin: .15rem 0 0; font-size: .68rem; }
.acciones-solicitud { display: flex; gap: .4rem; flex-wrap: wrap; }
.acciones-solicitud .btn { padding: .3rem .7rem; font-size: .74rem; }
.lista-registros { list-style: none; margin: 0; padding: 0; display: grid; gap: .3rem; max-height: 280px; overflow-y: auto; font-size: .7rem; }
.lista-registros li { display: flex; gap: .5rem; flex-wrap: wrap; color: var(--parchment); border-bottom: 1px solid rgba(201,164,90,.1); padding-bottom: .25rem; }
.reg-fecha { color: var(--stone); }
.reg-tipo { color: var(--gold); }
.reg-actor { color: var(--stone); }
`;
