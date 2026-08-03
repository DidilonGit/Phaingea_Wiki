# T25 · Escena de Cartografía (marco y ganchos)

**Fase:** 4 · **Depende de:** T01

## Objetivo

La estructura visual de la sala: mapa con marco grueso de madera y ganchos metálicos laterales para las herramientas.

## Guía (fragmento literal)

## 10.1. Escena

El elemento principal será un mapa visto de frente y rodeado por un marco grueso de madera.

A los lados habrá herramientas colgadas en pequeños ganchos metálicos.

El fondo estrellado seguirá siendo visible alrededor de la estructura.

La sala debe sentirse ordenada, práctica y propia de una cartoteca o sala de mapas.

## Estado actual relevante

- **Salas:** una por componente en `src/components/views/*.astro`, cada una renderiza `<section class="view" data-view="KEY" hidden>`. Estilos compartidos en `src/styles/views.css` (`.room`, `.panel`, `.grid`, `.chips/.chip`, `.book`, `.comments/.comment`, `.char/.badge`, `.gallery/.frame`, `.session`, `.notif`, `.empty`...). Tokens en `src/styles/tokens.css`. El contenido actual de las salas es placeholder (WIP).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/views/Cartografia.astro`

## Pasos sugeridos

1. Marco de madera (texture wood.png + biseles) alrededor del área del mapa.
2. Columnas laterales con ganchos (lupa, compás, paño — de momento decorativos; se activan en T28-T29).
3. Fondo estrellado visible alrededor.

## Criterios de hecho

- [x] Composición lista con hueco central para el visor (T27).
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
