// Estado global de CAMPAÑAS (guía §5, §8.2): lista en tiempo real y campaña
// activa, compartidos entre islas React vía nanostores.
//
// - $campaigns : array de campañas (ordenadas por `orden`), en tiempo real.
// - $campaign  : la campaña ACTIVA (objeto completo) o null mientras carga.
// - setCampaign(id) : cambia la activa y la persiste en localStorage.
// - iniciarCampanas() : arranca la suscripción (lo llama AuthGate al montar).
//
// Los scripts NO-React (p. ej. el logo de la topbar) escuchan el evento
// 'phaingea:campana' que se emite en cada cambio de campaña activa.
import { atom } from 'nanostores';
import { suscribirCampanas, ID_BASE } from '../lib/db/campanas.js';
export { rolEnCampana } from '../lib/db/campanas.js';

export const $campaigns = atom([]);
export const $campaign = atom(null);

const KEY = 'phaingea_campana';
let iniciado = false;

/** Arranca la suscripción en tiempo real a /campanas. Idempotente. */
export function iniciarCampanas() {
  if (iniciado || typeof window === 'undefined') return;
  iniciado = true;
  suscribirCampanas((lista) => {
    $campaigns.set(lista);
    // Resolver la activa: mantener la actual si sigue existiendo; si no, la
    // guardada en localStorage; si no, Base; si no, la primera.
    const actual = $campaign.get();
    const guardada = leerGuardada();
    const idDeseada = (actual && actual.id) || guardada || ID_BASE;
    const activa =
      lista.find((c) => c.id === idDeseada) ||
      lista.find((c) => c.id === ID_BASE) ||
      lista[0] ||
      null;
    $campaign.set(activa);
  });
}

/** Cambia la campaña activa (id debe existir en $campaigns) y la persiste. */
export function setCampaign(id) {
  const c = $campaigns.get().find((x) => x.id === id);
  if (!c) return false;
  $campaign.set(c);
  try {
    localStorage.setItem(KEY, id);
  } catch (_) {}
  return true;
}

function leerGuardada() {
  try {
    return localStorage.getItem(KEY);
  } catch (_) {
    return null;
  }
}

// Notificar a los scripts no-React (logo de topbar, etc.).
if (typeof window !== 'undefined') {
  $campaign.subscribe((c) => {
    window.dispatchEvent(new CustomEvent('phaingea:campana', { detail: c }));
  });
  // Cambio de campaña desde la consola: mecanismo provisional hasta que el
  // dial del Observatorio (T18) sea el selector real.
  //   window.phaingea.setCampaign('id-de-campana')
  window.phaingea = Object.assign(window.phaingea || {}, { setCampaign, $campaign, $campaigns });
}
