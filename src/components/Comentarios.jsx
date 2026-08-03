import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $user } from '../stores/user.js';
import { $campaign } from '../stores/campaign.js';
import { puedeComentar, puedeGestionar } from '../lib/permisos.js';
import { useDobleConfirmacion } from './Modal.jsx';
import {
  suscribirComentarios,
  crearComentario,
  editarComentario,
  borrarComentario,
  aprobarComentario,
  alternarReaccion,
  cabecera,
  EMOJIS,
} from '../lib/db/comentarios.js';

// ============================================================================
// COMENTARIOS (guía §22) — reutilizable en todas las categorías.
//
//   <Comentarios tipo="capilla" refId="general" />
//   <Comentarios tipo="podios" refId={personajeId}
//                requiereAprobacion
//                puedeAprobarExtra={(user) => user.nombre === propietario}
//                exentoDeAprobacion={(user) => user.nombre === propietario}
//                unoPorUsuario />        // sesiones: 1 comentario por jugador
//
// · Cabecera "Personaje (Jugador) — Fecha".
// · Edita: el autor, el máster y el owner. Borra: máster y owner, con doble
//   confirmación.
// · Reacciones con emoji. Sin respuestas anidadas.
// · Los pendientes solo los ven quienes pueden aprobarlos.
// ============================================================================

export default function Comentarios({
  tipo,
  refId = 'general',
  titulo = 'Comentarios',
  requiereAprobacion = false,
  puedeAprobarExtra,
  exentoDeAprobacion,
  unoPorUsuario = false,
}) {
  const user = useStore($user);
  const campana = useStore($campaign);
  const [lista, setLista] = useState([]);
  const [texto, setTexto] = useState('');
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState('');
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  useEffect(() => {
    if (!campana?.id) return;
    return suscribirComentarios(campana.id, tipo, refId, setLista);
  }, [campana?.id, tipo, refId]);

  if (!montado) return null;

  const esGestor = puedeGestionar(user, campana);
  const puedeAprobar = esGestor || (!!puedeAprobarExtra && !!user && puedeAprobarExtra(user));
  const exento = esGestor || (!!exentoDeAprobacion && !!user && exentoDeAprobacion(user));
  const mio = user ? lista.find((c) => c.autor === user.nombre) : null;

  // Los pendientes solo se muestran a quien puede aprobarlos (y a su autor).
  const visibles = lista.filter(
    (c) => c.estado !== 'pendiente' || puedeAprobar || (user && c.autor === user.nombre)
  );

  async function enviar(e) {
    e.preventDefault();
    setError('');
    try {
      if (editando) {
        await editarComentario(campana.id, tipo, refId, editando, texto);
        setEditando(null);
      } else if (unoPorUsuario && mio) {
        await editarComentario(campana.id, tipo, refId, mio.id, texto);
      } else {
        await crearComentario(campana.id, tipo, refId, {
          autor: user.nombre,
          personaje: '', // el nombre del personaje se enlaza en T32/T37
          texto,
          pendiente: requiereAprobacion && !exento,
        });
      }
      setTexto('');
    } catch (err) {
      setError(err.message);
    }
  }

  const puedeEscribir = puedeComentar(user, campana);

  return (
    <div className="comments">
      <h3>{titulo}</h3>

      {visibles.length === 0 && <p className="muted center mono" style={{ fontSize: '.75rem' }}>Todavía no hay comentarios.</p>}

      {visibles.map((c) => (
        <Comentario
          key={c.id}
          c={c}
          user={user}
          campanaId={campana?.id}
          tipo={tipo}
          refId={refId}
          esGestor={esGestor}
          puedeAprobar={puedeAprobar}
          alEditar={() => {
            setEditando(c.id);
            setTexto(c.texto);
          }}
        />
      ))}

      {puedeEscribir ? (
        <form className="comment-form" onSubmit={enviar}>
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={
              editando ? 'Editando tu comentario…' : unoPorUsuario && mio ? 'Editar tu comentario…' : 'Deja tu comentario…'
            }
            aria-label="Escribir comentario"
          />
          <button className="btn" type="submit">{editando || (unoPorUsuario && mio) ? 'Guardar' : 'Comentar'}</button>
          {editando && (
            <button className="btn ghost" type="button" onClick={() => { setEditando(null); setTexto(''); }}>
              Cancelar
            </button>
          )}
        </form>
      ) : (
        <p className="muted mono center" style={{ fontSize: '.72rem', marginTop: '.8rem' }}>
          Solo quienes participan en la campaña pueden comentar.
        </p>
      )}

      {error && <p style={{ color: '#f0a29c', fontSize: '.8rem' }}>{error}</p>}
      {requiereAprobacion && puedeEscribir && !exento && (
        <p className="muted mono center" style={{ fontSize: '.66rem' }}>Tu comentario quedará pendiente de aprobación.</p>
      )}
    </div>
  );
}

