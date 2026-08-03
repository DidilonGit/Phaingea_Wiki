// Estado global del usuario logueado (nanostore, compartido entre islas React).
import { atom } from 'nanostores';

export const $user = atom(null); // { nombre, rol } | null

// Notifica los cambios de sesión a los scripts NO-React (p.ej. el gating del
// banderín de Moderación en TopBar.astro escucha 'phaingea:user').
if (typeof window !== 'undefined') {
  $user.subscribe((u) => {
    window.dispatchEvent(new CustomEvent('phaingea:user', { detail: u }));
  });
}

const KEY = 'phaingea_session';

export function guardarSesion(user) {
  $user.set(user);
  try {
    localStorage.setItem(KEY, JSON.stringify(user));
  } catch (_) {}
}

export function cerrarSesion() {
  $user.set(null);
  try {
    localStorage.removeItem(KEY);
  } catch (_) {}
}

export function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null');
  } catch (_) {
    return null;
  }
}

// Helpers de rol (para gatear UI más adelante).
// 'admin' es equivalente a 'owner' (mismos permisos globales).
export function esOwner(u) {
  return !!u && (u.rol === 'owner' || u.rol === 'admin');
}
export function esMasterOOwner(u) {
  return !!u && (u.rol === 'owner' || u.rol === 'admin' || u.rol === 'master');
}
