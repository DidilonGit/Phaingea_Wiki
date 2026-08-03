# T21 · Escena del Observatorio (vigas y cristales)

**Fase:** 3 · **Depende de:** nada

## Objetivo

Ambientar el Observatorio: sensación de mirar el techo abierto de un gran observatorio (vigas metálicas, cristales curvos), sin estorbar al globo.

## Guía (fragmento literal)

## 8.1. Escena

La sala debe sentirse como si se estuviera mirando hacia el techo de un observatorio enorme.

El fondo estará compuesto principalmente por:

- Espacio exterior.
- Estrellas animadas.
- Vigas metálicas estáticas.
- Cristales o estructuras curvas que den sensación de profundidad.

Debe ser una escena limpia, amplia y algo solemne. No debe sentirse como una habitación cerrada, sino como una gran abertura hacia el cielo.

## Estado actual relevante

- **Observatorio (Inicio):** el globo de puntos + dial dorado viven inline en `src/pages/index.astro` (sección `data-view="inicio"`), portados desde `prototipos/observatorio.html` (fuente). El globo es autocontenido (continentes generados con semilla, función `puntosFallback`). Dial = arco SVG en `montarMontura()` (A0/A1 en grados; 270°=arriba).
- **Fondo de estrellas:** `src/components/StarsCanvas.jsx` (canvas, textura de estrella con hue 217 azul; montado en `index.astro` con `speedMultiplier={0.22}`).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/pages/index.astro` (estilos de la sección inicio)

## Pasos sugeridos

1. Vigas metálicas estáticas en los bordes (SVG/CSS con gradientes, perspectiva sutil).
2. Reflejos/cristales curvos muy suaves (radial-gradients translúcidos).
3. Cuidar rendimiento (nada animado pesado) y que el globo siga siendo el protagonista.

## Criterios de hecho

- [x] La escena transmite la abertura del observatorio; el globo y el dial se ven limpios.
- [x] Sin caída de FPS apreciable.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
