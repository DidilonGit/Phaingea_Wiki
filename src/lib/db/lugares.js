// Lugares del mundo (guía §10): continentes, regiones, ciudades, pueblos,
// edificios, habitaciones… Cualquier lugar puede contener a otros (§10.6).
//
// Nodo: /lugares/{campanaId}/{lugarId}
//   nombre        string   · nombre visible
//   resumen       string   · texto breve del recuadro al pulsar su pin
//   infoMd        string   · información larga del máster (markdown, §10.5)
//   superior      string   · id del lugar que lo contiene ('' si es raíz)
//   mapaUrl       string   · imagen del mapa ('' si no tiene, §10.2)
//   imagenUrl     string   · ilustración opcional para el recuadro
//   pines         {lugarId: {x, y}}  · posición en % del mapa de ESTE lugar
//   esPredeterminado bool  · el que se abre al entrar en la campaña (§10.2)
//   destacado     bool     · aparece como pin sobre el planeta (§8.4)
//   lat, lon      number?  · para el planeta del Observatorio
//
// Un lugar puede existir aunque todavía no sea pin de nadie (§10.6).
import { db } from '../firebase.js';
import { ref, get, set, update, remove, onValue, push } from 'firebase/database';

function ruta(campanaId, id = '') {
  return `lugares/${campanaId}${id ? '/' + id : ''}`;
}

export function lugarVacio(nombre = 'Lugar sin nombre') {
  return {
    nombre,
    resumen: '',
    infoMd: '',
    superior: '',
    mapaUrl: '',
    imagenUrl: '',
    pines: {},
    esPredeterminado: false,
    destacado: false,
  };
}

/** Suscripción en tiempo real a todos los lugares de la campaña. */
export function suscribirLugares(campanaId, cb) {
  if (!campanaId) return () => {};
  return onValue(ref(db, ruta(campanaId)), (snap) => {
    const val = snap.exists() ? snap.val() : {};
    cb(Object.entries(val).map(([id, l]) => ({ id, ...l })));
  });
}

export async function listarLugares(campanaId) {
  const snap = await get(ref(db, ruta(campanaId)));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, l]) => ({ id, ...l }));
}

export async function leerLugar(campanaId, id) {
  const snap = await get(ref(db, ruta(campanaId, id)));
  return snap.exists() ? { id, ...snap.val() } : null;
}

export async function crearLugar(campanaId, datos) {
  const nodo = push(ref(db, ruta(campanaId)));
  const lugar = { ...lugarVacio(datos.nombre), ...datos };
  await set(nodo, lugar);
  return { id: nodo.key, ...lugar };
}

export async function guardarLugar(campanaId, id, datos) {
  const { id: _i, ...limpio } = datos;
  await set(ref(db, ruta(campanaId, id)), limpio);
}

export async function actualizarLugar(campanaId, id, cambios) {
  await update(ref(db, ruta(campanaId, id)), cambios);
}

export async function eliminarLugar(campanaId, id) {
  await remove(ref(db, ruta(campanaId, id)));
}

// --- helpers de jerarquía -----------------------------------------------

/** Lugares hijos de uno dado. */
export function hijosDe(lugares, id) {
  return (lugares || []).filter((l) => l.superior === id);
}

/** Lugares raíz (sin superior). */
export function raices(lugares) {
  return (lugares || []).filter((l) => !l.superior);
}

/** El lugar que se abre al entrar en la campaña (§10.2). */
export function lugarPredeterminado(lugares) {
  if (!lugares || lugares.length === 0) return null;
  return lugares.find((l) => l.esPredeterminado) || raices(lugares)[0] || lugares[0];
}

/** Camino desde la raíz hasta el lugar (para las migas de pan). */
export function camino(lugares, id) {
  const porId = Object.fromEntries((lugares || []).map((l) => [l.id, l]));
  const ruta = [];
  let actual = porId[id];
  const vistos = new Set();
  while (actual && !vistos.has(actual.id)) {
    vistos.add(actual.id);
    ruta.unshift(actual);
    actual = actual.superior ? porId[actual.superior] : null;
  }
  return ruta;
}

/**
 * Mapa que hay que enseñar de un lugar. Si el lugar no tiene mapa propio (una
 * región dentro de un continente, una sala dentro de un castillo…), se sube por
 * la jerarquía hasta encontrar uno: así nunca se queda el marco vacío (§10.6).
 * Devuelve el LUGAR que aporta el mapa, o null si no hay ninguno.
 */
export function lugarConMapa(lugares, id) {
  const porId = Object.fromEntries((lugares || []).map((l) => [l.id, l]));
  let actual = porId[id];
  const vistos = new Set();
  while (actual && !vistos.has(actual.id)) {
    if (actual.mapaUrl) return actual;
    vistos.add(actual.id);
    actual = actual.superior ? porId[actual.superior] : null;
  }
  return null;
}

/** Lugares marcados para verse sobre el planeta del Observatorio (§8.4). */
export function destacados(lugares) {
  return (lugares || []).filter((l) => l.destacado && typeof l.lat === 'number' && typeof l.lon === 'number');
}

/** Orden alfabético para la lista bajo el mapa (§10.7). */
export function ordenAlfabetico(lugares) {
  return [...(lugares || [])].sort((a, b) => (a.nombre || '').localeCompare(b.nombre || '', 'es'));
}
