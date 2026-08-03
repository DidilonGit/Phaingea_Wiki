// Personajes (guía §11, §19.4, §20). Solo existen DENTRO de una campaña.
//
// Nodo: /personajes/{campanaId}/{personajeId}
//   propietario    string   · usuario que lo controla
//   nombre, edad, raza, sexo, descripcion
//   imagenUrl      string   · ilustración completa (Podios, §11.1)
//   recorte        {x,y,zoom} · encuadre circular para el avatar (§19.4)
//   diarioMd       string   · diario en markdown (§11.7)
//   estado         'activo' | 'fallecido' | 'delegado' | 'historico'
//   grupos         [string] · nombres de grupo (§11.5)
//   oculto         bool     · privacidad: barras negras para los demás (§19.5)
//   xpManual       [{cantidad, motivo, fecha}]  · añadidos del máster (§23.2)
//
// EXPERIENCIA: nunca se guarda el nivel. La XP total se calcula sumando las
// sesiones (general + extra de ese personaje) y los añadidos manuales; el
// nivel sale de las tablas de Pathfinder 1e (src/lib/xp.js). Así no puede
// desincronizarse.
import { db } from '../firebase.js';
import { ref, get, set, update, remove, onValue, push } from 'firebase/database';

export const ESTADOS = ['activo', 'fallecido', 'delegado'];
export const ESTADOS_BASE = ['historico']; // Leyendas (§12)

function ruta(campanaId, id = '') {
  return `personajes/${campanaId}${id ? '/' + id : ''}`;
}

export function personajeVacio(propietario, nombre = 'Sin nombre') {
  return {
    propietario,
    nombre,
    edad: '',
    raza: '',
    sexo: '',
    descripcion: '',
    imagenUrl: '',
    recorte: { x: 50, y: 50, zoom: 1 },
    diarioMd: '',
    estado: 'activo',
    grupos: [],
    oculto: false,
    xpManual: [],
    creado: Date.now(),
  };
}

export function suscribirPersonajes(campanaId, cb) {
  if (!campanaId) return () => {};
  return onValue(ref(db, ruta(campanaId)), (snap) => {
    const val = snap.exists() ? snap.val() : {};
    cb(Object.entries(val).map(([id, p]) => ({ id, ...p })));
  });
}

export async function listarPersonajes(campanaId) {
  const snap = await get(ref(db, ruta(campanaId)));
  if (!snap.exists()) return [];
  return Object.entries(snap.val()).map(([id, p]) => ({ id, ...p }));
}

export async function leerPersonaje(campanaId, id) {
  const snap = await get(ref(db, ruta(campanaId, id)));
  return snap.exists() ? { id, ...snap.val() } : null;
}

/**
 * Crea un personaje. Regla de la guía (§18/§20): un jugador solo puede tener
 * UN personaje activo por campaña; para crear otro, el anterior debe estar
 * fallecido o delegado.
 */
export async function crearPersonaje(campanaId, datos, { saltarLimite = false } = {}) {
  if (!datos?.propietario) throw new Error('El personaje necesita un propietario.');
  if (!saltarLimite) {
    const existentes = await listarPersonajes(campanaId);
    const activo = existentes.find((p) => p.propietario === datos.propietario && p.estado === 'activo');
    if (activo) {
      throw new Error(
        `Ya tienes un personaje activo (${activo.nombre}). El máster debe marcarlo como fallecido o delegado antes de crear otro.`
      );
    }
  }
  const nodo = push(ref(db, ruta(campanaId)));
  const p = { ...personajeVacio(datos.propietario, datos.nombre), ...datos };
  await set(nodo, p);
  return { id: nodo.key, ...p };
}

export async function actualizarPersonaje(campanaId, id, cambios) {
  await update(ref(db, ruta(campanaId, id)), cambios);
}

export async function eliminarPersonaje(campanaId, id) {
  await remove(ref(db, ruta(campanaId, id)));
}

/** Añade experiencia manual; el motivo es obligatorio (guía §23.2). */
export async function anadirXpManual(campanaId, id, cantidad, motivo) {
  const limpio = String(motivo || '').trim();
  if (!limpio) throw new Error('La experiencia manual necesita un motivo.');
  const p = await leerPersonaje(campanaId, id);
  const lista = Array.isArray(p?.xpManual) ? p.xpManual : [];
  lista.push({ cantidad: Number(cantidad) || 0, motivo: limpio, fecha: Date.now() });
  await update(ref(db, ruta(campanaId, id)), { xpManual: lista });
}

/**
 * Experiencia de un personaje a partir de las sesiones y los añadidos
 * manuales. Devuelve { general, extra, total }.
 *  · general: la XP general de cada sesión en la que participa
 *  · extra:   la asignada a él en concreto + los añadidos manuales
 */
export function calcularXp(personaje, sesiones = []) {
  let general = 0;
  let extra = 0;
  for (const s of sesiones) {
    const suya = s.xpExtra ? Number(s.xpExtra[personaje.id] || 0) : 0;
    // Participa si tiene XP extra asignada o si la sesión no limita a nadie.
    const participa = !s.participantes || s.participantes[personaje.id];
    if (participa) general += Number(s.xpGeneral || 0);
    extra += suya;
  }
  for (const m of personaje.xpManual || []) extra += Number(m.cantidad || 0);
  return { general, extra, total: general + extra };
}

/** Personajes ordenados alfabéticamente (guía §11.3). */
export function ordenAlfabetico(personajes) {
  return [...(personajes || [])].sort((a, b) => (a.nombre || '').localeCompare(b.nombre || '', 'es'));
}

/** Todos los grupos que existen en la campaña (§11.5). */
export function gruposDe(personajes) {
  const set = new Set();
  for (const p of personajes || []) for (const g of p.grupos || []) set.add(g);
  return [...set].sort((a, b) => a.localeCompare(b, 'es'));
}
