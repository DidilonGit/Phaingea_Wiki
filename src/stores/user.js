// Estado global del usuario logueado (nanostore, compartido entre islas React).
import { atom } from 'nanostores';

const KEY = 'phaingea_session';

/** Lee la sesión guardada en el navegador (null si no hay o está corrupta). */
export function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null');
  } catch (_) {
    return null;
  }
}

// La sesión se recupera YA, al cargar el módulo, no dentro de un efecto: así
// al recargar la página el usuario nunca ve pasar la ventana de login.
export const $user = atom(typeof window === 'undefined' ? null : leerSesion()); // { nombre, rol } | null

// Notifica los cambios de sesión a los scripts NO-React (p.ej. el gating del
// banderín de Moderación en TopBar.astro escucha 'phaingea:user').
if (typeof window !== 'undefined') {
  $user.subscribe((u) => {
    window.dispatchEvent(new CustomEvent('phaingea:user', { detail: u }));
  });
}

export function guardarSesion(user) {
  $user.set(user);
  marcarSesion(!!user);
  try {
    localStorage.setItem(KEY, JSON.stringify(user));
  } catch (_) {}
}

export function cerrarSesion() {
  $user.set(null);
  marcarSesion(false);
  try {
    localStorage.removeItem(KEY);
  } catch (_) {}
}

/** Marca el documento como "con sesión". Lo usa el CSS del layout para que la
 *  ventana de login no se vea al recargar (y para que reaparezca al salir). */
function marcarSesion(hay) {
  if (typeof document === 'undefined') return;
  if (hay) document.documentElement.dataset.sesion = 'si';
  else delete document.documentElement.dataset.sesion;
}

// Helpers de rol (para gatear UI más adelante).
// 'admin' es equivalente a 'owner' (mismos permisos globales).
export function esOwner(u) {
  return !!u && (u.rol === 'owner' || u.rol === 'admin');
}
export function esMasterOOwner(u) {
  return !!u && (u.rol === 'owner' || u.rol === 'admin' || u.rol === 'master');
}
