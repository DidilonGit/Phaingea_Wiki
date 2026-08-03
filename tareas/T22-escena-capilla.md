# T22 · Escena de la Capilla

**Fase:** 4 · **Depende de:** T01

## Objetivo

Construir la escena de la Capilla: mármol, atril central con columna, vidrieras laterales translúcidas con luz de color y estrellas detrás.

## Guía (fragmento literal)

# 9. Capilla

La Capilla será la categoría dedicada a deidades y contenido religioso.

## 9.1. Escena

La cámara se situará de frente, como si el usuario estuviera ante un atril desde el que se va a predicar.

La sala tendrá:

- Profundidad.
- Forma ligeramente ovalada.
- Mármol blanco.
- Buena iluminación.
- Un atril elevado en el centro.
- Una columna que baja desde el atril.
- Dos vidrieras laterales.
- Cristal parcialmente transparente.
- El fondo estrellado visible a través de las vidrieras.
- Luz de color entrando desde los laterales.

La escena debe sentirse reservada, limpia y solemne.

## Estado actual relevante

- **Salas:** una por componente en `src/components/views/*.astro`, cada una renderiza `<section class="view" data-view="KEY" hidden>`. Estilos compartidos en `src/styles/views.css` (`.room`, `.panel`, `.grid`, `.chips/.chip`, `.book`, `.comments/.comment`, `.char/.badge`, `.gallery/.frame`, `.session`, `.notif`, `.empty`...). Tokens en `src/styles/tokens.css`. El contenido actual de las salas es placeholder (WIP).
- **Fondo de estrellas:** `src/components/StarsCanvas.jsx` (canvas, textura de estrella con hue 217 azul; montado en `index.astro` con `speedMultiplier={0.22}`).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/views/Capilla.astro`

## Pasos sugeridos

1. Composición frontal con profundidad (forma ovalada con gradientes de mármol blanco).
2. Atril elevado en el centro (hueco donde irá el Libro en T23) con columna descendente.
3. Dos vidrieras laterales: formas con `clip-path`/SVG semitransparentes de colores, dejando ver las estrellas a través; halos de luz de color hacia dentro.

## Criterios de hecho

- [ ] Escena solemne y legible; las estrellas se ven tras las vidrieras.
- [ ] Hueco del atril listo para el libro.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
