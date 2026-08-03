# T31 · Comentarios por lugar

**Fase:** 4 · **Depende de:** T13, T27

## Objetivo

Hilo de comentarios asociado al lugar activo; cambiar de lugar cambia el hilo.

## Guía (fragmento literal)

## 10.8. Comentarios

Los comentarios estarán asociados al lugar activo.

Cambiar de mapa o lugar cambia también el hilo de comentarios.

## Estado actual relevante

- **Comentarios compartidos:** creados en T13/T14 (`src/components/Comentarios.jsx` + `src/lib/db/comentarios.js`): hilo por target `{campana, tipo, ref}`, aprobación configurable, reacciones.
- **Flujo de trabajo:** `npm run build` debe pasar; verificar en navegador (`npm run dev`, localhost:4321/Phaingea_Wiki). Commit **como Jowy05** y push a `main` → GitHub Pages despliega solo; las pestañas abiertas se auto-recargan (VersionWatcher). **Nada relacionado con IA/asistentes en el repo.**

## Archivos a tocar

`src/components/views/Cartografia.astro`

## Pasos sugeridos

1. `<Comentarios tipo="cartografia" refId={lugarActivoId} />` bajo la lista.

## Criterios de hecho

- [x] Dos lugares tienen hilos separados.
- [x] Build OK.
- [x] Commit como Jowy05 + push (deploy verde).
