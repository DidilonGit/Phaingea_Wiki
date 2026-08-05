// Campañas (guía §5 y §6). Cada campaña es una versión del mundo de Phaingea.
// Nodo en Realtime Database: /campanas/{campanaId}
//
// FORMA DE UNA CAMPAÑA
//   nombre         string    · nombre visible
//   esBase         bool      · true solo en 'base-phaingea' (lore canónico)
//   logoUrl        string    · logo de la campaña ('' si aún no tiene)
//   planeta        {colorA, colorB} · colores del planeta en el dial/observatorio
//   fuenteTitulo   string    · familia tipográfica del título
//   colorTexto     string    · color del título
//   colorContorno  string    · contorno del título
//   descripcion    string    · uno o varios párrafos
//   estado         'activa' | 'finalizada' | 'archivada' | 'privada'
//   jugadores      {usuario: true}
//   masters        {usuario: true}
//   progresionXP   'rapida' | 'media' | 'lenta'   (Pathfinder 1e)
//   orden          number    · posición en el dial (Base siempre 0)
//   categorias     {capilla:{heredaDe}, cartografia:{heredaDe}}  · herencia (§7)
//   creada         number    · timestamp
//
// SEGURIDAD: no hay autenticación real de Firebase (el login es propio), así
// que las reglas NO pueden comprobar el rol: validan la forma y la UI gatea
// quién ve los formularios. Ver database.rules.json.
import { db } from '../firebase.js';
import { ref, get, set, update, remove, onValue } from 'firebase/database';

export const ID_BASE = 'base-phaingea';

export const ESTADOS = ['activa', 'finalizada', 'archivada', 'privada'];
export const PROGRESIONES = ['rapida', 'media', 'lenta'];

/** Plantilla de campaña nueva con valores por defecto. */
export function campanaVacia(nombre = 'Campaña sin nombre') {
  return {
    nombre,
    esBase: false,
    logoUrl: '',
    planeta: { colorA: '#5b6a8a', colorB: '#2b3350' },
    fuenteTitulo: 'Georgia, serif',
    colorTexto: '#efe6d2',
    colorContorno: '#c9a45a',
    descripcion: '',
    estado: 'activa',
    jugadores: {},
    masters: {},
    progresionXP: 'media',
    orden: 1,
    // Por defecto una campaña nueva hereda de Base de Phaingea (guía §7).
    categorias: {
      capilla: { heredaDe: ID_BASE },
      cartografia: { heredaDe: ID_BASE },
    },
    creada: Date.now(),
  };
}

/** Id legible a partir del nombre ('Las Cenizas' -> 'las-cenizas'). */
export function idDesdeNombre(nombre) {
  return (nombre || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'campana';
}

/** Lee todas las campañas una vez. Devuelve array ordenado por `orden`. */
export async function listarCampanas() {
  const snap = await get(ref(db, 'campanas'));
  return aLista(snap.exists() ? snap.val() : {});
}

/** Suscripción en tiempo real. Devuelve función para desuscribirse. */
export function suscribirCampanas(cb) {
  return onValue(ref(db, 'campanas'), (snap) => {
    cb(aLista(snap.exists() ? snap.val() : {}));
  });
}

export async function leerCampana(id) {
  const snap = await get(ref(db, 'campanas/' + id));
  return snap.exists() ? { id, ...snap.val() } : null;
}

/** Crea o reemplaza una campaña entera. */
export async function guardarCampana(id, datos) {
  const { id: _ignora, ...limpio } = datos;
  await set(ref(db, 'campanas/' + id), limpio);
  return { id, ...limpio };
}

/** Actualiza solo algunos campos. */
export async function actualizarCampana(id, cambios) {
  await update(ref(db, 'campanas/' + id), cambios);
}

/** Crea una campaña nueva colocándola al final del dial. */
export async function crearCampana(datos) {
  const existentes = await listarCampanas();
  const id = idUnico(idDesdeNombre(datos.nombre), existentes);
  const orden = existentes.reduce((max, c) => Math.max(max, c.orden || 0), 0) + 1;
  return guardarCampana(id, { ...campanaVacia(datos.nombre), ...datos, orden, esBase: false });
}

/**
 * Corta la herencia de una categoría (guía §7): a partir de ahora la campaña
 * tiene su propio contenido, que empieza vacío. Se puede volver a heredar
 * desde Moderación.
 */
export async function dejarDeHeredar(campanaId, categoria) {
  if (!campanaId || !categoria) return;
  await update(ref(db, `campanas/${campanaId}/categorias/${categoria}`), { heredaDe: '' });
}

/** Elimina una campaña. Base de Phaingea no se puede eliminar (guía §6). */
export async function eliminarCampana(id) {
  if (id === ID_BASE) throw new Error('Base de Phaingea no se puede eliminar.');
  await remove(ref(db, 'campanas/' + id));
}

/** Rol del usuario en una campaña: owner (global) > master > jugador > invitado. */
export function rolEnCampana(user, campana) {
  if (!user) return 'invitado';
  if (user.rol === 'owner' || user.rol === 'admin') return 'owner';
  if (campana?.masters && campana.masters[user.nombre]) return 'master';
  if (campana?.jugadores && campana.jugadores[user.nombre]) return 'jugador';
  return 'invitado';
}

// --- internos ---
function aLista(obj) {
  return Object.entries(obj)
    .map(([id, c]) => ({ id, ...c }))
    .sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99));
}

function idUnico(base, existentes) {
  const usados = new Set(existentes.map((c) => c.id));
  if (!usados.has(base)) return base;
  let n = 2;
  while (usados.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}
