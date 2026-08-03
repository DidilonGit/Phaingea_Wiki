// Comentarios (guía §22). Un único sistema para todas las categorías; lo que
// cambia es la configuración de cada hilo.
//
// Nodo: /comentarios/{campanaId}/{tipo}/{refId}/{comentarioId}
//   tipo  = capilla | cartografia | podios | sesiones | eventos | galeria …
//   refId = 'general' para hilos de sala, o el id del elemento (lugar,
//           personaje, sesión…)
//
// FORMA
//   autor          string   · nombre de usuario
//   personaje      string?  · nombre del personaje en esa campaña (cabecera)
//   texto          string
//   fecha          number   · timestamp
//   editado        number?  · timestamp de la última edición
//   estado         'publicado' | 'pendiente'   (aprobación, §22.2)
//   reacciones     {emoji: {usuario: true}}    (§22.3)
//
// Sin respuestas anidadas: no hay hilos (guía §22.3).
import { db } from '../firebase.js';
import { ref, push, set, update, remove, onValue, get } from 'firebase/database';

export const EMOJIS = ['👍', '🔥', '😂', '😮', '❤️', '🎲'];

function rutaHilo(campanaId, tipo, refId = 'general') {
  return `comentarios/${campanaId}/${tipo}/${refId}`;
}

/** Suscripción en tiempo real al hilo. Devuelve la función para desuscribirse. */
export function suscribirComentarios(campanaId, tipo, refId, cb) {
  if (!campanaId) return () => {};
  return onValue(ref(db, rutaHilo(campanaId, tipo, refId)), (snap) => {
    const val = snap.exists() ? snap.val() : {};
    const lista = Object.entries(val)
      .map(([id, c]) => ({ id, ...c }))
      .sort((a, b) => (a.fecha || 0) - (b.fecha || 0));
    cb(lista);
  });
}

export async function leerComentarios(campanaId, tipo, refId) {
  const snap = await get(ref(db, rutaHilo(campanaId, tipo, refId)));
  if (!snap.exists()) return [];
  return Object.entries(snap.val())
    .map(([id, c]) => ({ id, ...c }))
    .sort((a, b) => (a.fecha || 0) - (b.fecha || 0));
}

/** Crea un comentario. `pendiente` lo deja a la espera de aprobación. */
export async function crearComentario(campanaId, tipo, refId, { autor, personaje = '', texto, pendiente = false }) {
  const limpio = String(texto || '').trim();
  if (!autor) throw new Error('Hace falta un usuario para comentar.');
  if (!limpio) throw new Error('El comentario está vacío.');
  if (limpio.length > 4000) throw new Error('El comentario es demasiado largo.');

  const nodo = push(ref(db, rutaHilo(campanaId, tipo, refId)));
  const datos = {
    autor,
    personaje: personaje || '',
    texto: limpio,
    fecha: Date.now(),
    estado: pendiente ? 'pendiente' : 'publicado',
  };
  await set(nodo, datos);
  return { id: nodo.key, ...datos };
}

export async function editarComentario(campanaId, tipo, refId, id, texto) {
  const limpio = String(texto || '').trim();
  if (!limpio) throw new Error('El comentario está vacío.');
  await update(ref(db, `${rutaHilo(campanaId, tipo, refId)}/${id}`), {
    texto: limpio,
    editado: Date.now(),
  });
}

export async function borrarComentario(campanaId, tipo, refId, id) {
  await remove(ref(db, `${rutaHilo(campanaId, tipo, refId)}/${id}`));
}

export async function aprobarComentario(campanaId, tipo, refId, id) {
  await update(ref(db, `${rutaHilo(campanaId, tipo, refId)}/${id}`), { estado: 'publicado' });
}

/** Alterna la reacción de un usuario a un comentario. */
export async function alternarReaccion(campanaId, tipo, refId, id, emoji, usuario, puesta) {
  const r = ref(db, `${rutaHilo(campanaId, tipo, refId)}/${id}/reacciones/${emoji}/${usuario}`);
  if (puesta) await remove(r);
  else await set(r, true);
}

/** Cabecera "Personaje (Jugador) — Fecha" (guía §22). */
export function cabecera(c) {
  const fecha = c.fecha ? new Date(c.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
  const quien = c.personaje ? `${c.personaje} (${c.autor})` : c.autor;
  return `${quien} — ${fecha}${c.editado ? ' · editado' : ''}`;
}
