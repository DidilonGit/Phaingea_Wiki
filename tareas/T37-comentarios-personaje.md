# T37 · Comentarios de personaje

**Fase:** 4 · **Depende de:** T14, T33

## Objetivo

Hilo por personaje con aprobación (propietario/máster/owner); el propietario publica sin aprobación en el suyo.

## Guía (fragmento literal)

## 11.8. Comentarios de personaje

Los comentarios aparecerán debajo del diario si está abierto, o debajo del podio si está cerrado.

Los comentarios pertenecen al personaje visible.

Pueden aprobarlos:

- El propietario del personaje.
- El máster.
- El owner.

El propietario puede publicar en su propio personaje sin aprobación.

## Estado actual relevante

- **Comentarios compartidos:** creados en T13/T14 (`src/components/Comentarios.jsx` + `src/lib/db/comentarios.js`): hilo por target `{campana, tipo, ref}`, aprobación configurable, reacciones.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/PodiosView.jsx`

## Pasos sugeridos

1. `<Comentarios tipo="podios" refId={personajeId} requiereAprobacion puedeAprobar={propietario|master|owner} exentoDeAprobacion={autor===propietario} />`.
2. Posición: debajo del diario si está abierto; si no, debajo del podio.

## Criterios de hecho

- [ ] Comentario de tercero queda pendiente hasta aprobarse; el del propietario sale directo.
- [ ] Build OK.
- [ ] Commit como Jowy05 + push (deploy verde).
