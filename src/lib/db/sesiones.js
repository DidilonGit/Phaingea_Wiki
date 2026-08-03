// Sesiones y Eventos (guía §14 y §15).
//
// SESIONES  /sesiones/{campanaId}/{sesionId}
//   num            number   · número de sesión
//   titulo         string   · por defecto "Sesión {n}"
//   subtitulo      string?
//   xpGeneral      number   · experiencia compartida (puede ser 0)
//   xpExtra        {personajeId: cantidad}   · experiencia adicional
//   participantes  {personajeId: true}?      · si falta, participan todos
//   descripcion    string?
//   fecha          number
//
// EVENTOS   /eventos/{campanaId}/{eventoId}   (solo en Base de Phaingea)
//   titulo, fechaTexto, subtitulo?, descripcion, imagenUrl?
//   Sin experiencia ni participantes (§15).
//
// La XP de los personajes se calcula SIEMPRE desde aquí (ver personajes.js →
// calcularXp): al cambiar una sesión, los niveles se recalculan solos.
import { db } from '../firebase.js';
import { ref, get, set, update, remove, onValue, push } from 'firebase/database';

// --- sesiones ---------------------------------------------------------

function ruta(campanaId, id = '') {
  return `sesiones/${campanaId}${id ? '/' + id : ''}`;
}

export function suscribirSesiones(campanaId, cb) {
  if (!campanaId) return () => {};
  return onValue(ref(db, ruta(campanaId)), (snap) => {
    const val = snap.exists() ? snap.val() : {};
    cb(
      Object.entries(val)
        .map(([id, s]) => ({ id, ...s }))
        .sort((a, b) => (a.num || 0) - (b.num || 0))
    );
  });
}

export async function listarSesiones(campanaId) {
  const snap = await get(ref(db, ruta(campanaId)));
  if (!snap.exists()) return [];
  return Object.entries(snap.val())
    .map(([id, s]) => ({ id, ...s }))
    .sort((a, b) => (a.num || 0) - (b.num || 0));
}

/** Número que le tocaría a la próxima sesión (para el título por defecto). */
export async function siguienteNumero(campanaId) {
  const lista = await listarSesiones(campanaId);
  return lista.reduce((max, s) => Math.max(max, s.num || 0), 0) + 1;
}

export async function crearSesion(campanaId, datos) {
  const num = datos.num || (await siguienteNumero(campanaId));
  const nodo = push(ref(db, ruta(campanaId)));
  const sesion = {
    num,
    titulo: datos.titulo?.trim() || `Sesión ${num}`,
    subtitulo: datos.subtitulo || '',
    xpGeneral: Number(datos.xpGeneral) || 0,
    xpExtra: datos.xpExtra || {},
    descripcion: datos.descripcion || '',
    fecha: Date.now(),
  };
  await set(nodo, sesion);
  return { id: nodo.key, ...sesion };
}

export async function actualizarSesion(campanaId, id, cambios) {
  await update(ref(db, ruta(campanaId, id)), cambios);
}

export async function eliminarSesion(campanaId, id) {
  await remove(ref(db, ruta(campanaId, id)));
}

// --- eventos (Base de Phaingea) ---------------------------------------

function rutaEv(campanaId, id = '') {
  return `eventos/${campanaId}${id ? '/' + id : ''}`;
}

export function suscribirEventos(campanaId, cb) {
  if (!campanaId) return () => {};
  return onValue(ref(db, rutaEv(campanaId)), (snap) => {
    const val = snap.exists() ? snap.val() : {};
    cb(
      Object.entries(val)
        .map(([id, e]) => ({ id, ...e }))
        .sort((a, b) => (a.orden || 0) - (b.orden || 0))
    );
  });
}

export async function crearEvento(campanaId, datos) {
  const nodo = push(ref(db, rutaEv(campanaId)));
  const evento = {
    titulo: datos.titulo?.trim() || 'Acontecimiento',
    fechaTexto: datos.fechaTexto || '',
    subtitulo: datos.subtitulo || '',
    descripcion: datos.descripcion || '',
    imagenUrl: datos.imagenUrl || '',
    orden: Number(datos.orden) || Date.now(),
  };
  await set(nodo, evento);
  return { id: nodo.key, ...evento };
}

export async function actualizarEvento(campanaId, id, cambios) {
  await update(ref(db, rutaEv(campanaId, id)), cambios);
}

export async function eliminarEvento(campanaId, id) {
  await remove(ref(db, rutaEv(campanaId, id)));
}
