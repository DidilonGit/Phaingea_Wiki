import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $campaign } from '../stores/campaign.js';
import { $user } from '../stores/user.js';
import { puedeGestionar } from '../lib/permisos.js';
import {
  suscribirSesiones,
  suscribirEventos,
  crearSesion,
  actualizarSesion,
  eliminarSesion,
  crearEvento,
  actualizarEvento,
  siguienteNumero,
} from '../lib/db/sesiones.js';
import { suscribirPersonajes, ordenAlfabetico } from '../lib/db/personajes.js';
import Libro from './Libro.jsx';
import Modal, { useDobleConfirmacion } from './Modal.jsx';
import Comentarios from './Comentarios.jsx';
import { notificar, participantesDe, registrar } from '../lib/db/notificaciones.js';

// ============================================================================
// SESIONES (guía §14) — y EVENTOS en Base de Phaingea (§15).
//
//  · Cuaderno de viaje: cada sesión ocupa una página del libro con su número,
//    título, subtítulo, experiencia general y extra y descripción.
//  · El ÍNDICE del propio libro lista número, título y XP con scroll interno;
//    al pulsar una entrada se pasa de página hasta ella. No hay un segundo
//    listado bajo el libro (§14.2).
//  · El máster crea y edita sesiones; al cambiar la XP se recalculan solos los
//    niveles porque nunca se guardan (§14.3).
//  · Comentarios: uno por jugador y sesión, editable, sin aprobación (§14.4).
//  · En Base la sala pasa a Eventos: sin experiencia ni participantes (§15).
// ============================================================================

