# T36 · Diario del personaje (markdown → libro de 8 páginas)

**Fase:** 4 · **Depende de:** T09, T15, T33

## Objetivo

El diario: un texto Markdown del jugador convertido en libro de máximo 8 páginas, con marca de salto de página y barra de XP en la primera.

## Guía (fragmento literal)

## 11.7. Diario del personaje

El diario será un libro generado desde un único texto escrito en Markdown.

Podrá contener:

- Lore.
- Historia.
- Personalidad.
- Objetivos.
- Mecánicas.
- Habilidades.
- Inventario.
- Notas del jugador.
- Imágenes o enlaces admitidos.
- Cualquier otra información útil.

El diario tendrá un máximo de ocho páginas.

La web distribuirá el contenido entre páginas, pero el jugador podrá forzar un salto de página mediante una marca específica dentro del Markdown.

Esa marca debe ser sencilla de escribir y estar explicada en el editor.

En la parte superior de la primera página aparecerá la barra de experiencia del personaje.

## Estado actual relevante

- **Libro compartido:** creado en T09 (`src/components/Libro.jsx`), con buscador (T10) y pantalla completa (T11). Úsalo, no reinventes flipbooks.
- **Sistema XP:** creado en T15 (`src/lib/xp.js` con tablas Pathfinder 1e + `BarraXP.jsx` de dos colores).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

nuevo `src/components/DiarioLibro.jsx` (usa Libro) · parser md (usar `marked` o similar ligero)

## Pasos sugeridos

1. Render markdown → HTML; paginar automáticamente midiendo altura (contenedor off-screen) con tope de 8 páginas (recorte con aviso si excede).
2. Marca de salto de página: una línea con `===salto===` (documentarla en el editor del perfil, T63).
3. `<BarraXP>` en la cabecera de la primera página.
4. Montarlo en el hueco de T35.

## Criterios de hecho

- [ ] Diario largo repartido en páginas; `===salto===` fuerza salto; barra XP visible.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
