# T16 · Botón de moderación contextual

**Fase:** 2 · **Depende de:** T12, T17

## Objetivo

Botón reutilizable que aparece en la esquina de cualquier elemento administrable, visible solo con permiso, y abre un modal con las opciones de ese elemento.

## Guía (fragmento literal)

# 24. Moderación contextual

Todo elemento administrable tendrá un botón de moderación visible únicamente para quien posea permiso.

Se colocará siempre en una posición coherente.

Ejemplos:

- Campaña.
- Categoría.
- Sesión.
- Evento.
- Personaje.
- Grupo.
- Imagen.
- Lugar.
- Comentario.
- Tip.
- Notificación global.

El botón abrirá únicamente las opciones relacionadas con el elemento actual.

Los formularios serán sencillos, con opciones avanzadas desplegables cuando hagan falta.

## Estado actual relevante

- **Permisos:** helpers por campaña/categoría en `src/lib/permisos.js` (T17). Botón de moderación contextual `src/components/BotonMod.jsx` (T16).
- **Modal común:** creado en T12 (`src/components/Modal.jsx` + doble confirmación). Úsalo para ventanas y confirmaciones.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

nuevo `src/components/BotonMod.jsx`

## Pasos sugeridos

1. `<BotonMod visible={puedeGestionar(...)} titulo>` → icono discreto (engranaje/pluma) esquina superior del contenedor (position absolute).
2. Al pulsar abre `Modal` con el contenido de moderación que le pases como children.
3. Formularios sencillos; opciones avanzadas en `<details>` desplegables.

## Criterios de hecho

- [x] Demo en una sala: visible como admin, invisible como jugador.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
