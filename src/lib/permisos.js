// Permisos por campaña y categoría (guía §21).
//
// Roles: invitado < jugador < master < owner. El rol `admin` equivale a owner.
// El rol GLOBAL vive en /usuarios/{nombre}.rol; el rol POR CAMPAÑA sale de las
// listas `masters` y `jugadores` de la campaña (ver rolEnCampana).
//
// IMPORTANTE: esto gatea la INTERFAZ. La barrera de datos son las reglas de la
// base (database.rules.json), que sin auth real solo validan forma: es un
// modelo de confianza para el grupo.
import { rolEnCampana } from './db/campanas.js';

export { rolEnCampana };

/** Owner/admin global: puede todo en todas las campañas. */
export function esOwnerGlobal(user) {
  return !!user && (user.rol === 'owner' || user.rol === 'admin');
}

/** ¿Administra esta campaña? (owner global o máster de ella) */
export function esMasterDe(user, campana) {
  const r = rolEnCampana(user, campana);
  return r === 'owner' || r === 'master';
}

/** ¿Participa con personaje en la campaña? */
export function puedeParticipar(user, campana) {
  const r = rolEnCampana(user, campana);
  return r === 'jugador' || r === 'master' || r === 'owner';
}

/**
 * ¿Puede ver la campaña?
 * - Privada: solo participantes, másteres y owner (guía §5.1, §21.5).
 * - Archivada/finalizada/activa: visible para cualquiera que entre.
 */
export function puedeVerCampana(user, campana) {
  if (!campana) return false;
  if (esOwnerGlobal(user)) return true;
  if (campana.estado === 'privada') return puedeParticipar(user, campana);
  return true;
}

/** Campañas visibles para este usuario (para el dial, T18). */
export function campanasVisibles(user, campanas) {
  return (campanas || []).filter((c) => puedeVerCampana(user, c));
}

/**
 * ¿Puede ver una categoría concreta de la campaña?
 * `moderacion` solo para máster/owner (guía §3, §25); el resto sigue la
 * visibilidad de la campaña.
 */
export function puedeVerCategoria(user, campana, categoria) {
  if (categoria === 'moderacion') return esMasterDe(user, campana) || esOwnerGlobal(user);
  return puedeVerCampana(user, campana);
}

/** ¿Puede comentar? (guía §21.2: los jugadores comentan; el invitado no) */
export function puedeComentar(user, campana) {
  return puedeParticipar(user, campana);
}

/** ¿Puede proponer contenido (imágenes)? */
export function puedeProponer(user, campana) {
  return puedeParticipar(user, campana);
}

/** ¿Puede gestionar contenido/moderar en esta campaña? */
export function puedeGestionar(user, campana) {
  return esMasterDe(user, campana);
}

/** ¿Puede aprobar solicitudes? */
export function puedeAprobar(user, campana) {
  return esMasterDe(user, campana);
}

/** Etiqueta legible del rol en la campaña (para la interfaz). */
export function etiquetaRol(user, campana) {
  return { owner: 'Owner', master: 'Máster', jugador: 'Jugador', invitado: 'Invitado' }[
    rolEnCampana(user, campana)
  ];
}
