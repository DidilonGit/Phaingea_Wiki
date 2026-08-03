# T14 · Comentarios v2: reacciones, aprobación y moderación

**Fase:** 2 · **Depende de:** T12, T13

## Objetivo

Completar el sistema de comentarios: reacciones emoji, aprobación configurable por contexto y moderación con doble confirmación.

## Guía (fragmento literal)

## 22.1. Edición y eliminación

El comentario puede editarlo:

- Su autor.
- El máster.
- El owner.

El máster y el owner pueden eliminarlo.

Eliminar requiere doble confirmación.

## 22.2. Aprobación

Algunas categorías pueden exigir aprobación.

Los comentarios pendientes solo serán visibles para quienes puedan aprobarlos.

Dependiendo del contexto pueden aprobar:

- Máster.
- Owner.
- Propietario del personaje.

## 22.3. Reacciones

Los comentarios permitirán reacciones con emojis.

No habrá respuestas anidadas ni conversaciones en forma de hilo.

## Estado actual relevante

- **Comentarios compartidos:** creados en T13/T14 (`src/components/Comentarios.jsx` + `src/lib/db/comentarios.js`): hilo por target `{campana, tipo, ref}`, aprobación configurable, reacciones.
- **Modal común:** creado en T12 (`src/components/Modal.jsx` + doble confirmación). Úsalo para ventanas y confirmaciones.
- **Cuentas/sesión:** login propio en `src/lib/auth.js` (sha256hex, login/registrar contra `/usuarios` en RTDB; la pass se guarda hasheada). Sesión y rol en `src/stores/user.js` (nanostore `$user` + localStorage `phaingea_session`; helpers `esOwner`/`esMasterOOwner`; el rol `admin` equivale a `owner`). UI de login: `src/components/AuthGate.jsx` (overlay + chip de usuario arriba a la derecha).
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/Comentarios.jsx` · `src/lib/db/comentarios.js` · `database.rules.json`

## Pasos sugeridos

1. Reacciones: `{reacciones: {emoji: {usuario:true}}}`, toggle al pulsar, picker corto de emojis.
2. Props de config: `requiereAprobacion`, `puedeAprobar(user)` — pendientes (`estado:"pendiente"`) visibles solo para quienes aprueban; aprobar/denegar.
3. Máster/owner editan y eliminan cualquier comentario; eliminar usa `confirmarDoble` (T12).
4. Sin respuestas anidadas (no implementar hilos).

## Criterios de hecho

- [ ] Reaccionar/quitar reacción funciona con dos cuentas.
- [ ] Un comentario pendiente no lo ve un jugador normal y sí un máster, que puede aprobarlo.
- [ ] Eliminar pide doble confirmación.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
