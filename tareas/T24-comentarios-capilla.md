# T24 · Comentarios generales de la Capilla

**Fase:** 4 · **Depende de:** T13, T14, T22

## Objetivo

Hilo de comentarios generales de la sala bajo el atril (independiente de la página del libro).

## Guía (fragmento literal)

## 9.4. Comentarios

Debajo del atril, al hacer scroll, aparecerán comentarios generales de la Capilla.

Estos comentarios no dependerán de la página del libro que esté abierta.

## Estado actual relevante

- **Comentarios compartidos:** creados en T13/T14 (`src/components/Comentarios.jsx` + `src/lib/db/comentarios.js`): hilo por target `{campana, tipo, ref}`, aprobación configurable, reacciones.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/views/Capilla.astro`

## Pasos sugeridos

1. `<Comentarios tipo="capilla" refId="general" />` bajo el atril (aparece al hacer scroll).

## Criterios de hecho

- [x] Comentar funciona y el hilo cambia con la campaña.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
