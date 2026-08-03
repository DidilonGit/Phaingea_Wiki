# T20 · Pines de regiones sobre el planeta

**Fase:** 3 · **Depende de:** T18

## Objetivo

El planeta central muestra pines de regiones de la campaña activa; al pulsarlos, popup con resumen y botón "Abrir en Cartografía".

## Guía (fragmento literal)

## 8.4. Regiones sobre el planeta

El planeta principal mostrará pines o nombres de regiones asociados a la campaña activa.

Al pulsar una región:

- Aparece un recuadro con un pequeño resumen.
- Se muestra su nombre.
- Puede mostrarse una imagen breve si existe.
- Aparece un botón **Abrir en Cartografía**.

Ese botón cambia a la sala de Cartografía y abre directamente el lugar seleccionado.

## Estado actual relevante

- **Observatorio (Inicio):** el globo de puntos + dial dorado viven inline en `src/pages/index.astro` (sección `data-view="inicio"`), portados desde `prototipos/observatorio.html` (fuente). El globo es autocontenido (continentes generados con semilla, función `puntosFallback`). Dial = arco SVG en `montarMontura()` (A0/A1 en grados; 270°=arriba).
- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**
- Los lugares reales llegan en T26 (`/lugares`). Si esta tarea se hace antes, usar 2-3 lugares WIP en RTDB con lat/lon y dejar TODO para conectar.

## Archivos a tocar

`src/pages/index.astro` (globo/marcadores) · popup

## Pasos sugeridos

1. Cargar lugares destacados de la campaña activa (lat/lon) como marcadores del globo (ya existe el sistema de marcadores del prototipo: reutilizarlo).
2. Popup al pulsar: nombre, resumen breve, imagen opcional, botón **Abrir en Cartografía**.
3. El botón conmuta a la vista cartografía y deja seleccionado ese lugar (evento/estado compartido).

## Criterios de hecho

- [x] Pin → popup → botón lleva a Cartografía con el lugar activo.
- [x] Al cambiar campaña cambian los pines.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
