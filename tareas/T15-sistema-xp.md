# T15 · Sistema de experiencia y niveles (Pathfinder 1e)

**Fase:** 2 · **Depende de:** nada

## Objetivo

Utilidades de XP con las tablas de Pathfinder 1e y barra de progreso de dos colores (general/extra).

## Guía (fragmento literal)

# 23. Experiencia y niveles

El sistema de experiencia estará basado en Pathfinder 1e.

Cada campaña podrá utilizar progresión:

- Rápida.
- Media.
- Lenta.

La web calculará:

- Experiencia total.
- Nivel actual.
- Experiencia necesaria para subir.
- Progreso dentro del nivel.

Ejemplo:

> 766 / 1300 — Nivel 1

## 23.1. Tipos de experiencia

La experiencia se divide en:

- General.
- Extra.

Ambas se representan dentro de una única barra con dos colores.

La barra debe mostrar claramente qué parte procede de cada tipo.

## 23.2. Origen

La experiencia de sesiones se calcula automáticamente desde la categoría Sesiones.

El máster también puede añadir experiencia manual.

Cuando no procede de una sesión, será obligatorio escribir un motivo.

Cuando procede de una sesión, el motivo será su título.

El jugador no puede modificar su propia experiencia.

## Estado actual relevante

- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

nuevo `src/lib/xp.js` · nuevo `src/components/BarraXP.jsx`

## Pasos sugeridos

1. Tablas oficiales PF1e de XP por nivel (progresión rápida/media/lenta) hasta nivel 20 — usar los valores canónicos del Core Rulebook.
2. `nivelDeXp(xp, progresion)`, `umbralNivel(nivel, progresion)`, `progresoNivel(xp, progresion)` → `{nivel, actual, siguiente}`.
3. `<BarraXP general extra progresion />`: una sola barra, dos colores, texto "X / Y — Nivel N", y forma de ver cuánto es general y cuánto extra (title/leyenda).

## Criterios de hecho

- [x] Comprobación manual con valores conocidos (media: nivel 2 = 2.000 XP; rápida: nivel 2 = 1.300 XP).
- [x] La barra pinta bien 766/1300 con parte extra.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
