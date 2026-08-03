# T47 · Crear y editar sesiones (máster)

**Fase:** 4 · **Depende de:** T16, T45, T46

## Objetivo

Formulario de máster para crear/editar sesiones con el título por defecto y el reparto de XP.

## Guía (fragmento literal)

## 14.1. Libro de sesiones

Cada sesión ocupará una entrada o conjunto de páginas.

Mostrará:

- Número de sesión.
- Título.
- Subtítulo opcional.
- Experiencia general.
- Experiencia extra.
- Personajes que reciben experiencia adicional.
- Descripción opcional de lo ocurrido.

El título por defecto será:

> Sesión [número siguiente]

El máster podrá cambiarlo.

[...]

## 14.3. Creación y edición

El máster podrá crear y modificar sesiones.

Al cambiar la experiencia de una sesión:

- Se recalcula la experiencia de los personajes afectados.
- Se actualiza su nivel cuando corresponda.
- Se actualizan sus barras de progreso.

## Estado actual relevante

- **Permisos:** helpers por campaña/categoría en `src/lib/permisos.js` (T17). Botón de moderación contextual `src/components/BotonMod.jsx` (T16).
- **Modal común:** creado en T12 (`src/components/Modal.jsx` + doble confirmación). Úsalo para ventanas y confirmaciones.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/SesionesView.jsx` + `BotonMod`

## Pasos sugeridos

1. Botón de moderación en la sala → modal con form: título (por defecto "Sesión [n+1]", editable), subtítulo, XP general, XP extra por personaje (lista de la campaña, 0 por defecto), descripción.
2. Editar sesión existente desde su página.
3. Al guardar, disparar `notificar()` (o TODO → T55).

## Criterios de hecho

- [ ] Crear una sesión desde la web actualiza el libro y los niveles.
- [ ] Jugador no puede.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
