# T19 · Nota de campaña bajo el planeta + logo en topbar

**Fase:** 3 · **Depende de:** T07

## Objetivo

La nota de papel antiguo con la identidad de la campaña activa (título con su fuente/colores, logo, descripción), y el logo conectado en la topbar.

## Guía (fragmento literal)

## 8.5. Nota de campaña

Debajo del planeta aparecerá una nota de papel antiguo adaptable al contenido.

La nota incluirá:

- Título de la campaña.
- Fuente propia.
- Color de texto propio.
- Color de contorno propio.
- Logo de la campaña detrás o junto al título.
- Línea divisoria.
- Descripción de uno o varios párrafos.

El cuerpo de la descripción utilizará una fuente y color comunes que garanticen buena lectura sobre el papel.

El logo de la campaña también aparecerá en la barra superior, junto al texto **PHAINGEA**, mientras esa campaña esté activa.

## Estado actual relevante

- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Observatorio (Inicio):** el globo de puntos + dial dorado viven inline en `src/pages/index.astro` (sección `data-view="inicio"`), portados desde `prototipos/observatorio.html` (fuente). El globo es autocontenido (continentes generados con semilla, función `puntosFallback`). Dial = arco SVG en `montarMontura()` (A0/A1 en grados; 270°=arriba).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

isla `src/components/NotaCampana.jsx` · `src/pages/index.astro` · `src/components/TopBar.astro`

## Pasos sugeridos

1. Papel adaptable bajo el planeta: título (fuente propia via `@font-face`/fallback, color y contorno de la campaña), logo detrás/junto, línea divisoria, descripción con fuente/color comunes legibles.
2. Suscrita a `$campaign`; al cambiar campaña se actualiza con transición suave.
3. Conectar el logo del topbar (T05) al store si no lo hizo T07.

## Criterios de hecho

- [x] Cambiar de campaña en el dial cambia título/colores/logo/descripción.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
