// Experiencia y niveles de Pathfinder 1e (guía §23).
//
// Tres progresiones oficiales del Core Rulebook: rápida, media y lenta.
// Cada tabla indica la XP TOTAL acumulada necesaria para alcanzar ese nivel
// (índice 0 = nivel 1, que siempre es 0 XP).
//
//   nivelDeXp(1500, 'media')      -> 2       (2.000 es nivel 3, aún no llega)
//   progresoNivel(766, 'rapida')  -> { nivel: 1, dentro: 766, necesaria: 1300, siguiente: 1300, restante: 534 }
//
// El nivel NUNCA se guarda en la base de datos: se calcula siempre desde la
// XP total, así no puede desincronizarse (ver T45).

export const TABLAS = {
  rapida: [
    0, 1300, 3300, 6000, 10000, 15000, 23000, 34000, 50000, 71000,
    105000, 145000, 210000, 295000, 425000, 600000, 850000, 1200000, 1700000, 2400000,
  ],
  media: [
    0, 2000, 5000, 9000, 15000, 23000, 35000, 51000, 75000, 105000,
    155000, 220000, 315000, 445000, 635000, 890000, 1300000, 1800000, 2550000, 3600000,
  ],
  lenta: [
    0, 3000, 7500, 14000, 23000, 35000, 53000, 77000, 115000, 160000,
    235000, 330000, 475000, 665000, 955000, 1350000, 1900000, 2700000, 3850000, 5350000,
  ],
};

export const NIVEL_MAX = 20;

function tabla(progresion) {
  return TABLAS[progresion] || TABLAS.media;
}

/** Nivel (1-20) que corresponde a una XP total. */
export function nivelDeXp(xp, progresion = 'media') {
  const t = tabla(progresion);
  const total = Math.max(0, Number(xp) || 0);
  let nivel = 1;
  for (let i = 1; i < t.length; i++) {
    if (total >= t[i]) nivel = i + 1;
    else break;
  }
  return nivel;
}

/** XP total necesaria para alcanzar `nivel` (1-20). */
export function umbralNivel(nivel, progresion = 'media') {
  const t = tabla(progresion);
  const n = Math.min(Math.max(1, nivel), NIVEL_MAX);
  return t[n - 1];
}

/**
 * Progreso dentro del nivel actual.
 * Devuelve { nivel, dentro, necesaria, siguiente, restante, porcentaje }.
 *   dentro    = XP conseguida desde que se alcanzó el nivel actual
 *   necesaria = XP que hace falta para pasar de este nivel al siguiente
 *   siguiente = XP TOTAL a la que se sube de nivel
 */
export function progresoNivel(xp, progresion = 'media') {
  const total = Math.max(0, Number(xp) || 0);
  const nivel = nivelDeXp(total, progresion);
  const base = umbralNivel(nivel, progresion);
  if (nivel >= NIVEL_MAX) {
    return { nivel, dentro: 0, necesaria: 0, siguiente: base, restante: 0, porcentaje: 100 };
  }
  const siguiente = umbralNivel(nivel + 1, progresion);
  const necesaria = siguiente - base;
  const dentro = total - base;
  return {
    nivel,
    dentro,
    necesaria,
    siguiente,
    restante: siguiente - total,
    porcentaje: necesaria > 0 ? Math.min(100, (dentro / necesaria) * 100) : 0,
  };
}

/** Texto de progreso como en la guía: "766 / 1300 — Nivel 1". */
export function textoProgreso(xp, progresion = 'media') {
  const p = progresoNivel(xp, progresion);
  if (p.nivel >= NIVEL_MAX) return `Nivel ${NIVEL_MAX} (máximo)`;
  return `${p.dentro} / ${p.necesaria} — Nivel ${p.nivel}`;
}