function Comentario({ c, user, campanaId, tipo, refId, esGestor, puedeAprobar, alEditar }) {
  const borrar = useDobleConfirmacion(() => borrarComentario(campanaId, tipo, refId, c.id));
  const esAutor = !!user && c.autor === user.nombre;

  return (
    <div className="comment" style={c.estado === 'pendiente' ? { opacity: 0.75 } : undefined}>
      <p className="meta">
        <b>{cabecera(c)}</b>
        {c.estado === 'pendiente' && <span className="mono" style={pendienteChip}> pendiente</span>}
      </p>
      <p>{c.texto}</p>

      <div className="react">
        {EMOJIS.map((e) => {
          const quienes = (c.reacciones && c.reacciones[e]) || {};
          const n = Object.keys(quienes).length;
          const puesta = !!(user && quienes[user.nombre]);
          if (!user && n === 0) return null;
          return (
            <button
              key={e}
              className="react-btn"
              style={puesta ? { borderColor: 'var(--gold)', color: 'var(--gold)' } : undefined}
              onClick={() => user && alternarReaccion(campanaId, tipo, refId, c.id, e, user.nombre, puesta)}
              disabled={!user}
              aria-label={`Reaccionar ${e}`}
            >
              {e}{n > 0 ? ` ${n}` : ''}
            </button>
          );
        })}
      </div>

      <div className="acciones mono">
        {(esAutor || esGestor) && <button onClick={alEditar}>editar</button>}
        {esGestor && (
          <button onClick={borrar.pulsar} style={{ color: '#e99' }}>
            {borrar.texto('borrar', '¿seguro? no se puede deshacer')}
          </button>
        )}
        {c.estado === 'pendiente' && puedeAprobar && (
          <button onClick={() => aprobarComentario(campanaId, tipo, refId, c.id)} style={{ color: '#9fd07a' }}>
            aprobar
          </button>
        )}
      </div>

      <style>{css}</style>
    </div>
  );
}

const pendienteChip = {
  marginLeft: '.5rem', fontSize: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase',
  color: '#e0c07a', border: '1px solid rgba(224,192,122,.5)', borderRadius: '999px', padding: '.05rem .4rem',
};

const css = `
.comment .react-btn {
  font-size: .78rem; background: none; cursor: pointer;
  border: 1px solid rgba(201,164,90,.25); border-radius: 999px;
  padding: .05rem .45rem; color: var(--parchment);
}
.comment .react-btn:hover:not(:disabled) { border-color: var(--gold); }
.comment .react-btn:disabled { cursor: default; opacity: .6; }
.comment .acciones { display: flex; gap: .7rem; margin-top: .4rem; }
.comment .acciones button {
  background: none; border: 0; cursor: pointer; padding: 0;
  color: var(--stone); font-family: ui-monospace, monospace; font-size: .66rem;
}
.comment .acciones button:hover { color: var(--gold); text-decoration: underline; }
`;
