// Preferencias personales del usuario (guía §19.2, §24.3, §29).
// Son ajustes DE DISPOSITIVO (sonido, recarga automática, contraste), así que
// viven en localStorage: no hace falta molestar a la base de datos y funcionan
// aunque no haya sesión.
//
//   leerPrefs()            -> objeto con todas las preferencias
//   guardarPrefs(cambios)  -> mezcla y persiste; avisa con 'phaingea:prefs'
//   getPref('sonidos')     -> valor suelto
const CLAVE = 'phaingea_prefs';

export const PREFS_POR_DEFECTO = {
  sonidos: true,        // efectos discretos (los consume T66)
  autoRecarga: true,    // recargar al publicarse una versión nueva
  altoContraste: false, // modo pergamino de alto contraste
};

export function leerPrefs() {
  try {
    return { ...PREFS_POR_DEFECTO, ...JSON.parse(localStorage.getItem(CLAVE) || '{}') };
  } catch (_) {
    return { ...PREFS_POR_DEFECTO };
  }
}

export function guardarPrefs(cambios) {
  const nuevas = { ...leerPrefs(), ...cambios };
  try {
    localStorage.setItem(CLAVE, JSON.stringify(nuevas));
  } catch (_) {}
  aplicarPrefs(nuevas);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('phaingea:prefs', { detail: nuevas }));
  }
  return nuevas;
}

export function getPref(clave) {
  return leerPrefs()[clave];
}

/** Efectos visuales inmediatos de las preferencias. */
export function aplicarPrefs(prefs = leerPrefs()) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('alto-contraste', !!prefs.altoContraste);
}
