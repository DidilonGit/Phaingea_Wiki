# T48 · Comentarios de sesión (uno por jugador)

**Fase:** 4 · **Depende de:** T13, T46

## Objetivo

Hilo por sesión donde cada jugador tiene un único comentario, editable siempre, sin aprobación.

## Guía (fragmento literal)

## 14.4. Comentarios de sesión

Cada sesión tendrá comentarios propios.

Cada jugador podrá tener un único comentario por sesión.

Podrá editarlo tantas veces como quiera.

No requiere aprobación.

Máster y owner podrán moderarlo.

## Estado actual relevante

- **Comentarios compartidos:** creados en T13/T14 (`src/components/Comentarios.jsx` + `src/lib/db/comentarios.js`): hilo por target `{campana, tipo, ref}`, aprobación configurable, reacciones.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/SesionesView.jsx` · `src/components/Comentarios.jsx` (prop `unoPorUsuario`)

## Pasos sugeridos

1. Añadir modo `unoPorUsuario` al componente de comentarios: si ya tienes comentario en el hilo, el form pasa a "editar el tuyo".
2. Sin aprobación; máster/owner moderan (editar/borrar).
3. Hilo target `sesiones/{sesionId}`, mostrado bajo el libro para la sesión abierta.

## Criterios de hecho

- [x] Un jugador no puede crear dos comentarios en la misma sesión, sí editar el suyo.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
