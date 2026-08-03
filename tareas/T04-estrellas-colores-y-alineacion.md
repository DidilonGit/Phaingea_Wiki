# T04 · Estrellas con colores + contenido alineado arriba

**Fase:** 0 · **Depende de:** nada

## Objetivo

Que el fondo estrellado incluya estrellas de colores además de blancas, y que el contenido de las salas se alinee hacia la parte superior.

## Guía (fragmento literal)

- Dorado para textos de hover, contornos y elementos destacados.
- Un fondo de estrellas compartido por toda la web.

El fondo estrellado permanecerá en todas las salas, aunque podrá verse más o menos dependiendo de la habitación. Siempre que sea posible, las estrellas incluirán colores además del blanco.

Cada sala utilizará la perspectiva que mejor represente su espacio. No todas deben verse desde arriba: una mesa puede mostrarse en vista cenital, mientras que una capilla puede verse de frente y con profundidad.

[...]

### 2.3. Distribución vertical

Siempre que sea posible, el contenido principal se alineará hacia la parte superior de la pantalla.

Esto evita scroll innecesario en pantallas pequeñas y hace que, cuando un componente se cierre o desaparezca, los elementos inferiores ocupen su lugar de forma natural.

## Estado actual relevante

- **Fondo de estrellas:** `src/components/StarsCanvas.jsx` (canvas, textura de estrella con hue 217 azul; montado en `index.astro` con `speedMultiplier={0.22}`).
- **Salas:** una por componente en `src/components/views/*.astro`, cada una renderiza `<section class="view" data-view="KEY" hidden>`. Estilos compartidos en `src/styles/views.css` (`.room`, `.panel`, `.grid`, `.chips/.chip`, `.book`, `.comments/.comment`, `.char/.badge`, `.gallery/.frame`, `.session`, `.notif`, `.empty`...). Tokens en `src/styles/tokens.css`. El contenido actual de las salas es placeholder (WIP).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/StarsCanvas.jsx` · `src/styles/views.css`

## Pasos sugeridos

1. En StarsCanvas, generar la textura de estrella con hue variable por estrella (mayoría blancas/azuladas + minoría doradas, rojizas y violetas). Puede hacerse con 3-4 sprites cacheados de distinto hue elegidos al crear cada estrella.
2. En `views.css`, revisar `.room`/`.empty` para que el contenido arranque arriba (`align-content: start`, reducir márgenes verticales grandes).

## Criterios de hecho

- [ ] Se aprecian estrellas de al menos 3 tonos distintos.
- [ ] Las salas no dejan grandes huecos superiores.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
