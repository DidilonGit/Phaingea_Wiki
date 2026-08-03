# T05 · Hueco del logo de campaña en la topbar

**Fase:** 0 · **Depende de:** T01

## Objetivo

Reservar el sitio del logo de la campaña activa junto al texto PHAINGEA en la barra superior (placeholder de Base de Phaingea hasta que exista el store de campañas).

## Guía (fragmento literal)

## 8.5. Nota de campaña

Debajo del planeta aparecerá una nota de papel antiguo adaptable al contenido.

La nota incluirá:

- Título de la campaña.
- Fuente propia.
- Color de texto propio.
- Color de contorno propio.
- Logo de la campaña detrás o junto al título.
- Línea divisoria.
- Descripción de uno o varios párrafos.

El cuerpo de la descripción utilizará una fuente y color comunes que garanticen buena lectura sobre el papel.

El logo de la campaña también aparecerá en la barra superior, junto al texto **PHAINGEA**, mientras esa campaña esté activa.

## Estado actual relevante

- **Navbar de banderines:** `src/components/TopBar.astro` — array `bookmarks` (key/label/color/shape) e iconos SVG en el objeto `icons`. El conmutador de vistas está al final de `src/pages/index.astro`: función `activar(key)` que muestra/oculta `.view[data-view=key]` y marca el banderín `.activo`.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/TopBar.astro`

## Pasos sugeridos

1. Añadir junto a `.brand` un contenedor de logo (imagen circular/cuadrada pequeña) con placeholder (planeta genérico o inicial "B").
2. Dejarlo con un `id`/clase clara para que T07/T19 lo conecten al store de campaña activa.

## Criterios de hecho

- [ ] Logo placeholder visible junto a PHAINGEA sin romper el layout con 10 banderines.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
