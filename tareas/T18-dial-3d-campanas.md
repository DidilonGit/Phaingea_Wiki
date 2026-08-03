# T18 · Dial 3D de campañas en el Observatorio

**Fase:** 3 · **Depende de:** T07

## Objetivo

Sustituir el dial decorativo por el dial real de campañas: curvo, con profundidad, Base fija arriba, selección de campaña activa.

## Guía (fragmento literal)

## 8.3. Dial de campañas

Alrededor del planeta habrá un dial tridimensional con los planetas de las distintas campañas.

El dial:

- Se percibirá curvo y con profundidad.
- Ocultará los planetas que pasen detrás del planeta central.
- Podrá desplazarse hacia izquierda o derecha.
- Permitirá seleccionar cualquier campaña.
- Mostrará hasta dos letras sobre cada planeta para reconocerlo.
- Mostrará el nombre completo de la campaña al hacer hover.
- Mantendrá Base de Phaingea fija en la parte superior central.

Al seleccionar un planeta, este pasa a convertirse en la campaña activa.

## Estado actual relevante

- **Observatorio (Inicio):** el globo de puntos + dial dorado viven inline en `src/pages/index.astro` (sección `data-view="inicio"`), portados desde `prototipos/observatorio.html` (fuente). El globo es autocontenido (continentes generados con semilla, función `puntosFallback`). Dial = arco SVG en `montarMontura()` (A0/A1 en grados; 270°=arriba).
- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/pages/index.astro` (sección inicio) o nueva isla `src/components/DialCampanas.jsx` · `prototipos/observatorio.html` si se toca el globo

## Pasos sugeridos

1. Planetas de `$campaigns` (orden por `orden`) sobre una órbita elíptica 3D: escala y opacidad según profundidad (z); los que pasan por detrás del planeta central se ocultan.
2. Desplazamiento con rueda/drag/flechas; snap al más cercano.
3. Cada planeta: esfera con colores de su campaña + hasta 2 letras; hover → nombre completo; badge de estado (§5.1).
4. Base de Phaingea fija arriba en el centro con contorno especial; no rota con el dial.
5. Seleccionar → `setCampaign(id)` y el planeta central cambia.

## Criterios de hecho

- [ ] Con ≥3 campañas en RTDB el dial gira, oculta planetas tras el central y selecciona campaña.
- [ ] Base queda fija arriba.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
