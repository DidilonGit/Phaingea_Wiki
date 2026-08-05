// Pines sobre el PLANETA del Observatorio (guía §8.4).
//
// Nodo: /planeta/{campanaId}/{lugarId} = { lat, lon }
//
// POR QUÉ UN NODO APARTE
//   Todas las campañas comparten el mismo mundo y muchas heredan la cartografía
//   de Base de Phaingea (§7). Aun así, CADA CAMPAÑA tiene su planeta: el mismo
//   globo, pero con SUS pines. Si esto viviera en el propio lugar, marcar uno en
//   Base lo marcaría en todas las campañas que heredan de ella.
//   Guardándolo por campaña, cada máster elige qué se ve en su planeta y dónde,
//   aunque los lugares vengan prestados de otra campaña.
//
//   lat  −90 (sur) .. 90 (norte)
//   lon −180 .. 180 (0 = el meridiano que mira al frente sin girar)
import { db } from '../firebase.js';
import { ref, set, remove, onValue, get } from 'firebase/database';

function ruta(campanaId, lugarId = '') {
  return `planeta/${campanaId}${lugarId ? '/' + lugarId : ''}`;
}

/** Suscripción a los pines del planeta de una campaña. Devuelve {lugarId: {lat,lon}}. */
export function suscribirPinesPlaneta(campanaId, cb) {
  if (!campanaId) return () => {};
  return onValue(ref(db, ruta(campanaId)), (snap) => cb(snap.exists() ? snap.val() : {}));
}

export async function leerPinesPlaneta(campanaId) {
  const snap = await get(ref(db, ruta(campanaId)));
  return snap.exists() ? snap.val() : {};
}

/** Pone (o mueve) el pin de un lugar en el planeta de esta campaña. */
export async function fijarPinPlaneta(campanaId, lugarId, { lat, lon }) {
  const grados = (n) => Math.round(n * 10) / 10; // una décima basta y evita colas de decimales
  await set(ref(db, ruta(campanaId, lugarId)), {
    lat: grados(Math.max(-90, Math.min(90, Number(lat) || 0))),
    lon: grados(((((Number(lon) || 0) + 180) % 360) + 360) % 360 - 180),
  });
}

/** Quita el pin del planeta (el lugar sigue existiendo en Cartografía). */
export async function quitarPinPlaneta(campanaId, lugarId) {
  await remove(ref(db, ruta(campanaId, lugarId)));
}
