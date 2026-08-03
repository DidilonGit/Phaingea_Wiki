// Notificaciones (guía §18) y registros importantes (§26).
//
// NOTIFICACIONES  /notificaciones/{campanaId}/{usuario}/{id}
//   asunto      string   · "Sesión publicada", "Personaje fallecido"…
//   tipo        string   · clave para agrupar/iconos
//   contenido   string   · texto completo de la carta
//   fecha       number
//   estado      'pendiente' | 'archivada'
//
// Siempre pertenecen a una campaña concreta (§18.7). El contador del sobre
// cuenta solo las pendientes de la campaña activa.
//
// REGISTROS  /registros/{campanaId}/{id}
//   tipo, actor, resumen, fecha   · solo acciones importantes (§26)
import { db } from '../firebase.js';
import { ref, set, update, onValue, push, get } from 'firebase/database';

// --- notificaciones ---------------------------------------------------

export function suscribirNotificaciones(campanaId, usuario, cb) {
  if (!campanaId || !usuario) return () => {};
  return onValue(ref(db, `notificaciones/${campanaId}/${usuario}`), (snap) => {
    const val = snap.exists() ? snap.val() : {};
    cb(
      Object.entries(val)
        .map(([id, n]) => ({ id, ...n }))
        .sort((a, b) => (b.fecha || 0) - (a.fecha || 0))
    );
  });
}

/** Envía una notificación a varios usuarios de una campaña. */
export async function notificar(campanaId, usuarios, { asunto, tipo = 'aviso', contenido = '' }) {
  if (!campanaId || !usuarios?.length) return;
  const datos = { asunto, tipo, contenido, fecha: Date.now(), estado: 'pendiente' };
  await Promise.all(
    usuarios.filter(Boolean).map((u) => {
      const nodo = push(ref(db, `notificaciones/${campanaId}/${u}`));
      return set(nodo, datos);
    })
  );
}

/** Todos los participantes de una campaña (jugadores + másteres). */
export function participantesDe(campana) {
  return [...Object.keys(campana?.jugadores || {}), ...Object.keys(campana?.masters || {})];
}

export async function archivarNotificacion(campanaId, usuario, id) {
  await update(ref(db, `notificaciones/${campanaId}/${usuario}/${id}`), { estado: 'archivada' });
}

export async function contarPendientes(campanaId, usuario) {
  const snap = await get(ref(db, `notificaciones/${campanaId}/${usuario}`));
  if (!snap.exists()) return 0;
  return Object.values(snap.val()).filter((n) => n.estado === 'pendiente').length;
}

// --- registros importantes (§26) --------------------------------------

export function suscribirRegistros(campanaId, cb) {
  if (!campanaId) return () => {};
  return onValue(ref(db, `registros/${campanaId}`), (snap) => {
    const val = snap.exists() ? snap.val() : {};
    cb(
      Object.entries(val)
        .map(([id, r]) => ({ id, ...r }))
        .sort((a, b) => (b.fecha || 0) - (a.fecha || 0))
    );
  });
}

/** Deja constancia de una acción importante. */
export async function registrar(campanaId, { tipo, actor = '', resumen = '' }) {
  if (!campanaId || !tipo) return;
  const nodo = push(ref(db, `registros/${campanaId}`));
  await set(nodo, { tipo, actor, resumen, fecha: Date.now() });
}
