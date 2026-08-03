# T51 · Panel de tips del Taller

**Fase:** 4 · **Depende de:** T16, T50

## Objetivo

Panel desplegable de tarjetas (consejos/avisos) ordenadas por el máster, con scroll interno.

## Guía (fragmento literal)

## 16.3. Panel de tips

Fuera del libro habrá un panel desplegable con tarjetas.

Las tarjetas podrán contener:

- Consejos.
- Recordatorios.
- Noticias.
- Reglas rápidas.
- Aclaraciones.
- Avisos de campaña.

El máster decidirá su orden.

El panel:

- Podrá expandirse o contraerse.
- Tendrá scroll interno.
- Evitará ocupar toda la pantalla cuando existan muchos tips.

## Estado actual relevante

- **Permisos:** helpers por campaña/categoría en `src/lib/permisos.js` (T17). Botón de moderación contextual `src/components/BotonMod.jsx` (T16).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

isla del Taller · `/taller/{campanaId}/tips`

## Pasos sugeridos

1. `tips: {id: {texto, orden}}`; tarjetas estilo notas de papel.
2. Panel expandir/contraer con scroll interno (no ocupa toda la pantalla).
3. Gestión (crear/editar/borrar/ordenar) vía BotonMod para master/owner.

## Criterios de hecho

- [x] El máster crea un tip y aparece ordenado; un jugador solo los lee.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
