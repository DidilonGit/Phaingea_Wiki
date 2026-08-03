# T40 · Composición de museo + paginación circular

**Fase:** 4 · **Depende de:** T39

## Objetivo

La exposición: cuadros con marcos de madera bien espaciados, máximo 16 por página, flechas de madera con navegación circular sobre el filtro activo.

## Guía (fragmento literal)

## 13.1. Escena

Las imágenes se mostrarán como cuadros con marcos de madera.

La composición debe:

- Mantener espacio entre marcos.
- Adaptarse a distintas proporciones.
- Evitar cortes innecesarios.
- Sentirse como una exposición.
- Mostrar hasta dieciséis imágenes por página.
- Mostrar menos cuando haya imágenes grandes o proporciones difíciles de combinar.

[...]

## 13.3. Navegación de páginas

A izquierda y derecha de la galería habrá flechas de madera.

La navegación será circular:

- Ir a la izquierda desde la primera página abre la última.
- Ir a la derecha desde la última abre la primera.

La paginación se aplicará sobre los resultados del filtro actual.

## Estado actual relevante

- **Salas:** una por componente en `src/components/views/*.astro`, cada una renderiza `<section class="view" data-view="KEY" hidden>`. Estilos compartidos en `src/styles/views.css` (`.room`, `.panel`, `.grid`, `.chips/.chip`, `.book`, `.comments/.comment`, `.char/.badge`, `.gallery/.frame`, `.session`, `.notif`, `.empty`...). Tokens en `src/styles/tokens.css`. El contenido actual de las salas es placeholder (WIP).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/views/Galeria.astro` + isla `src/components/GaleriaView.jsx`

## Pasos sugeridos

1. Grid tipo masonry ligero que respete proporciones (verticales/horizontales/cuadradas) sin cortes, con hueco entre marcos.
2. Máx 16 por página (menos si hay imágenes grandes).
3. Flechas de madera a los lados; circular (última→primera).
4. La paginación se calcula sobre los resultados filtrados (T41).

## Criterios de hecho

- [x] Con >16 imágenes aprobadas hay varias páginas circulares.
- [x] Marcos y espaciado de exposición.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
