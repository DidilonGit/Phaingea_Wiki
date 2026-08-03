# T33 · Escena de Podios (podio, info, navegación circular)

**Fase:** 4 · **Depende de:** T32

## Objetivo

El personaje sobre podio de mármol iluminado, con su información alrededor y navegación circular alfabética.

## Guía (fragmento literal)

# 11. Podios

Podios será la categoría donde se muestran los personajes de una campaña.

En Base de Phaingea se llamará **Leyendas**.

## 11.1. Escena

El personaje aparecerá en el centro sobre un podio de mármol, iluminado por focos.

La imagen será la ilustración completa del personaje, no únicamente el recorte circular usado en el perfil.

El podio debe ser sencillo y dar prioridad al personaje.

## 11.2. Información visible

Encima o alrededor del personaje aparecerá:

- Nombre, con los colores y contorno de la campaña.
- Edad.
- Raza.
- Nivel.
- Estado.
- Jugador que lo controla, cuando corresponda.

La posición del nombre debe ajustarse a imágenes de distinta altura.

## 11.3. Navegación entre personajes

A izquierda y derecha habrá controles para cambiar de personaje.

El orden será alfabético.

La navegación será circular:

- Desde el primero, ir a la izquierda abre el último.
- Desde el último, ir a la derecha abre el primero.

## Estado actual relevante

- **Salas:** una por componente en `src/components/views/*.astro`, cada una renderiza `<section class="view" data-view="KEY" hidden>`. Estilos compartidos en `src/styles/views.css` (`.room`, `.panel`, `.grid`, `.chips/.chip`, `.book`, `.comments/.comment`, `.char/.badge`, `.gallery/.frame`, `.session`, `.notif`, `.empty`...). Tokens en `src/styles/tokens.css`. El contenido actual de las salas es placeholder (WIP).
- **Campañas:** modelo `/campanas` creado en T06 (`src/lib/db/campanas.js`, seed `base-phaingea`). Campaña activa: nanostore `$campaign` en `src/stores/campaign.js` (T07) con persistencia localStorage; helpers de rol por campaña.
- **Sistema XP:** creado en T15 (`src/lib/xp.js` con tablas Pathfinder 1e + `BarraXP.jsx` de dos colores).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/views/Podios.astro` + isla `src/components/PodiosView.jsx`

## Pasos sugeridos

1. Podio de mármol con focos (gradientes/halos), imagen COMPLETA del personaje encima (no el recorte).
2. Info: nombre con fuente/colores/contorno de la campaña (posición adaptable a alturas distintas), edad, raza, nivel (desde XP), estado, jugador.
3. Flechas izquierda/derecha; orden alfabético; circular (del último al primero y viceversa).
4. Suscrito a la campaña activa.

## Criterios de hecho

- [x] Navegar entre los personajes seed circularmente con su info correcta.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
