# T09 · Componente Libro (flipbook con índice)

**Fase:** 2 · **Depende de:** nada

## Objetivo

Crear el componente Libro reutilizable: páginas con animación de paso, índice, ir a página y volver al índice, con cubiertas configurables.

## Guía (fragmento literal)

# 27. Libros y documentos

No todas las categorías son libros, pero los componentes que sí lo sean compartirán varias reglas.

## 27.1. Documentos maquetados

Cuando se use un documento ya diseñado, este tendrá prioridad visual.

Debe conservar:

- Imágenes.
- Colores.
- Tipografías.
- Portada.
- Contraportada.
- Composición.
- Fondo de página.

La web añadirá alrededor:

- Animación.
- Índice.
- Buscador.
- Navegación.
- Pantalla completa.
- Comentarios cuando corresponda.
- Moderación.

## 27.2. Libros generados por la web

Podrán utilizar cubiertas configurables:

- Cuero rojo.
- Cuero verde.
- Cuero negro.
- Otros colores.

Cada modelo tendrá pequeños símbolos decorativos en esquinas o bordes.

Los símbolos serán genéricos para reutilizarse.

## 27.3. Navegación

Todo libro largo tendrá:

- Índice.
- Buscador.
- Avanzar.
- Retroceder.
- Ir a una entrada.
- Volver al índice.
- Pantalla completa.

La animación nunca debe obligar al usuario a pasar decenas de páginas manualmente.

## Estado actual relevante

- **Salas:** una por componente en `src/components/views/*.astro`, cada una renderiza `<section class="view" data-view="KEY" hidden>`. Estilos compartidos en `src/styles/views.css` (`.room`, `.panel`, `.grid`, `.chips/.chip`, `.book`, `.comments/.comment`, `.char/.badge`, `.gallery/.frame`, `.session`, `.notif`, `.empty`...). Tokens en `src/styles/tokens.css`. El contenido actual de las salas es placeholder (WIP).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**
- Sugerencia: usar la librería `page-flip` (StPageFlip, ya probada en otros proyectos del usuario) o CSS 3D propio si pesa menos. Elegir y documentarlo en el propio componente.

## Archivos a tocar

nuevo `src/components/Libro.jsx` (+ CSS módulo o bloque en `views.css`)

## Pasos sugeridos

1. API: `<Libro paginas={[...]} cubierta="cuero-rojo|cuero-verde|cuero-negro" titulo sub indice={[{titulo, pagina}]} />` — páginas como HTML/JSX o imágenes.
2. Paso de página animado + flechas + teclado.
3. Índice como primera página o panel: clic → va a la página.
4. Botón "volver al índice" accesible desde cualquier página.
5. Cubiertas con símbolos decorativos genéricos en las esquinas.

## Criterios de hecho

- [ ] Demo con ≥6 páginas navegable con animación, índice y volver-al-índice.
- [ ] API documentada en cabecera del archivo.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