export default function SesionesView() {
  const campana = useStore($campaign);
  const user = useStore($user);
  const [sesiones, setSesiones] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [personajes, setPersonajes] = useState([]);
  const [abierta, setAbierta] = useState(null); // id de la entrada visible
  const [editor, setEditor] = useState(null); // {modo:'nueva'|'editar', datos}
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  useEffect(() => {
    if (!campana?.id) return;
    const offs = [
      suscribirSesiones(campana.id, setSesiones),
      suscribirEventos(campana.id, setEventos),
      suscribirPersonajes(campana.id, setPersonajes),
    ];
    return () => offs.forEach((f) => f());
  }, [campana?.id]);

  if (!montado) return null;

  const esBase = !!campana?.esBase;
  const esGestor = puedeGestionar(user, campana);
  const entradas = esBase ? eventos : sesiones;

  // --- páginas del libro ---
  const paginas = entradas.map((e) => (
    <article key={e.id} className="pagina-sesion">
      <header>
        {!esBase && <span className="num-sesion">{e.num}</span>}
        <h3>{e.titulo}</h3>
        {e.subtitulo && <p className="subtitulo">{e.subtitulo}</p>}
        {esBase && e.fechaTexto && <p className="fecha-evento mono">{e.fechaTexto}</p>}
      </header>

      {!esBase && (
        <div className="xp-sesion mono">
          <span>Experiencia general: <b>{e.xpGeneral || 0}</b></span>
          {e.xpExtra && Object.keys(e.xpExtra).length > 0 && (
            <ul className="xp-extra">
              {Object.entries(e.xpExtra).map(([pid, c]) => (
                <li key={pid}>
                  {personajes.find((p) => p.id === pid)?.nombre || pid}: <b>+{c}</b>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {e.imagenUrl && <img className="img-evento" src={e.imagenUrl} alt="" />}
      {e.descripcion && <p className="desc">{e.descripcion}</p>}
    </article>
  ));

  const titulos = entradas.map((e) => (esBase ? e.titulo : `${e.num}. ${e.titulo}`));

  return (
    <div className="sesiones-view">
      {esGestor && (
        <div className="barra-mod">
          <button
            className="btn"
            onClick={async () => {
              const num = esBase ? 0 : await siguienteNumero(campana.id);
              setEditor({
                modo: 'nueva',
                datos: esBase
                  ? { titulo: '', fechaTexto: '', subtitulo: '', descripcion: '', imagenUrl: '' }
                  : { num, titulo: `Sesión ${num}`, subtitulo: '', xpGeneral: 0, xpExtra: {}, descripcion: '' },
              });
            }}
          >
            + {esBase ? 'Nuevo evento' : 'Nueva sesión'}
          </button>
        </div>
      )}

      {entradas.length === 0 ? (
        <div className="empty">
          <div className="ico">{esBase ? '📜' : '📓'}</div>
          <p className="muted">{esBase ? 'Aún no hay eventos registrados.' : 'Aún no se ha registrado ninguna sesión.'}</p>
        </div>
      ) : (
        <Libro
          key={`sesiones-${paginas.length}`}
          titulo={esBase ? 'Libro de acontecimientos' : `Cuaderno de ${campana?.nombre || 'campaña'}`}
          sub={esBase ? 'Historia de Phaingea' : `${entradas.length} sesiones`}
          cubierta="cuero-rojo"
          paginas={paginas}
          titulosPaginas={titulos}
          alAbrirPagina={(i) => setAbierta(entradas[i]?.id || null)}
        />
      )}

      {/* moderación de la entrada abierta */}
      {esGestor && abierta && (
        <div className="mod-entrada">
          <button
            className="btn ghost"
            onClick={() => {
              const e = entradas.find((x) => x.id === abierta);
              setEditor({ modo: 'editar', id: e.id, datos: { ...e } });
            }}
          >
            Editar {esBase ? 'evento' : 'sesión'} abierta
          </button>
          {!esBase && <BorrarEntrada campanaId={campana.id} id={abierta} alBorrar={() => setAbierta(null)} />}
        </div>
      )}

      {/* comentarios de la entrada abierta (§14.4) */}
      {abierta && (
        <Comentarios
          tipo={esBase ? 'eventos' : 'sesiones'}
          refId={abierta}
          titulo={esBase ? 'Comentarios del evento' : 'Comentarios de la sesión'}
          unoPorUsuario={!esBase}
        />
      )}

      {editor && (
        <EditorEntrada
          esBase={esBase}
          campanaId={campana.id}
          campana={campana}
          autor={user?.nombre || ''}
          personajes={ordenAlfabetico(personajes)}
          editor={editor}
          onCerrar={() => setEditor(null)}
        />
      )}

      <style>{css}</style>
    </div>
  );
}

function BorrarEntrada({ campanaId, id, alBorrar }) {
  const del = useDobleConfirmacion(async () => {
    await eliminarSesion(campanaId, id);
    alBorrar();
  });
  return (
    <button className="btn ghost" style={{ borderColor: '#a44', color: '#e99' }} onClick={del.pulsar}>
      {del.texto('Eliminar sesión')}
    </button>
  );
}

function EditorEntrada({ esBase, campanaId, campana, autor, personajes, editor, onCerrar }) {
  const [d, setD] = useState(editor.datos);
  const [error, setError] = useState('');
  const campo = (k) => ({ value: d[k] ?? '', onChange: (e) => setD({ ...d, [k]: e.target.value }) });

  async function guardar(e) {
    e.preventDefault();
    try {
      if (esBase) {
        if (editor.modo === 'nueva') {
          await crearEvento(campanaId, d);
          // Aviso y registro de la acción (guía §18.7, §26)
          await notificar(campanaId, participantesDe(campana), {
            asunto: 'Evento publicado', tipo: 'evento',
            contenido: `Se ha publicado el evento «${d.titulo}».`,
          });
          await registrar(campanaId, { tipo: 'evento_publicado', actor: autor, resumen: d.titulo });
        } else await actualizarEvento(campanaId, editor.id, d);
      } else {
        const datos = {
          ...d,
          num: Number(d.num) || 1,
          xpGeneral: Number(d.xpGeneral) || 0,
          xpExtra: Object.fromEntries(
            Object.entries(d.xpExtra || {})
              .map(([k, v]) => [k, Number(v) || 0])
              .filter(([, v]) => v !== 0)
          ),
        };
        if (editor.modo === 'nueva') {
          await crearSesion(campanaId, datos);
          await notificar(campanaId, participantesDe(campana), {
            asunto: 'Sesión publicada', tipo: 'sesion',
            contenido: `Se han publicado las notas de «${datos.titulo}» con ${datos.xpGeneral} de experiencia general.`,
          });
          await registrar(campanaId, { tipo: 'sesion_creada', actor: autor, resumen: datos.titulo });
        } else {
          await actualizarSesion(campanaId, editor.id, datos);
          await notificar(campanaId, participantesDe(campana), {
            asunto: 'Experiencia actualizada', tipo: 'xp',
            contenido: `Ha cambiado la experiencia de «${datos.titulo}». Tu nivel puede haberse actualizado.`,
          });
          await registrar(campanaId, { tipo: 'xp_repartida', actor: autor, resumen: datos.titulo });
        }
      }
      onCerrar();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Modal abierto onCerrar={onCerrar} titulo={editor.modo === 'nueva' ? 'Nueva entrada' : 'Editar entrada'} ancho="560px">
      <form onSubmit={guardar} className="stack">
        {!esBase && (
          <label className="lbl">Número <input className="inp" type="number" {...campo('num')} /></label>
        )}
        <label className="lbl">Título <input className="inp" {...campo('titulo')} /></label>
        <label className="lbl">Subtítulo (opcional) <input className="inp" {...campo('subtitulo')} /></label>
        {esBase && <label className="lbl">Fecha o periodo <input className="inp" {...campo('fechaTexto')} /></label>}
        {esBase && <label className="lbl">Imagen (URL, opcional) <input className="inp" {...campo('imagenUrl')} /></label>}

        {!esBase && (
          <>
            <label className="lbl">Experiencia general <input className="inp" type="number" {...campo('xpGeneral')} /></label>
            <div>
              <p className="mono muted" style={{ margin: '0 0 .3rem' }}>Experiencia extra por personaje</p>
              <div className="stack" style={{ gap: '.3rem' }}>
                {personajes.length === 0 && <p className="muted">Esta campaña aún no tiene personajes.</p>}
                {personajes.map((p) => (
                  <label key={p.id} className="fila-xp">
                    <span>{p.nombre}</span>
                    <input
                      className="inp"
                      type="number"
                      value={(d.xpExtra && d.xpExtra[p.id]) ?? 0}
                      onChange={(e) => setD({ ...d, xpExtra: { ...(d.xpExtra || {}), [p.id]: e.target.value } })}
                    />
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        <label className="lbl">Descripción <textarea className="inp" style={{ minHeight: '90px' }} {...campo('descripcion')} /></label>
        {error && <p style={{ color: '#f0a29c' }}>{error}</p>}
        <div style={{ display: 'flex', gap: '.6rem' }}>
          <button className="btn" type="submit">Guardar</button>
          <button className="btn ghost" type="button" onClick={onCerrar}>Cancelar</button>
        </div>
      </form>
    </Modal>
  );
}

const css = `
.sesiones-view { display: grid; gap: 1rem; justify-items: center; }
.barra-mod { justify-self: start; }
.mod-entrada { display: flex; gap: .6rem; flex-wrap: wrap; justify-content: center; }
.pagina-sesion { color: var(--ink); }
.pagina-sesion header { border-bottom: 1px dotted rgba(90,61,38,.35); padding-bottom: .5rem; margin-bottom: .6rem; }
.num-sesion { font-family: var(--font-title); font-size: 2rem; color: #8a6d34; float: right; line-height: 1; }
.pagina-sesion h3 { font-family: var(--font-title); color: #5a3d26; margin: 0; font-size: 1.25rem; }
.subtitulo { font-style: italic; color: #6a5a3c; margin: .2rem 0 0; font-size: .9rem; }
.fecha-evento { color: #8a7350; font-size: .7rem; margin: .3rem 0 0; }
.xp-sesion { font-size: .78rem; color: #5a4a2c; margin-bottom: .6rem; }
.xp-extra { list-style: none; margin: .3rem 0 0; padding: 0; display: grid; gap: .1rem; }
.img-evento { width: 100%; border-radius: 4px; margin-bottom: .6rem; }
.desc { line-height: 1.55; }
.lbl { display: grid; gap: .25rem; font-family: var(--font-ui); font-size: .78rem; color: var(--parchment); }
.inp { padding: .45rem .6rem; border-radius: 7px; border: 1px solid rgba(201,164,90,.35);
  background: rgba(0,0,0,.3); color: var(--paper); font-family: var(--font-body); font-size: .9rem; }
.fila-xp { display: grid; grid-template-columns: 1fr 90px; gap: .5rem; align-items: center;
  font-family: var(--font-body); font-size: .85rem; color: var(--paper); }
`;
