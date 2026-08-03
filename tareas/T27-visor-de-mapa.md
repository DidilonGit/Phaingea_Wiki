# T27 · Visor de mapa (pan, zoom, pines, entrar a lugares)

**Fase:** 4 · **Depende de:** T25, T26

## Objetivo

El visor interactivo del mapa activo: arrastrar, zoom con rueda, pines con popup y navegación entre mapas anidados.

## Guía (fragmento literal)

## 10.2. Mapa activo

Al entrar se mostrará el lugar configurado como predeterminado para esa campaña.

No todas las campañas suceden en el planeta completo. El máster podrá decidir que el mapa inicial sea:

- El mapamundi.
- Una región.
- Una ciudad.
- Una isla.
- Cualquier otro lugar registrado.

Si un lugar no tiene mapa aparecerá un mensaje equivalente a:

> Imagen de mapa no disponible.

## 10.3. Navegación del mapa

Sin ninguna herramienta seleccionada, el usuario podrá:

- Arrastrar para desplazarse.
- Usar la rueda del ratón para ampliar o reducir.
- Pulsar pines.
- Abrir resúmenes de lugares.
- Entrar en otro mapa mediante el botón correspondiente.

Al pulsar un pin aparecerá un recuadro con:

- Nombre del lugar.
- Breve resumen.
- Imagen opcional.
- Botón **Entrar al lugar**.

Al entrar:

- Cambia el mapa activo.
- Cambia el título.
- Cambia la información.
- Cambian los pines.
- Cambian los comentarios asociados.

## Estado actual relevante

- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**
- Escucha el evento/estado de T20 ("Abrir en Cartografía") para abrir directamente un lugar.

## Archivos a tocar

nueva isla `src/components/MapaViewer.jsx` en Cartografia

## Pasos sugeridos

1. Imagen del mapa en contenedor con pan (pointer drag) y zoom (rueda, hacia el cursor, límites min/max).
2. Pines posicionados en % sobre la imagen; popup: nombre, resumen, imagen opcional, botón **Entrar al lugar** (si tiene mapa) o abrir su información.
3. Entrar: cambia mapa activo, título, pines y el hilo de comentarios (T31).
4. Sin mapa → mensaje "Imagen de mapa no disponible" con la info igualmente accesible.
5. Botón "subir" al lugar superior.

## Criterios de hecho

- [x] Navegar mapamundi → región → volver funciona con zoom/pan fluidos.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
